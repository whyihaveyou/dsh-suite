# DeepSeek Harness 插件开发指南

> 📖 **本书已独立成仓 —— [dsh-plugin-tutorial](https://github.com/whyihaveyou/dsh-plugin-tutorial)。此处为镜像。**

> 面向 **DeepSeek Harness（DSH）** 插件作者与 review 者的权威指南。DSH 是构建于
> [Cordis](https://github.com/cordiverse/cordis) 之上的「一切皆插件」agent harness。
> 下文所有代码块都来自已验证、可运行的 spike 或 `create-dsh-plugin` 脚手架，**没有编造的 API**。
> 配套文档：`docs/migration-guide.zh-CN.md`（迁移现有插件）、`research/cordis-paper-notes.md`（形式化理论）、
> `research/dsh-plugin-design-principles.md`（15 条准则原文）。

---

## 0. 摘要

DSH 是一个插件系统：模型适配器、工具注册表、会话日志、沙箱、乃至 agent 循环本身，**全部都是插件**，
由 `cordis.yml` 逐层组装。没有特权内核——扩展 DSH 的唯一方式，就是把自己的插件挂到它旁边。

一个插件就是一个导出 `apply(ctx)` 函数的模块。运行时交给你一个**上下文**（`ctx`），你通过它注册
工具、事件监听器、命令和资源。**注册即副作用（effect）**——插件卸载时自动回滚，这正是 DSH 插件模型
能够在运行时安全组合与拆除的根基。

```ts
// 一个 DSH 插件的全部形态。
import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-plugin'
export const inject = ['tools']   // 可选：本插件依赖的服务

export function apply(ctx: Context) {
  // 在这里注册工具、监听事件、挂载资源
}
```

---

## 1. 插件模型

### 1.1 一切皆插件

DSH 内嵌（vendored）Cordis（`@deepseek-ai/cordis` v4），用 `@deepseek-ai/dsh-*` 插件组装自己。
**服务（service）**是挂在上下文键（`ctx.tools`、`ctx.llm`、`ctx.sessions`、`ctx.agents` …）上的
命名能力。**seam（可替换能力）**是有三个角色的可插拔能力：

- **Service Definition（服务定义）**——拥有 `ctx.<key>` 及其词表类型（如 `ShellExecutor`）。
- **Service Provider（服务提供者）**——该定义的一个或多个实现（如 `bash-local`、`bash-sandbox`）。
- **Consumer（消费者）**——`inject` 该服务并调用它的插件（如 `tool-bash`）。

插件用 `inject` 声明它需要哪些服务；loader 在这些服务就绪后才运行 `apply`。
**加载顺序由服务依赖表达，绝不由文件顺序决定。**

### 1.2 时空可组合性

DSH 的运行时保证来自 Cordis 论文形式化的两个维度：

- **时间可组合性（可逆副作用）**：卸载插件时，它对共享上下文所做的一切修改都被完整、安全地撤销。
  每个注册都携带一个 disposer（清理器）；运行时累积它们，卸载时按 LIFO 顺序回放。
- **空间可组合性（响应式协作用）**：插件声明自己的依赖，运行时随 provider 出现/消失/变化而响应式地
  激活/反激活插件。依赖缺失的插件只是保持未激活——绝不会因缺服务而崩溃。

落到实践就是：**你为每个原子副作用提供一个逆，复合拆除由运行时推导，你永远不用手写卸载路径。**

### 1.3 术语表

| English | 中文 | 含义 |
|---|---|---|
| plugin / component | 插件 / 组件 | 导出 `apply(ctx)` 的模块（可带 `name`/`inject`/`Config`） |
| context | 上下文 (`ctx`) | 一切注册流经的一等实体 |
| service | 服务 | `ctx.<key>` 上的命名能力 |
| seam | 可替换能力 | Service Definition + Providers + Consumers |
| inject | 依赖声明 | `apply` 运行前插件需要的服务 |
| effect | 副作用 | 对共享环境的修改 |
| revertible effect | 可逆副作用 | 配有一个逆、由运行时跟踪的副作用 |
| coeffect | 协作用 | 插件对环境的**依赖**（effect 的对偶） |
| reactive coeffect | 响应式协作用 | 每次上下文变化都重算依赖满足性 |
| disposer | 清理器 | 注册返回的逆，卸载时执行 |
| fiber | 纤程 | 插件的一次实例化，带自己的生命周期状态 |
| bundle | bundle | 携带配置层（`cordis.patch.yml`）的 npm 包 |
| profile | profile | `$DSH_HOME/profiles/<name>` 下的一次可运行组合 |
| dispatch mode | 派发模式 | `emit` / `waterfall` / `parallel` / `serial` |

### 1.4 三种插件形态

出自 `docs/cordis-tutorial/01-first-plugin.md`：

```ts
import { Service, type Context } from '@deepseek-ai/cordis'

// ① 函数插件（最常用）：具名导出，无 default export。
export const name = 'hello'
export function apply(ctx: Context) {}

// ② 对象插件：带 apply 方法的对象。
export const objectPlugin = { name: 'object-plugin', apply(ctx: Context) {} }

// ③ 类插件：Service 子类（需要对外暴露自己的服务时）。
export class MyService extends Service {
  constructor(ctx: Context) { super(ctx, 'myService') }
}
```

> 服务包 default-export 服务类；函数插件具名导出 `name`/`inject`/`Config`/`apply`，
> **不能**有 default export。

---

## 2. 三类插件形态，附最小完整示例

### 2.1 工具插件 — `defineTool()`

工具是 agent 调用的插件类型。声明参数 schema（自动校验、推导 `args` 类型）、规范化 JSON 返回值，
以及 `execute` 函数体：

```ts
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'spike-tool-time'

// The plugin only activates once the host's `tools` registry is ready.
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'spike_env_time',
    description: 'Return the current time and process environment info.',
    parameters: {
      tz: {
        type: 'string',
        description: "IANA timezone name, e.g. 'Asia/Shanghai'. Defaults to the system local timezone.",
      },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          iso: { type: 'string', description: 'ISO-8601 timestamp (UTC).' },
          unixMs: { type: 'integer', description: 'Unix epoch milliseconds.' },
          tz: { type: 'string', description: 'Timezone actually used.' },
          nodeVersion: { type: 'string', description: 'process.version' },
          platform: { type: 'string', description: 'process.platform' },
        },
        additionalProperties: false,
      },
      render: (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }],
    },
    async execute(args) {
      const tz = args.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone
      const now = new Date()
      return {
        iso: now.toISOString(),
        unixMs: now.getTime(),
        tz,
        nodeVersion: process.version,
        platform: process.platform,
      }
    },
  }))

  // Self-check: prove the tool actually landed in the registry.
  console.log(
    `[spike-tool-time] registered "spike_env_time" — listed=${ctx.tools.get('spike_env_time') !== undefined}`,
  )
}
```

> 截图：`../research/guide-screenshots/02-plugin-code.png`（本文件渲染）。

要点：

- **结构化返回，而非散文。** `output.schema` 声明规范化 JSON 值；`render()` 把它投影成面向模型的内容块。
  Code Mode（PTC）下 schema 自动变成 `await tools.spike_env_time(...)`。
- **校验免费。** `parameters` 在 `execute` 运行前校验；`args` 由它推导类型。
- **可逆。** `ctx.tools.register()` 返回 disposer 并自动挂到本插件 fiber——卸载插件即反注册工具。
- **对象 schema 必须显式声明 `additionalProperties`。** 每个返回字段标 `required: true`，
  让 `value` 在 `render()`/`presentationMeta()` 里保持非可选。

### 2.2 事件 / 生命周期插件 — `ctx.on` + `ctx.effect`

这个插件**零运行时依赖**：只用宿主交来的 `ctx`。所有 `import type` 在编译期擦除。

```ts
import type { Context } from '@deepseek-ai/cordis'
import type { Session, SessionEvent } from '@deepseek-ai/dsh-session'
import type { PreToolDecision, ToolExecution } from '@deepseek-ai/dsh-tools'

export const name = 'spike-lifecycle-logger'

export function apply(ctx: Context) {
  let sessionEvents = 0
  let toolChanges = 0
  let toolPreExecutes = 0

  // ① Durable session firehose (emit): fires whenever a session's log grows.
  ctx.on('session/event', (session: Session, event: SessionEvent) => {
    sessionEvents += 1
    if (sessionEvents <= 5 || sessionEvents % 25 === 0) {
      console.log(`[spike-lifecycle] session/event #${sessionEvents} type=${event.type} session=${String(session.id)}`)
    }
  })

  // ② Live registry change (emit): fires when any tool is registered or unregistered.
  ctx.on('tools/change', () => {
    toolChanges += 1
    console.log(`[spike-lifecycle] tools/change #${toolChanges}`)
  })

  // ③ Tool execution pipeline (waterfall): log, then delegate with next().
  //    NOT calling next() would short-circuit and block the tool call.
  ctx.on('tools/pre-execute', (exec: ToolExecution, next: () => Promise<PreToolDecision>) => {
    toolPreExecutes += 1
    console.log(`[spike-lifecycle] tools/pre-execute #${toolPreExecutes} tool=${exec.name}`)
    return next()
  })

  // ④ A non-Cordis resource (a timer) wrapped in ctx.effect().
  //    The returned disposer runs on unload — the reversible-cleanup proof.
  ctx.effect(() => {
    const timer = setInterval(() => {
      console.log(`[spike-lifecycle] heartbeat sessionEvents=${sessionEvents} toolPreExecutes=${toolPreExecutes} toolChanges=${toolChanges}`)
    }, 30_000)
    return () => {
      clearInterval(timer)
      console.log('[spike-lifecycle] DISPOSED — listeners removed, timer cleared')
    }
  })

  console.log('[spike-lifecycle] listeners registered: session/event + tools/change + tools/pre-execute')
}
```

事件 seam（`docs/event-producer-consumer.md` 是全量矩阵）：

| 派发模式 | 等待？ | 顺序 | 有返回值？ |
|---|---|---|---|
| `emit` | 否 | 注册顺序观察 | 否 |
| `waterfall` | 否 | 注册顺序（around-middleware） | 是 |
| `parallel` | 是 | 并行 | 否 |
| `serial` | 是 | 注册顺序 | 是 |

**工具执行管线**是拦截工具调用的地方：

```ts
declare module '@deepseek-ai/cordis' {
  interface Events {
    'tools/pre-execute'(this, exec, next): Promise<PreToolDecision>    // waterfall：允许/拒绝/询问
    'tools/execute'(this, exec, next): Promise<ToolExecutionResult>    // waterfall：超时/重试/指标
    'tools/post-execute'(this, exec, result, next): Promise<PostToolDecision> // waterfall：替换/拦截
    'tools/result'(this, exec, result): undefined                      // emit：观察冻结的最终结果
    'tools/change'(): void                                             // emit：工具集合变化
  }
}
```

### 2.3 Web UI 扩展 — 工具卡片与面板

Web UI 有**两个**扩展点：*工具卡片*（每个工具的渲染意图）和*面板*（通过双半插件加一整块浏览器 UI）。

#### 2.3.1 工具卡片 — `presentCall` / `presentResult`

工具可以把调用/结果渲染成**卡片（card）**而非纯文本。`presentCall` 在模型调用工具时显示一张"进行中"卡片；
`presentResult` 从持久化的 meta 重建"已完成"卡片。二者必须**纯函数**（live 流式 *和* 会话日志重放都要跑）。

```ts
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'my-webui'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'my_note',
    description: 'Write a short note to a file and show an inline diff card (Web UI extension demo).',

    parameters: {
      path: { type: 'string', required: true, description: 'Absolute path to write.' },
      content: { type: 'string', required: true, description: 'Note content.' },
    },

    output: {
      schema: {
        type: 'object',
        properties: {
          path: { type: 'string', required: true, description: 'Absolute path written.' },
          bytes: { type: 'integer', required: true, description: 'Bytes written.' },
        },
        additionalProperties: false,
      },
      render: (_args, value) => [{ type: 'text', text: `Wrote ${value.bytes} bytes to ${value.path}` }],
      // Replayable card data: combine args + canonical value so the card can be
      // rebuilt from the persisted tool/result event on replay.
      presentationMeta: (args, value) => ({ path: value.path, content: args.content }),
    },

    // Pending card (a diff card — this call creates a file, so oldText is null).
    presentCall: (args) => ({
      card: 'diff',
      title: `Write ${args.path}`,
      diffs: [{ path: args.path, oldText: null, newText: args.content }],
      locations: [{ path: args.path }],
    }),

    // Completed card: rebuild the applied hunk from the persisted meta.
    presentResult: (_args, result) => {
      const meta = result.meta as { path?: string; content?: string } | undefined
      const path = meta?.path ?? ''
      return {
        card: 'diff',
        title: `Wrote ${path}`,
        diffs: [{ path, oldText: null, newText: meta?.content ?? '' }],
      }
    },

    async execute(args) {
      const abs = resolve(args.path)
      await writeFile(abs, args.content, 'utf8')
      return { path: abs, bytes: Buffer.byteLength(args.content, 'utf8') }
    },
  }))
}
```

#### 2.3.2 面板 — 双半插件 + slot 注册

真正的浏览器面板是一个**双半插件（dual-half plugin）**：一个 npm 包里既有*宿主半*（Node 进程，
`exports["."]`）又有*浏览器半*（`exports["./client"]`）。浏览器半是一个 Cordis 插件，用
`ctx.slots.register(...)` 把一个 React 组件注册进 UI 的 **slot（插槽）**。没有单独的「panel API」——
面板就是一次 slot 注册。

`package.json` 声明浏览器半：

```jsonc
{
  "name": "panel-spike",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.js",                 // 宿主半
  "exports": {
    ".": "./lib/index.js",                // 宿主半（Node 进程）
    "./client": "./lib/client.js",        // 浏览器半（Web UI 进程）
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },
    "client": {
      "inject": [
        "@deepseek-ai/dsh-client-runtime",
        "@deepseek-ai/dsh-client-ui-slots"
      ],
      "platform": "web"
    }
  }
}
```

浏览器半（`lib/client.js`）——一段自注册的 closure factory，无需构建步骤：

```js
window.__ModuleLoader__.load({
  id: 'panel-spike',                       // 必须等于 package.json 的 name
  factory: (require) => {
    const React = require('react')         // react 是 shell 提供的模块表条目
    return {
      inject: ['slots'],                   // 注入 runtime 的 slots 服务
      apply(ctx) {
        ctx.slots.register(
          { name: 'shell.overlay', id: 'panel-spike', order: 0 },
          () => React.createElement('div', {
            style: {
              position: 'fixed', top: '16px', right: '16px', zIndex: 9999,
              background: '#0b1220', color: '#7ee787', border: '1px solid #30363d',
              borderRadius: '8px', padding: '12px 16px', fontFamily: 'monospace',
              fontSize: '14px', pointerEvents: 'auto',
            },
          }, 'panel-spike: DSH Web UI panel API OK ✓'),
        )
      },
    }
  },
})
```

宿主半（`lib/index.js`）——最小面板通常留空：

```js
export const name = 'panel-spike'
export function apply() {}
```

面板的关键事实（来自对 `npx @deepseek-ai/dsh web`（端口 3080）的真实验证）：

- **装进内置 `web` profile，别建新 profile**：`dsh plugin --profile web add ./panel-spike`。
  新 profile 默认是 *agent* profile——不带 Web UI（`@deepseek-ai/dsh-web*` 是网页**搜索**能力，不是 Web 界面）。
- **加面板用 `list` 插槽**：`shell.overlay`（浮动层）或 `sidebar.footer.action`（侧栏动作）。
  `single` 插槽（`root` / `sidebar` / `conversation` / `details`）是"整块替换"，重复注册会 throw。
- **`list` 插槽必须给 `id`**；客户端 bundle 的 `id` 必须等于包名。
- **浏览器半只注册 factory**——`apply` 在 factory 物化时才跑；不要在模块顶层做 DOM 操作。
- **宿主半负责数据**（fs / git / HTTP 路由 / SSE）；浏览器半通过 `/xxx/*` 路由拿数据。
- `apply` 抛错会炸掉整个 web shell boot——把 DOM 接线包进 try/catch 或 error boundary。

> 截图：`../research/guide-screenshots/04-web-ui-home.png`（Web UI 主页）和
> `../research/guide-screenshots/05-panel-spike.png`（`shell.overlay` 面板，右上角）。
> 完整面板参考：`research/webui-panel-api.md`。

---

## 3. 15 条设计准则

每条：规则、一句话理由（对应 Cordis 概念）、反例。

### 1 · 注册即效果 — `register` 返回 disposer / Registrations are reversible effects

**规则**：一切贡献都走 `ctx.effect()` / `ctx.on()`；`register()` 返回 disposer。
**为什么**：运行时累积逆并在卸载时按 LIFO 回放（可逆副作用）。
**反例**：在上下文之外做副作用，或丢弃 `register()` 的返回值。

### 2 · 共享状态物化为服务键，禁止全局可变态 / Reify shared state as a service key

**规则**：跨插件共享的任何状态都放在 `ctx.<key>` 服务后面。
**为什么**：插件触碰的一切都必须流经上下文，才能被跟踪和撤销。
**反例**：两个插件共同读写的模块级可变变量——卸载时泄漏，破坏隔离。

### 3 · 依赖走 `inject` 声明，不乐观查找 / Declare dependencies via `inject`

**规则**：必需服务放进插件的 `inject` 数组；loader 只在它们存在时才运行 `apply`。
**为什么**：满足性 `σ ⊨ d` 决定激活；乐观查找会重新引入 null 检查和崩溃。
**反例**：service locator 模式（`getBean` 式），每个调用点都要判空。

### 4 · 每个原子副作用配一个逆，逆必须真的撤销 / Supply an inverse per atomic effect

**规则**：`ctx.effect(() => { acquire; return cleanup })`——cleanup 必须撤销 acquire。
**为什么**：复合逆由组合推导，但运行时**不**校验每个逆。
**反例**：没有完全撤销的 cleanup（泄漏的定时器、没关的连接、留下的监听器）。

### 5 · 相关拆除放同一个 effect / Keep related teardown in one effect

**规则**：若拆除顺序要紧，把相关注册都放进单个 `ctx.effect`。
**为什么**：逆按反序复合（扭转复合），一个 effect 就能按正确顺序回卷。
**反例**：把 setup 拆成几个 effect，然后手工推理它们的 disposal 顺序。

### 6 · 集合型可交换协作用优先，顺序敏感处才用链 / Prefer commutative set-valued coeffects

**规则**：把共享注册表做成"可独立增删条目的集合"（工具、监听器）；只有顺序敏感的逻辑才用有序链。
**为什么**：可交换键让插件效果独立，可乱序、交错撤销。
**反例**：每个插件都必须插在精确位置的中间件链，无法独立移除。

### 7 · 多 provider 走 service broker / Use a service broker for multi-provider seams

**规则**：多个 provider 实现同一接口时，注入 broker 作为入口并分发给它。
**为什么**：broker 吸收 provider 切换（无 reload），获得负载均衡、滚动升级、跨进程调用。
**反例**：exclusive binding——切换实现时卸载/重载所有消费者。

### 8 · 能力封装成 seam / Encapsulate capabilities as seams

**规则**：能力 = Service Definition + Providers + Consumers；消费者依赖接口而非实现。
**为什么**：seam 是协作用键 + 值类型 + 操作集——provider 保持可插拔，卸载一个就从路由集移除。
**反例**：消费者直接 import 具体 provider 模块。

### 9 · 发射不可逆，需扣留或补偿 / Emission crosses the boundary

**规则**：获取资源（open/connect/subscribe）可逆；发射（写字节、发包、调外部 API）不可逆。
要扣留到提交，或补偿（saga 式）。
**为什么**：系统边界把"被跟踪的获取"和"未被跟踪的发射"分开。
**反例**：一个发消息或写共享文件的工具，假设运行时能在卸载时"撤销"它。

### 10 · 跨重载状态放更长命协作用 / Long-lived state lives in a dependency

**规则**：必须跨 HMR/reload 存活的状态放进寿命更长的服务。
**为什么**：重载会撤销旧 fiber 的效果、从干净状态重放；插件闭包状态不存活。
**反例**：把缓存放进插件局部变量，指望它热重载后还在。

### 11 · 依赖环 = 永久失活，不是死锁 / Avoid dependency cycles

**规则**：两个插件不能各自声明对方提供的键。
**为什么**：互相满足永远不可能成立——两者永远无法激活（可预测，但不会自愈）。
**反例**：A 依赖 B 的键、B 依赖 A 的键；应拆成单向核心 + 集成插件。

### 12 · 声明式配置走 cordis.yml + `!!js`，禁用 `!js` / Declarative config via cordis.yml

**规则**：声明式描述组合；`!!js` 标记表达式（config + `disabled`），overlay 按环境选插件。
**为什么**：加载器按字段增量协调；汇流保证静息态只依赖最终配置。
**反例**：`!js`（单叹号）——它不是表达式标签，会静默误解析。

### 13 · 消费依赖走 `ctx.<key>`，可选依赖才用 `ctx.get` / Consume declared deps via `ctx.<key>`

**规则**：用 Proxy（`ctx.<key>`）访问你 `inject` 过的服务；**可选**服务用 `ctx.get('name')`（返回 `undefined`）。
**为什么**：Proxy 在使用点强制 `inject` 声明（未声明抛 `UNDECLARED_ACCESS`）；`ctx.get` 是安全的扁平查找。
**反例**：对未声明的（可选）服务用 `ctx.<key>`——Proxy 拓扑敏感，会 throw。

### 14 · realm 隔离、interception 治理 / Isolate with realms; govern with interception

**规则**：多租户/测试/沙箱用隔离 realm；策略用拦截元数据。
**为什么**：同键在不同 realm 解析到不同值；拦截右偏，编排器不改 provider/consumer 代码即可约束访问。
**反例**：为了让两个消费者对同键取不同值而 fork provider 代码。

### 15 · 类型化事件 + 声明派发模式 / Use typed events with declared dispatch modes

**规则**：事件名走 TypeScript 声明合并；每个事件声明自己的派发模式（`@mode`）。
**为什么**：派发模式是公开契约的一部分；拦截/策略用事件，直接能力调用用 service 方法。
**反例**：字符串拼话题、无声明模式的手写 pub/sub。

---

## 4. 调试与验证工作流

下面是经过 spike 实证的精确路径（**无需** `DEEPSEEK_API_KEY` 即可跑通）。

### 4.1 脚手架

```sh
npx create-dsh-plugin my-plugin -t tool          # tool | events | webui
npx create-dsh-plugin my-events -t events --yes --verify
```

`--verify` 依次跑 `pnpm install` → `pnpm run build` → `dsh plugin add`（临时 profile）→ `dump-config grep`。
脚手架的核心价值是把 `@deepseek-ai/dsh-tools` 锁到 `next` tag 版本（见 §5.3）。

> 截图：`../research/guide-screenshots/01-scaffold-verify.png`（四步全绿）。

### 4.2 编译

```sh
cd my-plugin
pnpm install
pnpm run build          # tsc -> dist/index.js（纯 ESM）
```

### 4.3 装进 profile

```sh
# 在「父目录」执行（相对路径锚定调用目录）：
dsh plugin --profile my-profile add ./my-plugin
```

> 截图：`../research/guide-screenshots/03-plugin-add.png`（`dsh plugin add` + `--dump-config`）。

### 4.4 验证配置组装

```sh
dsh --profile my-profile --dump-config | grep my-plugin
# 预期：
#   - id: my-plugin
#     name: my-plugin
```

`--dump-config` 打印组装后的树（不 boot）；`--dump-default-config` 只打印 bundle 层。

### 4.5 boot 并观察

```sh
dsh --profile my-profile
# 观察插件自己的日志，例如：
#   [my-plugin] registered "my_tool" — listed=true
# Ctrl-C → disposer 执行：[my-plugin] DISPOSED — ...
```

### 4.6 无 key 验证事件触发

```sh
dsh plugin --profile headless add ./my-plugin
dsh --profile headless "run a probe"
# session/event 真实触发；随后模型调用报 MISSING_CREDENTIAL
# （诚实的阻塞点——你已经证明了编译 + 装载 + 事件接线）。
```

常用环境变量：`DSH_HOME`、`DEEPSEEK_API_KEY`、`DEEPSEEK_BASE_URL`、
`DSH_TOOLS_MODE`（`native`/`code`/`both`）、`DSH_PERMISSION_MODE`、`DSH_CWD`。

---

## 5. 分发与发布

### 5.1 bundle 与 profile

DSH 有两个分发概念，都在 `package.json` 的 `dsh` 键下声明：

```jsonc
// bundle：一个携带配置层的 npm 包。
{ "name": "dsh-hello-plugin", "type": "module", "main": "index.js",
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } } }

// profile：$DSH_HOME/profiles/<name> 下的一次可运行组合。
{ "dsh": { "profile": { "bundles": ["@deepseek-ai/dsh-base", "dsh-hello-plugin"] } } }
```

`cordis.patch.yml` 插入你的插件行：

```yaml
# `name` 是「包名」（通过 profile 的 node_modules 或回退 $DSH_HOME/profiles/node_modules 解析），
# 不是相对路径。
- insert:
    - id: spike-tool-time
      name: dsh-spike
    - id: spike-lifecycle-logger
      name: dsh-spike/lifecycle
```

层序（后层覆盖前层，按 `id` 整行替换）：每个 bundle 的 `cordis.patch.yml`（按 `profile.bundles` 顺序）
→ profile 自己的 `cordis.patch.yml` → `$DSH_HOME/cordis.patch.yml` → 每个 `--patch <path>` 覆盖层（argv 顺序）。

### 5.2 bundle 的 `package.json`

```json
{
  "name": "dsh-spike",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/tool-time.js",
  "exports": { ".": "./dist/tool-time.js", "./lifecycle": "./dist/lifecycle-logger.js" },
  "files": ["dist", "cordis.patch.yml"],
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } },
  "dependencies": { "@deepseek-ai/dsh-tools": "^0.1.0-rc.6" },
  "peerDependencies": { "@deepseek-ai/cordis": "^4.0.1" },
  "devDependencies": { "@deepseek-ai/cordis": "^4.0.1", "@deepseek-ai/dsh-session": "^0.1.0-rc.6", "typescript": "^5.6.0" }
}
```

### 5.3 版本坑

1. **`@deepseek-ai/dsh-tools` 锁 `next` tag 版本。** npm 的 `latest` tag 是**过期的
   `0.0.1-rc.1`**；真正的版本线是 `next`（`0.1.0-rc.x`）。裸 `npm i @deepseek-ai/dsh-tools`
   会装到坏掉的旧线。`create-dsh-plugin` 在生成时解析当前 `next` 版本并精确锁定。
2. **所有 `@deepseek-ai/dsh-*` 保持同一 `0.1.0-rc.x` 版本线**，避免 pnpm 装出两份 `dsh-tools`。
3. **`@deepseek-ai/cordis` 是 peerDependency**——只用 `import type`；运行时 `ctx` 由宿主传入。
4. **纯 ESM**（`"type": "module"`）；tsc 用 `module: esnext` + `moduleResolution: bundler` 保留裸 specifier。
5. **Node `^22.19.0 || >=24.0.0`**（旧 Node 只警告 `EBADENGINE`）。

---

## 6. FAQ — 十个最易踩的坑

1. **`@deepseek-ai/dsh-tools` 的 `latest` 是过期的。** 锁 `next` tag 版本（`^0.1.0-rc.6`）。
2. **Node 太旧。** `^22.19 || >=24`；否则只是 `EBADENGINE` 警告（无害）。
3. **`dsh-*` 版本线混用。** 全部保持同一 `0.1.0-rc.x`。
4. **运行时 import `@deepseek-ai/cordis`。** 它是 peerDependency——只用 `import type`。
5. **没写 `"type": "module"`。** 插件必须是纯 ESM。
6. **丢弃 disposer。** `ctx.tools.register`/`ctx.on` 自动 dispose；自己的定时器/连接用
   `ctx.effect(() => { ...; return cleanup })` 包起来。
7. **`dsh plugin add <dir>` 的相对路径锚定。** 在插件的**父目录**执行。
8. **`cordis.patch.yml` 的 `name` 是包名，不是相对路径。**（`dsh-spike`，不是 `./dist/tool-time.js`。）
9. **以为文件顺序 = 加载顺序。** 加载顺序由 `inject` 服务依赖决定。
10. **`tools/change` 是未过滤的注册表主体通知。** 宿主级监听器会收到**所有**工具注册/反注册——
    boot 时刷几十条属正常。
