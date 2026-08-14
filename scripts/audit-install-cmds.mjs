#!/usr/bin/env node
/**
 * audit-install-cmds.mjs — audit installCmd validity for the top-N (by stars) entries.
 *
 * Purpose: the catalog's `install`/`npm` fields are mostly empty (data came from the
 * GitHub topic scrape, not from npm). A naive `dsh plugin add <repo-short-name>` is
 * wrong for a large fraction of repos (repo name != published npm name, or the repo
 * is a private monorepo that can only be built from source). This script audits the
 * top entries and classifies each install path, so the data can be corrected.
 *
 * Classification (per entry):
 *   npm_ok            — `npm view <name>` resolves (repo/`npm` name is on npm)
 *   npm_mismatch      — repo name 404s on npm, but package.json declares a different
 *                        `name` that DOES resolve on npm (or README hint found)
 *   build_from_source — no npm package: package.json is private / missing / no
 *                        `dsh.bundle` (monorepo), install only via `github:` source
 *   not_a_plugin      — not installable via `dsh plugin` at all (awesome list, skill
 *                        collection, standalone agent, docs site, …)
 *   error             — could not inspect (rate limit / network)
 *
 * This is the DATA-MAPPING layer. It complements Compat-Engineer's layer-2
 * (real `dsh plugin add` install verification): we fix "which name maps to what",
 * Compat-Engineer verifies "does that name actually install".
 *
 * Re-runnable: it only READS data and writes a report; it does not mutate plugins.json.
 * (Apply fixes via a separate edit or a --write flag, see comments.)
 *
 * Usage:
 *   node scripts/audit-install-cmds.mjs [--top N] [--report data/install-audit.json]
 *   GH_TOKEN / GITHUB_TOKEN env, or `gh auth token` fallback, is used for gh api.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data', 'plugins.json');

const args = process.argv.slice(2);
const TOP = (() => { const i = args.indexOf('--top'); return i >= 0 ? parseInt(args[i + 1], 10) : 100; })();
const REPORT = (() => { const i = args.indexOf('--report'); return i >= 0 ? args[i + 1] : join(ROOT, 'data', 'install-audit.json'); })();

function sh(cmd, timeout = 20000) {
  try {
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], timeout, encoding: 'utf8' });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, out: (e.stdout || '') + (e.stderr || '') };
  }
}

function npmView(name) {
  const r = sh(`npm view "${name}" version`, 15000);
  if (r.ok && r.out.trim()) return { exists: true, version: r.out.trim().split('\n').pop() };
  return { exists: false };
}

function ghPackageJson(repo) {
  const r = sh(`gh api "repos/${repo}/contents/package.json" --jq .content`, 20000);
  if (!r.ok || !r.out.trim()) return null;
  try {
    return JSON.parse(Buffer.from(r.out.trim(), 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

function ghReadmeHints(repo) {
  // cheap hint extraction: look for npm-scoped names / install commands in the README
  const r = sh(`gh api "repos/${repo}/readme" --jq .content`, 20000);
  if (!r.ok || !r.out.trim()) return [];
  let text = '';
  try { text = Buffer.from(r.out.trim(), 'base64').toString('utf8'); } catch { return []; }
  const hits = new Set();
  for (const m of text.matchAll(/(?:npm (?:i|install|install -g)|pnpm (?:add|i)|dsh plugin (?:--profile \S+ )?add)\s+["']?([@\w][\w./@-]*)/g)) {
    hits.add(m[1]);
  }
  for (const m of text.matchAll(/@([\w-]+)\/([\w-]+)/g)) {
    hits.add(`@${m[1]}/${m[2]}`);
  }
  return [...hits].slice(0, 5);
}

function classify(e) {
  const candidates = [];
  if (e.npm) candidates.push(e.npm);
  if (e.name) candidates.push(e.name);
  const seen = new Set();
  for (const c of candidates.filter(Boolean)) {
    if (seen.has(c)) continue;
    seen.add(c);
    const v = npmView(c);
    if (v.exists) return { verdict: 'npm_ok', npmName: c, version: v.version };
  }

  const pkg = ghPackageJson(e.repo);
  if (pkg && pkg.name) {
    if (!seen.has(pkg.name)) {
      const v = npmView(pkg.name);
      if (v.exists) return { verdict: 'npm_mismatch', npmName: pkg.name, version: v.version };
    }
    if (pkg.private === true) return { verdict: 'build_from_source', note: 'private:true' };
    if (!pkg.dsh) return { verdict: 'build_from_source', note: 'no dsh.bundle manifest' };
  }
  if (!pkg) {
    // no root package.json -> monorepo (workspaces) or non-plugin
    return { verdict: 'not_a_plugin', note: 'no root package.json' };
  }
  return { verdict: 'build_from_source', note: 'unpublished npm name' };
}

async function main() {
  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const plugins = [...(data.plugins || [])].sort((a, b) => (b.stars || 0) - (a.stars || 0));
  const top = plugins.slice(0, TOP);

  const summary = { npm_ok: 0, npm_mismatch: 0, build_from_source: 0, not_a_plugin: 0, error: 0 };
  const entries = [];

  for (const e of top) {
    let r;
    try { r = classify(e); } catch (err) { r = { verdict: 'error', note: String(err).slice(0, 80) }; }
    summary[r.verdict] = (summary[r.verdict] || 0) + 1;
    const row = { repo: e.repo, stars: e.stars, verdict: r.verdict, npmName: r.npmName || null, note: r.note || '' };
    if (r.verdict === 'npm_mismatch' || r.verdict === 'build_from_source') {
      row.hints = ghReadmeHints(e.repo);
    }
    entries.push(row);
    console.log(`${r.verdict.padEnd(18)} ${String(e.stars).padStart(5)}★  ${e.repo}  ${r.npmName ? '→ ' + r.npmName + '@' + (r.version || '?') : ''}  ${r.note || ''}`);
  }

  const report = { generated_at: new Date().toISOString(), top_n: TOP, summary, entries };
  writeFileSync(REPORT, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log('\n=== summary ===');
  console.log(JSON.stringify(summary));
  console.log(`report written: ${REPORT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
