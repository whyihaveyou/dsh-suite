// --verify: after generation, prove the plugin actually loads into a real DSH
// profile by reusing the exact sequence validated on the spike:
//   install → build (tsc) → `dsh plugin add` into a temp profile → dump-config.
import { tmpdir } from 'node:os'
import { mkdtemp, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { c, paint, ok, warn, err, run, which } from './util.js'

function fail(stage, r) {
  console.log(err(`✘ VERIFY FAILED at "${stage}"`))
  if (r?.stdout?.trim()) console.log(paint(c.dim, r.stdout.trim().slice(-2000)))
  if (r?.stderr?.trim()) console.log(paint(c.dim, r.stderr.trim().slice(-2000)))
  return false
}

export async function verify({ cfg, targetAbs }) {
  console.log(`\n${paint(c.cyan, '✦ --verify — build + install into a temp profile + dump-config')}`)

  // `dsh plugin add` forwards to pnpm; prefer pnpm for install too (matches DSH).
  const pnpm = await which('pnpm')
  if (!pnpm) console.log(warn('⚠ pnpm not found on PATH — `dsh plugin add` needs it; install via corepack. Continuing with npm for the project build.'))
  const pm = pnpm ? 'pnpm' : 'npm'
  const cwd = dirname(targetAbs)
  const env = process.env

  // [1/4] install
  console.log(paint(c.dim, `\n[1/4] ${pm} install  →  ${targetAbs}`))
  let r = await run(pm, ['install'], { cwd: targetAbs, timeout: 300000, env })
  if (r.code !== 0) return fail(`${pm} install`, r)
  console.log(ok('✔ install ok'))

  // [2/4] build (tsc)
  console.log(paint(c.dim, `\n[2/4] ${pm} run build`))
  r = await run(pm, ['run', 'build'], { cwd: targetAbs, timeout: 180000, env })
  if (r.code !== 0) return fail(`${pm} run build`, r)
  console.log(ok('✔ build ok (tsc → dist/)'))

  // [3/4] install into a temp profile via dsh plugin add
  console.log(paint(c.dim, '\n[3/4] dsh plugin add → temp profile'))
  const dshHome = await mkdtemp(join(tmpdir(), 'dsh-verify-'))
  const profile = 'verify'
  r = await run('npx', ['-y', '@deepseek-ai/dsh', 'plugin', '--profile', profile, 'add', targetAbs], {
    cwd, timeout: 300000, env: { ...env, DSH_HOME: dshHome },
  })
  if (r.code !== 0) { await rm(dshHome, { recursive: true, force: true }); return fail('dsh plugin add', r) }
  console.log(ok('✔ dsh plugin add ok'))

  // [4/4] dump-config must contain the plugin row
  console.log(paint(c.dim, '\n[4/4] dump-config → check plugin row'))
  r = await run('npx', ['-y', '@deepseek-ai/dsh', '--profile', profile, '--dump-config'], {
    cwd, timeout: 120000, env: { ...env, DSH_HOME: dshHome },
  })
  await rm(dshHome, { recursive: true, force: true })
  const found = r.stdout.includes(cfg.pluginId) || r.stdout.includes(cfg.name)
  if (r.code !== 0 || !found) return fail('dump-config (plugin row not found)', r)
  console.log(ok(`✔ dump-config contains plugin row "${cfg.pluginId}"`))

  console.log(`\n${ok('✔ VERIFY PASSED — the plugin compiles and loads into a real DSH profile (验证通过)')}`)
  return true
}
