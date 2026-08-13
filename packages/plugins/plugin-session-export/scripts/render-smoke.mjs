// Smoke test for the session-export renderer — no DSH runtime, no API key.
// Builds a synthetic Session-shaped object (matching the real SessionEvent
// envelope) and renders it through the exported pure `renderSession()`.
import { renderSession } from '../dist/index.js'

const now = Date.now()

const events = [
  { type: 'request/header', seq: 0, time: now, data: { header: { config: { provider: 'deepseek-official', model: 'deepseek-chat' }, system: 'You are a helpful research assistant.' }, reason: 'initial' } },
  { type: 'turn/start', seq: 1, time: now, data: { turn: 1 } },
  { type: 'user/message', seq: 2, time: now, data: { role: 'user', content: [{ type: 'text', text: '帮我查一下 D 维 Kuramoto 模型的临界指数' }], source: { kind: 'user' } } },
  { type: 'assistant/message', seq: 3, time: now, data: { turn: 1, step: 1, message: { role: 'assistant', content: [{ type: 'reasoning', text: '先定位 Daido 2015 的磁化率定义，确认 γ⁻=γ⁺=1 对称。' }, { type: 'text', text: '临界指数为 γ⁻ = γ⁺ = 1 …' }], source: { kind: 'model', provider: 'deepseek-official', model: 'deepseek-chat' } }, usage: { inputTokens: 120, outputTokens: 40, reasoningTokens: 18 } } },
  { type: 'tool/call', seq: 4, time: now, data: { turn: 1, step: 1, callId: 'call-1', name: 'web_search', arguments: '{"query":"Daido 2015 Kuramoto susceptibility"}' } },
  { type: 'tool/result', seq: 5, time: now, data: { turn: 1, step: 1, message: { role: 'user', content: [{ type: 'tool-result', toolCallId: 'call-1', content: [{ type: 'text', text: '检索到 3 条结果…' }], isError: false }], source: { kind: 'tool', callId: 'call-1' } } } },
  { type: 'assistant/message', seq: 6, time: now, data: { turn: 1, step: 2, message: { role: 'assistant', content: [{ type: 'text', text: '结论：γ⁻ = γ⁺ = 1，与 XY 普适类不同。' }], source: { kind: 'model', provider: 'deepseek-official', model: 'deepseek-chat' } }, usage: { inputTokens: 80, outputTokens: 30, reasoningTokens: 0 } } },
  { type: 'turn/end', seq: 7, time: now, data: { turn: 1, reason: { kind: 'completed' } } },
  { type: 'turn/start', seq: 8, time: now, data: { turn: 2 } },
  { type: 'user/message', seq: 9, time: now, data: { role: 'user', content: [{ type: 'text', text: '再帮我委派一个子 agent 跑数值验证' }], source: { kind: 'user' } } },
  { type: 'tool/call', seq: 10, time: now, data: { turn: 2, step: 1, callId: 'call-2', name: 'tool-subagent', arguments: '{"agent":"k3","task":"数值拟合临界指数"}' } },
  { type: 'tool/result', seq: 11, time: now, data: { turn: 2, step: 1, message: { role: 'user', content: [{ type: 'tool-result', toolCallId: 'call-2', content: [{ type: 'text', text: '子 agent 完成，β≈0.34' }], isError: false }], source: { kind: 'tool', callId: 'call-2' } } } },
  { type: 'assistant/message', seq: 12, time: now, data: { turn: 2, step: 2, message: { role: 'assistant', content: [{ type: 'text', text: '子 agent 返回 β≈0.34。' }], source: { kind: 'model', provider: 'deepseek-official', model: 'deepseek-chat' } }, usage: { inputTokens: 60, outputTokens: 20, reasoningTokens: 5 } } },
  { type: 'todo/write', seq: 13, time: now, data: { todos: [{ content: '查文献', status: 'completed' }, { content: '跑数值', status: 'in_progress' }] } },
  { type: 'turn/end', seq: 14, time: now, data: { turn: 2, reason: { kind: 'completed' } } },
]

const session = {
  id: 'session-42',
  header: {
    version: 0,
    id: 'session-42',
    createdAt: now,
    cwd: process.cwd(),
    origin: 'subagent',
    delegationDepth: 1,
    agentPreset: 'standard',
  },
  events,
}

const markdown = renderSession(session, 'markdown')
const html = renderSession(session, 'html')

console.log('===== MARKDOWN =====')
console.log(markdown)
console.log('===== HTML (first 1200 chars) =====')
console.log(html.slice(0, 1200))
console.log(`===== SIZES: md=${markdown.length} html=${html.length} =====`)

// Assertions
const checks = [
  ['系统提示 present', markdown.includes('## 系统提示')],
  ['user text present', markdown.includes('帮我查一下 D 维 Kuramoto 模型的临界指数')],
  ['reasoning collapsed', markdown.includes('🧠 思维链')],
  ['tool call label', markdown.includes('🔧 工具调用')],
  ['subagent label', markdown.includes('🤝 子agent 委派')],
  ['usage line', markdown.includes('用量：')],
  ['origin subagent', markdown.includes('来源：子agent 会话')],
  ['html escapes ok', html.includes('&lt;') === false && html.includes('<!DOCTYPE html>')],
]
let fail = 0
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
  if (!ok) fail += 1
}
process.exit(fail === 0 ? 0 : 1)
