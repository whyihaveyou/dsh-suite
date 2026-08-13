# 分类体系 / Categories

`dsh-suite` 目录把每个插件归入**一个**主能力域（11 类）。归类原则：一个插件只归一类，跨类的以「它主要增强什么」为准。

| 枚举值 enum | 中文 | 覆盖 DSH 能力域 | 收录示例 |
|---|---|---|---|
| `tools` | 工具 | 扩展 bash/fs/web/lsp/skill/todo 等工具集 | `dsh-at-file`、`dsh-custom-tool` |
| `skills` | 技能 | agent 可复用 skill 包 | 领域 skill 合集 |
| `ui` | 界面 | Web UI 扩展（conversation node / slot / 主题皮肤） | `dsh-web-ui`、`DSH-better-sidebar` |
| `session` | 会话 | 日志/检索/导出/telemetry/title | `dsh-turn-rewind`、`dsh-share` |
| `llm` | 模型 | provider 适配 / 路由 / token 计量 / 多模态 | `dsh-vision-toolkit` |
| `sandbox` | 沙箱 | 进程隔离 / 执行环境 / 远程执行 | sandbox provider |
| `orchestration` | 编排 | subagent / workflow / jobs / schedule / 多 agent 治理 | `dsh_workflow`、`mstar-harness` |
| `storage` | 存储 | 存储后端 / 设置 / 凭据 | storage provider |
| `acp` | 桥接 | ACP / 进程外协议 / 外部 GUI 远程控制 | `dsh-acp-for-bitfun` |
| `preset` | 预设 | agent preset / 领域工作流 | 科研/文献 preset |
| `utility` | 其他 | 通知 / 时间 / 杂项 / 客户端 | `dsh-notification` |

## 从 plugins-catalog.json 原始分类的映射 / Mapping from the raw catalog

Eco-Scout 的原始目录用了 13 个自由分类（`tool`/`dev-tool`/`integration`/`ui`/`skin`/`session`/`context`/`vision`/`workflow`/`agent`/`launcher`/`list`/`fun`）。规整到 11 类枚举时的映射如下（`_meta.category_mapping` 里也有一份）：

| 原始分类 raw | 规整后 enum | 说明 |
|---|---|---|
| `tool` | `tools` | 工具 |
| `dev-tool` | `tools` | 开发工具 → 工具集 |
| `integration` | `tools` | 集成外部服务 → 工具集 |
| `ui` | `ui` | 界面 |
| `skin` | `ui` | 皮肤/主题 → 界面 |
| `session` | `session` | 会话 |
| `context` | `session` | 上下文/记忆/token → 会话 |
| `vision` | `llm` | 视觉/VLM 能力 → 模型 |
| `workflow` | `orchestration` | 工作流 → 编排 |
| `agent` | `orchestration` | agent 框架 → 编排 |
| `launcher` | `utility` | 客户端/启动器 → 其他 |
| `list` | `utility` | awesome-list/教程 → 其他 |
| `fun` | `utility` | 趣味/杂项 → 其他 |

> 注意：`launcher`/`list` 类里很多不是「插件」而是客户端、awesome-list、教程——它们仍保留在目录里作生态参考，但一般不会被标记 `featured`。
