# @dsh-suite/plugin-team-board

[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=plugin-team-board)


> DSH 插件：多 agent / subagent 共享的持久任务看板。通过一个 Cordis **服务键 `ctx.teamBoard`** 物化
> 共享状态（不是模块级全局变量），用 `defineTool` 暴露 `task_create` / `task_claim` / `task_update` /
> `task_list` / `task_delete`，并用 sessions seam 做跨重载持久化。生态位空白：`ccteam` 是独立产品，
> 没人做成 DSH 原生插件。

> DSH plugin: a shared, durable task board for multi-agent / subagent collaboration. Shared state is
> materialized as a Cordis **service key `ctx.teamBoard`** (not a module global), exposed through
> `defineTool` as `task_create` / `task_claim` / `task_update` / `task_list` / `task_delete`, and
> persisted across reload via the sessions seam. A DSH-native board — an empty niche (`ccteam` is a
> standalone product, nobody built the DSH-native one).

---

## 特性 / Features

- **共享状态 = 协作用键**（设计准则 #2/#10）：看板状态活在 `TeamBoardService`（`ctx.teamBoard`），
  跨会话/subagent 可见；插件闭包里没有全局可变态。
- **持久化走 sessions seam**：每次变更追加一个 `board/snapshot` 事件到专用 `team-board` 会话日志，
  由 base bundle 自带的 `session-persistence-jsonl` 落盘；重启后重放最后一个快照重建状态。
- **5 个工具**（`defineTool`）：创建 / 认领 / 状态流转 / 查询 / 删除。
- 注册即 effect：工具经 `ctx.tools.register` 注册，卸载自动反注册。

- **Shared state as a service key** (principles #2/#10): board state lives in `TeamBoardService`
  (`ctx.teamBoard`), visible across sessions/subagents; no module-level mutable state.
- **Persistence via the sessions seam**: every mutation appends a `board/snapshot` event to a dedicated
  `team-board` session log, stored by the base bundle's `session-persistence-jsonl`; on restart the last
  snapshot is replayed to rebuild state.
- **5 tools** (`defineTool`): create / claim / transition / query / delete.
- Registrations are effects: tools go through `ctx.tools.register` and unregister on unload.

## 任务模型 / Task model

```
{ id, subject, status: todo|doing|done, owner?, deps: string[], createdAt, updatedAt }
```

## 工具 / Tools

| 工具 / Tool | 参数 / Params | 行为 / Behavior |
|---|---|---|
| `task_create` | `subject`(必), `owner?`, `deps?` | 建任务，状态 `todo`，生成 `id` |
| `task_claim` | `id`(必), `owner?` | 认领：状态 → `doing`，owner 缺省为调用方 agent id |
| `task_update` | `id`(必), `subject?`/`status?`/`owner?`/`deps?` | 只改传入字段 |
| `task_list` | `status?`, `owner?` | 按创建时间排序，可按状态/owner 过滤 |
| `task_delete` | `id`(必) | 删除任务 |

## 安装 / Install

```sh
dsh plugin --profile <name> add @dsh-suite/plugin-team-board
```

（本地开发：`dsh plugin --profile <name> add ./packages/plugins/plugin-team-board`）

无配置项。程序化消费者可用 `ctx.teamBoard.createTask/claimTask/updateTask/listTasks` 直接调用。

No config. Programmatic consumers call `ctx.teamBoard.createTask / claimTask / updateTask / listTasks`.

## 验证 / Verification

- ✅ 纯 ESM 编译（`pnpm build`）
- ✅ 核心逻辑 smoke：`scripts/board-smoke.mjs` 15/15 断言（create/claim/update/list/delete/snapshot 回放）
- ✅ 真实装载：`dsh plugin add` → `--dump-config` 含 `team-board` 行 → headless boot
  `task_create listed=true`（Service 实例化 + 工具注册成功）
- ⚠️ 端到端「模型调 task_create → 看板状态」需 `DEEPSEEK_API_KEY`（无 key 时 headless 停在 MISSING_CREDENTIAL）
- ⚠️ 跨进程重启恢复：依赖 `session-persistence-jsonl` 回放 `team-board` 会话，未在本环境做「重启→状态还在」闭环（需持久化后端 + 真实会话）

## 设计准则 / Design principles

遵守 `dsh-plugin-design-principles.md`：共享状态物化为协作用键（#2）、长命状态放依赖不放闭包（#10）、
`inject` 声明依赖（#3）、注册即 effect（#1）、事件走类型化 `session/event` + declaration merging（#15）。

## Known Limitations / 已知局限

- MVP 为**单进程内**共享看板（跨进程/跨机器同步是 v2，架构蓝图 §5.3 已注明）。
- 看板状态以「整板快照」形式持久化（每次写 O(n)），任务量级小（几十条）时足够；海量任务可改为 per-task 事件流。
