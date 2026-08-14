# dsh-suite

![GitHub stars](https://img.shields.io/github/stars/whyihaveyou/dsh-suite?style=flat-square&color=facc15)
![Plugins](https://img.shields.io/badge/plugins-729-facc15?style=flat-square)
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
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 1110 | ⚪ unknown | DSH Web UI plugin & skin collection: task board, git panel, etc. |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 463 | ⚪ unknown | Sidebar workbench: file render/terminal/git/subagent |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 326 | ⚪ unknown | DSH Web whale-girl skin series |
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 253 | ⚪ unknown | Vision for text-only models: image QA, screenshot OCR, UI reconstruction |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 49 | ⚪ unknown | Bring Claude Code's UltraCode mode to DSH with governable multi-agent orchestration |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 41 | ⚪ unknown | Skill-driven harness/loop engineering workflow plugin |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 27 | ⚪ unknown | Rewind conversation and workspace state |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 24 | ⚪ unknown | Customize the whale-girl thinking-status label |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 19 | ⚪ unknown | Create sandboxed JS tools with Monaco editor |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 14 | ⚪ unknown | DSH conversation sharing plugin |
| [distill](https://github.com/LoserFox/distill) | 13 | ⚪ unknown | Auto conversation distillation: background subagent reflection |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun ↔ DSH ACP bridge |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Export the append-only session log as human-readable Markdown / HTML, grouped by trajectory source (system prompt / reasoning / t… |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Scaffold a DeepSeek Harness (DSH) plugin in seconds — tool / events / webui templates, next-tag version pinning, and a built-in -… |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Send IM webhook + local notifications on turn completion / error / approval (Feishu / WeCom / DingTalk / Slack / Discord / custom… |

### 🧰 Tools

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [open-managed-agents](https://github.com/openma-ai/open-managed-agents) | 235 | ⚪ unknown | Self-hosted Claude Managed Agents API platform (Cloudflare Workers) |
| [role-model](https://github.com/try-works/role-model) | 100 | ⚪ unknown | Protocol to route each job to the right model |
| [irmia_devkit_open](https://github.com/irmia2026/irmia_devkit_open) | 39 | ⚪ unknown | Python devkit (no description) |
| [HoloGram](https://github.com/834063245-creator/HoloGram) | 23 | ⚪ unknown | 3D code dependency graph generator (14 languages) |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 19 | ⚪ unknown | Create sandboxed JS tools with Monaco editor |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 9 | ⚪ unknown | BitFun ↔ DSH ACP bridge |
| [fabric](https://github.com/omdsh-dev/fabric) | 8 | ⚪ unknown | MC-Fabric-like hook handler |
| [dsh-git-identity](https://github.com/LoserFox/dsh-git-identity) | 7 | ⚪ unknown | Pin git commits to environment author identity |
| [Hypr-Agent-Protal](https://github.com/gfhdhytghd/Hypr-Agent-Protal) | 4 | ⚪ unknown | Computer Use MCP for Hyprland |
| [telegram](https://github.com/LoserFox/telegram) | 6 | ⚪ unknown | Telegram Bot API bridge (long polling) |
| [agent-knock-knock](https://github.com/scotthuang/agent-knock-knock) | 2 | ⚪ unknown | OpenClaw plugin: control local Codex/Claude Code via shared tmux |
| [dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) | 5 | ⚪ unknown | Auto-detect bash output encoding |
| [dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) | 10 | ⚪ unknown | Connect DB and write SQL plugin |
| [dsh-doctor](https://github.com/coppynight/dsh-doctor) | 3 | ⚪ unknown | flutter-doctor-style diagnostics and safe auto-repair |
| [dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) | 20 | ⚪ unknown | Cross-instance message/event handoff |
| [dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) | 17 | ⚪ unknown | OpenBiliClaw content-agent bridge for DSH |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 13 | ⚪ unknown | Scan plugin repo manifest protocol / patch format / build traps |
| [dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) | 9 | ⚪ unknown | Local security audit: config/plugin source/session/network |
| [dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) | 3 | ⚪ unknown | CSV parse/query/stat/transform tool |
| [dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) | 13 | ⚪ unknown | Zero-dep toolkit collection |
| [atomstudio](https://github.com/AtomicsLaboratory/atomstudio) | 1 | ⚪ unknown | Document engineering environment for executable documents |
| [dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 2 | ⚪ unknown | Use DSH remotely via cc-connect |
| [dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) | 3 | ⚪ unknown | Mnemon three-layer memory deep integration |
| [dsh-paseo](https://github.com/renat3u/dsh-paseo) | 2 | ⚪ unknown | paseo plugin extension support for DSH |
| [dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) | 9 | ⚪ unknown | DSH plugin-dev pitfalls archive (skill + docs) |
| [dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) | 4 | ⚪ unknown | Safe math expression evaluator |
| [dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) | 2 | ⚪ unknown | Structured diff for text/JSON/CSV/Markdown |
| [dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) | 2 | ⚪ unknown | base64/hex/url codec + hash tool |
| [dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) | 2 | ⚪ unknown | JMESPath JSON query tool |
| [dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) | 2 | ⚪ unknown | HTML↔Markdown conversion, GFM table normalization |
| [dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) | 2 | ⚪ unknown | Regex test/capture/safe-replace tool |
| [dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) | 2 | ⚪ unknown | JSON Schema validation tool |
| [dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) | 3 | ⚪ unknown | Descriptive stats / percentile / correlation tool |
| [dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) | 2 | ⚪ unknown | ISO 8601 / timezone / calendar math tool |
| [dsh-trace](https://github.com/vibeinging/dsh-trace) | 2 | ⚪ unknown | Telemetry backend exporting turns/steps/tools |
| [sandbox-micro](https://github.com/omdsh-dev/sandbox-micro) | 2 | ⚪ unknown | microsandbox support |
| [zotero-harvest](https://github.com/Fisfzy/zotero-harvest) | 4 | ⚪ unknown | Zotero harvest plugin (OpenAlex/arXiv/Crossref) |
| [dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) | 5 | ⚪ unknown | Ops toolkit: daily snapshot A/B slots, one-click rollback |
| [dsh-inspect](https://github.com/omdsh-dev/dsh-inspect) | 2 | ⚪ unknown | Adversarial checkup→fix→review loop plugin |
| [dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) | 5 | ⚪ unknown | OpenMAIC: classrooms, slides, interactive widgets |
| [dsh-plugin-mineru](https://github.com/HuanLinOTO/dsh-plugin-mineru) | 7 | ⚪ unknown | MineRU document parsing tools |
| [dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) | 2 | ⚪ unknown | Edit user & system prompt sections (live preview) |
| [dsh-scholar](https://github.com/lzszq/dsh-scholar) | 7 | ⚪ unknown | dsh-scholar (literature) |
| [dsh-ssh](https://github.com/UynajGI/dsh-ssh) | 2 | ⚪ unknown | SSH remote-execution: ProxyJump chain, SFTP |
| [dsh-tool-search](https://github.com/vibeinging/dsh-tool-search) | 1 | ⚪ unknown | Per-agent on-demand tool discovery + progressive schema |
| [dsh-webbridge](https://github.com/bill9109/dsh-webbridge) | 3 | ⚪ unknown | DSH + Kimi WebBridge |
| [ego-browser](https://github.com/Fisfzy/ego-browser) | 9 | ⚪ unknown | Bridge ego-lite Chromium browser into DSH |
| [math-lean](https://github.com/Fisfzy/math-lean) | 1 | ⚪ unknown | Lean kernel-verified math reasoning plugin |
| [plugin-template](https://github.com/omdsh-dev/plugin-template) | 4 | ⚪ unknown | Plugin template derived from the official turtle ui repo |
| [Qwen-MM-Plugins](https://github.com/omdsh-dev/Qwen-MM-Plugins) | 3 | ⚪ unknown | Qwen-MM-Plugins support |
| [sandbox-mxc](https://github.com/omdsh-dev/sandbox-mxc) | 1 | ⚪ unknown | Microsoft cross-platform sandbox support |
| [sandbox-nono](https://github.com/omdsh-dev/sandbox-nono) | 2 | ⚪ unknown | nono sandbox support |
| [web-components](https://github.com/omdsh-dev/web-components) | 1 | ⚪ unknown | web-components support |
| [zotero-wave-rag](https://github.com/Fisfzy/zotero-wave-rag) | 2 | ⚪ unknown | Wave-RAG retrieval for Zotero paper library |
| [modsearch](https://github.com/liustack/modsearch) | 76 | ⚪ unknown | Web search plugin for DeepSeek Harness. |
| [dsh-browser](https://github.com/Lum1104/dsh-browser) | 58 | ⚪ unknown | Chrome sidebar extension letting DSH drive the browser. |
| [dsh-openapi](https://github.com/Degurechaff57/dsh-openapi) | 4 | ⚪ unknown | Safe OpenAPI 3.x discovery & API calling tools. |
| [dsh-better-browser](https://github.com/titanwings/dsh-better-browser) | 3 | ⚪ unknown | Let agents drive the logged-in browser via Kimi WebBridge. |
| [dsh-worktree](https://github.com/FlashingChen/dsh-worktree) | 4 | ⚪ unknown | Codex-style permanent git worktrees plugin. |
| [graycode-for-dsh](https://github.com/Komeiji-Shiki/graycode-for-dsh) | 5 | ⚪ unknown | graycode encoding tool. |
| [dsh-expression](https://github.com/yyh-001/dsh-expression) | 2 | ⚪ unknown | dsh-expression — DSH plugin (tools) |
| [dsh-director-toolkit](https://github.com/lhmd/dsh-director-toolkit) | 6 | ⚪ unknown | DSH Director Toolkit is a DeepSeek Harness plugin for 3D artists, technical designers, and creative coders. Paste a half-formed i… |
| [codex-plugin-dsh](https://github.com/wingoo/codex-plugin-dsh) | 3 | ⚪ unknown | Use local Codex App Server as a model provider in DeepSeek Harness |
| [dsh-prompt-persona](https://github.com/Xilin3/dsh-prompt-persona) | 2 | ⚪ unknown | DSH plugin: edit the system prompt (deployment persona) from the Settings page, with live preview. |
| [dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) | 2 | ⚪ unknown | Declarative deny-by-default tool policy plugin for DeepSeek Harness |
| [dsh-plugin-graph](https://github.com/erduotong/dsh-plugin-graph) | 2 | ⚪ unknown | dsh-plugin-graph — DSH plugin (tools) |
| [dsh-research-notes](https://github.com/fff122/dsh-research-notes) | 3 | ⚪ unknown | A lightweight research notes plugin for DeepSeek Harness |
| [nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) | 4 | ⚪ unknown | Nowledge Mem community plugin bundle for DeepSeek Harness |
| [dsh-vsc-integration](https://github.com/HarcoChen/dsh-vsc-integration) | 2 | ⚪ unknown | Deepseek-Harness Vscode Integration |
| [dsh-safe-delete](https://github.com/Qintsg/dsh-safe-delete) | 2 | ⚪ unknown | Safe delete plugin for DeepSeek Harness (DSH): move files to trash / staging area instead of permanent removal, with restore and… |
| [dsh-plugins](https://github.com/HackSing/dsh-plugins) | 3 | ⚪ unknown | A bilingual, continuously maintained directory of plugins for DeepSeek Harness (DSH). |
| [dsh-report-html](https://github.com/hccccc01333/dsh-report-html) | 2 | ⚪ unknown | Generate self-contained interactive HTML reports from Markdown, tables, charts, China province maps, flowcharts, math, and drill-… |
| [dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) | 2 | ⚪ unknown | OpenAI Codex OAuth login and usage card plugin for DeepSeek Harness |
| [dsh-github-connector](https://github.com/kaziii/dsh-github-connector) | 2 | ⚪ unknown | GitHub connector for DeepSeek Harness (dsh): one-click connect, create/review/merge PRs from the conversation |
| [deepseek-pet](https://github.com/keleus/deepseek-pet) | 5 | ⚪ unknown | deepseek-pet — DSH plugin (tools) |
| [dsh-index](https://github.com/Sunrisepeak/dsh-index) | 2 | ⚪ unknown | DeepSeek Harness Plugin Package Index - Install dsh-plugin with just one command |
| [dsh-web-search-firecrawl](https://github.com/yangzhe1003/dsh-web-search-firecrawl) | 2 | ⚪ unknown | Firecrawl-backed search provider plugin for the DeepSeek Harness web capability seam (ctx.web) |
| [dsh-plugin-template](https://github.com/bugmaker2/dsh-plugin-template) | 6 | ⚪ unknown | Template for deepseek-harness plugin development. |
| [dsh-composer-history](https://github.com/PerryLink/dsh-composer-history) | 1 | ⚪ unknown | Terminal-style input history for the DeepSeek Harness web composer - edge-first arrow keys, draft stashing with exact restore, Es… |
| [dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) | 2 | ⚪ unknown | dsh-fun-ticker — DSH plugin (tools) |
| [jumpserver-dsh](https://github.com/jumpserver-east/jumpserver-dsh) | 1 | ⚪ unknown | DeepSeek Harness plugin: manage JumpServer assets and operate on them through KoKo |
| [dsh-browser](https://github.com/ben7am1n/dsh-browser) | 1 | ⚪ unknown | Playwright-powered browser automation for DeepSeek Harness |
| [dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) | 1 | ⚪ unknown | AI turns repeated dev commands, prompts, and habits into one-click DeepSeek Harness actions. |
| [dsh-plugin-doctor](https://github.com/lin-cheng-lab/dsh-plugin-doctor) | 1 | ⚪ unknown | dsh-plugin-doctor — DSH plugin (tools) |
| [deepseek-harness-background](https://github.com/czzzlq/deepseek-harness-background) | 1 | ⚪ unknown | deepseek-harness背景自定义 |
| [task-passport](https://github.com/dongsheng123132/task-passport) | 2 | ⚪ unknown | Open task handoff protocol for DeepSeek Harness, WorkBuddy, Claude Code and Codex — verified state, not chat logs |
| [dsh-prompt-presets](https://github.com/fff122/dsh-prompt-presets) | 1 | ⚪ unknown | Local reusable prompt presets for DeepSeek Harness. |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 1 | ⚪ unknown | Cloudflare full-stack pnpm monorepo |
| [dsh-plugin-colorscheme](https://github.com/Civitasv/dsh-plugin-colorscheme) | 1 | ⚪ unknown | Colorscheme Plugin For DeepSeek Harness |
| [dsh-scout](https://github.com/omdsh-dev/dsh-scout) | 1 | ⚪ unknown | dsh-scout — DSH plugin (tools) |
| [dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) | 1 | ⚪ unknown | DSH plugin: pixel-diff two screenshots into diff.png + triptych (pixelmatch) — 像素对比工具 |
| [dsh-turn-index](https://github.com/Simon314620/dsh-turn-index) | 1 | ⚪ unknown | dsh-turn-index — DSH plugin (tools) |
| [dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) | 2 | ⚪ unknown | DSH plugin for controlling mobile devices (ADB/iOS) — DeepSeek Harness 操控手机插件 |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 1 | ⚪ unknown | Cloudflare full-stack pnpm monorepo |
| [dsh-tool-monitor](https://github.com/yoke233/dsh-tool-monitor) | 1 | ⚪ unknown | Monitor existing DeepSeek Harness background jobs without running commands twice |
| [dsh-suggest-prompt](https://github.com/studyzy/dsh-suggest-prompt) | 1 | ⚪ unknown | dsh-plugin suggest next prompt |
| [dsh-cloudflare-browser-run](https://github.com/RealAlexandreAI/dsh-cloudflare-browser-run) | 1 | ⚪ unknown | dsh browser-run: CF Browser Run web tools (markdown/screenshot/pdf) for DeepSeek Harness |
| [safe-find-dsh-plugins](https://github.com/Jinsong-Zhou/safe-find-dsh-plugins) | 1 | ⚪ unknown | Discover and install the best DeepSeek Harness plugins for a user's task |
| [dsh-all-search](https://github.com/RealAlexandreAI/dsh-all-search) | 1 | ⚪ unknown | dsh search: AnySearch web search provider for DeepSeek Harness (ctx.web) |
| [dsh-plugin-pixluna](https://github.com/PixLunaLab/dsh-plugin-pixluna) | 1 | ⚪ unknown | dsh-plugin-pixluna | 让 DSH 自己看涩图！ |
| [dsh-plugins-hub](https://github.com/TYEclipse/dsh-plugins-hub) | 1 | ⚪ unknown | Independent plugin index for DeepSeek Harness (dsh) — curated directory of community plugins, updated daily |
| [dsh-huadongbianzuqi](https://github.com/zjl88858/dsh-huadongbianzuqi) | 3 | ⚪ unknown | dsh-huadongbianzuqi — DSH plugin (tools) |
| [dsh-soul-md](https://github.com/Scorp1o117/dsh-soul-md) | 2 | ⚪ unknown | Soul.md persona for DeepSeek Harness | DeepSeek Harness 人设卡插件 |
| [dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) | 2 | ⚪ unknown | DSH daily fortune plugin with Guan Yin lots, Tarot spreads, and daily quotes |
| [dsh-plugin-rag](https://github.com/YYTbit/dsh-plugin-rag) | 1 | ⚪ unknown | Local knowledge base RAG for DeepSeek Harness |
| [dsh-model-selector](https://github.com/bitterSmilezzz/dsh-model-selector) | 1 | ⚪ unknown | DeepSeek Harness web plugin: provider-group collapse + name search for the conversation model picker. |
| [dsh-github](https://github.com/PerryLink/dsh-github) | 1 | ⚪ unknown | GitHub integration for DeepSeek Harness: create PRs, review PRs in background jobs, read issues - every write gated by human appr… |
| [dsh-plugin-review](https://github.com/Mingxi2077/dsh-plugin-review) | 1 | ⚪ unknown | DSH Review Mode plugin: multi-dimension code health scoring + radar chart + review history (DSH 审查模式插件) |
| [dsh-turn-budget](https://github.com/randerous/dsh-turn-budget) | 1 | ⚪ unknown | Advisory turn step-budget reminders for DeepSeek Harness — loop convergence guard (dsh-plugin) |
| [DIzzy-DSH](https://github.com/Acidmoon/DIzzy-DSH) | 1 | ⚪ unknown | My DSH plugins |
| [dsh-file-explorer](https://github.com/schhaohao/dsh-file-explorer) | 1 | ⚪ unknown | dsh-file-explorer |
| [dsh-tool-reqpipe](https://github.com/sikwoxy/dsh-tool-reqpipe) | 1 | ⚪ unknown | reqpipe — DeepSeek Harness 需求流水线插件（7 tools）+ Python CLI（需求→方案→评审→开发） |
| [dsh-ajw](https://github.com/rsagacom/dsh-ajw) | 1 | ⚪ unknown | dsh-ajw — DSH plugin (tools) |
| [dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) | 2 | ⚪ unknown | DSH Typewriter: WebAudio typing ambience with a plugin-owned settings API and zero audio assets |
| [dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) | 1 | ⚪ unknown | DSH plugin: triage port conflicts (reuse / switch / precise kill) — 端口占用处置 |
| [qiushi-dsh-evidence-audit](https://github.com/030611/qiushi-dsh-evidence-audit) | 2 | ⚪ unknown | Observe-only hash-chained evidence receipts for DeepSeek Harness |
| [dsh-plugin.github.io](https://github.com/dsh-plugin/dsh-plugin.github.io) | 1 | ⚪ unknown | DeepSeek Harness community plugin workshop and directory |
| [dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) | 1 | ⚪ unknown | DeepSeek Harness: Weixin |
| [dsh-lens-lite](https://github.com/ben7am1n/dsh-lens-lite) | 1 | ⚪ unknown | Post-edit diagnostics for DeepSeek Harness |
| [dsh-tavily-search](https://github.com/zhouzhencheng07/dsh-tavily-search) | 1 | ⚪ unknown | Free keyless Tavily web search tool for DeepSeek Harness (dsh) |
| [dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) | 2 | ⚪ unknown | DSH Web client plugin: pins off-screen expanded collapsible tags (Think / tool cards) to the top of the conversation viewport wit… |
| [dsh-openai-codex-oauth](https://github.com/dyuan311/dsh-openai-codex-oauth) | 1 | ⚪ unknown | ChatGPT subscription OAuth for the openai-codex provider in DeepSeek Harness |
| [dshx](https://github.com/why913/dshx) | 1 | ⚪ unknown | The missing companion CLI for DeepSeek Harness (dsh): manage MCP servers with dry-run checks, migrate from Claude Code / Codex in… |
| [dsh-reloader](https://github.com/lin-cheng-lab/dsh-reloader) | 1 | ⚪ unknown | dsh-reloader — DSH plugin (tools) |
| [dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) | 1 | ⚪ unknown | DSH plugin: bisect bugs (code / boundary / commit) — 二分法定位 bug 根因 |
| [dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) | 2 | ⚪ unknown | dsh-auto-chess — DSH plugin (tools) |
| [dsh-turn-meta](https://github.com/randerous/dsh-turn-meta) | 1 | ⚪ unknown | Opt-in per-step turn metadata for DeepSeek Harness — a minimal first-plugin template (dsh-plugin) |
| [dsh-tool-browser](https://github.com/MashedPotato817/dsh-tool-browser) | 1 | ⚪ unknown | Native browser automation tools for DeepSeek Harness, powered by Playwright + Edge |
| [dsh-music-plugin](https://github.com/syy-shark/dsh-music-plugin) | 2 | ⚪ unknown | DeepSeek Harness music plugin (dsh-plugin) |
| [dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) | 1 | ⚪ unknown | DSH plugin: run a command N rounds, judge by median/distribution — 批量回归取统计结论 |
| [dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) | 1 | ⚪ unknown | DSH plugin for controlling browsers (CDP/Playwright) — DeepSeek Harness 操控浏览器插件 |
| [dsh-code-ide](https://github.com/SakalioLabs/dsh-code-ide) | 1 | ⚪ unknown | DeepSeek Harness Code IDE Plugin |
| [matlab-modelsim-vivado-plugin](https://github.com/sjscy05/matlab-modelsim-vivado-plugin) | 2 | ⚪ unknown | DeepSeek Harness plugin: MATLAB + ModelSim + Vivado full-flow tools for digital communication IC design tasks (mmv-dspic) |
| [dsh-codex](https://github.com/Yan-Zero/dsh-codex) | 1 | ⚪ unknown | Use your ChatGPT subscription in DeepSeek Harness through OpenAI's Codex sign-in flow |
| [dsh-plugins](https://github.com/0sour/dsh-plugins) | 0 | ⚪ unknown | DeepSeek Harness (dsh) plugins by 0sour - ???? (dsh-plugin topic) |
| [dsh-2origin](https://github.com/dongsheng123132/dsh-2origin) | 0 | ⚪ unknown | Evidence-first 2Origin state projection, diff and immutable freeze for DeepSeek Harness |
| [dsh-terminal](https://github.com/ZgblKylin/dsh-terminal) | 1 | ⚪ unknown | Integrate terminal plugin for DeepSeek Harness |
| [dsh-survey](https://github.com/jinhuang712/dsh-survey) | 0 | ⚪ unknown | dsh-survey — DSH plugin (tools) |
| [deepseek-harness-plugin-manager](https://github.com/hrhgit/deepseek-harness-plugin-manager) | 1 | ⚪ unknown | Web plugin manager for DeepSeek Harness (DSH): inspect, search, group, enable, and disable Cordis plugins. |
| [dsh-co-authored-by](https://github.com/shelken/dsh-co-authored-by) | 1 | ⚪ unknown | dsh plugin: auto-inject Co-Authored-By and Generated-By trailers on git commit |
| [DSH-Plugs](https://github.com/JustGenius-s/DSH-Plugs) | 3 | ⚪ unknown | DSH Plugins Cellection |
| [dsh-host-web-compat](https://github.com/kelai141/dsh-host-web-compat) | 1 | ⚪ unknown | dsh-host-web-compat — DSH plugin (tools) |
| [dsh-doctor](https://github.com/jorinyang/dsh-doctor) | 0 | ⚪ unknown | DeepSeek Harness environment diagnostic tool: dsh_doctor checks env, profile, config, bundles, mount, port, health, and disk |
| [dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) | 0 | ⚪ unknown | Symbol-aware code indexing and hybrid search for DeepSeek Harness. |
| [dsh-doctor](https://github.com/asdf17128/dsh-doctor) | 0 | ⚪ unknown | Find what your DeepSeek Harness (dsh) patches silently broke — dead patches, config fields dropped by whole-config replacement, u… |
| [dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) | 0 | ⚪ unknown | DeepSeek Harness（DSH）备份/恢复 + 跨机同步插件：本地快照、WebDAV 推送/拉取、自动备份与失效归档清理。Snapshot backup, restore and cross-machine sync plugin for Deep… |
| [dsh-auto](https://github.com/simon300000/dsh-auto) | 0 | ⚪ unknown | dsh Auto Approve |
| [dsh-annotate](https://github.com/BrambleXu/dsh-annotate) | 2 | ⚪ unknown | Visual browser element annotation for DeepSeek Harness, capturing DOM, styles, accessibility data, comments, and viewport screens… |
| [dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) | 1 | ⚪ unknown | ChatGPT OAuth and Codex models for DeepSeek Harness. |
| [DSH-Decktop](https://github.com/JustGenius-s/DSH-Decktop) | 14 | ⚪ unknown | DSH-Decktop |
| [dsh-cad-review](https://github.com/dongsheng123132/dsh-cad-review) | 0 | ⚪ unknown | Evidence-first ASCII DXF inspection and deterministic CAD rule review for DeepSeek Harness |
| [dsh-xai](https://github.com/MirDie/dsh-xai) | 2 | ⚪ unknown | xAI Grok SuperGrok / X Premium OAuth for DeepSeek Harness |
| [dsh-academic-research](https://github.com/userInner/dsh-academic-research) | 0 | ⚪ unknown | Evidence-grounded bilingual academic research plugin for DeepSeek Harness and OnPeople |
| [dsh-plugin-hello](https://github.com/xu1132/dsh-plugin-hello) | 0 | ⚪ unknown | A minimal DeepSeek Harness community plugin that registers a callable hello tool |
| [deepseek-harness-rs](https://github.com/Tokimorphling/deepseek-harness-rs) | 0 | ⚪ unknown | A rust port for deepseek's harness |
| [dsh-prompt-enhancer](https://github.com/Fishsb/dsh-prompt-enhancer) | 0 | ⚪ unknown | dsh-prompt-enhancer — DSH plugin (tools) |
| [dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) | 0 | ⚪ unknown | Specification-driven development toolkit for DeepSeek Harness. |
| [dsh-plugins](https://github.com/ohtokaah-sys/dsh-plugins) | 0 | ⚪ unknown | DSH plugins by ohtokaah-sys: 行为宪法 / 协作模式 / 机械门禁 (tagged dsh-plugin) |
| [dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) | 1 | ⚪ unknown | Privacy-minimal heuristic per-turn verification summaries for DeepSeek Harness |
| [dsh-tool-chaos](https://github.com/cyanseek/dsh-tool-chaos) | 0 | ⚪ unknown | Deterministic fault injection and autonomous resilience tests for DeepSeek Harness tools |
| [dsh-robotic-harness](https://github.com/dingkaihu63/dsh-robotic-harness) | 2 | ⚪ unknown | Robotic Harness: embodied-intelligence research tools for DeepSeek Harness - robot asset inspection, MuJoCo pick-place simulation… |
| [dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) | 1 | ⚪ unknown | Cache-aware ChatGPT / Codex subscription plugin for DeepSeek Harness |
| [dsh-sticky-note](https://github.com/Meredith2328/dsh-sticky-note) | 1 | ⚪ unknown | dsh-sticky-note — DSH plugin (tools) |
| [dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) | 0 | ⚪ unknown | DeepSeek Harness 3D 角色生成插件：直连 Meshy / Hunyuan3D / Tripo3D / Rodin 官方 API，自配 key，mock 回退 |
| [dsh-mdbox](https://github.com/Chi-hong22/dsh-mdbox) | 0 | ⚪ unknown | DeepSeek Harness (DSH) Web 输入框的 Markdown 编辑辅助插件。 |
| [dsh-kanban](https://github.com/isolat-3k/dsh-kanban) | 0 | ⚪ unknown | dsh-kanban — DSH plugin (tools) |
| [dsh-tool-git](https://github.com/lxj808624/dsh-tool-git) | 0 | ⚪ unknown | Structured safe Git tools for DeepSeek Harness (dsh): git_status/diff/log/branch/stage/commit/stash/show + destructive-command gu… |
| [dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) | 0 | ⚪ unknown | Move the info bar at the bottom of the chat to next to the title |
| [dsh-mcp-manager](https://github.com/1a125/dsh-mcp-manager) | 0 | ⚪ unknown | DSH global MCP manager |
| [dsh-tray](https://github.com/qing3a/dsh-tray) | 0 | ⚪ unknown | DeepSeek Harness Windows 系统托盘插件（trayicon exe 宿主，无 native 编译） |
| [dsh-oauth-mcp-client](https://github.com/springbrand-lab/dsh-oauth-mcp-client) | 6 | ⚪ unknown | OAuth 2.1 Streamable HTTP MCP client plugin for DeepSeek Harness. |
| [dsh-playwright-browser](https://github.com/Clizo1209/dsh-playwright-browser) | 5 | ⚪ unknown | Playwright browser automation for DeepSeek Harness｜面向 DeepSeek Harness 的 Playwright 浏览器自动化插件 |
| [deepseek-harness-action](https://github.com/Lixiaoyiao/deepseek-harness-action) | 2 | ⚪ unknown | Community GitHub Action for DeepSeek Harness — AI Code Review · CI Diagnosis · Auto Fix · Issue → PR |
| [Oh-My-DSH](https://github.com/NoWint/Oh-My-DSH) | 2 | ⚪ unknown | DeepSeek Harness 插件精选集 · 300+ dsh-plugin 收录 · 22 大分类 |
| [dsh-win-terminal-inspector](https://github.com/clearkurt/dsh-win-terminal-inspector) | 2 | ⚪ unknown | Windows (win32) terminal inspection for DSH persistent/PTY shells |
| [dsh-tool-hashline](https://github.com/InklingYoshi584/dsh-tool-hashline) | 2 | ⚪ unknown | Hash-anchored read/edit/grep tools for DeepSeek Harness: every line carries a content hash, stale anchors are rejected before tou… |
| [dsh-view-modes](https://github.com/NigelYao/dsh-view-modes) | 1 | ⚪ unknown | view modes for deepseek harness, including Verbose, Normal, Summary Mode |
| [dsh-codex-oauth](https://github.com/Babulubobo/dsh-codex-oauth) | 1 | ⚪ unknown | use your codex subscription in deepseek harness |
| [dsh-figma-to-lottie](https://github.com/zimai233/dsh-figma-to-lottie) | 1 | ⚪ unknown | Figma/SVG to Lottie animation compiler for DeepSeek Harness. Turn SVG paths and keyframe data into self-contained .lottie.json fi… |
| [opencode-usage](https://github.com/AmaTsumeAkira/opencode-usage) | 1 | ⚪ unknown | OpenCode Go 订阅额度徽章插件（dsh bundle） | OpenCode Go quota badge plugin for dsh |
| [dsh-plugin-git-inspect](https://github.com/Wanbinyu/dsh-plugin-git-inspect) | 1 | ⚪ unknown | Read-only Git inspection tools for DeepSeek Harness |
| [dsh-html-canvas](https://github.com/Jinsong-Zhou/dsh-html-canvas) | 1 | ⚪ unknown | A DeepSeek Harness plugin that turns AI-generated HTML into a click-to-edit canvas beside the chat |
| [dsh-turn-approval](https://github.com/arrow949/dsh-turn-approval) | 1 | ⚪ unknown | Turn-scoped "Allow for this task" approvals for DeepSeek Harness. |
| [dsh-plugins](https://github.com/mouliangyu/dsh-plugins) | 1 | ⚪ unknown | Community plugins for DeepSeek Harness |
| [dsh-plugin-knowledge-graph](https://github.com/Luke-Yong/dsh-plugin-knowledge-graph) | 1 | ⚪ unknown | dsh-plugin-knowledge-graph for Deepseek Harness |
| [dsh-document-parser](https://github.com/miaobuao/dsh-document-parser) | 1 | ⚪ unknown | A DeepSeek Harness document parsing tool powered by LiteParse |
| [long-draft-input](https://github.com/Heyflyingpig/long-draft-input) | 1 | ⚪ unknown | Deepseek Harness 插件：用于聚合发送框长文本 |
| [dsh-playwright-native](https://github.com/mitao-su/dsh-playwright-native) | 1 | ⚪ unknown | 把原生 Playwright CLI 注册为 DeepSeek Harness 透传工具（dsh-plugin） |
| [dsh-composer-polish](https://github.com/tianji-qingtian/dsh-composer-polish) | 1 | ⚪ unknown | DeepSeek Harness plugin: one-click ✨ composer draft polishing — flash rewrite, auto fill-back into the input box |
| [dsh-code-impact](https://github.com/baidd1011/dsh-code-impact) | 1 | ⚪ unknown | 面向 DeepSeek Harness 的只读 TypeScript/JavaScript 代码变更影响分析插件 Read-only TypeScript/JavaScript change impact analysis plugin for DeepSe… |
| [dsh-oauth-api](https://github.com/hahaha-taotao/dsh-oauth-api) | 1 | ⚪ unknown | DeepSeek Harness (dsh) out-of-tree OAuth plugin for Grok/xAI, Codex, and Claude Code. Community plugin, not official. |
| [dsh-plugin](https://github.com/acosmi/dsh-plugin) | 1 | ⚪ unknown | Community plugin collection for DeepSeek Harness (DSH) |
| [dsh-zh-output](https://github.com/YKennen/dsh-zh-output) | 1 | ⚪ unknown | DeepSeek Harness 中文输出插件：强制中文思考与输出的中文预设 |
| [dsh-excel-chat](https://github.com/hccccc01333/dsh-excel-chat) | 1 | ⚪ unknown | dsh-excel-chat — talk to Excel in DeepSeek Harness: create, edit, repair, and verify spreadsheets by conversation (cells, formula… |
| [dsh-eyecare](https://github.com/Yummyxl/dsh-eyecare) | 1 | ⚪ unknown | dsh护眼插件 |
| [dsh-plugin-healthcheck](https://github.com/chenw2759-wq/dsh-plugin-healthcheck) | 1 | ⚪ unknown | 害怕插件装了就崩溃？用这个插件帮你检测插件是否正常/是否含木马！ |
| [deepseek-harness-openai-oauth](https://github.com/DGPisces/deepseek-harness-openai-oauth) | 1 | ⚪ unknown | DeepSeek Harness provider for GPT models using managed ChatGPT OAuth through Codex app-server |
| [dsh-plugin-browser](https://github.com/xu1132/dsh-plugin-browser) | 1 | ⚪ unknown | A DeepSeek Harness community plugin that drives a headless Playwright browser: rendered page text, screenshots, and page automati… |
| [deepseek-plugin-store](https://github.com/Ericwong5021/deepseek-plugin-store) | 1 | ⚪ unknown | DeepSeek Harness 独立社区插件商店：发现、安装并提交经过验证的插件、工具与扩展。 | Independent community plugin directory. |
| [dsh-plugin-store](https://github.com/wink-run/dsh-plugin-store) | 1 | ⚪ unknown | deepseek harness plugin store |
| [dsh-aura-scheduler](https://github.com/ljsysfurryACE/dsh-aura-scheduler) | 0 | ⚪ unknown | Proactive scheduling for DeepSeek Harness: Aura heartbeat + value network (official is model-driven only) |
| [harness-pet](https://github.com/cakeni/harness-pet) | 0 | ⚪ unknown | Harness Pet — an unofficial community pet for DeepSeek Harness. Not affiliated with, endorsed by, or maintained by DeepSeek. |
| [dsh-egress-guard](https://github.com/LKRCharon/dsh-egress-guard) | 0 | ⚪ unknown | Local, zero-network, fail-closed secret preflight for DeepSeek Harness model requests. |
| [dsh-geo](https://github.com/winyh/dsh-geo) | 0 | ⚪ unknown | 生成式引擎优化（GEO）DeepSeek Harness 插件：面向本地 Markdown 知识库的 SEO、GEO 与 AEO 审计工具。 |
| [dsh-video-downloader](https://github.com/zimai233/dsh-video-downloader) | 0 | ⚪ unknown | Media downloader for DeepSeek Harness. Detect and download video/audio from Bilibili, YouTube, Douyin, Xiaohongshu. |
| [dsh-mermaid-preview](https://github.com/realguan/dsh-mermaid-preview) | 0 | ⚪ unknown | Render Mermaid fenced code blocks as diagrams in DeepSeek Harness (dsh) web — a dynamic Cordis client plugin, no shell changes ne… |
| [dsh-web-search-provider](https://github.com/hiyms/dsh-web-search-provider) | 0 | ⚪ unknown | Native web search provider for the DeepSeek Harness web seam (ctx.web): OpenAI Responses API (search/open_page/find_in_page) and… |
| [dsh-action-parity](https://github.com/dongsheng123132/dsh-action-parity) | 0 | ⚪ unknown | Cross-surface action binding and replay parity evidence for DeepSeek Harness |
| [dsh-input-history](https://github.com/omdsh-dev/dsh-input-history) | 0 | ⚪ unknown | DSH Web 输入历史插件：Ctrl+Up / Ctrl+Down 像终端一样召回与切换已发送消息，零核心改动 |
| [dsh-tool-backtest](https://github.com/dmsobtl/dsh-tool-backtest) | 0 | ⚪ unknown | DSH 插件：策略回测引擎 — 定义买卖信号，跑历史数据，输出绩效指标。 |
| [dsh-plugins](https://github.com/SisyphusSQ/dsh-plugins) | 0 | ⚪ unknown | A monorepo for composable DeepSeek Harness (DSH) plugins. |
| [dsh-plugin-quote-reply](https://github.com/yangYzc/dsh-plugin-quote-reply) | 0 | ⚪ unknown | DSH plugin: select text in a conversation, then quote it into the composer or reply in a new window. / DeepSeek Harness 划词引用插件：选中… |
| [dsh-sound](https://github.com/yeshimei/dsh-sound) | 0 | ⚪ unknown | Distinct alert sounds for DeepSeek Harness: network error, approval request, question asked, and turn-completion notifications. |
| [dsh-tool-playwright](https://github.com/cheng-nan01/dsh-tool-playwright) | 0 | ⚪ unknown | 一个给 DeepSeek Harness 用的插件：让 AI 能真的打开浏览器上网——打开网页、点按钮、填表单、翻页、看页面内容，就像人一样操作浏览器。 |
| [knowlp-rag](https://github.com/wly8691-jpg/knowlp-rag) | 0 | ⚪ unknown | KnowLP-RAG: dual knowledge graph retrieval for Markdown notes - MCP stdio server for DeepSeek Harness (dsh) & Claude Code |
| [omdp](https://github.com/XJungit/omdp) | 0 | ⚪ unknown | only my DSH plugins — monorepo of DeepSeek Harness plugin bundles |
| [dsh-ProjectModel](https://github.com/Youngxj/dsh-ProjectModel) | 0 | ⚪ unknown | deepseek项目组功能 |
| [dsh-pain-point-check](https://github.com/ICCuse/dsh-pain-point-check) | 0 | ⚪ unknown | Enforced pain-point-check guard plugin for DeepSeek Harness: after two non-converged experiments it injects the three questions,… |
| [dsh-entity-dd](https://github.com/sherconan/dsh-entity-dd) | 0 | ⚪ unknown | 出海交易对手尽调 · DeepSeek Harness 插件：先确认你在跟哪个法人签约，再判断这份登记资料能不能作为决策依据。免费官方数据源，无需密钥。 |
| [dsh-wash-calendar](https://github.com/zimai233/dsh-wash-calendar) | 0 | ⚪ unknown | Recurring habit scheduling calendar for DeepSeek Harness. Turn last-wash dates and intervals into next-occurrence, schedule, chec… |
| [dsh-codex-auth](https://github.com/suntianc/dsh-codex-auth) | 0 | ⚪ unknown | DeepSeek Harness plugin that reuses the local Codex CLI ChatGPT login and adds a native GPT Auth settings card |
| [dsh-code-lens](https://github.com/lisycotana/dsh-code-lens) | 0 | ⚪ unknown | Observability for DeepSeek Harness code-mode sub-dispatches: the tool calls a run_code program makes that the model never sees. |
| [dsh-subprocess-inherit-environment](https://github.com/zhangzujian/dsh-subprocess-inherit-environment) | 0 | ⚪ unknown | DSH plugin that forwards the complete Harness environment through ctx.subprocess |
| [dsh-doctor-windows](https://github.com/sublatesublate-design/dsh-doctor-windows) | 0 | ⚪ unknown | Windows environment diagnostics for DeepSeek Harness |

### 🧩 Skills

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) | 5 | ⚪ unknown | Agent skills for building & testing DSH plugins. |
| [dsh-plugin-codex-bridge](https://github.com/YYTbit/dsh-plugin-codex-bridge) | 2 | ⚪ unknown | Bridge codex skills and config into DeepSeek Harness |
| [dsh-plugin-opencode-bridge](https://github.com/YYTbit/dsh-plugin-opencode-bridge) | 2 | ⚪ unknown | Bridge opencode skills and config into DeepSeek Harness |
| [dsh-plugin-pi-bridge](https://github.com/YYTbit/dsh-plugin-pi-bridge) | 2 | ⚪ unknown | Bridge pi skills and config into DeepSeek Harness |
| [dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) | 3 | ⚪ unknown | dsh plugin: DeepSeek Harness 的模型层 = raincode(模型池/缓存/重试) + /skills 浏览 |
| [dsh-skill-manager](https://github.com/bitterSmilezzz/dsh-skill-manager) | 1 | ⚪ unknown | Skills management page for DeepSeek Harness Web Settings (dsh plugin) |
| [dsh-plugin-auto-docs](https://github.com/YYTbit/dsh-plugin-auto-docs) | 1 | ⚪ unknown | Auto documentation generation skill for DeepSeek Harness |
| [dsh-plugin-code-review](https://github.com/YYTbit/dsh-plugin-code-review) | 1 | ⚪ unknown | Structured code review skill for DeepSeek Harness |
| [dsh-find-skill](https://github.com/Moximxxx/dsh-find-skill) | 1 | ⚪ unknown | dsh plugin bridging the vercel-labs/skills ecosystem: LLM-driven skill search, install, and lifecycle for temp/project/global sco… |
| [spike-faye-lei-dsh-skills](https://github.com/spike-faye-lei/spike-faye-lei-dsh-skills) | 1 | ⚪ unknown | spike-faye-lei/dsh-skills |
| [dsh-academic-skill](https://github.com/TohsakaRIN521/dsh-academic-skill) | 1 | ⚪ unknown | dsh-academic-skill — DSH plugin (skills) |
| [dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) | 1 | ⚪ unknown | DeepSeek Harness plugin for the SeismicX earthquake-catalog skill |
| [rpg-maker-mac-skill](https://github.com/HomophonicFate/rpg-maker-mac-skill) | 0 | ⚪ unknown | DeepSeek Harness skill：macOS 上运行 RPG Maker MV/MZ 游戏并集成 MTool 翻译文件 |
| [dsh-skill-manager](https://github.com/JimmyJin2006/dsh-skill-manager) | 0 | ⚪ unknown | dsh-skill-manager — DSH plugin (skills) |
| [dsh-plugin-longgraph](https://github.com/levi-qiao/dsh-plugin-longgraph) | 1 | ⚪ unknown | DeepSeek Harness community plugin: longgraph / loop-graph / loop-converge authoring skills on ctx.skills |
| [superpowers-dsh](https://github.com/LayneChai/superpowers-dsh) | 1 | ⚪ unknown | Superpowers skills for DeepSeek Harness: TDD, debugging, planning, and collaboration skills adapted from obra/superpowers |
| [dsh-skill-viewer](https://github.com/Fishquito7/dsh-skill-viewer) | 2 | ⚪ unknown | DSH Web UI plugin: Skills settings section with hot enable/disable, delete and add |
| [dsh-PaddleOCR-Skills](https://github.com/Aidenwu0209/dsh-PaddleOCR-Skills) | 0 | ⚪ unknown | PaddleOCR skills for DeepSeek Harness with native tools and GUI configuration |

### 🎨 UI

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 1110 | ⚪ unknown | DSH Web UI plugin & skin collection: task board, git panel, etc. |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 463 | ⚪ unknown | Sidebar workbench: file render/terminal/git/subagent |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 24 | ⚪ unknown | Customize the whale-girl thinking-status label |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 326 | ⚪ unknown | DSH Web whale-girl skin series |
| [dsh-focus-chat](https://github.com/dingyi222666/dsh-focus-chat) | 9 | ⚪ unknown | Focused-chat minimal session view |
| [dsh-side-panel](https://github.com/ccq1/dsh-side-panel) | 13 | ⚪ unknown | DSH side panel: file browser, terminal, git review |
| [dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) | 7 | ⚪ unknown | Session progress bar: todos progress + live token rate |
| [dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) | 22 | ⚪ unknown | Hand-drawn pixel whale companion |
| [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) | 25 | ⚪ unknown | Selection annotation: select→annotate→send |
| [dsh-chat-width](https://github.com/chen-001/dsh-chat-width) | 3 | ⚪ unknown | Adjust the width of dsh's reply |
| [dsh-companion](https://github.com/william-jin-cmu/dsh-companion) | 3 | ⚪ unknown | Resident desktop companion: global hotkey/automation/plugin market |
| [dsh-genui](https://github.com/omdsh-dev/dsh-genui) | 45 | ⚪ unknown | Inline interactive UI components in chat |
| [dsh-input-history](https://github.com/lhh010/dsh-input-history) | 4 | ⚪ unknown | Input history: Ctrl+Up/Down to recall sent messages |
| [dsh-navbar](https://github.com/vlln/dsh-navbar) | 9 | ⚪ unknown | Conversation node navbar |
| [dsh-paste-input](https://github.com/lhh010/dsh-paste-input) | 7 | ⚪ unknown | Paste/drag/drop file input enhancement |
| [dsh-plugin-background](https://github.com/gameswu/dsh-plugin-background) | 5 | ⚪ unknown | DSH wallpaper plugin |
| [tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) | 2 | ⚪ unknown | 仿同花顺的webui插件 |
| [dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) | 3 | ⚪ unknown | Excel-style DSH skin |
| [dsh-deeplink](https://github.com/qyw233/dsh-deeplink) | 1 | ⚪ unknown | Deep-link plugin: open session/workspace directly |
| [dsh-diff-viewer](https://github.com/lehhair/dsh-diff-viewer) | 4 | ⚪ unknown | PiUI-style diff viewer replacing the stock DiffBlock |
| [dsh-drag-and-drop](https://github.com/bill9109/dsh-drag-and-drop) | 2 | ⚪ unknown | Cross-platform file drag & drop with raw path insertion |
| [dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) | 5 | ⚪ unknown | QQ2006 skin plugin |
| [dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) | 2 | ⚪ unknown | Session completion + 4-state notifications |
| [dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | 1 | ⚪ unknown | Keyboard-first command palette |
| [dsh-ths-skin](https://github.com/AdamPlatin123/dsh-ths-skin) | 1 | ⚪ unknown | THS terminal-style skin + K-line panel |
| [dsh-tps](https://github.com/Small-tailqwq/dsh-tps) | 1 | ⚪ unknown | TPS skin plugin |
| [dsh-ultra-ui](https://github.com/havingautism/dsh-ultra-ui) | 1 | ⚪ unknown | (no description) |
| [dsh-web-ui-notify](https://github.com/bill9109/dsh-web-ui-notify) | 4 | ⚪ unknown | Desktop notifications for DSH |
| [ex-setting](https://github.com/omdsh-dev/ex-setting) | 1 | ⚪ unknown | DSH settings extension |
| [whale-girl](https://github.com/vlln/whale-girl) | 80 | ⚪ unknown | QQ-pet-style desktop pet plugin |
| [dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) | 4 | ⚪ unknown | Web plugin replacing the DSH status display. |
| [dsh-ramify](https://github.com/yanglongyun/dsh-ramify) | 5 | ⚪ unknown | Creative branching canvas: tree workspaces for generation & compare. |
| [dsh-xiaohei](https://github.com/opensetk/dsh-xiaohei) | 4 | ⚪ unknown | Luo Xiaohei skin plugin for dsh. |
| [dsh-xiaoyao-skins](https://github.com/147228/dsh-xiaoyao-skins) | 10 | ⚪ unknown | DSH Web skin collection, installer & authoring toolchain. |
| [dsh-wikilink](https://github.com/zhaoscsc/dsh-wikilink) | 2 | ⚪ unknown | Obsidian-style [[wikilink]] mentions for the DeepSeek Harness web GUI: fuzzy-search note titles and attach their contents to the… |
| [deepseek-harness-skin](https://github.com/HeiGeAi/deepseek-harness-skin) | 5 | ⚪ unknown | deepseek-harness-skin — DSH plugin (ui) |
| [dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) | 3 | ⚪ unknown | Replace dsh's built-in web search with search MCP servers (Tavily/Brave/Exa/Perplexity/DuckDuckGo/custom), configured from the we… |
| [dsh-kanban](https://github.com/Ericwong5021/dsh-kanban) | 2 | ⚪ unknown | Task board plugin for the DeepSeek Harness Web UI |
| [dsh-event-auditor](https://github.com/qing3a/dsh-event-auditor) | 1 | ⚪ unknown | dsh-event-auditor — DSH plugin (ui) |
| [dsh-web-search-tavily](https://github.com/crayonlu/dsh-web-search-tavily) | 1 | ⚪ unknown | Tavily-backed web search provider for DeepSeek Harness (ctx.web) — no DeepSeek API key required |
| [dsh-pet](https://github.com/FlytoMAYDAY80/dsh-pet) | 1 | ⚪ unknown | dsh-pet — DSH plugin (ui) |
| [dsh-miku-skin](https://github.com/stushansusu/dsh-miku-skin) | 1 | ⚪ unknown | dsh-miku-skin — DSH plugin (ui) |
| [dsh-ui-workbench](https://github.com/LoftyTao/dsh-ui-workbench) | 1 | ⚪ unknown | dsh-ui-workbench — DSH plugin (ui) |
| [dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) | 2 | ⚪ unknown | DSH weather tab and weather-following themes powered by Open-Meteo |
| [dsh-test-runner](https://github.com/suimi8/dsh-test-runner) | 1 | ⚪ unknown | DSH plugin: structured test runner tool (test_run) — auto-detect vitest/jest/pytest/node:test, run tests, parse failure summaries… |
| [dsh-web-search-firecrawl](https://github.com/crayonlu/dsh-web-search-firecrawl) | 1 | ⚪ unknown | Firecrawl-backed web search provider for DeepSeek Harness (ctx.web) — no DeepSeek API key required |
| [dsh-web-background](https://github.com/BruceWu1126/dsh-web-background) | 1 | ⚪ unknown | DeepSeek Harness Web UI background customization plugin |
| [dsh-skins](https://github.com/Moeblack/dsh-skins) | 1 | ⚪ unknown | Mirror of dsh-external/dsh-skins + feat: harbor (夕港) dusk-harbor skin |
| [dsh-portable-tavern](https://github.com/XCNXNXNX/dsh-portable-tavern) | 1 | ⚪ unknown | dsh-portable-tavern — DSH plugin (ui) |
| [dsh-builtin-toggles](https://github.com/Starfie1d1272/dsh-builtin-toggles) | 1 | ⚪ unknown | Safe GUI toggles for optional built-in plugins in DeepSeek Harness Web. |
| [dsh-science](https://github.com/omdsh-dev/dsh-science) | 0 | ⚪ unknown | Reproducible Python and R work on DeepSeek Harness, built as plugins. |
| [dsh-skin](https://github.com/KinGao294/dsh-skin) | 1 | ⚪ unknown | Skin switcher + custom wallpaper for DeepSeek Harness (dsh): curated --dsw-alias-* palettes, translucent wallpaper with opacity/b… |
| [dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) | 0 | ⚪ unknown | dsh-pomodoro — DSH plugin (ui) |
| [dsh-theme-neko](https://github.com/drfccv/dsh-theme-neko) | 1 | ⚪ unknown | A Nachoneko (甘城猫猫) themed skin for the DeepSeek Harness web GUI. |
| [dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) | 1 | ⚪ unknown | DeepSeek Harness plugin for generating synchronized K12 English PPTX and DOCX lesson materials |
| [dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) | 0 | ⚪ unknown | Attention reminders for the DeepSeek Harness Web UI: frame badge, (N) tab title and whale-favicon recolor for sessions waiting fo… |
| [harness-whale](https://github.com/cakeni/harness-whale) | 0 | ⚪ unknown | Unofficial community pet for DeepSeek Harness — a native DSH web plugin |
| [dsh-conversation-indicator](https://github.com/smanx/dsh-conversation-indicator) | 0 | ⚪ unknown | Conversation indicator plugin for the DeepSeek Harness web GUI: a compact rail beside the scrollbar marks each user message; hove… |
| [dsh-black-whale](https://github.com/147228/dsh-black-whale) | 0 | ⚪ unknown | dsh-black-whale — DSH plugin (ui) |
| [dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) | 0 | ⚪ unknown | Community plugins for DeepSeek Harness (DSH) |
| [dsh-client-ui-responsive](https://github.com/kelai141/dsh-client-ui-responsive) | 0 | ⚪ unknown | dsh-client-ui-responsive — DSH plugin (ui) |
| [dsh-ui-skins](https://github.com/edwardyang0011/dsh-ui-skins) | 0 | ⚪ unknown | DeepSeek Harness Skin Plugin |
| [nightwhale](https://github.com/nightwhale-dev/nightwhale) | 0 | ⚪ unknown | nightwhale — DSH plugin (ui) |
| [dsh-auto-continue](https://github.com/HsiangNianian/dsh-auto-continue) | 8 | ⚪ unknown | DSH Web UI plugin: automatically sends "继续" (continue) when a request is interrupted by network errors or other non-human causes |
| [dskin](https://github.com/dancingmemory/dskin) | 6 | ⚪ unknown | DSKIN · DeepSeek Harness（DSH）卡通像素皮肤插件 / Cartoon pixel skin plugin for DSH Web GUI — 原始界面不动，像素宠物会散步、眨眼、跳跃 / living pixel pets that… |
| [dsh-webui-auth](https://github.com/Yuuz12/dsh-webui-auth) | 2 | ⚪ unknown | Persistent auth plugin for DeepSeek Harness WebUI: enforce login at the HTTP/transport layer (resources, /api, WebSocket) — unbyp… |
| [DSH-for-VSC](https://github.com/yauntyour/DSH-for-VSC) | 2 | ⚪ unknown | 把 DeepSeek Harness（DSH）的 WebUI 搬进 VS Code：编辑器内嵌面板 + 侧边栏控制台，服务离线自动拉起，日志随时可查。 |
| [deepseek-harness-themes](https://github.com/orxz/deepseek-harness-themes) | 2 | ⚪ unknown | A collection of UI themes for deepseek-harness. |
| [dsh-pixel-whale](https://github.com/yoke233/dsh-pixel-whale) | 1 | ⚪ unknown | A lively pixel-whale running-state companion for DeepSeek Harness Web. |
| [dsh-plugin](https://github.com/Gandufu/dsh-plugin) | 1 | ⚪ unknown | DeepSeek Harness 插件集合｜齐天大圣双主题皮肤，支持亮暗模式、响应式布局与热插拔 |
| [dsh-refined](https://github.com/djh2203/dsh-refined) | 1 | ⚪ unknown | DeepSeek-Refined 的 DeepSeek Harness 移植版 为 DeepSeek Harness（DSH）前端注入 Obsidian Border 风格的 Markdown 美化与多主题配色。 |
| [dsh-plugin-workshop](https://github.com/yyyyukari/dsh-plugin-workshop) | 1 | ⚪ unknown | Steam Workshop-style in-app plugin browser for DeepSeek Harness (DSH) Web UI - zero-server: search, trending windows, Chinese sea… |
| [dsh-funpack](https://github.com/lvyuchuiyi/dsh-funpack) | 1 | ⚪ unknown | ??????????????????????? DeepSeek Harness ?? |
| [dsh-ui-quote-selection](https://github.com/nekogpt/dsh-ui-quote-selection) | 1 | ⚪ unknown | Codex-style select-to-quote for DeepSeek Harness Web: quote any chat text into the composer as a native reference chip. |
| [dsh-whale-subagent](https://github.com/1while1/dsh-whale-subagent) | 1 | ⚪ unknown | A whale-girl themed subagent nest for the DeepSeek Harness, featuring pixel-animated subagent cards, real-time THINK/TODO trackin… |
| [dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck) | 1 | ⚪ unknown | Double-check before you ship: grill the requirements, test the implementation, prove the delivery. An engineering-discipline bund… |
| [dsh-plugin-manager](https://github.com/MAXeaglet/dsh-plugin-manager) | 1 | ⚪ unknown | DSH 插件管理器：桌面 GUI + CLI，管理 dsh 的 profile、插件与一键启动 dsh web (Tauri 2 + Node CLI) |
| [dsh-client-shortcuts](https://github.com/blue-a11y/dsh-client-shortcuts) | 1 | ⚪ unknown | Global keyboard shortcuts plugin for the DeepSeek Harness web GUI: ctx.shortcuts registry service + mod+l/mod+k/mod+shift+c defau… |
| [dsh-dashboard](https://github.com/baiyun200/dsh-dashboard) | 0 | ⚪ unknown | DSH 插件看板 · DeepSeek Harness 插件生态可视化（shadcn/ui，每日自动构建部署） |
| [dsh-web-text-drop](https://github.com/liceses/dsh-web-text-drop) | 0 | ⚪ unknown | DSH Web GUI 文本文件拖拽导入插件:把 md / txt / log / 代码等文本文件拖进页面, 按内容长度自动处理 —— 短内容直接进输入框,长内容复制到工作区并粘贴可读路径。 |
| [freestyle-dsh-theme](https://github.com/suzike/freestyle-dsh-theme) | 0 | ⚪ unknown | DeepSeek Harness 主题体验插件：OKLCH 主题提案 + 主题设计器（跨重启持久化） |
| [dsh-wordbox](https://github.com/arcmosin/dsh-wordbox) | 0 | ⚪ unknown | DSH Web GUI常用词箱子，方便项目常用词的存储和粘贴 | DSH Web GUI Common Words Box – for storing and pasting frequently used project terms." |
| [dsh-vault](https://github.com/Ox0400/dsh-vault) | 0 | ⚪ unknown | Encrypted credential vault for DeepSeek Harness — AES-256-GCM + TOTP, model tools + Settings UI |
| [dsh-voice](https://github.com/zhuiyueya/dsh-voice) | 0 | ⚪ unknown | Voice for DeepSeek Harness（dsh） — speech-to-text input + read-aloud TTS for text-only DeepSeek, zero API key. |
| [dsh-turn-watchdog](https://github.com/Equinox7379/dsh-turn-watchdog) | 0 | ⚪ unknown | Turn watchdog for DSH: detects stuck turns and injects a quiet warning. |
| [dsh-growth](https://github.com/winyh/dsh-growth) | 0 | ⚪ unknown | Growth acquisition and user growth analysis for DeepSeek Harness: AARRR, retention, MRR, experiments and unit economics. |
| [dsh-theme-taffy](https://github.com/Misaki14987/dsh-theme-taffy) | 0 | ⚪ unknown | 我不是雏草姬 |
| [dsh-waterball-pet](https://github.com/sundusk/dsh-waterball-pet) | 0 | ⚪ unknown | A floating water-ball pet plugin for the DeepSeek Harness Web UI. |
| [dsh-ui-background](https://github.com/ropz12138/dsh-ui-background) | 0 | ⚪ unknown | deepseek harness 的背景插件，会涉及一些其他组件css覆盖 |
| [dsh-ux](https://github.com/jiangnanquan/dsh-ux) | 0 | ⚪ unknown | DSH web UI 增强插件 + 无边框 Electron 桌面壳 |
| [dsh-narrative-ledger](https://github.com/dongsheng123132/dsh-narrative-ledger) | 0 | ⚪ unknown | Verifiable narrative state, continuity and character-knowledge ledger for DeepSeek Harness |
| [Dsh-UI-Enhance](https://github.com/xjackzenvey/Dsh-UI-Enhance) | 0 | ⚪ unknown | Deepseek Harness 增强工具 |

### 💬 Session

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [pi-discuss-mode](https://github.com/zwrong/pi-discuss-mode) | 11 | ⚪ unknown | Read-only discussion mode for Pi Coding Agent |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 27 | ⚪ unknown | Rewind conversation and workspace state |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 14 | ⚪ unknown | DSH conversation sharing plugin |
| [dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) | 15 | ⚪ unknown | Branch-based message editing, reroll, version timeline |
| [dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) | 6 | ⚪ unknown | Context injection audit: AGENTS.md/skills/tool-schema token cost |
| [dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) | 8 | ⚪ unknown | Frame-level scan diagnostics for zstd session files |
| [dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) | 3 | ⚪ unknown | Self-evolution: agent grows/prunes its own abilities |
| [dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) | 28 | ⚪ unknown | Cross-session long-term memory + background self-evolution |
| [dsh-web-archive](https://github.com/renat3u/dsh-web-archive) | 3 | ⚪ unknown | Fold noisy messages (Think/Bash) in conversation |
| [deepseek-manners](https://github.com/Moeblack/deepseek-manners) | 4 | ⚪ unknown | Inject gratitude into every message |
| [dsh-agent-budget](https://github.com/vibeinging/dsh-agent-budget) | 2 | ⚪ unknown | Native agent-tree token budget plugin |
| [dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) | 1 | ⚪ unknown | Share any segment of a DSH conversation |
| [dsh-kb-sieve](https://github.com/omdsh-dev/dsh-kb-sieve) | 1 | ⚪ unknown | Auditable knowledge-base packs (references + SQLite) |
| [dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) | 2 | ⚪ unknown | Local-first failure postmortems |
| [dsh-session-search](https://github.com/Tieboyh/dsh-session-search) | 2 | ⚪ unknown | Index-free cross-agent session search |
| [dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) | 3 | ⚪ unknown | Side-chain sessions: /side persistent + /btw one-off |
| [dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) | 1 | ⚪ unknown | Manual approval (Manual/Ask mode) |
| [dsh-turn-navigator](https://github.com/vibeinging/dsh-turn-navigator) | 1 | ⚪ unknown | DSH Web turn navigation plugin |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Export the append-only session log as human-readable Markdown / HTML, grouped by trajectory source (system prompt / reasoning / t… |
| [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) | 10 | ⚪ unknown | Import chat history from Claude Code/Codex/Reasonix into DSH. |
| [dsh-stream-rules](https://github.com/jiesou/dsh-stream-rules) | 3 | ⚪ unknown | Inject rules on demand without wasting context. |
| [dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) | 4 | ⚪ unknown | LLM-free lossless compaction engine. |
| [dsh-recall](https://github.com/Mongfayi/dsh-recall) | 3 | ⚪ unknown | Message recall plugin for DSH Web UI. |
| [dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) | 3 | ⚪ unknown | Bridge Claude Code memory, skills, and config into DeepSeek Harness |
| [dsh-goal-mode-enhance](https://github.com/KarlOfLaw/dsh-goal-mode-enhance) | 2 | ⚪ unknown | dsh-goal-mode-enhance — DSH plugin (session) |
| [context-vista](https://github.com/GooodWei/context-vista) | 2 | ⚪ unknown | context-vista — DSH plugin (session) |
| [dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) | 2 | ⚪ unknown | DeepSeek Harness (dsh) plugin: migrate Claude Code sessions, memory, skills and CLAUDE.md into DSH with seamless resume (claude_s… |
| [dsh-ergonomics](https://github.com/hisaniwo/dsh-ergonomics) | 2 | ⚪ unknown | dsh-ergonomics — DSH plugin (session) |
| [dsh-model-config-sync](https://github.com/LiangYin233/dsh-model-config-sync) | 3 | ⚪ unknown | dsh-model-config-sync — DSH plugin (session) |
| [dsh-undo](https://github.com/LingLambda/dsh-undo) | 2 | ⚪ unknown | Context undo/redo plugin for DeepSeek Harness (dsh): roll the model context back to the last completed step and restore it again. |
| [dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) | 2 | ⚪ unknown | dsh-session-timeline — DSH plugin (session) |
| [dsh-plugins](https://github.com/Yihong89/dsh-plugins) | 2 | ⚪ unknown | DeepSeek Harness (DSH) plugins. First: dsh-usage-report — per-session token usage & estimated cost (/usage + usage_report), price… |
| [dsh-superpowers](https://github.com/codeAnqiang-ma/dsh-superpowers) | 2 | ⚪ unknown | Superpowers (obra/superpowers) as a DeepSeek Harness plugin: the methodology skills plus their session bootstrap |
| [billion-context-dsh](https://github.com/Tyan66666/billion-context-dsh) | 7 | ⚪ unknown | Model-driven context management (Active Context Pruning / ACP) for the DeepSeek Harness — the model decides when and what to comp… |
| [dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) | 1 | ⚪ unknown | Persistent pinned-session menu for DeepSeek Harness |
| [dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) | 1 | ⚪ unknown | dsh-cue-plugin — DSH plugin (session) |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 1 | ⚪ unknown | Bounded, layered, approval-gated, auditable cross-session memory for DeepSeek Harness (capability seam: ctx.memory + SQLite provi… |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 3 | ⚪ unknown | dsh-archive-viewer — DSH plugin (session) |
| [dsh-memory](https://github.com/ben7am1n/dsh-memory) | 1 | ⚪ unknown | Durable cross-session SQLite memory for DeepSeek Harness |
| [dsh-plugins](https://github.com/hyls9527/dsh-plugins) | 2 | ⚪ unknown | Ecosystem plugins for DeepSeek Harness: bounded cross-session memory and skill lifecycle curation, ported from hermes-agent. Tagg… |
| [dsh-opencode-usage](https://github.com/moduqishi/dsh-opencode-usage) | 1 | ⚪ unknown | DeepSeek Harness (dsh web) plugin: opencode.ai 5h/week/month quota usage progress in the session header, frosted-glass detail pan… |
| [dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) | 1 | ⚪ unknown | Aggregate and natively control multiple remote DeepSeek Harness (DSH) servers' sessions from one official Web UI — hub gateway +… |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 1 | ⚪ unknown | Bounded, layered, approval-gated, auditable cross-session memory for DeepSeek Harness (capability seam: ctx.memory + SQLite provi… |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 3 | ⚪ unknown | dsh-archive-viewer — DSH plugin (session) |
| [dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) | 1 | ⚪ unknown | OpenAI Codex provider for DeepSeek Harness with device-code OAuth, Codex CLI import, token refresh, and a web settings panel. |
| [dsh-memory](https://github.com/Jesse-njx/dsh-memory) | 1 | ⚪ unknown | Cited memory over DSH's lossless session log — distilled, human-auditable facts with citations back to the exact source events; m… |
| [dsh-workbench](https://github.com/echo-escape/dsh-workbench) | 1 | ⚪ unknown | dsh-workbench — DSH plugin (session) |
| [dsh-codex-import](https://github.com/918154429/dsh-codex-import) | 1 | ⚪ unknown | Read-only Codex setup compatibility scanner for DeepSeek Harness |
| [dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) | 1 | ⚪ unknown | Pin sessions in the DeepSeek Harness (DSH) web sidebar - dual-face plugin with a hover pin badge, durable pinning, and top orderi… |
| [dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) | 1 | ⚪ unknown | dsh-prompt-stash — DSH plugin (session) |
| [dsh-open-in-finder](https://github.com/moduqishi/dsh-open-in-finder) | 1 | ⚪ unknown | DeepSeek Harness (dsh web) plugin: one-click open-in-Finder icon in the session header. |
| [dsh-mcp-proxy](https://github.com/ben7am1n/dsh-mcp-proxy) | 1 | ⚪ unknown | Context-cheap lazy MCP access for DeepSeek Harness |
| [dsh-nocturne-memory](https://github.com/RealAlexandreAI/dsh-nocturne-memory) | 1 | ⚪ unknown | dsh memory: Nocturne Memory client for DeepSeek Harness |
| [dsh-balance](https://github.com/TwotwoPiggy/dsh-balance) | 2 | ⚪ unknown | A DeepSeek Harness plugin for real-time token tracking and highly accurate session cost estimation, featuring dynamic peak/off-pe… |
| [dsh-mneme](https://github.com/modusensus/dsh-mneme) | 3 | ⚪ unknown | dsh-mneme — DSH plugin (session) |
| [dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) | 2 | ⚪ unknown | dsh-cost-meter — DSH plugin (session) |
| [dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) | 1 | ⚪ unknown | DeepSeek Harness plugin integrating claude-mem (memory for dsh) |
| [dsh-revive](https://github.com/omdsh-dev/dsh-revive) | 2 | ⚪ unknown | dsh-revive — DSH plugin (session) |
| [dsh-plugin-wepre](https://github.com/shujiTech/dsh-plugin-wepre) | 1 | ⚪ unknown | DeepSeek Harness plugin: publish single-screen content cards to WePre Next from a dsh agent session |
| [dsh-plugin-meta-memory](https://github.com/YYTbit/dsh-plugin-meta-memory) | 1 | ⚪ unknown | Structured long-term memory system for DeepSeek Harness |
| [dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) | 1 | ⚪ unknown | Second-model AI auto-review for DeepSeek Harness approval requests: a read-only reviewer subagent returns structured allow/deny v… |
| [DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) | 2 | ⚪ unknown | Use DeepSeek Harness in VS Code like ChatGPT/Copilot: @dsh in native chat, standalone views, cross-project sessions, shared via D… |
| [dsh-plugin-context-compressor](https://github.com/YYTbit/dsh-plugin-context-compressor) | 1 | ⚪ unknown | Context compression skill for DeepSeek Harness |
| [dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) | 1 | ⚪ unknown | Logical-call context taxonomy plugin for DeepSeek Harness |
| [dsh-tdai-memory](https://github.com/Scorp1o117/dsh-tdai-memory) | 2 | ⚪ unknown | Agent memory for DeepSeek Harness | DeepSeek Harness 记忆插件 |
| [dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) | 1 | ⚪ unknown | Request Context Profiler for DeepSeek Harness — see what changed between model requests, and how cache reuse changed with it. |
| [dsh-plugin-session-import](https://github.com/huguangyu666/dsh-plugin-session-import) | 1 | ⚪ unknown | DeepSeek Harness plugin: import claude-code / codex / reasonix / zcode sessions |
| [dsh-resume-plugin](https://github.com/Demogorgon314/dsh-resume-plugin) | 1 | ⚪ unknown | dsh-resume-plugin — DSH plugin (session) |
| [dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) | 1 | ⚪ unknown | Cross-session persistent cost ledger for DeepSeek Harness: logs every LLM token usage to SQLite and exposes record/query/budget t… |
| [dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) | 0 | ⚪ unknown | DeepSeek Harness plugin: import OpenAI Codex conversation history into DSH sessions via /codex-import | 用 /codex-import 把 Codex 历… |
| [dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) | 0 | ⚪ unknown | Continual self-evolution plugin for DeepSeek Harness: versioned, auditable, rollback-safe harness state refined from session traj… |
| [dsh-command-opt](https://github.com/csiroqa/dsh-command-opt) | 0 | ⚪ unknown | dsh-command-opt — DSH plugin (session) |
| [dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) | 1 | ⚪ unknown | Fail-closed export-copy redaction for DeepSeek Harness session telemetry |
| [dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) | 1 | ⚪ unknown | Native interactive Git diff review for DeepSeek Harness with structured annotations sent back to the current Agent session. DeepS… |
| [dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) | 1 | ⚪ unknown | dsh-usage-widget — DSH plugin (session) |
| [dsh-balance-meter](https://github.com/Ghost011118/dsh-balance-meter) | 7 | ⚪ unknown | DeepSeek account balance and session cost readout for the DeepSeek Harness Web GUI |
| [dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) | 2 | ⚪ unknown | dsh-cost-chip — DSH plugin (session) |
| [dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) | 0 | ⚪ unknown | ♾️ Copy and export the LaTeX in DeepSeek Harness 悬停任意 LaTeX 公式即可复制 TeX 源码或导出为独立的 SVG 文件 |
| [dsh-memory](https://github.com/Towzai/dsh-memory) | 0 | ⚪ unknown | Cross-session memory plugin for DeepSeek Harness (dsh): embedding search + automatic system-prompt injection |
| [mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) | 1 | ⚪ unknown | Editable, session-isolated personalization memory for DeepSeek Harness |
| [dsh-auto-compact](https://github.com/wangxiang0605qvq/dsh-auto-compact) | 0 | ⚪ unknown | DeepSeek Harness 自动压缩插件：模型工具 compact_now，回合结束后自动压缩上下文 | Auto compaction plugin for DSH: compact_now tool, compacts context after… |
| [dsh-hotkeys](https://github.com/csiroqa/dsh-hotkeys) | 0 | ⚪ unknown | dsh-hotkeys — DSH plugin (session) |
| [dsh-plugin-jinji](https://github.com/quan2005/dsh-plugin-jinji) | 1 | ⚪ unknown | dsh-plugin-jinji — DSH plugin (session) |
| [dsh-memory](https://github.com/Amengclass/dsh-memory) | 0 | ⚪ unknown | Persistent, model-editable memory/notes store for DeepSeek Harness. Adds memory_set/get/delete/search tools backed by ctx.storage… |
| [dsh-supervisor](https://github.com/Wha1eChai/dsh-supervisor) | 0 | ⚪ unknown | Community control-plane plugin for DeepSeek Harness live sessions |
| [dsh-archive-viewer](https://github.com/csiroqa/dsh-archive-viewer) | 0 | ⚪ unknown | DSH archive enhancements: periodic archive, LLM summaries, session notes. |
| [dsh-plugin-asmemory](https://github.com/Xplore-LAB/dsh-plugin-asmemory) | 0 | ⚪ unknown | Action-State Memory Engine: typed time-series memory (states + actions) with trend/anomaly/causal analysis for DeepSeek Harness |
| [powercontext-dsh](https://github.com/knqiufan/powercontext-dsh) | 4 | ⚪ unknown | DeepSeek Harness plugin that connects to a PowerContext Server over HTTP for recall, memory, handoff, experience, and skills. |
| [dsh-balance-stats](https://github.com/pangzi499/dsh-balance-stats) | 2 | ⚪ unknown | Balance, session cost, token usage, and invoice summaries for DeepSeek Harness Web. |
| [dsh-session-import](https://github.com/kinyokun/dsh-session-import) | 2 | ⚪ unknown | DSH 会话日志导入插件:解析 /export 的 zip/jsonl,结构真实性验证 + SHA-256 指纹校验,同步模型/预设/权限等状态,导入/删除实时推送免刷新 |
| [dsh-usage-plugin](https://github.com/Yihong89/dsh-usage-plugin) | 2 | ⚪ unknown | DeepSeek Harness (DSH) plugins. First: dsh-usage-report — per-session token usage & estimated cost (/usage + usage_report), price… |
| [DeepSeek-Harness-billing-plugin](https://github.com/WilliamLIiii/DeepSeek-Harness-billing-plugin) | 2 | ⚪ unknown | DeepSeek Harness billing plugin: account balance + per-model remaining-task estimator with a session-header badge |
| [dsh4vscode](https://github.com/DoggyHU/dsh4vscode) | 2 | ⚪ unknown | DSH Chat for VS Code — DeepSeek Harness chat windows inside VS Code (OpenCode-style independent sessions, model auto-routing) |
| [deepseek-billing-plugin](https://github.com/xinCodes/deepseek-billing-plugin) | 2 | ⚪ unknown | DeepSeek Harness (DSH) 插件：DeepSeek 官方 API 余额与当前会话费用估算 |
| [dsh-history](https://github.com/xuender/dsh-history) | 2 | ⚪ unknown | Recall and re-run the current session's command history with ↑/↓ keys in the DSH Web composer. |
| [dsh-pin-recall](https://github.com/kerwin2046/dsh-pin-recall) | 1 | ⚪ unknown | DeepSeek Harness plugin: pin assistant replies and recall them into the model turn |
| [dsh-deepseek-billing](https://github.com/Jolly-J/dsh-deepseek-billing) | 1 | ⚪ unknown | DSH WebUI 插件:DeepSeek 余额显示与按会话费用估算 |
| [dsh-checkpoint](https://github.com/dpskh/dsh-checkpoint) | 1 | ⚪ unknown | Mark an exploration start in the session; pairs with rewind to fold the exploration out of context. |
| [dsh-plugin-sysmon](https://github.com/hnmrxz/dsh-plugin-sysmon) | 1 | ⚪ unknown | Local system resource monitor (CPU / memory / disk / load / uptime) for the DeepSeek Harness bottom status bar. |
| [dsh-worktrees](https://github.com/Alexis-fish/dsh-worktrees) | 1 | ⚪ unknown | Git worktree isolation for parallel DeepSeek Harness sessions |
| [dsh-token-panel](https://github.com/juhe291/dsh-token-panel) | 1 | ⚪ unknown | Real-time token consumption HUD plugin for DeepSeek Harness. Live token usage monitor, context pressure, cost estimation, history… |
| [dsh-plugin-usage-dashboard](https://github.com/hnmrxz/dsh-plugin-usage-dashboard) | 1 | ⚪ unknown | DeepSeek usage & cost dashboard for the DSH bottom status bar: per-session token/cost aggregation with low-balance budget alert. |
| [dsh-token-monitor](https://github.com/zhangzheng25/dsh-token-monitor) | 1 | ⚪ unknown | DeepSeek Harness plugin: token usage & conversation stats as a native settings page - today / 7d / 30d totals, GitHub-style 90-da… |
| [dsh-system-proxy](https://github.com/khiqwq/dsh-system-proxy) | 1 | ⚪ unknown | DSH host plugin - smart outbound HTTP(S) routing: named proxies (http/https/socks4/4a/5/5h), per-host/provider/plugin rules, dire… |
| [dsh-background-agents](https://github.com/PerryLink/dsh-background-agents) | 1 | ⚪ unknown | Interactive long-session background agents for DeepSeek Harness: start a durable continuable child agent, watch its progress in t… |
| [dsh-rewind](https://github.com/dpskh/dsh-rewind) | 1 | ⚪ unknown | Fold everything since the last checkpoint mark into an auto-generated report, replacing it in context while keeping the full log. |
| [dsh-side-chat](https://github.com/KarlOfLaw/dsh-side-chat) | 1 | ⚪ unknown | Parent-session-aware side chat plugin for DeepSeek Harness |
| [dsh-slice-agent-loop](https://github.com/TT-Wang/dsh-slice-agent-loop) | 1 | ⚪ unknown | A drop-in DeepSeek Harness agent loop whose context engine is a bounded slice instead of a growing transcript |
| [dsh-model-router](https://github.com/tianji-qingtian/dsh-model-router) | 1 | ⚪ unknown | Model router & cost optimizer for DeepSeek Harness: heuristic tier routing, failure fallback, and live per-session token/cache/co… |
| [dsh-everything-oauth](https://github.com/kam74515-boop/dsh-everything-oauth) | 1 | ⚪ unknown | Import local Codex / Grok / Claude / OpenCode / CC Switch logins into DeepSeek Harness |
| [dsh-agent-replay](https://github.com/forrestsweet/dsh-agent-replay) | 1 | ⚪ unknown | DeepSeek Harness 会话回放与脱敏分享插件：将真实 Agent 轨迹导出为独立交互 HTML，用于文档、演示和问题反馈。 |
| [dsh-memory-director](https://github.com/ljsysfurryACE/dsh-memory-director) | 0 | ⚪ unknown | MemoryDirector plugin for DeepSeek Harness: LLM-driven remember/forget (official harness has no memory) |
| [dsh-bottom-stats](https://github.com/318197375/dsh-bottom-stats) | 0 | ⚪ unknown | DSH plugin: full-width conversation stats line (no truncation) + context occupancy progress bar for the DeepSeek Harness web UI |
| [tmcra-deepseek-harness-memory](https://github.com/reshuibuduo/tmcra-deepseek-harness-memory) | 0 | ⚪ unknown | TMCRA Agent 长期记忆系统的 DeepSeek Harness 接入插件：自动延续跨对话项目记忆，并沉淀项目知识与工作经验。 |
| [dsh-skillradar](https://github.com/hellosky983/dsh-skillradar) | 0 | ⚪ unknown | Skill Radar for DeepSeek Harness (dsh): scan the current session's visible skills, score relevance against the conversation, and… |
| [dsh-plugin](https://github.com/Suxeca/dsh-plugin) | 0 | ⚪ unknown | DSH 会话切换面板插件（Ctrl+K / Ctrl+[ ]，npm 可装）+ 插件开发模板 |
| [dsh-ui-progress](https://github.com/omdsh-dev/dsh-ui-progress) | 0 | ⚪ unknown | DSH Web UI 会话进度插件：输入框停靠区常驻会话进度条（todos 真实进度 / 实时 token 生成速率 / 中断橘红态 / 待办提醒），零核心改动 |
| [dsh-git-branch-switcher](https://github.com/mixin-ai/dsh-git-branch-switcher) | 0 | ⚪ unknown | DeepSeek Harness web plugin: git branch pill in the session header with UI branch switching |
| [dsh-plugins](https://github.com/NinjaSln-labs/dsh-plugins) | 0 | ⚪ unknown | DSH plugin collection: DeepSeek Harness community plugins (session-health, knowledge, ...) |
| [dsh-skill-evolve](https://github.com/dmsobtl/dsh-skill-evolve) | 0 | ⚪ unknown | DSH 插件：Agent 自我进化引擎 — 从成功会话中自动提炼可复用 skill，越用越聪明。 |
| [dsh-mcp-adapter](https://github.com/NexusAgentX/dsh-mcp-adapter) | 0 | ⚪ unknown | MCP adapter for DeepSeek Harness — one proxy tool instead of dumping every MCP schema into context. |
| [dsh-session-analyst](https://github.com/dmsobtl/dsh-session-analyst) | 0 | ⚪ unknown | DSH 插件：Agent 会话质量分析 —— 工具成功率、token 效率、冗余调用检测、跨会话回归对比。PS：上传文件有点问题，等我重新整理下 |
| [dsh-tmcra-memory](https://github.com/reshuibuduo/dsh-tmcra-memory) | 0 | ⚪ unknown | TMCRA Agent 长期记忆系统的 DeepSeek Harness 接入插件：跨对话延续项目记忆，自动沉淀项目知识与工作经验。 |

### 🧠 LLM

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 253 | ⚪ unknown | Vision for text-only models: image QA, screenshot OCR, UI reconstruction |
| [Deepseek-omnimodal](https://github.com/good-boy4069/Deepseek-omnimodal) | 3 | ⚪ unknown | Open-source multimodal MCP for text-only agents |
| [dsh-computer-use](https://github.com/Anionex/dsh-computer-use) | 15 | ⚪ unknown | Computer-use plugin (accessibility observation + scoped permission) |
| [dsh-vision](https://github.com/william-jin-cmu/dsh-vision) | 15 | ⚪ unknown | view_image tool bridging any OpenAI-compatible VLM |
| [modlens](https://github.com/liustack/modlens) | 923 | ⚪ unknown | The first vision plugin for DeepSeek Harness — let text-only models see. |
| [agent-vision-toolkit](https://github.com/Anionex/agent-vision-toolkit) | 709 | ⚪ unknown | Vision toolbox & skills for text-only models: multi-image QA, UI reconstruction, GUI automation. |
| [dsh-tool-turbo](https://github.com/Electricitysheep/dsh-tool-turbo) | 4 | ⚪ unknown | Per-round reasoning_effort optimizer. |
| [dsh-plugin-cost-tracker](https://github.com/YYTbit/dsh-plugin-cost-tracker) | 3 | ⚪ unknown | Token cost tracker for DeepSeek Harness. |
| [dsh-cost](https://github.com/GiantGKL/dsh-cost) | 3 | ⚪ unknown | DSH token cost tracking plugin. |
| [dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) | 4 | ⚪ unknown | DeepSeek brain + auto image recognition via VLM. |
| [dsh-her-eyes](https://github.com/huashenglian/dsh-her-eyes) | 3 | ⚪ unknown | DSH plugin letting AI auto-invoke VLM for vision analysis. |
| [dsh-recommend](https://github.com/zp-home/dsh-recommend) | 3 | ⚪ unknown | dsh-recommend — DSH plugin (llm) |
| [dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) | 3 | ⚪ unknown | dsh-hdc-bridge — DSH plugin (llm) |
| [dsh-plugin-deepeye](https://github.com/Favio8/dsh-plugin-deepeye) | 4 | ⚪ unknown | DeepEye vision plugin for DeepSeek Harness (DSH): image description, OCR, VQA, UI layout, and clipboard analysis. |
| [dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) | 2 | ⚪ unknown | Tiered auto-review for DeepSeek Harness: static-rule safety net + LLM reviewer + human fallback — auto-allow safe actions, deny i… |
| [dsh-mcp-manager](https://github.com/hyqhyq3/dsh-mcp-manager) | 5 | ⚪ unknown | MCP server manager plugin for DeepSeek Harness: Settings → MCP page, OAuth (PKCE + dynamic client registration) or static-token a… |
| [dsh-llm-codex-oauth](https://github.com/Player-MINEPIG/dsh-llm-codex-oauth) | 2 | ⚪ unknown | dsh-llm-codex-oauth — DSH plugin (llm) |
| [dsh-payload-capture](https://github.com/Moeblack/dsh-payload-capture) | 1 | ⚪ unknown | dsh-payload-capture — DSH plugin (llm) |
| [doubao-vision-dsh](https://github.com/hawkongz/doubao-vision-dsh) | 1 | ⚪ unknown | doubao-vision-dsh — DSH plugin (llm) |
| [dsh-vision-LMstudio](https://github.com/TiankunDai/dsh-vision-LMstudio) | 1 | ⚪ unknown | dsh-vision-LMstudio — DSH plugin (llm) |
| [dsh-tool-vision](https://github.com/Scorp1o117/dsh-tool-vision) | 2 | ⚪ unknown | Vision model for DeepSeek Harness | DeepSeek Harness 外置视觉模型插件 |
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
| [dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) | 2 | ⚪ unknown | DSH Pet Corner: a floating pet, keyless pet-image proxy, favorites, and plugin-owned settings API |
| [dsh-eco-router](https://github.com/joyfoxai/dsh-eco-router) | 1 | ⚪ unknown | A token-efficient model-routing flywheel for the DeepSeek Harness. |
| [dsh-effort-config](https://github.com/benzhoupo/dsh-effort-config) | 1 | ⚪ unknown | dsh plugin: configure reasoning-effort levels (wire spellings), route default level and Anthropic token budgets for third-party m… |
| [dsh-image-to-path](https://github.com/cesaryike/dsh-image-to-path) | 1 | ⚪ unknown | dsh-image-to-path — DSH plugin (llm) |
| [dsh-vision](https://github.com/xiaoshihou514/dsh-vision) | 1 | ⚪ unknown | DeepSeek Harness: vision |
| [dsh-usage-meter](https://github.com/cute-baobao/dsh-usage-meter) | 1 | ⚪ unknown | DeepSeek Harness plugin: per-model daily token usage recorder (input/output/cache hits) with a Web GUI dashboard. |
| [dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) | 1 | ⚪ unknown | One-key ClawRouters plugin for DeepSeek Harness: chat, image, video, and web search |
| [dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) | 0 | ⚪ unknown | On-device macOS OCR and Apple Vision for DeepSeek Harness — one native plugin with a bundled Skill. |
| [dsh-plugin-llm-codex](https://github.com/jasper-zsh/dsh-plugin-llm-codex) | 0 | ⚪ unknown | 让 DeepSeek Harness（DSH） 通过 ChatGPT/Codex 订阅调用 openai-codex 模型，无需配置 OpenAI API Key。 |
| [dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) | 1 | ⚪ unknown | DeepSeek Harness client plugin: constant-rate typewriter reveal for assistant output and reasoning, with per-model gating. |
| [dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) | 1 | ⚪ unknown | Reusable Markdown prompt profiles for DeepSeek Harness with per-turn model selection, argument substitution, and state restoratio… |
| [dsh-polyglot](https://github.com/Jesse-njx/dsh-polyglot) | 0 | ⚪ unknown | dsh-polyglot — the model switch for DSH: generic OpenAI-compatible ctx.llm adapter, curated free/cheap DeepSeek presets, automati… |
| [dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) | 2 | ⚪ unknown | Floating draggable token usage statistics panel for DeepSeek Harness |
| [dsh-cost](https://github.com/dongsheng123132/dsh-cost) | 0 | ⚪ unknown | Evidence-first token cost ledger and budget checks for DeepSeek Harness |
| [dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) | 0 | ⚪ unknown | DSH usage report: daily/monthly token & cost aggregation, alerts. |
| [dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) | 0 | ⚪ unknown | DSH (DeepSeek Harness) web plugin: thinking intensity / reasoning effort settings for custom OpenAI-compatible (pi-ai) models |
| [dsh-vision-sidecar](https://github.com/121103qwq/dsh-vision-sidecar) | 0 | ⚪ unknown | Hosted free vision sidecar for DeepSeek Harness with durable session evidence |
| [owlx-mcp](https://github.com/Chungor/owlx-mcp) | 0 | ⚪ unknown | OwlX MCP server - live crypto structure scores, MemeSniper, token financials and recorded signal hit-rate as MCP tools for Claude… |
| [dsh-qwen-mm](https://github.com/RRRosmontis/dsh-qwen-mm) | 0 | ⚪ unknown | Qwen-MM-Plugins integration bundle for DeepSeek Harness (dsh) — multimodal MCP tools (vision, OCR, ASR, search, video, Blender, F… |
| [noatmark-dsh-plugin](https://github.com/ylwl1997/noatmark-dsh-plugin) | 1 | ⚪ unknown | NoAtMark text hygiene as a DeepSeek Harness (dsh) plugin — sanitize untrusted text, scan invisible characters, clean LLM formatti… |
| [dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) | 0 | ⚪ unknown | dsh-cost-display — DSH plugin (llm) |
| [dsh-plugin-provider-quota](https://github.com/jasper-zsh/dsh-plugin-provider-quota) | 0 | ⚪ unknown | dsh-plugin-provider-quota — DSH plugin (llm) |
| [dsh-codebuddy](https://github.com/Lbryany/dsh-codebuddy) | 0 | ⚪ unknown | CodeBuddy OAuth, dynamic models, and reasoning controls for DeepSeek Harness |
| [DeepSeek-harness-qqbot](https://github.com/sliverp/DeepSeek-harness-qqbot) | 4 | ⚪ unknown | QQ Bot text and image channel plugin for DeepSeek Harness |
| [dsh-advisor](https://github.com/omdsh-dev/dsh-advisor) | 4 | ⚪ unknown | Advisor - Pair a second model that passively reviews each turn and injects notes. 搭配一个会在每轮对话被动注入见解和审查的副模型。 |
| [DeepSeek-harness-wecom](https://github.com/sliverp/DeepSeek-harness-wecom) | 3 | ⚪ unknown | WeCom AI Bot text and image bridge for DeepSeek Harness |
| [dsh-codex-subscription](https://github.com/yequ172672/dsh-codex-subscription) | 2 | ⚪ unknown | DSH 插件:直接复用 Codex CLI 本地登录订阅凭证,在 DeepSeek Harness 中使用 ChatGPT 订阅模型,无需 API Key | DSH plugin: reuse your Codex CLI local subscripti… |
| [dsh-vision](https://github.com/oil-oil/dsh-vision) | 2 | ⚪ unknown | Near-native image understanding for DeepSeek Harness |
| [dsh-approval-ai](https://github.com/ang-XWBWZ/dsh-approval-ai) | 1 | ⚪ unknown | AI approval answerer for DeepSeek Harness (DSH) using the unified LLM route with fail-closed policy checks. |
| [dsh-plugin](https://github.com/PicGo/dsh-plugin) | 1 | ⚪ unknown | Upload images and files to your image host from DeepSeek Harness, powered by PicGo |
| [dsh-ui-appearance](https://github.com/TQSY114514/dsh-ui-appearance) | 1 | ⚪ unknown | Appearance customization plugin for DeepSeek Harness: theme color palette, background image, opacity/blur, glass effect |
| [dsh-vision-bridge](https://github.com/Xieweikang123/dsh-vision-bridge) | 1 | ⚪ unknown | Give a text-only dsh model eyes: pasted images recognized into text via an OpenAI-compatible vision endpoint. |
| [dsh-mimo-agent-tools](https://github.com/ch1bug/dsh-mimo-agent-tools) | 1 | ⚪ unknown | Xiaomi MiMo search + multimodal tools for DeepSeek Harness agents: mimo_search/vision/audio/video/asr/tts |
| [dsh-background](https://github.com/luoyu-xingu/dsh-background) | 1 | ⚪ unknown | DeepSeek Harness Web 背景图片插件:本地图片路径替换网页背景,外观设置行 + 实时预览 |
| [dsh-llm-fallbacks](https://github.com/omdsh-dev/dsh-llm-fallbacks) | 1 | ⚪ unknown | An dsh plugin for role-based LLM retry&fallback strategy. 基于角色的模型重试备用策略插件 |
| [dsh-qrcode](https://github.com/hellosky983/dsh-qrcode) | 0 | ⚪ unknown | 离线二维码生成器：DeepSeek Harness 插件，纯本地、零网络、零 shell，给模型一个 qrcode 工具 |
| [DeepSeek-harness-weixin](https://github.com/sliverp/DeepSeek-harness-weixin) | 0 | ⚪ unknown | Weixin ClawBot channel plugin for DeepSeek Harness with QR login and text/image messaging |
| [dsh-api-usage-bar](https://github.com/hurry060215-tech/dsh-api-usage-bar) | 0 | ⚪ unknown | Cache-aware API token usage bar for the DeepSeek Harness Web UI |
| [dsh-image-reader](https://github.com/zcXie777/dsh-image-reader) | 0 | ⚪ unknown | Give DeepSeek Harness agents native image reading: a read_image tool backed by any OpenAI-compatible vision endpoint. |
| [dsh-media-skills](https://github.com/akqwpeter-prog/dsh-media-skills) | 0 | ⚪ unknown | 给 DeepSeek Harness 装上「眼睛」和「画笔」——免费读图 + 免费生图 Skill。Eyes & brush for DeepSeek Harness: free image reading & generation. 👁️🎨 |
| [dsh-qwen-multimodal](https://github.com/wuwangmao/dsh-qwen-multimodal) | 0 | ⚪ unknown | DSH bundle: Qwen multimodal bridge — vision (qwen3-vl), speech-to-text (qwen3-asr), text-to-image (qwen-image), for DeepSeek Harn… |
| [vision_kit](https://github.com/Seom-ingit/vision_kit) | 0 | ⚪ unknown | Make your AI agent a math tutor. Structured extraction of vectors, matrices & geometry from math figures, with dimension-consiste… |
| [dsh-plugin-file-manager](https://github.com/jasper-zsh/dsh-plugin-file-manager) | 0 | ⚪ unknown | 面向 DeepSeek Harness（DSH） Web 界面的会话文件管理器插件。它在会话标题栏增加“文件”入口，打开后展示该会话工作区的文件树、Git 状态，并支持直接预览文本、图片和视频。 |
| [ds-vision-plugin](https://github.com/Sorwcyra/ds-vision-plugin) | 0 | ⚪ unknown | Paste images into DeepSeek Harness with a four-model vision race, OCR, and an automatic text bridge. |
| [dsh-minigames](https://github.com/omdsh-dev/dsh-minigames) | 0 | ⚪ unknown | DSH Web UI 右侧小游戏面板：18 款离线小游戏（恐龙跳一跳 / 俄罗斯方块 / 坦克大战 / 扫雷 / 2048 / 数独 / 吃豆人 / 跟枪练习等），可扩展游戏注册表，等待模型回复或修 bug 时的摸鱼神器 |
| [dsh-vision](https://github.com/237229953-create/dsh-vision) | 0 | ⚪ unknown | DSH plugin: text-only models (e.g. DeepSeek-V4) automatically see images via a vision model. Official surface-replace, cache-frie… |

### 🛡️ Sandbox

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-plugin-miliastra-toolbox](https://github.com/1475505/dsh-plugin-miliastra-toolbox) | 2 | ⚪ unknown | dsh-plugin-miliastra-toolbox — DSH plugin (sandbox) |
| [dsh-same-mode-sandbox-noop](https://github.com/zhangzujian/dsh-same-mode-sandbox-noop) | 0 | ⚪ unknown | DSH compatibility plugin for redundant same-mode sandbox escalation requests |
| [dsh-shell-termux](https://github.com/kelai141/dsh-shell-termux) | 0 | ⚪ unknown | dsh-shell-termux — DSH plugin (sandbox) |
| [dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) | 0 | ⚪ unknown | dsh-bash-win — DSH plugin (sandbox) |
| [dsh-tensorlake-sandbox](https://github.com/tensorlakeai/dsh-tensorlake-sandbox) | 3 | ⚪ unknown | A deepseek harness plugin for tensorlake sandbox |

### 🎛️ Orchestration

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [openhanako](https://github.com/liliMozi/openhanako) | 6024 | ⚪ unknown | Personal AI agent with memory, personality and autonomy |
| [exo](https://github.com/exoharness/exo) | 644 | ⚪ unknown | Fully recursive agent+harness that self-edits at runtime |
| [synergy](https://github.com/SII-Holos/synergy) | 542 | ⚪ unknown | General-purpose agent for the Open Agentic Web |
| [ccteam](https://github.com/firstintent/ccteam) | 151 | ⚪ unknown | Orchestrates Claude Code/Codex/Grok/Kimi into one team |
| [MateBot](https://github.com/aresbit/MateBot) | 46 | ⚪ unknown | A claudeclaw clone |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 41 | ⚪ unknown | Skill-driven harness/loop engineering workflow plugin |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 49 | ⚪ unknown | Bring Claude Code's UltraCode mode to DSH with governable multi-agent orchestration |
| [agents-go](https://github.com/zzir/agents-go) | 13 | ⚪ unknown | Multi-agent framework in Go |
| [distill](https://github.com/LoserFox/distill) | 13 | ⚪ unknown | Auto conversation distillation: background subagent reflection |
| [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 168 | ⚪ unknown | AgentTeams plugin |
| [dsh-automation](https://github.com/titanwings/dsh-automation) | 19 | ⚪ unknown | Run scheduled tasks in fresh sessions per plan |
| [dsh-loop](https://github.com/vlln/dsh-loop) | 2 | ⚪ unknown | Scheduled loop (/loop command + tool) |
| [dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | 2 | ⚪ unknown | Plan annotator: annotate plan text line-by-line |
| [dsh-task-status](https://github.com/vlln/dsh-task-status) | 7 | ⚪ unknown | Background task status bar |
| [dsh-work](https://github.com/vibeinging/dsh-work) | 14 | ⚪ unknown | Local-first AI workbench for DSH plugins |
| [dsh-advisor](https://github.com/btspoony/dsh-advisor) | 4 | ⚪ unknown | Second model passively reviews each turn and injects advice |
| [dsh-artifact](https://github.com/william-jin-cmu/dsh-artifact) | 1 | ⚪ unknown | File delivery protocol: send_artifact tool |
| [dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) | 6 | ⚪ unknown | Adaptive deep-research orchestrator plugin |
| [dsh-explain](https://github.com/yuezengwu/dsh-explain) | 3 | ⚪ unknown | Local-first learning mode: cross-session learning thread |
| [dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) | 1 | ⚪ unknown | Role-based LLM retry & fallback strategy |
| [dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | 4 | ⚪ unknown | Condition-driven wakeup: durable file/command/http triggers |
| [dsh-track](https://github.com/fakechris/dsh-track) | 3 | ⚪ unknown | Embedded task management engine: decision-point protocol |
| [eragear-code-copilot](https://github.com/TongDucThanhNam/eragear-code-copilot) | 0 | ⚪ unknown | Empty shell repo (no description) |
| [dsh-plugin-product-subagents](https://github.com/shaokeyibb/dsh-plugin-product-subagents) | 5 | ⚪ unknown | Role-based Codex/Claude Code/ACP subagent presets. |
| [dsh-milestone](https://github.com/SnowCrescenter-tech/dsh-milestone) | 5 | ⚪ unknown | Git-style milestone timeline plugin. |
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
| [dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) | 2 | ⚪ unknown | DSH book-to-skill plugin: a 5-stage long task (fetch → parse → understand → generate → install) with 3 human gates, host tools fo… |
| [dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) | 2 | ⚪ unknown | Prime Agent-inspired persistent RLM control plane for DeepSeek Harness Code Mode |
| [dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) | 4 | ⚪ unknown | dsh-fail-logger — DSH plugin (orchestration) |
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
| [dsh-product-delivery-workflow](https://github.com/wellorbetter/dsh-product-delivery-workflow) | 1 | ⚪ unknown | 100% AI-native product delivery workflow plugin for DeepSeek Harness: full product-to-release pipeline (research → PRD → OpenSpec… |
| [dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) | 0 | ⚪ unknown | dsh-plugin-dev-skill — DSH plugin (orchestration) |
| [vscode-deepseek-harness](https://github.com/kalynnka/vscode-deepseek-harness) | 1 | ⚪ unknown | Unofficial: drive your own DeepSeek Harness (dsh) as a native VS Code chat agent, beside Claude Code and Codex. |
| [dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) | 1 | ⚪ unknown | Git status, diff, commit, pull request, and worktree workflows for DeepSeek Harness. |
| [dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) | 0 | ⚪ unknown | Verified current-source search workflow for DeepSeek Harness |
| [dsh-landscape](https://github.com/cyanseek/dsh-landscape) | 0 | ⚪ unknown | Agent-first DeepSeek Harness plugin intelligence: verify existing plugins, identify missing capabilities, and generate build-read… |
| [dsh-wecom](https://github.com/TtTRz/dsh-wecom) | 1 | ⚪ unknown | WeCom AI Bot channel for DeepSeek Harness — every chat runs a persistent, preset-backed agent with real tools. |
| [dsh-push](https://github.com/kiim-wong/dsh-push) | 0 | ⚪ unknown | Push DeepSeek Harness agent lifecycle notifications to configurable channels |
| [sai-dsh-plugins](https://github.com/Very12345/sai-dsh-plugins) | 0 | ⚪ unknown | First-party DeepSeek Harness plugins for the sai Android coding agent |
| [dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) | 0 | ⚪ unknown | Two-tier model router for DeepSeek Harness — LLM-Judge routing, multi-model fallback chains, exponential-backoff failover, and ta… |
| [dash](https://github.com/songqikong/dash) | 1 | ⚪ unknown | DASH — Deepseek Agentic Service Harness |
| [delivery-review-dsh-plugin](https://github.com/xiaoxiao-svg/delivery-review-dsh-plugin) | 0 | ⚪ unknown | delivery-review-dsh-plugin — DSH plugin (orchestration) |
| [dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) | 1 | ⚪ unknown | Gated, durable human-in-the-loop workflow engine for DeepSeek Harness. |
| [dsh-browser-bridge](https://github.com/egnmosk/dsh-browser-bridge) | 0 | ⚪ unknown | DeepSeek Harness plugin + browser extension bridge: browser_* agent tools (navigate, click, type, screenshot, eval) over a localh… |
| [DeepJIT](https://github.com/fly3366/DeepJIT) | 0 | ⚪ unknown | JIT compiler plugin for deepseek-harness: compiles recurring agent workflows into hot skills and flow templates |
| [dsh-orchestrator](https://github.com/zibo2025/dsh-orchestrator) | 3 | ⚪ unknown | 【编排模式】为 DeepSeek Harness 提供多智能体编排模式：主智能体分解分派、worker 全网格互通，支持逐 worker 指定模型与思考强度 |
| [deepseek-harness-skillx](https://github.com/drowned-fish1/deepseek-harness-skillx) | 2 | ⚪ unknown | DeepSeek Harness plugin for safely discovering, auditing, and adopting external Agent Skills — prompt-injection and AgentBaiting… |
| [dsh-a2a](https://github.com/dpskh/dsh-a2a) | 2 | ⚪ unknown | Agent2Agent mesh for the Harness |
| [oh_my_deepseek_harness](https://github.com/bernardleex526/oh_my_deepseek_harness) | 2 | ⚪ unknown | DeepSeek Harness 多智能体编排模式 — 灵感来自 oh-my-opencode-slim |
| [dsh-tool-hackernews](https://github.com/tanf1ng/dsh-tool-hackernews) | 1 | ⚪ unknown | Hacker News tool suite (hn_top_stories, hn_search, hn_item) for DeepSeek Harness agents |
| [dsh-acp-plugin](https://github.com/agentic-control-plane/dsh-acp-plugin) | 1 | ⚪ unknown | Agentic Control Plane for DeepSeek Harness — policy-check every tool call before it runs |
| [dsh-subagent-tools](https://github.com/lynx-gt/dsh-subagent-tools) | 1 | ⚪ unknown | DeepSeek Harness subagent delegation enhancement |
| [dsh-delegate](https://github.com/FEOH333/dsh-delegate) | 1 | ⚪ unknown | dsh-delegate: model-aware subagent delegation for DeepSeek Harness — per-call models, depends_on dependency gating, per-child per… |
| [dsh-dashboard](https://github.com/Uddoo/dsh-dashboard) | 1 | ⚪ unknown | Symphony-compatible Linear issue orchestrator and native operations dashboard for DeepSeek Harness. |
| [dsh-preset-minimal-windows](https://github.com/zeroa234/dsh-preset-minimal-windows) | 1 | ⚪ unknown | Minimal Windows agent preset + Git Bash tool for DeepSeek Harness: gitbash & pwsh & str_replace_editor, drop-in replacement for t… |
| [dsh-minecraft-dev](https://github.com/Leawind/dsh-minecraft-dev) | 1 | ⚪ unknown | 一个面向 Minecraft 模组开发的 DeepSeek Harness Agent 预设 |
| [deepagent](https://github.com/justinhuangai/deepagent) | 1 | ⚪ unknown | The agent that gets your work done. Built on DeepSeek Harness: Everything is a Plugin. |
| [dsh-subagent-cwd](https://github.com/lynx-gt/dsh-subagent-cwd) | 1 | ⚪ unknown | DeepSeek Harness subagent delegation enhancement |
| [dsh-self-evolution](https://github.com/Lhy723/dsh-self-evolution) | 1 | ⚪ unknown | Benchmark-driven self-evolution for DeepSeek Harness · 冻结基准上的 Agent Profile 自我进化：评测 → 候选 → 严格接受/回滚 |
| [dsh-test-workbench](https://github.com/dmsobtl/dsh-test-workbench) | 0 | ⚪ unknown | 基于 DeepSeek Harness 的测试工作台 Profile —— 开箱即用的 QA Agent。 |
| [WorkbuddySkillGroups4DSH](https://github.com/darker2016/WorkbuddySkillGroups4DSH) | 0 | ⚪ unknown | WorkBuddy 专家团 Skill 开源包 → DeepSeek Harness (dsh) 插件式 skillgroups 包：44 个多角色专家团队 SKILL.md bundle，支持 ~/.dsh/skills 安装与 Cordis 插件注册。W… |
| [dsh-advisor](https://github.com/slhssb/dsh-advisor) | 0 | ⚪ unknown | Independent-model advisory review for DeepSeek Harness: after each tool step, a reviewer model audits the agent's operations and… |
| [dsh-wsl-bridge](https://github.com/ch1bug/dsh-wsl-bridge) | 0 | ⚪ unknown | Windows access tools for WSL agents: win_ls/win_read/win_write/win_run/win_open/win_path/win_drives as a DeepSeek Harness bundle |
| [dsh-phone](https://github.com/railgun0325/dsh-phone) | 0 | ⚪ unknown | 让 DeepSeek Harness 的 agent 跑在手机里，通过 Magisk root 原生操作安卓系统（截图/点击/滑动/开应用）+ 移动端布局 + WebView APK |
| [dsh-godot-tool](https://github.com/Fromlan/dsh-godot-tool) | 0 | ⚪ unknown | Drive the Godot 4.x editor from an AI agent: Godot agent_rpc addon + DeepSeek Harness dsh-tool-godot plugin (loopback TCP JSON-li… |
| [dsh-plugin-dated-folders](https://github.com/Aeanfx/dsh-plugin-dated-folders) | 0 | ⚪ unknown | 本插件由 DeepSeek Harness AI 完全制作，人工仅辅助操作（账号/上传/2FA 发布）。Tidy by date — every file your agent generates is archived into a YYYY-MM-DD_… |

### 🔌 ACP

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-agent-messaging](https://github.com/happyren/dsh-agent-messaging) | 4 | ⚪ unknown | Cross-session agent-to-agent messaging. |
| [widget-dock](https://github.com/MorGogh/widget-dock) | 3 | ⚪ unknown | DSH plugin: draggable widget panel (balance, tokens, stats, commands, goal, cost) for DeepSeek Harness |
| [dsh-ark-quota](https://github.com/lordqyxz/dsh-ark-quota) | 2 | ⚪ unknown | dsh-ark-quota — DSH plugin (acp) |
| [dsh-codex-bridge](https://github.com/pandashere/dsh-codex-bridge) | 1 | ⚪ unknown | Codex CLI bridge plugin for DeepSeek Harness with host tools and a Web conversation tab. |
| [dsh-reasoning-translator](https://github.com/pinkllo/dsh-reasoning-translator) | 2 | ⚪ unknown | DeepSeek Harness plugin: make the model write its chain-of-thought in your language |
| [dsh-credentials-keychain](https://github.com/ShawnSiao/dsh-credentials-keychain) | 1 | ⚪ unknown | Planned OS-backed credential provider for DeepSeek Harness |
| [dsh-deepseek-balance](https://github.com/lin-cheng-lab/dsh-deepseek-balance) | 1 | ⚪ unknown | dsh-deepseek-balance — DSH plugin (acp) |
| [dsh-deepseek-usage](https://github.com/ben7am1n/dsh-deepseek-usage) | 1 | ⚪ unknown | DeepSeek balance and token usage tools for DeepSeek Harness |
| [dsh-balance-display](https://github.com/Liu-ty/dsh-balance-display) | 1 | ⚪ unknown | DeepSeek API balance overlay for DeepSeek Harness |
| [ds-balance-card](https://github.com/jasonsun29/ds-balance-card) | 1 | ⚪ unknown | ds-balance-card — DSH plugin (acp) |
| [dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) | 3 | ⚪ unknown | DeepSeek 账户余额、剩余比例条与今日花费，显示在 dsh 侧边栏底部 · DeepSeek balance, remaining-ratio bar and today's spend in the dsh sidebar footer. |
| [dsh-kimi-bridge](https://github.com/pandashere/dsh-kimi-bridge) | 1 | ⚪ unknown | Kimi CLI bridge plugin for DeepSeek Harness with review-only mode and a Web conversation tab. |
| [deepseek-harness-lan](https://github.com/oitsukiii/deepseek-harness-lan) | 2 | ⚪ unknown | Run DeepSeek Harness Web UI on your home LAN — 4 minimal patches + one-click apply/revert scripts | 让 DeepSeek Harness 的 Web UI 在… |
| [jina-dsh-plugin](https://github.com/minatoAI/jina-dsh-plugin) | 0 | ⚪ unknown | Jina AI tools for DeepSeek Harness: 12 model tools (web / arXiv / SSRN search, read, screenshot, embeddings, rerank, classify, PD… |
| [dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) | 1 | ⚪ unknown | LSP action surface for DeepSeek Harness: lsp_diagnostics, lsp_format, and lsp_completion tools over language servers |
| [dsh-chrome](https://github.com/YJSoooooo/dsh-chrome) | 1 | ⚪ unknown | Chrome profile bridge for DeepSeek Harness: control an existing signed-in Chrome profile through chrome_repl. |
| [dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) | 0 | ⚪ unknown | Exa Search MCP for DeepSeek Harness: mounts the remote Exa MCP endpoint (https://mcp.exa.ai/mcp) through the in-box @deepseek-ai/… |
| [dsh-switch](https://github.com/dongsheng123132/dsh-switch) | 0 | ⚪ unknown | Evidence-first model control plane for DeepSeek Harness |
| [dsh-deepseek-balance](https://github.com/wangxiang0605qvq/dsh-deepseek-balance) | 0 | ⚪ unknown | DeepSeek 余额插件：模型工具 + 侧边栏余额胶囊 | DeepSeek balance plugin for DSH: model tool + sidebar balance pill |
| [dsh-usage-stats](https://github.com/Ychris12138/dsh-usage-stats) | 4 | ⚪ unknown | Token usage heatmap, per-model breakdowns, and DeepSeek account balance for the DeepSeek Harness Web GUI (dsh web). |
| [deepseek-harness-acp](https://github.com/openma-ai/deepseek-harness-acp) | 4 | ⚪ unknown | ACP server implementation for DeepSeek harness |
| [dsh-quota-panel](https://github.com/brittanistrehlowll-oss/dsh-quota-panel) | 2 | ⚪ unknown | Provider quota/balance corner panel for the dsh web surface (DeepSeek Harness plugin): server-side credential proxies plus a conf… |
| [pi2dsh](https://github.com/weijiafu14/pi2dsh) | 2 | ⚪ unknown | Bridge the Pi and DeepSeek Harness ecosystems: one Pi Host ABI runs unmodified Pi extensions as native DSH plugins. 打通 Pi 与 DSH 生… |
| [dsh-plugin-deepseek-balance](https://github.com/hnmrxz/dsh-plugin-deepseek-balance) | 2 | ⚪ unknown | 在 DeepSeek Harness (dsh) 底部状态栏实时显示 DeepSeek 账户余额。 |
| [dsh-weather](https://github.com/sunshine-lang/dsh-weather) | 2 | ⚪ unknown | Weather tool for DeepSeek Harness: current conditions and multi-day forecasts via Open-Meteo (free, no API key) |
| [dsh-pdf](https://github.com/sunshine-lang/dsh-pdf) | 2 | ⚪ unknown | PDF toolbox for DeepSeek Harness: extract text, metadata, and page ranges via pdfjs-dist (local, no API key) |
| [dsh-plugin-template](https://github.com/sunshine-lang/dsh-plugin-template) | 2 | ⚪ unknown | Ready-to-publish DeepSeek Harness plugin skeleton: bundle format, tool DSL, config, tests, and a scaffold script |
| [dsh-plugins](https://github.com/sunshine-lang/dsh-plugins) | 1 | ⚪ unknown | Unified portal for DeepSeek Harness plugins by sunshine-lang: dsh-weather, dsh-pdf, dsh-plugin-template |
| [Dcode](https://github.com/Deklan-Deng/Dcode) | 1 | ⚪ unknown | Deepseek-harness 桌面端 |
| [deepseek-harness-codex-bridge](https://github.com/Aloneswork/deepseek-harness-codex-bridge) | 1 | ⚪ unknown | Bidirectional MCP bridge for DeepSeek Harness and Codex collaboration |
| [dsh-easyssh](https://github.com/chenw2759-wq/dsh-easyssh) | 1 | ⚪ unknown | 用于远程ssh快速相应，同时可以直接在前端操作/查看远程服务器上的信息与代码。 |
| [dsh-plugin-deepseek-balance](https://github.com/fishxcode/dsh-plugin-deepseek-balance) | 0 | ⚪ unknown | DeepSeek Harness Web client plugin that displays real-time DeepSeek API balance. |
| [dsh-remote](https://github.com/flymysql/dsh-remote) | 0 | ⚪ unknown | Remote-access assistant for DeepSeek Harness: /remote command and settings page printing the exact SSH tunnel / reverse-tunnel /… |
| [dsh-web-billing](https://github.com/bpc-oss/dsh-web-billing) | 0 | ⚪ unknown | RMB/USD token-billing plugin for DeepSeek Harness (dsh web): official-policy auto pricing with peak/off-peak hours, per-message l… |
| [dsh-spend](https://github.com/nonewind/dsh-spend) | 0 | ⚪ unknown | Token usage & cost monitor for DeepSeek Harness — floating widget with multi-dimensional stats, time-series charts, auto-detected… |
| [dsh-Kimi-WebBridge](https://github.com/MicroHEROX/dsh-Kimi-WebBridge) | 0 | ⚪ unknown | Kimi WebBridge for DeepSeek Harness — a third-party dsh plugin bundle that turns the local Kimi WebBridge daemon into 15 native k… |
| [dsh-randomuuid-polyfill](https://github.com/Lehmaning/dsh-randomuuid-polyfill) | 0 | ⚪ unknown | dsh client plugin that installs crypto.randomUUID on insecure origins (plain HTTP over a LAN address) |
| [dsh-deepseek-quota](https://github.com/yingjunnan/dsh-deepseek-quota) | 0 | ⚪ unknown | DeepSeek API quota (balance) widget for the DSH web GUI: a floating bottom-right card showing remaining DeepSeek API balance. |
| [dsh-deepseek-balance](https://github.com/dshiq04/dsh-deepseek-balance) | 0 | ⚪ unknown | 面向deepseek harness的余额查看插件 |
| [api-cost-meter](https://github.com/kanallas/api-cost-meter) | 0 | ⚪ unknown | DeepSeek Harness API cost meter plugin: peak/off-peak spend badge, current unit prices, official account balance |

### 📦 Preset

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-companion](https://github.com/yyh-001/dsh-companion) | 3 | ⚪ unknown | DSH companion-mode plugin: persona, memory, conversation. |

### 🧷 Utility

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [EchoBird](https://github.com/edison7009/EchoBird) | 3015 | ⚪ unknown | One-click install + model switch across 20+ coding agents |
| [awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) | 560 | ⚪ unknown | DSH plugin directory with daily compatibility tracking |
| [deepseek-harness-applicants](https://github.com/Octo-o-o-o/deepseek-harness-applicants) | 48 | ⚪ unknown | DSH internal-test applicants list |
| [awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 257 | ⚪ unknown | DSH ecosystem curation: plugins, tools, infra |
| [dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) | 99 | ⚪ unknown | DeepSeek Harness terminal UI |
| [agent-skills](https://github.com/GitHubxsy/agent-skills) | 20 | ⚪ unknown | Reusable skills for AI coding agents |
| [dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) | 75 | ⚪ unknown | Codex-style @file mentions for DeepSeek Harness: search workspace files in the composer and attach their contents to prompts. |
| [dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) | 36 | ⚪ unknown | Open DeepSeek Harness workspace directories in VS Code directly from the web GUI. |
| [dsh-notification](https://github.com/omdsh-dev/dsh-notification) | 28 | ⚪ unknown | Desktop notifications for DeepSeek Harness turn completions, with per-outcome controls and include/exclude keyword rules. |
| [dsh-ads](https://github.com/Nagi-ovo/dsh-ads) | 238 | ⚪ unknown | 2005-style sidebar ads plugin (parody) |
| [dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) | 12 | ⚪ unknown | DSH 内测收官合影墙：GitHub OAuth 零权限登录 + 冻结白名单校验的拍立得合影站（含 DSH Skill 包装） |
| [dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) | 52 | ⚪ unknown | OpenPencil design preview and editing plugin for DSH |
| [oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) | 116 | ⚪ unknown | Extensible macOS DSH workbench with native PTY |
| [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize) | 57 | ⚪ unknown | In-chat generative UI: interactive HTML cards |
| [awesome-DSH-plugin](https://github.com/Alex-Yanggg/awesome-DSH-plugin) | 40 | ⚪ unknown | Curated list of DSH plugins, extensions and tools |
| [oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) | 32 | ⚪ unknown | DSH plugin ecosystem (700+ plugins) |
| [dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) | 8 | ⚪ unknown | Play Gomoku against AI in DSH |
| [dsh-web-review](https://github.com/CanglongCl/dsh-web-review) | 8 | ⚪ unknown | DeepSeek Harness Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。 |
| [dsh-emoji](https://github.com/hellodigua/dsh-emoji) | 8 | ⚪ unknown | Auto-add emoji to AI replies |
| [dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) | 7 | ⚪ unknown | Use dsh via grok-build's TUI |
| [dsh-stock-market](https://github.com/AnacondaKC/dsh-stock-market) | 9 | ⚪ unknown | Parody: lose money while coding |
| [Top](https://github.com/xiaohai-78/Top) | 5 | ⚪ unknown | Daily leaderboard for the dsh-external plugin ecosystem |
| [awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 44 | ⚪ unknown | Bilingual complete list of the DSH plugin ecosystem |
| [dsh-launcher](https://github.com/Ruler4396/dsh-launcher) | 47 | ⚪ unknown | WebView2-based DSH launcher |
| [dsh-minigames](https://github.com/lhh010/dsh-minigames) | 10 | ⚪ unknown | Side game panel (18 offline mini-games) |
| [dsh-stickers](https://github.com/william-jin-cmu/dsh-stickers) | 9 | ⚪ unknown | Bidirectional sticker reactions |
| [oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) | 4 | ⚪ unknown | DeepSeek harness plugins |
| [orbis](https://github.com/icodesign/orbis) | 6 | ⚪ unknown | Mobile client for DSH remote control |
| [plugin-registry](https://github.com/vlln/plugin-registry) | 26 | ⚪ unknown | DSH plugin registry infra: browser panel for official repository plugins |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Scaffold a DeepSeek Harness (DSH) plugin in seconds — tool / events / webui templates, next-tag version pinning, and a built-in -… |
| [dsh-101](https://github.com/bill9109/dsh-101) | 1 | ⚪ unknown | DSH document reading mode |
| [dsh-desktop-electron](https://github.com/Void0312Aurora/dsh-desktop-electron) | 3 | ⚪ unknown | Cross-platform Electron desktop shell (tray-resident) |
| [dsh-douyin](https://github.com/AnacondaKC/dsh-douyin) | 2 | ⚪ unknown | Sidebar short-video plugin |
| [dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) | 2 | ⚪ unknown | One-click portable DSH launcher (Windows) |
| [dsh-notebooks](https://github.com/havingautism/dsh-notebooks) | 2 | ⚪ unknown | (no description) |
| [dsh-plugin-d399](https://github.com/HuanLinOTO/dsh-plugin-d399) | 3 | ⚪ unknown | Pop-up mini-game menu while model generates |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Send IM webhook + local notifications on turn completion / error / approval (Feishu / WeCom / DingTalk / Slack / Discord / custom… |
| [dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) | 5 | ⚪ unknown | Bridge DeepSeek Harness into Feishu/Lark. |
| [dsh-win-notify](https://github.com/MuziIsabel/dsh-win-notify) | 4 | ⚪ unknown | Windows toast notification plugin with sound. |
| [dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) | 4 | ⚪ unknown | Plugin adding a wechat_notify tool for agents. |
| [dsh-lan](https://github.com/moxisuki/dsh-lan) | 4 | ⚪ unknown | One overlay to expose dsh web on the LAN. |
| [DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) | 4 | ⚪ unknown | Remote DSH control via Telegram. |
| [dsh-onlyne](https://github.com/dbydd/dsh-onlyne) | 2 | ⚪ unknown | IM gateway for DeepSeek Harness agents — send and receive QQ, WeChat, Feishu and Telegram messages from dsh sessions. |
| [dsh-lark](https://github.com/Roy-oss1/dsh-lark) | 2 | ⚪ unknown | Lark/Feishu IM bot channel for DeepSeek Harness: chats drive agents, replies and approvals return as messages and cards | 飞书 Deep… |
| [dsh-chatnode-wechat](https://github.com/Jesse-njx/dsh-chatnode-wechat) | 1 | ⚪ unknown | Chat with, monitor, and approve your DSH agents from WeChat — an iLink gateway + conversation node bundle for DeepSeek Harness |
| [dsh-im-bridge](https://github.com/BiBoyang/dsh-im-bridge) | 1 | ⚪ unknown | dsh-im-bridge — DSH plugin (utility) |
| [dsh-lark-bridge](https://github.com/imetn/dsh-lark-bridge) | 3 | ⚪ unknown | Bidirectional Lark/Feishu controller for DeepSeek Harness |
| [dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) | 1 | ⚪ unknown | DeepSeek Harness bundle for OpenClaw and WeChat over ACP |
| [dsh-tool-notify](https://github.com/rizkirmdhnnn/dsh-tool-notify) | 0 | ⚪ unknown | DSH plugin: model-facing notify tool for DeepSeek Harness — send notifications to ntfy or generic webhooks when an agent task fin… |
| [dsh2wechat](https://github.com/wuyuanjiang1/dsh2wechat) | 1 | ⚪ unknown | DeepSeek Harness 微信 ClawBot 消息桥插件 |
| [dsh-lark](https://github.com/omdsh-dev/dsh-lark) | 2 | ⚪ unknown | Lark/Feishu IM bot channel for DeepSeek Harness: chats drive agents, replies and approvals return as messages and cards | 飞书 Deep… |
| [dsh-plugins](https://github.com/kazecreator/dsh-plugins) | 0 | ⚪ unknown | Monorepo of DeepSeek Harness (dsh) plugins — including dsh-im (Telegram & WeChat IM bridge) |

> Badges: 🟢 compatible · 🔴 broken · ⚪ unverified · ⚫ unmaintained.
> 729 entries total, grouped by category, sorted by ⭐ within each. Schema dictionary: [docs/catalog-schema.md](docs/catalog-schema.md).
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
