# DeepSeek Harness Plugin Development Guide

> 📖 **This book now lives in its own repo — [dsh-plugin-tutorial](https://github.com/whyihaveyou/dsh-plugin-tutorial). This file is a mirror.**

> The authoritative guide for writing plugins against **DeepSeek Harness (DSH)**, the
> "everything is a plugin" agent harness built on [Cordis](https://github.com/cordiverse/cordis).
> Every code block below comes from a verified, runnable spike or the `create-dsh-plugin` scaffold;
> no API is invented. Companion docs: `docs/migration-guide.en.md` (porting existing plugins),
> `research/cordis-paper-notes.md` (the formal theory), `research/dsh-plugin-design-principles.md` (the 15 rules).

---

## 0. TL;DR

DSH is a plugin system: model adapters, the tool registry, the session log, the sandbox, and the
agent loop itself are **all plugins**, assembled layer-by-layer from `cordis.yml`. There is no
privileged kernel — the only way to extend DSH is to mount a plugin next to it.

A plugin is a module that exports an `apply(ctx)` function. The runtime hands you a **context**
(`ctx`) through which you register tools, event listeners, commands, and resources. **Registrations
are effects** — they unwind automatically when the plugin unloads, which is what makes DSH's
plugin model safe to compose and tear down at runtime.

```ts
// The entire shape of a DSH plugin.
import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-plugin'
export const inject = ['tools']   // optional: services this plugin needs

export function apply(ctx: Context) {
  // register tools, listen to events, mount resources here
}
```

---

## 1. The plugin model

### 1.1 Everything is a plugin

DSH vendors Cordis (`@deepseek-ai/cordis` v4) and composes itself from `@deepseek-ai/dsh-*`
plugins. A **service** is a named capability mounted on a context key (`ctx.tools`, `ctx.llm`,
`ctx.sessions`, `ctx.agents`, …). A **seam** is a swappable capability with three roles:

- **Service Definition** — owns the `ctx.<key>` and its vocabulary types (e.g. `ShellExecutor`).
- **Service Provider** — one or more implementations of the definition (e.g. `bash-local`, `bash-sandbox`).
- **Consumer** — a plugin that `inject`s the service and calls it (e.g. `tool-bash`).

A plugin declares which services it needs with `inject`; the loader runs `apply` only after those
services exist. **Load order is expressed through service dependencies, never file order.**

### 1.2 Spatiotemporal composability

DSH's runtime guarantees come from the two dimensions formalized in the Cordis paper:

- **Temporal composability** (revertible effects): unloading a plugin completely and safely reverses
  every modification it made to the shared context. Every registration carries a disposer; the runtime
  accumulates them and replays them in LIFO order on unload.
- **Spatial composability** (reactive coeffects): plugins declare their dependencies, and the runtime
  reactively activates/deactivates them as providers appear, disappear, or change. A plugin whose
  dependency is missing simply stays inactive — it never crashes on a missing service.

In practice this means: **you supply the inverse of each atomic effect; the composite teardown is
derived for you, and you never write an uninstall path by hand.**

### 1.3 Glossary

| English | 中文 | Meaning |
|---|---|---|
| plugin / component | 插件 / 组件 | a module exporting `apply(ctx)` (+ optional `name`/`inject`/`Config`) |
| context | 上下文 (`ctx`) | the first-class entity through which every registration flows |
| service | 服务 | a named capability on `ctx.<key>` |
| seam | 可替换能力 | Service Definition + Providers + Consumers |
| inject | 依赖声明 | the services a plugin requires before `apply` runs |
| effect | 副作用 | a modification to the shared environment |
| revertible effect | 可逆副作用 | an effect paired with an inverse the runtime tracks |
| coeffect | 协作用 | what a plugin requires *from* its environment (a dependency) |
| reactive coeffect | 响应式协作用 | dependency satisfaction re-evaluated on every context change |
| disposer | 清理器 | the inverse returned by a registration; runs on unload |
| fiber | 纤程 | one instantiation of a plugin, with its own lifecycle state |
| bundle | bundle | an npm package carrying a config layer (`cordis.patch.yml`) |
| profile | profile | a runnable composition under `$DSH_HOME/profiles/<name>` |
| dispatch mode | 派发模式 | `emit` / `waterfall` / `parallel` / `serial` |

### 1.4 Three plugin shapes

From `docs/cordis-tutorial/01-first-plugin.md`:

```ts
import { Service, type Context } from '@deepseek-ai/cordis'

// ① Function plugin (most common): named exports, no default export.
export const name = 'hello'
export function apply(ctx: Context) {}

// ② Object plugin: an object with an apply method.
export const objectPlugin = { name: 'object-plugin', apply(ctx: Context) {} }

// ③ Class plugin: a Service subclass (when you expose a service of your own).
export class MyService extends Service {
  constructor(ctx: Context) { super(ctx, 'myService') }
}
```

> Service packages default-export the service class; function plugins named-export
> `name`/`inject`/`Config`/`apply` and **must not** have a default export.

---

## 2. The three plugin shapes, with minimal complete examples

### 2.1 Tool plugin — `defineTool()`

A tool is the plugin type an agent calls. Declare the parameter schema (auto-validated, types
`args`), the canonical JSON output, and the `execute` body:

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

> Screenshot: `../research/guide-screenshots/02-plugin-code.png` (this file rendered).

What matters here:

- **Structured return, not prose.** `output.schema` declares a canonical JSON value; `render()`
  projects it into model-facing content blocks. In Code Mode (PTC) the schema becomes
  `await tools.spike_env_time(...)` automatically.
- **Validation is free.** `parameters` is validated before `execute` runs; `args` is typed from it.
- **Reversible.** `ctx.tools.register()` returns a disposer and auto-attaches it to this plugin's
  fiber — unloading the plugin unregisters the tool.
- **Object schemas must declare `additionalProperties`.** Mark each returned field
  `required: true` so `value` stays non-optional in `render()`/`presentationMeta()`.

### 2.2 Event / lifecycle plugin — `ctx.on` + `ctx.effect`

This plugin has **zero runtime dependencies**: it only uses the `ctx` the host hands it. Every
`import type` is erased at compile time.

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

The event seam (`docs/event-producer-consumer.md` is the full matrix):

| Dispatch mode | Awaited? | Order | Return value? |
|---|---|---|---|
| `emit` | no | registration order | no |
| `waterfall` | no | registration order (around-middleware) | yes |
| `parallel` | yes | parallel | no |
| `serial` | yes | registration order | yes |

The **tool execution pipeline** is where you intercept tool calls:

```ts
declare module '@deepseek-ai/cordis' {
  interface Events {
    'tools/pre-execute'(this, exec, next): Promise<PreToolDecision>    // waterfall: allow/deny/ask
    'tools/execute'(this, exec, next): Promise<ToolExecutionResult>    // waterfall: timeout/retry/metrics
    'tools/post-execute'(this, exec, result, next): Promise<PostToolDecision> // waterfall: replace/intercept
    'tools/result'(this, exec, result): undefined                      // emit: observe the frozen result
    'tools/change'(): void                                             // emit: tool set changed
  }
}
```

### 2.3 Web UI extension — tool cards and panels

There are **two** Web UI extension points: the *tool card* (per-tool render intent) and the *panel*
(a whole new piece of browser UI via a dual-half plugin).

#### 2.3.1 Tool card — `presentCall` / `presentResult`

A tool can render its call/result as a **card** instead of plain text. `presentCall` shows a pending
card when the model calls the tool; `presentResult` rebuilds the completed card from the persisted
meta. Both must be **pure** (they run on live streaming *and* on session-log replay).

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

#### 2.3.2 Panel — a dual-half plugin with slot registration

A real browser panel is a **dual-half plugin**: one npm package with a *host half* (Node process,
`exports["."]`) and a *browser half* (`exports["./client"]`). The browser half is a Cordis plugin that
registers a React component into a UI **slot** with `ctx.slots.register(...)`. There is no separate
"panel API" — a panel is just a slot registration.

`package.json` declares the browser half:

```jsonc
{
  "name": "panel-spike",
  "version": "0.1.0",
  "type": "module",
  "main": "lib/index.js",                 // host half
  "exports": {
    ".": "./lib/index.js",                // host half (Node process)
    "./client": "./lib/client.js",        // browser half (Web UI process)
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

The browser half (`lib/client.js`) — a self-registering closure factory, no build step needed:

```js
window.__ModuleLoader__.load({
  id: 'panel-spike',                       // must equal package.json's `name`
  factory: (require) => {
    const React = require('react')         // `react` is a shell-provided module entry
    return {
      inject: ['slots'],                   // inject the runtime's slots service
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

The host half (`lib/index.js`) — usually left empty for a minimal panel:

```js
export const name = 'panel-spike'
export function apply() {}
```

Key facts about panels (from a verified spike against `npx @deepseek-ai/dsh web`, port 3080):

- **Install into the built-in `web` profile**, not a new one: `dsh plugin --profile web add ./panel-spike`.
  A new profile defaults to an *agent* profile — no Web UI (`@deepseek-ai/dsh-web*` is web *search*, not the UI).
- **Use a `list` slot** for "add a panel": `shell.overlay` (floating layer) or `sidebar.footer.action` (sidebar action).
  `single` slots (`root` / `sidebar` / `conversation` / `details`) are *replace-the-whole-thing* and throw on double registration.
- **`list` slots require an `id`**; the client bundle's `id` must equal the package `name`.
- **The browser half only registers a factory** — `apply` runs when the factory materializes; don't do DOM work at module top level.
- **The host half owns the data** (fs / git / HTTP routes / SSE); the browser half reaches it via `/xxx/*` routes.
- An `apply` that throws fails the whole web-shell boot — wrap DOM wiring in try/catch or an error boundary.

> Screenshots: `../research/guide-screenshots/04-web-ui-home.png` (Web UI home) and
> `../research/guide-screenshots/05-panel-spike.png` (the `shell.overlay` panel, top-right).
> Full panel reference: `research/webui-panel-api.md`.

---

## 3. The 15 design principles

Each principle: the rule, the one-sentence reason (mapped to a Cordis concept), and the anti-pattern.

### 1 · Registrations are reversible effects — `register` returns a disposer / 注册即效果

**Rule**: every contribution goes through `ctx.effect()` / `ctx.on()`; `register()` returns a disposer.
**Why**: the runtime accumulates inverses and replays them LIFO on unload (revertible effects).
**Anti-pattern**: side effects performed outside the context, or a `register()` whose return value you drop.

### 2 · Reify shared state as a service key, never ambient globals / 共享状态物化为协作用键

**Rule**: any state shared across plugins lives behind a `ctx.<key>` service.
**Why**: everything a plugin touches must flow through the context to be tracked and reverted.
**Anti-pattern**: a module-level mutable variable that two plugins read/write — it leaks on unload and breaks isolation.

### 3 · Declare dependencies via `inject`, never look them up optimistically / 依赖走 `inject`

**Rule**: required services go in the plugin's `inject` array; the loader runs `apply` only when they exist.
**Why**: satisfaction `σ ⊨ d` decides activation; optimistic lookups reintroduce null checks and crashes.
**Anti-pattern**: a service locator pattern (`getBean`-style) with a null check at every call site.

### 4 · Supply an inverse per atomic effect; the inverse must actually revert / 每个原子副作用配一个逆

**Rule**: `ctx.effect(() => { acquire; return cleanup })` — the cleanup must undo the acquire.
**Why**: composite inverses are derived by composition, but the runtime does **not** verify each inverse.
**Anti-pattern**: a cleanup that doesn't fully undo (a leaked timer, an unclosed connection, a listener left behind).

### 5 · Keep related teardown in one effect / 相关拆除放同一个 effect

**Rule**: if teardown order matters, do all the related registration in a single `ctx.effect`.
**Why**: inverses compose in reverse order (twisted composition), so one effect unwinds in the right sequence.
**Anti-pattern**: splitting a setup into several effects whose disposal order you then have to reason about by hand.

### 6 · Prefer commutative set-valued coeffects; reserve ordered chains / 集合型可交换协作用优先

**Rule**: make shared registries "sets of independently-addable entries" (tools, listeners); use ordered
chains only for order-sensitive logic.
**Why**: commutative keys make plugins' effects independent, so they can be reverted out-of-order and interleaved safely.
**Anti-pattern**: a middleware chain where every plugin must be inserted at a precise position and can't be removed independently.

### 7 · Use a service broker for multi-provider seams / 多 provider 走 service broker

**Rule**: when several providers implement one interface, inject a broker as the entrypoint and dispatch through it.
**Why**: the broker absorbs provider swaps (no reload), enabling load balancing, rolling updates, cross-process calls.
**Anti-pattern**: exclusive binding where switching implementations unloads/reloads every consumer.

### 8 · Encapsulate capabilities as seams / 能力封装成 seam

**Rule**: a capability = Service Definition + Providers + Consumers; consumers depend on the interface, not the impl.
**Why**: a seam is a coeffect key + value type + operation set — providers stay swappable, unloading one drops it from the routing set.
**Anti-pattern**: consumers importing a concrete provider module directly.

### 9 · Emission crosses the boundary — withhold or compensate / 发射不可逆

**Rule**: acquiring a resource (open/connect/subscribe) is reversible; emitting (writing bytes, sending
packets, calling an external API) is not. Withhold until committed, or compensate (saga-style).
**Why**: the system boundary splits tracked acquisition from untracked emission.
**Anti-pattern**: a tool that sends a message or writes to a shared file assuming the runtime can "undo" it on unload.

### 10 · Long-lived state lives in a dependency, not the plugin / 跨重载状态放更长命协作用

**Rule**: state that must survive an HMR/reload goes into a longer-lived service.
**Why**: reload reverts the old fiber's effects and reapplies from a clean slate; plugin closure state doesn't survive.
**Anti-pattern**: caching in a plugin-local variable and expecting it to survive a hot reload.

### 11 · Avoid dependency cycles: they cause permanent inactivity / 依赖环=永久失活

**Rule**: two plugins must not each declare a key the other provides.
**Why**: mutual satisfaction can never hold — both stay inactive forever (predictable, but it won't self-heal).
**Anti-pattern**: A depends on B's key and B depends on A's key; decompose into unidirectional cores + an integration plugin.

### 12 · Declarative config via cordis.yml + `!!js`, never `!js` / 声明式配置走 cordis.yml

**Rule**: describe composition declaratively; `!!js` marks an expression (config + `disabled`), overlays select plugins by environment.
**Why**: the loader reconciles per-field incrementally; confluence guarantees the quiescent state depends only on the final config.
**Anti-pattern**: `!js` (single-bang) — it is not the expression tag and silently mis-parses.

### 13 · Consume declared deps via `ctx.<key>`; `ctx.get()` is for optional lookups / 消费依赖走 `ctx.<key>`

**Rule**: access services you `inject`ed via the proxy (`ctx.<key>`); for **optional** services use `ctx.get('name')` (returns `undefined`).
**Why**: the proxy enforces your `inject` declaration at the point of use (throws `UNDECLARED_ACCESS`); `ctx.get` is a safe flat lookup.
**Anti-pattern**: using `ctx.<key>` for an un-declared (optional) service — the proxy is topology-sensitive and throws.

### 14 · Isolate with realms; govern with interception / realm 隔离、interception 治理

**Rule**: use isolation realms for multi-tenant/test/sandbox contexts; use interception metadata for policy.
**Why**: the same key can resolve differently per realm; interception is right-biased so an orchestrator can constrain access without touching provider/consumer code.
**Anti-pattern**: forking provider code just to give two consumers different values for the same key.

### 15 · Use typed events with declared dispatch modes / 类型化事件+声明派发模式

**Rule**: event names go through TypeScript declaration merging; each event declares its dispatch mode (`@mode`).
**Why**: the dispatch mode is part of the public contract; use events for interception/policy and service methods for direct capability calls.
**Anti-pattern**: a hand-rolled pub/sub with stringly-typed topics and no declared mode.

---

## 4. Debugging and verification workflow

The sequence below is the exact, spike-proven path (works **without** a `DEEPSEEK_API_KEY`).

### 4.1 Scaffold

```sh
npx create-dsh-plugin my-plugin -t tool          # tool | events | webui
npx create-dsh-plugin my-events -t events --yes --verify
```

`--verify` runs `pnpm install` then `pnpm run build` then `dsh plugin add` (temp profile) then `dump-config grep`.
The scaffold's core value is pinning `@deepseek-ai/dsh-tools` to the `next`-tag version (see §5.3).

> Screenshot: `../research/guide-screenshots/01-scaffold-verify.png` (four green steps).

### 4.2 Build

```sh
cd my-plugin
pnpm install
pnpm run build          # tsc -> dist/index.js (pure ESM)
```

### 4.3 Install into a profile

```sh
# From the PARENT directory (relative paths anchor to the invoking dir):
dsh plugin --profile my-profile add ./my-plugin
```

> Screenshot: `../research/guide-screenshots/03-plugin-add.png` (`dsh plugin add` + `--dump-config`).

### 4.4 Verify config composition

```sh
dsh --profile my-profile --dump-config | grep my-plugin
# expected:
#   - id: my-plugin
#     name: my-plugin
```

`--dump-config` prints the assembled tree without booting; `--dump-default-config` prints only the bundle layer.

### 4.5 Boot and observe

```sh
dsh --profile my-profile
# watch for the plugin's own logs, e.g.:
#   [my-plugin] registered "my_tool" — listed=true
# Ctrl-C → the disposer runs: [my-plugin] DISPOSED — ...
```

### 4.6 Prove events fire without a key

```sh
dsh plugin --profile headless add ./my-plugin
dsh --profile headless "run a probe"
# session/event fires for real; the model call then fails with MISSING_CREDENTIAL
# (the honest blocker — you've proven compile + load + event wiring).
```

Useful environment variables: `DSH_HOME`, `DEEPSEEK_API_KEY`, `DEEPSEEK_BASE_URL`,
`DSH_TOOLS_MODE` (`native`/`code`/`both`), `DSH_PERMISSION_MODE`, `DSH_CWD`.

---

## 5. Distribution and publishing

### 5.1 Bundle vs profile

DSH has two distribution concepts, both declared under the `package.json` `dsh` key:

```jsonc
// bundle: an npm package carrying a config layer.
{ "name": "dsh-hello-plugin", "type": "module", "main": "index.js",
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } } }

// profile: a runnable composition under $DSH_HOME/profiles/<name>.
{ "dsh": { "profile": { "bundles": ["@deepseek-ai/dsh-base", "dsh-hello-plugin"] } } }
```

`cordis.patch.yml` inserts your plugin row(s):

```yaml
# `name` is a PACKAGE NAME (resolved through the profile's node_modules or the
# fallback $DSH_HOME/profiles/node_modules), NOT a relative path.
- insert:
    - id: spike-tool-time
      name: dsh-spike
    - id: spike-lifecycle-logger
      name: dsh-spike/lifecycle
```

Layer order (later overrides earlier, whole-row replace by `id`): each bundle's `cordis.patch.yml`
(in `profile.bundles` order) → the profile's own `cordis.patch.yml` → `$DSH_HOME/cordis.patch.yml`
→ each `--patch <path>` overlay (argv order).

### 5.2 The bundle `package.json`

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

### 5.3 Version pitfalls

1. **Pin `@deepseek-ai/dsh-tools` to the `next`-tag version.** npm's `latest` tag is a **stale
   `0.0.1-rc.1`**; the real line is `next` (`0.1.0-rc.x`). A bare `npm i @deepseek-ai/dsh-tools`
   installs the broken old line. `create-dsh-plugin` resolves the current `next` version at
   generation time and pins it exactly.
2. **Keep every `@deepseek-ai/dsh-*` on the same `0.1.0-rc.x` line**, so pnpm doesn't install two
   copies of `dsh-tools`.
3. **`@deepseek-ai/cordis` is a peerDependency** — import `type` only; the host hands you `ctx`.
4. **Pure ESM** (`"type": "module"`); tsc with `module: esnext` + `moduleResolution: bundler` keeps bare specifiers.
5. **Node `^22.19.0 || >=24.0.0`** (older Node only warns `EBADENGINE`).

---

## 6. FAQ — the 10 pitfalls that bite

1. **`@deepseek-ai/dsh-tools` `latest` is stale.** Pin to the `next`-tag version (`^0.1.0-rc.6`).
2. **Node too old.** `^22.19 || >=24`; otherwise you get an `EBADENGINE` warning (harmless).
3. **Mixed `dsh-*` version lines.** Keep all of them on the same `0.1.0-rc.x`.
4. **Importing `@deepseek-ai/cordis` at runtime.** It's a peerDependency — `import type` only.
5. **Not `"type": "module"`.** Plugins must be pure ESM.
6. **Dropping the disposer.** `ctx.tools.register`/`ctx.on` auto-dispose; for your own timers/connections, wrap them in `ctx.effect(() => { ...; return cleanup })`.
7. **`dsh plugin add <dir>` relative-path anchoring.** Run it from the plugin's **parent** directory.
8. **`name` in `cordis.patch.yml` is a package name, not a relative path.** (`dsh-spike`, not `./dist/tool-time.js`.)
9. **Assuming file order = load order.** Load order is `inject` service dependencies.
10. **`tools/change` is an unfiltered registry-subject notification.** Host-level listeners see *every* tool register/unregister — booting emits dozens, that's normal.
