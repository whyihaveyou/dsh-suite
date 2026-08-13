# @dsh-suite/plugin-notify

> DSH 插件：回合完成 / 出错 / 待审批时，把通知推到 IM webhook + 本机系统通知。
> 社区现有 `dsh-notification` 只弹本机窗口；本插件做**远程 IM webhook**（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义），是差异化能力。

> DSH plugin: push turn-completion / error / approval notifications to IM webhooks
> plus a local system notification. Unlike `dsh-notification` (local-only popup),
> this sends **remote IM webhooks** (Feishu / WeCom / DingTalk / Slack / Discord / custom).

---

## 特性 / Features

- 监听 DSH 持久的 `session/event` 流，命中三类事件即发通知：
  - `turn/end`（reason=`completed`）→ **task_done**（回合完成，含标题 + 结果摘要 + 耗时）
  - `turn/end`（reason=`error`/`aborted`/`blocked`/`max-tokens`/`interrupted`）→ **error**
  - `approval/asked`（来自 `@deepseek-ai/dsh-user-approval`）→ **approval_requested**（待审批）
- 配置驱动，6 种通道：飞书、企业微信、钉钉、Slack、Discord、自定义（POST JSON）。
- 本机通知：macOS 走 `osascript display notification`，非 macOS 自动跳过。
- 发射是**不可逆副作用**：POST 失败只 `console.warn`，绝不重试、绝不阻塞 agent 循环。

- Listens on DSH's durable `session/event` firehose and notifies on three event kinds:
  - `turn/end` (`reason=completed`) → **task_done** (title + result summary + duration)
  - `turn/end` (`reason=error/aborted/blocked/max-tokens/interrupted`) → **error**
  - `approval/asked` (from `@deepseek-ai/dsh-user-approval`) → **approval_requested**
- Config-driven, 6 channels: Feishu, WeCom, DingTalk, Slack, Discord, custom JSON.
- Local notification via `osascript` on macOS; skipped elsewhere.
- Emission is irreversible: failed POSTs only `console.warn`, never retried, never block the loop.

---

## 安装 / Install

```sh
dsh plugin --profile <name> add @dsh-suite/plugin-notify
```

（本地开发：`dsh plugin --profile <name> add ./packages/plugins/plugin-notify`）

## 配置 / Configuration

在 profile 的 `cordis.patch.yml` 里给插件行加 `config`（Schemastery schema，见 `export const Config`）：

Add a `config` block to this plugin's row in the profile's `cordis.patch.yml`:

```yaml
- id: plugin-notify
  name: '@dsh-suite/plugin-notify'
  config:
    webhooks:
      feishu: 'https://open.feishu.cn/open-apis/bot/v2/hook/xxxx'   # 飞书
      wecom: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx'  # 企业微信
      dingtalk: 'https://oapi.dingtalk.com/robot/send?access_token=xxxx'  # 钉钉
      slack: 'https://hooks.slack.com/services/T/B/xxxx'            # Slack
      discord: 'https://discord.com/api/webhooks/xxxx/xxxx'         # Discord
      custom: 'https://example.com/hook'                            # 自定义 JSON
    events: ['task_done', 'error', 'approval_requested']            # 触发过滤，缺省三者全开
    local: true                                                     # 本机系统通知（macOS）
    timeoutMs: 5000                                                 # 单次 POST 超时
```

| 字段 / Field | 默认 / Default | 说明 / Meaning |
|---|---|---|
| `webhooks.*` | 空 / empty | 各通道 webhook 地址；留空该通道不发送 / empty = that channel disabled |
| `events` | `['task_done','error','approval_requested']` | 触发通知的事件白名单 / notification event whitelist |
| `local` | `true` | 是否发本机系统通知 / also send a local notification |
| `timeoutMs` | `5000` | 单次 webhook 超时 / per-request timeout |

## 消息格式 / Message shape

飞书/企业微信/钉钉发送 `text` 卡片，Slack 发 `{ text }`，Discord 发 `{ content }`，
`custom` 发 `{ text, kind, title, sessionId, durationMs, time }`。文本内容统一为：

Feishu/WeCom/DingTalk send a text card; Slack `{ text }`; Discord `{ content }`;
`custom` posts `{ text, kind, title, sessionId, durationMs, time }`. The text body:

```
【任务完成】帮我查一下 Kuramoto 临界指数
摘要：临界指数为 γ⁻ = γ⁺ = 1…
耗时：3 分 42 秒
会话：session-1
```

## 验证 / Verification

- ✅ 纯 ESM 编译（`pnpm build`）
- ✅ `dsh.bundle` + `cordis.patch.yml` 装载进真实 DSH profile（`--dump-config` 含本行）
- ✅ `turn/end` → 通知派发路径（缺省无 key 场景，`turn/end(reason=error)` 已触发）
- ⚠️ 真实 IM 投递（需真实 webhook URL 与外部网络）——未闭环，见下

Blocked / not closed: 本环境无真实 webhook 地址，远程投递只验证到「POST 已发起、失败仅
`console.warn`」，未验证到对方 IM 收到消息。

## 设计准则 / Design principles

遵守 `dsh-plugin-design-principles.md`：`inject` 声明依赖（#3）、`ctx.on` 注册即 effect（#1）、
发射副作用只补偿不阻塞（#9）、事件走类型化 `session/event`（#15）。
