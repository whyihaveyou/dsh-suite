// plugin-manager host half — the "install" capability + installed list.
// Runs in the DSH host (Node) process; the browser half can only reach these
// operations through the /plugin-manager/* routes registered below (a browser
// cannot spawn `dsh plugin add` itself).
//
// Design principles honoured: registrations are effects returning disposers
// (webServer.register returns a disposer; all three are unwound in one
// ctx.effect); dependencies are declared via `inject`, never looked up
// optimistically; install is an external emission (side effect) that is
// reported, never silently swallowed.

import { spawn } from 'node:child_process'

export const name = 'plugin-manager'
export const inject = ['webServer', 'loader']

/** Install timeout (ms) — mirrors the spec's installTimeoutMs default. */
const INSTALL_TIMEOUT_MS = 120_000

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
    if (total > 1 << 20) return null // 1 MiB cap
  }
  const text = Buffer.concat(chunks).toString('utf8')
  if (!text) return null
  try { return JSON.parse(text) } catch { return null }
}

// Spawn the official `dsh plugin add` (reuse the CLI mechanism, never roll our
// own installer). Resolves with an envelope { ok, log, exitCode, needRestart }.
function runInstall(pkg, profile) {
  return new Promise((resolve) => {
    const child = spawn('dsh', ['plugin', '--profile', profile, 'add', pkg], {
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let out = ''
    let err = ''
    child.stdout.on('data', (d) => { out += d })
    child.stderr.on('data', (d) => { err += d })
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      resolve({ ok: false, log: (out + err).trim() || 'install timed out', exitCode: null, needRestart: false, timedOut: true })
    }, INSTALL_TIMEOUT_MS)
    child.on('error', (e) => {
      clearTimeout(timer)
      resolve({ ok: false, log: `spawn failed: ${e.message}`, exitCode: null, needRestart: false, timedOut: false })
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      resolve({ ok: code === 0, log: (out + err).trim(), exitCode: code, needRestart: code === 0, timedOut: false })
    })
  })
}

export function apply(ctx) {
  ctx.effect(() => {
    // POST /plugin-manager/install  { pkg, profile? } -> { ok, log, exitCode, needRestart, timedOut }
    const disposeInstall = ctx.webServer.register({
      kind: 'exact',
      path: '/plugin-manager/install',
      handler: async (req, res) => {
        const body = await readJsonBody(req)
        const pkg = body && typeof body.pkg === 'string' && body.pkg.trim() ? body.pkg.trim() : null
        if (!pkg) return json(res, { ok: false, error: 'missing pkg' }, 400)
        const profile = typeof body.profile === 'string' && body.profile ? body.profile : 'web'
        const result = await runInstall(pkg, profile)
        json(res, result)
      },
    })

    // GET /plugin-manager/list -> { ok, value: [{ name, id, enabled }] }
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

    return () => { disposeInstall(); disposeList() }
  }, 'plugin-manager: routes')
}
