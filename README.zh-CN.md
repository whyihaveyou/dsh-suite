# dsh-suite

![GitHub stars](https://img.shields.io/github/stars/whyihaveyou/dsh-suite?style=flat-square&color=facc15)
![Plugins](https://img.shields.io/badge/plugins-538-facc15?style=flat-square)
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
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 654 | ⚪ unknown | DSH Web UI 插件与皮肤合集：任务板、Git 面板等 |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 207 | ⚪ unknown | 侧边栏完整工作台：文件渲染/终端/Git/子代理 |
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 182 | ⚪ unknown | 给纯文本模型加视觉：图片问答、长截图 OCR、UI 还原 |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 159 | ⚪ unknown | DSH Web 鲸鱼娘皮肤系列（深海女仆工坊） |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 39 | ⚪ unknown | Skill 驱动的 Harness/Loop 工程工作流插件 |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 37 | ⚪ unknown | 把 Claude Code 的 UltraCode 模式带给 DSH，多 Agent 调度可治理 |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 23 | ⚪ unknown | 对话回退：回滚会话与工作区状态 |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 21 | ⚪ unknown | 自定义「鲸鱼娘」思考状态的显示 |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 18 | ⚪ unknown | Monaco 编辑器创建沙箱 JS 工具 |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 12 | ⚪ unknown | DSH 对话分享插件 |
| [distill](https://github.com/LoserFox/distill) | 12 | ⚪ unknown | 自动对话蒸馏：后台 subagent 反省 + 技能更新 |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun 与 DSH ACP 交互对接 |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 把 append-only 会话日志导出成人读的 Markdown / HTML，按来源分组渲染（系统提示 / 思维链 / 工具调用 / 子agent）。 |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 一键脚手架生成 DeepSeek Harness (DSH) 插件：tool / events / webui 三套模板、next 标签版本锁定、内置 --verify 冒烟测试。 |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 回合完成 / 出错 / 待审批时，把通知推到 IM webhook（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义）+ 本机系统通知。 |

### 🧰 工具

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [open-managed-agents](https://github.com/openma-ai/open-managed-agents) | 230 | ⚪ unknown | Claude Managed Agents API 的开源自托管平台（Cloudflare Workers） |
| [role-model](https://github.com/try-works/role-model) | 99 | ⚪ unknown | 按任务把请求路由到「正确的模型」（本地/云） |
| [irmia_devkit_open](https://github.com/irmia2026/irmia_devkit_open) | 39 | ⚪ unknown | Python 开发工具包（无描述） |
| [HoloGram](https://github.com/834063245-creator/HoloGram) | 23 | ⚪ unknown | 3D 代码依赖拓扑图生成器（14 语言） |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 18 | ⚪ unknown | Monaco 编辑器创建沙箱 JS 工具 |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun 与 DSH ACP 交互对接 |
| [fabric](https://github.com/omdsh-dev/fabric) | 8 | ⚪ unknown | 类似 MC Fabric 的 hook 处理器 |
| [dsh-git-identity](https://github.com/LoserFox/dsh-git-identity) | 7 | ⚪ unknown | git 提交固定使用环境作者身份 |
| [Hypr-Agent-Protal](https://github.com/gfhdhytghd/Hypr-Agent-Protal) | 4 | ⚪ unknown | Hyprland 的 Computer Use MCP |
| [telegram](https://github.com/LoserFox/telegram) | 6 | ⚪ unknown | Telegram Bot API 桥接（长轮询） |
| [agent-knock-knock](https://github.com/scotthuang/agent-knock-knock) | 2 | ⚪ unknown | OpenClaw 插件：共享 tmux 控制本地 Codex/Claude Code |
| [dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) | 4 | ⚪ unknown | bash 输出编码自动识别（UTF-16LE/UTF-8/GBK） |
| [dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) | 5 | ⚪ unknown | 连数据库、写 SQL 的插件 |
| [dsh-doctor](https://github.com/coppynight/dsh-doctor) | 3 | ⚪ unknown | flutter-doctor 风格诊断与安全自动修复 |
| [dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) | 16 | ⚪ unknown | 跨实例消息/事件交接插件 |
| [dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) | 9 | ⚪ unknown | OpenBiliClaw 内容推荐 Agent 接入 DSH |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 11 | ⚪ unknown | 扫描插件仓库清单协议/patch 格式/构建陷阱 |
| [dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) | 8 | ⚪ unknown | 本机安全审计：配置/插件来源/会话/网络暴露面 |
| [dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) | 3 | ⚪ unknown | CSV 解析/查询/统计/转换工具 |
| [dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) | 10 | ⚪ unknown | 零依赖工具包合集（time/encoding/json/csv/regex） |
| [atomstudio](https://github.com/AtomicsLaboratory/atomstudio) | 1 | ⚪ unknown | 可执行文档工程环境 |
| [dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 2 | ⚪ unknown | 通过 cc-connect 远程使用 DSH |
| [dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) | 3 | ⚪ unknown | Mnemon 三层记忆体深度集成 |
| [dsh-paseo](https://github.com/renat3u/dsh-paseo) | 2 | ⚪ unknown | DSH 的 paseo 插件扩展支持 |
| [dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) | 8 | ⚪ unknown | DSH 插件开发踩坑档案（skill+文档） |
| [dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) | 3 | ⚪ unknown | 安全数学表达式求值器 |
| [dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) | 2 | ⚪ unknown | 文本/JSON/CSV/Markdown 结构化 diff |
| [dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) | 2 | ⚪ unknown | base64/hex/url 编解码 + 哈希工具 |
| [dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) | 2 | ⚪ unknown | JMESPath JSON 查询工具 |
| [dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) | 2 | ⚪ unknown | HTML↔Markdown 转换、GFM 表格规范化 |
| [dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) | 2 | ⚪ unknown | 正则测试/捕获/安全替换工具 |
| [dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) | 2 | ⚪ unknown | JSON Schema 验证工具 |
| [dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) | 2 | ⚪ unknown | 描述统计/百分位/相关性工具 |
| [dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) | 2 | ⚪ unknown | ISO 8601/时区/日历运算时间工具 |
| [dsh-trace](https://github.com/vibeinging/dsh-trace) | 2 | ⚪ unknown | DSH 遥测后端：导出轮次/步骤/工具 |
| [sandbox-micro](https://github.com/omdsh-dev/sandbox-micro) | 2 | ⚪ unknown | microsandbox 支持 |
| [zotero-harvest](https://github.com/Fisfzy/zotero-harvest) | 3 | ⚪ unknown | Zotero 文献采集入库插件（OpenAlex/arXiv/Crossref） |
| [dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) | 5 | ⚪ unknown | DSH 运维工具箱：每日快照 A/B 双槽轮换、一键回滚 |
| [dsh-inspect](https://github.com/omdsh-dev/dsh-inspect) | 2 | ⚪ unknown | 检查→修复→复查的对抗式闭环插件 |
| [dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) | 4 | ⚪ unknown | OpenMAIC：课堂/幻灯片/交互式组件 |
| [dsh-plugin-mineru](https://github.com/HuanLinOTO/dsh-plugin-mineru) | 5 | ⚪ unknown | MineRU 文档解析工具 |
| [dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) | 2 | ⚪ unknown | 编辑用户与内置系统提示段（实时预览） |
| [dsh-scholar](https://github.com/lzszq/dsh-scholar) | 4 | ⚪ unknown | dsh-scholar（文献相关） |
| [dsh-ssh](https://github.com/UynajGI/dsh-ssh) | 1 | ⚪ unknown | SSH 远程执行：ProxyJump 链、SFTP |
| [dsh-tool-search](https://github.com/vibeinging/dsh-tool-search) | 1 | ⚪ unknown | 按 agent 按需工具发现与渐进 schema 披露 |
| [dsh-webbridge](https://github.com/bill9109/dsh-webbridge) | 1 | ⚪ unknown | DSH 结合 Kimi WebBridge |
| [ego-browser](https://github.com/Fisfzy/ego-browser) | 4 | ⚪ unknown | 把 ego-lite 浏览器接入 DSH（给 Agent 用的 Chromium） |
| [math-lean](https://github.com/Fisfzy/math-lean) | 1 | ⚪ unknown | Lean 内核验证的数学推理插件 |
| [plugin-template](https://github.com/omdsh-dev/plugin-template) | 4 | ⚪ unknown | 官方 turtle ui 仓库派生的插件模板 |
| [Qwen-MM-Plugins](https://github.com/omdsh-dev/Qwen-MM-Plugins) | 1 | ⚪ unknown | Qwen-MM-Plugins 支持 |
| [sandbox-mxc](https://github.com/omdsh-dev/sandbox-mxc) | 1 | ⚪ unknown | 微软跨平台沙盒支持 |
| [sandbox-nono](https://github.com/omdsh-dev/sandbox-nono) | 2 | ⚪ unknown | nono 沙盒支持 |
| [web-components](https://github.com/omdsh-dev/web-components) | 1 | ⚪ unknown | web-components 支持 |
| [zotero-wave-rag](https://github.com/Fisfzy/zotero-wave-rag) | 1 | ⚪ unknown | 面向 Zotero 论文库的浪潮式 RAG 检索 |
| [modsearch](https://github.com/liustack/modsearch) | 65 | ⚪ unknown | DeepSeek Harness 的联网搜索插件。 |
| [dsh-browser](https://github.com/Lum1104/dsh-browser) | 33 | ⚪ unknown | Chrome 侧边栏扩展，让 DSH 操控浏览器。 |
| [dsh-openapi](https://github.com/Degurechaff57/dsh-openapi) | 4 | ⚪ unknown | 安全 OpenAPI 3.x 发现与 API 调用工具。 |
| [dsh-better-browser](https://github.com/titanwings/dsh-better-browser) | 3 | ⚪ unknown | 通过 Kimi WebBridge 让 agent 操作用户已登录浏览器。 |
| [dsh-worktree](https://github.com/FlashingChen/dsh-worktree) | 3 | ⚪ unknown | Codex 风格永久 git worktree 插件。 |
| [graycode-for-dsh](https://github.com/Komeiji-Shiki/graycode-for-dsh) | 3 | ⚪ unknown | graycode 编码工具。 |
| [dsh-expression](https://github.com/yyh-001/dsh-expression) | 2 | ⚪ unknown | 找得到、发得出 —— DSH 表情包插件：语义搜图，只发真实文件，走 companion QQ 通道 |
| [dsh-director-toolkit](https://github.com/lhmd/dsh-director-toolkit) | 2 | ⚪ unknown | dsh-director-toolkit — DSH 插件（工具） |
| [codex-plugin-dsh](https://github.com/wingoo/codex-plugin-dsh) | 2 | ⚪ unknown | codex-plugin-dsh — DSH 插件（工具） |
| [dsh-prompt-persona](https://github.com/Xilin3/dsh-prompt-persona) | 2 | ⚪ unknown | dsh-prompt-persona — DSH 插件（工具） |
| [dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) | 2 | ⚪ unknown | dsh-tool-policy — DSH 插件（工具） |
| [dsh-plugin-graph](https://github.com/erduotong/dsh-plugin-graph) | 2 | ⚪ unknown | 一个Deepseek Harness的插件关系图谱可视化插件 |
| [dsh-research-notes](https://github.com/fff122/dsh-research-notes) | 2 | ⚪ unknown | dsh-research-notes — DSH 插件（工具） |
| [nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) | 2 | ⚪ unknown | nowledge-mem-deepseek-harness — DSH 插件（工具） |
| [dsh-vsc-integration](https://github.com/HarcoChen/dsh-vsc-integration) | 2 | ⚪ unknown | dsh-vsc-integration — DSH 插件（工具） |
| [dsh-safe-delete](https://github.com/Qintsg/dsh-safe-delete) | 2 | ⚪ unknown | dsh-safe-delete — DSH 插件（工具） |
| [dsh-plugins](https://github.com/HackSing/dsh-plugins) | 2 | ⚪ unknown | dsh-plugins — DSH 插件（工具） |
| [dsh-report-html](https://github.com/hccccc01333/dsh-report-html) | 2 | ⚪ unknown | dsh-report-html — DSH 插件（工具） |
| [dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) | 2 | ⚪ unknown | dsh-openai-codex-auth — DSH 插件（工具） |
| [dsh-github-connector](https://github.com/kaziii/dsh-github-connector) | 2 | ⚪ unknown | dsh-github-connector — DSH 插件（工具） |
| [deepseek-pet](https://github.com/keleus/deepseek-pet) | 2 | ⚪ unknown | 在你的deepseek-harness上养一只吃白饭的大蓝鲸 |
| [dsh-index](https://github.com/Sunrisepeak/dsh-index) | 2 | ⚪ unknown | dsh-index — DSH 插件（工具） |
| [dsh-web-search-firecrawl](https://github.com/yangzhe1003/dsh-web-search-firecrawl) | 2 | ⚪ unknown | dsh-web-search-firecrawl — DSH 插件（工具） |
| [dsh-plugin-template](https://github.com/bugmaker2/dsh-plugin-template) | 2 | ⚪ unknown | dsh-plugin-template — DSH 插件（工具） |
| [dsh-composer-history](https://github.com/PerryLink/dsh-composer-history) | 1 | ⚪ unknown | dsh-composer-history — DSH 插件（工具） |
| [dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) | 1 | ⚪ unknown | DSH 行情跑马灯插件：可自选标的的加密/汇率/A股/指数/港美股跑马灯，免 key 数据源，宿主代理+缓存 |
| [jumpserver-dsh](https://github.com/jumpserver-east/jumpserver-dsh) | 1 | ⚪ unknown | jumpserver-dsh — DSH 插件（工具） |
| [dsh-browser](https://github.com/ben7am1n/dsh-browser) | 1 | ⚪ unknown | dsh-browser — DSH 插件（工具） |
| [dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) | 1 | ⚪ unknown | dsh-dev-actions — DSH 插件（工具） |
| [dsh-plugin-doctor](https://github.com/lin-cheng-lab/dsh-plugin-doctor) | 1 | ⚪ unknown | DSH 插件体检：安装前检查 peer 版本兼容性，防止 rc 不匹配崩溃 🩺 |
| [deepseek-harness-background](https://github.com/czzzlq/deepseek-harness-background) | 1 | ⚪ unknown | deepseek-harness-background — DSH 插件（工具） |
| [task-passport](https://github.com/dongsheng123132/task-passport) | 1 | ⚪ unknown | task-passport — DSH 插件（工具） |
| [dsh-prompt-presets](https://github.com/fff122/dsh-prompt-presets) | 1 | ⚪ unknown | dsh-prompt-presets — DSH 插件（工具） |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 1 | ⚪ unknown | dsh-hub — DSH 插件（工具） |
| [dsh-plugin-colorscheme](https://github.com/Civitasv/dsh-plugin-colorscheme) | 1 | ⚪ unknown | dsh-plugin-colorscheme — DSH 插件（工具） |
| [dsh-scout](https://github.com/omdsh-dev/dsh-scout) | 1 | ⚪ unknown | 面向 DeepSeek Harness 的只读环境探测插件，为智能体提供运行环境、软件版本、系统资源、端口、服务、硬件及工作区信息。 |
| [dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) | 1 | ⚪ unknown | dsh-screenshot-diff — DSH 插件（工具） |
| [dsh-turn-index](https://github.com/Simon314620/dsh-turn-index) | 1 | ⚪ unknown | deepseek harness的侧边栏对话轮次索引插件 |
| [dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) | 1 | ⚪ unknown | dsh-mobile-control — DSH 插件（工具） |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 1 | ⚪ unknown | dsh-hub — DSH 插件（工具） |
| [dsh-tool-monitor](https://github.com/yoke233/dsh-tool-monitor) | 1 | ⚪ unknown | dsh-tool-monitor — DSH 插件（工具） |
| [dsh-suggest-prompt](https://github.com/studyzy/dsh-suggest-prompt) | 1 | ⚪ unknown | dsh-suggest-prompt — DSH 插件（工具） |
| [dsh-cloudflare-browser-run](https://github.com/RealAlexandreAI/dsh-cloudflare-browser-run) | 1 | ⚪ unknown | dsh-cloudflare-browser-run — DSH 插件（工具） |
| [safe-find-dsh-plugins](https://github.com/Jinsong-Zhou/safe-find-dsh-plugins) | 1 | ⚪ unknown | safe-find-dsh-plugins — DSH 插件（工具） |
| [dsh-all-search](https://github.com/RealAlexandreAI/dsh-all-search) | 1 | ⚪ unknown | dsh-all-search — DSH 插件（工具） |
| [dsh-plugin-pixluna](https://github.com/PixLunaLab/dsh-plugin-pixluna) | 1 | ⚪ unknown | dsh-plugin-pixluna — DSH 插件（工具） |
| [dsh-plugins-hub](https://github.com/TYEclipse/dsh-plugins-hub) | 1 | ⚪ unknown | dsh-plugins-hub — DSH 插件（工具） |
| [dsh-huadongbianzuqi](https://github.com/zjl88858/dsh-huadongbianzuqi) | 1 | ⚪ unknown | DeepSeek Harness的滑动变祖器插件 |
| [dsh-soul-md](https://github.com/Scorp1o117/dsh-soul-md) | 1 | ⚪ unknown | dsh-soul-md — DSH 插件（工具） |
| [dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) | 1 | ⚪ unknown | dsh-daily-fortune — DSH 插件（工具） |
| [dsh-plugin-rag](https://github.com/YYTbit/dsh-plugin-rag) | 1 | ⚪ unknown | dsh-plugin-rag — DSH 插件（工具） |
| [dsh-model-selector](https://github.com/bitterSmilezzz/dsh-model-selector) | 1 | ⚪ unknown | dsh-model-selector — DSH 插件（工具） |
| [dsh-github](https://github.com/PerryLink/dsh-github) | 1 | ⚪ unknown | dsh-github — DSH 插件（工具） |
| [dsh-plugin-review](https://github.com/Mingxi2077/dsh-plugin-review) | 1 | ⚪ unknown | dsh-plugin-review — DSH 插件（工具） |
| [dsh-turn-budget](https://github.com/randerous/dsh-turn-budget) | 1 | ⚪ unknown | dsh-turn-budget — DSH 插件（工具） |
| [DIzzy-DSH](https://github.com/Acidmoon/DIzzy-DSH) | 1 | ⚪ unknown | DIzzy-DSH — DSH 插件（工具） |
| [dsh-file-explorer](https://github.com/schhaohao/dsh-file-explorer) | 1 | ⚪ unknown | dsh-file-explorer — DSH 插件（工具） |
| [dsh-tool-reqpipe](https://github.com/sikwoxy/dsh-tool-reqpipe) | 1 | ⚪ unknown | dsh-tool-reqpipe — DSH 插件（工具） |
| [dsh-ajw](https://github.com/rsagacom/dsh-ajw) | 1 | ⚪ unknown | DS安甲网 (ds.ajw.cn) · 为你的 DeepSeek Harness 机器人 安装上所需功能的装甲吧 — 每日聚合 DeepSeek Harness / DSH 插件生态开源项目 |
| [dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) | 1 | ⚪ unknown | dsh-fun-typewriter — DSH 插件（工具） |
| [dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) | 1 | ⚪ unknown | dsh-port-guard — DSH 插件（工具） |
| [qiushi-dsh-evidence-audit](https://github.com/030611/qiushi-dsh-evidence-audit) | 1 | ⚪ unknown | qiushi-dsh-evidence-audit — DSH 插件（工具） |
| [dsh-plugin.github.io](https://github.com/dsh-plugin/dsh-plugin.github.io) | 1 | ⚪ unknown | dsh-plugin.github.io — DSH 插件（工具） |
| [dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) | 1 | ⚪ unknown | dsh-weixin — DSH 插件（工具） |
| [dsh-lens-lite](https://github.com/ben7am1n/dsh-lens-lite) | 1 | ⚪ unknown | dsh-lens-lite — DSH 插件（工具） |
| [dsh-tavily-search](https://github.com/zhouzhencheng07/dsh-tavily-search) | 1 | ⚪ unknown | dsh-tavily-search — DSH 插件（工具） |
| [dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) | 1 | ⚪ unknown | dsh-sticky-disclosure — DSH 插件（工具） |
| [dsh-openai-codex-oauth](https://github.com/dyuan311/dsh-openai-codex-oauth) | 1 | ⚪ unknown | dsh-openai-codex-oauth — DSH 插件（工具） |
| [dshx](https://github.com/why913/dshx) | 1 | ⚪ unknown | dshx — DSH 插件（工具） |
| [dsh-reloader](https://github.com/lin-cheng-lab/dsh-reloader) | 1 | ⚪ unknown | DSH 一键重启：装完插件说一句 reload 就自动重启生效，不用手动 Ctrl+C 🔄 |
| [dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) | 1 | ⚪ unknown | dsh-bisect-debug — DSH 插件（工具） |
| [dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) | 1 | ⚪ unknown | DSH Web里的自走棋插件：人机对战或双AI对弈 |
| [dsh-turn-meta](https://github.com/randerous/dsh-turn-meta) | 1 | ⚪ unknown | dsh-turn-meta — DSH 插件（工具） |
| [dsh-tool-browser](https://github.com/MashedPotato817/dsh-tool-browser) | 1 | ⚪ unknown | dsh-tool-browser — DSH 插件（工具） |
| [dsh-music-plugin](https://github.com/syy-shark/dsh-music-plugin) | 1 | ⚪ unknown | dsh-music-plugin — DSH 插件（工具） |
| [dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) | 1 | ⚪ unknown | dsh-batch-regression — DSH 插件（工具） |
| [dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) | 1 | ⚪ unknown | dsh-browser-control — DSH 插件（工具） |
| [dsh-code-ide](https://github.com/SakalioLabs/dsh-code-ide) | 1 | ⚪ unknown | dsh-code-ide — DSH 插件（工具） |
| [matlab-modelsim-vivado-plugin](https://github.com/sjscy05/matlab-modelsim-vivado-plugin) | 1 | ⚪ unknown | matlab-modelsim-vivado-plugin — DSH 插件（工具） |
| [dsh-codex](https://github.com/Yan-Zero/dsh-codex) | 1 | ⚪ unknown | dsh-codex — DSH 插件（工具） |
| [dsh-plugins](https://github.com/0sour/dsh-plugins) | 0 | ⚪ unknown | dsh-plugins — DSH 插件（工具） |
| [dsh-2origin](https://github.com/dongsheng123132/dsh-2origin) | 0 | ⚪ unknown | dsh-2origin — DSH 插件（工具） |
| [dsh-terminal](https://github.com/ZgblKylin/dsh-terminal) | 0 | ⚪ unknown | dsh-terminal — DSH 插件（工具） |
| [dsh-survey](https://github.com/jinhuang712/dsh-survey) | 0 | ⚪ unknown | 问卷式批量提问插件 for DeepSeek Harness：一次性问 10+ 题（单选/多选/是否 toggle/对比题/开放题），可跳过、全屏浮层、提交后对半 recap |
| [deepseek-harness-plugin-manager](https://github.com/hrhgit/deepseek-harness-plugin-manager) | 0 | ⚪ unknown | deepseek-harness-plugin-manager — DSH 插件（工具） |
| [dsh-co-authored-by](https://github.com/shelken/dsh-co-authored-by) | 0 | ⚪ unknown | dsh-co-authored-by — DSH 插件（工具） |
| [DSH-Plugs](https://github.com/JustGenius-s/DSH-Plugs) | 0 | ⚪ unknown | DSH-Plugs — DSH 插件（工具） |
| [dsh-host-web-compat](https://github.com/kelai141/dsh-host-web-compat) | 0 | ⚪ unknown | dsh 宿主插件——经 webserver 钩子向页面注入旧内核浏览器 polyfill。 |
| [dsh-doctor](https://github.com/jorinyang/dsh-doctor) | 0 | ⚪ unknown | dsh-doctor — DSH 插件（工具） |
| [dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) | 0 | ⚪ unknown | dsh-code-intel — DSH 插件（工具） |
| [dsh-doctor](https://github.com/asdf17128/dsh-doctor) | 0 | ⚪ unknown | dsh-doctor — DSH 插件（工具） |
| [dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) | 0 | ⚪ unknown | dsh-backup-sync — DSH 插件（工具） |
| [dsh-auto](https://github.com/simon300000/dsh-auto) | 0 | ⚪ unknown | dsh-auto — DSH 插件（工具） |
| [dsh-annotate](https://github.com/BrambleXu/dsh-annotate) | 0 | ⚪ unknown | dsh-annotate — DSH 插件（工具） |
| [dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) | 0 | ⚪ unknown | dsh-codex-connect — DSH 插件（工具） |
| [DSH-Decktop](https://github.com/JustGenius-s/DSH-Decktop) | 0 | ⚪ unknown | DSH-Decktop — DSH 插件（工具） |
| [dsh-cad-review](https://github.com/dongsheng123132/dsh-cad-review) | 0 | ⚪ unknown | dsh-cad-review — DSH 插件（工具） |
| [dsh-xai](https://github.com/MirDie/dsh-xai) | 0 | ⚪ unknown | dsh-xai — DSH 插件（工具） |
| [dsh-academic-research](https://github.com/userInner/dsh-academic-research) | 0 | ⚪ unknown | dsh-academic-research — DSH 插件（工具） |
| [dsh-plugin-hello](https://github.com/xu1132/dsh-plugin-hello) | 0 | ⚪ unknown | dsh-plugin-hello — DSH 插件（工具） |
| [deepseek-harness-rs](https://github.com/Tokimorphling/deepseek-harness-rs) | 0 | ⚪ unknown | deepseek-harness-rs — DSH 插件（工具） |
| [dsh-prompt-enhancer](https://github.com/Fishsb/dsh-prompt-enhancer) | 0 | ⚪ unknown | DeepSeek Harness DSH 提示词增强插件：✨ 一键优化草稿 |
| [dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) | 0 | ⚪ unknown | dsh-specflow — DSH 插件（工具） |
| [dsh-plugins](https://github.com/ohtokaah-sys/dsh-plugins) | 0 | ⚪ unknown | dsh-plugins — DSH 插件（工具） |
| [dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) | 0 | ⚪ unknown | dsh-verification-receipt — DSH 插件（工具） |
| [dsh-tool-chaos](https://github.com/cyanseek/dsh-tool-chaos) | 0 | ⚪ unknown | dsh-tool-chaos — DSH 插件（工具） |
| [dsh-robotic-harness](https://github.com/dingkaihu63/dsh-robotic-harness) | 0 | ⚪ unknown | dsh-robotic-harness — DSH 插件（工具） |
| [dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) | 0 | ⚪ unknown | dsh-codex-subscription — DSH 插件（工具） |
| [dsh-sticky-note](https://github.com/Meredith2328/dsh-sticky-note) | 0 | ⚪ unknown | DSH 便签插件：随手记点子/感想/TODO，Markdown 预览 + 快捷键 + 历史归档，存储路径可配置 |
| [dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) | 0 | ⚪ unknown | dsh-gen3d — DSH 插件（工具） |
| [dsh-mdbox](https://github.com/Chi-hong22/dsh-mdbox) | 0 | ⚪ unknown | dsh-mdbox — DSH 插件（工具） |
| [dsh-kanban](https://github.com/isolat-3k/dsh-kanban) | 0 | ⚪ unknown | 一个Hermes风格的看板插件，在deepseek harness上使用 |
| [dsh-tool-git](https://github.com/lxj808624/dsh-tool-git) | 0 | ⚪ unknown | dsh-tool-git — DSH 插件（工具） |
| [dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) | 0 | ⚪ unknown | dsh-header-status — DSH 插件（工具） |
| [dsh-mcp-manager](https://github.com/1a125/dsh-mcp-manager) | 0 | ⚪ unknown | dsh-mcp-manager — DSH 插件（工具） |
| [dsh-tray](https://github.com/qing3a/dsh-tray) | 0 | ⚪ unknown | dsh-tray — DSH 插件（工具） |

### 🧩 技能

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) | 4 | ⚪ unknown | 构建与测试 DeepSeek Harness 插件的 Agent skills。 |
| [dsh-plugin-codex-bridge](https://github.com/YYTbit/dsh-plugin-codex-bridge) | 2 | ⚪ unknown | dsh-plugin-codex-bridge — DSH 插件（技能） |
| [dsh-plugin-opencode-bridge](https://github.com/YYTbit/dsh-plugin-opencode-bridge) | 2 | ⚪ unknown | dsh-plugin-opencode-bridge — DSH 插件（技能） |
| [dsh-plugin-pi-bridge](https://github.com/YYTbit/dsh-plugin-pi-bridge) | 2 | ⚪ unknown | dsh-plugin-pi-bridge — DSH 插件（技能） |
| [dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) | 2 | ⚪ unknown | dsh-plugins-raincode — DSH 插件（技能） |
| [dsh-skill-manager](https://github.com/bitterSmilezzz/dsh-skill-manager) | 1 | ⚪ unknown | dsh-skill-manager — DSH 插件（技能） |
| [dsh-plugin-auto-docs](https://github.com/YYTbit/dsh-plugin-auto-docs) | 1 | ⚪ unknown | dsh-plugin-auto-docs — DSH 插件（技能） |
| [dsh-plugin-code-review](https://github.com/YYTbit/dsh-plugin-code-review) | 1 | ⚪ unknown | dsh-plugin-code-review — DSH 插件（技能） |
| [dsh-find-skill](https://github.com/Moximxxx/dsh-find-skill) | 1 | ⚪ unknown | dsh-find-skill — DSH 插件（技能） |
| [spike-faye-lei-dsh-skills](https://github.com/spike-faye-lei/spike-faye-lei-dsh-skills) | 1 | ⚪ unknown | spike-faye-lei-dsh-skills — DSH 插件（技能） |
| [dsh-academic-skill](https://github.com/TohsakaRIN521/dsh-academic-skill) | 1 | ⚪ unknown | academic-paper-completion 旨在补全你将要发表的文章中除了理论计算数值分析的其余部分,减少或消除ai引用幻觉 |
| [dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) | 0 | ⚪ unknown | dsh-seismicx — DSH 插件（技能） |
| [rpg-maker-mac-skill](https://github.com/HomophonicFate/rpg-maker-mac-skill) | 0 | ⚪ unknown | rpg-maker-mac-skill — DSH 插件（技能） |
| [dsh-skill-manager](https://github.com/JimmyJin2006/dsh-skill-manager) | 0 | ⚪ unknown | 在设置界面管理你已有的技能！ |

### 🎨 界面

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 654 | ⚪ unknown | DSH Web UI 插件与皮肤合集：任务板、Git 面板等 |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 207 | ⚪ unknown | 侧边栏完整工作台：文件渲染/终端/Git/子代理 |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 21 | ⚪ unknown | 自定义「鲸鱼娘」思考状态的显示 |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 159 | ⚪ unknown | DSH Web 鲸鱼娘皮肤系列（深海女仆工坊） |
| [dsh-focus-chat](https://github.com/dingyi222666/dsh-focus-chat) | 7 | ⚪ unknown | 「聚焦会话」精简会话视图 |
| [dsh-side-panel](https://github.com/ccq1/dsh-side-panel) | 9 | ⚪ unknown | DSH 侧边栏：文件浏览器、终端、Git 审查 |
| [dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) | 6 | ⚪ unknown | 会话进度条：todos 进度/实时 token 速率 |
| [dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) | 17 | ⚪ unknown | 全手绘像素鲸鱼伙伴插件 |
| [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) | 19 | ⚪ unknown | 选中批注：选文字→批注→随消息发送 |
| [dsh-chat-width](https://github.com/chen-001/dsh-chat-width) | 3 | ⚪ unknown | 调整 DSH 回复宽度 |
| [dsh-companion](https://github.com/william-jin-cmu/dsh-companion) | 3 | ⚪ unknown | 常驻桌面助手：全局唤起/定时自动化/插件市场 |
| [dsh-genui](https://github.com/omdsh-dev/dsh-genui) | 20 | ⚪ unknown | 会话内联渲染交互式 UI 组件 |
| [dsh-input-history](https://github.com/lhh010/dsh-input-history) | 3 | ⚪ unknown | Ctrl+Up/Down 召回已发送消息 |
| [dsh-navbar](https://github.com/vlln/dsh-navbar) | 4 | ⚪ unknown | 对话节点导航条（右缘节点串跳转） |
| [dsh-paste-input](https://github.com/lhh010/dsh-paste-input) | 5 | ⚪ unknown | Ctrl+V 粘贴/拖拽/选文件增强 |
| [dsh-plugin-background](https://github.com/gameswu/dsh-plugin-background) | 3 | ⚪ unknown | DSH 壁纸插件 |
| [tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) | 2 | ⚪ unknown | 仿同花顺的webui插件 |
| [dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) | 3 | ⚪ unknown | 模仿 Excel 的 DSH 皮肤 |
| [dsh-deeplink](https://github.com/qyw233/dsh-deeplink) | 1 | ⚪ unknown | 深链插件：?session=/?workspace= 直接打开 |
| [dsh-diff-viewer](https://github.com/lehhair/dsh-diff-viewer) | 2 | ⚪ unknown | PiUI 风格 diff 查看器，替换原生 DiffBlock |
| [dsh-drag-and-drop](https://github.com/bill9109/dsh-drag-and-drop) | 1 | ⚪ unknown | 跨平台文件拖拽与原始路径插入 |
| [dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) | 3 | ⚪ unknown | QQ2006 皮肤插件 |
| [dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) | 2 | ⚪ unknown | 会话完成等四状态通知 |
| [dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | 1 | ⚪ unknown | 键盘优先的命令面板 |
| [dsh-ths-skin](https://github.com/AdamPlatin123/dsh-ths-skin) | 0 | ⚪ unknown | 同花顺行情终端风格皮肤 + K 线面板 |
| [dsh-tps](https://github.com/Small-tailqwq/dsh-tps) | 1 | ⚪ unknown | TPS 皮肤插件 |
| [dsh-ultra-ui](https://github.com/havingautism/dsh-ultra-ui) | 1 | ⚪ unknown | (无描述) |
| [dsh-web-ui-notify](https://github.com/bill9109/dsh-web-ui-notify) | 4 | ⚪ unknown | DSH 桌面通知提醒 |
| [ex-setting](https://github.com/omdsh-dev/ex-setting) | 1 | ⚪ unknown | DSH 设置扩展 |
| [whale-girl](https://github.com/vlln/whale-girl) | 31 | ⚪ unknown | QQ 宠物形态的桌面宠物插件 |
| [dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) | 4 | ⚪ unknown | 替换 DSH 状态显示的 web 插件。 |
| [dsh-ramify](https://github.com/yanglongyun/dsh-ramify) | 3 | ⚪ unknown | 创意分支画布插件：树状工作区生成、对比。 |
| [dsh-xiaohei](https://github.com/opensetk/dsh-xiaohei) | 3 | ⚪ unknown | dsh 的罗小黑皮肤插件。 |
| [dsh-xiaoyao-skins](https://github.com/147228/dsh-xiaoyao-skins) | 3 | ⚪ unknown | 夕小瑶 × DSH Web 皮肤合集、安装器与创作工具链。 |
| [dsh-wikilink](https://github.com/zhaoscsc/dsh-wikilink) | 2 | ⚪ unknown | dsh-wikilink — DSH 插件（界面） |
| [deepseek-harness-skin](https://github.com/HeiGeAi/deepseek-harness-skin) | 2 | ⚪ unknown | DeepSeek Harness 换肤系统：21 套内置皮肤 + 一张图生成整套配色的自定义皮肤。数据源驱动，保对比度推导，构建期校验可读性。 |
| [dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) | 2 | ⚪ unknown | dsh-search-mcp — DSH 插件（界面） |
| [dsh-kanban](https://github.com/Ericwong5021/dsh-kanban) | 2 | ⚪ unknown | dsh-kanban — DSH 插件（界面） |
| [dsh-event-auditor](https://github.com/qing3a/dsh-event-auditor) | 1 | ⚪ unknown | DeepSeek Harness 事件流审计面板插件：观察事件类型/分发模式/计数/最近事件，帮助插件作者理解 harness 内部 |
| [dsh-web-search-tavily](https://github.com/crayonlu/dsh-web-search-tavily) | 1 | ⚪ unknown | dsh-web-search-tavily — DSH 插件（界面） |
| [dsh-pet](https://github.com/FlytoMAYDAY80/dsh-pet) | 1 | ⚪ unknown | DSH 有声桌宠：悬浮桌面的 DeepSeek 小鲸鱼，不打开 DSH 也能实时感知会话状态（需要确认/工作中/完成/空闲/离线），支持音效提醒与零代码定制素材 |
| [dsh-miku-skin](https://github.com/stushansusu/dsh-miku-skin) | 1 | ⚪ unknown | 初音未来主题皮肤，用于 DeepSeek Harness (DSH) Web GUI —— 蓝紫洋红渐变、毛玻璃面板、可自定义背景图、亮暗双主题 |
| [dsh-ui-workbench](https://github.com/LoftyTao/dsh-ui-workbench) | 1 | ⚪ unknown | DeepSeek Harness WebUI 的右侧边文件管理以及变更审查界面插件。 |
| [dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) | 1 | ⚪ unknown | dsh-fun-weather — DSH 插件（界面） |
| [dsh-test-runner](https://github.com/suimi8/dsh-test-runner) | 1 | ⚪ unknown | dsh-test-runner — DSH 插件（界面） |
| [dsh-web-search-firecrawl](https://github.com/crayonlu/dsh-web-search-firecrawl) | 1 | ⚪ unknown | dsh-web-search-firecrawl — DSH 插件（界面） |
| [dsh-web-background](https://github.com/BruceWu1126/dsh-web-background) | 1 | ⚪ unknown | dsh-web-background — DSH 插件（界面） |
| [dsh-skins](https://github.com/Moeblack/dsh-skins) | 1 | ⚪ unknown | dsh-skins — DSH 插件（界面） |
| [dsh-portable-tavern](https://github.com/XCNXNXNX/dsh-portable-tavern) | 1 | ⚪ unknown | DeepSeek Harness 的「便携酒馆」插件：RPG 式 SillyTavern V2/V3 角色卡生成器 + 酒馆角色扮演聊天。支持世界书、角色卡 JSON/PNG 导入导出、面板主题与本地音乐。独立插件，仅依赖官方 @deepseek-ai SD… |
| [dsh-builtin-toggles](https://github.com/Starfie1d1272/dsh-builtin-toggles) | 0 | ⚪ unknown | dsh-builtin-toggles — DSH 插件（界面） |
| [dsh-science](https://github.com/omdsh-dev/dsh-science) | 0 | ⚪ unknown | dsh-science — DSH 插件（界面） |
| [dsh-skin](https://github.com/KinGao294/dsh-skin) | 0 | ⚪ unknown | dsh-skin — DSH 插件（界面） |
| [dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) | 0 | ⚪ unknown | DeepSeek Harness Web 番茄钟插件：可配置专注与休息时长，提供侧栏入口和可拖动浮动面板 |
| [dsh-theme-neko](https://github.com/drfccv/dsh-theme-neko) | 0 | ⚪ unknown | dsh-theme-neko — DSH 插件（界面） |
| [dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) | 0 | ⚪ unknown | dsh-k12-lesson-builder — DSH 插件（界面） |
| [dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) | 0 | ⚪ unknown | dsh-web-attention-badge — DSH 插件（界面） |
| [harness-whale](https://github.com/cakeni/harness-whale) | 0 | ⚪ unknown | harness-whale — DSH 插件（界面） |
| [dsh-conversation-indicator](https://github.com/smanx/dsh-conversation-indicator) | 0 | ⚪ unknown | dsh-conversation-indicator — DSH 插件（界面） |
| [dsh-black-whale](https://github.com/147228/dsh-black-whale) | 0 | ⚪ unknown | DeepSeek Harness 黑鲸实验室主题：官网黑鲸 × 夕小瑶 IP，真实 profile 可安装的 Web UI 插件 |
| [dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) | 0 | ⚪ unknown | dsh-plugins — DSH 插件（界面） |
| [dsh-client-ui-responsive](https://github.com/kelai141/dsh-client-ui-responsive) | 0 | ⚪ unknown | dsh Web UI 的移动响应式 AppFrame——派生自 dsh-client-ui-layout，新增 <640px 抽屉侧栏、底部 sheet 与安全区。 |
| [dsh-ui-skins](https://github.com/edwardyang0011/dsh-ui-skins) | 0 | ⚪ unknown | dsh-ui-skins — DSH 插件（界面） |
| [nightwhale](https://github.com/nightwhale-dev/nightwhale) | 0 | ⚪ unknown | The community power-layer for DeepSeek Harness (dsh). 夜鲲 — 吞并生态好能力,评测集筛选,只喂真正有效的增强。 |

### 💬 会话

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [pi-discuss-mode](https://github.com/zwrong/pi-discuss-mode) | 11 | ⚪ unknown | Pi Coding Agent 的只读讨论模式 |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 23 | ⚪ unknown | 对话回退：回滚会话与工作区状态 |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 12 | ⚪ unknown | DSH 对话分享插件 |
| [dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) | 13 | ⚪ unknown | 分支式消息编辑、reroll、版本时间线 |
| [dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) | 5 | ⚪ unknown | 上下文注入审计：AGENTS.md/技能/tool schema token 成本 |
| [dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) | 7 | ⚪ unknown | 多帧 zstd 会话文件帧级扫描诊断 |
| [dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) | 3 | ⚪ unknown | 自进化：agent 在会话内给自己长出/剪掉能力 |
| [dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) | 17 | ⚪ unknown | 跨会话长期记忆 + 后台自我进化（纯插件） |
| [dsh-web-archive](https://github.com/renat3u/dsh-web-archive) | 3 | ⚪ unknown | 折叠对话中无用消息（Think/Bash 等） |
| [deepseek-manners](https://github.com/Moeblack/deepseek-manners) | 2 | ⚪ unknown | 给每条消息后注入感谢语 |
| [dsh-agent-budget](https://github.com/vibeinging/dsh-agent-budget) | 1 | ⚪ unknown | 原生 agent 树 token 预算插件 |
| [dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) | 1 | ⚪ unknown | 分享任意段落对话 |
| [dsh-kb-sieve](https://github.com/omdsh-dev/dsh-kb-sieve) | 1 | ⚪ unknown | 可审计知识库打包（references + SQLite） |
| [dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) | 2 | ⚪ unknown | 本地优先的会话故障复盘 |
| [dsh-session-search](https://github.com/Tieboyh/dsh-session-search) | 1 | ⚪ unknown | 无索引跨 agent 会话搜索 |
| [dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) | 3 | ⚪ unknown | 侧会话插件：/side 持续性 + /btw 一次性 |
| [dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) | 1 | ⚪ unknown | 手动审批（Manual/Ask 模式） |
| [dsh-turn-navigator](https://github.com/vibeinging/dsh-turn-navigator) | 1 | ⚪ unknown | DSH Web 轮次导航插件 |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 把 append-only 会话日志导出成人读的 Markdown / HTML，按来源分组渲染（系统提示 / 思维链 / 工具调用 / 子agent）。 |
| [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) | 5 | ⚪ unknown | 从 Claude Code/Codex/Reasonix 导入历史消息到 DSH。 |
| [dsh-stream-rules](https://github.com/jiesou/dsh-stream-rules) | 3 | ⚪ unknown | 按需注入规则，不浪费上下文。 |
| [dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) | 3 | ⚪ unknown | 无 LLM 的无损压缩引擎。 |
| [dsh-recall](https://github.com/Mongfayi/dsh-recall) | 3 | ⚪ unknown | DSH Web UI 消息撤回插件。 |
| [dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) | 2 | ⚪ unknown | dsh-plugin-claude-bridge — DSH 插件（会话） |
| [dsh-goal-mode-enhance](https://github.com/KarlOfLaw/dsh-goal-mode-enhance) | 2 | ⚪ unknown | 为 DeepSeek Harness 提供可视化 goal 模式：Goal 栏 / 头部入口 / 设置页（历史+多会话总览）/ goal_overview 模型工具 |
| [context-vista](https://github.com/GooodWei/context-vista) | 2 | ⚪ unknown | 为 DeepSeek Harness 提供右侧悬浮栏以及 /context 命令，用环形图实时展示当前上下文 token 用量与分配，compact指令效果，同时支持估算费用消耗，对标 Claude Code 的 /context。 |
| [dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) | 2 | ⚪ unknown | dsh-claude-move — DSH 插件（会话） |
| [dsh-ergonomics](https://github.com/hisaniwo/dsh-ergonomics) | 2 | ⚪ unknown | DSH 会话人体工学：/new 一键新会话 + 输入历史 ↑↓ 回溯 |
| [dsh-model-config-sync](https://github.com/LiangYin233/dsh-model-config-sync) | 2 | ⚪ unknown | DSH 高级模型配置器：为 DeepSeek Harness 提供将 pi-ai 预设模型的上下文、输出上限、推理挡位一键应用到自定义提供商的能力。 |
| [dsh-undo](https://github.com/LingLambda/dsh-undo) | 2 | ⚪ unknown | dsh-undo — DSH 插件（会话） |
| [dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) | 2 | ⚪ unknown | DeepSeek Harness 会话时间轴插件：横短横线波浪、当前消息定位、点击跳转、圆角预览 tooltip、可收起/展开 |
| [dsh-plugins](https://github.com/Yihong89/dsh-plugins) | 2 | ⚪ unknown | dsh-plugins — DSH 插件（会话） |
| [dsh-superpowers](https://github.com/codeAnqiang-ma/dsh-superpowers) | 2 | ⚪ unknown | dsh-superpowers — DSH 插件（会话） |
| [billion-context-dsh](https://github.com/Tyan66666/billion-context-dsh) | 2 | ⚪ unknown | billion-context-dsh — DSH 插件（会话） |
| [dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) | 1 | ⚪ unknown | dsh-session-pins — DSH 插件（会话） |
| [dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) | 1 | ⚪ unknown | DeepSeek Harness 的跨会话引用(cue)插件 |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 1 | ⚪ unknown | dsh-memento — DSH 插件（会话） |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 1 | ⚪ unknown | DeepSeek Harness 归档会话管理插件：查看/恢复已归档会话（回到原工作区分组）+ 右上角一键关闭 dsh。MIT 许可，欢迎收录到任何插件合集，注明出处即可。 |
| [dsh-memory](https://github.com/ben7am1n/dsh-memory) | 1 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [dsh-plugins](https://github.com/hyls9527/dsh-plugins) | 1 | ⚪ unknown | dsh-plugins — DSH 插件（会话） |
| [dsh-opencode-usage](https://github.com/moduqishi/dsh-opencode-usage) | 1 | ⚪ unknown | dsh-opencode-usage — DSH 插件（会话） |
| [dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) | 1 | ⚪ unknown | dsh-session-hub — DSH 插件（会话） |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 1 | ⚪ unknown | dsh-memento — DSH 插件（会话） |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 1 | ⚪ unknown | DeepSeek Harness 归档会话管理插件：查看/恢复已归档会话（回到原工作区分组）+ 右上角一键关闭 dsh。MIT 许可，欢迎收录到任何插件合集，注明出处即可。 |
| [dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) | 1 | ⚪ unknown | dsh-codex-provider — DSH 插件（会话） |
| [dsh-memory](https://github.com/Jesse-njx/dsh-memory) | 1 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [dsh-workbench](https://github.com/echo-escape/dsh-workbench) | 1 | ⚪ unknown | 这是一个用于展示和分享为开发的各类插件（Plugins）与技能（Skills）的集合。您可以在这里浏览并发现能增强您 DSH 体验的扩展！ |
| [dsh-codex-import](https://github.com/918154429/dsh-codex-import) | 1 | ⚪ unknown | dsh-codex-import — DSH 插件（会话） |
| [dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) | 1 | ⚪ unknown | dsh-session-pin — DSH 插件（会话） |
| [dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) | 1 | ⚪ unknown | Local, per-session prompt stash for DeepSeek Harness Web | 本地、分对话的提示词输入暂存工具。写了一半的长提示词，临时需要先问一个短问题？ 同时准备多个方案，但尚未决定发哪一个？将未完成的想法放入草稿… |
| [dsh-open-in-finder](https://github.com/moduqishi/dsh-open-in-finder) | 1 | ⚪ unknown | dsh-open-in-finder — DSH 插件（会话） |
| [dsh-mcp-proxy](https://github.com/ben7am1n/dsh-mcp-proxy) | 1 | ⚪ unknown | dsh-mcp-proxy — DSH 插件（会话） |
| [dsh-nocturne-memory](https://github.com/RealAlexandreAI/dsh-nocturne-memory) | 1 | ⚪ unknown | dsh-nocturne-memory — DSH 插件（会话） |
| [dsh-balance](https://github.com/TwotwoPiggy/dsh-balance) | 1 | ⚪ unknown | dsh-balance — DSH 插件（会话） |
| [dsh-mneme](https://github.com/modusensus/dsh-mneme) | 1 | ⚪ unknown | Mneme——把记忆主权还给人的记忆插件：SQLite + 可人工编辑的 Markdown 双写，autoDream 在梦境中巩固记忆，106 个测试护航。 |
| [dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) | 1 | ⚪ unknown | DeepSeek Harness 会话费用统计插件:本会话费用、当日费用、历史记录与官方价格同步 |
| [dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) | 1 | ⚪ unknown | dsh-claude-mem — DSH 插件（会话） |
| [dsh-revive](https://github.com/omdsh-dev/dsh-revive) | 1 | ⚪ unknown | DSH 一键复活：重启后给所有被打断的会话自动发送「继续」指令（/revive 命令 + revive_sessions 工具 + 浏览器一键按钮） |
| [dsh-plugin-wepre](https://github.com/shujiTech/dsh-plugin-wepre) | 1 | ⚪ unknown | dsh-plugin-wepre — DSH 插件（会话） |
| [dsh-plugin-meta-memory](https://github.com/YYTbit/dsh-plugin-meta-memory) | 1 | ⚪ unknown | dsh-plugin-meta-memory — DSH 插件（会话） |
| [dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) | 1 | ⚪ unknown | dsh-auto-review — DSH 插件（会话） |
| [DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) | 1 | ⚪ unknown | DeepSeek-Harness-for-VS-Code — DSH 插件（会话） |
| [dsh-plugin-context-compressor](https://github.com/YYTbit/dsh-plugin-context-compressor) | 1 | ⚪ unknown | dsh-plugin-context-compressor — DSH 插件（会话） |
| [dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) | 1 | ⚪ unknown | dsh-context-taxonomy — DSH 插件（会话） |
| [dsh-tdai-memory](https://github.com/Scorp1o117/dsh-tdai-memory) | 1 | ⚪ unknown | dsh-tdai-memory — DSH 插件（会话） |
| [dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) | 1 | ⚪ unknown | dsh-context-lens — DSH 插件（会话） |
| [dsh-plugin-session-import](https://github.com/huguangyu666/dsh-plugin-session-import) | 1 | ⚪ unknown | dsh-plugin-session-import — DSH 插件（会话） |
| [dsh-resume-plugin](https://github.com/Demogorgon314/dsh-resume-plugin) | 1 | ⚪ unknown | 让 DeepSeek Harness 安全读取并继续 Codex 与 Claude Code 的历史会话。 |
| [dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) | 1 | ⚪ unknown | dsh-cost-ledger — DSH 插件（会话） |
| [dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) | 0 | ⚪ unknown | dsh-plugin-codex-import — DSH 插件（会话） |
| [dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) | 0 | ⚪ unknown | dsh-continual-evolve — DSH 插件（会话） |
| [dsh-command-opt](https://github.com/csiroqa/dsh-command-opt) | 0 | ⚪ unknown | DeepSeek Harness（DSH）命令优化插件：Tab/Enter 补全命令名、参数格式引导与提示弹框、tool 开启会话（subagent）补丁、空对话命令输出修复。Command optimization plugin for DeepSeek… |
| [dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) | 0 | ⚪ unknown | dsh-telemetry-redactor — DSH 插件（会话） |
| [dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) | 0 | ⚪ unknown | dsh-revdiff — DSH 插件（会话） |
| [dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) | 0 | ⚪ unknown | DSH (DeepSeek Harness) 持久化 Web 插件：Token 用量统计悬浮窗 —— 可拖动窗口/圆点、曲线/热力图、总 tokens 大数字；宿主半聚合会话日志并提供 /usage/api/snapshot |
| [dsh-balance-meter](https://github.com/Ghost011118/dsh-balance-meter) | 0 | ⚪ unknown | dsh-balance-meter — DSH 插件（会话） |
| [dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) | 0 | ⚪ unknown | DeepSeek Harness (dsh) 插件：/cost 查看每个会话花费 + 可拖拽的悬浮费用胶囊 |
| [dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) | 0 | ⚪ unknown | dsh-latex-tools — DSH 插件（会话） |
| [dsh-memory](https://github.com/Towzai/dsh-memory) | 0 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) | 0 | ⚪ unknown | mindspace-dsh-session-memory — DSH 插件（会话） |
| [dsh-auto-compact](https://github.com/wangxiang0605qvq/dsh-auto-compact) | 0 | ⚪ unknown | dsh-auto-compact — DSH 插件（会话） |
| [dsh-hotkeys](https://github.com/csiroqa/dsh-hotkeys) | 0 | ⚪ unknown | DeepSeek Harness（DSH）全局快捷键插件：会话切换、发送/清空草稿、停止生成、复制与归档，键位可在设置中自定义。Global keyboard shortcuts plugin for DeepSeek Harness. |
| [dsh-plugin-jinji](https://github.com/quan2005/dsh-plugin-jinji) | 0 | ⚪ unknown | 把「记忆」带进 DeepSeek Harness：极简文本记忆系统（Markdown 日志 + 画像档案），以大模型为核心驱动。无需安装其他软件，无需编译，无第三方依赖。 |
| [dsh-memory](https://github.com/Amengclass/dsh-memory) | 0 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [dsh-supervisor](https://github.com/Wha1eChai/dsh-supervisor) | 0 | ⚪ unknown | dsh-supervisor — DSH 插件（会话） |
| [dsh-archive-viewer](https://github.com/csiroqa/dsh-archive-viewer) | 0 | ⚪ unknown | dsh-archive-viewer — DSH 插件（会话） |
| [dsh-plugin-asmemory](https://github.com/Xplore-LAB/dsh-plugin-asmemory) | 0 | ⚪ unknown | dsh-plugin-asmemory — DSH 插件（会话） |

### 🧠 模型

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 182 | ⚪ unknown | 给纯文本模型加视觉：图片问答、长截图 OCR、UI 还原 |
| [Deepseek-omnimodal](https://github.com/good-boy4069/Deepseek-omnimodal) | 2 | ⚪ unknown | 面向纯文本 Agent 的开源多模态 MCP |
| [dsh-computer-use](https://github.com/Anionex/dsh-computer-use) | 12 | ⚪ unknown | 电脑控制插件（Accessibility 观测 + 作用域权限） |
| [dsh-vision](https://github.com/william-jin-cmu/dsh-vision) | 11 | ⚪ unknown | view_image 工具桥接任意 OpenAI 兼容 VLM |
| [modlens](https://github.com/liustack/modlens) | 760 | ⚪ unknown | DeepSeek Harness 首个视觉插件，纯文本模型看图。 |
| [agent-vision-toolkit](https://github.com/Anionex/agent-vision-toolkit) | 570 | ⚪ unknown | 为纯文本模型看图设计的视觉工具箱与技能：多图理解、图片问答、UI 还原、GUI 自动化。 |
| [dsh-tool-turbo](https://github.com/Electricitysheep/dsh-tool-turbo) | 3 | ⚪ unknown | 每轮 reasoning_effort 优化器。 |
| [dsh-plugin-cost-tracker](https://github.com/YYTbit/dsh-plugin-cost-tracker) | 3 | ⚪ unknown | DeepSeek Harness token 成本追踪器。 |
| [dsh-cost](https://github.com/GiantGKL/dsh-cost) | 3 | ⚪ unknown | DSH token 成本统计插件。 |
| [dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) | 3 | ⚪ unknown | DeepSeek 大脑 + 自动识图：图片经 VLM 识别。 |
| [dsh-her-eyes](https://github.com/huashenglian/dsh-her-eyes) | 3 | ⚪ unknown | 让 AI 自动调用 VLM 做视觉分析的 dsh 插件。 |
| [dsh-recommend](https://github.com/zp-home/dsh-recommend) | 2 | ⚪ unknown | DSH 插件生态透明排行与推荐：每日自动抓取 dsh-plugin 话题 + 公开评分模型 + 排行/推荐插件与静态站 |
| [dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) | 2 | ⚪ unknown | DSH 原生鸿蒙设备桥：hdc 工具让 Agent 完成截图-看图-装包-验证的闭环调试 / DSH-native HarmonyOS device bridge |
| [dsh-plugin-deepeye](https://github.com/Favio8/dsh-plugin-deepeye) | 2 | ⚪ unknown | dsh-plugin-deepeye — DSH 插件（模型） |
| [dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) | 2 | ⚪ unknown | dsh-tiered-approval — DSH 插件（模型） |
| [dsh-mcp-manager](https://github.com/hyqhyq3/dsh-mcp-manager) | 2 | ⚪ unknown | dsh-mcp-manager — DSH 插件（模型） |
| [dsh-llm-codex-oauth](https://github.com/Player-MINEPIG/dsh-llm-codex-oauth) | 2 | ⚪ unknown | 在 dsh（DeepSeek Harness）里使用你的 ChatGPT / Codex 订阅。插件通过 OpenAI Codex 的 OAuth 流程登录 ChatGPT 账号，把订阅额度暴露成 dsh 的 `codex-oauth` 模型提供方。 |
| [dsh-payload-capture](https://github.com/Moeblack/dsh-payload-capture) | 1 | ⚪ unknown | DSH 插件：捕捉每次上行模型 API payload，JSON 落盘 |
| [doubao-vision-dsh](https://github.com/hawkongz/doubao-vision-dsh) | 1 | ⚪ unknown | 让纯文本模型通过桌面豆包看见聊天图片的 DeepSeek Harness 宿主插件(CDP 桥接,全预设生效,识别可取消) |
| [dsh-vision-LMstudio](https://github.com/TiankunDai/dsh-vision-LMstudio) | 1 | ⚪ unknown | 让你能通过deepseek harness调用LM studio加载的本地视觉模型 |
| [dsh-tool-vision](https://github.com/Scorp1o117/dsh-tool-vision) | 1 | ⚪ unknown | dsh-tool-vision — DSH 插件（模型） |
| [dsh-effort-tweak](https://github.com/Toukaiteio/dsh-effort-tweak) | 1 | ⚪ unknown | dsh-effort-tweak — DSH 插件（模型） |
| [dsh-toolbelt](https://github.com/cking000bigdemon/dsh-toolbelt) | 1 | ⚪ unknown | dsh-toolbelt — DSH 插件（模型） |
| [multimodal-bridge](https://github.com/Spirit4471/multimodal-bridge) | 1 | ⚪ unknown | multimodal-bridge 是一个多模态能力桥：把 Qwen 的视觉理解（Qwen-VL）与图像生成（Qwen-Image）带给没有原生多模态能力的纯文本模型（如 DeepSeek）。它有两种形态、同一套后端： MCP Server（qwen_vis… |
| [dsh-live-stats](https://github.com/Proton1917/dsh-live-stats) | 1 | ⚪ unknown | dsh-live-stats — DSH 插件（模型） |
| [dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) | 1 | ⚪ unknown | dsh-ui-spec — DSH 插件（模型） |
| [dsh-plugin-vision-toolkit](https://github.com/YYTbit/dsh-plugin-vision-toolkit) | 1 | ⚪ unknown | dsh-plugin-vision-toolkit — DSH 插件（模型） |
| [dsh-usage-cost](https://github.com/Dino6021/dsh-usage-cost) | 1 | ⚪ unknown | dsh-usage-cost — DSH 插件（模型） |
| [dsh-mimo-vision-hint](https://github.com/Isekai-Mfu/dsh-mimo-vision-hint) | 1 | ⚪ unknown | dsh-mimo-vision-hint — DSH 插件（模型） |
| [dsh-multimodal](https://github.com/MC5lan/dsh-multimodal) | 1 | ⚪ unknown | 给 DeepSeek 安装一双眼睛和一支画笔:会话里直接贴截图/图片,GLM 视觉模型先精确转写图片内容(报错信息、代码、界面逐字保留),然后 DeepSeek 继续处理你的问题——同一轮完成,全程无感;需要配图时,DeepSeek 自动调用文生图后端出图并… |
| [dsh-vision-helper](https://github.com/Yuuz12/dsh-vision-helper) | 1 | ⚪ unknown | dsh-vision-helper — DSH 插件（模型） |
| [dsh-model-modes](https://github.com/DTSFO/dsh-model-modes) | 1 | ⚪ unknown | dsh-model-modes — DSH 插件（模型） |
| [dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) | 1 | ⚪ unknown | dsh-pet-corner — DSH 插件（模型） |
| [dsh-eco-router](https://github.com/joyfoxai/dsh-eco-router) | 1 | ⚪ unknown | dsh-eco-router — DSH 插件（模型） |
| [dsh-effort-config](https://github.com/benzhoupo/dsh-effort-config) | 1 | ⚪ unknown | dsh-effort-config — DSH 插件（模型） |
| [dsh-image-to-path](https://github.com/cesaryike/dsh-image-to-path) | 1 | ⚪ unknown | DSH 插件:让纯文本模型对话也能拖图/贴图——图片自动保存到会话工作区,以文件路径交给模型(多模态模型不受影响) |
| [dsh-vision](https://github.com/xiaoshihou514/dsh-vision) | 1 | ⚪ unknown | dsh-vision — DSH 插件（模型） |
| [dsh-usage-meter](https://github.com/cute-baobao/dsh-usage-meter) | 1 | ⚪ unknown | dsh-usage-meter — DSH 插件（模型） |
| [dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) | 1 | ⚪ unknown | dsh-plugin-clawrouters — DSH 插件（模型） |
| [dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) | 0 | ⚪ unknown | dsh-mac-vision — DSH 插件（模型） |
| [dsh-plugin-llm-codex](https://github.com/jasper-zsh/dsh-plugin-llm-codex) | 0 | ⚪ unknown | dsh-plugin-llm-codex — DSH 插件（模型） |
| [dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) | 0 | ⚪ unknown | dsh-think-flow-flow — DSH 插件（模型） |
| [dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) | 0 | ⚪ unknown | dsh-prompt-profile — DSH 插件（模型） |
| [dsh-polyglot](https://github.com/Jesse-njx/dsh-polyglot) | 0 | ⚪ unknown | dsh-polyglot — DSH 插件（模型） |
| [dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) | 0 | ⚪ unknown | dsh-token-stats — DSH 插件（模型） |
| [dsh-cost](https://github.com/dongsheng123132/dsh-cost) | 0 | ⚪ unknown | dsh-cost — DSH 插件（模型） |
| [dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) | 0 | ⚪ unknown | dsh-plugin-usage-report — DSH 插件（模型） |
| [dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) | 0 | ⚪ unknown | dsh-model-thinking — DSH 插件（模型） |
| [dsh-vision-sidecar](https://github.com/121103qwq/dsh-vision-sidecar) | 0 | ⚪ unknown | dsh-vision-sidecar — DSH 插件（模型） |
| [owlx-mcp](https://github.com/Chungor/owlx-mcp) | 0 | ⚪ unknown | owlx-mcp — DSH 插件（模型） |
| [dsh-qwen-mm](https://github.com/RRRosmontis/dsh-qwen-mm) | 0 | ⚪ unknown | dsh-qwen-mm — DSH 插件（模型） |
| [noatmark-dsh-plugin](https://github.com/ylwl1997/noatmark-dsh-plugin) | 0 | ⚪ unknown | noatmark-dsh-plugin — DSH 插件（模型） |
| [dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) | 0 | ⚪ unknown | DeepSeek Harness 成本显示插件 |
| [dsh-plugin-provider-quota](https://github.com/jasper-zsh/dsh-plugin-provider-quota) | 0 | ⚪ unknown | DeepSeek Harness（DSH） 的 Web 插件：在对话输入框底部展示模型 Provider 的订阅额度与限流窗口，点击徽标即可查看详情。 |
| [dsh-codebuddy](https://github.com/Lbryany/dsh-codebuddy) | 0 | ⚪ unknown | dsh-codebuddy — DSH 插件（模型） |

### 🛡️ 沙箱

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-plugin-miliastra-toolbox](https://github.com/1475505/dsh-plugin-miliastra-toolbox) | 1 | ⚪ unknown | 将千星沙箱（原神千星奇域）知识库接入 Deepseek Harness 的插件 |
| [dsh-same-mode-sandbox-noop](https://github.com/zhangzujian/dsh-same-mode-sandbox-noop) | 0 | ⚪ unknown | dsh-same-mode-sandbox-noop — DSH 插件（沙箱） |
| [dsh-shell-termux](https://github.com/kelai141/dsh-shell-termux) | 0 | ⚪ unknown | dsh 的安卓/Termux bash 能力提供者——显式 Termux 环境注入、探测诊断、诚实的应用域沙箱声明。 |
| [dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) | 0 | ⚪ unknown | 在 Windows 环境中为 DeepSeek Harness 提供 Git Bash 与 WSL2 bash 工具,含 bwrap 沙箱、审批模式、后台任务 |

### 🎛️ 编排

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [openhanako](https://github.com/liliMozi/openhanako) | 5975 | ⚪ unknown | 带记忆、人格与自主性的个人 AI 智能体 |
| [exo](https://github.com/exoharness/exo) | 639 | ⚪ unknown | 可递归自编辑自身的 agent+harness 架构 |
| [synergy](https://github.com/SII-Holos/synergy) | 542 | ⚪ unknown | 面向 Open Agentic Web 的通用智能体 |
| [ccteam](https://github.com/firstintent/ccteam) | 142 | ⚪ unknown | 把 Claude Code/Codex/Grok/Kimi 编成团队，Telegram/飞书指挥 |
| [MateBot](https://github.com/aresbit/MateBot) | 46 | ⚪ unknown | claudeclaw 复刻 |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 39 | ⚪ unknown | Skill 驱动的 Harness/Loop 工程工作流插件 |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 37 | ⚪ unknown | 把 Claude Code 的 UltraCode 模式带给 DSH，多 Agent 调度可治理 |
| [agents-go](https://github.com/zzir/agents-go) | 13 | ⚪ unknown | Go 语言多 agent 框架 |
| [distill](https://github.com/LoserFox/distill) | 12 | ⚪ unknown | 自动对话蒸馏：后台 subagent 反省 + 技能更新 |
| [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 99 | ⚪ unknown | AgentTeams 插件 |
| [dsh-automation](https://github.com/titanwings/dsh-automation) | 9 | ⚪ unknown | 让任务按计划在全新 Session 中运行定时任务 |
| [dsh-loop](https://github.com/vlln/dsh-loop) | 2 | ⚪ unknown | 定时循环（/loop 命令 + loop 工具） |
| [dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | 2 | ⚪ unknown | 计划批注：选中计划原文逐条批注 |
| [dsh-task-status](https://github.com/vlln/dsh-task-status) | 3 | ⚪ unknown | 后台任务状态条（进度 + 实时 tail） |
| [dsh-work](https://github.com/vibeinging/dsh-work) | 11 | ⚪ unknown | 本地优先 DSH 插件工作台 |
| [dsh-advisor](https://github.com/btspoony/dsh-advisor) | 3 | ⚪ unknown | 第二模型被动审查每轮并注入建议 |
| [dsh-artifact](https://github.com/william-jin-cmu/dsh-artifact) | 1 | ⚪ unknown | 文件交付协议：send_artifact 工具 |
| [dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) | 5 | ⚪ unknown | 自适应深度研究编排插件 |
| [dsh-explain](https://github.com/yuezengwu/dsh-explain) | 2 | ⚪ unknown | 本地优先学习模式：跨会话全局学习线程 |
| [dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) | 1 | ⚪ unknown | 基于角色的模型重试备用策略 |
| [dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | 3 | ⚪ unknown | 条件驱动唤醒：持久文件/命令/http 触发 |
| [dsh-track](https://github.com/fakechris/dsh-track) | 3 | ⚪ unknown | 嵌入式任务管理引擎：决策点协议、Linear 形 issue |
| [eragear-code-copilot](https://github.com/TongDucThanhNam/eragear-code-copilot) | 0 | ⚪ unknown | 空壳仓库（无描述） |
| [dsh-plugin-product-subagents](https://github.com/shaokeyibb/dsh-plugin-product-subagents) | 3 | ⚪ unknown | 角色化 Codex/Claude Code/ACP 子代理预设。 |
| [dsh-milestone](https://github.com/SnowCrescenter-tech/dsh-milestone) | 3 | ⚪ unknown | Git 风格里程碑时间线插件。 |
| [shopline-ai-toolkit-dsh](https://github.com/lunw/shopline-ai-toolkit-dsh) | 2 | ⚪ unknown | shopline-ai-toolkit-dsh — DSH 插件（编排） |
| [dsh-playwright-cli](https://github.com/mitao-su/dsh-playwright-cli) | 2 | ⚪ unknown | dsh-playwright-cli — DSH 插件（编排） |
| [dsh-review-loop](https://github.com/wuxiangru915/dsh-review-loop) | 2 | ⚪ unknown | dsh-review-loop — DSH 插件（编排） |
| [securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) | 2 | ⚪ unknown | securstack-dsh-plugin — DSH 插件（编排） |
| [dsh-multi-cot](https://github.com/AprilWizard/dsh-multi-cot) | 2 | ⚪ unknown | dsh-multi-cot — DSH 插件（编排） |
| [dsh-git-plugin](https://github.com/MashedPotato817/dsh-git-plugin) | 2 | ⚪ unknown | dsh-git-plugin — DSH 插件（编排） |
| [dsh-enhance](https://github.com/vcxmug/dsh-enhance) | 2 | ⚪ unknown | dsh-enhance — DSH 插件（编排） |
| [deepseek-harness-plugin-mcp](https://github.com/bobleer/deepseek-harness-plugin-mcp) | 2 | ⚪ unknown | deepseek-harness-plugin-mcp — DSH 插件（编排） |
| [dsh-sound-effects-plugin](https://github.com/JasonJin2006/dsh-sound-effects-plugin) | 2 | ⚪ unknown | dsh-sound-effects-plugin — DSH 插件（编排） |
| [deepseek-harness-fnos](https://github.com/techysy/deepseek-harness-fnos) | 2 | ⚪ unknown | DeepSeek Harness (DeepSeek 官方 agent 浏览器 UI) fnOS 应用 — 本地常驻服务, 官方统一网关接入 |
| [dsh-agent-arcade](https://github.com/fff122/dsh-agent-arcade) | 1 | ⚪ unknown | dsh-agent-arcade — DSH 插件（编排） |
| [dsh-skillport](https://github.com/Jesse-njx/dsh-skillport) | 1 | ⚪ unknown | dsh-skillport — DSH 插件（编排） |
| [dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) | 1 | ⚪ unknown | dsh-book2skill — DSH 插件（编排） |
| [dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) | 1 | ⚪ unknown | dsh-prime-agent — DSH 插件（编排） |
| [dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) | 1 | ⚪ unknown | DeepSeek Harness（DSH）插件：自动记录所有执行模式（原生工具 / PTC run_code / 代码内嵌工具调用）的工具失败错因，去重、计数、确定性排序后沉淀进 skill 的机器维护实录区段——让 Agent 越用越少错。 |
| [dsh-routines](https://github.com/Jesse-njx/dsh-routines) | 1 | ⚪ unknown | dsh-routines — DSH 插件（编排） |
| [falsify-dsh](https://github.com/shi275773124/falsify-dsh) | 1 | ⚪ unknown | falsify-dsh — DSH 插件（编排） |
| [dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) | 1 | ⚪ unknown | dsh-audio-dub — DSH 插件（编排） |
| [dsh-governance](https://github.com/tappass/dsh-governance) | 1 | ⚪ unknown | dsh-governance — DSH 插件（编排） |
| [dsh-clawrouter](https://github.com/BlockRunAI/dsh-clawrouter) | 1 | ⚪ unknown | dsh-clawrouter — DSH 插件（编排） |
| [DSH-Chrome-devtools](https://github.com/yuzi-ska/DSH-Chrome-devtools) | 1 | ⚪ unknown | DSH-Chrome-devtools — DSH 插件（编排） |
| [dsh-self-control-guard](https://github.com/pandashere/dsh-self-control-guard) | 1 | ⚪ unknown | dsh-self-control-guard — DSH 插件（编排） |
| [dsh-harness-mcp-server](https://github.com/chushixixin/dsh-harness-mcp-server) | 1 | ⚪ unknown | dsh-harness-mcp-server — DSH 插件（编排） |
| [dsh-plugin-verify](https://github.com/qing3a/dsh-plugin-verify) | 1 | ⚪ unknown | 验证 DSH 插件的 CLI：一条命令跑 mock-llm 完整 agent 循环，检查 waterfall 链与零副作用，产出验证报告 |
| [dsh-schedule](https://github.com/csiroqa/dsh-schedule) | 1 | ⚪ unknown | dsh-schedule — DSH 插件（编排） |
| [Pwiki](https://github.com/ang-XWBWZ/Pwiki) | 1 | ⚪ unknown | Pwiki — DSH 插件（编排） |
| [governed-workflow-for-dsh](https://github.com/zcx369658780/governed-workflow-for-dsh) | 1 | ⚪ unknown | governed-workflow-for-dsh — DSH 插件（编排） |
| [dsh-agent-eval](https://github.com/ShawnSiao/dsh-agent-eval) | 1 | ⚪ unknown | dsh-agent-eval — DSH 插件（编排） |
| [dsh-plugin-agent-dashboard](https://github.com/YYTbit/dsh-plugin-agent-dashboard) | 1 | ⚪ unknown | dsh-plugin-agent-dashboard — DSH 插件（编排） |
| [amber-protocol](https://github.com/Bandersnatch0x/amber-protocol) | 1 | ⚪ unknown | amber-protocol — DSH 插件（编排） |
| [dsh-eval-harness](https://github.com/BiBoyang/dsh-eval-harness) | 1 | ⚪ unknown | dsh-eval-harness — DSH 插件（编排） |
| [sai](https://github.com/Very12345/sai) | 0 | ⚪ unknown | sai — DSH 插件（编排） |
| [vpshub](https://github.com/Sdongmaker/vpshub) | 0 | ⚪ unknown | vpshub — DSH 插件（编排） |
| [deepseek-harness-flow](https://github.com/alison-xx/deepseek-harness-flow) | 0 | ⚪ unknown | deepseek-harness-flow — DSH 插件（编排） |
| [dsh-voice](https://github.com/Jesse-njx/dsh-voice) | 0 | ⚪ unknown | dsh-voice — DSH 插件（编排） |
| [dsh-product-delivery-workflow](https://github.com/wellorbetter/dsh-product-delivery-workflow) | 0 | ⚪ unknown | dsh-product-delivery-workflow — DSH 插件（编排） |
| [dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) | 0 | ⚪ unknown | DeepSeek Harness Plugin Dev Skill — 让任何 Agent 都能正确、高效、符合规范地开发 DSH 插件（含精简提炼参考文档与论文解读） |
| [vscode-deepseek-harness](https://github.com/kalynnka/vscode-deepseek-harness) | 0 | ⚪ unknown | vscode-deepseek-harness — DSH 插件（编排） |
| [dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) | 0 | ⚪ unknown | dsh-gitflow — DSH 插件（编排） |
| [dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) | 0 | ⚪ unknown | dsh-plugin-verified-search — DSH 插件（编排） |
| [dsh-landscape](https://github.com/cyanseek/dsh-landscape) | 0 | ⚪ unknown | dsh-landscape — DSH 插件（编排） |
| [dsh-wecom](https://github.com/TtTRz/dsh-wecom) | 0 | ⚪ unknown | dsh-wecom — DSH 插件（编排） |
| [dsh-push](https://github.com/kiim-wong/dsh-push) | 0 | ⚪ unknown | dsh-push — DSH 插件（编排） |
| [sai-dsh-plugins](https://github.com/Very12345/sai-dsh-plugins) | 0 | ⚪ unknown | sai-dsh-plugins — DSH 插件（编排） |
| [dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) | 0 | ⚪ unknown | dsh-shift-router — DSH 插件（编排） |
| [dash](https://github.com/songqikong/dash) | 0 | ⚪ unknown | dash — DSH 插件（编排） |
| [delivery-review-dsh-plugin](https://github.com/xiaoxiao-svg/delivery-review-dsh-plugin) | 0 | ⚪ unknown | delivery-review-plugin（Claude Code 双 Agent 交付协作工作流插件）的 DeepSeek Harness 移植版。基于 DSH 的 Cordis 插件系统，以 bundle 方式分发，不改动 DSH 源码，全部能力由插件… |
| [dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) | 0 | ⚪ unknown | dsh-gatedflow — DSH 插件（编排） |
| [dsh-browser-bridge](https://github.com/egnmosk/dsh-browser-bridge) | 0 | ⚪ unknown | dsh-browser-bridge — DSH 插件（编排） |
| [DeepJIT](https://github.com/fly3366/DeepJIT) | 0 | ⚪ unknown | DeepJIT — DSH 插件（编排） |

### 🔌 桥接

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-agent-messaging](https://github.com/happyren/dsh-agent-messaging) | 4 | ⚪ unknown | 跨会话 agent 间消息传递。 |
| [widget-dock](https://github.com/MorGogh/widget-dock) | 2 | ⚪ unknown | widget-dock — DSH 插件（桥接） |
| [dsh-ark-quota](https://github.com/lordqyxz/dsh-ark-quota) | 2 | ⚪ unknown | 火山方舟订阅套餐剩余额度 DSH 侧边栏小组件（宿主代理 GetCodingPlanUsage + 浏览器 widget + 免重启 cookie 刷新工具） |
| [dsh-codex-bridge](https://github.com/pandashere/dsh-codex-bridge) | 1 | ⚪ unknown | dsh-codex-bridge — DSH 插件（桥接） |
| [dsh-reasoning-translator](https://github.com/pinkllo/dsh-reasoning-translator) | 1 | ⚪ unknown | dsh-reasoning-translator — DSH 插件（桥接） |
| [dsh-credentials-keychain](https://github.com/ShawnSiao/dsh-credentials-keychain) | 1 | ⚪ unknown | dsh-credentials-keychain — DSH 插件（桥接） |
| [dsh-deepseek-balance](https://github.com/lin-cheng-lab/dsh-deepseek-balance) | 1 | ⚪ unknown | DeepSeek API 余额监视器：DSH 右下角悬浮徽章 + 7天/30天用量费用图表 |
| [dsh-deepseek-usage](https://github.com/ben7am1n/dsh-deepseek-usage) | 1 | ⚪ unknown | dsh-deepseek-usage — DSH 插件（桥接） |
| [dsh-balance-display](https://github.com/Liu-ty/dsh-balance-display) | 1 | ⚪ unknown | dsh-balance-display — DSH 插件（桥接） |
| [ds-balance-card](https://github.com/jasonsun29/ds-balance-card) | 1 | ⚪ unknown | DeepSeek Harness 常驻额度卡片插件:自动识别已配置的平台 API Key,显示余额与 Coding Plan 额度 |
| [dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) | 1 | ⚪ unknown | dsh-balance-monitor — DSH 插件（桥接） |
| [dsh-kimi-bridge](https://github.com/pandashere/dsh-kimi-bridge) | 1 | ⚪ unknown | dsh-kimi-bridge — DSH 插件（桥接） |
| [deepseek-harness-lan](https://github.com/oitsukiii/deepseek-harness-lan) | 1 | ⚪ unknown | deepseek-harness-lan — DSH 插件（桥接） |
| [jina-dsh-plugin](https://github.com/minatoAI/jina-dsh-plugin) | 0 | ⚪ unknown | jina-dsh-plugin — DSH 插件（桥接） |
| [dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) | 0 | ⚪ unknown | dsh-lsp-actions — DSH 插件（桥接） |
| [dsh-chrome](https://github.com/YJSoooooo/dsh-chrome) | 0 | ⚪ unknown | dsh-chrome — DSH 插件（桥接） |
| [dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) | 0 | ⚪ unknown | dsh-exa-mcp — DSH 插件（桥接） |
| [dsh-switch](https://github.com/dongsheng123132/dsh-switch) | 0 | ⚪ unknown | dsh-switch — DSH 插件（桥接） |
| [dsh-deepseek-balance](https://github.com/wangxiang0605qvq/dsh-deepseek-balance) | 0 | ⚪ unknown | dsh-deepseek-balance — DSH 插件（桥接） |

### 📦 预设

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-companion](https://github.com/yyh-001/dsh-companion) | 3 | ⚪ unknown | DeepSeek 陪伴模式插件：人设、记忆、聊得下去。 |

### 🧷 其他

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [EchoBird](https://github.com/edison7009/EchoBird) | 3012 | ⚪ unknown | 一键安装+切换 Claude Code/Codex/Kimi/Qwen 等 20+ 编码智能体 |
| [awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) | 379 | ⚪ unknown | DSH 插件目录，带每日兼容性跟踪 |
| [deepseek-harness-applicants](https://github.com/Octo-o-o-o/deepseek-harness-applicants) | 48 | ⚪ unknown | DSH 内测申请者名单 |
| [awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 169 | ⚪ unknown | DSH 生态精选：插件、工具与基建 |
| [dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) | 79 | ⚪ unknown | DSH 终端 UI（TUI） |
| [agent-skills](https://github.com/GitHubxsy/agent-skills) | 20 | ⚪ unknown | 面向 AI 编码智能体的可复用 skills 合集 |
| [dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) | 38 | ⚪ unknown | Codex-style @file mentions for DeepSeek Harness: search workspace files in the composer and attach their contents to prompts. |
| [dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) | 33 | ⚪ unknown | Open DeepSeek Harness workspace directories in VS Code directly from the web GUI. |
| [dsh-notification](https://github.com/omdsh-dev/dsh-notification) | 25 | ⚪ unknown | Desktop notifications for DeepSeek Harness turn completions, with per-outcome controls and include/exclude keyword rules. |
| [dsh-ads](https://github.com/Nagi-ovo/dsh-ads) | 136 | ⚪ unknown | 2005 年中文站点风格侧栏广告插件（恶搞） |
| [dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) | 12 | ⚪ unknown | DSH 内测收官合影墙：GitHub OAuth 零权限登录 + 冻结白名单校验的拍立得合影站（含 DSH Skill 包装） |
| [dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) | 38 | ⚪ unknown | OpenPencil design preview and editing plugin for DSH |
| [oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) | 8 | ⚪ unknown | 可扩展的 macOS DSH 工作台（原生 PTY） |
| [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize) | 38 | ⚪ unknown | 对话内生成式 UI：把交互式 HTML 卡片画进会话 |
| [awesome-DSH-plugin](https://github.com/Alex-Yanggg/awesome-DSH-plugin) | 32 | ⚪ unknown | 精选 DSH 插件/扩展/工具列表 |
| [oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) | 25 | ⚪ unknown | 面向 DSH 的插件生态（700+ 插件） |
| [dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) | 7 | ⚪ unknown | 在 DSH 里与 AI 下五子棋 |
| [dsh-web-review](https://github.com/CanglongCl/dsh-web-review) | 7 | ⚪ unknown | DeepSeek Harness Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。 |
| [dsh-emoji](https://github.com/hellodigua/dsh-emoji) | 8 | ⚪ unknown | 为 AI 回复自动添加表情 |
| [dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) | 6 | ⚪ unknown | 用 grok-build 的 TUI 跑 DSH |
| [dsh-stock-market](https://github.com/AnacondaKC/dsh-stock-market) | 6 | ⚪ unknown | 写代码时账户同时亏钱的恶搞插件 |
| [Top](https://github.com/xiaohai-78/Top) | 5 | ⚪ unknown | dsh-external 插件生态每日榜单 |
| [awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 26 | ⚪ unknown | 双语 DSH 插件生态完整列表 |
| [dsh-launcher](https://github.com/Ruler4396/dsh-launcher) | 28 | ⚪ unknown | 基于 WebView2 的 DSH 启动器 |
| [dsh-minigames](https://github.com/lhh010/dsh-minigames) | 7 | ⚪ unknown | 右侧小游戏面板（18 款离线小游戏） |
| [dsh-stickers](https://github.com/william-jin-cmu/dsh-stickers) | 6 | ⚪ unknown | 双向表情贴纸插件 |
| [oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) | 4 | ⚪ unknown | DeepSeek harness 插件集 |
| [orbis](https://github.com/icodesign/orbis) | 5 | ⚪ unknown | DSH 远程控制的移动客户端 |
| [plugin-registry](https://github.com/vlln/plugin-registry) | 18 | ⚪ unknown | DSH 插件生态基建：浏览器面板管理官方 repository 插件 |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 一键脚手架生成 DeepSeek Harness (DSH) 插件：tool / events / webui 三套模板、next 标签版本锁定、内置 --verify 冒烟测试。 |
| [dsh-101](https://github.com/bill9109/dsh-101) | 1 | ⚪ unknown | DSH 文档阅读模式 |
| [dsh-desktop-electron](https://github.com/Void0312Aurora/dsh-desktop-electron) | 3 | ⚪ unknown | 跨平台 Electron 桌面壳（托盘常驻） |
| [dsh-douyin](https://github.com/AnacondaKC/dsh-douyin) | 2 | ⚪ unknown | 侧栏短视频插件（原生播放器） |
| [dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) | 2 | ⚪ unknown | DSH 一键启动器（Windows 便携免安装） |
| [dsh-notebooks](https://github.com/havingautism/dsh-notebooks) | 2 | ⚪ unknown | (无描述) |
| [dsh-plugin-d399](https://github.com/HuanLinOTO/dsh-plugin-d399) | 2 | ⚪ unknown | 模型生成时弹出小游戏菜单 |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 回合完成 / 出错 / 待审批时，把通知推到 IM webhook（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义）+ 本机系统通知。 |
| [dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) | 4 | ⚪ unknown | 把 DeepSeek Harness 桥接进飞书/Lark。 |
| [dsh-win-notify](https://github.com/MuziIsabel/dsh-win-notify) | 4 | ⚪ unknown | 带声音的 Windows 通知插件。 |
| [dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) | 3 | ⚪ unknown | 为 agent 新增 wechat_notify 工具的插件。 |
| [dsh-lan](https://github.com/moxisuki/dsh-lan) | 3 | ⚪ unknown | 一条 overlay 把 dsh web 暴露到局域网。 |
| [DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) | 3 | ⚪ unknown | 通过 Telegram 远程与 DeepSeek Harness 对话。 |
| [dsh-onlyne](https://github.com/dbydd/dsh-onlyne) | 2 | ⚪ unknown | dsh-onlyne — DSH 插件（其他） |
| [dsh-lark](https://github.com/Roy-oss1/dsh-lark) | 2 | ⚪ unknown | dsh-lark — DSH 插件（其他） |
| [dsh-chatnode-wechat](https://github.com/Jesse-njx/dsh-chatnode-wechat) | 1 | ⚪ unknown | dsh-chatnode-wechat — DSH 插件（其他） |
| [dsh-im-bridge](https://github.com/BiBoyang/dsh-im-bridge) | 1 | ⚪ unknown | DSH 插件：把 DeepSeek Harness 桥接到 IM（v0.1 微信/iLink；钉钉/飞书/Telegram 预留）。turn/approval 推送 + 远程批准/注入，持久去重/收敛分段/合并窗口。 |
| [dsh-lark-bridge](https://github.com/imetn/dsh-lark-bridge) | 1 | ⚪ unknown | dsh-lark-bridge — DSH 插件（其他） |
| [dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) | 1 | ⚪ unknown | dsh-openclaw-acp — DSH 插件（其他） |
| [dsh-tool-notify](https://github.com/rizkirmdhnnn/dsh-tool-notify) | 0 | ⚪ unknown | dsh-tool-notify — DSH 插件（其他） |
| [dsh2wechat](https://github.com/wuyuanjiang1/dsh2wechat) | 0 | ⚪ unknown | dsh2wechat — DSH 插件（其他） |

> 徽章含义：🟢 兼容 · 🔴 不兼容 · ⚪ 未实测 · ⚫ 弃坑。
> 共 538 个条目，按分类分表、类内按 ⭐ 降序。收录 / 字段词典见 [docs/catalog-schema.md](docs/catalog-schema.md)。
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
