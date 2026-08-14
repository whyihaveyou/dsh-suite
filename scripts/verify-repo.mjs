#!/usr/bin/env node
/**
 * verify-repo.mjs — repo-level CI quality gate (push / PR).
 *
 * Five checks, all zero-dependency (Node built-ins only):
 *   1. test    — packages/create-dsh-plugin smoke tests (`pnpm test`, 7 cases)
 *   2. build   — packages/plugins/* `tsc` build (every plugin with real sources)
 *   3. readme  — gen-readme idempotency: re-run and assert `git diff --exit-code`
 *   4. data    — data/plugins.json structural validation (id uniqueness, enum
 *                legality, featured count)
 *   5. leak    — secret / absolute-path leak scan over files git would commit
 *
 * Usage:
 *   node scripts/verify-repo.mjs              # run all five
 *   node scripts/verify-repo.mjs --only test  # run one (test|build|readme|data|leak)
 *
 * Exits 0 when the selected checks all pass; 1 otherwise. Prints a per-check
 * PASS/FAIL line with elapsed time and, on failure, enough context to fix it.
 */
import { spawnSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DATA_PATH = join(ROOT, 'data', 'plugins.json')

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts })
  return { code: r.status ?? 1, stdout: r.stdout ?? '', stderr: r.stderr ?? '' }
}

function runOk(cmd, args, opts = {}) {
  const r = run(cmd, args, opts)
  if (r.code !== 0) {
    throw new Error(
      `command failed (${r.code}): ${cmd} ${args.join(' ')}\n${r.stdout}\n${r.stderr}`.slice(0, 4000),
    )
  }
  return r
}

