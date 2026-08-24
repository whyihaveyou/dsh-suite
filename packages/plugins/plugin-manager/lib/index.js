// plugin-manager host half — install + installed list + trimmed catalog + update check.
//
// v0.3 additions:
// - /plugin-manager/catalog : trimmed, gzip/deflate-compressed copy of the GH
//   Pages catalog (panel-only fields), cached 1h. First screen stops paying the
//   850KB cold-CDN transfer — the browser pulls a ~1/2 (uncompressed) payload
//   from localhost instead.
// - /plugin-manager/updates  : for installed npm-source plugins, batch
//   `npm view <pkg> version` (concurrency <= 4, cache 6h) and diff against the
//   installed version. git/link/workspace sources are skipped.
// - /plugin-manager/update   : one-click upgrade — re-runs the normal install
//   path (dsh plugin add <name>) for a package a pending update exists for,
//   then invalidates its update-cache entry so the badge flips to the new
//   version. 409 when nothing is pending (avoids pointless pnpm churn).
//
// v0.5 note: the update badge TTL is 6h (npm registry round-trips are pricey
// in CN; a whole-day stash is fine for a "just shipped" signal).

import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { gzipSync, deflateSync } from 'node:zlib'

export const name = 'plugin-manager'
export const inject = ['webServer', 'loader']

// v0.5: bumped 120s → 300s — dependency downloads on slow networks (and
// registry mirrors under load) can legitimately exceed two minutes; the
// update path reuses runInstall, so a short timeout would report false
// failures while pnpm was still making progress.
const INSTALL_TIMEOUT_MS = 300_000
const VERIFY_TIMEOUT_MS = 60_000
const CATALOG_URL = 'https://whyihaveyou.github.io/dsh-suite/catalog.json'
const CATALOG_TTL_MS = 60 * 60 * 1000
const UPDATE_TTL_MS = 6 * 60 * 60 * 1000
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

function spawnCmd(cmd, args, timeoutMs, onLine) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    // v0.8 ②: onLine 逐行增量回调 —— 真增量（data 事件行缓冲），无行回调时零开销
    let rest = ''
    const feed = (d) => {
      if (!onLine) return
      rest += d.toString('utf8')
      const lines = rest.split('\n')
      rest = lines.pop() || ''
      for (const l of lines) if (l.trim()) onLine(l)
    }
    const flush = () => { if (onLine && rest.trim()) { onLine(rest); rest = '' } }
    child.stdout.on('data', (d) => { out += d; feed(d) })
    child.stderr.on('data', (d) => { err += d; feed(d) })
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
      flush()
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

async function runInstall(pkg, profile, onLine) {
  const add = await spawnCmd('dsh', ['plugin', '--profile', profile, 'add', pkg], INSTALL_TIMEOUT_MS, onLine)
  if (!add.ok) {
    return { ok: false, log: add.log || '(no output)', exitCode: add.exitCode, needRestart: false, timedOut: add.timedOut, profile }
  }
  const added = parseAdded(add.out)
  if (added.length === 0) {
    // v0.5: pnpm prints no "+ pkg" section when the dependency spec already
    // matches (e.g. "Already up to date" after a previously half-applied or
    // repeated install) — exit 0 then means the goal state is already on
    // disk. Treat that as success instead of a false failure; verify by
    // reading the package's own package.json from the profile.
    const present = installedVersion(profile, pkg)
    if (present) {
      return { ok: true, log: (add.log + `\nℹ already present on disk (${pkg}@${present}) — nothing to add`).trim(), exitCode: 0, needRestart: true, timedOut: false, installed: [pkg], mounted: true, profile }
    }
    return { ok: false, log: (add.log + '\n⚠ exit 0 but pnpm reported no added dependency — install did not take effect').trim(), exitCode: 0, needRestart: false, timedOut: false, profile }
  }
  const dump = await spawnCmd('dsh', ['--profile', profile, '--dump-config'], VERIFY_TIMEOUT_MS, onLine)
  const mounted = added.some((name) => dump.out.includes(name))
  return { ok: true, log: add.log, exitCode: 0, needRestart: true, timedOut: false, installed: added, mounted, profile }
}

// ---- trimmed catalog (cached 1h, panel-only fields) ----

const catalogCache = { at: 0, plugins: null, watchMeta: null }

// v0.8.3: 观测榜真实口径 —— 从 catalog.json 的 watchlist/watchlistCount 聚合，
// 随 trimmed catalog 一起下发，商店「观测聚合」区不再用 curated 现状顶替。
function summarizeWatchlist(full) {
  if (!full || typeof full !== 'object') return null
  const wl = Array.isArray(full.watchlist) ? full.watchlist : []
  const byReason = {}
  for (const w of wl) {
    const k = (w && w.watchReason) || 'other'
    byReason[k] = (byReason[k] || 0) + 1
  }
  const totals = full.totals || {}
  const total = typeof totals.watchlistCount === 'number' ? totals.watchlistCount
    : typeof totals.watchlist === 'number' ? totals.watchlist
    : wl.length
  return total > 0 || wl.length ? { total, byReason } : null
}

