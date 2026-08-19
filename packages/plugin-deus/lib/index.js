// plugin-deus host half — the experiment recorder for the "deus mode" hypothesis.
//
// Honest framing (kept in sync with the panel declaration): the 3 modes are a
// community observation (X @NFT_Chen), NOT confirmed by DeepSeek. This half only
// watches the session/event stream, classifies assistant openers heuristically,
// and appends to a local JSONL log. Nothing is uploaded; nothing is "unlocked".
//
// Responsibilities:
//   1. Opener detector — first-sentence classification (pure / med / god / unknown)
//   2. JSONL experiment log at $DSH_HOME/deus-mode/log.jsonl
//   3. Trigger preset library (5 built-in modes, user-editable via presets.json)
//   4. /deus/* routes for the browser half (presets, log, stats+Wilson CI, version)
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { gzipSync, zstdDecompressSync } from 'node:zlib'

export const name = 'deus-mode'
export const inject = ['webServer', 'sessions']

// ── built-in trigger preset library (design doc §2.1) ───────────────────────
// prompt: null means "empty input" (send with no text). All user-editable.
const BUILTIN_PRESETS = [
  { id: 'M-empty', label_zh: '空输入', label_en: 'empty', prompt: null, tags: ['minimal'] },
  { id: 'M-single', label_zh: '单字符', label_en: 'single char', prompt: 'x', tags: ['minimal'] },
  { id: 'M-we-lead', label_zh: 'we-起手引导', label_en: 'we-lead prompt', prompt: 'we think and write together.', tags: ['god-lead'] },
  { id: 'M-letme-lead', label_zh: 'Let-me 起手', label_en: 'let-me prompt', prompt: 'Let me handle this carefully.', tags: ['pure-lead'] },
  { id: 'M-slash', label_zh: '纯斜杠', label_en: 'slash', prompt: '/', tags: ['minimal'] },
]

// ── opener detector (design doc §2.3, calibrated by实测矩阵 2026-08-15) ──────
// CALIBRATION (research/deus-mode-matrix.md, 120 API samples): the fingerprint
// lives in the REASONING stream ("The user is asking…" / "We need answer…"),
// NOT in the visible text (which is usually Chinese or a direct answer). Real
// session logs confirm: assistant/chunk carries reasoning-delta 223× vs
// text-delta 16× in a typical turn. So we classify reasoning first, visible
// text as fallback. Chinese "我们…" reasoning openers are god-equivalent
// (observed under minimal conditions) — but ONLY in reasoning, never in
// visible text (normal Chinese answers start with 我们 all the time).
// Heuristic on the first ~120 chars, case-insensitive. This is a tendency
// signal, never proof — the log keeps first_sentence for human review.
const DETECT_WINDOW = 120

