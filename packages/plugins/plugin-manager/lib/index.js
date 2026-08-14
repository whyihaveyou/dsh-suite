// plugin-manager host half — install + installed list + trimmed catalog + update check.
//
// v0.3 additions:
// - /plugin-manager/catalog : trimmed, gzip/deflate-compressed copy of the GH
//   Pages catalog (panel-only fields), cached 1h. First screen stops paying the
//   850KB cold-CDN transfer — the browser pulls a ~1/2 (uncompressed) payload
//   from localhost instead.
// - /plugin-manager/updates  : for installed npm-source plugins, batch
//   `npm view <pkg> version` (concurrency <= 4, cache 1h) and diff against the
//   installed version. git/link/workspace sources are skipped.

import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { gzipSync, deflateSync } from 'node:zlib'

export const name = 'plugin-manager'
export const inject = ['webServer', 'loader']

const INSTALL_TIMEOUT_MS = 120_000
const VERIFY_TIMEOUT_MS = 60_000
const CATALOG_URL = 'https://whyihaveyou.github.io/dsh-suite/catalog.json'
const CATALOG_TTL_MS = 60 * 60 * 1000
const UPDATE_TTL_MS = 60 * 60 * 1000
const UPDATE_CONCURRENCY = 4

function json(res, value, status = 200) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(value))
}

async function readJsonBody(req) {
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    chunks.push(chunk)
    total += chunk.length
    if (total > 1 << 20) return null
  }
  const text = Buffer.concat(chunks).toString('utf8')
  if (!text) return null
  try { return JSON.parse(text) } catch { return null }
}

function currentProfile() {
  const argv = process.argv
  const i = argv.indexOf('--profile')
  if (i >= 0 && argv[i + 1]) return argv[i + 1]
  for (const a of argv) if (a === 'web') return 'web'
  return 'web'
}

function dshHome() {
  return process.env.DSH_HOME || join(homedir(), '.dsh')
}

function spawnCmd(cmd, args, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    child.stdout.on('data', (d) => { out += d })
    child.stderr.on('data', (d) => { err += d })
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      resolve({ ok: false, out, log: (out + err).trim() || cmd + ' timed out', exitCode: null, timedOut: true })
    }, timeoutMs)
    child.on('error', (e) => {
      clearTimeout(timer)
      resolve({ ok: false, out, log: 'spawn failed: ' + e.message, exitCode: null, timedOut: false })
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      resolve({ ok: code === 0, out, log: (out + err).trim(), exitCode: code, timedOut: false })
    })
  })
}

function parseAdded(stdout) {
  const names = []
  for (const line of stdout.split('\n')) {
    const m = line.match(/^\+\s+(\S+)\s+/)
    if (m) names.push(m[1])
  }
  return names
}

// ---- install (with exit-0 + dependency-added + mounted verification) ----

async function runInstall(pkg, profile) {
  const add = await spawnCmd('dsh', ['plugin', '--profile', profile, 'add', pkg], INSTALL_TIMEOUT_MS)
  if (!add.ok) {
    return { ok: false, log: add.log || '(no output)', exitCode: add.exitCode, needRestart: false, timedOut: add.timedOut, profile }
  }
  const added = parseAdded(add.out)
  if (added.length === 0) {
    return { ok: false, log: (add.log + '\n⚠ exit 0 but pnpm reported no added dependency — install did not take effect').trim(), exitCode: 0, needRestart: false, timedOut: false, profile }
  }
  const dump = await spawnCmd('dsh', ['--profile', profile, '--dump-config'], VERIFY_TIMEOUT_MS)
  const mounted = added.some((name) => dump.out.includes(name))
  return { ok: true, log: add.log, exitCode: 0, needRestart: true, timedOut: false, installed: added, mounted, profile }
}

// ---- trimmed catalog (cached 1h, panel-only fields) ----

const catalogCache = { at: 0, plugins: null }

function trimPlugin(p) {
  return {
    id: p.id, name: p.name,
    desc_en: p.desc_en, desc_zh: p.desc_zh,
    author: p.author, stars: p.stars,
    category: p.category, compatStatus: p.compatStatus,
    installCmd: p.installCmd, repo: p.repo, license: p.license,
  }
}

async function fetchCatalog() {
  if (catalogCache.plugins && Date.now() - catalogCache.at < CATALOG_TTL_MS) return catalogCache.plugins
  const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(60_000) })
  if (!res.ok) throw new Error('catalog fetch HTTP ' + res.status)
  const full = await res.json()
  const plugins = (full.plugins || []).map(trimPlugin)
  catalogCache.at = Date.now()
  catalogCache.plugins = plugins
  return plugins
}

