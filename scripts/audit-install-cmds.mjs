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

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const exec = promisify(execFile);
const npmViewCache = new Map();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data', 'plugins.json');

const args = process.argv.slice(2);
const TOP = (() => { const i = args.indexOf('--top'); return i >= 0 ? parseInt(args[i + 1], 10) : 100; })();
const REPORT = (() => { const i = args.indexOf('--report'); return i >= 0 ? args[i + 1] : join(ROOT, 'data', 'install-audit.json'); })();
const DO_WRITE = args.includes('--write');

/**
 * Hand-verified overrides. The automated classifier can be fooled by
 * package.json `name` collisions with unrelated npm packages (e.g. a generic
 * name like "hanako") or by two repos declaring the same package name
 * (dsh-desktop). These override the verdict-based fix:
 *   repo -> { npm, install, installNote }  (npm: null keeps it unset)
 */
const OVERRIDES = {
  'liliMozi/openhanako': {
    npm: null, install: '',
    installNote: 'not-a-plugin: 独立 agent 应用（Releases 分发 .exe），非 dsh plugin',
  },
  'zhu1090093659/dsh-web-ui': {
    npm: '@linxin666/dsh-web-ui-all',
    install: 'dsh plugin add @linxin666/dsh-web-ui-all@0.1.10',
    installNote: 'build-from-source: 根包 private monorepo；npm 聚合包在 @linxin666 scope',
  },
  'vibeinging/dsh-work': {
    npm: null, install: '',
    installNote: 'not-a-plugin: Electron desktop workbench（非 dsh plugin）',
  },
  'JustGenius-s/DSH-Decktop': {
    npm: null, install: '',
    installNote: 'not-a-plugin: Electron desktop shell（把 @deepseek-ai/dsh 装入 ~/.dsh/runtime）',
  },
  'omdsh-dev/dsh-data-agent': {
    npm: '@yejiming/dsh-data-agent',
    install: 'dsh plugin add @yejiming/dsh-data-agent',
    installNote: null,
  },
};

/** Self-built featured entries: their npm names are the real published ones,
 *  which differ from the umbrella repo's root package.json name (@dsh-suite/all). */
const FEATURED_NPM = {
  'create-dsh-plugin': 'create-dsh-plugin',
  'plugin-notify': '@dsh-suite/plugin-notify',
  'plugin-session-export': '@dsh-suite/plugin-session-export',
};

function applyFix(e, verdict, npmName) {
  const ov = OVERRIDES[e.repo];
  if (ov) {
    e.npm = ov.npm;
    e.install = ov.install;
    e.installNote = ov.installNote;
    return;
  }
  if (e.featured && e.repo === 'whyihaveyou/dsh-suite' && FEATURED_NPM[e.id]) {
    e.npm = FEATURED_NPM[e.id];
    e.install = `dsh plugin add ${FEATURED_NPM[e.id]}`;
    e.installNote = null;
    return;
  }
  if (verdict === 'npm_ok' || verdict === 'npm_mismatch') {
    e.npm = npmName;
    e.install = `dsh plugin add ${npmName}`;
    e.installNote = null;
  } else if (verdict === 'build_from_source') {
    e.npm = null;
    e.install = 'see README';
    e.installNote = 'build-from-source: 仓库无 npm 发布包（private monorepo / 未发布），只能源码构建';
  } else if (verdict === 'not_a_plugin') {
    e.npm = null;
    e.install = '';
    e.installNote = 'not-a-plugin: 非 dsh plugin（awesome 列表 / 独立应用 / 文档站等）';
  }
}

async function sh(cmd, args, timeout = 20000) {
  try {
    const { stdout } = await exec(cmd, args, { timeout, encoding: 'utf8' });
    return { ok: true, out: stdout };
  } catch (e) {
    return { ok: false, out: (e.stdout || '') + (e.stderr || '') };
  }
}

