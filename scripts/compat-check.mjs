#!/usr/bin/env node
/**
 * compat-check.mjs — daily compatibility check for the dsh-suite directory.
 *
 * Three layers, all key-free (no DEEPSEEK_API_KEY, no model boot):
 *   Layer 1  Static peer comparison — `npm view <name> peerDependencies engines`
 *            vs the latest @deepseek-ai/cordis + local Node.        [IMPLEMENTED]
 *   Layer 2  Install check — `dsh plugin --profile <tmp> add <spec>`
 *            into a throwaway DSH_HOME profile.                     [IMPLEMENTED]
 *   Layer 3  Config assembly check — `dsh --profile <tmp> --dump-config`
 *            must exit 0 and list the plugin.                       [IMPLEMENTED]
 *
 * Zero runtime dependencies: Node built-ins only (spawns `npm view` / `npx dsh`).
 *
 * Usage:
 *   node scripts/compat-check.mjs                    # layer 1, write report, print
 *   node scripts/compat-check.mjs --layers 1|2|3|all
 *   node scripts/compat-check.mjs --write            # persist ok/broken into data/plugins.json
 *   node scripts/compat-check.mjs --scope auto       # frequency tiers (default)
 *   node scripts/compat-check.mjs --concurrency 16   # layer-1 npm-view concurrency
 *   node scripts/compat-check.mjs --install-concurrency 4   # layer-2 install concurrency (<=4)
 *
 * Layer 2/3 selection tiers (--scope):
 *   auto   (default, for CI): daily tier (featured + stars>=50 npm entries)
 *          + weekly npm shard (remaining npm entries, 7 shards by id hash,
 *          one per UTC weekday) + weekly git tier on Sunday (featured/top-star
 *          git-source entries).
 *   daily  : daily tier only.
 *   weekly : daily tier + today's npm shard (no git).
 *   git    : git tier only (use --shard to force a weekday).
 *   all    : every npm entry + git tier (debug / manual full sweep).
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_PATH = join(ROOT, 'data', 'plugins.json');
const REPORT_PATH = join(ROOT, 'data', 'compat-report.json');
const INSTALLED_PATH = join(ROOT, 'data', 'compat-installed.json');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = {
    layers: '1', write: false, concurrency: 12,
    scope: 'auto', shard: null, installConcurrency: 4,
    addTimeout: 120, gitTimeout: 600, keepTmp: false,
    data: null, ids: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--layers' && argv[i + 1]) args.layers = argv[++i];
    else if (a === '--data' && argv[i + 1]) args.data = argv[++i];
    else if (a === '--ids' && argv[i + 1]) args.ids = argv[++i];
    else if (a === '--write') args.write = true;
    else if (a === '--concurrency' && argv[i + 1]) args.concurrency = Number(argv[++i]);
    else if (a === '--scope' && argv[i + 1]) args.scope = argv[++i];
    else if (a === '--shard' && argv[i + 1]) args.shard = Number(argv[++i]);
    else if (a === '--install-concurrency' && argv[i + 1]) args.installConcurrency = Number(argv[++i]);
    else if (a === '--add-timeout' && argv[i + 1]) args.addTimeout = Number(argv[++i]);
    else if (a === '--git-timeout' && argv[i + 1]) args.gitTimeout = Number(argv[++i]);
    else if (a === '--keep-tmp') args.keepTmp = true;
    else if (a === '--help' || a === '-h') { printHelp(); process.exit(0); }
  }
  args.installConcurrency = Math.max(1, Math.min(4, args.installConcurrency));
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/compat-check.mjs [--layers 1|2|3|all] [--write]
  [--scope auto|daily|weekly|git|all] [--shard 0-6]
  [--concurrency N] [--install-concurrency 1-4]
  [--add-timeout SEC] [--git-timeout SEC] [--keep-tmp]
  [--data <path>]   override data/plugins.json (debug/tests)
  [--ids a,b,c]     only process these plugin ids (debug/CI recheck)`);
}

// ---------------------------------------------------------------------------
// Minimal semver (subset sufficient for peerDependencies / engines ranges).
// satisfies() returns true | false | null (null = range unparseable -> don't judge).
// ---------------------------------------------------------------------------
function parseVersion(v) {
  if (typeof v !== 'string') return null;
  const m = v.trim().match(/^[v=]?(\d+)\.(\d+)\.(\d+)(?:[-+][0-9A-Za-z.-]+)?/);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: '' };
}

function cmp(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  return 0;
}

function satisfies(version, range) {
  const v = parseVersion(version);
  if (!v) return null;
  range = String(range || '').trim();
  if (range === '' || range === '*' || range === 'x' || range === 'latest' || range === 'any') return true;

  const ors = range.split('||').map((s) => s.trim()).filter(Boolean);
  if (ors.length === 0) return null;

  let sawNull = false;
  for (const orPart of ors) {
    const ands = orPart.split(/\s+/).filter(Boolean);
    let partOk = true;
    for (const raw of ands) {
      const r = cmpSatisfies(v, raw);
      if (r === null) { sawNull = true; partOk = false; break; }
      if (r === false) { partOk = false; break; }
    }
    if (partOk) return true;
  }
  return sawNull ? null : false;
}

function cmpSatisfies(v, raw) {
  let m;
  const r = raw.replace(/^=/, '');
  if ((m = r.match(/^\^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/))) {
    const maj = +m[1], min = m[2] !== undefined ? +m[2] : 0, pat = m[3] !== undefined ? +m[3] : 0;
    const lo = { major: maj, minor: min, patch: pat };
    let hi;
    if (maj > 0) hi = { major: maj + 1, minor: 0, patch: 0 };
    else if (min > 0) hi = { major: 0, minor: min + 1, patch: 0 };
    else hi = { major: 0, minor: 0, patch: pat + 1 };
    return cmp(v, lo) >= 0 && cmp(v, hi) < 0;
  }
  if ((m = r.match(/^~(\d+)\.(\d+)(?:\.(\d+))?$/))) {
    const maj = +m[1], min = +m[2], pat = m[3] !== undefined ? +m[3] : 0;
    const lo = { major: maj, minor: min, patch: pat };
    const hi = { major: maj, minor: min + 1, patch: 0 };
    return cmp(v, lo) >= 0 && cmp(v, hi) < 0;
  }
  if ((m = r.match(/^>=?\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?$/))) {
    const t = { major: +m[1], minor: m[2] !== undefined ? +m[2] : 0, patch: m[3] !== undefined ? +m[3] : 0 };
    return r.startsWith('>=') ? cmp(v, t) >= 0 : cmp(v, t) > 0;
  }
  if ((m = r.match(/^<=?\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?$/))) {
    const t = { major: +m[1], minor: m[2] !== undefined ? +m[2] : 0, patch: m[3] !== undefined ? +m[3] : 0 };
    return r.startsWith('<=') ? cmp(v, t) <= 0 : cmp(v, t) < 0;
  }
  if (/^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/.test(r)) {
    const pm = r.match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/);
    // bare "22" or "22.1" or "22.1.0" — treat missing parts as exact on that prefix
    const t = { major: +pm[1], minor: pm[2] !== undefined ? +pm[2] : 0, patch: pm[3] !== undefined ? +pm[3] : 0 };
    if (pm[2] === undefined) {
      // ">=22" handled above; a bare "22" here means 22.x
      return v.major === t.major;
    }
    if (pm[3] === undefined) {
      return v.major === t.major && v.minor === t.minor;
    }
    return cmp(v, t) === 0;
  }
  if (/^\d+(?:\.\d+)?\.x$/.test(r)) {
    const xm = r.match(/^(\d+)(?:\.(\d+))?\.x$/);
    if (xm[2] === undefined) return v.major === +xm[1];
    return v.major === +xm[1] && v.minor === +xm[2];
  }
  return null; // unparseable -> don't judge
}

// ---------------------------------------------------------------------------
// npm helper
// ---------------------------------------------------------------------------
function npmViewJson(pkg, fields, timeoutMs = 12000) {
  try {
    const out = execFileSync('npm', ['view', pkg, ...fields, '--json'], {
      encoding: 'utf8',
      timeout: timeoutMs,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { ok: true, data: JSON.parse(out) };
  } catch (e) {
    const stderr = (e.stderr || '').toString();
    const stdout = (e.stdout || '').toString();
    const msg = `${stderr}${stdout}`;
    const notFound = /E404|404 Not Found|not in this registry|No match found/i.test(msg);
    return { ok: false, notFound, error: msg.slice(0, 200) };
  }
}

// Async variant used by layer 1 so its concurrency limit is real (the sync
// version blocks the event loop and turns the worker pool into a queue).
function npmViewJsonAsync(pkg, fields, timeoutMs = 25000) {
  return new Promise((resolve) => {
    const child = spawn('npm', ['view', pkg, ...fields, '--json'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '', stderr = '', done = false;
    const timer = setTimeout(() => {
      if (done) return; done = true;
      try { child.kill('SIGKILL'); } catch { /* gone */ }
      resolve({ ok: false, notFound: false, error: `npm view timeout after ${timeoutMs}ms` });
    }, timeoutMs);
    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });
    child.on('error', (e) => {
      if (done) return; done = true; clearTimeout(timer);
      resolve({ ok: false, notFound: false, error: `spawn npm failed: ${e.message}` });
    });
    child.on('close', (code) => {
      if (done) return; done = true; clearTimeout(timer);
      if (code !== 0) {
        const msg = `${stderr}${stdout}`;
        const notFound = /E404|404 Not Found|not in this registry|No match found/i.test(msg);
        resolve({ ok: false, notFound, error: msg.slice(0, 200) });
        return;
      }
      try { resolve({ ok: true, data: JSON.parse(stdout) }); }
      catch { resolve({ ok: false, notFound: false, error: 'invalid JSON from npm view' }); }
    });
  });
}

