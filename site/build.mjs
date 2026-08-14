#!/usr/bin/env node
/**
 * dsh-suite 目录站静态生成器 —— 零依赖（只用 Node 内置模块）
 *
 * 用法：
 *   node site/build.mjs                      # 用默认数据源，输出到 site/
 *   node site/build.mjs --data <path.json>   # 指定目录数据源
 *   node site/build.mjs --base-url <url>     # 覆盖 Pages 绝对 URL（用于 sitemap/og）
 *
 * 数据源优先级（会自动探测）：
 *   1. dsh-suite/data/plugins.json   —— Core-Builder 规整版（164 curated + 57 watchlist），首选
 *   2. research/plugins-catalog.json —— Eco-Scout 原始 222 条（fallback）
 * 两种 schema 都在 normalize() 里统一成同一种 catalog 条目，切换数据源无需改前端。
 *
 * 产物（全部落在 site/ 目录）：
 *   index.html   英文版（含服务端渲染全量卡片，SEO 友好）
 *   zh.html      中文版
 *   catalog.json 双语搜索索引（公开，供 shields 端点 / 程序化消费）
 *   sitemap.xml  robots.txt  .nojekyll
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url)); // site/
const REPO_ROOT = resolve(__dirname, '..');                 // dsh-suite/
const RESEARCH_ROOT = resolve(REPO_ROOT, '..', 'research'); // 探索目录/research/

/* ------------------------------------------------------------------ */
/* 配置                                                                */
/* ------------------------------------------------------------------ */

const REPO = 'whyihaveyou/dsh-suite';
const REPO_URL = `https://github.com/${REPO}`;

// GitHub Pages 绝对基址（project site）—— Lead 开 Pages 后即此地址
const DEFAULT_BASE_URL = `https://whyihaveyou.github.io/dsh-suite/`;

// 数据源候选（按优先级）
const DATA_CANDIDATES = [
  { path: resolve(REPO_ROOT, 'data', 'plugins.json'), kind: 'normalized' },
  { path: resolve(RESEARCH_ROOT, 'plugins-catalog.json'), kind: 'raw' },
];

/* ------------------------------------------------------------------ */
/* 分类 / 兼容 / 待审核原因 枚举（对齐 dsh-suite-architecture.md §4）    */
/* ------------------------------------------------------------------ */

// 11 类完整枚举（数据里未出现的类，筛选器不会渲染，但标签映射齐全）
const CATEGORIES = [
  { id: 'tools',         en: 'Tools',         zh: '工具' },
  { id: 'skills',        en: 'Skills',        zh: '技能' },
  { id: 'ui',            en: 'UI',            zh: '界面' },
  { id: 'session',       en: 'Session',       zh: '会话' },
  { id: 'llm',           en: 'LLM',           zh: '模型' },
  { id: 'sandbox',       en: 'Sandbox',       zh: '沙箱' },
  { id: 'orchestration', en: 'Orchestration', zh: '编排' },
  { id: 'storage',       en: 'Storage',       zh: '存储' },
  { id: 'acp',           en: 'ACP',           zh: '桥接' },
  { id: 'preset',        en: 'Preset',        zh: '预设' },
  { id: 'utility',       en: 'Utility',       zh: '其他' },
];
const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// 兼容性徽章（对齐架构 §6：🟢ok / 🔴broken / ⚪unknown / ⚫unmaintained）
const COMPAT = {
  ok:           { en: 'Compatible',   zh: '兼容',   cls: 'ok',           icon: '🟢' },
  broken:       { en: 'Broken',       zh: '损坏',   cls: 'broken',       icon: '🔴' },
  unknown:      { en: 'Unverified',   zh: '未验证', cls: 'unknown',      icon: '⚪' },
  unmaintained: { en: 'Unmaintained', zh: '弃坑',   cls: 'unmaintained', icon: '⚫' },
};

