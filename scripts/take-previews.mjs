#!/usr/bin/env node
/**
 * take-previews.mjs — 拍摄站点预览图（首页中英 + Star 榜中英，共 4 张）到 site/preview/<YYYY-MM-DD>/。
 * 用 research/.venv 的 playwright（Python）截图；本地/CI 同一脚本。
 * 用法：node scripts/take-previews.mjs [--date YYYY-MM-DD] [--port 8931]
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = join(ROOT, 'site');

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const date = arg('--date', today());
const port = arg('--port', '8931');
const OUT = join(SITE, 'preview', date);
mkdirSync(OUT, { recursive: true });

// playwright 的 python：本地 research/.venv 优先，CI 回退 python3
const venvPy = join(ROOT, '..', 'research', '.venv', 'bin', 'python');
const python = existsSync(venvPy) ? venvPy : 'python3';
const base = `http://127.0.0.1:${port}`;

async function waitReady(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try { const res = await fetch(url); if (res.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`server not ready: ${url}`);
}

const server = spawn('python3', ['-m', 'http.server', port], { cwd: SITE, stdio: 'ignore' });
try {
  await waitReady(`${base}/`);
  const shotPy = join(__dirname, 'preview-shot.py');
  const r = spawnSync(python, [shotPy, base, OUT, date], { stdio: 'inherit' });
  if (r.status !== 0) { console.error('take-previews: 截图失败'); process.exitCode = 1; }
  else console.log(`take-previews: 4 张预览图 -> ${OUT}`);
} finally {
  server.kill();
}
