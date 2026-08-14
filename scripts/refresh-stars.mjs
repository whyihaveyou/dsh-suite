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
 * request. ~1200 repos -> ~12 requests, well under the 5000 pt/h GraphQL rate
 * limit (each alias ≈ 3 pts: repository + stargazerCount + pushedAt).
 *
 * NOT_FOUND handling (deleted / renamed repos):
 *   - When a batch returns `errors` containing `NOT_FOUND`, the offending
 *     aliases are parsed out of `errors[].path` (e.g. ["r18"]), stripped from
 *     the batch, and the remaining aliases are retried once. Only if a retry
 *     still fails is the batch logged as failed — the workflow never goes red
 *     because a handful of repos vanished.
 *   - Detected repos are tracked in data/deleted-repos.json (last known stars,
 *     seen count). Repos seen >= 2 times are excluded from the refresh list,
 *     so they stop generating noise; entries keep their last-known stars.
 *
 * 403 / rate-limit handling: backoff + one retry; if still limited, the batch
 * is skipped gracefully (entries keep previous values — the next hourly run
 * catches up). Never crashes the workflow.
 *
 * Idempotency: only rewrites data/plugins.json (and bumps _meta.generated_at)
 * when at least one entry's stars or last_push actually changes, and only
 * rewrites data/deleted-repos.json when the detection list changes.
 *
 * The self-dev featured entries (repo `whyihaveyou/dsh-suite`) are NEVER
 * touched — they share one umbrella repo and their stars are curated by hand.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data', 'plugins.json');
const DELETED = join(ROOT, 'data', 'deleted-repos.json');

const GRAPHQL = 'https://api.github.com/graphql';
const BATCH = 100;                 // aliases per GraphQL request
const SELF_DEV_REPO = 'whyihaveyou/dsh-suite';
const EXCLUDE_AFTER_SEEN = 2;      // consecutive detections before excluding a repo
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getToken() {
  const env = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (env) return env;
  try { return execSync('gh auth token', { encoding: 'utf8' }).trim(); }
  catch { return null; }
}

function loadDeletedReport() {
  try { return JSON.parse(readFileSync(DELETED, 'utf8')); }
  catch { return { generated_at: null, repos: [] }; }
}

