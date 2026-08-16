import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { SessionId, type Session, type SessionEvent } from '@deepseek-ai/dsh-session'

export const name = 'plugin-session-export'

// `tools` for the registry seam, `sessions` for the durable session store.
export const inject = ['tools', 'sessions']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'export_session',
    description:
      'Export the current session (or all live sessions) as a human-readable Markdown or HTML file, ' +
      'grouped by trajectory source: system prompt, reasoning (thinking), tool calls, and subagent delegations. ' +
      'Unlike the built-in raw JSONL exporter, this produces prose you can paste into a doc or report.',
    parameters: {
      format: {
        type: 'string',
        enum: ['markdown', 'html'],
        description: "Output format. Default 'markdown'.",
      },
      path: {
        type: 'string',
        description: 'Output directory, or an exact file path ending in .md/.html. Default: the session workspace (cwd).',
      },
      sessionId: {
        type: 'string',
        description: 'Session id to export. Default: the current session.',
      },
      all: {
        type: 'boolean',
        description: 'Export every live session (batch) instead of a single one.',
      },
      includeToolDetails: {
        type: 'boolean',
        description: "Include tool-call arguments and results in the export. When false, only the tool name is kept (cleaner share). Default true.",
      },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          format: { type: 'string', description: 'Format used.' },
          count: { type: 'integer', description: 'Number of files written.' },
          files: { type: 'array', items: { type: 'string' }, description: 'Absolute paths written.' },
        },
        additionalProperties: false,
      },
      render: (_args, value) => [{
        type: 'text',
        text: `导出完成：${value.count} 个会话（${value.format}）\n${(value.files ?? []).join('\n')}`,
      }],
    },
    async execute(args, exec) {
      const format = (args.format ?? 'markdown') as 'markdown' | 'html'
      const includeToolDetails = args.includeToolDetails !== false
      const store = ctx.sessions

      let sessions: Session[]
      if (args.all) {
        sessions = store.list()
      } else if (args.sessionId) {
        const found = store.get(SessionId(args.sessionId))
        sessions = found ? [found] : []
      } else {
        const current = exec.agent?.session
        const listed = store.list()
        if (current) sessions = [current]
        else if (listed.length > 0) sessions = [listed[listed.length - 1]]
        else sessions = []
      }
      if (sessions.length === 0) {
        throw new Error('export_session: 没有可导出的会话（无 live session 且未指定 sessionId）')
      }

      const files: string[] = []
      for (const session of sessions) {
        const content = renderSession(session, format, { includeToolDetails })
        const file = outputPath(args.path, session, format, args.all === true)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, content, 'utf8')
        files.push(file)
      }
      return { format, count: files.length, files }
    },
  }))

  // Self-check (spike-style): prove the tool landed in the registry.
  console.log(
    `[plugin-session-export] registered "export_session" — listed=${ctx.tools.get('export_session') !== undefined}`,
  )
}

// ---------------------------------------------------------------------------
// Rendering model: walk the append-only log once, project into a small section
// list, then render Markdown or HTML from the same list (single source of truth).
// ---------------------------------------------------------------------------

type Section =
  | { kind: 'turn'; turn: number }
  | { kind: 'user'; text: string }
  | { kind: 'assistant'; text: string; reasoning: string[] }
  | { kind: 'tool'; name: string; args: string; result: string; isError: boolean; isSubagent: boolean }
  | { kind: 'todo'; todos: string[] }

interface Meta {
  title: string
  sessionId: string
  createdAt: string
  cwd?: string
  origin: 'main' | 'subagent'
  delegationDepth?: number
  agentPreset?: string
  parentSession?: string
  model?: string
  systemPrompt: string
  usage: { input: number; output: number; reasoning: number }
}

export interface RenderOptions {
  /** Include tool-call arguments/results. Default true. */
  includeToolDetails?: boolean
}

export function renderSession(session: Session, format: 'markdown' | 'html', opts?: RenderOptions): string {
  const meta = buildMeta(session)
  const sections = buildSections(session)
  const includeToolDetails = opts?.includeToolDetails !== false
  return format === 'html' ? renderHtml(meta, sections, includeToolDetails) : renderMarkdown(meta, sections, includeToolDetails)
}