export function detectMode(rawText, source = 'text') {
  const head = String(rawText || '').replace(/^\s+/, '').slice(0, DETECT_WINDOW).toLowerCase()
  if (head === '') return 'unknown'
  if (head.startsWith('let me')) return 'pure'
  if (head.startsWith('the user')) return 'med'
  if (/^we[\s,']/.test(head)) return 'god'
  // "User wants/asks…" (article dropped) — soft-med variant observed when
  // injected context is present under a minimal first request (cell M.2.1).
  // v0.2: also "User is continuing…" (multi-turn med variant, drift study §9).
  if (source === 'reasoning' && /^user (wants|asks|is asking|said|says|is continuing|is following up)\b/.test(head)) return 'med'
  // 中文推理起手 "我们需要/我们应该/我们来" — god-equivalent (reasoning only).
  if (source === 'reasoning' && /^我们(需要|应该|先来|来|先)/.test(head)) return 'god'
  const firstSentence = head.split(/[.!?\n]/)[0] || head
  const weCount = (firstSentence.match(/\bwe\b/g) || []).length
  if (weCount >= 3) return 'god'
  return 'unknown'
}

/** First sentence (or window excerpt) for human review in the log. */
function firstSentenceOf(rawText) {
  const text = String(rawText || '').replace(/\s+/g, ' ').trim()
  const m = /^(.{1,160}?[.!?])(\s|$)/.exec(text)
  return (m ? m[1] : text.slice(0, 160)).trim()
}

// ── Wilson score interval (95%) for a binomial proportion ───────────────────
function wilson(k, n) {
  if (n <= 0) return { rate: 0, low: 0, high: 0 }
  const z = 1.96
  const p = k / n
  const denom = 1 + (z * z) / n
  const center = (p + (z * z) / (2 * n)) / denom
  const half = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / denom
  return { rate: p, low: Math.max(0, center - half), high: Math.min(1, center + half) }
}

// ── 两比例 z 检验（v0.4 实验台 A/B 对比用）─────────────────────────────────
// 标准正态 CDF（Abramowitz–Stegun 7.1.26 近似，|ε| < 7.5e-8）
function normalCdf(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp((-x * x) / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return x > 0 ? 1 - p : p
}

/** 两比例 z 检验（双侧）。任一样本为空 → null。 */
function twoPropZ(kA, nA, kB, nB) {
  if (!nA || !nB) return null
  const pooled = (kA + kB) / (nA + nB)
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB))
  if (!se) return { z: 0, p: 1 }
  const z = (kA / nA - kB / nB) / se
  return { z, p: 2 * (1 - normalCdf(Math.abs(z))) }
}

// ── shipped agent presets (v0.2 锚定维持的静态层) ───────────────────────────
const PLUGIN_VERSION = '0.4.0'
// 实测依据（research/deus-mode-matrix.md §8/§9）：神版触发需要 Minimal persona
// ∧ 小工具目录；且本 harness 没有竞品的 promoteOn 机制——preset 构成全程恒定，
// 所以只要会话跑在锚定 preset 上，注入剥离/工具裁剪自动延续到每一轮。
// 用户级 preset 目录 <dshHome>/.agent-presets/<id>/ 由官方 agent-presets 插件
// 实时发现，安装后在 设置 > Agent presets 与会话 preset 选择器中立即可选。
const PERSONA_YML = `- id: persona
  name: '@deepseek-ai/dsh-persona'
  config:
    text: You are a helpful software engineer assistant.
    complete: true
    includeRuntimeContext: false
`
const SHELL_YML = `- id: persistent-shell
  name: cordis:group
  group: true
  isolate:
    terminals: true
  config:
    - id: pty
      name: '@deepseek-ai/dsh-terminal'
    - id: terminal-bash
      name: '@deepseek-ai/dsh-terminal-bash'
      config:
        timeoutMs: 300000
    - id: persistent-bash
      name: '@deepseek-ai/dsh-tool-bash-persistent'
      config:
        timeoutMs: 300000
        description: |-
          Run commands in a bash shell
          * When invoking this tool, the contents of the "command" parameter does NOT need to be XML-escaped.
          * You don't have access to the internet via this tool.
          * You do have access to a mirror of common linux and python packages via apt and pip.
          * State is persistent across command calls and discussions with the user.
          * To inspect a particular line range of a file, e.g. lines 10-25, try 'sed -n 10,25p /path/to/the/file'.
          * Please avoid commands that may produce a very large amount of output.
          * Please run long lived commands in the background, e.g. 'sleep 10 &' or start a server in the background.
`
const FS_YML = `- id: filesystem
  name: cordis:group
  group: true
  isolate:
    fs: true
  config:
    - id: fs-local
      name: '@deepseek-ai/dsh-fs-local'
      config:
        cwd: !!js process.env.DSH_CWD ?? process.cwd()
    - id: str-replace-editor
      name: '@deepseek-ai/dsh-tool-str-replace-editor'
      config:
        maxOutputChars: 16000
`
// 宽档追加的常用工具（实测梯度 §8：~8 工具档仍有 ~65% 触发率，换可用性）
const WIDE_TOOLS_YML = `- id: tool-fs
  name: '@deepseek-ai/dsh-tool-fs'
- id: tool-fs-search
  name: '@deepseek-ai/dsh-tool-fs-search'
  config:
    sampleOverCapGlobResults: false
- id: tool-todo
  name: '@deepseek-ai/dsh-tool-todo'
  config:
    allowParallelInProgress: true
`
const AGENT_PRESETS = [
  {
    id: 'deus-anchored',
    name: '神模扳机 · 窄锚（2 工具）',
    description: 'Minimal persona + bash/str_replace_editor，剥注入；实测动手类神版起手 ~90%。@dsh-suite/plugin-deus 安装。',
    order: 90,
    cordis: `# deus-anchored: 2-tool minimal anchor preset (@dsh-suite/plugin-deus v0.2)\n${PERSONA_YML}\n${SHELL_YML}\n${FS_YML}`,
  },
  {
    id: 'deus-anchored-wide',
    name: '神模扳机 · 宽锚（~8 工具）',
    description: 'Minimal persona + bash/编辑/读写/glob/grep/todo，剥注入；实测 ~65% 触发率换可用性。@dsh-suite/plugin-deus 安装。',
    order: 91,
    cordis: `# deus-anchored-wide: ~8-tool wide anchor preset (@dsh-suite/plugin-deus v0.2)\n${PERSONA_YML}\n${SHELL_YML}\n${FS_YML}\n${WIDE_TOOLS_YML}`,
  },
]

function agentPresetsRoot() {
  return join(dshHome(), '.agent-presets')
}

// Idempotent install: only write when missing or content changed; never touch
// a preset dir the user has modified (marker mismatch → skip with warning).
function installAgentPresets(logger) {
  const installed = []
  for (const p of AGENT_PRESETS) {
    try {
      const dir = join(agentPresetsRoot(), p.id)
      const marker = join(dir, '.deus-managed')
      const cordisPath = join(dir, 'agent.cordis.yml')
      const presetPath = join(dir, 'preset.yml')
      const presetYml = `name: ${p.name}\ndescription: ${p.description}\norder: ${p.order}\n`
      if (existsSync(dir) && !existsSync(marker)) {
        logger?.warn?.(`[plugin-deus] skip ${p.id}: dir exists without .deus-managed marker (user-modified?)`)
        installed.push({ id: p.id, installed: false, reason: 'user-modified' })
        continue
      }
      const current = existsSync(cordisPath) ? readFileSync(cordisPath, 'utf8') : null
      if (current !== p.cordis) {
        mkdirSync(dir, { recursive: true })
        writeFileSync(cordisPath, p.cordis)
        writeFileSync(presetPath, presetYml)
        writeFileSync(marker, `@dsh-suite/plugin-deus@${PLUGIN_VERSION}\n`)
      }
      installed.push({ id: p.id, installed: true, name: p.name, dir })
    } catch (e) {
      logger?.warn?.(`[plugin-deus] install ${p.id} failed:`, e)
      installed.push({ id: p.id, installed: false, reason: String(e) })
    }
  }
  return installed
}

// ── storage paths ────────────────────────────────────────────────────────────
function dshHome() {
  return process.env.DSH_HOME || join(homedir(), '.dsh')
}
function dataDir() {
  return join(dshHome(), 'deus-mode')
}
function logFile() {
  return join(dataDir(), 'log.jsonl')
}
function presetsFile() {
  return join(dataDir(), 'presets.json')
}

function ensureDir() {
  mkdirSync(dataDir(), { recursive: true })
}

// ── v0.3: session preset 探测（未锚定引导的数据源）─────────────────────────
// session/event 流里 user/message 不带 agentPreset；权威来源是磁盘会话日志的
// SessionHeader（jsonl.zstd 第一帧第一行，session-persistence-jsonl 格式）。
// 读文件 → 找第二个 zstd 帧魔数切出第一帧 → 解压取 header.agentPreset。
// 60s 缓存（blank 会话可在首轮前 recompose preset，不能永久缓存）。
const ZSTD_MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd])
const presetCache = new Map() // sessionId -> { preset, ts }
function readSessionPreset(sessionId) {
  const hit = presetCache.get(sessionId)
  if (hit && Date.now() - hit.ts < 60_000) return hit.preset
  let preset = null
  try {
    const root = join(dshHome(), 'sessions')
    if (existsSync(root)) {
      for (const ws of readdirSync(root)) {
        const f = join(root, ws, sessionId, 'session.jsonl.zstd')
        if (!existsSync(f)) continue
        const buf = readFileSync(f)
        const second = buf.indexOf(ZSTD_MAGIC, 4)
        const firstFrame = second > 4 ? buf.subarray(0, second) : buf
        try {
          const line0 = zstdDecompressSync(firstFrame).toString('utf8').split('\n')[0]
          const header = JSON.parse(line0)
          if (header && header.type === 'session' && typeof header.agentPreset === 'string') preset = header.agentPreset
        } catch { /* 帧截断/格式异常 → preset 保持 null */ }
        break
      }
    }
  } catch { /* 磁盘问题 → null */ }
  presetCache.set(sessionId, { preset, ts: Date.now() })
  if (presetCache.size > 300) presetCache.delete(presetCache.keys().next().value)
  return preset
}

