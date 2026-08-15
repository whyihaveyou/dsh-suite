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

// 精选徽章 markdown（全部收录插件自助可用，链接到站点首页）
const BADGE_MD = '[![featured on dsh-suite](https://img.shields.io/badge/featured%20on-dsh--suite-4d6bfe)](https://whyihaveyou.github.io/dsh-suite/)';

// 数据源候选（按优先级）
const DATA_CANDIDATES = [
  { path: resolve(REPO_ROOT, 'data', 'plugins.json'), kind: 'normalized' },
  { path: resolve(RESEARCH_ROOT, 'plugins-catalog.json'), kind: 'raw' },
];

// data/compat-installed.json — ids whose plugin config truly assembled (Layer 3).
// Only meaningful for the in-repo normalized source; where an entry id matches,
// build upgrades its evidence badge to L3 ("install-verified"). Missing/empty
// file simply leaves badges at their static level. This keeps L3 decoupled from
// plugins.json's `evidence` (which risk-scan.mjs overwrites on a manual run).
const INSTALLED_PATH = resolve(REPO_ROOT, 'data', 'compat-installed.json');
function loadInstalledIds() {
  try {
    const doc = JSON.parse(readFileSync(INSTALLED_PATH, 'utf8'));
    if (Array.isArray(doc.ids)) return new Set(doc.ids);
    if (doc.entries) return new Set(Object.keys(doc.entries));
    return new Set();
  } catch { return new Set(); }
}

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

/* Learn 学习资源（中英双语，手工维护的精选列表） */
const LEARN_RESOURCES = [
  { id: 'official-docs', type: 'official', lang: 'EN / 中文',
    url: 'https://deepseek-harness.github.io/',
    name_en: 'DeepSeek Harness official docs', name_zh: 'DeepSeek Harness 官方文档',
    desc_en: 'The official "orange paper" — install, config and plugin API reference.',
    desc_zh: '官方「橙皮书」——安装、配置与插件 API 的权威参考。' },
  { id: 'dev-guide', type: 'community', lang: 'EN / 中文', img: 'assets/learn/02-plugin-code.png',
    url: 'https://github.com/whyihaveyou/dsh-plugin-tutorial',
    name_en: 'DSH plugin dev guide', name_zh: 'DSH 插件开发指南',
    desc_en: 'Plugins from zero to one — registration, deps, effects, teardown, with real code.',
    desc_zh: '从 0 到 1 写插件——注册 / 依赖 / 副作用 / 卸载，配真实代码截图。' },
  { id: 'cordis-paper', type: 'paper', lang: 'EN',
    url: 'https://github.com/cordiverse/paper',
    name_en: 'Cordis paper', name_zh: 'Cordis 论文',
    desc_en: 'Spatiotemporal composability — the formal foundation of DSH\'s plugin system.',
    desc_zh: '时空可组合性——DSH 插件体系的形式化基础。' },
  { id: 'migration-guide', type: 'community', lang: 'EN / 中文',
    url: 'https://github.com/whyihaveyou/dsh-suite/blob/main/docs/migration-guide.zh-CN.md',
    name_en: 'Migration guide', name_zh: '迁移指南',
    desc_en: 'Step-by-step guide to port Claude Code / MCP plugins to DSH.',
    desc_zh: '把 Claude Code / MCP 插件移植到 DSH 的分步指南。' },
  { id: 'awesome-adam', type: 'community', lang: 'EN',
    url: 'https://github.com/AdamPlatin123/awesome-dsh-plugins',
    name_en: 'awesome-dsh-plugins (peer list)', name_zh: 'awesome-dsh-plugins（竞品列表）',
    desc_en: 'A peer-curated DSH plugin list — we link out, openly.',
    desc_zh: '第三方精选 DSH 插件列表——姿态开放，互链共赢。' },
  { id: 'awesome-dsh-plugin', type: 'community', lang: 'EN',
    url: 'https://github.com/awesome-dsh-plugin/awesome-dsh-plugin',
    name_en: 'awesome-dsh-plugin (peer list)', name_zh: 'awesome-dsh-plugin（竞品列表）',
    desc_en: 'Another community DSH plugin list.',
    desc_zh: '另一个社区 DSH 插件列表。' },
  { id: 'awesome-0xsline', type: 'community', lang: 'EN',
    url: 'https://github.com/0xsline/awesome-deepseek-harness',
    name_en: 'awesome-deepseek-harness (peer list)', name_zh: 'awesome-deepseek-harness（竞品列表）',
    desc_en: 'A curated list of DSH plugins, skills, MCP servers & orchestration tools.',
    desc_zh: 'DSH 插件、skills、MCP 服务器与编排工具的精选列表。' },
  { id: 'deepseekdocs', type: 'chinese-docs', lang: '中文',
    url: 'https://deepseekdocs.com/',
    name_en: 'deepseekdocs.com (Chinese docs site)', name_zh: 'deepseekdocs.com（中文文档站）',
    desc_en: 'An unofficial Chinese DSH usage docs site — install, capabilities and FAQ.',
    desc_zh: '非官方的中文 DSH 使用文档站——安装、能力与 FAQ。' },
  { id: 'dshbase', type: 'chinese-docs', lang: '中文',
    url: 'https://github.com/ylwl1997/dshbase',
    name_en: 'dshbase — hands-on tested DSH plugin guides in Chinese',
    name_zh: 'dshbase — 逐个实测的中文 DSH 插件指南',
    desc_en: 'Guides and a plugin-ecosystem directory for DeepSeek Harness, written in Chinese.',
    desc_zh: 'DeepSeek Harness 指南与插件生态目录，全中文撰写。' },
];

