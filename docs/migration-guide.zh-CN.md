# 把 Claude Code / OpenClaw 插件与脚本迁移到 DeepSeek Harness

> 如何把已有的 Claude Code 插件、OpenClaw 插件、或一次性脚本移植成 DeepSeek Harness（DSH）插件。
> 配合 [`create-dsh-plugin`](../packages/create-dsh-plugin/README.md) 使用：先用脚手架生成骨架，再按本指南搬移逻辑。

---

## 1. 只需要理解一件事

DSH 是「**一切皆插件**」的架构，底层是 [Cordis](https://github.com/cordiverse/cordis)。
一个插件就是一个导出 `apply(ctx)` 函数的模块（或一个 `Service` 类）；运行时把**上下文**（`ctx`）
交给你，你通过它在上面注册工具、事件监听、命令和资源。注册都是 **effect**——插件卸载时自动回滚。

```ts
// 一个 DSH 插件的完整形态。
import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-plugin'
export const inject = ['tools']   // 可选：声明本插件依赖的服务

export function apply(ctx: Context) {
  // 在这里注册工具、监听事件、挂载资源
}
```

你现有的插件本来就由同样的原语组成，迁移大部分工作只是**换一层接缝（seam）**，而不是重写逻辑。

## 2. 五分钟迁移路径

```sh
# 1. 用脚手架生成对应模板（tool / events / webui）。
npx create-dsh-plugin my-plugin -t tool --verify

# 2. 把逻辑搬进 src/index.ts（见 §4–§6）。
# 3. 构建 + 装进 profile 并启动：
pnpm install && pnpm run build
dsh plugin --profile my-profile add ./my-plugin
dsh --profile my-profile
```

## 3. 概念映射表

| 你已有的东西 | DSH 对应机制 | 说明 |
|---|---|---|
| 一段脚本 / 函数（bash、TS、Python）供 agent 调用 | **工具**：`defineTool()` + `ctx.tools.register` | 参数 schema 自动校验 + 推导 `args` 类型 |
| Claude Code **skill**（`SKILL.md`） | DSH **skill**（`dsh-skill` 注册表 + `skill-filesystem`）——同样是 SKILL.md 的思路 | 若本质是单次调用，也可包成工具 |
| Claude Code **斜杠命令** | DSH **人类命令**：`ctx.commands` | 不经过模型回合直接派发 |
| Claude Code **hook**（`PreToolUse`、`PostToolUse`、`SessionStart`…） | DSH **事件**：`ctx.on('tools/pre-execute')`、`ctx.on('tools/post-execute')`、`ctx.on('session/event')`、`ctx.on('agent/pre-step')`… | hook → 类型化事件；waterfall 里用 `next()` 委托 |
| OpenClaw **hook / 中间件** | 同样的 DSH **事件**接缝 | 按事件所属域挑选 |
| OpenClaw **工具** | **工具**：`defineTool()` | 返回规范化 JSON 值，不返回散文 |
| **MCP server** | DSH **MCP 客户端**（`dsh-mcp-client`） | 追求低延迟也可包成原生工具 |
| **子代理** | DSH **subagent**（`dsh-subagent` + `tool-subagent`） | 提供方：spawn / fork / codex / claude-code |
| **记忆 / 持久化** | `ctx.effect()` + DSH **storage** 服务，或**会话事件** | 会话日志是持久事实源 |
| **后台任务** | `ctx.jobs` + `tool-jobs` | `run_in_background` 语义 |
| 配置 / 环境开关 | Schemastery **`Config`** 导出 | 加载期即校验 |
| 分发 | **bundle**（`dsh.bundle` + `cordis.patch.yml`）+ **profile** | `dsh plugin add` |

## 4. 迁移脚本 → 工具插件

假设你有一个脚本 `fetch_paper.sh`（或一个 TS 函数），传入 arXiv id、打印元数据。
把**函数体**搬进 `execute`，把输入/输出描述成 schema：

```ts
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'paper-tool'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'fetch_paper',
    description: '按 id 获取 arXiv 论文的标题、作者与摘要。',
    parameters: {
      arxivId: { type: 'string', required: true, description: '如 2505.05760' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', required: true },
          authors: { type: 'array', items: { type: 'string' }, required: true },
          abstract: { type: 'string', required: true },
        },
        additionalProperties: false,
      },
      render: (_args, value) => [{ type: 'text', text: `${value.title}\n${value.authors.join(', ')}\n${value.abstract}` }],
    },
    async execute(args) {
      // ← 你原来的抓取逻辑原样搬到这里。
      const meta = await fetchArxiv(args.arxivId)
      return { title: meta.title, authors: meta.authors, abstract: meta.abstract }
    },
  }))
}
```

与裸脚本的关键区别：

- **结构化返回**而非散文：`output.schema` 声明规范化 JSON 值；`render()` 把它转成给模型看的文本。
  在 Code Mode（PTC）下，这个 schema 自动变成 `await tools.fetch_paper(...)`。
- **校验免费**：`parameters` 在 `execute` 前自动校验，`args` 自动带类型。
- **可逆**：dispose 插件即自动反注册工具（因为注册是 effect）。

## 5. 迁移 hook → 事件插件

Claude Code 的 `PreToolUse` / `PostToolUse` hook（或 OpenClaw 里拦截工具调用的中间件）
对应 DSH 的**工具执行管线**事件：

| 你的 hook | DSH 事件 | 模式 |
|---|---|---|
| `PreToolUse`（允许/拒绝/询问） | `tools/pre-execute` | waterfall |
| `PostToolUse`（改写/拦截/标注结果） | `tools/post-execute` | waterfall |
| `Notification` / 会话开始 | `session/event`、`session/created` | emit |
| `UserPromptSubmit` | `agent/pre-step` | waterfall |
| `Stop` / `SubagentStop` | `agent/turn-stopping` | serial |

```ts
import type { Context } from '@deepseek-ai/cordis'
import type { PreToolDecision, ToolExecution } from '@deepseek-ai/dsh-tools'

export const name = 'policy-hook'
export const inject = ['tools']

export function apply(ctx: Context) {
  // Waterfall：调 next() 表示放行/委托；返回决策表示拒绝/询问。
  ctx.on('tools/pre-execute', (exec: ToolExecution, next: () => Promise<PreToolDecision>) => {
    if (isForbiddenTool(exec.name)) return { kind: 'deny', reason: 'blocked by policy' }
    return next()
  })

  // Emit：观察持久会话日志。
  ctx.on('session/event', (session, event) => {
    if (event.type === 'tool/result') audit(event)
  })
}
```

> **waterfall** 里监听器是「环绕中间件」：`next()` 委托给下一个监听器；**不**调 `next()` 即短路。
> `emit` 监听器是即发即忘的观察者。

## 6. 迁移 skill / 斜杠命令

- **Skill → DSH skill。** DSH 的 `dsh-skill` 注册表用的是同一种思路——「一个 markdown 文件，
  带 name + description + 正文」。把你的 `SKILL.md` 放进 skill 根目录（`skill-filesystem` 的
  `customSkillDirs`），它就通过 `tool-skill` 变成模型可调用的技能。正文内容本身无需改代码。
- **斜杠命令 → 人类命令。** 注册到 `ctx.commands`，让 `/yourcmd` 不经模型回合直接派发
  （用于用户直接触发的副作用）。

## 7. 打包与安装

```sh
# package.json 里带 bundle 清单：
#   "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
# cordis.patch.yml 插入你的插件行：
#   - insert:
#       - id: my-plugin
#         name: my-package-name          # 是「包名」，不是相对路径

dsh plugin --profile my-profile add ./my-plugin   # 在插件父目录执行
dsh --profile my-profile --dump-config             # 验证配置层
dsh --profile my-profile                           # 启动
```

## 8. 坑（最容易踩的）

1. **把 `@deepseek-ai/dsh-tools` 锁到 `next` tag 版本**——npm `latest` 是过期的 `0.0.1-rc.1`。
   （`create-dsh-plugin` 已帮你锁好。）
2. **Node `^22.19 || >=24`**；旧版只告警 `EBADENGINE`。
3. 所有 `@deepseek-ai/dsh-*` 保持在同一条 `0.1.0-rc.x` 版本线。
4. `@deepseek-ai/cordis` 是 **peerDependency**——只 `import type`。
5. 纯 **ESM**（`"type": "module"`）。
6. 注册是 **effect**——`ctx.tools.register`/`ctx.on` 自动 dispose；自己的 timer/连接要包
   `ctx.effect(() => { …; return cleanup })`。
7. `dsh plugin add <dir>` 的相对路径锚定**调用**目录。
8. bundle 的 `cordis.patch.yml` 里 `name` 是**包名**，不是相对路径。
9. 加载顺序 = **服务依赖**（`inject`），与文件顺序无关。
10. 模型→工具端到端调用需要 `DEEPSEEK_API_KEY`；没有 key 也仍可验证编译 + 加载 + 事件接线。

## 9. 下一步

- 全量事件列表：harness 仓库 `docs/event-producer-consumer.md`。
- 工具契约参考：`docs/cookbook/adding-a-tool.md`。
- Web UI 节点：`docs/cookbook/adding-a-conversation-node.md`。
