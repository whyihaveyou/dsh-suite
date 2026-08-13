import { spawn } from 'node:child_process'
import type { Context } from '@deepseek-ai/cordis'
import Schema from '@deepseek-ai/schemastery'
import type { Session, SessionEvent } from '@deepseek-ai/dsh-session'

// `approval/asked` is a merge-extensible SessionEvent emitted by
// `@deepseek-ai/dsh-user-approval`. Declare its shape here (the documented
// extension point) so this plugin can type-check against it without a hard
// dependency on the approval package's declaration merging.
declare module '@deepseek-ai/dsh-session/types' {
  interface SessionEventMap {
    /** An approval question was put to the answerer chain — log-only audit. */
    'approval/asked': {
      id: string
      toolName: string
      callId?: string
      reason?: string
    }
  }
}

export const name = 'plugin-notify'

// Dependency on the session service: `session/event` only exists once a
// SessionStore is composed, and this plugin consumes the durable firehose.
export const inject = ['sessions']

export interface Config {
  webhooks?: {
    feishu?: string
    wecom?: string
    dingtalk?: string
    slack?: string
    discord?: string
    custom?: string
  }
  events?: string[]
  local?: boolean
  timeoutMs?: number
}

export const Config = Schema.object({
  webhooks: Schema.object({
    feishu: Schema.string().description('飞书自定义机器人 webhook URL（…/bot/v2/hook/…）'),
    wecom: Schema.string().description('企业微信群机器人 webhook URL（…/cgi-bin/webhook/send?key=…）'),
    dingtalk: Schema.string().description('钉钉群机器人 webhook URL（…/robot/send?access_token=…）'),
    slack: Schema.string().description('Slack Incoming Webhook URL'),
    discord: Schema.string().description('Discord Webhook URL'),
    custom: Schema.string().description('自定义通用 webhook URL（POST JSON，含 text + 元数据）'),
  }).description('各 IM 通道的 webhook 地址，留空即不发送'),
  events: Schema.array(Schema.string())
    .description('触发通知的事件：task_done（回合完成）/ error（出错） / approval_requested（待审批）'),
  local: Schema.boolean().default(true).description('是否同时发本机系统通知（macOS osascript）'),
  timeoutMs: Schema.number().default(5000).description('单次 webhook 请求超时（毫秒）'),
})

type NotifyKind = 'task_done' | 'error' | 'approval_requested'

const DEFAULT_EVENTS: readonly NotifyKind[] = ['task_done', 'error', 'approval_requested']

/** Per-session last `turn/start` epoch ms, for turn-duration reporting. */
const turnStarts = new Map<string, number>()

interface Notification {
  kind: NotifyKind
  title: string
  sessionId: string
  summary?: string
  reason?: string
  durationMs?: number
}

export function apply(ctx: Context, config: Config = {}) {
  const cfg = config ?? {}
  const events = new Set<NotifyKind>(normalizeEvents(cfg.events))
  const local = cfg.local ?? true
  const timeoutMs = cfg.timeoutMs ?? 5000
  const webhooks = cfg.webhooks ?? {}

  ctx.on('session/event', (session: Session, event: SessionEvent) => {
    if (event.type === 'turn/start') {
      turnStarts.set(String(session.id), Date.now())
      return
    }

    if (event.type === 'turn/end') {
      const reason = event.data.reason
      const kind: NotifyKind = reason.kind === 'completed' ? 'task_done' : 'error'
      if (!events.has(kind)) return
      const started = turnStarts.get(String(session.id))
      turnStarts.delete(String(session.id))
      send({
        kind,
        title: sessionTitle(session),
        sessionId: String(session.id),
        summary: summarizeTurn(session, event.data.turn),
        reason: reasonLabel(reason),
        durationMs: started === undefined ? undefined : Date.now() - started,
      }, webhooks, timeoutMs, local)
      return
    }

    if (event.type === 'approval/asked') {
      if (!events.has('approval_requested')) return
      const data = event.data
      send({
        kind: 'approval_requested',
        title: sessionTitle(session),
        sessionId: String(session.id),
        summary: `等待审批：工具 ${data.toolName}${data.reason ? `（${data.reason}）` : ''}`,
      }, webhooks, timeoutMs, local)
    }
  })
}

function normalizeEvents(configured: string[] | undefined): NotifyKind[] {
  if (!configured || configured.length === 0) return [...DEFAULT_EVENTS]
  const known: NotifyKind[] = ['task_done', 'error', 'approval_requested']
  return known.filter(kind => configured.includes(kind))
}