// ── preset library: built-ins until the user edits, then presets.json wins ──
function loadPresets() {
  try {
    if (existsSync(presetsFile())) {
      const list = JSON.parse(readFileSync(presetsFile(), 'utf8'))
      if (Array.isArray(list)) return list
    }
  } catch { /* fall through to built-ins */ }
  return BUILTIN_PRESETS.map((p) => ({ ...p, builtin: true }))
}

function savePresets(list) {
  ensureDir()
  const clean = list
    .filter((p) => p && typeof p.id === 'string' && p.id.trim() !== '')
    .map((p) => ({
      id: String(p.id).trim(),
      label_zh: String(p.label_zh || p.id),
      label_en: String(p.label_en || p.id),
      prompt: p.prompt === null || p.prompt === undefined ? null : String(p.prompt),
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    }))
  writeFileSync(presetsFile(), JSON.stringify(clean, null, 2))
  return clean
}

// ── experiment log ───────────────────────────────────────────────────────────
function appendLog(entry) {
  ensureDir()
  appendFileSync(logFile(), JSON.stringify(entry) + '\n')
}

function readLog(limit = 500) {
  try {
    if (!existsSync(logFile())) return []
    const lines = readFileSync(logFile(), 'utf8').split('\n').filter(Boolean)
    const out = []
    for (const line of lines.slice(-limit)) {
      try { out.push(JSON.parse(line)) } catch { /* skip corrupt line */ }
    }
    return out
  } catch {
    return []
  }
}

function statsFrom(entries) {
  const byMode = new Map()
  for (const e of entries) {
    const mode = e.prompt_mode || 'unknown'
    if (mode === 'bench') continue // v0.4: 实验台样本有独立的 A/B 报告，不混入神模统计

    if (!byMode.has(mode)) byMode.set(mode, { mode, n: 0, pure: 0, med: 0, god: 0, unknown: 0 })
    const row = byMode.get(mode)
    row.n += 1
    if (row[e.detected] !== undefined) row[e.detected] += 1
    else row.unknown += 1
  }
  const modes = [...byMode.values()].map((row) => ({
    ...row,
    godCI: wilson(row.god, row.n),
    medCI: wilson(row.med, row.n),
    pureCI: wilson(row.pure, row.n),
  }))
  const total = { mode: 'ALL', n: 0, pure: 0, med: 0, god: 0, unknown: 0 }
  for (const row of modes) {
    total.n += row.n; total.pure += row.pure; total.med += row.med; total.god += row.god; total.unknown += row.unknown
  }
  return { modes, total: { ...total, godCI: wilson(total.god, total.n) } }
}