function buildMeta(session: Session): Meta {
  const header = session.header
  let systemPrompt = ''
  let model: string | undefined
  for (const event of session.events) {
    if (event.type === 'request/header' && !systemPrompt && event.data.header.system) {
      systemPrompt = event.data.header.system
    }
    if (event.type === 'request/context') {
      model = `${event.data.provider}/${event.data.model}`
    }
  }
  const usage = sumUsage(session.events)
  return {
    title: sessionTitle(session),
    sessionId: String(session.id),
    createdAt: new Date(header.createdAt).toISOString(),
    cwd: header.cwd,
    origin: header.origin === 'subagent' ? 'subagent' : 'main',
    delegationDepth: header.delegationDepth,
    agentPreset: header.agentPreset,
    parentSession: header.parentSession === undefined ? undefined : String(header.parentSession),
    model,
    systemPrompt,
    usage,
  }
}

function sumUsage(events: readonly SessionEvent[]): Meta['usage'] {
  let input = 0
  let output = 0
  let reasoning = 0
  for (const event of events) {
    if (event.type === 'assistant/message' && event.data.usage) {
      input += event.data.usage.inputTokens ?? 0
      output += event.data.usage.outputTokens ?? 0
      reasoning += event.data.usage.reasoningTokens ?? 0
    }
  }
  return { input, output, reasoning }
}

function buildSections(session: Session): Section[] {
  const results = collectToolResults(session.events)
  const sections: Section[] = []
  for (const event of session.events) {
    switch (event.type) {
      case 'turn/start':
        sections.push({ kind: 'turn', turn: event.data.turn })
        break
      case 'user/message': {
        const text = extractTexts(event.data.content).join('').trim()
        if (text) sections.push({ kind: 'user', text })
        break
      }
      case 'assistant/message': {
        const text = extractTexts(event.data.message.content).join('').trim()
        const reasoning = extractReasonings(event.data.message.content)
          .map(r => r.trim())
          .filter(Boolean)
        sections.push({ kind: 'assistant', text, reasoning })
        break
      }
      case 'tool/call': {
        const outcome = results.get(String(event.data.callId))
        sections.push({
          kind: 'tool',
          name: event.data.name,
          args: prettyJson(event.data.arguments),
          result: outcome?.text ?? '',
          isError: outcome?.isError === true,
          isSubagent: isSubagentTool(event.data.name),
        })
        break
      }
      case 'todo/write': {
        const todos = event.data.todos.map(t => `[${t.status}] ${t.content}`)
        if (todos.length) sections.push({ kind: 'todo', todos })
        break
      }
      default:
        // request/header, request/context, assistant/chunk, step/*, approval/*,
        // session/end-seed — reconstructed from the durable log but not surface prose.
        break
    }
  }
  return sections
}

interface ToolOutcome {
  text: string
  isError: boolean
}

function collectToolResults(events: readonly SessionEvent[]): Map<string, ToolOutcome> {
  const map = new Map<string, ToolOutcome>()
  for (const event of events) {
    if (event.type === 'tool/result') {
      const block = event.data.message.content[0]
      const text = extractTexts(block.content).join('').trim()
      map.set(String(block.toolCallId), { text, isError: block.isError === true || event.data.error !== undefined })
    }
  }
  return map
}

function isSubagentTool(name: string): boolean {
  return /subagent|workflow|spawn|fork|codex|claude|ralph|delegate/i.test(name)
}

// ---------------------------------------------------------------------------
// Markdown / HTML emitters
// ---------------------------------------------------------------------------