const ts = () => Date.now()
function fmt(ms) { return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms` }

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

/** 1. create-dsh-plugin smoke tests. */
function checkTest() {
  const t0 = ts()
  const r = run('pnpm', ['test'], { cwd: join(ROOT, 'packages', 'create-dsh-plugin') })
  if (r.code !== 0) {
    throw new Error(`create-dsh-plugin smoke tests failed.\n${r.stdout}\n${r.stderr}`.slice(0, 4000))
  }
  const tally = (r.stdout.match(/# (tests|pass|fail|skipped) \d+/g) || []).join('  ')
  return { ms: ts() - t0, detail: tally || 'ok' }
}

/** 2. Every plugin under packages/plugins/ that has real TypeScript sources must build. */
function checkBuild() {
  const t0 = ts()
  const pluginsDir = join(ROOT, 'packages', 'plugins')
  const dirs = readdirSync(pluginsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()

  const built = []
  const skipped = []
  for (const name of dirs) {
    const dir = join(pluginsDir, name)
    const hasPkg = existsSync(join(dir, 'package.json'))
    // A plugin is buildable only when it has actual .ts sources. An empty
    // src/ (scaffold just started) or a placeholder (.gitkeep only) is skipped,
    // not failed — otherwise a teammate's in-flight WIP blocks everyone's PR.
    const srcDir = join(dir, 'src')
    const hasSrcTs = existsSync(srcDir) && readdirSync(srcDir).some((f) => f.endsWith('.ts'))
    if (!hasPkg || !hasSrcTs) {
      skipped.push(name)
      continue
    }
    const r = run('pnpm', ['build'], { cwd: dir })
    if (r.code !== 0) {
      throw new Error(`plugin build failed: ${name}\n${r.stdout}\n${r.stderr}`.slice(0, 4000))
    }
    built.push(name)
  }

  const ms = ts() - t0
  const detail = `built: ${built.join(', ') || '(none)'}`
  return { ms, detail: skipped.length ? `${detail} | skipped(no ts sources): ${skipped.join(', ')}` : detail }
}

/** 3. gen-readme idempotency — README must already match data/plugins.json. */
function checkReadme() {
  const t0 = ts()
  runOk('node', ['scripts/gen-readme.mjs'], { cwd: ROOT })
  const r = run('git', ['diff', '--exit-code', '--', 'README.md', 'README.en.md'], { cwd: ROOT })
  const ms = ts() - t0
  if (r.code !== 0) {
    const detail = (r.stdout || '').split('\n').slice(0, 40).join('\n')
    const err = new Error(
      'README drift: data/plugins.json changed but README.md / README.en.md were not regenerated.\n' +
      'Fix: run `node scripts/gen-readme.mjs` and commit the regenerated READMEs.\n' +
      `--- diff (first 40 lines) ---\n${detail}`,
    )
    err.ms = ms
    throw err
  }
  return { ms, detail: 'README in sync with data/plugins.json' }
}

/** 4. data/plugins.json structural validation. */
function checkData() {
  const t0 = ts()
  const CATEGORIES = ['tools', 'skills', 'ui', 'skin', 'session', 'llm', 'sandbox', 'orchestration', 'storage', 'acp', 'preset', 'utility']
  const COMPAT_STATUSES = ['unknown', 'ok', 'broken', 'unmaintained']
  const WATCH_REASONS = ['占位', '工具链', '蹭tag']
  const MIN_FEATURED = 15

  let data
  try {
    data = JSON.parse(readFileSync(DATA_PATH, 'utf8'))
  } catch (e) {
    throw new Error(`data/plugins.json is not valid JSON: ${e.message}`)
  }

  const plugins = Array.isArray(data.plugins) ? data.plugins : null
  const watchlist = Array.isArray(data.watchlist) ? data.watchlist : []
  if (!plugins) throw new Error('data/plugins.json: `plugins` must be an array')

  const problems = []

  const seen = new Map()
  for (const [section, list] of [['plugins', plugins], ['watchlist', watchlist]]) {
    for (const p of list) {
      const id = p && p.id
      if (typeof id !== 'string' || id === '') {
        problems.push(`${section}: entry missing a string \`id\``)
        continue
      }
      if (seen.has(id)) problems.push(`${section}: duplicate id "${id}" (also in ${seen.get(id)})`)
      else seen.set(id, section)
    }
  }

  for (const p of plugins) {
    if (p.category && !CATEGORIES.includes(p.category)) {
      problems.push(`plugin "${p.id}": unknown category "${p.category}"`)
    }
    const st = p.compat && p.compat.status
    if (st && !COMPAT_STATUSES.includes(st)) {
      problems.push(`plugin "${p.id}": illegal compat.status "${st}"`)
    }
  }
  for (const w of watchlist) {
    if (w.category && !CATEGORIES.includes(w.category)) {
      problems.push(`watchlist "${w.id}": unknown category "${w.category}"`)
    }
    if (w.watchReason && !WATCH_REASONS.includes(w.watchReason)) {
      problems.push(`watchlist "${w.id}": illegal watchReason "${w.watchReason}"`)
    }
  }

  // Featured is curated by hand and grows over time — assert a floor plus a
  // completeness contract instead of an exact count (a hardcoded number goes
  // stale the moment someone features one more plugin).
  const featuredEntries = plugins.filter((p) => p.featured)
  const featured = featuredEntries.length
  if (featured < MIN_FEATURED) {
    problems.push(`featured count ${featured} < MIN_FEATURED=${MIN_FEATURED} — curation floor breached`)
  }
  for (const p of featuredEntries) {
    if (typeof p.name !== 'string' || p.name === '') problems.push(`featured "${p.id}": missing \`name\``)
    const desc = p.description || {}
    if (typeof desc.en !== 'string' || desc.en === '') problems.push(`featured "${p.id}": missing description.en`)
    if (typeof desc.zh !== 'string' || desc.zh === '') problems.push(`featured "${p.id}": missing description.zh`)
    if (typeof p.stars !== 'number' || !(p.stars >= 0)) problems.push(`featured "${p.id}": stars must be a non-negative number`)
    if (!p.url && !p.repo) problems.push(`featured "${p.id}": needs \`url\` or \`repo\``)
  }

  const ms = ts() - t0
  if (problems.length) {
    const err = new Error(`data/plugins.json validation failed (${problems.length}):\n  - ${problems.join('\n  - ')}`)
    err.ms = ms
    throw err
  }
  return {
    ms,
    detail: `${plugins.length} plugins + ${watchlist.length} watchlist, ${featured} featured, ids unique, enums legal`,
  }
}