function toCsv(entries) {
  const head = 'ts,sessionId,prompt_mode,prompt_text,detected,source,turn,first_sentence,model,bench_run,bench_variant'
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = entries.map((e) =>
    [e.ts, e.sessionId, e.prompt_mode, e.prompt_text, e.detected, e.source, e.turn, e.first_sentence, e.model, e.bench_run, e.bench_variant].map(esc).join(','))
  return [head, ...rows].join('\n') + '\n'
}

// ── v0.4 实验台：A/B 报告（指纹分布对比 + Wilson CI + 两比例 z 检验）────────
// 设计文档「纯噪音退路」转正：面板输入任意提示词变体 A/B，各跑 N 次真实会话
// 注入，这里把 log 里 prompt_mode='bench' 的样本按 bench_run/bench_variant
// 分组，输出每类的 Wilson 95% CI 与 A−B 差异检验。神模只是第一个被测假设。
const BENCH_CLASSES = ['god', 'med', 'pure', 'unknown']

export function benchReportFrom(entries, runId) {
  const bench = entries.filter((e) => e.prompt_mode === 'bench' && e.bench_run)
  const runMap = new Map()
  for (const e of bench) {
    let r = runMap.get(e.bench_run)
    if (!r) {
      r = { runId: e.bench_run, n: 0, firstTs: e.ts, lastTs: e.ts, variants: new Set() }
      runMap.set(e.bench_run, r)
    }
    r.n += 1
    if (e.ts < r.firstTs) r.firstTs = e.ts
    if (e.ts > r.lastTs) r.lastTs = e.ts
    if (e.bench_variant) r.variants.add(e.bench_variant)
  }
  const runs = [...runMap.values()]
    .map((r) => ({ runId: r.runId, n: r.n, firstTs: r.firstTs, lastTs: r.lastTs, variants: [...r.variants].sort() }))
    .sort((a, b) => (a.lastTs < b.lastTs ? 1 : -1))
  const picked = runId ? runs.find((r) => r.runId === runId) : runs[0]
  if (!picked) return { report: null, runs }
  const rows = bench.filter((e) => e.bench_run === picked.runId)
  const byVariant = {}
  for (const e of rows) {
    const v = String(e.bench_variant || '?')
    const g = (byVariant[v] ||= { variant: v, n: 0, counts: { god: 0, med: 0, pure: 0, unknown: 0 }, prompt: null })
    g.n += 1
    if (g.counts[e.detected] !== undefined) g.counts[e.detected] += 1
    else g.counts.unknown += 1
    if (!g.prompt && e.prompt_text) g.prompt = e.prompt_text
  }
  for (const g of Object.values(byVariant)) {
    g.classes = {}
    for (const c of BENCH_CLASSES) {
      g.classes[c] = { n: g.counts[c], ...wilson(g.counts[c], g.n) }
    }
  }
  const order = Object.keys(byVariant).sort()
  const comparison = []
  if (order.length >= 2) {
    const A = byVariant[order[0]]
    const B = byVariant[order[1]]
    for (const c of BENCH_CLASSES) {
      const t = twoPropZ(A.counts[c], A.n, B.counts[c], B.n)
      comparison.push({
        cls: c,
        a: A.classes[c],
        b: B.classes[c],
        delta: A.n && B.n ? A.counts[c] / A.n - B.counts[c] / B.n : null,
        z: t ? t.z : null,
        p: t ? t.p : null,
      })
    }
  }
  return {
    report: {
      runId: picked.runId,
      n: rows.length,
      variants: byVariant,
      order,
      comparison,
      startedAt: picked.firstTs,
      finishedAt: picked.lastTs,
    },
    runs,
  }
}

// ── version auto-detect (differentiator: no manual checking) ────────────────
function detectDshVersion() {
  if (process.env.DSH_VERSION) return process.env.DSH_VERSION
  const candidates = [
    '@deepseek-ai/dsh/package.json',
    '@dsh-ai/deepseek-cli/package.json', // published CLI name (verified 0.8.2)
    '@deepseek-ai/dsh-cli/package.json',
    '@deepseek-ai/dsh/apps/cli/package.json',
  ]
  for (const base of [import.meta.url, path.join(process.cwd(), 'noop.js')]) {
    try {
      const req = createRequire(base)
      for (const name of candidates) {
        try {
          const pkg = req(name)
          if (pkg && pkg.version) return String(pkg.version)
        } catch { /* next candidate */ }
      }
    } catch { /* next base */ }
  }
  // Filesystem fallback: walk up from likely entry points (process.argv[1] =
  // the CLI entry being executed — works for dev checkouts AND npx cache
  // installs; cwd as a secondary seed) looking for a dsh-named package.json.
  const seeds = [process.argv[1], process.cwd(), process.argv[0]].filter(Boolean)
  for (const seed of seeds) {
    try {
      let dir = fs.statSync(seed).isDirectory() ? seed : join(seed, '..')
      for (let i = 0; i < 8; i++) {
        for (const rel of ['apps/cli/package.json', 'package.json', '@deepseek-ai/dsh/package.json', '@dsh-ai/deepseek-cli/package.json']) {
          try {
            const pkg = JSON.parse(fs.readFileSync(join(dir, rel), 'utf8'))
            if (pkg && pkg.version && /dsh|deepseek/i.test(String(pkg.name || ''))) return String(pkg.version)
          } catch { /* keep walking */ }
        }
        const up = join(dir, '..')
        if (up === dir) break
        dir = up
      }
    } catch { /* next seed */ }
  }
  return 'unknown'
}

