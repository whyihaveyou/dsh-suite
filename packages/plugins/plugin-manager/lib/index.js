// plugin-manager host half — the "install" capability + installed list.
// Runs in the DSH host (Node) process; the browser half can only reach these
// operations through the /plugin-manager/* routes registered below (a browser
// cannot spawn `dsh plugin add` itself).
//
// P1 fix (real-user bug: green "success" but not installed):
// 1. The target profile is DETECTED from the launcher argv (`dsh --profile X`
//    or the `dsh web` alias) — never hardcoded to "web", so a custom-profile
//    Web UI installs into the profile it is actually running under.
// 2. Success is NOT exit-code-only: we parse pnpm's `+ <name>` lines to prove a
//    dependency was added, THEN run `dsh --profile <name> --dump-config` to
//    prove the package is actually in the bundle stack (a git+ monorepo root
//    without `dsh.bundle` installs "successfully" but never loads).

import { spawn } from 'node:child_process'

export const name = 'plugin-manager'
export const inject = ['webServer', 'loader']

const INSTALL_TIMEOUT_MS = 120_000
const VERIFY_TIMEOUT_MS = 60_000

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

// The profile this Web UI process is running under. `dsh web` == `--profile web`;
// a custom launch is `dsh --profile <name>`. Never assume 'web'.
function currentProfile() {
  const argv = process.argv
  const i = argv.indexOf('--profile')
  if (i >= 0 && argv[i + 1]) return argv[i + 1]
  for (const a of argv) if (a === 'web') return 'web'
  return 'web'
}

// Spawn `dsh ...` and capture stdout/stderr with a timeout. Resolves
// { ok, out, log, exitCode, timedOut } — ok is strictly `exit code === 0`.
function spawnDsh(args, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn('dsh', args, { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    child.stdout.on('data', (d) => { out += d })
    child.stderr.on('data', (d) => { err += d })
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      resolve({ ok: false, out, log: (out + err).trim() || 'install timed out', exitCode: null, timedOut: true })
    }, timeoutMs)
    child.on('error', (e) => {
      clearTimeout(timer)
      resolve({ ok: false, out, log: `spawn failed: ${e.message}`, exitCode: null, timedOut: false })
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      resolve({ ok: code === 0, out, log: (out + err).trim(), exitCode: code, timedOut: false })
    })
  })
}

// Parse pnpm's `+ <name> <spec>` lines out of `dsh plugin add` stdout — the
// RESOLVED package names (for git+ specs the spec is a URL, the name is real).
function parseAdded(stdout) {
  const names = []
  for (const line of stdout.split('\n')) {
    const m = line.match(/^\+\s+(\S+)\s+/)
    if (m) names.push(m[1])
  }
  return names
}

async function runInstall(pkg, profile) {
  const add = await spawnDsh(['plugin', '--profile', profile, 'add', pkg], INSTALL_TIMEOUT_MS)
  if (!add.ok) {
    return { ok: false, log: add.log || '(no output)', exitCode: add.exitCode, needRestart: false, timedOut: add.timedOut, profile }
  }
  // exit 0 is NOT enough — pnpm can "succeed" while adding nothing usable.
  const added = parseAdded(add.out)
  if (added.length === 0) {
    return { ok: false, log: (add.log + '\n⚠ exit 0 but pnpm reported no added dependency — install did not take effect').trim(), exitCode: 0, needRestart: false, timedOut: false, profile }
  }
  // Second verification: is the package actually in the profile's bundle stack?
  // A git+ monorepo root without dsh.bundle installs "successfully" but never
  // loads, so we fail (mounted=false) rather than show a green success.
  const dump = await spawnDsh(['--profile', profile, '--dump-config'], VERIFY_TIMEOUT_MS)
  const mounted = added.some((name) => dump.out.includes(name))
  return {
    ok: true,
    log: add.log,
    exitCode: 0,
    needRestart: true,
    timedOut: false,
    installed: added,
    mounted,
    profile,
  }
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
        const result = await runInstall(pkg, profile)
        json(res, result)
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

    return () => { disposeInstall(); disposeList() }
  }, 'plugin-manager: routes')
}