async function graphqlQuery(token, aliases) {
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
  let json = null;
  try { json = await res.json(); } catch { /* non-JSON body */ }
  return { status: res.status, ok: res.ok, json };
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

  const deletedReport = loadDeletedReport();
  const deletedMap = new Map(deletedReport.repos.map((r) => [r.repo, r]));
  const excluded = new Set([...deletedMap.values()].filter((r) => r.seen >= EXCLUDE_AFTER_SEEN).map((r) => r.repo));

  // repos to refresh: skip self-dev umbrella + repos already confirmed deleted
  const repos = [...new Set(all.map((e) => e.repo).filter((r) => r && r !== SELF_DEV_REPO && !excluded.has(r)))];
  const fresh = {}; // repo -> { stars, pushedAt }

  const started = Date.now();
  const detected = new Set(); // repos detected NOT_FOUND this run

  for (let i = 0; i < repos.length; i += BATCH) {
    let pending = repos.slice(i, i + BATCH);
    let attempt = 0;
    while (pending.length > 0 && attempt < 3) {
      attempt++;
      const aliases = pending.map((r, j) => {
        const [owner, name] = r.split('/');
        return `r${j}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { stargazerCount pushedAt }`;
      }).join('\n');

      const { status, ok, json } = await graphqlQuery(token, aliases);

      // rate-limit / server error: backoff once, then give up gracefully on this batch
      if (!ok || status !== 200) {
        if (attempt < 3 && (status === 403 || status >= 500)) {
          console.error(`refresh-stars: batch ${i / BATCH + 1} HTTP ${status} — backoff retry (${attempt})`);
          await sleep(10000);
          continue;
        }
        console.error(`refresh-stars: batch ${i / BATCH + 1} failed (HTTP ${status}) — ${pending.length} repos keep previous values`);
        break;
      }

      const body = (json && json.data) || {};
      const bad = new Set(); // repos to re-query without
      if (json && Array.isArray(json.errors)) {
        for (const err of json.errors) {
          const p = err.path && err.path[0];
          const j = p ? parseInt(String(p).slice(1), 10) : NaN;
          if (!isNaN(j) && pending[j]) {
            bad.add(pending[j]);
            detected.add(pending[j]);
          }
        }
      }

      pending.forEach((r, j) => {
        if (bad.has(r)) return;
        const node = body[`r${j}`];
        if (node && typeof node.stargazerCount === 'number') {
          fresh[r] = { stars: node.stargazerCount, pushedAt: node.pushedAt || null };
        }
      });

      if (bad.size > 0) {
        // strip the bad aliases and retry the remaining ones (max 3 attempts total)
        pending = pending.filter((r) => !bad.has(r));
        if (attempt < 3) continue;
      }
      break; // batch finished (all good or no errors)
    }

    // small pause between batches to stay well inside secondary rate limits
    await sleep(250);
  }

  // ---- deleted-repos.json bookkeeping ----
  let deletedChanged = false;
  if (detected.size > 0) {
    for (const repo of detected) {
      const entry = all.find((e) => e.repo === repo);
      const known = deletedMap.get(repo);
      if (known) {
        known.seen += 1;
        known.lastDetectedAt = new Date().toISOString();
        if (entry) { known.lastStars = entry.stars; known.lastPush = entry.last_push || ''; }
      } else {
        deletedMap.set(repo, {
          repo,
          seen: 1,
          firstDetectedAt: new Date().toISOString(),
          lastDetectedAt: new Date().toISOString(),
          lastStars: entry ? entry.stars : null,
          lastPush: entry ? entry.last_push || '' : '',
          lastKnownUrl: entry ? entry.url || '' : '',
        });
      }
      deletedChanged = true;
    }
    sortAndWriteDeleted(deletedReport, deletedMap);
    console.error(`refresh-stars: NOT_FOUND ${detected.size} repo(s) — retried batch without them; tracked in data/deleted-repos.json`);
    for (const repo of [...detected].sort()) {
      const d = deletedMap.get(repo);
      console.error(`  - ${repo} (seen ${d.seen}/${EXCLUDE_AFTER_SEEN}, lastStars=${d.lastStars})`);
    }
  }

  // ---- apply stars / last_push ----
  let changed = 0;
  for (const e of all) {
    if (e.repo === SELF_DEV_REPO) continue; // never touch self-dev featured
    const f = fresh[e.repo];
    if (!f) continue; // deleted/renamed/rate-limited -> keep previous value
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
    console.log(`refresh-stars: no changes — ${all.length} entries, ${fetched} repos fetched, ${detected.size} NOT_FOUND (${elapsed}s)`);
    // deleted-repos.json may still have been updated above — leave it staged
    return; // idempotent: leave generated_at untouched
  }

  data._meta.generated_at = new Date().toISOString();
  data._meta.source = 'hourly refresh-stars (GitHub GraphQL)';
  writeFileSync(DATA, JSON.stringify(data, null, 1) + '\n', 'utf8');
  console.log(`refresh-stars: updated ${changed}/${all.length} entries, ${fetched} repos fetched, ${detected.size} NOT_FOUND (${elapsed}s)`);
}

function sortAndWriteDeleted(report, map) {
  const repos = [...map.values()].sort((a, b) => (b.seen - a.seen) || a.repo.localeCompare(b.repo));
  report.generated_at = new Date().toISOString();
  report.repos = repos;
  writeFileSync(DELETED, JSON.stringify(report, null, 2) + '\n', 'utf8');
}

main().catch((e) => { console.error(e); process.exit(1); });
