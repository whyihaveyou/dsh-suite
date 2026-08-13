#!/usr/bin/env node
/**
 * dsh-suite X daily digest — data collector + diff + copy generator.
 *
 * Zero dependencies (Node built-ins only). Flow:
 *   1. Read our own assets: data/plugins.json (catalog), data/compat-report.json
 *      (daily compat CI), and the `dsh-plugin` GitHub topic (via `gh`).
 *   2. Diff against bot/state/last-snapshot.json (git-tracked). First run (no
 *      snapshot) emits a "launch" tweet instead of a diff.
 *   3. Generate copy — English main ≤280 + Chinese follow-up ≤280. Uses the
 *      DeepSeek API when DEEPSEEK_API_KEY is set, otherwise a deterministic
 *      template fallback (so the bot works with no LLM key at all).
 *   4. Write bot/out/latest-digest.{json,md} and update bot/state/last-snapshot.json
 *      (the workflow commits the snapshot only after post.mjs exits 0 — i.e.
 *      after a successful post OR a dry-run, never after a hard failure).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const BOT_DIR = dirname(fileURLToPath(import.meta.url))
const ROOT = join(BOT_DIR, '..')
const STATE_DIR = join(BOT_DIR, 'state')
const OUT_DIR = join(BOT_DIR, 'out')
const SNAPSHOT_PATH = join(STATE_DIR, 'last-snapshot.json')
const DIGEST_JSON = join(OUT_DIR, 'latest-digest.json')
const DIGEST_MD = join(OUT_DIR, 'latest-digest.md')

const REPO_URL = 'https://github.com/whyihaveyou/dsh-suite'
const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const DEEPSEEK_MODEL = 'deepseek-chat'
const MAX_TWEET = 280

async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')) } catch { return null }
}

// ── data collection ────────────────────────────────────────────────────────

async function collectState() {
  const catalog = await readJson(join(ROOT, 'data', 'plugins.json'))
  const compat = await readJson(join(ROOT, 'data', 'compat-report.json'))
  const plugins = catalog?.plugins ?? []
  const pluginIds = plugins.map((p) => p.id)
  const pluginStars = {}
  for (const p of plugins) pluginStars[p.id] = p.stars ?? 0
  const compatVerdicts = {}
  for (const r of (compat?.results ?? [])) {
    if (r.section === 'catalog') compatVerdicts[r.id] = r.verdict
  }
  const topicRepos = await fetchTopicRepos()
  return {
    pluginIds,
    pluginStars,
    compatVerdicts,
    compatSummary: compat?.summary_catalog ?? null,
    topicRepos,
    catalogGeneratedAt: catalog?._meta?.generated_at ?? null,
    dshVersion: compat?.dshVersion ?? null,
  }
}

// `gh search repos topic:dsh-plugin` → { "owner/repo": stars }. Degrades to {}
// when `gh` is missing, unauthenticated, or offline (never throws).
function fetchTopicRepos() {
  try {
    const out = execFileSync('gh', [
      'search', 'repos', 'topic:dsh-plugin',
      '--json', 'fullName,stargazersCount', '--limit', '200',
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    const map = {}
    for (const r of JSON.parse(out)) map[r.fullName] = r.stargazersCount
    return map
  } catch { return {} }
}

// ── diff against the previous snapshot ─────────────────────────────────────

function diff(current, snap) {
  const prevIds = new Set(snap?.pluginIds ?? [])
  const newPlugins = current.pluginIds.filter((id) => !prevIds.has(id))

  const growth = []
  for (const [id, stars] of Object.entries(current.pluginStars)) {
    const old = snap?.pluginStars?.[id]
    if (typeof old === 'number' && stars > old) growth.push({ id, delta: stars - old, from: old, to: stars })
  }
  growth.sort((a, b) => b.delta - a.delta)
  const topStarGains = growth.slice(0, 3)

  const compatChanges = []
  for (const [id, verdict] of Object.entries(current.compatVerdicts)) {
    const old = snap?.compatVerdicts?.[id]
    if (old && old !== verdict) compatChanges.push({ id, from: old, to: verdict })
  }

  const newTopicRepos = Object.entries(current.topicRepos)
    .filter(([name]) => !(name in (snap?.topicRepos ?? {})))
    .map(([name, stars]) => ({ name, stars }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5)

  return { newPlugins, topStarGains, compatChanges, newTopicRepos }
}

// ── fact rendering for the LLM prompt / template ───────────────────────────

function describeCompat(s) {
  if (!s) return 'compat: n/a'
  return `compat: ${s.ok} ok / ${s.broken} broken / ${s.unknown} unknown / ${s.unavailable} unavailable (${s.total} checked)`
}

function factsSummary(current, d, mode) {
  const lines = []
  lines.push(`mode: ${mode}`)
  lines.push(`catalog: ${current.pluginIds.length} plugins`)
  lines.push(describeCompat(current.compatSummary))
  lines.push(`dsh version: ${current.dshVersion ?? 'n/a'}`)
  if (mode === 'daily') {
    lines.push(`new plugins (${d.newPlugins.length}): ${d.newPlugins.slice(0, 5).join(', ') || '(none)'}`)
    lines.push(`star gains top3: ${d.topStarGains.map((g) => `${g.id} +${g.delta}`).join(', ') || '(none)'}`)
    lines.push(`compat changes: ${d.compatChanges.map((c) => `${c.id}: ${c.from}->${c.to}`).join(', ') || '(none)'}`)
    lines.push(`new topic repos: ${d.newTopicRepos.map((r) => `${r.name}(${r.stars}★)`).join(', ') || '(none)'}`)
  }
  return lines.join('\n')
}

// ── copy generation (LLM, then template fallback) ──────────────────────────

async function llmCopy(facts) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) return null
  const system = [
    'You write the daily tweets for a DeepSeek Harness (DSH) ecosystem digest bot.',
    'Output STRICT JSON: {"en":"...","zh":"..."} — no prose, no code fences.',
    'Rules:',
    '- en is the main English tweet, zh is a Chinese follow-up reply.',
    '- Both ≤ 280 characters. Count carefully.',
    '- Restrained, technical tone. State ONLY facts present in the provided data.',
    '- NEVER invent or round numbers. If a number is not in the data, omit it.',
    '- End each tweet with the repo link (en) / 仓库链接 (zh): ' + REPO_URL,
  ].join('\n')
  const user = `Data (facts only):\n${facts}\n\nWrite the two tweets now.`

  const res = await fetch(DEEPSEEK_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.4,
      max_tokens: 300,
      response_format: { type: 'json_object' },
    }),
  })
  if (!res.ok) {
    console.error(`[digest] DeepSeek API ${res.status}: ${(await res.text()).slice(0, 300)}`)
    return null
  }
  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content ?? ''
  // Tolerate JSON mode drift: try direct parse, then regex fallback.
  try {
    const parsed = JSON.parse(text)
    if (parsed.en && parsed.zh) return { en: parsed.en.slice(0, MAX_TWEET), zh: parsed.zh.slice(0, MAX_TWEET), via: 'llm' }
  } catch { /* fall through */ }
  const m = text.match(/"en"\s*:\s*"([^"]+)"[\s\S]*?"zh"\s*:\s*"([^"]+)"/)
  if (m) return { en: m[1].slice(0, MAX_TWEET), zh: m[2].slice(0, MAX_TWEET), via: 'llm' }
  console.error(`[digest] could not parse LLM output: ${text.slice(0, 200)}`)
  return null
}