async function npmView(name) {
  if (npmViewCache.has(name)) return npmViewCache.get(name);
  const r = await sh('npm', ['view', name, 'version'], 15000);
  let res;
  if (r.ok && r.out.trim()) res = { exists: true, version: r.out.trim().split('\n').pop() };
  else res = { exists: false };
  npmViewCache.set(name, res);
  return res;
}

async function ghPackageJson(repo) {
  const r = await sh('gh', ['api', `repos/${repo}/contents/package.json`, '--jq', '.content'], 20000);
  if (!r.ok || !r.out.trim()) return null;
  try {
    return JSON.parse(Buffer.from(r.out.trim(), 'base64').toString('utf8'));
  } catch {
    return null;
  }
}

async function ghReadmeHints(repo) {
  // cheap hint extraction: look for npm-scoped names / install commands in the README
  const r = await sh('gh', ['api', `repos/${repo}/readme`, '--jq', '.content'], 20000);
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

async function classify(e) {
  const candidates = [];
  if (e.npm) candidates.push(e.npm);
  if (e.name) candidates.push(e.name);
  const seen = new Set();
  for (const c of candidates.filter(Boolean)) {
    if (seen.has(c)) continue;
    seen.add(c);
    const v = await npmView(c);
    if (v.exists) return { verdict: 'npm_ok', npmName: c, version: v.version };
  }

  const pkg = await ghPackageJson(e.repo);
  if (pkg && pkg.name) {
    if (!seen.has(pkg.name)) {
      const v = await npmView(pkg.name);
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

async function classifyWorker(e) {
  try { return await classify(e); } catch (err) { return { verdict: 'error', note: String(err).slice(0, 80) }; }
}

async function main() {
  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const plugins = [...(data.plugins || [])].sort((a, b) => (b.stars || 0) - (a.stars || 0));
  const top = plugins.slice(0, TOP);

  // concurrency pool: npm view / gh api calls are I/O-bound; 8 workers keep
  // the runtime busy without hammering the registries.
  const CONCURRENCY = 8;
  const summary = { npm_ok: 0, npm_mismatch: 0, build_from_source: 0, not_a_plugin: 0, error: 0 };
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < top.length) {
      const i = idx++;
      const e = top[i];
      const [r, hints] = await Promise.all([classifyWorker(e), ghReadmeHints(e)]);
      results[i] = { e, r, hints };
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, top.length) }, () => worker()));

  const entries = [];
  for (const { e, r, hints } of results.sort((a, b) => (b.e.stars || 0) - (a.e.stars || 0))) {
    summary[r.verdict] = (summary[r.verdict] || 0) + 1;
    const row = { repo: e.repo, stars: e.stars, verdict: r.verdict, npmName: r.npmName || null, note: r.note || '' };
    if ((r.verdict === 'npm_mismatch' || r.verdict === 'build_from_source') && hints.length) row.hints = hints;
    entries.push(row);
    console.log(`${r.verdict.padEnd(18)} ${String(e.stars).padStart(5)}★  ${e.repo}  ${r.npmName ? '→ ' + r.npmName + '@' + (r.version || '?') : ''}  ${r.note || ''}${hints.length ? '  hints=' + hints.join(',') : ''}`);
  }

  if (DO_WRITE) {
    // fix self-built featured entries wherever they are (may be outside top-N)
    const all = data.plugins || [];
    for (const e of all) {
      if (e.featured && e.repo === 'whyihaveyou/dsh-suite' && FEATURED_NPM[e.id]) {
        if (!results.some(x => x.e.id === e.id)) applyFix(e, null, null);
      }
    }
    // fix audited top-N entries
    for (const { e, r } of results) applyFix(e, r.verdict, r.npmName);
    writeFileSync(DATA, JSON.stringify(data, null, 1) + '\n', 'utf8');
    console.log(`fixes applied -> ${DATA}`);
  }

  const report = { generated_at: new Date().toISOString(), top_n: TOP, summary, entries };
  writeFileSync(REPORT, JSON.stringify(report, null, 2) + '\n', 'utf8');
  console.log('\n=== summary ===');
  console.log(JSON.stringify(summary));
  console.log(`report written: ${REPORT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