function renderMarkdown(meta: Meta, sections: Section[], includeToolDetails: boolean): string {
  const lines: string[] = []
  lines.push(`# ${meta.title}`, '')
  lines.push(...metaLines(meta), '')
  if (meta.systemPrompt) {
    lines.push('## 系统提示', '', fence('text', meta.systemPrompt), '')
  }
  lines.push('## 对话', '')
  for (const section of sections) {
    if (section.kind === 'turn') {
      lines.push(`### Turn ${section.turn}`, '')
    } else if (section.kind === 'user') {
      lines.push('**👤 用户**', '', section.text, '')
    } else if (section.kind === 'assistant') {
      lines.push('**🤖 助手**', '')
      if (section.text) lines.push(section.text, '')
      if (section.reasoning.length) {
        lines.push(
          '<details>',
          '<summary>🧠 思维链（Thinking）</summary>',
          '',
          fence('text', section.reasoning.join('\n\n')),
          '',
          '</details>',
          '',
        )
      }
    } else if (section.kind === 'tool') {
      const label = section.isSubagent ? '🤝 子agent 委派' : '🔧 工具调用'
      if (!includeToolDetails) {
        lines.push(`- ${label}：${section.name}${section.isError ? '（失败）' : ''}`, '')
        continue
      }
      lines.push('<details>', `<summary>${label}：${section.name}</summary>`, '')
      if (section.args) {
        lines.push('**参数**', '', fence('json', section.args), '')
      }
      if (section.result) {
        lines.push(`**结果**${section.isError ? '（失败）' : ''}`, '', fence('text', section.result), '')
      }
      lines.push('</details>', '')
    } else if (section.kind === 'todo') {
      lines.push('**📋 任务列表**', '', ...section.todos.map(t => `- ${t}`), '')
    }
  }
  return `${lines.join('\n')}\n`
}

function renderHtml(meta: Meta, sections: Section[], includeToolDetails: boolean): string {
  const body: string[] = []
  body.push(`<h1>${escapeHtml(meta.title)}</h1>`)
  body.push('<div class="meta">')
  for (const line of metaLines(meta)) {
    body.push(`<div>${escapeHtml(line)}</div>`)
  }
  body.push('</div>')
  if (meta.systemPrompt) {
    body.push('<h2>系统提示</h2>', `<pre class="system">${escapeHtml(meta.systemPrompt)}</pre>`)
  }
  body.push('<h2>对话</h2>')
  for (const section of sections) {
    if (section.kind === 'turn') {
      body.push(`<h3>Turn ${section.turn}</h3>`)
    } else if (section.kind === 'user') {
      body.push('<div class="msg user">', `<div class="who">👤 用户</div>`, `<div class="body">${escapeHtml(section.text)}</div>`, '</div>')
    } else if (section.kind === 'assistant') {
      body.push('<div class="msg assistant">', '<div class="who">🤖 助手</div>')
      if (section.text) body.push(`<div class="body">${escapeHtml(section.text)}</div>`)
      if (section.reasoning.length) {
        body.push(
          '<details class="reasoning">',
          '<summary>🧠 思维链（Thinking）</summary>',
          `<pre>${escapeHtml(section.reasoning.join('\n\n'))}</pre>`,
          '</details>',
        )
      }
      body.push('</div>')
    } else if (section.kind === 'tool') {
      const label = section.isSubagent ? '🤝 子agent 委派' : '🔧 工具调用'
      if (!includeToolDetails) {
        body.push(`<div class="tool-mini">${label}：${escapeHtml(section.name)}${section.isError ? '（失败）' : ''}</div>`)
        continue
      }
      body.push(
        '<details class="tool">',
        `<summary>${label}：${escapeHtml(section.name)}</summary>`,
      )
      if (section.args) body.push('<div class="lbl">参数</div>', `<pre class="code">${escapeHtml(section.args)}</pre>`)
      if (section.result) {
        body.push(`<div class="lbl">结果${section.isError ? '（失败）' : ''}</div>`, `<pre class="code">${escapeHtml(section.result)}</pre>`)
      }
      body.push('</details>')
    } else if (section.kind === 'todo') {
      body.push('<div class="todo">', '<div class="who">📋 任务列表</div>', `<ul>${section.todos.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`, '</div>')
    }
  }
  return `<!DOCTYPE html>\n<html lang="zh">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${escapeHtml(meta.title)}</title>\n<style>${CSS}</style>\n</head>\n<body>\n${body.join('\n')}\n</body>\n</html>\n`
}

