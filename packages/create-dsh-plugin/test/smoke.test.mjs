// Smoke tests for create-dsh-plugin. Fast + deterministic by default; the full
// `--verify` load sequence (pnpm install → tsc build → dsh plugin add) is gated
// behind DSH_SMOKE_VERIFY=1 because it needs pnpm on PATH and network access.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { spawnOpts } from '../src/util.js'

const here = dirname(fileURLToPath(import.meta.url))
const CLI = join(here, '..', 'src', 'cli.js')

function runCli(args, opts = {}) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8', ...opts })
}

// Generate one template into a fresh temp dir and return the output dir.
function generate(template, name, extra = []) {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-scaffold-'))
  const r = runCli([dir, '-t', template, '-n', name, ...extra, '--yes'])
  assert.equal(r.status, 0, `generate ${template} failed:\n${r.stdout}\n${r.stderr}`)
  return dir
}

function read(dir, file) {
  return readFileSync(join(dir, file), 'utf8')
}

test('--version prints a semver', () => {
  const r = runCli(['--version'])
  assert.equal(r.status, 0)
  assert.match(r.stdout.trim(), /^\d+\.\d+\.\d+/)
})

test('--help renders bilingual usage', () => {
  const r = runCli(['--help'])
  assert.equal(r.status, 0)
  assert.match(r.stdout, /Usage/)
  assert.match(r.stdout, /用法/)
})

test('generates the tool template with a non-stale dsh-tools pin', () => {
  const dir = generate('tool', 'verify-tool', ['--plugin-id', 'verify-tool', '--tool-name', 'verify_time'])
  try {
    // No leftover {{token}} anywhere.
    for (const f of ['package.json', 'cordis.patch.yml', 'src/index.ts', 'README.md', 'tsconfig.json']) {
      assert.ok(!read(dir, f).includes('{{'), `${f} has a leftover {{token}}`)
    }
    const pkg = JSON.parse(read(dir, 'package.json'))
    assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml', 'missing dsh.bundle manifest')
    const dep = pkg.dependencies['@deepseek-ai/dsh-tools']
    assert.ok(dep, 'dsh-tools must be a runtime dependency for the tool template')
    assert.notEqual(dep, '0.0.1-rc.1', 'STALE dsh-tools version (npm latest tag) leaked through')
    assert.match(dep, /^\d+\.\d+\.\d+/, 'dsh-tools should be pinned exactly')
    assert.match(read(dir, 'cordis.patch.yml'), /- insert:/)
    assert.match(read(dir, 'cordis.patch.yml'), /name: verify-tool/, 'patch name must be the package name')
    assert.match(read(dir, 'src/index.ts'), /defineTool/)
    assert.match(read(dir, 'src/index.ts'), /export const name = 'verify-tool'/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('generates the events template with zero runtime dependencies', () => {
  const dir = generate('events', 'verify-events', ['--plugin-id', 'verify-events'])
  try {
    const pkg = JSON.parse(read(dir, 'package.json'))
    assert.deepEqual(pkg.dependencies ?? {}, {}, 'events template must have NO runtime deps')
    const dev = pkg.devDependencies['@deepseek-ai/dsh-tools']
    assert.ok(dev, 'dsh-tools should be a devDependency (types only) for events')
    assert.notEqual(dev, '0.0.1-rc.1', 'STALE dsh-tools version leaked through')
    assert.match(read(dir, 'src/index.ts'), /ctx\.on\(/)
    assert.match(read(dir, 'src/index.ts'), /ctx\.effect\(/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('generates the webui template with a card presenter', () => {
  const dir = generate('webui', 'verify-webui', ['--plugin-id', 'verify-webui', '--tool-name', 'verify_note'])
  try {
    const src = read(dir, 'src/index.ts')
    assert.match(src, /defineTool/)
    assert.match(src, /presentCall/)
    assert.match(src, /presentResult/)
    const pkg = JSON.parse(read(dir, 'package.json'))
    assert.notEqual(pkg.dependencies['@deepseek-ai/dsh-tools'], '0.0.1-rc.1', 'STALE dsh-tools version')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('refuses to overwrite a non-empty directory', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-scaffold-'))
  try {
    writeFileSync(join(dir, 'existing.txt'), 'occupied') // make it non-empty
    const r = runCli([dir, '-t', 'tool', '--yes'])
    assert.notEqual(r.status, 0, 'must refuse to overwrite a non-empty dir')
    assert.match(r.stdout + r.stderr, /not empty|非空/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

// Full load verification — opt-in because it shells out to pnpm + npx.
// Run with: DSH_SMOKE_VERIFY=1 node --test test/
const verifyTest = process.env.DSH_SMOKE_VERIFY === '1' ? test : test.skip
verifyTest('--verify: build + dsh plugin add + dump-config (needs pnpm + network)', { timeout: 300_000 }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'dsh-verify-'))
  try {
    const r = runCli([dir, '-t', 'tool', '-n', 'verify-full', '--plugin-id', 'verify-full', '--tool-name', 'verify_time', '--yes', '--verify'], { timeout: 300_000 })
    assert.equal(r.status, 0, `--verify failed:\n${r.stdout}\n${r.stderr}`)
    assert.match(r.stdout, /VERIFY PASSED/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})


test('spawnOpts forces shell:true on Windows (.cmd shims for pnpm/npm/npx)', () => {
  const opts = spawnOpts()
  if (process.platform === 'win32') {
    assert.equal(opts.shell, true, 'Windows needs shell:true to resolve pnpm.cmd / npm.cmd')
  } else {
    assert.notEqual(opts.shell, true, 'POSIX must not enable the shell')
  }
})