// ---------------------------------------------------------------------------
// Layer 1: static peer comparison (implemented)
// ---------------------------------------------------------------------------
function isNpmTarget(name) {
  if (!name) return false;
  if (/^(https?:|git\+|file:|workspace:|link:)/i.test(name)) return false;
  if (name.startsWith('@')) return true; // scoped package: @scope/name (contains '/', must check first)
  if (name.includes('/')) return false; // non-scoped bare slash -> owner/repo git path
  return true;
}

async function layer1One(plugin, ctx) {
  const { cordisVersion, dshVersion, nodeVersion } = ctx;
  const section = plugin._section || 'catalog';
  const npmName = (plugin.npm || plugin.name || '').toLowerCase();

  if (!isNpmTarget(plugin.npm || plugin.name)) {
    return { id: plugin.id, name: plugin.name, section, verdict: 'skipped', note: 'not npm-distributed (git/file/url specifier)' };
  }

  const res = await npmViewJsonAsync(npmName, ['peerDependencies', 'engines', 'version']);
  if (!res.ok) {
    return {
      id: plugin.id, name: plugin.name, npmName, section, verdict: 'unavailable',
      note: res.notFound ? 'npm package not found (unpublished or GitHub-only)' : `npm view failed: ${res.error}`,
    };
  }

  const d = res.data;
  const peers = d.peerDependencies || {};
  const engines = d.engines || {};
  const peerCordis = peers['@deepseek-ai/cordis'];
  const peerDsh = peers['@deepseek-ai/dsh'];
  const nodeRange = engines.node;

  const cordisR = peerCordis ? satisfies(cordisVersion, peerCordis) : null;
  const dshR = peerDsh ? satisfies(dshVersion, peerDsh) : null;
  const nodeR = nodeRange ? satisfies(nodeVersion, nodeRange) : null;

  // "ok" requires a *positive* DSH-related peer signal (cordis or dsh).
  // "broken" on any failing constraint. Otherwise "unknown" (can't judge).
  let verdict = 'unknown';
  let note = '';

  if (cordisR === false) {
    verdict = 'broken';
    note = `cordis ${cordisVersion} not in peer "${peerCordis}"`;
  } else if (dshR === false) {
    verdict = 'broken';
    note = `@deepseek-ai/dsh ${dshVersion} not in peer "${peerDsh}"`;
  } else if (nodeR === false) {
    verdict = 'broken';
    note = `node ${nodeVersion} not in engines "${nodeRange}"`;
  } else if (cordisR === true || dshR === true) {
    verdict = 'ok';
  } else if (peerCordis || peerDsh) {
    note = `unparseable peer range (cordis="${peerCordis}" dsh="${peerDsh}")`;
  } else {
    note = 'no @deepseek-ai/cordis or @deepseek-ai/dsh peer dep (cannot judge statically)';
  }

  return {
    id: plugin.id, name: plugin.name, npmName, section, verdict, note,
    pkgVersion: typeof d.version === 'string' ? d.version : (Array.isArray(d.version) ? d.version[d.version.length - 1] : undefined),
    peerCordis: peerCordis || null, peerDsh: peerDsh || null, nodeRange: nodeRange || null,
  };
}

