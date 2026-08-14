#!/usr/bin/env node
/**
 * refresh-stars.mjs — hourly star / last_push refresh for data/plugins.json.
 *
 * Zero runtime dependencies: Node built-ins only (global fetch, Node >=18).
 * Token resolution (in priority order):
 *   1. GH_TOKEN env   (set by .github/workflows/refresh.yml from secrets.GITHUB_TOKEN)
 *   2. GITHUB_TOKEN env
 *   3. `gh auth token` (local development — gh CLI must be logged in)
 *
 * Batch strategy: GitHub GraphQL with ~100 aliased `repository` queries per
 * request. ~821 repos → ~9 requests, well under the 5000 pt/h GraphQL rate
 * limit (each alias ≈ 3 pts: repository + stargazerCount + pushedAt).
 *
 * Idempotency: only rewrites data/plugins.json (and bumps _meta.generated_at)
 * when at least one entry's stars or last_push actually changes. A second run
 * with no upstream change leaves the file byte-identical, so the workflow's
 * `git diff --cached --quiet` guard skips the commit.
 *
 * The 3 self-dev featured entries (repo `whyihaveyou/dsh-suite`) are NEVER
 * touched — they share one umbrella repo and their stars are curated by hand.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data', 'plugins.json');

const GRAPHQL = 'https://api.github.com/graphql';
const BATCH = 100;                 // aliases per GraphQL request
const SELF_DEV_REPO = 'whyihaveyou/dsh-suite'; // 3 self-dev featured entries, never touched

function getToken() {
  const env = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (env) return env;
  try { return execSync('gh auth token', { encoding: 'utf8' }).trim(); }
  catch { return null; }
}

async function main() {
  const token = getToken();
  if (!token) {
    console.error('refresh-stars: no GitHub token (set GH_TOKEN / GITHUB_TOKEN, or `gh auth login` locally)');
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const plugins = Array.isArray(data.plugins) ? data.plugins : [];
  const watchlist = Array.isArray(data.watchlist) ? data.watchlist : [];
  const all = [...plugins, ...watchlist];

  // repos to refresh: skip the self-dev umbrella repo (3 featured entries)
  const repos = [...new Set(all.map((e) => e.repo).filter((r) => r && r !== SELF_DEV_REPO))];
  const fresh = {}; // repo -> { stars, pushedAt }

  const started = Date.now();
  for (let i = 0; i < repos.length; i += BATCH) {
    const chunk = repos.slice(i, i + BATCH);
    const aliases = chunk
      .map((r, j) => {
        const [owner, name] = r.split('/');
        return `r${j}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { stargazerCount pushedAt }`;
      })
      .join('\n');
    const query = `query { ${aliases} }`;
    const res = await fetch(GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'dsh-suite-hourly-refresh',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    if (!res.ok || json.errors) {
      const msg = json.errors ? JSON.stringify(json.errors).slice(0, 400) : `HTTP ${res.status}`;
      console.error(`refresh-stars: batch ${i / BATCH + 1} failed: ${msg}`);
    }
    const body = json.data || {};
    chunk.forEach((r, j) => {
      const node = body[`r${j}`];
      if (node && typeof node.stargazerCount === 'number') {
        fresh[r] = { stars: node.stargazerCount, pushedAt: node.pushedAt || null };
      }
    });
    // small pause between batches to stay well inside secondary rate limits
    await new Promise((r) => setTimeout(r, 250));
  }

  let changed = 0;
  for (const e of all) {
    if (e.repo === SELF_DEV_REPO) continue; // never touch self-dev featured
    const f = fresh[e.repo];
    if (!f) continue; // repo deleted/renamed/rate-limited → keep previous value
    const stars = f.stars;
    const lastPush = f.pushedAt ? String(f.pushedAt).slice(0, 10) : '';
    let eChanged = false;
    if (e.stars !== stars) { e.stars = stars; eChanged = true; }
    if ((e.last_push || '') !== lastPush) { e.last_push = lastPush; eChanged = true; }
    if (eChanged) changed++;
  }

  const fetched = Object.keys(fresh).length;
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  if (changed === 0) {
    console.log(`refresh-stars: no changes — ${all.length} entries, ${fetched} repos fetched (${elapsed}s)`);
    return; // idempotent: leave generated_at untouched
  }

  data._meta.generated_at = new Date().toISOString();
  data._meta.source = 'hourly refresh-stars (GitHub GraphQL)';
  writeFileSync(DATA, JSON.stringify(data, null, 1) + '\n', 'utf8');
  console.log(`refresh-stars: updated ${changed}/${all.length} entries, ${fetched} repos fetched (${elapsed}s)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
