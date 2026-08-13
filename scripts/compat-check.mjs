#!/usr/bin/env node
/**
 * compat-check.mjs — daily compatibility check for the dsh-suite directory.
 *
 * Three layers, all key-free (no DEEPSEEK_API_KEY, no model boot):
 *   Layer 1  Static peer comparison — `npm view <name> peerDependencies engines`
 *            vs the latest @deepseek-ai/cordis + local Node.            [IMPLEMENTED]
 *   Layer 2  Install check — `dsh plugin --profile __compat__ add <name>`
 *            into a throwaway profile.                                   [TODO]
 *   Layer 3  Config assembly check — `dsh --profile __compat__ --dump-config`
 *            must exit 0 and list the plugin.                            [TODO]
 *
 * Zero runtime dependencies: Node built-ins only (spawns `npm view`).
 *
 * Usage:
 *   node scripts/compat-check.mjs                 # layer 1, write report, print
 *   node scripts/compat-check.mjs --layers 1      # explicit
 *   node scripts/compat-check.mjs --write         # also persist ok/broken into data/plugins.json
 *   node scripts/compat-check.mjs --concurrency 16
 *
 * Layer 2/3 will print a clear TODO and are skipped until implemented.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_PATH = join(ROOT, 'data', 'plugins.json');
const REPORT_PATH = join(ROOT, 'data', 'compat-report.json');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = { layers: '1', write: false, concurrency: 12 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--layers' && argv[i + 1]) args.layers = argv[++i];
    else if (a === '--write') args.write = true;
    else if (a === '--concurrency' && argv[i + 1]) args.concurrency = Number(argv[++i]);
    else if (a === '--help' || a === '-h') { printHelp(); process.exit(0); }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/compat-check.mjs [--layers 1|2|3|all] [--write] [--concurrency N]`);
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

function layer1One(plugin, ctx) {
  const { cordisVersion, dshVersion, nodeVersion } = ctx;
  const section = plugin._section || 'catalog';
  const npmName = (plugin.npm || plugin.name || '').toLowerCase();

  if (!isNpmTarget(plugin.npm || plugin.name)) {
    return { id: plugin.id, name: plugin.name, section, verdict: 'skipped', note: 'not npm-distributed (git/file/url specifier)' };
  }

  const res = npmViewJson(npmName, ['peerDependencies', 'engines', 'version']);
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
      results[i] = layer1One(plugins[i], ctx);
    }
  }
  const n = Math.max(1, Math.min(concurrency, plugins.length));
  await Promise.all(Array.from({ length: n }, worker));
  return results;
}

// ---------------------------------------------------------------------------
// Layer 2 (TODO): install check
// ---------------------------------------------------------------------------
function checkLayer2(plugins, dshVersion) {
  // TODO(compat layer 2): for each npm-distributed plugin, run in a temp profile:
  //   npx -y @deepseek-ai/dsh plugin --profile __compat__ add <name>
  // Verdict: exit 0 -> ok, else broken (note = stderr). Skip git/file specifiers.
  // Not implemented yet — returns a per-plugin 'skipped' stub.
  return plugins.map((p) => ({
    id: p.id, name: p.name, layer: 2, verdict: 'skipped',
    note: `layer 2 (install check) not implemented — TODO: dsh plugin --profile __compat__ add ${p.name}`,
  }));
}

// ---------------------------------------------------------------------------
// Layer 3 (TODO): config assembly check
// ---------------------------------------------------------------------------
function checkLayer3(plugins, dshVersion) {
  // TODO(compat layer 3): after a successful install, run:
  //   npx -y @deepseek-ai/dsh --profile __compat__ --dump-config
  // Verdict: exit 0 AND output contains plugin id -> ok, else broken.
  // Not implemented yet — returns a per-plugin 'skipped' stub.
  return plugins.map((p) => ({
    id: p.id, name: p.name, layer: 3, verdict: 'skipped',
    note: `layer 3 (config assembly) not implemented — TODO: dsh --profile __compat__ --dump-config`,
  }));
}

// ---------------------------------------------------------------------------
// Report + main
// ---------------------------------------------------------------------------
function nowIso() {
  return new Date().toISOString().replace(/\.\d+Z$/, 'Z');
}

function summarize(layer1) {
  const s = { total: layer1.length, ok: 0, broken: 0, unknown: 0, unavailable: 0, skipped: 0 };
  for (const r of layer1) s[r.verdict] = (s[r.verdict] || 0) + 1;
  return s;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
  const plugins = Array.isArray(data.plugins) ? data.plugins : [];
  const watchlist = Array.isArray(data.watchlist) ? data.watchlist : [];

  // Resolve latest upstream versions (layer 1 needs them).
  let dshVersion = '';
  let cordisVersion = '';
  try { dshVersion = npmViewJson('@deepseek-ai/dsh', ['version']).data; dshVersion = typeof dshVersion === 'string' ? dshVersion : (dshVersion[dshVersion.length - 1]); } catch {}
  try { cordisVersion = npmViewJson('@deepseek-ai/cordis', ['version']).data; cordisVersion = typeof cordisVersion === 'string' ? cordisVersion : (cordisVersion[cordisVersion.length - 1]); } catch {}

  const nodeVersion = process.versions.node;
  const ctx = { cordisVersion, nodeVersion, dshVersion };

  console.log(`compat-check: latest DSH = ${dshVersion || '?'}, cordis = ${cordisVersion || '?'}, node = ${nodeVersion}`);

  // Layer 1 (implemented) — runs over both the catalog and the watchlist
  // ("未收录/观察") so the report covers the full dataset (164 catalog + 57 watchlist = 221).
  const all = [
    ...plugins.map((p) => ({ ...p, _section: 'catalog' })),
    ...watchlist.map((w) => ({ ...w, _section: 'watchlist' })),
  ];
  const layer1 = await checkLayer1(all, ctx, args.concurrency);

  // Layers 2/3 (TODO stubs — printed but skipped).
  const wantAll = args.layers === 'all' || args.layers === '3' || args.layers === '2';
  const layer2 = args.layers === '2' || args.layers === 'all' ? checkLayer2(plugins, dshVersion) : [];
  const layer3 = args.layers === '3' || args.layers === 'all' ? checkLayer3(plugins, dshVersion) : [];

  const summary = summarize(layer1);
  const catalogSummary = summarize(layer1.filter((r) => r.section === 'catalog'));
  const watchSummary = summarize(layer1.filter((r) => r.section === 'watchlist'));

  // Persist ok/broken verdicts back into plugins.json (only when --write).
  if (args.write) {
    let changed = 0;
    const byId = new Map(layer1.map((r) => [r.id, r]));
    for (const p of plugins) {
      const r = byId.get(p.id);
      if (!r || (r.verdict !== 'ok' && r.verdict !== 'broken')) continue;
      if (!p.compat) p.compat = {};
      if (p.compat.status !== r.verdict || p.compat.dshVersion !== dshVersion) {
        p.compat.status = r.verdict;
        p.compat.dshVersion = dshVersion;
        p.compat.lastVerified = nowIso().slice(0, 10);
        p.compat.note = r.verdict === 'broken' ? r.note : '';
        changed++;
      }
    }
    if (changed > 0) {
      writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`  (--write) persisted ${changed} ok/broken verdicts into data/plugins.json`);
    } else {
      console.log('  (--write) no status changes to persist');
    }
  }

  // Write machine-readable report.
  const report = {
    generated_at: nowIso(),
    dshVersion,
    cordisVersion,
    nodeVersion,
    layers_run: [1, ...(layer2.length ? [2] : []), ...(layer3.length ? [3] : [])],
    summary,
    summary_catalog: catalogSummary,
    summary_watchlist: watchSummary,
    results: layer1,
  };
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + '\n', 'utf8');

  // Human-readable output.
  console.log('');
  console.log(`Layer 1 (static peer) — ${summary.total} entries total (catalog ${catalogSummary.total} + watchlist ${watchSummary.total}):`);
  const fmt = (s) => Object.entries(s).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(' ');
  console.log(`  catalog  : ${fmt(catalogSummary)}`);
  console.log(`  watchlist: ${fmt(watchSummary)}`);
  const okRows = layer1.filter((r) => r.verdict === 'ok');
  const brokenRows = layer1.filter((r) => r.verdict === 'broken');
  if (okRows.length) {
    console.log('\n  ✓ ok:');
    for (const r of okRows.slice(0, 20)) {
      const peer = r.peerCordis ? `cordis "${r.peerCordis}"` : `dsh "${r.peerDsh}"`;
      console.log(`    ${r.name} (${r.npmName}) — ${peer}`);
    }
  }
  if (brokenRows.length) {
    console.log('\n  ✗ broken:');
    for (const r of brokenRows) console.log(`    ${r.name} (${r.npmName}) — ${r.note}`);
  }
  if (layer2.length || layer3.length) {
    console.log('\n  Layer 2/3: NOT IMPLEMENTED (TODO stubs above).');
  }
  console.log(`\nReport written to ${REPORT_PATH}`);
}

main().catch((e) => {
  console.error('compat-check failed:', e.message || e);
  process.exit(1);
});
