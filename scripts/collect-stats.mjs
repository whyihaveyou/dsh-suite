#!/usr/bin/env node
/**
 * collect-stats.mjs — 生态指标时间序列采集（零依赖，Node 内置模块）。
 *
 * 每次 hourly refresh（或手动）追加一个数据点到 data/stats-history.json：
 *   JSONL，一行一个点，append-only，方便 diff：
 *   {"ts":"2026-08-16T02:00:00Z","totalEntries":2068,"watchlistCount":720,"featuredCount":21,
 *    "totalStars":237556,"l3Count":79,"compatOk":221,"compatBroken":0,"compatUnknown":1847,
 *    "newEntriesToday":12,"deletedRepos":18}
 *
 * 字段全部从既有数据推导（不新造）：
 *   - totalEntries / watchlistCount / featuredCount / totalStars  <- data/plugins.json
 *   - l3Count                                                     <- data/compat-installed.json
 *   - compatOk/Broken/Unknown                                     <- data/plugins.json 每条目 compat.status
 *   - newEntriesToday                                             <- 相对 data/stats-baseline.json（上次采集的 id 集）
 *   - deletedRepos                                                <- data/deleted-repos.json
 *
 * 用法：
 *   node scripts/collect-stats.mjs            # 追加当前点（hourly；同小时幂等去重）
 *   node scripts/collect-stats.mjs --backfill # 从 git 历史回填（每个有数据提交的日期取当日最后
 *                                             一个 commit 计算指标，含当日新增数），再追加当前点
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data');
const PLUGINS = join(DATA, 'plugins.json');
const INSTALLED = join(DATA, 'compat-installed.json');
const DELETED = join(DATA, 'deleted-repos.json');
const HISTORY = join(DATA, 'stats-history.json');
const BASELINE = join(DATA, 'stats-baseline.json');

const json = (p, fb) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return fb; } };
const readLines = (p) => { try { return readFileSync(p, 'utf8').trim().split('\n').filter(Boolean); } catch { return []; } };

/** 从一个 plugins.json 对象计算指标点 */
function computePoint(pluginsJson, { installedIds, deletedCount, ts, newEntriesToday, note }) {
  const pl = pluginsJson.plugins || [];
  const wl = pluginsJson.watchlist || [];
  const compat = { ok: 0, broken: 0, unknown: 0 };
  for (const e of [...pl, ...wl]) {
    const s = (e.compat && e.compat.status) || 'unknown';
    if (s === 'ok') compat.ok++;
    else if (s === 'broken') compat.broken++;
    else compat.unknown++;
  }
  const p = {
    ts,
    totalEntries: pl.length + wl.length,
    watchlistCount: wl.length,
    featuredCount: pl.filter((x) => x.featured).length,
    totalStars: [...pl, ...wl].reduce((s, e) => s + (e.stars || 0), 0),
    l3Count: installedIds,
    compatOk: compat.ok,
    compatBroken: compat.broken,
    compatUnknown: compat.unknown,
    newEntriesToday,
    deletedRepos: deletedCount,
  };
  if (note) p.note = note;
  return p;
}

/** 当前实况点 */
function currentPoint() {
  const data = json(PLUGINS, { plugins: [], watchlist: [] });
  const installed = json(INSTALLED, { ids: [] });
  const installedIds = Array.isArray(installed.ids) ? installed.ids.length : (installed.count || 0);
  const deleted = json(DELETED, { repos: [] });
  const deletedCount = Array.isArray(deleted.repos) ? deleted.repos.length : 0;
  const baseline = json(BASELINE, null);
  const curIds = new Set([...data.plugins, ...data.watchlist].map((e) => e.id));
  let newToday = 0;
  if (baseline && Array.isArray(baseline.ids)) {
    const prev = new Set(baseline.ids);
    newToday = [...curIds].filter((id) => !prev.has(id)).length;
  }
  return computePoint(data, {
    installedIds, deletedCount,
    ts: new Date().toISOString(),
    newEntriesToday: newToday,
  });
}