// watchlist 原因（对齐 plugins.json _meta.watchlist_reasons）
const WATCH_REASONS = {
  '占位':  { en: 'placeholder', zh: '占位',   cls: 'w-placeholder' },
  '工具链': { en: 'toolchain',   zh: '工具链', cls: 'w-toolchain' },
  '蹭tag':  { en: 'tag-riding',  zh: '蹭 tag', cls: 'w-tagriding' },
};

// 原始 13 类 → 归一 11 类（对齐 plugins.json _meta.category_mapping）
const RAW_CATEGORY_MAP = {
  tool: 'tools', 'dev-tool': 'tools', integration: 'tools',
  ui: 'ui', skin: 'ui',
  session: 'session', context: 'session',
  vision: 'llm',
  workflow: 'orchestration', agent: 'orchestration',
  launcher: 'utility', list: 'utility', fun: 'utility',
};

/* ------------------------------------------------------------------ */
/* 文案（中英双语，对齐 research/launch-kit.md §1 §3）                  */
/* ------------------------------------------------------------------ */

const SEO_KEYWORDS = 'DeepSeek Harness plugins, dsh 插件, dsh-plugin, dsh, deepseek, awesome-list, plugins, cordis, scaffold, agent-framework, developer-tools';

const I18N = {
  en: {
    lang: 'en', hreflang: 'en', otherLang: 'zh', otherHref: 'zh.html', otherLabel: '中文',
    title: 'dsh-suite — the curated DeepSeek Harness plugin directory',
    description: 'Bilingual curated directory of DSH plugins with daily compatibility checks + a create-dsh-plugin scaffold. No more scrolling GitHub\u2019s dsh-plugin topic for broken plugins.',
    slogan: 'Stop scrolling the dsh-plugin topic. Find plugins that still work.',
    subtitle: 'A curated, bilingual DeepSeek Harness plugin directory — every entry carries a compatibility badge, re-checked daily by CI, plus a first-party scaffolder (create-dsh-plugin).',
    brand: 'dsh-suite',
    github: 'GitHub',
    statPlugins: 'curated plugins', statCategories: 'categories', statFeatured: 'featured', statWatch: 'in watchlist',
    searchPlaceholder: 'Search plugins by name or description…',
    filterAll: 'All',
    sortLabel: 'Sort',
    sortStarsDesc: 'Most stars', sortStarsAsc: 'Fewest stars', sortNameAsc: 'Name A\u2013Z', sortNameDesc: 'Name Z\u2013A',
    featured: 'Featured', featuredHint: 'Hand-picked highlights from the catalog.',
    catalog: 'All plugins', catalogHint: 'Every curated plugin, sorted by stars.',
    watchlist: 'Watchlist', watchlistHint: 'Under review — collected from the dsh-plugin topic but not yet verified as installable DSH plugins.',
    results: 'result(s)',
    empty: 'No plugins match your search. Try a different keyword or category.',
    cardCopy: 'Copy', cardCopied: 'Copied!', cardRepo: 'Repo', cardStars: 'stars',
    badgeFeatured: 'Featured', badgeBeta: 'Beta',
    footAbout: 'A bilingual curated directory, a create-dsh-plugin scaffolder, and first-party plugins for DeepSeek Harness.',
    footBuilt: 'Built from', footPlugins: 'plugins',
    mascotCaption: 'Meet Suitie — your plugin-finding maid',
    mascotAlt: 'Suitie, the whale-girl maid mascot holding a glowing AI core',
    footContributing: 'Contributing',
  },
  zh: {
    lang: 'zh-CN', hreflang: 'zh-CN', otherLang: 'en', otherHref: 'index.html', otherLabel: 'English',
    title: 'dsh-suite — DeepSeek Harness 插件精选目录',
    description: '中英双语 DSH 插件精选目录，每日兼容性检查 + create-dsh-plugin 脚手架。别再在 GitHub 的 dsh-plugin topic 里翻坏插件了。',
    slogan: '别再翻 dsh-plugin topic 了，这里都是还能跑的插件。',
    subtitle: '中英双语精选 DeepSeek Harness 插件目录：每个条目带兼容性徽章，CI 每日重测，另附 create-dsh-plugin 脚手架。',
    brand: 'dsh-suite',
    github: 'GitHub',
    statPlugins: '个精选插件', statCategories: '个分类', statFeatured: '个精选', statWatch: '条待审核',
    searchPlaceholder: '按名称或描述搜索插件…',
    filterAll: '全部',
    sortLabel: '排序',
    sortStarsDesc: '星数降序', sortStarsAsc: '星数升序', sortNameAsc: '名称 A\u2013Z', sortNameDesc: '名称 Z\u2013A',
    featured: '精选插件', featuredHint: '从目录里手工挑出的亮点。',
    catalog: '全部插件', catalogHint: '所有精选插件，按星数排序。',
    watchlist: '待审核', watchlistHint: '待审核 — 从 dsh-plugin topic 收集、但尚未核实为可安装 DSH 插件的项目。',
    results: '条结果',
    empty: '没有匹配的插件，换个关键词或分类试试。',
    cardCopy: '复制', cardCopied: '已复制！', cardRepo: '仓库', cardStars: '星',
    badgeFeatured: '精选', badgeBeta: '内测',
    footAbout: '中英双语精选目录 + create-dsh-plugin 脚手架 + 第一方插件，为 DeepSeek Harness 而生。',
    footBuilt: '由', footPlugins: '个插件',
    mascotCaption: '吉祥物 Suitie——帮你找还能用插件的鲸娘女仆',
    mascotAlt: '吉祥物 Suitie：捧着发光 AI 核心球的鲸娘女仆',
    footContributing: '贡献指南',
  },
};

