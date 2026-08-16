#!/usr/bin/env node
// fetch-og-cache.mjs — 目录卡片配图管线：Top N（按星）条目抓 GitHub opengraph 图，
// 压缩后落到 site/assets/og-cache/<id>.jpg；已存在的跳过（幂等）。
// 用法: node scripts/fetch-og-cache.mjs [--limit 100] [--refresh]
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data', 'plugins.json');
const CACHE_DIR = join(ROOT, 'site', 'assets', 'og-cache');
const MAX_BYTES = 100 * 1024;
const CONCURRENCY = 6;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(25000) });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 0) return buf;
      }
    } catch (e) { /* transient */ }
    await sleep(1500 * i);
  }
  return null;
}

function compressToJpeg(src, dest) {
  // adaptive: try quality 72 -> 55 -> 45 so busy PNG screenshots still fit <=100KB
  const attempts = [];
  for (const q of [72, 55, 45]) {
    attempts.push(() => execFileSync('magick', [src, '-resize', '1200x>', '-quality', String(q), dest], { stdio: 'ignore' }));
    attempts.push(() => execFileSync('convert', [src, '-resize', '1200x>', '-quality', String(q), dest], { stdio: 'ignore' }));
    attempts.push(() => execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(q), src, '--out', dest], { stdio: 'ignore' }));
  }
  for (const fn of attempts) {
    try { fn(); if (existsSync(dest) && statSync(dest).size <= MAX_BYTES) return true; } catch (e) { /* next */ }
  }
  return existsSync(dest);
}

async function main() {
  const args = process.argv.slice(2);
  const li = args.indexOf('--limit');
  const limit = li >= 0 ? parseInt(args[li + 1], 10) : 100;
  const refresh = args.includes('--refresh');

  const data = JSON.parse(await readFile(DATA, 'utf-8'));
  const curated = (data.plugins || []).filter((p) => p.repo && !p.repo.startsWith('whyihaveyou/dsh-suite'));
  curated.sort((a, b) => (b.stars || 0) - (a.stars || 0));
  const top = curated.slice(0, limit);
  await mkdir(CACHE_DIR, { recursive: true });

  const results = { ok: 0, exists: 0, failed: 0, oversize: 0, skip: 0 };

  async function processOne(entry) {
    const [owner, repo] = (entry.repo || '').split('/');
    if (!owner || !repo) { results.skip++; return; }
    const dest = join(CACHE_DIR, entry.id + '.jpg');
    if (!refresh && existsSync(dest)) { results.exists++; return; }
    const url = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    const buf = await fetchWithRetry(url);
    if (!buf) { results.failed++; console.log(`[fetch-og] FAIL  ${entry.id}`); return; }
    const tmp = join(CACHE_DIR, entry.id + '.tmp');
    await writeFile(tmp, buf);
    const compressed = compressToJpeg(tmp, dest);   // always try -> jpeg (q72)
    await rm(tmp, { force: true });
    const wantJpeg = compressed && existsSync(dest) && (await readFile(dest)).length <= MAX_BYTES;
    if (wantJpeg && (buf.length > MAX_BYTES || buf[0] !== 0xff)) {
      // jpeg output is small enough AND (original was big OR original was not jpeg) -> use it
      results.ok++;
    } else if (buf.length <= MAX_BYTES) {
      await writeFile(dest, buf);   // original already fine (jpeg or small)
      results.ok++;
    } else {
      await writeFile(dest, buf);   // compression failed to get under the cap -> best effort
      results.oversize++;
    }
  }

  let next = 0;
  async function worker() {
    while (next < top.length) {
      const entry = top[next++];
      await processOne(entry);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, top.length) }, worker));
  console.log(`[fetch-og] done: top=${top.length} ok=${results.ok} exists=${results.exists} failed=${results.failed} oversize=${results.oversize} skip=${results.skip}`);
}

main().catch((e) => { console.error('[fetch-og] error:', e.message); process.exit(1); });