function trimPlugin(p) {
  return {
    id: p.id, name: p.name,
    desc_en: p.desc_en, desc_zh: p.desc_zh,
    author: p.author, stars: p.stars,
    category: p.category, compatStatus: p.compatStatus,
    installCmd: p.installCmd, repo: p.repo, license: p.license,
    featured: !!p.featured,
    lastPush: p.lastPush || null,
    ogLocal: p.ogLocal || null,
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
  catalogCache.watchMeta = summarizeWatchlist(full)
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

// Management-view source bucket: official (@deepseek-ai/*) / self (@dsh-suite/*) /
// git source / third-party npm / other (link, workspace, file, unknown).
function classifySource(name, spec) {
  if (name.startsWith('@deepseek-ai/')) return 'official'
  if (name.startsWith('@dsh-suite/')) return 'self'
  const s = String(spec || '').trim()
  if (s.startsWith('git') || s.startsWith('github:') || s.startsWith('gitlab:') || s.startsWith('bitbucket:') || /^git\+/.test(s)) return 'git'
  if (s && !s.startsWith('link:') && !s.startsWith('workspace:') && !s.startsWith('file:')) return 'npm'
  return 'other'
}

async function npmViewVersion(name) {
  const c = updateCache.get(name)
  if (c && Date.now() - c.at < UPDATE_TTL_MS) return c.version
  const r = await spawnCmd('npm', ['view', name, 'version'], 20_000)
  const version = r.ok && r.out ? r.out.split('\n')[0].trim() : null
  if (version) updateCache.set(name, { at: Date.now(), version })
  return version
}

// v0.6: 轻量 semver 比较（严格大于才算有更新）——本地 dev/link 高版本
// （如开发中 0.6.0 > 已发布 0.5.0）不应被误报「update → 旧版」
function semverGt(a, b) {
  const pa = String(a).split('.').map((x) => parseInt(x, 10) || 0)
  const pb = String(b).split('.').map((x) => parseInt(x, 10) || 0)
  for (let i = 0; i < 3; i++) { if (pa[i] !== pb[i]) return pa[i] > pb[i] }
  return false
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
      return { name, installed, latest, hasUpdate: !!(installed && latest && semverGt(latest, installed)) }
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

    // v0.8 ②: 流式安装 —— 原生 res 分块 NDJSON（{t:start}/{t:log}/{t:done,result}）。
    // 不放行缓存/压缩，x-accel-buffering 防代理缓冲。buffered /install 保持不变作回退。
    const disposeInstallStream = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/install-stream',
      handler: async (req, res) => {
        const body = await readJsonBody(req)
        const pkg = body && typeof body.pkg === 'string' && body.pkg.trim() ? body.pkg.trim() : null
        if (!pkg) return json(res, { ok: false, error: 'missing pkg' }, 400)
        const profile = typeof body.profile === 'string' && body.profile ? body.profile : currentProfile()
        try { req.socket.setNoDelay(true) } catch { /* noop */ }
        res.writeHead(200, { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-cache, no-transform', 'x-accel-buffering': 'no' })
        const send = (obj) => { try { res.write(JSON.stringify(obj) + '\n') } catch { /* client gone */ } }
        send({ t: 'start', spec: pkg })
        const r = await runInstall(pkg, profile, (line) => send({ t: 'log', line }))
        send({ t: 'done', result: r })
        res.end()
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
          const body = Buffer.from(JSON.stringify({ plugins, watchMeta: catalogCache.watchMeta || null }), 'utf8')
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

    const disposeUpdate = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/update',
      handler: async (req, res) => {
        const body = await readJsonBody(req)
        const name = body && typeof body.name === 'string' && body.name.trim() ? body.name.trim() : null
        if (!name) return json(res, { ok: false, error: 'missing name' }, 400)
        const profile = typeof body.profile === 'string' && body.profile ? body.profile : currentProfile()
        // Only allow upgrading a package a pending update actually exists for —
        // otherwise we would churn pnpm for nothing (or worse, install an
        // arbitrary package name the caller typed in).
        try {
          const pending = await computeUpdates(profile)
          const hit = pending.find((u) => u.name === name)
          if (!hit) return json(res, { ok: false, error: 'no pending update for ' + name }, 409)
          const r = await runInstall(name, profile)
          if (r.ok) updateCache.delete(name)
          json(res, { ...r, name, from: hit.installed, to: hit.latest })
        } catch (e) {
          json(res, { ok: false, error: String(e && e.message ? e.message : e) }, 500)
        }
      },
    })

    const disposeInstalled = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/installed',
      handler: (_req, res) => {
        const profile = currentProfile()
        const pkg = readProfilePkg(profile)
        const deps = pkg ? { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) } : {}
        const value = []
        for (const entry of ctx.loader.entries()) {
          if (entry.options.group) continue
          const name = entry.options.name
          value.push({
            name,
            id: entry.id,
            enabled: !entry.disabled,
            source: classifySource(name, deps[name] || ''),
            spec: deps[name] || '',
            version: installedVersion(profile, name),
          })
        }
        json(res, { ok: true, value })
      },
    })

    const disposeUninstall = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/uninstall',
      handler: async (req, res) => {
        const body = await readJsonBody(req)
        const pkg = body && typeof body.pkg === 'string' && body.pkg.trim() ? body.pkg.trim() : null
        if (!pkg) return json(res, { ok: false, error: 'missing pkg' }, 400)
        const profile = typeof body.profile === 'string' && body.profile ? body.profile : currentProfile()
        // `dsh plugin` is a thin pnpm forwarder: `remove <pkg>` == `pnpm remove <pkg>` + reconcile
        const r = await spawnCmd('dsh', ['plugin', '--profile', profile, 'remove', pkg], INSTALL_TIMEOUT_MS)
        json(res, { ok: r.ok, log: r.log, exitCode: r.exitCode, needRestart: r.ok, profile })
      },
    })

    // warm the catalog cache in the background so the first Store open is fast
    fetchCatalog().catch(() => {})

    return () => { disposeInstall(); disposeInstallStream(); disposeList(); disposeCatalog(); disposeUpdates(); disposeInstalled(); disposeUninstall(); disposeUpdate() }
  }, 'plugin-manager: routes')
}
