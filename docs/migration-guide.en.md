# Migrating Claude Code / OpenClaw plugins & scripts to DeepSeek Harness

> How to port an existing Claude Code plugin, an OpenClaw plugin, or a one-off
> script into a DeepSeek Harness (DSH) plugin. Companion to
> [`create-dsh-plugin`](../packages/create-dsh-plugin/README.md) — use the
> scaffold first, then follow this guide to move your logic over.

---

## 1. The one idea you need

DSH is **"everything is a plugin"** on [Cordis](https://github.com/cordiverse/cordis).
A plugin is a module that exports an `apply(ctx)` function (or a `Service` class);
the runtime hands you a **context** (`ctx`) through which you register tools,
event listeners, commands, and resources. Registrations are *effects* — they
unwind automatically when the plugin unloads.

```ts
// The entire shape of a DSH plugin.
import type { Context } from '@deepseek-ai/cordis'

export const name = 'my-plugin'
export const inject = ['tools']   // optional: services this plugin needs

export function apply(ctx: Context) {
  // register tools, listen to events, mount resources here
}
```

Your existing plugin already decomposes into the same primitives; you are mostly
**renaming seams**, not rewriting logic.

## 2. Five-minute migration path

```sh
# 1. Scaffold the matching template (tool / events / webui).
npx create-dsh-plugin my-plugin -t tool --verify

# 2. Port your logic into src/index.ts (see §4–§6).
# 3. Build + install into a profile and boot:
pnpm install && pnpm run build
dsh plugin --profile my-profile add ./my-plugin
dsh --profile my-profile
```

## 3. Concept mapping table

| Your existing thing | DSH mechanism | Notes |
|---|---|---|
| A script / function (bash, TS, Python) the agent calls | **tool** via `defineTool()` + `ctx.tools.register` | parameter schema auto-validates + types `args` |
| Claude Code **skill** (`SKILL.md`) | DSH **skill** (`dsh-skill` registry + `skill-filesystem`) — same SKILL.md idea | or wrap it as a tool if it's really a single call |
| Claude Code **slash command** | DSH **human command** via `ctx.commands` | fires without a model turn |
| Claude Code **hook** (`PreToolUse`, `PostToolUse`, `SessionStart`, …) | DSH **event** via `ctx.on('tools/pre-execute')`, `ctx.on('tools/post-execute')`, `ctx.on('session/event')`, `ctx.on('agent/pre-step')`, … | hooks → typed events; `next()` delegates in waterfalls |
| OpenClaw **hook / middleware** | same DSH **event** seams | pick the event whose domain matches |
| OpenClaw **tool** | **tool** via `defineTool()` | return a canonical JSON value, not prose |
| **MCP server** | DSH **MCP client** (`dsh-mcp-client`) | or wrap a server as a native tool for lower latency |
| **subagent** | DSH **subagent** (`dsh-subagent` + `tool-subagent`) | providers: spawn / fork / codex / claude-code |
| **memory / persistence** | `ctx.effect()` + DSH **storage** service, or **session events** | session log is the durable source of truth |
| **background job** | `ctx.jobs` + `tool-jobs` | `run_in_background` semantics |
| config/env knobs | Schemastery **`Config`** export | validated at load time |
| distribution | **bundle** (`dsh.bundle` + `cordis.patch.yml`) + **profile** | `dsh plugin add` |

## 4. Migrating a script → a tool plugin

Say you have a script `fetch_paper.sh` (or a TS function) that takes an arXiv id and
prints metadata. Port the *body* into `execute`, and describe the I/O as schemas:

```ts
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'paper-tool'
export const inject = ['tools']

export function apply(ctx: Context) {
  ctx.tools.register(defineTool({
    name: 'fetch_paper',
    description: 'Fetch an arXiv paper\'s title, authors, and abstract by id.',
    parameters: {
      arxivId: { type: 'string', required: true, description: 'e.g. 2505.05760' },
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
      // ← your existing fetch logic goes here, verbatim.
      const meta = await fetchArxiv(args.arxivId)
      return { title: meta.title, authors: meta.authors, abstract: meta.abstract }
    },
  }))
}
```

Key differences from a bare script:

- **Structured return**, not prose: `output.schema` declares a canonical JSON value;
  `render()` turns it into model-facing text. In Code Mode (PTC) the schema becomes
  `await tools.fetch_paper(...)` automatically.
- **Validation is free**: `parameters` is validated before `execute` runs; `args` is typed.
- **Reversible**: disposing the plugin unregisters the tool (it's an effect).

## 5. Migrating a hook → an event plugin

A Claude Code `PreToolUse` / `PostToolUse` hook (or an OpenClaw middleware that
intercepts tool calls) maps to the DSH **tool execution pipeline** events:

| Your hook | DSH event | mode |
|---|---|---|
| `PreToolUse` (allow/deny/ask) | `tools/pre-execute` | waterfall |
| `PostToolUse` (rewrite/block/annotate result) | `tools/post-execute` | waterfall |
| `Notification` / session start | `session/event`, `session/created` | emit |
| `UserPromptSubmit` | `agent/pre-step` | waterfall |
| `Stop` / `SubagentStop` | `agent/turn-stopping` | serial |

```ts
import type { Context } from '@deepseek-ai/cordis'
import type { PreToolDecision, ToolExecution } from '@deepseek-ai/dsh-tools'

export const name = 'policy-hook'
export const inject = ['tools']

export function apply(ctx: Context) {
  // Waterfall: call next() to allow/delegate; return a decision to deny/ask.
  ctx.on('tools/pre-execute', (exec: ToolExecution, next: () => Promise<PreToolDecision>) => {
    if (isForbiddenTool(exec.name)) return { kind: 'deny', reason: 'blocked by policy' }
    return next()
  })

  // Emit: observe the durable session log.
  ctx.on('session/event', (session, event) => {
    if (event.type === 'tool/result') audit(event)
  })
}
```

> In a **waterfall**, listeners are around-middleware: `next()` delegates to the
> next listener; *not* calling it short-circuits. `emit` listeners are fire-and-forget
> observers.

## 6. Migrating a skill / slash command

- **Skill → DSH skill.** DSH's `dsh-skill` registry uses the same *"a markdown file
  with a name + description + body"* idea. Drop your `SKILL.md` into a skill root
  (`skill-filesystem`'s `customSkillDirs`) and it becomes model-callable via
  `tool-skill`. No code change for the content itself.
- **Slash command → human command.** Register on `ctx.commands` so a `/yourcmd`
  dispatches without a model turn (for side effects the user triggers directly).

## 7. Packaging & installing

```sh
# package.json carries the bundle manifest:
#   "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
# cordis.patch.yml inserts your plugin row(s):
#   - insert:
#       - id: my-plugin
#         name: my-package-name          # a PACKAGE name, not a relative path

dsh plugin --profile my-profile add ./my-plugin   # from the PARENT directory
dsh --profile my-profile --dump-config             # verify the layer
dsh --profile my-profile                           # boot
```

## 8. Pitfalls (the ones that bite)

1. **Pin `@deepseek-ai/dsh-tools` to the `next`-tag version** — npm `latest` is a
   stale `0.0.1-rc.1`. (`create-dsh-plugin` does this for you.)
2. **Node `^22.19 || >=24`**; older Node only warns `EBADENGINE`.
3. Keep every `@deepseek-ai/dsh-*` on the same `0.1.0-rc.x` line.
4. `@deepseek-ai/cordis` is a **peerDependency** — import `type` only.
5. Pure **ESM** (`"type": "module"`).
6. Registrations are **effects** — `ctx.tools.register`/`ctx.on` auto-dispose; wrap
   your own timers/connections in `ctx.effect(() => { …; return cleanup })`.
7. `dsh plugin add <dir>` anchors relative paths to the **invoking** directory.
8. Bundle `cordis.patch.yml` `name` is a **package name**, not a relative path.
9. Load order = **service dependencies** (`inject`), never file order.
10. A live model→tool round-trip needs `DEEPSEEK_API_KEY`; without it you can still
    prove compile + load + event wiring.

## 9. Next steps

- Full event list: `docs/event-producer-consumer.md` in the harness repo.
- Tool contract reference: `docs/cookbook/adding-a-tool.md`.
- Web UI nodes: `docs/cookbook/adding-a-conversation-node.md`.