async function checkLayer1(plugins, ctx, concurrency) {
  const results = new Array(plugins.length);
  let cursor = 0;
  async function worker() {
    while (cursor < plugins.length) {
      const i = cursor++;
      results[i] = await layer1One(plugins[i], ctx);
    }
  }
  const n = Math.max(1, Math.min(concurrency, plugins.length));
  await Promise.all(Array.from({ length: n }, worker));
  return results;
}

// ---------------------------------------------------------------------------
// Layer 2/3: real install + config assembly (implemented)
// ---------------------------------------------------------------------------

// Run a command, capture stdout/stderr, enforce a wall-clock timeout by killing
// the whole process group (npx -> node -> pnpm -> git may all be in the tree).
function spawnCapture(cmd, args, { timeoutMs, env, cwd } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      env: { ...process.env, ...(env || {}) },
      cwd: cwd || process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: true, // new process group so we can kill the whole tree
    });
    let stdout = '', stderr = '', timedOut = false, settled = false;
    const t0 = Date.now();
    const timer = setTimeout(() => {
      timedOut = true;
      try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already gone */ }
      setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch { /* gone */ } }, 3000);
    }, timeoutMs);
    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });
    child.on('error', (e) => { if (settled) return; settled = true; clearTimeout(timer); resolve({ code: -1, signal: null, timedOut, stdout, stderr: stderr + `\nspawn error: ${e.message}`, elapsedMs: Date.now() - t0 }); });
    child.on('close', (code, signal) => {
      if (settled) return; settled = true; clearTimeout(timer);
      resolve({ code, signal, timedOut, stdout, stderr, elapsedMs: Date.now() - t0 });
    });
  });
}