/** 回填：git 里每个有 data/plugins.json 提交的日期，取当日最后一个 commit 计算指标 */
function backfillPoints() {
  const days = execSync('git log --format=%ad --date=format:%Y-%m-%d -- data/plugins.json', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const today = new Date().toISOString().slice(0, 10);
  // 只回填今天之前的日期——今天由实况点（hourly append）负责，避免同日重复
  const dates = [...new Set(days)].sort().filter((d) => d < today);
  const points = [];
  let prevIds = new Set();
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const until = `${date} 23:59:59`;
    let commit = '';
    try { commit = execSync(`git log -1 --format=%H --until="${until}" -- data/plugins.json`, { encoding: 'utf8' }).trim(); } catch { continue; }
    if (!commit) continue;
    let pj = null;
    try { pj = JSON.parse(execSync(`git show ${commit}:data/plugins.json`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })); } catch { continue; }
    // historical L3 count: compat-installed.json exists in git since 2026-08-15
    let installedIds = 0;
    try {
      const inst = JSON.parse(execSync(`git show ${commit}:data/compat-installed.json 2>/dev/null || echo '{"ids":[]}'`, { encoding: 'utf8' }).trim());
      installedIds = Array.isArray(inst.ids) ? inst.ids.length : 0;
    } catch { installedIds = 0; }
    let deletedCount = 0;
    try {
      const dr = JSON.parse(execSync(`git show ${commit}:data/deleted-repos.json 2>/dev/null || echo '{"repos":[]}'`, { encoding: 'utf8' }).trim());
      deletedCount = Array.isArray(dr.repos) ? dr.repos.length : 0;
    } catch { deletedCount = 0; }
    const curIds = new Set([...(pj.plugins || []), ...(pj.watchlist || [])].map((e) => e.id));
    const newToday = i === 0 ? curIds.size : [...curIds].filter((id) => !prevIds.has(id)).length;
    points.push(computePoint(pj, {
      installedIds, deletedCount,
      ts: `${date}T12:00:00Z`,
      newEntriesToday: newToday,
      note: `backfill@${commit.slice(0, 8)}`,
    }));
    prevIds = curIds;
  }
  return points;
}

function main() {
  const backfill = process.argv.includes('--backfill');
  const existing = readLines(HISTORY).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const lines = [];
  if (backfill) {
    const gitPoints = backfillPoints();
    gitPoints.forEach((p) => lines.push(p));
  }
  // 追加当前实况点（同小时幂等：已有同 ts 前缀则不重复）
  const cur = currentPoint();
  const hourKey = cur.ts.slice(0, 13);
  // backfill 模式忽略旧文件（全量重建），dedup 只看本批点
  const pool = backfill ? lines : [...lines, ...existing];
  const dup = pool.some((p) => p.ts && p.ts.slice(0, 13) === hourKey);
  if (!dup) lines.push(cur);

  // 合并既有文件中的点（保序去重后按 ts 排序写回）。
  // --backfill 是全量重建：忽略旧文件，只保留 git 回填 + 当前实况点。
  const map = new Map();
  for (const p of lines) map.set(p.ts, p);
  if (!backfill) for (const p of existing) if (!map.has(p.ts)) map.set(p.ts, p);
  const all = [...map.values()].sort((a, b) => a.ts.localeCompare(b.ts));
  writeFileSync(HISTORY, all.map((p) => JSON.stringify(p)).join('\n') + '\n', 'utf8');

  // 更新基线（id 集，供下次 newEntriesToday）
  const data = json(PLUGINS, { plugins: [], watchlist: [] });
  const ids = [...data.plugins, ...data.watchlist].map((e) => e.id).sort();
  writeFileSync(BASELINE, JSON.stringify({ ts: cur.ts, ids }, null, 1) + '\n', 'utf8');

  console.error(`[collect-stats] history=${all.length} points (backfill=${backfill ? 'yes' : 'no'}, append=${dup ? 'dedup-skip' : cur.ts})`);
  console.error(`[collect-stats] latest: ${JSON.stringify(all[all.length - 1])}`);
}

main();
