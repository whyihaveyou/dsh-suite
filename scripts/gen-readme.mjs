#!/usr/bin/env node
/**
 * gen-readme.mjs — statically generate the bilingual plugin-catalog tables
 * in README.md (Chinese-primary, default) and README.en.md (English).
 *
 * Single source of truth: data/plugins.json. Never hand-edit the tables —
 * re-run this script after touching data/plugins.json.
 *
 * Zero runtime dependencies: Node built-ins only.
 *
 * Usage:
 *   node scripts/gen-readme.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const DATA_PATH = join(ROOT, 'data', 'plugins.json');
const README_EN = join(ROOT, 'README.en.md');
const README_ZH = join(ROOT, 'README.md');

const CATALOG_START = '<!-- CATALOG:START -->';
const CATALOG_END = '<!-- CATALOG:END -->';
const COUNT_PLACEHOLDER = '__PLUGIN_COUNT__';

// ---------------------------------------------------------------------------
// Category vocabulary (order + labels), aligned with docs/categories.md.
// ---------------------------------------------------------------------------
const CATEGORY_ORDER = [
  'tools', 'skills', 'ui', 'skin', 'session', 'llm',
  'sandbox', 'orchestration', 'storage', 'acp', 'preset', 'utility',
];

const CATEGORY_LABELS = {
  tools:         { en: 'Tools',         zh: '工具',   emoji: '🧰' },
  skills:        { en: 'Skills',        zh: '技能',   emoji: '🧩' },
  ui:            { en: 'UI',            zh: '界面',   emoji: '🎨' },
  skin:          { en: 'Skins',         zh: '皮肤',   emoji: '🐋' },
  session:       { en: 'Session',       zh: '会话',   emoji: '💬' },
  llm:           { en: 'LLM',           zh: '模型',   emoji: '🧠' },
  sandbox:       { en: 'Sandbox',       zh: '沙箱',   emoji: '🛡️' },
  orchestration: { en: 'Orchestration', zh: '编排',   emoji: '🎛️' },
  storage:       { en: 'Storage',       zh: '存储',   emoji: '💾' },
  acp:           { en: 'ACP',           zh: '桥接',   emoji: '🔌' },
  preset:        { en: 'Preset',        zh: '预设',   emoji: '📦' },
  utility:       { en: 'Utility',       zh: '其他',   emoji: '🧷' },
};

const COMPAT_BADGE = {
  ok: '🟢',
  broken: '🔴',
  unknown: '⚪',
  unmaintained: '⚫',
};

const MAX_DESC = 130;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function truncate(s, max = MAX_DESC) {
  s = (s || '').trim().replace(/\s+/g, ' ');
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

function compatCell(p) {
  const status = (p.compat && p.compat.status) || 'unknown';
  const badge = COMPAT_BADGE[status] || COMPAT_BADGE.unknown;
  const note = (p.compat && p.compat.note) ? ` (${p.compat.note})` : '';
  return `${badge} ${status}${note}`;
}

function pluginLink(p) {
  const name = p.name || p.id;
  const url = p.url || (p.repo ? `https://github.com/${p.repo}` : '');
  return url ? `[${name}](${url})` : name;
}

function desc(p, lang) {
  const d = p.description || {};
  const primary = lang === 'zh' ? d.zh : d.en;
  const fallback = lang === 'zh' ? d.en : d.zh;
  return truncate(primary || fallback || '');
}

function renderTable(items, lang) {
  const header = lang === 'zh'
    ? '| 插件 | ⭐ | 兼容 | 描述 |'
    : '| Plugin | ⭐ | Compat | Description |';
  const sep = '|---|---|---|---|';
  const rows = items.map((p) => {
    const stars = typeof p.stars === 'number' ? p.stars : 0;
    return `| ${pluginLink(p)} | ${stars} | ${compatCell(p)} | ${desc(p, lang)} |`;
  });
  return [header, sep, ...rows];
}

function renderCatalog(plugins, lang) {
  const out = [];

  const featured = plugins
    .filter((p) => p.featured)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0));
  if (featured.length > 0) {
    const title = lang === 'zh' ? '### ⭐ 精选' : '### ⭐ Featured';
    out.push(title, '');
    out.push(...renderTable(featured, lang));
    out.push('');
  }

  for (const cat of CATEGORY_ORDER) {
    const items = plugins.filter((p) => p.category === cat);
    if (items.length === 0) continue;
    const meta = CATEGORY_LABELS[cat] || { emoji: '📦', en: cat, zh: cat };
    const label = lang === 'zh' ? meta.zh : meta.en;
    out.push(`### ${meta.emoji} ${label}`, '');
    out.push(...renderTable(items, lang));
    out.push('');
  }

  // Legend (also serves as a generated-footer marker for diff review).
  if (lang === 'zh') {
    out.push(
      '> 徽章含义：🟢 兼容 · 🔴 不兼容 · ⚪ 未实测 · ⚫ 弃坑。',
      `> 共 ${plugins.length} 个条目，按分类分表、类内按 ⭐ 降序。收录 / 字段词典见 [docs/catalog-schema.md](docs/catalog-schema.md)。`
    );
  } else {
    out.push(
      '> Badges: 🟢 compatible · 🔴 broken · ⚪ unverified · ⚫ unmaintained.',
      `> ${plugins.length} entries total, grouped by category, sorted by ⭐ within each. Schema dictionary: [docs/catalog-schema.md](docs/catalog-schema.md).`
    );
  }

  return out.join('\n');
}

function inject(template, catalogMarkdown, pluginCount) {
  let s = template;
  // Badge count: handle the first-run placeholder AND re-derive every run.
  // The shields badge URL embeds the count, so it must not be a one-shot
  // replacement (otherwise re-runs leave a stale plugins-<N>).
  s = s.split(COUNT_PLACEHOLDER).join(String(pluginCount));
  s = s.replace(/(badge\/plugins-)\d+(-)/, `$1${pluginCount}$2`);
  // Replace the marker-delimited region (must already exist).
  const startIdx = s.indexOf(CATALOG_START);
  const endIdx = s.indexOf(CATALOG_END);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error(
      `Missing ${CATALOG_START} … ${CATALOG_END} markers in the README template.`
    );
  }
  const head = s.slice(0, startIdx + CATALOG_START.length);
  const tail = s.slice(endIdx);
  return `${head}\n${catalogMarkdown}\n${tail}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
  const plugins = Array.isArray(data.plugins) ? data.plugins : [];
  const watchlistCount = Array.isArray(data.watchlist) ? data.watchlist.length : 0;

  const catalogEn = renderCatalog(plugins, 'en');
  const catalogZh = renderCatalog(plugins, 'zh');

  const enBefore = readFileSync(README_EN, 'utf8');
  const zhBefore = readFileSync(README_ZH, 'utf8');

  const enAfter = inject(enBefore, catalogEn, plugins.length);
  const zhAfter = inject(zhBefore, catalogZh, plugins.length);

  writeFileSync(README_EN, enAfter, 'utf8');
  writeFileSync(README_ZH, zhAfter, 'utf8');

  // Sanity: every plugin appears exactly once in a category table; featured
  // entries are additionally highlighted in the top "Featured" section (a
  // curated subset, intentionally duplicated for scannability).
  const featuredCount = plugins.filter((p) => p.featured).length;
  const expectedRows = plugins.length + featuredCount;
  const enRows = catalogEn.split('\n').filter((l) => l.startsWith('| [')).length;
  const zhRows = catalogZh.split('\n').filter((l) => l.startsWith('| [')).length;

  console.log('gen-readme: OK');
  console.log(`  data/plugins.json: ${plugins.length} plugins (+${watchlistCount} watchlist), ${featuredCount} featured`);
  console.log(`  README.en.md       -> ${enRows} table rows (${expectedRows} expected)`);
  console.log(`  README.md          -> ${zhRows} table rows (${expectedRows} expected)`);

  if (enRows !== expectedRows || zhRows !== expectedRows) {
    console.error('  ERROR: table row count != expected — data drift detected.');
    process.exit(1);
  }
}

main();