// Resolve the dsh CLI invocation. First call warms the npx cache and verifies
// the tool actually boots; a failure here aborts the run instead of falsely
// marking every entry "broken" (network/npx problems are not plugin problems).
async function probeDsh() {
  const r = await spawnCapture('npx', ['-y', '@deepseek-ai/dsh', '--version'], { timeoutMs: 90000 });
  const ver = (r.stdout + r.stderr).trim().split(/\r?\n/)[0] || '';
  if (r.code !== 0 || !ver) {
    throw new Error(`dsh CLI probe failed (code=${r.code} timedOut=${r.timedOut}): ${(r.stderr || '').slice(0, 200)}`);
  }
  return ver;
}

// Classify an install run's outcome.
//   ok       — exit 0, plugin layer actually declared (dsh.bundle present)
//   nobundle — exit 0 but "declares no dsh.bundle" -> installed as plain dep,
//              NOT a DSH plugin layer. Skip (never mark ok/broken on this).
//   notfound — package does not exist in the registry.
//   fail     — anything else (exit != 0, timeout, pnpm resolution error).
function classifyInstall(code, stdout, stderr) {
  const out = `${stdout}\n${stderr}`;
  if (code !== 0) {
    if (/not in the npm registry|E404|404 Not Found/i.test(out)) {
      return { cls: 'notfound', note: 'npm package not found in registry' };
    }
    if (/allowBuilds|blocked until allowed|onlyBuiltDependencies|ignored build scripts/i.test(out)) {
      return { cls: 'fail', note: 'install blocked by pnpm build-script policy (allowBuilds) — plugin likely OK, CI policy blocks git prepare scripts' };
    }
    const first = out.split(/\r?\n/).filter(Boolean).slice(-4).join(' | ');
    return { cls: 'fail', note: `install failed (exit ${code}): ${first.slice(0, 160)}` };
  }
  if (/declares no dsh\.bundle|not a profile layer/i.test(out)) {
    return { cls: 'nobundle', note: 'installed but declares no dsh.bundle (not a DSH plugin layer)' };
  }
  return { cls: 'ok', note: '' };
}