/** Concatenated visible text from content blocks (structural, no type dep). */
function textOf(content) {
  let out = ''
  if (!Array.isArray(content)) return out
  for (const block of content) {
    if (block && typeof block === 'object' && block.type === 'text' && typeof block.text === 'string') out += block.text
  }
  return out
}

export function apply(ctx) {
  // v0.2: 安装锚定 agent presets 到用户 preset 根（幂等，官方 agent-presets 插件实时发现）
  const installedPresets = installAgentPresets(ctx.logger)

  // Pending trigger marks: sessionId -> { mode, prompt_text, ts, auto }
  const pending = new Map()
  // v0.4 实验台：待配对的 bench 样本队列 [{ runId, variant, prompt, ts }]
  // （文本精确匹配配对，见 /deus/bench/mark 路由注释）
  const benchQueue = []
  const BENCH_QUEUE_TTL = 10 * 60 * 1000
  // Chunk accumulation while a trigger is pending: sessionId -> { turn, step, reasoning, text }
  // （实测校准：指纹在 reasoning-delta 流里，text-delta 兜底；见 detectMode 注释）
  const buffers = new Map()

  // ── v0.2 锚定维持：逐轮监控 deus/minimal preset 会话的指纹漂移 ─────────────
  // 实测依据（§9）：构成恒定不代表锚定恒定——V2 对照组全程极简也有 44-89% 的
  // 逐轮摆动，且一旦漂移到中版（工具补齐或轮次噪声），竞品 promoteOn 场景 0/6
  // 维持。所以我们逐轮判定、漂移即标记，客户端据此提示/自动重锚。
  // anchored: sessionId -> { preset, turns: [{turn, fp}], lastFp, drifted, skipTurn, updatedAt }
  const anchored = new Map()
  // 逐轮缓冲: sessionId -> { turn, reasoning, text }
  const watchBuf = new Map()
  const ANCHOR_PRESET_RE = /^(deus-|minimal)/

  function markAnchored(sessionId, preset, force = false) {
    if (!sessionId || !preset || (!force && !ANCHOR_PRESET_RE.test(preset))) return
    const cur = anchored.get(sessionId)
    if (cur) { cur.preset = preset; cur.updatedAt = new Date().toISOString() }
    else anchored.set(sessionId, { preset, turns: [], lastFp: null, drifted: false, skipTurn: -1, updatedAt: new Date().toISOString() })
  }

  function finalizeWatch(sessionId, turnNo, buf) {
    const st = anchored.get(sessionId)
    if (!st || !buf || turnNo === st.skipTurn) return
    // 注入轮由 pending 流程判定并写日志；pending 未结案期间抑制 watch（避免同轮双记）
    if (pending.has(sessionId)) return
    const source = buf.reasoning.trim() !== '' ? 'reasoning' : 'text'
    const text = source === 'reasoning' ? buf.reasoning : buf.text
    if (text.trim() === '') return
    if (st.turns.some((t) => t.turn === turnNo)) return // 已判定过这一轮
    const fp = detectMode(text, source)
    st.lastFp = fp
    st.drifted = fp !== 'god'
    st.turns.push({ turn: turnNo, fp, ts: new Date().toISOString() })
    if (st.turns.length > 50) st.turns = st.turns.slice(-50)
    st.updatedAt = new Date().toISOString()
    appendLog({
      ts: new Date().toISOString(),
      sessionId,
      prompt_mode: 'watch:' + st.preset,
      detected: fp,
      source,
      first_sentence: firstSentenceOf(text),
      turn: turnNo,
    })
  }

  function finalize(sessionId, fallbackText) {
    const mark = pending.get(sessionId)
    if (!mark) return
    const buf = buffers.get(sessionId)
    const reasoning = (buf && buf.reasoning) || ''
    const text = (buf && buf.text) || fallbackText || ''
    if (reasoning.trim() === '' && text.trim() === '' && !fallbackText) return // keep waiting for real content
    const judgedTurn = typeof mark.turn === 'number' ? mark.turn : (buf && typeof buf.turn === 'number' ? buf.turn : undefined)
    pending.delete(sessionId)
    buffers.delete(sessionId)
    // 指纹优先取推理流（实测校准：指纹在 reasoning-delta 里），可见文本兜底
    const source = reasoning.trim() !== '' ? 'reasoning' : 'text'
    const classifyOn = source === 'reasoning' ? reasoning : text
    const fp = detectMode(classifyOn, source)
    // v0.2: 注入轮的判定并入锚定状态（turns 去重即阻止 watch 同轮双记；
    // 此前仅靠 skipTurn/pending 抑制，user/message 无可靠 turn 号时会漏）
    const st = anchored.get(sessionId)
    if (st && typeof judgedTurn === 'number' && !st.turns.some((t) => t.turn === judgedTurn)) {
      st.lastFp = fp
      st.drifted = fp !== 'god'
      st.turns.push({ turn: judgedTurn, fp, ts: new Date().toISOString() })
      if (st.turns.length > 50) st.turns = st.turns.slice(-50)
      st.updatedAt = new Date().toISOString()
    }
    appendLog({
      ts: new Date().toISOString(),
      sessionId,
      prompt_mode: mark.mode,
      prompt_text: mark.prompt_text,
      detected: fp,
      source,
      first_sentence: firstSentenceOf(classifyOn),
      model: mark.model || undefined,
      // v0.4 实验台：A/B 样本归属（仅 bench 标记的注入轮带这两个字段）
      bench_run: mark.benchRun || undefined,
      bench_variant: mark.benchVariant || undefined,
    })
  }

  ctx.on('session/event', (session, event) => {
    const sessionId = String(session.id)

    // v0.2 锚定监控的会话归属判定：preset 选择事件 / 会话自带 preset / 注入命中
    if (event.type === 'agent-preset/selected') {
      markAnchored(sessionId, event.data && (event.data.agentPreset || event.data.preset || event.data.id))
    }
    if (session && typeof session.agentPreset === 'string' && ANCHOR_PRESET_RE.test(session.agentPreset)) {
      markAnchored(sessionId, session.agentPreset)
    }

    // A user message can BE the trigger: exact-match against the preset
    // library covers the conservative "copy + paste + enter" path (档 A)
    // without any explicit marking from the panel.
    if (event.type === 'user/message') {
      const text = textOf(event.data && event.data.content).trim()
      if (text !== '' && !pending.has(sessionId)) {
        // v0.4 实验台：bench 队列优先于 preset exact-match（显式实验意图优先）
        const now = Date.now()
        const bi = benchQueue.findIndex((q) => q.prompt === text && now - q.ts < BENCH_QUEUE_TTL)
        if (bi >= 0) {
          const q = benchQueue.splice(bi, 1)[0]
          buffers.delete(sessionId)
          pending.set(sessionId, { mode: 'bench', prompt_text: q.prompt, benchRun: q.runId, benchVariant: q.variant, ts: now, auto: false })
          return
        }
        const hit = loadPresets().find((p) => p.prompt !== null && p.prompt.trim() === text)
        if (hit) {
          buffers.delete(sessionId) // 防止上轮残留 buffer 污染注入轮判定
          pending.set(sessionId, { mode: hit.id, prompt_text: hit.prompt, ts: Date.now(), auto: true })
          // 注入命中的会话纳入锚定监控；注入轮由 pending 流程判定，watch 跳过该轮避免双记
          markAnchored(sessionId, 'inject', true)
          const st = anchored.get(sessionId)
          if (st && typeof event.data?.turn === 'number') st.skipTurn = event.data.turn
        }
      }
      return
    }

    // v0.2: 锚定会话的逐轮判定（与 pending 流程并行；pending 只覆盖注入轮）
    if (anchored.has(sessionId) && (event.type === 'assistant/chunk' || event.type === 'assistant/message')) {
      if (event.type === 'assistant/chunk') {
        const chunk = event.data && event.data.chunk
        const isReasoning = chunk && chunk.type === 'reasoning-delta' && typeof chunk.text === 'string'
        const isText = chunk && chunk.type === 'text-delta' && typeof chunk.text === 'string'
        if (isReasoning || isText) {
          const cur = watchBuf.get(sessionId) || { turn: event.data.turn, reasoning: '', text: '' }
          if (cur.turn !== event.data.turn) {
            finalizeWatch(sessionId, cur.turn, cur) // 新一轮开始 → 结算上一轮
            cur.turn = event.data.turn; cur.reasoning = ''; cur.text = ''
          }
          // 每轮只采第一个 step 的起手（指纹在开头）
          if (cur.reasoning.length < DETECT_WINDOW * 2 && cur.text.length < DETECT_WINDOW * 2) {
            if (isReasoning) cur.reasoning += chunk.text
            else cur.text += chunk.text
          }
          watchBuf.set(sessionId, cur)
          const head = cur.reasoning !== '' ? cur.reasoning : cur.text
          if ((head.length >= 8 && /[.!?\n。！？]/.test(head)) || head.length >= DETECT_WINDOW) finalizeWatch(sessionId, cur.turn, cur)
        }
      } else {
        const parts = event.data && event.data.message && event.data.message.content
        let reasoning = ''
        if (Array.isArray(parts)) {
          for (const p of parts) {
            if (p && typeof p === 'object' && p.type === 'reasoning' && typeof p.text === 'string') reasoning += p.text
          }
        }
        const cur = watchBuf.get(sessionId)
        if (cur && reasoning !== '' && cur.reasoning === '') cur.reasoning = reasoning
        if (cur) finalizeWatch(sessionId, cur.turn, cur)
      }
    }

    if (!pending.has(sessionId)) return

    if (event.type === 'assistant/chunk') {
      const chunk = event.data && event.data.chunk
      const isReasoning = chunk && chunk.type === 'reasoning-delta' && typeof chunk.text === 'string'
      const isText = chunk && chunk.type === 'text-delta' && typeof chunk.text === 'string'
      if (isReasoning || isText) {
        const key = sessionId
        const entry = pending.get(sessionId)
        if (entry && entry.turn === undefined) entry.turn = event.data.turn // 记录注入轮号，watch 据此去重
        const cur = buffers.get(key) || { turn: event.data.turn, step: event.data.step, reasoning: '', text: '' }
        if (cur.turn !== event.data.turn || cur.step !== event.data.step) {
          finalize(sessionId) // 轮边界先结算旧轮（此前静默清空导致判定延迟到后续轮）
          cur.turn = event.data.turn; cur.step = event.data.step; cur.reasoning = ''; cur.text = ''
        }
        if (isReasoning) cur.reasoning += chunk.text
        else cur.text += chunk.text
        buffers.set(key, cur)
        // Early finalize once the opener is decidable. 指纹主要在推理流
        // （实测：reasoning-delta 远多于 text-delta，"The user…/We need…" 起手都在推理里），
        // 推理流优先判定；可见文本兜底。
        const head = cur.reasoning !== '' ? cur.reasoning : cur.text
        if ((head.length >= 8 && /[.!?\n]/.test(head)) || head.length >= DETECT_WINDOW) finalize(sessionId)
      }
      return
    }

    if (event.type === 'assistant/message') {
      // 完整消息里也可能带 reasoning block，能拿到就优先用它
      const parts = event.data && event.data.message && event.data.message.content
      let reasoning = ''
      if (Array.isArray(parts)) {
        for (const p of parts) {
          if (p && typeof p === 'object' && p.type === 'reasoning' && typeof p.text === 'string') reasoning += p.text
        }
      }
      if (reasoning !== '') {
        const cur = buffers.get(sessionId) || { reasoning: '', text: '' }
        if (cur.reasoning === '') { cur.reasoning = reasoning; buffers.set(sessionId, cur) }
      }
      finalize(sessionId, textOf(parts))
      return
    }

    if (event.type === 'turn/end') {
      const wb = watchBuf.get(sessionId)
      if (wb) finalizeWatch(sessionId, wb.turn, wb)
      finalize(sessionId, '')
    }
  })

  ctx.effect(() => {
    const text = (code, body, gz, mime) => (req, res) => {
      const ae = String(req.headers['accept-encoding'] || '')
      const useGz = gz && /\bgzip\b/.test(ae)
      res.writeHead(code, { 'content-type': mime, ...(useGz ? { 'content-encoding': 'gzip' } : {}), 'content-length': useGz ? gz.length : body.length })
      res.end(useGz ? gz : body)
    }
    const json = (body, code = 200) => {
      const buf = Buffer.from(JSON.stringify(body), 'utf8')
      return text(code, buf, gzipSync(buf), 'application/json; charset=utf-8')
    }
    const readBody = (req, cb) => {
      let raw = ''
      req.on('data', (c) => { raw += c })
      req.on('end', () => {
        try { cb(JSON.parse(raw || '{}')) } catch { cb({}) }
      })
    }

    const disposers = [
      ctx.webServer.register({ kind: 'exact', path: '/deus/presets', handler: (req, res) => {
        if (req.method === 'POST') {
          readBody(req, (body) => {
            const list = Array.isArray(body.presets) ? savePresets(body.presets) : null
            json(list ? { ok: true, presets: list } : { ok: false, error: 'missing presets' }, list ? 200 : 400)(req, res)
          })
          return
        }
        json({ presets: loadPresets(), customized: existsSync(presetsFile()) })(req, res)
      } }),
      ctx.webServer.register({ kind: 'exact', path: '/deus/presets/reset', handler: (req, res) => {
        try {
          if (existsSync(presetsFile())) writeFileSync(presetsFile(), JSON.stringify(BUILTIN_PRESETS, null, 2))
        } catch { /* ignore */ }
        json({ ok: true, presets: loadPresets() })(req, res)
      } }),
      ctx.webServer.register({ kind: 'exact', path: '/deus/trigger', handler: (req, res) => {
        readBody(req, (body) => {
          const sessionId = String(body.sessionId || '')
          const mode = String(body.mode || '')
          // v0.2: mode=reanchor 是漂移重锚的显式标记（提示文本由 client 随 body 带上）
          if (mode === 'reanchor' && sessionId) {
            buffers.delete(sessionId)
            pending.set(sessionId, { mode: 'reanchor', prompt_text: String(body.prompt || ''), ts: Date.now(), auto: false })
            markAnchored(sessionId, 'inject', true)
            json({ ok: true })(req, res)
            return
          }
          const preset = loadPresets().find((p) => p.id === mode)
          if (!sessionId || !preset) {
            json({ ok: false, error: 'missing sessionId or unknown mode' }, 400)(req, res)
            return
          }
          buffers.delete(sessionId)
          pending.set(sessionId, { mode, prompt_text: preset.prompt, ts: Date.now(), auto: false })
          markAnchored(sessionId, 'inject', true) // 注入会话纳入逐轮锚定监控
          json({ ok: true })(req, res)
        })
      } }),
      ctx.webServer.register({ kind: 'exact', path: '/deus/log', handler: (req, res) => {
        if (req.method === 'DELETE') {
          try { writeFileSync(logFile(), '') } catch { /* ignore */ }
          json({ ok: true })(req, res)
          return
        }
        json({ entries: readLog(500).slice(-100).reverse() })(req, res)
      } }),
      ctx.webServer.register({ kind: 'exact', path: '/deus/log.csv', handler: (req, res) => {
        const buf = Buffer.from(toCsv(readLog(10000)), 'utf8')
        text(200, buf, gzipSync(buf), 'text/csv; charset=utf-8')(req, res)
      } }),
      ctx.webServer.register({ kind: 'exact', path: '/deus/stats', handler: (req, res) => {
        json(statsFrom(readLog(10000)))(req, res)
      } }),
      // v0.3: 当前会话的 agent preset（dock 未锚定引导用；来源=会话日志头行）
      ctx.webServer.register({ kind: 'exact', path: '/deus/session-preset', handler: (req, res) => {
        const u = new URL(String(req.url || ''), 'http://localhost')
        const sessionId = String(u.searchParams.get('sessionId') || '')
        if (!sessionId) { json({ ok: false, error: 'missing sessionId' }, 400)(req, res); return }
        json({ sessionId, preset: readSessionPreset(sessionId) })(req, res)
      } }),
      // v0.4 实验台：A/B 变体注入标记。与 /deus/trigger 的 sessionId 预标记不同，
      // 这里走「提示词文本队列」配对（与档 A 的 exact-match 同思路）：客户端每次
      // 试验前把 (runId, variant, prompt) 入队，user/message 到达时按文本精确
      // 匹配出队并标记该会话注入轮。这样 bench 不依赖「新会话 id 何时出现」
      // 的时序——新建空白会话在首条消息前可能没有稳定 id。
      ctx.webServer.register({ kind: 'exact', path: '/deus/bench/mark', handler: (req, res) => {
        readBody(req, (body) => {
          const runId = String(body.runId || '').slice(0, 64)
          const variant = String(body.variant || '').slice(0, 16)
          const prompt = String(body.prompt || '').slice(0, 4000)
          if (!runId || !variant || !prompt) {
            json({ ok: false, error: 'missing runId / variant / prompt' }, 400)(req, res)
            return
          }
          benchQueue.push({ runId, variant, prompt, ts: Date.now() })
          if (benchQueue.length > 200) benchQueue.splice(0, benchQueue.length - 200)
          json({ ok: true, queued: benchQueue.length })(req, res)
        })
      } }),
      // 中止/清理：丢弃某个 run（或全部）未消耗的队列项
      ctx.webServer.register({ kind: 'exact', path: '/deus/bench/clear', handler: (req, res) => {
        readBody(req, (body) => {
          const runId = String(body.runId || '')
          const before = benchQueue.length
          for (let i = benchQueue.length - 1; i >= 0; i--) {
            if (!runId || benchQueue[i].runId === runId) benchQueue.splice(i, 1)
          }
          json({ ok: true, dropped: before - benchQueue.length })(req, res)
        })
      } }),
      // v0.4 实验台：A/B 报告（?runId= 指定，缺省取最近一次 run；附全部 run 列表）
      ctx.webServer.register({ kind: 'exact', path: '/deus/bench/report', handler: (req, res) => {
        const u = new URL(String(req.url || ''), 'http://localhost')
        const runId = String(u.searchParams.get('runId') || '')
        json({ ok: true, ...benchReportFrom(readLog(10000), runId || undefined) })(req, res)
      } }),
      ctx.webServer.register({ kind: 'exact', path: '/deus/version', handler: (req, res) => {
        let dsh = 'unknown'
        try { dsh = detectDshVersion() } catch (e) { ctx.logger.warn('[plugin-deus] version detect failed:', e) }
        json({ plugin: PLUGIN_VERSION, dsh, logPath: logFile() })(req, res)
      } }),
      // v0.2 锚定维持状态: 安装的 agent presets + 受监控会话的逐轮指纹/漂移状态
      ctx.webServer.register({ kind: 'exact', path: '/deus/anchor', handler: (req, res) => {
        const sessions = [...anchored.entries()].map(([sessionId, st]) => ({
          sessionId,
          preset: st.preset,
          total: st.turns.length,
          god: st.turns.filter((t) => t.fp === 'god').length,
          lastFp: st.lastFp,
          drifted: st.drifted,
          turns: st.turns.slice(-10),
          updatedAt: st.updatedAt,
        }))
        json({ agentPresets: installedPresets, sessions })(req, res)
      } }),
    ]
    return () => { for (const d of disposers) d() }
  }, 'deus-mode: routes')
}
