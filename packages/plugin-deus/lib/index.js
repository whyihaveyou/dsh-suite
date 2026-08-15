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
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { gzipSync } from 'node:zlib'

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
  if (source === 'reasoning' && /^user (wants|asks|is asking|said)\b/.test(head)) return 'med'
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
  const head = 'ts,sessionId,prompt_mode,prompt_text,detected,source,first_sentence,model'
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = entries.map((e) =>
    [e.ts, e.sessionId, e.prompt_mode, e.prompt_text, e.detected, e.source, e.first_sentence, e.model].map(esc).join(','))
  return [head, ...rows].join('\n') + '\n'
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
  // Pending trigger marks: sessionId -> { mode, prompt_text, ts, auto }
  const pending = new Map()
  // Chunk accumulation while a trigger is pending: sessionId -> { turn, step, reasoning, text }
  // （实测校准：指纹在 reasoning-delta 流里，text-delta 兜底；见 detectMode 注释）
  const buffers = new Map()

  function finalize(sessionId, fallbackText) {
    const mark = pending.get(sessionId)
    if (!mark) return
    const buf = buffers.get(sessionId)
    const reasoning = (buf && buf.reasoning) || ''
    const text = (buf && buf.text) || fallbackText || ''
    if (reasoning.trim() === '' && text.trim() === '' && !fallbackText) return // keep waiting for real content
    pending.delete(sessionId)
    buffers.delete(sessionId)
    // 指纹优先取推理流（实测校准：指纹在 reasoning-delta 里），可见文本兜底
    const source = reasoning.trim() !== '' ? 'reasoning' : 'text'
    const classifyOn = source === 'reasoning' ? reasoning : text
    appendLog({
      ts: new Date().toISOString(),
      sessionId,
      prompt_mode: mark.mode,
      prompt_text: mark.prompt_text,
      detected: detectMode(classifyOn, source),
      source,
      first_sentence: firstSentenceOf(classifyOn),
      model: mark.model || undefined,
    })
  }

  ctx.on('session/event', (session, event) => {
    const sessionId = String(session.id)

    // A user message can BE the trigger: exact-match against the preset
    // library covers the conservative "copy + paste + enter" path (档 A)
    // without any explicit marking from the panel.
    if (event.type === 'user/message') {
      const text = textOf(event.data && event.data.content).trim()
      if (text !== '' && !pending.has(sessionId)) {
        const hit = loadPresets().find((p) => p.prompt !== null && p.prompt.trim() === text)
        if (hit) {
          pending.set(sessionId, { mode: hit.id, prompt_text: hit.prompt, ts: Date.now(), auto: true })
        }
      }
      return
    }

    if (!pending.has(sessionId)) return

    if (event.type === 'assistant/chunk') {
      const chunk = event.data && event.data.chunk
      const isReasoning = chunk && chunk.type === 'reasoning-delta' && typeof chunk.text === 'string'
      const isText = chunk && chunk.type === 'text-delta' && typeof chunk.text === 'string'
      if (isReasoning || isText) {
        const key = sessionId
        const cur = buffers.get(key) || { turn: event.data.turn, step: event.data.step, reasoning: '', text: '' }
        if (cur.turn !== event.data.turn || cur.step !== event.data.step) {
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
          const preset = loadPresets().find((p) => p.id === mode)
          if (!sessionId || !preset) {
            json({ ok: false, error: 'missing sessionId or unknown mode' }, 400)(req, res)
            return
          }
          pending.set(sessionId, { mode, prompt_text: preset.prompt, ts: Date.now(), auto: false })
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
      ctx.webServer.register({ kind: 'exact', path: '/deus/version', handler: (req, res) => {
        let dsh = 'unknown'
        try { dsh = detectDshVersion() } catch (e) { ctx.logger.warn('[plugin-deus] version detect failed:', e) }
        json({ plugin: '0.1.0', dsh, logPath: logFile() })(req, res)
      } }),
    ]
    return () => { for (const d of disposers) d() }
  }, 'deus-mode: routes')
}