function send(n: Notification, webhooks: NonNullable<Config['webhooks']>, timeoutMs: number, local: boolean): void {
  const text = renderText(n)
  const signal = AbortSignal.timeout(timeoutMs)
  const channels = Object.entries(webhooks)
    .filter(([, url]) => typeof url === 'string' && url.length > 0)
    .map(([name]) => name)
  console.log(
    `[plugin-notify] ${n.kind} · ${n.title} · 会话 ${n.sessionId} · 通道 ${channels.join(',') || '无'} · 本机 ${local}`,
  )

  const post = (url: string, body: unknown): void => {
    // Emission is an irreversible side effect: fire-and-forget, never retry,
    // never block the agent loop (design principle 9 — compensate, don't block).
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    }).catch(error => {
      console.warn(`[plugin-notify] webhook POST failed (${url.slice(0, 64)}…): ${String(error)}`)
    })
  }

  if (webhooks.feishu) post(webhooks.feishu, { msg_type: 'text', content: { text } })
  if (webhooks.wecom) post(webhooks.wecom, { msgtype: 'text', text: { content: text } })
  if (webhooks.dingtalk) post(webhooks.dingtalk, { msgtype: 'text', text: { content: text } })
  if (webhooks.slack) post(webhooks.slack, { text })
  if (webhooks.discord) post(webhooks.discord, { content: text })
  if (webhooks.custom) {
    post(webhooks.custom, {
      text,
      kind: n.kind,
      title: n.title,
      sessionId: n.sessionId,
      durationMs: n.durationMs,
      time: new Date().toISOString(),
    })
  }

  if (local) notifyLocal(n.kind === 'task_done' ? '✅ 任务完成' : n.kind === 'error' ? '⚠️ 运行出错' : '⏸️ 等待审批', text)
}

function renderText(n: Notification): string {
  const kindLabel = n.kind === 'task_done' ? '任务完成' : n.kind === 'error' ? '运行出错' : '等待审批'
  const lines = [`【${kindLabel}】${n.title}`]
  if (n.summary) lines.push(`摘要：${n.summary}`)
  if (n.reason) lines.push(`原因：${n.reason}`)
  if (n.durationMs !== undefined) lines.push(`耗时：${formatDuration(n.durationMs)}`)
  lines.push(`会话：${n.sessionId}`)
  return lines.join('\n')
}

function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000)
  if (seconds < 60) return `${seconds} 秒`
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return rest === 0 ? `${minutes} 分钟` : `${minutes} 分 ${rest} 秒`
}

function reasonLabel(reason: { kind: string }): string {
  switch (reason.kind) {
    case 'completed': return '完成'
    case 'error': return '出错'
    case 'aborted': return '已中止'
    case 'blocked': return '被阻断'
    case 'max-tokens': return '达到最大 token'
    case 'interrupted': return '中断'
    default: return reason.kind
  }
}

/** Concatenated visible text from a list of content blocks (structural, no type dep). */
function textOf(content: readonly unknown[]): string {
  let out = ''
  for (const block of content) {
    if (typeof block === 'object' && block !== null && (block as { type?: unknown }).type === 'text') {
      const text = (block as { text?: unknown }).text
      if (typeof text === 'string') out += text
    }
  }
  return out
}

/** A short human title for a session: the first user message, else the id. */
function sessionTitle(session: Session): string {
  for (const event of session.events) {
    if (event.type === 'user/message') {
      const text = textOf(event.data.content).replace(/\s+/g, ' ').trim()
      if (text) return text.length > 60 ? `${text.slice(0, 60)}…` : text
    }
  }
  return String(session.id)
}

/** One-line summary of a finished turn: last assistant text + tool-call count. */
function summarizeTurn(session: Session, turn: number): string {
  let toolCalls = 0
  let lastText = ''
  for (const event of session.events) {
    if (event.type === 'tool/call' && event.data.turn === turn) toolCalls += 1
    if (event.type === 'assistant/message' && event.data.turn === turn) {
      const text = textOf(event.data.message.content)
      if (text) lastText = text
    }
  }
  const parts: string[] = []
  if (lastText) {
    const trimmed = lastText.replace(/\s+/g, ' ').trim()
    parts.push(trimmed.length > 120 ? `${trimmed.slice(0, 120)}…` : trimmed)
  }
  if (toolCalls > 0) parts.push(`调用了 ${toolCalls} 次工具`)
  return parts.join('；') || '（无文本输出）'
}

/** Best-effort macOS notification; a no-op elsewhere. */
function notifyLocal(title: string, text: string): void {
  if (process.platform !== 'darwin') return
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const script = `display notification "${esc(text)}" with title "${esc(title)}"`
  spawn('osascript', ['-e', script], { stdio: 'ignore' })
    .on('error', () => {})
    .unref()
}