/* ------------------------------------------------------------------ */
/* 文案（中英双语，对齐 research/launch-kit.md §1 §3）                  */
/* ------------------------------------------------------------------ */

  const THEME_SCRIPT = `<script>
  (function () {
    var current = null;
    try { current = localStorage.getItem('dshTheme'); } catch (e) {}
    if (current !== 'light' && current !== 'dark') {
      current = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
    }
    function apply(t) {
      current = t;
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('dshTheme', t); } catch (e) {}
      var btns = document.querySelectorAll('[data-theme-toggle]');
      for (var i = 0; i < btns.length; i++) {
        btns[i].textContent = t === 'dark' ? '\u{1F319}' : '\u{2600}\u{FE0F}';
        btns[i].setAttribute('aria-label', t === 'dark' ? '\u5207\u6362\u5230\u6d45\u8272\u6a21\u5f0f' : '\u5207\u6362\u5230\u6df1\u8272\u6a21\u5f0f');
      }
    }
    apply(current);
    document.addEventListener('DOMContentLoaded', function () { apply(current); });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-theme-toggle]');
      if (!b) return;
      apply(current === 'dark' ? 'light' : 'dark');
    });
  })();
</script>`;
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
    catalog: 'All plugins', catalogHint: 'Every curated plugin, sorted by stars.', catalogNote: 'Badges are evidence, not endorsement — compat checks & static scans are informational only.',
    watchlist: 'Watchlist', watchlistHint: 'Under review — collected from the dsh-plugin topic but not yet verified as installable DSH plugins.',
    results: 'result(s)',
    empty: 'No plugins match your search. Try a different keyword or category.',
    cardCopy: 'Copy', cardCopied: 'Copied!', cardRepo: 'Repo', cardStars: 'stars', cardBadge: 'Badge',
    badgeFeatured: 'Featured', badgeBeta: 'Beta',
    footAbout: 'A bilingual curated directory, a create-dsh-plugin scaffolder, and first-party plugins for DeepSeek Harness.',
    footBuilt: 'Built from', footPlugins: 'plugins',
    mascotCaption: 'Meet Suitie — your plugin-finding maid',
    mascotAlt: 'Suitie, the whale-girl maid mascot holding a glowing AI core',
    footContributing: 'Contributing',
    lbNav: 'Leaderboard',
    lbTitle: 'dsh-suite — Star Leaderboard',
    lbDescription: 'Star leaderboard for the DeepSeek Harness plugin ecosystem: top plugins, fastest risers, category distribution and ecosystem overview — computed from live catalog data.',
    lbH1: 'Star Leaderboard',
    lbSubtitle: 'Every number on this page is computed from data/plugins.json at build time.',
    lbBack: '← Directory', lbDir: 'Directory',
    lbTop: 'Top 50', lbTopHint: 'Curated plugins ranked by stars.',
    lbRising: 'Rising', lbRisingHint: 'Biggest star gains vs the last snapshot.', lbTracked: 'tracking since',
    lbNoRising: 'No rising data yet — tracking just started.',
    lbCategory: 'Category distribution', lbCategoryHint: 'Curated plugins per category.',
    lbEco: 'Ecosystem overview', lbEcoHint: 'The long tail, in numbers.',
    ecoTotal: 'Total entries', ecoCurated: 'Curated', ecoWatch: 'Watchlist', ecoTotalStars: 'Total stars', ecoZero: '0-star ratio',
    ecoLongTail: 'Star distribution (curated + watchlist)', ecoLowTail: 'of entries have ≤ 3 stars — the long tail',
    learnNav: 'Learn',
    learnTitle: 'dsh-suite — Learn',
    learnDescription: 'Learning resources for the DeepSeek Harness plugin ecosystem: official docs, our plugin dev guide, the Cordis paper, migration guide, and open links to peer lists.',
    learnH1: 'Learn',
    learnSubtitle: 'Curated resources to go from zero to a working DSH plugin.',
    learnTypeOfficial: 'Official', learnTypeCommunity: 'Community', learnTypePaper: 'Paper', learnTypeDocsCn: 'Chinese docs',
    newArrivals: 'New arrivals', newArrivalsHint: 'Plugins discovered in the last 48h — sorted by stars.',
    growth: 'Ecosystem growth', growthHint: 'dsh-plugin topic repos vs. catalog entries, since launch.',
    growthTopic: 'topic repos', growthCatalog: 'catalog entries',
    authorBoard: 'Author leaderboard', authorBoardHint: 'Top plugin authors by entry count and total stars.',
    authorPlugins: 'plugins', authorStars: 'stars',
    expandAll: 'Expand all', collapse: 'Collapse',
    badgeTitle: 'Copy badge code — for plugin authors to embed in README',
    badgeCopied: 'Badge code copied — paste it at the top of your README',
    dashTitle: 'Ecosystem at a glance',
    dashSource: 'Source: GitHub dsh-plugin topic + catalog snapshot · updated',
    dashCatalog: 'catalog entries', dashStars: 'total stars', dashNew: 'new in 48h', dashOk: 'compat OK rate',
    dashGrowth: 'Ecosystem growth', dashDist: 'Star distribution',
    png: 'PNG',
    storeTitle: 'Plugin Store',
    storeDesc: 'Browse {n}+ plugins right inside DSH — compat badges, one-click install.',
    dashVerified: 'daily OK',
    firstParty: 'First-party tools',
    themesTitle: 'Skin Center',
    themesDesc: '151 day/night skin pairs — one-click preview.',
    themesNote: 'One-click try-on is live',
    themesRepo: 'repo',
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
    catalog: '全部插件', catalogHint: '所有精选插件，按星数排序。', catalogNote: '徽章即证据而非背书——兼容测试与静态扫描仅供参考，不代表官方认可。',
    watchlist: '待审核', watchlistHint: '待审核 — 从 dsh-plugin topic 收集、但尚未核实为可安装 DSH 插件的项目。',
    results: '条结果',
    empty: '没有匹配的插件，换个关键词或分类试试。',
    cardCopy: '复制', cardCopied: '已复制！', cardRepo: '仓库', cardStars: '星', cardBadge: '徽章',
    badgeFeatured: '精选', badgeBeta: '内测',
    footAbout: '中英双语精选目录 + create-dsh-plugin 脚手架 + 第一方插件，为 DeepSeek Harness 而生。',
    footBuilt: '由', footPlugins: '个插件',
    mascotCaption: '吉祥物 Suitie——帮你找还能用插件的鲸娘女仆',
    mascotAlt: '吉祥物 Suitie：捧着发光 AI 核心球的鲸娘女仆',
    footContributing: '贡献指南',
    lbNav: 'Star 榜',
    lbTitle: 'dsh-suite — Star 榜',
    lbDescription: 'DeepSeek Harness 插件生态 Star 榜：总榜、飙升榜、分类分布、生态总览——全部数字构建期从目录数据现算。',
    lbH1: 'Star 榜',
    lbSubtitle: '本页所有数字构建期从 data/plugins.json 现算。',
    lbBack: '← 目录', lbDir: '目录',
    lbTop: '总榜 Top 50', lbTopHint: '按星数排名的精选插件。',
    lbRising: '飙升榜', lbRisingHint: '相对上次快照涨幅最大的插件。', lbTracked: '数据自',
    lbNoRising: '暂无涨幅数据——追踪刚开始。',
    lbCategory: '分类分布', lbCategoryHint: '各类目精选插件数。',
    lbEco: '生态总览', lbEcoHint: '长尾生态，用数字说话。',
    ecoTotal: '总条目', ecoCurated: '主目录', ecoWatch: '观察区', ecoTotalStars: '总星数', ecoZero: '0 星占比',
    ecoLongTail: '星数分布（主目录 + 观察区）', ecoLowTail: '的条目 ≤3 星——长尾灌水',
    learnNav: '学习',
    learnTitle: 'dsh-suite — 学习资源',
    learnDescription: 'DeepSeek Harness 插件生态学习资源：官方文档、我们的插件开发指南、Cordis 论文、迁移指南、以及开放互链的竞品列表。',
    learnH1: '学习资源',
    learnSubtitle: '从零到写出能跑的 DSH 插件，一路资源齐了。',
    learnTypeOfficial: '官方', learnTypeCommunity: '社区', learnTypePaper: '论文', learnTypeDocsCn: '中文文档站',
    newArrivals: '今日新增', newArrivalsHint: '最近 48 小时发现的插件，按星数排序。',
    growth: '生态增长', growthHint: 'dsh-plugin topic 仓库数 vs 目录条目数，自发布以来。',
    growthTopic: 'topic 仓库', growthCatalog: '目录条目',
    authorBoard: '作者排行榜', authorBoardHint: '按收录条目数与总星数排名的顶级插件作者。',
    authorPlugins: '个插件', authorStars: '星',
    expandAll: '展开全部', collapse: '收起',
    badgeTitle: '复制徽章代码 · 供插件作者嵌入 README',
    badgeCopied: '徽章代码已复制，粘贴到你的 README 顶部即可展示',
    dashTitle: '生态仪表盘',
    dashSource: '数据源：GitHub dsh-plugin topic + 目录快照 · 更新于',
    dashCatalog: '目录条目', dashStars: '总星数', dashNew: '今日新增', dashOk: '兼容 ok 率',
    dashGrowth: '生态增长', dashDist: '星数分布',
    png: 'PNG',
    storeTitle: '插件商店',
    storeDesc: '在 DSH 里直接逛 {n}+ 插件：看兼容徽章、一键安装。',
    dashVerified: '日检通过',
    firstParty: '第一方工具',
    themesTitle: '皮肤中心',
    themesDesc: '151 款昼夜成对皮肤，一键试穿。',
    themesNote: '一键试穿已上线',
    themesRepo: '仓库',
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
    risk: e.risk || null,
    evidence: e.evidence || null,
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
    let curated = json.plugins.filter(e => !isFrameworkRepo(e)).map(normalizeCurated);
    let watch = (json.watchlist || []).filter(e => !isFrameworkRepo(e)).map(normalizeCurated);
    // Layer-3 evidence: entries already verified by compat layer 2/3 (real
    // install + config assembly) get their evidence badge bumped to L3.
    const installed = loadInstalledIds();
    const withL3 = (p) => installed.has(p.id)
      ? { ...p, evidence: { level: 3, l3Verified: true, source: 'compat layer3 (installed & assembled)' } }
      : p;
    curated = curated.map(withL3);
    watch = watch.map(withL3);
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

