# dsh-suite

![GitHub stars](https://img.shields.io/github/stars/whyihaveyou/dsh-suite?style=flat-square&color=facc15)
![Plugins](https://img.shields.io/badge/plugins-167-facc15?style=flat-square)
![Daily compat](https://img.shields.io/github/actions/workflow/status/whyihaveyou/dsh-suite/compat.yml?branch=main&label=daily-compat-check&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square)

> 🌐 中文 · [English](README.md)

**别再翻 `dsh-plugin` topic 了，这里都是还能跑的插件。**

`dsh-suite` 是 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）插件的**中英双语精选目录**——每天用 CI 对照最新 DSH 版本重测一遍兼容性——外加 `create-dsh-plugin` 脚手架和几个自研插件。

![demo：一条命令生成并验证一个 DSH 插件](site/assets/demo.gif)

---

## 为什么做 dsh-suite

DSH 发布时没有官方插件 registry。现在找插件只能翻 GitHub 的 `dsh-plugin` topic（50+ 个零散小插件）和当天冒出来的几个静态 awesome-list——而 DSH 自己还在发**破坏性变更**（breaking changes）。

所以我们做了三件事：

1. **一个「活」目录**——每个条目挂 DSH 兼容性徽章，CI 每天对照最新 DSH 版本重测（三层验证，全程无需 API key）。
2. **一个脚手架**——`npm create dsh-plugin` 一条命令生成可跑的 `dsh.bundle` + Cordis 骨架。官方没给脚手架，而「怎么迁移我的插件」是社区呼声最高的需求之一。
3. **几个自研插件**——不是纯搬运，有第一方产出。

## 快速开始

```bash
# 1. 从目录安装一个插件
dsh plugin --profile demo add <包名>

# 2. 造一个自己的插件
npm create dsh-plugin@latest my-plugin
```

## 📚 插件目录

<!-- CATALOG:START -->
### ⭐ 精选

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 88 | ⚪ unknown | DSH Web UI 插件与皮肤合集：任务板、Git 面板等 |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 35 | ⚪ unknown | Skill 驱动的 Harness/Loop 工程工作流插件 |
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 28 | ⚪ unknown | 给纯文本模型加视觉：图片问答、长截图 OCR、UI 还原 |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 19 | ⚪ unknown | 侧边栏完整工作台：文件渲染/终端/Git/子代理 |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 16 | ⚪ unknown | Monaco 编辑器创建沙箱 JS 工具 |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 16 | ⚪ unknown | 把 Claude Code 的 UltraCode 模式带给 DSH，多 Agent 调度可治理 |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 13 | ⚪ unknown | 自定义「鲸鱼娘」思考状态的显示 |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 12 | ⚪ unknown | DSH Web 鲸鱼娘皮肤系列（深海女仆工坊） |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 9 | ⚪ unknown | 对话回退：回滚会话与工作区状态 |
| [distill](https://github.com/LoserFox/distill) | 7 | ⚪ unknown | 自动对话蒸馏：后台 subagent 反省 + 技能更新 |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 6 | ⚪ unknown | DSH 对话分享插件 |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 5 | ⚪ unknown | BitFun 与 DSH ACP 交互对接 |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 0 | 🟢 ok | 把 append-only 会话日志导出成人读的 Markdown / HTML，按来源分组渲染（系统提示 / 思维链 / 工具调用 / 子agent）。 |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 0 | 🟢 ok | 一键脚手架生成 DeepSeek Harness (DSH) 插件：tool / events / webui 三套模板、next 标签版本锁定、内置 --verify 冒烟测试。 |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 0 | 🟢 ok | 回合完成 / 出错 / 待审批时，把通知推到 IM webhook（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义）+ 本机系统通知。 |

### 🧰 工具

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [open-managed-agents](https://github.com/openma-ai/open-managed-agents) | 226 | ⚪ unknown | Claude Managed Agents API 的开源自托管平台（Cloudflare Workers） |
| [role-model](https://github.com/try-works/role-model) | 99 | ⚪ unknown | 按任务把请求路由到「正确的模型」（本地/云） |
| [irmia_devkit_open](https://github.com/irmia2026/irmia_devkit_open) | 39 | ⚪ unknown | Python 开发工具包（无描述） |
| [HoloGram](https://github.com/834063245-creator/HoloGram) | 23 | ⚪ unknown | 3D 代码依赖拓扑图生成器（14 语言） |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 16 | ⚪ unknown | Monaco 编辑器创建沙箱 JS 工具 |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 5 | ⚪ unknown | BitFun 与 DSH ACP 交互对接 |
| [fabric](https://github.com/omdsh-dev/fabric) | 5 | ⚪ unknown | 类似 MC Fabric 的 hook 处理器 |
| [dsh-git-identity](https://github.com/LoserFox/dsh-git-identity) | 4 | ⚪ unknown | git 提交固定使用环境作者身份 |
| [Hypr-Agent-Protal](https://github.com/gfhdhytghd/Hypr-Agent-Protal) | 4 | ⚪ unknown | Hyprland 的 Computer Use MCP |
| [telegram](https://github.com/LoserFox/telegram) | 4 | ⚪ unknown | Telegram Bot API 桥接（长轮询） |
| [agent-knock-knock](https://github.com/scotthuang/agent-knock-knock) | 2 | ⚪ unknown | OpenClaw 插件：共享 tmux 控制本地 Codex/Claude Code |
| [dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) | 2 | ⚪ unknown | bash 输出编码自动识别（UTF-16LE/UTF-8/GBK） |
| [dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) | 2 | ⚪ unknown | 连数据库、写 SQL 的插件 |
| [dsh-doctor](https://github.com/coppynight/dsh-doctor) | 2 | ⚪ unknown | flutter-doctor 风格诊断与安全自动修复 |
| [dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) | 2 | ⚪ unknown | 跨实例消息/事件交接插件 |
| [dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) | 2 | ⚪ unknown | OpenBiliClaw 内容推荐 Agent 接入 DSH |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 2 | ⚪ unknown | 扫描插件仓库清单协议/patch 格式/构建陷阱 |
| [dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) | 2 | ⚪ unknown | 本机安全审计：配置/插件来源/会话/网络暴露面 |
| [dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) | 2 | ⚪ unknown | CSV 解析/查询/统计/转换工具 |
| [dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) | 2 | ⚪ unknown | 零依赖工具包合集（time/encoding/json/csv/regex） |
| [atomstudio](https://github.com/AtomicsLaboratory/atomstudio) | 1 | ⚪ unknown | 可执行文档工程环境 |
| [dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 1 | ⚪ unknown | 通过 cc-connect 远程使用 DSH |
| [dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) | 1 | ⚪ unknown | Mnemon 三层记忆体深度集成 |
| [dsh-paseo](https://github.com/renat3u/dsh-paseo) | 1 | ⚪ unknown | DSH 的 paseo 插件扩展支持 |
| [dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) | 1 | ⚪ unknown | DSH 插件开发踩坑档案（skill+文档） |
| [dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) | 1 | ⚪ unknown | 安全数学表达式求值器 |
| [dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) | 1 | ⚪ unknown | 文本/JSON/CSV/Markdown 结构化 diff |
| [dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) | 1 | ⚪ unknown | base64/hex/url 编解码 + 哈希工具 |
| [dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) | 1 | ⚪ unknown | JMESPath JSON 查询工具 |
| [dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) | 1 | ⚪ unknown | HTML↔Markdown 转换、GFM 表格规范化 |
| [dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) | 1 | ⚪ unknown | 正则测试/捕获/安全替换工具 |
| [dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) | 1 | ⚪ unknown | JSON Schema 验证工具 |
| [dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) | 1 | ⚪ unknown | 描述统计/百分位/相关性工具 |
| [dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) | 1 | ⚪ unknown | ISO 8601/时区/日历运算时间工具 |
| [dsh-trace](https://github.com/vibeinging/dsh-trace) | 1 | ⚪ unknown | DSH 遥测后端：导出轮次/步骤/工具 |
| [sandbox-micro](https://github.com/omdsh-dev/sandbox-micro) | 1 | ⚪ unknown | microsandbox 支持 |
| [zotero-harvest](https://github.com/Fisfzy/zotero-harvest) | 1 | ⚪ unknown | Zotero 文献采集入库插件（OpenAlex/arXiv/Crossref） |
| [dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) | 0 | ⚪ unknown | DSH 运维工具箱：每日快照 A/B 双槽轮换、一键回滚 |
| [dsh-inspect](https://github.com/omdsh-dev/dsh-inspect) | 0 | ⚪ unknown | 检查→修复→复查的对抗式闭环插件 |
| [dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) | 0 | ⚪ unknown | OpenMAIC：课堂/幻灯片/交互式组件 |
| [dsh-plugin-mineru](https://github.com/HuanLinOTO/dsh-plugin-mineru) | 0 | ⚪ unknown | MineRU 文档解析工具 |
| [dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) | 0 | ⚪ unknown | 编辑用户与内置系统提示段（实时预览） |
| [dsh-scholar](https://github.com/lzszq/dsh-scholar) | 0 | ⚪ unknown | dsh-scholar（文献相关） |
| [dsh-ssh](https://github.com/UynajGI/dsh-ssh) | 0 | ⚪ unknown | SSH 远程执行：ProxyJump 链、SFTP |
| [dsh-tool-search](https://github.com/vibeinging/dsh-tool-search) | 0 | ⚪ unknown | 按 agent 按需工具发现与渐进 schema 披露 |
| [dsh-webbridge](https://github.com/bill9109/dsh-webbridge) | 0 | ⚪ unknown | DSH 结合 Kimi WebBridge |
| [ego-browser](https://github.com/Fisfzy/ego-browser) | 0 | ⚪ unknown | 把 ego-lite 浏览器接入 DSH（给 Agent 用的 Chromium） |
| [math-lean](https://github.com/Fisfzy/math-lean) | 0 | ⚪ unknown | Lean 内核验证的数学推理插件 |
| [plugin-template](https://github.com/omdsh-dev/plugin-template) | 0 | ⚪ unknown | 官方 turtle ui 仓库派生的插件模板 |
| [Qwen-MM-Plugins](https://github.com/omdsh-dev/Qwen-MM-Plugins) | 0 | ⚪ unknown | Qwen-MM-Plugins 支持 |
| [sandbox-mxc](https://github.com/omdsh-dev/sandbox-mxc) | 0 | ⚪ unknown | 微软跨平台沙盒支持 |
| [sandbox-nono](https://github.com/omdsh-dev/sandbox-nono) | 0 | ⚪ unknown | nono 沙盒支持 |
| [web-components](https://github.com/omdsh-dev/web-components) | 0 | ⚪ unknown | web-components 支持 |
| [zotero-wave-rag](https://github.com/Fisfzy/zotero-wave-rag) | 0 | ⚪ unknown | 面向 Zotero 论文库的浪潮式 RAG 检索 |

### 🎨 界面

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 88 | ⚪ unknown | DSH Web UI 插件与皮肤合集：任务板、Git 面板等 |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 19 | ⚪ unknown | 侧边栏完整工作台：文件渲染/终端/Git/子代理 |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 13 | ⚪ unknown | 自定义「鲸鱼娘」思考状态的显示 |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 12 | ⚪ unknown | DSH Web 鲸鱼娘皮肤系列（深海女仆工坊） |
| [dsh-focus-chat](https://github.com/dingyi222666/dsh-focus-chat) | 3 | ⚪ unknown | 「聚焦会话」精简会话视图 |
| [dsh-side-panel](https://github.com/ccq1/dsh-side-panel) | 3 | ⚪ unknown | DSH 侧边栏：文件浏览器、终端、Git 审查 |
| [dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) | 2 | ⚪ unknown | 会话进度条：todos 进度/实时 token 速率 |
| [dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) | 2 | ⚪ unknown | 全手绘像素鲸鱼伙伴插件 |
| [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) | 1 | ⚪ unknown | 选中批注：选文字→批注→随消息发送 |
| [dsh-chat-width](https://github.com/chen-001/dsh-chat-width) | 1 | ⚪ unknown | 调整 DSH 回复宽度 |
| [dsh-companion](https://github.com/william-jin-cmu/dsh-companion) | 1 | ⚪ unknown | 常驻桌面助手：全局唤起/定时自动化/插件市场 |
| [dsh-genui](https://github.com/omdsh-dev/dsh-genui) | 1 | ⚪ unknown | 会话内联渲染交互式 UI 组件 |
| [dsh-input-history](https://github.com/lhh010/dsh-input-history) | 1 | ⚪ unknown | Ctrl+Up/Down 召回已发送消息 |
| [dsh-navbar](https://github.com/vlln/dsh-navbar) | 1 | ⚪ unknown | 对话节点导航条（右缘节点串跳转） |
| [dsh-paste-input](https://github.com/lhh010/dsh-paste-input) | 1 | ⚪ unknown | Ctrl+V 粘贴/拖拽/选文件增强 |
| [dsh-plugin-background](https://github.com/gameswu/dsh-plugin-background) | 1 | ⚪ unknown | DSH 壁纸插件 |
| [tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) | 1 | ⚪ unknown | 仿同花顺的webui插件 |
| [dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) | 0 | ⚪ unknown | 模仿 Excel 的 DSH 皮肤 |
| [dsh-deeplink](https://github.com/qyw233/dsh-deeplink) | 0 | ⚪ unknown | 深链插件：?session=/?workspace= 直接打开 |
| [dsh-diff-viewer](https://github.com/lehhair/dsh-diff-viewer) | 0 | ⚪ unknown | PiUI 风格 diff 查看器，替换原生 DiffBlock |
| [dsh-drag-and-drop](https://github.com/bill9109/dsh-drag-and-drop) | 0 | ⚪ unknown | 跨平台文件拖拽与原始路径插入 |
| [dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) | 0 | ⚪ unknown | QQ2006 皮肤插件 |
| [dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) | 0 | ⚪ unknown | 会话完成等四状态通知 |
| [dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | 0 | ⚪ unknown | 键盘优先的命令面板 |
| [dsh-ths-skin](https://github.com/AdamPlatin123/dsh-ths-skin) | 0 | ⚪ unknown | 同花顺行情终端风格皮肤 + K 线面板 |
| [dsh-tps](https://github.com/Small-tailqwq/dsh-tps) | 0 | ⚪ unknown | TPS 皮肤插件 |
| [dsh-ultra-ui](https://github.com/havingautism/dsh-ultra-ui) | 0 | ⚪ unknown | (无描述) |
| [dsh-web-ui-notify](https://github.com/bill9109/dsh-web-ui-notify) | 0 | ⚪ unknown | DSH 桌面通知提醒 |
| [ex-setting](https://github.com/omdsh-dev/ex-setting) | 0 | ⚪ unknown | DSH 设置扩展 |
| [whale-girl](https://github.com/vlln/whale-girl) | 0 | ⚪ unknown | QQ 宠物形态的桌面宠物插件 |

### 💬 会话

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [pi-discuss-mode](https://github.com/zwrong/pi-discuss-mode) | 11 | ⚪ unknown | Pi Coding Agent 的只读讨论模式 |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 9 | ⚪ unknown | 对话回退：回滚会话与工作区状态 |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 6 | ⚪ unknown | DSH 对话分享插件 |
| [dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) | 5 | ⚪ unknown | 分支式消息编辑、reroll、版本时间线 |
| [dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) | 2 | ⚪ unknown | 上下文注入审计：AGENTS.md/技能/tool schema token 成本 |
| [dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) | 2 | ⚪ unknown | 多帧 zstd 会话文件帧级扫描诊断 |
| [dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) | 1 | ⚪ unknown | 自进化：agent 在会话内给自己长出/剪掉能力 |
| [dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) | 1 | ⚪ unknown | 跨会话长期记忆 + 后台自我进化（纯插件） |
| [dsh-web-archive](https://github.com/renat3u/dsh-web-archive) | 1 | ⚪ unknown | 折叠对话中无用消息（Think/Bash 等） |
| [deepseek-manners](https://github.com/Moeblack/deepseek-manners) | 0 | ⚪ unknown | 给每条消息后注入感谢语 |
| [dsh-agent-budget](https://github.com/vibeinging/dsh-agent-budget) | 0 | ⚪ unknown | 原生 agent 树 token 预算插件 |
| [dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) | 0 | ⚪ unknown | 分享任意段落对话 |
| [dsh-kb-sieve](https://github.com/omdsh-dev/dsh-kb-sieve) | 0 | ⚪ unknown | 可审计知识库打包（references + SQLite） |
| [dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) | 0 | ⚪ unknown | 本地优先的会话故障复盘 |
| [dsh-session-search](https://github.com/Tieboyh/dsh-session-search) | 0 | ⚪ unknown | 无索引跨 agent 会话搜索 |
| [dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) | 0 | ⚪ unknown | 侧会话插件：/side 持续性 + /btw 一次性 |
| [dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) | 0 | ⚪ unknown | 手动审批（Manual/Ask 模式） |
| [dsh-turn-navigator](https://github.com/vibeinging/dsh-turn-navigator) | 0 | ⚪ unknown | DSH Web 轮次导航插件 |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 0 | 🟢 ok | 把 append-only 会话日志导出成人读的 Markdown / HTML，按来源分组渲染（系统提示 / 思维链 / 工具调用 / 子agent）。 |

### 🧠 模型

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 28 | ⚪ unknown | 给纯文本模型加视觉：图片问答、长截图 OCR、UI 还原 |
| [Deepseek-omnimodal](https://github.com/good-boy4069/Deepseek-omnimodal) | 2 | ⚪ unknown | 面向纯文本 Agent 的开源多模态 MCP |
| [dsh-computer-use](https://github.com/Anionex/dsh-computer-use) | 2 | ⚪ unknown | 电脑控制插件（Accessibility 观测 + 作用域权限） |
| [dsh-vision](https://github.com/william-jin-cmu/dsh-vision) | 1 | ⚪ unknown | view_image 工具桥接任意 OpenAI 兼容 VLM |

### 🎛️ 编排

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [openhanako](https://github.com/liliMozi/openhanako) | 5975 | ⚪ unknown | 带记忆、人格与自主性的个人 AI 智能体 |
| [exo](https://github.com/exoharness/exo) | 639 | ⚪ unknown | 可递归自编辑自身的 agent+harness 架构 |
| [synergy](https://github.com/SII-Holos/synergy) | 542 | ⚪ unknown | 面向 Open Agentic Web 的通用智能体 |
| [ccteam](https://github.com/firstintent/ccteam) | 142 | ⚪ unknown | 把 Claude Code/Codex/Grok/Kimi 编成团队，Telegram/飞书指挥 |
| [MateBot](https://github.com/aresbit/MateBot) | 46 | ⚪ unknown | claudeclaw 复刻 |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 35 | ⚪ unknown | Skill 驱动的 Harness/Loop 工程工作流插件 |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 16 | ⚪ unknown | 把 Claude Code 的 UltraCode 模式带给 DSH，多 Agent 调度可治理 |
| [agents-go](https://github.com/zzir/agents-go) | 13 | ⚪ unknown | Go 语言多 agent 框架 |
| [distill](https://github.com/LoserFox/distill) | 7 | ⚪ unknown | 自动对话蒸馏：后台 subagent 反省 + 技能更新 |
| [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 5 | ⚪ unknown | AgentTeams 插件 |
| [dsh-automation](https://github.com/titanwings/dsh-automation) | 1 | ⚪ unknown | 让任务按计划在全新 Session 中运行定时任务 |
| [dsh-loop](https://github.com/vlln/dsh-loop) | 1 | ⚪ unknown | 定时循环（/loop 命令 + loop 工具） |
| [dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | 1 | ⚪ unknown | 计划批注：选中计划原文逐条批注 |
| [dsh-task-status](https://github.com/vlln/dsh-task-status) | 1 | ⚪ unknown | 后台任务状态条（进度 + 实时 tail） |
| [dsh-work](https://github.com/vibeinging/dsh-work) | 1 | ⚪ unknown | 本地优先 DSH 插件工作台 |
| [dsh-advisor](https://github.com/btspoony/dsh-advisor) | 0 | ⚪ unknown | 第二模型被动审查每轮并注入建议 |
| [dsh-artifact](https://github.com/william-jin-cmu/dsh-artifact) | 0 | ⚪ unknown | 文件交付协议：send_artifact 工具 |
| [dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) | 0 | ⚪ unknown | 自适应深度研究编排插件 |
| [dsh-explain](https://github.com/yuezengwu/dsh-explain) | 0 | ⚪ unknown | 本地优先学习模式：跨会话全局学习线程 |
| [dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) | 0 | ⚪ unknown | 基于角色的模型重试备用策略 |
| [dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | 0 | ⚪ unknown | 条件驱动唤醒：持久文件/命令/http 触发 |
| [dsh-track](https://github.com/fakechris/dsh-track) | 0 | ⚪ unknown | 嵌入式任务管理引擎：决策点协议、Linear 形 issue |
| [eragear-code-copilot](https://github.com/TongDucThanhNam/eragear-code-copilot) | 0 | ⚪ unknown | 空壳仓库（无描述） |

### 🧷 其他

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [EchoBird](https://github.com/edison7009/EchoBird) | 3012 | ⚪ unknown | 一键安装+切换 Claude Code/Codex/Kimi/Qwen 等 20+ 编码智能体 |
| [awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) | 51 | ⚪ unknown | DSH 插件目录，带每日兼容性跟踪 |
| [deepseek-harness-applicants](https://github.com/Octo-o-o-o/deepseek-harness-applicants) | 48 | ⚪ unknown | DSH 内测申请者名单 |
| [awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 24 | ⚪ unknown | DSH 生态精选：插件、工具与基建 |
| [dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) | 22 | ⚪ unknown | DSH 终端 UI（TUI） |
| [agent-skills](https://github.com/GitHubxsy/agent-skills) | 20 | ⚪ unknown | 面向 AI 编码智能体的可复用 skills 合集 |
| [dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) | 18 | ⚪ unknown | Codex-style @file mentions for DeepSeek Harness: search workspace files in the composer and attach their contents to prompts. |
| [dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) | 18 | ⚪ unknown | Open DeepSeek Harness workspace directories in VS Code directly from the web GUI. |
| [dsh-notification](https://github.com/omdsh-dev/dsh-notification) | 16 | ⚪ unknown | Desktop notifications for DeepSeek Harness turn completions, with per-outcome controls and include/exclude keyword rules. |
| [dsh-ads](https://github.com/Nagi-ovo/dsh-ads) | 15 | ⚪ unknown | 2005 年中文站点风格侧栏广告插件（恶搞） |
| [dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) | 10 | ⚪ unknown | DSH 内测收官合影墙：GitHub OAuth 零权限登录 + 冻结白名单校验的拍立得合影站（含 DSH Skill 包装） |
| [dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) | 8 | ⚪ unknown | OpenPencil design preview and editing plugin for DSH |
| [oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) | 8 | ⚪ unknown | 可扩展的 macOS DSH 工作台（原生 PTY） |
| [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize) | 6 | ⚪ unknown | 对话内生成式 UI：把交互式 HTML 卡片画进会话 |
| [awesome-DSH-plugin](https://github.com/Alex-Yanggg/awesome-DSH-plugin) | 4 | ⚪ unknown | 精选 DSH 插件/扩展/工具列表 |
| [oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) | 4 | ⚪ unknown | 面向 DSH 的插件生态（700+ 插件） |
| [dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) | 3 | ⚪ unknown | 在 DSH 里与 AI 下五子棋 |
| [dsh-web-review](https://github.com/CanglongCl/dsh-web-review) | 3 | ⚪ unknown | DeepSeek Harness Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。 |
| [dsh-emoji](https://github.com/hellodigua/dsh-emoji) | 2 | ⚪ unknown | 为 AI 回复自动添加表情 |
| [dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) | 2 | ⚪ unknown | 用 grok-build 的 TUI 跑 DSH |
| [dsh-stock-market](https://github.com/AnacondaKC/dsh-stock-market) | 2 | ⚪ unknown | 写代码时账户同时亏钱的恶搞插件 |
| [Top](https://github.com/xiaohai-78/Top) | 2 | ⚪ unknown | dsh-external 插件生态每日榜单 |
| [awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 1 | ⚪ unknown | 双语 DSH 插件生态完整列表 |
| [dsh-launcher](https://github.com/Ruler4396/dsh-launcher) | 1 | ⚪ unknown | 基于 WebView2 的 DSH 启动器 |
| [dsh-minigames](https://github.com/lhh010/dsh-minigames) | 1 | ⚪ unknown | 右侧小游戏面板（18 款离线小游戏） |
| [dsh-stickers](https://github.com/william-jin-cmu/dsh-stickers) | 1 | ⚪ unknown | 双向表情贴纸插件 |
| [oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) | 1 | ⚪ unknown | DeepSeek harness 插件集 |
| [orbis](https://github.com/icodesign/orbis) | 1 | ⚪ unknown | DSH 远程控制的移动客户端 |
| [plugin-registry](https://github.com/vlln/plugin-registry) | 1 | ⚪ unknown | DSH 插件生态基建：浏览器面板管理官方 repository 插件 |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 0 | 🟢 ok | 一键脚手架生成 DeepSeek Harness (DSH) 插件：tool / events / webui 三套模板、next 标签版本锁定、内置 --verify 冒烟测试。 |
| [dsh-101](https://github.com/bill9109/dsh-101) | 0 | ⚪ unknown | DSH 文档阅读模式 |
| [dsh-desktop-electron](https://github.com/Void0312Aurora/dsh-desktop-electron) | 0 | ⚪ unknown | 跨平台 Electron 桌面壳（托盘常驻） |
| [dsh-douyin](https://github.com/AnacondaKC/dsh-douyin) | 0 | ⚪ unknown | 侧栏短视频插件（原生播放器） |
| [dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) | 0 | ⚪ unknown | DSH 一键启动器（Windows 便携免安装） |
| [dsh-notebooks](https://github.com/havingautism/dsh-notebooks) | 0 | ⚪ unknown | (无描述) |
| [dsh-plugin-d399](https://github.com/HuanLinOTO/dsh-plugin-d399) | 0 | ⚪ unknown | 模型生成时弹出小游戏菜单 |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 0 | 🟢 ok | 回合完成 / 出错 / 待审批时，把通知推到 IM webhook（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义）+ 本机系统通知。 |

> 徽章含义：🟢 兼容 · 🔴 不兼容 · ⚪ 未实测 · ⚫ 弃坑。
> 共 167 个条目，按分类分表、类内按 ⭐ 降序。收录 / 字段词典见 [docs/catalog-schema.md](docs/catalog-schema.md)。
<!-- CATALOG:END -->

## 兼容性

每个条目带一枚徽章，CI 每天对照最新 DSH 版本重测（静态 peer 比对 → 安装检查 → 配置组装，三层均无需 key）：

| 徽章 | 含义 |
|---|---|
| 🟢 ok | 已实测与最新 DSH 版本兼容 |
| 🔴 broken | 与最新 DSH 版本不兼容 |
| ⚪ unknown | 尚未实测（首次收录） |
| ⚫ unmaintained | 上游已弃坑 |

机器可读的每日结果见 [`data/compat-report.json`](data/compat-report.json)，工作流见 [`.github/workflows/compat.yml`](.github/workflows/compat.yml)。

## 🧩 自研插件

| 插件 | 说明 |
|---|---|
| `@dsh-suite/plugin-notify` | 回合完成/出错时发 IM webhook 通知（飞书 / Slack / Discord / 自定义）+ 本机弹窗 |
| `@dsh-suite/plugin-session-export` | 把人读的 Markdown / HTML 会话导出（官方只导 raw JSONL） |
| `@dsh-suite/plugin-team-board` | 轻量多 agent 任务板（路线图中） |

## 🛠 create-dsh-plugin

```bash
npm create dsh-plugin@latest
```

交互式脚手架，多套模板 + Claude Code / MCP 迁移指南，见 [`docs/migration-guide.zh-CN.md`](docs/migration-guide.zh-CN.md)。

## 贡献

收录目录条目、提交插件，或阅读 [15 条插件设计准则](CONTRIBUTING.md)。收录标准与提交流程见 [`CONTRIBUTING.md`](CONTRIBUTING.md)；想提名新条目，用[收录申请](.github/ISSUE_TEMPLATE/plugin-submission.md)模板开 issue。

## 路线图

- **现在（MVP）**——目录 + 兼容性 CI（第一层）+ 脚手架 + 2 个自研插件。
- **接下来**——安装 / 配置组装两层兼容验证、star 自动刷新、迁移指南、`plugin-team-board`。

## License

[MIT](LICENSE) © 2026 whyihaveyou

---

## 📚 文档

- [贡献指南](CONTRIBUTING.md)——收录标准、提交流程与 15 条插件设计准则
- [文档](docs/)——字段词典、分类体系与迁移指南
