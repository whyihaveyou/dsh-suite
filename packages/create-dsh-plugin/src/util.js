// Zero-dependency helpers for create-dsh-plugin.
// All output/errors are bilingual-friendly; code comments stay English.
import { spawn } from 'node:child_process'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { constants as FSC } from 'node:fs'
import { dirname } from 'node:path'

export const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
}
export const paint = (color, text) => `${color}${text}${c.reset}`
export const ok = (t) => paint(c.green, t)
export const warn = (t) => paint(c.yellow, t)
export const err = (t) => paint(c.red, t)
export const info = (t) => paint(c.cyan, t)

export async function exists(p) {
  try { await access(p, FSC.F_OK); return true } catch { return false }
}

// Spawn a command, capture stdout+stderr, never throw. Returns
// { code, stdout, stderr } with code === -1 on spawn failure.
// On Windows npm/pnpm/npx are .cmd shims; plain spawn() can't resolve them
// without a shell, so force shell:true there (callers may still override).
export function spawnOpts(opts = {}) {
  return {
    stdio: ['ignore', 'pipe', 'pipe'],
    ...(process.platform === 'win32' ? { shell: true } : {}),
    ...opts,
  }
}

export function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, spawnOpts(opts))
    let out = ''
    let errout = ''
    child.stdout.on('data', (d) => { out += d })
    child.stderr.on('data', (d) => { errout += d })
    child.on('error', (e) => resolve({ code: -1, stdout: out, stderr: String(e) }))
    child.on('close', (code) => resolve({ code, stdout: out, stderr: errout }))
  })
}

export function which(cmd) {
  return run(process.platform === 'win32' ? 'where' : 'which', [cmd])
    .then((r) => r.code === 0 && r.stdout.trim().length > 0 ? r.stdout.trim().split(/\r?\n/)[0] : null)
}

/**
 * Resolve the CURRENT `next`-tag versions of the harness packages from npm.
 * This is the whole point of the scaffold: npm's `latest` dist-tag for
 * `@deepseek-ai/dsh-tools` is a STALE 0.0.1-rc.1; the real line lives under
 * the `next` tag (0.1.0-rc.x). We pin the resolved value EXACTLY so generated
 * projects never drift onto a broken/old version.
 * Falls back to bundled defaults when offline so a plain `generate` never fails.
 */
export async function resolveDshVersions() {
  const defaults = {
    dshTools: '0.1.0-rc.6',
    dshSession: '0.1.0-rc.6',
    cordis: '4.0.1',
    schemastery: '3.18.1',
    dsh: '0.1.0-rc.6',
  }
  const tag = async (pkg, tagName, fallback) => {
    // npm view <pkg> dist-tags.next  ->  "0.1.0-rc.6\n"
    const r = await run('npm', ['view', pkg, `dist-tags.${tagName}`, '--json'], { timeout: 15000 })
    if (r.code !== 0) return fallback
    try {
      const parsed = JSON.parse(r.stdout.trim())
      const v = typeof parsed === 'string' ? parsed : parsed[tagName]
      return v && typeof v === 'string' ? v : fallback
    } catch { return fallback }
  }
  const [dshTools, dshSession, cordis, schemastery, dsh] = await Promise.all([
    tag('@deepseek-ai/dsh-tools', 'next', defaults.dshTools),
    tag('@deepseek-ai/dsh-session', 'next', defaults.dshSession),
    tag('@deepseek-ai/cordis', 'latest', defaults.cordis),
    tag('@deepseek-ai/schemastery', 'latest', defaults.schemastery),
    tag('@deepseek-ai/dsh', 'next', defaults.dsh),
  ])
  return { dshTools, dshSession, cordis, schemastery, dsh }
}

export async function writeFileDeep(file, content) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content, 'utf8')
}

export async function readText(file) {
  return readFile(file, 'utf8')
}