// Layer 2 + 3 for one entry. Each entry gets its own isolated DSH_HOME so a
// broken peer-resolution in one plugin can never cascade into another.
async function installAndAssemble(entry, { dshHome, profile, addTimeout, gitTimeout }) {
  const spec = entry.spec; // npm name or git URL
  const isGit = entry.src === 'git';
  const timeoutMs = (isGit ? gitTimeout : addTimeout) * 1000;
  const started = Date.now();
  // Per-entry isolation: each plugin installs into its own DSH_HOME subdir so
  // a broken peer resolution or a corrupt profile can never cascade into the
  // next entry's verdict (ids are lowercase-hyphen slugs, safe as dir names).
  const home = join(dshHome, entry.id);
  mkdirSync(home, { recursive: true }); // dsh lazily creates profiles/, but spawn's cwd must pre-exist

  // Installs are network-bound and occasionally flaky; retry genuine failures
  // once. Deterministic outcomes (notfound / nobundle) are NOT retried.
  let add = await spawnCapture('npx', ['-y', '@deepseek-ai/dsh', 'plugin', '--profile', profile, 'add', spec], {
    timeoutMs,
    cwd: home,
    env: { DSH_HOME: home },
  });
  let inst = classifyInstall(add.code, add.stdout, add.stderr);
  let retried = false;
  // Only retry non-timeout failures — a timeout usually means a genuinely huge
  // repo (e.g. a 161MB git source) or a deadlock, and re-running just doubles
  // the wait.
  if (inst.cls === 'fail' && !add.timedOut) {
    retried = true;
    add = await spawnCapture('npx', ['-y', '@deepseek-ai/dsh', 'plugin', '--profile', profile, 'add', spec], {
      timeoutMs,
      cwd: home,
      env: { DSH_HOME: home },
    });
    inst = classifyInstall(add.code, add.stdout, add.stderr);
  }
  const layer2 = {
    verdict: inst.cls === 'ok' ? 'ok' : inst.cls, // ok | nobundle | notfound | fail
    note: add.timedOut ? `timeout after ${timeoutMs / 1000}s (process killed)${retried ? ' [retried]' : ''}`
      : retried ? `failed once, retried — ${inst.note}`
      : inst.note,
    elapsedMs: add.elapsedMs,
  };
  if (inst.cls !== 'ok') {
    return { layer2, layer3: null, finalVerdict: layer2.verdict, elapsedMs: Date.now() - started };
  }

  // Layer 3: config must actually assemble the plugin into the profile.
  const dc = await spawnCapture('npx', ['-y', '@deepseek-ai/dsh', '--profile', profile, '--dump-config'], {
    timeoutMs: 60000,
    cwd: home,
    env: { DSH_HOME: home },
  });
  const cfg = `${dc.stdout}\n${dc.stderr}`;
  const hay = cfg.toLowerCase();
  const needles = [entry.npmName, entry.id, entry.name].filter(Boolean).map((s) => s.toLowerCase());
  const found = dc.code === 0 && needles.some((n) => n && hay.includes(n));
  const layer3 = {
    verdict: found ? 'ok' : 'broken',
    note: found ? '' : dc.timedOut ? 'dump-config timeout' : `dump-config exit=${dc.code} but plugin not found in composed tree`,
    elapsedMs: dc.elapsedMs,
  };
  return { layer2, layer3, finalVerdict: layer3.verdict, elapsedMs: Date.now() - started };
}

// Concurrency-limited runner over the selected entries (install concurrency <= 4).
async function checkLayer23(entries, opts) {
  const results = new Array(entries.length);
  let cursor = 0;
  async function worker() {
    while (cursor < entries.length) {
      const i = cursor++;
      const e = entries[i];
      try {
        results[i] = { ...(await installAndAssemble(e, opts)), id: e.id, name: e.name, spec: e.spec, src: e.src };
      } catch (err) {
        results[i] = { id: e.id, name: e.name, spec: e.spec, src: e.src, layer2: { verdict: 'fail', note: `unexpected: ${err.message}`.slice(0, 160) }, layer3: null, finalVerdict: 'fail', elapsedMs: 0 };
      }
    }
  }
  const n = Math.max(1, Math.min(opts.installConcurrency || 4, entries.length));
  await Promise.all(Array.from({ length: n }, worker));
  return results;
}

// Deterministic shard for weekly rotation: id hash -> 0..6 (one shard per weekday).
function shardOf(id) {
  const h = createHash('sha256').update(String(id)).digest('hex');
  return parseInt(h.slice(0, 8), 16) % 7;
}