/** 5. Leak scan: no absolute home paths or real-secret patterns in committed files. */
function checkLeak() {
  const t0 = ts()

  // The home-path and key patterns are assembled from fragments so a literal
  // absolute home path and a runnable API key never appear verbatim in this
  // source (otherwise this very file would match its own leak scan).
  const PATTERNS = [
    { name: 'absolute home path', re: new RegExp('/' + 'Users' + '/') },
    { name: 'API key (sk-…)', re: new RegExp('sk-' + '[A-Za-z0-9]{16,}') },
    { name: 'GitHub PAT (ghp_…)', re: /ghp_[A-Za-z0-9]{20,}/ },
    { name: 'GitHub PAT (github_pat_…)', re: /github_pat_[A-Za-z0-9_]{20,}/ },
    { name: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/ },
    { name: 'private key block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  ]
  const BINARY_EXT = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'ico', 'pdf', 'woff', 'woff2', 'ttf', 'otf', 'mp4', 'mov'])

  let files
  try {
    const tracked = runOk('git', ['ls-files'], { cwd: ROOT }).stdout.trim().split('\n').filter(Boolean)
    const untracked = runOk('git', ['ls-files', '--others', '--exclude-standard'], { cwd: ROOT })
      .stdout.trim().split('\n').filter(Boolean)
    files = [...new Set([...tracked, ...untracked])]
  } catch (e) {
    throw new Error(`leak scan: could not list git files — ${e.message}`)
  }

  const hits = []
  for (const rel of files) {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) continue
    const ext = rel.split('.').pop().toLowerCase()
    if (BINARY_EXT.has(ext)) continue
    let buf
    try { buf = readFileSync(abs) } catch { continue }
    if (buf.subarray(0, 8192).includes(0)) continue
    const text = buf.toString('utf8')
    for (const { name, re } of PATTERNS) {
      if (re.test(text)) {
        const lines = text.split('\n')
        const lineNo = lines.findIndex((l) => re.test(l))
        hits.push(`${rel}:${lineNo + 1}  (${name})`)
      }
    }
  }

  const ms = ts() - t0
  if (hits.length) {
    const err = new Error(`leak scan: ${hits.length} potential leak(s):\n  ${hits.join('\n  ')}`)
    err.ms = ms
    throw err
  }
  return { ms, detail: `${files.length} files scanned, no leaks` }
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

const CHECKS = { test: checkTest, build: checkBuild, readme: checkReadme, data: checkData, leak: checkLeak }

function main() {
  const args = process.argv.slice(2)
  const onlyIdx = args.indexOf('--only')
  const only = onlyIdx !== -1 ? args[onlyIdx + 1] : null

  if (only && !CHECKS[only]) {
    console.error(`unknown check "${only}" — choose: ${Object.keys(CHECKS).join(' | ')}`)
    process.exit(2)
  }

  const names = only ? [only] : Object.keys(CHECKS)
  let failed = 0

  for (const name of names) {
    const t0 = ts()
    try {
      const { ms, detail } = CHECKS[name]()
      console.log(`✔ ${name.padEnd(7)} ${fmt(ms).padStart(6)}  ${detail}`)
    } catch (e) {
      failed += 1
      console.log(`✘ ${name.padEnd(7)} ${fmt(e.ms ?? ts() - t0).padStart(6)}  FAILED`)
      console.log(`\n  ${String(e.message).split('\n').join('\n  ')}\n`)
    }
  }

  console.log(`\nverify-repo: ${failed === 0 ? 'ALL GREEN' : `${failed} check(s) FAILED`}`)
  process.exit(failed === 0 ? 0 : 1)
}

main()