// ---- update check (npm-source only, concurrency <= 4, cache 1h) ----

const updateCache = new Map()

function isNpmSpec(spec) {
  const s = String(spec || '').trim()
  if (!s) return false
  if (s.startsWith('link:') || s.startsWith('workspace:') || s.startsWith('file:')) return false
  if (s.startsWith('git') || s.startsWith('github:') || s.startsWith('gitlab:') || s.startsWith('bitbucket:')) return false
  if (/^https?:/.test(s) || /^git\+/.test(s)) return false
  return true
}

function readProfilePkg(profile) {
  try { return JSON.parse(readFileSync(join(dshHome(), 'profiles', profile, 'package.json'), 'utf8')) } catch { return null }
}

function installedVersion(profile, name) {
  try {
    return JSON.parse(readFileSync(join(dshHome(), 'profiles', profile, 'node_modules', name, 'package.json'), 'utf8')).version || null
  } catch { return null }
}

async function npmViewVersion(name) {
  const c = updateCache.get(name)
  if (c && Date.now() - c.at < UPDATE_TTL_MS) return c.version
  const r = await spawnCmd('npm', ['view', name, 'version'], 20_000)
  const version = r.ok && r.out ? r.out.split('\n')[0].trim() : null
  if (version) updateCache.set(name, { at: Date.now(), version })
  return version
}

async function runPool(items, limit, fn) {
  const results = new Array(items.length)
  let i = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; results[idx] = await fn(items[idx]) }
  })
  await Promise.all(workers)
  return results
}

async function computeUpdates(profile) {
  const pkg = readProfilePkg(profile)
  const deps = pkg ? { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) } : {}
  const npmDeps = Object.keys(deps).filter((n) => isNpmSpec(deps[n]))
  const checked = await runPool(npmDeps, UPDATE_CONCURRENCY, async (name) => {
    try {
      const installed = installedVersion(profile, name)
      const latest = await npmViewVersion(name)
      return { name, installed, latest, hasUpdate: !!(installed && latest && installed !== latest) }
    } catch { return { name, installed: null, latest: null, hasUpdate: false } }
  })
  return checked.filter((c) => c.hasUpdate)
}

export function apply(ctx) {
  ctx.effect(() => {
    const disposeInstall = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/install',
      handler: async (req, res) => {
        const body = await readJsonBody(req)
        const pkg = body && typeof body.pkg === 'string' && body.pkg.trim() ? body.pkg.trim() : null
        if (!pkg) return json(res, { ok: false, error: 'missing pkg' }, 400)
        const profile = typeof body.profile === 'string' && body.profile ? body.profile : currentProfile()
        json(res, await runInstall(pkg, profile))
      },
    })

    const disposeList = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/list',
      handler: (_req, res) => {
        const value = []
        for (const entry of ctx.loader.entries()) {
          if (entry.options.group) continue
          value.push({ name: entry.options.name, id: entry.id, enabled: !entry.disabled })
        }
        json(res, { ok: true, value })
      },
    })

    const disposeCatalog = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/catalog',
      handler: async (req, res) => {
        try {
          const plugins = await fetchCatalog()
          const body = Buffer.from(JSON.stringify({ plugins }), 'utf8')
          const ae = String(req.headers['accept-encoding'] || '')
          let payload = body
          let encoding = null
          if (/\bgzip\b/.test(ae)) { payload = gzipSync(body); encoding = 'gzip' }
          else if (/\bdeflate\b/.test(ae)) { payload = deflateSync(body); encoding = 'deflate' }
          res.writeHead(200, {
            'content-type': 'application/json; charset=utf-8',
            ...(encoding ? { 'content-encoding': encoding } : {}),
            'content-length': payload.length,
            'cache-control': 'no-store',
          })
          res.end(payload)
        } catch (e) {
          json(res, { ok: false, error: String(e && e.message ? e.message : e) }, 502)
        }
      },
    })

    const disposeUpdates = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/updates',
      handler: async (_req, res) => {
        try {
          json(res, { ok: true, value: await computeUpdates(currentProfile()) })
        } catch (e) {
          json(res, { ok: false, error: String(e && e.message ? e.message : e) }, 500)
        }
      },
    })

    // warm the catalog cache in the background so the first Store open is fast
    fetchCatalog().catch(() => {})

    return () => { disposeInstall(); disposeList(); disposeCatalog(); disposeUpdates() }
  }, 'plugin-manager: routes')
}
