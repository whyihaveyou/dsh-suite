
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { renderSession } from '../dist/index.js'
const now = Date.now()
const events = [
  { type: 'request/header', seq: 0, time: now, data: { header: { config: { provider: 'deepseek-official', model: 'deepseek-chat' }, system: 'You are a helpful research assistant.' }, reason: 'initial' } },
  { type: 'turn/start', seq: 1, time: now, data: { turn: 1 } },
  { type: 'user/message', seq: 2, time: now, data: { role: 'user', content: [{ type: 'text', text: '帮我查一下 D 维 Kuramoto 模型的临界指数' }], source: { kind: 'user' } } },
  { type: 'assistant/message', seq: 3, time: now, data: { turn: 1, step: 1, message: { role: 'assistant', content: [{ type: 'reasoning', text: '先定位 Daido 2015 的磁化率定义。' }, { type: 'text', text: '临界指数为 γ⁻ = γ⁺ = 1 …' }], source: { kind: 'model' } }, usage: { inputTokens: 120, outputTokens: 40, reasoningTokens: 18 } } },
  { type: 'tool/call', seq: 4, time: now, data: { turn: 1, step: 1, callId: 'call-1', name: 'web_search', arguments: '{"query":"Daido 2015 Kuramoto susceptibility"}' } },
  { type: 'tool/result', seq: 5, time: now, data: { turn: 1, step: 1, message: { role: 'user', content: [{ type: 'tool-result', toolCallId: 'call-1', content: [{ type: 'text', text: '检索到 3 条结果…' }], isError: false }], source: { kind: 'tool', callId: 'call-1' } } } },
  { type: 'assistant/message', seq: 6, time: now, data: { turn: 1, step: 2, message: { role: 'assistant', content: [{ type: 'text', text: '结论：γ⁻ = γ⁺ = 1。' }], source: { kind: 'model' } }, usage: { inputTokens: 80, outputTokens: 30, reasoningTokens: 0 } } },
  { type: 'tool/call', seq: 7, time: now, data: { turn: 1, step: 3, callId: 'call-2', name: 'tool-subagent', arguments: '{"agent":"k3","task":"数值拟合"}' } },
  { type: 'tool/result', seq: 8, time: now, data: { turn: 1, step: 3, message: { role: 'user', content: [{ type: 'tool-result', toolCallId: 'call-2', content: [{ type: 'text', text: '子 agent 完成 β≈0.34' }], isError: false }], source: { kind: 'tool', callId: 'call-2' } } } },
  { type: 'assistant/message', seq: 9, time: now, data: { turn: 1, step: 4, message: { role: 'assistant', content: [{ type: 'text', text: '子 agent 返回 β≈0.34。' }], source: { kind: 'model' } }, usage: { inputTokens: 60, outputTokens: 20, reasoningTokens: 5 } } },
  { type: 'todo/write', seq: 10, time: now, data: { todos: [{ content: '查文献', status: 'completed' }, { content: '跑数值', status: 'in_progress' }] } },
  { type: 'turn/end', seq: 11, time: now, data: { turn: 1, reason: { kind: 'completed' } } },
]
const session = { id: 'session-42', header: { version: 0, id: 'session-42', createdAt: now, cwd: process.cwd(), origin: 'main', agentPreset: 'standard' }, events }

const mdFull = renderSession(session, 'markdown', { includeToolDetails: true })
const mdMini = renderSession(session, 'markdown', { includeToolDetails: false })
const htmlFull = renderSession(session, 'html', { includeToolDetails: true })
const htmlMini = renderSession(session, 'html', { includeToolDetails: false })

const checks = [
  ['md-full 含工具参数', mdFull.includes('"query"')],
  ['md-full 含工具结果', mdFull.includes('检索到 3 条结果')],
  ['md-mini 无工具参数', !mdMini.includes('"query"')],
  ['md-mini 无工具结果', !mdMini.includes('检索到 3 条结果')],
  ['md-mini 保留工具名', mdMini.includes('web_search') && mdMini.includes('tool-subagent')],
  ['html-full 含参数', htmlFull.includes('&quot;query&quot;')],
  ['html-full 含结果', htmlFull.includes('检索到 3 条结果')],
  ['html-mini 无参数', !htmlMini.includes('&quot;query&quot;')],
  ['html-mini 无结果', !htmlMini.includes('检索到 3 条结果')],
  ['html-mini 保留工具名', htmlMini.includes('web_search')],
  ['html 自包含样式', htmlFull.includes('<style>') && htmlFull.includes('</style>') && !htmlFull.includes('<link rel="stylesheet"')],
  ['html 打印样式', htmlFull.includes('@media print')],
  ['对话主体保留', mdMini.includes('临界指数为 γ⁻ = γ⁺ = 1') && htmlMini.includes('临界指数为')],
  ['用户消息保留', mdMini.includes('帮我查一下') && htmlMini.includes('帮我查一下')],
]
let fail = 0
for (const [name, ok] of checks) { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`); if (!ok) fail += 1 }

// 写两种格式文件供打开验证/截图(输出目录走环境变量,避免把本机绝对路径写进仓库;CI leak-scan 会拦)
const out = process.env.RENDER_SMOKE_OUT || `/tmp/export-screenshots-${process.env.USER || 'run'}`
mkdirSync(out, { recursive: true })
writeFileSync(join(out, 'export-full.html'), htmlFull)
writeFileSync(join(out, 'export-mini.html'), htmlMini)
writeFileSync(join(out, 'export-full.md'), mdFull)
writeFileSync(join(out, 'export-mini.md'), mdMini)
console.log(`\nwritten 4 files to ${out}`)
console.log(`sizes: mdFull=${mdFull.length} mdMini=${mdMini.length} htmlFull=${htmlFull.length} htmlMini=${htmlMini.length}`)
process.exit(fail === 0 ? 0 : 1)