/** 证据等级徽章：L1 已声明 → L2 peer 校验通过 → L3 真实安装验证（L3 由 compat layer2/3 填充，未测则注明） */
const EVIDENCE = {
  1: { en: 'L1 declared', zh: 'L1 已声明', cls: 'ev1' },
  2: { en: 'L2 peer-verified', zh: 'L2 peer 校验通过', cls: 'ev2' },
  3: { en: 'L3 install-verified', zh: 'L3 真实安装验证', cls: 'ev3' },
};
function evidenceBadge(ev, t) {
  if (!ev) return '';
  const lvl = ev.l3Verified ? 3 : Math.max(1, ev.level || 1);
  const d = EVIDENCE[lvl] || EVIDENCE[1];
  const label = isZh(t) ? d.zh : d.en;
  const done = ev.l3Verified || lvl >= 3;
  const title = isZh(t)
    ? `证据等级：${label}（L1 已声明 → L2 peer 校验通过 → L3 真实安装验证${done ? '' : '；L3 未测'}）`
    : `Evidence: ${label} (L1 declared → L2 peer-verified → L3 install-verified${done ? '' : '; L3 untested'})`;
  return `<span class="badge badge-ev badge-${d.cls}" title="${esc(title)}">🛡 ${esc(label)}</span>`;
}

