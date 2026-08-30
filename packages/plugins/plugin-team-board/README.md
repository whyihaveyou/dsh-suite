# @dsh-suite/plugin-team-board

[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=plugin-team-board)


> DSH 插件：多 agent / subagent 共享的持久任务看板。通过一个 Cordis **服务键 `ctx.teamBoard`** 物化
> 共享状态（不是模块级全局变量），用 `defineTool` 暴露 `task_create` / `task_claim` / `task_update` /
> `task_list` / `task_delete`，内置**可视化看板面板**（Settings → Plugins → Team Board），
> 快照文件落盘 `$DSH_HOME/team-board/board.json` 跨重启恢复。生态位空白：`ccteam` 是独立产品，
> 没人做成 DSH 原生插件。

> DSH plugin: a shared, durable task board for multi-agent / subagent collaboration. Shared state is
> materialized as a Cordis **service key `ctx.teamBoard`** (not a module global), exposed through
> `defineTool` as `task_create` / `task_claim` / `task_update` / `task_list` / `task_delete`, with a
> **visual kanban panel** (Settings → Plugins → Team Board) and restart-safe persistence via a
> snapshot file at `$DSH_HOME/team-board/board.json`. A DSH-native board — an empty niche
> (`ccteam` is a standalone product, nobody built the DSH-native one).

---

## 特性 / Features

- **共享状态 = 协作用键**（设计准则 #2/#10）：看板状态活在 `TeamBoardService`（`ctx.teamBoard`），
  跨会话/subagent 可见；插件闭包里没有全局可变态。
- **可视化看板面板**（0.2.0）：Settings → Plugins → **Team Board** tab，任务按状态三列分列
  （todo / doing / done），面板内创建任务、点卡片按钮流转状态，改动立即持久化。
- **跨重启持久化**：每次变更把整板快照写入 `$DSH_HOME/team-board/board.json`，启动时优先从该文件
  恢复；`board/snapshot` 会话事件日志保留为进程内审计轨迹（`ctx.sessions` 是纯内存存储，
  日志会话本身不保证跨进程复活，文件快照才是重启后的真相源）。
- **5 个工具**（`defineTool`）：创建 / 认领 / 状态流转 / 查询 / 删除。
- 注册即 effect：工具经 `ctx.tools.register` 注册，卸载自动反注册。

- **Shared state as a service key** (principles #2/#10): board state lives in `TeamBoardService`
  (`ctx.teamBoard`), visible across sessions/subagents; no module-level mutable state.
- **Visual kanban panel** (0.2.0): Settings → Plugins → **Team Board** tab — three status columns
  (todo / doing / done), create tasks in-panel, click a card to transition; changes persist instantly.
- **Restart-safe persistence**: every mutation writes a full-board snapshot to
  `$DSH_HOME/team-board/board.json`, which is the source of truth on boot; the `board/snapshot`
  session-event journal stays as the in-process audit trail (`ctx.sessions` is an in-memory store,
  so the journal alone does not survive a process restart — the file does).
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

## 改动 / Changelog

- **0.2.1**——DSH Web 样式契约适配（research/ui-compat-protocol.md）：面板颜色全部改经
  `--dsw-alias-*` 设计令牌引用（保留暗色字面量仅作 token 缺失时的兜底），亮色主题不再破相；
  根节点输出 `data-dsh-plugin="plugin-team-board"` + `data-dsh-surface="settings-modal"`，
  卡片/列/按钮/徽章/输入框标 `data-dsh-part`（L2 语义属性，供皮肤中心完整换肤）。
- **0.2.0**——可视化看板面板（Settings → Plugins → Team Board：三列分列 / 面板内创建 / 点按流转）；
  修复跨进程重启丢状态：`ctx.sessions` 实为纯内存存储（持久化插件只 flush 存活会话），
  仅靠 `board/snapshot` 日志在重启后恢复不了看板。现在每次变更同时写
  `$DSH_HOME/team-board/board.json` 快照文件，启动优先从文件恢复（日志保留为进程内审计）。
- **0.1.1**（issue #11）——修复部分字段更新污染快照：task_update 只传 id+status 时未显式传字段
  会带入 undefined 键，跟着 spread 进任务并写进 board/snapshot，使 append-only JSONL 无法序列化、
  看板「坏掉」。修法：`update()` 只合并 `undefined` 被过滤的字段；`snapshot()` 对所有任务做
  strip-undefined 规范化（历史污染记录重载自愈）。回归于 scripts/board-smoke.mjs（断言缩到
  「快照可序列化 + 无 undefined」，不依赖狭义的存储内键集）。

## 验证 / Verification

- ✅ 纯 ESM 编译（`pnpm build`）
- ✅ 核心逻辑 smoke：`scripts/board-smoke.mjs` 15/15 断言（create/claim/update/list/delete/snapshot 回放）
- ✅ 真实装载：`dsh plugin add` → `--dump-config` 含 `team-board` 行 → headless boot
  `task_create listed=true`（Service 实例化 + 工具注册成功）
- ✅ 面板实测（0.2.0，playwright）：Team Board tab 渲染、三列分列、面板内创建、点按改状态（API 复核
  已持久化）、页面重开状态保持；截图 research/team-board-screenshots/
- ✅ 跨进程重启恢复（0.2.0）：kill 进程 → 重启 → `/team-board/list` 从 `board.json` 复原全部任务
- ⚠️ 端到端「模型调 task_create → 看板状态」需 `DEEPSEEK_API_KEY`（无 key 时 headless 停在 MISSING_CREDENTIAL）

## 设计准则 / Design principles

遵守 `dsh-plugin-design-principles.md`：共享状态物化为协作用键（#2）、长命状态放依赖不放闭包（#10）、
`inject` 声明依赖（#3）、注册即 effect（#1）、事件走类型化 `session/event` + declaration merging（#15）。

## Known Limitations / 已知局限

- MVP 为**单进程内**共享看板（跨进程/跨机器同步是 v2，架构蓝图 §5.3 已注明）。
- 看板状态以「整板快照」形式持久化（每次写 O(n)），任务量级小（几十条）时足够；海量任务可改为 per-task 事件流。