function templateCopy(current, d, mode) {
  const link = REPO_URL
  if (mode === 'launch') {
    return {
      en: `🚀 DSH ecosystem daily digest is live — tracking plugins, compat CI, and star growth from our own data (plugins.json + daily compat report + dsh-plugin topic). ${link}`.slice(0, MAX_TWEET),
      zh: `🚀 DSH 生态日报上线：数据来自我们自己的 plugins.json 目录、每日兼容 CI、以及 dsh-plugin topic 仓库。${link}`.slice(0, MAX_TWEET),
      via: 'template',
    }
  }
  const n = d.newPlugins.length
  const total = current.pluginIds.length
  const gains = d.topStarGains.map((g) => `${g.id} +${g.delta}`).join(', ') || '—'
  const s = current.compatSummary ?? { ok: '?', broken: '?' }
  const en = `DSH daily: +${n} plugin(s) (${total} tracked); star gains: ${gains}; compat ${s.ok} ok / ${s.broken} broken. ${link}`.slice(0, MAX_TWEET)
  const zh = `DSH 日报：新增 ${n} 个插件（共 ${total} 个）；涨星：${gains}；兼容 ${s.ok} ok / ${s.broken} broken。${link}`.slice(0, MAX_TWEET)
  return { en, zh, via: 'template' }
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  const current = await collectState()
  const snap = await readJson(SNAPSHOT_PATH)
  const mode = snap ? 'daily' : 'launch'
  const d = mode === 'daily' ? diff(current, snap) : { newPlugins: [], topStarGains: [], compatChanges: [], newTopicRepos: [] }

  const facts = factsSummary(current, d, mode)
  const copy = (await llmCopy(facts)) ?? templateCopy(current, d, mode)

  const digest = {
    generatedAt: new Date().toISOString(),
    mode,
    copy,
    facts: {
      newPlugins: d.newPlugins,
      topStarGains: d.topStarGains,
      compatChanges: d.compatChanges,
      newTopicRepos: d.newTopicRepos,
      compatSummary: current.compatSummary,
      catalogCount: current.pluginIds.length,
    },
  }

  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(STATE_DIR, { recursive: true })
  await writeFile(DIGEST_JSON, JSON.stringify(digest, null, 2) + '\n')
  await writeFile(DIGEST_MD, renderMarkdown(digest))

  // Snapshot for tomorrow's diff. Committed by the workflow only after post.mjs
  // exits 0 (success or dry-run) — see .github/workflows/x-digest.yml.
  const snapshot = {
    generatedAt: digest.generatedAt,
    catalogGeneratedAt: current.catalogGeneratedAt,
    dshVersion: current.dshVersion,
    pluginIds: current.pluginIds,
    pluginStars: current.pluginStars,
    compatVerdicts: current.compatVerdicts,
    topicRepos: current.topicRepos,
  }
  await writeFile(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + '\n')

  console.log(`[digest] mode=${mode} copyVia=${copy.via}`)
  console.log(`[digest] en (${copy.en.length}c): ${copy.en}`)
  console.log(`[digest] zh (${copy.zh.length}c): ${copy.zh}`)
  console.log(`[digest] wrote ${DIGEST_JSON}, ${DIGEST_MD}, ${SNAPSHOT_PATH}`)
}

function renderMarkdown(digest) {
  const f = digest.facts
  return [
    `# DSH Daily Digest — ${digest.generatedAt}`,
    '',
    `- mode: ${digest.mode}  ·  copy via: ${digest.copy.via}`,
    `- catalog: ${f.catalogCount} plugins`,
    `- compat: ${JSON.stringify(f.compatSummary)}`,
    '',
    '## EN (main tweet)',
    '',
    digest.copy.en,
    '',
    '## ZH (reply)',
    '',
    digest.copy.zh,
    '',
    '## Facts',
    '',
    `- new plugins: ${f.newPlugins.join(', ') || '(none)'}`,
    `- star gains: ${f.topStarGains.map((g) => `${g.id} +${g.delta}`).join(', ') || '(none)'}`,
    `- compat changes: ${f.compatChanges.map((c) => `${c.id}: ${c.from}->${c.to}`).join(', ') || '(none)'}`,
    `- new topic repos: ${f.newTopicRepos.map((r) => `${r.name} (${r.stars}★)`).join(', ') || '(none)'}`,
    '',
  ].join('\n')
}

main().catch((e) => { console.error('[digest] failed:', e); process.exit(1) })