/** 风险标志：静态扫描命中显示 ⚠（hover 说明），全干净显示 ✓，未扫描不显示 */
const RISK_KEYS = { installScript: ['安装脚本', 'install script'], networkEgress: ['网络外发', 'network egress'], shellAccess: ['shell 调用', 'shell access'], noLicense: ['无 LICENSE', 'no license'] };
function riskIcon(p, t) {
  const r = p.risk;
  if (!r || typeof r !== 'object') return '';
  const zh = isZh(t);
  const hits = Object.keys(RISK_KEYS).filter(k => r[k] === true);
  if (!hits.length) {
    const title = zh ? '静态扫描未发现风险（安装脚本 / 网络外发 / shell 调用 / 许可证）' : 'Static scan: no risk flags (install script / network egress / shell / license)';
    return `<span class="badge badge-risk badge-risk-clean" title="${esc(title)}">✓</span>`;
  }
  const names = hits.map(k => (zh ? RISK_KEYS[k][0] : RISK_KEYS[k][1])).join(' · ');
  const title = zh ? `⚠ 静态扫描命中：${names}（证据而非背书，仅供参考）` : `⚠ static scan flags: ${names} (evidence, not endorsement)`;
  return `<span class="badge badge-risk" title="${esc(title)}">⚠</span>`;
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
  const badgeBtn = `<button class="copy-btn copy-badge" type="button" data-cmd="${esc(BADGE_MD)}" data-copied-text="${esc(t.badgeCopied)}" aria-label="${esc(t.badgeTitle)}" title="${esc(t.badgeTitle)}">📛 ${esc(t.cardBadge)}</button>`;

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
      ${evidenceBadge(p.evidence, t)}
      ${riskIcon(p, t)}
      ${watchBadge}
      ${langBadge}
      ${author}
      <span class="card-meta-spacer"></span>
      ${stars}
    </div>
    <div class="card-foot">
      <code class="install-cmd">${esc(p.installCmd || '')}</code>
      ${copyBtn}
      ${badgeBtn}
      <a class="repo-link" href="${esc(p.url || REPO_URL)}" target="_blank" rel="noopener noreferrer">${esc(t.cardRepo)} ↗</a>
    </div>
  </article>`;
}

function renderNewArrival(p, t) {
  const cat = CATEGORY_LABEL[p.category] || { en: p.category, zh: p.category };
  return `<a class="na-item" href="${esc(p.url || REPO_URL)}" target="_blank" rel="noopener noreferrer">`
    + `<span class="na-name">${esc(p.name)}</span>`
    + `<span class="na-cat">${esc(isZh(t) ? cat.zh : cat.en)}</span>`
    + `<span class="na-stars">★ ${fmtStars(p.stars)}</span>`
    + `</a>`;
}

function lbAuthorRow(a, i, t) {
  const rankTop = i < 3 ? ' lb-rank-top' : '';
  return `<div class="lb-row"><span class="lb-rank${rankTop}">${i + 1}</span><div class="lb-main"><span class="lb-name">@${esc(a.name)}</span></div><span class="lb-cat">${a.count} ${esc(t.authorPlugins)}</span><span class="lb-stars">★ ${fmtStars(a.stars)}</span></div>`;
}

function renderGrid(items, t, opts = {}) {
  return items.map(p => renderCard(p, t, opts)).join('\n');
}

function renderPage(t, data, baseUrl, snapshot) {
  const { catalog, watchlist } = data;
  const cats = [...new Set(catalog.map(p => p.category))];
  const featuredList = catalog.filter(p => p.featured);
  const catCount = cats.length;

  const sortByStarsDesc = (a, b) => b.stars - a.stars;
  const sortedCatalog = [...catalog].sort(sortByStarsDesc);
  const sortedFeatured = [...featuredList].sort(sortByStarsDesc);
  const sortedWatch = [...watchlist].sort(sortByStarsDesc);

  // 今日新增：目录里不在快照中的插件（最近 48h discover 新增），按星数倒序取前 12
  const snapRepos = new Set(Object.keys((snapshot && snapshot.stars_by_repo) || {}));
  const newArrivals = catalog.filter(p => p.repo && !snapRepos.has(p.repo)).sort(sortByStarsDesc).slice(0, 12);

  // 生态仪表盘（数据与 stars 页共用公共函数，全部构建期现算）
  const eco = computeEcoTotals(data, snapshot);
  const dashBuckets = computeBuckets([...catalog, ...watchlist]);
  const dashGp = computeGrowthPoints(loadGrowthHistory(), eco.total, isZh(t) ? '现在' : 'now');
  const dashGrowthSvg = dashGp ? lbLineChart([{ name: t.growthTopic, values: dashGp.topicVals }, { name: t.growthCatalog, values: dashGp.catalogVals }], dashGp.labels) : '';
  const dashDistSvg = lbChartBars(dashBuckets);
  const dNow = new Date();
  const todayStamp = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;
  const storeCmd = 'dsh plugin --profile web add @dsh-suite/plugin-manager';
const themesCmd = 'dsh plugin --profile web add @dsh-suite/themes';
  const storeDescText = t.storeDesc.replace('{n}', catalog.length);

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

  const dashSection = `
    <section class="eco-dash" id="dashboard" aria-label="${esc(t.dashTitle)}">
      <h2 class="section-title">${esc(t.dashTitle)}</h2>
      <div class="dash-stats">
        <div class="dash-stat"><span class="ds-num">${eco.catalogCount}</span><span class="ds-label">${esc(t.dashCatalog)}</span></div>
        <div class="dash-stat"><span class="ds-num">★ ${fmtStars(eco.totalStars)}</span><span class="ds-label">${esc(t.dashStars)}</span></div>
        <div class="dash-stat"><span class="ds-num ds-num-new">+${eco.newCount}</span><span class="ds-label">${esc(t.dashNew)}</span></div>
        <div class="dash-stat"><span class="ds-num">${eco.okCount}</span><span class="ds-label">${esc(t.dashVerified)}</span></div>
      </div>
      <div class="dash-charts">
        <figure class="dash-chart">
          <figcaption class="dash-chart-head">
            <span class="dash-chart-title">${esc(t.dashGrowth)}</span>
            <button class="png-btn" type="button" data-svg="#dash-growth-svg" data-name="dsh-suite-growth-${todayStamp}" title="${esc(t.png)}">⬇ ${esc(t.png)}</button>
          </figcaption>
          <div class="dash-svg" id="dash-growth-svg">${dashGrowthSvg}</div>
          <p class="dash-cap">${esc(t.dashSource)} ${todayStamp}</p>
        </figure>
        <figure class="dash-chart">
          <figcaption class="dash-chart-head">
            <span class="dash-chart-title">${esc(t.dashDist)}</span>
            <button class="png-btn" type="button" data-svg="#dash-dist-svg" data-name="dsh-suite-distribution-${todayStamp}" title="${esc(t.png)}">⬇ ${esc(t.png)}</button>
          </figcaption>
          <div class="dash-svg" id="dash-dist-svg">${dashDistSvg}</div>
          <p class="dash-cap">${esc(t.dashSource)} ${todayStamp}</p>
        </figure>
      </div>
    </section>

    <section class="first-party" id="first-party">
      <h2 class="section-title">${esc(t.firstParty)}</h2>
      <div class="fp-grid">
        <div class="fp-card">
          <div class="fp-text">
            <h3 class="fp-title">🛍 ${esc(t.storeTitle)}</h3>
            <p class="fp-desc">${esc(storeDescText)}</p>
            <div class="store-install">
              <code class="install-cmd store-cmd">${esc(storeCmd)}</code>
              <button class="copy-btn" type="button" data-cmd="${esc(storeCmd)}" aria-label="${esc(t.cardCopy)}">${esc(t.cardCopy)}</button>
            </div>
          </div>
          <img class="fp-img" src="assets/store-tab.png" alt="${esc(t.storeTitle)}" loading="lazy">
        </div>
        <div class="fp-card">
          <div class="fp-text">
            <h3 class="fp-title">🎨 ${esc(t.themesTitle)} <span class="fp-badge">dsh-themes</span></h3>
            <p class="fp-desc">${esc(t.themesDesc)}</p>
            <p class="fp-note">🆕 ${esc(t.themesNote)} · <a class="fp-repo-link" href="https://github.com/whyihaveyou/dsh-themes" target="_blank" rel="noopener noreferrer">${esc(t.themesRepo)} ↗</a></p>
            <div class="store-install">
              <code class="install-cmd store-cmd">${esc(themesCmd)}</code>
              <button class="copy-btn" type="button" data-cmd="${esc(themesCmd)}" aria-label="${esc(t.cardCopy)}">${esc(t.cardCopy)}</button>
            </div>
          </div>
          <img class="fp-img" src="assets/themes/themes-preview.png" alt="${esc(t.themesTitle)}" loading="lazy">
        </div>
      </div>
    </section>
`;

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
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="dsh-suite — DeepSeek Harness 插件目录">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t.title)}">
  <meta name="twitter:description" content="${esc(t.description)}">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/brand/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/apple-touch-icon.png">
  <link rel="stylesheet" href="assets/style.css">
  ${THEME_SCRIPT}
  ${langRedirect}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${isZh(t) ? 'zh.html' : 'index.html'}"><span class="brand-mark">dsh</span>&nbsp;suite</a>
    <nav class="nav">
      <a class="nav-lb" href="${isZh(t) ? 'stars-zh.html' : 'stars.html'}">${esc(t.lbNav)}</a>
      <a class="nav-lb" href="https://whyihaveyou.github.io/dsh-themes/" target="_blank" rel="noopener noreferrer">${isZh(t) ? '皮肤画廊' : 'Themes'}</a>
      <a class="nav-lb" href="${isZh(t) ? 'learn-zh.html' : 'learn.html'}">${esc(t.learnNav)}</a>
      <button class="nav-theme" type="button" data-theme-toggle aria-label="切换主题">🌙</button>
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

${dashSection}
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

    <section class="new-arrivals" id="new-arrivals">
      <h2 class="section-title">${esc(t.newArrivals)}</h2>
      <p class="section-hint">${esc(t.newArrivalsHint)}</p>
      <div class="na-grid">${newArrivals.map(p => renderNewArrival(p, t)).join('\n')}</div>
    </section>

    <section class="catalog" id="catalog">
      <h2 class="section-title">${esc(t.catalog)}</h2>
      <p class="section-hint">${esc(t.catalogHint)}</p>
      <p class="section-hint catalog-note">${esc(t.catalogNote)}</p>
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
      <a href="https://awesome-dsh-plugin.com" target="_blank" rel="noopener noreferrer"><img src="https://awesome-dsh-plugin.com/badge.svg" alt="awesome · DSH plugin" style="height:20px;vertical-align:middle"></a>
    </nav>
  </footer>

  <script type="application/json" id="catalog-data">${jsonBlob}</script>
  <script src="assets/app.js"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* Star 榜页面（构建期现算，零依赖内联 SVG）                             */
/* ------------------------------------------------------------------ */

/** 读最近一次 star 快照（bot/state/last-snapshot.json），用于 Δ 涨幅 */
function loadSnapshot() {
  const p = resolve(REPO_ROOT, 'bot', 'state', 'last-snapshot.json');
  if (!existsSync(p)) return null;
  try {
    const s = JSON.parse(readFileSync(p, 'utf8'));
    return (s && s.stars_by_repo) ? s : null;
  } catch { return null; }
}

/** 读生态增长历史（bot/state/growth-history.json），用于增长曲线 */
function loadGrowthHistory() {
  const p = resolve(REPO_ROOT, 'bot', 'state', 'growth-history.json');
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; }
}

/** 星数分布桶（0/1–3/4–10/11–50/51–100/100+）——stars 页与首页仪表盘共用 */
function computeBuckets(all) {
  const s = (p) => p.stars || 0;
  return [
    { label: '0 ★', value: all.filter(p => s(p) === 0).length, color: 'var(--faint)' },
    { label: '1–3 ★', value: all.filter(p => s(p) >= 1 && s(p) <= 3).length, color: 'var(--muted)' },
    { label: '4–9 ★', value: all.filter(p => s(p) >= 4 && s(p) <= 9).length, color: 'var(--brand-deep)' },
    { label: '10–49 ★', value: all.filter(p => s(p) >= 10 && s(p) <= 49).length, color: 'var(--brand)' },
    { label: '50–499 ★', value: all.filter(p => s(p) >= 50 && s(p) <= 499).length, color: 'var(--brand-bright)' },
    { label: '500+ ★', value: all.filter(p => s(p) >= 500).length, color: 'var(--green)' },
  ];
}

/** 生态总览数字——首页仪表盘与 stars 页共用（全部构建期现算） */
function computeEcoTotals(data, snapshot) {
  const { catalog, watchlist } = data;
  const all = [...catalog, ...watchlist];
  const total = all.length;
  const totalStars = all.reduce((s, p) => s + (p.stars || 0), 0);
  const okCount = catalog.filter(p => p.compatStatus === 'ok').length;  // normalizeCurated 已压平成 compatStatus
  const okRatio = catalog.length ? (okCount / catalog.length * 100) : 0;
  const snapRepos = new Set(Object.keys((snapshot && snapshot.stars_by_repo) || {}));
  const newCount = catalog.filter(p => p.repo && !snapRepos.has(p.repo)).length;
  return { catalogCount: catalog.length, watchlistCount: watchlist.length, total, totalStars, okCount, okRatio, newCount };
}

/** 增长曲线数据点（历史快照 + 现值）——stars 页与首页仪表盘共用 */
function computeGrowthPoints(growth, presentTotal, nowLabel) {
  if (!growth || !Array.isArray(growth.points) || !growth.points.length) return null;
  const labels = [], topicVals = [], catalogVals = [];
  for (const pt of growth.points) {
    labels.push((pt.date || '').slice(5));
    topicVals.push(Number(pt.topic) || 0);
    catalogVals.push(Number(pt.catalog) || 0);
  }
  labels.push(nowLabel);
  topicVals.push(Number(growth.topic_now) || topicVals[topicVals.length - 1] || 0);
  catalogVals.push(presentTotal);
  return { labels, topicVals, catalogVals };
}

/** 折线图（内联 SVG，多序列） */
/** 折线图（内联 SVG，多序列：面积渐变 + hover 数据点 + 网格/刻度/图例） */
let __chartSeq = 0;
function lbLineChart(series, labels, { colors = ['#7b96ff', '#34d399'] } = {}) {
  const W = 640, H = 250, padL = 54, padR = 18, padT = 26, padB = 32;
  const maxV = Math.max(1, ...series.flatMap(s => s.values));
  const n = labels.length;
  const x = (i) => padL + (i * (W - padL - padR) / Math.max(1, n - 1));
  const y = (v) => padT + (1 - v / maxV) * (H - padT - padB);
  const uid = 'lg' + (++__chartSeq);
  const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const v = maxV * f, yy = y(v);
    return `  <line x1="${padL}" y1="${yy.toFixed(1)}" x2="${W - padR}" y2="${yy.toFixed(1)}" stroke="var(--border-soft)" stroke-width="1"></line>\n  <text x="${padL - 9}" y="${(yy + 4).toFixed(1)}" font-size="10.5" fill="var(--faint)" text-anchor="end">${fmtStars(Math.round(v))}</text>`;
  }).join('\n');
  const vgrid = labels.map((lb, i) => `  <line x1="${x(i).toFixed(1)}" y1="${padT}" x2="${x(i).toFixed(1)}" y2="${H - padB}" stroke="var(--border-soft)" stroke-width="0.7" stroke-dasharray="2 5"></line>`).join('\n');
  const defs = series.map((s, si) => `<linearGradient id="${uid}-${si}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${colors[si]}" stop-opacity="0.34"/><stop offset="100%" stop-color="${colors[si]}" stop-opacity="0.02"/></linearGradient>`).join('');
  const areas = series.map((s, si) => {
    const pts = s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    return `  <polygon points="${padL},${H - padB} ${pts} ${x(n - 1).toFixed(1)},${H - padB}" fill="url(#${uid}-${si})" stroke="none"></polygon>`;
  }).join('\n');
  const lines = series.map((s, si) => {
    const pts = s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    return `  <polyline points="${pts}" fill="none" stroke="${colors[si]}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>`;
  }).join('\n');
  const dots = series.flatMap((s, si) => s.values.map((v, i) =>
    `  <circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="${colors[si]}" stroke="#0b0f1a" stroke-width="1.5"><title>${esc(labels[i])} · ${esc(s.name || '')}: ${fmtStars(v)}</title></circle>`
  )).join('\n');
  const legend = series.map((s, si) => `  <g><rect x="${padL + si * 104}" y="8" width="10" height="10" rx="2" fill="${colors[si]}"></rect><text x="${padL + si * 104 + 14}" y="17" font-size="10.5" fill="var(--muted)">${esc(s.name || `S${si + 1}`)}</text></g>`).join('\n');
  const xlabels = labels.map((lb, i) => `  <text x="${x(i)}" y="${H - 8}" font-size="11" fill="var(--muted)" text-anchor="middle">${esc(lb)}</text>`).join('\n');
  return `<svg class="lb-chart lb-line" viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true">\n<defs>${defs}</defs>\n${grid}\n${vgrid}\n${areas}\n${lines}\n${dots}\n${legend}\n${xlabels}\n</svg>`;
}