// Select entries for layer 2/3 according to the frequency tiers.
//   daily tier  : featured or stars>=50, npm-distributed -> every run
//   weekly tier : remaining npm-distributed entries, shard = UTC weekday
//   git tier    : featured or stars>=50, git-source only -> Sundays (weekly)
// An entry is "npm-distributed" when layer 1 actually resolved a package from
// the registry (verdict ok/unknown/broken); "unavailable"/"skipped" means the
// name does not resolve to an npm package (GitHub-only, or a false positive
// where `name` is a repo slug) -> never worth an install attempt.
function selectForLayer23(all, layer1, { scope, shard }) {
  const byId = new Map(layer1.map((r) => [r.id, r]));
  const npmEligible = new Map();
  const gitCandidates = [];
  for (const p of all) {
    const r = byId.get(p.id);
    if (r && r.npmName && (r.verdict === 'ok' || r.verdict === 'unknown' || r.verdict === 'broken')) {
      npmEligible.set(p.id, r.npmName);
    } else if (p.repo && !(p.npm && isNpmTarget(p.npm))) {
      gitCandidates.push(p);
    }
  }

  const highValue = (p) => p.featured || (Number(p.stars) || 0) >= 50;

  const daily = [], weekly = [], git = [];
  for (const p of all) {
    const npmName = npmEligible.get(p.id);
    if (!npmName) continue;
    const e = { ...p, npmName, spec: npmName, src: 'npm' };
    if (highValue(p)) {
      if (scope === 'all' || scope === 'auto' || scope === 'daily' || scope === 'weekly') daily.push(e);
    } else if (scope === 'all' || scope === 'auto' || scope === 'weekly') {
      weekly.push(e);
    }
  }
  // npm weekly shard applies in auto / weekly (not in 'all' = full sweep).
  const shardSel = shard !== null && shard !== undefined ? shard : new Date().getUTCDay();
  if (scope === 'auto' || scope === 'weekly') {
    // keep only today's shard among non-daily entries
    const kept = weekly.filter((e) => shardOf(e.id) === shardSel);
    weekly.length = 0;
    weekly.push(...kept);
  }

  // git tier: featured or high-star repos, run weekly (auto: Sundays only)
  const wantGit = scope === 'all' || scope === 'git' || (scope === 'auto' && shardSel === 0);
  if (wantGit) {
    for (const p of gitCandidates) {
      if (highValue(p)) {
        git.push({ ...p, npmName: null, spec: `git+https://github.com/${p.repo}`, src: 'git' });
      }
    }
  }

  return { daily, weekly, git };
}

// ---------------------------------------------------------------------------
// Report + main
// ---------------------------------------------------------------------------
function nowIso() {
  return new Date().toISOString().replace(/\.\d+Z$/, 'Z');
}