const CSS = [
  'body { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif; max-width: 860px; margin: 2rem auto; padding: 0 1rem; line-height: 1.65; color: #1f2328; }',
  'h1 { border-bottom: 2px solid #e1e4e8; padding-bottom: .4rem; }',
  '.meta { color: #57606a; font-size: .9rem; margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: .2rem 1.2rem; }',
  '.msg { border: 1px solid #e1e4e8; border-radius: 10px; padding: .8rem 1rem; margin: .8rem 0; box-shadow: 0 1px 2px rgba(31,35,40,.04); }',
  '.msg.user { background: #f6f8fa; }',
  '.msg.assistant { background: #ffffff; border-left: 3px solid #4d6bfe; }',
  '.who { font-weight: 600; margin-bottom: .4rem; }',
  'pre.system, pre.code { background: #f6f8fa; border-radius: 6px; padding: .8rem; overflow-x: auto; white-space: pre-wrap; font-family: "SF Mono", ui-monospace, Menlo, monospace; font-size: .85rem; }',
  'details { border: 1px solid #d0d7de; border-radius: 8px; padding: .5rem .8rem; margin: .6rem 0; }',
  'details summary { cursor: pointer; font-weight: 600; }',
  '.tool-mini { color: #57606a; font-size: .9rem; margin: .4rem 0; }',
  '.lbl { font-weight: 600; margin: .6rem 0 .2rem; }',
  '.todo ul { margin: .3rem 0; }',
  'h3 { margin-top: 1.8rem; border-top: 1px dashed #d0d7de; padding-top: .8rem; color: #57606a; }',
  '@media print { body { margin: 0; max-width: none; } details { border: none; padding: 0; } details summary { display: none; } pre { white-space: pre-wrap; } }',
].join('\n')

function metaLines(meta: Meta): string[] {
  const lines = [`会话：\`${meta.sessionId}\``, `创建时间：${meta.createdAt}`]
  if (meta.cwd) lines.push(`工作目录：\`${meta.cwd}\``)
  if (meta.origin === 'subagent') lines.push(`来源：子agent 会话`)
  if (meta.delegationDepth !== undefined) lines.push(`委托深度：${meta.delegationDepth}`)
  if (meta.parentSession) lines.push(`父会话：\`${meta.parentSession}\``)
  if (meta.agentPreset) lines.push(`预设：\`${meta.agentPreset}\``)
  if (meta.model) lines.push(`模型：\`${meta.model}\``)
  lines.push(`用量：输入 ${meta.usage.input} · 输出 ${meta.usage.output} · 推理 ${meta.usage.reasoning} tokens`)
  return lines
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Concatenated visible text from a list of content blocks (structural, no type dep). */
function extractTexts(content: readonly unknown[]): string[] {
  const out: string[] = []
  for (const block of content) {
    if (typeof block === 'object' && block !== null) {
      const b = block as { type?: unknown; text?: unknown }
      if (b.type === 'text' && typeof b.text === 'string') out.push(b.text)
    }
  }
  return out
}

/** Reasoning / thinking text from a list of content blocks. */
function extractReasonings(content: readonly unknown[]): string[] {
  const out: string[] = []
  for (const block of content) {
    if (typeof block === 'object' && block !== null) {
      const b = block as { type?: unknown; text?: unknown }
      if (b.type === 'reasoning' && typeof b.text === 'string') out.push(b.text)
    }
  }
  return out
}

function sessionTitle(session: Session): string {
  for (const event of session.events) {
    if (event.type === 'user/message') {
      const text = extractTexts(event.data.content).join('').replace(/\s+/g, ' ').trim()
      if (text) return text.length > 60 ? `${text.slice(0, 60)}…` : text
    }
  }
  return String(session.id)
}

function prettyJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch {
    return raw
  }
}

function fence(lang: string, text: string): string {
  const runs = text.match(/`{3,}/g)
  const n = Math.max(3, ...(runs ?? []).map(r => r.length + 1))
  const marker = '`'.repeat(n)
  return `${marker}${lang}\n${text}\n${marker}`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function slugify(s: string): string {
  const cleaned = s
    .replace(/[^a-zA-Z0-9\u4e00-\u9fff_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  return cleaned || 'session'
}

function outputPath(pathArg: string | undefined, session: Session, format: 'markdown' | 'html', asDir: boolean): string {
  const ext = format === 'html' ? '.html' : '.md'
  const filename = `${slugify(sessionTitle(session))}-${String(session.id)}${ext}`
  if (pathArg) {
    if (!asDir && (pathArg.endsWith('.md') || pathArg.endsWith('.html'))) {
      return resolve(pathArg)
    }
    return resolve(join(pathArg, filename))
  }
  const base = session.header.cwd ?? process.cwd()
  return resolve(join(base, filename))
}