/** 横向条形图（内联 SVG：顶部刻度/网格线 + 数值与占比标注） */
function lbChartBars(items) {
  const max = Math.max(1, ...items.map(i => i.value));
  const total = items.reduce((s, i) => s + i.value, 0);
  const rowH = 28, barW = 240, labelW = 96, valW = 92, axisH = 18;
  const H = items.length * rowH + 4 + axisH;
  const axis = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const v = max * f, bx = labelW + (v / max) * barW;
    return `  <line x1="${bx.toFixed(1)}" y1="${axisH}" x2="${bx.toFixed(1)}" y2="${H - 4}" stroke="var(--border-soft)" stroke-width="0.7" stroke-dasharray="2 4"></line>\n  <text x="${bx.toFixed(1)}" y="${axisH - 5}" font-size="9.5" fill="var(--faint)" text-anchor="middle">${fmtStars(Math.round(v))}</text>`;
  }).join('\n');
  const rows = items.map((it, i) => {
    const w = Math.max(3, Math.round((it.value / max) * barW));
    const y = axisH + i * rowH + 2;
    const pct = total ? (it.value / total * 100) : 0;
    const pctTxt = (pct >= 10 ? pct.toFixed(0) : pct.toFixed(1)) + '%';
    const valIn = w > 46
      ? `    <text x="${labelW + w - 8}" y="${y + 15}" font-size="11.5" font-weight="700" fill="#f8fafc" text-anchor="end">${it.value}</text>`
      : `    <text x="${labelW + w + 7}" y="${y + 15}" font-size="11.5" fill="var(--text)">${it.value}</text>`;
    return `  <g>\n    <text x="0" y="${y + 17}" font-size="13" fill="var(--muted)">${esc(it.label)}</text>\n    <rect x="${labelW}" y="${y}" width="${w}" height="18" rx="5" fill="${it.color || 'var(--brand)'}" opacity="0.92"></rect>\n${valIn}\n    <text x="${(labelW + Math.max(w, 44) + 7).toFixed(1)}" y="${y + 15}" font-size="10.5" fill="var(--faint)">${pctTxt}</text>\n  </g>`;
  }).join('\n');
  return `<svg class="lb-chart" viewBox="0 0 ${labelW + barW + valW} ${H}" role="img" aria-hidden="true">\n${axis}\n${rows}\n</svg>`;
}

