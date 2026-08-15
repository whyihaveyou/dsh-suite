# dsh-suite

![GitHub stars](https://img.shields.io/github/stars/whyihaveyou/dsh-suite?style=flat-square&color=facc15)
![Plugins](https://img.shields.io/badge/plugins-1270-facc15?style=flat-square)
![Daily compat](https://img.shields.io/github/actions/workflow/status/whyihaveyou/dsh-suite/compat.yml?branch=main&label=daily-compat-check&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square)

> 🌐 中文 · [English](README.en.md)

**别再翻 `dsh-plugin` topic 了，这里都是还能跑的插件。**

`dsh-suite` 是 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）插件的**活目录**——**每小时自动刷新、每日兼容实测**——外加 DSH 内置**插件商店**、`create-dsh-plugin` 脚手架和几个自研插件。

[![目录网站](https://img.shields.io/badge/🌐_目录网站-whyihaveyou.github.io/dsh--suite-4d6bfe?style=for-the-badge)](https://whyihaveyou.github.io/dsh-suite/zh.html)

[![dsh-suite 目录网站](https://whyihaveyou.github.io/dsh-suite/preview/2026-08-14/home-zh.png)](https://whyihaveyou.github.io/dsh-suite/zh.html)

---

## 为什么做 dsh-suite

DSH 发布时没有官方插件 registry。现在找插件只能翻 GitHub 的 `dsh-plugin` topic（50+ 个零散小插件）和当天冒出来的几个静态 awesome-list——而 DSH 自己还在发**破坏性变更**（breaking changes）。

所以我们做了四件事：

1. **一个「活」目录**——880+ 精选插件，CI **每小时**刷新数据、**每天**把收录的包真实装进临时 profile 重测兼容性。
2. **一个内置插件商店**——`@dsh-suite/plugin-manager` 在 DSH Web UI 的设置页里加一个 **Store** 标签：逛目录、搜索、看徽章、一键安装，全程不用离开 DSH。
3. **一个脚手架**——`npm create dsh-plugin` 一条命令生成可跑的 `dsh.bundle` + Cordis 骨架。官方没给脚手架，而「怎么迁移我的插件」是社区呼声最高的需求之一。
4. **几个自研插件**——不是纯搬运，有第一方产出。

## 快速开始

```bash
# 1. 逛目录网站
open https://whyihaveyou.github.io/dsh-suite/zh.html

# 2. 把插件商店装进你的 DSH Web UI
npx @deepseek-ai/dsh plugin --profile web add @dsh-suite/plugin-manager
#    → 重启 Web UI，然后 设置 → Plugins → Store

# 3.（开发者）造一个自己的插件
npm create dsh-plugin@latest my-plugin
```

![DSH Web UI 里的插件商店 Store 标签页](site/assets/store-tab.png)

## 📚 插件目录

<!-- CATALOG:START -->
### ⭐ 精选

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 2114 | ⚪ unknown | DSH Web UI 插件与皮肤合集：任务板、Git 面板等 |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 846 | ⚪ unknown | 侧边栏完整工作台：文件渲染/终端/Git/子代理 |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 671 | ⚪ unknown | DSH Web 鲸鱼娘皮肤系列（深海女仆工坊） |
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 365 | ⚪ unknown | 给纯文本模型加视觉：图片问答、长截图 OCR、UI 还原 |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 55 | ⚪ unknown | 把 Claude Code 的 UltraCode 模式带给 DSH，多 Agent 调度可治理 |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 46 | ⚪ unknown | 对话回退：回滚会话与工作区状态 |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 43 | ⚪ unknown | Skill 驱动的 Harness/Loop 工程工作流插件 |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 31 | ⚪ unknown | 自定义「鲸鱼娘」思考状态的显示 |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 23 | ⚪ unknown | Monaco 编辑器创建沙箱 JS 工具 |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 18 | ⚪ unknown | DSH 对话分享插件 |
| [distill](https://github.com/LoserFox/distill) | 16 | ⚪ unknown | 自动对话蒸馏：后台 subagent 反省 + 技能更新 |
| [all (全家桶)](https://github.com/whyihaveyou/dsh-suite) | 15 | 🟢 ok | 全家桶聚合包：一次安装带入第一方全家桶——插件商店、IM 通知、会话导出、多 agent 任务板。 |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun 与 DSH ACP 交互对接 |
| [plugin-manager](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | DSH Web UI 内置插件商店：浏览 dsh-suite 目录、搜索/筛选/排序、兼容徽章、一键安装——设置页插件区的 Store 标签页。 |
| [plugin-team-board](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | 多 agent 会话共享任务看板：跨 subagent 创建/认领/更新/查询任务，基于 append-only 会话日志持久化。 |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 把 append-only 会话日志导出成人读的 Markdown / HTML，按来源分组渲染（系统提示 / 思维链 / 工具调用 / 子agent）。 |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 一键脚手架生成 DeepSeek Harness (DSH) 插件：tool / events / webui 三套模板、next 标签版本锁定、内置 --verify 冒烟测试。 |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 回合完成 / 出错 / 待审批时，把通知推到 IM webhook（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义）+ 本机系统通知。 |
| [themes (皮肤中心)](https://github.com/whyihaveyou/dsh-themes) | 1 | 🟢 ok | 皮肤中心：151 款昼夜成对皮肤一包打尽——网格预览、搜索、DSH Web UI 内一键试穿。 |

### 🧰 工具

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [open-managed-agents](https://github.com/openma-ai/open-managed-agents) | 235 | ⚪ unknown | Claude Managed Agents API 的开源自托管平台（Cloudflare Workers） |
| [role-model](https://github.com/try-works/role-model) | 101 | ⚪ unknown | 按任务把请求路由到「正确的模型」（本地/云） |
| [irmia_devkit_open](https://github.com/irmia2026/irmia_devkit_open) | 39 | ⚪ unknown | Python 开发工具包（无描述） |
| [HoloGram](https://github.com/834063245-creator/HoloGram) | 23 | ⚪ unknown | 3D 代码依赖拓扑图生成器（14 语言） |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 23 | ⚪ unknown | Monaco 编辑器创建沙箱 JS 工具 |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun 与 DSH ACP 交互对接 |
| [fabric](https://github.com/omdsh-dev/fabric) | 9 | ⚪ unknown | 类似 MC Fabric 的 hook 处理器 |
| [dsh-git-identity](https://github.com/LoserFox/dsh-git-identity) | 7 | ⚪ unknown | git 提交固定使用环境作者身份 |
| [Hypr-Agent-Protal](https://github.com/gfhdhytghd/Hypr-Agent-Protal) | 4 | ⚪ unknown | Hyprland 的 Computer Use MCP |
| [telegram](https://github.com/LoserFox/telegram) | 6 | ⚪ unknown | Telegram Bot API 桥接（长轮询） |
| [agent-knock-knock](https://github.com/scotthuang/agent-knock-knock) | 4 | ⚪ unknown | OpenClaw 插件：共享 tmux 控制本地 Codex/Claude Code |
| [dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) | 7 | ⚪ unknown | bash 输出编码自动识别（UTF-16LE/UTF-8/GBK） |
| [dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) | 21 | ⚪ unknown | 连数据库、写 SQL 的插件 |
| [dsh-doctor](https://github.com/coppynight/dsh-doctor) | 3 | ⚪ unknown | flutter-doctor 风格诊断与安全自动修复 |
| [dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) | 26 | ⚪ unknown | 跨实例消息/事件交接插件 |
| [dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) | 24 | ⚪ unknown | OpenBiliClaw 内容推荐 Agent 接入 DSH |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 17 | ⚪ unknown | 扫描插件仓库清单协议/patch 格式/构建陷阱 |
| [dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) | 11 | ⚪ unknown | 本机安全审计：配置/插件来源/会话/网络暴露面 |
| [dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) | 4 | ⚪ unknown | CSV 解析/查询/统计/转换工具 |
| [dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) | 16 | ⚪ unknown | 零依赖工具包合集（time/encoding/json/csv/regex） |
| [atomstudio](https://github.com/AtomicsLaboratory/atomstudio) | 1 | ⚪ unknown | 可执行文档工程环境 |
| [dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 2 | ⚪ unknown | 通过 cc-connect 远程使用 DSH |
| [dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) | 19 | ⚪ unknown | Mnemon 三层记忆体深度集成 |
| [dsh-paseo](https://github.com/renat3u/dsh-paseo) | 2 | ⚪ unknown | DSH 的 paseo 插件扩展支持 |
| [dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) | 10 | ⚪ unknown | DSH 插件开发踩坑档案（skill+文档） |
| [dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) | 6 | ⚪ unknown | 安全数学表达式求值器 |
| [dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) | 3 | ⚪ unknown | 文本/JSON/CSV/Markdown 结构化 diff |
| [dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) | 3 | ⚪ unknown | base64/hex/url 编解码 + 哈希工具 |
| [dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) | 3 | ⚪ unknown | JMESPath JSON 查询工具 |
| [dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) | 3 | ⚪ unknown | HTML↔Markdown 转换、GFM 表格规范化 |
| [dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) | 3 | ⚪ unknown | 正则测试/捕获/安全替换工具 |
| [dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) | 3 | ⚪ unknown | JSON Schema 验证工具 |
| [dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) | 4 | ⚪ unknown | 描述统计/百分位/相关性工具 |
| [dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) | 4 | ⚪ unknown | ISO 8601/时区/日历运算时间工具 |
| [dsh-trace](https://github.com/vibeinging/dsh-trace) | 2 | ⚪ unknown | DSH 遥测后端：导出轮次/步骤/工具 |
| [sandbox-micro](https://github.com/omdsh-dev/sandbox-micro) | 3 | ⚪ unknown | microsandbox 支持 |
| [zotero-harvest](https://github.com/Fisfzy/zotero-harvest) | 5 | ⚪ unknown | Zotero 文献采集入库插件（OpenAlex/arXiv/Crossref） |
| [dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) | 9 | ⚪ unknown | DSH 运维工具箱：每日快照 A/B 双槽轮换、一键回滚 |
| [dsh-inspect](https://github.com/omdsh-dev/dsh-inspect) | 5 | ⚪ unknown | 检查→修复→复查的对抗式闭环插件 |
| [dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) | 6 | ⚪ unknown | OpenMAIC：课堂/幻灯片/交互式组件 |
| [dsh-plugin-mineru](https://github.com/HuanLinOTO/dsh-plugin-mineru) | 14 | ⚪ unknown | MineRU 文档解析工具 |
| [dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) | 2 | ⚪ unknown | 编辑用户与内置系统提示段（实时预览） |
| [dsh-scholar](https://github.com/lzszq/dsh-scholar) | 15 | ⚪ unknown | dsh-scholar（文献相关） |
| [dsh-ssh](https://github.com/UynajGI/dsh-ssh) | 4 | ⚪ unknown | SSH 远程执行：ProxyJump 链、SFTP |
| [dsh-tool-search](https://github.com/vibeinging/dsh-tool-search) | 2 | ⚪ unknown | 按 agent 按需工具发现与渐进 schema 披露 |
| [dsh-webbridge](https://github.com/bill9109/dsh-webbridge) | 3 | ⚪ unknown | DSH 结合 Kimi WebBridge |
| [ego-browser](https://github.com/Fisfzy/ego-browser) | 13 | ⚪ unknown | 把 ego-lite 浏览器接入 DSH（给 Agent 用的 Chromium） |
| [math-lean](https://github.com/Fisfzy/math-lean) | 1 | ⚪ unknown | Lean 内核验证的数学推理插件 |
| [plugin-template](https://github.com/omdsh-dev/plugin-template) | 5 | ⚪ unknown | 官方 turtle ui 仓库派生的插件模板 |
| [Qwen-MM-Plugins](https://github.com/omdsh-dev/Qwen-MM-Plugins) | 4 | ⚪ unknown | Qwen-MM-Plugins 支持 |
| [sandbox-mxc](https://github.com/omdsh-dev/sandbox-mxc) | 2 | ⚪ unknown | 微软跨平台沙盒支持 |
| [sandbox-nono](https://github.com/omdsh-dev/sandbox-nono) | 3 | ⚪ unknown | nono 沙盒支持 |
| [web-components](https://github.com/omdsh-dev/web-components) | 2 | ⚪ unknown | web-components 支持 |
| [zotero-wave-rag](https://github.com/Fisfzy/zotero-wave-rag) | 2 | ⚪ unknown | 面向 Zotero 论文库的浪潮式 RAG 检索 |
| [modsearch](https://github.com/liustack/modsearch) | 98 | ⚪ unknown | DeepSeek Harness 的联网搜索插件。 |
| [dsh-browser](https://github.com/Lum1104/dsh-browser) | 104 | ⚪ unknown | Chrome 侧边栏扩展，让 DSH 操控浏览器。 |
| [dsh-openapi](https://github.com/Degurechaff57/dsh-openapi) | 4 | ⚪ unknown | 安全 OpenAPI 3.x 发现与 API 调用工具。 |
| [dsh-better-browser](https://github.com/titanwings/dsh-better-browser) | 7 | ⚪ unknown | 通过 Kimi WebBridge 让 agent 操作用户已登录浏览器。 |
| [dsh-worktree](https://github.com/FlashingChen/dsh-worktree) | 4 | ⚪ unknown | Codex 风格永久 git worktree 插件。 |
| [graycode-for-dsh](https://github.com/Komeiji-Shiki/graycode-for-dsh) | 5 | ⚪ unknown | graycode 编码工具。 |
| [dsh-expression](https://github.com/yyh-001/dsh-expression) | 4 | ⚪ unknown | 找得到、发得出 —— DSH 表情包插件：语义搜图，只发真实文件，走 companion QQ 通道 |
| [dsh-director-toolkit](https://github.com/lhmd/dsh-director-toolkit) | 7 | ⚪ unknown | dsh-director-toolkit — DSH 插件（工具） |
| [codex-plugin-dsh](https://github.com/wingoo/codex-plugin-dsh) | 4 | ⚪ unknown | codex-plugin-dsh — DSH 插件（工具） |
| [dsh-prompt-persona](https://github.com/Xilin3/dsh-prompt-persona) | 4 | ⚪ unknown | dsh-prompt-persona — DSH 插件（工具） |
| [dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) | 2 | ⚪ unknown | dsh-tool-policy — DSH 插件（工具） |
| [dsh-plugin-graph](https://github.com/erduotong/dsh-plugin-graph) | 2 | ⚪ unknown | 一个Deepseek Harness的插件关系图谱可视化插件 |
| [dsh-research-notes](https://github.com/fff122/dsh-research-notes) | 3 | ⚪ unknown | dsh-research-notes — DSH 插件（工具） |
| [nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) | 5 | ⚪ unknown | nowledge-mem-deepseek-harness — DSH 插件（工具） |
| [dsh-vsc-integration](https://github.com/HarcoChen/dsh-vsc-integration) | 5 | ⚪ unknown | dsh-vsc-integration — DSH 插件（工具） |
| [dsh-safe-delete](https://github.com/Qintsg/dsh-safe-delete) | 3 | ⚪ unknown | dsh-safe-delete — DSH 插件（工具） |
| [dsh-plugins](https://github.com/HackSing/dsh-plugins) | 4 | ⚪ unknown | dsh-plugins — DSH 插件（工具） |
| [dsh-report-html](https://github.com/hccccc01333/dsh-report-html) | 3 | ⚪ unknown | dsh-report-html — DSH 插件（工具） |
| [dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) | 2 | ⚪ unknown | dsh-openai-codex-auth — DSH 插件（工具） |
| [dsh-github-connector](https://github.com/kaziii/dsh-github-connector) | 4 | ⚪ unknown | dsh-github-connector — DSH 插件（工具） |
| [deepseek-pet](https://github.com/keleus/deepseek-pet) | 10 | ⚪ unknown | 在你的deepseek-harness上养一只吃白饭的大蓝鲸 |
| [dsh-index](https://github.com/Sunrisepeak/dsh-index) | 2 | ⚪ unknown | dsh-index — DSH 插件（工具） |
| [dsh-web-search-firecrawl](https://github.com/yangzhe1003/dsh-web-search-firecrawl) | 2 | ⚪ unknown | dsh-web-search-firecrawl — DSH 插件（工具） |
| [dsh-plugin-template](https://github.com/bugmaker2/dsh-plugin-template) | 12 | ⚪ unknown | dsh-plugin-template — DSH 插件（工具） |
| [dsh-composer-history](https://github.com/PerryLink/dsh-composer-history) | 3 | ⚪ unknown | dsh-composer-history — DSH 插件（工具） |
| [dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) | 3 | ⚪ unknown | DSH 行情跑马灯插件：可自选标的的加密/汇率/A股/指数/港美股跑马灯，免 key 数据源，宿主代理+缓存 |
| [jumpserver-dsh](https://github.com/jumpserver-east/jumpserver-dsh) | 1 | ⚪ unknown | jumpserver-dsh — DSH 插件（工具） |
| [dsh-browser](https://github.com/ben7am1n/dsh-browser) | 1 | ⚪ unknown | dsh-browser — DSH 插件（工具） |
| [dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) | 1 | ⚪ unknown | dsh-dev-actions — DSH 插件（工具） |
| [dsh-plugin-doctor](https://github.com/lin-cheng-lab/dsh-plugin-doctor) | 1 | ⚪ unknown | DSH 插件体检：安装前检查 peer 版本兼容性，防止 rc 不匹配崩溃 🩺 |
| [deepseek-harness-background](https://github.com/czzzlq/deepseek-harness-background) | 2 | ⚪ unknown | deepseek-harness-background — DSH 插件（工具） |
| [task-passport](https://github.com/dongsheng123132/task-passport) | 5 | ⚪ unknown | task-passport — DSH 插件（工具） |
| [dsh-prompt-presets](https://github.com/fff122/dsh-prompt-presets) | 1 | ⚪ unknown | dsh-prompt-presets — DSH 插件（工具） |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 3 | ⚪ unknown | dsh-hub — DSH 插件（工具） |
| [dsh-plugin-colorscheme](https://github.com/Civitasv/dsh-plugin-colorscheme) | 2 | ⚪ unknown | dsh-plugin-colorscheme — DSH 插件（工具） |
| [dsh-scout](https://github.com/omdsh-dev/dsh-scout) | 2 | ⚪ unknown | 面向 DeepSeek Harness 的只读环境探测插件，为智能体提供运行环境、软件版本、系统资源、端口、服务、硬件及工作区信息。 |
| [dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) | 1 | ⚪ unknown | dsh-screenshot-diff — DSH 插件（工具） |
| [dsh-turn-index](https://github.com/Simon314620/dsh-turn-index) | 1 | ⚪ unknown | deepseek harness的侧边栏对话轮次索引插件 |
| [dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) | 2 | ⚪ unknown | dsh-mobile-control — DSH 插件（工具） |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 3 | ⚪ unknown | dsh-hub — DSH 插件（工具） |
| [dsh-tool-monitor](https://github.com/yoke233/dsh-tool-monitor) | 1 | ⚪ unknown | dsh-tool-monitor — DSH 插件（工具） |
| [dsh-suggest-prompt](https://github.com/studyzy/dsh-suggest-prompt) | 1 | ⚪ unknown | dsh-suggest-prompt — DSH 插件（工具） |
| [dsh-cloudflare-browser-run](https://github.com/RealAlexandreAI/dsh-cloudflare-browser-run) | 1 | ⚪ unknown | dsh-cloudflare-browser-run — DSH 插件（工具） |
| [safe-find-dsh-plugins](https://github.com/Jinsong-Zhou/safe-find-dsh-plugins) | 2 | ⚪ unknown | safe-find-dsh-plugins — DSH 插件（工具） |
| [dsh-all-search](https://github.com/RealAlexandreAI/dsh-all-search) | 1 | ⚪ unknown | dsh-all-search — DSH 插件（工具） |
| [dsh-plugin-pixluna](https://github.com/PixLunaLab/dsh-plugin-pixluna) | 2 | ⚪ unknown | dsh-plugin-pixluna — DSH 插件（工具） |
| [dsh-plugins-hub](https://github.com/TYEclipse/dsh-plugins-hub) | 2 | ⚪ unknown | dsh-plugins-hub — DSH 插件（工具） |
| [dsh-huadongbianzuqi](https://github.com/zjl88858/dsh-huadongbianzuqi) | 6 | ⚪ unknown | DeepSeek Harness的滑动变祖器插件 |
| [dsh-soul-md](https://github.com/Scorp1o117/dsh-soul-md) | 2 | ⚪ unknown | dsh-soul-md — DSH 插件（工具） |
| [dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) | 3 | ⚪ unknown | dsh-daily-fortune — DSH 插件（工具） |
| [dsh-plugin-rag](https://github.com/YYTbit/dsh-plugin-rag) | 1 | ⚪ unknown | dsh-plugin-rag — DSH 插件（工具） |
| [dsh-model-selector](https://github.com/bitterSmilezzz/dsh-model-selector) | 1 | ⚪ unknown | dsh-model-selector — DSH 插件（工具） |
| [dsh-github](https://github.com/PerryLink/dsh-github) | 3 | ⚪ unknown | dsh-github — DSH 插件（工具） |
| [dsh-plugin-review](https://github.com/Mingxi2077/dsh-plugin-review) | 2 | ⚪ unknown | dsh-plugin-review — DSH 插件（工具） |
| [dsh-turn-budget](https://github.com/randerous/dsh-turn-budget) | 1 | ⚪ unknown | dsh-turn-budget — DSH 插件（工具） |
| [DIzzy-DSH](https://github.com/Acidmoon/DIzzy-DSH) | 3 | ⚪ unknown | DIzzy-DSH — DSH 插件（工具） |
| [dsh-file-explorer](https://github.com/schhaohao/dsh-file-explorer) | 2 | ⚪ unknown | dsh-file-explorer — DSH 插件（工具） |
| [dsh-tool-reqpipe](https://github.com/sikwoxy/dsh-tool-reqpipe) | 1 | ⚪ unknown | dsh-tool-reqpipe — DSH 插件（工具） |
| [dsh-ajw](https://github.com/rsagacom/dsh-ajw) | 1 | ⚪ unknown | DS安甲网 (ds.ajw.cn) · 为你的 DeepSeek Harness 机器人 安装上所需功能的装甲吧 — 每日聚合 DeepSeek Harness / DSH 插件生态开源项目 |
| [dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) | 3 | ⚪ unknown | dsh-fun-typewriter — DSH 插件（工具） |
| [dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) | 1 | ⚪ unknown | dsh-port-guard — DSH 插件（工具） |
| [qiushi-dsh-evidence-audit](https://github.com/030611/qiushi-dsh-evidence-audit) | 4 | ⚪ unknown | qiushi-dsh-evidence-audit — DSH 插件（工具） |
| [dsh-plugin.github.io](https://github.com/dsh-plugin/dsh-plugin.github.io) | 1 | ⚪ unknown | dsh-plugin.github.io — DSH 插件（工具） |
| [dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) | 2 | ⚪ unknown | dsh-weixin — DSH 插件（工具） |
| [dsh-lens-lite](https://github.com/ben7am1n/dsh-lens-lite) | 1 | ⚪ unknown | dsh-lens-lite — DSH 插件（工具） |
| [dsh-tavily-search](https://github.com/zhouzhencheng07/dsh-tavily-search) | 2 | ⚪ unknown | dsh-tavily-search — DSH 插件（工具） |
| [dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) | 2 | ⚪ unknown | dsh-sticky-disclosure — DSH 插件（工具） |
| [dsh-openai-codex-oauth](https://github.com/dyuan311/dsh-openai-codex-oauth) | 2 | ⚪ unknown | dsh-openai-codex-oauth — DSH 插件（工具） |
| [dshx](https://github.com/why913/dshx) | 2 | ⚪ unknown | dshx — DSH 插件（工具） |
| [dsh-reloader](https://github.com/lin-cheng-lab/dsh-reloader) | 1 | ⚪ unknown | DSH 一键重启：装完插件说一句 reload 就自动重启生效，不用手动 Ctrl+C 🔄 |
| [dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) | 1 | ⚪ unknown | dsh-bisect-debug — DSH 插件（工具） |
| [dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) | 3 | ⚪ unknown | DSH Web里的自走棋插件：人机对战或双AI对弈 |
| [dsh-turn-meta](https://github.com/randerous/dsh-turn-meta) | 1 | ⚪ unknown | dsh-turn-meta — DSH 插件（工具） |
| [dsh-tool-browser](https://github.com/MashedPotato817/dsh-tool-browser) | 1 | ⚪ unknown | dsh-tool-browser — DSH 插件（工具） |
| [dsh-music-plugin](https://github.com/syy-shark/dsh-music-plugin) | 3 | ⚪ unknown | dsh-music-plugin — DSH 插件（工具） |
| [dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) | 1 | ⚪ unknown | dsh-batch-regression — DSH 插件（工具） |
| [dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) | 1 | ⚪ unknown | dsh-browser-control — DSH 插件（工具） |
| [dsh-code-ide](https://github.com/SakalioLabs/dsh-code-ide) | 1 | ⚪ unknown | dsh-code-ide — DSH 插件（工具） |
| [matlab-modelsim-vivado-plugin](https://github.com/sjscy05/matlab-modelsim-vivado-plugin) | 2 | ⚪ unknown | matlab-modelsim-vivado-plugin — DSH 插件（工具） |
| [dsh-codex](https://github.com/Yan-Zero/dsh-codex) | 9 | ⚪ unknown | dsh-codex — DSH 插件（工具） |
| [dsh-plugins](https://github.com/0sour/dsh-plugins) | 1 | ⚪ unknown | dsh-plugins — DSH 插件（工具） |
| [dsh-2origin](https://github.com/dongsheng123132/dsh-2origin) | 3 | ⚪ unknown | dsh-2origin — DSH 插件（工具） |
| [dsh-terminal](https://github.com/ZgblKylin/dsh-terminal) | 3 | ⚪ unknown | dsh-terminal — DSH 插件（工具） |
| [dsh-survey](https://github.com/jinhuang712/dsh-survey) | 2 | ⚪ unknown | 问卷式批量提问插件 for DeepSeek Harness：一次性问 10+ 题（单选/多选/是否 toggle/对比题/开放题），可跳过、全屏浮层、提交后对半 recap |
| [deepseek-harness-plugin-manager](https://github.com/hrhgit/deepseek-harness-plugin-manager) | 3 | ⚪ unknown | deepseek-harness-plugin-manager — DSH 插件（工具） |
| [dsh-co-authored-by](https://github.com/shelken/dsh-co-authored-by) | 2 | ⚪ unknown | dsh-co-authored-by — DSH 插件（工具） |
| [DSH-Plugs](https://github.com/JustGenius-s/DSH-Plugs) | 5 | ⚪ unknown | DSH-Plugs — DSH 插件（工具） |
| [dsh-host-web-compat](https://github.com/kelai141/dsh-host-web-compat) | 1 | ⚪ unknown | dsh 宿主插件——经 webserver 钩子向页面注入旧内核浏览器 polyfill。 |
| [dsh-doctor](https://github.com/jorinyang/dsh-doctor) | 1 | ⚪ unknown | dsh-doctor — DSH 插件（工具） |
| [dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) | 0 | ⚪ unknown | dsh-code-intel — DSH 插件（工具） |
| [dsh-doctor](https://github.com/asdf17128/dsh-doctor) | 1 | ⚪ unknown | dsh-doctor — DSH 插件（工具） |
| [dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) | 1 | ⚪ unknown | dsh-backup-sync — DSH 插件（工具） |
| [dsh-auto](https://github.com/simon300000/dsh-auto) | 3 | ⚪ unknown | dsh-auto — DSH 插件（工具） |
| [dsh-annotate](https://github.com/BrambleXu/dsh-annotate) | 5 | ⚪ unknown | dsh-annotate — DSH 插件（工具） |
| [dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) | 7 | ⚪ unknown | dsh-codex-connect — DSH 插件（工具） |
| [DSH-Decktop](https://github.com/JustGenius-s/DSH-Decktop) | 20 | ⚪ unknown | DSH-Decktop — DSH 插件（工具） |
| [dsh-cad-review](https://github.com/dongsheng123132/dsh-cad-review) | 3 | ⚪ unknown | dsh-cad-review — DSH 插件（工具） |
| [dsh-xai](https://github.com/MirDie/dsh-xai) | 2 | ⚪ unknown | dsh-xai — DSH 插件（工具） |
| [dsh-academic-research](https://github.com/userInner/dsh-academic-research) | 0 | ⚪ unknown | dsh-academic-research — DSH 插件（工具） |
| [dsh-plugin-hello](https://github.com/xu1132/dsh-plugin-hello) | 0 | ⚪ unknown | dsh-plugin-hello — DSH 插件（工具） |
| [deepseek-harness-rs](https://github.com/Tokimorphling/deepseek-harness-rs) | 1 | ⚪ unknown | deepseek-harness-rs — DSH 插件（工具） |
| [dsh-prompt-enhancer](https://github.com/Fishsb/dsh-prompt-enhancer) | 3 | ⚪ unknown | DeepSeek Harness DSH 提示词增强插件：✨ 一键优化草稿 |
| [dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) | 1 | ⚪ unknown | dsh-specflow — DSH 插件（工具） |
| [dsh-plugins](https://github.com/ohtokaah-sys/dsh-plugins) | 0 | ⚪ unknown | dsh-plugins — DSH 插件（工具） |
| [dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) | 4 | ⚪ unknown | dsh-verification-receipt — DSH 插件（工具） |
| [dsh-tool-chaos](https://github.com/cyanseek/dsh-tool-chaos) | 0 | ⚪ unknown | dsh-tool-chaos — DSH 插件（工具） |
| [dsh-robotic-harness](https://github.com/dingkaihu63/dsh-robotic-harness) | 12 | ⚪ unknown | dsh-robotic-harness — DSH 插件（工具） |
| [dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) | 1 | ⚪ unknown | dsh-codex-subscription — DSH 插件（工具） |
| [dsh-sticky-note](https://github.com/Meredith2328/dsh-sticky-note) | 6 | ⚪ unknown | DSH 便签插件：随手记点子/感想/TODO，Markdown 预览 + 快捷键 + 历史归档，存储路径可配置 |
| [dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) | 0 | ⚪ unknown | dsh-gen3d — DSH 插件（工具） |
| [dsh-mdbox](https://github.com/Chi-hong22/dsh-mdbox) | 0 | ⚪ unknown | dsh-mdbox — DSH 插件（工具） |
| [dsh-kanban](https://github.com/isolat-3k/dsh-kanban) | 2 | ⚪ unknown | 一个Hermes风格的看板插件，在deepseek harness上使用 |
| [dsh-tool-git](https://github.com/lxj808624/dsh-tool-git) | 3 | ⚪ unknown | dsh-tool-git — DSH 插件（工具） |
| [dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) | 0 | ⚪ unknown | dsh-header-status — DSH 插件（工具） |
| [dsh-mcp-manager](https://github.com/1a125/dsh-mcp-manager) | 1 | ⚪ unknown | dsh-mcp-manager — DSH 插件（工具） |
| [dsh-tray](https://github.com/qing3a/dsh-tray) | 0 | ⚪ unknown | dsh-tray — DSH 插件（工具） |
| [dsh-oauth-mcp-client](https://github.com/springbrand-lab/dsh-oauth-mcp-client) | 6 | ⚪ unknown | OAuth 2.1 Streamable HTTP MCP client plugin for DeepSeek Harness. |
| [dsh-playwright-browser](https://github.com/Clizo1209/dsh-playwright-browser) | 7 | ⚪ unknown | Playwright browser automation for DeepSeek Harness｜面向 DeepSeek Harness 的 Playwright 浏览器自动化插件 |
| [deepseek-harness-action](https://github.com/Lixiaoyiao/deepseek-harness-action) | 7 | ⚪ unknown | Community GitHub Action for DeepSeek Harness — AI Code Review · CI Diagnosis · Auto Fix · Issue → PR |
| [Oh-My-DSH](https://github.com/NoWint/Oh-My-DSH) | 6 | ⚪ unknown | DeepSeek Harness 插件精选集 · 300+ dsh-plugin 收录 · 22 大分类 |
| [dsh-win-terminal-inspector](https://github.com/clearkurt/dsh-win-terminal-inspector) | 3 | ⚪ unknown | Windows (win32) terminal inspection for DSH persistent/PTY shells |
| [dsh-tool-hashline](https://github.com/InklingYoshi584/dsh-tool-hashline) | 2 | ⚪ unknown | Hash-anchored read/edit/grep tools for DeepSeek Harness: every line carries a content hash, stale anchors are rejected before tou… |
| [dsh-view-modes](https://github.com/NigelYao/dsh-view-modes) | 1 | ⚪ unknown | view modes for deepseek harness, including Verbose, Normal, Summary Mode |
| [dsh-codex-oauth](https://github.com/Babulubobo/dsh-codex-oauth) | 1 | ⚪ unknown | use your codex subscription in deepseek harness |
| [dsh-figma-to-lottie](https://github.com/zimai233/dsh-figma-to-lottie) | 1 | ⚪ unknown | Figma/SVG to Lottie animation compiler for DeepSeek Harness. Turn SVG paths and keyframe data into self-contained .lottie.json fi… |
| [opencode-usage](https://github.com/AmaTsumeAkira/opencode-usage) | 1 | ⚪ unknown | OpenCode Go 订阅额度徽章插件（dsh bundle） | OpenCode Go quota badge plugin for dsh |
| [dsh-plugin-git-inspect](https://github.com/Wanbinyu/dsh-plugin-git-inspect) | 1 | ⚪ unknown | Read-only Git inspection tools for DeepSeek Harness |
| [dsh-html-canvas](https://github.com/Jinsong-Zhou/dsh-html-canvas) | 2 | ⚪ unknown | A DeepSeek Harness plugin that turns AI-generated HTML into a click-to-edit canvas beside the chat |
| [dsh-turn-approval](https://github.com/arrow949/dsh-turn-approval) | 2 | ⚪ unknown | Turn-scoped "Allow for this task" approvals for DeepSeek Harness. |
| [dsh-plugins](https://github.com/mouliangyu/dsh-plugins) | 1 | ⚪ unknown | Community plugins for DeepSeek Harness |
| [dsh-plugin-knowledge-graph](https://github.com/Luke-Yong/dsh-plugin-knowledge-graph) | 3 | ⚪ unknown | dsh-plugin-knowledge-graph for Deepseek Harness |
| [dsh-document-parser](https://github.com/miaobuao/dsh-document-parser) | 1 | ⚪ unknown | A DeepSeek Harness document parsing tool powered by LiteParse |
| [long-draft-input](https://github.com/Heyflyingpig/long-draft-input) | 3 | ⚪ unknown | Deepseek Harness 插件：用于聚合发送框长文本 |
| [dsh-playwright-native](https://github.com/mitao-su/dsh-playwright-native) | 1 | ⚪ unknown | 把原生 Playwright CLI 注册为 DeepSeek Harness 透传工具（dsh-plugin） |
| [dsh-composer-polish](https://github.com/tianji-qingtian/dsh-composer-polish) | 12 | ⚪ unknown | DeepSeek Harness plugin: one-click ✨ composer draft polishing — flash rewrite, auto fill-back into the input box |
| [dsh-code-impact](https://github.com/baidd1011/dsh-code-impact) | 2 | ⚪ unknown | 面向 DeepSeek Harness 的只读 TypeScript/JavaScript 代码变更影响分析插件 Read-only TypeScript/JavaScript change impact analysis plugin for DeepSe… |
| [dsh-oauth-api](https://github.com/hahaha-taotao/dsh-oauth-api) | 1 | ⚪ unknown | DeepSeek Harness (dsh) out-of-tree OAuth plugin for Grok/xAI, Codex, and Claude Code. Community plugin, not official. |
| [dsh-plugin](https://github.com/acosmi/dsh-plugin) | 2 | ⚪ unknown | Community plugin collection for DeepSeek Harness (DSH) |
| [dsh-zh-output](https://github.com/YKennen/dsh-zh-output) | 3 | ⚪ unknown | DeepSeek Harness 中文输出插件：强制中文思考与输出的中文预设 |
| [dsh-excel-chat](https://github.com/hccccc01333/dsh-excel-chat) | 3 | ⚪ unknown | dsh-excel-chat — talk to Excel in DeepSeek Harness: create, edit, repair, and verify spreadsheets by conversation (cells, formula… |
| [dsh-eyecare](https://github.com/Yummyxl/dsh-eyecare) | 2 | ⚪ unknown | dsh护眼插件 |
| [dsh-plugin-healthcheck](https://github.com/chenw2759-wq/dsh-plugin-healthcheck) | 4 | ⚪ unknown | 害怕插件装了就崩溃？用这个插件帮你检测插件是否正常/是否含木马！ |
| [deepseek-harness-openai-oauth](https://github.com/DGPisces/deepseek-harness-openai-oauth) | 5 | ⚪ unknown | DeepSeek Harness provider for GPT models using managed ChatGPT OAuth through Codex app-server |
| [dsh-plugin-browser](https://github.com/xu1132/dsh-plugin-browser) | 1 | ⚪ unknown | A DeepSeek Harness community plugin that drives a headless Playwright browser: rendered page text, screenshots, and page automati… |
| [deepseek-plugin-store](https://github.com/Ericwong5021/deepseek-plugin-store) | 12 | ⚪ unknown | DeepSeek Harness 独立社区插件商店：发现、安装并提交经过验证的插件、工具与扩展。 | Independent community plugin directory. |
| [dsh-plugin-store](https://github.com/wink-run/dsh-plugin-store) | 3 | ⚪ unknown | deepseek harness plugin store |
| [dsh-aura-scheduler](https://github.com/ljsysfurryACE/dsh-aura-scheduler) | 0 | ⚪ unknown | Proactive scheduling for DeepSeek Harness: Aura heartbeat + value network (official is model-driven only) |
| [harness-pet](https://github.com/cakeni/harness-pet) | 3 | ⚪ unknown | Harness Pet — an unofficial community pet for DeepSeek Harness. Not affiliated with, endorsed by, or maintained by DeepSeek. |
| [dsh-egress-guard](https://github.com/LKRCharon/dsh-egress-guard) | 0 | ⚪ unknown | Local, zero-network, fail-closed secret preflight for DeepSeek Harness model requests. |
| [dsh-geo](https://github.com/winyh/dsh-geo) | 0 | ⚪ unknown | 生成式引擎优化（GEO）DeepSeek Harness 插件：面向本地 Markdown 知识库的 SEO、GEO 与 AEO 审计工具。 |
| [dsh-video-downloader](https://github.com/zimai233/dsh-video-downloader) | 0 | ⚪ unknown | Media downloader for DeepSeek Harness. Detect and download video/audio from Bilibili, YouTube, Douyin, Xiaohongshu. |
| [dsh-mermaid-preview](https://github.com/realguan/dsh-mermaid-preview) | 0 | ⚪ unknown | Render Mermaid fenced code blocks as diagrams in DeepSeek Harness (dsh) web — a dynamic Cordis client plugin, no shell changes ne… |
| [dsh-web-search-provider](https://github.com/hiyms/dsh-web-search-provider) | 0 | ⚪ unknown | Native web search provider for the DeepSeek Harness web seam (ctx.web): OpenAI Responses API (search/open_page/find_in_page) and… |
| [dsh-action-parity](https://github.com/dongsheng123132/dsh-action-parity) | 3 | ⚪ unknown | Cross-surface action binding and replay parity evidence for DeepSeek Harness |
| [dsh-input-history](https://github.com/omdsh-dev/dsh-input-history) | 2 | ⚪ unknown | DSH Web 输入历史插件：Ctrl+Up / Ctrl+Down 像终端一样召回与切换已发送消息，零核心改动 |
| [dsh-tool-backtest](https://github.com/dmsobtl/dsh-tool-backtest) | 0 | ⚪ unknown | DSH 插件：策略回测引擎 — 定义买卖信号，跑历史数据，输出绩效指标。 |
| [dsh-plugins](https://github.com/SisyphusSQ/dsh-plugins) | 1 | ⚪ unknown | A monorepo for composable DeepSeek Harness (DSH) plugins. |
| [dsh-plugin-quote-reply](https://github.com/yangYzc/dsh-plugin-quote-reply) | 1 | ⚪ unknown | DSH plugin: select text in a conversation, then quote it into the composer or reply in a new window. / DeepSeek Harness 划词引用插件：选中… |
| [dsh-sound](https://github.com/yeshimei/dsh-sound) | 0 | ⚪ unknown | Distinct alert sounds for DeepSeek Harness: network error, approval request, question asked, and turn-completion notifications. |
| [dsh-tool-playwright](https://github.com/cheng-nan01/dsh-tool-playwright) | 0 | ⚪ unknown | 一个给 DeepSeek Harness 用的插件：让 AI 能真的打开浏览器上网——打开网页、点按钮、填表单、翻页、看页面内容，就像人一样操作浏览器。 |
| [knowlp-rag](https://github.com/wly8691-jpg/knowlp-rag) | 2 | ⚪ unknown | KnowLP-RAG: dual knowledge graph retrieval for Markdown notes - MCP stdio server for DeepSeek Harness (dsh) & Claude Code |
| [omdp](https://github.com/XJungit/omdp) | 2 | ⚪ unknown | only my DSH plugins — monorepo of DeepSeek Harness plugin bundles |
| [dsh-ProjectModel](https://github.com/Youngxj/dsh-ProjectModel) | 0 | ⚪ unknown | deepseek项目组功能 |
| [dsh-pain-point-check](https://github.com/ICCuse/dsh-pain-point-check) | 1 | ⚪ unknown | Enforced pain-point-check guard plugin for DeepSeek Harness: after two non-converged experiments it injects the three questions,… |
| [dsh-entity-dd](https://github.com/sherconan/dsh-entity-dd) | 1 | ⚪ unknown | 出海交易对手尽调 · DeepSeek Harness 插件：先确认你在跟哪个法人签约，再判断这份登记资料能不能作为决策依据。免费官方数据源，无需密钥。 |
| [dsh-wash-calendar](https://github.com/zimai233/dsh-wash-calendar) | 0 | ⚪ unknown | Recurring habit scheduling calendar for DeepSeek Harness. Turn last-wash dates and intervals into next-occurrence, schedule, chec… |
| [dsh-codex-auth](https://github.com/suntianc/dsh-codex-auth) | 2 | ⚪ unknown | DeepSeek Harness plugin that reuses the local Codex CLI ChatGPT login and adds a native GPT Auth settings card |
| [dsh-code-lens](https://github.com/lisycotana/dsh-code-lens) | 0 | ⚪ unknown | Observability for DeepSeek Harness code-mode sub-dispatches: the tool calls a run_code program makes that the model never sees. |
| [dsh-subprocess-inherit-environment](https://github.com/zhangzujian/dsh-subprocess-inherit-environment) | 2 | ⚪ unknown | DSH plugin that forwards the complete Harness environment through ctx.subprocess |
| [dsh-doctor-windows](https://github.com/sublatesublate-design/dsh-doctor-windows) | 0 | ⚪ unknown | Windows environment diagnostics for DeepSeek Harness |
| [MuseAI](https://github.com/yejiming/MuseAI) | 545 | ⚪ unknown | 创建你的 AI 角色，进入你的故事世界。和角色聊天、冒险、穿书，让每一次互动都留下羁绊（支持 DeepSeek Harness 插件，欢迎使用） |
| [dsh-user-experience](https://github.com/DietCokewithSugar/dsh-user-experience) | 18 | ⚪ unknown | Persona-driven UX walkthrough plugin for DeepSeek Harness (DSH) - scans React + TypeScript source code for UX issues, pinpoints t… |
| [dsh-plugin-automations](https://github.com/Sev7een/dsh-plugin-automations) | 1 | ⚪ unknown | Scheduled tasks plugin for DeepSeek Harness Web Profile |
| [dsh-web-search-tavily](https://github.com/nitrazepam01/dsh-web-search-tavily) | 2 | ⚪ unknown | Tavily-backed web search provider bundle for DeepSeek Harness (dsh) with hot-switchable backend (Tavily / DeepSeek search) |
| [trio](https://github.com/huey1in/trio) | 2 | ⚪ unknown | DSH 全家桶:浏览器自动化 + MCP Server + GitHub 集成 | Browser automation + MCP server + GitHub for DeepSeek Harness — one install, three supe… |
| [dsh-policy-drift-proof](https://github.com/dongsheng123132/dsh-policy-drift-proof) | 3 | ⚪ unknown | Content-addressed, value-redacted policy drift evidence for DeepSeek Harness |
| [dsh-audit-bundle](https://github.com/dongsheng123132/dsh-audit-bundle) | 3 | ⚪ unknown | Content-addressed audit indexes across independent DeepSeek Harness evidence producers |
| [dsh-recovery-proof](https://github.com/dongsheng123132/dsh-recovery-proof) | 3 | ⚪ unknown | Read-only recovery drill evidence for DeepSeek Harness |
| [dsh-mediacrawler](https://github.com/xwh-01/dsh-mediacrawler) | 2 | ⚪ unknown | DeepSeek Harness MCP adapter for bounded, isolated MediaCrawler collection. |
| [dsh-credentials-system](https://github.com/khiqwq/dsh-credentials-system) | 0 | ⚪ unknown | System-bound encrypted credential provider for DeepSeek Harness |
| [dsh-plugins](https://github.com/wsxwj123/dsh-plugins) | 1 | ⚪ unknown | Independent plugins for DeepSeek Harness, organized as isolated packages in one monorepo. |
| [deepseek-harness-cli](https://github.com/soolaugust/deepseek-harness-cli) | 2 | ⚪ unknown | DeepSeek Harness: Everything is a Plugin. |
| [dsh-chat-outline](https://github.com/liliuCourier/dsh-chat-outline) | 2 | ⚪ unknown | 对话栏左侧常驻大纲：快速定位每次 user 提问与最后 assistant 回复（DeepSeek Harness 插件） |
| [dsh-passwords](https://github.com/slywalker2006/dsh-passwords) | 3 | ⚪ unknown | dsh-passwords: DeepSeek Harness login gateway - first-run setup, at-rest encryption, brute-force lockout, audit log, HTTPS |
| [mindspace-dsh-local-rag](https://github.com/Spirtxiaoqi7/mindspace-dsh-local-rag) | 3 | ⚪ unknown | ARPM-derived local hybrid RAG plugin for DeepSeek Harness |
| [dsh-mcp-pack](https://github.com/mengyaoi/dsh-mcp-pack) | 1 | ⚪ unknown | 常用 MCP server 一键接入 DeepSeek Harness (dsh) 的 .cordis.yml 清单合集，开箱即用，零代码。 |
| [upstream-radar](https://github.com/MicroMilo/upstream-radar) | 3 | ⚪ unknown | Always-on vulnerability and breaking-change impact monitoring for DeepSeek Harness plugins. |
| [dsh-plugin-anydoc](https://github.com/beancookie/dsh-plugin-anydoc) | 4 | ⚪ unknown | DSH 插件：基于 @firecrawl/anydoc 将 Word、PPT、Excel、PDF、EPUB、CSV 等文档转换为 GitHub-Flavored Markdown |
| [deepseek-harness-lite](https://github.com/sakurarain1213/deepseek-harness-lite) | 2 | ⚪ unknown | A lightweight, local-first distribution and verified plugin kit for DeepSeek Harness. |
| [dsh-bash-encoding](https://github.com/omdsh-dev/dsh-bash-encoding) | 2 | ⚪ unknown | DSH bash 输出编码自动识别插件：替换 ctx.bash，自管 spawn 收集原始字节，自动检测 UTF-16LE/UTF-8/GBK 等编码并正确解码，修复 WSL/Windows 下 bash 工具的中文乱码。 |
| [dsh-oai-oauth](https://github.com/werifu/dsh-oai-oauth) | 1 | ⚪ unknown | A plugin allowing you to use ChatGPT via OpenAI subscription without API Key in Deepseek Harness |
| [surfing-plugin](https://github.com/cyijun/surfing-plugin) | 10 | ⚪ unknown | SearXNG search and Crawl4AI fetch providers for DeepSeek Harness |
| [deepseek-harness-vsc-extension](https://github.com/weinibuliu/deepseek-harness-vsc-extension) | 6 | ⚪ unknown | DeepSeek Harness for VS Code |
| [dsh-ci-doctor](https://github.com/jkrandom-sudo/dsh-ci-doctor) | 3 | ⚪ unknown | CI failure, diagnosed before you open the logs — DeepSeek Harness plugin that watches GitHub Actions for new failures and turns r… |
| [dsh-read-history](https://github.com/Slowdownnn/dsh-read-history) | 2 | ⚪ unknown | 迁移claude/codex的对话历史到dsh |
| [dsh-yuzuha-prompts-manager](https://github.com/Airrcat/dsh-yuzuha-prompts-manager) | 2 | ⚪ unknown | a plugin for manage prompts in deepseek harness. |
| [dsh-pet](https://github.com/Vulcan626/dsh-pet) | 3 | ⚪ unknown | A community DeepSeek Pet client plugin for DeepSeek Harness |
| [dsh-win-launchscript](https://github.com/NaNExist/dsh-win-launchscript) | 1 | ⚪ unknown | 适用于 Windows 的 DeepSeek Harness（DSH）一键启动脚本，自动启动 Web 服务、打开浏览器，并在关闭窗口后停止服务。 |
| [dsh-model-provider-label](https://github.com/haiyoucuv/dsh-model-provider-label) | 2 | ⚪ unknown | DeepSeek Harness plugin that disambiguates same-named models by showing their provider |
| [dsh-pub](https://github.com/dsh-pub/dsh-pub) | 2 | ⚪ unknown | The bilingual, source-backed registry and installer for the DeepSeek Harness plugin ecosystem. |
| [anysearch-dsh](https://github.com/anysearch-team/anysearch-dsh) | 19 | ⚪ unknown | AnySearch web search provider and advanced search tools for DeepSeek Harness (DSH) |
| [dsh-toy](https://github.com/c3ll256/dsh-toy) | 33 | ⚪ unknown | Toy Control Protocol for DSH |
| [dsh-conv-search](https://github.com/beijingwahw/dsh-conv-search) | 3 | ⚪ unknown | dsh-conv-search（对话内文本搜索）— in-conversation text search plugin for DeepSeek Harness (Ctrl+F, match case, whole word, streaming-awar… |
| [dsh-web-search-exa](https://github.com/TonyDua/dsh-web-search-exa) | 2 | ⚪ unknown | Zero-config Exa web search provider for DeepSeek Harness (dsh): keyless anonymous MCP fallback (mcp.exa.ai/mcp) + keyed REST path… |
| [dsh-plugins](https://github.com/Ceelog/dsh-plugins) | 4 | ⚪ unknown | deepseek harness plugins |
| [dsh-mindmap](https://github.com/chenw2759-wq/dsh-mindmap) | 4 | ⚪ unknown | DSH 思维导图模式插件：课件(PPT/PDF/Word)+电子书 → 打印级复习思维导图 HTML（A3 横向、每主干一页、大括号式横向、宋体、右栏笔记区、封面总览 + 交互式测试题） |
| [dsh-testgen](https://github.com/bujue600-arch/dsh-testgen) | 4 | ⚪ unknown | Automated unit-test generation for DeepSeek Harness: /testgen command + generate_tests tool that scaffold, run, and fix unit test… |
| [dsh-bottom-bar](https://github.com/kc0ed/dsh-bottom-bar) | 3 | ⚪ unknown | 用于提供更丰富的DeepSeek Harness底栏信息显示插件 |
| [dsh-stock-watch](https://github.com/Awu12277/dsh-stock-watch) | 2 | ⚪ unknown | A股自选股实时行情盯盘插件 - DeepSeek Harness Web 右上角可折叠弹窗 |
| [dsh-tool-search](https://github.com/Letter2025/dsh-tool-search) | 3 | ⚪ unknown | Tool search & slimming for DeepSeek Harness: Hermes-style progressive disclosure — search, describe, and call long-tail tools on… |
| [dsh-spec-loop](https://github.com/tianji-qingtian/dsh-spec-loop) | 4 | ⚪ unknown | Spec-driven 开发闭环（OpenSpec 兼容）：/spec 命令族驱动 生成规格 → 批准 → 实现 → 逐条验收 → 归档 | Spec-driven dev loop (OpenSpec-compatible) for DeepSeek Ha… |
| [dsh-cmd-starter](https://github.com/PandaColour/dsh-cmd-starter) | 3 | ⚪ unknown | 为deepseek-harness提供一个命令行启动工具，让它 --append-prompt --resume 等类claude命令 |
| [dsh-mcp-manager](https://github.com/HenC49/dsh-mcp-manager) | 1 | ⚪ unknown | 一个 DeepSeek Harness MCP 配置页 |
| [dsh-nebulagraph-v5](https://github.com/xiajingchun/dsh-nebulagraph-v5) | 2 | ⚪ unknown | nebula v5 plugin for deepseek harness |
| [dsh-plugin-text-translation](https://github.com/1738348785/dsh-plugin-text-translation) | 3 | ⚪ unknown | DSH plugin: text & document localization with tag-protected extraction, batch slicing and lossless assembly (game scripts + long… |
| [dsh-overleaf](https://github.com/fly233338/dsh-overleaf) | 7 | ⚪ unknown | Connect Overleaf projects to DeepSeek Harness (DSH) through OverleafMCP and MCP tools. |
| [dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 22 | ⚪ unknown | DeepSeek Harness 桌面宠物插件 + 完整素材生成链：AI 提示词 → 绿幕视频 → 透明动画 → 可安装插件，从零到宠物全流程可复现 |
| [dsh-humanizer](https://github.com/DEEP-IOS/dsh-humanizer) | 4 | ⚪ unknown | DeepSeek Harness原生中文文本人工智能痕迹消除与多重审核对抗工作流 |
| [dsh-pixluna](https://github.com/PixLunaLab/dsh-pixluna) | 2 | ⚪ unknown | dsh-plugin-pixluna | 让 DSH 自己看涩图！ |
| [dsh-deepseek-billing](https://github.com/golitter/dsh-deepseek-billing) | 3 | ⚪ unknown | 在 DSH 中查看 DeepSeek API 账户余额及计费信息 |
| [dsh-suggested-replies](https://github.com/Anionex/dsh-suggested-replies) | 3 | ⚪ unknown | DSH Web 预测回复插件：AI 回复后在输入框上方生成可点击填入草稿的下一步消息候选 |
| [dsh-agy](https://github.com/chaos-03x/dsh-agy) | 5 | ⚪ unknown | Google Antigravity (agy) OAuth auth + model access plugin for DeepSeek Harness: multi-account pool, 429 rotation, device fingerpr… |
| [dsh-plugin-mermaid](https://github.com/lj970926/dsh-plugin-mermaid) | 2 | ⚪ unknown | DeepSeek Harness web client plugin: render mermaid code blocks with a chart/source toggle. |
| [dsh-todo-freshness-guard](https://github.com/lamost423/dsh-todo-freshness-guard) | 1 | ⚪ unknown | Out-of-tree DeepSeek Harness guard that prevents stale todo_write state |
| [dsh-windows-readiness-proof](https://github.com/dongsheng123132/dsh-windows-readiness-proof) | 2 | ⚪ unknown | Content-addressed readiness proof for sanitized DeepSeek Harness observations on managed Windows hosts |
| [dsh-article-publish](https://github.com/yangyongzhen/dsh-article-publish) | 3 | ⚪ unknown | Publish articles from DeepSeek Harness to CSDN / Juejin / CNBlog. dsh plugin. |
| [dsh-survival](https://github.com/XDzzzzzZyq/dsh-survival) | 1 | ⚪ unknown | DeepSeek Harness 生存模式 |
| [dsh-cache-stabilizer](https://github.com/dongsheng123132/dsh-cache-stabilizer) | 2 | ⚪ unknown | Cache-prefix stabilization and evidence-based cache metrics for DeepSeek Harness |
| [dsh-tool-somark](https://github.com/saurtone/dsh-tool-somark) | 2 | ⚪ unknown | SoMark document parser tool (somark_parse) plugin for DeepSeek Harness |
| [dsh-mcp-settings](https://github.com/xluomo/dsh-mcp-settings) | 2 | ⚪ unknown | dsh mcp服务器配置管理 |
| [dsh-terminal](https://github.com/dongsheng123132/dsh-terminal) | 2 | ⚪ unknown | Persistent interactive terminal mode for DeepSeek Harness |
| [dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 950 | ⚪ unknown | Two-phase DeepSeek Harness preset: Minimal-aligned bootstrap, then full Standard tools (Project2 98/99) |
| [dsh-whalito-desk](https://github.com/entireyu/dsh-whalito-desk) | 3 | ⚪ unknown | 鲸仔 Whalito，DeepSeek Harness 桌面助手。这是由DSH + DS-V4-Pro-0813开发的tauri桌面程序。 |
| [dsh-browser](https://github.com/xylt369/dsh-browser) | 4 | ⚪ unknown | Browser capability for DeepSeek Harness: headed Edge/Playwright provider, SSRF-safe navigation, a11y-ref clicking, permission gat… |
| [dsh-qqbot](https://github.com/tencent-connect/dsh-qqbot) | 20 | ⚪ unknown | 让 QQ 机器人接入 DeepSeek Harness（dsh）的官方插件 |
| [dsh-plugin-store](https://github.com/w769721503/dsh-plugin-store) | 3 | ⚪ unknown | DeepSeek Harness 插件商店：浏览、搜索、筛选并一键安装 dsh-plugin 生态插件 |
| [dsh-office](https://github.com/omdsh-dev/dsh-office) | 3 | ⚪ unknown | 办公三件套！Office document tools for DeepSeek Harness (dsh): generate, read, and edit spreadsheets (.xlsx), PDFs, and presentations (.… |
| [dsh-plugins](https://github.com/kestiny18/dsh-plugins) | 2 | ⚪ unknown | Community plugins for DeepSeek Harness |
| [promptwall](https://github.com/Chhlafiu4312/promptwall) | 3 | ⚪ unknown | Local prompt-injection and secret-exfiltration firewall for DeepSeek Harness. |
| [dsh-tailscale-sync](https://github.com/MoonGlassKitty/dsh-tailscale-sync) | 3 | ⚪ unknown | Zero-config Tailscale sync for DeepSeek Harness (dsh-plugin). 零配置：在手机上继续电脑端 DeepSeek Harness 的工作。 |
| [dsh-mcp-center](https://github.com/drfccv/dsh-mcp-center) | 1 | ⚪ unknown | Connect any MCP server to your DeepSeek Harness — point, click, done. |
| [dsh-side-chat](https://github.com/AHGGG/dsh-side-chat) | 6 | ⚪ unknown | Codex-style Side Chat for DeepSeek Harness — select text, ask follow-up questions in a focused side conversation, and keep the ma… |
| [dsh-ocg-billing](https://github.com/hiro-nikaitou/dsh-ocg-billing) | 1 | ⚪ unknown | DeepSeek Harness (dsh) plugin: OpenCode Go billing layer with cached official pricing, proactive update checks, bill computation… |
| [dsh-quote-reply](https://github.com/HOFO-GYG/dsh-quote-reply) | 3 | ⚪ unknown | DSH web plugin: quote any selected fragment of a conversation into the composer as a Markdown blockquote - smart floating button… |
| [dsh-browser](https://github.com/duyefeng/dsh-browser) | 1 | ⚪ unknown | 给 DeepSeek Harness 的浏览器插件：AI 直接开真实的 Edge 浏览器逛网页、点击、填表、截图，无需 CDP 或 MCP。 |
| [SapBuddy-dsh](https://github.com/gxx950224/SapBuddy-dsh) | 1 | ⚪ unknown | SapBuddy-dsh |
| [dsh-blackjack](https://github.com/WhiseNT/dsh-blackjack) | 1 | ⚪ unknown | 谁不想coding的时候急头白脸的和大肥鱼来一场紧张刺激的21点呢 |
| [dsh-keepalive](https://github.com/xiaohj233/dsh-keepalive) | 2 | ⚪ unknown | Opt-in detached watchdog for the DSH Web process with snapshot-checked repair and explicit patch restoration. |
| [dsh-scrape-webpage](https://github.com/131CDA1/dsh-scrape-webpage) | 5 | ⚪ unknown | 用于DeepSeek Harness的网页读取插件 |
| [dsh-museai-tavern](https://github.com/yejiming/dsh-museai-tavern) | 5 | ⚪ unknown | MuseAI的DeepSeek Harness插件，可以将你的MuseAI角色放进DSH使用啦！ |
| [citeguard](https://github.com/Chhlafiu4312/citeguard) | 3 | ⚪ unknown | Citation extraction and evidence verification for DeepSeek Harness. |
| [dsh-commandcode-go-provider](https://github.com/jiesou/dsh-commandcode-go-provider) | 3 | ⚪ unknown | Command Code Go API provider for dsh. Command Code 订阅 + DeekSeek Harness 兼容层 |
| [dsh-openai-oauth](https://github.com/DGPisces/dsh-openai-oauth) | 5 | ⚪ unknown | DeepSeek Harness provider for GPT models using managed ChatGPT OAuth through Codex app-server |
| [dsh-web-search-Tavily](https://github.com/SZMY-haruhi/dsh-web-search-Tavily) | 3 | ⚪ unknown | Adds Tavily Search API as a web search provider for DSH. |
| [dsh-satori](https://github.com/Ri0n72Y/dsh-satori) | 2 | ⚪ unknown | cordis plugin connect dsh and satori for im abilities |
| [dsh-pi](https://github.com/TGYD-helige/dsh-pi) | 3 | ⚪ unknown | Run trusted Pi extensions inside DeepSeek Harness through a compatibility host. |
| [dsh-hotplug-engine](https://github.com/AnothetLoice/dsh-hotplug-engine) | 2 | ⚪ unknown | Plugin install, rollback, and audit as a service for DSH. |
| [dsh-claude-provider](https://github.com/MoFeng2223/dsh-claude-provider) | 2 | ⚪ unknown | Custom Claude provider support for DeepSeek Harness |
| [dsh-plugin-working-status](https://github.com/Abyss-Seeker/dsh-plugin-working-status) | 5 | ⚪ unknown | 把思考状态里那句 "Deep diving..." 改成你喜欢的任何话。超轻量级。 |
| [dsh-mcp-admin](https://github.com/kairoz9/dsh-mcp-admin) | 4 | ⚪ unknown | View MCP server status (/mcp) and manage MCP servers per profile from the settings page. |
| [dsh-plugin-manager](https://github.com/monk233/dsh-plugin-manager) | 4 | ⚪ unknown | DSH 插件管理, 一键启用/禁用插件 |
| [dsh-beacons](https://github.com/Da-Mie/dsh-beacons) | 3 | ⚪ unknown | Right-edge prompt navigator (Codex/OpenChamber-style scrub rail with scroll-spy) plus Windows toast notifications — a DeepSeek Ha… |
| [dsh-plugin](https://github.com/Tabbit-Browser/dsh-plugin) | 14 | ⚪ unknown | Tabbit Broser plugins for Deepseek Harness |
| [adb_dsh_plugin](https://github.com/mang0cola/adb_dsh_plugin) | 2 | ⚪ unknown | DeepSeek Harness plugin for controlling Android devices through ADB |
| [dsh-livis-connector](https://github.com/fyy99/dsh-livis-connector) | 3 | ⚪ unknown | Connect Livis to DeepSeek Harness with in-app authorization and relay management. |
| [dsh-utility-tools](https://github.com/sharkymew/dsh-utility-tools) | 3 | ⚪ unknown | DSH（DeepSeek Harness）对话工具插件：拖拽任意文件进入对话 + 选中文本引用。 |
| [dsh-usage-dashboard](https://github.com/Cassius0924/dsh-usage-dashboard) | 4 | ⚪ unknown | DeepSeek 额度与用量仪表盘 — DSH (DeepSeek Harness) 动态 Cordis 插件 |
| [dsh-sci](https://github.com/Blaczz/dsh-sci) | 3 | ⚪ unknown | Zero-dependency scientific computing tools for DeepSeek Harness: physical-unit conversion, CODATA physical constants, and Runge-K… |
| [dsh-docling](https://github.com/Sqhao-O/dsh-docling) | 4 | ⚪ unknown | Native Docling document intelligence for DeepSeek Harness. |
| [dsh-git-guard](https://github.com/bibibala/dsh-git-guard) | 1 | ⚪ unknown | Git-aware write guard plugin for DeepSeek Harness: blocks whole-file writes that would overwrite the user's uncommitted changes,… |
| [dsh-cyber-particle](https://github.com/AKS1st/dsh-cyber-particle) | 2 | ⚪ unknown | Particle-network background plugin for DeepSeek Harness web |
| [dsh-browseruse](https://github.com/yzd6552-commits/dsh-browseruse) | 3 | ⚪ unknown | browser-use style browser automation plugin for DeepSeek Harness: drives a dedicated Chrome instance (persistent profile) via pla… |
| [dsh-rewind](https://github.com/2501136589/dsh-rewind) | 2 | ⚪ unknown | DSH回退插件 |
| [dsh-plugin-auditor](https://github.com/HYY-King/dsh-plugin-auditor) | 2 | ⚪ unknown | DSH plugin auditor: pre-flight compatibility check for profile plugin combinations. DSH 插件审核器：安装新插件前扫描组合兼容性，预防启动崩溃。 |
| [dsh-plugin-diff-review](https://github.com/Civitasv/dsh-plugin-diff-review) | 3 | ⚪ unknown | Diff Review Plugin for DeepSeek Harness |
| [dsh-tavern](https://github.com/Player-MINEPIG/dsh-tavern) | 3 | ⚪ unknown | A plugin which makes dsh compatible with SillyTavern artifacts. |
| [dsh-webchatlike](https://github.com/cindyguyuehu123/dsh-webchatlike) | 4 | ⚪ unknown | Web-chat style message actions for DeepSeek Harness: edit your prompt, regenerate answers, and flip versions with a deepseek.com-… |
| [dsh-us-stocks](https://github.com/Realyujie/dsh-us-stocks) | 5 | ⚪ unknown | US stock market data tools for DeepSeek Harness, powered by yahoo-finance2 |
| [dsh-zh-hant-hk](https://github.com/Argonaut790/dsh-zh-hant-hk) | 2 | ⚪ unknown | DeepSeek Harness plugin: Hong Kong Traditional Chinese wording (對話, 設定, 儲存) |
| [dsh-chat-timeline](https://github.com/jjxjjjjiik-bot/dsh-chat-timeline) | 4 | ⚪ unknown | 1:1 port of DeepSeek's official web right-side chat navigation rail (ScrollNav) as a DeepSeek Harness (DSH) plugin |
| [dsh-doctor](https://github.com/astra3294/dsh-doctor) | 3 | ⚪ unknown | Deterministic diagnostics and recovery for DeepSeek Harness |
| [douyin-plugin-dsh-plugin](https://github.com/chu557/douyin-plugin-dsh-plugin) | 3 | ⚪ unknown | 在使用dsh等待的过程中刷抖音 |
| [dsh-go-rotator](https://github.com/echo-xianyu/dsh-go-rotator) | 3 | ⚪ unknown | A plugin for DSH to swich opencode Go subscription |
| [dsh-voice-mic](https://github.com/Zachary7456/dsh-voice-mic) | 3 | ⚪ unknown | DeepSeek Harness (dsh) 语音输入插件：麦克风按钮/快捷键录音，实时转写回填输入框。三种识别引擎：浏览器 Web Speech、本地 SenseVoice/Paraformer 离线后端（一键部署）、OpenAI 兼容云端 ASR API。 |
| [deepseek-harness-for-vscode](https://github.com/skymecode/deepseek-harness-for-vscode) | 4 | ⚪ unknown | deepseek-harness for vscode .This is a community project, and we welcome your valuable feedback! |
| [DSH-EvoResearch](https://github.com/Karbo123/DSH-EvoResearch) | 4 | ⚪ unknown | 自进化科研工作流 |
| [dsh-queue-plus](https://github.com/starslittle/dsh-queue-plus) | 3 | ⚪ unknown | Reorder, clear, and undo controls for the DeepSeek Harness prompt queue |
| [dsh-auto-mode](https://github.com/NanmiCoder/dsh-auto-mode) | 25 | ⚪ unknown | Safe automatic permissions for DeepSeek Harness. |
| [dsh-document-review](https://github.com/yabo083/dsh-document-review) | 2 | ⚪ unknown | DeepSeek Harness plugin: review Markdown documents in a local browser with annotations, replacements, and deletion suggestions. S… |
| [dsh-audio-alert](https://github.com/ellelkktrraaa/dsh-audio-alert) | 2 | ⚪ unknown | dsh中断声音提示喵（可配置音频喵）Browser audio alerts for dsh attention edges: approval requests, ask-user questions, and finished turns. |
| [dsh-envoy](https://github.com/KhalilYamber/dsh-envoy) | 4 | ⚪ unknown | Hana 插件：把 coding 任务外包给本机 DeepSeek Harness，审批同步回 Hana 内决策，结果以原生卡片带回 |
| [dsh-drop-file-to-path](https://github.com/GLFzr/dsh-drop-file-to-path) | 3 | ⚪ unknown | DSH 拖拽文件转路径插件：Codex 式拖拽，路径自动插入输入框（Drop File to Path for DeepSeek Harness） |
| [dsh-onebot](https://github.com/Hoshino-Yumetsuki/dsh-onebot) | 3 | ⚪ unknown | OneBot Adapter For DSH |
| [dsh-obsidian-assistant](https://github.com/iamzcr/dsh-obsidian-assistant) | 3 | ⚪ unknown | DeepSeek Harness 插件（Cordis toolset）：操作本地 Obsidian 知识库（vault），提供搜索、读写笔记、双向链接 / 关系图谱、批量整理，并通过 Obsidian 的 "Local REST API" 社区插件调用高级能… |
| [dsh-side-chat](https://github.com/2031814001yuyue-tech/dsh-side-chat) | 3 | ⚪ unknown | dsh-plugin |
| [dsh-plugin-manager](https://github.com/2768651338/dsh-plugin-manager) | 3 | ⚪ unknown | DeepSeek Harness 的图形化插件管理插件：在 设置 → 插件 里新增「插件管家」标签页，用中文名和说明展示每个插件是做什么的，并提供一键启停开关与内置备注编辑——启停写入全局层补丁并实时热生效，备注保存到本地覆盖文件长期生效。 |
| [dsh-simplify](https://github.com/GongYuanCaiJi/dsh-simplify) | 3 | ⚪ unknown | DeepSeek Harness 插件：审查最近改动的代码，就清晰度、一致性与可维护性提出改进（移植自 pi-simplify） |
| [dsh-github-login](https://github.com/Noob-stupid/dsh-github-login) | 3 | ⚪ unknown | DeepSeek Harness 生态的 GitHub 可视化登录工具（零终端）：设备码流程，令牌同步 gh CLI | Visual GitHub login for the DSH ecosystem - no terminal needed |
| [dsh-docs](https://github.com/Sqhao-O/dsh-docs) | 4 | ⚪ unknown | Native Docling document intelligence for DeepSeek Harness. |
| [dsh-hanako](https://github.com/Nyasers/dsh-hanako) | 4 | ⚪ unknown | DSH for Hanako |
| [octie-dsh-plugin](https://github.com/StarChen-Cycler/octie-dsh-plugin) | 3 | ⚪ unknown | Octie refactored as a DeepSeek Harness bundle plugin: durable DAG task-graph state machine with octie_* tools, octie Cordis servi… |
| [dsh-codex-provider-plugin](https://github.com/DamonBao/dsh-codex-provider-plugin) | 2 | ⚪ unknown | OpenAI Codex provider for DeepSeek Harness with ChatGPT OAuth, native settings, and account usage. |
| [DSH-shutdown](https://github.com/knlght/DSH-shutdown) | 2 | ⚪ unknown | 一键结束 DeepSeek Harness 服务：Settings 关机页 + 二次确认 + 优雅退出，关掉浏览器不再留下后台进程 |
| [dsh-guardian](https://github.com/akira399/dsh-guardian) | 2 | ⚪ unknown | DeepSeek Harness task-protection plugin: preflight scanner (catches missing inject declarations that crash the host), loop detect… |
| [dsh-plugin-open-editor](https://github.com/Civitasv/dsh-plugin-open-editor) | 2 | ⚪ unknown | Editor Plugin for Deepseek Harness |
| [dsh-web-mobile-fix](https://github.com/AcidGr/dsh-web-mobile-fix) | 3 | ⚪ unknown | DeepSeek Harness (dsh) Web plugin |
| [dsh-timeline](https://github.com/zhangzheng25/dsh-timeline) | 3 | ⚪ unknown | DSH 插件：极简提问时间线——每条提问一个圆点，点击跳转，悬停预览。Minimal question timeline for DeepSeek Harness. |
| [dsh-crw](https://github.com/us/dsh-crw) | 2 | ⚪ unknown | fastCRW-backed web_search and web_fetch providers for DeepSeek Harness (ctx.web) |
| [adhdgofly-dsh-ext](https://github.com/zuoguyoupan2023/adhdgofly-dsh-ext) | 2 | ⚪ unknown | ADHDGoFly POS highlighting plugin for DeepSeek Harness Web: nouns green, verbs red, adjectives/adverbs purple, others gray in ren… |
| [dsh-solo-thinking](https://github.com/fredalxin/dsh-solo-thinking) | 3 | ⚪ unknown | Solo-style isolated brainstorm branches and Handoffs for DeepSeek Harness |
| [dsh-subscription-auth](https://github.com/Khellendros97/dsh-subscription-auth) | 4 | ⚪ unknown | dsh对接openai、grok、anthropic、kimi订阅渠道 |
| [dsh-knowledge-graph](https://github.com/cwbcheng/dsh-knowledge-graph) | 2 | ⚪ unknown | DSH Cordis plugin: turn any source text into an AI knowledge graph (facts/inferences/concepts/definitions/examples/counter-exampl… |
| [dsh-update-checker](https://github.com/duntansen/dsh-update-checker) | 2 | ⚪ unknown | DSH web plugin: check DeepSeek Harness updates from Settings (dsh --version vs npm latest/next) ｜ DSH Web 插件：在设置页自检 DeepSeek Harn… |
| [dsh-change-center](https://github.com/Chance-Wu/dsh-change-center) | 2 | ⚪ unknown | 文件变更的捕获 → 审查 → 拒绝 / 应用 → 回滚中心 |
| [dsh-attention-notifier](https://github.com/zdjmrq/dsh-attention-notifier) | 2 | ⚪ unknown | 微信式任务栏提醒:DeepSeek Harness 持久化 Cordis 插件(判定端),配合 dsh-shell 呈现 |
| [dsh-credential-handoff](https://github.com/xiaohj233/dsh-credential-handoff) | 2 | ⚪ unknown | Conversation-local credential handoff for DSH that writes through the credential service without exposing the secret. |
| [dsh-smooth-stream](https://github.com/SpookySandwich/dsh-smooth-stream) | 3 | ⚪ unknown | Better streaming text animation for DeepSeek Harness 给DSH加入更好文字动画 |
| [dsh-smooth-stream](https://github.com/SpookySandwich/dsh-smooth-stream) | 3 | ⚪ unknown | Better streaming text animation for DeepSeek Harness 给DSH加入更好文字动画 |
| [dsh-forge](https://github.com/zhn1100/dsh-forge) | 3 | ⚪ unknown | Reproducible DeepSeek Harness plugin development environment |

### 🧩 技能

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) | 7 | ⚪ unknown | 构建与测试 DeepSeek Harness 插件的 Agent skills。 |
| [dsh-plugin-codex-bridge](https://github.com/YYTbit/dsh-plugin-codex-bridge) | 2 | ⚪ unknown | dsh-plugin-codex-bridge — DSH 插件（技能） |
| [dsh-plugin-opencode-bridge](https://github.com/YYTbit/dsh-plugin-opencode-bridge) | 3 | ⚪ unknown | dsh-plugin-opencode-bridge — DSH 插件（技能） |
| [dsh-plugin-pi-bridge](https://github.com/YYTbit/dsh-plugin-pi-bridge) | 2 | ⚪ unknown | dsh-plugin-pi-bridge — DSH 插件（技能） |
| [dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) | 3 | ⚪ unknown | dsh-plugins-raincode — DSH 插件（技能） |
| [dsh-skill-manager](https://github.com/bitterSmilezzz/dsh-skill-manager) | 1 | ⚪ unknown | dsh-skill-manager — DSH 插件（技能） |
| [dsh-plugin-auto-docs](https://github.com/YYTbit/dsh-plugin-auto-docs) | 1 | ⚪ unknown | dsh-plugin-auto-docs — DSH 插件（技能） |
| [dsh-plugin-code-review](https://github.com/YYTbit/dsh-plugin-code-review) | 1 | ⚪ unknown | dsh-plugin-code-review — DSH 插件（技能） |
| [dsh-find-skill](https://github.com/Moximxxx/dsh-find-skill) | 2 | ⚪ unknown | dsh-find-skill — DSH 插件（技能） |
| [spike-faye-lei-dsh-skills](https://github.com/spike-faye-lei/spike-faye-lei-dsh-skills) | 1 | ⚪ unknown | spike-faye-lei-dsh-skills — DSH 插件（技能） |
| [dsh-academic-skill](https://github.com/TohsakaRIN521/dsh-academic-skill) | 2 | ⚪ unknown | academic-paper-completion 旨在补全你将要发表的文章中除了理论计算数值分析的其余部分,减少或消除ai引用幻觉 |
| [dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) | 1 | ⚪ unknown | dsh-seismicx — DSH 插件（技能） |
| [rpg-maker-mac-skill](https://github.com/HomophonicFate/rpg-maker-mac-skill) | 0 | ⚪ unknown | rpg-maker-mac-skill — DSH 插件（技能） |
| [dsh-skill-manager](https://github.com/JimmyJin2006/dsh-skill-manager) | 0 | ⚪ unknown | 在设置界面管理你已有的技能！ |
| [dsh-plugin-longgraph](https://github.com/levi-qiao/dsh-plugin-longgraph) | 2 | ⚪ unknown | DeepSeek Harness community plugin: longgraph / loop-graph / loop-converge authoring skills on ctx.skills |
| [superpowers-dsh](https://github.com/LayneChai/superpowers-dsh) | 25 | ⚪ unknown | Superpowers skills for DeepSeek Harness: TDD, debugging, planning, and collaboration skills adapted from obra/superpowers |
| [dsh-skill-viewer](https://github.com/Fishquito7/dsh-skill-viewer) | 30 | ⚪ unknown | DSH Web UI plugin: Skills settings section with hot enable/disable, delete and add |
| [dsh-PaddleOCR-Skills](https://github.com/Aidenwu0209/dsh-PaddleOCR-Skills) | 2 | ⚪ unknown | PaddleOCR skills for DeepSeek Harness with native tools and GUI configuration |
| [dsh-capability-receipt](https://github.com/dongsheng123132/dsh-capability-receipt) | 3 | ⚪ unknown | Content-addressed receipts for skills actually loaded by DeepSeek Harness |
| [dsh-Unlimited-OCR-Skill](https://github.com/Aidenwu0209/dsh-Unlimited-OCR-Skill) | 1 | ⚪ unknown | Unlimited-OCR for DeepSeek Harness with a native tool and GUI configuration |
| [DeepSeek-Harness-Skill](https://github.com/itmoqing/DeepSeek-Harness-Skill) | 4 | ⚪ unknown | 这是一个Codex/Claude来进行任务发布给DeepSeek Harness干活的工作流的Skill，能实现并发，多个工作区一起执行 |
| [dsh-plugin-rdk](https://github.com/D-Robotics/dsh-plugin-rdk) | 1 | ⚪ unknown | D-Robotics RDK (地瓜机器人) integration for DeepSeek Harness — native RDK skill catalog, rdk_skills browser tool, and rdk_board_detect… |
| [dsh-reverse-skill](https://github.com/dhicoc/dsh-reverse-skill) | 8 | ⚪ unknown | Complete reverse-skill (85 SKILL.md) as a DeepSeek Harness (dsh) Cordis plugin — reverse engineering, authorized pentesting and s… |
| [dsh-skill-manager](https://github.com/Lanxing6480/dsh-skill-manager) | 3 | ⚪ unknown | Deepseek Harness 的Skill管理插件 |
| [dsh-skills-manager](https://github.com/xiaoxianyu-office/dsh-skills-manager) | 3 | ⚪ unknown | DSH Skills 管理器：设置页系统/用户技能分类，用户技能开关/编辑/删除/新建。Skills manager for DeepSeek Harness: system/user skill management (toggle/edit/delete… |
| [dsh-skill-remote](https://github.com/CSY656/dsh-skill-remote) | 1 | ⚪ unknown | Remote skills.sh/GitHub skill provider and installer for DeepSeek Harness — install any skill with one prompt. |
| [dsh-youmind-plugin](https://github.com/seamas0825-lab/dsh-youmind-plugin) | 4 | ⚪ unknown | YouMind OpenAPI tools and skill bundle for DeepSeek Harness |
| [dsh-mattpocock-skills](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills) | 3 | ⚪ unknown | Unofficial DSH port of mattpocock/skills — Engineering (18) + Productivity (7) skills as a DeepSeek Harness bundle plugin. MIT, ©… |
| [dsh-skills-mcp-manager](https://github.com/zebbkira/dsh-skills-mcp-manager) | 4 | ⚪ unknown | 面向 DeepSeek Harness Web GUI 的正式插件包：在设置页的「Web UI 插件」分组中新增一张「技能与 MCP」卡片，用于在浏览器里管理技能（skills）与 MCP 服务器。 |
| [iterate-plugin](https://github.com/jingzhao-l/iterate-plugin) | 1 | ⚪ unknown | DeepSeek Harness (dsh) 插件：把 iterate 技能落成自治闭环代码迭代 — 多轮并行审查、确定性去重收敛、原子修复+验证自停、meta-review 一致性审计、dry-run 只读审查。由 iterate-skill 主仓库统一维… |
| [dsh-design-skills](https://github.com/zhaiyateng/dsh-design-skills) | 6 | ⚪ unknown | Design aesthetics skill pack for DeepSeek Harness (DSH) - keeps vibe-coded websites away from the AI look. 6 styles: dark-saas, a… |
| [dsh-plugin-cas-kb](https://github.com/niuniu-869/dsh-plugin-cas-kb) | 2 | ⚪ unknown | DeepSeek Harness bundle: article-level Chinese accounting standards (CAS / ASSE) and tax law lookup, plus a skill that keeps cita… |
| [dsh-hyperframes](https://github.com/STARDUSTLC666/dsh-hyperframes) | 2 | ⚪ unknown | DSH 视频创作技能插件：注册 HyperFrames by HeyGen 官方移植技能五件套（HTML 写视频/CLI/注册表/网址转视频/GSAP），安装即用。· HyperFrames skill plugin for DeepSeek Harness. |
| [dsh-hud](https://github.com/a903067276-rgb/dsh-hud) | 2 | ⚪ unknown | HUD status panel plugin for DeepSeek Harness (dsh) web: git status, MCP servers, skills, model & token usage in a floating panel |
| [dsh-SkillsManagePlugins](https://github.com/z-col/dsh-SkillsManagePlugins) | 2 | ⚪ unknown | DSH Skills 可视化管理器：在 DSH Web 界面可视化查看、编辑、创建、删除 Skills（用户级 ~/.dsh/skills 与项目级 .dsh/skills） |

### 🎨 界面

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 2114 | ⚪ unknown | DSH Web UI 插件与皮肤合集：任务板、Git 面板等 |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 846 | ⚪ unknown | 侧边栏完整工作台：文件渲染/终端/Git/子代理 |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 31 | ⚪ unknown | 自定义「鲸鱼娘」思考状态的显示 |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 671 | ⚪ unknown | DSH Web 鲸鱼娘皮肤系列（深海女仆工坊） |
| [dsh-focus-chat](https://github.com/dingyi222666/dsh-focus-chat) | 16 | ⚪ unknown | 「聚焦会话」精简会话视图 |
| [dsh-side-panel](https://github.com/ccq1/dsh-side-panel) | 17 | ⚪ unknown | DSH 侧边栏：文件浏览器、终端、Git 审查 |
| [dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) | 8 | ⚪ unknown | 会话进度条：todos 进度/实时 token 速率 |
| [dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) | 30 | ⚪ unknown | 全手绘像素鲸鱼伙伴插件 |
| [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) | 43 | ⚪ unknown | 选中批注：选文字→批注→随消息发送 |
| [dsh-chat-width](https://github.com/chen-001/dsh-chat-width) | 3 | ⚪ unknown | 调整 DSH 回复宽度 |
| [dsh-companion](https://github.com/william-jin-cmu/dsh-companion) | 4 | ⚪ unknown | 常驻桌面助手：全局唤起/定时自动化/插件市场 |
| [dsh-genui](https://github.com/omdsh-dev/dsh-genui) | 82 | ⚪ unknown | 会话内联渲染交互式 UI 组件 |
| [dsh-input-history](https://github.com/lhh010/dsh-input-history) | 4 | ⚪ unknown | Ctrl+Up/Down 召回已发送消息 |
| [dsh-navbar](https://github.com/vlln/dsh-navbar) | 20 | ⚪ unknown | 对话节点导航条（右缘节点串跳转） |
| [dsh-paste-input](https://github.com/lhh010/dsh-paste-input) | 8 | ⚪ unknown | Ctrl+V 粘贴/拖拽/选文件增强 |
| [dsh-plugin-background](https://github.com/gameswu/dsh-plugin-background) | 8 | ⚪ unknown | DSH 壁纸插件 |
| [tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) | 2 | ⚪ unknown | 仿同花顺的webui插件 |
| [dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) | 7 | ⚪ unknown | 模仿 Excel 的 DSH 皮肤 |
| [dsh-deeplink](https://github.com/qyw233/dsh-deeplink) | 1 | ⚪ unknown | 深链插件：?session=/?workspace= 直接打开 |
| [dsh-diff-viewer](https://github.com/lehhair/dsh-diff-viewer) | 9 | ⚪ unknown | PiUI 风格 diff 查看器，替换原生 DiffBlock |
| [dsh-drag-and-drop](https://github.com/bill9109/dsh-drag-and-drop) | 6 | ⚪ unknown | 跨平台文件拖拽与原始路径插入 |
| [dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) | 9 | ⚪ unknown | QQ2006 皮肤插件 |
| [dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) | 5 | ⚪ unknown | 会话完成等四状态通知 |
| [dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | 5 | ⚪ unknown | 键盘优先的命令面板 |
| [dsh-ths-skin](https://github.com/AdamPlatin123/dsh-ths-skin) | 1 | ⚪ unknown | 同花顺行情终端风格皮肤 + K 线面板 |
| [dsh-tps](https://github.com/Small-tailqwq/dsh-tps) | 1 | ⚪ unknown | TPS 皮肤插件 |
| [dsh-ultra-ui](https://github.com/havingautism/dsh-ultra-ui) | 3 | ⚪ unknown | (无描述) |
| [dsh-web-ui-notify](https://github.com/bill9109/dsh-web-ui-notify) | 12 | ⚪ unknown | DSH 桌面通知提醒 |
| [ex-setting](https://github.com/omdsh-dev/ex-setting) | 2 | ⚪ unknown | DSH 设置扩展 |
| [whale-girl](https://github.com/vlln/whale-girl) | 143 | ⚪ unknown | QQ 宠物形态的桌面宠物插件 |
| [dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) | 8 | ⚪ unknown | 替换 DSH 状态显示的 web 插件。 |
| [dsh-ramify](https://github.com/yanglongyun/dsh-ramify) | 7 | ⚪ unknown | 创意分支画布插件：树状工作区生成、对比。 |
| [dsh-xiaohei](https://github.com/opensetk/dsh-xiaohei) | 5 | ⚪ unknown | dsh 的罗小黑皮肤插件。 |
| [dsh-xiaoyao-skins](https://github.com/147228/dsh-xiaoyao-skins) | 19 | ⚪ unknown | 夕小瑶 × DSH Web 皮肤合集、安装器与创作工具链。 |
| [dsh-wikilink](https://github.com/zhaoscsc/dsh-wikilink) | 3 | ⚪ unknown | dsh-wikilink — DSH 插件（界面） |
| [deepseek-harness-skin](https://github.com/HeiGeAi/deepseek-harness-skin) | 27 | ⚪ unknown | DeepSeek Harness 换肤系统：21 套内置皮肤 + 一张图生成整套配色的自定义皮肤。数据源驱动，保对比度推导，构建期校验可读性。 |
| [dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) | 6 | ⚪ unknown | dsh-search-mcp — DSH 插件（界面） |
| [dsh-kanban](https://github.com/Ericwong5021/dsh-kanban) | 2 | ⚪ unknown | dsh-kanban — DSH 插件（界面） |
| [dsh-event-auditor](https://github.com/qing3a/dsh-event-auditor) | 1 | ⚪ unknown | DeepSeek Harness 事件流审计面板插件：观察事件类型/分发模式/计数/最近事件，帮助插件作者理解 harness 内部 |
| [dsh-web-search-tavily](https://github.com/crayonlu/dsh-web-search-tavily) | 3 | ⚪ unknown | dsh-web-search-tavily — DSH 插件（界面） |
| [dsh-pet](https://github.com/FlytoMAYDAY80/dsh-pet) | 9 | ⚪ unknown | DSH 有声桌宠：悬浮桌面的 DeepSeek 小鲸鱼，不打开 DSH 也能实时感知会话状态（需要确认/工作中/完成/空闲/离线），支持音效提醒与零代码定制素材 |
| [dsh-miku-skin](https://github.com/stushansusu/dsh-miku-skin) | 2 | ⚪ unknown | 初音未来主题皮肤，用于 DeepSeek Harness (DSH) Web GUI —— 蓝紫洋红渐变、毛玻璃面板、可自定义背景图、亮暗双主题 |
| [dsh-ui-workbench](https://github.com/LoftyTao/dsh-ui-workbench) | 2 | ⚪ unknown | DeepSeek Harness WebUI 的右侧边文件管理以及变更审查界面插件。 |
| [dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) | 3 | ⚪ unknown | dsh-fun-weather — DSH 插件（界面） |
| [dsh-test-runner](https://github.com/suimi8/dsh-test-runner) | 2 | ⚪ unknown | dsh-test-runner — DSH 插件（界面） |
| [dsh-web-search-firecrawl](https://github.com/crayonlu/dsh-web-search-firecrawl) | 2 | ⚪ unknown | dsh-web-search-firecrawl — DSH 插件（界面） |
| [dsh-web-background](https://github.com/BruceWu1126/dsh-web-background) | 2 | ⚪ unknown | dsh-web-background — DSH 插件（界面） |
| [dsh-skins](https://github.com/Moeblack/dsh-skins) | 2 | ⚪ unknown | dsh-skins — DSH 插件（界面） |
| [dsh-portable-tavern](https://github.com/XCNXNXNX/dsh-portable-tavern) | 5 | ⚪ unknown | DeepSeek Harness 的「便携酒馆」插件：RPG 式 SillyTavern V2/V3 角色卡生成器 + 酒馆角色扮演聊天。支持世界书、角色卡 JSON/PNG 导入导出、面板主题与本地音乐。独立插件，仅依赖官方 @deepseek-ai SD… |
| [dsh-builtin-toggles](https://github.com/Starfie1d1272/dsh-builtin-toggles) | 6 | ⚪ unknown | dsh-builtin-toggles — DSH 插件（界面） |
| [dsh-science](https://github.com/omdsh-dev/dsh-science) | 4 | ⚪ unknown | dsh-science — DSH 插件（界面） |
| [dsh-skin](https://github.com/KinGao294/dsh-skin) | 11 | ⚪ unknown | dsh-skin — DSH 插件（界面） |
| [dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) | 2 | ⚪ unknown | DeepSeek Harness Web 番茄钟插件：可配置专注与休息时长，提供侧栏入口和可拖动浮动面板 |
| [dsh-theme-neko](https://github.com/drfccv/dsh-theme-neko) | 4 | ⚪ unknown | dsh-theme-neko — DSH 插件（界面） |
| [dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) | 2 | ⚪ unknown | dsh-k12-lesson-builder — DSH 插件（界面） |
| [dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) | 4 | ⚪ unknown | dsh-web-attention-badge — DSH 插件（界面） |
| [harness-whale](https://github.com/cakeni/harness-whale) | 3 | ⚪ unknown | harness-whale — DSH 插件（界面） |
| [dsh-conversation-indicator](https://github.com/smanx/dsh-conversation-indicator) | 1 | ⚪ unknown | dsh-conversation-indicator — DSH 插件（界面） |
| [dsh-black-whale](https://github.com/147228/dsh-black-whale) | 3 | ⚪ unknown | DeepSeek Harness 黑鲸实验室主题：官网黑鲸 × 夕小瑶 IP，真实 profile 可安装的 Web UI 插件 |
| [dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) | 1 | ⚪ unknown | dsh-plugins — DSH 插件（界面） |
| [dsh-client-ui-responsive](https://github.com/kelai141/dsh-client-ui-responsive) | 1 | ⚪ unknown | dsh Web UI 的移动响应式 AppFrame——派生自 dsh-client-ui-layout，新增 <640px 抽屉侧栏、底部 sheet 与安全区。 |
| [dsh-ui-skins](https://github.com/edwardyang0011/dsh-ui-skins) | 1 | ⚪ unknown | dsh-ui-skins — DSH 插件（界面） |
| [nightwhale](https://github.com/nightwhale-dev/nightwhale) | 1 | ⚪ unknown | The community power-layer for DeepSeek Harness (dsh). 夜鲲 — 吞并生态好能力,评测集筛选,只喂真正有效的增强。 |
| [dsh-auto-continue](https://github.com/HsiangNianian/dsh-auto-continue) | 12 | ⚪ unknown | DSH Web UI plugin: automatically sends "继续" (continue) when a request is interrupted by network errors or other non-human causes |
| [dskin](https://github.com/dancingmemory/dskin) | 19 | ⚪ unknown | DSKIN · DeepSeek Harness（DSH）卡通像素皮肤插件 / Cartoon pixel skin plugin for DSH Web GUI — 原始界面不动，像素宠物会散步、眨眼、跳跃 / living pixel pets that… |
| [dsh-webui-auth](https://github.com/Yuuz12/dsh-webui-auth) | 5 | ⚪ unknown | Persistent auth plugin for DeepSeek Harness WebUI: enforce login at the HTTP/transport layer (resources, /api, WebSocket) — unbyp… |
| [DSH-for-VSC](https://github.com/yauntyour/DSH-for-VSC) | 3 | ⚪ unknown | 把 DeepSeek Harness（DSH）的 WebUI 搬进 VS Code：编辑器内嵌面板 + 侧边栏控制台，服务离线自动拉起，日志随时可查。 |
| [deepseek-harness-themes](https://github.com/orxz/deepseek-harness-themes) | 4 | ⚪ unknown | A collection of UI themes for deepseek-harness. |
| [dsh-pixel-whale](https://github.com/yoke233/dsh-pixel-whale) | 1 | ⚪ unknown | A lively pixel-whale running-state companion for DeepSeek Harness Web. |
| [dsh-plugin](https://github.com/Gandufu/dsh-plugin) | 1 | ⚪ unknown | DeepSeek Harness 插件集合｜齐天大圣双主题皮肤，支持亮暗模式、响应式布局与热插拔 |
| [dsh-refined](https://github.com/djh2203/dsh-refined) | 1 | ⚪ unknown | DeepSeek-Refined 的 DeepSeek Harness 移植版 为 DeepSeek Harness（DSH）前端注入 Obsidian Border 风格的 Markdown 美化与多主题配色。 |
| [dsh-plugin-workshop](https://github.com/yyyyukari/dsh-plugin-workshop) | 17 | ⚪ unknown | Steam Workshop-style in-app plugin browser for DeepSeek Harness (DSH) Web UI - zero-server: search, trending windows, Chinese sea… |
| [dsh-funpack](https://github.com/lvyuchuiyi/dsh-funpack) | 5 | ⚪ unknown | ??????????????????????? DeepSeek Harness ?? |
| [dsh-ui-quote-selection](https://github.com/nekogpt/dsh-ui-quote-selection) | 4 | ⚪ unknown | Codex-style select-to-quote for DeepSeek Harness Web: quote any chat text into the composer as a native reference chip. |
| [dsh-whale-subagent](https://github.com/1while1/dsh-whale-subagent) | 2 | ⚪ unknown | A whale-girl themed subagent nest for the DeepSeek Harness, featuring pixel-animated subagent cards, real-time THINK/TODO trackin… |
| [dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck) | 2 | ⚪ unknown | Double-check before you ship: grill the requirements, test the implementation, prove the delivery. An engineering-discipline bund… |
| [dsh-plugin-manager](https://github.com/MAXeaglet/dsh-plugin-manager) | 3 | ⚪ unknown | DSH 插件管理器：桌面 GUI + CLI，管理 dsh 的 profile、插件与一键启动 dsh web (Tauri 2 + Node CLI) |
| [dsh-client-shortcuts](https://github.com/blue-a11y/dsh-client-shortcuts) | 2 | ⚪ unknown | Global keyboard shortcuts plugin for the DeepSeek Harness web GUI: ctx.shortcuts registry service + mod+l/mod+k/mod+shift+c defau… |
| [dsh-dashboard](https://github.com/baiyun200/dsh-dashboard) | 1 | ⚪ unknown | DSH 插件看板 · DeepSeek Harness 插件生态可视化（shadcn/ui，每日自动构建部署） |
| [dsh-web-text-drop](https://github.com/liceses/dsh-web-text-drop) | 0 | ⚪ unknown | DSH Web GUI 文本文件拖拽导入插件:把 md / txt / log / 代码等文本文件拖进页面, 按内容长度自动处理 —— 短内容直接进输入框,长内容复制到工作区并粘贴可读路径。 |
| [freestyle-dsh-theme](https://github.com/suzike/freestyle-dsh-theme) | 10 | ⚪ unknown | DeepSeek Harness 主题体验插件：OKLCH 主题提案 + 主题设计器（跨重启持久化） |
| [dsh-wordbox](https://github.com/arcmosin/dsh-wordbox) | 4 | ⚪ unknown | DSH Web GUI常用词箱子，方便项目常用词的存储和粘贴 | DSH Web GUI Common Words Box – for storing and pasting frequently used project terms." |
| [dsh-vault](https://github.com/Ox0400/dsh-vault) | 2 | ⚪ unknown | Encrypted credential vault for DeepSeek Harness — AES-256-GCM + TOTP, model tools + Settings UI |
| [dsh-voice](https://github.com/zhuiyueya/dsh-voice) | 1 | ⚪ unknown | Voice for DeepSeek Harness（dsh） — speech-to-text input + read-aloud TTS for text-only DeepSeek, zero API key. |
| [dsh-turn-watchdog](https://github.com/Equinox7379/dsh-turn-watchdog) | 1 | ⚪ unknown | Turn watchdog for DSH: detects stuck turns and injects a quiet warning. |
| [dsh-growth](https://github.com/winyh/dsh-growth) | 0 | ⚪ unknown | Growth acquisition and user growth analysis for DeepSeek Harness: AARRR, retention, MRR, experiments and unit economics. |
| [dsh-theme-taffy](https://github.com/Misaki14987/dsh-theme-taffy) | 3 | ⚪ unknown | 我不是雏草姬 |
| [dsh-waterball-pet](https://github.com/sundusk/dsh-waterball-pet) | 2 | ⚪ unknown | A floating water-ball pet plugin for the DeepSeek Harness Web UI. |
| [dsh-ui-background](https://github.com/ropz12138/dsh-ui-background) | 1 | ⚪ unknown | deepseek harness 的背景插件，会涉及一些其他组件css覆盖 |
| [dsh-ux](https://github.com/jiangnanquan/dsh-ux) | 3 | ⚪ unknown | DSH web UI 增强插件 + 无边框 Electron 桌面壳 |
| [dsh-narrative-ledger](https://github.com/dongsheng123132/dsh-narrative-ledger) | 3 | ⚪ unknown | Verifiable narrative state, continuity and character-knowledge ledger for DeepSeek Harness |
| [Dsh-UI-Enhance](https://github.com/xjackzenvey/Dsh-UI-Enhance) | 0 | ⚪ unknown | Deepseek Harness 增强工具 |
| [dsh-meme-hub](https://github.com/the-beating-light-of-the-nail/dsh-meme-hub) | 17 | ⚪ unknown | The meme side of DeepSeek Harness — 贪玩蓝鲸/QQ2006/whale girls/mini-games · A curated tour of the wildest dsh plugins |
| [dsh-terminal-panel](https://github.com/wuwuzhige-sudo/dsh-terminal-panel) | 3 | ⚪ unknown | A manual Terminal tab for the DeepSeek Harness (dsh) web UI — run commands on the host machine, persistent cwd, sudo password pro… |
| [dsh-whale-pet](https://github.com/lglglglgy/dsh-whale-pet) | 3 | ⚪ unknown | dsh-whale-pet |
| [dsh-opencode-go-usage](https://github.com/v587d/dsh-opencode-go-usage) | 2 | ⚪ unknown | A DeepSeek Harness (dsh) bundle that shows OpenCode Go subscription usage in the Web GUI's composer dock — the same seat as the b… |
| [dsh-git-graph](https://github.com/1841220388zzzcccxxx-star/dsh-git-graph) | 6 | ⚪ unknown | Embedded git repository graph visualizer for the DeepSeek Harness Web GUI | 嵌入式 Git 仓库图谱可视化插件（提交历史图 / 分支过滤 / 文件 diff / VSCode 式未提… |
| [dsh-update-radar](https://github.com/Equinox7379/dsh-update-radar) | 1 | ⚪ unknown | Update radar for DSH: checks installed plugins against git upstreams. |
| [dsh-ui-topbar-compact](https://github.com/maque2333/dsh-ui-topbar-compact) | 1 | ⚪ unknown | 缩窄DeepSeek Harness原生webUI顶栏 |
| [dsh-claude-theme](https://github.com/chajiuqqq/dsh-claude-theme) | 2 | ⚪ unknown | dsh的claude风格界面 |
| [dsh-home-ui](https://github.com/lehhair/dsh-home-ui) | 2 | ⚪ unknown | PiUI-inspired home feed visual refinement plugin for DeepSeek Harness web client (pure extension, zero core changes) |
| [dsh-eva-theme-plugin](https://github.com/oceanxuikun/dsh-eva-theme-plugin) | 1 | ⚪ unknown | Evangelion-inspired theme plugin for DSH WebUI, featuring Unit-00, Unit-01, and Unit-02 themes with immersive backgrounds and mec… |
| [dsh-plugin-gouden-leeuw-theme](https://github.com/Andy294753951/dsh-plugin-gouden-leeuw-theme) | 1 | ⚪ unknown | Unofficial Gouden Leeuw moonlit sanctuary theme for the DeepSeek Harness web UI |
| [dsh-undo-plugin](https://github.com/lire1131/dsh-undo-plugin) | 7 | ⚪ unknown | DSH plugin: snapshot & rollback your plugin/skin/settings configs. Auto-save on change, undo/redo stack, snapshot manager panel,… |
| [plugin-manager](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | DSH Web UI 内置插件商店：浏览 dsh-suite 目录、搜索/筛选/排序、兼容徽章、一键安装——设置页插件区的 Store 标签页。 |
| [dsh-drag-and-drop](https://github.com/omdsh-dev/dsh-drag-and-drop) | 2 | ⚪ unknown | 为 DSH Web UI 增加跨平台文件拖拽与原始路径插入能力，无需复制文件 |
| [dsh-voice-input](https://github.com/forrestahha/dsh-voice-input) | 3 | ⚪ unknown | Voice-to-text input plugin for the DeepSeek Harness Web UI |
| [dsh-soundscape](https://github.com/Blaczz/dsh-soundscape) | 2 | ⚪ unknown | DeepSeek Harness Web UI soundscape: turn-complete celebration (synth chime + confetti), blocked/approval alerts, error buzz, typi… |
| [dsh-mcp-manager](https://github.com/Nichts0v0/dsh-mcp-manager) | 2 | ⚪ unknown | 在 DeepSeek Harness 设置页管理 MCP 服务器：运行时添加/编辑/启停/重连/删除，实时状态、自动重连，中英双语界面。MCP server manager for DeepSeek Harness — add, edit, enable/d… |
| [dsh-system-control](https://github.com/FrankZhangIronly/dsh-system-control) | 0 | ⚪ unknown | DSH web plugin: System menu (Restart / Shutdown) in the sidebar footer. Restart = exit 42, Shutdown = exit 0, loopback-only RPC. |
| [sebastian-kitchen-board](https://github.com/penguinpanda/sebastian-kitchen-board) | 0 | ⚪ unknown | Sebastian is a family kitchen & life assistant for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). |
| [dsh-workshop](https://github.com/loguhan/dsh-workshop) | 3 | ⚪ unknown | Steam Workshop style plugin store for DeepSeek Harness Web UI: browse 850+ community plugins, one-click install with GitHub mirro… |
| [dsh-material-you](https://github.com/mtaech/dsh-material-you) | 1 | ⚪ unknown | Material You (M3) skin for DeepSeek Harness: HCT tonal palette + Maple Mono NF CN, clean blue & white |
| [WhaleKit](https://github.com/zprolab/WhaleKit) | 2 | ⚪ unknown | Superpowers customized for DeepSeek Harness |
| [dsh-plugin-peak-pricing](https://github.com/c-ling/dsh-plugin-peak-pricing) | 2 | ⚪ unknown | DeepSeek 峰谷定价时段徽章（DSH 双面插件，纯 UI、无状态、无网络请求） |
| [dsh-deck-builder](https://github.com/Blaczz/dsh-deck-builder) | 2 | ⚪ unknown | DeepSeek Harness tool plugin: convert Markdown into a self-contained HTML presentation (slides) with themes and keyboard navigati… |
| [dsh-file-explorer](https://github.com/joejojoking-cloud/dsh-file-explorer) | 12 | ⚪ unknown | File explorer plugin for DeepSeek Harness: file tree, preview, markdown, syntax highlighting, in-panel editing, VS Code integrati… |
| [dsh-thinking-status-customizer](https://github.com/Dbi-Eshuh/dsh-thinking-status-customizer) | 4 | ⚪ unknown | Customize the visible DSH Web thinking status with lifecycle-safe CSS. |
| [dsh-whale-pet](https://github.com/Er1c0v0/dsh-whale-pet) | 1 | ⚪ unknown | Unofficial whale-girl pet plugin for the DeepSeek Harness Web UI |
| [dsh-outline](https://github.com/urzeye/dsh-outline) | 6 | ⚪ unknown | DeepSeek Harness（DSH）Web GUI 的实时大纲插件 |
| [dsh-zen](https://github.com/zealot00/dsh-zen) | 1 | ⚪ unknown | Zen mode for DeepSeek Harness Web UI: one-click immersive focus (hide sidebar/topbar), Ctrl+Shift+Z, pet auto-hide linkage |
| [dsh-plugins](https://github.com/linqunxun/dsh-plugins) | 2 | ⚪ unknown | Money go brrr — DSH client UI plugins collection |
| [dhs-theme-plugin](https://github.com/kongxiangyiren/dhs-theme-plugin) | 1 | ⚪ unknown | dsh 主题管理插件 |
| [DPwhale-plugin](https://github.com/zed1902209846-dotcom/DPwhale-plugin) | 1 | ⚪ unknown | 用 deepseek-harness 的创造模式做的小桌宠插件，每次对话随机出现名字，听说抽到梁神有特殊效果哦/The small table pet plugin made with the deepseek-harness creation mode r… |
| [dsh-whale-report](https://github.com/SenmuuuuW/dsh-whale-report) | 9 | ⚪ unknown | 鲸鱼记事本 — 你的 Agent 年度报告：从会话事件日志生成日报/周报/月报/年报，任意区间、只读不改写 |
| [dsh-password-prompt](https://github.com/MagicCrazyMan/dsh-password-prompt) | 2 | ⚪ unknown | DeepSeek Harness plugin: masked password panel in the Web GUI (password_prompt tool) — bundle + dual-face plugin |
| [Better_Deepseek_Harkness](https://github.com/silencieuxzero/Better_Deepseek_Harkness) | 3 | ⚪ unknown | 更好的deepseek harness，为webui进行了一些拓展 |
| [claude-parchment-theme](https://github.com/RayYeung1989/claude-parchment-theme) | 1 | ⚪ unknown | 一款 Claude 风格的 dsh插件：为 DSH WebUI 打造，暖羊皮纸 Parchment 色板、Terracotta 品牌色与衬线字体 |
| [dsh-plugin-suite](https://github.com/crTnT/dsh-plugin-suite) | 3 | ⚪ unknown | DeepSeek Harness 社区插件套件：插件中心与自动更新器 |
| [dsh-file-explorer](https://github.com/wendi-lok/dsh-file-explorer) | 2 | ⚪ unknown | File directory card in the DeepSeek Harness Web left sidebar: tree browsing with arrow expand, drive-selection page, interactive… |
| [dsh-mic-input](https://github.com/QT-Chen/dsh-mic-input) | 1 | ⚪ unknown | DSH Web ?????????:??? Web Speech API ????,????/??????????????????Microphone voice input plugin for the DeepSeek Harness Web UI (b… |
| [dsh-skin-amis](https://github.com/wanzhiwei5/dsh-skin-amis) | 2 | ⚪ unknown | 鸣潮爱弥斯主题皮肤: 粉白配色+赛博霓虹装饰的 DeepSeek Harness Web GUI 皮肤 / Amis-inspired pink-white skin for DSH Web UI |
| [touhou-hakurei](https://github.com/xiake595/touhou-hakurei) | 6 | ⚪ unknown | 灵梦（Reimu）·博丽神社（东方Project）美化版皮肤：神社昼夜实景背景、灵梦立绘、画框侧边栏与输入框、纸白透明界面 — DeepSeek Harness Web GUI skin |
| [dsh-media-preview](https://github.com/tsonglew/dsh-media-preview) | 3 | ⚪ unknown | Audio/video preview viewer for dsh-better-sidebar: native playback with Range-seeking streaming route |
| [dsh-moyan](https://github.com/elviszhang007/dsh-moyan) | 4 | ⚪ unknown | 简洁、克制、安静，旨在为您的Vibe Coding增加些许文艺感。每次打开WebUI，左下角都会出现一句话，从古诗词到文采句，再到脍炙人口的游戏台词，应有尽有。语料库可高度自定义，插件风格完全适配原生Harness界面，功能简洁明确，绝不喧宾夺主。 |
| [Catppuccin-dsh-theme](https://github.com/zhijun-dai/Catppuccin-dsh-theme) | 4 | ⚪ unknown | Soothing pastel theme for DeepSeek Harness |
| [dsh-naiwa-theme](https://github.com/DevourerM/dsh-naiwa-theme) | 2 | ⚪ unknown | 为deepseek harness构建的奶蛙主题，可是我觉得很神圣呀。（素材来自互联网） |
| [dsh-theme-pack](https://github.com/math-lrz/dsh-theme-pack) | 1 | ⚪ unknown | 16 theme skins for the DeepSeek Harness (DSH) Web GUI - Catppuccin/Gruvbox/Everforest/Rose Pine/Solarized/Kanagawa/Tokyo Night/Ni… |
| [dsh-ui-whale](https://github.com/omdsh-dev/dsh-ui-whale) | 2 | ⚪ unknown | 【求⭐】🐋DSH Web UI 全手绘像素鲸鱼伙伴插件：会话标题栏常驻，平时眨眼/偶尔摆尾/动胸鳍，思考运行时持续动起来，回合完成头顶喷水，点击还会冒爱心，不工作时还会偷懒睡觉，零核心改动。 【喜欢的话就点点star⭐吧~】 |
| [dsh-width-tiers](https://github.com/aaronlei/dsh-width-tiers) | 2 | ⚪ unknown | A client plugin for the DeepSeek Harness Web GUI that adds chat content width tiers with a floating picker button (bottom-right,… |
| [dsh-layout-tools](https://github.com/dHR-P/dsh-layout-tools) | 1 | ⚪ unknown | DSH Web 三栏工作台：对话流净化（工具调用/思考移入右侧面板）+ 左侧工作区文件树（git 状态徽标） |
| [dsh-skin-claude-code](https://github.com/le-soleil-se-couche/dsh-skin-claude-code) | 3 | ⚪ unknown | DeepSeek Harness (dsh) Web GUI skin: Claude Code style fonts + Codex warm palette (terracotta #DA7756, cream #F5F3EE, ink #1D1B16… |
| [dsh-web-search-tavily](https://github.com/cnChenKai/dsh-web-search-tavily) | 2 | ⚪ unknown | Tavily-backed WebSearchProvider for DeepSeek Harness (ctx.web) - keyless mode, no API key required |
| [dsh-turn-navigator](https://github.com/xiaoso456/dsh-turn-navigator) | 1 | ⚪ unknown | Jump between conversation turns in the DeepSeek Harness web UI |
| [dsh-eye-care](https://github.com/Anionex/dsh-eye-care) | 2 | ⚪ unknown | Warm light, warm dark, and system-aware eye-care themes for DSH Web |
| [dsh-web-search-responses](https://github.com/herminger/dsh-web-search-responses) | 1 | ⚪ unknown | DSH ctx.web search provider that reuses the conversation model's OpenAI Responses built-in web_search |
| [dsh-aemeath-pet](https://github.com/culture-flask/dsh-aemeath-pet) | 3 | ⚪ unknown | 爱弥斯 · DeepSeek Harness 桌宠 — DeepSeek Harness Web GUI 的像素风宠物插件。 |
| [dsh-workbench](https://github.com/Dpf555/dsh-workbench) | 6 | ⚪ unknown | VS Code-style three-column Explorer + Monaco editor plugin for the DeepSeek Harness web GUI |
| [dsh-web-theme-packs](https://github.com/tzy168/dsh-web-theme-packs) | 3 | ⚪ unknown | This is a dsh-pulgin for change theme by yourself. |
| [dsh-gadgets](https://github.com/Highjobop/dsh-gadgets) | 3 | ⚪ unknown | Lightweight DeepSeek Harness tweaks: dsh-skin (appearance) + dsh-tidy (conversation folding & nav rail) |
| [dsh-plugin-devecocli](https://github.com/frankq007/dsh-plugin-devecocli) | 1 | ⚪ unknown | HarmonyOS development tools for DeepSeek Harness: device/emulator management, UI automation, build & deploy, logs, lint, signing… |
| [dsh-tavily-search-provider](https://github.com/xiaohj233/dsh-tavily-search-provider) | 2 | ⚪ unknown | Tavily search provider for DeepSeek Harness with full search-control mapping, credential-backed key UI, and guarded rc.6 patches. |
| [dsh-computer-use](https://github.com/ZRui-C/dsh-computer-use) | 3 | ⚪ unknown | Text-first browser & background macOS control for DeepSeek Harness (DSH): target the right process and window without taking the… |
| [dsh-commit-review](https://github.com/the-qian/dsh-commit-review) | 4 | ⚪ unknown | 一个 DSH 插件：为 Web GUI 增加 /commit 与 /review 两个斜杠命令 |
| [dsh-catppuccin](https://github.com/NoNameLeGo/dsh-catppuccin) | 3 | ⚪ unknown | DeepSeek Harness Web GUI 的 Catppuccin 主题插件：Latte / Frappé / Macchiato / Mocha 四种风味一键切换 |
| [dsh-sidebar-qa](https://github.com/ChenRuoT/dsh-sidebar-qa) | 6 | ⚪ unknown | 一个基于DSH-better-sidebar的侧边栏提问tab，实现类codex的侧边提问或claude code的/btw功能 |
| [dsh-boot-guard](https://github.com/SaiSenBox/dsh-boot-guard) | 4 | ⚪ unknown | A loader-independent rescue console for DeepSeek Harness when a broken plugin prevents the Web UI from starting. |
| [dsh-plugin-qr-connect](https://github.com/mervyn-teo/dsh-plugin-qr-connect) | 3 | ⚪ unknown | DeepSeek Harness dynamic plugin: QR-code sidebar button for connecting mobile devices to the web UI |
| [dsh-blue-whale](https://github.com/starslittle/dsh-blue-whale) | 3 | ⚪ unknown | Official DeepSeek Chat blue-whale default skin for DeepSeek Harness |
| [dsh-hotreload-plugin-manager](https://github.com/kyorakuyk/dsh-hotreload-plugin-manager) | 3 | ⚪ unknown | DeepSeek Harness plugin: hot install / uninstall / update / enable-disable of profile plugin bundles from the running dsh web — n… |
| [dsh-plugin-visual-composer](https://github.com/VanillaCreamer/dsh-plugin-visual-composer) | 3 | ⚪ unknown | Visual Cordis plugin-tree composer for the DeepSeek Harness Web UI. |
| [dsh-client-ui-skin-claude](https://github.com/PAKIKNOWLEDGE/dsh-client-ui-skin-claude) | 3 | ⚪ unknown | Claude-style skin for DeepSeek Harness (dsh) Web GUI — warm-black canvas, Anthropic clay accent, serif UI |
| [deepseek-skin-studio](https://github.com/JueMing2049/deepseek-skin-studio) | 0 | ⚪ unknown (原生插件通道 beta；书签/CDP 注入为主) | DSH 换肤工作室：一张图一套皮肤；书签/CDP/原生三通道注入 + 可视化工坊 + 13 套内置主题 + DSH-SKIN-SPEC 导出。 |
| [dsh-whale-font](https://github.com/kxSenlin/dsh-whale-font) | 3 | ⚪ unknown | 把 DeepSeek Harness 对话里的主语人称「我/你/I/me」渲染成 DeepSeek 蓝鲸图标（DSH 插件） |
| [dsh-scroll-timeline](https://github.com/invalidnaaaame/dsh-scroll-timeline) | 3 | ⚪ unknown | DSH web plugin: ChatGPT-style scroll timeline on the chat sidebar — magnetic mountain hover, click to jump to user messages. Deri… |
| [dafy-whale-theme](https://github.com/DViridescent/dafy-whale-theme) | 3 | ⚪ unknown | DeepSeek Harness 蓝色大肥鱼主题插件：海洋配色、鱼群、气泡、吉祥物与品牌替换 |
| [dsh-skin-appearance](https://github.com/Vim0x3c/dsh-skin-appearance) | 4 | ⚪ unknown | DeepSeek Harness 外观定制插件：八套内置主题 + 自定义壁纸（透明度/模糊），Host 设置持久化 | Appearance plugin for dsh web |
| [deepseek-harness-GUI](https://github.com/festoney8/deepseek-harness-GUI) | 4 | ⚪ unknown | DeepSeek Harness 超级轻量启动器，基于 Tauri 封装桌面版 APP，支持升级 DSH 内核、提供免安装便携版 |
| [dsh-any-background](https://github.com/Tkingxiao/dsh-any-background) | 3 | ⚪ unknown | 一个自定义主题插件，包括背景图（大小和位置），主界面和设置界面（透明度，色轮全色主题色）插件 |
| [dsh-meow-cat](https://github.com/dsh-pub/dsh-meow-cat) | 2 | ⚪ unknown | A cat runs across the bottom of the DeepSeek Harness web UI with a synthesized meow every time a conversation turn ends. |
| [maid-atelier-ui-bundle](https://github.com/flaricy/maid-atelier-ui-bundle) | 2 | ⚪ unknown | A calm Maid Atelier theme and practical file, preview, Git, and terminal side panel for DeepSeek Harness Web. |
| [dsh-plugin-terminal](https://github.com/siberiah2o/dsh-plugin-terminal) | 2 | ⚪ unknown | Bottom terminal panel plugin for DeepSeek Harness (DSH Web GUI) |
| [dsh-message-preview](https://github.com/asukasec/dsh-message-preview) | 2 | ⚪ unknown | Right-side user-message navigator for the DeepSeek Harness Web UI. |
| [dsh-whale-arcade](https://github.com/jitengfei/dsh-whale-arcade) | 2 | ⚪ unknown | Community-maintained whale arcade for DeepSeek Harness while waiting for model responses |
| [dsh-skin-blue-whale](https://github.com/zenghuizhu69-hub/dsh-skin-blue-whale) | 3 | ⚪ unknown | dsh Web UI skin: DeepSeek blue-whale theme with official gradient and leaping whale art (dsh plugin) |
| [dsh-precise-cache](https://github.com/Townrain/dsh-precise-cache) | 2 | ⚪ unknown | Five-decimal cache-hit readout beside the chat stats line for the DeepSeek Harness Web GUI (dsh-plugin) |
| [dsh-rules-manager](https://github.com/jilian-dsh/dsh-rules-manager) | 2 | ⚪ unknown | Rules & commands manager for DeepSeek Harness: /rules command + settings panel + custom commands |
| [dsh-ui-preset-enhance](https://github.com/lssyd20070106/dsh-ui-preset-enhance) | 3 | ⚪ unknown | Third-party DSH WebUI enhancement plugin: custom backgrounds, theme colors, prompt presets, token/context visibility, and manual… |
| [dsh-snapshot](https://github.com/DfsyJian/dsh-snapshot) | 3 | ⚪ unknown | DeepSeek Harness plugin: automatic file snapshots with a sidebar timeline and settings card |
| [deepseek-harness-pets](https://github.com/orxz/deepseek-harness-pets) | 2 | ⚪ unknown | 这是一个专为 DeepSeek-Harness 定制的桌宠皮肤包， DeepSeek 的标志性“大鲸鱼”等宠物养成。 |
| [plugin-switch](https://github.com/cynch18/plugin-switch) | 2 | ⚪ unknown | DSH web plugin: toggle plugins on/off from the GUI without restarting the server |

### 🐋 皮肤

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [themes (皮肤中心)](https://github.com/whyihaveyou/dsh-themes) | 1 | 🟢 ok | 皮肤中心：151 款昼夜成对皮肤一包打尽——网格预览、搜索、DSH Web UI 内一键试穿。 |

### 💬 会话

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [pi-discuss-mode](https://github.com/zwrong/pi-discuss-mode) | 11 | ⚪ unknown | Pi Coding Agent 的只读讨论模式 |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 46 | ⚪ unknown | 对话回退：回滚会话与工作区状态 |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 18 | ⚪ unknown | DSH 对话分享插件 |
| [dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) | 18 | ⚪ unknown | 分支式消息编辑、reroll、版本时间线 |
| [dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) | 7 | ⚪ unknown | 上下文注入审计：AGENTS.md/技能/tool schema token 成本 |
| [dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) | 9 | ⚪ unknown | 多帧 zstd 会话文件帧级扫描诊断 |
| [dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) | 5 | ⚪ unknown | 自进化：agent 在会话内给自己长出/剪掉能力 |
| [dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) | 63 | ⚪ unknown | 跨会话长期记忆 + 后台自我进化（纯插件） |
| [dsh-web-archive](https://github.com/renat3u/dsh-web-archive) | 4 | ⚪ unknown | 折叠对话中无用消息（Think/Bash 等） |
| [deepseek-manners](https://github.com/Moeblack/deepseek-manners) | 10 | ⚪ unknown | 给每条消息后注入感谢语 |
| [dsh-agent-budget](https://github.com/vibeinging/dsh-agent-budget) | 2 | ⚪ unknown | 原生 agent 树 token 预算插件 |
| [dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) | 1 | ⚪ unknown | 分享任意段落对话 |
| [dsh-kb-sieve](https://github.com/omdsh-dev/dsh-kb-sieve) | 2 | ⚪ unknown | 可审计知识库打包（references + SQLite） |
| [dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) | 2 | ⚪ unknown | 本地优先的会话故障复盘 |
| [dsh-session-search](https://github.com/Tieboyh/dsh-session-search) | 2 | ⚪ unknown | 无索引跨 agent 会话搜索 |
| [dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) | 6 | ⚪ unknown | 侧会话插件：/side 持续性 + /btw 一次性 |
| [dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) | 1 | ⚪ unknown | 手动审批（Manual/Ask 模式） |
| [dsh-turn-navigator](https://github.com/vibeinging/dsh-turn-navigator) | 1 | ⚪ unknown | DSH Web 轮次导航插件 |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 把 append-only 会话日志导出成人读的 Markdown / HTML，按来源分组渲染（系统提示 / 思维链 / 工具调用 / 子agent）。 |
| [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) | 30 | ⚪ unknown | 从 Claude Code/Codex/Reasonix 导入历史消息到 DSH。 |
| [dsh-stream-rules](https://github.com/jiesou/dsh-stream-rules) | 4 | ⚪ unknown | 按需注入规则，不浪费上下文。 |
| [dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) | 7 | ⚪ unknown | 无 LLM 的无损压缩引擎。 |
| [dsh-recall](https://github.com/Mongfayi/dsh-recall) | 3 | ⚪ unknown | DSH Web UI 消息撤回插件。 |
| [dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) | 5 | ⚪ unknown | dsh-plugin-claude-bridge — DSH 插件（会话） |
| [dsh-goal-mode-enhance](https://github.com/KarlOfLaw/dsh-goal-mode-enhance) | 2 | ⚪ unknown | 为 DeepSeek Harness 提供可视化 goal 模式：Goal 栏 / 头部入口 / 设置页（历史+多会话总览）/ goal_overview 模型工具 |
| [context-vista](https://github.com/GooodWei/context-vista) | 4 | ⚪ unknown | 为 DeepSeek Harness 提供右侧悬浮栏以及 /context 命令，用环形图实时展示当前上下文 token 用量与分配，compact指令效果，同时支持估算费用消耗，对标 Claude Code 的 /context。 |
| [dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) | 3 | ⚪ unknown | dsh-claude-move — DSH 插件（会话） |
| [dsh-ergonomics](https://github.com/hisaniwo/dsh-ergonomics) | 2 | ⚪ unknown | DSH 会话人体工学：/new 一键新会话 + 输入历史 ↑↓ 回溯 |
| [dsh-model-config-sync](https://github.com/LiangYin233/dsh-model-config-sync) | 11 | ⚪ unknown | DSH 高级模型配置器：为 DeepSeek Harness 提供将 pi-ai 预设模型的上下文、输出上限、推理挡位一键应用到自定义提供商的能力。 |
| [dsh-undo](https://github.com/LingLambda/dsh-undo) | 3 | ⚪ unknown | dsh-undo — DSH 插件（会话） |
| [dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) | 3 | ⚪ unknown | DeepSeek Harness 会话时间轴插件：横短横线波浪、当前消息定位、点击跳转、圆角预览 tooltip、可收起/展开 |
| [dsh-plugins](https://github.com/Yihong89/dsh-plugins) | 3 | ⚪ unknown | dsh-plugins — DSH 插件（会话） |
| [dsh-superpowers](https://github.com/codeAnqiang-ma/dsh-superpowers) | 3 | ⚪ unknown | dsh-superpowers — DSH 插件（会话） |
| [billion-context-dsh](https://github.com/Tyan66666/billion-context-dsh) | 10 | ⚪ unknown | billion-context-dsh — DSH 插件（会话） |
| [dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) | 3 | ⚪ unknown | dsh-session-pins — DSH 插件（会话） |
| [dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) | 4 | ⚪ unknown | DeepSeek Harness 的跨会话引用(cue)插件 |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 3 | ⚪ unknown | dsh-memento — DSH 插件（会话） |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 3 | ⚪ unknown | DeepSeek Harness 归档会话管理插件：查看/恢复已归档会话（回到原工作区分组）+ 右上角一键关闭 dsh。MIT 许可，欢迎收录到任何插件合集，注明出处即可。 |
| [dsh-memory](https://github.com/ben7am1n/dsh-memory) | 1 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [dsh-plugins](https://github.com/hyls9527/dsh-plugins) | 3 | ⚪ unknown | dsh-plugins — DSH 插件（会话） |
| [dsh-opencode-usage](https://github.com/moduqishi/dsh-opencode-usage) | 2 | ⚪ unknown | dsh-opencode-usage — DSH 插件（会话） |
| [dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) | 3 | ⚪ unknown | dsh-session-hub — DSH 插件（会话） |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 3 | ⚪ unknown | dsh-memento — DSH 插件（会话） |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 3 | ⚪ unknown | DeepSeek Harness 归档会话管理插件：查看/恢复已归档会话（回到原工作区分组）+ 右上角一键关闭 dsh。MIT 许可，欢迎收录到任何插件合集，注明出处即可。 |
| [dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) | 5 | ⚪ unknown | dsh-codex-provider — DSH 插件（会话） |
| [dsh-memory](https://github.com/Jesse-njx/dsh-memory) | 2 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [dsh-workbench](https://github.com/echo-escape/dsh-workbench) | 1 | ⚪ unknown | 这是一个用于展示和分享为开发的各类插件（Plugins）与技能（Skills）的集合。您可以在这里浏览并发现能增强您 DSH 体验的扩展！ |
| [dsh-codex-import](https://github.com/918154429/dsh-codex-import) | 1 | ⚪ unknown | dsh-codex-import — DSH 插件（会话） |
| [dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) | 2 | ⚪ unknown | dsh-session-pin — DSH 插件（会话） |
| [dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) | 3 | ⚪ unknown | Local, per-session prompt stash for DeepSeek Harness Web | 本地、分对话的提示词输入暂存工具。写了一半的长提示词，临时需要先问一个短问题？ 同时准备多个方案，但尚未决定发哪一个？将未完成的想法放入草稿… |
| [dsh-open-in-finder](https://github.com/moduqishi/dsh-open-in-finder) | 2 | ⚪ unknown | dsh-open-in-finder — DSH 插件（会话） |
| [dsh-mcp-proxy](https://github.com/ben7am1n/dsh-mcp-proxy) | 1 | ⚪ unknown | dsh-mcp-proxy — DSH 插件（会话） |
| [dsh-nocturne-memory](https://github.com/RealAlexandreAI/dsh-nocturne-memory) | 1 | ⚪ unknown | dsh-nocturne-memory — DSH 插件（会话） |
| [dsh-balance](https://github.com/TwotwoPiggy/dsh-balance) | 5 | ⚪ unknown | dsh-balance — DSH 插件（会话） |
| [dsh-mneme](https://github.com/modusensus/dsh-mneme) | 9 | ⚪ unknown | Mneme——把记忆主权还给人的记忆插件：SQLite + 可人工编辑的 Markdown 双写，autoDream 在梦境中巩固记忆，106 个测试护航。 |
| [dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) | 13 | ⚪ unknown | DeepSeek Harness 会话费用统计插件:本会话费用、当日费用、历史记录与官方价格同步 |
| [dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) | 2 | ⚪ unknown | dsh-claude-mem — DSH 插件（会话） |
| [dsh-revive](https://github.com/omdsh-dev/dsh-revive) | 3 | ⚪ unknown | DSH 一键复活：重启后给所有被打断的会话自动发送「继续」指令（/revive 命令 + revive_sessions 工具 + 浏览器一键按钮） |
| [dsh-plugin-wepre](https://github.com/shujiTech/dsh-plugin-wepre) | 1 | ⚪ unknown | dsh-plugin-wepre — DSH 插件（会话） |
| [dsh-plugin-meta-memory](https://github.com/YYTbit/dsh-plugin-meta-memory) | 2 | ⚪ unknown | dsh-plugin-meta-memory — DSH 插件（会话） |
| [dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) | 2 | ⚪ unknown | dsh-auto-review — DSH 插件（会话） |
| [DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) | 3 | ⚪ unknown | DeepSeek-Harness-for-VS-Code — DSH 插件（会话） |
| [dsh-plugin-context-compressor](https://github.com/YYTbit/dsh-plugin-context-compressor) | 1 | ⚪ unknown | dsh-plugin-context-compressor — DSH 插件（会话） |
| [dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) | 1 | ⚪ unknown | dsh-context-taxonomy — DSH 插件（会话） |
| [dsh-tdai-memory](https://github.com/Scorp1o117/dsh-tdai-memory) | 3 | ⚪ unknown | dsh-tdai-memory — DSH 插件（会话） |
| [dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) | 1 | ⚪ unknown | dsh-context-lens — DSH 插件（会话） |
| [dsh-plugin-session-import](https://github.com/huguangyu666/dsh-plugin-session-import) | 4 | ⚪ unknown | dsh-plugin-session-import — DSH 插件（会话） |
| [dsh-resume-plugin](https://github.com/Demogorgon314/dsh-resume-plugin) | 1 | ⚪ unknown | 让 DeepSeek Harness 安全读取并继续 Codex 与 Claude Code 的历史会话。 |
| [dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) | 2 | ⚪ unknown | dsh-cost-ledger — DSH 插件（会话） |
| [dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) | 1 | ⚪ unknown | dsh-plugin-codex-import — DSH 插件（会话） |
| [dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) | 5 | ⚪ unknown | dsh-continual-evolve — DSH 插件（会话） |
| [dsh-command-opt](https://github.com/csiroqa/dsh-command-opt) | 1 | ⚪ unknown | DeepSeek Harness（DSH）命令优化插件：Tab/Enter 补全命令名、参数格式引导与提示弹框、tool 开启会话（subagent）补丁、空对话命令输出修复。Command optimization plugin for DeepSeek… |
| [dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) | 3 | ⚪ unknown | dsh-telemetry-redactor — DSH 插件（会话） |
| [dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) | 2 | ⚪ unknown | dsh-revdiff — DSH 插件（会话） |
| [dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) | 2 | ⚪ unknown | DSH (DeepSeek Harness) 持久化 Web 插件：Token 用量统计悬浮窗 —— 可拖动窗口/圆点、曲线/热力图、总 tokens 大数字；宿主半聚合会话日志并提供 /usage/api/snapshot |
| [dsh-balance-meter](https://github.com/Ghost011118/dsh-balance-meter) | 13 | ⚪ unknown | dsh-balance-meter — DSH 插件（会话） |
| [dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) | 4 | ⚪ unknown | DeepSeek Harness (dsh) 插件：/cost 查看每个会话花费 + 可拖拽的悬浮费用胶囊 |
| [dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) | 4 | ⚪ unknown | dsh-latex-tools — DSH 插件（会话） |
| [dsh-memory](https://github.com/Towzai/dsh-memory) | 1 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) | 1 | ⚪ unknown | mindspace-dsh-session-memory — DSH 插件（会话） |
| [dsh-auto-compact](https://github.com/wangxiang0605qvq/dsh-auto-compact) | 0 | ⚪ unknown | dsh-auto-compact — DSH 插件（会话） |
| [dsh-hotkeys](https://github.com/csiroqa/dsh-hotkeys) | 1 | ⚪ unknown | DeepSeek Harness（DSH）全局快捷键插件：会话切换、发送/清空草稿、停止生成、复制与归档，键位可在设置中自定义。Global keyboard shortcuts plugin for DeepSeek Harness. |
| [dsh-plugin-jinji](https://github.com/quan2005/dsh-plugin-jinji) | 3 | ⚪ unknown | 把「记忆」带进 DeepSeek Harness：极简文本记忆系统（Markdown 日志 + 画像档案），以大模型为核心驱动。无需安装其他软件，无需编译，无第三方依赖。 |
| [dsh-memory](https://github.com/Amengclass/dsh-memory) | 0 | ⚪ unknown | dsh-memory — DSH 插件（会话） |
| [dsh-supervisor](https://github.com/Wha1eChai/dsh-supervisor) | 1 | ⚪ unknown | dsh-supervisor — DSH 插件（会话） |
| [dsh-archive-viewer](https://github.com/csiroqa/dsh-archive-viewer) | 0 | ⚪ unknown | dsh-archive-viewer — DSH 插件（会话） |
| [dsh-plugin-asmemory](https://github.com/Xplore-LAB/dsh-plugin-asmemory) | 0 | ⚪ unknown | dsh-plugin-asmemory — DSH 插件（会话） |
| [powercontext-dsh](https://github.com/knqiufan/powercontext-dsh) | 8 | ⚪ unknown | DeepSeek Harness plugin that connects to a PowerContext Server over HTTP for recall, memory, handoff, experience, and skills. |
| [dsh-balance-stats](https://github.com/pangzi499/dsh-balance-stats) | 3 | ⚪ unknown | Balance, session cost, token usage, and invoice summaries for DeepSeek Harness Web. |
| [dsh-session-import](https://github.com/kinyokun/dsh-session-import) | 3 | ⚪ unknown | DSH 会话日志导入插件:解析 /export 的 zip/jsonl,结构真实性验证 + SHA-256 指纹校验,同步模型/预设/权限等状态,导入/删除实时推送免刷新 |
| [dsh-usage-plugin](https://github.com/Yihong89/dsh-usage-plugin) | 3 | ⚪ unknown | DeepSeek Harness (DSH) plugins. First: dsh-usage-report — per-session token usage & estimated cost (/usage + usage_report), price… |
| [DeepSeek-Harness-billing-plugin](https://github.com/WilliamLIiii/DeepSeek-Harness-billing-plugin) | 9 | ⚪ unknown | DeepSeek Harness billing plugin: account balance + per-model remaining-task estimator with a session-header badge |
| [dsh4vscode](https://github.com/DoggyHU/dsh4vscode) | 3 | ⚪ unknown | DSH Chat for VS Code — DeepSeek Harness chat windows inside VS Code (OpenCode-style independent sessions, model auto-routing) |
| [deepseek-billing-plugin](https://github.com/xinCodes/deepseek-billing-plugin) | 3 | ⚪ unknown | DeepSeek Harness (DSH) 插件：DeepSeek 官方 API 余额与当前会话费用估算 |
| [dsh-history](https://github.com/xuender/dsh-history) | 3 | ⚪ unknown | Recall and re-run the current session's command history with ↑/↓ keys in the DSH Web composer. |
| [dsh-pin-recall](https://github.com/kerwin2046/dsh-pin-recall) | 2 | ⚪ unknown | DeepSeek Harness plugin: pin assistant replies and recall them into the model turn |
| [dsh-deepseek-billing](https://github.com/Jolly-J/dsh-deepseek-billing) | 3 | ⚪ unknown | DSH WebUI 插件:DeepSeek 余额显示与按会话费用估算 |
| [dsh-checkpoint](https://github.com/dpskh/dsh-checkpoint) | 2 | ⚪ unknown | Mark an exploration start in the session; pairs with rewind to fold the exploration out of context. |
| [dsh-plugin-sysmon](https://github.com/hnmrxz/dsh-plugin-sysmon) | 2 | ⚪ unknown | Local system resource monitor (CPU / memory / disk / load / uptime) for the DeepSeek Harness bottom status bar. |
| [dsh-worktrees](https://github.com/Alexis-fish/dsh-worktrees) | 1 | ⚪ unknown | Git worktree isolation for parallel DeepSeek Harness sessions |
| [dsh-token-panel](https://github.com/juhe291/dsh-token-panel) | 6 | ⚪ unknown | Real-time token consumption HUD plugin for DeepSeek Harness. Live token usage monitor, context pressure, cost estimation, history… |
| [dsh-plugin-usage-dashboard](https://github.com/hnmrxz/dsh-plugin-usage-dashboard) | 2 | ⚪ unknown | DeepSeek usage & cost dashboard for the DSH bottom status bar: per-session token/cost aggregation with low-balance budget alert. |
| [dsh-token-monitor](https://github.com/zhangzheng25/dsh-token-monitor) | 4 | ⚪ unknown | DeepSeek Harness plugin: token usage & conversation stats as a native settings page - today / 7d / 30d totals, GitHub-style 90-da… |
| [dsh-system-proxy](https://github.com/khiqwq/dsh-system-proxy) | 3 | ⚪ unknown | DSH host plugin - smart outbound HTTP(S) routing: named proxies (http/https/socks4/4a/5/5h), per-host/provider/plugin rules, dire… |
| [dsh-background-agents](https://github.com/PerryLink/dsh-background-agents) | 3 | ⚪ unknown | Interactive long-session background agents for DeepSeek Harness: start a durable continuable child agent, watch its progress in t… |
| [dsh-rewind](https://github.com/dpskh/dsh-rewind) | 2 | ⚪ unknown | Fold everything since the last checkpoint mark into an auto-generated report, replacing it in context while keeping the full log. |
| [dsh-side-chat](https://github.com/KarlOfLaw/dsh-side-chat) | 1 | ⚪ unknown | Parent-session-aware side chat plugin for DeepSeek Harness |
| [dsh-slice-agent-loop](https://github.com/TT-Wang/dsh-slice-agent-loop) | 1 | ⚪ unknown | A drop-in DeepSeek Harness agent loop whose context engine is a bounded slice instead of a growing transcript |
| [dsh-model-router](https://github.com/tianji-qingtian/dsh-model-router) | 12 | ⚪ unknown | Model router & cost optimizer for DeepSeek Harness: heuristic tier routing, failure fallback, and live per-session token/cache/co… |
| [dsh-everything-oauth](https://github.com/kam74515-boop/dsh-everything-oauth) | 1 | ⚪ unknown | Import local Codex / Grok / Claude / OpenCode / CC Switch logins into DeepSeek Harness |
| [dsh-agent-replay](https://github.com/forrestsweet/dsh-agent-replay) | 1 | ⚪ unknown | DeepSeek Harness 会话回放与脱敏分享插件：将真实 Agent 轨迹导出为独立交互 HTML，用于文档、演示和问题反馈。 |
| [dsh-memory-director](https://github.com/ljsysfurryACE/dsh-memory-director) | 0 | ⚪ unknown | MemoryDirector plugin for DeepSeek Harness: LLM-driven remember/forget (official harness has no memory) |
| [dsh-bottom-stats](https://github.com/318197375/dsh-bottom-stats) | 0 | ⚪ unknown | DSH plugin: full-width conversation stats line (no truncation) + context occupancy progress bar for the DeepSeek Harness web UI |
| [tmcra-deepseek-harness-memory](https://github.com/reshuibuduo/tmcra-deepseek-harness-memory) | 1 | ⚪ unknown | TMCRA Agent 长期记忆系统的 DeepSeek Harness 接入插件：自动延续跨对话项目记忆，并沉淀项目知识与工作经验。 |
| [dsh-skillradar](https://github.com/hellosky983/dsh-skillradar) | 3 | ⚪ unknown | Skill Radar for DeepSeek Harness (dsh): scan the current session's visible skills, score relevance against the conversation, and… |
| [dsh-plugin](https://github.com/Suxeca/dsh-plugin) | 2 | ⚪ unknown | DSH 会话切换面板插件（Ctrl+K / Ctrl+[ ]，npm 可装）+ 插件开发模板 |
| [dsh-ui-progress](https://github.com/omdsh-dev/dsh-ui-progress) | 2 | ⚪ unknown | DSH Web UI 会话进度插件：输入框停靠区常驻会话进度条（todos 真实进度 / 实时 token 生成速率 / 中断橘红态 / 待办提醒），零核心改动 |
| [dsh-git-branch-switcher](https://github.com/mixin-ai/dsh-git-branch-switcher) | 0 | ⚪ unknown | DeepSeek Harness web plugin: git branch pill in the session header with UI branch switching |
| [dsh-plugins](https://github.com/NinjaSln-labs/dsh-plugins) | 1 | ⚪ unknown | DSH plugin collection: DeepSeek Harness community plugins (session-health, knowledge, ...) |
| [dsh-skill-evolve](https://github.com/dmsobtl/dsh-skill-evolve) | 0 | ⚪ unknown | DSH 插件：Agent 自我进化引擎 — 从成功会话中自动提炼可复用 skill，越用越聪明。 |
| [dsh-mcp-adapter](https://github.com/NexusAgentX/dsh-mcp-adapter) | 0 | ⚪ unknown | MCP adapter for DeepSeek Harness — one proxy tool instead of dumping every MCP schema into context. |
| [dsh-session-analyst](https://github.com/dmsobtl/dsh-session-analyst) | 1 | ⚪ unknown | DSH 插件：Agent 会话质量分析 —— 工具成功率、token 效率、冗余调用检测、跨会话回归对比。PS：上传文件有点问题，等我重新整理下 |
| [dsh-tmcra-memory](https://github.com/reshuibuduo/dsh-tmcra-memory) | 1 | ⚪ unknown | TMCRA Agent 长期记忆系统的 DeepSeek Harness 接入插件：跨对话延续项目记忆，自动沉淀项目知识与工作经验。 |
| [dsh-plugin-cc](https://github.com/cpj-dev/dsh-plugin-cc) | 10 | ⚪ unknown | Bridge Deepseek-harness into Claude Code for review, critique, delegation, and session import. |
| [dsh-plugin-langfuse](https://github.com/linyp/dsh-plugin-langfuse) | 3 | ⚪ unknown | Langfuse observability for DeepSeek Harness (dsh): exports agent sessions as OpenTelemetry trace trees (GenAI semconv) to Langfus… |
| [dsh-git-credentials](https://github.com/revive/dsh-git-credentials) | 2 | ⚪ unknown | DeepSeek Harness plugin: GitLab and GitHub API tokens stay out of the model context — encrypted at rest (AES-256-GCM), tools on d… |
| [dsh-usage-footer](https://github.com/1514100951/dsh-usage-footer) | 4 | ⚪ unknown | DSH web 用量/费用悬浮按钮插件：账户余额、峰谷时段、今日/本会话消费估算与 token 统计（含设置开关） |
| [dsh-usage-cost](https://github.com/fflow2023/dsh-usage-cost) | 1 | ⚪ unknown | Lightweight DeepSeek Harness plugin: per-session + global API cost stats (peak/off-peak pricing) |
| [dsh-daily-brief](https://github.com/Equinox7379/dsh-daily-brief) | 1 | ⚪ unknown | Daily activity brief for DSH: per-session turns/messages/tool-call stats. Read-only. |
| [dsh-netcafe](https://github.com/mario03690/dsh-netcafe) | 0 | ⚪ unknown | DeepSeek Harness bundle: adds AI NetCafé's hosted outcome tools (statement extraction with reconciliation, SQL dialect transpile,… |
| [dsh-codex-sync](https://github.com/DreamZhongJu/dsh-codex-sync) | 0 | ⚪ unknown | Import DeepSeek-on-Codex chat history into DeepSeek Harness (dsh) |
| [dsh-fusion](https://github.com/omdsh-dev/dsh-fusion) | 1 | ⚪ unknown | 将多个 DeepSeek Harness 对话融合为一个可继续的会话，支持 Agent 智能剪枝、话题分组、内容排序和界面操作 |
| [dsh-better-chat-history](https://github.com/echo-xianyu/dsh-better-chat-history) | 2 | ⚪ unknown | A plugin for DSH to optimize session loading speed and reduce disk read/write consumption. |
| [dsh-subagent-status](https://github.com/zzy2210/dsh-subagent-status) | 0 | ⚪ unknown | DeepSeek Harness 常驻插件:在会话标题栏显示主代理与每个子代理实际使用的模型和思考档位 | Persistent DSH web plugin: shows the model & reasoning effort actually used… |
| [dsh-llmwiki](https://github.com/chancelu/dsh-llmwiki) | 2 | ⚪ unknown | Local Markdown wiki as long-term memory for DeepSeek Harness — RRF-fused retrieval (keyword + wikilink graph + temporal), token-b… |
| [dsh-cookie-bridge](https://github.com/xiaoheizi1212/dsh-cookie-bridge) | 1 | ⚪ unknown | Chrome extension that exports plaintext cookies to dsh-computer-use over localhost (no App-Bound decryption needed). |
| [dsh-memory](https://github.com/U-Illll/dsh-memory) | 2 | ⚪ unknown | Memory retrieval plugin for DeepSeek Harness (dsh): wiki double-link memory graph with 9 tools — hybrid search, read, link-scan,… |
| [dsh-token-usage](https://github.com/samecorner/dsh-token-usage) | 1 | ⚪ unknown | DSH (DeepSeek Harness) web plugin — Token usage analytics tab for the conversation view (KPIs, context meter, donut, stacked per-… |
| [dsh-agentmemory](https://github.com/elementor-i/dsh-agentmemory) | 3 | ⚪ unknown | agentmemory for DeepSeek Harness (dsh): full memory_* tools, capture hooks, and context injection over the local REST server |
| [dsh-agent-compact](https://github.com/jonah791/dsh-agent-compact) | 1 | ⚪ unknown | Agent-driven compaction for DeepSeek Harness: the agent summarizes its own conversation (KV-cache friendly, no giant replay). Ver… |
| [dsh-multi-tenant](https://github.com/GuoMonth/dsh-multi-tenant) | 3 | ⚪ unknown | Multi-tenant SaaS extension for DeepSeek Harness (DSH): tenant identity, session isolation, authorization, tenant-aware MCP, and… |
| [dsh-auto-memory](https://github.com/Aik358/dsh-auto-memory) | 4 | ⚪ unknown | DSH 自动记忆插件:三层记忆(用户级/项目笔记/每日日志)自动注入与检索、每日反思、可视化面板与设置页,支持继承其他 AI 工具的历史记忆。 |
| [dsh-sidebar-mode](https://github.com/Meredith2328/dsh-sidebar-mode) | 3 | ⚪ unknown | 把默认的四种模式切换塞进「新会话」按钮里，新会话创建更方便（标准/PTC/创造/极简，与设置双向同步） |
| [dsh-context](https://github.com/bowenliang123/dsh-context) | 33 | ⚪ unknown | A DeepSeek Harness plugin for Context insight panel — a Context tab in the web UI showing what the model's context window is made… |
| [dsh-sidechain](https://github.com/omdsh-dev/dsh-sidechain) | 6 | ⚪ unknown | DSH 侧会话插件：/side 持续性侧会话（Codex 风格）与 /btw 一次性侧问（Claude 风格）——在临时 fork 中运行、不写入主会话历史；Web UI 右侧链面板内嵌对话，主会话保持不变 |
| [dsh-provider-model-configurator](https://github.com/LiangYin233/dsh-provider-model-configurator) | 11 | ⚪ unknown | DSH 高级模型配置器：为 DeepSeek Harness 提供将 pi-ai 预设模型的上下文、输出上限、推理挡位一键应用到自定义提供商的能力。 |
| [dsh-plugin-deepseek-pricing](https://github.com/Dasooul03/dsh-plugin-deepseek-pricing) | 4 | ⚪ unknown | DSH Price Monitor（价格监控）· DeepSeek 实时定价、峰谷自动切换与会话费用监控的 dsh 插件 |
| [dsh-client-ui-monitor](https://github.com/Auran-Lu/dsh-client-ui-monitor) | 3 | ⚪ unknown | 用于监控当前会话额度消耗、预估费用及当前API余额/Used to monitor the current session's quota consumption, estimated costs, and current API balance. |
| [dsh-plugin-consult](https://github.com/biuboomc/dsh-plugin-consult) | 3 | ⚪ unknown | DeepSeek Harness peer-consult plugin: talk to a fork of another session without mutating the original |
| [dsh-better-archive](https://github.com/huahai0202/dsh-better-archive) | 3 | ⚪ unknown | DeepSeek Harness (DSH) web-GUI plugin: archived-session panel with unarchive & delete |
| [dsh-session-cost](https://github.com/ljcscp/dsh-session-cost) | 1 | ⚪ unknown | Session cost & balance readout for DeepSeek Harness (DSH) Web GUI: official pricing, peak/off-peak hours, per-model costing |
| [dsh-archived-sessions](https://github.com/Zephyr-vibe/dsh-archived-sessions) | 7 | ⚪ unknown | DSH Session Manager: manage conversations, archive/restore, delete safely, open record folders. |
| [dsh-session-cost](https://github.com/ChengChe106/dsh-session-cost) | 3 | ⚪ unknown | DSH plugin: estimated DeepSeek API cost per session in the web GUI stats strip |
| [dsh-polling](https://github.com/cnyac/dsh-polling) | 1 | ⚪ unknown | dsh-polling — 轮询任务/定时任务 plugin for DeepSeek Harness: cron scheduled tasks as real sessions, natural-language creation, model tool… |
| [dsh-session-export](https://github.com/yangyongzhen/dsh-session-export) | 3 | ⚪ unknown | Export DeepSeek Harness sessions to Markdown for review, blogging and audit. dsh plugin. |
| [dsh-tool-user-memory](https://github.com/IAMLieutenant/dsh-tool-user-memory) | 3 | ⚪ unknown | DeepSeek Harness 用户记忆插件 |
| [dsh-session-export](https://github.com/bwndlct/dsh-session-export) | 3 | ⚪ unknown | Export DeepSeek Harness (DSH) sessions to portable Markdown and JSON — dsh plugin |
| [dsh-achievements](https://github.com/Blaczz/dsh-achievements) | 2 | ⚪ unknown | DeepSeek Harness achievement & gamification plugin: cross-session badges for turns, tool calls, sessions and daily streaks, with… |
| [dsh-plugin-balance](https://github.com/pythonshiyi/dsh-plugin-balance) | 1 | ⚪ unknown | 余额显示插件（DeepSeek Harness 网页端）：会话头部实时账户余额 | Live account balance for DeepSeek Harness web UI |
| [dsh-billing](https://github.com/TheTianzz/dsh-billing) | 6 | ⚪ unknown | DeepSeek Harness plugin: 账户余额 + 会话费用（/balance /cost 命令、deepseek_billing 工具、Web UI 双胶囊），官方价格每 12 小时自动同步 |
| [dsh-archived-conversations](https://github.com/hxyz486/dsh-archived-conversations) | 6 | ⚪ unknown | 归档对话查看 (archived-conversation-viewer)：在 DSH 设置页查看、恢复与删除归档会话的 Cordis 插件 |
| [dsh-browser-playwright](https://github.com/ChenyuHeee/dsh-browser-playwright) | 3 | ⚪ unknown | Snapshot-first Playwright browser automation for DeepSeek Harness: accessibility-tree interaction with stable refs, per-session b… |
| [dsh-session-deeplink](https://github.com/R3alloc/dsh-session-deeplink) | 6 | ⚪ unknown | DeepSeek Harness plugin for shareable session deep links |
| [dsh-personalize](https://github.com/Zephyr-vibe/dsh-personalize) | 4 | ⚪ unknown | Per-host personalization for DSH: custom instructions, local long-term memory, and reply-tone presets. |
| [dsh-stats-dashboard](https://github.com/1HelloMan1/dsh-stats-dashboard) | 4 | ⚪ unknown | DSH plugin: provider/model usage stats dashboard with response speed, call log, token totals, cache rate, cost estimates, CSV exp… |
| [dsh-client-pricing](https://github.com/Miyazawai/dsh-client-pricing) | 8 | ⚪ unknown | 会话顶栏实时显示 DeepSeek API 价格（峰谷定价 / 现行一口价，flash / pro 自动切换） | DeepSeek Harness client plugin: live DeepSeek API pricing badge (peak/o… |
| [dsh-session-audit](https://github.com/bwndlct/dsh-session-audit) | 3 | ⚪ unknown | Session execution analytics and audit reports for DeepSeek Harness — see how your agent actually worked |
| [dsh-gpu](https://github.com/zytsyj/dsh-gpu) | 2 | ⚪ unknown | GPU-aware execution layer for DeepSeek Harness: gpu_status / gpu_exec / gpu_run_bg tools, auto card selection, per-step GPU conte… |
| [dsh-im-gateway](https://github.com/jelech/dsh-im-gateway) | 2 | ⚪ unknown | An IM gateway for the DeepSeek Harness: bridge messengers into harness agent sessions and control them with slash commands. |
| [dsh-quote-annotate](https://github.com/wangwei-wade/dsh-quote-annotate) | 3 | ⚪ unknown | DSH 会话选区引用与锚点批注插件：选中文字 → 批注 → 引用锚点 chip（点击跳回原文、悬停显示原文）。Contextual selection & anchored annotation plugin for DeepSeek Harness. |
| [Liltloom](https://github.com/Adkid-Zephyr/Liltloom) | 3 | ⚪ unknown | 语织：中文优先、用户可控的 AI 写作风格记忆层，让 AI 学会你的表达，需要时再调用。Chinese-first style memory for AI; DeepSeek Harness adapter included. |
| [dsh-ops-kit](https://github.com/LeslieWylie/dsh-ops-kit) | 3 | ⚪ unknown | A reusable DeepSeek Harness bundle for evidence-driven memory, orchestration, benchmark operations, and plugin release workflows. |
| [dsh-session-tree](https://github.com/ZhengQingJing/dsh-session-tree) | 3 | ⚪ unknown | Git-like immutable session branching for DeepSeek Harness |
| [blender](https://github.com/CheshireJCat/blender) | 6 | ⚪ unknown | DeepSeek Harness plugin for complete Blender 3D modeling, reconstruction, rendering, validation, and export workflows |
| [dsh-usage-stats](https://github.com/lanlandeli/dsh-usage-stats) | 5 | ⚪ unknown | DeepSeek Harness 精美 Token 数据面板：趋势图、活跃热力图、模型用量分析与 CSV/JSON 导出。 |
| [dsh-balance-tide](https://github.com/huanyuLv/dsh-balance-tide) | 3 | ⚪ unknown | DeepSeek Harness (DSH) Web 插件: 余额 + 峰谷计价潮汐提示。显示 DeepSeek 账户余额与本会话花费, 并在余额前提示当前峰/谷价格档位、距切换倒计时与使用建议。 |
| [dsh-plugin-window-stats](https://github.com/wellorbetter/dsh-plugin-window-stats) | 2 | ⚪ unknown | DSH web plugin: a cross-session dashboard showing conversation progress and token usage for all sessions. |
| [dsh-wanghong-handwritten-ppt](https://github.com/tjxj/dsh-wanghong-handwritten-ppt) | 2 | ⚪ unknown | 王虹学术手写风 PPT Skill for DeepSeek Harness · Notability-style HTML slides and PNG export |
| [dsh-task-planner](https://github.com/ztl34245881-commits/dsh-task-planner) | 4 | ⚪ unknown | Task planning with experience muscle-memory for DeepSeek Harness: condition-reflex recall + LLM capability matching + auto-persis… |
| [dsh-np-ppt](https://github.com/z953218350/dsh-np-ppt) | 2 | ⚪ unknown | 原生 DSH (DeepSeek Harness) 插件：PPT 演示文稿专家，内置 PPTD DSL 引擎、55173 所见即所得可视化编辑器、Python-PPTX 高保真离线编译内核与一键导出 PPTX。 | Native DSH plugin: PP… |
| [deepseek-harness-external-migration](https://github.com/buguoshixc/deepseek-harness-external-migration) | 4 | ⚪ unknown | **DeepSeek-Harness Migration Plugin** 是一款专为 [DeepSeek-Harness](https://github.com/deepseek-ai/deepseek-harness) 设计的插件，旨在帮助开发者无缝迁移… |
| [dsh-side-chat](https://github.com/heartmove/dsh-side-chat) | 5 | ⚪ unknown | 一个 DSH 网页插件：在对话中选中部分内容后，即可在 侧边聊天里提问 —— 侧边聊天是位于右侧面板、按发起它的主会话隔离的独立聊天。 |
| [dsh-client-ui-voice-input](https://github.com/zjzqs/dsh-client-ui-voice-input) | 2 | ⚪ unknown | DeepSeek Harness (dsh) Web UI plugin: voice input + prompt optimization for the composer. 语音输入 + 提示词优化（Web Speech API，宿主端 LLM 优化，… |
| [dsh-gzip](https://github.com/040822/dsh-gzip) | 2 | ⚪ unknown | dsh-gzip插件：压缩API响应，降低带宽占用，解决低速网络下历史加载失败问题 |
| [pa-dsh](https://github.com/ConradLu2740/pa-dsh) | 1 | ⚪ unknown | ProactiveAgent × DeepSeek Harness 插件组：把主动记忆 + 主动建议接入 DSH（6 个 cordis 插件，引擎零重写） |
| [deepseek-harness-wallet](https://github.com/feibi-mochi/deepseek-harness-wallet) | 7 | ⚪ unknown | Balance monitoring, per-session spend & token tracking, low-balance alerts, and an official recharge shortcut for DeepSeek Harnes… |
| [dsh-import-agents](https://github.com/Chang-Tong/dsh-import-agents) | 6 | ⚪ unknown | Import pi / opencode / codex / claude-code sessions, chat history, and agents into DeepSeek Harness — one-click Sync button, slas… |
| [dsh-requirements-alignment](https://github.com/jiezeng2004-design/dsh-requirements-alignment) | 3 | ⚪ unknown | Lightweight requirement alignment for DeepSeek Harness — align important decisions before execution without a full spec workflow. |
| [prompt-optimizer](https://github.com/x118111/prompt-optimizer) | 2 | ⚪ unknown | A DeepSeek Harness (DSH) dynamic plugin that adds an ✨ optimize-prompt button to the chat composer — context-aware LLM rewriting… |
| [dsh-btw](https://github.com/iyllyt/dsh-btw) | 4 | ⚪ unknown | 个人很喜欢 Claude Code 的 /btw，于是为 DSH 做了复刻：共享当前上下文快速旁路提问，不中断主任务，也不写入主会话历史。 |
| [dsh-balance](https://github.com/LemCAE/dsh-balance) | 3 | ⚪ unknown | 一个适用于deepseek-harness的插件，功能是显示当前账户余额以及当前会话预估的费用消耗 | A plugin for deepseek-harness that displays the current account balance and t… |
| [dsh-teacher](https://github.com/Yihong89/dsh-teacher) | 3 | ⚪ unknown | DSH teacher plugin: Socratic tutor that leads you to answers from a markdown question set, tracks knowledge gaps in-session, and… |
| [dsh-bookmarks](https://github.com/penguin-oo/dsh-bookmarks) | 4 | ⚪ unknown | Bookmark assistant replies in DeepSeek Harness: per-message bookmarks with notes/tags, a cross-session center, and one-click Mark… |
| [dsh-usage-plugin](https://github.com/feiyang-dev/dsh-usage-plugin) | 7 | ⚪ unknown | DeepSeek Harness 用量与消耗插件（dsh-usage）—— 每次调用的 token 用量/缓存命中统计、峰谷计费、余额查询、CSV/JSON/PNG 导出，可经桌面端一键安装或命令行 dsh plugin add 安装。 |
| [dsh-billing-glass](https://github.com/linkingoscar/dsh-billing-glass) | 2 | ⚪ unknown | Liquid-glass billing overlay for the DeepSeek Harness Web GUI: provider balances, session cost, daily spend and token buckets. De… |
| [dsh-memory](https://github.com/FuRongJun-1999/dsh-memory) | 1 | ⚪ unknown | Multi-agent spatiotemporal memory graph for DeepSeek Harness.Cross-session persistence, knowledge flywheel, importance-gated memo… |
| [dsh-noema](https://github.com/ZSeven-W/dsh-noema) | 4 | ⚪ unknown | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| [dsh-memoir](https://github.com/Qinling-Melon-Farmers/dsh-memoir) | 4 | ⚪ unknown | DSH 项目持久化记忆插件（TypeScript）：会话归纳 + 经验教训沉淀，写入 PROJECT_MEMORY.md 与全局索引；每轮工作结束自动提醒蒸馏、自动注入未来 AGENTS；附 Web GUI 记忆面板（项目/全局 tab、检索、手动记录/删除… |
| [dsh-LorebookMD](https://github.com/609476965/dsh-LorebookMD) | 4 | ⚪ unknown | DSH lorebook-driven fiction writer plugin: import Tavern/SillyTavern character cards & world books, save local Markdown settings,… |
| [DSH-recall-plugin](https://github.com/limbo947/DSH-recall-plugin) | 4 | ⚪ unknown | DSH 消息撤回插件：回到发送该消息时的状态 |
| [dsh-balance](https://github.com/deepforce/dsh-balance) | 3 | ⚪ unknown | DSH plugin: /balance command + composer-dock balance readout with top-up link & session-cost estimate |
| [dsh-of-your-own](https://github.com/LaplaceYoung/dsh-of-your-own) | 2 | ⚪ unknown | /fuck — migrates your Claude Code & Codex habits into DeepSeek Harness. One command, parallel scan, boot-time recall. |
| [dsh-mcp-bridge](https://github.com/Edge-Echo/dsh-mcp-bridge) | 3 | ⚪ unknown | Curated, verified MCP server bundle for DeepSeek Harness (dsh): one install brings demo, memory, filesystem, GitHub, Playwright a… |
| [dsh-client-ui-side-tasks](https://github.com/uluckystar/dsh-client-ui-side-tasks) | 2 | ⚪ unknown | DSH 侧边任务插件:主对话右侧临时任务面板(fork 子会话,删除零残留)。by MyDSH 社区 (mydsh.dev) |
| [dsh-headroom](https://github.com/wjxn13/dsh-headroom) | 3 | ⚪ unknown | Headroom context-compression proxy integration for DeepSeek Harness: detect/install/start Headroom, auto-configure the DeepSeek c… |
| [dsh-mcp-lens](https://github.com/labmimors/dsh-mcp-lens) | 4 | ⚪ unknown | Shrink MCP context in DeepSeek Harness: 1,000 remote tools behind 2 exact-schema interfaces, with a measured V4 Flash cost pilot. |
| [dsh-subagent-admission](https://github.com/yha9806/dsh-subagent-admission) | 3 | ⚪ unknown | Shared lifecycle admission protocol and reference policy kernel for DeepSeek Harness subagents. |
| [dsh-browser](https://github.com/wqty123/dsh-browser) | 3 | ⚪ unknown | Shared real browser plugin for DeepSeek Harness |
| [dsh-chatgpt-bridge](https://github.com/jiezeng2004-design/dsh-chatgpt-bridge) | 3 | ⚪ unknown | MCP bridge that lets ChatGPT create, view, continue, and control DeepSeek Harness (DSH) agent sessions. |
| [dsh-cloak-browser](https://github.com/maxiaovivi/dsh-cloak-browser) | 3 | ⚪ unknown | Native CloakBrowser tools for DeepSeek Harness: isolated browser sessions, snapshots, interaction, screenshots, and safe Agent ro… |
| [dsh-files](https://github.com/taxueseek/dsh-files) | 3 | ⚪ unknown | DeepSeek Harness dual-face plugin: session-isolated file upload with colorful composer cards + read_document tool (text/PDF/DOCX/… |
| [session-archive-manager](https://github.com/my-dsh-plugin/session-archive-manager) | 3 | ⚪ unknown | DeepSeek Harness 插件：在设置中查看并管理归档会话，支持取消归档、删除、批量删除与全量删除。Manage archived sessions from DeepSeek Harness Settings: view, unarchive, d… |
| [dsh-memoryhub](https://github.com/solknight48/dsh-memoryhub) | 3 | ⚪ unknown | MemoryHub (mh) plugin for DeepSeek Harness (dsh): auto-loads checkpoint memory on session start, adds mh_* tools and the mh skill… |
| [dsh-mermaid](https://github.com/AKS1st/dsh-mermaid) | 2 | ⚪ unknown | 在 DSH Web 会话中把 Mermaid 代码围栏渲染为 SVG 图表 | Render Mermaid code fences as SVG diagrams in DSH Web messages |
| [dsh-voice](https://github.com/3274375092/dsh-voice) | 3 | ⚪ unknown | DeepSeek Harness 的语音输入插件:网页里点 🎤(或按Ctrl+空格)说话,识别文本作为普通消息提交进会话。纯输入,与 agent preset/人设完全解耦,任何模式下都只是"另一种输入法"。 |
| [dsh-data-ledger](https://github.com/Niuniu-Sir/dsh-data-ledger) | 2 | ⚪ unknown | 数据台账：DeepSeek Harness 本地数据统一看板——对话/账本/技能/记忆/日志的来源、位置与内容摘要，回收站删除、浏览器存储清理（dsh-plugin） |
| [dsh-hermes-memory-bridge](https://github.com/GLFzr/dsh-hermes-memory-bridge) | 2 | ⚪ unknown | Bridge DeepSeek Harness (DSH) session compaction summaries into Hermes Agent persistent memory. 把 DSH 会话压缩总结自动桥接进 Hermes 永久记忆。 |
| [dsh-cost-balance](https://github.com/zoumutou/dsh-cost-balance) | 2 | ⚪ unknown | DeepSeek Harness 插件：输入框下方 iOS 风格统计条——会话花费、账户余额、缓存命中、Token 用量一键展开 |
| [dsh-token-pricing](https://github.com/LightClear/dsh-token-pricing) | 3 | ⚪ unknown | DeepSeek Harness模型定价插件 · 配置token价格并显示会话费用 | Token pricing plugin for DeepSeek Harness — per-model token rates with a live convers… |
| [dsh-delete-session](https://github.com/dream12347/dsh-delete-session) | 3 | ⚪ unknown | Delete DSH conversation sessions from a Settings panel/在设置面板中增加删除会话管理以便删除无用会话 |
| [dsh-md-preview](https://github.com/LeslieWylie/dsh-md-preview) | 2 | ⚪ unknown | Render Markdown to standalone, self-contained HTML in the DeepSeek Harness — an md_html_render tool that works headless, plus a p… |
| [dsh-Friend](https://github.com/wanghehe123/dsh-Friend) | 2 | ⚪ unknown | 人格化伴侣插件 for DeepSeek Harness：角色卡、语音、Live2D、本地记忆与工作陪伴。 |
| [dsh-web-mobile](https://github.com/mexiaosqwq/dsh-web-mobile) | 5 | ⚪ unknown | DeepSeek Harness Web UI 移动端适配插件:窄屏下侧边栏变为 overlay 抽屉,会话独占全宽。 |
| [dsh-habits](https://github.com/DimitriLIAN/dsh-habits) | 2 | ⚪ unknown | Habits editor for DeepSeek Harness — edit the user-global AGENTS.md from Web settings, injected into every session |
| [dsh-failure-capsule](https://github.com/YiHarvest/dsh-failure-capsule) | 2 | ⚪ unknown | Local-first failure evidence capsules for DeepSeek Harness sessions |

### 🧠 模型

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 365 | ⚪ unknown | 给纯文本模型加视觉：图片问答、长截图 OCR、UI 还原 |
| [Deepseek-omnimodal](https://github.com/good-boy4069/Deepseek-omnimodal) | 3 | ⚪ unknown | 面向纯文本 Agent 的开源多模态 MCP |
| [dsh-computer-use](https://github.com/Anionex/dsh-computer-use) | 18 | ⚪ unknown | 电脑控制插件（Accessibility 观测 + 作用域权限） |
| [dsh-vision](https://github.com/william-jin-cmu/dsh-vision) | 22 | ⚪ unknown | view_image 工具桥接任意 OpenAI 兼容 VLM |
| [modlens](https://github.com/liustack/modlens) | 1422 | ⚪ unknown | DeepSeek Harness 首个视觉插件，纯文本模型看图。 |
| [agent-vision-toolkit](https://github.com/Anionex/agent-vision-toolkit) | 852 | ⚪ unknown | 为纯文本模型看图设计的视觉工具箱与技能：多图理解、图片问答、UI 还原、GUI 自动化。 |
| [dsh-tool-turbo](https://github.com/Electricitysheep/dsh-tool-turbo) | 4 | ⚪ unknown | 每轮 reasoning_effort 优化器。 |
| [dsh-plugin-cost-tracker](https://github.com/YYTbit/dsh-plugin-cost-tracker) | 3 | ⚪ unknown | DeepSeek Harness token 成本追踪器。 |
| [dsh-cost](https://github.com/GiantGKL/dsh-cost) | 3 | ⚪ unknown | DSH token 成本统计插件。 |
| [dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) | 7 | ⚪ unknown | DeepSeek 大脑 + 自动识图：图片经 VLM 识别。 |
| [dsh-her-eyes](https://github.com/huashenglian/dsh-her-eyes) | 4 | ⚪ unknown | 让 AI 自动调用 VLM 做视觉分析的 dsh 插件。 |
| [dsh-recommend](https://github.com/zp-home/dsh-recommend) | 11 | ⚪ unknown | DSH 插件生态透明排行与推荐：每日自动抓取 dsh-plugin 话题 + 公开评分模型 + 排行/推荐插件与静态站 |
| [dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) | 5 | ⚪ unknown | DSH 原生鸿蒙设备桥：hdc 工具让 Agent 完成截图-看图-装包-验证的闭环调试 / DSH-native HarmonyOS device bridge |
| [dsh-plugin-deepeye](https://github.com/Favio8/dsh-plugin-deepeye) | 4 | ⚪ unknown | dsh-plugin-deepeye — DSH 插件（模型） |
| [dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) | 2 | ⚪ unknown | dsh-tiered-approval — DSH 插件（模型） |
| [dsh-mcp-manager](https://github.com/hyqhyq3/dsh-mcp-manager) | 6 | ⚪ unknown | dsh-mcp-manager — DSH 插件（模型） |
| [dsh-llm-codex-oauth](https://github.com/Player-MINEPIG/dsh-llm-codex-oauth) | 6 | ⚪ unknown | 在 dsh（DeepSeek Harness）里使用你的 ChatGPT / Codex 订阅。插件通过 OpenAI Codex 的 OAuth 流程登录 ChatGPT 账号，把订阅额度暴露成 dsh 的 `codex-oauth` 模型提供方。 |
| [dsh-payload-capture](https://github.com/Moeblack/dsh-payload-capture) | 1 | ⚪ unknown | DSH 插件：捕捉每次上行模型 API payload，JSON 落盘 |
| [doubao-vision-dsh](https://github.com/hawkongz/doubao-vision-dsh) | 1 | ⚪ unknown | 让纯文本模型通过桌面豆包看见聊天图片的 DeepSeek Harness 宿主插件(CDP 桥接,全预设生效,识别可取消) |
| [dsh-vision-LMstudio](https://github.com/TiankunDai/dsh-vision-LMstudio) | 1 | ⚪ unknown | 让你能通过deepseek harness调用LM studio加载的本地视觉模型 |
| [dsh-tool-vision](https://github.com/Scorp1o117/dsh-tool-vision) | 2 | ⚪ unknown | dsh-tool-vision — DSH 插件（模型） |
| [dsh-effort-tweak](https://github.com/Toukaiteio/dsh-effort-tweak) | 3 | ⚪ unknown | dsh-effort-tweak — DSH 插件（模型） |
| [dsh-toolbelt](https://github.com/cking000bigdemon/dsh-toolbelt) | 1 | ⚪ unknown | dsh-toolbelt — DSH 插件（模型） |
| [multimodal-bridge](https://github.com/Spirit4471/multimodal-bridge) | 1 | ⚪ unknown | multimodal-bridge 是一个多模态能力桥：把 Qwen 的视觉理解（Qwen-VL）与图像生成（Qwen-Image）带给没有原生多模态能力的纯文本模型（如 DeepSeek）。它有两种形态、同一套后端： MCP Server（qwen_vis… |
| [dsh-live-stats](https://github.com/Proton1917/dsh-live-stats) | 1 | ⚪ unknown | dsh-live-stats — DSH 插件（模型） |
| [dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) | 2 | ⚪ unknown | dsh-ui-spec — DSH 插件（模型） |
| [dsh-plugin-vision-toolkit](https://github.com/YYTbit/dsh-plugin-vision-toolkit) | 1 | ⚪ unknown | dsh-plugin-vision-toolkit — DSH 插件（模型） |
| [dsh-usage-cost](https://github.com/Dino6021/dsh-usage-cost) | 2 | ⚪ unknown | dsh-usage-cost — DSH 插件（模型） |
| [dsh-mimo-vision-hint](https://github.com/Isekai-Mfu/dsh-mimo-vision-hint) | 2 | ⚪ unknown | dsh-mimo-vision-hint — DSH 插件（模型） |
| [dsh-multimodal](https://github.com/MC5lan/dsh-multimodal) | 3 | ⚪ unknown | 给 DeepSeek 安装一双眼睛和一支画笔:会话里直接贴截图/图片,GLM 视觉模型先精确转写图片内容(报错信息、代码、界面逐字保留),然后 DeepSeek 继续处理你的问题——同一轮完成,全程无感;需要配图时,DeepSeek 自动调用文生图后端出图并… |
| [dsh-vision-helper](https://github.com/Yuuz12/dsh-vision-helper) | 2 | ⚪ unknown | dsh-vision-helper — DSH 插件（模型） |
| [dsh-model-modes](https://github.com/DTSFO/dsh-model-modes) | 2 | ⚪ unknown | dsh-model-modes — DSH 插件（模型） |
| [dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) | 3 | ⚪ unknown | dsh-pet-corner — DSH 插件（模型） |
| [dsh-eco-router](https://github.com/joyfoxai/dsh-eco-router) | 1 | ⚪ unknown | dsh-eco-router — DSH 插件（模型） |
| [dsh-effort-config](https://github.com/benzhoupo/dsh-effort-config) | 1 | ⚪ unknown | dsh-effort-config — DSH 插件（模型） |
| [dsh-image-to-path](https://github.com/cesaryike/dsh-image-to-path) | 2 | ⚪ unknown | DSH 插件:让纯文本模型对话也能拖图/贴图——图片自动保存到会话工作区,以文件路径交给模型(多模态模型不受影响) |
| [dsh-vision](https://github.com/xiaoshihou514/dsh-vision) | 2 | ⚪ unknown | dsh-vision — DSH 插件（模型） |
| [dsh-usage-meter](https://github.com/cute-baobao/dsh-usage-meter) | 2 | ⚪ unknown | dsh-usage-meter — DSH 插件（模型） |
| [dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) | 1 | ⚪ unknown | dsh-plugin-clawrouters — DSH 插件（模型） |
| [dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) | 1 | ⚪ unknown | dsh-mac-vision — DSH 插件（模型） |
| [dsh-plugin-llm-codex](https://github.com/jasper-zsh/dsh-plugin-llm-codex) | 0 | ⚪ unknown | dsh-plugin-llm-codex — DSH 插件（模型） |
| [dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) | 2 | ⚪ unknown | dsh-think-flow-flow — DSH 插件（模型） |
| [dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) | 1 | ⚪ unknown | dsh-prompt-profile — DSH 插件（模型） |
| [dsh-polyglot](https://github.com/Jesse-njx/dsh-polyglot) | 1 | ⚪ unknown | dsh-polyglot — DSH 插件（模型） |
| [dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) | 5 | ⚪ unknown | dsh-token-stats — DSH 插件（模型） |
| [dsh-cost](https://github.com/dongsheng123132/dsh-cost) | 3 | ⚪ unknown | dsh-cost — DSH 插件（模型） |
| [dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) | 0 | ⚪ unknown | dsh-plugin-usage-report — DSH 插件（模型） |
| [dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) | 2 | ⚪ unknown | dsh-model-thinking — DSH 插件（模型） |
| [dsh-vision-sidecar](https://github.com/121103qwq/dsh-vision-sidecar) | 5 | ⚪ unknown | dsh-vision-sidecar — DSH 插件（模型） |
| [owlx-mcp](https://github.com/Chungor/owlx-mcp) | 0 | ⚪ unknown | owlx-mcp — DSH 插件（模型） |
| [dsh-qwen-mm](https://github.com/RRRosmontis/dsh-qwen-mm) | 2 | ⚪ unknown | dsh-qwen-mm — DSH 插件（模型） |
| [noatmark-dsh-plugin](https://github.com/ylwl1997/noatmark-dsh-plugin) | 1 | ⚪ unknown | noatmark-dsh-plugin — DSH 插件（模型） |
| [dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) | 2 | ⚪ unknown | DeepSeek Harness 成本显示插件 |
| [dsh-plugin-provider-quota](https://github.com/jasper-zsh/dsh-plugin-provider-quota) | 0 | ⚪ unknown | DeepSeek Harness（DSH） 的 Web 插件：在对话输入框底部展示模型 Provider 的订阅额度与限流窗口，点击徽标即可查看详情。 |
| [dsh-codebuddy](https://github.com/Lbryany/dsh-codebuddy) | 0 | ⚪ unknown | dsh-codebuddy — DSH 插件（模型） |
| [DeepSeek-harness-qqbot](https://github.com/sliverp/DeepSeek-harness-qqbot) | 5 | ⚪ unknown | QQ Bot text and image channel plugin for DeepSeek Harness |
| [dsh-advisor](https://github.com/omdsh-dev/dsh-advisor) | 8 | ⚪ unknown | Advisor - Pair a second model that passively reviews each turn and injects notes. 搭配一个会在每轮对话被动注入见解和审查的副模型。 |
| [DeepSeek-harness-wecom](https://github.com/sliverp/DeepSeek-harness-wecom) | 4 | ⚪ unknown | WeCom AI Bot text and image bridge for DeepSeek Harness |
| [dsh-codex-subscription](https://github.com/yequ172672/dsh-codex-subscription) | 7 | ⚪ unknown | DSH 插件:直接复用 Codex CLI 本地登录订阅凭证,在 DeepSeek Harness 中使用 ChatGPT 订阅模型,无需 API Key | DSH plugin: reuse your Codex CLI local subscripti… |
| [dsh-vision](https://github.com/oil-oil/dsh-vision) | 28 | ⚪ unknown | Near-native image understanding for DeepSeek Harness |
| [dsh-approval-ai](https://github.com/ang-XWBWZ/dsh-approval-ai) | 3 | ⚪ unknown | AI approval answerer for DeepSeek Harness (DSH) using the unified LLM route with fail-closed policy checks. |
| [dsh-plugin](https://github.com/PicGo/dsh-plugin) | 4 | ⚪ unknown | Upload images and files to your image host from DeepSeek Harness, powered by PicGo |
| [dsh-ui-appearance](https://github.com/TQSY114514/dsh-ui-appearance) | 3 | ⚪ unknown | Appearance customization plugin for DeepSeek Harness: theme color palette, background image, opacity/blur, glass effect |
| [dsh-vision-bridge](https://github.com/Xieweikang123/dsh-vision-bridge) | 2 | ⚪ unknown | Give a text-only dsh model eyes: pasted images recognized into text via an OpenAI-compatible vision endpoint. |
| [dsh-mimo-agent-tools](https://github.com/ch1bug/dsh-mimo-agent-tools) | 2 | ⚪ unknown | Xiaomi MiMo search + multimodal tools for DeepSeek Harness agents: mimo_search/vision/audio/video/asr/tts |
| [dsh-background](https://github.com/luoyu-xingu/dsh-background) | 3 | ⚪ unknown | DeepSeek Harness Web 背景图片插件:本地图片路径替换网页背景,外观设置行 + 实时预览 |
| [dsh-llm-fallbacks](https://github.com/omdsh-dev/dsh-llm-fallbacks) | 3 | ⚪ unknown | An dsh plugin for role-based LLM retry&fallback strategy. 基于角色的模型重试备用策略插件 |
| [dsh-qrcode](https://github.com/hellosky983/dsh-qrcode) | 3 | ⚪ unknown | 离线二维码生成器：DeepSeek Harness 插件，纯本地、零网络、零 shell，给模型一个 qrcode 工具 |
| [DeepSeek-harness-weixin](https://github.com/sliverp/DeepSeek-harness-weixin) | 2 | ⚪ unknown | Weixin ClawBot channel plugin for DeepSeek Harness with QR login and text/image messaging |
| [dsh-api-usage-bar](https://github.com/hurry060215-tech/dsh-api-usage-bar) | 0 | ⚪ unknown | Cache-aware API token usage bar for the DeepSeek Harness Web UI |
| [dsh-image-reader](https://github.com/zcXie777/dsh-image-reader) | 2 | ⚪ unknown | Give DeepSeek Harness agents native image reading: a read_image tool backed by any OpenAI-compatible vision endpoint. |
| [dsh-media-skills](https://github.com/akqwpeter-prog/dsh-media-skills) | 2 | ⚪ unknown | 给 DeepSeek Harness 装上「眼睛」和「画笔」——免费读图 + 免费生图 Skill。Eyes & brush for DeepSeek Harness: free image reading & generation. 👁️🎨 |
| [dsh-qwen-multimodal](https://github.com/wuwangmao/dsh-qwen-multimodal) | 0 | ⚪ unknown | DSH bundle: Qwen multimodal bridge — vision (qwen3-vl), speech-to-text (qwen3-asr), text-to-image (qwen-image), for DeepSeek Harn… |
| [vision_kit](https://github.com/Seom-ingit/vision_kit) | 0 | ⚪ unknown | Make your AI agent a math tutor. Structured extraction of vectors, matrices & geometry from math figures, with dimension-consiste… |
| [dsh-plugin-file-manager](https://github.com/jasper-zsh/dsh-plugin-file-manager) | 0 | ⚪ unknown | 面向 DeepSeek Harness（DSH） Web 界面的会话文件管理器插件。它在会话标题栏增加“文件”入口，打开后展示该会话工作区的文件树、Git 状态，并支持直接预览文本、图片和视频。 |
| [ds-vision-plugin](https://github.com/Sorwcyra/ds-vision-plugin) | 1 | ⚪ unknown | Paste images into DeepSeek Harness with a four-model vision race, OCR, and an automatic text bridge. |
| [dsh-minigames](https://github.com/omdsh-dev/dsh-minigames) | 3 | ⚪ unknown | DSH Web UI 右侧小游戏面板：18 款离线小游戏（恐龙跳一跳 / 俄罗斯方块 / 坦克大战 / 扫雷 / 2048 / 数独 / 吃豆人 / 跟枪练习等），可扩展游戏注册表，等待模型回复或修 bug 时的摸鱼神器 |
| [dsh-vision](https://github.com/237229953-create/dsh-vision) | 3 | ⚪ unknown | DSH plugin: text-only models (e.g. DeepSeek-V4) automatically see images via a vision model. Official surface-replace, cache-frie… |
| [dsh-vision-provider](https://github.com/libinyam/dsh-vision-provider) | 4 | ⚪ unknown | Config-only DeepSeek Harness bundle for OpenAI-compatible vision models. |
| [dsh-ccswitch-import-lite](https://github.com/chenhaolove89/dsh-ccswitch-import-lite) | 2 | ⚪ unknown | DeepSeek Harness 插件（精简版）：从 CCSWITCH 批量导入模型供应商，不含视觉描述 |
| [dsh-llm-codebuddy](https://github.com/Axiaohungry/dsh-llm-codebuddy) | 7 | ⚪ unknown | 在deepseek harness中使用workbuddy api，因为公司只提供workbuddy积分 |
| [dsh-container](https://github.com/NIyueeE/dsh-container) | 1 | ⚪ unknown | DeepSeek Harness (dsh) container image: universal dev-container base, dsh auto-update on boot, compose + Quadlet examples |
| [dsh-cost-tracker](https://github.com/yflmq001/dsh-cost-tracker) | 2 | ⚪ unknown | Token cost tracking for DeepSeek Harness |
| [dsh-vision-plugin](https://github.com/Xin-Zhang-IceMan/dsh-vision-plugin) | 1 | ⚪ unknown | DeepSeek Harness 视觉插件：让纯文本模型拥有视觉能力 / Vision plugin for DSH: vision_analyze tool + automatic image transcription for text-only mod… |
| [dsh-ccswitch-import](https://github.com/chenhaolove89/dsh-ccswitch-import) | 0 | ⚪ unknown | DeepSeek Harness 插件：从 CCSWITCH 批量导入模型供应商 + visual_describe 视觉描述工具 |
| [dsh-vision-tools](https://github.com/moon09300731/dsh-vision-tools) | 0 | ⚪ unknown | DeepSeek Harness 视觉能力全家桶：vision_understand 工具 + 粘贴/拖拽/按钮三入口识图 |
| [dsh-vision-android](https://github.com/superclaude1/dsh-vision-android) | 1 | ⚪ unknown | DeepSeek Harness plugin: multimodal vision (OpenAI-compatible) + Android adb UI automation for real-tap mobile app testing |
| [dsh-dardar](https://github.com/benzhoupo/dsh-dardar) | 2 | ⚪ unknown | DSH 插件：在模型选择框左侧显示当前 DeepSeek V4 Pro / V4 Flash 的 codexradar IQ，每 5 分钟刷新（CC BY 4.0） |
| [dsh-computer-use](https://github.com/xiaoheizi1212/dsh-computer-use) | 1 | ⚪ unknown | Model-agnostic Computer Use for DeepSeek Harness: isolated browser, Windows native helper, third-party vision perception, and a C… |
| [deepseek-eyes](https://github.com/fryghost/deepseek-eyes) | 1 | ⚪ unknown | Community plugin for DeepSeek Harness: give text-only models eyes - paste images natively, described via an OpenAI-compatible vis… |
| [dsh-gui-customization](https://github.com/LAN-TINA-WS/dsh-gui-customization) | 9 | ⚪ unknown | Nous Blue theme, ambient glow and background image customization for DeepSeek Harness Web UI. DSH 界面设定插件：Nous 蓝配色 / 氛围光 / 背景图（中英双… |
| [dsh-approval-llm](https://github.com/Letter2025/dsh-approval-llm) | 3 | ⚪ unknown | Model-based permission approval (approve-for-me) for DeepSeek Harness: an approval/request answerer backed by a separate reviewer… |
| [dsh-task-models](https://github.com/TTTPOB/dsh-task-models) | 1 | ⚪ unknown | DeepSeek Harness plugin with per-task model and reasoning-effort selection |
| [dsh-opencode-go-usage](https://github.com/Xenia0922/dsh-opencode-go-usage) | 5 | ⚪ unknown | DeepSeek Harness 插件:OpenCode Go 用量与花费悬浮仪表盘(配额、逐请求成本、模型/来源分布) |
| [dsh-calculator](https://github.com/bobcat848/dsh-calculator) | 4 | ⚪ unknown | Calculate the real-time cost of DeepSeek API calls made by DeepSeek Harness. |
| [dsh-green-meter](https://github.com/dclichang2022/dsh-green-meter) | 4 | ⚪ unknown | Energy & carbon metering for DeepSeek Harness: per-turn/per-request energy, cache carbon savings, electricity cost. |
| [DeepSeek-harness-dingtalk](https://github.com/sliverp/DeepSeek-harness-dingtalk) | 2 | ⚪ unknown | DingTalk Stream text and image channel plugin for DeepSeek Harness |
| [dsh-plugin-describe-image](https://github.com/whitelonng/dsh-plugin-describe-image) | 4 | ⚪ unknown | DeepSeek Harness plugin: describe_image — give a text-only model vision through an OpenAI-compatible VLM endpoint |
| [dsh-see-image](https://github.com/tiefeiyu/dsh-see-image) | 2 | ⚪ unknown | A see_image vision tool plugin for DeepSeek Harness — describe images through any OpenAI-compatible vision model (GitHub Copilot,… |
| [dsh-plugin-tokenmeter](https://github.com/pythonshiyi/dsh-plugin-tokenmeter) | 1 | ⚪ unknown | 词元消耗显示插件（DeepSeek Harness 网页端）：每条回复的实时词元用量 | Per-message token usage chips for DeepSeek Harness web UI |
| [dsh-llm-kiro](https://github.com/caopu16/dsh-llm-kiro) | 1 | ⚪ unknown | deepseek-harness 的插件，可以使用kiro的模型（claude系列）和账号 |
| [dsh-image-theme](https://github.com/Carpon39038/dsh-image-theme) | 2 | ⚪ unknown | Warp-inspired image-to-theme plugin for DeepSeek Harness: upload a background, extract a palette, and apply a glass UI. |
| [deepseek-hsrness-devkit](https://github.com/2472786266-spec/deepseek-hsrness-devkit) | 2 | ⚪ unknown | DSH DevKit: multimodal gallery + multi-agent supervision console (DeepSeek Harness dynamic Cordis plugin) |
| [dsh-skin](https://github.com/Yugitan/dsh-skin) | 1 | ⚪ unknown | Customizable skinning plugin for DeepSeek Harness Web UI — gradient presets, image wallpapers, translucency, accent colors, persi… |
| [slcatwujian-dsh-vision-plugin](https://github.com/yan5236/slcatwujian-dsh-vision-plugin) | 1 | ⚪ unknown | 让不支持图片输入的主模型通过已配置的视觉模型理解图片的 DSH 插件：自动桥接、像素坐标描述、vision_ask 追问工具与设置页 |
| [ds-image-skin](https://github.com/ahren112/ds-image-skin) | 2 | ⚪ unknown | Image skin plugin for DeepSeek Harness web UI |
| [dsh-llm-fallback](https://github.com/Visol-456/dsh-llm-fallback) | 5 | ⚪ unknown | DeepSeek Harness 回退链插件：主模型失败自动切换备用 provider，带 Web UI 配置面板 | Provider fallback chains for DeepSeek Harness |
| [dsh-multimodal-skill](https://github.com/v587d/dsh-multimodal-skill) | 1 | ⚪ unknown | 给纯文本 LLM 一双慧眼。 一个 DeepSeek Harness（DSH）原生 skill + 零依赖 Python CLI， 为 DeepSeek 等纯文本模型补上图像理解与文档解析（OCR、表格、公式、PDF → Markdown）， 使用免费额度优… |
| [dsh-plugin-github-market](https://github.com/w1661884010-jpg/dsh-plugin-github-market) | 2 | ⚪ unknown | DSH web client plugin: browse GitHub dsh-plugin topic repositories (fuzzy search, sort, favorites, install-command copy, optional… |
| [dsh-xiapan-media](https://github.com/dongsheng123132/dsh-xiapan-media) | 3 | ⚪ unknown | Native vision, gpt-image-2 and Seedance plugins for DeepSeek Harness via Xiapan Cloud |
| [TokenLedger](https://github.com/zh667/TokenLedger) | 3 | ⚪ unknown | Token usage accounting for DeepSeek Harness, reconciled against New API and Sub2API relay-site billing |
| [dsh-conversation-cost](https://github.com/Ayaka157/dsh-conversation-cost) | 2 | ⚪ unknown | 在 DSH 对话底部统计行实时显示 DeepSeek 用量费用（人民币/美元双币，含缓存命中与峰谷定价） |
| [glm4v-vision-mcp](https://github.com/ethanweave/glm4v-vision-mcp) | 2 | ⚪ unknown | GLM-4.6V 图像理解 MCP：识图/OCR/图表解析，原生接入 DeepSeek Harness（dsh-mcp-client），也兼容 Codex/Cline 等 |
| [dsh-vision](https://github.com/linenxi-ctrl/dsh-vision) | 10 | ⚪ unknown | 为 DeepSeek Harness 增加外挂识图模型：圆形鲸鱼按钮、发送图片识图自动回传、模型自主截图+识图工具、多协议自动适配、小白一键安装（未装 Node.js 自动下载） |
| [dsh-vqa-agent](https://github.com/jypjypjypjyp/dsh-vqa-agent) | 2 | ⚪ unknown | DSH 插件:vqa_ask 双模型视觉问答 —— 主模型提问 → 视觉模型看图回答,UI 实时展示 QA 过程,支持多模态视觉模型选择 |
| [dsh-commandcode-provider](https://github.com/Mars-Sea/dsh-commandcode-provider) | 6 | ⚪ unknown | Unofficial DeepSeek Harness LLM provider plugin for Command Code: live model catalog, reasoning-effort support, Models-page card.… |
| [dsh-plugin-subscriptions](https://github.com/V1ki/dsh-plugin-subscriptions) | 3 | ⚪ unknown | Use ChatGPT (Codex), Claude, and Grok (X Premium) subscriptions as DeepSeek Harness LLM providers — OAuth login in the web UI, no… |
| [dsh-gauge](https://github.com/noone89A/dsh-gauge) | 3 | ⚪ unknown | 为 DeepSeek Harness Web UI 提供精确缓存命中率、token 用量与费用估算 |
| [dsh-vision](https://github.com/Terry12138qy/dsh-vision) | 3 | ⚪ unknown | DeepSeek Harness 识图插件：为不具备原生识图能力的模型提供识图能力（阿里云百炼 qwen3.5-omni-plus，失败自动切换智谱 glm-4.6v-flash）。由 claude-vision-skill 移植适配。 | Vision t… |
| [dsh-usage-stats](https://github.com/Make0209/dsh-usage-stats) | 8 | ⚪ unknown | DeepSeek Harness 插件：GitHub 风格用量热力图 + Token / 缓存命中 / 账户余额看板 + 工作区别名管理。 |
| [dsh-project-file-explorer](https://github.com/BillionSeniors/dsh-project-file-explorer) | 2 | ⚪ unknown | DeepSeek Harness 项目文件浏览器插件：右侧停靠文件树 + 一键预览（代码/文本/图片/音视频/PDF），新增工作区自动停靠，窄屏响应式抽屉 |
| [dsh-vision-bridge](https://github.com/ximengxiaolan/dsh-vision-bridge) | 3 | ⚪ unknown | Composer-attached images are auto-described by an OpenAI-compatible vision model and handed to text-only models (DeepSeek) as tex… |
| [dsh-vision-primitives](https://github.com/zouyuanqing/dsh-vision-primitives) | 3 | ⚪ unknown | Native interactive visual-reasoning plugin for DeepSeek Harness: precise pixel grounding (SOM grid / zoom / annotate / measure /… |
| [deepseek-protocol-doctor](https://github.com/Whning0513/deepseek-protocol-doctor) | 2 | ⚪ unknown | Checks DeepSeek tool loops, reasoning_content, strict schemas, and captured SSE. Also works as a DSH plugin. |
| [dsh-image-tools](https://github.com/xiaoxianyu-office/dsh-image-tools) | 3 | ⚪ unknown | DSH bundle plugin: chat-image bridge + read_image deny + conversational image_recognize for text-only main models | 纯文本主模型识图桥接与识图… |
| [dsh-token-usage](https://github.com/LeemanCheung/dsh-token-usage) | 5 | ⚪ unknown | Persistent token usage records and dashboard for DeepSeek Harness |
| [dsh-token-usage-calendar](https://github.com/Fiennes4590/dsh-token-usage-calendar) | 2 | ⚪ unknown | DeepSeek Harness（DSH）动态 Cordis Token 用量日历插件：真实日志聚合、日/周/月视图与深色模式 |
| [dsh-conv-export](https://github.com/beijingwahw/dsh-conv-export) | 2 | ⚪ unknown | dsh-conv-export（对话导出）— export the current DeepSeek Harness conversation as Markdown, PDF, or a long PNG image |
| [dsh-deepseek-vision-router](https://github.com/mochgolf/dsh-deepseek-vision-router) | 2 | ⚪ unknown | Transparent image preprocessing route for DeepSeek Harness |
| [dsh-sight](https://github.com/Fu3rte/dsh-sight) | 2 | ⚪ unknown | Plug-in vision for text-only DeepSeek Harness (dsh) models: built-in free/cheap VLM presets + multi-image batch analysis |
| [dsh-plugin-image-wallpaper](https://github.com/CaoNing3212/dsh-plugin-image-wallpaper) | 2 | ⚪ unknown | 自定义Deepseek Harness webUI主题 |
| [dsh-token-cost](https://github.com/le-soleil-se-couche/dsh-token-cost) | 5 | ⚪ unknown | 在对话页面直接查看消耗费用（嵌入官方底部状态条，点击看明细）；在设置中查看 Harness 消耗的总费用、缓存命中和输入输出 |
| [dsh-image-bridge](https://github.com/kbpoyo/dsh-image-bridge) | 3 | ⚪ unknown | DSH 插件：让纯文本模型也能看图。Web 端直接粘贴图片即可发送，无需指定图片路径；模型自主调用视觉技能查看，多模态模型原生直通，零skill绑定。 |
| [dsh-math-team](https://github.com/OrinVoss/dsh-math-team) | 2 | ⚪ unknown | DSH Math Modeling Team Plugin Pack: 2 role agent presets (modeling-coding / paper) for DeepSeek Harness, multi-folder Git collabo… |
| [dsh-mineru-parse-plugin](https://github.com/83079Vermont/dsh-mineru-parse-plugin) | 2 | ⚪ unknown | A self-contained DeepSeek Harness (DSH) plugin that registers a global model tool parse_docs: parse local PDF / DOCX / PPTX / XLS… |
| [dsh-zotero-wiki](https://github.com/Wechsels/dsh-zotero-wiki) | 3 | ⚪ unknown | DeepSeekHarness × Zotero 插件：自动同步文献库，MinerU 解析 PDF，DeepSeek 全文阅读生成结构化笔记，编译成可检索的 Obsidian LLM Wiki。 |
| [dsh-opencode-go-quota](https://github.com/GLFzr/dsh-opencode-go-quota) | 4 | ⚪ unknown | DSH 插件：OpenCode Go 额度圆环 —— 输入框模型选择器左侧的进度圆环，点击切换 5小时/每周/每月用量（OpenCode Go quota ring for DeepSeek Harness Web） |
| [dsh-sfversion](https://github.com/sparkmio/dsh-sfversion) | 3 | ⚪ unknown | SF视觉桥——给纯文本模型的 DeepSeek Harness 装上眼睛。 |
| [deepseek-harness-zh-cn](https://github.com/imlishiyuan/deepseek-harness-zh-cn) | 3 | ⚪ unknown | A Chinese-first plugin that makes [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) reason (`reasoning`) and an… |
| [dsh-file-panel](https://github.com/yu2025-luo/dsh-file-panel) | 3 | ⚪ unknown | Right-side file panel for DeepSeek Harness — auto-popup when the agent creates or downloads files, with image/text preview, revea… |
| [thinking-level-override](https://github.com/my-dsh-plugin/thinking-level-override) | 3 | ⚪ unknown | 自主覆盖与调整第三方模型的思考等级，修复工具内置预设缺失或不匹配的问题。 |
| [dsh-deepseek-vision](https://github.com/Argonaut790/dsh-deepseek-vision) | 3 | ⚪ unknown | Image understanding, OCR, and persistent visual evidence for text-only DeepSeek Harness models |
| [dsh-tool-ocr](https://github.com/ferstar/dsh-tool-ocr) | 3 | ⚪ unknown | 本地 OCR 插件：让纯文本生成 LLM 也能读懂图片 | Local OCR plugin: give text-only generative LLMs the ability to read images |
| [deepseek-heartflow](https://github.com/yun520-1/deepseek-heartflow) | 4 | ⚪ unknown | HeartFlow (心虫) as a DSH plugin — AGI 第1层辨别门禁: heartflow_check tool + automatic output supervision |
| [dsh-webproxy-router-plugin](https://github.com/jinsiyu/dsh-webproxy-router-plugin) | 2 | ⚪ unknown | 一个deepseek harness webfetch的代理插件，让llm也能科学上网 |
| [dsh-image-inline](https://github.com/condaThinker/dsh-image-inline) | 2 | ⚪ unknown | DSH plugin: show_image tool that renders an image inline into the web chat flow (QQ/WeChat style) — path text in the message, ima… |
| [dsh-motion](https://github.com/bilbillm/dsh-motion) | 2 | ⚪ unknown | Restrained, semantic interface motion for DeepSeek Harness |
| [DSH-update-check](https://github.com/knlght/DSH-update-check) | 2 | ⚪ unknown | 让 DeepSeek Harness 拥有版本可见性：dsh_check_updates 模型工具 + Settings 更新检查页 + 周期复查，只报告不升级 |
| [dsh-token-activity](https://github.com/SnowNightt/dsh-token-activity) | 2 | ⚪ unknown | 用于展示最近365天的每日Token使用热力图，悬停任意日期查看当天使用过的全部模型及其Token用量。 |
| [dsh-vision-bridge](https://github.com/lium970320/dsh-vision-bridge) | 2 | ⚪ unknown | DSH 视觉桥接插件：让无视觉能力的主模型看图（会话收图 + 自动转文字 + view_image 工具） |
| [dsh-think-chinese](https://github.com/lingtima/dsh-think-chinese) | 2 | ⚪ unknown | DSH 插件：让模型始终用中文进行内部推理与思考（think in Chinese）。 |
| [dsh-reasoning-effort](https://github.com/HanaAyane/dsh-reasoning-effort) | 7 | ⚪ unknown | DSH适用的Codex风格的思考强度滑块，以及大肥鱼跑步滑块。Codex-style model and reasoning-effort slider for DeepSeek Harness |
| [dsh-vision-complete](https://github.com/Yts1919/dsh-vision-complete) | 8 | ⚪ unknown | 给 DeepSeek 补上「眼睛和耳朵」的多模态视觉插件：看图 / OCR / 物体检测 / 视频理解 / 语音转写 / 截图直读，一键安装（DSH 插件）。 |

### 🛡️ 沙箱

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-plugin-miliastra-toolbox](https://github.com/1475505/dsh-plugin-miliastra-toolbox) | 2 | ⚪ unknown | 将千星沙箱（原神千星奇域）知识库接入 Deepseek Harness 的插件 |
| [dsh-same-mode-sandbox-noop](https://github.com/zhangzujian/dsh-same-mode-sandbox-noop) | 2 | ⚪ unknown | dsh-same-mode-sandbox-noop — DSH 插件（沙箱） |
| [dsh-shell-termux](https://github.com/kelai141/dsh-shell-termux) | 0 | ⚪ unknown | dsh 的安卓/Termux bash 能力提供者——显式 Termux 环境注入、探测诊断、诚实的应用域沙箱声明。 |
| [dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) | 2 | ⚪ unknown | 在 Windows 环境中为 DeepSeek Harness 提供 Git Bash 与 WSL2 bash 工具,含 bwrap 沙箱、审批模式、后台任务 |
| [dsh-tensorlake-sandbox](https://github.com/tensorlakeai/dsh-tensorlake-sandbox) | 5 | ⚪ unknown | A deepseek harness plugin for tensorlake sandbox |
| [dsh-auto-approve](https://github.com/Jiao-XXX/dsh-auto-approve) | 3 | ⚪ unknown | Conservative auto-approval preset for DeepSeek Harness sandbox escalations |
| [dsh-self-checking-profile](https://github.com/SLAPaper/dsh-self-checking-profile) | 1 | ⚪ unknown | A drop-in dsh web profile that adds the **Self Checking** sandbox mode to DeepSeek Harness (dsh) |
| [dsh-yolo-mode](https://github.com/SeverusZh/dsh-yolo-mode) | 3 | ⚪ unknown | dsh-yolo-mode - an LLM-powered auto-approval plugin for DeepSeek Harness sandbox escalations (built-in presets + custom permissio… |

### 🎛️ 编排

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [openhanako](https://github.com/liliMozi/openhanako) | 6051 | ⚪ unknown | 带记忆、人格与自主性的个人 AI 智能体 |
| [exo](https://github.com/exoharness/exo) | 647 | ⚪ unknown | 可递归自编辑自身的 agent+harness 架构 |
| [synergy](https://github.com/SII-Holos/synergy) | 542 | ⚪ unknown | 面向 Open Agentic Web 的通用智能体 |
| [ccteam](https://github.com/firstintent/ccteam) | 157 | ⚪ unknown | 把 Claude Code/Codex/Grok/Kimi 编成团队，Telegram/飞书指挥 |
| [MateBot](https://github.com/aresbit/MateBot) | 46 | ⚪ unknown | claudeclaw 复刻 |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 43 | ⚪ unknown | Skill 驱动的 Harness/Loop 工程工作流插件 |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 55 | ⚪ unknown | 把 Claude Code 的 UltraCode 模式带给 DSH，多 Agent 调度可治理 |
| [agents-go](https://github.com/zzir/agents-go) | 13 | ⚪ unknown | Go 语言多 agent 框架 |
| [distill](https://github.com/LoserFox/distill) | 16 | ⚪ unknown | 自动对话蒸馏：后台 subagent 反省 + 技能更新 |
| [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 268 | ⚪ unknown | AgentTeams 插件 |
| [dsh-automation](https://github.com/titanwings/dsh-automation) | 32 | ⚪ unknown | 让任务按计划在全新 Session 中运行定时任务 |
| [dsh-loop](https://github.com/vlln/dsh-loop) | 3 | ⚪ unknown | 定时循环（/loop 命令 + loop 工具） |
| [dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | 4 | ⚪ unknown | 计划批注：选中计划原文逐条批注 |
| [dsh-task-status](https://github.com/vlln/dsh-task-status) | 8 | ⚪ unknown | 后台任务状态条（进度 + 实时 tail） |
| [dsh-work](https://github.com/vibeinging/dsh-work) | 30 | ⚪ unknown | 本地优先 DSH 插件工作台 |
| [dsh-advisor](https://github.com/btspoony/dsh-advisor) | 8 | ⚪ unknown | 第二模型被动审查每轮并注入建议 |
| [dsh-artifact](https://github.com/william-jin-cmu/dsh-artifact) | 1 | ⚪ unknown | 文件交付协议：send_artifact 工具 |
| [dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) | 11 | ⚪ unknown | 自适应深度研究编排插件 |
| [dsh-explain](https://github.com/yuezengwu/dsh-explain) | 10 | ⚪ unknown | 本地优先学习模式：跨会话全局学习线程 |
| [dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) | 3 | ⚪ unknown | 基于角色的模型重试备用策略 |
| [dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | 6 | ⚪ unknown | 条件驱动唤醒：持久文件/命令/http 触发 |
| [dsh-track](https://github.com/fakechris/dsh-track) | 6 | ⚪ unknown | 嵌入式任务管理引擎：决策点协议、Linear 形 issue |
| [eragear-code-copilot](https://github.com/TongDucThanhNam/eragear-code-copilot) | 0 | ⚪ unknown | 空壳仓库（无描述） |
| [dsh-plugin-product-subagents](https://github.com/shaokeyibb/dsh-plugin-product-subagents) | 8 | ⚪ unknown | 角色化 Codex/Claude Code/ACP 子代理预设。 |
| [dsh-milestone](https://github.com/SnowCrescenter-tech/dsh-milestone) | 12 | ⚪ unknown | Git 风格里程碑时间线插件。 |
| [shopline-ai-toolkit-dsh](https://github.com/lunw/shopline-ai-toolkit-dsh) | 2 | ⚪ unknown | shopline-ai-toolkit-dsh — DSH 插件（编排） |
| [dsh-playwright-cli](https://github.com/mitao-su/dsh-playwright-cli) | 2 | ⚪ unknown | dsh-playwright-cli — DSH 插件（编排） |
| [dsh-review-loop](https://github.com/wuxiangru915/dsh-review-loop) | 2 | ⚪ unknown | dsh-review-loop — DSH 插件（编排） |
| [securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) | 3 | ⚪ unknown | securstack-dsh-plugin — DSH 插件（编排） |
| [dsh-multi-cot](https://github.com/AprilWizard/dsh-multi-cot) | 2 | ⚪ unknown | dsh-multi-cot — DSH 插件（编排） |
| [dsh-git-plugin](https://github.com/MashedPotato817/dsh-git-plugin) | 2 | ⚪ unknown | dsh-git-plugin — DSH 插件（编排） |
| [dsh-enhance](https://github.com/vcxmug/dsh-enhance) | 2 | ⚪ unknown | dsh-enhance — DSH 插件（编排） |
| [deepseek-harness-plugin-mcp](https://github.com/bobleer/deepseek-harness-plugin-mcp) | 2 | ⚪ unknown | deepseek-harness-plugin-mcp — DSH 插件（编排） |
| [dsh-sound-effects-plugin](https://github.com/JasonJin2006/dsh-sound-effects-plugin) | 2 | ⚪ unknown | dsh-sound-effects-plugin — DSH 插件（编排） |
| [deepseek-harness-fnos](https://github.com/techysy/deepseek-harness-fnos) | 6 | ⚪ unknown | DeepSeek Harness (DeepSeek 官方 agent 浏览器 UI) fnOS 应用 — 本地常驻服务, 官方统一网关接入 |
| [dsh-agent-arcade](https://github.com/fff122/dsh-agent-arcade) | 1 | ⚪ unknown | dsh-agent-arcade — DSH 插件（编排） |
| [dsh-skillport](https://github.com/Jesse-njx/dsh-skillport) | 2 | ⚪ unknown | dsh-skillport — DSH 插件（编排） |
| [dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) | 3 | ⚪ unknown | dsh-book2skill — DSH 插件（编排） |
| [dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) | 3 | ⚪ unknown | dsh-prime-agent — DSH 插件（编排） |
| [dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) | 7 | ⚪ unknown | DeepSeek Harness（DSH）插件：自动记录所有执行模式（原生工具 / PTC run_code / 代码内嵌工具调用）的工具失败错因，去重、计数、确定性排序后沉淀进 skill 的机器维护实录区段——让 Agent 越用越少错。 |
| [dsh-routines](https://github.com/Jesse-njx/dsh-routines) | 1 | ⚪ unknown | dsh-routines — DSH 插件（编排） |
| [falsify-dsh](https://github.com/shi275773124/falsify-dsh) | 1 | ⚪ unknown | falsify-dsh — DSH 插件（编排） |
| [dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) | 2 | ⚪ unknown | dsh-audio-dub — DSH 插件（编排） |
| [dsh-governance](https://github.com/tappass/dsh-governance) | 1 | ⚪ unknown | dsh-governance — DSH 插件（编排） |
| [dsh-clawrouter](https://github.com/BlockRunAI/dsh-clawrouter) | 9 | ⚪ unknown | dsh-clawrouter — DSH 插件（编排） |
| [DSH-Chrome-devtools](https://github.com/yuzi-ska/DSH-Chrome-devtools) | 1 | ⚪ unknown | DSH-Chrome-devtools — DSH 插件（编排） |
| [dsh-self-control-guard](https://github.com/pandashere/dsh-self-control-guard) | 2 | ⚪ unknown | dsh-self-control-guard — DSH 插件（编排） |
| [dsh-harness-mcp-server](https://github.com/chushixixin/dsh-harness-mcp-server) | 3 | ⚪ unknown | dsh-harness-mcp-server — DSH 插件（编排） |
| [dsh-plugin-verify](https://github.com/qing3a/dsh-plugin-verify) | 1 | ⚪ unknown | 验证 DSH 插件的 CLI：一条命令跑 mock-llm 完整 agent 循环，检查 waterfall 链与零副作用，产出验证报告 |
| [dsh-schedule](https://github.com/csiroqa/dsh-schedule) | 2 | ⚪ unknown | dsh-schedule — DSH 插件（编排） |
| [Pwiki](https://github.com/ang-XWBWZ/Pwiki) | 2 | ⚪ unknown | Pwiki — DSH 插件（编排） |
| [governed-workflow-for-dsh](https://github.com/zcx369658780/governed-workflow-for-dsh) | 2 | ⚪ unknown | governed-workflow-for-dsh — DSH 插件（编排） |
| [dsh-agent-eval](https://github.com/ShawnSiao/dsh-agent-eval) | 1 | ⚪ unknown | dsh-agent-eval — DSH 插件（编排） |
| [dsh-plugin-agent-dashboard](https://github.com/YYTbit/dsh-plugin-agent-dashboard) | 1 | ⚪ unknown | dsh-plugin-agent-dashboard — DSH 插件（编排） |
| [amber-protocol](https://github.com/Bandersnatch0x/amber-protocol) | 1 | ⚪ unknown | amber-protocol — DSH 插件（编排） |
| [dsh-eval-harness](https://github.com/BiBoyang/dsh-eval-harness) | 4 | ⚪ unknown | dsh-eval-harness — DSH 插件（编排） |
| [sai](https://github.com/Very12345/sai) | 1 | ⚪ unknown | sai — DSH 插件（编排） |
| [vpshub](https://github.com/Sdongmaker/vpshub) | 1 | ⚪ unknown | vpshub — DSH 插件（编排） |
| [deepseek-harness-flow](https://github.com/alison-xx/deepseek-harness-flow) | 1 | ⚪ unknown | deepseek-harness-flow — DSH 插件（编排） |
| [dsh-voice](https://github.com/Jesse-njx/dsh-voice) | 0 | ⚪ unknown | dsh-voice — DSH 插件（编排） |
| [dsh-product-delivery-workflow](https://github.com/wellorbetter/dsh-product-delivery-workflow) | 2 | ⚪ unknown | dsh-product-delivery-workflow — DSH 插件（编排） |
| [dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) | 2 | ⚪ unknown | DeepSeek Harness Plugin Dev Skill — 让任何 Agent 都能正确、高效、符合规范地开发 DSH 插件（含精简提炼参考文档与论文解读） |
| [vscode-deepseek-harness](https://github.com/kalynnka/vscode-deepseek-harness) | 2 | ⚪ unknown | vscode-deepseek-harness — DSH 插件（编排） |
| [dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) | 2 | ⚪ unknown | dsh-gitflow — DSH 插件（编排） |
| [dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) | 0 | ⚪ unknown | dsh-plugin-verified-search — DSH 插件（编排） |
| [dsh-landscape](https://github.com/cyanseek/dsh-landscape) | 1 | ⚪ unknown | dsh-landscape — DSH 插件（编排） |
| [dsh-wecom](https://github.com/TtTRz/dsh-wecom) | 3 | ⚪ unknown | dsh-wecom — DSH 插件（编排） |
| [dsh-push](https://github.com/kiim-wong/dsh-push) | 0 | ⚪ unknown | dsh-push — DSH 插件（编排） |
| [sai-dsh-plugins](https://github.com/Very12345/sai-dsh-plugins) | 0 | ⚪ unknown | sai-dsh-plugins — DSH 插件（编排） |
| [dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) | 1 | ⚪ unknown | dsh-shift-router — DSH 插件（编排） |
| [dash](https://github.com/songqikong/dash) | 1 | ⚪ unknown | dash — DSH 插件（编排） |
| [delivery-review-dsh-plugin](https://github.com/xiaoxiao-svg/delivery-review-dsh-plugin) | 0 | ⚪ unknown | delivery-review-plugin（Claude Code 双 Agent 交付协作工作流插件）的 DeepSeek Harness 移植版。基于 DSH 的 Cordis 插件系统，以 bundle 方式分发，不改动 DSH 源码，全部能力由插件… |
| [dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) | 2 | ⚪ unknown | dsh-gatedflow — DSH 插件（编排） |
| [dsh-browser-bridge](https://github.com/egnmosk/dsh-browser-bridge) | 0 | ⚪ unknown | dsh-browser-bridge — DSH 插件（编排） |
| [DeepJIT](https://github.com/fly3366/DeepJIT) | 2 | ⚪ unknown | DeepJIT — DSH 插件（编排） |
| [dsh-orchestrator](https://github.com/zibo2025/dsh-orchestrator) | 5 | ⚪ unknown | 【编排模式】为 DeepSeek Harness 提供多智能体编排模式：主智能体分解分派、worker 全网格互通，支持逐 worker 指定模型与思考强度 |
| [deepseek-harness-skillx](https://github.com/drowned-fish1/deepseek-harness-skillx) | 2 | ⚪ unknown | DeepSeek Harness plugin for safely discovering, auditing, and adopting external Agent Skills — prompt-injection and AgentBaiting… |
| [dsh-a2a](https://github.com/dpskh/dsh-a2a) | 4 | ⚪ unknown | Agent2Agent mesh for the Harness |
| [oh_my_deepseek_harness](https://github.com/bernardleex526/oh_my_deepseek_harness) | 3 | ⚪ unknown | DeepSeek Harness 多智能体编排模式 — 灵感来自 oh-my-opencode-slim |
| [dsh-tool-hackernews](https://github.com/tanf1ng/dsh-tool-hackernews) | 1 | ⚪ unknown | Hacker News tool suite (hn_top_stories, hn_search, hn_item) for DeepSeek Harness agents |
| [dsh-acp-plugin](https://github.com/agentic-control-plane/dsh-acp-plugin) | 3 | ⚪ unknown | Agentic Control Plane for DeepSeek Harness — policy-check every tool call before it runs |
| [dsh-subagent-tools](https://github.com/lynx-gt/dsh-subagent-tools) | 2 | ⚪ unknown | DeepSeek Harness subagent delegation enhancement |
| [dsh-delegate](https://github.com/FEOH333/dsh-delegate) | 2 | ⚪ unknown | dsh-delegate: model-aware subagent delegation for DeepSeek Harness — per-call models, depends_on dependency gating, per-child per… |
| [dsh-dashboard](https://github.com/Uddoo/dsh-dashboard) | 3 | ⚪ unknown | Symphony-compatible Linear issue orchestrator and native operations dashboard for DeepSeek Harness. |
| [dsh-preset-minimal-windows](https://github.com/zeroa234/dsh-preset-minimal-windows) | 3 | ⚪ unknown | Minimal Windows agent preset + Git Bash tool for DeepSeek Harness: gitbash & pwsh & str_replace_editor, drop-in replacement for t… |
| [dsh-minecraft-dev](https://github.com/Leawind/dsh-minecraft-dev) | 2 | ⚪ unknown | 一个面向 Minecraft 模组开发的 DeepSeek Harness Agent 预设 |
| [deepagent](https://github.com/justinhuangai/deepagent) | 2 | ⚪ unknown | The agent that gets your work done. Built on DeepSeek Harness: Everything is a Plugin. |
| [dsh-subagent-cwd](https://github.com/lynx-gt/dsh-subagent-cwd) | 3 | ⚪ unknown | DeepSeek Harness subagent delegation enhancement |
| [dsh-self-evolution](https://github.com/Lhy723/dsh-self-evolution) | 2 | ⚪ unknown | Benchmark-driven self-evolution for DeepSeek Harness · 冻结基准上的 Agent Profile 自我进化：评测 → 候选 → 严格接受/回滚 |
| [dsh-test-workbench](https://github.com/dmsobtl/dsh-test-workbench) | 2 | ⚪ unknown | 基于 DeepSeek Harness 的测试工作台 Profile —— 开箱即用的 QA Agent。 |
| [WorkbuddySkillGroups4DSH](https://github.com/darker2016/WorkbuddySkillGroups4DSH) | 0 | ⚪ unknown | WorkBuddy 专家团 Skill 开源包 → DeepSeek Harness (dsh) 插件式 skillgroups 包：44 个多角色专家团队 SKILL.md bundle，支持 ~/.dsh/skills 安装与 Cordis 插件注册。W… |
| [dsh-advisor](https://github.com/slhssb/dsh-advisor) | 0 | ⚪ unknown | Independent-model advisory review for DeepSeek Harness: after each tool step, a reviewer model audits the agent's operations and… |
| [dsh-wsl-bridge](https://github.com/ch1bug/dsh-wsl-bridge) | 0 | ⚪ unknown | Windows access tools for WSL agents: win_ls/win_read/win_write/win_run/win_open/win_path/win_drives as a DeepSeek Harness bundle |
| [dsh-phone](https://github.com/railgun0325/dsh-phone) | 7 | ⚪ unknown | 让 DeepSeek Harness 的 agent 跑在手机里，通过 Magisk root 原生操作安卓系统（截图/点击/滑动/开应用）+ 移动端布局 + WebView APK |
| [dsh-godot-tool](https://github.com/Fromlan/dsh-godot-tool) | 0 | ⚪ unknown | Drive the Godot 4.x editor from an AI agent: Godot agent_rpc addon + DeepSeek Harness dsh-tool-godot plugin (loopback TCP JSON-li… |
| [dsh-plugin-dated-folders](https://github.com/Aeanfx/dsh-plugin-dated-folders) | 0 | ⚪ unknown | 本插件由 DeepSeek Harness AI 完全制作，人工仅辅助操作（账号/上传/2FA 发布）。Tidy by date — every file your agent generates is archived into a YYYY-MM-DD_… |
| [dsh-kun-like-pet](https://github.com/liyupi/dsh-kun-like-pet) | 20 | ⚪ unknown | Kun Like 桌宠 —— DeepSeek Harness 桌面宠物插件：右下角小坤宠随 Agent 工作状态切换 9 种动作，任务完成播放「你干嘛~哎哟」 |
| [dsh-file-review](https://github.com/left0ver/dsh-file-review) | 9 | ⚪ unknown | a dsh plugin - review files that an agent just changed,you can see the diff |
| [embedded-workbench](https://github.com/AmethystLuna/embedded-workbench) | 0 | ⚪ unknown | Embedded C/C++ AI engineering plugin — firmware skills (FreeRTOS, Keil, HardFault, state machines) + 1% Rule / Plan Verification… |
| [dsh-workflow-worktree](https://github.com/lisycotana/dsh-workflow-worktree) | 0 | ⚪ unknown | Git worktree isolation backend for DeepSeek Harness workflows: implements the registerIsolationAdapter() seam so isolation: 'work… |
| [dsh-plugin-finder](https://github.com/meme-dog/dsh-plugin-finder) | 2 | ⚪ unknown | Find and audit DeepSeek Harness (DSH) plugins inside the agent — live `dsh-plugin` topic search + source audit with trial-to-prod… |
| [Code2Skill](https://github.com/leechen298/Code2Skill) | 2 | ⚪ unknown | Generate Function, MCP, Agent Skill, and offline test packages from existing code; installable as a DeepSeek Harness bundle. |
| [Vibe-Skills](https://github.com/foryourhealth111-pixel/Vibe-Skills) | 2780 | ⚪ unknown | VibeSkills is a general-purpose Skill that automatically routes local Skills and intelligently orchestrates harness workflows. |
| [kph](https://github.com/ylouis8/kph) | 1 | ⚪ unknown | 基于dsh的量化研究agent，驱动真实回测与交易。 |
| [dsh-skill-lord-serf](https://github.com/ttxl314/dsh-skill-lord-serf) | 0 | ⚪ unknown | DeepSeek Harness 插件：Lord/Serf 协议 0.5 技能，让 DSH 实现文件式多智能体编排（Lord 派活，Serf 干活）。 DeepSeek Harness plugin: Lord/Serf protocol 0.5 skill… |
| [plugin-team-board](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | 多 agent 会话共享任务看板：跨 subagent 创建/认领/更新/查询任务，基于 append-only 会话日志持久化。 |
| [dsh-plugin-greet](https://github.com/0lidaxiang/dsh-plugin-greet) | 4 | ⚪ unknown | DeepSeek Harness is a plugin-based system for building AI agents. Everything, from tools and models to the web UI, can be added o… |
| [dsh-plugin-pet](https://github.com/c-ling/dsh-plugin-pet) | 3 | ⚪ unknown | DeepSeek Harness 桌面电子宠物插件：跟随 agent 状态变换心情的内置/自定义/Codex 精灵图伙伴。 |
| [dsh-llm-proxy](https://github.com/Ye-Yu-Mo/dsh-llm-proxy) | 2 | ⚪ unknown | DeepSeek Harness (dsh) 全局 HTTP 代理插件：undici setGlobalDispatcher + EnvHttpProxyAgent，配置化、热切换、可观测 |
| [dsh-mobile-gui-agent](https://github.com/kunjinkao-os/dsh-mobile-gui-agent) | 4 | ⚪ unknown | Android Mobile GUI Agent plugin for DeepSeek Harness with ADB control, iterative verification, approvals, and a Web mobile view |
| [dsh-smarthome](https://github.com/YLifeOnlyOnce/dsh-smarthome) | 3 | ⚪ unknown | Home Assistant control for DeepSeek Harness agents — approval-gated lights, switches, climate. 给 DeepSeek Harness agent 的 Home As… |
| [dsh-plugin-development](https://github.com/w2112515/dsh-plugin-development) | 7 | ⚪ unknown | Installable DeepSeek Harness bundle that teaches agents to develop and audit DSH plugins. |
| [dsh-codex-pet](https://github.com/skr311/dsh-codex-pet) | 5 | ⚪ unknown | dsh-codex-pet · DSH 桌面宠物插件 — 导入精灵图序列帧宠物，悬浮浮层渲染 + Agent 状态联动 |
| [dsh-role-router](https://github.com/SnowAmberX/dsh-role-router) | 2 | ⚪ unknown | Role-based model routing plugin for DeepSeek Harness: planner/subagent roles plus a settings card and composer summary |
| [DeepSeekHarnessRemoteGateway](https://github.com/lbwnb666-ai/DeepSeekHarnessRemoteGateway) | 3 | ⚪ unknown | 一个轻量级 DeepSeek Harness 远程网关，让你通过 Web 或移动设备远程访问和控制本地 AI Agent |
| [dsh-story](https://github.com/Treasure-hub-agent/dsh-story) | 2 | ⚪ unknown | DSH 互动小说插件：全量 UI 叙事面板 + 悬浮窗信息层，把选项驱动的沉浸式剧情做成 DeepSeek Harness 原生体验 |
| [dsh-codex-agent-bridge](https://github.com/je00/dsh-codex-agent-bridge) | 2 | ⚪ unknown | Use the Codex models included with your ChatGPT subscription directly in DeepSeek Harness—no API key or separate API billing. |
| [dsh-dynamic-island](https://github.com/YLifeOnlyOnce/dsh-dynamic-island) | 3 | ⚪ unknown | A tiny glass companion for DeepSeek Harness — it breathes while the agent thinks, pulses while it works, and politely checks with… |
| [dsh-plugin-audiolib](https://github.com/yangyue1974/dsh-plugin-audiolib) | 2 | ⚪ unknown | Ambient soundtrack for DeepSeek Harness, driven by agent state. Streams 100k+ cleared tracks from AudioLib.ai — a track always fi… |
| [dsh-file-explorer](https://github.com/Zalpha263/dsh-file-explorer) | 3 | ⚪ unknown | 可以像其他agent一样查看当前工作区的文件夹，并且可以预览文件 |
| [dsh-skill-panel](https://github.com/hexbee/dsh-skill-panel) | 2 | ⚪ unknown | DSH plugin: manage agent skills in settings | DSH 插件：设置页技能管理面板 |
| [dsh-agent-board](https://github.com/MiloMMIN/dsh-agent-board) | 2 | ⚪ unknown | 跨 Agent 工作台:dsh persistent plugin that watches Claude Code / Codex / Kimi Code / Pi / Hermes and continues their work with one cl… |
| [dsh-science-workbench](https://github.com/poplarity/dsh-science-workbench) | 3 | ⚪ unknown | A reproducible science workbench plugin for the DeepSeek Harness: agent-driven cells, inline figures with feedback/rerun, manifes… |
| [dsh-vscode](https://github.com/MJ-Chang/dsh-vscode) | 3 | ⚪ unknown | DeepSeek Harness for VS Code: right-side chat agent that reads, edits, and runs your project — like Claude Code / Codex / Copilot. |
| [sandbase-skills](https://github.com/sandbaseai/sandbase-skills) | 3 | ⚪ unknown | Native DeepSeek Harness skills for research and growth workflows, with an npm CLI that installs complete bundles into .dsh/skills… |
| [dsh-plugin-acn](https://github.com/acnlabs/dsh-plugin-acn) | 2 | ⚪ unknown | DeepSeek Harness plugin: join ACN so this agent can discover, message, and collaborate with other agents. Defaults to the China r… |
| [dsh-fleet-audit](https://github.com/LeslieWylie/dsh-fleet-audit) | 1 | ⚪ unknown | DSH agent-fleet hygiene audit plugin: credential-file permissions, embedded git-remote credentials (masked), provider token liter… |
| [dsh-agent-hub](https://github.com/Luoye-1026/dsh-agent-hub) | 2 | ⚪ unknown | dsh-agent-hub是一个统一指挥本机 Agent的 DSH 插件，目前支持（Codex / Reasonix / Pi / DSH） |
| [dsh-plugin-call-me](https://github.com/radres/dsh-plugin-call-me) | 3 | ⚪ unknown | Your DeepSeek Harness agent rings your actual phone: it asks out loud, you answer out loud, and what you said steers the run. |
| [dsh-plugin-kit](https://github.com/OneZero-Y/dsh-plugin-kit) | 2 | ⚪ unknown | Agent skills and a working template for building standalone DeepSeek Harness (DSH) plugins |
| [git-worktree](https://github.com/KHG420/git-worktree) | 2 | ⚪ unknown | DeepSeek Harness plugin: bind every conversation to its own isolated git worktree + branch in one click, so parallel agents work… |
| [godot-bridge](https://github.com/Smalldy/godot-bridge) | 4 | ⚪ unknown | DSH (DeepSeek Harness) plugin that launches and drives a running Godot 4.x game through its in-game TCP interaction server — repl… |
| [dsh-billing](https://github.com/nianpangzhi233/dsh-billing) | 1 | ⚪ unknown | DSH web GUI realtime billing monitor: token/cost metering, DeepSeek v4 peak pricing, balance anchoring, sidebar pill + settings p… |
| [dsh-task-dag](https://github.com/LeemanCheung/dsh-task-dag) | 1 | ⚪ unknown | Persistent live DAG visualization for DeepSeek Harness subagents and workflows |
| [dsh-s1](https://github.com/superagents-lab/dsh-s1) | 3 | ⚪ unknown | Native s1 tools for the DeepSeek Harness (DSH): s1_search, s1_news, s1_crawl, s1_sitemap, s1_trending + bundled s1 skill |
| [dsh-stall-guard](https://github.com/akira399/dsh-stall-guard) | 3 | ⚪ unknown | DeepSeek Harness watchdog plugin: detects truly stalled agent turns (never killing in-progress tasks — in-flight operations are e… |
| [hermes-dsh-collab](https://github.com/Cavan-Ou/hermes-dsh-collab) | 3 | ⚪ unknown | Battle-tested multi-agent collaboration playbook for DeepSeek Harness: model-tier routing, spec discipline, git single-writer rul… |
| [dsh-trajectory-governance](https://github.com/dfycaly98931680/dsh-trajectory-governance) | 3 | ⚪ unknown | Agent trajectory governance & anomaly diagnosis plugin for DeepSeek Harness (dsh): multi-branch trajectory trees, loop-deadlock /… |
| [ha-orchestrator](https://github.com/Saktawdi/ha-orchestrator) | 3 | ⚪ unknown | DeepSeek Harness（dsh）动态 Cordis 插件：模型高可用回退 + 子智能体编排（HA failover + orchestrate subagents） |
| [dsh-advisor](https://github.com/glangzh/dsh-advisor) | 1 | ⚪ unknown | 给 DeepSeek Harness 的 Agent 增加一位"顾问"：日常任务使用较弱模型（默认模型），遇到真正困难的决策时，Agent 会自动向一个更强的模型咨询。 |
| [dsh-plugin-subagent-director](https://github.com/SeverusZh/dsh-plugin-subagent-director) | 3 | ⚪ unknown | Subagent Director: per-subagent LLM provider/model selection with role templates for DeepSeek Harness (dsh plugin) |
| [pptfast](https://github.com/liustack/pptfast) | 3 | ⚪ unknown | Stable, editable PPTX generation for AI agents — semantic IR in, native DrawingML out. DSH plugin + Claude Code plugin + CLI. | 给… |
| [dsh-subagent-max](https://github.com/aaravarr/dsh-subagent-max) | 3 | ⚪ unknown | DeepSeek Harness (DSH) plugin — a subagent_with_model tool plus a live multi-panel subagent viewer. |
| [dsh-browser-companion](https://github.com/Tianyu209/dsh-browser-companion) | 3 | ⚪ unknown | A personal DSH browser plugin: persistent profile, visible window, human-in-the-loop login, and safe agent browser tools. |
| [dsh-gitbash-preset](https://github.com/liceses/dsh-gitbash-preset) | 24 | ⚪ unknown | DeepSeek Harness 插件：一键安装「极简模式 (Git Bash)」agent preset —— 把 DSH 自带极简模式中的 bash 调用映射到 Git for Windows 的 bash（MSYS），让 Windows 上的极简模式真… |
| [oh-my-deepseek-harness](https://github.com/YYTbit/oh-my-deepseek-harness) | 2 | ⚪ unknown | Multi-agent orchestration for DeepSeek Harness |
| [dsh](https://github.com/Bin-hy/dsh) | 10 | ⚪ unknown | 源码级拆解 DeepSeek Harness · 面向 Agent 开发者的中文学习资料 |
| [dsh-opencode-usage](https://github.com/vinyumao/dsh-opencode-usage) | 3 | ⚪ unknown | DSH plugin: OpenCode Go 套餐用量显示（滚动/每周/每月用量百分比与重置倒计时 + Agent 工具 opencode_go_usage）。官方 bundle 插件，安装: dsh plugin --profile web add gi… |
| [dsh-finance](https://github.com/zhang787jun/dsh-finance) | 3 | ⚪ unknown | Finance and accounting workflows for DeepSeek Harness, adapted from Anthropic Finance |
| [dsh-grok-geo](https://github.com/xuboboo/dsh-grok-geo) | 2 | ⚪ unknown | DSH (DeepSeek Harness) plugin bundle: grok-geo GEO brand audit agent skill - AI-search visibility, recommendations, citations, co… |
| [dsh-cluster](https://github.com/Lanxi26/dsh-cluster) | 2 | ⚪ unknown | 画布式多智能体协作插件 | Canvas-based multi-agent cooperation plugin for DeepSeek Harness |

### 🔌 桥接

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-agent-messaging](https://github.com/happyren/dsh-agent-messaging) | 4 | ⚪ unknown | 跨会话 agent 间消息传递。 |
| [widget-dock](https://github.com/MorGogh/widget-dock) | 4 | ⚪ unknown | widget-dock — DSH 插件（桥接） |
| [dsh-ark-quota](https://github.com/lordqyxz/dsh-ark-quota) | 2 | ⚪ unknown | 火山方舟订阅套餐剩余额度 DSH 侧边栏小组件（宿主代理 GetCodingPlanUsage + 浏览器 widget + 免重启 cookie 刷新工具） |
| [dsh-codex-bridge](https://github.com/pandashere/dsh-codex-bridge) | 1 | ⚪ unknown | dsh-codex-bridge — DSH 插件（桥接） |
| [dsh-reasoning-translator](https://github.com/pinkllo/dsh-reasoning-translator) | 2 | ⚪ unknown | dsh-reasoning-translator — DSH 插件（桥接） |
| [dsh-credentials-keychain](https://github.com/ShawnSiao/dsh-credentials-keychain) | 1 | ⚪ unknown | dsh-credentials-keychain — DSH 插件（桥接） |
| [dsh-deepseek-balance](https://github.com/lin-cheng-lab/dsh-deepseek-balance) | 1 | ⚪ unknown | DeepSeek API 余额监视器：DSH 右下角悬浮徽章 + 7天/30天用量费用图表 |
| [dsh-deepseek-usage](https://github.com/ben7am1n/dsh-deepseek-usage) | 1 | ⚪ unknown | dsh-deepseek-usage — DSH 插件（桥接） |
| [dsh-balance-display](https://github.com/Liu-ty/dsh-balance-display) | 1 | ⚪ unknown | dsh-balance-display — DSH 插件（桥接） |
| [ds-balance-card](https://github.com/jasonsun29/ds-balance-card) | 3 | ⚪ unknown | DeepSeek Harness 常驻额度卡片插件:自动识别已配置的平台 API Key,显示余额与 Coding Plan 额度 |
| [dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) | 6 | ⚪ unknown | dsh-balance-monitor — DSH 插件（桥接） |
| [dsh-kimi-bridge](https://github.com/pandashere/dsh-kimi-bridge) | 1 | ⚪ unknown | dsh-kimi-bridge — DSH 插件（桥接） |
| [deepseek-harness-lan](https://github.com/oitsukiii/deepseek-harness-lan) | 3 | ⚪ unknown | deepseek-harness-lan — DSH 插件（桥接） |
| [jina-dsh-plugin](https://github.com/minatoAI/jina-dsh-plugin) | 1 | ⚪ unknown | jina-dsh-plugin — DSH 插件（桥接） |
| [dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) | 2 | ⚪ unknown | dsh-lsp-actions — DSH 插件（桥接） |
| [dsh-chrome](https://github.com/YJSoooooo/dsh-chrome) | 1 | ⚪ unknown | dsh-chrome — DSH 插件（桥接） |
| [dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) | 2 | ⚪ unknown | dsh-exa-mcp — DSH 插件（桥接） |
| [dsh-switch](https://github.com/dongsheng123132/dsh-switch) | 3 | ⚪ unknown | dsh-switch — DSH 插件（桥接） |
| [dsh-deepseek-balance](https://github.com/wangxiang0605qvq/dsh-deepseek-balance) | 0 | ⚪ unknown | dsh-deepseek-balance — DSH 插件（桥接） |
| [dsh-usage-stats](https://github.com/Ychris12138/dsh-usage-stats) | 20 | ⚪ unknown | Token usage heatmap, per-model breakdowns, and DeepSeek account balance for the DeepSeek Harness Web GUI (dsh web). |
| [deepseek-harness-acp](https://github.com/openma-ai/deepseek-harness-acp) | 7 | ⚪ unknown | ACP server implementation for DeepSeek harness |
| [dsh-quota-panel](https://github.com/brittanistrehlowll-oss/dsh-quota-panel) | 4 | ⚪ unknown | Provider quota/balance corner panel for the dsh web surface (DeepSeek Harness plugin): server-side credential proxies plus a conf… |
| [pi2dsh](https://github.com/weijiafu14/pi2dsh) | 8 | ⚪ unknown | Bridge the Pi and DeepSeek Harness ecosystems: one Pi Host ABI runs unmodified Pi extensions as native DSH plugins. 打通 Pi 与 DSH 生… |
| [dsh-plugin-deepseek-balance](https://github.com/hnmrxz/dsh-plugin-deepseek-balance) | 5 | ⚪ unknown | 在 DeepSeek Harness (dsh) 底部状态栏实时显示 DeepSeek 账户余额。 |
| [dsh-weather](https://github.com/sunshine-lang/dsh-weather) | 4 | ⚪ unknown | Weather tool for DeepSeek Harness: current conditions and multi-day forecasts via Open-Meteo (free, no API key) |
| [dsh-pdf](https://github.com/sunshine-lang/dsh-pdf) | 4 | ⚪ unknown | PDF toolbox for DeepSeek Harness: extract text, metadata, and page ranges via pdfjs-dist (local, no API key) |
| [dsh-plugin-template](https://github.com/sunshine-lang/dsh-plugin-template) | 3 | ⚪ unknown | Ready-to-publish DeepSeek Harness plugin skeleton: bundle format, tool DSL, config, tests, and a scaffold script |
| [dsh-plugins](https://github.com/sunshine-lang/dsh-plugins) | 2 | ⚪ unknown | Unified portal for DeepSeek Harness plugins by sunshine-lang: dsh-weather, dsh-pdf, dsh-plugin-template |
| [Dcode](https://github.com/Deklan-Deng/Dcode) | 1 | ⚪ unknown | Deepseek-harness 桌面端 |
| [deepseek-harness-codex-bridge](https://github.com/Aloneswork/deepseek-harness-codex-bridge) | 2 | ⚪ unknown | Bidirectional MCP bridge for DeepSeek Harness and Codex collaboration |
| [dsh-easyssh](https://github.com/chenw2759-wq/dsh-easyssh) | 6 | ⚪ unknown | 用于远程ssh快速相应，同时可以直接在前端操作/查看远程服务器上的信息与代码。 |
| [dsh-plugin-deepseek-balance](https://github.com/fishxcode/dsh-plugin-deepseek-balance) | 0 | ⚪ unknown | DeepSeek Harness Web client plugin that displays real-time DeepSeek API balance. |
| [dsh-remote](https://github.com/flymysql/dsh-remote) | 10 | ⚪ unknown | Remote-access assistant for DeepSeek Harness: /remote command and settings page printing the exact SSH tunnel / reverse-tunnel /… |
| [dsh-web-billing](https://github.com/bpc-oss/dsh-web-billing) | 5 | ⚪ unknown | RMB/USD token-billing plugin for DeepSeek Harness (dsh web): official-policy auto pricing with peak/off-peak hours, per-message l… |
| [dsh-spend](https://github.com/nonewind/dsh-spend) | 4 | ⚪ unknown | Token usage & cost monitor for DeepSeek Harness — floating widget with multi-dimensional stats, time-series charts, auto-detected… |
| [dsh-Kimi-WebBridge](https://github.com/MicroHEROX/dsh-Kimi-WebBridge) | 2 | ⚪ unknown | Kimi WebBridge for DeepSeek Harness — a third-party dsh plugin bundle that turns the local Kimi WebBridge daemon into 15 native k… |
| [dsh-randomuuid-polyfill](https://github.com/Lehmaning/dsh-randomuuid-polyfill) | 1 | ⚪ unknown | dsh client plugin that installs crypto.randomUUID on insecure origins (plain HTTP over a LAN address) |
| [dsh-deepseek-quota](https://github.com/yingjunnan/dsh-deepseek-quota) | 1 | ⚪ unknown | DeepSeek API quota (balance) widget for the DSH web GUI: a floating bottom-right card showing remaining DeepSeek API balance. |
| [dsh-deepseek-balance](https://github.com/dshiq04/dsh-deepseek-balance) | 0 | ⚪ unknown | 面向deepseek harness的余额查看插件 |
| [api-cost-meter](https://github.com/kanallas/api-cost-meter) | 0 | ⚪ unknown | DeepSeek Harness API cost meter plugin: peak/off-peak spend badge, current unit prices, official account balance |
| [dsh-remote-acces](https://github.com/wuwuzhige-sudo/dsh-remote-acces) | 2 | ⚪ unknown | One-command setup for password-protected remote access to the DeepSeek Harness (dsh) web UI — dsh privileged-methods patch, Caddy… |
| [dsh-llm-oauth](https://github.com/ziyou979/dsh-llm-oauth) | 3 | ⚪ unknown | DeepSeek Harness plugin: OAuth / subscription-plan LLM providers (Grok, GitHub Copilot, OpenAI Codex, Anthropic, OpenRouter) |
| [dsh-lan-uuid-fix](https://github.com/Zenjibad/dsh-lan-uuid-fix) | 0 | ⚪ unknown | dsh bundle: polyfill crypto.randomUUID on insecure origins so the DeepSeek Harness Web UI works over plain-HTTP LAN |
| [dsh-plugin-finder](https://github.com/ihuajiu/dsh-plugin-finder) | 3 | ⚪ unknown | Natural-language plugin search for DeepSeek Harness — ask what you need, get matching dsh.so plugins with install commands. |
| [dsh-multi-user-gateway](https://github.com/AnkoCD/dsh-multi-user-gateway) | 2 | ⚪ unknown | 服务器端部署：DeepSeek Harness Web 多用户网关（登录门户 / 每用户实例隔离 / 交付文件抽屉）。部署于远程服务器，用户通过浏览器访问，非本机工具。 |
| [deepseek-harness-mobile](https://github.com/sorsama/deepseek-harness-mobile) | 2 | ⚪ unknown | Android companion for DeepSeek Harness | chat, goals, approvals & notifications from your phone, over your LAN. Kotlin + Jetpack… |
| [dsh-tailscale-console](https://github.com/evanfang0054/dsh-tailscale-console) | 1 | ⚪ unknown | 为 DeepSeek Harness 提供基于 Tailscale 的安全远程访问运营面板：一键健康检查、HTTPS 入口开关、macOS 代理绕过、中继服务器运维、ACL 生成。Tailscale remote-access control panel f… |
| [dsh-server-deployment](https://github.com/AnkoCD/dsh-server-deployment) | 2 | ⚪ unknown | 服务器端部署：DeepSeek Harness Web 多用户网关（登录门户 / 每用户实例隔离 / 交付文件抽屉）。部署于远程服务器，用户通过浏览器访问，非本机工具。 |
| [dsh-balance-eta](https://github.com/fzlong/dsh-balance-eta) | 2 | ⚪ unknown | DeepSeek Harness 极简余额插件：余额 + 今日消耗 + 可用时长预测 + 低余额告警（仅 CNY，价格无关免维护） |
| [dsh-think-any-lang](https://github.com/lco117/dsh-think-any-lang) | 3 | ⚪ unknown | DeepSeek Harness 插件：在「设置 → 通用」中选择模型推理思考（chain of thought）使用的语言。基于系统提示词实现，零额外调用、零延迟，支持 12 种语言。 |
| [dsh-balance](https://github.com/crazywoola/dsh-balance) | 11 | ⚪ unknown | DeepSeek Harness balance plugin for the Settings page |
| [dsh-LAN](https://github.com/MrMu666/dsh-LAN) | 2 | ⚪ unknown | 为DeepSeek harness开启局域网访问及移动端页面的插件 |
| [dsh-provider-billing](https://github.com/ZeroingIn/dsh-provider-billing) | 1 | ⚪ unknown | DeepSeek Harness plugin: provider account balance inside each Models settings row, queried through a loopback-pinned RPC channel… |
| [dsh-IDE](https://github.com/chenw2759-wq/dsh-IDE) | 6 | ⚪ unknown | 这是一个ssh前端程序，可以让UI体现类似lab的功能！用于远程ssh快速相应，同时可以直接在前端操作/查看远程服务器上的信息与代码。 |
| [dsh-usage-chart](https://github.com/Max-Samson/dsh-usage-chart) | 4 | ⚪ unknown | A DeepSeek Harness Web plugin for real-time Token usage, cost estimates, per-round charts, and DeepSeek API balance. |
| [dsh-remote-ide](https://github.com/harryopo/dsh-remote-ide) | 3 | ⚪ unknown | SSH Remote IDE for DeepSeek Harness: connect via SSH and the IDE goes remote — explorer browses the server, editor reads/writes o… |
| [dsh-balance](https://github.com/linshule/dsh-balance) | 4 | ⚪ unknown | DeepSeek API 账户余额实时显示插件（DSH Web GUI）：可拖拽左下角余额徽章 + 设置页 |
| [dsh-galgame](https://github.com/Lanxing6480/dsh-galgame) | 4 | ⚪ unknown | 我要成为Galgame高手！！将你的Vibe coding界面修改成为Galgame的样子，在不影响工作的情况下和赏心悦目的DeepSeek娘进行友好互动 |
| [dsh-plugin-deepseek-balance](https://github.com/CaoNing3212/dsh-plugin-deepseek-balance) | 2 | ⚪ unknown | Deepseek余额显示 |
| [dsh-lan-gate](https://github.com/hchao3335-maker/dsh-lan-gate) | 3 | ⚪ unknown | 一个DSH内网访问插件 局域网设备安全访问本机 DSH 的即插即用网关：本机审批、设备令牌、限流、手机适配，单文件零依赖。 |
| [dsh-balance-float](https://github.com/x2802490130-prog/dsh-balance-float) | 3 | ⚪ unknown | DSH 悬浮余额/一键退出插件 |
| [dsh-balance-monitor](https://github.com/Rainronin/dsh-balance-monitor) | 2 | ⚪ unknown | 一个好看、简单、实用的余额监视器｜DeepSeek Harness 插件：官方余额快照 + ds_balance 工具 + Matrix 侧边栏徽章 |
| [dsh-api-balance](https://github.com/ArcanePivot/dsh-api-balance) | 5 | ⚪ unknown | DeepSeek Harness Web UI widget for viewing DeepSeek API balance from the host side. |
| [dsh-balance-plugin](https://github.com/Francis-Xavier-code/dsh-balance-plugin) | 6 | ⚪ unknown | deepSeek 余额监控与用量统计（DSH 动态 Cordis 插件）：余额监控 · 官方充值入口 · 用量统计 · 三方插件管理 |
| [dsh-web-lan-access](https://github.com/AcidGr/dsh-web-lan-access) | 2 | ⚪ unknown | DeepSeek Harness (dsh) Web plugin |
| [hesi-dsh-plugins](https://github.com/qiuqiukof-oss/hesi-dsh-plugins) | 3 | ⚪ unknown | DeepSeek Harness (DSH) 插件 —— 圆桌讨论（Roundtable）与 一键执行流（Plan） Hesi 出品 · 同源实现 |
| [dsh-api-balance](https://github.com/9Epuuuu/dsh-api-balance) | 2 | ⚪ unknown | DeepSeek account balance readout for DSH Web (dsh-plugin) |

### 📦 预设

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [dsh-companion](https://github.com/yyh-001/dsh-companion) | 3 | ⚪ unknown | DeepSeek 陪伴模式插件：人设、记忆、聊得下去。 |
| [all (全家桶)](https://github.com/whyihaveyou/dsh-suite) | 15 | 🟢 ok | 全家桶聚合包：一次安装带入第一方全家桶——插件商店、IM 通知、会话导出、多 agent 任务板。 |

### 🧷 其他

| 插件 | ⭐ | 兼容 | 描述 |
|---|---|---|---|
| [EchoBird](https://github.com/edison7009/EchoBird) | 3015 | ⚪ unknown | 一键安装+切换 Claude Code/Codex/Kimi/Qwen 等 20+ 编码智能体 |
| [awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) | 880 | ⚪ unknown | DSH 插件目录，带每日兼容性跟踪 |
| [deepseek-harness-applicants](https://github.com/Octo-o-o-o/deepseek-harness-applicants) | 52 | ⚪ unknown | DSH 内测申请者名单 |
| [awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 422 | ⚪ unknown | DSH 生态精选：插件、工具与基建 |
| [dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) | 140 | ⚪ unknown | DSH 终端 UI（TUI） |
| [agent-skills](https://github.com/GitHubxsy/agent-skills) | 20 | ⚪ unknown | 面向 AI 编码智能体的可复用 skills 合集 |
| [dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) | 150 | ⚪ unknown | Codex-style @file mentions for DeepSeek Harness: search workspace files in the composer and attach their contents to prompts. |
| [dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) | 40 | ⚪ unknown | Open DeepSeek Harness workspace directories in VS Code directly from the web GUI. |
| [dsh-notification](https://github.com/omdsh-dev/dsh-notification) | 42 | ⚪ unknown | Desktop notifications for DeepSeek Harness turn completions, with per-outcome controls and include/exclude keyword rules. |
| [dsh-ads](https://github.com/Nagi-ovo/dsh-ads) | 359 | ⚪ unknown | 2005 年中文站点风格侧栏广告插件（恶搞） |
| [dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) | 15 | ⚪ unknown | DSH 内测收官合影墙：GitHub OAuth 零权限登录 + 冻结白名单校验的拍立得合影站（含 DSH Skill 包装） |
| [dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) | 67 | ⚪ unknown | OpenPencil design preview and editing plugin for DSH |
| [oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) | 176 | ⚪ unknown | 可扩展的 macOS DSH 工作台（原生 PTY） |
| [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize) | 87 | ⚪ unknown | 对话内生成式 UI：把交互式 HTML 卡片画进会话 |
| [awesome-DSH-plugin](https://github.com/Alex-Yanggg/awesome-DSH-plugin) | 56 | ⚪ unknown | 精选 DSH 插件/扩展/工具列表 |
| [oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) | 44 | ⚪ unknown | 面向 DSH 的插件生态（700+ 插件） |
| [dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) | 13 | ⚪ unknown | 在 DSH 里与 AI 下五子棋 |
| [dsh-web-review](https://github.com/CanglongCl/dsh-web-review) | 14 | ⚪ unknown | DeepSeek Harness Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。 |
| [dsh-emoji](https://github.com/hellodigua/dsh-emoji) | 17 | ⚪ unknown | 为 AI 回复自动添加表情 |
| [dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) | 9 | ⚪ unknown | 用 grok-build 的 TUI 跑 DSH |
| [dsh-stock-market](https://github.com/AnacondaKC/dsh-stock-market) | 11 | ⚪ unknown | 写代码时账户同时亏钱的恶搞插件 |
| [Top](https://github.com/xiaohai-78/Top) | 4 | ⚪ unknown | dsh-external 插件生态每日榜单 |
| [awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 111 | ⚪ unknown | 双语 DSH 插件生态完整列表 |
| [dsh-launcher](https://github.com/Ruler4396/dsh-launcher) | 81 | ⚪ unknown | 基于 WebView2 的 DSH 启动器 |
| [dsh-minigames](https://github.com/lhh010/dsh-minigames) | 15 | ⚪ unknown | 右侧小游戏面板（18 款离线小游戏） |
| [dsh-stickers](https://github.com/william-jin-cmu/dsh-stickers) | 13 | ⚪ unknown | 双向表情贴纸插件 |
| [oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) | 5 | ⚪ unknown | DeepSeek harness 插件集 |
| [orbis](https://github.com/icodesign/orbis) | 7 | ⚪ unknown | DSH 远程控制的移动客户端 |
| [plugin-registry](https://github.com/vlln/plugin-registry) | 39 | ⚪ unknown | DSH 插件生态基建：浏览器面板管理官方 repository 插件 |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 一键脚手架生成 DeepSeek Harness (DSH) 插件：tool / events / webui 三套模板、next 标签版本锁定、内置 --verify 冒烟测试。 |
| [dsh-101](https://github.com/bill9109/dsh-101) | 2 | ⚪ unknown | DSH 文档阅读模式 |
| [dsh-desktop-electron](https://github.com/Void0312Aurora/dsh-desktop-electron) | 4 | ⚪ unknown | 跨平台 Electron 桌面壳（托盘常驻） |
| [dsh-douyin](https://github.com/AnacondaKC/dsh-douyin) | 2 | ⚪ unknown | 侧栏短视频插件（原生播放器） |
| [dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) | 2 | ⚪ unknown | DSH 一键启动器（Windows 便携免安装） |
| [dsh-notebooks](https://github.com/havingautism/dsh-notebooks) | 3 | ⚪ unknown | (无描述) |
| [dsh-plugin-d399](https://github.com/HuanLinOTO/dsh-plugin-d399) | 5 | ⚪ unknown | 模型生成时弹出小游戏菜单 |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | 回合完成 / 出错 / 待审批时，把通知推到 IM webhook（飞书 / 企业微信 / 钉钉 / Slack / Discord / 自定义）+ 本机系统通知。 |
| [dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) | 12 | ⚪ unknown | 把 DeepSeek Harness 桥接进飞书/Lark。 |
| [dsh-win-notify](https://github.com/MuziIsabel/dsh-win-notify) | 4 | ⚪ unknown | 带声音的 Windows 通知插件。 |
| [dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) | 5 | ⚪ unknown | 为 agent 新增 wechat_notify 工具的插件。 |
| [dsh-lan](https://github.com/moxisuki/dsh-lan) | 5 | ⚪ unknown | 一条 overlay 把 dsh web 暴露到局域网。 |
| [DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) | 5 | ⚪ unknown | 通过 Telegram 远程与 DeepSeek Harness 对话。 |
| [dsh-onlyne](https://github.com/dbydd/dsh-onlyne) | 2 | ⚪ unknown | dsh-onlyne — DSH 插件（其他） |
| [dsh-lark](https://github.com/Roy-oss1/dsh-lark) | 2 | ⚪ unknown | dsh-lark — DSH 插件（其他） |
| [dsh-chatnode-wechat](https://github.com/Jesse-njx/dsh-chatnode-wechat) | 1 | ⚪ unknown | dsh-chatnode-wechat — DSH 插件（其他） |
| [dsh-im-bridge](https://github.com/BiBoyang/dsh-im-bridge) | 2 | ⚪ unknown | DSH 插件：把 DeepSeek Harness 桥接到 IM（v0.1 微信/iLink；钉钉/飞书/Telegram 预留）。turn/approval 推送 + 远程批准/注入，持久去重/收敛分段/合并窗口。 |
| [dsh-lark-bridge](https://github.com/imetn/dsh-lark-bridge) | 6 | ⚪ unknown | dsh-lark-bridge — DSH 插件（其他） |
| [dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) | 1 | ⚪ unknown | dsh-openclaw-acp — DSH 插件（其他） |
| [dsh-tool-notify](https://github.com/rizkirmdhnnn/dsh-tool-notify) | 0 | ⚪ unknown | dsh-tool-notify — DSH 插件（其他） |
| [dsh2wechat](https://github.com/wuyuanjiang1/dsh2wechat) | 1 | ⚪ unknown | dsh2wechat — DSH 插件（其他） |
| [dsh-lark](https://github.com/omdsh-dev/dsh-lark) | 15 | ⚪ unknown | Lark/Feishu IM bot channel for DeepSeek Harness: chats drive agents, replies and approvals return as messages and cards | 飞书 Deep… |
| [dsh-plugins](https://github.com/kazecreator/dsh-plugins) | 1 | ⚪ unknown | Monorepo of DeepSeek Harness (dsh) plugins — including dsh-im (Telegram & WeChat IM bridge) |
| [dsh-notify](https://github.com/dshiq04/dsh-notify) | 0 | ⚪ unknown | 面向deepseek harness的消息通知插件 |
| [dsh-messager](https://github.com/ly6170/dsh-messager) | 2 | ⚪ unknown | 基于Deepseek Harness+DeepSeek开发的适用于Deepseek Harness的消息提醒信使，可使用第三方通道（暂时飞书webhook）进行推送 |
| [DSH-telegram](https://github.com/yuko0331/DSH-telegram) | 5 | ⚪ unknown | 通过 Telegram 私聊远程使用和查看 DeepSeek Harness |
| [dsh-task-notify](https://github.com/ltao0829/dsh-task-notify) | 4 | ⚪ unknown | DeepSeek Harness task-completion reminder plugin |
| [dsh-notify](https://github.com/yangyongzhen/dsh-notify) | 2 | ⚪ unknown | Task-completion notifications for DeepSeek Harness: ServerChan / DingTalk / Feishu / generic webhooks. dsh plugin. |
| [dsh-telegram-channel](https://github.com/hi-wenw/dsh-telegram-channel) | 5 | ⚪ unknown | DeepSeek Harness Telegram mobile remote: bind live Web sessions (Codex-style). Install: dsh plugin add github:hi-wenw/dsh-telegra… |
| [dsh-plugin-notify](https://github.com/c-ling/dsh-plugin-notify) | 2 | ⚪ unknown | DeepSeek Harness 消息提醒插件：回合结束或等待确认时向浏览器、系统、飞书/钉钉/企业微信/通用 Webhook 发送通知 |
| [dsh-lark-link](https://github.com/amlyczz/dsh-lark-link) | 5 | ⚪ unknown | High-reliability Feishu/Lark bridge for DeepSeek Harness — QR one-click auth, multi-mode agents, card-based commands, zero-loss o… |
| [dsh-notification-center](https://github.com/610la/dsh-notification-center) | 6 | ⚪ unknown | DSH 通知中心插件：对话/任务完成、报错、等待批准等事件触发浏览器通知 + 21 种匹配音效 |
| [dsh-feishu-bridge](https://github.com/wz-heng/dsh-feishu-bridge) | 4 | ⚪ unknown | Feishu (Lark) channel bridge for DeepSeek Harness (dsh) — message a Feishu bot, it runs a dsh agent turn, the reply comes back. C… |
| [dsh-llm-wechat](https://github.com/sulfide2085/dsh-llm-wechat) | 6 | ⚪ unknown | DeepSeek Harness 微信网关适配插件：复用 DeepSeekAdapter + 流式 think 标签转译 |
| [dsh-feishu](https://github.com/xmanrui/dsh-feishu) | 4 | ⚪ unknown | 通过扫码把飞书机器人接入DeepSeek Harness |
| [dsh-task-notify](https://github.com/kaotusi/dsh-task-notify) | 2 | ⚪ unknown | DeepSeek Harness (DSH) system-level task notifications: approval required / awaiting reply / task finished (background job, subag… |
| [dsh-feishu-bot](https://github.com/TingRuDeng/dsh-feishu-bot) | 2 | ⚪ unknown | Feishu (Lark) private-chat frontend for DeepSeek Harness: drive, monitor, and approve local agents from Feishu, sharing sessions… |
| [dsh-plugin-notify](https://github.com/huguangyu666/dsh-plugin-notify) | 3 | ⚪ unknown | DeepSeek Harness 插件：通知出口——agent 通过桌面通知 / 中文语音播报 / 提示音主动联系用户（长任务完成、出错、呼叫用户回来）。Windows 本机零依赖。 |
| [dsh-plugin-approval-alert](https://github.com/doncelee229-cmyk/dsh-plugin-approval-alert) | 1 | ⚪ unknown | DeepSeek Harness 审批/选择方案系统级通知提醒，显示工作区名、点击跳转、多语言。Approval & decision alerts with native notifications for DeepSeek Harness. |
| [dsh-notify-sound](https://github.com/xxxxxxxyu/dsh-notify-sound) | 3 | ⚪ unknown | DSH (DeepSeek Harness) web plugin: plays a sound when the agent finishes replying (turn/end). Sound, volume and on/off configurab… |
| [dsh-WeCom-notify](https://github.com/GuZhengSVT/dsh-WeCom-notify) | 2 | ⚪ unknown | DeepSeek Harness (dsh) 插件：事件驱动的企业微信（WeCom）群机器人通知 — goal 完成/阻塞与每轮对话自动推送，另含 wechat_notify 工具；走官方 webhook，零封号风险。 |
| [dsh-wechat-maid](https://github.com/skylar-fei/dsh-wechat-maid) | 3 | ⚪ unknown | 一个适用于DSH的插件，提供微信远程控制、主动对话、未来任务、桌宠等功能，可通过桌宠面板实时检查未来任务的状态，并提供“自动编码”模式，使模型在对话完后发微信提醒你，以便你认真的刷手机。 |
| [dsh-schedule-tasks](https://github.com/uluckystar/dsh-schedule-tasks) | 2 | ⚪ unknown | DSH 定时任务插件:标准 cron 5 段式调度 + shell/通知触发动作 + Web 侧边栏管理面板。by MyDSH 社区 (mydsh.dev) |
| [dsh-feishu-gateway](https://github.com/kriskwok/dsh-feishu-gateway) | 2 | ⚪ unknown | DeepSeek Harness Feishu gateway plugin: chat with your DSH agent from Feishu (persistent sessions, /new, Markdown replies, proact… |
| [dsh-fschannel](https://github.com/cershuang/dsh-fschannel) | 2 | ⚪ unknown | DSH-Feishu channel plugin |

> 徽章含义：🟢 兼容 · 🔴 不兼容 · ⚪ 未实测 · ⚫ 弃坑。
> 共 1270 个条目，按分类分表、类内按 ⭐ 降序。收录 / 字段词典见 [docs/catalog-schema.md](docs/catalog-schema.md)。
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