/* ------------------------------------------------------------------ */
/* 工具函数                                                            */
/* ------------------------------------------------------------------ */

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function fmtStars(n) {
  n = Number(n) || 0;
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function slug(name) {
  return String(name || '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'plugin';
}

/** 安装命令：install 字段 > npm 包名 > git 源（当前 164 条全部为 git 源） */
function buildInstallCmd(entry) {
  if (entry.install) return entry.install;
  if (entry.npm) return `dsh plugin add ${entry.npm}`;
  if (entry.repo) return `dsh plugin add git+https://github.com/${entry.repo}`;
  return '';
}

/* ------------------------------------------------------------------ */
/* 数据归一化（两种 schema → 统一 catalog 条目）                        */
/* ------------------------------------------------------------------ */

function normalizeCurated(e) {
  return {
    id: e.id || slug(e.name),
    name: e.name || '',
    repo: e.repo || '',
    url: e.url || (e.repo ? `https://github.com/${e.repo}` : ''),
    category: e.category || 'utility',
    desc_en: (e.description && e.description.en) || '',
    desc_zh: (e.description && e.description.zh) || (e.description && e.description.en) || '',
    author: e.author || (e.repo || '').split('/')[0] || '',
    stars: Number(e.stars) || 0,
    language: e.language || '',
    license: e.license || 'unknown',
    featured: !!e.featured,
    isOfficialBeta: !!e.isOfficialBeta,
    compatStatus: (e.compat && e.compat.status) || 'unknown',
    installCmd: buildInstallCmd(e),
    watchReason: e.watchReason || '',
  };
}

function normalizeRaw(e) {
  return {
    id: slug(e.name),
    name: e.name || '',
    repo: e.repo || '',
    url: e.url || (e.repo ? `https://github.com/${e.repo}` : ''),
    category: RAW_CATEGORY_MAP[e.category] || 'utility',
    desc_en: e.desc_en || '',
    desc_zh: e.desc_zh || e.desc_en || '',
    author: (e.repo || '').split('/')[0] || '',
    stars: Number(e.stars) || 0,
    language: e.language || '',
    license: 'unknown',
    featured: false,
    isOfficialBeta: !!e.is_official_beta,
    compatStatus: 'unknown',
    installCmd: e.repo ? `dsh plugin add git+https://github.com/${e.repo}` : '',
    watchReason: '',
  };
}

/** 排除"框架本体"类条目：插件目录不该把 harness 自己当插件收录 */
function isFrameworkRepo(e) {
  return e.sourceNote === '官方仓库' || e.repo === 'deepseek-ai/deepseek-harness' || e.notes === '官方仓库';
}

/** 全局 id 去重（跨 curated+watchlist），冲突时追加 -2 / -3 后缀，保证 data-id 唯一 */
function dedupeIds(items) {
  const seen = new Set();
  return items.map(p => {
    if (!seen.has(p.id)) { seen.add(p.id); return p; }
    let i = 2;
    while (seen.has(`${p.id}-${i}`)) i++;
    const id = `${p.id}-${i}`;
    seen.add(id);
    return { ...p, id };
  });
}

/** 读数据源，返回 { catalog: [...], watchlist: [...], meta: {...} } */
function loadData(dataPath) {
  const json = JSON.parse(readFileSync(dataPath, 'utf8'));

  if (json && Array.isArray(json.plugins)) {
    // 规整版 schema
    const curated = json.plugins.filter(e => !isFrameworkRepo(e)).map(normalizeCurated);
    const watch = (json.watchlist || []).filter(e => !isFrameworkRepo(e)).map(normalizeCurated);
    const merged = dedupeIds([...curated, ...watch]);
    return {
      catalog: merged.slice(0, curated.length),
      watchlist: merged.slice(curated.length),
      meta: json._meta || {},
    };
  }
  if (json && Array.isArray(json.entries)) {
    // 原始版 schema（fallback）：排除官方 harness 本体，全部作为 catalog
    const catalog = dedupeIds(
      json.entries.filter(e => !isFrameworkRepo(e)).map(normalizeRaw)
    );
    return { catalog, watchlist: [], meta: json._meta || {} };
  }
  throw new Error(`无法识别的数据 schema: ${dataPath}`);
}

/* ------------------------------------------------------------------ */
/* HTML 渲染（服务端，SEO 友好）                                        */
/* ------------------------------------------------------------------ */

const isZh = (t) => (t.lang || '').indexOf('zh') === 0;

function compatBadge(status, t) {
  const c = COMPAT[status] || COMPAT.unknown;
  const label = c[isZh(t) ? 'zh' : 'en'];
  return `<span class="badge badge-compat badge-${c.cls}" title="${esc(label)}">${c.icon} ${esc(label)}</span>`;
}

function renderCard(p, t, { featured = false, watch = false } = {}) {
  const cat = CATEGORY_LABEL[p.category] || { en: p.category, zh: p.category };
  const catLabel = isZh(t) ? cat.zh : cat.en;
  const desc = isZh(t) ? p.desc_zh : p.desc_en;
  const compat = COMPAT[p.compatStatus] || COMPAT.unknown;
  const compatLabel = isZh(t) ? compat.zh : compat.en;

  const ribbons = [];
  if (featured) ribbons.push(`<span class="ribbon ribbon-featured">★ ${esc(t.badgeFeatured)}</span>`);
  if (p.isOfficialBeta) ribbons.push(`<span class="ribbon ribbon-beta">${esc(t.badgeBeta)}</span>`);

  let watchBadge = '';
  if (watch && p.watchReason) {
    const wr = WATCH_REASONS[p.watchReason] || { en: p.watchReason, zh: p.watchReason, cls: 'w-placeholder' };
    watchBadge = `<span class="badge badge-watch ${wr.cls}">${esc(isZh(t) ? wr.zh : wr.en)}</span>`;
  }

  const copyBtn = p.installCmd
    ? `<button class="copy-btn" type="button" data-cmd="${esc(p.installCmd)}" aria-label="${esc(t.cardCopy)}">${esc(t.cardCopy)}</button>`
    : '';

  const author = p.author ? `<span class="card-author">@${esc(p.author)}</span>` : '';
  const stars = `<span class="card-stars" title="${p.stars} ${esc(t.cardStars)}">★ ${fmtStars(p.stars)}</span>`;
  const langBadge = p.language ? `<span class="card-lang">${esc(p.language)}</span>` : '';

  return `
  <article class="card${featured ? ' card-featured' : ''}${watch ? ' card-watch' : ''}" data-id="${esc(p.id)}" data-name="${esc(p.name)}" data-category="${esc(p.category)}" data-stars="${p.stars}">
    <div class="card-top">
      <a class="card-name" href="${esc(p.url || REPO_URL)}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>
      <div class="card-ribbons">${ribbons.join('')}</div>
    </div>
    <p class="card-desc">${esc(desc || '')}</p>
    <div class="card-meta">
      ${compatBadge(p.compatStatus, t)}
      ${watchBadge}
      ${langBadge}
      ${author}
      <span class="card-meta-spacer"></span>
      ${stars}
    </div>
    <div class="card-foot">
      <code class="install-cmd">${esc(p.installCmd || '')}</code>
      ${copyBtn}
      <a class="repo-link" href="${esc(p.url || REPO_URL)}" target="_blank" rel="noopener noreferrer">${esc(t.cardRepo)} ↗</a>
    </div>
  </article>`;
}

function renderGrid(items, t, opts = {}) {
  return items.map(p => renderCard(p, t, opts)).join('\n');
}

function renderPage(t, data, baseUrl) {
  const { catalog, watchlist } = data;
  const cats = [...new Set(catalog.map(p => p.category))];
  const featuredList = catalog.filter(p => p.featured);
  const catCount = cats.length;

  const sortByStarsDesc = (a, b) => b.stars - a.stars;
  const sortedCatalog = [...catalog].sort(sortByStarsDesc);
  const sortedFeatured = [...featuredList].sort(sortByStarsDesc);
  const sortedWatch = [...watchlist].sort(sortByStarsDesc);

  const thisUrl = baseUrl + (isZh(t) ? 'zh.html' : '');
  const altUrl = baseUrl + (isZh(t) ? '' : 'zh.html');

  // 筛选器 chips（只渲染数据里实际存在的分类）
  const filterChips = [`<button class="chip active" data-cat="all" type="button">${esc(t.filterAll)}</button>`]
    .concat(cats.map(c => {
      const label = CATEGORY_LABEL[c] || { en: c, zh: c };
      return `<button class="chip" data-cat="${esc(c)}" type="button">${esc(isZh(t) ? label.zh : label.en)}</button>`;
    }))
    .join('\n');

  // 语言自动重定向（仅英文首页；浏览器中文且未手动选择 → 跳 zh.html；?lang=en/zh 可显式覆盖）
  const langRedirect = isZh(t) ? '' : `
  <script>
    (function () {
      try {
        var q = new URL(location.href).searchParams.get('lang');
        if (q === 'zh' || q === 'en') {
          try { localStorage.setItem('dshLang', q); } catch (e) {}
          if (q === 'zh' && location.pathname.slice(-8) !== 'zh.html') location.replace('zh.html');
          return;
        }
        if (localStorage.getItem('dshLang')) return;
        var nav = (navigator.language || navigator.userLanguage || '');
        if (nav.toLowerCase().indexOf('zh') === 0) {
          try { localStorage.setItem('dshLang', 'zh'); } catch (e) {}
          location.replace('zh.html');
        }
      } catch (e) {}
    })();
  </script>`;

  const jsonBlob = JSON.stringify({ catalog, meta: { total: catalog.length, watchlist: watchlist.length, featured: featuredList.length, categories: cats } });

  return `<!doctype html>
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.description)}">
  <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
  <meta name="theme-color" content="#0b0f1a">
  <link rel="canonical" href="${esc(thisUrl)}">
  <link rel="alternate" hreflang="en" href="${esc(baseUrl)}">
  <link rel="alternate" hreflang="zh-CN" href="${esc(baseUrl)}zh.html">
  <link rel="alternate" hreflang="x-default" href="${esc(baseUrl)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="dsh-suite">
  <meta property="og:title" content="${esc(t.title)}">
  <meta property="og:description" content="${esc(t.description)}">
  <meta property="og:url" content="${esc(thisUrl)}">
  <meta property="og:image" content="${esc(baseUrl)}assets/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t.title)}">
  <meta name="twitter:description" content="${esc(t.description)}">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/brand/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/apple-touch-icon.png">
  <link rel="stylesheet" href="assets/style.css">
  ${langRedirect}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${isZh(t) ? 'zh.html' : 'index.html'}"><span class="brand-mark">dsh</span>&nbsp;suite</a>
    <nav class="nav">
      <a class="nav-lang" href="${t.otherHref}" onclick="try{localStorage.setItem('dshLang','${t.otherLang}')}catch(e){}">${esc(t.otherLabel)}</a>
      <a class="nav-gh" href="${REPO_URL}" target="_blank" rel="noopener noreferrer">${esc(t.github)} ↗</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-text">
          <h1 class="slogan">${esc(t.slogan)}</h1>
          <p class="subtitle">${esc(t.subtitle)}</p>
          <div class="hero-badges">
            <img class="hbadge-img" alt="GitHub stars" src="https://img.shields.io/github/stars/${REPO}?style=flat-square&color=facc15&label=stars" onerror="this.style.display='none'">
            <span class="hbadge">${catalog.length} ${esc(t.statPlugins)}</span>
            <span class="hbadge">${catCount} ${esc(t.statCategories)}</span>
            <span class="hbadge">${featuredList.length} ${esc(t.statFeatured)}</span>
            <a class="hbadge hbadge-accent" href="${REPO_URL}/actions" target="_blank" rel="noopener noreferrer">${esc(isZh(t) ? '每日兼容性 CI' : 'daily compat CI')} ↗</a>
          </div>
          <div class="hero-cta">
            <code class="cta-cmd">dsh plugin add git+https://github.com/&lt;owner&gt;/&lt;repo&gt;</code>
          </div>
        </div>
        <figure class="mascot-card">
          <img class="mascot-img" src="assets/brand/mascot.webp" width="600" height="600" loading="lazy" alt="${esc(t.mascotAlt)}">
          <figcaption class="mascot-caption">${esc(t.mascotCaption)}</figcaption>
        </figure>
      </div>
    </section>

    <section class="controls" aria-label="search and filters">
      <div class="controls-row">
        <input id="search" type="search" placeholder="${esc(t.searchPlaceholder)}" autocomplete="off" spellcheck="false">
        <select id="sort" aria-label="${esc(t.sortLabel)}">
          <option value="stars_desc">${esc(t.sortStarsDesc)}</option>
          <option value="stars_asc">${esc(t.sortStarsAsc)}</option>
          <option value="name_asc">${esc(t.sortNameAsc)}</option>
          <option value="name_desc">${esc(t.sortNameDesc)}</option>
        </select>
      </div>
      <div class="filters" id="filters">${filterChips}</div>
      <p class="result-count" id="result-count" hidden></p>
    </section>

    <section class="featured" id="featured">
      <h2 class="section-title">★ ${esc(t.featured)}</h2>
      <p class="section-hint">${esc(t.featuredHint)}</p>
      <div class="grid" id="featured-grid">${renderGrid(sortedFeatured, t, { featured: true })}</div>
    </section>

    <section class="catalog" id="catalog">
      <h2 class="section-title">${esc(t.catalog)}</h2>
      <p class="section-hint">${esc(t.catalogHint)}</p>
      <div class="grid" id="catalog-grid">${renderGrid(sortedCatalog, t)}</div>
    </section>

    <section class="watchlist" id="watchlist">
      <details${watchlist.length ? '' : ' open'}>
        <summary>${esc(t.watchlist)} (${watchlist.length})</summary>
        <p class="section-hint">${esc(t.watchlistHint)}</p>
        ${watchlist.length ? `<div class="grid grid-watch" id="watchlist-grid">${renderGrid(sortedWatch, t, { watch: true })}</div>` : `<p class="section-hint">—</p>`}
      </details>
    </section>
  </main>

  <footer class="site-footer">
    <p class="foot-about">${esc(t.footAbout)}</p>
    <nav class="foot-links">
      <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer">${esc(t.github)}</a>
      <a href="https://www.npmjs.com/package/create-dsh-plugin" target="_blank" rel="noopener noreferrer">create-dsh-plugin</a>
      <a href="https://www.npmjs.com/package/@dsh-suite/plugin-notify" target="_blank" rel="noopener noreferrer">plugin-notify</a>
      <a href="https://www.npmjs.com/package/@dsh-suite/plugin-session-export" target="_blank" rel="noopener noreferrer">plugin-session-export</a>
      <a href="${REPO_URL}/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">${esc(t.footContributing)}</a>
      <a href="${REPO_URL}/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT</a>
      <a href="sitemap.xml">sitemap.xml</a>
    </nav>
  </footer>

  <script type="application/json" id="catalog-data">${jsonBlob}</script>
  <script src="assets/app.js"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* 主流程                                                              */
/* ------------------------------------------------------------------ */

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--data' && argv[i + 1]) args.data = argv[i + 1];
    if (argv[i] === '--base-url' && argv[i + 1]) args.baseUrl = argv[i + 1];
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = args.baseUrl || process.env.SITE_BASE_URL || DEFAULT_BASE_URL;

  // 选数据源
  let dataPath = args.data;
  let kind = 'custom';
  if (!dataPath) {
    for (const cand of DATA_CANDIDATES) {
      if (existsSync(cand.path)) { dataPath = cand.path; kind = cand.kind; break; }
    }
  }
  if (!dataPath) {
    console.error('[build] 未找到数据源，尝试过的路径：', DATA_CANDIDATES.map(c => c.path));
    process.exit(1);
  }

  const data = loadData(dataPath);
  const { catalog, watchlist } = data;

  mkdirSync(join(__dirname, 'assets'), { recursive: true });

  // 1) 英文 / 中文 HTML
  writeFileSync(join(__dirname, 'index.html'), renderPage(I18N.en, data, baseUrl));
  writeFileSync(join(__dirname, 'zh.html'), renderPage(I18N.zh, data, baseUrl));

  // 2) 公开搜索索引（供 shields 端点 / 程序化消费）
  const catalogIndex = {
    schema_version: '1.0',
    generated_at: new Date().toISOString(),
    repo: REPO,
    totals: { curated: catalog.length, watchlist: watchlist.length, featured: catalog.filter(p => p.featured).length },
    plugins: catalog,
    watchlist,
  };
  writeFileSync(join(__dirname, 'catalog.json'), JSON.stringify(catalogIndex, null, 2));

  // 3) sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}zh.html"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>
  <url>
    <loc>${baseUrl}zh.html</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}zh.html"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
  </url>
</urlset>
`;
  writeFileSync(join(__dirname, 'sitemap.xml'), sitemap);

  // 4) robots.txt
  writeFileSync(join(__dirname, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}sitemap.xml\n`);

  // 5) .nojekyll（禁用 Jekyll 处理，纯静态直出）
  writeFileSync(join(__dirname, '.nojekyll'), '');

  console.log('[build] 数据源:', dataPath, `(${kind})`);
  console.log('[build] curated:', catalog.length, '| watchlist:', watchlist.length, '| featured:', catalog.filter(p => p.featured).length);
  console.log('[build] 分类:', [...new Set(catalog.map(p => p.category))].join(', '));
  console.log('[build] 输出目录:', __dirname);
  console.log('[build] 产物: index.html, zh.html, catalog.json, sitemap.xml, robots.txt, .nojekyll');
}

main();
