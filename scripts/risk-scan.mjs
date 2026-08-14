#!/usr/bin/env node
/*
 * risk-scan.mjs — static risk & evidence scan for the dsh-suite catalog.
 * Reads data/plugins.json; uses `gh api` READ-ONLY calls (no clone, no run).
 *   Flags (conservative: miss over false-positive), true/false/null:
 *     installScript : package.json declares preinstall/install/postinstall
 *     networkEgress : entry source calls fetch/axios/XMLHttpRequest/WebSocket/
 *                     EventSource/http[s].request/net.connect, or imports
 *                     axios/node-fetch/got/superagent/undici
 *     shellAccess   : entry source imports child_process or calls exec/spawn
 *     noLicense     : GitHub license API reports no license for the repo
 * Writes back per-entry `risk` + `evidence` fields in data/plugins.json and
 * emits data/risk-report.json. Per-repo results cached in data/.risk-cache/
 * (re-run resumes; delete cache to force rescan).
 * Usage:
 *   node scripts/risk-scan.mjs               # Top N (200) by stars
 *   node scripts/risk-scan.mjs --spot a,b,c  # scan only these ids
 *   RISK_N=50 node scripts/risk-scan.mjs     # override N
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');
const CACHE = join(DATA, '.risk-cache');
mkdirSync(CACHE, { recursive: true });
const TOP_N = Number(process.env.RISK_N || 200);
const SLEEP_MS = 350;

const RE_INSTALL = /["'](preinstall|install|postinstall)["']\s*:/;
const RE_NETWORK = /(fetch|axios|XMLHttpRequest|WebSocket|EventSource)\s*\(|\bhttps?\.request\s*\(|\bnet\.connect\s*\(|\bnet\.createConnection\s*\(|require\(\s*['"](?:axios|node-fetch|got|superagent|undici)['"]\s*\)|from\s+['"](?:axios|node-fetch|got|superagent|undici)['"]/;
const RE_SHELL = /require\(\s*['"]child_process['"]\s*\)|from\s+['"]child_process['"]|\b(?:execSync|spawnSync|execFileSync|execFile|child_process)\s*\(|(?<![\w.])\b(?:exec|spawn)\s*\(/;
const ENTRY_CANDIDATES = ['index.js', 'index.mjs', 'index.ts', 'src/index.js', 'src/index.mjs', 'src/index.ts', 'lib/index.js', 'lib/index.mjs', 'main.js', 'dist/index.js', 'src/main.js'];
const b64 = (s) => Buffer.from(String(s), 'base64').toString('utf8');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function gh(path) {
  try {
    const out = execSync(`gh api "${path}" --jq . 2>/dev/null`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const t = out.trim();
    return t ? JSON.parse(t) : null;
  } catch (e) {
    const msg = String(e.stderr || e.message || '');
    if (/API rate limit exceeded|403|429/.test(msg)) return { __rate: true };
    if (/404/.test(msg)) return null;
    return { __error: msg.slice(0, 220) };
  }
}

function entryFromPkg(pkg) {
  if (!pkg) return null;
  const main = pkg.main;
  if (typeof main === 'string' && main.trim()) return main.trim().replace(/^\.\//, '').replace(/\/+$/, '');
  return null;
}

function resolveSub(entry) {
  // monorepo packages: "@scope/name" -> try packages/plugins/<name> then packages/<name>
  const m = String(entry.install || entry.npm || '').match(/@?[\w.-]+\/([\w.-]+)/);
  const leaf = m && m[1];
  const cands = [];
  if (leaf) cands.push(`packages/plugins/${leaf}`, `packages/${leaf}`);
  if (/create[\s-]dsh-plugin/.test(String(entry.install || entry.npm || ''))) cands.push('packages/create-dsh-plugin');
  return cands;
}

async function scanRepo(repo, sub) {
  const slug = repo.replace(/[^A-Za-z0-9_-]/g, '_') + (sub ? '__' + sub.replace(/[^A-Za-z0-9_-]/g, '_') : '');
  const cachePath = join(CACHE, slug + '.json');
  if (existsSync(cachePath)) return JSON.parse(readFileSync(cachePath, 'utf8'));

  let meta = gh(`repos/${repo}`);
  if (meta && meta.__rate) { console.warn(`[rate] sleeping 30s for ${repo}`); await sleep(30000); meta = gh(`repos/${repo}`); }
  if (meta && meta.__error) {
    const out = { repo, sub, error: meta.__error, flags: null };
    writeFileSync(cachePath, JSON.stringify(out));
    return out;
  }
  await sleep(SLEEP_MS);

  const dir = sub ? sub.replace(/^\/|\/$/g, '') + '/' : '';
  let pkg = gh(`repos/${repo}/contents/${dir}package.json`);
  const scannedPkg = !!(pkg && pkg.content);
  let pkgObj = null;
  if (pkg && pkg.content) { try { pkgObj = JSON.parse(b64(pkg.content)); } catch (e) { pkgObj = null; } }
  await sleep(SLEEP_MS);

  let installScript;
  if (pkg === null) installScript = false;          // no manifest -> nothing to run
  else if (pkgObj && pkgObj.scripts) installScript = RE_INSTALL.test(JSON.stringify(pkgObj.scripts));
  else installScript = pkgObj ? false : null;        // decode failure -> unknown

  let outEv = {};
  const entryRel = entryFromPkg(pkgObj);
  const tryPaths = [];
  if (entryRel) tryPaths.push(dir + entryRel);
  else ENTRY_CANDIDATES.forEach((c) => tryPaths.push(dir + c));
  let entryPath = null, entryContent = null;
  for (const p of tryPaths) {
    const f = gh(`repos/${repo}/contents/${p}`);
    if (f && f.content) { entryPath = p; entryContent = b64(f.content); break; }
    if (f === null) { await sleep(Math.min(SLEEP_MS, 120)); continue; }
    break; // rate/error: stop
  }

  // barrel detection: entry with no hits but direct relative imports -> scan up to 4
  let scannedText = entryContent;
  if (entryContent && !RE_NETWORK.test(entryContent) && !RE_SHELL.test(entryContent)) {
    const imports = [...entryContent.matchAll(/from\s+['"](\.[^'"]+)['"]|import\s*\(\s*['"](\.[^'"]+)['"]\s*\)|require\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g)];
    const entryDir = entryPath ? entryPath.slice(0, entryPath.lastIndexOf('/') + 1) : dir;
    let followed = 0;
    for (const im of imports) {
      if (followed >= 4) break;
      const raw = (im[1] || im[2] || im[3]).replace(/^\.[\\/]/, '');
      const cands = [entryDir + raw, entryDir + raw + '.js', entryDir + raw + '.mjs', entryDir + raw + '.ts', entryDir + raw + '/index.js', dir + raw];
      for (const c2 of cands) {
        const f2 = gh(`repos/${repo}/contents/${c2}`);
        if (f2 && f2.content) { scannedText = (scannedText || '') + '\n' + b64(f2.content); followed++; break; }
        if (f2 === null) continue;
        break;
      }
      if (!scannedText || followed >= 4) break;
    }
  }

  const matched = {};   // evidence lines per flag (for auditability)
  if (scannedText) {
    const lines = scannedText.split('\n');
    matched.networkEgress = lines.map((ln, i) => RE_NETWORK.test(ln) ? `${i + 1}: ${ln.trim().slice(0, 90)}` : null).filter(Boolean).slice(0, 3);
    matched.shellAccess = lines.map((ln, i) => RE_SHELL.test(ln) ? `${i + 1}: ${ln.trim().slice(0, 90)}` : null).filter(Boolean).slice(0, 3);
  }
  const flags = {
    installScript,
    networkEgress: scannedText ? matched.networkEgress.length > 0 : null,
    shellAccess: scannedText ? matched.shellAccess.length > 0 : null,
    noLicense: meta === null ? null : !!meta.license ? false : true,
  };
  if (flags.networkEgress || flags.shellAccess) outEv = matched;
  const out = { repo, sub, entryPath, scannedPkg, flags, matched: matched, scannedAt: new Date().toISOString().slice(0, 16) };
  writeFileSync(cachePath, JSON.stringify(out, null, 1));
  return out;
}

async function main() {
  const data = JSON.parse(readFileSync(join(DATA, 'plugins.json'), 'utf8'));
  const plugins = data.plugins || [];
  const spot = process.argv.indexOf('--spot');
  let targets = [];
  if (spot >= 0 && process.argv[spot + 1]) {
    const ids = process.argv[spot + 1].split(',').map((s) => s.trim()).filter(Boolean);
    targets = plugins.filter((p) => ids.includes(p.id));
    console.log(`[risk-scan] spot mode: ${targets.length} entries (${ids.join(', ')})`);
  } else {
    const byStars = [...plugins].sort((a, b) => (b.stars || 0) - (a.stars || 0) || (a.id < b.id ? -1 : 1));
    targets = byStars.slice(0, TOP_N);
    console.log(`[risk-scan] top ${targets.length} by stars (cutoff ${targets[targets.length - 1]?.stars ?? 0}★)`);
  }

  const results = {};
  for (const p of targets) {
    if (!p.repo) { results[p.id] = { repo: '', sub: null, error: 'no repo', flags: null }; continue; }
    let res = await scanRepo(p.repo, null);
    if (res.flags && !res.entryPath) {
      // root has no discoverable entry -> try monorepo subpaths if plausible
      const subs = resolveSub(p);
      for (const sub of subs) {
        const r2 = await scanRepo(p.repo, sub);
        if (r2.flags && (r2.entryPath || r2.scannedPkg)) { res = r2; break; }
        res.sub = sub;
      }
    }
    results[p.id] = res;
    if (results[p.id].flags) {
      const f = results[p.id].flags; const hit = Object.values(f).filter((v) => v === true).length;
      console.log(`  ${p.id.padEnd(28)} install:${f.installScript} net:${f.networkEgress} shell:${f.shellAccess} lic:${f.noLicense}${hit ? '  <-- RISK' : ''}`);
    } else {
      console.log(`  ${p.id.padEnd(28)} <scan failed/null>`);
    }
  }

  // fuse: fresh read -> write risk + evidence (by id)
  const fresh = JSON.parse(readFileSync(join(DATA, 'plugins.json'), 'utf8'));
  let scanned = 0, failed = 0, riskCount = 0, cleanCount = 0;
  const flagCounts = { installScript: 0, networkEgress: 0, shellAccess: 0, noLicense: 0 };
  const topHits = [];
  const ev = { L1: 0, L2: 0 };
  for (const p of fresh.plugins) {
    const r = results[p.id];
    if (r) {
      p.risk = r.flags;                     // object or null
      scanned += r.flags ? 1 : 0;
      if (!r.flags) failed++;
      if (r.flags) {
        const f = r.flags;
        Object.keys(flagCounts).forEach((k) => { if (f[k] === true) flagCounts[k]++; });
        const hits = Object.entries(f).filter(([, v]) => v === true);
        if (hits.length) { riskCount++; topHits.push({ id: p.id, repo: p.repo, flags: f, matched: r.matched || {} }); }
        else cleanCount++;
      }
    }
    const lvl = (p.compat && p.compat.status === 'ok') ? 2 : 1;
    p.evidence = { level: lvl, l3Verified: false, source: 'risk-scan; L3 pending compat layer2/3' };
    ev['L' + lvl]++;
  }
  writeFileSync(join(DATA, 'plugins.json'), JSON.stringify(fresh, null, 2) + '\n');
  const report = {
    generated: new Date().toISOString().slice(0, 16),
    mode: spot >= 0 ? 'spot' : 'top',
    topN: TOP_N,
    scanned, failed,
    evidence: ev,
    flagCounts,
    entriesWithRisk: riskCount,
    entriesClean: cleanCount,
    topHits,
  };
  writeFileSync(join(DATA, 'risk-report.json'), JSON.stringify(report, null, 2));
  console.log(`\n[risk-scan] done: scanned ${scanned}, failed ${failed}, risk ${riskCount}, clean ${cleanCount}`);
  console.log(`[risk-scan] flags: ${JSON.stringify(flagCounts)} | evidence: ${JSON.stringify(ev)}`);
  console.log(`[risk-scan] report: data/risk-report.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
