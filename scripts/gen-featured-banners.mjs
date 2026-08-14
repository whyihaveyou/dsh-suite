#!/usr/bin/env node
/**
 * gen-featured-banners.mjs — 为 featured 插件生成 1200x400 精选横幅 PNG。
 * 模板生成（非手工逐张）：读 data/plugins.json → 过滤 featured → 调 scripts/render-banner.py (Pillow)。
 * 输出：site/assets/badges/<plugin-id>.png
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA = join(ROOT, 'data', 'plugins.json');
const MASCOT = join(ROOT, 'site', 'assets', 'brand', 'mascot.webp');
const OUT_DIR = join(ROOT, 'site', 'assets', 'badges');
const RENDERER = join(__dirname, 'render-banner.py');

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const featured = (data.plugins || []).filter((p) => p.featured);
if (!featured.length) {
  console.error('gen-featured-banners: 无 featured 插件');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

let ok = 0;
for (const p of featured) {
  const id = String(p.id || p.name || 'plugin')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'plugin';
  const out = join(OUT_DIR, `${id}.png`);
  try {
    execFileSync('python3', [RENDERER, p.name || id, out, MASCOT, p.repo || ''], { stdio: 'pipe' });
    ok++;
  } catch (e) {
    console.error(`  [FAIL] ${p.name}: ${String(e.stderr || e.message).trim().split('\n').slice(-1)[0]}`);
  }
}
console.log(`gen-featured-banners: ${ok}/${featured.length} banners -> ${OUT_DIR}`);
