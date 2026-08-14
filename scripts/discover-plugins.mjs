#!/usr/bin/env node
/**
 * discover-plugins.mjs — hourly discovery of new dsh-plugin topic repos.
 *
 * Re-pulls the `topic:dsh-plugin` GitHub search API (paginated), diffs against
 * the repos already tracked in data/plugins.json (plugins + watchlist), and
 * auto-classifies NEW repos using the same inclusion standard as the manual
 * daily refresh:
 *   - has real code + DSH-specific   → plugins (category heuristic)
 *   - no description                 → watchlist 占位 (placeholder)
 *   - unrelated to DSH (tag-riding)  → watchlist 蹭tag
 *   - DSH-adjacent standalone
 *     (desktop/TUI/docker/list/…)    → watchlist 工具链
 *
 * New entries carry the repo's own description verbatim (both `description.en`
 * and `description.zh`), flagged `sourceNote: "auto"` — human bilingual
 * translation is a separate downstream task. `compat.status` defaults to
 * `unknown` (the daily compat-check owns ok/broken verdicts).
 *
 * The 3 self-dev featured entries (repo `whyihaveyou/dsh-suite`) are NEVER
 * touched. The official framework `deepseek-ai/deepseek-harness` is excluded
 * from the catalog by convention (see docs/catalog-schema.md).
 *
 * Idempotency: writes only when new repos are found; a second run with no new
 * repos leaves the file byte-identical.
 *
 * Zero runtime dependencies: Node built-ins only.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data', 'plugins.json');

const SEARCH = 'https://api.github.com/search/repositories?q=topic%3Adsh-plugin&per_page=100&page=';
const SELF_DEV_REPO = 'whyihaveyou/dsh-suite';
const OFFICIAL = 'deepseek-ai/deepseek-harness';

const TOOLCHAIN_KW = [
  'awesome', 'handbook', '手册', '教程', 'tutorial', 'desktop', 'tui', 'docker',
  'kubernetes', 'k8s', '发行版', 'marketplace', '市场', 'framework', '框架',
  '打包', '客户端', 'launcher', 'runtime', 'list', '导航', '目录', 'guide',
  '零基础', 'learn', 'workspace', 'cowork', 'platform', 'agent os',
];

const CAT_ZH = {
  tools: '工具', skills: '技能', ui: '界面', session: '会话', llm: '模型',
  sandbox: '沙箱', orchestration: '编排', storage: '存储', acp: '桥接',
  preset: '预设', utility: '其他',
};

function getToken() {
  const env = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (env) return env;
  try { return execSync('gh auth token', { encoding: 'utf8' }).trim(); }
  catch { return null; }
}

function clean(s, maxn = 140) {
  s = (s || '').trim().replace(/\s+/g, ' ');
  s = s.replace(/^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u2B50]\s*)+/u, '');
  if (s.length > maxn) s = s.slice(0, maxn - 1).trimEnd() + '…';
  return s;
}

function hasCjk(s) { return /[\u4e00-\u9fff]/.test(s || ''); }

function isDshNamed(fullName) { return /dsh/i.test(fullName); }

function isDshDesc(desc) {
  const d = (desc || '').toLowerCase();
  return /deepseek harness|deepseek-harness|\bdsh\b|harness/.test(d);
}

function isToolchain(name, desc) {
  const n = name.toLowerCase();
  const d = (desc || '').toLowerCase();
  return TOOLCHAIN_KW.some((kw) => n.includes(kw) || d.includes(kw));
}

// 11-enum category heuristic (aligned with docs/categories.md)
function categorize(name, desc) {
  const d = (desc || '').toLowerCase() + ' ' + name.toLowerCase();
  if (/vision|视觉|vlm|看图|image|图片|multimodal|omnimodal/.test(d)) return 'llm';
  if (/skin|皮肤|theme|主题|whale|鲸鱼|css/.test(d)) return 'ui';
  if (/notify|通知|webhook|wechat|telegram|feishu|lark|dingtalk|slack/.test(d)) return 'utility';
  if (/session|会话|memory|记忆|context|上下文|compaction|压缩|import|export|导出|share|分享|recall|撤回/.test(d)) return 'session';
  if (/subagent|workflow|milestone|agent|团队|编排|orchestr/.test(d)) return 'orchestration';
  if (/skill|技能/.test(d)) return 'skills';
  if (/sandbox|沙箱/.test(d)) return 'sandbox';
  if (/acp|bridge|桥接|remote|远程|lan|局域网/.test(d)) return 'acp';
  if (/cost|token|模型|llm|reasoning/.test(d)) return 'llm';
  if (/ui|sidebar|面板|panel|width|navbar|界面/.test(d)) return 'ui';
  return 'tools';
}

function slug(fullName) {
  return fullName.split('/')[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function makeEntry(repo, meta) {
  const name = repo.split('/')[1];
  const desc = clean(meta.description) || '(no description)';
  const descZh = clean(meta.description) || '(无描述)';
  const entry = {
    id: slug(repo),
    name,
    npm: null,
    repo,
    url: `https://github.com/${repo}`,
    category: meta.category,
    description: { en: desc, zh: descZh }, // verbatim; bilingual translation is a downstream task
    author: repo.split('/')[0],
    stars: meta.stars,
    license: meta.license || 'unknown',
    tags: [],
    dsh: { minVersion: '', peerCordis: '', node: '' },
    compat: { status: 'unknown', dshVersion: '', lastVerified: '', note: '' },
    install: '',
    featured: false,
    isOfficialBeta: false,
    language: meta.language || 'unknown',
    sourceNote: 'auto',
  };
  if (meta.watchReason) entry.watchReason = meta.watchReason;
  return entry;
}

async function main() {
  const token = getToken();
  if (!token) {
    console.error('discover-plugins: no GitHub token (set GH_TOKEN / GITHUB_TOKEN, or `gh auth login` locally)');
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const plugins = Array.isArray(data.plugins) ? data.plugins : [];
  const watchlist = Array.isArray(data.watchlist) ? data.watchlist : [];
  const tracked = new Set([...plugins, ...watchlist].map((e) => e.repo).filter(Boolean));

  // pull topic full list (search API, paginated, max 15 pages = 1500 repos)
  const topic = [];
  for (let page = 1; page <= 15; page++) {
    const res = await fetch(SEARCH + page + '&sort=stars&order=desc', {
      headers: {
        Authorization: `bearer ${token}`,
        'User-Agent': 'dsh-suite-hourly-discover',
        Accept: 'application/vnd.github+json',
      },
    });
    const json = await res.json();
    const items = json.items || [];
    topic.push(...items);
    if (items.length < 100) break;
    if (topic.length >= (json.total_count || 0)) break;
  }

  const started = Date.now();
  const newPlugins = [];
  const newWatch = [];
  for (const item of topic) {
    const repo = item.full_name;
    if (!repo || tracked.has(repo)) continue;
    if (repo === OFFICIAL) continue; // framework itself is excluded from the catalog
    if (repo === SELF_DEV_REPO) continue; // never add the umbrella as a new entry

    const desc = item.description;
    const meta = {
      stars: item.stargazers_count || 0,
      description: desc,
      language: item.language,
      license: (item.license && item.license.spdx_id) || null,
    };

    if (!desc) {
      meta.category = 'tools';
      meta.watchReason = '占位';
      newWatch.push(makeEntry(repo, meta));
    } else if (!isDshNamed(repo) && !isDshDesc(desc)) {
      meta.category = categorize(repo, desc);
      meta.watchReason = '蹭tag';
      newWatch.push(makeEntry(repo, meta));
    } else if (isToolchain(repo, desc)) {
      meta.category = 'utility';
      meta.watchReason = '工具链';
      newWatch.push(makeEntry(repo, meta));
    } else {
      meta.category = categorize(repo, desc);
      newPlugins.push(makeEntry(repo, meta));
    }
  }

  const total = newPlugins.length + newWatch.length;
  if (total === 0) {
    console.log(`discover-plugins: no new repos — topic ${topic.length} scanned, ${tracked.size} already tracked`);
    return; // idempotent
  }

  // dedupe ids across the full combined set (id is the unique anchor key)
  const allIds = new Set([...plugins, ...watchlist].map((e) => e.id));
  for (const e of [...newPlugins, ...newWatch]) {
    if (allIds.has(e.id)) { e.id = `${e.id}-${e.author.toLowerCase()}`; }
    allIds.add(e.id);
  }

  data.plugins = plugins.concat(newPlugins);
  data.watchlist = watchlist.concat(newWatch);
  data._meta.totals = { plugins: data.plugins.length, watchlist: data.watchlist.length };
  data._meta.generated_at = new Date().toISOString();
  data._meta.source = 'hourly discover-plugins (topic dsh-plugin)';

  writeFileSync(DATA, JSON.stringify(data, null, 1) + '\n', 'utf8');
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`discover-plugins: +${newPlugins.length} plugins, +${newWatch.length} watchlist (topic ${topic.length} scanned, ${elapsed}s)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
