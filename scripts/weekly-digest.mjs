#!/usr/bin/env node
/**
 * weekly-digest.mjs — DSH 生态周报自动生成器（零依赖，Node 内置模块）。
 *
 * 每周一生成一期生态周报 digest/<ISO-week>.md（中英双语），从现有数据文件推导：
 *   1. 本周新收录   —— 用 git 边界提交的 id 集差集（hourly 重写全文件会使 diff
 *                      噪音巨大，直接 diff 行不可靠；取「一周前那个 commit」的
 *                      全部插件 id 与当前 id 取差集，稳健）。
 *   2. 星数增长 Top → 对比周一基线 digest/.last-week.json 的 stars_by_repo；
 *                      首次运行回落 bot/state/last-snapshot.json（历史基线）。
 *                      用 data/deleted-repos.json 排除已删/改名仓库。
 *   3. 实测徽章变化 —— 对比 data/compat-installed.json 相对基线的新增 L3 数。
 *   4. 社区动态占位 —— 留 markdown 位人工补充（PR/投稿/合作）。
 *   5. 数据总览     —— 条目总数 / featured / CI 覆盖率（compat 分布）。
 *
 * 依赖的既有数据文件（全部是 dsh-suite 既有产物，不新造）：
 *   data/plugins.json / data/compat-installed.json / data/compat-report.json
 *   data/deleted-repos.json / bot/state/last-snapshot.json
 *   digest/.last-week.json（本脚本自维护的周一基线；首次运行不存在则回落快照）
 *
 * 用法：
 *   node scripts/weekly-digest.mjs                 # dry-run：周报正文打到 stdout
 *   node scripts/weekly-digest.mjs --write          # 写 digest/<week>.md + 更新基线
 *   node scripts/weekly-digest.mjs --week 2026-W32  # 指定周（默认本周）
 *   node scripts/weekly-digest.mjs --since 7        # 覆盖「本周」回溯天数（默认 7）
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data');
const PLUGINS = join(DATA, 'plugins.json');
const COMPAT_INSTALLED = join(DATA, 'compat-installed.json');
const COMPAT_REPORT = join(DATA, 'compat-report.json');
const DELETED = join(DATA, 'deleted-repos.json');
const SNAP = join(ROOT, 'bot', 'state', 'last-snapshot.json');
const DIGEST_DIR = join(ROOT, 'digest');
const BASELINE = join(DIGEST_DIR, '.last-week.json');
const REPO_URL = 'https://github.com/whyihaveyou/dsh-suite';
const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function parseArgs(argv) {
  const a = { write: false, week: null, since: 7 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--write') a.write = true;
    else if (argv[i] === '--week' && argv[i + 1]) a.week = argv[++i];
    else if (argv[i] === '--since' && argv[i + 1]) a.since = Number(argv[++i]);
    else if (argv[i] === '--help' || argv[i] === '-h') { console.log('Usage: node scripts/weekly-digest.mjs [--write] [--week YYYY-Wnn] [--since N]'); process.exit(0); }
  }
  return a;
}

// ISO 8601 year-week, e.g. 2026-W33
function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day); // move to Thursday of this week
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

const json = (p, fb) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return fb; } };

function gitBoundaryIdsBefore(daysAgo) {
  // Last commit strictly before `daysAgo` days from now → its plugins.json id set
  // = "start of week / last week's" snapshot. Robust against hourly full-file rewrites.
  const since = new Date(Date.now() - daysAgo * 86400000).toISOString();
  let commit = null;
  let note = `git 边界(${daysAgo}d ago)`;
  try {
    commit = execSync(`git log -1 --format=%H --before="${since}" -- data/plugins.json`, { encoding: 'utf8' }).trim();
    if (!commit) {
      // Repo younger than the window (fresh project): fall back to the OLDEST
      // data commit so the debut issue can still report "new since ingest".
      commit = execSync(`git log --format=%H -- data/plugins.json | tail -1`, { encoding: 'utf8' }).trim();
      if (commit) note = 'git 最早 data commit（仓库尚不足一周）';
    }
  } catch { /* not a git repo */ }
  if (!commit) return null;
  try {
    const text = execSync(`git show ${commit}:data/plugins.json`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const ids = new Set();
    for (const m of text.matchAll(/"id"\s*:\s*"([^"]+)"/g)) {
      if (ID_RE.test(m[1])) ids.add(m[1]);
    }
    return { commit, ids, note };
  } catch { return null; }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const week = args.week || isoWeek(new Date());
  const data = json(PLUGINS, { plugins: [], watchlist: [], _meta: {} });
  const plugins = data.plugins || [];
  const watchlist = data.watchlist || [];
  const all = [...plugins, ...watchlist];
  const byId = new Map(all.map((p) => [p.id, p]));

  const installed = json(COMPAT_INSTALLED, { ids: [] });
  const installedIds = new Set(installed.ids || []);
  const deleted = new Set((json(DELETED, { repos: [] }).repos || []).map((r) => r.repo));
  const compatRep = json(COMPAT_REPORT, {});
  const baseline = json(BASELINE, null);
  const snap = baseline || json(SNAP, null);

  // ---- 1. 本周新收录：git 边界 id 集差集 ----
  const boundary = gitBoundaryIdsBefore(args.since);
  let newIds = [];
  let removedIds = [];
  let newSource = '';
  if (boundary) {
    const cur = all.map((p) => p.id);
    newIds = cur.filter((id) => !boundary.ids.has(id));
    removedIds = [...boundary.ids].filter((id) => !byId.has(id));
    newSource = `${boundary.note || 'git 边界'} ${boundary.commit.slice(0, 8)}: ${boundary.ids.size} → ${cur.length} 条`;
  } else if (baseline && Array.isArray(baseline.ids)) {
    newIds = all.map((p) => p.id).filter((id) => !baseline.ids.includes(id));
    newSource = `基线 ${BASELINE}`;
  } else {
    newSource = '（无历史基线，首期无法对比新收录）';
  }
  const newEntries = newIds.map((id) => byId.get(id)).filter(Boolean)
    .sort((a, b) => (b.stars || 0) - (a.stars || 0));
  const newThisWeek = newSource.startsWith('git') ? newEntries : [];

  // ---- 2. 星数增长 Top 10（排除已删/改名）----
  const baselineStars = snap && typeof snap.stars_by_repo === 'object' ? snap.stars_by_repo : (baseline && baseline.starsByRepo || {});
  const repoStars = new Map(all.filter((e) => e.repo).map((e) => [e.repo, e]));
  const growth = [];
  for (const [repo, old] of Object.entries(baselineStars)) {
    if (deleted.has(repo)) continue;
    const cur = repoStars.get(repo);
    if (!cur) continue; // repo no longer in catalog
    const curStars = cur.stars || 0;
    const delta = curStars - old;
    if (delta > 0) growth.push({ repo, id: cur.id, delta, from: old, to: curStars });
  }
  growth.sort((a, b) => b.delta - a.delta);
  const topGains = growth.slice(0, 10);

  // ---- 3. 实测徽章变化：相对基线的新增 L3 ----
  const prevInstalled = baseline && Array.isArray(baseline.installedIds) ? new Set(baseline.installedIds) : new Set();
  const newL3 = installedIds.size - (baseline ? prevInstalled.size : 0);

  // ---- 5. 数据总览 ----
  const tot = data._meta?.totals || {};
  const featured = plugins.filter((p) => p.featured).length;
  const compatSummary = compatRep.summary || null;

  // ---- assemble bilingual markdown ----
  const L = [];
  const now = new Date().toISOString().slice(0, 10);
  L.push(`# DSH 生态周报 #${week} — DeepSeek Harness Ecosystem Weekly`);
  L.push('');
  L.push(`> ${now} · 数据：<code>dsh-suite</code> 目录（每小时刷新）· ${REPO_URL}`);
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 数据总览 / Ecosystem at a glance');
  L.push('');
  L.push(`| 指标 | 数值 |`);
  L.push('|---|---|');
  L.push(`| 主目录收录 | **${tot.plugins ?? plugins.length}** 条 |`);
  L.push(`| 观察区 watchlist | ${tot.watchlist ?? watchlist.length} 条 |`);
  L.push(`| Featured 精选 | ${featured} 条 |`);
  L.push(`| L3 真实安装验证 | ${installedIds.size} 条 |`);
  if (compatSummary) L.push(`| L1 静态兼容 | ${compatSummary.ok} ok / ${compatSummary.broken} broken / ${compatSummary.unknown} unknown（共 ${compatSummary.total} 条已检）|`);
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 本周新收录 / New this week');
  L.push('');
  if (newThisWeek.length) {
    L.push(`> 数据源：${newSource}`);
    L.push('');
    newThisWeek.slice(0, 25).forEach((p) => {
      const zh = (p.description && (p.description.zh || p.description.en)) || p.name || p.id;
      let d = String(zh).replace(/\s+/g, ' ').trim();
      if (d.length > 88) d = d.slice(0, 86).replace(/\s+\S*$/, '') + '…';
      L.push(`- **${p.name || p.id}**（${p.category || '—'}${p.featured ? ' · ⭐ Featured' : ''}）★${p.stars ?? 0} — ${d}`);
    });
    if (newThisWeek.length > 25) L.push(`- … 等共 ${newThisWeek.length} 条`);
    if (removedIds.length) L.push('');
    if (removedIds.length) L.push(`同时 ${removedIds.length} 条移出/改名（不列入本期）。`);
  } else {
    L.push(`_${newSource}。_`);
  }
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 星数增长 Top 10 / Star growth');
  L.push('');
  if (topGains.length) {
    L.push(`> 对比${snap && snap.snapshot_date ? ` ${snap.snapshot_date}` : ' 上周基线'}；已排除 deleted-repos.json 的仓库。`);
    L.push('');
    L.push('| 仓库 | 涨星 | 总星数 |');
    L.push('|---|---|---|');
    topGains.forEach((g) => L.push(`| [${g.repo}](https://github.com/${g.repo}) | **+${g.delta}** | ${g.to} |`));
  } else {
    L.push(`_对比${snap && snap.snapshot_date ? ` ${snap.snapshot_date}` : '上期基线'}后无净增长（或首期基线未建立）。_`);
  }
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 实测徽章 / L3 install-verified');
  L.push('');
  if (baseline) L.push(`本期 **${installedIds.size}** 条 L3 实测通过（${newL3 >= 0 ? '+' : ''}${newL3} 相对上期）；compat CI 每小时/每日滚动验证。`);
  else L.push(`本期 **${installedIds.size}** 条 L3 实测通过（真实安装 + 配置组装）；基线自本期起建立。`);
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 社区动态 / Community');
  L.push('');
  L.push('> 本栏人工补充（PR、投稿、合作、官方动态）：');
  L.push('');
  L.push('- _（待补充）_');
  L.push('');
  L.push('---');
  L.push('');
  L.push('*Generated by dsh-suite · scripts/weekly-digest.mjs*');
  const md = L.join('\n') + '\n';

  if (args.write) {
    mkdirSync(DIGEST_DIR, { recursive: true });
    writeFileSync(join(DIGEST_DIR, `${week}.md`), md, 'utf8');
    // advance baseline for next week
    const baselineOut = {
      issue: week,
      generated_at: new Date().toISOString(),
      ids: all.map((p) => p.id).sort(),
      starsByRepo: Object.fromEntries(all.filter((e) => e.repo).map((e) => [e.repo, e.stars])),
      installedIds: [...installedIds].sort(),
      totals: { plugins: plugins.length, watchlist: watchlist.length, featured },
    };
    writeFileSync(BASELINE, JSON.stringify(baselineOut, null, 1) + '\n', 'utf8');
    console.error(`weekly-digest: wrote digest/${week}.md + baseline (${all.length} ids, ${installedIds.size} L3)`);
  } else {
    console.log(md);
  }

  // machine-print summary for the report
  console.error(`\n[summary] week=${week} new=${newThisWeek.length} topGains=${topGains.length} L3=${installedIds.size} L3delta=${newL3} plugins=${plugins.length} watch=${watchlist.length} featured=${featured}`);
}

main();