function summarize(rows) {
  const s = { total: rows.length, ok: 0, broken: 0, unknown: 0, unavailable: 0, skipped: 0 };
  for (const r of rows) s[r.verdict] = (s[r.verdict] || 0) + 1;
  return s;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const dataPath = args.data || DATA_PATH;
  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  let plugins = Array.isArray(data.plugins) ? data.plugins : [];
  let watchlist = Array.isArray(data.watchlist) ? data.watchlist : [];
  if (args.ids) {
    const wanted = new Set(args.ids.split(',').map((s) => s.trim()).filter(Boolean));
    plugins = plugins.filter((p) => wanted.has(p.id));
    watchlist = watchlist.filter((w) => wanted.has(w.id));
    console.log(`  (--ids) narrowed to ${plugins.length} catalog + ${watchlist.length} watchlist entries`);
  }

  // Resolve latest upstream versions (layer 1 needs them).
  let dshVersion = '';
  let cordisVersion = '';
  try { dshVersion = npmViewJson('@deepseek-ai/dsh', ['version']).data; dshVersion = typeof dshVersion === 'string' ? dshVersion : (dshVersion[dshVersion.length - 1]); } catch {}
  try { cordisVersion = npmViewJson('@deepseek-ai/cordis', ['version']).data; cordisVersion = typeof cordisVersion === 'string' ? cordisVersion : (cordisVersion[cordisVersion.length - 1]); } catch {}

  const nodeVersion = process.versions.node;
  const ctx = { cordisVersion, nodeVersion, dshVersion };

  console.log(`compat-check: latest DSH = ${dshVersion || '?'}, cordis = ${cordisVersion || '?'}, node = ${nodeVersion}`);

  // Layer 1 (implemented) — runs over both the catalog and the watchlist
  // so the report covers the full dataset.
  const all = [
    ...plugins.map((p) => ({ ...p, _section: 'catalog' })),
    ...watchlist.map((w) => ({ ...w, _section: 'watchlist' })),
  ];
  const layer1 = await checkLayer1(all, ctx, args.concurrency);

  // Layers 2/3: real install + config assembly on the selected tier.
  let layer23 = [];
  const want23 = args.layers === 'all' || args.layers === '2' || args.layers === '3';
  if (want23) {
    const { daily, weekly, git } = selectForLayer23(plugins, layer1, { scope: args.scope, shard: args.shard });
    const selected = [...daily, ...weekly, ...git];
    console.log(`\nLayer 2/3 selection (scope=${args.scope}): daily=${daily.length} weekly=${weekly.length} git=${git.length} -> ${selected.length} entries`);
    if (selected.length > 0) {
      const dshBinVer = await probeDsh();
      console.log(`  dsh CLI ready (${dshBinVer}) — installing with concurrency ${args.installConcurrency}, npm timeout ${args.addTimeout}s, git timeout ${args.gitTimeout}s`);
      const tmpRoot = mkdtempSync(join(tmpdir(), 'dsh-compat-'));
      const profile = 'compat';
      const opts = {
        dshHome: tmpRoot,
        profile,
        addTimeout: args.addTimeout,
        gitTimeout: args.gitTimeout,
        installConcurrency: args.installConcurrency,
      };
      try {
        layer23 = await checkLayer23(selected, opts);
      } finally {
        if (!args.keepTmp) rmSync(tmpRoot, { recursive: true, force: true });
      }
    } else {
      console.log('  (nothing selected — skipping install layer)');
    }
  }

  const summary = summarize(layer1);
  const catalogSummary = summarize(layer1.filter((r) => r.section === 'catalog'));
  const watchSummary = summarize(layer1.filter((r) => r.section === 'watchlist'));

  // Persist verdicts back into plugins.json (only when --write).
  // Layer 2/3 ground truth wins over layer 1 for the entries it actually tested.
  if (args.write) {
    let changed = 0;
    const byId = new Map(layer1.map((r) => [r.id, r]));
    const byId23 = new Map(layer23.map((r) => [r.id, r]));
    for (const p of plugins) {
      const r23 = byId23.get(p.id);
      const r = byId.get(p.id);
      if (!r) continue;
      let verdict = null, note = '';
      if (r23) {
        const v2 = r23.layer2 && r23.layer2.verdict; // ok | nobundle | notfound | fail
        if (v2 === 'ok') {
          // Installed fine — layer 3 decides between ok and broken.
          verdict = (r23.layer3 && r23.layer3.verdict === 'broken') ? 'broken' : 'ok';
          note = verdict === 'broken' ? (r23.layer3.note || 'installed but not in composed config') : '';
        } else if (v2 === 'fail' || v2 === 'notfound') {
          // The install itself failed — that IS broken, with the real reason.
          verdict = 'broken';
          note = r23.layer2.note || 'install failed';
        }
        // v2 === 'nobundle' (or layer2 missing): not a DSH plugin layer —
        // do not flip status; a static engines warning is not actionable here.
      }
      if (verdict === null && !r23 && (r.verdict === 'ok' || r.verdict === 'broken')) {
        // Entry was NOT tested by layer 2/3 this run — keep layer 1's static verdict.
        // (Tested-but-nobundle entries fall through: a non-plugin's static
        // engines warning is noise, not a compat verdict.)
        verdict = r.verdict;
        note = r.verdict === 'broken' ? r.note : '';
      }
      if (verdict === null) continue;
      if (!p.compat) p.compat = {};
      if (p.compat.status !== verdict || p.compat.dshVersion !== dshVersion) {
        p.compat.status = verdict;
        p.compat.dshVersion = dshVersion;
        p.compat.lastVerified = nowIso().slice(0, 10);
        p.compat.note = note.slice(0, 160);
        changed++;
      }
    }
    if (changed > 0) {
      writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`  (--write) persisted ${changed} ok/broken verdicts into ${dataPath}`);
    } else {
      console.log('  (--write) no status changes to persist');
    }
  }

  // Write machine-readable report.
  const l23Summary = (rows, layerName) => {
    const s = { total: rows.length, ok: 0, broken: 0, skipped: 0, notfound: 0, fail: 0 };
    for (const r of rows) {
      const v = layerName === 'layer2' ? r.layer2?.verdict : r.layer3?.verdict;
      if (v === 'ok') s.ok++;
      else if (v === 'broken') s.broken++;
      else if (v === 'fail') s.fail++;
      else if (v === 'notfound') s.notfound++;
      else s.skipped++;
    }
    return s;
  };
  const report = {
    generated_at: nowIso(),
    dshVersion,
    cordisVersion,
    nodeVersion,
    layers_run: [1, ...(layer23.length ? [2, 3] : [])],
    layer23_scope: want23 ? args.scope : null,
    summary,
    summary_catalog: catalogSummary,
    summary_watchlist: watchSummary,
    results: layer1,
    layer2: layer23.map((r) => ({ id: r.id, name: r.name, spec: r.spec, src: r.src, verdict: r.layer2?.verdict, note: r.layer2?.note || '', elapsedMs: r.layer2?.elapsedMs || 0 })),
    layer3: layer23.map((r) => ({ id: r.id, name: r.name, spec: r.spec, src: r.src, verdict: r.layer3?.verdict, note: r.layer3?.note || '', elapsedMs: r.layer3?.elapsedMs || 0 })),
    layer2_summary: l23Summary(layer23, 'layer2'),
    layer3_summary: l23Summary(layer23, 'layer3'),
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');

  // data/compat-installed.json — every entry whose config actually assembled
  // in a throwaway profile this run (Layer 3 ok). site/build.mjs reads this to
  // upgrade each entry's evidence badge from L2 to L3 ("install-verified").
  // Kept separate from plugins.json's `evidence` field so it can't be clobbered
  // by risk-scan.mjs rewriting that field. Only written when layer 2/3 ran
  // (layer1-only runs leave the previous set intact).
  if (layer23.length && args.write) {
    // Gate behind --write: compat-installed.json is a committed artifact that
    // should only be maintained by the authoritative CI run (and explicit
    // `--write` invocations), never clobbered by a partial debug run.
    const installed = layer23.filter((r) => r.layer3 && r.layer3.verdict === 'ok');
    const installedIds = [...new Set(installed.map((r) => r.id))].sort();
    const verifiedAt = nowIso().slice(0, 10);
    const installedDoc = {
      generated_at: nowIso(),
      dshVersion,
      count: installedIds.length,
      ids: installedIds,
      entries: Object.fromEntries(installed.map((r) => [
        r.id,
        { id: r.id, name: r.name, spec: r.spec, src: r.src || 'npm', verified_at: verifiedAt, layer: 3 },
      ])),
    };
    writeFileSync(INSTALLED_PATH, JSON.stringify(installedDoc, null, 2) + '\n', 'utf8');
    console.log(`\ncompat-installed: ${installedIds.length} entries L3-verified -> data/compat-installed.json`);
  }

  // Human-readable output.
  console.log('');
  console.log(`Layer 1 (static peer) — ${summary.total} entries total (catalog ${catalogSummary.total} + watchlist ${watchSummary.total}):`);
  const fmt = (s) => Object.entries(s).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(' ');
  console.log(`  catalog  : ${fmt(catalogSummary)}`);
  console.log(`  watchlist: ${fmt(watchSummary)}`);
  if (layer23.length) {
    console.log(`\nLayer 2 (install)   : ${fmt(l23Summary(layer23, 'layer2'))}`);
    console.log(`Layer 3 (assembly)  : ${fmt(l23Summary(layer23, 'layer3'))}`);
    console.log('\n  layer 2/3 detail:');
    for (const r of layer23) {
      const l2 = r.layer2 ? `${r.layer2.verdict}${r.layer2.elapsedMs ? ` (${r.layer2.elapsedMs}ms)` : ''}` : '-';
      const l3 = r.layer3 ? `${r.layer3.verdict}${r.layer3.elapsedMs ? ` (${r.layer3.elapsedMs}ms)` : ''}` : '-';
      console.log(`    ${r.id.padEnd(34)} L2=${l2.padEnd(22)} L3=${l3.padEnd(18)} ${(r.layer2?.note || r.layer3?.note || '').slice(0, 90)}`);
    }
  }
  console.log(`\nReport written to ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error('compat-check failed:', e.message || e);
  process.exit(1);
});
