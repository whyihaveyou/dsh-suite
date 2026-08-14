# dsh-suite

![GitHub stars](https://img.shields.io/github/stars/whyihaveyou/dsh-suite?style=flat-square&color=facc15)
![Plugins](https://img.shields.io/badge/plugins-538-facc15?style=flat-square)
![Daily compat](https://img.shields.io/github/actions/workflow/status/whyihaveyou/dsh-suite/compat.yml?branch=main&label=daily-compat-check&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square)

> 🌐 English · [中文](README.zh-CN.md)

**Stop scrolling the `dsh-plugin` topic. Find plugins that still work.**

`dsh-suite` is a bilingual, curated directory of [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) plugins — re-checked against the latest DSH release every day by CI — plus a `create-dsh-plugin` scaffolder and a small set of first-party plugins.

![demo: scaffold and verify a DSH plugin in one command](site/assets/demo.gif)

---

## Why dsh-suite

DSH launched without an official plugin registry. Discovery today is the GitHub `dsh-plugin` topic (50+ one-off plugins) plus a few static awesome-lists that appeared overnight — and DSH itself is still shipping **compatibility-breaking changes**.

So we built three things:

1. **A live directory** — every entry carries a DSH-compatibility badge, re-checked against the latest DSH release every 24h by CI (no API key required).
2. **A scaffolder** — `npm create dsh-plugin` generates a working `dsh.bundle` + Cordis skeleton. The official repo ships none, and "how do I migrate my plugin" is a top community request.
3. **First-party plugins** — a small set we actually maintain, not just links.

## Quick Start

```bash
# 1. Install a plugin from the directory
dsh plugin --profile demo add <package-name>

# 2. Scaffold your own plugin
npm create dsh-plugin@latest my-plugin
```

## 📚 Plugin Catalog

<!-- CATALOG:START -->
### ⭐ Featured

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 654 | ⚪ unknown | DSH Web UI plugin & skin collection: task board, git panel, etc. |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 207 | ⚪ unknown | Sidebar workbench: file render/terminal/git/subagent |
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 182 | ⚪ unknown | Vision for text-only models: image QA, screenshot OCR, UI reconstruction |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 159 | ⚪ unknown | DSH Web whale-girl skin series |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 39 | ⚪ unknown | Skill-driven harness/loop engineering workflow plugin |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 37 | ⚪ unknown | Bring Claude Code's UltraCode mode to DSH with governable multi-agent orchestration |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 23 | ⚪ unknown | Rewind conversation and workspace state |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 21 | ⚪ unknown | Customize the whale-girl thinking-status label |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 18 | ⚪ unknown | Create sandboxed JS tools with Monaco editor |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 12 | ⚪ unknown | DSH conversation sharing plugin |
| [distill](https://github.com/LoserFox/distill) | 12 | ⚪ unknown | Auto conversation distillation: background subagent reflection |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun ↔ DSH ACP bridge |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Export the append-only session log as human-readable Markdown / HTML, grouped by trajectory source (system prompt / reasoning / t… |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Scaffold a DeepSeek Harness (DSH) plugin in seconds — tool / events / webui templates, next-tag version pinning, and a built-in -… |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Send IM webhook + local notifications on turn completion / error / approval (Feishu / WeCom / DingTalk / Slack / Discord / custom… |

### 🧰 Tools

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [open-managed-agents](https://github.com/openma-ai/open-managed-agents) | 230 | ⚪ unknown | Self-hosted Claude Managed Agents API platform (Cloudflare Workers) |
| [role-model](https://github.com/try-works/role-model) | 99 | ⚪ unknown | Protocol to route each job to the right model |
| [irmia_devkit_open](https://github.com/irmia2026/irmia_devkit_open) | 39 | ⚪ unknown | Python devkit (no description) |
| [HoloGram](https://github.com/834063245-creator/HoloGram) | 23 | ⚪ unknown | 3D code dependency graph generator (14 languages) |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 18 | ⚪ unknown | Create sandboxed JS tools with Monaco editor |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun ↔ DSH ACP bridge |
| [fabric](https://github.com/omdsh-dev/fabric) | 8 | ⚪ unknown | MC-Fabric-like hook handler |
| [dsh-git-identity](https://github.com/LoserFox/dsh-git-identity) | 7 | ⚪ unknown | Pin git commits to environment author identity |
| [Hypr-Agent-Protal](https://github.com/gfhdhytghd/Hypr-Agent-Protal) | 4 | ⚪ unknown | Computer Use MCP for Hyprland |
| [telegram](https://github.com/LoserFox/telegram) | 6 | ⚪ unknown | Telegram Bot API bridge (long polling) |
| [agent-knock-knock](https://github.com/scotthuang/agent-knock-knock) | 2 | ⚪ unknown | OpenClaw plugin: control local Codex/Claude Code via shared tmux |
| [dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) | 4 | ⚪ unknown | Auto-detect bash output encoding |
| [dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) | 5 | ⚪ unknown | Connect DB and write SQL plugin |
| [dsh-doctor](https://github.com/coppynight/dsh-doctor) | 3 | ⚪ unknown | flutter-doctor-style diagnostics and safe auto-repair |
| [dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) | 16 | ⚪ unknown | Cross-instance message/event handoff |
| [dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) | 9 | ⚪ unknown | OpenBiliClaw content-agent bridge for DSH |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 11 | ⚪ unknown | Scan plugin repo manifest protocol / patch format / build traps |
| [dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) | 8 | ⚪ unknown | Local security audit: config/plugin source/session/network |
| [dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) | 3 | ⚪ unknown | CSV parse/query/stat/transform tool |
| [dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) | 10 | ⚪ unknown | Zero-dep toolkit collection |
| [atomstudio](https://github.com/AtomicsLaboratory/atomstudio) | 1 | ⚪ unknown | Document engineering environment for executable documents |
| [dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 2 | ⚪ unknown | Use DSH remotely via cc-connect |
| [dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) | 3 | ⚪ unknown | Mnemon three-layer memory deep integration |
| [dsh-paseo](https://github.com/renat3u/dsh-paseo) | 2 | ⚪ unknown | paseo plugin extension support for DSH |
| [dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) | 8 | ⚪ unknown | DSH plugin-dev pitfalls archive (skill + docs) |
| [dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) | 3 | ⚪ unknown | Safe math expression evaluator |
| [dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) | 2 | ⚪ unknown | Structured diff for text/JSON/CSV/Markdown |
| [dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) | 2 | ⚪ unknown | base64/hex/url codec + hash tool |
| [dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) | 2 | ⚪ unknown | JMESPath JSON query tool |
| [dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) | 2 | ⚪ unknown | HTML↔Markdown conversion, GFM table normalization |
| [dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) | 2 | ⚪ unknown | Regex test/capture/safe-replace tool |
| [dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) | 2 | ⚪ unknown | JSON Schema validation tool |
| [dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) | 2 | ⚪ unknown | Descriptive stats / percentile / correlation tool |
| [dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) | 2 | ⚪ unknown | ISO 8601 / timezone / calendar math tool |
| [dsh-trace](https://github.com/vibeinging/dsh-trace) | 2 | ⚪ unknown | Telemetry backend exporting turns/steps/tools |
| [sandbox-micro](https://github.com/omdsh-dev/sandbox-micro) | 2 | ⚪ unknown | microsandbox support |
| [zotero-harvest](https://github.com/Fisfzy/zotero-harvest) | 3 | ⚪ unknown | Zotero harvest plugin (OpenAlex/arXiv/Crossref) |
| [dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) | 5 | ⚪ unknown | Ops toolkit: daily snapshot A/B slots, one-click rollback |
| [dsh-inspect](https://github.com/omdsh-dev/dsh-inspect) | 2 | ⚪ unknown | Adversarial checkup→fix→review loop plugin |
| [dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) | 4 | ⚪ unknown | OpenMAIC: classrooms, slides, interactive widgets |
| [dsh-plugin-mineru](https://github.com/HuanLinOTO/dsh-plugin-mineru) | 5 | ⚪ unknown | MineRU document parsing tools |
| [dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) | 2 | ⚪ unknown | Edit user & system prompt sections (live preview) |
| [dsh-scholar](https://github.com/lzszq/dsh-scholar) | 4 | ⚪ unknown | dsh-scholar (literature) |
| [dsh-ssh](https://github.com/UynajGI/dsh-ssh) | 1 | ⚪ unknown | SSH remote-execution: ProxyJump chain, SFTP |
| [dsh-tool-search](https://github.com/vibeinging/dsh-tool-search) | 1 | ⚪ unknown | Per-agent on-demand tool discovery + progressive schema |
| [dsh-webbridge](https://github.com/bill9109/dsh-webbridge) | 1 | ⚪ unknown | DSH + Kimi WebBridge |
| [ego-browser](https://github.com/Fisfzy/ego-browser) | 4 | ⚪ unknown | Bridge ego-lite Chromium browser into DSH |
| [math-lean](https://github.com/Fisfzy/math-lean) | 1 | ⚪ unknown | Lean kernel-verified math reasoning plugin |
| [plugin-template](https://github.com/omdsh-dev/plugin-template) | 4 | ⚪ unknown | Plugin template derived from the official turtle ui repo |
| [Qwen-MM-Plugins](https://github.com/omdsh-dev/Qwen-MM-Plugins) | 1 | ⚪ unknown | Qwen-MM-Plugins support |
| [sandbox-mxc](https://github.com/omdsh-dev/sandbox-mxc) | 1 | ⚪ unknown | Microsoft cross-platform sandbox support |
| [sandbox-nono](https://github.com/omdsh-dev/sandbox-nono) | 2 | ⚪ unknown | nono sandbox support |
| [web-components](https://github.com/omdsh-dev/web-components) | 1 | ⚪ unknown | web-components support |
| [zotero-wave-rag](https://github.com/Fisfzy/zotero-wave-rag) | 1 | ⚪ unknown | Wave-RAG retrieval for Zotero paper library |
| [modsearch](https://github.com/liustack/modsearch) | 65 | ⚪ unknown | Web search plugin for DeepSeek Harness. |
| [dsh-browser](https://github.com/Lum1104/dsh-browser) | 33 | ⚪ unknown | Chrome sidebar extension letting DSH drive the browser. |
| [dsh-openapi](https://github.com/Degurechaff57/dsh-openapi) | 4 | ⚪ unknown | Safe OpenAPI 3.x discovery & API calling tools. |
| [dsh-better-browser](https://github.com/titanwings/dsh-better-browser) | 3 | ⚪ unknown | Let agents drive the logged-in browser via Kimi WebBridge. |
| [dsh-worktree](https://github.com/FlashingChen/dsh-worktree) | 3 | ⚪ unknown | Codex-style permanent git worktrees plugin. |
| [graycode-for-dsh](https://github.com/Komeiji-Shiki/graycode-for-dsh) | 3 | ⚪ unknown | graycode encoding tool. |
| [dsh-expression](https://github.com/yyh-001/dsh-expression) | 2 | ⚪ unknown | dsh-expression — DSH plugin (tools) |
| [dsh-director-toolkit](https://github.com/lhmd/dsh-director-toolkit) | 2 | ⚪ unknown | DSH Director Toolkit is a DeepSeek Harness plugin for 3D artists, technical designers, and creative coders. Paste a half-formed i… |
| [codex-plugin-dsh](https://github.com/wingoo/codex-plugin-dsh) | 2 | ⚪ unknown | Use local Codex App Server as a model provider in DeepSeek Harness |
| [dsh-prompt-persona](https://github.com/Xilin3/dsh-prompt-persona) | 2 | ⚪ unknown | DSH plugin: edit the system prompt (deployment persona) from the Settings page, with live preview. |
| [dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) | 2 | ⚪ unknown | Declarative deny-by-default tool policy plugin for DeepSeek Harness |
| [dsh-plugin-graph](https://github.com/erduotong/dsh-plugin-graph) | 2 | ⚪ unknown | dsh-plugin-graph — DSH plugin (tools) |
| [dsh-research-notes](https://github.com/fff122/dsh-research-notes) | 2 | ⚪ unknown | A lightweight research notes plugin for DeepSeek Harness |
| [nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) | 2 | ⚪ unknown | Nowledge Mem community plugin bundle for DeepSeek Harness |
| [dsh-vsc-integration](https://github.com/HarcoChen/dsh-vsc-integration) | 2 | ⚪ unknown | Deepseek-Harness Vscode Integration |
| [dsh-safe-delete](https://github.com/Qintsg/dsh-safe-delete) | 2 | ⚪ unknown | Safe delete plugin for DeepSeek Harness (DSH): move files to trash / staging area instead of permanent removal, with restore and… |
| [dsh-plugins](https://github.com/HackSing/dsh-plugins) | 2 | ⚪ unknown | A bilingual, continuously maintained directory of plugins for DeepSeek Harness (DSH). |
| [dsh-report-html](https://github.com/hccccc01333/dsh-report-html) | 2 | ⚪ unknown | Generate self-contained interactive HTML reports from Markdown, tables, charts, China province maps, flowcharts, math, and drill-… |
| [dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) | 2 | ⚪ unknown | OpenAI Codex OAuth login and usage card plugin for DeepSeek Harness |
| [dsh-github-connector](https://github.com/kaziii/dsh-github-connector) | 2 | ⚪ unknown | GitHub connector for DeepSeek Harness (dsh): one-click connect, create/review/merge PRs from the conversation |
| [deepseek-pet](https://github.com/keleus/deepseek-pet) | 2 | ⚪ unknown | deepseek-pet — DSH plugin (tools) |
| [dsh-index](https://github.com/Sunrisepeak/dsh-index) | 2 | ⚪ unknown | DeepSeek Harness Plugin Package Index - Install dsh-plugin with just one command |
| [dsh-web-search-firecrawl](https://github.com/yangzhe1003/dsh-web-search-firecrawl) | 2 | ⚪ unknown | Firecrawl-backed search provider plugin for the DeepSeek Harness web capability seam (ctx.web) |
| [dsh-plugin-template](https://github.com/bugmaker2/dsh-plugin-template) | 2 | ⚪ unknown | Template for deepseek-harness plugin development. |
| [dsh-composer-history](https://github.com/PerryLink/dsh-composer-history) | 1 | ⚪ unknown | Terminal-style input history for the DeepSeek Harness web composer - edge-first arrow keys, draft stashing with exact restore, Es… |
| [dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) | 1 | ⚪ unknown | dsh-fun-ticker — DSH plugin (tools) |
| [jumpserver-dsh](https://github.com/jumpserver-east/jumpserver-dsh) | 1 | ⚪ unknown | DeepSeek Harness plugin: manage JumpServer assets and operate on them through KoKo |
| [dsh-browser](https://github.com/ben7am1n/dsh-browser) | 1 | ⚪ unknown | Playwright-powered browser automation for DeepSeek Harness |
| [dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) | 1 | ⚪ unknown | AI turns repeated dev commands, prompts, and habits into one-click DeepSeek Harness actions. |
| [dsh-plugin-doctor](https://github.com/lin-cheng-lab/dsh-plugin-doctor) | 1 | ⚪ unknown | dsh-plugin-doctor — DSH plugin (tools) |
| [deepseek-harness-background](https://github.com/czzzlq/deepseek-harness-background) | 1 | ⚪ unknown | deepseek-harness背景自定义 |
| [task-passport](https://github.com/dongsheng123132/task-passport) | 1 | ⚪ unknown | Open task handoff protocol for DeepSeek Harness, WorkBuddy, Claude Code and Codex — verified state, not chat logs |
| [dsh-prompt-presets](https://github.com/fff122/dsh-prompt-presets) | 1 | ⚪ unknown | Local reusable prompt presets for DeepSeek Harness. |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 1 | ⚪ unknown | Cloudflare full-stack pnpm monorepo |
| [dsh-plugin-colorscheme](https://github.com/Civitasv/dsh-plugin-colorscheme) | 1 | ⚪ unknown | Colorscheme Plugin For DeepSeek Harness |
| [dsh-scout](https://github.com/omdsh-dev/dsh-scout) | 1 | ⚪ unknown | dsh-scout — DSH plugin (tools) |
| [dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) | 1 | ⚪ unknown | DSH plugin: pixel-diff two screenshots into diff.png + triptych (pixelmatch) — 像素对比工具 |
| [dsh-turn-index](https://github.com/Simon314620/dsh-turn-index) | 1 | ⚪ unknown | dsh-turn-index — DSH plugin (tools) |
| [dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) | 1 | ⚪ unknown | DSH plugin for controlling mobile devices (ADB/iOS) — DeepSeek Harness 操控手机插件 |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 1 | ⚪ unknown | Cloudflare full-stack pnpm monorepo |
| [dsh-tool-monitor](https://github.com/yoke233/dsh-tool-monitor) | 1 | ⚪ unknown | Monitor existing DeepSeek Harness background jobs without running commands twice |
| [dsh-suggest-prompt](https://github.com/studyzy/dsh-suggest-prompt) | 1 | ⚪ unknown | dsh-plugin suggest next prompt |
| [dsh-cloudflare-browser-run](https://github.com/RealAlexandreAI/dsh-cloudflare-browser-run) | 1 | ⚪ unknown | dsh browser-run: CF Browser Run web tools (markdown/screenshot/pdf) for DeepSeek Harness |
| [safe-find-dsh-plugins](https://github.com/Jinsong-Zhou/safe-find-dsh-plugins) | 1 | ⚪ unknown | Discover and install the best DeepSeek Harness plugins for a user's task |
| [dsh-all-search](https://github.com/RealAlexandreAI/dsh-all-search) | 1 | ⚪ unknown | dsh search: AnySearch web search provider for DeepSeek Harness (ctx.web) |
| [dsh-plugin-pixluna](https://github.com/PixLunaLab/dsh-plugin-pixluna) | 1 | ⚪ unknown | dsh-plugin-pixluna | 让 DSH 自己看涩图！ |
| [dsh-plugins-hub](https://github.com/TYEclipse/dsh-plugins-hub) | 1 | ⚪ unknown | Independent plugin index for DeepSeek Harness (dsh) — curated directory of community plugins, updated daily |
| [dsh-huadongbianzuqi](https://github.com/zjl88858/dsh-huadongbianzuqi) | 1 | ⚪ unknown | dsh-huadongbianzuqi — DSH plugin (tools) |
| [dsh-soul-md](https://github.com/Scorp1o117/dsh-soul-md) | 1 | ⚪ unknown | Soul.md persona for DeepSeek Harness | DeepSeek Harness 人设卡插件 |
| [dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) | 1 | ⚪ unknown | DSH daily fortune plugin with Guan Yin lots, Tarot spreads, and daily quotes |
| [dsh-plugin-rag](https://github.com/YYTbit/dsh-plugin-rag) | 1 | ⚪ unknown | Local knowledge base RAG for DeepSeek Harness |
| [dsh-model-selector](https://github.com/bitterSmilezzz/dsh-model-selector) | 1 | ⚪ unknown | DeepSeek Harness web plugin: provider-group collapse + name search for the conversation model picker. |
| [dsh-github](https://github.com/PerryLink/dsh-github) | 1 | ⚪ unknown | GitHub integration for DeepSeek Harness: create PRs, review PRs in background jobs, read issues - every write gated by human appr… |
| [dsh-plugin-review](https://github.com/Mingxi2077/dsh-plugin-review) | 1 | ⚪ unknown | DSH Review Mode plugin: multi-dimension code health scoring + radar chart + review history (DSH 审查模式插件) |
| [dsh-turn-budget](https://github.com/randerous/dsh-turn-budget) | 1 | ⚪ unknown | Advisory turn step-budget reminders for DeepSeek Harness — loop convergence guard (dsh-plugin) |
| [DIzzy-DSH](https://github.com/Acidmoon/DIzzy-DSH) | 1 | ⚪ unknown | My DSH plugins |
| [dsh-file-explorer](https://github.com/schhaohao/dsh-file-explorer) | 1 | ⚪ unknown | dsh-file-explorer |
| [dsh-tool-reqpipe](https://github.com/sikwoxy/dsh-tool-reqpipe) | 1 | ⚪ unknown | reqpipe — DeepSeek Harness 需求流水线插件（7 tools）+ Python CLI（需求→方案→评审→开发） |
| [dsh-ajw](https://github.com/rsagacom/dsh-ajw) | 1 | ⚪ unknown | dsh-ajw — DSH plugin (tools) |
| [dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) | 1 | ⚪ unknown | DSH Typewriter: WebAudio typing ambience with a plugin-owned settings API and zero audio assets |
| [dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) | 1 | ⚪ unknown | DSH plugin: triage port conflicts (reuse / switch / precise kill) — 端口占用处置 |
| [qiushi-dsh-evidence-audit](https://github.com/030611/qiushi-dsh-evidence-audit) | 1 | ⚪ unknown | Observe-only hash-chained evidence receipts for DeepSeek Harness |
| [dsh-plugin.github.io](https://github.com/dsh-plugin/dsh-plugin.github.io) | 1 | ⚪ unknown | DeepSeek Harness community plugin workshop and directory |
| [dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) | 1 | ⚪ unknown | DeepSeek Harness: Weixin |
| [dsh-lens-lite](https://github.com/ben7am1n/dsh-lens-lite) | 1 | ⚪ unknown | Post-edit diagnostics for DeepSeek Harness |
| [dsh-tavily-search](https://github.com/zhouzhencheng07/dsh-tavily-search) | 1 | ⚪ unknown | Free keyless Tavily web search tool for DeepSeek Harness (dsh) |
| [dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) | 1 | ⚪ unknown | DSH Web client plugin: pins off-screen expanded collapsible tags (Think / tool cards) to the top of the conversation viewport wit… |
| [dsh-openai-codex-oauth](https://github.com/dyuan311/dsh-openai-codex-oauth) | 1 | ⚪ unknown | ChatGPT subscription OAuth for the openai-codex provider in DeepSeek Harness |
| [dshx](https://github.com/why913/dshx) | 1 | ⚪ unknown | The missing companion CLI for DeepSeek Harness (dsh): manage MCP servers with dry-run checks, migrate from Claude Code / Codex in… |
| [dsh-reloader](https://github.com/lin-cheng-lab/dsh-reloader) | 1 | ⚪ unknown | dsh-reloader — DSH plugin (tools) |
| [dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) | 1 | ⚪ unknown | DSH plugin: bisect bugs (code / boundary / commit) — 二分法定位 bug 根因 |
| [dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) | 1 | ⚪ unknown | dsh-auto-chess — DSH plugin (tools) |
| [dsh-turn-meta](https://github.com/randerous/dsh-turn-meta) | 1 | ⚪ unknown | Opt-in per-step turn metadata for DeepSeek Harness — a minimal first-plugin template (dsh-plugin) |
| [dsh-tool-browser](https://github.com/MashedPotato817/dsh-tool-browser) | 1 | ⚪ unknown | Native browser automation tools for DeepSeek Harness, powered by Playwright + Edge |
| [dsh-music-plugin](https://github.com/syy-shark/dsh-music-plugin) | 1 | ⚪ unknown | DeepSeek Harness music plugin (dsh-plugin) |
| [dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) | 1 | ⚪ unknown | DSH plugin: run a command N rounds, judge by median/distribution — 批量回归取统计结论 |
| [dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) | 1 | ⚪ unknown | DSH plugin for controlling browsers (CDP/Playwright) — DeepSeek Harness 操控浏览器插件 |
| [dsh-code-ide](https://github.com/SakalioLabs/dsh-code-ide) | 1 | ⚪ unknown | DeepSeek Harness Code IDE Plugin |
| [matlab-modelsim-vivado-plugin](https://github.com/sjscy05/matlab-modelsim-vivado-plugin) | 1 | ⚪ unknown | DeepSeek Harness plugin: MATLAB + ModelSim + Vivado full-flow tools for digital communication IC design tasks (mmv-dspic) |
| [dsh-codex](https://github.com/Yan-Zero/dsh-codex) | 1 | ⚪ unknown | Use your ChatGPT subscription in DeepSeek Harness through OpenAI's Codex sign-in flow |
| [dsh-plugins](https://github.com/0sour/dsh-plugins) | 0 | ⚪ unknown | DeepSeek Harness (dsh) plugins by 0sour - ???? (dsh-plugin topic) |
| [dsh-2origin](https://github.com/dongsheng123132/dsh-2origin) | 0 | ⚪ unknown | Evidence-first 2Origin state projection, diff and immutable freeze for DeepSeek Harness |
| [dsh-terminal](https://github.com/ZgblKylin/dsh-terminal) | 0 | ⚪ unknown | Integrate terminal plugin for DeepSeek Harness |
| [dsh-survey](https://github.com/jinhuang712/dsh-survey) | 0 | ⚪ unknown | dsh-survey — DSH plugin (tools) |
| [deepseek-harness-plugin-manager](https://github.com/hrhgit/deepseek-harness-plugin-manager) | 0 | ⚪ unknown | Web plugin manager for DeepSeek Harness (DSH): inspect, search, group, enable, and disable Cordis plugins. |
| [dsh-co-authored-by](https://github.com/shelken/dsh-co-authored-by) | 0 | ⚪ unknown | dsh plugin: auto-inject Co-Authored-By and Generated-By trailers on git commit |
| [DSH-Plugs](https://github.com/JustGenius-s/DSH-Plugs) | 0 | ⚪ unknown | DSH Plugins Cellection |
| [dsh-host-web-compat](https://github.com/kelai141/dsh-host-web-compat) | 0 | ⚪ unknown | dsh-host-web-compat — DSH plugin (tools) |
| [dsh-doctor](https://github.com/jorinyang/dsh-doctor) | 0 | ⚪ unknown | DeepSeek Harness environment diagnostic tool: dsh_doctor checks env, profile, config, bundles, mount, port, health, and disk |
| [dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) | 0 | ⚪ unknown | Symbol-aware code indexing and hybrid search for DeepSeek Harness. |
| [dsh-doctor](https://github.com/asdf17128/dsh-doctor) | 0 | ⚪ unknown | Find what your DeepSeek Harness (dsh) patches silently broke — dead patches, config fields dropped by whole-config replacement, u… |
| [dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) | 0 | ⚪ unknown | DeepSeek Harness（DSH）备份/恢复 + 跨机同步插件：本地快照、WebDAV 推送/拉取、自动备份与失效归档清理。Snapshot backup, restore and cross-machine sync plugin for Deep… |
| [dsh-auto](https://github.com/simon300000/dsh-auto) | 0 | ⚪ unknown | dsh Auto Approve |
| [dsh-annotate](https://github.com/BrambleXu/dsh-annotate) | 0 | ⚪ unknown | Visual browser element annotation for DeepSeek Harness, capturing DOM, styles, accessibility data, comments, and viewport screens… |
| [dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) | 0 | ⚪ unknown | ChatGPT OAuth and Codex models for DeepSeek Harness. |
| [DSH-Decktop](https://github.com/JustGenius-s/DSH-Decktop) | 0 | ⚪ unknown | DSH-Decktop |
| [dsh-cad-review](https://github.com/dongsheng123132/dsh-cad-review) | 0 | ⚪ unknown | Evidence-first ASCII DXF inspection and deterministic CAD rule review for DeepSeek Harness |
| [dsh-xai](https://github.com/MirDie/dsh-xai) | 0 | ⚪ unknown | xAI Grok SuperGrok / X Premium OAuth for DeepSeek Harness |
| [dsh-academic-research](https://github.com/userInner/dsh-academic-research) | 0 | ⚪ unknown | Evidence-grounded bilingual academic research plugin for DeepSeek Harness and OnPeople |
| [dsh-plugin-hello](https://github.com/xu1132/dsh-plugin-hello) | 0 | ⚪ unknown | A minimal DeepSeek Harness community plugin that registers a callable hello tool |
| [deepseek-harness-rs](https://github.com/Tokimorphling/deepseek-harness-rs) | 0 | ⚪ unknown | A rust port for deepseek's harness |
| [dsh-prompt-enhancer](https://github.com/Fishsb/dsh-prompt-enhancer) | 0 | ⚪ unknown | dsh-prompt-enhancer — DSH plugin (tools) |
| [dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) | 0 | ⚪ unknown | Specification-driven development toolkit for DeepSeek Harness. |
| [dsh-plugins](https://github.com/ohtokaah-sys/dsh-plugins) | 0 | ⚪ unknown | DSH plugins by ohtokaah-sys: 行为宪法 / 协作模式 / 机械门禁 (tagged dsh-plugin) |
| [dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) | 0 | ⚪ unknown | Privacy-minimal heuristic per-turn verification summaries for DeepSeek Harness |
| [dsh-tool-chaos](https://github.com/cyanseek/dsh-tool-chaos) | 0 | ⚪ unknown | Deterministic fault injection and autonomous resilience tests for DeepSeek Harness tools |
| [dsh-robotic-harness](https://github.com/dingkaihu63/dsh-robotic-harness) | 0 | ⚪ unknown | Robotic Harness: embodied-intelligence research tools for DeepSeek Harness - robot asset inspection, MuJoCo pick-place simulation… |
| [dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) | 0 | ⚪ unknown | Cache-aware ChatGPT / Codex subscription plugin for DeepSeek Harness |
| [dsh-sticky-note](https://github.com/Meredith2328/dsh-sticky-note) | 0 | ⚪ unknown | dsh-sticky-note — DSH plugin (tools) |
| [dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) | 0 | ⚪ unknown | DeepSeek Harness 3D 角色生成插件：直连 Meshy / Hunyuan3D / Tripo3D / Rodin 官方 API，自配 key，mock 回退 |
| [dsh-mdbox](https://github.com/Chi-hong22/dsh-mdbox) | 0 | ⚪ unknown | DeepSeek Harness (DSH) Web 输入框的 Markdown 编辑辅助插件。 |
| [dsh-kanban](https://github.com/isolat-3k/dsh-kanban) | 0 | ⚪ unknown | dsh-kanban — DSH plugin (tools) |
| [dsh-tool-git](https://github.com/lxj808624/dsh-tool-git) | 0 | ⚪ unknown | Structured safe Git tools for DeepSeek Harness (dsh): git_status/diff/log/branch/stage/commit/stash/show + destructive-command gu… |
| [dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) | 0 | ⚪ unknown | Move the info bar at the bottom of the chat to next to the title |
| [dsh-mcp-manager](https://github.com/1a125/dsh-mcp-manager) | 0 | ⚪ unknown | DSH global MCP manager |
| [dsh-tray](https://github.com/qing3a/dsh-tray) | 0 | ⚪ unknown | DeepSeek Harness Windows 系统托盘插件（trayicon exe 宿主，无 native 编译） |

### 🧩 Skills

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) | 4 | ⚪ unknown | Agent skills for building & testing DSH plugins. |
| [dsh-plugin-codex-bridge](https://github.com/YYTbit/dsh-plugin-codex-bridge) | 2 | ⚪ unknown | Bridge codex skills and config into DeepSeek Harness |
| [dsh-plugin-opencode-bridge](https://github.com/YYTbit/dsh-plugin-opencode-bridge) | 2 | ⚪ unknown | Bridge opencode skills and config into DeepSeek Harness |
| [dsh-plugin-pi-bridge](https://github.com/YYTbit/dsh-plugin-pi-bridge) | 2 | ⚪ unknown | Bridge pi skills and config into DeepSeek Harness |
| [dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) | 2 | ⚪ unknown | dsh plugin: DeepSeek Harness 的模型层 = raincode(模型池/缓存/重试) + /skills 浏览 |
| [dsh-skill-manager](https://github.com/bitterSmilezzz/dsh-skill-manager) | 1 | ⚪ unknown | Skills management page for DeepSeek Harness Web Settings (dsh plugin) |
| [dsh-plugin-auto-docs](https://github.com/YYTbit/dsh-plugin-auto-docs) | 1 | ⚪ unknown | Auto documentation generation skill for DeepSeek Harness |
| [dsh-plugin-code-review](https://github.com/YYTbit/dsh-plugin-code-review) | 1 | ⚪ unknown | Structured code review skill for DeepSeek Harness |
| [dsh-find-skill](https://github.com/Moximxxx/dsh-find-skill) | 1 | ⚪ unknown | dsh plugin bridging the vercel-labs/skills ecosystem: LLM-driven skill search, install, and lifecycle for temp/project/global sco… |
| [spike-faye-lei-dsh-skills](https://github.com/spike-faye-lei/spike-faye-lei-dsh-skills) | 1 | ⚪ unknown | spike-faye-lei/dsh-skills |
| [dsh-academic-skill](https://github.com/TohsakaRIN521/dsh-academic-skill) | 1 | ⚪ unknown | dsh-academic-skill — DSH plugin (skills) |
| [dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) | 0 | ⚪ unknown | DeepSeek Harness plugin for the SeismicX earthquake-catalog skill |
| [rpg-maker-mac-skill](https://github.com/HomophonicFate/rpg-maker-mac-skill) | 0 | ⚪ unknown | DeepSeek Harness skill：macOS 上运行 RPG Maker MV/MZ 游戏并集成 MTool 翻译文件 |
| [dsh-skill-manager](https://github.com/JimmyJin2006/dsh-skill-manager) | 0 | ⚪ unknown | dsh-skill-manager — DSH plugin (skills) |

### 🎨 UI

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 654 | ⚪ unknown | DSH Web UI plugin & skin collection: task board, git panel, etc. |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 207 | ⚪ unknown | Sidebar workbench: file render/terminal/git/subagent |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 21 | ⚪ unknown | Customize the whale-girl thinking-status label |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 159 | ⚪ unknown | DSH Web whale-girl skin series |
| [dsh-focus-chat](https://github.com/dingyi222666/dsh-focus-chat) | 7 | ⚪ unknown | Focused-chat minimal session view |
| [dsh-side-panel](https://github.com/ccq1/dsh-side-panel) | 9 | ⚪ unknown | DSH side panel: file browser, terminal, git review |
| [dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) | 6 | ⚪ unknown | Session progress bar: todos progress + live token rate |
| [dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) | 17 | ⚪ unknown | Hand-drawn pixel whale companion |
| [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) | 19 | ⚪ unknown | Selection annotation: select→annotate→send |
| [dsh-chat-width](https://github.com/chen-001/dsh-chat-width) | 3 | ⚪ unknown | Adjust the width of dsh's reply |
| [dsh-companion](https://github.com/william-jin-cmu/dsh-companion) | 3 | ⚪ unknown | Resident desktop companion: global hotkey/automation/plugin market |
| [dsh-genui](https://github.com/omdsh-dev/dsh-genui) | 20 | ⚪ unknown | Inline interactive UI components in chat |
| [dsh-input-history](https://github.com/lhh010/dsh-input-history) | 3 | ⚪ unknown | Input history: Ctrl+Up/Down to recall sent messages |
| [dsh-navbar](https://github.com/vlln/dsh-navbar) | 4 | ⚪ unknown | Conversation node navbar |
| [dsh-paste-input](https://github.com/lhh010/dsh-paste-input) | 5 | ⚪ unknown | Paste/drag/drop file input enhancement |
| [dsh-plugin-background](https://github.com/gameswu/dsh-plugin-background) | 3 | ⚪ unknown | DSH wallpaper plugin |
| [tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) | 2 | ⚪ unknown | 仿同花顺的webui插件 |
| [dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) | 3 | ⚪ unknown | Excel-style DSH skin |
| [dsh-deeplink](https://github.com/qyw233/dsh-deeplink) | 1 | ⚪ unknown | Deep-link plugin: open session/workspace directly |
| [dsh-diff-viewer](https://github.com/lehhair/dsh-diff-viewer) | 2 | ⚪ unknown | PiUI-style diff viewer replacing the stock DiffBlock |
| [dsh-drag-and-drop](https://github.com/bill9109/dsh-drag-and-drop) | 1 | ⚪ unknown | Cross-platform file drag & drop with raw path insertion |
| [dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) | 3 | ⚪ unknown | QQ2006 skin plugin |
| [dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) | 2 | ⚪ unknown | Session completion + 4-state notifications |
| [dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | 1 | ⚪ unknown | Keyboard-first command palette |
| [dsh-ths-skin](https://github.com/AdamPlatin123/dsh-ths-skin) | 0 | ⚪ unknown | THS terminal-style skin + K-line panel |
| [dsh-tps](https://github.com/Small-tailqwq/dsh-tps) | 1 | ⚪ unknown | TPS skin plugin |
| [dsh-ultra-ui](https://github.com/havingautism/dsh-ultra-ui) | 1 | ⚪ unknown | (no description) |
| [dsh-web-ui-notify](https://github.com/bill9109/dsh-web-ui-notify) | 4 | ⚪ unknown | Desktop notifications for DSH |
| [ex-setting](https://github.com/omdsh-dev/ex-setting) | 1 | ⚪ unknown | DSH settings extension |
| [whale-girl](https://github.com/vlln/whale-girl) | 31 | ⚪ unknown | QQ-pet-style desktop pet plugin |
| [dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) | 4 | ⚪ unknown | Web plugin replacing the DSH status display. |
| [dsh-ramify](https://github.com/yanglongyun/dsh-ramify) | 3 | ⚪ unknown | Creative branching canvas: tree workspaces for generation & compare. |
| [dsh-xiaohei](https://github.com/opensetk/dsh-xiaohei) | 3 | ⚪ unknown | Luo Xiaohei skin plugin for dsh. |
| [dsh-xiaoyao-skins](https://github.com/147228/dsh-xiaoyao-skins) | 3 | ⚪ unknown | DSH Web skin collection, installer & authoring toolchain. |
| [dsh-wikilink](https://github.com/zhaoscsc/dsh-wikilink) | 2 | ⚪ unknown | Obsidian-style [[wikilink]] mentions for the DeepSeek Harness web GUI: fuzzy-search note titles and attach their contents to the… |
| [deepseek-harness-skin](https://github.com/HeiGeAi/deepseek-harness-skin) | 2 | ⚪ unknown | deepseek-harness-skin — DSH plugin (ui) |
| [dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) | 2 | ⚪ unknown | Replace dsh's built-in web search with search MCP servers (Tavily/Brave/Exa/Perplexity/DuckDuckGo/custom), configured from the we… |
| [dsh-kanban](https://github.com/Ericwong5021/dsh-kanban) | 2 | ⚪ unknown | Task board plugin for the DeepSeek Harness Web UI |
| [dsh-event-auditor](https://github.com/qing3a/dsh-event-auditor) | 1 | ⚪ unknown | dsh-event-auditor — DSH plugin (ui) |
| [dsh-web-search-tavily](https://github.com/crayonlu/dsh-web-search-tavily) | 1 | ⚪ unknown | Tavily-backed web search provider for DeepSeek Harness (ctx.web) — no DeepSeek API key required |
| [dsh-pet](https://github.com/FlytoMAYDAY80/dsh-pet) | 1 | ⚪ unknown | dsh-pet — DSH plugin (ui) |
| [dsh-miku-skin](https://github.com/stushansusu/dsh-miku-skin) | 1 | ⚪ unknown | dsh-miku-skin — DSH plugin (ui) |
| [dsh-ui-workbench](https://github.com/LoftyTao/dsh-ui-workbench) | 1 | ⚪ unknown | dsh-ui-workbench — DSH plugin (ui) |
| [dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) | 1 | ⚪ unknown | DSH weather tab and weather-following themes powered by Open-Meteo |
| [dsh-test-runner](https://github.com/suimi8/dsh-test-runner) | 1 | ⚪ unknown | DSH plugin: structured test runner tool (test_run) — auto-detect vitest/jest/pytest/node:test, run tests, parse failure summaries… |
| [dsh-web-search-firecrawl](https://github.com/crayonlu/dsh-web-search-firecrawl) | 1 | ⚪ unknown | Firecrawl-backed web search provider for DeepSeek Harness (ctx.web) — no DeepSeek API key required |
| [dsh-web-background](https://github.com/BruceWu1126/dsh-web-background) | 1 | ⚪ unknown | DeepSeek Harness Web UI background customization plugin |
| [dsh-skins](https://github.com/Moeblack/dsh-skins) | 1 | ⚪ unknown | Mirror of dsh-external/dsh-skins + feat: harbor (夕港) dusk-harbor skin |
| [dsh-portable-tavern](https://github.com/XCNXNXNX/dsh-portable-tavern) | 1 | ⚪ unknown | dsh-portable-tavern — DSH plugin (ui) |
| [dsh-builtin-toggles](https://github.com/Starfie1d1272/dsh-builtin-toggles) | 0 | ⚪ unknown | Safe GUI toggles for optional built-in plugins in DeepSeek Harness Web. |
| [dsh-science](https://github.com/omdsh-dev/dsh-science) | 0 | ⚪ unknown | Reproducible Python and R work on DeepSeek Harness, built as plugins. |
| [dsh-skin](https://github.com/KinGao294/dsh-skin) | 0 | ⚪ unknown | Skin switcher + custom wallpaper for DeepSeek Harness (dsh): curated --dsw-alias-* palettes, translucent wallpaper with opacity/b… |
| [dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) | 0 | ⚪ unknown | dsh-pomodoro — DSH plugin (ui) |
| [dsh-theme-neko](https://github.com/drfccv/dsh-theme-neko) | 0 | ⚪ unknown | A Nachoneko (甘城猫猫) themed skin for the DeepSeek Harness web GUI. |
| [dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) | 0 | ⚪ unknown | DeepSeek Harness plugin for generating synchronized K12 English PPTX and DOCX lesson materials |
| [dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) | 0 | ⚪ unknown | Attention reminders for the DeepSeek Harness Web UI: frame badge, (N) tab title and whale-favicon recolor for sessions waiting fo… |
| [harness-whale](https://github.com/cakeni/harness-whale) | 0 | ⚪ unknown | Unofficial community pet for DeepSeek Harness — a native DSH web plugin |
| [dsh-conversation-indicator](https://github.com/smanx/dsh-conversation-indicator) | 0 | ⚪ unknown | Conversation indicator plugin for the DeepSeek Harness web GUI: a compact rail beside the scrollbar marks each user message; hove… |
| [dsh-black-whale](https://github.com/147228/dsh-black-whale) | 0 | ⚪ unknown | dsh-black-whale — DSH plugin (ui) |
| [dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) | 0 | ⚪ unknown | Community plugins for DeepSeek Harness (DSH) |
| [dsh-client-ui-responsive](https://github.com/kelai141/dsh-client-ui-responsive) | 0 | ⚪ unknown | dsh-client-ui-responsive — DSH plugin (ui) |
| [dsh-ui-skins](https://github.com/edwardyang0011/dsh-ui-skins) | 0 | ⚪ unknown | DeepSeek Harness Skin Plugin |
| [nightwhale](https://github.com/nightwhale-dev/nightwhale) | 0 | ⚪ unknown | nightwhale — DSH plugin (ui) |

### 💬 Session

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [pi-discuss-mode](https://github.com/zwrong/pi-discuss-mode) | 11 | ⚪ unknown | Read-only discussion mode for Pi Coding Agent |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 23 | ⚪ unknown | Rewind conversation and workspace state |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 12 | ⚪ unknown | DSH conversation sharing plugin |
| [dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) | 13 | ⚪ unknown | Branch-based message editing, reroll, version timeline |
| [dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) | 5 | ⚪ unknown | Context injection audit: AGENTS.md/skills/tool-schema token cost |
| [dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) | 7 | ⚪ unknown | Frame-level scan diagnostics for zstd session files |
| [dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) | 3 | ⚪ unknown | Self-evolution: agent grows/prunes its own abilities |
| [dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) | 17 | ⚪ unknown | Cross-session long-term memory + background self-evolution |
| [dsh-web-archive](https://github.com/renat3u/dsh-web-archive) | 3 | ⚪ unknown | Fold noisy messages (Think/Bash) in conversation |
| [deepseek-manners](https://github.com/Moeblack/deepseek-manners) | 2 | ⚪ unknown | Inject gratitude into every message |
| [dsh-agent-budget](https://github.com/vibeinging/dsh-agent-budget) | 1 | ⚪ unknown | Native agent-tree token budget plugin |
| [dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) | 1 | ⚪ unknown | Share any segment of a DSH conversation |
| [dsh-kb-sieve](https://github.com/omdsh-dev/dsh-kb-sieve) | 1 | ⚪ unknown | Auditable knowledge-base packs (references + SQLite) |
| [dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) | 2 | ⚪ unknown | Local-first failure postmortems |
| [dsh-session-search](https://github.com/Tieboyh/dsh-session-search) | 1 | ⚪ unknown | Index-free cross-agent session search |
| [dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) | 3 | ⚪ unknown | Side-chain sessions: /side persistent + /btw one-off |
| [dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) | 1 | ⚪ unknown | Manual approval (Manual/Ask mode) |
| [dsh-turn-navigator](https://github.com/vibeinging/dsh-turn-navigator) | 1 | ⚪ unknown | DSH Web turn navigation plugin |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Export the append-only session log as human-readable Markdown / HTML, grouped by trajectory source (system prompt / reasoning / t… |
| [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) | 5 | ⚪ unknown | Import chat history from Claude Code/Codex/Reasonix into DSH. |
| [dsh-stream-rules](https://github.com/jiesou/dsh-stream-rules) | 3 | ⚪ unknown | Inject rules on demand without wasting context. |
| [dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) | 3 | ⚪ unknown | LLM-free lossless compaction engine. |
| [dsh-recall](https://github.com/Mongfayi/dsh-recall) | 3 | ⚪ unknown | Message recall plugin for DSH Web UI. |
| [dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) | 2 | ⚪ unknown | Bridge Claude Code memory, skills, and config into DeepSeek Harness |
| [dsh-goal-mode-enhance](https://github.com/KarlOfLaw/dsh-goal-mode-enhance) | 2 | ⚪ unknown | dsh-goal-mode-enhance — DSH plugin (session) |
| [context-vista](https://github.com/GooodWei/context-vista) | 2 | ⚪ unknown | context-vista — DSH plugin (session) |
| [dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) | 2 | ⚪ unknown | DeepSeek Harness (dsh) plugin: migrate Claude Code sessions, memory, skills and CLAUDE.md into DSH with seamless resume (claude_s… |
| [dsh-ergonomics](https://github.com/hisaniwo/dsh-ergonomics) | 2 | ⚪ unknown | dsh-ergonomics — DSH plugin (session) |
| [dsh-model-config-sync](https://github.com/LiangYin233/dsh-model-config-sync) | 2 | ⚪ unknown | dsh-model-config-sync — DSH plugin (session) |
| [dsh-undo](https://github.com/LingLambda/dsh-undo) | 2 | ⚪ unknown | Context undo/redo plugin for DeepSeek Harness (dsh): roll the model context back to the last completed step and restore it again. |
| [dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) | 2 | ⚪ unknown | dsh-session-timeline — DSH plugin (session) |
| [dsh-plugins](https://github.com/Yihong89/dsh-plugins) | 2 | ⚪ unknown | DeepSeek Harness (DSH) plugins. First: dsh-usage-report — per-session token usage & estimated cost (/usage + usage_report), price… |
| [dsh-superpowers](https://github.com/codeAnqiang-ma/dsh-superpowers) | 2 | ⚪ unknown | Superpowers (obra/superpowers) as a DeepSeek Harness plugin: the methodology skills plus their session bootstrap |
| [billion-context-dsh](https://github.com/Tyan66666/billion-context-dsh) | 2 | ⚪ unknown | Model-driven context management (Active Context Pruning / ACP) for the DeepSeek Harness — the model decides when and what to comp… |
| [dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) | 1 | ⚪ unknown | Persistent pinned-session menu for DeepSeek Harness |
| [dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) | 1 | ⚪ unknown | dsh-cue-plugin — DSH plugin (session) |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 1 | ⚪ unknown | Bounded, layered, approval-gated, auditable cross-session memory for DeepSeek Harness (capability seam: ctx.memory + SQLite provi… |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 1 | ⚪ unknown | dsh-archive-viewer — DSH plugin (session) |
| [dsh-memory](https://github.com/ben7am1n/dsh-memory) | 1 | ⚪ unknown | Durable cross-session SQLite memory for DeepSeek Harness |
| [dsh-plugins](https://github.com/hyls9527/dsh-plugins) | 1 | ⚪ unknown | Ecosystem plugins for DeepSeek Harness: bounded cross-session memory and skill lifecycle curation, ported from hermes-agent. Tagg… |
| [dsh-opencode-usage](https://github.com/moduqishi/dsh-opencode-usage) | 1 | ⚪ unknown | DeepSeek Harness (dsh web) plugin: opencode.ai 5h/week/month quota usage progress in the session header, frosted-glass detail pan… |
| [dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) | 1 | ⚪ unknown | Aggregate and natively control multiple remote DeepSeek Harness (DSH) servers' sessions from one official Web UI — hub gateway +… |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 1 | ⚪ unknown | Bounded, layered, approval-gated, auditable cross-session memory for DeepSeek Harness (capability seam: ctx.memory + SQLite provi… |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 1 | ⚪ unknown | dsh-archive-viewer — DSH plugin (session) |
| [dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) | 1 | ⚪ unknown | OpenAI Codex provider for DeepSeek Harness with device-code OAuth, Codex CLI import, token refresh, and a web settings panel. |
| [dsh-memory](https://github.com/Jesse-njx/dsh-memory) | 1 | ⚪ unknown | Cited memory over DSH's lossless session log — distilled, human-auditable facts with citations back to the exact source events; m… |
| [dsh-workbench](https://github.com/echo-escape/dsh-workbench) | 1 | ⚪ unknown | dsh-workbench — DSH plugin (session) |
| [dsh-codex-import](https://github.com/918154429/dsh-codex-import) | 1 | ⚪ unknown | Read-only Codex setup compatibility scanner for DeepSeek Harness |
| [dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) | 1 | ⚪ unknown | Pin sessions in the DeepSeek Harness (DSH) web sidebar - dual-face plugin with a hover pin badge, durable pinning, and top orderi… |
| [dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) | 1 | ⚪ unknown | dsh-prompt-stash — DSH plugin (session) |
| [dsh-open-in-finder](https://github.com/moduqishi/dsh-open-in-finder) | 1 | ⚪ unknown | DeepSeek Harness (dsh web) plugin: one-click open-in-Finder icon in the session header. |
| [dsh-mcp-proxy](https://github.com/ben7am1n/dsh-mcp-proxy) | 1 | ⚪ unknown | Context-cheap lazy MCP access for DeepSeek Harness |
| [dsh-nocturne-memory](https://github.com/RealAlexandreAI/dsh-nocturne-memory) | 1 | ⚪ unknown | dsh memory: Nocturne Memory client for DeepSeek Harness |
| [dsh-balance](https://github.com/TwotwoPiggy/dsh-balance) | 1 | ⚪ unknown | A DeepSeek Harness plugin for real-time token tracking and highly accurate session cost estimation, featuring dynamic peak/off-pe… |
| [dsh-mneme](https://github.com/modusensus/dsh-mneme) | 1 | ⚪ unknown | dsh-mneme — DSH plugin (session) |
| [dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) | 1 | ⚪ unknown | dsh-cost-meter — DSH plugin (session) |
| [dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) | 1 | ⚪ unknown | DeepSeek Harness plugin integrating claude-mem (memory for dsh) |
| [dsh-revive](https://github.com/omdsh-dev/dsh-revive) | 1 | ⚪ unknown | dsh-revive — DSH plugin (session) |
| [dsh-plugin-wepre](https://github.com/shujiTech/dsh-plugin-wepre) | 1 | ⚪ unknown | DeepSeek Harness plugin: publish single-screen content cards to WePre Next from a dsh agent session |
| [dsh-plugin-meta-memory](https://github.com/YYTbit/dsh-plugin-meta-memory) | 1 | ⚪ unknown | Structured long-term memory system for DeepSeek Harness |
| [dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) | 1 | ⚪ unknown | Second-model AI auto-review for DeepSeek Harness approval requests: a read-only reviewer subagent returns structured allow/deny v… |
| [DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) | 1 | ⚪ unknown | Use DeepSeek Harness in VS Code like ChatGPT/Copilot: @dsh in native chat, standalone views, cross-project sessions, shared via D… |
| [dsh-plugin-context-compressor](https://github.com/YYTbit/dsh-plugin-context-compressor) | 1 | ⚪ unknown | Context compression skill for DeepSeek Harness |
| [dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) | 1 | ⚪ unknown | Logical-call context taxonomy plugin for DeepSeek Harness |
| [dsh-tdai-memory](https://github.com/Scorp1o117/dsh-tdai-memory) | 1 | ⚪ unknown | Agent memory for DeepSeek Harness | DeepSeek Harness 记忆插件 |
| [dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) | 1 | ⚪ unknown | Request Context Profiler for DeepSeek Harness — see what changed between model requests, and how cache reuse changed with it. |
| [dsh-plugin-session-import](https://github.com/huguangyu666/dsh-plugin-session-import) | 1 | ⚪ unknown | DeepSeek Harness plugin: import claude-code / codex / reasonix / zcode sessions |
| [dsh-resume-plugin](https://github.com/Demogorgon314/dsh-resume-plugin) | 1 | ⚪ unknown | dsh-resume-plugin — DSH plugin (session) |
| [dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) | 1 | ⚪ unknown | Cross-session persistent cost ledger for DeepSeek Harness: logs every LLM token usage to SQLite and exposes record/query/budget t… |
| [dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) | 0 | ⚪ unknown | DeepSeek Harness plugin: import OpenAI Codex conversation history into DSH sessions via /codex-import | 用 /codex-import 把 Codex 历… |
| [dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) | 0 | ⚪ unknown | Continual self-evolution plugin for DeepSeek Harness: versioned, auditable, rollback-safe harness state refined from session traj… |
| [dsh-command-opt](https://github.com/csiroqa/dsh-command-opt) | 0 | ⚪ unknown | dsh-command-opt — DSH plugin (session) |
| [dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) | 0 | ⚪ unknown | Fail-closed export-copy redaction for DeepSeek Harness session telemetry |
| [dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) | 0 | ⚪ unknown | Native interactive Git diff review for DeepSeek Harness with structured annotations sent back to the current Agent session. DeepS… |
| [dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) | 0 | ⚪ unknown | dsh-usage-widget — DSH plugin (session) |
| [dsh-balance-meter](https://github.com/Ghost011118/dsh-balance-meter) | 0 | ⚪ unknown | DeepSeek account balance and session cost readout for the DeepSeek Harness Web GUI |
| [dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) | 0 | ⚪ unknown | dsh-cost-chip — DSH plugin (session) |
| [dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) | 0 | ⚪ unknown | ♾️ Copy and export the LaTeX in DeepSeek Harness 悬停任意 LaTeX 公式即可复制 TeX 源码或导出为独立的 SVG 文件 |
| [dsh-memory](https://github.com/Towzai/dsh-memory) | 0 | ⚪ unknown | Cross-session memory plugin for DeepSeek Harness (dsh): embedding search + automatic system-prompt injection |
| [mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) | 0 | ⚪ unknown | Editable, session-isolated personalization memory for DeepSeek Harness |
| [dsh-auto-compact](https://github.com/wangxiang0605qvq/dsh-auto-compact) | 0 | ⚪ unknown | DeepSeek Harness 自动压缩插件：模型工具 compact_now，回合结束后自动压缩上下文 | Auto compaction plugin for DSH: compact_now tool, compacts context after… |
| [dsh-hotkeys](https://github.com/csiroqa/dsh-hotkeys) | 0 | ⚪ unknown | dsh-hotkeys — DSH plugin (session) |
| [dsh-plugin-jinji](https://github.com/quan2005/dsh-plugin-jinji) | 0 | ⚪ unknown | dsh-plugin-jinji — DSH plugin (session) |
| [dsh-memory](https://github.com/Amengclass/dsh-memory) | 0 | ⚪ unknown | Persistent, model-editable memory/notes store for DeepSeek Harness. Adds memory_set/get/delete/search tools backed by ctx.storage… |
| [dsh-supervisor](https://github.com/Wha1eChai/dsh-supervisor) | 0 | ⚪ unknown | Community control-plane plugin for DeepSeek Harness live sessions |
| [dsh-archive-viewer](https://github.com/csiroqa/dsh-archive-viewer) | 0 | ⚪ unknown | DSH archive enhancements: periodic archive, LLM summaries, session notes. |
| [dsh-plugin-asmemory](https://github.com/Xplore-LAB/dsh-plugin-asmemory) | 0 | ⚪ unknown | Action-State Memory Engine: typed time-series memory (states + actions) with trend/anomaly/causal analysis for DeepSeek Harness |

### 🧠 LLM

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 182 | ⚪ unknown | Vision for text-only models: image QA, screenshot OCR, UI reconstruction |
| [Deepseek-omnimodal](https://github.com/good-boy4069/Deepseek-omnimodal) | 2 | ⚪ unknown | Open-source multimodal MCP for text-only agents |
| [dsh-computer-use](https://github.com/Anionex/dsh-computer-use) | 12 | ⚪ unknown | Computer-use plugin (accessibility observation + scoped permission) |
| [dsh-vision](https://github.com/william-jin-cmu/dsh-vision) | 11 | ⚪ unknown | view_image tool bridging any OpenAI-compatible VLM |
| [modlens](https://github.com/liustack/modlens) | 760 | ⚪ unknown | The first vision plugin for DeepSeek Harness — let text-only models see. |
| [agent-vision-toolkit](https://github.com/Anionex/agent-vision-toolkit) | 570 | ⚪ unknown | Vision toolbox & skills for text-only models: multi-image QA, UI reconstruction, GUI automation. |
| [dsh-tool-turbo](https://github.com/Electricitysheep/dsh-tool-turbo) | 3 | ⚪ unknown | Per-round reasoning_effort optimizer. |
| [dsh-plugin-cost-tracker](https://github.com/YYTbit/dsh-plugin-cost-tracker) | 3 | ⚪ unknown | Token cost tracker for DeepSeek Harness. |
| [dsh-cost](https://github.com/GiantGKL/dsh-cost) | 3 | ⚪ unknown | DSH token cost tracking plugin. |
| [dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) | 3 | ⚪ unknown | DeepSeek brain + auto image recognition via VLM. |
| [dsh-her-eyes](https://github.com/huashenglian/dsh-her-eyes) | 3 | ⚪ unknown | DSH plugin letting AI auto-invoke VLM for vision analysis. |
| [dsh-recommend](https://github.com/zp-home/dsh-recommend) | 2 | ⚪ unknown | dsh-recommend — DSH plugin (llm) |
| [dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) | 2 | ⚪ unknown | dsh-hdc-bridge — DSH plugin (llm) |
| [dsh-plugin-deepeye](https://github.com/Favio8/dsh-plugin-deepeye) | 2 | ⚪ unknown | DeepEye vision plugin for DeepSeek Harness (DSH): image description, OCR, VQA, UI layout, and clipboard analysis. |
| [dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) | 2 | ⚪ unknown | Tiered auto-review for DeepSeek Harness: static-rule safety net + LLM reviewer + human fallback — auto-allow safe actions, deny i… |
| [dsh-mcp-manager](https://github.com/hyqhyq3/dsh-mcp-manager) | 2 | ⚪ unknown | MCP server manager plugin for DeepSeek Harness: Settings → MCP page, OAuth (PKCE + dynamic client registration) or static-token a… |
| [dsh-llm-codex-oauth](https://github.com/Player-MINEPIG/dsh-llm-codex-oauth) | 2 | ⚪ unknown | dsh-llm-codex-oauth — DSH plugin (llm) |
| [dsh-payload-capture](https://github.com/Moeblack/dsh-payload-capture) | 1 | ⚪ unknown | dsh-payload-capture — DSH plugin (llm) |
| [doubao-vision-dsh](https://github.com/hawkongz/doubao-vision-dsh) | 1 | ⚪ unknown | doubao-vision-dsh — DSH plugin (llm) |
| [dsh-vision-LMstudio](https://github.com/TiankunDai/dsh-vision-LMstudio) | 1 | ⚪ unknown | dsh-vision-LMstudio — DSH plugin (llm) |
| [dsh-tool-vision](https://github.com/Scorp1o117/dsh-tool-vision) | 1 | ⚪ unknown | Vision model for DeepSeek Harness | DeepSeek Harness 外置视觉模型插件 |
| [dsh-effort-tweak](https://github.com/Toukaiteio/dsh-effort-tweak) | 1 | ⚪ unknown | A DeepSeek Harness plugin that allows you to change the reasoning effort of custom models in WebUI. |
| [dsh-toolbelt](https://github.com/cking000bigdemon/dsh-toolbelt) | 1 | ⚪ unknown | Eight DeepSeek Harness plugins: persona, language guard, per-request vision fallback, python/windows write guards, cross-agent me… |
| [multimodal-bridge](https://github.com/Spirit4471/multimodal-bridge) | 1 | ⚪ unknown | multimodal-bridge — DSH plugin (llm) |
| [dsh-live-stats](https://github.com/Proton1917/dsh-live-stats) | 1 | ⚪ unknown | Live token estimates and true streaming TPS for DeepSeek Harness Web |
| [dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) | 1 | ⚪ unknown | DeepSeek Harness plugin: turn UI screenshots into structured, implementation-grade web frontend specs. Deterministic geometry (sh… |
| [dsh-plugin-vision-toolkit](https://github.com/YYTbit/dsh-plugin-vision-toolkit) | 1 | ⚪ unknown | Vision toolkit for DeepSeek Harness -- give text-only agents eyes |
| [dsh-usage-cost](https://github.com/Dino6021/dsh-usage-cost) | 1 | ⚪ unknown | DSH plugin: per-step timestamped DeepSeek API usage timeline + peak/off-peak cost readout. Official bundle; install via: dsh plug… |
| [dsh-mimo-vision-hint](https://github.com/Isekai-Mfu/dsh-mimo-vision-hint) | 1 | ⚪ unknown | DSH plugin: dispatch image-recognition tasks to an opencode-go mimo-v2.5 subagent via system-prompt injection |
| [dsh-multimodal](https://github.com/MC5lan/dsh-multimodal) | 1 | ⚪ unknown | dsh-multimodal — DSH plugin (llm) |
| [dsh-vision-helper](https://github.com/Yuuz12/dsh-vision-helper) | 1 | ⚪ unknown | DeepSeek Harness Vision Helper/DeepSeek Harness 视觉辅助方案 |
| [dsh-model-modes](https://github.com/DTSFO/dsh-model-modes) | 1 | ⚪ unknown | Capability-aware reasoning controls and Fast model routing for DeepSeek Harness |
| [dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) | 1 | ⚪ unknown | DSH Pet Corner: a floating pet, keyless pet-image proxy, favorites, and plugin-owned settings API |
| [dsh-eco-router](https://github.com/joyfoxai/dsh-eco-router) | 1 | ⚪ unknown | A token-efficient model-routing flywheel for the DeepSeek Harness. |
| [dsh-effort-config](https://github.com/benzhoupo/dsh-effort-config) | 1 | ⚪ unknown | dsh plugin: configure reasoning-effort levels (wire spellings), route default level and Anthropic token budgets for third-party m… |
| [dsh-image-to-path](https://github.com/cesaryike/dsh-image-to-path) | 1 | ⚪ unknown | dsh-image-to-path — DSH plugin (llm) |
| [dsh-vision](https://github.com/xiaoshihou514/dsh-vision) | 1 | ⚪ unknown | DeepSeek Harness: vision |
| [dsh-usage-meter](https://github.com/cute-baobao/dsh-usage-meter) | 1 | ⚪ unknown | DeepSeek Harness plugin: per-model daily token usage recorder (input/output/cache hits) with a Web GUI dashboard. |
| [dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) | 1 | ⚪ unknown | One-key ClawRouters plugin for DeepSeek Harness: chat, image, video, and web search |
| [dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) | 0 | ⚪ unknown | On-device macOS OCR and Apple Vision for DeepSeek Harness — one native plugin with a bundled Skill. |
| [dsh-plugin-llm-codex](https://github.com/jasper-zsh/dsh-plugin-llm-codex) | 0 | ⚪ unknown | 让 DeepSeek Harness（DSH） 通过 ChatGPT/Codex 订阅调用 openai-codex 模型，无需配置 OpenAI API Key。 |
| [dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) | 0 | ⚪ unknown | DeepSeek Harness client plugin: constant-rate typewriter reveal for assistant output and reasoning, with per-model gating. |
| [dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) | 0 | ⚪ unknown | Reusable Markdown prompt profiles for DeepSeek Harness with per-turn model selection, argument substitution, and state restoratio… |
| [dsh-polyglot](https://github.com/Jesse-njx/dsh-polyglot) | 0 | ⚪ unknown | dsh-polyglot — the model switch for DSH: generic OpenAI-compatible ctx.llm adapter, curated free/cheap DeepSeek presets, automati… |
| [dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) | 0 | ⚪ unknown | Floating draggable token usage statistics panel for DeepSeek Harness |
| [dsh-cost](https://github.com/dongsheng123132/dsh-cost) | 0 | ⚪ unknown | Evidence-first token cost ledger and budget checks for DeepSeek Harness |
| [dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) | 0 | ⚪ unknown | DSH usage report: daily/monthly token & cost aggregation, alerts. |
| [dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) | 0 | ⚪ unknown | DSH (DeepSeek Harness) web plugin: thinking intensity / reasoning effort settings for custom OpenAI-compatible (pi-ai) models |
| [dsh-vision-sidecar](https://github.com/121103qwq/dsh-vision-sidecar) | 0 | ⚪ unknown | Hosted free vision sidecar for DeepSeek Harness with durable session evidence |
| [owlx-mcp](https://github.com/Chungor/owlx-mcp) | 0 | ⚪ unknown | OwlX MCP server - live crypto structure scores, MemeSniper, token financials and recorded signal hit-rate as MCP tools for Claude… |
| [dsh-qwen-mm](https://github.com/RRRosmontis/dsh-qwen-mm) | 0 | ⚪ unknown | Qwen-MM-Plugins integration bundle for DeepSeek Harness (dsh) — multimodal MCP tools (vision, OCR, ASR, search, video, Blender, F… |
| [noatmark-dsh-plugin](https://github.com/ylwl1997/noatmark-dsh-plugin) | 0 | ⚪ unknown | NoAtMark text hygiene as a DeepSeek Harness (dsh) plugin — sanitize untrusted text, scan invisible characters, clean LLM formatti… |
| [dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) | 0 | ⚪ unknown | dsh-cost-display — DSH plugin (llm) |
| [dsh-plugin-provider-quota](https://github.com/jasper-zsh/dsh-plugin-provider-quota) | 0 | ⚪ unknown | dsh-plugin-provider-quota — DSH plugin (llm) |
| [dsh-codebuddy](https://github.com/Lbryany/dsh-codebuddy) | 0 | ⚪ unknown | CodeBuddy OAuth, dynamic models, and reasoning controls for DeepSeek Harness |

### 🛡️ Sandbox

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-plugin-miliastra-toolbox](https://github.com/1475505/dsh-plugin-miliastra-toolbox) | 1 | ⚪ unknown | dsh-plugin-miliastra-toolbox — DSH plugin (sandbox) |
| [dsh-same-mode-sandbox-noop](https://github.com/zhangzujian/dsh-same-mode-sandbox-noop) | 0 | ⚪ unknown | DSH compatibility plugin for redundant same-mode sandbox escalation requests |
| [dsh-shell-termux](https://github.com/kelai141/dsh-shell-termux) | 0 | ⚪ unknown | dsh-shell-termux — DSH plugin (sandbox) |
| [dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) | 0 | ⚪ unknown | dsh-bash-win — DSH plugin (sandbox) |

### 🎛️ Orchestration

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [openhanako](https://github.com/liliMozi/openhanako) | 5975 | ⚪ unknown | Personal AI agent with memory, personality and autonomy |
| [exo](https://github.com/exoharness/exo) | 639 | ⚪ unknown | Fully recursive agent+harness that self-edits at runtime |
| [synergy](https://github.com/SII-Holos/synergy) | 542 | ⚪ unknown | General-purpose agent for the Open Agentic Web |
| [ccteam](https://github.com/firstintent/ccteam) | 142 | ⚪ unknown | Orchestrates Claude Code/Codex/Grok/Kimi into one team |
| [MateBot](https://github.com/aresbit/MateBot) | 46 | ⚪ unknown | A claudeclaw clone |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 39 | ⚪ unknown | Skill-driven harness/loop engineering workflow plugin |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 37 | ⚪ unknown | Bring Claude Code's UltraCode mode to DSH with governable multi-agent orchestration |
| [agents-go](https://github.com/zzir/agents-go) | 13 | ⚪ unknown | Multi-agent framework in Go |
| [distill](https://github.com/LoserFox/distill) | 12 | ⚪ unknown | Auto conversation distillation: background subagent reflection |
| [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 99 | ⚪ unknown | AgentTeams plugin |
| [dsh-automation](https://github.com/titanwings/dsh-automation) | 9 | ⚪ unknown | Run scheduled tasks in fresh sessions per plan |
| [dsh-loop](https://github.com/vlln/dsh-loop) | 2 | ⚪ unknown | Scheduled loop (/loop command + tool) |
| [dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | 2 | ⚪ unknown | Plan annotator: annotate plan text line-by-line |
| [dsh-task-status](https://github.com/vlln/dsh-task-status) | 3 | ⚪ unknown | Background task status bar |
| [dsh-work](https://github.com/vibeinging/dsh-work) | 11 | ⚪ unknown | Local-first AI workbench for DSH plugins |
| [dsh-advisor](https://github.com/btspoony/dsh-advisor) | 3 | ⚪ unknown | Second model passively reviews each turn and injects advice |
| [dsh-artifact](https://github.com/william-jin-cmu/dsh-artifact) | 1 | ⚪ unknown | File delivery protocol: send_artifact tool |
| [dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) | 5 | ⚪ unknown | Adaptive deep-research orchestrator plugin |
| [dsh-explain](https://github.com/yuezengwu/dsh-explain) | 2 | ⚪ unknown | Local-first learning mode: cross-session learning thread |
| [dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) | 1 | ⚪ unknown | Role-based LLM retry & fallback strategy |
| [dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | 3 | ⚪ unknown | Condition-driven wakeup: durable file/command/http triggers |
| [dsh-track](https://github.com/fakechris/dsh-track) | 3 | ⚪ unknown | Embedded task management engine: decision-point protocol |
| [eragear-code-copilot](https://github.com/TongDucThanhNam/eragear-code-copilot) | 0 | ⚪ unknown | Empty shell repo (no description) |
| [dsh-plugin-product-subagents](https://github.com/shaokeyibb/dsh-plugin-product-subagents) | 3 | ⚪ unknown | Role-based Codex/Claude Code/ACP subagent presets. |
| [dsh-milestone](https://github.com/SnowCrescenter-tech/dsh-milestone) | 3 | ⚪ unknown | Git-style milestone timeline plugin. |
| [shopline-ai-toolkit-dsh](https://github.com/lunw/shopline-ai-toolkit-dsh) | 2 | ⚪ unknown | SHOPLINE AI Toolkit for DeepSeek Harness (dsh-plugin): official SHOPLINE Developer MCP bridge + SHOPLINE agent skills, mirroring… |
| [dsh-playwright-cli](https://github.com/mitao-su/dsh-playwright-cli) | 2 | ⚪ unknown | DeepSeek Harness (DSH) host plugin wrapping the Playwright CLI: install browsers, run tests, open the HTML report from the agent… |
| [dsh-review-loop](https://github.com/wuxiangru915/dsh-review-loop) | 2 | ⚪ unknown | Incremental diff reviewer for DeepSeek Harness — Web UI review panel + /review command. 增量代码审查插件：checkpoint 增量队列 + 审查意见注入 agent. |
| [securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) | 2 | ⚪ unknown | SecurStack adapter for DeepSeek Harness: run repository security scans, policy gates, doctor diagnostics, and JSON CLI results fr… |
| [dsh-multi-cot](https://github.com/AprilWizard/dsh-multi-cot) | 2 | ⚪ unknown | Multi-CoT plugin for DeepSeek Harness: multi-sampled test-time compute, internal voting, and a plan/execute/review workflow |
| [dsh-git-plugin](https://github.com/MashedPotato817/dsh-git-plugin) | 2 | ⚪ unknown | Git workflow plugin for DeepSeek Harness: slash commands and read-only git tools |
| [dsh-enhance](https://github.com/vcxmug/dsh-enhance) | 2 | ⚪ unknown | Native Firecrawl tools for DeepSeek Harness agents via MCP — one composition row, zero custom code |
| [deepseek-harness-plugin-mcp](https://github.com/bobleer/deepseek-harness-plugin-mcp) | 2 | ⚪ unknown | MCP server that lets any agent discover, install, and run DeepSeek Harness plugins (topic: dsh-plugin). |
| [dsh-sound-effects-plugin](https://github.com/JasonJin2006/dsh-sound-effects-plugin) | 2 | ⚪ unknown | Reasonix-style sound effects for DeepSeek Harness: generative pentatonic ambient music while the agent works, E6-G6-C7 success ch… |
| [deepseek-harness-fnos](https://github.com/techysy/deepseek-harness-fnos) | 2 | ⚪ unknown | deepseek-harness-fnos — DSH plugin (orchestration) |
| [dsh-agent-arcade](https://github.com/fff122/dsh-agent-arcade) | 1 | ⚪ unknown | Deterministic Agent-played Snake game for DeepSeek Harness. |
| [dsh-skillport](https://github.com/Jesse-njx/dsh-skillport) | 1 | ⚪ unknown | Every skill you already have — Claude Code, Codex, Cursor, Gemini CLI — works in DSH: Agent Skills SKILL.md discovery, Tier-2 con… |
| [dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) | 1 | ⚪ unknown | DSH book-to-skill plugin: a 5-stage long task (fetch → parse → understand → generate → install) with 3 human gates, host tools fo… |
| [dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) | 1 | ⚪ unknown | Prime Agent-inspired persistent RLM control plane for DeepSeek Harness Code Mode |
| [dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) | 1 | ⚪ unknown | dsh-fail-logger — DSH plugin (orchestration) |
| [dsh-routines](https://github.com/Jesse-njx/dsh-routines) | 1 | ⚪ unknown | dsh-routines — scheduled agents for DSH: run a prompt on a cron, get the digest where you already are (file digests, chatnode del… |
| [falsify-dsh](https://github.com/shi275773124/falsify-dsh) | 1 | ⚪ unknown | DeepSeek Harness adapter for the public Falsify CLI. Adjudicator receipt, not a second-opinion workflow. |
| [dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) | 1 | ⚪ unknown | Dub video and audio into 10 languages with voice cloning, from a DeepSeek Harness agent | DSH 视频/音频配音插件 |
| [dsh-governance](https://github.com/tappass/dsh-governance) | 1 | ⚪ unknown | The authority layer for agentic AI, as a DeepSeek Harness plugin. Governs every tool call against your business rules via TapPass… |
| [dsh-clawrouter](https://github.com/BlockRunAI/dsh-clawrouter) | 1 | ⚪ unknown | A second brain for your DeepSeek Harness agent — strong-model review before risky tool calls, plus 70 models from one wallet. |
| [DSH-Chrome-devtools](https://github.com/yuzi-ska/DSH-Chrome-devtools) | 1 | ⚪ unknown | Real Chrome browser control for DeepSeek Harness agents, powered by Chrome DevTools MCP |
| [dsh-self-control-guard](https://github.com/pandashere/dsh-self-control-guard) | 1 | ⚪ unknown | Self-control guard plugin for DeepSeek Harness host exit and restart workflows. |
| [dsh-harness-mcp-server](https://github.com/chushixixin/dsh-harness-mcp-server) | 1 | ⚪ unknown | Expose DeepSeek Harness agent capabilities as an MCP server (brain=Hermes, arms=Harness) |
| [dsh-plugin-verify](https://github.com/qing3a/dsh-plugin-verify) | 1 | ⚪ unknown | dsh-plugin-verify — DSH plugin (orchestration) |
| [dsh-schedule](https://github.com/csiroqa/dsh-schedule) | 1 | ⚪ unknown | Scheduled tasks + status monitoring for DSH (cron-triggered agents). |
| [Pwiki](https://github.com/ang-XWBWZ/Pwiki) | 1 | ⚪ unknown | Local-first knowledge retrieval engine for AI agents — BM25, semantic search, reranking, MCP, Pi Agent and DeepSeek Harness integ… |
| [governed-workflow-for-dsh](https://github.com/zcx369658780/governed-workflow-for-dsh) | 1 | ⚪ unknown | Policy-enforced, evidence-first governed workflows for DeepSeek Harness agents. |
| [dsh-agent-eval](https://github.com/ShawnSiao/dsh-agent-eval) | 1 | ⚪ unknown | Planned repeatable agent and plugin regression evaluation for DeepSeek Harness |
| [dsh-plugin-agent-dashboard](https://github.com/YYTbit/dsh-plugin-agent-dashboard) | 1 | ⚪ unknown | Multi-agent dashboard skill for DeepSeek Harness |
| [amber-protocol](https://github.com/Bandersnatch0x/amber-protocol) | 1 | ⚪ unknown | Amber Protocol: repository-local governance for coding agents, including a DeepSeek Harness (dsh) patch overlay. |
| [dsh-eval-harness](https://github.com/BiBoyang/dsh-eval-harness) | 1 | ⚪ unknown | DSH 插件评测工具：YAML 用例驱动真实 agent 回归评测 + baseline 对比 PASS/WARN/FAIL 门禁｜Regression eval harness for DeepSeek Harness plugins |
| [sai](https://github.com/Very12345/sai) | 0 | ⚪ unknown | A local-first Android coding agent powered by the official DeepSeek Harness |
| [vpshub](https://github.com/Sdongmaker/vpshub) | 0 | ⚪ unknown | VPS Hub for DeepSeek Harness: SSH ledger plugin — agents discover, test, execute on, and transfer files to your cloud servers. Ke… |
| [deepseek-harness-flow](https://github.com/alison-xx/deepseek-harness-flow) | 0 | ⚪ unknown | Visual workflows and multi-model evaluation for DeepSeek Harness |
| [dsh-voice](https://github.com/Jesse-njx/dsh-voice) | 0 | ⚪ unknown | Voice notes in, spoken answers out — dictate audio that becomes user messages (transcribe), have the agent read replies aloud (sp… |
| [dsh-product-delivery-workflow](https://github.com/wellorbetter/dsh-product-delivery-workflow) | 0 | ⚪ unknown | 100% AI-native product delivery workflow plugin for DeepSeek Harness: full product-to-release pipeline (research → PRD → OpenSpec… |
| [dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) | 0 | ⚪ unknown | dsh-plugin-dev-skill — DSH plugin (orchestration) |
| [vscode-deepseek-harness](https://github.com/kalynnka/vscode-deepseek-harness) | 0 | ⚪ unknown | Unofficial: drive your own DeepSeek Harness (dsh) as a native VS Code chat agent, beside Claude Code and Codex. |
| [dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) | 0 | ⚪ unknown | Git status, diff, commit, pull request, and worktree workflows for DeepSeek Harness. |
| [dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) | 0 | ⚪ unknown | Verified current-source search workflow for DeepSeek Harness |
| [dsh-landscape](https://github.com/cyanseek/dsh-landscape) | 0 | ⚪ unknown | Agent-first DeepSeek Harness plugin intelligence: verify existing plugins, identify missing capabilities, and generate build-read… |
| [dsh-wecom](https://github.com/TtTRz/dsh-wecom) | 0 | ⚪ unknown | WeCom AI Bot channel for DeepSeek Harness — every chat runs a persistent, preset-backed agent with real tools. |
| [dsh-push](https://github.com/kiim-wong/dsh-push) | 0 | ⚪ unknown | Push DeepSeek Harness agent lifecycle notifications to configurable channels |
| [sai-dsh-plugins](https://github.com/Very12345/sai-dsh-plugins) | 0 | ⚪ unknown | First-party DeepSeek Harness plugins for the sai Android coding agent |
| [dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) | 0 | ⚪ unknown | Two-tier model router for DeepSeek Harness — LLM-Judge routing, multi-model fallback chains, exponential-backoff failover, and ta… |
| [dash](https://github.com/songqikong/dash) | 0 | ⚪ unknown | DASH — Deepseek Agentic Service Harness |
| [delivery-review-dsh-plugin](https://github.com/xiaoxiao-svg/delivery-review-dsh-plugin) | 0 | ⚪ unknown | delivery-review-dsh-plugin — DSH plugin (orchestration) |
| [dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) | 0 | ⚪ unknown | Gated, durable human-in-the-loop workflow engine for DeepSeek Harness. |
| [dsh-browser-bridge](https://github.com/egnmosk/dsh-browser-bridge) | 0 | ⚪ unknown | DeepSeek Harness plugin + browser extension bridge: browser_* agent tools (navigate, click, type, screenshot, eval) over a localh… |
| [DeepJIT](https://github.com/fly3366/DeepJIT) | 0 | ⚪ unknown | JIT compiler plugin for deepseek-harness: compiles recurring agent workflows into hot skills and flow templates |

### 🔌 ACP

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-agent-messaging](https://github.com/happyren/dsh-agent-messaging) | 4 | ⚪ unknown | Cross-session agent-to-agent messaging. |
| [widget-dock](https://github.com/MorGogh/widget-dock) | 2 | ⚪ unknown | DSH plugin: draggable widget panel (balance, tokens, stats, commands, goal, cost) for DeepSeek Harness |
| [dsh-ark-quota](https://github.com/lordqyxz/dsh-ark-quota) | 2 | ⚪ unknown | dsh-ark-quota — DSH plugin (acp) |
| [dsh-codex-bridge](https://github.com/pandashere/dsh-codex-bridge) | 1 | ⚪ unknown | Codex CLI bridge plugin for DeepSeek Harness with host tools and a Web conversation tab. |
| [dsh-reasoning-translator](https://github.com/pinkllo/dsh-reasoning-translator) | 1 | ⚪ unknown | DeepSeek Harness plugin: make the model write its chain-of-thought in your language |
| [dsh-credentials-keychain](https://github.com/ShawnSiao/dsh-credentials-keychain) | 1 | ⚪ unknown | Planned OS-backed credential provider for DeepSeek Harness |
| [dsh-deepseek-balance](https://github.com/lin-cheng-lab/dsh-deepseek-balance) | 1 | ⚪ unknown | dsh-deepseek-balance — DSH plugin (acp) |
| [dsh-deepseek-usage](https://github.com/ben7am1n/dsh-deepseek-usage) | 1 | ⚪ unknown | DeepSeek balance and token usage tools for DeepSeek Harness |
| [dsh-balance-display](https://github.com/Liu-ty/dsh-balance-display) | 1 | ⚪ unknown | DeepSeek API balance overlay for DeepSeek Harness |
| [ds-balance-card](https://github.com/jasonsun29/ds-balance-card) | 1 | ⚪ unknown | ds-balance-card — DSH plugin (acp) |
| [dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) | 1 | ⚪ unknown | DeepSeek 账户余额、剩余比例条与今日花费，显示在 dsh 侧边栏底部 · DeepSeek balance, remaining-ratio bar and today's spend in the dsh sidebar footer. |
| [dsh-kimi-bridge](https://github.com/pandashere/dsh-kimi-bridge) | 1 | ⚪ unknown | Kimi CLI bridge plugin for DeepSeek Harness with review-only mode and a Web conversation tab. |
| [deepseek-harness-lan](https://github.com/oitsukiii/deepseek-harness-lan) | 1 | ⚪ unknown | Run DeepSeek Harness Web UI on your home LAN — 4 minimal patches + one-click apply/revert scripts | 让 DeepSeek Harness 的 Web UI 在… |
| [jina-dsh-plugin](https://github.com/minatoAI/jina-dsh-plugin) | 0 | ⚪ unknown | Jina AI tools for DeepSeek Harness: 12 model tools (web / arXiv / SSRN search, read, screenshot, embeddings, rerank, classify, PD… |
| [dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) | 0 | ⚪ unknown | LSP action surface for DeepSeek Harness: lsp_diagnostics, lsp_format, and lsp_completion tools over language servers |
| [dsh-chrome](https://github.com/YJSoooooo/dsh-chrome) | 0 | ⚪ unknown | Chrome profile bridge for DeepSeek Harness: control an existing signed-in Chrome profile through chrome_repl. |
| [dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) | 0 | ⚪ unknown | Exa Search MCP for DeepSeek Harness: mounts the remote Exa MCP endpoint (https://mcp.exa.ai/mcp) through the in-box @deepseek-ai/… |
| [dsh-switch](https://github.com/dongsheng123132/dsh-switch) | 0 | ⚪ unknown | Evidence-first model control plane for DeepSeek Harness |
| [dsh-deepseek-balance](https://github.com/wangxiang0605qvq/dsh-deepseek-balance) | 0 | ⚪ unknown | DeepSeek 余额插件：模型工具 + 侧边栏余额胶囊 | DeepSeek balance plugin for DSH: model tool + sidebar balance pill |

### 📦 Preset

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-companion](https://github.com/yyh-001/dsh-companion) | 3 | ⚪ unknown | DSH companion-mode plugin: persona, memory, conversation. |

### 🧷 Utility

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [EchoBird](https://github.com/edison7009/EchoBird) | 3012 | ⚪ unknown | One-click install + model switch across 20+ coding agents |
| [awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) | 379 | ⚪ unknown | DSH plugin directory with daily compatibility tracking |
| [deepseek-harness-applicants](https://github.com/Octo-o-o-o/deepseek-harness-applicants) | 48 | ⚪ unknown | DSH internal-test applicants list |
| [awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 169 | ⚪ unknown | DSH ecosystem curation: plugins, tools, infra |
| [dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) | 79 | ⚪ unknown | DeepSeek Harness terminal UI |
| [agent-skills](https://github.com/GitHubxsy/agent-skills) | 20 | ⚪ unknown | Reusable skills for AI coding agents |
| [dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) | 38 | ⚪ unknown | Codex-style @file mentions for DeepSeek Harness: search workspace files in the composer and attach their contents to prompts. |
| [dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) | 33 | ⚪ unknown | Open DeepSeek Harness workspace directories in VS Code directly from the web GUI. |
| [dsh-notification](https://github.com/omdsh-dev/dsh-notification) | 25 | ⚪ unknown | Desktop notifications for DeepSeek Harness turn completions, with per-outcome controls and include/exclude keyword rules. |
| [dsh-ads](https://github.com/Nagi-ovo/dsh-ads) | 136 | ⚪ unknown | 2005-style sidebar ads plugin (parody) |
| [dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) | 12 | ⚪ unknown | DSH 内测收官合影墙：GitHub OAuth 零权限登录 + 冻结白名单校验的拍立得合影站（含 DSH Skill 包装） |
| [dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) | 38 | ⚪ unknown | OpenPencil design preview and editing plugin for DSH |
| [oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) | 8 | ⚪ unknown | Extensible macOS DSH workbench with native PTY |
| [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize) | 38 | ⚪ unknown | In-chat generative UI: interactive HTML cards |
| [awesome-DSH-plugin](https://github.com/Alex-Yanggg/awesome-DSH-plugin) | 32 | ⚪ unknown | Curated list of DSH plugins, extensions and tools |
| [oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) | 25 | ⚪ unknown | DSH plugin ecosystem (700+ plugins) |
| [dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) | 7 | ⚪ unknown | Play Gomoku against AI in DSH |
| [dsh-web-review](https://github.com/CanglongCl/dsh-web-review) | 7 | ⚪ unknown | DeepSeek Harness Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。 |
| [dsh-emoji](https://github.com/hellodigua/dsh-emoji) | 8 | ⚪ unknown | Auto-add emoji to AI replies |
| [dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) | 6 | ⚪ unknown | Use dsh via grok-build's TUI |
| [dsh-stock-market](https://github.com/AnacondaKC/dsh-stock-market) | 6 | ⚪ unknown | Parody: lose money while coding |
| [Top](https://github.com/xiaohai-78/Top) | 5 | ⚪ unknown | Daily leaderboard for the dsh-external plugin ecosystem |
| [awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 26 | ⚪ unknown | Bilingual complete list of the DSH plugin ecosystem |
| [dsh-launcher](https://github.com/Ruler4396/dsh-launcher) | 28 | ⚪ unknown | WebView2-based DSH launcher |
| [dsh-minigames](https://github.com/lhh010/dsh-minigames) | 7 | ⚪ unknown | Side game panel (18 offline mini-games) |
| [dsh-stickers](https://github.com/william-jin-cmu/dsh-stickers) | 6 | ⚪ unknown | Bidirectional sticker reactions |
| [oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) | 4 | ⚪ unknown | DeepSeek harness plugins |
| [orbis](https://github.com/icodesign/orbis) | 5 | ⚪ unknown | Mobile client for DSH remote control |
| [plugin-registry](https://github.com/vlln/plugin-registry) | 18 | ⚪ unknown | DSH plugin registry infra: browser panel for official repository plugins |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Scaffold a DeepSeek Harness (DSH) plugin in seconds — tool / events / webui templates, next-tag version pinning, and a built-in -… |
| [dsh-101](https://github.com/bill9109/dsh-101) | 1 | ⚪ unknown | DSH document reading mode |
| [dsh-desktop-electron](https://github.com/Void0312Aurora/dsh-desktop-electron) | 3 | ⚪ unknown | Cross-platform Electron desktop shell (tray-resident) |
| [dsh-douyin](https://github.com/AnacondaKC/dsh-douyin) | 2 | ⚪ unknown | Sidebar short-video plugin |
| [dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) | 2 | ⚪ unknown | One-click portable DSH launcher (Windows) |
| [dsh-notebooks](https://github.com/havingautism/dsh-notebooks) | 2 | ⚪ unknown | (no description) |
| [dsh-plugin-d399](https://github.com/HuanLinOTO/dsh-plugin-d399) | 2 | ⚪ unknown | Pop-up mini-game menu while model generates |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Send IM webhook + local notifications on turn completion / error / approval (Feishu / WeCom / DingTalk / Slack / Discord / custom… |
| [dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) | 4 | ⚪ unknown | Bridge DeepSeek Harness into Feishu/Lark. |
| [dsh-win-notify](https://github.com/MuziIsabel/dsh-win-notify) | 4 | ⚪ unknown | Windows toast notification plugin with sound. |
| [dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) | 3 | ⚪ unknown | Plugin adding a wechat_notify tool for agents. |
| [dsh-lan](https://github.com/moxisuki/dsh-lan) | 3 | ⚪ unknown | One overlay to expose dsh web on the LAN. |
| [DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) | 3 | ⚪ unknown | Remote DSH control via Telegram. |
| [dsh-onlyne](https://github.com/dbydd/dsh-onlyne) | 2 | ⚪ unknown | IM gateway for DeepSeek Harness agents — send and receive QQ, WeChat, Feishu and Telegram messages from dsh sessions. |
| [dsh-lark](https://github.com/Roy-oss1/dsh-lark) | 2 | ⚪ unknown | Lark/Feishu IM bot channel for DeepSeek Harness: chats drive agents, replies and approvals return as messages and cards | 飞书 Deep… |
| [dsh-chatnode-wechat](https://github.com/Jesse-njx/dsh-chatnode-wechat) | 1 | ⚪ unknown | Chat with, monitor, and approve your DSH agents from WeChat — an iLink gateway + conversation node bundle for DeepSeek Harness |
| [dsh-im-bridge](https://github.com/BiBoyang/dsh-im-bridge) | 1 | ⚪ unknown | dsh-im-bridge — DSH plugin (utility) |
| [dsh-lark-bridge](https://github.com/imetn/dsh-lark-bridge) | 1 | ⚪ unknown | Bidirectional Lark/Feishu controller for DeepSeek Harness |
| [dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) | 1 | ⚪ unknown | DeepSeek Harness bundle for OpenClaw and WeChat over ACP |
| [dsh-tool-notify](https://github.com/rizkirmdhnnn/dsh-tool-notify) | 0 | ⚪ unknown | DSH plugin: model-facing notify tool for DeepSeek Harness — send notifications to ntfy or generic webhooks when an agent task fin… |
| [dsh2wechat](https://github.com/wuyuanjiang1/dsh2wechat) | 0 | ⚪ unknown | DeepSeek Harness 微信 ClawBot 消息桥插件 |

> Badges: 🟢 compatible · 🔴 broken · ⚪ unverified · ⚫ unmaintained.
> 538 entries total, grouped by category, sorted by ⭐ within each. Schema dictionary: [docs/catalog-schema.md](docs/catalog-schema.md).
<!-- CATALOG:END -->

## Compatibility

Each entry carries a badge that CI re-checks daily against the latest DSH release (static peer comparison → install check → config assembly, all key-free):

| Badge | Meaning |
|---|---|
| 🟢 ok | Verified compatible with the latest DSH release |
| 🔴 broken | Fails against the latest DSH release |
| ⚪ unknown | Not yet verified (first-time listing) |
| ⚫ unmaintained | Abandoned upstream |

Machine-readable daily results live in [`data/compat-report.json`](data/compat-report.json); the workflow is [`.github/workflows/compat.yml`](.github/workflows/compat.yml).

## 🧩 First-party Plugins

| Plugin | Description |
|---|---|
| `@dsh-suite/plugin-notify` | Turn-completion notifications to IM webhooks (Feishu / Slack / Discord / custom) + local toast |
| `@dsh-suite/plugin-session-export` | Human-readable Markdown / HTML session export (official only exports raw JSONL) |
| `@dsh-suite/plugin-team-board` | Lightweight multi-agent task board (roadmap) |

## 🛠 create-dsh-plugin

```bash
npm create dsh-plugin@latest
```

An interactive scaffolder with multiple templates and a Claude Code / MCP migration guide. See [`docs/migration-guide.en.md`](docs/migration-guide.en.md).

## Contributing

Add a catalog entry, submit a plugin, or review the [15 plugin design principles](CONTRIBUTING.md). Inclusion criteria and the submission flow are documented in [`CONTRIBUTING.md`](CONTRIBUTING.md); open an issue with the [inclusion-request](.github/ISSUE_TEMPLATE/plugin-submission.md) template to propose a new entry.

## Roadmap

- **Now (MVP)** — directory + compat CI (layer 1) + scaffolder + 2 first-party plugins.
- **Next** — install / config-assembly compat layers, star auto-refresh, migration guide, `plugin-team-board`.

## License

[MIT](LICENSE) © 2026 whyihaveyou

---

## 📚 Docs

- [Contributing](CONTRIBUTING.md) — inclusion criteria, submission flow, and the 15 plugin design principles
- [Docs](docs/) — catalog schema, category definitions, and the migration guide