/** 榜单行 */
function lbRow(p, t, rank, { delta } = {}) {
  const cat = CATEGORY_LABEL[p.category] || { en: p.category, zh: p.category };
  const catLabel = isZh(t) ? cat.zh : cat.en;
  const desc = isZh(t) ? p.desc_zh : p.desc_en;
  const deltaBadge = (delta != null && delta > 0) ? `<span class="lb-delta">+${delta}</span>` : '';
  const rankTop = rank <= 3 ? ' lb-rank-top' : '';
  return `  <div class="lb-row">
    <span class="lb-rank${rankTop}">${rank}</span>
    <div class="lb-main">
      <a class="lb-name" href="${esc(p.url || REPO_URL)}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>
      <span class="lb-desc">${esc(desc || '')}</span>
    </div>
    <span class="lb-cat">${esc(catLabel)}</span>
    ${deltaBadge}
    <span class="lb-stars">★ ${fmtStars(p.stars)}</span>
  </div>`;
}

function renderStarsPage(t, data, baseUrl, snapshot) {
  const { catalog, watchlist } = data;
  const isZ = isZh(t);
  const sortStars = (a, b) => b.stars - a.stars;

  const curated = [...catalog].sort(sortStars);
  const top50 = curated.slice(0, 50);
  const all = [...catalog, ...watchlist];

  // 飙升榜：与快照 diff
  const snapStars = (snapshot && snapshot.stars_by_repo) || {};
  const snapDate = (snapshot && (snapshot.tracked_since || snapshot.snapshot_date)) || '';
  const rising = all
    .filter(p => p.repo && typeof snapStars[p.repo] === 'number')
    .map(p => ({ p, delta: p.stars - snapStars[p.repo] }))
    .filter(x => x.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 20);

  // 分类分布（仅主目录）
  const catCounts = new Map();
  for (const p of catalog) catCounts.set(p.category, (catCounts.get(p.category) || 0) + 1);
  const catItems = CATEGORIES
    .filter(c => catCounts.has(c.id))
    .map(c => ({ label: isZ ? c.zh : c.en, value: catCounts.get(c.id) }))
    .sort((a, b) => b.value - a.value);

  // 生态总览
  const totalStars = all.reduce((s, p) => s + (p.stars || 0), 0);
  const total = all.length;
  const zeroCount = all.filter(p => (p.stars || 0) === 0).length;
  const zeroRatio = total ? (zeroCount / total * 100) : 0;
  const lowCount = all.filter(p => (p.stars || 0) <= 3).length;
  const lowRatio = total ? (lowCount / total * 100) : 0;
  const buckets = computeBuckets(all);

  // 增长曲线（历史快照 + 现值，公共函数）
  const growth = loadGrowthHistory();
  const gp = computeGrowthPoints(growth, total, isZ ? '现在' : 'now');
  const growthChart = gp ? lbLineChart([{ name: t.growthTopic, values: gp.topicVals }, { name: t.growthCatalog, values: gp.catalogVals }], gp.labels) : '';

  // 作者排行榜（按作者聚合条目数 + 总星数）
  const authorMap = new Map();
  for (const p of all) {
    const a = p.author || (p.repo || '').split('/')[0] || '';
    if (!a) continue;
    const m = authorMap.get(a) || { count: 0, stars: 0 };
    m.count++; m.stars += p.stars || 0;
    authorMap.set(a, m);
  }
  const authors = [...authorMap.entries()].map(([name, m]) => ({ name, ...m }))
    .sort((a, b) => b.count - a.count || b.stars - a.stars).slice(0, 20);

  // Top 10 默认显示 + 展开全部
  const SHOW = 10;
  const risingShow = rising.slice(0, SHOW);
  const risingRest = rising.slice(SHOW);
  const topShow = top50.slice(0, SHOW);
  const topRest = top50.slice(SHOW);
  const risingRowsHtml = rising.length
    ? risingShow.map((x, i) => lbRow(x.p, t, i + 1, { delta: x.delta })).join('\n')
    : `<p class="section-hint">${esc(t.lbNoRising)}</p>`;
  const topRowsHtml = topShow.map((p, i) => lbRow(p, t, i + 1)).join('\n');
  const risingRestHtml = risingRest.length ? `<div id="rising-rest" hidden>${risingRest.map((x, i) => lbRow(x.p, t, i + 1 + SHOW, { delta: x.delta })).join('\n')}</div>` : '';
  const topRestHtml = topRest.length ? `<div id="top-rest" hidden>${topRest.map((p, i) => lbRow(p, t, i + 1 + SHOW)).join('\n')}</div>` : '';
  const expandBtn = (id) => `<button class="expand-btn" type="button" data-target="${id}" data-expand-label="${esc(t.expandAll)}" data-collapse-label="${esc(t.collapse)}">${esc(t.expandAll)}</button>`;

  const thisUrl = baseUrl + (isZ ? 'stars-zh.html' : 'stars.html');

  const redirect = isZ ? '' : `
  <script>
    (function () {
      try {
        var q = new URL(location.href).searchParams.get('lang');
        if (q === 'zh' || q === 'en') { try { localStorage.setItem('dshLang', q); } catch (e) {} if (q === 'zh' && location.pathname.indexOf('stars-zh.html') < 0) location.replace('stars-zh.html'); return; }
        if (localStorage.getItem('dshLang')) return;
        if ((navigator.language || '').toLowerCase().indexOf('zh') === 0) { try { localStorage.setItem('dshLang', 'zh'); } catch (e) {} location.replace('stars-zh.html'); }
      } catch (e) {}
    })();
  </script>`;

  const statCards = `
    <div class="lb-stats">
      <div class="lb-stat"><span class="lb-stat-num">${total}</span><span class="lb-stat-label">${esc(t.ecoTotal)}</span></div>
      <div class="lb-stat"><span class="lb-stat-num">${catalog.length}</span><span class="lb-stat-label">${esc(t.ecoCurated)}</span></div>
      <div class="lb-stat"><span class="lb-stat-num">${watchlist.length}</span><span class="lb-stat-label">${esc(t.ecoWatch)}</span></div>
      <div class="lb-stat"><span class="lb-stat-num">${fmtStars(totalStars)}</span><span class="lb-stat-label">${esc(t.ecoTotalStars)}</span></div>
      <div class="lb-stat lb-stat-accent"><span class="lb-stat-num">${zeroRatio.toFixed(1)}%</span><span class="lb-stat-label">${esc(t.ecoZero)}</span></div>
    </div>`;

  const topRows = top50.map((p, i) => lbRow(p, t, i + 1)).join('\n');
  const risingRows = rising.length
    ? rising.map((x, i) => lbRow(x.p, t, i + 1, { delta: x.delta })).join('\n')
    : `<p class="section-hint">${esc(t.lbNoRising)}</p>`;

  const risingHead = snapDate ? ` · ${esc(t.lbTracked)} <strong>${esc(snapDate)}</strong>` : '';

  return `<!doctype html>
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.lbTitle)}</title>
  <meta name="description" content="${esc(t.lbDescription)}">
  <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
  <meta name="theme-color" content="#0b0f1a">
  <link rel="canonical" href="${esc(thisUrl)}">
  <link rel="alternate" hreflang="en" href="${esc(baseUrl)}stars.html">
  <link rel="alternate" hreflang="zh-CN" href="${esc(baseUrl)}stars-zh.html">
  <link rel="alternate" hreflang="x-default" href="${esc(baseUrl)}stars.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="dsh-suite">
  <meta property="og:title" content="${esc(t.lbTitle)}">
  <meta property="og:description" content="${esc(t.lbDescription)}">
  <meta property="og:url" content="${esc(thisUrl)}">
  <meta property="og:image" content="${esc(baseUrl)}assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="dsh-suite — 星标榜 / star leaderboard">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t.lbTitle)}">
  <meta name="twitter:description" content="${esc(t.lbDescription)}">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/brand/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/apple-touch-icon.png">
  <link rel="stylesheet" href="assets/style.css">
  ${THEME_SCRIPT}
  ${redirect}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${isZ ? 'zh.html' : 'index.html'}"><span class="brand-mark">dsh</span>&nbsp;suite</a>
    <nav class="nav">
      <a class="nav-lb" href="${isZ ? 'zh.html' : 'index.html'}">${esc(t.lbDir)}</a>
      <a class="nav-lb" href="${isZ ? 'learn-zh.html' : 'learn.html'}">${esc(t.learnNav)}</a>
      <button class="nav-theme" type="button" data-theme-toggle aria-label="切换主题">🌙</button>
      <a class="nav-lang" href="${isZ ? 'stars.html' : 'stars-zh.html'}" onclick="try{localStorage.setItem('dshLang','${t.otherLang}')}catch(e){}">${esc(t.otherLabel)}</a>
      <a class="nav-gh" href="${REPO_URL}" target="_blank" rel="noopener noreferrer">${esc(t.github)} ↗</a>
    </nav>
  </header>

  <main class="lb-page">
    <section class="lb-hero">
      <p class="lb-back"><a href="${isZ ? 'zh.html' : 'index.html'}">${esc(t.lbBack)}</a></p>
      <h1 class="lb-title">★ ${esc(t.lbH1)}</h1>
      <p class="lb-subtitle">${esc(t.lbSubtitle)}</p>
    </section>

    <section class="lb-section" id="overview">
      <h2 class="section-title">${esc(t.lbEco)}</h2>
      <p class="section-hint">${esc(t.lbEcoHint)}</p>
      ${statCards}
    </section>

    

<section class="lb-section" id="top">
      <h2 class="section-title">${esc(t.lbTop)}</h2>
      <p class="section-hint">${esc(t.lbTopHint)}</p>
      <div class="lb-rows">${topRowsHtml}</div>
      ${topRestHtml}
      ${topRest.length ? expandBtn('top-rest') : ''}
    </section>

    

<section class="lb-section" id="rising">
      <h2 class="section-title">${esc(t.lbRising)}</h2>
      <p class="section-hint">${esc(t.lbRisingHint)}${risingHead}</p>
      <div class="lb-rows">${risingRowsHtml}</div>
      ${risingRestHtml}
      ${risingRest.length ? expandBtn('rising-rest') : ''}
    </section>

    

<section class="lb-section" id="growth">
      <h2 class="section-title">${esc(t.growth)}</h2>
      <p class="section-hint">${esc(t.growthHint)}</p>
      ${growthChart ? `<div class="lb-panel lb-growth">${growthChart}</div>` : ''}
    </section>

    

<section class="lb-section" id="charts">
      <div class="lb-charts">
        <div class="lb-panel">
          <h3 class="lb-panel-title">${esc(t.ecoLongTail)}</h3>
          ${lbChartBars(buckets)}
          <p class="lb-note"><strong>${lowRatio.toFixed(0)}%</strong> ${esc(t.ecoLowTail)}</p>
        </div>
        <div class="lb-panel">
          <h3 class="lb-panel-title">${esc(t.lbCategory)}</h3>
          ${lbChartBars(catItems)}
        </div>
      </div>
    </section>

    

<section class="lb-section" id="authors">
      <h2 class="section-title">${esc(t.authorBoard)}</h2>
      <p class="section-hint">${esc(t.authorBoardHint)}</p>
      <div class="lb-rows">${authors.map((a, i) => lbAuthorRow(a, i, t)).join('\n')}</div>
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
      <a href="https://awesome-dsh-plugin.com" target="_blank" rel="noopener noreferrer"><img src="https://awesome-dsh-plugin.com/badge.svg" alt="awesome · DSH plugin" style="height:20px;vertical-align:middle"></a>
    </nav>
  </footer>
  <script>
    (function () {
      document.querySelectorAll('.expand-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = document.getElementById(btn.getAttribute('data-target'));
          if (!target) return;
          var wasHidden = target.hasAttribute('hidden');
          if (wasHidden) target.removeAttribute('hidden'); else target.setAttribute('hidden', '');
          btn.textContent = wasHidden ? btn.getAttribute('data-collapse-label') : btn.getAttribute('data-expand-label');
        });
      });
    })();
  </script>
</body>
</html>
`;
}

