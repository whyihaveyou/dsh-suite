# @dsh-suite/plugin-session-export

[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=plugin-session-export)


> DSH 插件：把 append-only 会话日志导出成**人读的 Markdown / HTML**，按 Trajectory 来源分组渲染
> （系统提示 / 思维链 / 工具调用 / 子agent）。官方 `session-log-export` 只给 raw JSONL，本插件补齐
> 「一段对话一份干净文档，可直接贴飞书 / 周报 / 复盘」的缺口。

> DSH plugin: export the append-only session log as **human-readable Markdown / HTML**, grouped by
> trajectory source (system prompt / reasoning / tool calls / subagent). The official
> `session-log-export` only emits raw JSONL; this plugin produces a clean per-conversation document
> you can paste into a report, IM, or review.

---

## 特性 / Features

- 工具 `export_session`（`defineTool`，`inject: ['tools','sessions']`）：
  - `format: 'markdown' | 'html'`（默认 markdown）；**HTML 为自包含单文件**（内联样式 + 打印友好），可直接分享。
  - `includeToolDetails: true|false`（默认 true）：**工具细节开关**——`false` 时只保留工具调用名称、隐藏参数与结果（适合对外分享的干净版）。
  - 导出**当前会话**（默认）、指定 `sessionId`，或 `all: true` **批量导出**全部 live 会话。
  - `path` 缺省写会话 workspace（`session.header.cwd`）。
- 按来源分组渲染：系统提示（`request/header`）、用户/助手正文、思维链（reasoning 折叠）、
  工具调用（参数 + 结果折叠，`subagent*` 等委派工具标为「子agent」）、todo 列表、用量统计。
- 子agent 会话（`header.origin === 'subagent'`）在头部标注来源与委托深度。

- Tool `export_session` (`defineTool`, `inject: ['tools','sessions']`):
  - `format: 'markdown' | 'html'` (default markdown); **HTML is a self-contained single file**
    (inline styles + print-friendly), ready to share.
  - `includeToolDetails: true|false` (default true): **tool-detail switch** — `false` keeps only
    tool names, hiding args/results (a clean share version).
  - Export the **current** session (default), a named `sessionId`, or `all: true` to batch-export
    every live session.
  - `path` defaults to the session workspace (`session.header.cwd`).
- Grouped by source: system prompt (`request/header`), user/assistant prose, reasoning (collapsed),
  tool calls (args + result collapsed, delegation tools flagged as subagent), todos, usage totals.
- Subagent sessions (`header.origin === 'subagent'`) are annotated with origin and delegation depth.

---

## 安装 / Install

```sh
dsh plugin --profile <name> add @dsh-suite/plugin-session-export
```

（本地开发：`dsh plugin --profile <name> add ./packages/plugins/plugin-session-export`）

## 使用 / Usage

模型（或 CLI）可直接调用该工具：

The model (or CLI) can call the tool directly:

```text
export_session({ format: 'html' })
export_session({ all: true, path: '/tmp/session-dumps' })
export_session({ sessionId: 'session-3', format: 'markdown' })
export_session({ format: 'html', includeToolDetails: false })  // 分享版：只留工具名
```

输出示例 / Output sample (Markdown):

````markdown
# 帮我查一下 Kuramoto 临界指数

会话：`session-1` · 创建时间：2026-08-13T…Z · 模型：`deepseek-official/deepseek-chat`

## 系统提示
```text
You are a helpful assistant…
```

## 对话

### Turn 1
**👤 用户**
帮我查一下 D 维 Kuramoto 模型的临界指数

**🤖 助手**
临界指数为 γ⁻ = γ⁺ = 1 …

<details>
<summary>🧠 思维链（Thinking）</summary>

```text
先定位 Daido 2015 的磁化率定义…
```

</details>

<details>
<summary>🔧 工具调用：web_search</summary>

**参数**
```json
{ "query": "Daido 2015 Kuramoto susceptibility" }
```

**结果**
```text
… 检索到 3 条结果 …
```

</details>
````

## 验证 / Verification

- ✅ 纯 ESM 编译（`pnpm build`）+ typecheck
- ✅ `dsh.bundle` + `cordis.patch.yml` 装载进真实 DSH profile（headless 无 key 跑到 MISSING_CREDENTIAL，`registered "export_session" — listed=true`）
- ✅ 渲染冒烟（`scripts/render-smoke.mjs`）：合成真实 `SessionEvent` 流 → md/html × 含/不含工具细节 4 种输出，14 项断言全 PASS；HTML 自包含样式 + 打印友好
- ✅ HTML 真实打开（playwright/Chrome）：`export-full.html`（工具详情展开）/ `export-mini.html`（仅工具名）渲染正确（截图 `research/export-screenshots/`）
- ⚠️ 端到端「模型调 export_session → 落盘 → 读回」需真实会话 + API key——未闭环（渲染逻辑按真实 `SessionEvent` 类型实现并编译通过）

## 设计准则 / Design principles

遵守 `dsh-plugin-design-principles.md`：`inject` 声明依赖（#3）、`ctx.tools.register` 注册即
effect（#1）、会话数据走 `ctx.sessions`（服务依赖，非全局状态，#2）、读写文件是不可逆发射、
失败即抛错不半写（#9）。