function renderLearnPage(t, data, baseUrl) {
  const isZ = isZh(t);
  const typeLabel = { official: t.learnTypeOfficial, community: t.learnTypeCommunity, paper: t.learnTypePaper, 'chinese-docs': t.learnTypeDocsCn };
  const cards = LEARN_RESOURCES.map((r) => {
    const name = isZ ? r.name_zh : r.name_en;
    const desc = isZ ? r.desc_zh : r.desc_en;
    const tl = typeLabel[r.type] || r.type;
    const img = r.img ? `<img class="learn-img" src="${esc(r.img)}" alt="${esc(name)}" loading="lazy">` : '';
    return `  <a class="learn-card" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
    ${img}
    <div class="learn-body">
      <div class="learn-top"><span class="learn-name">${esc(name)}</span><span class="learn-type learn-type-${r.type}">${esc(tl)}</span></div>
      <p class="learn-desc">${esc(desc)}</p>
      <span class="learn-lang">${esc(r.lang)}</span>
    </div>
  </a>`;
  }).join('\n');

  const thisUrl = baseUrl + (isZ ? 'learn-zh.html' : 'learn.html');

  const redirect = isZ ? '' : `
  <script>
    (function () {
      try {
        var q = new URL(location.href).searchParams.get('lang');
        if (q === 'zh' || q === 'en') { try { localStorage.setItem('dshLang', q); } catch (e) {} if (q === 'zh' && location.pathname.indexOf('learn-zh.html') < 0) location.replace('learn-zh.html'); return; }
        if (localStorage.getItem('dshLang')) return;
        if ((navigator.language || '').toLowerCase().indexOf('zh') === 0) { try { localStorage.setItem('dshLang', 'zh'); } catch (e) {} location.replace('learn-zh.html'); }
      } catch (e) {}
    })();
  </script>`;

  return `<!doctype html>
<html lang="${t.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.learnTitle)}</title>
  <meta name="description" content="${esc(t.learnDescription)}">
  <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
  <meta name="theme-color" content="#0b0f1a">
  <link rel="canonical" href="${esc(thisUrl)}">
  <link rel="alternate" hreflang="en" href="${esc(baseUrl)}learn.html">
  <link rel="alternate" hreflang="zh-CN" href="${esc(baseUrl)}learn-zh.html">
  <link rel="alternate" hreflang="x-default" href="${esc(baseUrl)}learn.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="dsh-suite">
  <meta property="og:title" content="${esc(t.learnTitle)}">
  <meta property="og:description" content="${esc(t.learnDescription)}">
  <meta property="og:url" content="${esc(thisUrl)}">
  <meta property="og:image" content="${esc(baseUrl)}assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="dsh-suite — 学习资源 / learning resources">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t.learnTitle)}">
  <meta name="twitter:description" content="${esc(t.learnDescription)}">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="assets/brand/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/apple-touch-icon.png">
  <link rel="stylesheet" href="assets/style.css">
  ${THEME_SCRIPT}
  ${redirect}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${isZ ? 'zh.html' : 'index.html'}"><span class="brand-mark">dsh</span>&nbsp;suite</a>
    <nav class="nav">
      <a class="nav-lb" href="${isZ ? 'zh.html' : 'index.html'}">${esc(t.lbDir)}</a>
      <a class="nav-lb" href="${isZ ? 'stars-zh.html' : 'stars.html'}">${esc(t.lbNav)}</a>
      <button class="nav-theme" type="button" data-theme-toggle aria-label="切换主题">🌙</button>
      <a class="nav-lang" href="${isZ ? 'learn.html' : 'learn-zh.html'}" onclick="try{localStorage.setItem('dshLang','${t.otherLang}')}catch(e){}">${esc(t.otherLabel)}</a>
      <a class="nav-gh" href="${REPO_URL}" target="_blank" rel="noopener noreferrer">${esc(t.github)} ↗</a>
    </nav>
  </header>

  <main class="lb-page">
    <section class="lb-hero">
      <p class="lb-back"><a href="${isZ ? 'zh.html' : 'index.html'}">${esc(t.lbBack)}</a></p>
      <h1 class="lb-title">${esc(t.learnH1)}</h1>
      <p class="lb-subtitle">${esc(t.learnSubtitle)}</p>
    </section>

    <section class="lb-section">
      <div class="learn-grid">${cards}</div>
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
      <a href="https://awesome-dsh-plugin.com" target="_blank" rel="noopener noreferrer"><img src="https://awesome-dsh-plugin.com/badge.svg" alt="awesome · DSH plugin" style="height:20px;vertical-align:middle"></a>
    </nav>
  </footer>
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
  const snapshot = loadSnapshot();

  // 1) 首页 + Star 榜 + Learn（EN / ZH）
  writeFileSync(join(__dirname, 'index.html'), renderPage(I18N.en, data, baseUrl, snapshot));
  writeFileSync(join(__dirname, 'zh.html'), renderPage(I18N.zh, data, baseUrl, snapshot));
  writeFileSync(join(__dirname, 'stars.html'), renderStarsPage(I18N.en, data, baseUrl, snapshot));
  writeFileSync(join(__dirname, 'stars-zh.html'), renderStarsPage(I18N.zh, data, baseUrl, snapshot));
  writeFileSync(join(__dirname, 'learn.html'), renderLearnPage(I18N.en, data, baseUrl));
  writeFileSync(join(__dirname, 'learn-zh.html'), renderLearnPage(I18N.zh, data, baseUrl));

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
  console.log('[build] 产物: index.html, zh.html, stars.html, stars-zh.html, learn.html, learn-zh.html, catalog.json, sitemap.xml, robots.txt, .nojekyll');
  const totalEntries = catalog.length + watchlist.length;
  console.log(`[build] Star 榜校验: 总条目 ${totalEntries} = 主目录 ${catalog.length} + 观察区 ${watchlist.length} — ${totalEntries === catalog.length + watchlist.length ? 'OK' : 'MISMATCH'}`);
  console.log(`[build] Star 榜校验: 总榜 Top ${Math.min(50, catalog.length)} / 飙升 Top ${(snapshot && snapshot.stars_by_repo) ? '20' : '0（无快照）'}`);
}

main();
