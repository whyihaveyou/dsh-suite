# dsh-suite

![GitHub stars](https://img.shields.io/github/stars/whyihaveyou/dsh-suite?style=flat-square&color=facc15)
![Plugins](https://img.shields.io/badge/plugins-1742-facc15?style=flat-square)
![Daily compat](https://img.shields.io/github/actions/workflow/status/whyihaveyou/dsh-suite/compat.yml?branch=main&label=daily-compat-check&style=flat-square)
![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square)

> 🌐 English · [中文](README.md)

**Stop scrolling the `dsh-plugin` topic. Find plugins that still work.**

`dsh-suite` is a bilingual, living directory of [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) plugins — **refreshed hourly, compat-tested daily** — plus an in-app **Plugin Store**, a `create-dsh-plugin` scaffolder, a set of first-party plugins, and a **[workstation](https://github.com/whyihaveyou/dsh-workstation)** (🚧 in development).

[![Website](https://img.shields.io/badge/🌐_directory_website-whyihaveyou.github.io/dsh--suite-4d6bfe?style=for-the-badge)](https://whyihaveyou.github.io/dsh-suite/)

[![dsh-suite directory](https://whyihaveyou.github.io/dsh-suite/preview/2026-08-14/home-en.png)](https://whyihaveyou.github.io/dsh-suite/)

**🧭 Ecosystem / 生态**

- 🌐 [Directory](https://whyihaveyou.github.io/dsh-suite/) — browse every plugin online
- 📖 [DSH Chinese docs · dsh-docs.com](https://dsh-docs.com) — Chinese tutorials & docs, no VPN needed
- 📕 [DSH plugin dev guide](https://github.com/whyihaveyou/dsh-plugin-tutorial) — the bilingual book
- 🎨 [Skin gallery](https://whyihaveyou.github.io/dsh-themes/) — 151 skins with day/night previews

---

## Why dsh-suite

DSH launched without an official plugin registry. Discovery today is the GitHub `dsh-plugin` topic (hundreds of one-off repos, most unverified) plus a few static awesome-lists — and DSH itself is still shipping **compatibility-breaking changes**.

So we built four things:

1. **A live directory** — 880+ curated plugins, refreshed **hourly** by CI; compatibility badges re-tested **daily** (each entry actually installed into a throwaway profile).
2. **An in-app Plugin Store** — `@dsh-suite/plugin-manager` adds a **Store** tab right inside the DSH Web UI: browse the catalog, search, see compat badges, one-click install — without leaving DSH.
3. **A scaffolder** — `npm create dsh-plugin` generates a working `dsh.bundle` + Cordis skeleton. The official repo ships none, and "how do I migrate my plugin" is a top community request.
4. **First-party plugins** — a small set we actually maintain, not just links.
5. **An all-in-one workstation** — [dsh-workstation](https://github.com/whyihaveyou/dsh-workstation), a turnkey DSH experience (🚧 in development).

## Quick Start

```bash
# 1. Browse the directory website
open https://whyihaveyou.github.io/dsh-suite/

# 2. Add the Plugin Store to your DSH Web UI
npx @deepseek-ai/dsh plugin --profile web add @dsh-suite/plugin-manager
#    → restart the Web UI, then Settings → Plugins → Store

# 3. (For developers) Scaffold your own plugin
npm create dsh-plugin@latest my-plugin
```

![Plugin Store tab inside DSH Web UI](site/assets/store-tab.png)

## 📚 Plugin Catalog

<!-- CATALOG:START -->
### ⭐ Featured

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 5909 | 🟢 ok | DSH Web UI plugin & skin collection: task board, git panel, etc. |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 2813 | 🟢 ok | Sidebar workbench: file render/terminal/git/subagent |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1674 | ⚪ unknown | DSH Web whale-girl skin series |
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 818 | 🟢 ok | Vision for text-only models: image QA, screenshot OCR, UI reconstruction |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 100 | 🟢 ok | Rewind conversation and workspace state |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 98 | 🟢 ok | Bring Claude Code's UltraCode mode to DSH with governable multi-agent orchestration |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 53 | ⚪ unknown | Skill-driven harness/loop engineering workflow plugin |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 40 | 🔴 broken (failed once, retried — install blocked by pnpm build-script policy (allowBuilds) — plugin likely OK, CI policy blocks git prepare scripts) | Customize the whale-girl thinking-status label |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 34 | 🟢 ok | DSH conversation sharing plugin |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 24 | 🟢 ok | Create sandboxed JS tools with Monaco editor |
| [distill](https://github.com/LoserFox/distill) | 22 | ⚪ unknown | Auto conversation distillation: background subagent reflection |
| [all (全家桶)](https://github.com/whyihaveyou/dsh-suite) | 15 | 🟢 ok | All-in-one meta-package: one install brings the first-party suite — plugin-manager store, notify, session-export, team-board. |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 10 | 🟢 ok | BitFun ↔ DSH ACP bridge |
| [themes (皮肤中心)](https://github.com/whyihaveyou/dsh-themes) | 9 | 🟢 ok | Skin Center: 151 day/night skin pairs in one package — grid previews, search, one-click try-on, favorites, recently-tried and ran… |
| [plugin-manager](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | In-app plugin store for DSH Web UI: browse the dsh-suite catalog, search/filter/sort, compat badges, one-click install — a Store… |
| [plugin-team-board](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | Shared task board for multi-agent sessions: create/claim/update/list tasks across subagents, persisted via the append-only sessio… |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Export the append-only session log as human-readable Markdown / HTML, grouped by trajectory source (system prompt / reasoning / t… |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Scaffold a DeepSeek Harness (DSH) plugin in seconds — tool / events / webui templates, next-tag version pinning, and a built-in -… |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Send IM webhook + local notifications on turn completion / error / approval (Feishu / WeCom / DingTalk / Slack / Discord / custom… |
| [preset-center (场景预设)](https://github.com/whyihaveyou/dsh-suite/tree/main/packages/preset-center) | 1 | 🟢 ok | Out-of-the-box Chinese agent presets: Xiaohongshu notes / copy polishing / daily-weekly reports — one-click apply to official Age… |
| [plugin-deus (神模扳机)](https://github.com/whyihaveyou/dsh-suite/tree/main/packages/plugin-deus) | 1 | 🟢 ok | Deus Trigger: one-click minimal-prompt experiments — verified Minimal behaviors, opener-fingerprint auto-detection, local trigger… |

### 🧰 Tools

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [open-managed-agents](https://github.com/openma-ai/open-managed-agents) | 246 | ⚪ unknown | Self-hosted Claude Managed Agents API platform (Cloudflare Workers) |
| [role-model](https://github.com/try-works/role-model) | 109 | ⚪ unknown | Protocol to route each job to the right model |
| [irmia_devkit_open](https://github.com/irmia2026/irmia_devkit_open) | 40 | ⚪ unknown | Python devkit (no description) |
| [HoloGram](https://github.com/834063245-creator/HoloGram) | 24 | ⚪ unknown | 3D code dependency graph generator (14 languages) |
| [dsh-custom-tool](https://github.com/omdsh-dev/dsh-custom-tool) | 24 | 🟢 ok | Create sandboxed JS tools with Monaco editor |
| [dsh-acp-for-bitfun](https://github.com/bobleer/dsh-acp-for-bitfun) | 10 | 🟢 ok | BitFun ↔ DSH ACP bridge |
| [fabric](https://github.com/omdsh-dev/fabric) | 18 | ⚪ unknown | MC-Fabric-like hook handler |
| [dsh-git-identity](https://github.com/LoserFox/dsh-git-identity) | 7 | ⚪ unknown | Pin git commits to environment author identity |
| [Hypr-Agent-Protal](https://github.com/gfhdhytghd/Hypr-Agent-Protal) | 4 | ⚪ unknown | Computer Use MCP for Hyprland |
| [telegram](https://github.com/LoserFox/telegram) | 7 | ⚪ unknown | Telegram Bot API bridge (long polling) |
| [agent-knock-knock](https://github.com/scotthuang/agent-knock-knock) | 4 | ⚪ unknown | OpenClaw plugin: control local Codex/Claude Code via shared tmux |
| [dsh-bash-encoding](https://github.com/lhh010/dsh-bash-encoding) | 7 | ⚪ unknown | Auto-detect bash output encoding |
| [dsh-data-agent](https://github.com/omdsh-dev/dsh-data-agent) | 164 | 🟢 ok | Connect DB and write SQL plugin |
| [dsh-doctor](https://github.com/coppynight/dsh-doctor) | 5 | 🟢 ok | flutter-doctor-style diagnostics and safe auto-repair |
| [dsh-interconnect](https://github.com/Chinesezjc/dsh-interconnect) | 34 | 🟢 ok | Cross-instance message/event handoff |
| [dsh-openbiliclaw](https://github.com/whiteguo233/dsh-openbiliclaw) | 52 | ⚪ unknown | OpenBiliClaw content-agent bridge for DSH |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 27 | 🟢 ok | Scan plugin repo manifest protocol / patch format / build traps |
| [dsh-security-audit](https://github.com/omdsh-dev/dsh-security-audit) | 14 | ⚪ unknown | Local security audit: config/plugin source/session/network |
| [dsh-tool-csv](https://github.com/omdsh-dev/dsh-tool-csv) | 4 | ⚪ unknown | CSV parse/query/stat/transform tool |
| [dsh-toolkit](https://github.com/omdsh-dev/dsh-toolkit) | 26 | ⚪ unknown | Zero-dep toolkit collection |
| [atomstudio](https://github.com/AtomicsLaboratory/atomstudio) | 0 | ⚪ unknown | Document engineering environment for executable documents |
| [dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 3 | ⚪ unknown | Use DSH remotely via cc-connect |
| [dsh-mnemon](https://github.com/omdsh-dev/dsh-mnemon) | 203 | 🟢 ok | Mnemon three-layer memory deep integration |
| [dsh-paseo](https://github.com/renat3u/dsh-paseo) | 3 | ⚪ unknown | paseo plugin extension support for DSH |
| [dsh-plugin-dev](https://github.com/omdsh-dev/dsh-plugin-dev) | 13 | ⚪ unknown | DSH plugin-dev pitfalls archive (skill + docs) |
| [dsh-tool-calculator](https://github.com/omdsh-dev/dsh-tool-calculator) | 7 | ⚪ unknown | Safe math expression evaluator |
| [dsh-tool-diff](https://github.com/omdsh-dev/dsh-tool-diff) | 4 | ⚪ unknown | Structured diff for text/JSON/CSV/Markdown |
| [dsh-tool-encoding](https://github.com/omdsh-dev/dsh-tool-encoding) | 3 | ⚪ unknown | base64/hex/url codec + hash tool |
| [dsh-tool-json](https://github.com/omdsh-dev/dsh-tool-json) | 3 | ⚪ unknown | JMESPath JSON query tool |
| [dsh-tool-markdown](https://github.com/omdsh-dev/dsh-tool-markdown) | 4 | ⚪ unknown | HTML↔Markdown conversion, GFM table normalization |
| [dsh-tool-regex](https://github.com/omdsh-dev/dsh-tool-regex) | 3 | ⚪ unknown | Regex test/capture/safe-replace tool |
| [dsh-tool-schema](https://github.com/omdsh-dev/dsh-tool-schema) | 3 | ⚪ unknown | JSON Schema validation tool |
| [dsh-tool-stat](https://github.com/omdsh-dev/dsh-tool-stat) | 6 | ⚪ unknown | Descriptive stats / percentile / correlation tool |
| [dsh-tool-time](https://github.com/omdsh-dev/dsh-tool-time) | 4 | ⚪ unknown | ISO 8601 / timezone / calendar math tool |
| [dsh-trace](https://github.com/vibeinging/dsh-trace) | 2 | ⚪ unknown | Telemetry backend exporting turns/steps/tools |
| [sandbox-micro](https://github.com/omdsh-dev/sandbox-micro) | 3 | ⚪ unknown | microsandbox support |
| [zotero-harvest](https://github.com/Fisfzy/zotero-harvest) | 5 | ⚪ unknown | Zotero harvest plugin (OpenAlex/arXiv/Crossref) |
| [dsh-harness-ops](https://github.com/fakechris/dsh-harness-ops) | 13 | ⚪ unknown | Ops toolkit: daily snapshot A/B slots, one-click rollback |
| [dsh-inspect](https://github.com/omdsh-dev/dsh-inspect) | 7 | ⚪ unknown | Adversarial checkup→fix→review loop plugin |
| [dsh-openmaic](https://github.com/THU-MAIC/dsh-openmaic) | 22 | ⚪ unknown | OpenMAIC: classrooms, slides, interactive widgets |
| [dsh-plugin-mineru](https://github.com/HuanLinOTO/dsh-plugin-mineru) | 41 | ⚪ unknown | MineRU document parsing tools |
| [dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) | 3 | ⚪ unknown | Edit user & system prompt sections (live preview) |
| [dsh-scholar](https://github.com/lzszq/dsh-scholar) | 25 | 🟢 ok | dsh-scholar (literature) |
| [dsh-ssh](https://github.com/UynajGI/dsh-ssh) | 7 | 🟢 ok | SSH remote-execution: ProxyJump chain, SFTP |
| [dsh-tool-search](https://github.com/vibeinging/dsh-tool-search) | 3 | 🟢 ok | Per-agent on-demand tool discovery + progressive schema |
| [dsh-webbridge](https://github.com/bill9109/dsh-webbridge) | 3 | ⚪ unknown | DSH + Kimi WebBridge |
| [ego-browser](https://github.com/Fisfzy/ego-browser) | 40 | ⚪ unknown | Bridge ego-lite Chromium browser into DSH |
| [math-lean](https://github.com/Fisfzy/math-lean) | 1 | ⚪ unknown | Lean kernel-verified math reasoning plugin |
| [plugin-template](https://github.com/omdsh-dev/plugin-template) | 12 | ⚪ unknown | Plugin template derived from the official turtle ui repo |
| [Qwen-MM-Plugins](https://github.com/omdsh-dev/Qwen-MM-Plugins) | 0 | ⚪ unknown | Qwen-MM-Plugins support |
| [sandbox-mxc](https://github.com/omdsh-dev/sandbox-mxc) | 2 | ⚪ unknown | Microsoft cross-platform sandbox support |
| [sandbox-nono](https://github.com/omdsh-dev/sandbox-nono) | 3 | ⚪ unknown | nono sandbox support |
| [web-components](https://github.com/omdsh-dev/web-components) | 2 | ⚪ unknown | web-components support |
| [zotero-wave-rag](https://github.com/Fisfzy/zotero-wave-rag) | 3 | ⚪ unknown | Wave-RAG retrieval for Zotero paper library |
| [modsearch](https://github.com/liustack/modsearch) | 251 | ⚪ unknown | Web search plugin for DeepSeek Harness. |
| [dsh-browser](https://github.com/Lum1104/dsh-browser) | 427 | 🟢 ok | Chrome sidebar extension letting DSH drive the browser. |
| [dsh-openapi](https://github.com/Degurechaff57/dsh-openapi) | 4 | ⚪ unknown | Safe OpenAPI 3.x discovery & API calling tools. |
| [dsh-better-browser](https://github.com/titanwings/dsh-better-browser) | 10 | ⚪ unknown | Let agents drive the logged-in browser via Kimi WebBridge. |
| [dsh-worktree](https://github.com/FlashingChen/dsh-worktree) | 6 | ⚪ unknown | Codex-style permanent git worktrees plugin. |
| [graycode-for-dsh](https://github.com/Komeiji-Shiki/graycode-for-dsh) | 5 | ⚪ unknown | graycode encoding tool. |
| [dsh-expression](https://github.com/yyh-001/dsh-expression) | 54 | 🟢 ok | dsh-expression — DSH plugin (tools) |
| [dsh-director-toolkit](https://github.com/lhmd/dsh-director-toolkit) | 7 | ⚪ unknown | DSH Director Toolkit is a DeepSeek Harness plugin for 3D artists, technical designers, and creative coders. Paste a half-formed i… |
| [codex-plugin-dsh](https://github.com/wingoo/codex-plugin-dsh) | 8 | ⚪ unknown | Use local Codex App Server as a model provider in DeepSeek Harness |
| [dsh-prompt-persona](https://github.com/Xilin3/dsh-prompt-persona) | 12 | ⚪ unknown | DSH plugin: edit the system prompt (deployment persona) from the Settings page, with live preview. |
| [dsh-tool-policy](https://github.com/Drifter-yh/dsh-tool-policy) | 3 | ⚪ unknown | Declarative deny-by-default tool policy plugin for DeepSeek Harness |
| [dsh-plugin-graph](https://github.com/erduotong/dsh-plugin-graph) | 2 | 🟢 ok | dsh-plugin-graph — DSH plugin (tools) |
| [dsh-research-notes](https://github.com/fff122/dsh-research-notes) | 3 | ⚪ unknown | A lightweight research notes plugin for DeepSeek Harness |
| [nowledge-mem-deepseek-harness](https://github.com/nowledge-co/nowledge-mem-deepseek-harness) | 5 | ⚪ unknown | Nowledge Mem community plugin bundle for DeepSeek Harness |
| [dsh-vsc-integration](https://github.com/HarcoChen/dsh-vsc-integration) | 8 | ⚪ unknown | Deepseek-Harness Vscode Integration |
| [dsh-safe-delete](https://github.com/Qintsg/dsh-safe-delete) | 2 | 🟢 ok | Safe delete plugin for DeepSeek Harness (DSH): move files to trash / staging area instead of permanent removal, with restore and… |
| [dsh-plugins](https://github.com/HackSing/dsh-plugins) | 5 | ⚪ unknown | A bilingual, continuously maintained directory of plugins for DeepSeek Harness (DSH). |
| [dsh-report-html](https://github.com/hccccc01333/dsh-report-html) | 3 | ⚪ unknown | Generate self-contained interactive HTML reports from Markdown, tables, charts, China province maps, flowcharts, math, and drill-… |
| [dsh-openai-codex-auth](https://github.com/yoke233/dsh-openai-codex-auth) | 9 | 🟢 ok | OpenAI Codex OAuth login and usage card plugin for DeepSeek Harness |
| [dsh-github-connector](https://github.com/kaziii/dsh-github-connector) | 8 | 🟢 ok | GitHub connector for DeepSeek Harness (dsh): one-click connect, create/review/merge PRs from the conversation |
| [deepseek-pet](https://github.com/keleus/deepseek-pet) | 36 | ⚪ unknown | deepseek-pet — DSH plugin (tools) |
| [dsh-index](https://github.com/Sunrisepeak/dsh-index) | 4 | ⚪ unknown | DeepSeek Harness Plugin Package Index - Install dsh-plugin with just one command |
| [dsh-web-search-firecrawl](https://github.com/yangzhe1003/dsh-web-search-firecrawl) | 2 | ⚪ unknown | Firecrawl-backed search provider plugin for the DeepSeek Harness web capability seam (ctx.web) |
| [dsh-plugin-template](https://github.com/bugmaker2/dsh-plugin-template) | 24 | ⚪ unknown | Template for deepseek-harness plugin development. |
| [dsh-composer-history](https://github.com/PerryLink/dsh-composer-history) | 6 | 🟢 ok | Terminal-style input history for the DeepSeek Harness web composer - edge-first arrow keys, draft stashing with exact restore, Es… |
| [dsh-fun-ticker](https://github.com/omdsh-dev/dsh-fun-ticker) | 5 | ⚪ unknown | dsh-fun-ticker — DSH plugin (tools) |
| [jumpserver-dsh](https://github.com/jumpserver-east/jumpserver-dsh) | 2 | ⚪ unknown | DeepSeek Harness plugin: manage JumpServer assets and operate on them through KoKo |
| [dsh-browser](https://github.com/ben7am1n/dsh-browser) | 4 | 🟢 ok | Playwright-powered browser automation for DeepSeek Harness |
| [dsh-dev-actions](https://github.com/skitse/dsh-dev-actions) | 1 | ⚪ unknown | AI turns repeated dev commands, prompts, and habits into one-click DeepSeek Harness actions. |
| [dsh-plugin-doctor](https://github.com/lin-cheng-lab/dsh-plugin-doctor) | 1 | ⚪ unknown | dsh-plugin-doctor — DSH plugin (tools) |
| [deepseek-harness-background](https://github.com/czzzlq/deepseek-harness-background) | 2 | 🟢 ok | deepseek-harness背景自定义 |
| [task-passport](https://github.com/dongsheng123132/task-passport) | 10 | 🟢 ok | Open task handoff protocol for DeepSeek Harness, WorkBuddy, Claude Code and Codex — verified state, not chat logs |
| [dsh-prompt-presets](https://github.com/fff122/dsh-prompt-presets) | 1 | ⚪ unknown | Local reusable prompt presets for DeepSeek Harness. |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 3 | ⚪ unknown | Cloudflare full-stack pnpm monorepo |
| [dsh-plugin-colorscheme](https://github.com/Civitasv/dsh-plugin-colorscheme) | 2 | ⚪ unknown | Colorscheme Plugin For DeepSeek Harness |
| [dsh-scout](https://github.com/omdsh-dev/dsh-scout) | 2 | 🟢 ok | dsh-scout — DSH plugin (tools) |
| [dsh-screenshot-diff](https://github.com/PangYiMing/dsh-screenshot-diff) | 1 | 🟢 ok | DSH plugin: pixel-diff two screenshots into diff.png + triptych (pixelmatch) — 像素对比工具 |
| [dsh-turn-index](https://github.com/Simon314620/dsh-turn-index) | 2 | ⚪ unknown | dsh-turn-index — DSH plugin (tools) |
| [dsh-mobile-control](https://github.com/PangYiMing/dsh-mobile-control) | 3 | 🟢 ok | DSH plugin for controlling mobile devices (ADB/iOS) — DeepSeek Harness 操控手机插件 |
| [dsh-hub](https://github.com/coderPerseus/dsh-hub) | 3 | ⚪ unknown | Cloudflare full-stack pnpm monorepo |
| [dsh-tool-monitor](https://github.com/yoke233/dsh-tool-monitor) | 1 | ⚪ unknown | Monitor existing DeepSeek Harness background jobs without running commands twice |
| [dsh-suggest-prompt](https://github.com/studyzy/dsh-suggest-prompt) | 3 | ⚪ unknown | dsh-plugin suggest next prompt |
| [dsh-cloudflare-browser-run](https://github.com/RealAlexandreAI/dsh-cloudflare-browser-run) | 1 | 🟢 ok | dsh browser-run: CF Browser Run web tools (markdown/screenshot/pdf) for DeepSeek Harness |
| [safe-find-dsh-plugins](https://github.com/Jinsong-Zhou/safe-find-dsh-plugins) | 3 | ⚪ unknown | Discover and install the best DeepSeek Harness plugins for a user's task |
| [dsh-all-search](https://github.com/RealAlexandreAI/dsh-all-search) | 1 | 🟢 ok | dsh search: AnySearch web search provider for DeepSeek Harness (ctx.web) |
| [dsh-plugin-pixluna](https://github.com/PixLunaLab/dsh-plugin-pixluna) | 3 | ⚪ unknown | dsh-plugin-pixluna | 让 DSH 自己看涩图！ |
| [dsh-plugins-hub](https://github.com/TYEclipse/dsh-plugins-hub) | 2 | ⚪ unknown | Independent plugin index for DeepSeek Harness (dsh) — curated directory of community plugins, updated daily |
| [dsh-huadongbianzuqi](https://github.com/zjl88858/dsh-huadongbianzuqi) | 7 | ⚪ unknown | dsh-huadongbianzuqi — DSH plugin (tools) |
| [dsh-soul-md](https://github.com/Scorp1o117/dsh-soul-md) | 3 | 🟢 ok | Soul.md persona for DeepSeek Harness | DeepSeek Harness 人设卡插件 |
| [dsh-daily-fortune](https://github.com/omdsh-dev/dsh-daily-fortune) | 3 | ⚪ unknown | DSH daily fortune plugin with Guan Yin lots, Tarot spreads, and daily quotes |
| [dsh-plugin-rag](https://github.com/YYTbit/dsh-plugin-rag) | 1 | ⚪ unknown | Local knowledge base RAG for DeepSeek Harness |
| [dsh-model-selector](https://github.com/bitterSmilezzz/dsh-model-selector) | 1 | ⚪ unknown | DeepSeek Harness web plugin: provider-group collapse + name search for the conversation model picker. |
| [dsh-github](https://github.com/PerryLink/dsh-github) | 3 | 🟢 ok | GitHub integration for DeepSeek Harness: create PRs, review PRs in background jobs, read issues - every write gated by human appr… |
| [dsh-plugin-review](https://github.com/Mingxi2077/dsh-plugin-review) | 1 | ⚪ unknown | DSH Review Mode plugin: multi-dimension code health scoring + radar chart + review history (DSH 审查模式插件) |
| [dsh-turn-budget](https://github.com/randerous/dsh-turn-budget) | 1 | 🟢 ok | Advisory turn step-budget reminders for DeepSeek Harness — loop convergence guard (dsh-plugin) |
| [DIzzy-DSH](https://github.com/Acidmoon/DIzzy-DSH) | 7 | ⚪ unknown | My DSH plugins |
| [dsh-file-explorer](https://github.com/schhaohao/dsh-file-explorer) | 2 | ⚪ unknown | dsh-file-explorer |
| [dsh-tool-reqpipe](https://github.com/sikwoxy/dsh-tool-reqpipe) | 1 | 🟢 ok | reqpipe — DeepSeek Harness 需求流水线插件（7 tools）+ Python CLI（需求→方案→评审→开发） |
| [dsh-ajw](https://github.com/rsagacom/dsh-ajw) | 1 | ⚪ unknown | dsh-ajw — DSH plugin (tools) |
| [dsh-fun-typewriter](https://github.com/omdsh-dev/dsh-fun-typewriter) | 3 | ⚪ unknown | DSH Typewriter: WebAudio typing ambience with a plugin-owned settings API and zero audio assets |
| [dsh-port-guard](https://github.com/PangYiMing/dsh-port-guard) | 1 | ⚪ unknown | DSH plugin: triage port conflicts (reuse / switch / precise kill) — 端口占用处置 |
| [qiushi-dsh-evidence-audit](https://github.com/030611/qiushi-dsh-evidence-audit) | 4 | 🟢 ok | Observe-only hash-chained evidence receipts for DeepSeek Harness |
| [dsh-plugin.github.io](https://github.com/dsh-plugin/dsh-plugin.github.io) | 2 | ⚪ unknown | DeepSeek Harness community plugin workshop and directory |
| [dsh-weixin](https://github.com/xiaoshihou514/dsh-weixin) | 4 | 🟢 ok | DeepSeek Harness: Weixin |
| [dsh-lens-lite](https://github.com/ben7am1n/dsh-lens-lite) | 1 | 🟢 ok | Post-edit diagnostics for DeepSeek Harness |
| [dsh-tavily-search](https://github.com/zhouzhencheng07/dsh-tavily-search) | 4 | 🟢 ok | Free keyless Tavily web search tool for DeepSeek Harness (dsh) |
| [dsh-sticky-disclosure](https://github.com/Han-1413141/dsh-sticky-disclosure) | 3 | ⚪ unknown | DSH Web client plugin: pins off-screen expanded collapsible tags (Think / tool cards) to the top of the conversation viewport wit… |
| [dsh-openai-codex-oauth](https://github.com/dyuan311/dsh-openai-codex-oauth) | 2 | ⚪ unknown | ChatGPT subscription OAuth for the openai-codex provider in DeepSeek Harness |
| [dshx](https://github.com/why913/dshx) | 5 | ⚪ unknown | The missing companion CLI for DeepSeek Harness (dsh): manage MCP servers with dry-run checks, migrate from Claude Code / Codex in… |
| [dsh-reloader](https://github.com/lin-cheng-lab/dsh-reloader) | 2 | ⚪ unknown | dsh-reloader — DSH plugin (tools) |
| [dsh-bisect-debug](https://github.com/PangYiMing/dsh-bisect-debug) | 1 | ⚪ unknown | DSH plugin: bisect bugs (code / boundary / commit) — 二分法定位 bug 根因 |
| [dsh-auto-chess](https://github.com/omdsh-dev/dsh-auto-chess) | 3 | ⚪ unknown | dsh-auto-chess — DSH plugin (tools) |
| [dsh-turn-meta](https://github.com/randerous/dsh-turn-meta) | 1 | ⚪ unknown | Opt-in per-step turn metadata for DeepSeek Harness — a minimal first-plugin template (dsh-plugin) |
| [dsh-tool-browser](https://github.com/MashedPotato817/dsh-tool-browser) | 1 | 🟢 ok | Native browser automation tools for DeepSeek Harness, powered by Playwright + Edge |
| [dsh-music-plugin](https://github.com/syy-shark/dsh-music-plugin) | 2 | ⚪ unknown | DeepSeek Harness music plugin (dsh-plugin) |
| [dsh-batch-regression](https://github.com/PangYiMing/dsh-batch-regression) | 1 | 🟢 ok | DSH plugin: run a command N rounds, judge by median/distribution — 批量回归取统计结论 |
| [dsh-browser-control](https://github.com/PangYiMing/dsh-browser-control) | 1 | 🟢 ok | DSH plugin for controlling browsers (CDP/Playwright) — DeepSeek Harness 操控浏览器插件 |
| [dsh-code-ide](https://github.com/SakalioLabs/dsh-code-ide) | 11 | ⚪ unknown | DeepSeek Harness Code IDE Plugin |
| [matlab-modelsim-vivado-plugin](https://github.com/sjscy05/matlab-modelsim-vivado-plugin) | 2 | ⚪ unknown | DeepSeek Harness plugin: MATLAB + ModelSim + Vivado full-flow tools for digital communication IC design tasks (mmv-dspic) |
| [dsh-codex](https://github.com/Yan-Zero/dsh-codex) | 46 | 🟢 ok | Use your ChatGPT subscription in DeepSeek Harness through OpenAI's Codex sign-in flow |
| [dsh-plugins](https://github.com/0sour/dsh-plugins) | 1 | ⚪ unknown | DeepSeek Harness (dsh) plugins by 0sour - ???? (dsh-plugin topic) |
| [dsh-2origin](https://github.com/dongsheng123132/dsh-2origin) | 3 | ⚪ unknown | Evidence-first 2Origin state projection, diff and immutable freeze for DeepSeek Harness |
| [dsh-terminal](https://github.com/ZgblKylin/dsh-terminal) | 3 | 🟢 ok | Integrate terminal plugin for DeepSeek Harness |
| [dsh-survey](https://github.com/jinhuang712/dsh-survey) | 3 | ⚪ unknown | dsh-survey — DSH plugin (tools) |
| [deepseek-harness-plugin-manager](https://github.com/hrhgit/deepseek-harness-plugin-manager) | 3 | ⚪ unknown | Web plugin manager for DeepSeek Harness (DSH): inspect, search, group, enable, and disable Cordis plugins. |
| [dsh-co-authored-by](https://github.com/shelken/dsh-co-authored-by) | 2 | ⚪ unknown | dsh plugin: auto-inject Co-Authored-By and Generated-By trailers on git commit |
| [DSH-Plugs](https://github.com/JustGenius-s/DSH-Plugs) | 7 | ⚪ unknown | DSH Plugins Cellection |
| [dsh-host-web-compat](https://github.com/kelai141/dsh-host-web-compat) | 2 | ⚪ unknown | dsh-host-web-compat — DSH plugin (tools) |
| [dsh-doctor](https://github.com/jorinyang/dsh-doctor) | 1 | 🟢 ok | DeepSeek Harness environment diagnostic tool: dsh_doctor checks env, profile, config, bundles, mount, port, health, and disk |
| [dsh-code-intel](https://github.com/lonelymoon87/dsh-code-intel) | 0 | 🟢 ok | Symbol-aware code indexing and hybrid search for DeepSeek Harness. |
| [dsh-doctor](https://github.com/asdf17128/dsh-doctor) | 1 | 🟢 ok | Find what your DeepSeek Harness (dsh) patches silently broke — dead patches, config fields dropped by whole-config replacement, u… |
| [dsh-backup-sync](https://github.com/csiroqa/dsh-backup-sync) | 1 | ⚪ unknown | DeepSeek Harness（DSH）备份/恢复 + 跨机同步插件：本地快照、WebDAV 推送/拉取、自动备份与失效归档清理。Snapshot backup, restore and cross-machine sync plugin for Deep… |
| [dsh-auto](https://github.com/simon300000/dsh-auto) | 5 | ⚪ unknown | dsh Auto Approve |
| [dsh-annotate](https://github.com/BrambleXu/dsh-annotate) | 8 | ⚪ unknown | Visual browser element annotation for DeepSeek Harness, capturing DOM, styles, accessibility data, comments, and viewport screens… |
| [dsh-codex-connect](https://github.com/franksong2702/dsh-codex-connect) | 43 | 🟢 ok (外部贡献者 franksong2702 实测验证（PR #16）) | ChatGPT OAuth and Codex models for DeepSeek Harness. |
| [DSH-Decktop](https://github.com/JustGenius-s/DSH-Decktop) | 22 | ⚪ unknown | DSH-Decktop |
| [dsh-cad-review](https://github.com/dongsheng123132/dsh-cad-review) | 4 | ⚪ unknown | Evidence-first ASCII DXF inspection and deterministic CAD rule review for DeepSeek Harness |
| [dsh-xai](https://github.com/MirDie/dsh-xai) | 2 | ⚪ unknown | xAI Grok SuperGrok / X Premium OAuth for DeepSeek Harness |
| [dsh-academic-research](https://github.com/userInner/dsh-academic-research) | 0 | ⚪ unknown | Evidence-grounded bilingual academic research plugin for DeepSeek Harness and OnPeople |
| [dsh-plugin-hello](https://github.com/xu1132/dsh-plugin-hello) | 0 | 🟢 ok | A minimal DeepSeek Harness community plugin that registers a callable hello tool |
| [deepseek-harness-rs](https://github.com/Tokimorphling/deepseek-harness-rs) | 1 | ⚪ unknown | A rust port for deepseek's harness |
| [dsh-prompt-enhancer](https://github.com/Fishsb/dsh-prompt-enhancer) | 49 | ⚪ unknown | dsh-prompt-enhancer — DSH plugin (tools) |
| [dsh-specflow](https://github.com/lonelymoon87/dsh-specflow) | 3 | 🟢 ok | Specification-driven development toolkit for DeepSeek Harness. |
| [dsh-plugins](https://github.com/ohtokaah-sys/dsh-plugins) | 0 | ⚪ unknown | DSH plugins by ohtokaah-sys: 行为宪法 / 协作模式 / 机械门禁 (tagged dsh-plugin) |
| [dsh-tool-chaos](https://github.com/cyanseek/dsh-tool-chaos) | 4 | ⚪ unknown | Deterministic fault injection and autonomous resilience tests for DeepSeek Harness tools |
| [dsh-robotic-harness](https://github.com/dingkaihu63/dsh-robotic-harness) | 17 | ⚪ unknown | Robotic Harness: embodied-intelligence research tools for DeepSeek Harness - robot asset inspection, MuJoCo pick-place simulation… |
| [dsh-codex-subscription](https://github.com/WSL043/dsh-codex-subscription) | 21 | 🟢 ok | Cache-aware ChatGPT / Codex subscription plugin for DeepSeek Harness |
| [dsh-sticky-note](https://github.com/Meredith2328/dsh-sticky-note) | 11 | ⚪ unknown | dsh-sticky-note — DSH plugin (tools) |
| [dsh-gen3d](https://github.com/LuZhouheng/dsh-gen3d) | 1 | 🟢 ok | DeepSeek Harness 3D 角色生成插件：直连 Meshy / Hunyuan3D / Tripo3D / Rodin 官方 API，自配 key，mock 回退 |
| [dsh-mdbox](https://github.com/Chi-hong22/dsh-mdbox) | 0 | ⚪ unknown | DeepSeek Harness (DSH) Web 输入框的 Markdown 编辑辅助插件。 |
| [dsh-kanban](https://github.com/isolat-3k/dsh-kanban) | 7 | ⚪ unknown | dsh-kanban — DSH plugin (tools) |
| [dsh-tool-git](https://github.com/lxj808624/dsh-tool-git) | 4 | 🟢 ok | Structured safe Git tools for DeepSeek Harness (dsh): git_status/diff/log/branch/stage/commit/stash/show + destructive-command gu… |
| [dsh-header-status](https://github.com/crystalWinter666/dsh-header-status) | 0 | ⚪ unknown | Move the info bar at the bottom of the chat to next to the title |
| [dsh-mcp-manager](https://github.com/1a125/dsh-mcp-manager) | 2 | ⚪ unknown | DSH global MCP manager |
| [dsh-tray](https://github.com/qing3a/dsh-tray) | 0 | ⚪ unknown | DeepSeek Harness Windows 系统托盘插件（trayicon exe 宿主，无 native 编译） |
| [dsh-oauth-mcp-client](https://github.com/springbrand-lab/dsh-oauth-mcp-client) | 9 | ⚪ unknown | OAuth 2.1 Streamable HTTP MCP client plugin for DeepSeek Harness. |
| [dsh-playwright-browser](https://github.com/Clizo1209/dsh-playwright-browser) | 11 | 🟢 ok | Playwright browser automation for DeepSeek Harness｜面向 DeepSeek Harness 的 Playwright 浏览器自动化插件 |
| [deepseek-harness-action](https://github.com/Lixiaoyiao/deepseek-harness-action) | 14 | ⚪ unknown | Community GitHub Action for DeepSeek Harness — AI Code Review · CI Diagnosis · Auto Fix · Issue → PR |
| [Oh-My-DSH](https://github.com/NoWint/Oh-My-DSH) | 11 | ⚪ unknown | DeepSeek Harness 插件精选集 · 300+ dsh-plugin 收录 · 22 大分类 |
| [dsh-win-terminal-inspector](https://github.com/clearkurt/dsh-win-terminal-inspector) | 7 | ⚪ unknown | Windows (win32) terminal inspection for DSH persistent/PTY shells |
| [dsh-tool-hashline](https://github.com/InklingYoshi584/dsh-tool-hashline) | 2 | ⚪ unknown | Hash-anchored read/edit/grep tools for DeepSeek Harness: every line carries a content hash, stale anchors are rejected before tou… |
| [dsh-view-modes](https://github.com/NigelYao/dsh-view-modes) | 3 | ⚪ unknown | view modes for deepseek harness, including Verbose, Normal, Summary Mode |
| [dsh-codex-oauth](https://github.com/Babulubobo/dsh-codex-oauth) | 2 | 🟢 ok | use your codex subscription in deepseek harness |
| [dsh-figma-to-lottie](https://github.com/zimai233/dsh-figma-to-lottie) | 1 | ⚪ unknown | Figma/SVG to Lottie animation compiler for DeepSeek Harness. Turn SVG paths and keyframe data into self-contained .lottie.json fi… |
| [opencode-usage](https://github.com/AmaTsumeAkira/opencode-usage) | 1 | ⚪ unknown | OpenCode Go 订阅额度徽章插件（dsh bundle） | OpenCode Go quota badge plugin for dsh |
| [dsh-plugin-git-inspect](https://github.com/Wanbinyu/dsh-plugin-git-inspect) | 1 | ⚪ unknown | Read-only Git inspection tools for DeepSeek Harness |
| [dsh-html-canvas](https://github.com/Jinsong-Zhou/dsh-html-canvas) | 2 | ⚪ unknown | A DeepSeek Harness plugin that turns AI-generated HTML into a click-to-edit canvas beside the chat |
| [dsh-turn-approval](https://github.com/arrow949/dsh-turn-approval) | 2 | ⚪ unknown | Turn-scoped "Allow for this task" approvals for DeepSeek Harness. |
| [dsh-plugins](https://github.com/mouliangyu/dsh-plugins) | 1 | ⚪ unknown | Community plugins for DeepSeek Harness |
| [dsh-plugin-knowledge-graph](https://github.com/Luke-Yong/dsh-plugin-knowledge-graph) | 4 | ⚪ unknown | dsh-plugin-knowledge-graph for Deepseek Harness |
| [dsh-document-parser](https://github.com/miaobuao/dsh-document-parser) | 1 | ⚪ unknown | A DeepSeek Harness document parsing tool powered by LiteParse |
| [long-draft-input](https://github.com/Heyflyingpig/long-draft-input) | 3 | ⚪ unknown | Deepseek Harness 插件：用于聚合发送框长文本 |
| [dsh-playwright-native](https://github.com/mitao-su/dsh-playwright-native) | 1 | ⚪ unknown | 把原生 Playwright CLI 注册为 DeepSeek Harness 透传工具（dsh-plugin） |
| [dsh-composer-polish](https://github.com/tianji-qingtian/dsh-composer-polish) | 6 | ⚪ unknown | DeepSeek Harness plugin: one-click ✨ composer draft polishing — flash rewrite, auto fill-back into the input box |
| [dsh-code-impact](https://github.com/baidd1011/dsh-code-impact) | 2 | ⚪ unknown | 面向 DeepSeek Harness 的只读 TypeScript/JavaScript 代码变更影响分析插件 Read-only TypeScript/JavaScript change impact analysis plugin for DeepSe… |
| [dsh-oauth-api](https://github.com/hahaha-taotao/dsh-oauth-api) | 1 | ⚪ unknown | DeepSeek Harness (dsh) out-of-tree OAuth plugin for Grok/xAI, Codex, and Claude Code. Community plugin, not official. |
| [dsh-plugin](https://github.com/acosmi/dsh-plugin) | 2 | 🟢 ok | Community plugin collection for DeepSeek Harness (DSH) |
| [dsh-zh-output](https://github.com/YKennen/dsh-zh-output) | 3 | ⚪ unknown | DeepSeek Harness 中文输出插件：强制中文思考与输出的中文预设 |
| [dsh-excel-chat](https://github.com/hccccc01333/dsh-excel-chat) | 6 | 🟢 ok | dsh-excel-chat — talk to Excel in DeepSeek Harness: create, edit, repair, and verify spreadsheets by conversation (cells, formula… |
| [dsh-eyecare](https://github.com/Yummyxl/dsh-eyecare) | 3 | ⚪ unknown | dsh护眼插件 |
| [dsh-plugin-healthcheck](https://github.com/chenw2759-wq/dsh-plugin-healthcheck) | 14 | ⚪ unknown | 害怕插件装了就崩溃？用这个插件帮你检测插件是否正常/是否含木马！ |
| [deepseek-harness-openai-oauth](https://github.com/DGPisces/deepseek-harness-openai-oauth) | 6 | 🟢 ok | DeepSeek Harness provider for GPT models using managed ChatGPT OAuth through Codex app-server |
| [dsh-plugin-browser](https://github.com/xu1132/dsh-plugin-browser) | 1 | 🟢 ok | A DeepSeek Harness community plugin that drives a headless Playwright browser: rendered page text, screenshots, and page automati… |
| [deepseek-plugin-store](https://github.com/Ericwong5021/deepseek-plugin-store) | 24 | ⚪ unknown | DeepSeek Harness 独立社区插件商店：发现、安装并提交经过验证的插件、工具与扩展。 | Independent community plugin directory. |
| [dsh-plugin-store](https://github.com/wink-run/dsh-plugin-store) | 4 | 🟢 ok | deepseek harness plugin store |
| [dsh-aura-scheduler](https://github.com/ljsysfurryACE/dsh-aura-scheduler) | 2 | ⚪ unknown | Proactive scheduling for DeepSeek Harness: Aura heartbeat + value network (official is model-driven only) |
| [harness-pet](https://github.com/cakeni/harness-pet) | 5 | ⚪ unknown | Harness Pet — an unofficial community pet for DeepSeek Harness. Not affiliated with, endorsed by, or maintained by DeepSeek. |
| [dsh-egress-guard](https://github.com/LKRCharon/dsh-egress-guard) | 0 | 🟢 ok | Local, zero-network, fail-closed secret preflight for DeepSeek Harness model requests. |
| [dsh-geo](https://github.com/winyh/dsh-geo) | 0 | ⚪ unknown | 生成式引擎优化（GEO）DeepSeek Harness 插件：面向本地 Markdown 知识库的 SEO、GEO 与 AEO 审计工具。 |
| [dsh-video-downloader](https://github.com/zimai233/dsh-video-downloader) | 2 | ⚪ unknown | Media downloader for DeepSeek Harness. Detect and download video/audio from Bilibili, YouTube, Douyin, Xiaohongshu. |
| [dsh-mermaid-preview](https://github.com/realguan/dsh-mermaid-preview) | 0 | ⚪ unknown | Render Mermaid fenced code blocks as diagrams in DeepSeek Harness (dsh) web — a dynamic Cordis client plugin, no shell changes ne… |
| [dsh-web-search-provider](https://github.com/hiyms/dsh-web-search-provider) | 1 | 🟢 ok | Native web search provider for the DeepSeek Harness web seam (ctx.web): OpenAI Responses API (search/open_page/find_in_page) and… |
| [dsh-action-parity](https://github.com/dongsheng123132/dsh-action-parity) | 3 | ⚪ unknown | Cross-surface action binding and replay parity evidence for DeepSeek Harness |
| [dsh-input-history](https://github.com/omdsh-dev/dsh-input-history) | 3 | ⚪ unknown | DSH Web 输入历史插件：Ctrl+Up / Ctrl+Down 像终端一样召回与切换已发送消息，零核心改动 |
| [dsh-tool-backtest](https://github.com/dmsobtl/dsh-tool-backtest) | 0 | 🟢 ok | DSH 插件：策略回测引擎 — 定义买卖信号，跑历史数据，输出绩效指标。 |
| [dsh-plugins](https://github.com/SisyphusSQ/dsh-plugins) | 2 | ⚪ unknown | A monorepo for composable DeepSeek Harness (DSH) plugins. |
| [dsh-plugin-quote-reply](https://github.com/yangYzc/dsh-plugin-quote-reply) | 1 | 🟢 ok | DSH plugin: select text in a conversation, then quote it into the composer or reply in a new window. / DeepSeek Harness 划词引用插件：选中… |
| [dsh-sound](https://github.com/yeshimei/dsh-sound) | 0 | ⚪ unknown | Distinct alert sounds for DeepSeek Harness: network error, approval request, question asked, and turn-completion notifications. |
| [dsh-tool-playwright](https://github.com/cheng-nan01/dsh-tool-playwright) | 0 | ⚪ unknown | 一个给 DeepSeek Harness 用的插件：让 AI 能真的打开浏览器上网——打开网页、点按钮、填表单、翻页、看页面内容，就像人一样操作浏览器。 |
| [knowlp-rag](https://github.com/wly8691-jpg/knowlp-rag) | 3 | ⚪ unknown | KnowLP-RAG: dual knowledge graph retrieval for Markdown notes - MCP stdio server for DeepSeek Harness (dsh) & Claude Code |
| [omdp](https://github.com/XJungit/omdp) | 2 | ⚪ unknown | only my DSH plugins — monorepo of DeepSeek Harness plugin bundles |
| [dsh-ProjectModel](https://github.com/Youngxj/dsh-ProjectModel) | 0 | ⚪ unknown | deepseek项目组功能 |
| [dsh-pain-point-check](https://github.com/ICCuse/dsh-pain-point-check) | 1 | ⚪ unknown | Enforced pain-point-check guard plugin for DeepSeek Harness: after two non-converged experiments it injects the three questions,… |
| [dsh-entity-dd](https://github.com/sherconan/dsh-entity-dd) | 1 | ⚪ unknown | 出海交易对手尽调 · DeepSeek Harness 插件：先确认你在跟哪个法人签约，再判断这份登记资料能不能作为决策依据。免费官方数据源，无需密钥。 |
| [dsh-wash-calendar](https://github.com/zimai233/dsh-wash-calendar) | 0 | ⚪ unknown | Recurring habit scheduling calendar for DeepSeek Harness. Turn last-wash dates and intervals into next-occurrence, schedule, chec… |
| [dsh-codex-auth](https://github.com/suntianc/dsh-codex-auth) | 13 | 🟢 ok | DeepSeek Harness plugin that reuses the local Codex CLI ChatGPT login and adds a native GPT Auth settings card |
| [dsh-code-lens](https://github.com/lisycotana/dsh-code-lens) | 0 | ⚪ unknown | Observability for DeepSeek Harness code-mode sub-dispatches: the tool calls a run_code program makes that the model never sees. |
| [dsh-subprocess-inherit-environment](https://github.com/zhangzujian/dsh-subprocess-inherit-environment) | 2 | ⚪ unknown | DSH plugin that forwards the complete Harness environment through ctx.subprocess |
| [dsh-doctor-windows](https://github.com/sublatesublate-design/dsh-doctor-windows) | 0 | 🟢 ok | Windows environment diagnostics for DeepSeek Harness |
| [MuseAI](https://github.com/yejiming/MuseAI) | 612 | ⚪ unknown | 创建你的 AI 角色，进入你的故事世界。和角色聊天、冒险、穿书，让每一次互动都留下羁绊（支持 DeepSeek Harness 插件，欢迎使用） |
| [dsh-user-experience](https://github.com/DietCokewithSugar/dsh-user-experience) | 19 | 🟢 ok | Persona-driven UX walkthrough plugin for DeepSeek Harness (DSH) - scans React + TypeScript source code for UX issues, pinpoints t… |
| [dsh-plugin-automations](https://github.com/Sev7een/dsh-plugin-automations) | 2 | ⚪ unknown | Scheduled tasks plugin for DeepSeek Harness Web Profile |
| [dsh-web-search-tavily](https://github.com/nitrazepam01/dsh-web-search-tavily) | 2 | ⚪ unknown | Tavily-backed web search provider bundle for DeepSeek Harness (dsh) with hot-switchable backend (Tavily / DeepSeek search) |
| [trio](https://github.com/huey1in/trio) | 16 | ⚪ unknown | DSH 全家桶:浏览器自动化 + MCP Server + GitHub 集成 | Browser automation + MCP server + GitHub for DeepSeek Harness — one install, three supe… |
| [dsh-policy-drift-proof](https://github.com/dongsheng123132/dsh-policy-drift-proof) | 3 | ⚪ unknown | Content-addressed, value-redacted policy drift evidence for DeepSeek Harness |
| [dsh-audit-bundle](https://github.com/dongsheng123132/dsh-audit-bundle) | 3 | ⚪ unknown | Content-addressed audit indexes across independent DeepSeek Harness evidence producers |
| [dsh-recovery-proof](https://github.com/dongsheng123132/dsh-recovery-proof) | 3 | ⚪ unknown | Read-only recovery drill evidence for DeepSeek Harness |
| [dsh-mediacrawler](https://github.com/xwh-01/dsh-mediacrawler) | 3 | ⚪ unknown | DeepSeek Harness MCP adapter for bounded, isolated MediaCrawler collection. |
| [dsh-credentials-system](https://github.com/khiqwq/dsh-credentials-system) | 0 | ⚪ unknown | System-bound encrypted credential provider for DeepSeek Harness |
| [dsh-plugins](https://github.com/wsxwj123/dsh-plugins) | 8 | ⚪ unknown | Independent plugins for DeepSeek Harness, organized as isolated packages in one monorepo. |
| [deepseek-harness-cli](https://github.com/soolaugust/deepseek-harness-cli) | 3 | ⚪ unknown | DeepSeek Harness: Everything is a Plugin. |
| [dsh-chat-outline](https://github.com/liliuCourier/dsh-chat-outline) | 8 | 🟢 ok | 对话栏左侧常驻大纲：快速定位每次 user 提问与最后 assistant 回复（DeepSeek Harness 插件） |
| [dsh-passwords](https://github.com/slywalker2006/dsh-passwords) | 21 | ⚪ unknown | Turns DeepSeek Harness into a server-grade multi-tenant platform: remote access + auto HTTPS, subuser permissions & token/daily q… |
| [mindspace-dsh-local-rag](https://github.com/Spirtxiaoqi7/mindspace-dsh-local-rag) | 3 | ⚪ unknown | ARPM-derived local hybrid RAG plugin for DeepSeek Harness |
| [dsh-mcp-pack](https://github.com/mengyaoi/dsh-mcp-pack) | 2 | ⚪ unknown | 常用 MCP server 一键接入 DeepSeek Harness (dsh) 的 .cordis.yml 清单合集，开箱即用，零代码。 |
| [upstream-radar](https://github.com/MicroMilo/upstream-radar) | 8 | ⚪ unknown | Always-on vulnerability and breaking-change impact monitoring for DeepSeek Harness plugins. |
| [dsh-plugin-anydoc](https://github.com/beancookie/dsh-plugin-anydoc) | 6 | ⚪ unknown | DSH 插件：基于 @firecrawl/anydoc 将 Word、PPT、Excel、PDF、EPUB、CSV 等文档转换为 GitHub-Flavored Markdown |
| [deepseek-harness-lite](https://github.com/sakurarain1213/deepseek-harness-lite) | 2 | ⚪ unknown | A lightweight, local-first distribution and verified plugin kit for DeepSeek Harness. |
| [dsh-bash-encoding](https://github.com/omdsh-dev/dsh-bash-encoding) | 1 | ⚪ unknown | DSH bash 输出编码自动识别插件：替换 ctx.bash，自管 spawn 收集原始字节，自动检测 UTF-16LE/UTF-8/GBK 等编码并正确解码，修复 WSL/Windows 下 bash 工具的中文乱码。 |
| [dsh-oai-oauth](https://github.com/werifu/dsh-oai-oauth) | 1 | 🟢 ok | A plugin allowing you to use ChatGPT via OpenAI subscription without API Key in Deepseek Harness |
| [surfing-plugin](https://github.com/cyijun/surfing-plugin) | 14 | ⚪ unknown | SearXNG search and Crawl4AI fetch providers for DeepSeek Harness |
| [deepseek-harness-vsc-extension](https://github.com/weinibuliu/deepseek-harness-vsc-extension) | 24 | ⚪ unknown | DeepSeek Harness for VS Code |
| [dsh-ci-doctor](https://github.com/jkrandom-sudo/dsh-ci-doctor) | 3 | ⚪ unknown | CI failure, diagnosed before you open the logs — DeepSeek Harness plugin that watches GitHub Actions for new failures and turns r… |
| [dsh-read-history](https://github.com/Slowdownnn/dsh-read-history) | 2 | ⚪ unknown | 迁移claude/codex的对话历史到dsh |
| [dsh-yuzuha-prompts-manager](https://github.com/Airrcat/dsh-yuzuha-prompts-manager) | 2 | ⚪ unknown | a plugin for manage prompts in deepseek harness. |
| [dsh-pet](https://github.com/Vulcan626/dsh-pet) | 3 | 🟢 ok | A community DeepSeek Pet client plugin for DeepSeek Harness |
| [dsh-win-launchscript](https://github.com/NaNExist/dsh-win-launchscript) | 1 | ⚪ unknown | 适用于 Windows 的 DeepSeek Harness（DSH）一键启动脚本，自动启动 Web 服务、打开浏览器，并在关闭窗口后停止服务。 |
| [dsh-model-provider-label](https://github.com/haiyoucuv/dsh-model-provider-label) | 1 | ⚪ unknown | DeepSeek Harness plugin that disambiguates same-named models by showing their provider |
| [dsh-pub](https://github.com/dsh-pub/dsh-pub) | 2 | ⚪ unknown | The bilingual, source-backed registry and installer for the DeepSeek Harness plugin ecosystem. |
| [anysearch-dsh](https://github.com/anysearch-team/anysearch-dsh) | 239 | 🟢 ok | AnySearch web search provider and advanced search tools for DeepSeek Harness (DSH) |
| [dsh-toy](https://github.com/c3ll256/dsh-toy) | 62 | 🟢 ok | Toy Control Protocol for DSH |
| [dsh-conv-search](https://github.com/beijingwahw/dsh-conv-search) | 3 | ⚪ unknown | dsh-conv-search（对话内文本搜索）— in-conversation text search plugin for DeepSeek Harness (Ctrl+F, match case, whole word, streaming-awar… |
| [dsh-web-search-exa](https://github.com/TonyDua/dsh-web-search-exa) | 6 | 🟢 ok | Zero-config Exa web search provider for DeepSeek Harness (dsh): keyless anonymous MCP fallback (mcp.exa.ai/mcp) + keyed REST path… |
| [dsh-plugins](https://github.com/Ceelog/dsh-plugins) | 8 | ⚪ unknown | deepseek harness plugins |
| [dsh-mindmap](https://github.com/chenw2759-wq/dsh-mindmap) | 5 | ⚪ unknown | DSH 思维导图模式插件：课件(PPT/PDF/Word)+电子书 → 打印级复习思维导图 HTML（A3 横向、每主干一页、大括号式横向、宋体、右栏笔记区、封面总览 + 交互式测试题） |
| [dsh-testgen](https://github.com/bujue600-arch/dsh-testgen) | 3 | ⚪ unknown | Automated unit-test generation for DeepSeek Harness: /testgen command + generate_tests tool that scaffold, run, and fix unit test… |
| [dsh-bottom-bar](https://github.com/kc0ed/dsh-bottom-bar) | 8 | ⚪ unknown | 用于提供更丰富的DeepSeek Harness底栏信息显示插件 |
| [dsh-stock-watch](https://github.com/Awu12277/dsh-stock-watch) | 62 | 🟢 ok | A股自选股实时行情盯盘插件 - DeepSeek Harness Web 右上角可折叠弹窗 |
| [dsh-tool-search](https://github.com/Letter2025/dsh-tool-search) | 5 | 🟢 ok | Tool search & slimming for DeepSeek Harness: Hermes-style progressive disclosure — search, describe, and call long-tail tools on… |
| [dsh-spec-loop](https://github.com/tianji-qingtian/dsh-spec-loop) | 6 | ⚪ unknown | Spec-driven 开发闭环（OpenSpec 兼容）：/spec 命令族驱动 生成规格 → 批准 → 实现 → 逐条验收 → 归档 | Spec-driven dev loop (OpenSpec-compatible) for DeepSeek Ha… |
| [dsh-cmd-starter](https://github.com/PandaColour/dsh-cmd-starter) | 3 | ⚪ unknown | 为deepseek-harness提供一个命令行启动工具，让它 --append-prompt --resume 等类claude命令 |
| [dsh-mcp-manager](https://github.com/HenC49/dsh-mcp-manager) | 1 | 🔴 broken (failed once, retried — install failed (exit 1):     at runPlugin (file:///home/runner/.npm/_npx/1e7f6d9597241db0/node_modules/@deepseek-ai/dsh/lib/plugin-9h8shc) | 一个 DeepSeek Harness MCP 配置页 |
| [dsh-nebulagraph-v5](https://github.com/xiajingchun/dsh-nebulagraph-v5) | 3 | ⚪ unknown | nebula v5 plugin for deepseek harness |
| [dsh-plugin-text-translation](https://github.com/1738348785/dsh-plugin-text-translation) | 3 | ⚪ unknown | DSH plugin: text & document localization with tag-protected extraction, batch slicing and lossless assembly (game scripts + long… |
| [dsh-overleaf](https://github.com/fly233338/dsh-overleaf) | 8 | ⚪ unknown | Connect Overleaf projects to DeepSeek Harness (DSH) through OverleafMCP and MCP tools. |
| [dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 396 | 🟢 ok | DeepSeek Harness 桌面宠物插件 + 完整素材生成链：AI 提示词 → 绿幕视频 → 透明动画 → 可安装插件，从零到宠物全流程可复现 |
| [dsh-humanizer](https://github.com/DEEP-IOS/dsh-humanizer) | 6 | 🟢 ok | DeepSeek Harness原生中文文本人工智能痕迹消除与多重审核对抗工作流 |
| [dsh-pixluna](https://github.com/PixLunaLab/dsh-pixluna) | 3 | 🟢 ok | dsh-plugin-pixluna | 让 DSH 自己看涩图！ |
| [dsh-deepseek-billing](https://github.com/golitter/dsh-deepseek-billing) | 2 | ⚪ unknown | 在 DSH 中查看 DeepSeek API 账户余额及计费信息 |
| [dsh-suggested-replies](https://github.com/Anionex/dsh-suggested-replies) | 3 | ⚪ unknown | DSH Web 预测回复插件：AI 回复后在输入框上方生成可点击填入草稿的下一步消息候选 |
| [dsh-agy](https://github.com/chaos-03x/dsh-agy) | 25 | 🟢 ok | Google Antigravity (agy) OAuth auth + model access plugin for DeepSeek Harness: multi-account pool, 429 rotation, device fingerpr… |
| [dsh-plugin-mermaid](https://github.com/lj970926/dsh-plugin-mermaid) | 4 | ⚪ unknown | DeepSeek Harness web client plugin: render mermaid code blocks with a chart/source toggle. |
| [dsh-todo-freshness-guard](https://github.com/lamost423/dsh-todo-freshness-guard) | 1 | ⚪ unknown | Out-of-tree DeepSeek Harness guard that prevents stale todo_write state |
| [dsh-windows-readiness-proof](https://github.com/dongsheng123132/dsh-windows-readiness-proof) | 2 | ⚪ unknown | Content-addressed readiness proof for sanitized DeepSeek Harness observations on managed Windows hosts |
| [dsh-article-publish](https://github.com/yangyongzhen/dsh-article-publish) | 4 | ⚪ unknown | Publish articles from DeepSeek Harness to CSDN / Juejin / CNBlog. dsh plugin. |
| [dsh-survival](https://github.com/XDzzzzzZyq/dsh-survival) | 1 | ⚪ unknown | DeepSeek Harness 生存模式 |
| [dsh-cache-stabilizer](https://github.com/dongsheng123132/dsh-cache-stabilizer) | 2 | ⚪ unknown | Cache-prefix stabilization and evidence-based cache metrics for DeepSeek Harness |
| [dsh-tool-somark](https://github.com/saurtone/dsh-tool-somark) | 2 | ⚪ unknown | SoMark document parser tool (somark_parse) plugin for DeepSeek Harness |
| [dsh-mcp-settings](https://github.com/xluomo/dsh-mcp-settings) | 2 | ⚪ unknown | dsh mcp服务器配置管理 |
| [dsh-terminal](https://github.com/dongsheng123132/dsh-terminal) | 2 | 🟢 ok | Persistent interactive terminal mode for DeepSeek Harness |
| [dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard) | 3745 | ⚪ unknown | Two-phase DeepSeek Harness preset: Minimal-aligned bootstrap, then full Standard tools (Project2 98/99) |
| [dsh-whalito-desk](https://github.com/entireyu/dsh-whalito-desk) | 1 | ⚪ unknown | 鲸仔 Whalito，DeepSeek Harness 桌面助手。这是由DSH + DS-V4-Pro-0813开发的tauri桌面程序。 |
| [dsh-browser](https://github.com/xylt369/dsh-browser) | 9 | 🟢 ok | Browser capability for DeepSeek Harness: headed Edge/Playwright provider, SSRF-safe navigation, a11y-ref clicking, permission gat… |
| [dsh-qqbot](https://github.com/tencent-connect/dsh-qqbot) | 76 | 🟢 ok | 让 QQ 机器人接入 DeepSeek Harness（dsh）的官方插件 |
| [dsh-plugin-store](https://github.com/w769721503/dsh-plugin-store) | 6 | 🟢 ok | DeepSeek Harness 插件商店：浏览、搜索、筛选并一键安装 dsh-plugin 生态插件 |
| [dsh-office](https://github.com/omdsh-dev/dsh-office) | 15 | 🟢 ok | 办公三件套！Office document tools for DeepSeek Harness (dsh): generate, read, and edit spreadsheets (.xlsx), PDFs, and presentations (.… |
| [dsh-plugins](https://github.com/kestiny18/dsh-plugins) | 2 | ⚪ unknown | Community plugins for DeepSeek Harness |
| [promptwall](https://github.com/Chhlafiu4312/promptwall) | 3 | ⚪ unknown | Local prompt-injection and secret-exfiltration firewall for DeepSeek Harness. |
| [dsh-tailscale-sync](https://github.com/MoonGlassKitty/dsh-tailscale-sync) | 4 | ⚪ unknown | Zero-config Tailscale sync for DeepSeek Harness (dsh-plugin). 零配置：在手机上继续电脑端 DeepSeek Harness 的工作。 |
| [dsh-mcp-center](https://github.com/drfccv/dsh-mcp-center) | 1 | 🟢 ok | Connect any MCP server to your DeepSeek Harness — point, click, done. |
| [dsh-side-chat](https://github.com/AHGGG/dsh-side-chat) | 12 | 🟢 ok | Codex-style Side Chat for DeepSeek Harness — select text, ask follow-up questions in a focused side conversation, and keep the ma… |
| [dsh-ocg-billing](https://github.com/hiro-nikaitou/dsh-ocg-billing) | 1 | ⚪ unknown | DeepSeek Harness (dsh) plugin: OpenCode Go billing layer with cached official pricing, proactive update checks, bill computation… |
| [dsh-quote-reply](https://github.com/HOFO-GYG/dsh-quote-reply) | 3 | ⚪ unknown | DSH web plugin: quote any selected fragment of a conversation into the composer as a Markdown blockquote - smart floating button… |
| [dsh-browser](https://github.com/duyefeng/dsh-browser) | 1 | 🟢 ok | 给 DeepSeek Harness 的浏览器插件：AI 直接开真实的 Edge 浏览器逛网页、点击、填表、截图，无需 CDP 或 MCP。 |
| [SapBuddy-dsh](https://github.com/gxx950224/SapBuddy-dsh) | 3 | ⚪ unknown | SapBuddy-dsh |
| [dsh-blackjack](https://github.com/WhiseNT/dsh-blackjack) | 2 | 🟢 ok | 谁不想coding的时候急头白脸的和大肥鱼来一场紧张刺激的21点呢 |
| [dsh-keepalive](https://github.com/xiaohj233/dsh-keepalive) | 3 | ⚪ unknown | Opt-in detached watchdog for the DSH Web process with snapshot-checked repair and explicit patch restoration. |
| [dsh-scrape-webpage](https://github.com/131CDA1/dsh-scrape-webpage) | 7 | ⚪ unknown | 用于DeepSeek Harness的网页读取插件 |
| [dsh-museai-tavern](https://github.com/yejiming/dsh-museai-tavern) | 18 | ⚪ unknown | MuseAI的DeepSeek Harness插件，可以将你的MuseAI角色放进DSH使用啦！ |
| [citeguard](https://github.com/Chhlafiu4312/citeguard) | 3 | ⚪ unknown | Citation extraction and evidence verification for DeepSeek Harness. |
| [dsh-commandcode-go-provider](https://github.com/jiesou/dsh-commandcode-go-provider) | 3 | ⚪ unknown | Command Code Go API provider for dsh. Command Code 订阅 + DeekSeek Harness 兼容层 |
| [dsh-openai-oauth](https://github.com/DGPisces/dsh-openai-oauth) | 6 | 🟢 ok | DeepSeek Harness provider for GPT models using managed ChatGPT OAuth through Codex app-server |
| [dsh-web-search-Tavily](https://github.com/SZMY-haruhi/dsh-web-search-Tavily) | 4 | 🟢 ok | Adds Tavily Search API as a web search provider for DSH. |
| [dsh-satori](https://github.com/Ri0n72Y/dsh-satori) | 2 | 🟢 ok | cordis plugin connect dsh and satori for im abilities |
| [dsh-pi](https://github.com/TGYD-helige/dsh-pi) | 4 | ⚪ unknown | Run trusted Pi extensions inside DeepSeek Harness through a compatibility host. |
| [dsh-hotplug-engine](https://github.com/AnothetLoice/dsh-hotplug-engine) | 2 | 🟢 ok | Plugin install, rollback, and audit as a service for DSH. |
| [dsh-claude-provider](https://github.com/MoFeng2223/dsh-claude-provider) | 37 | ⚪ unknown | Custom Claude provider support for DeepSeek Harness |
| [dsh-plugin-working-status](https://github.com/Abyss-Seeker/dsh-plugin-working-status) | 8 | ⚪ unknown | 把思考状态里那句 "Deep diving..." 改成你喜欢的任何话。超轻量级。 |
| [dsh-mcp-admin](https://github.com/kairoz9/dsh-mcp-admin) | 5 | ⚪ unknown | View MCP server status (/mcp) and manage MCP servers per profile from the settings page. |
| [dsh-plugin-manager](https://github.com/monk233/dsh-plugin-manager) | 4 | 🟢 ok | DSH 插件管理, 一键启用/禁用插件 |
| [dsh-beacons](https://github.com/Da-Mie/dsh-beacons) | 2 | ⚪ unknown | Right-edge prompt navigator (Codex/OpenChamber-style scrub rail with scroll-spy) plus Windows toast notifications — a DeepSeek Ha… |
| [dsh-plugin](https://github.com/Tabbit-Browser/dsh-plugin) | 96 | 🟢 ok | Tabbit Broser plugins for Deepseek Harness |
| [adb_dsh_plugin](https://github.com/mang0cola/adb_dsh_plugin) | 3 | ⚪ unknown | DeepSeek Harness plugin for controlling Android devices through ADB |
| [dsh-livis-connector](https://github.com/fyy99/dsh-livis-connector) | 3 | ⚪ unknown | Connect Livis to DeepSeek Harness with in-app authorization and relay management. |
| [dsh-utility-tools](https://github.com/sharkymew/dsh-utility-tools) | 3 | 🟢 ok | DSH（DeepSeek Harness）对话工具插件：拖拽任意文件进入对话 + 选中文本引用。 |
| [dsh-usage-dashboard](https://github.com/Cassius0924/dsh-usage-dashboard) | 7 | ⚪ unknown | DeepSeek 额度与用量仪表盘 — DSH (DeepSeek Harness) 动态 Cordis 插件 |
| [dsh-sci](https://github.com/Blaczz/dsh-sci) | 3 | ⚪ unknown | Zero-dependency scientific computing tools for DeepSeek Harness: physical-unit conversion, CODATA physical constants, and Runge-K… |
| [dsh-docling](https://github.com/Sqhao-O/dsh-docling) | 12 | ⚪ unknown | Native Docling document intelligence for DeepSeek Harness. |
| [dsh-git-guard](https://github.com/bibibala/dsh-git-guard) | 1 | ⚪ unknown | Git-aware write guard plugin for DeepSeek Harness: blocks whole-file writes that would overwrite the user's uncommitted changes,… |
| [dsh-cyber-particle](https://github.com/AKS1st/dsh-cyber-particle) | 11 | ⚪ unknown | Particle-network background plugin for DeepSeek Harness web |
| [dsh-browseruse](https://github.com/yzd6552-commits/dsh-browseruse) | 4 | ⚪ unknown | browser-use style browser automation plugin for DeepSeek Harness: drives a dedicated Chrome instance (persistent profile) via pla… |
| [dsh-rewind](https://github.com/2501136589/dsh-rewind) | 2 | 🟢 ok | DSH回退插件 |
| [dsh-plugin-auditor](https://github.com/HYY-King/dsh-plugin-auditor) | 2 | ⚪ unknown | DSH plugin auditor: pre-flight compatibility check for profile plugin combinations. DSH 插件审核器：安装新插件前扫描组合兼容性，预防启动崩溃。 |
| [dsh-plugin-diff-review](https://github.com/Civitasv/dsh-plugin-diff-review) | 7 | ⚪ unknown | Diff Review Plugin for DeepSeek Harness |
| [plugin-deus (神模扳机)](https://github.com/whyihaveyou/dsh-suite/tree/main/packages/plugin-deus) | 1 | 🟢 ok | Deus Trigger: one-click minimal-prompt experiments — verified Minimal behaviors, opener-fingerprint auto-detection, local trigger… |
| [dsh-tavern](https://github.com/Player-MINEPIG/dsh-tavern) | 11 | 🟢 ok | A plugin which makes dsh compatible with SillyTavern artifacts. |
| [dsh-webchatlike](https://github.com/cindyguyuehu123/dsh-webchatlike) | 6 | ⚪ unknown | Web-chat style message actions for DeepSeek Harness: edit your prompt, regenerate answers, and flip versions with a deepseek.com-… |
| [dsh-us-stocks](https://github.com/Realyujie/dsh-us-stocks) | 8 | 🟢 ok | US stock market data tools for DeepSeek Harness, powered by yahoo-finance2 |
| [dsh-zh-hant-hk](https://github.com/Argonaut790/dsh-zh-hant-hk) | 3 | ⚪ unknown | DeepSeek Harness plugin: Hong Kong Traditional Chinese wording (對話, 設定, 儲存) |
| [dsh-chat-timeline](https://github.com/jjxjjjjiik-bot/dsh-chat-timeline) | 29 | 🟢 ok | 1:1 port of DeepSeek's official web right-side chat navigation rail (ScrollNav) as a DeepSeek Harness (DSH) plugin |
| [dsh-doctor](https://github.com/astra3294/dsh-doctor) | 4 | 🟢 ok | Deterministic diagnostics and recovery for DeepSeek Harness |
| [douyin-plugin-dsh-plugin](https://github.com/chu557/douyin-plugin-dsh-plugin) | 4 | ⚪ unknown | 在使用dsh等待的过程中刷抖音 |
| [dsh-go-rotator](https://github.com/echo-xianyu/dsh-go-rotator) | 4 | ⚪ unknown | A plugin for DSH to swich opencode Go subscription |
| [dsh-voice-mic](https://github.com/Zachary7456/dsh-voice-mic) | 3 | ⚪ unknown | DeepSeek Harness (dsh) 语音输入插件：麦克风按钮/快捷键录音，实时转写回填输入框。三种识别引擎：浏览器 Web Speech、本地 SenseVoice/Paraformer 离线后端（一键部署）、OpenAI 兼容云端 ASR API。 |
| [deepseek-harness-for-vscode](https://github.com/skymecode/deepseek-harness-for-vscode) | 62 | ⚪ unknown | deepseek-harness for vscode .This is a community project, and we welcome your valuable feedback! |
| [DSH-EvoResearch](https://github.com/Karbo123/DSH-EvoResearch) | 13 | ⚪ unknown | 自进化科研工作流 |
| [dsh-queue-plus](https://github.com/starslittle/dsh-queue-plus) | 17 | 🟢 ok | Reorder, clear, and undo controls for the DeepSeek Harness prompt queue |
| [dsh-auto-mode](https://github.com/NanmiCoder/dsh-auto-mode) | 127 | 🟢 ok | Safe automatic permissions for DeepSeek Harness. |
| [dsh-document-review](https://github.com/yabo083/dsh-document-review) | 2 | 🟢 ok | DeepSeek Harness plugin: review Markdown documents in a local browser with annotations, replacements, and deletion suggestions. S… |
| [dsh-audio-alert](https://github.com/ellelkktrraaa/dsh-audio-alert) | 2 | ⚪ unknown | dsh中断声音提示喵（可配置音频喵）Browser audio alerts for dsh attention edges: approval requests, ask-user questions, and finished turns. |
| [dsh-envoy](https://github.com/KhalilYamber/dsh-envoy) | 6 | ⚪ unknown | Hana 插件：把 coding 任务外包给本机 DeepSeek Harness，审批同步回 Hana 内决策，结果以原生卡片带回 |
| [dsh-drop-file-to-path](https://github.com/GLFzr/dsh-drop-file-to-path) | 9 | ⚪ unknown | DSH 拖拽文件转路径插件：Codex 式拖拽，路径自动插入输入框（Drop File to Path for DeepSeek Harness） |
| [dsh-onebot](https://github.com/Hoshino-Yumetsuki/dsh-onebot) | 3 | 🟢 ok | OneBot Adapter For DSH |
| [dsh-obsidian-assistant](https://github.com/iamzcr/dsh-obsidian-assistant) | 6 | 🟢 ok | DeepSeek Harness 插件（Cordis toolset）：操作本地 Obsidian 知识库（vault），提供搜索、读写笔记、双向链接 / 关系图谱、批量整理，并通过 Obsidian 的 "Local REST API" 社区插件调用高级能… |
| [dsh-side-chat](https://github.com/2031814001yuyue-tech/dsh-side-chat) | 4 | 🟢 ok | dsh-plugin |
| [dsh-plugin-manager](https://github.com/2768651338/dsh-plugin-manager) | 7 | 🟢 ok | DeepSeek Harness 的图形化插件管理插件：在 设置 → 插件 里新增「插件管家」标签页，用中文名和说明展示每个插件是做什么的，并提供一键启停开关与内置备注编辑——启停写入全局层补丁并实时热生效，备注保存到本地覆盖文件长期生效。 |
| [dsh-simplify](https://github.com/GongYuanCaiJi/dsh-simplify) | 3 | ⚪ unknown | DeepSeek Harness 插件：审查最近改动的代码，就清晰度、一致性与可维护性提出改进（移植自 pi-simplify） |
| [dsh-github-login](https://github.com/Noob-stupid/dsh-github-login) | 6 | ⚪ unknown | DeepSeek Harness 生态的 GitHub 可视化登录工具（零终端）：设备码流程，令牌同步 gh CLI | Visual GitHub login for the DSH ecosystem - no terminal needed |
| [dsh-docs](https://github.com/Sqhao-O/dsh-docs) | 12 | ⚪ unknown | Native Docling document intelligence for DeepSeek Harness. |
| [dsh-hanako](https://github.com/Nyasers/dsh-hanako) | 36 | ⚪ unknown | DSH for Hanako |
| [octie-dsh-plugin](https://github.com/StarChen-Cycler/octie-dsh-plugin) | 3 | ⚪ unknown | Octie refactored as a DeepSeek Harness bundle plugin: durable DAG task-graph state machine with octie_* tools, octie Cordis servi… |
| [dsh-codex-provider-plugin](https://github.com/DamonBao/dsh-codex-provider-plugin) | 4 | ⚪ unknown | OpenAI Codex provider for DeepSeek Harness with ChatGPT OAuth, native settings, and account usage. |
| [DSH-shutdown](https://github.com/knlght/DSH-shutdown) | 3 | 🟢 ok | 一键结束 DeepSeek Harness 服务：Settings 关机页 + 二次确认 + 优雅退出，关掉浏览器不再留下后台进程 |
| [dsh-guardian](https://github.com/akira399/dsh-guardian) | 2 | 🟢 ok | DeepSeek Harness task-protection plugin: preflight scanner (catches missing inject declarations that crash the host), loop detect… |
| [dsh-plugin-open-editor](https://github.com/Civitasv/dsh-plugin-open-editor) | 2 | ⚪ unknown | Editor Plugin for Deepseek Harness |
| [dsh-web-mobile-fix](https://github.com/AcidGr/dsh-web-mobile-fix) | 5 | ⚪ unknown | DeepSeek Harness (dsh) Web plugin |
| [dsh-timeline](https://github.com/zhangzheng25/dsh-timeline) | 4 | 🟢 ok | DSH 插件：极简提问时间线——每条提问一个圆点，点击跳转，悬停预览。Minimal question timeline for DeepSeek Harness. |
| [dsh-crw](https://github.com/us/dsh-crw) | 3 | 🟢 ok | fastCRW-backed web_search and web_fetch providers for DeepSeek Harness (ctx.web) |
| [adhdgofly-dsh-ext](https://github.com/zuoguyoupan2023/adhdgofly-dsh-ext) | 5 | 🟢 ok | ADHDGoFly POS highlighting plugin for DeepSeek Harness Web: nouns green, verbs red, adjectives/adverbs purple, others gray in ren… |
| [dsh-solo-thinking](https://github.com/fredalxin/dsh-solo-thinking) | 21 | ⚪ unknown | Solo-style isolated brainstorm branches and Handoffs for DeepSeek Harness |
| [dsh-subscription-auth](https://github.com/Khellendros97/dsh-subscription-auth) | 6 | 🟢 ok | dsh对接openai、grok、anthropic、kimi订阅渠道 |
| [dsh-knowledge-graph](https://github.com/cwbcheng/dsh-knowledge-graph) | 2 | ⚪ unknown | DSH Cordis plugin: turn any source text into an AI knowledge graph (facts/inferences/concepts/definitions/examples/counter-exampl… |
| [dsh-update-checker](https://github.com/duntansen/dsh-update-checker) | 2 | ⚪ unknown | DSH web plugin: check DeepSeek Harness updates from Settings (dsh --version vs npm latest/next) ｜ DSH Web 插件：在设置页自检 DeepSeek Harn… |
| [dsh-change-center](https://github.com/Chance-Wu/dsh-change-center) | 2 | ⚪ unknown | 文件变更的捕获 → 审查 → 拒绝 / 应用 → 回滚中心 |
| [dsh-attention-notifier](https://github.com/zdjmrq/dsh-attention-notifier) | 1 | ⚪ unknown | 微信式任务栏提醒:DeepSeek Harness 持久化 Cordis 插件(判定端),配合 dsh-shell 呈现 |
| [dsh-credential-handoff](https://github.com/xiaohj233/dsh-credential-handoff) | 2 | ⚪ unknown | Conversation-local credential handoff for DSH that writes through the credential service without exposing the secret. |
| [dsh-smooth-stream](https://github.com/SpookySandwich/dsh-smooth-stream) | 9 | 🟢 ok | Better streaming text animation for DeepSeek Harness 给DSH加入更好文字动画 |
| [dsh-forge](https://github.com/zhn1100/dsh-forge) | 4 | ⚪ unknown | Reproducible DeepSeek Harness plugin development environment |
| [oh-my-dsh](https://github.com/LiuMengxuan04/oh-my-dsh) | 10 | ⚪ unknown | Oh My DSH (DSH Autopilot): durable, bounded autonomous development for DeepSeek Harness |
| [LaoA-dshGF](https://github.com/zhulin025/LaoA-dshGF) | 2 | ⚪ unknown | DeepSeek Harness 赛博女友插件 |
| [dsh-free-search](https://github.com/DDDMUC/dsh-free-search) | 55 | ⚪ unknown | Free web search provider for DeepSeek Harness - DuckDuckGo backend, no API key needed |
| [dsh-better-edit](https://github.com/Rianico/dsh-better-edit) | 16 | 🟢 ok | Hash-anchored read/edit/batch_edit/undo_last_edit tools for DeepSeek Harness (dsh) — dsh port of pi-hashline-edit-lsz |
| [dsh-prompt-manager](https://github.com/errorcode7/dsh-prompt-manager) | 6 | 🟢 ok | DeepSeekHarness的提示词管理器插件 |
| [snapgrep](https://github.com/Owen718/snapgrep) | 8 | 🟢 ok | An in-process trigram index that makes code search in Pi&DSH 20-70x faster than ripgrep, with identical results and no sidecar pr… |
| [pi-deepseek-anchor](https://github.com/kxh4892636/pi-deepseek-anchor) | 15 | ⚪ unknown | pi extension: DeepSeek V4 Pro Minimal-anchored bootstrap, then full Standard tools (port of dsh-anchored-standard) |
| [deepseek-harness-zh_pro](https://github.com/magian1127/deepseek-harness-zh_pro) | 19 | ⚪ unknown | Chinese enhancement plugin for DeepSeek Harness (DSH) - DSH 中文增强插件 |
| [dsh-surfing-plugin](https://github.com/cyijun/dsh-surfing-plugin) | 14 | ⚪ unknown | SearXNG search and Crawl4AI fetch providers for DeepSeek Harness |
| [DSH-changeproof](https://github.com/Apageoflove/DSH-changeproof) | 5 | ⚪ unknown | 变更证明（ChangeProof）— DeepSeek Harness 插件：代码改动后确认改动的行真的被测试覆盖到 |
| [dsh-save-money](https://github.com/zhu168/dsh-save-money) | 33 | ⚪ unknown | Save-money plugin for DSH (DeepSeek Harness) — define your own "pause / resume" time windows; at pause time running long tasks ar… |
| [oh-my-dsh](https://github.com/amplifthq/oh-my-dsh) | 11 | 🟢 ok | A curated distribution of DeepSeek Harness. Overlay, not a fork. |
| [Deepseek-Harness-for-VS-Code](https://github.com/Vithrive/Deepseek-Harness-for-VS-Code) | 8 | ⚪ unknown | Deepseek Harness for VS Code |
| [dsh-file-upload](https://github.com/GLFzr/dsh-file-upload) | 9 | 🟢 ok | DSH 拖拽文件转路径插件：Codex 式拖拽，路径自动插入输入框（Drop File to Path for DeepSeek Harness） |
| [dsh-minimal-anchored](https://github.com/KDB-Wind/dsh-minimal-anchored) | 7 | ⚪ unknown | DeepSeek Harness preset: first round uses the official Minimal tools, then unlocks full Standard. 复现 Project2 评测中更高分的 We/Let's 思维… |
| [dsh-search-boost](https://github.com/Mr-remon219/dsh-search-boost) | 12 | ⚪ unknown | The plunge for dsh to boost model's search ability. |
| [dsh-win32](https://github.com/sjh9714/dsh-win32) | 17 | 🟢 ok | First-class Windows for DeepSeek Harness: persistent Git Bash Minimal mode, doctor for install traps, one-command setup | 让 DSH 在… |
| [dsh-plugin-store](https://github.com/0xKcyzz/dsh-plugin-store) | 6 | 🟢 ok | DeepSeek Harness 插件商店：浏览、搜索、筛选并一键安装 dsh-plugin 生态插件 |
| [dsh-backup](https://github.com/xiaoyuyu6420/dsh-backup) | 9 | 🟢 ok | Backup DeepSeek Harness user data with one command: /backup, scheduled auto-backup, sha256 checksums and rotation. 一键备份 DSH 数据，支持… |
| [dockyard-dsh](https://github.com/AITabby/dockyard-dsh) | 78 | 🟢 ok | A macOS-only native account-pool and provider plugin for DeepSeek Harness. |
| [deepseek-harness-workbench-plugin](https://github.com/loadingvx/deepseek-harness-workbench-plugin) | 27 | ⚪ unknown | Deepseek-harness-workbench-plugin |
| [dsh-permgate](https://github.com/MrWeiCodes/dsh-permgate) | 4 | ⚪ unknown | 为 DeepSeek Harness（DSH）提供的细粒度权限控制插件 |
| [anime-find](https://github.com/cocofhu/anime-find) | 160 | 🟢 ok | DeepSeek Harness 搜番插件：对话内多源搜索番剧，卡片展示 Bangumi 评分与详情，支持复制磁力。 |
| [DSH-Think-zh](https://github.com/Len7183/DSH-Think-zh) | 12 | ⚪ unknown | DeepSeek Harness 默认的思考语言为英文，这不利于中文使用者阅读推理过程与复核结论。本插件通过在每次请求的 system prompt 中注入一条精简的强制语言指令，使: 思考过程强制简体中文，无论用户用什么语言提问。 |
| [dsh-anchored-standard](https://github.com/Jungod1121/dsh-anchored-standard) | 21 | ⚪ unknown | Two-phase DeepSeek Harness preset: Minimal-aligned bootstrap (bash+read), then full Standard tools after the first tool call or r… |
| [dsh-pentest](https://github.com/howmp/dsh-pentest) | 238 | 🟢 ok | 面向 DeepSeek Harness（dsh）的渗透测试模式 @CloverSecLabs |
| [dsh-md-notes](https://github.com/XieZongChen/dsh-md-notes) | 13 | 🟢 ok | The note-taking plugin for DeepSeek Harness allows you to save and edit content from your conversations that you want to record. |
| [dsh-claude-ux](https://github.com/eri64/dsh-claude-ux) | 64 | 🟢 ok | DSH plugin: Claude-style Chinese risk control & conversation autonomy for DeepSeek Harness web |
| [dsh-pref-kit](https://github.com/gameswu/dsh-pref-kit) | 4 | ⚪ unknown | 缓解部分dsh性能问题的插件 |
| [dsh-explorer](https://github.com/No-PRM/dsh-explorer) | 8 | ⚪ unknown | DSH plugin: VS Code-style file-tree explorer (git decorations, preview, diff, drag-to-reference); install via dsh plugin --profil… |
| [amadeus-for-dsh](https://github.com/yyxcnasd/amadeus-for-dsh) | 18 | ⚪ unknown | Amadeus (AI assistant from Steins;Gate 0) for DeepSeek Harness |
| [dsh-coding-companion](https://github.com/FxRayHughes/dsh-coding-companion) | 3 | ⚪ unknown | 编程陪伴 · deepseek-harness Node-host 插件：AI 工作时弹独立窗口播放，等待时挂起进程冻结播放，多站点持久化，仅 Windows |
| [lx_music-for-dsh](https://github.com/CyberryRe/lx_music-for-dsh) | 3 | ⚪ unknown | This is a plugin that allows deepseek harness own the ability of lx music. |
| [DSH-arena](https://github.com/Apageoflove/DSH-arena) | 3 | ⚪ unknown | Local-first experiment and evaluation workbench plugin for DeepSeek Harness (DSH). |
| [deepseek-peak](https://github.com/YMRYMR/deepseek-peak) | 15 | ⚪ unknown | Live DeepSeek V4 API peak/off-peak status widget — drop-in dsh-plugin for deepseek-ai/deepseek-harness, plus a standalone browser… |
| [dsh-voice-input-plugin](https://github.com/Zhangbo-cn/dsh-voice-input-plugin) | 6 | ⚪ unknown | Composer mic for DeepSeek Harness Web: tap-to-monitor live transcription and hold-to-talk, with host Edge TTS reply reading that… |
| [dsh-better-markdown](https://github.com/zerob13/dsh-better-markdown) | 19 | 🟢 ok | DeepSeek Harness Web plugin powered by markstream-react for resilient streaming Markdown, Mermaid diagrams, KaTeX math, and safe… |
| [deepseek-harness-android-app](https://github.com/Jensen-Yao/deepseek-harness-android-app) | 13 | ⚪ unknown | DeepSeek Harness 安卓通用控制端：Termux 引导、一键部署、内置浏览器与存储管理（dsh-plugin 生态） |
| [deepseek-harness-auth](https://github.com/taichuy/deepseek-harness-auth) | 19 | 🟢 ok | DeepSeek Harness auth插件 |
| [dsh-composer-expand](https://github.com/13071301808/dsh-composer-expand) | 5 | 🟢 ok | Composer expand/collapse toggle for DeepSeek Harness (dsh): a ⬆/⬇ button in the composer tool row grows the input to a tall 70vh… |
| [deepseek-harness-Install](https://github.com/yu-wenchao/deepseek-harness-Install) | 6 | ⚪ unknown | deepseek harness 一键安装，双击deepseekharnesssetup.exe就可以一键安装，适合小白！ |
| [dsh-plugin-subhub](https://github.com/kinoward/dsh-plugin-subhub) | 4 | ⚪ unknown | Bring third-party subscription accounts into DeepSeek Harness - 为 DeepSeek Harness 接入第三方订阅账户(当前支持 OpenAI / ChatGPT 订阅,更多订阅服务规划中) |
| [dsh-ikun-pet](https://github.com/eric-song-dev/dsh-ikun-pet) | 9 | 🟢 ok | DeepSeek Harness（DSH）永久插件：Deep diving 回答期间用坤宠动图填满深潜状态行下方区块——进度条 0%→100%，每 20% 切换动作与文案，完成时系统级播放「你干嘛~哎哟」 |
| [dsh-plugin-smooth-stream](https://github.com/SpookySandwich/dsh-plugin-smooth-stream) | 9 | 🟢 ok | Better streaming text animation for DeepSeek Harness 给DSH加入更好文字动画 |
| [dsh-plugin-integration](https://github.com/MutaLucem/dsh-plugin-integration) | 11 | ⚪ unknown | DeepSeek Harness (DSH) 插件整合中心：动态发现、打标分类、重叠/兼容检测、一键启停与失效检测 |
| [helm-d](https://github.com/ADWMC/helm-d) | 19 | ⚪ unknown | DeepSeek Harness 破甲一体化安全分析插件：Android · Web · Native · Protocol · Malware · AI-Security 全领域聚合（9 bundle + 1 preset） |
| [dsh-mcp-manager](https://github.com/Js2Hou/dsh-mcp-manager) | 11 | 🔴 broken (failed once, retried — install failed (exit 1):     at runPlugin (file:///home/runner/.npm/_npx/1e7f6d9597241db0/node_modules/@deepseek-ai/dsh/lib/plugin-9h8shc) | 用于 DeepSeek Harness 的 MCP 可视化管理插件：在「设置 → MCP」中查看已安装/启用的 MCP 服务器，支持增删、启用/停用，并实时查看连接状态。 |
| [dsh-vault](https://github.com/feiyang-dev/dsh-vault) | 3 | 🟢 ok | DeepSeek Harness 数据保险箱插件（dsh-vault）—— 自动备份、清空检测、一键恢复，保护聊天记录与工作区数据；可经桌面端一键安装或命令行 dsh plugin add 安装。 |
| [dsh-plugin-codex](https://github.com/wss534857356/dsh-plugin-codex) | 4 | 🟢 ok | Codex App Server model provider for DeepSeek Harness using your local Codex login. |
| [dsh-voice-ai-girlfriend](https://github.com/beiyege-01/dsh-voice-ai-girlfriend) | 32 | ⚪ unknown | 语音 AI 女友（Voice AI girlfriend for DeepSeek Harness）：Whisper 语音输入 + Qwen3-TTS 声音克隆 + 句子级流式朗读 + 数字人动画窗。插话/排队双模式，说话即打断。 |
| [dsh-tool-autoexpand](https://github.com/better-er/dsh-tool-autoexpand) | 8 | ⚪ unknown | dsh·工具结果自动展开插件 |
| [dsh-conversation-outline](https://github.com/lzbaclz/dsh-conversation-outline) | 7 | 🟢 ok | Codex-style conversation outline for DeepSeek Harness Web: a right-edge rail with hover preview and click-to-jump |
| [deepseek-aix](https://github.com/PHoenixs57/deepseek-aix) | 5 | ⚪ unknown | Q-Q: 面向学术文献的对话式 AI 研究助手。支持多源搜索（PubMed、arXiv、Semantic Sc​​holar、Crossref）、论文卡片去重及带文件夹功能的收藏夹——基于 DeepSeek Harness 构建。 |
| [dsh-filescope](https://github.com/KunIsMe/dsh-filescope) | 5 | ⚪ unknown | FileScope · 文件视界 — DeepSeek Harness 工作区文件浏览器插件（右侧抽屉 + 实时预览） |
| [dsh-page-preview](https://github.com/watericetangcw/dsh-page-preview) | 6 | ⚪ unknown | A Cordis plugin that enables DeepSeek Harness to proactively preview and display web pages. |
| [dsh-tavily](https://github.com/SZMY-haruhi/dsh-tavily) | 4 | 🟢 ok | 为 DSH 新增 Tavily 搜索 API，作为其网页搜索服务提供商。Adds Tavily Search API as a web search provider for DSH. |
| [dsh-plugin-vetting](https://github.com/truelove-dreamer/dsh-plugin-vetting) | 4 | ⚪ unknown | DeepSeek Harness plugin: heuristic malware vetting for installed third-party plugins |
| [dsh-animation-optimization](https://github.com/kelemiao/dsh-animation-optimization) | 7 | 🟢 ok | DSH 动画优化：输出流式动画与 Claude Code 风格外观插件 |
| [dsh-codex-shim](https://github.com/OpenTritium/dsh-codex-shim) | 4 | ⚪ unknown | 让 GPT 在 DSH 中宾至如归 Make GPT feel at home in DSH. |
| [dsh-btw](https://github.com/loster12520/dsh-btw) | 5 | 🟢 ok | deepseek harness版btw插件 |
| [my_better-dsh](https://github.com/lilwhich/my_better-dsh) | 10 | ⚪ unknown | for better dsh |
| [dsh-deliberation-presets](https://github.com/Greenhand-monster/dsh-deliberation-presets) | 7 | ⚪ unknown | Keep DeepSeek V4 Pro deliberating deeply while its tools keep working — three DSH presets: wire-level A4 think/execute split, ete… |
| [dsh-oomol](https://github.com/oomol-lab/dsh-oomol) | 11 | 🟢 ok | OOMOL Connector for DeepSeek Harness—discover connected apps and execute Actions through progressive MCP discovery without exposi… |
| [dsh-plugin-directory](https://github.com/alexchenzl/dsh-plugin-directory) | 21 | ⚪ unknown | Community DeekSeek Harness Plugin Directory |
| [dsh-trading](https://github.com/maddogfinance/dsh-trading) | 18 | ⚪ unknown | Trading research workbench for DeepSeek Harness (dsh): typed market-data seam, deterministic indicators, interactive chart cards,… |
| [dsh-rust-sdk](https://github.com/42ch-dev/dsh-rust-sdk) | 6 | ⚪ unknown | Rust SDK for DSH(Deepseek Harness) |
| [dsh-hub-DSH](https://github.com/ARFCON/dsh-hub-DSH) | 4 | ⚪ unknown | dsh-hub — DSH 插件中枢 |
| [deepseek-harness-provider](https://github.com/lo2589/deepseek-harness-provider) | 5 | ⚪ unknown | use glm/minimax/openai/claude api in your deepseek harness |
| [dsh-ai4scholar](https://github.com/literaf/dsh-ai4scholar) | 11 | 🟢 ok | AI4Scholar for DeepSeek Harness (dsh): 38 native academic tools — Semantic Scholar, PubMed, Google Scholar, arXiv, bioRxiv/medRxi… |
| [webdsh](https://github.com/futrime/webdsh) | 20 | ⚪ unknown | Running DeepSeek Harness on web |
| [dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 178 | 🔴 broken (failed once, retried — install blocked by pnpm build-script policy (allowBuilds) — plugin likely OK, CI policy blocks git prepare scripts) | 一个插件让你的dsh可以自由切换你的wallpaper engine里面的壁纸资源，还可以通过多个滑动条来控制透壁纸的模糊程度，亮度，边框，以及对话框的液态玻璃效果，让你的dsh更加美观 |
| [deepseek-harness-sdr-plugin](https://github.com/Xuxchloris/deepseek-harness-sdr-plugin) | 24 | ⚪ unknown | DeepSeek Harness 的 SDR 数字员工插件：九阶段外贸获客 SOP、结构性人工审批、客户去重、持久化知识检索与审计日志，默认 dry-run 安全演示。 |
| [dsh-plugin-gather](https://github.com/lilwhich/dsh-plugin-gather) | 10 | ⚪ unknown | for better dsh |
| [dsh-meme](https://github.com/yyh-001/dsh-meme) | 54 | ⚪ unknown | DeepSeek Harness 的表情包插件——找得到、发得出、学得会 |
| [oss-prompt-optimizer](https://github.com/seven282/oss-prompt-optimizer) | 7 | 🟢 ok | 用于优化 DeepSeek harness提示词优化器，提升 AI 输出质量 |
| [DSH-Encrypt](https://github.com/yauntyour/DSH-Encrypt) | 7 | ⚪ unknown | DeepSeek Harness 凭证加密插件，通过设置密码使用AES-256-GCM+SHA3-256实现的全流程加密+校验，运行时临时解密，内存安全。 |
| [dsh-grafana](https://github.com/guhanfei-ai/dsh-grafana) | 7 | ⚪ unknown | Paste a Grafana dashboard URL and fine-tune it through conversation with DeepSeek Harness — 贴大盘 URL，对话微调，写回 Grafana 调试可视化 |
| [Caushell](https://github.com/fatmo666/Caushell) | 5 | ⚪ unknown | Compiler-style pre-execution safety analysis for Harness shell actions. |
| [dsh-univer-office](https://github.com/dream-num/dsh-univer-office) | 106 | 🟢 ok | Preview Univer sheets, docs & slides inside DeepSeek Harness. |
| [dsh-wallpaper-rotator](https://github.com/liceses/dsh-wallpaper-rotator) | 6 | ⚪ unknown | DSH 壁纸轮换插件：定时轮换应用背景壁纸（交叉淡化动效）、内置壁纸集、毛玻璃/压暗/文字阴影可读性调节。dsh plugin add 一键安装。 |
| [DSH-money-view](https://github.com/tyche66/DSH-money-view) | 5 | ⚪ unknown | DeepSeek Harness 社区插件：在侧栏实时显示 API 余额、每日基准与剩余进度，按官方缓存节奏智能查询，密钥不进前端。 |
| [dsh-selection-ask](https://github.com/lzbaclz/dsh-selection-ask) | 6 | ⚪ unknown | ChatGPT-style select→ask for DeepSeek Harness Web: select text in a conversation, a floating 「询问 DeepSeek」 button appears — click… |
| [dsh-trail](https://github.com/ayahunter/dsh-trail) | 6 | ⚪ unknown | DeepSeek Harness Web 轨迹页签的新手友好视图插件（out-of-tree bundle）：把事件流变成人人能看懂的故事线 |
| [dsh-plugins](https://github.com/Ephemeral-AI-Lab/dsh-plugins) | 47 | ⚪ unknown | Make Deepseek Harness Great |
| [rapid-mlx-dsh-provider](https://github.com/raullenchai/rapid-mlx-dsh-provider) | 21 | ⚪ unknown | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| [dsh-taskboard](https://github.com/cloader/dsh-taskboard) | 19 | ⚪ unknown | deepseekharness 任务看板插件 |
| [dsh-omi-voice](https://github.com/PolinniZhong/dsh-omi-voice) | 44 | ⚪ unknown | DeepSeek Harness 语音朗读插件：沉浸式听朗读，用豆包 TTS 自然音色读 AI 回复（BYOK · 点读/暂停/继续） |
| [forgeax-dsh-game-plugin](https://github.com/ForgeaX-Games/forgeax-dsh-game-plugin) | 6 | ⚪ unknown | DeepSeek Harness (DSH) bundle plugin for ForgeaX game dev — @forgeax/dsh-game |
| [dsh-redteam-model](https://github.com/SeaOf0/dsh-redteam-model) | 12 | ⚪ unknown | 基于dsh web实现的多种模式，目的是服务于redteam进行授权的安全研究，覆盖渗透测试、红队评估、代码审计等范围领域，请勿用于非法行为。（允许二开，赋予模块各位自己的业务逻辑，不定期完善逻辑与修复bug） |
| [dsh-effort-slider](https://github.com/2768651338/dsh-effort-slider) | 12 | ⚪ unknown | 仿 Claude Code 推理等级滑块 DSH 插件 |
| [dsh-xiaotangyuan-game](https://github.com/qimidandapigu/dsh-xiaotangyuan-game) | 9 | ⚪ unknown | 单机游戏内 AI 同伴「小汤圆」｜DeepSeek Harness |
| [deepseek-harness-quota-monitor](https://github.com/marisa-4219/deepseek-harness-quota-monitor) | 5 | ⚪ unknown | DeepSeek Harness 多供应商额度监控插件：余额型 API 查询 + 限额型本地用量计量，侧边栏实时卡片 + 可视化配置。 |
| [dsh-ears](https://github.com/WizisCool/dsh-ears) | 9 | 🟢 ok | Voice input plugin for DeepSeek Harness (dsh): Supports voice input plugins with polishing and multiple backends. |
| [dsh-oil-creator](https://github.com/oil-oil/dsh-oil-creator) | 140 | ⚪ unknown | AI-assisted local creator workbench for DeepSeek Harness |
| [dsh-serial-console](https://github.com/InfinitePersistence/dsh-serial-console) | 6 | ⚪ unknown | Unofficial DeepSeek Harness plugin for board serial console, logging, and model-visible interaction. |
| [ramify-dsh](https://github.com/yanglongyun/ramify-dsh) | 11 | ⚪ unknown | Ramify 是 DeepSeek Harness 的创意分支画布插件，用树状工作区生成、对比和迭代多个可交互方案。 |
| [custom-first-control-prompt](https://github.com/WM-CODER/custom-first-control-prompt) | 29 | ⚪ unknown | DeepSeek Harness plugin for insert custom prompt |
| [dsh-firecrawl](https://github.com/firecrawl/dsh-firecrawl) | 9 | 🟢 ok | Firecrawl-backed web_search and web_fetch providers for the DeepSeek Harness web capability seam (ctx.web) |
| [dsh-trapstreet](https://github.com/trapstreet/dsh-trapstreet) | 1 | 🟢 ok | Shows which of your plugins actually loaded (reads the loader tree in-process) and scores your running config on a public evaluat… |
| [garmin-connect-plugin-for-dsh](https://github.com/Likenttt/garmin-connect-plugin-for-dsh) | 10 | ⚪ unknown | DeepSeek Harness plugin for Garmin Connect — AI-powered fitness data access |
| [wallpaper-plugin](https://github.com/Ayase34/wallpaper-plugin) | 7 | ⚪ unknown | DeepSeek Harness的壁纸管理插件 |
| [dsh-tether](https://github.com/zexadev/dsh-tether) | 22 | ⚪ unknown | Reach the DeepSeek Harness on your dev machine from your phone — across networks, through no server at all (iroh P2P) |
| [dsh-personal-center](https://github.com/PolinniZhong/dsh-personal-center) | 22 | ⚪ unknown | DeepSeek Harness 个人中心:用量统计 / 自定义指令 / 成本估算 / 桌面宠物(纯本地，不联网）。 Personal center & custom instructions for DSH |
| [dsh-server-login](https://github.com/pointer-a/dsh-server-login) | 8 | ⚪ unknown | 面向公网的多租户 DSH 托管平台 —— 部署到一台公网服务器后，多个用户注册并经管理员审核，各自获得一套相互隔离的 deepseek-harness（DSH）环境，随时通过域名安全访问。 |
| [dsh-plugin-pack-web](https://github.com/baihejiangnan/dsh-plugin-pack-web) | 7 | ⚪ unknown | DeepSeek Harness 插件包 · Profile/Web 一键复刻 | DSH Plugin Pack |
| [dsh-network-settings](https://github.com/kanneiren/dsh-network-settings) | 22 | ⚪ unknown | DSH Network Settings: Windows / WSL network path diagnostics and safe repair for DeepSeek Harness. |
| [dsh-tabbit](https://github.com/Tabbit-Browser/dsh-tabbit) | 96 | 🟢 ok | Tabbit Broser plugins for Deepseek Harness |
| [dsh-ros2](https://github.com/StvLi/dsh-ros2) | 7 | ⚪ unknown | The Deepseek Harness ROS 2 plugin can be used to efficiently diagnose issues and perform joint debugging. |
| [DeepSeek-Harness-Browser](https://github.com/tonyd2wild/DeepSeek-Harness-Browser) | 13 | ⚪ unknown | An in-app browser pane for DeepSeek Harness — real Chrome over CDP, plus rendered previews of local files, markdown and PDFs. |
| [stent](https://github.com/omdsh-dev/stent) | 18 | ⚪ unknown | 灵感来源于MC Fabric的Cordis/DSH hook处理器 |
| [dsh-plugin-collection](https://github.com/daha1216/dsh-plugin-collection) | 10 | ⚪ unknown | A collection of plugins for DeepSeek Harness (DSH) |
| [dsh-one-gateway](https://github.com/TiantianFlow/dsh-one-gateway) | 12 | ⚪ unknown | Private DSH One Gateway — loopback, identity-first ingress for DeepSeek Harness |
| [dsh-secure-audit](https://github.com/PensiveFei/dsh-secure-audit) | 24 | ⚪ unknown | Read-only security & compliance plugin for DeepSeek Harness: prompt-injection detection, Chinese-PII redaction, and local configu… |
| [Invoice-Downloader](https://github.com/EthanYoQ/Invoice-Downloader) | 134 | ⚪ unknown | 电子发票整理与报销准备工具：从邮箱批量收集 PDF/OFD/XML 发票，OCR 识别、分类归档并生成 Excel 汇总；提供 Windows/macOS 桌面版与 DSH 插件。 |
| [dsh-hotplug-hub](https://github.com/ARFCON/dsh-hotplug-hub) | 25 | ⚪ unknown | DSH - Dseam |
| [dsh-wenshan](https://github.com/xuedai-mayi/dsh-wenshan) | 19 | ⚪ unknown | 问山：DeepSeek Harness 地理野外实习知识图谱插件与非官方二次开发项目 |
| [dsh-portable](https://github.com/sqs404/dsh-portable) | 8 | ⚪ unknown | DeepSeek Harness 免安装便携版（Windows）：官方 npm 包 + 内置 Node.js，双击 exe 即用，拷贝到任意 64 位 Windows 电脑独立运行 |
| [dsh-obsidian](https://github.com/mingzeng21/dsh-obsidian) | 8 | ⚪ unknown | Connect DeepSeek Harness (dsh) to a local Obsidian vault: search, read, write, move, and trash notes. |
| [dsh-ssh-ops](https://github.com/caoyiwei850/dsh-ssh-ops) | 7 | ⚪ unknown | DeepSeek Harness SSH 运维插件：主对话驱动 SSH，带高危命令保护与右侧终端。 |
| [dsh-nuke-plugin](https://github.com/beijingwahw/dsh-nuke-plugin) | 0 | ⚪ unknown | Transactional uninstall engine for DSH plugins: policy tiers, batch atomic ops, fingerprint snapshot, health check, concurrency l… |
| [dsh-preset-plus](https://github.com/Rain-kl/dsh-preset-plus) | 14 | ⚪ unknown | DSH 预设增强插件, 参考 SillyTavern 预设模功能开发的一个基础的预设编辑器。 |

### 🧩 Skills

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-plugin-skills](https://github.com/omdsh-dev/dsh-plugin-skills) | 12 | ⚪ unknown | Agent skills for building & testing DSH plugins. |
| [dsh-plugin-codex-bridge](https://github.com/YYTbit/dsh-plugin-codex-bridge) | 2 | 🟢 ok | Bridge codex skills and config into DeepSeek Harness |
| [dsh-plugin-opencode-bridge](https://github.com/YYTbit/dsh-plugin-opencode-bridge) | 4 | ⚪ unknown | Bridge opencode skills and config into DeepSeek Harness |
| [dsh-plugin-pi-bridge](https://github.com/YYTbit/dsh-plugin-pi-bridge) | 2 | 🟢 ok | Bridge pi skills and config into DeepSeek Harness |
| [dsh-plugins-raincode](https://github.com/rainforest888/dsh-plugins-raincode) | 3 | 🟢 ok | dsh plugin: DeepSeek Harness 的模型层 = raincode(模型池/缓存/重试) + /skills 浏览 |
| [dsh-skill-manager](https://github.com/bitterSmilezzz/dsh-skill-manager) | 1 | 🟢 ok | Skills management page for DeepSeek Harness Web Settings (dsh plugin) |
| [dsh-plugin-auto-docs](https://github.com/YYTbit/dsh-plugin-auto-docs) | 1 | 🟢 ok | Auto documentation generation skill for DeepSeek Harness |
| [dsh-plugin-code-review](https://github.com/YYTbit/dsh-plugin-code-review) | 1 | ⚪ unknown | Structured code review skill for DeepSeek Harness |
| [dsh-find-skill](https://github.com/Moximxxx/dsh-find-skill) | 3 | 🟢 ok | dsh plugin bridging the vercel-labs/skills ecosystem: LLM-driven skill search, install, and lifecycle for temp/project/global sco… |
| [spike-faye-lei-dsh-skills](https://github.com/spike-faye-lei/spike-faye-lei-dsh-skills) | 1 | ⚪ unknown | spike-faye-lei/dsh-skills |
| [dsh-academic-skill](https://github.com/TohsakaRIN521/dsh-academic-skill) | 2 | ⚪ unknown | dsh-academic-skill — DSH plugin (skills) |
| [dsh-seismicx](https://github.com/MOLAaaaaaaa/dsh-seismicx) | 2 | ⚪ unknown | DeepSeek Harness plugin for the SeismicX earthquake-catalog skill |
| [rpg-maker-mac-skill](https://github.com/HomophonicFate/rpg-maker-mac-skill) | 0 | ⚪ unknown | DeepSeek Harness skill：macOS 上运行 RPG Maker MV/MZ 游戏并集成 MTool 翻译文件 |
| [dsh-skill-manager](https://github.com/JimmyJin2006/dsh-skill-manager) | 0 | 🟢 ok | dsh-skill-manager — DSH plugin (skills) |
| [dsh-plugin-longgraph](https://github.com/levi-qiao/dsh-plugin-longgraph) | 5 | ⚪ unknown | DeepSeek Harness community plugin: longgraph / loop-graph / loop-converge authoring skills on ctx.skills |
| [superpowers-dsh](https://github.com/LayneChai/superpowers-dsh) | 88 | 🟢 ok | Superpowers skills for DeepSeek Harness: TDD, debugging, planning, and collaboration skills adapted from obra/superpowers |
| [dsh-skill-viewer](https://github.com/Fishquito7/dsh-skill-viewer) | 101 | 🔴 broken (dump-config exit=0 but plugin not found in composed tree) | DSH Web UI plugin: Skills settings section with hot enable/disable, delete and add |
| [dsh-PaddleOCR-Skills](https://github.com/Aidenwu0209/dsh-PaddleOCR-Skills) | 4 | ⚪ unknown | PaddleOCR skills for DeepSeek Harness with native tools and GUI configuration |
| [dsh-capability-receipt](https://github.com/dongsheng123132/dsh-capability-receipt) | 4 | ⚪ unknown | Content-addressed receipts for skills actually loaded by DeepSeek Harness |
| [dsh-Unlimited-OCR-Skill](https://github.com/Aidenwu0209/dsh-Unlimited-OCR-Skill) | 1 | ⚪ unknown | Unlimited-OCR for DeepSeek Harness with a native tool and GUI configuration |
| [DeepSeek-Harness-Skill](https://github.com/itmoqing/DeepSeek-Harness-Skill) | 6 | ⚪ unknown | 这是一个Codex/Claude来进行任务发布给DeepSeek Harness干活的工作流的Skill，能实现并发，多个工作区一起执行 |
| [dsh-plugin-rdk](https://github.com/D-Robotics/dsh-plugin-rdk) | 1 | ⚪ unknown | D-Robotics RDK (地瓜机器人) integration for DeepSeek Harness — native RDK skill catalog, rdk_skills browser tool, and rdk_board_detect… |
| [dsh-reverse-skill](https://github.com/dhicoc/dsh-reverse-skill) | 74 | ⚪ unknown | Complete reverse-skill (85 SKILL.md) as a DeepSeek Harness (dsh) Cordis plugin — reverse engineering, authorized pentesting and s… |
| [dsh-skill-manager](https://github.com/Lanxing6480/dsh-skill-manager) | 3 | 🟢 ok | Deepseek Harness 的Skill管理插件 |
| [dsh-skills-manager](https://github.com/xiaoxianyu-office/dsh-skills-manager) | 4 | 🟢 ok | DSH Skills 管理器：设置页系统/用户技能分类，用户技能开关/编辑/删除/新建。Skills manager for DeepSeek Harness: system/user skill management (toggle/edit/delete… |
| [dsh-skill-remote](https://github.com/CSY656/dsh-skill-remote) | 1 | ⚪ unknown | Remote skills.sh/GitHub skill provider and installer for DeepSeek Harness — install any skill with one prompt. |
| [dsh-youmind-plugin](https://github.com/seamas0825-lab/dsh-youmind-plugin) | 4 | ⚪ unknown | YouMind OpenAPI tools and skill bundle for DeepSeek Harness |
| [dsh-mattpocock-skills](https://github.com/xiaoxiaosrm/dsh-mattpocock-skills) | 5 | ⚪ unknown | Unofficial DSH port of mattpocock/skills — Engineering (18) + Productivity (7) skills as a DeepSeek Harness bundle plugin. MIT, ©… |
| [dsh-skills-mcp-manager](https://github.com/zebbkira/dsh-skills-mcp-manager) | 16 | ⚪ unknown | 面向 DeepSeek Harness Web GUI 的正式插件包：在设置页的「Web UI 插件」分组中新增一张「技能与 MCP」卡片，用于在浏览器里管理技能（skills）与 MCP 服务器。 |
| [iterate-plugin](https://github.com/jingzhao-l/iterate-plugin) | 2 | 🟢 ok | DeepSeek Harness (dsh) 插件：把 iterate 技能落成自治闭环代码迭代 — 多轮并行审查、确定性去重收敛、原子修复+验证自停、meta-review 一致性审计、dry-run 只读审查。由 iterate-skill 主仓库统一维… |
| [dsh-design-skills](https://github.com/zhaiyateng/dsh-design-skills) | 18 | ⚪ unknown | Design aesthetics skill pack for DeepSeek Harness (DSH) - keeps vibe-coded websites away from the AI look. 6 styles: dark-saas, a… |
| [dsh-plugin-cas-kb](https://github.com/niuniu-869/dsh-plugin-cas-kb) | 2 | ⚪ unknown | DeepSeek Harness bundle: article-level Chinese accounting standards (CAS / ASSE) and tax law lookup, plus a skill that keeps cita… |
| [dsh-hyperframes](https://github.com/STARDUSTLC666/dsh-hyperframes) | 4 | ⚪ unknown | DSH 视频创作技能插件：注册 HyperFrames by HeyGen 官方移植技能五件套（HTML 写视频/CLI/注册表/网址转视频/GSAP），安装即用。· HyperFrames skill plugin for DeepSeek Harness. |
| [dsh-hud](https://github.com/a903067276-rgb/dsh-hud) | 9 | 🟢 ok | HUD status panel plugin for DeepSeek Harness (dsh) web: git status, MCP servers, skills, model & token usage in a floating panel |
| [dsh-SkillsManagePlugins](https://github.com/z-col/dsh-SkillsManagePlugins) | 3 | ⚪ unknown | DSH Skills 可视化管理器：在 DSH Web 界面可视化查看、编辑、创建、删除 Skills（用户级 ~/.dsh/skills 与项目级 .dsh/skills） |
| [dsh-plugin-manager](https://github.com/liqichen/dsh-plugin-manager) | 11 | 🟢 ok | DSH 插件管理器:在 DeepSeek Harness 设置面板内嵌 GUI,管理 MCP 服务 / Skills / 内置插件包,改动热生效无需重启 |
| [dsh-skills-manager](https://github.com/MichengAI/dsh-skills-manager) | 19 | 🟢 ok | DSH Skills Manager 基于 DeepSeek Harness 的Skills管理插件 |
| [riffkit-dsh-plugin](https://github.com/riffkit/dsh-plugin) | 1 | 🟢 ok | Riff winning short videos — give one source (a TikTok link, an uploaded video, or an analyzed template) and the backend riffs its… |
| [dsh-movein](https://github.com/sjh9714/dsh-movein) | 8 | ⚪ unknown | Move your whole Claude Code setup into DeepSeek Harness (DSH) with one command. Skills, MCP, hooks, instructions. 从 Claude Code 拎… |
| [dsh_plugin_swift_cycle](https://github.com/Solismuchengxue/dsh_plugin_swift_cycle) | 15 | ⚪ unknown | Swift Cycle governance skill adapter for DeepSeek Harness; user-invoked, version-pinned, and offline-verifiable. |
| [cleverer-dsh](https://github.com/Classicoke/cleverer-dsh) | 10 | ⚪ unknown | DSH execution-discipline plugin suite: 11 plugins + 6 skills, zero dependencies, 426 tests. 让 DeepSeek Harness 变聪明的插件套件。 |
| [dsh-skill-picker](https://github.com/a735624258/dsh-skill-picker) | 24 | 🟢 ok | DSH 实现 workbuddy 同款选择 skill 功能 | WorkBuddy-style skill picker for DeepSeek Harness: pick a skill in the composer, insert the offi… |
| [weshop-dsh-plugin](https://github.com/weshopai/weshop-dsh-plugin) | 12 | 🟢 ok | Native WeShop Cordis plugin for DeepSeek Harness. Allow you to use infinite canvas with infinite creative skills. |
| [dsh-remotion](https://github.com/STARDUSTLC666/dsh-remotion) | 5 | ⚪ unknown | DSH 视频创作技能插件：注册 Remotion 官方移植技能（React 编程式视频，38 个规则文件），安装即用。· Remotion skill plugin for DeepSeek Harness. |
| [SpecFusion](https://github.com/wxkingstar/SpecFusion) | 55 | ⚪ unknown | 在 DeepSeek Harness / Claude Code / Cursor / Codex / Gemini CLI 里直接搜索 20 个中国开放平台的 65,600+ 篇 API 文档；零配置，支持 Skill 与 DSH 原生插件。 |
| [Jnpz](https://github.com/pazz11/Jnpz) | 12 | ⚪ unknown | 改配置+重启才能加 MCP？DeepSeek Harness (DSH) 插件「技能配置」解决：设置页粘贴 JSON 即连 MCP 服务器、热加载免重启；上传 zip/.skill 自动识别 SKILL.md，创建/编辑/启停技能，即点即用 |
| [dsh-skill-manager](https://github.com/tuogusa/dsh-skill-manager) | 4 | ⚪ unknown | DeepSeek Harness 技能管理器（host + client 一体包） |
| [dsh-skill-mcp-panel](https://github.com/Fishquito7/dsh-skill-mcp-panel) | 101 | 🟢 ok | DSH Web UI plugin: Skills settings section with hot enable/disable, delete and add（Web界面的skill管理工具） |
| [minecraft-dev](https://github.com/sikadi233-hub/minecraft-dev) | 9 | 🟢 ok | Minecraft development plugin for DeepSeek Harness: skills & tools for Paper/Spigot plugins and Fabric/Forge/NeoForge mods, MC 1.7… |
| [dsh-skills-market](https://github.com/peiqi10086/dsh-skills-market) | 9 | ⚪ unknown | DSH（DeepSeek Harness）Skills 管理 + SkillHub 商城插件：侧边栏面板管理本地 skills（用户级/工作区项目级/内置只读），搜索并一键安装 SkillHub 公开技能，附模型工具 dsh_skillhub_search。 |
| [dsh-skills](https://github.com/arch3rPro/dsh-skills) | 4 | 🟢 ok | Generalized development-specification skills distilled from DeepSeek Harness's engineering conventions — defensive patterns, code… |
| [dsh-withskillhub](https://github.com/lhwu1/dsh-withskillhub) | 5 | ⚪ unknown | 携手skillhub，快捷安装启用丰富的skill，一键装配方便快捷。 |
| [dshscan](https://github.com/shaoshi20/dshscan) | 8 | ⚪ unknown | DShScan - DSH plugin security scanner inspired by NVIDIA SkillSpector |
| [new-litigation-visualization](https://github.com/MiaoQichuan/new-litigation-visualization) | 40 | ⚪ unknown | 把法律画出来 · Make the Law Visible —— 给法律人的诉讼可视化工具集：把凌乱的诉讼图重画成能进材料的图，或直接读案件材料画准一张时间轴。Claude Skill / DeepSeek Harness 通用。 |
| [oh-story-dsh](https://github.com/worldwonderer/oh-story-dsh) | 171 | ⚪ unknown | A DSH plugin for novel writing and short-drama production, powered by Oh Story and Drama Skills. |
| [dsh-codex-sync](https://github.com/Walvez/dsh-codex-sync) | 22 | ⚪ unknown | The ultimate 2-way bridge between OpenAI Codex and DSH: bidirectional chat sync, live Skills mount & auto MCP mirroring. |
| [dsh-run2skill](https://github.com/qkycir-123/dsh-run2skill) | 10 | ⚪ unknown | DSH-native, local-first Run-to-Skill plugin for DeepSeek Harness |
| [dsh-mattpocock-skills-deck](https://github.com/FeatherHunter/dsh-mattpocock-skills-deck) | 13 | ⚪ unknown | 拨开迷雾看见终点，剩下的交给任务栏。Part the fog, see the end — the task bar handles the rest. 🎮 mattpocock/skills 的 DSH 游戏任务系统：map 拨迷雾，任务栏推进一步。A… |
| [oh-story-dsh](https://github.com/zenstory-ai/oh-story-dsh) | 171 | ⚪ unknown | A DSH plugin for novel writing and short-drama production, powered by Oh Story and Drama Skills. |

### 🎨 UI

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | 5909 | 🟢 ok | DSH Web UI plugin & skin collection: task board, git panel, etc. |
| [DSH-better-sidebar](https://github.com/omdsh-dev/DSH-better-sidebar) | 2813 | 🟢 ok | Sidebar workbench: file render/terminal/git/subagent |
| [ui-status-label](https://github.com/alingalingling/ui-status-label) | 40 | 🔴 broken (failed once, retried — install blocked by pnpm build-script policy (allowBuilds) — plugin likely OK, CI policy blocks git prepare scripts) | Customize the whale-girl thinking-status label |
| [dsh-deep-whale](https://github.com/Small-tailqwq/dsh-deep-whale) | 1674 | ⚪ unknown | DSH Web whale-girl skin series |
| [dsh-focus-chat](https://github.com/dingyi222666/dsh-focus-chat) | 22 | 🟢 ok | Focused-chat minimal session view |
| [dsh-side-panel](https://github.com/ccq1/dsh-side-panel) | 16 | 🟢 ok | DSH side panel: file browser, terminal, git review |
| [dsh-ui-progress](https://github.com/lhh010/dsh-ui-progress) | 8 | ⚪ unknown | Session progress bar: todos progress + live token rate |
| [dsh-ui-whale](https://github.com/lhh010/dsh-ui-whale) | 30 | ⚪ unknown | Hand-drawn pixel whale companion |
| [dsh-annotation](https://github.com/omdsh-dev/dsh-annotation) | 95 | 🟢 ok | Selection annotation: select→annotate→send |
| [dsh-chat-width](https://github.com/chen-001/dsh-chat-width) | 5 | ⚪ unknown | Adjust the width of dsh's reply |
| [dsh-companion](https://github.com/william-jin-cmu/dsh-companion) | 5 | ⚪ unknown | Resident desktop companion: global hotkey/automation/plugin market |
| [dsh-genui](https://github.com/omdsh-dev/dsh-genui) | 323 | 🟢 ok | Inline interactive UI components in chat |
| [dsh-input-history](https://github.com/lhh010/dsh-input-history) | 4 | ⚪ unknown | Input history: Ctrl+Up/Down to recall sent messages |
| [dsh-navbar](https://github.com/vlln/dsh-navbar) | 59 | ⚪ unknown | Conversation node navbar |
| [dsh-paste-input](https://github.com/lhh010/dsh-paste-input) | 9 | ⚪ unknown | Paste/drag/drop file input enhancement |
| [dsh-plugin-background](https://github.com/gameswu/dsh-plugin-background) | 11 | ⚪ unknown | DSH wallpaper plugin |
| [tonghuashun-webui](https://github.com/renat3u/tonghuashun-webui) | 17 | ⚪ unknown | 仿同花顺的webui插件 |
| [dsh-deepcel](https://github.com/Small-tailqwq/dsh-deepcel) | 14 | ⚪ unknown | Excel-style DSH skin |
| [dsh-deeplink](https://github.com/qyw233/dsh-deeplink) | 4 | ⚪ unknown | Deep-link plugin: open session/workspace directly |
| [dsh-diff-viewer](https://github.com/lehhair/dsh-diff-viewer) | 24 | ⚪ unknown | PiUI-style diff viewer replacing the stock DiffBlock |
| [dsh-drag-and-drop](https://github.com/bill9109/dsh-drag-and-drop) | 22 | ⚪ unknown | Cross-platform file drag & drop with raw path insertion |
| [dsh-qq2006](https://github.com/LaplaceYoung/dsh-qq2006) | 23 | ⚪ unknown | QQ2006 skin plugin |
| [dsh-session-notification](https://github.com/dingyi222666/dsh-session-notification) | 15 | ⚪ unknown | Session completion + 4-state notifications |
| [dsh-spotlight](https://github.com/0xsline/dsh-spotlight) | 11 | ⚪ unknown | Keyboard-first command palette |
| [dsh-ths-skin](https://github.com/AdamPlatin123/dsh-ths-skin) | 3 | ⚪ unknown | THS terminal-style skin + K-line panel |
| [dsh-tps](https://github.com/Small-tailqwq/dsh-tps) | 1 | ⚪ unknown | TPS skin plugin |
| [dsh-ultra-ui](https://github.com/havingautism/dsh-ultra-ui) | 3 | ⚪ unknown | (no description) |
| [dsh-web-ui-notify](https://github.com/bill9109/dsh-web-ui-notify) | 22 | ⚪ unknown | Desktop notifications for DSH |
| [ex-setting](https://github.com/omdsh-dev/ex-setting) | 2 | ⚪ unknown | DSH settings extension |
| [whale-girl](https://github.com/vlln/whale-girl) | 280 | 🟢 ok | QQ-pet-style desktop pet plugin |
| [dsh-status-rotator](https://github.com/01Virex/dsh-status-rotator) | 52 | 🟢 ok | Web plugin replacing the DSH status display. |
| [dsh-ramify](https://github.com/yanglongyun/dsh-ramify) | 11 | ⚪ unknown | Creative branching canvas: tree workspaces for generation & compare. |
| [dsh-xiaohei](https://github.com/opensetk/dsh-xiaohei) | 5 | ⚪ unknown | Luo Xiaohei skin plugin for dsh. |
| [dsh-xiaoyao-skins](https://github.com/147228/dsh-xiaoyao-skins) | 24 | ⚪ unknown | DSH Web skin collection, installer & authoring toolchain. |
| [dsh-wikilink](https://github.com/zhaoscsc/dsh-wikilink) | 3 | ⚪ unknown | Obsidian-style [[wikilink]] mentions for the DeepSeek Harness web GUI: fuzzy-search note titles and attach their contents to the… |
| [deepseek-harness-skin](https://github.com/HeiGeAi/deepseek-harness-skin) | 51 | ⚪ unknown | deepseek-harness-skin — DSH plugin (ui) |
| [dsh-search-mcp](https://github.com/gxpppp/dsh-search-mcp) | 12 | ⚪ unknown | Replace dsh's built-in web search with search MCP servers (Tavily/Brave/Exa/Perplexity/DuckDuckGo/custom), configured from the we… |
| [dsh-kanban](https://github.com/Ericwong5021/dsh-kanban) | 3 | ⚪ unknown | Task board plugin for the DeepSeek Harness Web UI |
| [dsh-event-auditor](https://github.com/qing3a/dsh-event-auditor) | 1 | ⚪ unknown | dsh-event-auditor — DSH plugin (ui) |
| [dsh-web-search-tavily](https://github.com/crayonlu/dsh-web-search-tavily) | 3 | 🟢 ok | Tavily-backed web search provider for DeepSeek Harness (ctx.web) — no DeepSeek API key required |
| [dsh-pet](https://github.com/FlytoMAYDAY80/dsh-pet) | 13 | 🟢 ok | dsh-pet — DSH plugin (ui) |
| [dsh-miku-skin](https://github.com/stushansusu/dsh-miku-skin) | 2 | ⚪ unknown | dsh-miku-skin — DSH plugin (ui) |
| [dsh-ui-workbench](https://github.com/LoftyTao/dsh-ui-workbench) | 2 | ⚪ unknown | dsh-ui-workbench — DSH plugin (ui) |
| [dsh-fun-weather](https://github.com/omdsh-dev/dsh-fun-weather) | 3 | ⚪ unknown | DSH weather tab and weather-following themes powered by Open-Meteo |
| [dsh-test-runner](https://github.com/suimi8/dsh-test-runner) | 2 | ⚪ unknown | DSH plugin: structured test runner tool (test_run) — auto-detect vitest/jest/pytest/node:test, run tests, parse failure summaries… |
| [dsh-web-search-firecrawl](https://github.com/crayonlu/dsh-web-search-firecrawl) | 2 | ⚪ unknown | Firecrawl-backed web search provider for DeepSeek Harness (ctx.web) — no DeepSeek API key required |
| [dsh-web-background](https://github.com/BruceWu1126/dsh-web-background) | 2 | ⚪ unknown | DeepSeek Harness Web UI background customization plugin |
| [dsh-skins](https://github.com/Moeblack/dsh-skins) | 3 | 🟢 ok | Mirror of dsh-external/dsh-skins + feat: harbor (夕港) dusk-harbor skin |
| [dsh-portable-tavern](https://github.com/XCNXNXNX/dsh-portable-tavern) | 20 | 🟢 ok | dsh-portable-tavern — DSH plugin (ui) |
| [dsh-builtin-toggles](https://github.com/Starfie1d1272/dsh-builtin-toggles) | 7 | 🟢 ok | Safe GUI toggles for optional built-in plugins in DeepSeek Harness Web. |
| [dsh-science](https://github.com/omdsh-dev/dsh-science) | 8 | ⚪ unknown | Reproducible Python and R work on DeepSeek Harness, built as plugins. |
| [dsh-skin](https://github.com/KinGao294/dsh-skin) | 19 | 🟢 ok | Skin switcher + custom wallpaper for DeepSeek Harness (dsh): curated --dsw-alias-* palettes, translucent wallpaper with opacity/b… |
| [dsh-pomodoro](https://github.com/causebefore/dsh-pomodoro) | 3 | 🟢 ok | dsh-pomodoro — DSH plugin (ui) |
| [dsh-theme-neko](https://github.com/drfccv/dsh-theme-neko) | 4 | 🟢 ok | A Nachoneko (甘城猫猫) themed skin for the DeepSeek Harness web GUI. |
| [dsh-k12-lesson-builder](https://github.com/shyboy/dsh-k12-lesson-builder) | 2 | ⚪ unknown | DeepSeek Harness plugin for generating synchronized K12 English PPTX and DOCX lesson materials |
| [dsh-web-attention-badge](https://github.com/Luaphes/dsh-web-attention-badge) | 5 | 🟢 ok | Attention reminders for the DeepSeek Harness Web UI: frame badge, (N) tab title and whale-favicon recolor for sessions waiting fo… |
| [harness-whale](https://github.com/cakeni/harness-whale) | 5 | ⚪ unknown | Unofficial community pet for DeepSeek Harness — a native DSH web plugin |
| [dsh-conversation-indicator](https://github.com/smanx/dsh-conversation-indicator) | 3 | ⚪ unknown | Conversation indicator plugin for the DeepSeek Harness web GUI: a compact rail beside the scrollbar marks each user message; hove… |
| [dsh-black-whale](https://github.com/147228/dsh-black-whale) | 4 | ⚪ unknown | dsh-black-whale — DSH plugin (ui) |
| [dsh-plugins](https://github.com/Karuisawa-Mrs/dsh-plugins) | 1 | ⚪ unknown | Community plugins for DeepSeek Harness (DSH) |
| [dsh-client-ui-responsive](https://github.com/kelai141/dsh-client-ui-responsive) | 4 | ⚪ unknown | dsh-client-ui-responsive — DSH plugin (ui) |
| [dsh-ui-skins](https://github.com/edwardyang0011/dsh-ui-skins) | 2 | ⚪ unknown | DeepSeek Harness Skin Plugin |
| [nightwhale](https://github.com/nightwhale-dev/nightwhale) | 1 | ⚪ unknown | nightwhale — DSH plugin (ui) |
| [dsh-auto-continue](https://github.com/HsiangNianian/dsh-auto-continue) | 37 | ⚪ unknown | DSH Web UI plugin: automatically sends "继续" (continue) when a request is interrupted by network errors or other non-human causes |
| [dskin](https://github.com/dancingmemory/dskin) | 7 | ⚪ unknown | DSKIN · DeepSeek Harness（DSH）卡通像素皮肤插件 / Cartoon pixel skin plugin for DSH Web GUI — 原始界面不动，像素宠物会散步、眨眼、跳跃 / living pixel pets that… |
| [dsh-webui-auth](https://github.com/Yuuz12/dsh-webui-auth) | 8 | 🟢 ok | Persistent auth plugin for DeepSeek Harness WebUI: enforce login at the HTTP/transport layer (resources, /api, WebSocket) — unbyp… |
| [DSH-for-VSC](https://github.com/yauntyour/DSH-for-VSC) | 5 | ⚪ unknown | 把 DeepSeek Harness（DSH）的 WebUI 搬进 VS Code：编辑器内嵌面板 + 侧边栏控制台，服务离线自动拉起，日志随时可查。 |
| [deepseek-harness-themes](https://github.com/orxz/deepseek-harness-themes) | 7 | ⚪ unknown | A collection of UI themes for deepseek-harness. |
| [dsh-pixel-whale](https://github.com/yoke233/dsh-pixel-whale) | 1 | ⚪ unknown | A lively pixel-whale running-state companion for DeepSeek Harness Web. |
| [dsh-plugin](https://github.com/Gandufu/dsh-plugin) | 1 | 🟢 ok | DeepSeek Harness 插件集合｜齐天大圣双主题皮肤，支持亮暗模式、响应式布局与热插拔 |
| [dsh-refined](https://github.com/djh2203/dsh-refined) | 1 | ⚪ unknown | DeepSeek-Refined 的 DeepSeek Harness 移植版 为 DeepSeek Harness（DSH）前端注入 Obsidian Border 风格的 Markdown 美化与多主题配色。 |
| [dsh-plugin-workshop](https://github.com/yyyyukari/dsh-plugin-workshop) | 25 | ⚪ unknown | Steam Workshop-style in-app plugin browser for DeepSeek Harness (DSH) Web UI - zero-server: search, trending windows, Chinese sea… |
| [dsh-funpack](https://github.com/lvyuchuiyi/dsh-funpack) | 6 | ⚪ unknown | ??????????????????????? DeepSeek Harness ?? |
| [dsh-ui-quote-selection](https://github.com/nekogpt/dsh-ui-quote-selection) | 4 | ⚪ unknown | Codex-style select-to-quote for DeepSeek Harness Web: quote any chat text into the composer as a native reference chip. |
| [dsh-whale-subagent](https://github.com/1while1/dsh-whale-subagent) | 2 | ⚪ unknown | A whale-girl themed subagent nest for the DeepSeek Harness, featuring pixel-animated subagent cards, real-time THINK/TODO trackin… |
| [dsh-doublecheck](https://github.com/PerryLink/dsh-doublecheck) | 4 | 🟢 ok | Double-check before you ship: grill the requirements, test the implementation, prove the delivery. An engineering-discipline bund… |
| [dsh-plugin-manager](https://github.com/MAXeaglet/dsh-plugin-manager) | 3 | 🟢 ok | DSH 插件管理器：桌面 GUI + CLI，管理 dsh 的 profile、插件与一键启动 dsh web (Tauri 2 + Node CLI) |
| [dsh-client-shortcuts](https://github.com/blue-a11y/dsh-client-shortcuts) | 2 | ⚪ unknown | Global keyboard shortcuts plugin for the DeepSeek Harness web GUI: ctx.shortcuts registry service + mod+l/mod+k/mod+shift+c defau… |
| [dsh-dashboard](https://github.com/baiyun200/dsh-dashboard) | 1 | 🟢 ok | DSH 插件看板 · DeepSeek Harness 插件生态可视化（shadcn/ui，每日自动构建部署） |
| [dsh-web-text-drop](https://github.com/liceses/dsh-web-text-drop) | 1 | ⚪ unknown | DSH Web GUI 文本文件拖拽导入插件:把 md / txt / log / 代码等文本文件拖进页面, 按内容长度自动处理 —— 短内容直接进输入框,长内容复制到工作区并粘贴可读路径。 |
| [freestyle-dsh-theme](https://github.com/suzike/freestyle-dsh-theme) | 12 | ⚪ unknown | DeepSeek Harness 主题体验插件：OKLCH 主题提案 + 主题设计器（跨重启持久化） |
| [dsh-wordbox](https://github.com/arcmosin/dsh-wordbox) | 4 | 🟢 ok | DSH Web GUI常用词箱子，方便项目常用词的存储和粘贴 | DSH Web GUI Common Words Box – for storing and pasting frequently used project terms." |
| [dsh-vault](https://github.com/Ox0400/dsh-vault) | 5 | 🟢 ok | Encrypted credential vault for DeepSeek Harness — AES-256-GCM + TOTP, model tools + Settings UI |
| [dsh-voice](https://github.com/zhuiyueya/dsh-voice) | 3 | 🟢 ok | Voice for DeepSeek Harness（dsh） — speech-to-text input + read-aloud TTS for text-only DeepSeek, zero API key. |
| [dsh-turn-watchdog](https://github.com/Equinox7379/dsh-turn-watchdog) | 1 | ⚪ unknown | Turn watchdog for DSH: detects stuck turns and injects a quiet warning. |
| [dsh-growth](https://github.com/winyh/dsh-growth) | 0 | ⚪ unknown | Growth acquisition and user growth analysis for DeepSeek Harness: AARRR, retention, MRR, experiments and unit economics. |
| [dsh-theme-taffy](https://github.com/Misaki14987/dsh-theme-taffy) | 6 | ⚪ unknown | 我不是雏草姬 |
| [dsh-waterball-pet](https://github.com/sundusk/dsh-waterball-pet) | 3 | ⚪ unknown | A floating water-ball pet plugin for the DeepSeek Harness Web UI. |
| [dsh-ui-background](https://github.com/ropz12138/dsh-ui-background) | 1 | ⚪ unknown | deepseek harness 的背景插件，会涉及一些其他组件css覆盖 |
| [dsh-ux](https://github.com/jiangnanquan/dsh-ux) | 8 | ⚪ unknown | DSH web UI 增强插件 + 无边框 Electron 桌面壳 |
| [dsh-narrative-ledger](https://github.com/dongsheng123132/dsh-narrative-ledger) | 3 | ⚪ unknown | Verifiable narrative state, continuity and character-knowledge ledger for DeepSeek Harness |
| [Dsh-UI-Enhance](https://github.com/xjackzenvey/Dsh-UI-Enhance) | 0 | 🟢 ok | Deepseek Harness 增强工具 |
| [dsh-meme-hub](https://github.com/the-beating-light-of-the-nail/dsh-meme-hub) | 31 | ⚪ unknown | The meme side of DeepSeek Harness — 贪玩蓝鲸/QQ2006/whale girls/mini-games · A curated tour of the wildest dsh plugins |
| [dsh-terminal-panel](https://github.com/wuwuzhige-sudo/dsh-terminal-panel) | 3 | ⚪ unknown | A manual Terminal tab for the DeepSeek Harness (dsh) web UI — run commands on the host machine, persistent cwd, sudo password pro… |
| [dsh-whale-pet](https://github.com/lglglglgy/dsh-whale-pet) | 3 | 🟢 ok | dsh-whale-pet |
| [dsh-opencode-go-usage](https://github.com/v587d/dsh-opencode-go-usage) | 9 | ⚪ unknown | A DeepSeek Harness (dsh) bundle that shows OpenCode Go subscription usage in the Web GUI's composer dock — the same seat as the b… |
| [dsh-git-graph](https://github.com/1841220388zzzcccxxx-star/dsh-git-graph) | 14 | ⚪ unknown | Embedded git repository graph visualizer for the DeepSeek Harness Web GUI | 嵌入式 Git 仓库图谱可视化插件（提交历史图 / 分支过滤 / 文件 diff / VSCode 式未提… |
| [dsh-update-radar](https://github.com/Equinox7379/dsh-update-radar) | 1 | ⚪ unknown | Update radar for DSH: checks installed plugins against git upstreams. |
| [dsh-ui-topbar-compact](https://github.com/maque2333/dsh-ui-topbar-compact) | 1 | ⚪ unknown | 缩窄DeepSeek Harness原生webUI顶栏 |
| [dsh-claude-theme](https://github.com/chajiuqqq/dsh-claude-theme) | 2 | ⚪ unknown | dsh的claude风格界面 |
| [dsh-home-ui](https://github.com/lehhair/dsh-home-ui) | 3 | ⚪ unknown | PiUI-inspired home feed visual refinement plugin for DeepSeek Harness web client (pure extension, zero core changes) |
| [dsh-eva-theme-plugin](https://github.com/oceanxuikun/dsh-eva-theme-plugin) | 2 | ⚪ unknown | Evangelion-inspired theme plugin for DSH WebUI, featuring Unit-00, Unit-01, and Unit-02 themes with immersive backgrounds and mec… |
| [dsh-plugin-gouden-leeuw-theme](https://github.com/Andy294753951/dsh-plugin-gouden-leeuw-theme) | 1 | ⚪ unknown | Unofficial Gouden Leeuw moonlit sanctuary theme for the DeepSeek Harness web UI |
| [dsh-undo-plugin](https://github.com/lire1131/dsh-undo-plugin) | 123 | 🔴 broken (dump-config exit=0 but plugin not found in composed tree) | DSH plugin: snapshot & rollback your plugin/skin/settings configs. Auto-save on change, undo/redo stack, snapshot manager panel,… |
| [plugin-manager](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | In-app plugin store for DSH Web UI: browse the dsh-suite catalog, search/filter/sort, compat badges, one-click install — a Store… |
| [dsh-drag-and-drop](https://github.com/omdsh-dev/dsh-drag-and-drop) | 5 | ⚪ unknown | 为 DSH Web UI 增加跨平台文件拖拽与原始路径插入能力，无需复制文件 |
| [dsh-voice-input](https://github.com/forrestahha/dsh-voice-input) | 3 | ⚪ unknown | Voice-to-text input plugin for the DeepSeek Harness Web UI |
| [dsh-soundscape](https://github.com/Blaczz/dsh-soundscape) | 2 | ⚪ unknown | DeepSeek Harness Web UI soundscape: turn-complete celebration (synth chime + confetti), blocked/approval alerts, error buzz, typi… |
| [dsh-mcp-manager](https://github.com/Nichts0v0/dsh-mcp-manager) | 3 | ⚪ unknown | 在 DeepSeek Harness 设置页管理 MCP 服务器：运行时添加/编辑/启停/重连/删除，实时状态、自动重连，中英双语界面。MCP server manager for DeepSeek Harness — add, edit, enable/d… |
| [dsh-system-control](https://github.com/FrankZhangIronly/dsh-system-control) | 0 | ⚪ unknown | DSH web plugin: System menu (Restart / Shutdown) in the sidebar footer. Restart = exit 42, Shutdown = exit 0, loopback-only RPC. |
| [sebastian-kitchen-board](https://github.com/penguinpanda/sebastian-kitchen-board) | 0 | ⚪ unknown | Sebastian is a family kitchen & life assistant for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). |
| [dsh-workshop](https://github.com/loguhan/dsh-workshop) | 4 | ⚪ unknown | Steam Workshop style plugin store for DeepSeek Harness Web UI: browse 850+ community plugins, one-click install with GitHub mirro… |
| [dsh-material-you](https://github.com/mtaech/dsh-material-you) | 1 | ⚪ unknown | Material You (M3) skin for DeepSeek Harness: HCT tonal palette + Maple Mono NF CN, clean blue & white |
| [WhaleKit](https://github.com/zprolab/WhaleKit) | 2 | ⚪ unknown | Superpowers customized for DeepSeek Harness |
| [dsh-plugin-peak-pricing](https://github.com/c-ling/dsh-plugin-peak-pricing) | 2 | ⚪ unknown | DeepSeek 峰谷定价时段徽章（DSH 双面插件，纯 UI、无状态、无网络请求） |
| [dsh-deck-builder](https://github.com/Blaczz/dsh-deck-builder) | 2 | ⚪ unknown | DeepSeek Harness tool plugin: convert Markdown into a self-contained HTML presentation (slides) with themes and keyboard navigati… |
| [dsh-file-explorer](https://github.com/joejojoking-cloud/dsh-file-explorer) | 17 | ⚪ unknown | File explorer plugin for DeepSeek Harness: file tree, preview, markdown, syntax highlighting, in-panel editing, VS Code integrati… |
| [dsh-thinking-status-customizer](https://github.com/Dbi-Eshuh/dsh-thinking-status-customizer) | 5 | ⚪ unknown | Customize the visible DSH Web thinking status with lifecycle-safe CSS. |
| [dsh-whale-pet](https://github.com/Er1c0v0/dsh-whale-pet) | 4 | 🟢 ok | Unofficial whale-girl pet plugin for the DeepSeek Harness Web UI |
| [dsh-outline](https://github.com/urzeye/dsh-outline) | 14 | 🟢 ok | DeepSeek Harness（DSH）Web GUI 的实时大纲插件 |
| [dsh-zen](https://github.com/zealot00/dsh-zen) | 1 | ⚪ unknown | Zen mode for DeepSeek Harness Web UI: one-click immersive focus (hide sidebar/topbar), Ctrl+Shift+Z, pet auto-hide linkage |
| [dsh-plugins](https://github.com/linqunxun/dsh-plugins) | 2 | ⚪ unknown | Money go brrr — DSH client UI plugins collection |
| [dhs-theme-plugin](https://github.com/kongxiangyiren/dhs-theme-plugin) | 1 | ⚪ unknown | dsh 主题管理插件 |
| [DPwhale-plugin](https://github.com/zed1902209846-dotcom/DPwhale-plugin) | 1 | ⚪ unknown | 用 deepseek-harness 的创造模式做的小桌宠插件，每次对话随机出现名字，听说抽到梁神有特殊效果哦/The small table pet plugin made with the deepseek-harness creation mode r… |
| [dsh-whale-report](https://github.com/SenmuuuuW/dsh-whale-report) | 29 | 🟢 ok | 鲸鱼记事本 — 你的 Agent 年度报告：从会话事件日志生成日报/周报/月报/年报，任意区间、只读不改写 |
| [dsh-password-prompt](https://github.com/MagicCrazyMan/dsh-password-prompt) | 2 | ⚪ unknown | DeepSeek Harness plugin: masked password panel in the Web GUI (password_prompt tool) — bundle + dual-face plugin |
| [Better_Deepseek_Harkness](https://github.com/silencieuxzero/Better_Deepseek_Harkness) | 4 | ⚪ unknown | 更好的deepseek harness，为webui进行了一些拓展 |
| [claude-parchment-theme](https://github.com/RayYeung1989/claude-parchment-theme) | 1 | ⚪ unknown | 一款 Claude 风格的 dsh插件：为 DSH WebUI 打造，暖羊皮纸 Parchment 色板、Terracotta 品牌色与衬线字体 |
| [dsh-plugin-suite](https://github.com/crTnT/dsh-plugin-suite) | 3 | ⚪ unknown | DeepSeek Harness 社区插件套件：插件中心与自动更新器 |
| [dsh-file-explorer](https://github.com/wendi-lok/dsh-file-explorer) | 2 | ⚪ unknown | File directory card in the DeepSeek Harness Web left sidebar: tree browsing with arrow expand, drive-selection page, interactive… |
| [dsh-mic-input](https://github.com/QT-Chen/dsh-mic-input) | 3 | ⚪ unknown | DSH Web ?????????:??? Web Speech API ????,????/??????????????????Microphone voice input plugin for the DeepSeek Harness Web UI (b… |
| [dsh-skin-amis](https://github.com/wanzhiwei5/dsh-skin-amis) | 2 | ⚪ unknown | 鸣潮爱弥斯主题皮肤: 粉白配色+赛博霓虹装饰的 DeepSeek Harness Web GUI 皮肤 / Amis-inspired pink-white skin for DSH Web UI |
| [touhou-hakurei](https://github.com/xiake595/touhou-hakurei) | 18 | ⚪ unknown | 灵梦（Reimu）·博丽神社（东方Project）美化版皮肤：神社昼夜实景背景、灵梦立绘、画框侧边栏与输入框、纸白透明界面 — DeepSeek Harness Web GUI skin |
| [dsh-media-preview](https://github.com/tsonglew/dsh-media-preview) | 3 | ⚪ unknown | Audio/video preview viewer for dsh-better-sidebar: native playback with Range-seeking streaming route |
| [dsh-moyan](https://github.com/elviszhang007/dsh-moyan) | 4 | 🟢 ok | 简洁、克制、安静，旨在为您的Vibe Coding增加些许文艺感。每次打开WebUI，左下角都会出现一句话，从古诗词到文采句，再到脍炙人口的游戏台词，应有尽有。语料库可高度自定义，插件风格完全适配原生Harness界面，功能简洁明确，绝不喧宾夺主。 |
| [Catppuccin-dsh-theme](https://github.com/zhijun-dai/Catppuccin-dsh-theme) | 10 | ⚪ unknown | Soothing pastel theme for DeepSeek Harness |
| [dsh-naiwa-theme](https://github.com/DevourerM/dsh-naiwa-theme) | 5 | ⚪ unknown | 为deepseek harness构建的奶蛙主题，可是我觉得很神圣呀。（素材来自互联网） |
| [dsh-theme-pack](https://github.com/math-lrz/dsh-theme-pack) | 1 | ⚪ unknown | 16 theme skins for the DeepSeek Harness (DSH) Web GUI - Catppuccin/Gruvbox/Everforest/Rose Pine/Solarized/Kanagawa/Tokyo Night/Ni… |
| [dsh-ui-whale](https://github.com/omdsh-dev/dsh-ui-whale) | 2 | ⚪ unknown | 【求⭐】🐋DSH Web UI 全手绘像素鲸鱼伙伴插件：会话标题栏常驻，平时眨眼/偶尔摆尾/动胸鳍，思考运行时持续动起来，回合完成头顶喷水，点击还会冒爱心，不工作时还会偷懒睡觉，零核心改动。 【喜欢的话就点点star⭐吧~】 |
| [dsh-width-tiers](https://github.com/aaronlei/dsh-width-tiers) | 3 | ⚪ unknown | A client plugin for the DeepSeek Harness Web GUI that adds chat content width tiers with a floating picker button (bottom-right,… |
| [dsh-layout-tools](https://github.com/dHR-P/dsh-layout-tools) | 1 | ⚪ unknown | DSH Web 三栏工作台：对话流净化（工具调用/思考移入右侧面板）+ 左侧工作区文件树（git 状态徽标） |
| [dsh-skin-claude-code](https://github.com/le-soleil-se-couche/dsh-skin-claude-code) | 3 | 🟢 ok | DeepSeek Harness (dsh) Web GUI skin: Claude Code style fonts + Codex warm palette (terracotta #DA7756, cream #F5F3EE, ink #1D1B16… |
| [dsh-web-search-tavily](https://github.com/cnChenKai/dsh-web-search-tavily) | 3 | 🟢 ok | Tavily-backed WebSearchProvider for DeepSeek Harness (ctx.web) - keyless mode, no API key required |
| [dsh-turn-navigator](https://github.com/xiaoso456/dsh-turn-navigator) | 1 | ⚪ unknown | Jump between conversation turns in the DeepSeek Harness web UI |
| [dsh-eye-care](https://github.com/Anionex/dsh-eye-care) | 2 | ⚪ unknown | Warm light, warm dark, and system-aware eye-care themes for DSH Web |
| [dsh-web-search-responses](https://github.com/herminger/dsh-web-search-responses) | 1 | ⚪ unknown | DSH ctx.web search provider that reuses the conversation model's OpenAI Responses built-in web_search |
| [dsh-aemeath-pet](https://github.com/culture-flask/dsh-aemeath-pet) | 7 | ⚪ unknown | 爱弥斯 · DeepSeek Harness 桌宠 — DeepSeek Harness Web GUI 的像素风宠物插件。 |
| [dsh-workbench](https://github.com/Dpf555/dsh-workbench) | 6 | 🟢 ok | VS Code-style three-column Explorer + Monaco editor plugin for the DeepSeek Harness web GUI |
| [dsh-web-theme-packs](https://github.com/tzy168/dsh-web-theme-packs) | 3 | ⚪ unknown | This is a dsh-pulgin for change theme by yourself. |
| [dsh-gadgets](https://github.com/Highjobop/dsh-gadgets) | 4 | ⚪ unknown | Lightweight DeepSeek Harness tweaks: dsh-skin (appearance) + dsh-tidy (conversation folding & nav rail) |
| [dsh-plugin-devecocli](https://github.com/frankq007/dsh-plugin-devecocli) | 1 | ⚪ unknown | HarmonyOS development tools for DeepSeek Harness: device/emulator management, UI automation, build & deploy, logs, lint, signing… |
| [dsh-tavily-search-provider](https://github.com/xiaohj233/dsh-tavily-search-provider) | 2 | ⚪ unknown | Tavily search provider for DeepSeek Harness with full search-control mapping, credential-backed key UI, and guarded rc.6 patches. |
| [dsh-computer-use](https://github.com/ZRui-C/dsh-computer-use) | 22 | 🟢 ok | Text-first browser & background macOS control for DeepSeek Harness (DSH): target the right process and window without taking the… |
| [dsh-commit-review](https://github.com/the-qian/dsh-commit-review) | 4 | ⚪ unknown | 一个 DSH 插件：为 Web GUI 增加 /commit 与 /review 两个斜杠命令 |
| [dsh-catppuccin](https://github.com/NoNameLeGo/dsh-catppuccin) | 18 | 🟢 ok | DeepSeek Harness Web GUI 的 Catppuccin 主题插件：Latte / Frappé / Macchiato / Mocha 四种风味一键切换 |
| [dsh-sidebar-qa](https://github.com/ChenRuoT/dsh-sidebar-qa) | 31 | ⚪ unknown | 一个基于DSH-better-sidebar的侧边栏提问tab，实现类codex的侧边提问或claude code的/btw功能 |
| [dsh-boot-guard](https://github.com/SaiSenBox/dsh-boot-guard) | 4 | 🟢 ok | A loader-independent rescue console for DeepSeek Harness when a broken plugin prevents the Web UI from starting. |
| [dsh-plugin-qr-connect](https://github.com/mervyn-teo/dsh-plugin-qr-connect) | 3 | 🟢 ok | DeepSeek Harness dynamic plugin: QR-code sidebar button for connecting mobile devices to the web UI |
| [dsh-blue-whale](https://github.com/starslittle/dsh-blue-whale) | 7 | ⚪ unknown | Official DeepSeek Chat blue-whale default skin for DeepSeek Harness |
| [dsh-hotreload-plugin-manager](https://github.com/kyorakuyk/dsh-hotreload-plugin-manager) | 3 | ⚪ unknown | DeepSeek Harness plugin: hot install / uninstall / update / enable-disable of profile plugin bundles from the running dsh web — n… |
| [dsh-plugin-visual-composer](https://github.com/VanillaCreamer/dsh-plugin-visual-composer) | 3 | ⚪ unknown | Visual Cordis plugin-tree composer for the DeepSeek Harness Web UI. |
| [dsh-client-ui-skin-claude](https://github.com/PAKIKNOWLEDGE/dsh-client-ui-skin-claude) | 9 | ⚪ unknown | Claude-style skin for DeepSeek Harness (dsh) Web GUI — warm-black canvas, Anthropic clay accent, serif UI |
| [deepseek-skin-studio](https://github.com/JueMing2049/deepseek-skin-studio) | 0 | ⚪ unknown (原生插件通道 beta；书签/CDP 注入为主) | DSH skin studio: turn one image into a Web UI skin; bookmark/CDP/native injection, visual workshop, 13 built-in themes, DSH-SKIN-… |
| [dsh-whale-font](https://github.com/kxSenlin/dsh-whale-font) | 3 | ⚪ unknown | 把 DeepSeek Harness 对话里的主语人称「我/你/I/me」渲染成 DeepSeek 蓝鲸图标（DSH 插件） |
| [dsh-scroll-timeline](https://github.com/invalidnaaaame/dsh-scroll-timeline) | 5 | ⚪ unknown | DSH web plugin: ChatGPT-style scroll timeline on the chat sidebar — magnetic mountain hover, click to jump to user messages. Deri… |
| [dafy-whale-theme](https://github.com/DViridescent/dafy-whale-theme) | 7 | ⚪ unknown | DeepSeek Harness 蓝色大肥鱼主题插件：海洋配色、鱼群、气泡、吉祥物与品牌替换 |
| [dsh-skin-appearance](https://github.com/Vim0x3c/dsh-skin-appearance) | 5 | ⚪ unknown | DeepSeek Harness 外观定制插件：八套内置主题 + 自定义壁纸（透明度/模糊），Host 设置持久化 | Appearance plugin for dsh web |
| [deepseek-harness-GUI](https://github.com/festoney8/deepseek-harness-GUI) | 6 | 🟢 ok | DeepSeek Harness 超级轻量启动器，基于 Tauri 封装桌面版 APP，支持升级 DSH 内核、提供免安装便携版 |
| [dsh-any-background](https://github.com/Tkingxiao/dsh-any-background) | 16 | 🟢 ok | 一个自定义主题插件，包括背景图（大小和位置），主界面和设置界面（透明度，色轮全色主题色）插件 |
| [dsh-meow-cat](https://github.com/dsh-pub/dsh-meow-cat) | 2 | ⚪ unknown | A cat runs across the bottom of the DeepSeek Harness web UI with a synthesized meow every time a conversation turn ends. |
| [maid-atelier-ui-bundle](https://github.com/flaricy/maid-atelier-ui-bundle) | 3 | ⚪ unknown | A calm Maid Atelier theme and practical file, preview, Git, and terminal side panel for DeepSeek Harness Web. |
| [dsh-plugin-terminal](https://github.com/siberiah2o/dsh-plugin-terminal) | 6 | ⚪ unknown | Bottom terminal panel plugin for DeepSeek Harness (DSH Web GUI) |
| [dsh-message-preview](https://github.com/asukasec/dsh-message-preview) | 6 | ⚪ unknown | Right-side user-message navigator for the DeepSeek Harness Web UI. |
| [dsh-whale-arcade](https://github.com/jitengfei/dsh-whale-arcade) | 3 | 🟢 ok | Community-maintained whale arcade for DeepSeek Harness while waiting for model responses |
| [dsh-skin-blue-whale](https://github.com/zenghuizhu69-hub/dsh-skin-blue-whale) | 3 | ⚪ unknown | dsh Web UI skin: DeepSeek blue-whale theme with official gradient and leaping whale art (dsh plugin) |
| [dsh-precise-cache](https://github.com/Townrain/dsh-precise-cache) | 2 | ⚪ unknown | Five-decimal cache-hit readout beside the chat stats line for the DeepSeek Harness Web GUI (dsh-plugin) |
| [dsh-rules-manager](https://github.com/jilian-dsh/dsh-rules-manager) | 2 | 🟢 ok | Rules & commands manager for DeepSeek Harness: /rules command + settings panel + custom commands |
| [dsh-ui-preset-enhance](https://github.com/lssyd20070106/dsh-ui-preset-enhance) | 7 | ⚪ unknown | Third-party DSH WebUI enhancement plugin: custom backgrounds, theme colors, prompt presets, token/context visibility, and manual… |
| [dsh-snapshot](https://github.com/DfsyJian/dsh-snapshot) | 3 | 🟢 ok | DeepSeek Harness plugin: automatic file snapshots with a sidebar timeline and settings card |
| [deepseek-harness-pets](https://github.com/orxz/deepseek-harness-pets) | 2 | 🟢 ok | 这是一个专为 DeepSeek-Harness 定制的桌宠皮肤包， DeepSeek 的标志性“大鲸鱼”等宠物养成。 |
| [plugin-switch](https://github.com/cynch18/plugin-switch) | 4 | ⚪ unknown | DSH web plugin: toggle plugins on/off from the GUI without restarting the server |
| [dsh-liang-skin](https://github.com/kingOfSoySauce/dsh-liang-skin) | 139 | 🔴 broken (dump-config exit=0 but plugin not found in composed tree (client-inject skin may need web restart)) | Liang-Stan adaptive reasoning slider skin (Jiankang Liang meme) for DeepSeek Harness |
| [dsh-skin-switcher](https://github.com/zhtx2024/dsh-skin-switcher) | 4 | 🟢 ok | DeepSeek Harness Web GUI 皮肤切换插件：设置界面一键切换已安装皮肤 |
| [dsh-font](https://github.com/tianyhjg-lab/dsh-font) | 11 | ⚪ unknown | Font switcher for DeepSeek Harness Web GUI: 99 UI fonts + 31 code fonts with CJK-Latin pairing, instant apply, localStorage persi… |
| [dsh-maid-whale-webUI](https://github.com/yunxiiQwQ/dsh-maid-whale-webUI) | 24 | ⚪ unknown | DeepSeek Harness Web UI 鲸鱼女仆主题插件 |
| [dsh-model-failover](https://github.com/Letter2025/dsh-model-failover) | 3 | 🟢 ok | Two-level model circuit breaker with failover for DeepSeek Harness: trip a model or a whole provider after repeated request failu… |
| [dsh-plugin-terminal](https://github.com/mervyn-teo/dsh-plugin-terminal) | 3 | ⚪ unknown | DeepSeek Harness Web plugin: a real PTY terminal in a VS Code-style collapsible footer panel |
| [QAQ](https://github.com/WTStarMark/QAQ) | 4 | ⚪ unknown | QAQ: a launch resilience guard for DeepSeek Harness (DSH). Supervises dsh web, reads the real DOM via headless Chrome + CDP to ca… |
| [dsh-opencodego-usage](https://github.com/BeiZi6/dsh-opencodego-usage) | 7 | ⚪ unknown | DSH Web GUI plugin: OpenCodeGo quota breathing light + liquid-glass panel with rolling/weekly/monthly progress bars (作者 Xu Yuansh… |
| [dsh-dream-skin](https://github.com/RevolutionLA/dsh-dream-skin) | 98 | 🟢 ok | DeepSeek Harness 换肤 / 壁纸 / 主题包插件 (dsh-plugin) — 8 套 Mirage 主题、每用户强调色、壁纸2.0、主题包导入导出/分享链接、收藏与随机，纯原生 token 系统实现。 |
| [dsh-file-mention](https://github.com/hucj09/dsh-file-mention) | 2 | ⚪ unknown | DSH (DeepSeek Harness) Web GUI 插件：输入 @ 引用工作区文件，体验类似 Claude Code 的 @file。 |
| [dsh-theme-cyberpunk2077](https://github.com/Tommy00748/dsh-theme-cyberpunk2077) | 24 | ⚪ unknown | Cyberpunk 2077 / Night City theme for the DeepSeek Harness Web UI — CRT scanlines, Kiroshi lock-on, typewriter SFX, Relic glitch… |
| [dsh-update-checker](https://github.com/Airmetro/dsh-update-checker) | 10 | 🟢 ok | DeepSeek Harness (DSH) 更新检测插件：自动检查 npm 最新版并在 GUI 顶部横幅提示，支持中英文跟随系统语言、一键安装更新并重启服务。Auto update checker for DeepSeek Harness with loc… |
| [dsh-liquid-glass](https://github.com/xingyingyuzhui/dsh-liquid-glass) | 11 | 🟢 ok | Wallpaper plus optional Liquid Glass overlay for DeepSeek Harness Web UI |
| [whale-notify](https://github.com/Mochabafey/whale-notify) | 5 | ⚪ unknown | 鲸鱼通知——基于DeepSeek Harness的通知和鲸鱼娘人设插件 |
| [dsh-pluginmanager](https://github.com/buhuikongpan/dsh-pluginmanager) | 9 | ⚪ unknown | DSH 分层插件管理器：原生插件按 系统层/WebUI 层/工具层 只读展示，用户扩展支持停用/启用、补登记、卸载与可编辑描述。 |
| [dsh-oh-my-theme](https://github.com/zhxqc/dsh-oh-my-theme) | 6 | 🟢 ok | DeepSeek Harness (dsh) web plugin with themes, global typography, @file mentions, project file tree, and Markdown preview. |
| [reef](https://github.com/huey1in/reef) | 16 | ⚪ unknown | DSH 插件全家桶:浏览器自动化 + MCP Server + GitHub/GitLab 自动评审 + 原生嵌入面板 | One install, five modules for DeepSeek Harness: browser automation,… |
| [deepseek-harness-genui](https://github.com/pengyue-polaron/deepseek-harness-genui) | 100 | ⚪ unknown | Code-first generative UI for DeepSeek Harness |
| [dsh-smooth-stream](https://github.com/Laplace-bit/dsh-smooth-stream) | 55 | 🟢 ok | Fluid streaming rendering and smooth scrolling for the DeepSeek Harness Web UI. |
| [voyager](https://github.com/Nagi-ovo/voyager) | 19825 | ⚪ unknown | Enhancement suite for Gemini, AI Studio, Claude & ChatGPT — plus a prompt manager for any web UI, DeepSeek Harness included. / 面向… |
| [dsh-im](https://github.com/xmanrui/dsh-im) | 774 | 🟢 ok | 通过扫码把IM机器人接入DeepSeek Harness（支持飞书、微信、钉钉、QQ、企业微信等） |
| [dsh-gui](https://github.com/kipozannaki/dsh-gui) | 3 | ⚪ unknown | Deepseek Harness GUI图形化界面，兼容mac和windows 开箱即用 |
| [dsh-unread-dot](https://github.com/Bing-Bryan/dsh-unread-dot) | 3 | ⚪ unknown | DSH plugin: macOS Dock badge (dot = running, number = results) + bubble chime, built on the Badging API |
| [dsh-plugin-vscode-sidebar](https://github.com/gameswu/dsh-plugin-vscode-sidebar) | 8 | ⚪ unknown | 提供vscode风格和功能的侧栏 |
| [dsh-routing-suite](https://github.com/dragonbaba/dsh-routing-suite) | 16 | 🟢 ok | Lightweight, localized task routing for DeepSeek Harness |
| [Better_Deepseek_Harness](https://github.com/silencieuxzero/Better_Deepseek_Harness) | 4 | ⚪ unknown | Better Deepseek Harness, with some functional extensions to webui and Deepseek Harness·更好的deepseek harness，对webui和deepseek harnes… |
| [MistyMoon-DSH](https://github.com/mianyoubiaoqing/MistyMoon-DSH) | 3 | ⚪ unknown | Local-first long-term companion plugin suite for DeepSeek Harness |
| [dsh-plugin-tts](https://github.com/1624318455/dsh-plugin-tts) | 10 | ⚪ unknown | Edge TTS voice plugin for DeepSeek Harness: read assistant replies aloud, auto-read toggle, voice settings panel (free, no API ke… |
| [dsh-download-progress](https://github.com/Fro2en12/dsh-download-progress) | 3 | ⚪ unknown | DSH web plugin: 下载进度面板（AI 产物） |
| [dsh-vscode](https://github.com/Lixxx1/dsh-vscode) | 16 | ⚪ unknown | A Claude Code/Codex-style VS Code sidebar for DeepSeek Harness. 像 Claude Code 和 Codex 一样，在 VS Code 侧边栏中使用 DeepSeek Harness。 |
| [dsh-jupyter](https://github.com/kikulmj/dsh-jupyter) | 5 | ⚪ unknown | Provide notebook‑style workbench and local shell for DeepSeek Harness Web GUI |
| [dsh-client-ui-writing](https://github.com/x2802490130-prog/dsh-client-ui-writing) | 3 | 🟢 ok | Client-side writing panel for DeepSeek Harness: projects, library, full-text search, evolution diffs and an SVG thread graph. |
| [dsh-catppuccin-theme](https://github.com/NoNameLeGo/dsh-catppuccin-theme) | 18 | ⚪ unknown | DeepSeek Harness Web GUI 的 Catppuccin 主题插件：Latte / Frappé / Macchiato / Mocha 四种主题一键切换，内置可开关的玻璃质感（Glassmorphism） |
| [Dsh-FileExplorer](https://github.com/bearllfleed/Dsh-FileExplorer) | 5 | ⚪ unknown | 给 DeepSeek Harness (DSH) Web 界面加一个 VS Code 风格的工作区文件浏览器：右侧文件树 + 可编辑标签页 + Markdown 阅读/编辑/分屏 + 悬浮大纲 + Quick Open 搜索。 |
| [dsh-devquest](https://github.com/lucky8197/dsh-devquest) | 6 | 🟢 ok | 把开发变成 RPG 的 DSH 插件：回合/工具/待办积累 XP、47 枚成就+稀有度、每日/每周挑战、每日抽奖、赛季商店、7 款主题皮肤、多称号、活跃日历+荣誉墙。事件流驱动，装好自动计分。 |
| [dsh-mobile](https://github.com/cindyguyuehu123/dsh-mobile) | 5 | 🟢 ok | Use DeepSeek Harness from your iPhone / iPad: LAN reverse proxy, iOS PWA (add-to-home-screen) chrome, and touch/mobile CSS for th… |
| [dsh-codex-pet](https://github.com/mengyun233/dsh-codex-pet) | 5 | 🟢 ok | 将 Codex 桌宠皮肤自动迁移到 DeepSeek Harness，在 DSH Web 界面渲染功能一致的桌宠：动画、多会话对话框、设置面板，一键迁移即插即用。 |
| [dsh-plugin-uisfx](https://github.com/XanthanL/dsh-plugin-uisfx) | 3 | ⚪ unknown | DSH plugin: semantic UI sound effects powered by uisfx dsh 语义化音效插件：任务开始/成功/失败、按钮反馈，设置页即时试听，12 种音色包，支持其他插件调用。 |
| [dsh-live2d-companion](https://github.com/Tisitan/dsh-live2d-companion) | 6 | ⚪ unknown | Live2D 监控面板・看板娘桌宠 for DeepSeek Harness |
| [dsh-web-restart](https://github.com/1123762794/dsh-web-restart) | 4 | ⚪ unknown | One-click restart button for the DeepSeek Harness Web UI: sidebar footer button, single click restarts the dsh web process. / DSH… |
| [dsh-whale-musume](https://github.com/Sutera-Diffusus/dsh-whale-musume) | 35 | ⚪ unknown | DeepSeek Harness 桌宠插件：元气鲸鱼娘陪你写代码 🐋 |
| [dsh-ui-font](https://github.com/warmwine/dsh-ui-font) | 5 | ⚪ unknown | DSH老花眼插件，对眼睛不好看不了小字的朋友相当有善。 |
| [dsh-thinking-notifier](https://github.com/6-debug-6/dsh-thinking-notifier) | 4 | ⚪ unknown | A simple popup that can quickly show when Deepseek has finished thinking or is requesting permission during split-screen. |
| [dsh-joi-channel-theme](https://github.com/tpmoonchefryan/dsh-joi-channel-theme) | 11 | 🟢 ok | 轴伊 Joi 双衣装主题 for DeepSeek Harness — unofficial, non-commercial fan theme plugin 🍊 |
| [dsh-openai-oauth](https://github.com/AdonisSheldon/dsh-openai-oauth) | 7 | 🟢 ok | Use ChatGPT OAuth and OpenAI Codex models in DeepSeek Harness—no API key or Codex CLI required. |
| [dsh-client-ui-skin-denia](https://github.com/Ewnscat-ya/dsh-client-ui-skin-denia) | 29 | ⚪ unknown | DeepSeek Harness Web GUI 皮肤 · 鸣潮·达妮娅(Denia)主题「虚无之泡」。双形态亮/暗、侧边立绘、可修改的玻璃卡片、浮动泡泡粒子、锁链边框。 |
| [dsh-whale-animation](https://github.com/LeemanCheung/dsh-whale-animation) | 6 | ⚪ unknown | Persistent closed-loop whale-dive animation for DeepSeek Harness Web turn status |
| [dsh-client-ui-custom](https://github.com/yoli-mi/dsh-client-ui-custom) | 18 | ⚪ unknown | Configurable DSH web-surface plugin: wallpaper & frosted-glass themes, accent colors, custom keyboard shortcuts, app-usage panel,… |
| [dsh-gui](https://github.com/EricXu20266/dsh-gui) | 7 | ⚪ unknown | DeepSeek Harness (DHS) Electron GUI client — webui to gui, kernel untouched |
| [dsh-skin-manager](https://github.com/xiaoyangcheng84-svg/dsh-skin-manager) | 5 | 🟢 ok | 一个可以管理皮肤的dsh插件 |
| [dsh-endfield-ui](https://github.com/rison114514/dsh-endfield-ui) | 36 | ⚪ unknown | Endfield-inspired industrial UI shell for DeepSeek Harness (dsh) — non-official fan theme. Install: dsh plugin --profile web add… |
| [dsh-remote](https://github.com/Hyna-hla/dsh-remote) | 7 | 🟢 ok | DSH Remote 手机遥控端：把电脑上的 DeepSeek Harness 装进口袋。手机连上就能给 AI 派活、看实时回复、批审批；支持局域网/内网穿透、扫码连接、审批通知、会话管理、多主题换装，还能解锁加密保险库。第三方社区作品，开源免费。 |
| [dsh-web-tools](https://github.com/A3Boy/dsh-web-tools) | 17 | ⚪ unknown | Multi-provider Web Search & Fetch for DeepSeek Harness — Tavily, Exa, Firecrawl, Brave, You.com, Jina & SearXNG with fallback and… |
| [dsh-whale-galgame](https://github.com/JAdpp/dsh-whale-galgame) | 14 | ⚪ unknown | 工作推gal两不误~面向DeepSeek Harness的跨会话事件感知Galgame引擎与界面插件，支持鲸鱼娘/GPT/Claude/Grok/Gemini/Kimi多位模型娘角色 |
| [dsh-better-sidebar-lite](https://github.com/pixellover1433/dsh-better-sidebar-lite) | 5 | 🟢 ok | a simple plugin to improve web UX/UI for "Deepseek Harness (dsh)" |
| [DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 864 | ⚪ unknown | DeepSeek Harness（DSH）一只住在 DSH 界面右下角的小鲸鱼娘，帮你盯着DeepSeek账户余额。QQ弹弹，支持拖拽吸附、左吸附翻转、数字滚动动画，随界面自动启用，建议直接喊来你的dsh安装 |
| [dsh-opencode-palette](https://github.com/FeatherHunter/dsh-opencode-palette) | 14 | ⚪ unknown | 看腻了 DSH 默认皮肤？34 款 opencode 经典配色一键换上——tokyonight、dracula、gruvbox、matrix、rose-pine……即点即换，重启不丢。34 opencode themes for DeepSeek Harne… |
| [dsh-whale-meter](https://github.com/Shiye-10Pages/dsh-whale-meter) | 9 | ⚪ unknown | 鲸鱼电表：你在 DeepSeek Harness 上烧了多少 token？消耗量段位、可晒的战绩卡、6 家厂商 46 个模型精准计价（含国内分档）、8·17 调价前后对比。零配置，数据全在本机 | Token usage tiers & cost dashb… |
| [dsh-kimino-theme](https://github.com/niiang/dsh-kimino-theme) | 21 | ⚪ unknown | Kimi no Na wa (Your Name) theme for DeepSeek Harness Web GUI |
| [dsh-beauty-skins](https://github.com/XieRW/dsh-beauty-skins) | 82 | ⚪ unknown | 给 DeepSeek Harness 用的美女系列皮肤：设置里从 哲风壁纸 拉预览网格，点一张即应用，配色从壁纸提取。支持动态壁纸，也保留自定义选图。 |
| [open-sea-skin](https://github.com/d-dev0101/open-sea-skin) | 188 | 🟢 ok | WebGPU ocean skin for DeepSeek Harness — DSH plugin, Harness-only Chrome/Edge extension, static installer, and native integration. |
| [dsh-mobile-hanui](https://github.com/Z-6354/dsh-mobile-hanui) | 12 | ⚪ unknown | 基于deepseek-harness（dsh）的手机网页优化插件，修复了部分网页与手机端不适配的问题； |
| [dsh-md-quiz](https://github.com/MrElysium/dsh-md-quiz) | 6 | ⚪ unknown | DeepSeek Harness plugin: quiz-style reading (答题式阅读) of any Markdown document — 5-stage game loop with a sidebar panel and a readi… |
| [ikun-theme-skin](https://github.com/AKS1st/ikun-theme-skin) | 6 | ⚪ unknown | IKUN 主题皮肤 for DeepSeek Harness — ikun 应援主题、全屏壁纸轮播、基尼太美音乐盒、发送自动播「你干嘛~哎哟」 |
| [dsh-vscode](https://github.com/Fengze233/dsh-vscode) | 16 | ⚪ unknown | 在 VS Code 侧边栏内嵌使用 DeepSeek Harness（DSH）网页界面的插件 |
| [dsh-prompt-optimize](https://github.com/1847123733/dsh-prompt-optimize) | 6 | ⚪ unknown | DSH Web plugin: web ui |
| [dsh-undo-savepoint](https://github.com/lire1131/dsh-undo-savepoint) | 123 | ⚪ unknown | DSH crash-rescue plugin: undo config & plugin-code changes, secret-safe snapshots, one-click SAFE MODE, plus offline CLI/GUI that… |
| [dsh-code-review](https://github.com/CooStack/dsh-code-review) | 5 | ⚪ unknown | Codex-style code review sidebar and safe per-turn undo plugin for DeepSeek Harness |
| [dsh-knowledge](https://github.com/Soren-ABT/dsh-knowledge) | 11 | ⚪ unknown | Knowledge base & RAG plugin for DeepSeek Harness (DSH): chunking, local embeddings, hybrid search, management panel |
| [dsh-aemeath](https://github.com/hachimi-ai/dsh-aemeath) | 5 | ⚪ unknown | 爱弥斯主题皮肤 + 像素桌宠（鸣潮 Aemeath / Wuthering Waves），用于 DeepSeek Harness Web GUI。 |
| [dsh-tavily](https://github.com/moguiyu/dsh-tavily) | 5 | 🟢 ok | Tavily-powered optional search tool for DeepSeek Harness (rc.7 plugin management): multi-key rotation/failover, usage gauge, sett… |
| [dsh-codex-ui](https://github.com/MichengAI/dsh-codex-ui) | 31 | ⚪ unknown | DSH Codex UI 基于 DeepSeek Harness 的 Codex UI 插件，还原度90%，小细节拉满 |
| [dsh-theme-endfield](https://github.com/ymh0000123/dsh-theme-endfield) | 30 | ⚪ unknown | 终末地官网风格的 DSH Web 主题：奶油纸底、墨黑文字、信号黄强调、全直角工业编辑风。 |
| [dsh-plugin-tavily](https://github.com/1624318455/dsh-plugin-tavily) | 6 | ⚪ unknown | Tavily-backed web search provider plugin for DeepSeek Harness (dsh) — registers a tavily search provider into ctx.web with a sett… |
| [dsh-skin-alphacoders](https://github.com/sakka6868/dsh-skin) | 2 | 🟢 ok | Alphacoders wallpapers as the DeepSeek Harness Web GUI background — gallery, search, local upload, per-theme wallpapers, favorite… |
| [dsh-xueqiu](https://github.com/kangjinghang/dsh-xueqiu) | 8 | 🟢 ok | 雪球 mini 行情面板 — DeepSeek Harness 免登录 A股/港美股实时行情、K线、分时、热榜、7x24快讯。可拖拽悬浮面板，交易时段智能刷新。 |
| [DSH-Mobile](https://github.com/SimonMedy/DSH-Mobile) | 9 | 🟢 ok | Unofficial community mobile client for the DeepSeek Harness Web UI. |
| [dsh-coding-subscription-oauth](https://github.com/lninghaha/dsh-coding-subscription-oauth) | 12 | ⚪ unknown | DeepSeek Harness coding-subscription OAuth: SuperGrok / Grok Build, ChatGPT Plus Codex, Kimi Code, Claude Code. No API-key pastin… |
| [dsh-imessage](https://github.com/photon-hq/dsh-imessage) | 8 | 🟢 ok | Photon-hosted iMessage transport and settings UI for DeepSeek Harness |
| [dsh-obsidian-math](https://github.com/maple110011/dsh-obsidian-math) | 6 | ⚪ unknown | 面向数学笔记的 DeepSeek Harness 助手，驻留在 Obsidian 右侧栏。可直接读写数学笔记，维护分层长期记忆（画像、主题、类型化记录、原始证据），按 Rethlas 风格证明工作流工作，内置个人定理索引与问题模板库，并能把关键想法捕捉到备忘… |
| [dsh-agy-link](https://github.com/amlyczz/dsh-agy-link) | 14 | 🟢 ok | Google Antigravity (agy CLI) models for DeepSeek Harness — streaming chat, thinking, tool activity, usage, in-GUI Google OAuth lo… |
| [dsh-bloom-theme](https://github.com/webkubor/dsh-bloom-theme) | 11 | ⚪ unknown | DeepSeek Harness (DSH) 主题插件：Bloom 莫兰迪配色 4 变体，OKLCH 调色，明暗双主题，顶栏一键切换，全部达 WCAG AA |
| [dsh-android](https://github.com/ZSeven-W/dsh-android) | 107 | ⚪ unknown | DeepSeek Harness plugin for Android — build, run, and interact with a live emulator or USB device stream inside a conversation, d… |
| [dsh_theme_terraria](https://github.com/10086ggqq/dsh_theme_terraria) | 18 | ⚪ unknown | 把 DeepSeek Harness 的 AI 编码控制台变成泰拉瑞亚像素世界——向导陪你写代码，真实对话、工具审批、难度切换，单文件零依赖。 |
| [dsh-ui-tweaks](https://github.com/wlj521/dsh-ui-tweaks) | 10 | ⚪ unknown | 一切皆插件，可以定义自己喜欢的dsh，开关控制单项功能，字体大小，表格样式，对话框长度，timeline，git等 |
| [dsh-anchored-monitor](https://github.com/Aik358/dsh-anchored-monitor) | 8 | ⚪ unknown | Real-time chain-of-thought anchoring monitor & intervention plugin for DeepSeek Harness: three-band (spec/mixed/react) fingerprin… |
| [dsh-history-tree](https://github.com/z953218350/dsh-history-tree) | 8 | ⚪ unknown | Codex-style conversation turn timeline and hover history overview for DSH Web UI |
| [dsh-multi-chat](https://github.com/daetz-coder/dsh-multi-chat) | 4 | ⚪ unknown | Multi-window wall for the DSH Web UI: run and monitor N conversations side-by-side, with auto-discovery and an authenticated LAN… |
| [dsh-monitor](https://github.com/JacksonZ8/dsh-monitor) | 0 | ⚪ unknown (未发 npm，走 github: 源；package.json name=dsh-progress-monitor) | Draggable in-session progress monitor for long multi-batch work (background jobs and workflows), with progress bar, done/total co… |
| [dsh-history](https://github.com/chenproton/dsh-history) | 8 | ⚪ unknown | Quickly view, search, and jump to all the messages you sent in a long conversation. |
| [dsh-toolbox](https://github.com/HiWhaleW/dsh-toolbox) | 29 | ⚪ unknown | Local-first DeepSeek Harness plugins for product research, context routing, plugin preflight, and compatibility monitoring. |

### 🐋 Skins

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [themes (皮肤中心)](https://github.com/whyihaveyou/dsh-themes) | 9 | 🟢 ok | Skin Center: 151 day/night skin pairs in one package — grid previews, search, one-click try-on, favorites, recently-tried and ran… |

### 💬 Session

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [pi-discuss-mode](https://github.com/zwrong/pi-discuss-mode) | 11 | ⚪ unknown | Read-only discussion mode for Pi Coding Agent |
| [dsh-turn-rewind](https://github.com/Anionex/dsh-turn-rewind) | 100 | 🟢 ok | Rewind conversation and workspace state |
| [dsh-share](https://github.com/hellodigua/dsh-share) | 34 | 🟢 ok | DSH conversation sharing plugin |
| [dsh-message-edit](https://github.com/Moeblack/dsh-message-edit) | 42 | 🟢 ok | Branch-based message editing, reroll, version timeline |
| [dsh-context-doctor](https://github.com/Zhenyu98/dsh-context-doctor) | 20 | ⚪ unknown | Context injection audit: AGENTS.md/skills/tool-schema token cost |
| [dsh-session-health](https://github.com/omdsh-dev/dsh-session-health) | 9 | 🟢 ok | Frame-level scan diagnostics for zstd session files |
| [dsh-evolve](https://github.com/william-jin-cmu/dsh-evolve) | 10 | ⚪ unknown | Self-evolution: agent grows/prunes its own abilities |
| [dsh-memory-evolve](https://github.com/csyangwen/dsh-memory-evolve) | 241 | 🟢 ok | Cross-session long-term memory + background self-evolution |
| [dsh-web-archive](https://github.com/renat3u/dsh-web-archive) | 8 | ⚪ unknown | Fold noisy messages (Think/Bash) in conversation |
| [deepseek-manners](https://github.com/Moeblack/deepseek-manners) | 15 | ⚪ unknown | Inject gratitude into every message |
| [dsh-agent-budget](https://github.com/vibeinging/dsh-agent-budget) | 2 | ⚪ unknown | Native agent-tree token budget plugin |
| [dsh-conversation-share](https://github.com/bill9109/dsh-conversation-share) | 3 | ⚪ unknown | Share any segment of a DSH conversation |
| [dsh-kb-sieve](https://github.com/omdsh-dev/dsh-kb-sieve) | 2 | ⚪ unknown | Auditable knowledge-base packs (references + SQLite) |
| [dsh-postmortem](https://github.com/zzh-newlearner/dsh-postmortem) | 2 | ⚪ unknown | Local-first failure postmortems |
| [dsh-session-search](https://github.com/Tieboyh/dsh-session-search) | 2 | ⚪ unknown | Index-free cross-agent session search |
| [dsh-sidechain](https://github.com/Buyi-wsgzg/dsh-sidechain) | 8 | ⚪ unknown | Side-chain sessions: /side persistent + /btw one-off |
| [dsh-tool-approval](https://github.com/ilharp/dsh-tool-approval) | 0 | 🟢 ok | Manual approval (Manual/Ask mode) |
| [dsh-turn-navigator](https://github.com/vibeinging/dsh-turn-navigator) | 2 | ⚪ unknown | DSH Web turn navigation plugin |
| [plugin-session-export](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Export the append-only session log as human-readable Markdown / HTML, grouped by trajectory source (system prompt / reasoning / t… |
| [dsh-chat-import](https://github.com/Nwflower/dsh-chat-import) | 102 | 🟢 ok | Import chat history from Claude Code/Codex/Reasonix into DSH. |
| [dsh-stream-rules](https://github.com/jiesou/dsh-stream-rules) | 5 | ⚪ unknown | Inject rules on demand without wasting context. |
| [dsh-compaction-instant](https://github.com/KitDoesIt/dsh-compaction-instant) | 9 | 🟢 ok | LLM-free lossless compaction engine. |
| [dsh-recall](https://github.com/Mongfayi/dsh-recall) | 3 | 🟢 ok | Message recall plugin for DSH Web UI. |
| [dsh-plugin-claude-bridge](https://github.com/YYTbit/dsh-plugin-claude-bridge) | 9 | 🟢 ok | Bridge Claude Code memory, skills, and config into DeepSeek Harness |
| [dsh-goal-mode-enhance](https://github.com/KarlOfLaw/dsh-goal-mode-enhance) | 2 | ⚪ unknown | dsh-goal-mode-enhance — DSH plugin (session) |
| [context-vista](https://github.com/GooodWei/context-vista) | 12 | 🟢 ok | context-vista — DSH plugin (session) |
| [dsh-claude-move](https://github.com/PerryLink/dsh-claude-move) | 9 | 🟢 ok | DeepSeek Harness (dsh) plugin: migrate Claude Code sessions, memory, skills and CLAUDE.md into DSH with seamless resume (claude_s… |
| [dsh-ergonomics](https://github.com/hisaniwo/dsh-ergonomics) | 2 | 🟢 ok | dsh-ergonomics — DSH plugin (session) |
| [dsh-model-config-sync](https://github.com/LiangYin233/dsh-model-config-sync) | 14 | ⚪ unknown | dsh-model-config-sync — DSH plugin (session) |
| [dsh-undo](https://github.com/LingLambda/dsh-undo) | 4 | ⚪ unknown | Context undo/redo plugin for DeepSeek Harness (dsh): roll the model context back to the last completed step and restore it again. |
| [dsh-session-timeline](https://github.com/XiLuovo/dsh-session-timeline) | 4 | ⚪ unknown | dsh-session-timeline — DSH plugin (session) |
| [dsh-plugins](https://github.com/Yihong89/dsh-plugins) | 3 | ⚪ unknown | DeepSeek Harness (DSH) plugins. First: dsh-usage-report — per-session token usage & estimated cost (/usage + usage_report), price… |
| [dsh-superpowers](https://github.com/codeAnqiang-ma/dsh-superpowers) | 4 | 🟢 ok | Superpowers (obra/superpowers) as a DeepSeek Harness plugin: the methodology skills plus their session bootstrap |
| [billion-context-dsh](https://github.com/Tyan66666/billion-context-dsh) | 43 | 🟢 ok | Model-driven context management (Active Context Pruning / ACP) for the DeepSeek Harness — the model decides when and what to comp… |
| [dsh-session-pins](https://github.com/alooshxl/dsh-session-pins) | 3 | ⚪ unknown | Persistent pinned-session menu for DeepSeek Harness |
| [dsh-cue-plugin](https://github.com/unnnnoooo/dsh-cue-plugin) | 6 | ⚪ unknown | dsh-cue-plugin — DSH plugin (session) |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 61 | 🟢 ok | Bounded, layered, approval-gated, auditable cross-session memory for DeepSeek Harness (capability seam: ctx.memory + SQLite provi… |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 3 | ⚪ unknown | dsh-archive-viewer — DSH plugin (session) |
| [dsh-memory](https://github.com/ben7am1n/dsh-memory) | 1 | 🟢 ok | Durable cross-session SQLite memory for DeepSeek Harness |
| [dsh-plugins](https://github.com/hyls9527/dsh-plugins) | 3 | ⚪ unknown | Ecosystem plugins for DeepSeek Harness: bounded cross-session memory and skill lifecycle curation, ported from hermes-agent. Tagg… |
| [dsh-opencode-usage](https://github.com/moduqishi/dsh-opencode-usage) | 1 | 🟢 ok | DeepSeek Harness (dsh web) plugin: opencode.ai 5h/week/month quota usage progress in the session header, frosted-glass detail pan… |
| [dsh-session-hub](https://github.com/Asaiuta/dsh-session-hub) | 5 | 🟢 ok | Aggregate and natively control multiple remote DeepSeek Harness (DSH) servers' sessions from one official Web UI — hub gateway +… |
| [dsh-memento](https://github.com/PerryLink/dsh-memento) | 61 | 🟢 ok | Bounded, layered, approval-gated, auditable cross-session memory for DeepSeek Harness (capability seam: ctx.memory + SQLite provi… |
| [dsh-archive-viewer](https://github.com/keepermttl/dsh-archive-viewer) | 3 | ⚪ unknown | dsh-archive-viewer — DSH plugin (session) |
| [dsh-codex-provider](https://github.com/Hu9956/dsh-codex-provider) | 8 | 🟢 ok | OpenAI Codex provider for DeepSeek Harness with device-code OAuth, Codex CLI import, token refresh, and a web settings panel. |
| [dsh-memory](https://github.com/Jesse-njx/dsh-memory) | 2 | 🟢 ok | Cited memory over DSH's lossless session log — distilled, human-auditable facts with citations back to the exact source events; m… |
| [dsh-workbench](https://github.com/echo-escape/dsh-workbench) | 1 | 🟢 ok | dsh-workbench — DSH plugin (session) |
| [dsh-codex-import](https://github.com/918154429/dsh-codex-import) | 1 | ⚪ unknown | Read-only Codex setup compatibility scanner for DeepSeek Harness |
| [dsh-session-pin](https://github.com/PerryLink/dsh-session-pin) | 3 | 🟢 ok | Pin sessions in the DeepSeek Harness (DSH) web sidebar - dual-face plugin with a hover pin badge, durable pinning, and top orderi… |
| [dsh-prompt-stash](https://github.com/Wine-Red/dsh-prompt-stash) | 3 | 🟢 ok | dsh-prompt-stash — DSH plugin (session) |
| [dsh-open-in-finder](https://github.com/moduqishi/dsh-open-in-finder) | 2 | ⚪ unknown | DeepSeek Harness (dsh web) plugin: one-click open-in-Finder icon in the session header. |
| [dsh-mcp-proxy](https://github.com/ben7am1n/dsh-mcp-proxy) | 1 | 🟢 ok | Context-cheap lazy MCP access for DeepSeek Harness |
| [dsh-nocturne-memory](https://github.com/RealAlexandreAI/dsh-nocturne-memory) | 2 | 🟢 ok | dsh memory: Nocturne Memory client for DeepSeek Harness |
| [dsh-balance](https://github.com/TwotwoPiggy/dsh-balance) | 9 | 🟢 ok | A DeepSeek Harness plugin for real-time token tracking and highly accurate session cost estimation, featuring dynamic peak/off-pe… |
| [dsh-mneme](https://github.com/modusensus/dsh-mneme) | 43 | ⚪ unknown | dsh-mneme — DSH plugin (session) |
| [dsh-cost-meter](https://github.com/Han-1413141/dsh-cost-meter) | 183 | 🟢 ok | dsh-cost-meter — DSH plugin (session) |
| [dsh-claude-mem](https://github.com/Bleed00/dsh-claude-mem) | 2 | ⚪ unknown | DeepSeek Harness plugin integrating claude-mem (memory for dsh) |
| [dsh-revive](https://github.com/omdsh-dev/dsh-revive) | 4 | ⚪ unknown | dsh-revive — DSH plugin (session) |
| [dsh-plugin-wepre](https://github.com/shujiTech/dsh-plugin-wepre) | 1 | ⚪ unknown | DeepSeek Harness plugin: publish single-screen content cards to WePre Next from a dsh agent session |
| [dsh-plugin-meta-memory](https://github.com/YYTbit/dsh-plugin-meta-memory) | 4 | 🟢 ok | Structured long-term memory system for DeepSeek Harness |
| [dsh-auto-review](https://github.com/PerryLink/dsh-auto-review) | 96 | 🟢 ok | Second-model AI auto-review for DeepSeek Harness approval requests: a read-only reviewer subagent returns structured allow/deny v… |
| [DeepSeek-Harness-for-VS-Code](https://github.com/NEXTINDIE/DeepSeek-Harness-for-VS-Code) | 7 | ⚪ unknown | Use DeepSeek Harness in VS Code like ChatGPT/Copilot: @dsh in native chat, standalone views, cross-project sessions, shared via D… |
| [dsh-plugin-context-compressor](https://github.com/YYTbit/dsh-plugin-context-compressor) | 1 | 🟢 ok | Context compression skill for DeepSeek Harness |
| [dsh-context-taxonomy](https://github.com/ArtificialNotImbecile/dsh-context-taxonomy) | 1 | ⚪ unknown | Logical-call context taxonomy plugin for DeepSeek Harness |
| [dsh-tdai-memory](https://github.com/Scorp1o117/dsh-tdai-memory) | 6 | ⚪ unknown | Agent memory for DeepSeek Harness | DeepSeek Harness 记忆插件 |
| [dsh-context-lens](https://github.com/gordonlu/dsh-context-lens) | 1 | 🟢 ok | Request Context Profiler for DeepSeek Harness — see what changed between model requests, and how cache reuse changed with it. |
| [dsh-plugin-session-import](https://github.com/huguangyu666/dsh-plugin-session-import) | 6 | 🟢 ok | DeepSeek Harness plugin: import claude-code / codex / reasonix / zcode sessions |
| [dsh-resume-plugin](https://github.com/Demogorgon314/dsh-resume-plugin) | 1 | ⚪ unknown | dsh-resume-plugin — DSH plugin (session) |
| [dsh-cost-ledger](https://github.com/suimi8/dsh-cost-ledger) | 2 | ⚪ unknown | Cross-session persistent cost ledger for DeepSeek Harness: logs every LLM token usage to SQLite and exposes record/query/budget t… |
| [dsh-plugin-codex-import](https://github.com/Gordonynh/dsh-plugin-codex-import) | 1 | ⚪ unknown | DeepSeek Harness plugin: import OpenAI Codex conversation history into DSH sessions via /codex-import | 用 /codex-import 把 Codex 历… |
| [dsh-continual-evolve](https://github.com/ZK-Andy/dsh-continual-evolve) | 14 | 🟢 ok | Continual self-evolution plugin for DeepSeek Harness: versioned, auditable, rollback-safe harness state refined from session traj… |
| [dsh-command-opt](https://github.com/csiroqa/dsh-command-opt) | 2 | ⚪ unknown | dsh-command-opt — DSH plugin (session) |
| [dsh-telemetry-redactor](https://github.com/030611/dsh-telemetry-redactor) | 3 | 🟢 ok | Fail-closed export-copy redaction for DeepSeek Harness session telemetry |
| [dsh-revdiff](https://github.com/BrambleXu/dsh-revdiff) | 3 | ⚪ unknown | Native interactive Git diff review for DeepSeek Harness with structured annotations sent back to the current Agent session. DeepS… |
| [dsh-usage-widget](https://github.com/xinmo114514/dsh-usage-widget) | 1 | ⚪ unknown | dsh-usage-widget — DSH plugin (session) |
| [dsh-balance-meter](https://github.com/Ghost011118/dsh-balance-meter) | 19 | 🟢 ok | DeepSeek account balance and session cost readout for the DeepSeek Harness Web GUI |
| [dsh-cost-chip](https://github.com/boNeXY226/dsh-cost-chip) | 4 | ⚪ unknown | dsh-cost-chip — DSH plugin (session) |
| [dsh-latex-tools](https://github.com/liuup/dsh-latex-tools) | 8 | 🟢 ok | ♾️ Copy and export the LaTeX in DeepSeek Harness 悬停任意 LaTeX 公式即可复制 TeX 源码或导出为独立的 SVG 文件 |
| [dsh-memory](https://github.com/Towzai/dsh-memory) | 3 | 🟢 ok | Cross-session memory plugin for DeepSeek Harness (dsh): embedding search + automatic system-prompt injection |
| [mindspace-dsh-session-memory](https://github.com/Spirtxiaoqi7/mindspace-dsh-session-memory) | 3 | ⚪ unknown | Editable, session-isolated personalization memory for DeepSeek Harness |
| [dsh-verification-receipt](https://github.com/030611/dsh-verification-receipt) | 4 | 🟢 ok | Privacy-minimal heuristic per-turn verification summaries for DeepSeek Harness |
| [dsh-auto-compact](https://github.com/wangxiang0605qvq/dsh-auto-compact) | 0 | ⚪ unknown | DeepSeek Harness 自动压缩插件：模型工具 compact_now，回合结束后自动压缩上下文 | Auto compaction plugin for DSH: compact_now tool, compacts context after… |
| [dsh-hotkeys](https://github.com/csiroqa/dsh-hotkeys) | 1 | ⚪ unknown | dsh-hotkeys — DSH plugin (session) |
| [dsh-plugin-jinji](https://github.com/quan2005/dsh-plugin-jinji) | 2 | ⚪ unknown | dsh-plugin-jinji — DSH plugin (session) |
| [dsh-memory](https://github.com/Amengclass/dsh-memory) | 0 | 🟢 ok | Persistent, model-editable memory/notes store for DeepSeek Harness. Adds memory_set/get/delete/search tools backed by ctx.storage… |
| [dsh-supervisor](https://github.com/Wha1eChai/dsh-supervisor) | 1 | 🟢 ok | Community control-plane plugin for DeepSeek Harness live sessions |
| [dsh-archive-viewer](https://github.com/csiroqa/dsh-archive-viewer) | 0 | ⚪ unknown | DSH archive enhancements: periodic archive, LLM summaries, session notes. |
| [dsh-plugin-asmemory](https://github.com/Xplore-LAB/dsh-plugin-asmemory) | 0 | ⚪ unknown | Action-State Memory Engine: typed time-series memory (states + actions) with trend/anomaly/causal analysis for DeepSeek Harness |
| [powercontext-dsh](https://github.com/knqiufan/powercontext-dsh) | 11 | ⚪ unknown | DeepSeek Harness plugin that connects to a PowerContext Server over HTTP for recall, memory, handoff, experience, and skills. |
| [dsh-balance-stats](https://github.com/pangzi499/dsh-balance-stats) | 2 | ⚪ unknown | Balance, session cost, token usage, and invoice summaries for DeepSeek Harness Web. |
| [dsh-session-import](https://github.com/kinyokun/dsh-session-import) | 4 | 🟢 ok | DSH 会话日志导入插件:解析 /export 的 zip/jsonl,结构真实性验证 + SHA-256 指纹校验,同步模型/预设/权限等状态,导入/删除实时推送免刷新 |
| [dsh-usage-plugin](https://github.com/Yihong89/dsh-usage-plugin) | 3 | ⚪ unknown | DeepSeek Harness (DSH) plugins. First: dsh-usage-report — per-session token usage & estimated cost (/usage + usage_report), price… |
| [DeepSeek-Harness-billing-plugin](https://github.com/WilliamLIiii/DeepSeek-Harness-billing-plugin) | 9 | ⚪ unknown | DeepSeek Harness billing plugin: account balance + per-model remaining-task estimator with a session-header badge |
| [dsh4vscode](https://github.com/DoggyHU/dsh4vscode) | 5 | ⚪ unknown | DSH Chat for VS Code — DeepSeek Harness chat windows inside VS Code (OpenCode-style independent sessions, model auto-routing) |
| [deepseek-billing-plugin](https://github.com/xinCodes/deepseek-billing-plugin) | 3 | ⚪ unknown | DeepSeek Harness (DSH) 插件：DeepSeek 官方 API 余额与当前会话费用估算 |
| [dsh-history](https://github.com/xuender/dsh-history) | 3 | 🟢 ok | Recall and re-run the current session's command history with ↑/↓ keys in the DSH Web composer. |
| [dsh-pin-recall](https://github.com/kerwin2046/dsh-pin-recall) | 2 | ⚪ unknown | DeepSeek Harness plugin: pin assistant replies and recall them into the model turn |
| [dsh-deepseek-billing](https://github.com/Jolly-J/dsh-deepseek-billing) | 4 | ⚪ unknown | DSH WebUI 插件:DeepSeek 余额显示与按会话费用估算 |
| [dsh-checkpoint](https://github.com/dpskh/dsh-checkpoint) | 2 | ⚪ unknown | Mark an exploration start in the session; pairs with rewind to fold the exploration out of context. |
| [dsh-plugin-sysmon](https://github.com/hnmrxz/dsh-plugin-sysmon) | 2 | ⚪ unknown | Local system resource monitor (CPU / memory / disk / load / uptime) for the DeepSeek Harness bottom status bar. |
| [dsh-worktrees](https://github.com/Alexis-fish/dsh-worktrees) | 1 | 🟢 ok | Git worktree isolation for parallel DeepSeek Harness sessions |
| [dsh-token-panel](https://github.com/juhe291/dsh-token-panel) | 7 | 🟢 ok | Real-time token consumption HUD plugin for DeepSeek Harness. Live token usage monitor, context pressure, cost estimation, history… |
| [dsh-plugin-usage-dashboard](https://github.com/hnmrxz/dsh-plugin-usage-dashboard) | 1 | ⚪ unknown | DeepSeek usage & cost dashboard for the DSH bottom status bar: per-session token/cost aggregation with low-balance budget alert. |
| [dsh-token-monitor](https://github.com/zhangzheng25/dsh-token-monitor) | 7 | ⚪ unknown | DeepSeek Harness plugin: token usage & conversation stats as a native settings page - today / 7d / 30d totals, GitHub-style 90-da… |
| [dsh-system-proxy](https://github.com/khiqwq/dsh-system-proxy) | 4 | ⚪ unknown | DSH host plugin - smart outbound HTTP(S) routing: named proxies (http/https/socks4/4a/5/5h), per-host/provider/plugin rules, dire… |
| [dsh-background-agents](https://github.com/PerryLink/dsh-background-agents) | 6 | 🟢 ok | Interactive long-session background agents for DeepSeek Harness: start a durable continuable child agent, watch its progress in t… |
| [dsh-rewind](https://github.com/dpskh/dsh-rewind) | 2 | 🟢 ok | Fold everything since the last checkpoint mark into an auto-generated report, replacing it in context while keeping the full log. |
| [dsh-side-chat](https://github.com/KarlOfLaw/dsh-side-chat) | 1 | 🟢 ok | Parent-session-aware side chat plugin for DeepSeek Harness |
| [dsh-slice-agent-loop](https://github.com/TT-Wang/dsh-slice-agent-loop) | 3 | ⚪ unknown | A drop-in DeepSeek Harness agent loop whose context engine is a bounded slice instead of a growing transcript |
| [dsh-model-router](https://github.com/tianji-qingtian/dsh-model-router) | 6 | 🟢 ok | Model router & cost optimizer for DeepSeek Harness: heuristic tier routing, failure fallback, and live per-session token/cache/co… |
| [dsh-everything-oauth](https://github.com/kam74515-boop/dsh-everything-oauth) | 2 | ⚪ unknown | Import local Codex / Grok / Claude / OpenCode / CC Switch logins into DeepSeek Harness |
| [dsh-agent-replay](https://github.com/forrestsweet/dsh-agent-replay) | 1 | ⚪ unknown | DeepSeek Harness 会话回放与脱敏分享插件：将真实 Agent 轨迹导出为独立交互 HTML，用于文档、演示和问题反馈。 |
| [dsh-memory-director](https://github.com/ljsysfurryACE/dsh-memory-director) | 0 | ⚪ unknown | MemoryDirector plugin for DeepSeek Harness: LLM-driven remember/forget (official harness has no memory) |
| [dsh-bottom-stats](https://github.com/318197375/dsh-bottom-stats) | 1 | ⚪ unknown | DSH plugin: full-width conversation stats line (no truncation) + context occupancy progress bar for the DeepSeek Harness web UI |
| [tmcra-deepseek-harness-memory](https://github.com/reshuibuduo/tmcra-deepseek-harness-memory) | 1 | ⚪ unknown | TMCRA Agent 长期记忆系统的 DeepSeek Harness 接入插件：自动延续跨对话项目记忆，并沉淀项目知识与工作经验。 |
| [dsh-skillradar](https://github.com/hellosky983/dsh-skillradar) | 3 | ⚪ unknown | Skill Radar for DeepSeek Harness (dsh): scan the current session's visible skills, score relevance against the conversation, and… |
| [dsh-plugin](https://github.com/Suxeca/dsh-plugin) | 5 | 🟢 ok | DSH 会话切换面板插件（Ctrl+K / Ctrl+[ ]，npm 可装）+ 插件开发模板 |
| [dsh-ui-progress](https://github.com/omdsh-dev/dsh-ui-progress) | 2 | ⚪ unknown | DSH Web UI 会话进度插件：输入框停靠区常驻会话进度条（todos 真实进度 / 实时 token 生成速率 / 中断橘红态 / 待办提醒），零核心改动 |
| [dsh-git-branch-switcher](https://github.com/mixin-ai/dsh-git-branch-switcher) | 0 | ⚪ unknown | DeepSeek Harness web plugin: git branch pill in the session header with UI branch switching |
| [dsh-plugins](https://github.com/NinjaSln-labs/dsh-plugins) | 1 | ⚪ unknown | DSH plugin collection: DeepSeek Harness community plugins (session-health, knowledge, ...) |
| [dsh-skill-evolve](https://github.com/dmsobtl/dsh-skill-evolve) | 0 | 🟢 ok | DSH 插件：Agent 自我进化引擎 — 从成功会话中自动提炼可复用 skill，越用越聪明。 |
| [dsh-mcp-adapter](https://github.com/NexusAgentX/dsh-mcp-adapter) | 1 | 🟢 ok | MCP adapter for DeepSeek Harness — one proxy tool instead of dumping every MCP schema into context. |
| [dsh-session-analyst](https://github.com/dmsobtl/dsh-session-analyst) | 1 | 🟢 ok | DSH 插件：Agent 会话质量分析 —— 工具成功率、token 效率、冗余调用检测、跨会话回归对比。PS：上传文件有点问题，等我重新整理下 |
| [dsh-tmcra-memory](https://github.com/reshuibuduo/dsh-tmcra-memory) | 1 | ⚪ unknown | TMCRA Agent 长期记忆系统的 DeepSeek Harness 接入插件：跨对话延续项目记忆，自动沉淀项目知识与工作经验。 |
| [dsh-plugin-cc](https://github.com/cpj-dev/dsh-plugin-cc) | 55 | ⚪ unknown | Bridge Deepseek-harness into Claude Code for review, critique, delegation, and session import. |
| [dsh-plugin-langfuse](https://github.com/linyp/dsh-plugin-langfuse) | 11 | 🟢 ok | Langfuse observability for DeepSeek Harness (dsh): exports agent sessions as OpenTelemetry trace trees (GenAI semconv) to Langfus… |
| [dsh-git-credentials](https://github.com/revive/dsh-git-credentials) | 2 | ⚪ unknown | DeepSeek Harness plugin: GitLab and GitHub API tokens stay out of the model context — encrypted at rest (AES-256-GCM), tools on d… |
| [dsh-usage-footer](https://github.com/1514100951/dsh-usage-footer) | 3 | ⚪ unknown | DSH web 用量/费用悬浮按钮插件：账户余额、峰谷时段、今日/本会话消费估算与 token 统计（含设置开关） |
| [dsh-usage-cost](https://github.com/fflow2023/dsh-usage-cost) | 1 | ⚪ unknown | Lightweight DeepSeek Harness plugin: per-session + global API cost stats (peak/off-peak pricing) |
| [dsh-daily-brief](https://github.com/Equinox7379/dsh-daily-brief) | 1 | ⚪ unknown | Daily activity brief for DSH: per-session turns/messages/tool-call stats. Read-only. |
| [dsh-netcafe](https://github.com/mario03690/dsh-netcafe) | 0 | ⚪ unknown | DeepSeek Harness bundle: adds AI NetCafé's hosted outcome tools (statement extraction with reconciliation, SQL dialect transpile,… |
| [dsh-codex-sync](https://github.com/DreamZhongJu/dsh-codex-sync) | 0 | 🟢 ok | Import DeepSeek-on-Codex chat history into DeepSeek Harness (dsh) |
| [dsh-fusion](https://github.com/omdsh-dev/dsh-fusion) | 2 | ⚪ unknown | 将多个 DeepSeek Harness 对话融合为一个可继续的会话，支持 Agent 智能剪枝、话题分组、内容排序和界面操作 |
| [dsh-better-chat-history](https://github.com/echo-xianyu/dsh-better-chat-history) | 2 | ⚪ unknown | A plugin for DSH to optimize session loading speed and reduce disk read/write consumption. |
| [dsh-subagent-status](https://github.com/zzy2210/dsh-subagent-status) | 0 | ⚪ unknown | DeepSeek Harness 常驻插件:在会话标题栏显示主代理与每个子代理实际使用的模型和思考档位 | Persistent DSH web plugin: shows the model & reasoning effort actually used… |
| [dsh-llmwiki](https://github.com/chancelu/dsh-llmwiki) | 2 | 🟢 ok | Local Markdown wiki as long-term memory for DeepSeek Harness — RRF-fused retrieval (keyword + wikilink graph + temporal), token-b… |
| [dsh-cookie-bridge](https://github.com/xiaoheizi1212/dsh-cookie-bridge) | 1 | ⚪ unknown | Chrome extension that exports plaintext cookies to dsh-computer-use over localhost (no App-Bound decryption needed). |
| [dsh-memory](https://github.com/U-Illll/dsh-memory) | 2 | 🟢 ok | Memory retrieval plugin for DeepSeek Harness (dsh): wiki double-link memory graph with 9 tools — hybrid search, read, link-scan,… |
| [dsh-token-usage](https://github.com/samecorner/dsh-token-usage) | 1 | 🟢 ok | DSH (DeepSeek Harness) web plugin — Token usage analytics tab for the conversation view (KPIs, context meter, donut, stacked per-… |
| [dsh-agentmemory](https://github.com/elementor-i/dsh-agentmemory) | 4 | ⚪ unknown | agentmemory for DeepSeek Harness (dsh): full memory_* tools, capture hooks, and context injection over the local REST server |
| [dsh-agent-compact](https://github.com/jonah791/dsh-agent-compact) | 2 | ⚪ unknown | Agent-driven compaction for DeepSeek Harness: the agent summarizes its own conversation (KV-cache friendly, no giant replay). Ver… |
| [dsh-multi-tenant](https://github.com/GuoMonth/dsh-multi-tenant) | 7 | 🟢 ok | Multi-tenant SaaS extension for DeepSeek Harness (DSH): tenant identity, session isolation, authorization, tenant-aware MCP, and… |
| [dsh-auto-memory](https://github.com/Aik358/dsh-auto-memory) | 33 | ⚪ unknown | DSH 自动记忆插件:三层记忆(用户级/项目笔记/每日日志)自动注入与检索、每日反思、可视化面板与设置页,支持继承其他 AI 工具的历史记忆。 |
| [dsh-sidebar-mode](https://github.com/Meredith2328/dsh-sidebar-mode) | 3 | ⚪ unknown | 把默认的四种模式切换塞进「新会话」按钮里，新会话创建更方便（标准/PTC/创造/极简，与设置双向同步） |
| [dsh-context](https://github.com/bowenliang123/dsh-context) | 1001 | 🟢 ok | A DeepSeek Harness plugin for Context insight panel — a Context tab in the web UI showing what the model's context window is made… |
| [dsh-sidechain](https://github.com/omdsh-dev/dsh-sidechain) | 8 | ⚪ unknown | DSH 侧会话插件：/side 持续性侧会话（Codex 风格）与 /btw 一次性侧问（Claude 风格）——在临时 fork 中运行、不写入主会话历史；Web UI 右侧链面板内嵌对话，主会话保持不变 |
| [dsh-provider-model-configurator](https://github.com/LiangYin233/dsh-provider-model-configurator) | 14 | ⚪ unknown | DSH 高级模型配置器：为 DeepSeek Harness 提供将 pi-ai 预设模型的上下文、输出上限、推理挡位一键应用到自定义提供商的能力。 |
| [dsh-plugin-deepseek-pricing](https://github.com/Dasooul03/dsh-plugin-deepseek-pricing) | 3 | ⚪ unknown | DSH Price Monitor（价格监控）· DeepSeek 实时定价、峰谷自动切换与会话费用监控的 dsh 插件 |
| [dsh-client-ui-monitor](https://github.com/Auran-Lu/dsh-client-ui-monitor) | 3 | ⚪ unknown | 用于监控当前会话额度消耗、预估费用及当前API余额/Used to monitor the current session's quota consumption, estimated costs, and current API balance. |
| [dsh-plugin-consult](https://github.com/biuboomc/dsh-plugin-consult) | 3 | ⚪ unknown | DeepSeek Harness peer-consult plugin: talk to a fork of another session without mutating the original |
| [dsh-better-archive](https://github.com/huahai0202/dsh-better-archive) | 8 | ⚪ unknown | DeepSeek Harness (DSH) web-GUI plugin: archived-session panel with unarchive & delete |
| [dsh-session-cost](https://github.com/ljcscp/dsh-session-cost) | 1 | 🟢 ok | Session cost & balance readout for DeepSeek Harness (DSH) Web GUI: official pricing, peak/off-peak hours, per-model costing |
| [dsh-archived-sessions](https://github.com/Zephyr-vibe/dsh-archived-sessions) | 19 | 🟢 ok | DSH Session Manager: manage conversations, archive/restore, delete safely, open record folders. |
| [dsh-session-cost](https://github.com/ChengChe106/dsh-session-cost) | 2 | 🟢 ok | DSH plugin: estimated DeepSeek API cost per session in the web GUI stats strip |
| [dsh-polling](https://github.com/cnyac/dsh-polling) | 1 | 🟢 ok | dsh-polling — 轮询任务/定时任务 plugin for DeepSeek Harness: cron scheduled tasks as real sessions, natural-language creation, model tool… |
| [dsh-session-export](https://github.com/yangyongzhen/dsh-session-export) | 4 | ⚪ unknown | Export DeepSeek Harness sessions to Markdown for review, blogging and audit. dsh plugin. |
| [dsh-tool-user-memory](https://github.com/IAMLieutenant/dsh-tool-user-memory) | 3 | 🟢 ok | DeepSeek Harness 用户记忆插件 |
| [dsh-session-export](https://github.com/bwndlct/dsh-session-export) | 3 | ⚪ unknown | Export DeepSeek Harness (DSH) sessions to portable Markdown and JSON — dsh plugin |
| [dsh-achievements](https://github.com/Blaczz/dsh-achievements) | 3 | ⚪ unknown | DeepSeek Harness achievement & gamification plugin: cross-session badges for turns, tool calls, sessions and daily streaks, with… |
| [dsh-plugin-balance](https://github.com/pythonshiyi/dsh-plugin-balance) | 1 | ⚪ unknown | 余额显示插件（DeepSeek Harness 网页端）：会话头部实时账户余额 | Live account balance for DeepSeek Harness web UI |
| [dsh-billing](https://github.com/TheTianzz/dsh-billing) | 7 | 🟢 ok | DeepSeek Harness plugin: 账户余额 + 会话费用（/balance /cost 命令、deepseek_billing 工具、Web UI 双胶囊），官方价格每 12 小时自动同步 |
| [dsh-archived-conversations](https://github.com/hxyz486/dsh-archived-conversations) | 6 | ⚪ unknown | 归档对话查看 (archived-conversation-viewer)：在 DSH 设置页查看、恢复与删除归档会话的 Cordis 插件 |
| [dsh-browser-playwright](https://github.com/ChenyuHeee/dsh-browser-playwright) | 5 | 🟢 ok | Snapshot-first Playwright browser automation for DeepSeek Harness: accessibility-tree interaction with stable refs, per-session b… |
| [dsh-session-deeplink](https://github.com/R3alloc/dsh-session-deeplink) | 6 | ⚪ unknown | DeepSeek Harness plugin for shareable session deep links |
| [dsh-personalize](https://github.com/Zephyr-vibe/dsh-personalize) | 5 | ⚪ unknown | Per-host personalization for DSH: custom instructions, local long-term memory, and reply-tone presets. |
| [dsh-stats-dashboard](https://github.com/1HelloMan1/dsh-stats-dashboard) | 4 | ⚪ unknown | DSH plugin: provider/model usage stats dashboard with response speed, call log, token totals, cache rate, cost estimates, CSV exp… |
| [dsh-client-pricing](https://github.com/Miyazawai/dsh-client-pricing) | 17 | ⚪ unknown | 会话顶栏实时显示 DeepSeek API 价格（峰谷定价 / 现行一口价，flash / pro 自动切换） | DeepSeek Harness client plugin: live DeepSeek API pricing badge (peak/o… |
| [dsh-session-audit](https://github.com/bwndlct/dsh-session-audit) | 4 | ⚪ unknown | Session execution analytics and audit reports for DeepSeek Harness — see how your agent actually worked |
| [dsh-gpu](https://github.com/zytsyj/dsh-gpu) | 3 | 🟢 ok | GPU-aware execution layer for DeepSeek Harness: gpu_status / gpu_exec / gpu_run_bg tools, auto card selection, per-step GPU conte… |
| [dsh-im-gateway](https://github.com/jelech/dsh-im-gateway) | 2 | 🟢 ok | An IM gateway for the DeepSeek Harness: bridge messengers into harness agent sessions and control them with slash commands. |
| [dsh-quote-annotate](https://github.com/wangwei-wade/dsh-quote-annotate) | 3 | 🟢 ok | DSH 会话选区引用与锚点批注插件：选中文字 → 批注 → 引用锚点 chip（点击跳回原文、悬停显示原文）。Contextual selection & anchored annotation plugin for DeepSeek Harness. |
| [Liltloom](https://github.com/Adkid-Zephyr/Liltloom) | 4 | ⚪ unknown | 语织：中文优先、用户可控的 AI 写作风格记忆层，让 AI 学会你的表达，需要时再调用。Chinese-first style memory for AI; DeepSeek Harness adapter included. |
| [dsh-ops-kit](https://github.com/LeslieWylie/dsh-ops-kit) | 3 | ⚪ unknown | A reusable DeepSeek Harness bundle for evidence-driven memory, orchestration, benchmark operations, and plugin release workflows. |
| [dsh-session-tree](https://github.com/ZhengQingJing/dsh-session-tree) | 3 | 🟢 ok | Git-like immutable session branching for DeepSeek Harness |
| [blender](https://github.com/CheshireJCat/blender) | 20 | ⚪ unknown | DeepSeek Harness plugin for complete Blender 3D modeling, reconstruction, rendering, validation, and export workflows |
| [dsh-usage-stats](https://github.com/lanlandeli/dsh-usage-stats) | 11 | 🟢 ok | DeepSeek Harness 精美 Token 数据面板：趋势图、活跃热力图、模型用量分析与 CSV/JSON 导出。 |
| [dsh-balance-tide](https://github.com/huanyuLv/dsh-balance-tide) | 8 | ⚪ unknown | DeepSeek Harness (DSH) Web 插件: 余额 + 峰谷计价潮汐提示。显示 DeepSeek 账户余额与本会话花费, 并在余额前提示当前峰/谷价格档位、距切换倒计时与使用建议。 |
| [dsh-plugin-window-stats](https://github.com/wellorbetter/dsh-plugin-window-stats) | 2 | ⚪ unknown | DSH web plugin: a cross-session dashboard showing conversation progress and token usage for all sessions. |
| [dsh-wanghong-handwritten-ppt](https://github.com/tjxj/dsh-wanghong-handwritten-ppt) | 3 | ⚪ unknown | 王虹学术手写风 PPT Skill for DeepSeek Harness · Notability-style HTML slides and PNG export |
| [dsh-task-planner](https://github.com/ztl34245881-commits/dsh-task-planner) | 4 | ⚪ unknown | Task planning with experience muscle-memory for DeepSeek Harness: condition-reflex recall + LLM capability matching + auto-persis… |
| [dsh-np-ppt](https://github.com/z953218350/dsh-np-ppt) | 3 | ⚪ unknown | 原生 DSH (DeepSeek Harness) 插件：PPT 演示文稿专家，内置 PPTD DSL 引擎、55173 所见即所得可视化编辑器、Python-PPTX 高保真离线编译内核与一键导出 PPTX。 | Native DSH plugin: PP… |
| [deepseek-harness-external-migration](https://github.com/buguoshixc/deepseek-harness-external-migration) | 4 | ⚪ unknown | **DeepSeek-Harness Migration Plugin** 是一款专为 [DeepSeek-Harness](https://github.com/deepseek-ai/deepseek-harness) 设计的插件，旨在帮助开发者无缝迁移… |
| [dsh-side-chat](https://github.com/heartmove/dsh-side-chat) | 12 | ⚪ unknown | 一个 DSH 网页插件：在对话中选中部分内容后，即可在 侧边聊天里提问 —— 侧边聊天是位于右侧面板、按发起它的主会话隔离的独立聊天。 |
| [dsh-client-ui-voice-input](https://github.com/zjzqs/dsh-client-ui-voice-input) | 2 | ⚪ unknown | DeepSeek Harness (dsh) Web UI plugin: voice input + prompt optimization for the composer. 语音输入 + 提示词优化（Web Speech API，宿主端 LLM 优化，… |
| [dsh-gzip](https://github.com/040822/dsh-gzip) | 2 | ⚪ unknown | dsh-gzip插件：压缩API响应，降低带宽占用，解决低速网络下历史加载失败问题 |
| [pa-dsh](https://github.com/ConradLu2740/pa-dsh) | 1 | ⚪ unknown | ProactiveAgent × DeepSeek Harness 插件组：把主动记忆 + 主动建议接入 DSH（6 个 cordis 插件，引擎零重写） |
| [deepseek-harness-wallet](https://github.com/feibi-mochi/deepseek-harness-wallet) | 65 | 🟢 ok | Balance monitoring, per-session spend & token tracking, low-balance alerts, and an official recharge shortcut for DeepSeek Harnes… |
| [dsh-import-agents](https://github.com/Chang-Tong/dsh-import-agents) | 12 | 🟢 ok | Import pi / opencode / codex / claude-code sessions, chat history, and agents into DeepSeek Harness — one-click Sync button, slas… |
| [dsh-requirements-alignment](https://github.com/jiezeng2004-design/dsh-requirements-alignment) | 8 | 🟢 ok | Lightweight requirement alignment for DeepSeek Harness — align important decisions before execution without a full spec workflow. |
| [prompt-optimizer](https://github.com/x118111/prompt-optimizer) | 2 | ⚪ unknown | A DeepSeek Harness (DSH) dynamic plugin that adds an ✨ optimize-prompt button to the chat composer — context-aware LLM rewriting… |
| [dsh-btw](https://github.com/iyllyt/dsh-btw) | 7 | 🟢 ok | 个人很喜欢 Claude Code 的 /btw，于是为 DSH 做了复刻：共享当前上下文快速旁路提问，不中断主任务，也不写入主会话历史。 |
| [dsh-balance](https://github.com/LemCAE/dsh-balance) | 4 | 🟢 ok | 一个适用于deepseek-harness的插件，功能是显示当前账户余额以及当前会话预估的费用消耗 | A plugin for deepseek-harness that displays the current account balance and t… |
| [dsh-teacher](https://github.com/Yihong89/dsh-teacher) | 3 | ⚪ unknown | DSH teacher plugin: Socratic tutor that leads you to answers from a markdown question set, tracks knowledge gaps in-session, and… |
| [dsh-bookmarks](https://github.com/penguin-oo/dsh-bookmarks) | 12 | 🟢 ok | Bookmark assistant replies in DeepSeek Harness: per-message bookmarks with notes/tags, a cross-session center, and one-click Mark… |
| [dsh-usage-plugin](https://github.com/feiyang-dev/dsh-usage-plugin) | 35 | ⚪ unknown | DeepSeek Harness 用量与消耗插件（dsh-usage）—— 每次调用的 token 用量/缓存命中统计、峰谷计费、余额查询、CSV/JSON/PNG 导出，可经桌面端一键安装或命令行 dsh plugin add 安装。 |
| [dsh-billing-glass](https://github.com/linkingoscar/dsh-billing-glass) | 3 | ⚪ unknown | Liquid-glass billing overlay for the DeepSeek Harness Web GUI: provider balances, session cost, daily spend and token buckets. De… |
| [dsh-memory](https://github.com/FuRongJun-1999/dsh-memory) | 35 | 🟢 ok | Multi-agent spatiotemporal memory graph for DeepSeek Harness.Cross-session persistence, knowledge flywheel, importance-gated memo… |
| [dsh-noema](https://github.com/ZSeven-W/dsh-noema) | 125 | 🟢 ok | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| [dsh-memoir](https://github.com/Qinling-Melon-Farmers/dsh-memoir) | 21 | ⚪ unknown | DSH 项目持久化记忆插件（TypeScript）：会话归纳 + 经验教训沉淀，写入 PROJECT_MEMORY.md 与全局索引；每轮工作结束自动提醒蒸馏、自动注入未来 AGENTS；附 Web GUI 记忆面板（项目/全局 tab、检索、手动记录/删除… |
| [dsh-LorebookMD](https://github.com/609476965/dsh-LorebookMD) | 17 | 🟢 ok | DSH lorebook-driven fiction writer plugin: import Tavern/SillyTavern character cards & world books, save local Markdown settings,… |
| [DSH-recall-plugin](https://github.com/limbo947/DSH-recall-plugin) | 25 | 🟢 ok | DSH 消息撤回插件：回到发送该消息时的状态 |
| [dsh-balance](https://github.com/deepforce/dsh-balance) | 2 | 🟢 ok | DSH plugin: /balance command + composer-dock balance readout with top-up link & session-cost estimate |
| [dsh-of-your-own](https://github.com/LaplaceYoung/dsh-of-your-own) | 2 | ⚪ unknown | /fuck — migrates your Claude Code & Codex habits into DeepSeek Harness. One command, parallel scan, boot-time recall. |
| [dsh-mcp-bridge](https://github.com/Edge-Echo/dsh-mcp-bridge) | 5 | 🟢 ok | Curated, verified MCP server bundle for DeepSeek Harness (dsh): one install brings demo, memory, filesystem, GitHub, Playwright a… |
| [dsh-client-ui-side-tasks](https://github.com/uluckystar/dsh-client-ui-side-tasks) | 2 | ⚪ unknown | DSH 侧边任务插件:主对话右侧临时任务面板(fork 子会话,删除零残留)。by MyDSH 社区 (mydsh.dev) |
| [dsh-headroom](https://github.com/wjxn13/dsh-headroom) | 4 | ⚪ unknown | Headroom context-compression proxy integration for DeepSeek Harness: detect/install/start Headroom, auto-configure the DeepSeek c… |
| [dsh-mcp-lens](https://github.com/labmimors/dsh-mcp-lens) | 5 | 🟢 ok | Shrink MCP context in DeepSeek Harness: 1,000 remote tools behind 2 exact-schema interfaces, with a measured V4 Flash cost pilot. |
| [dsh-subagent-admission](https://github.com/yha9806/dsh-subagent-admission) | 3 | ⚪ unknown | Shared lifecycle admission protocol and reference policy kernel for DeepSeek Harness subagents. |
| [dsh-browser](https://github.com/wqty123/dsh-browser) | 22 | 🟢 ok | Shared real browser plugin for DeepSeek Harness |
| [dsh-chatgpt-bridge](https://github.com/jiezeng2004-design/dsh-chatgpt-bridge) | 12 | 🟢 ok | MCP bridge that lets ChatGPT create, view, continue, and control DeepSeek Harness (DSH) agent sessions. |
| [dsh-cloak-browser](https://github.com/maxiaovivi/dsh-cloak-browser) | 5 | ⚪ unknown | Native CloakBrowser tools for DeepSeek Harness: isolated browser sessions, snapshots, interaction, screenshots, and safe Agent ro… |
| [dsh-files](https://github.com/taxueseek/dsh-files) | 22 | ⚪ unknown | DeepSeek Harness dual-face plugin: session-isolated file upload with colorful composer cards + read_document tool (text/PDF/DOCX/… |
| [session-archive-manager](https://github.com/my-dsh-plugin/session-archive-manager) | 2 | ⚪ unknown | DeepSeek Harness 插件：在设置中查看并管理归档会话，支持取消归档、删除、批量删除与全量删除。Manage archived sessions from DeepSeek Harness Settings: view, unarchive, d… |
| [dsh-memoryhub](https://github.com/solknight48/dsh-memoryhub) | 3 | ⚪ unknown | MemoryHub (mh) plugin for DeepSeek Harness (dsh): auto-loads checkpoint memory on session start, adds mh_* tools and the mh skill… |
| [dsh-mermaid](https://github.com/AKS1st/dsh-mermaid) | 10 | ⚪ unknown | 在 DSH Web 会话中把 Mermaid 代码围栏渲染为 SVG 图表 | Render Mermaid code fences as SVG diagrams in DSH Web messages |
| [dsh-voice](https://github.com/3274375092/dsh-voice) | 6 | ⚪ unknown | DeepSeek Harness 的语音输入插件:网页里点 🎤(或按Ctrl+空格)说话,识别文本作为普通消息提交进会话。纯输入,与 agent preset/人设完全解耦,任何模式下都只是"另一种输入法"。 |
| [dsh-data-ledger](https://github.com/Niuniu-Sir/dsh-data-ledger) | 2 | ⚪ unknown | 数据台账：DeepSeek Harness 本地数据统一看板——对话/账本/技能/记忆/日志的来源、位置与内容摘要，回收站删除、浏览器存储清理（dsh-plugin） |
| [dsh-hermes-memory-bridge](https://github.com/GLFzr/dsh-hermes-memory-bridge) | 2 | ⚪ unknown | Bridge DeepSeek Harness (DSH) session compaction summaries into Hermes Agent persistent memory. 把 DSH 会话压缩总结自动桥接进 Hermes 永久记忆。 |
| [dsh-cost-balance](https://github.com/zoumutou/dsh-cost-balance) | 2 | 🟢 ok | DeepSeek Harness 插件：输入框下方 iOS 风格统计条——会话花费、账户余额、缓存命中、Token 用量一键展开 |
| [dsh-token-pricing](https://github.com/LightClear/dsh-token-pricing) | 2 | 🟢 ok | DeepSeek Harness模型定价插件 · 配置token价格并显示会话费用 | Token pricing plugin for DeepSeek Harness — per-model token rates with a live convers… |
| [dsh-delete-session](https://github.com/dream12347/dsh-delete-session) | 49 | ⚪ unknown | Delete DSH conversation sessions from a Settings panel/在设置面板中增加删除会话管理以便删除无用会话 |
| [dsh-md-preview](https://github.com/LeslieWylie/dsh-md-preview) | 2 | 🟢 ok | Render Markdown to standalone, self-contained HTML in the DeepSeek Harness — an md_html_render tool that works headless, plus a p… |
| [dsh-Friend](https://github.com/wanghehe123/dsh-Friend) | 2 | ⚪ unknown | 人格化伴侣插件 for DeepSeek Harness：角色卡、语音、Live2D、本地记忆与工作陪伴。 |
| [dsh-web-mobile](https://github.com/mexiaosqwq/dsh-web-mobile) | 56 | ⚪ unknown | DeepSeek Harness Web UI 移动端适配插件:窄屏下侧边栏变为 overlay 抽屉,会话独占全宽。 |
| [dsh-habits](https://github.com/DimitriLIAN/dsh-habits) | 2 | ⚪ unknown | Habits editor for DeepSeek Harness — edit the user-global AGENTS.md from Web settings, injected into every session |
| [dsh-failure-capsule](https://github.com/YiHarvest/dsh-failure-capsule) | 4 | 🟢 ok | Local-first failure evidence capsules for DeepSeek Harness sessions |
| [dsh-recall-plugin](https://github.com/limbo947/dsh-recall-plugin) | 25 | 🟢 ok | DSH 消息撤回插件：回到发送该消息时的状态 |
| [DSHBox](https://github.com/Nexus-Aethra/DSHBox) | 29 | ⚪ unknown | Manage DeepSeek Harness locally: run multiple DSH versions in isolated containers, open the UI in an embedded WebView, import plu… |
| [dsh-memory-manager](https://github.com/tuanmaoOVO/dsh-memory-manager) | 2 | ⚪ unknown | dsh的记忆管理 |
| [dsh-chat-tools](https://github.com/yj060464-commits/dsh-chat-tools) | 3 | ⚪ unknown | DeepSeek Harness headless 终端伴侣工具链：chat.sh 连续对话 REPL（决策点拍板/工作流实时透传/思考档位切换）+ 会话日志自动总结，零依赖纯 bash+Python |
| [dsh-memory-system](https://github.com/zhujunpeng12/dsh-memory-system) | 8 | ⚪ unknown | Local-first persistent memory infrastructure for DeepSeek Harness: hot bootstrap, Chinese-BM25 cold recall, lease-lock transactio… |
| [dsh-sysmon](https://github.com/AKS1st/dsh-sysmon) | 3 | ⚪ unknown | DSH Web 系统状态悬浮窗：实时 CPU/内存/磁盘占用率 | System-status overlay showing live CPU, memory and disk usage for DSH Web |
| [dsh-archived-sessions](https://github.com/MuWinds/dsh-archived-sessions) | 6 | 🟢 ok | DeepSeek Harness 插件-归档会话管理，支持释放、清除归档会话 |
| [dsh-roleplay-preset](https://github.com/oliblue-evan/dsh-roleplay-preset) | 16 | ⚪ unknown | DeepSeek 深度调校的沉浸式角色扮演 Agent 预设（dsh）——零工具纯对话、酒馆式演出格式、文件记忆库 |
| [dsh-plugin](https://github.com/loongsuite/dsh-plugin) | 16 | 🟢 ok | OpenTelemetry tracing for DeepSeek Harness (dsh): turns each agent turn into a GenAI span tree — steps, LLM calls with TTFT, tool… |
| [dsh-Remote](https://github.com/Blank-not-black/dsh-Remote) | 21 | 🟢 ok | DSH Remote · 口袋里的 DSH 控制台 会话 · 审批 · 提问 · 文件传输，局域网 / Tailscale 直连 多服务器自动选优，聊天记录离线可看 带 Token 鉴权，数据只在你的设备之间流动 |
| [dsh-agentsoul](https://github.com/yuhui-sama/dsh-agentsoul) | 3 | ⚪ unknown | Local personality, memory and distillation layer for DeepSeek Harness — SOUL/IDENTITY/USER/STATE persona files, cross-session mem… |
| [dsh-prompt-rail](https://github.com/Zzzzkd/dsh-prompt-rail) | 7 | ⚪ unknown | Prompt Rail 是 DeepSeek Harness Web 会话页的紧凑纵向提示词快速跳转条。每一条横杠对应一条当前已加载的普通用户提示词。悬停或键盘聚焦会展示预览；点击会滚动跳转到对应提示词。 |
| [dsh-ocgo-lite](https://github.com/OK-wx/dsh-ocgo-lite) | 10 | ⚪ unknown | OpenCode Go 用量常驻条：套餐余量圆环 + token/花费实时统计（本次会话/全部范围 + 按模型联动，官方实时定价），一键复制 API Key。OpenCode Go usage bar for DeepSeek Harness. |
| [dsh-openviking](https://github.com/Rxiain/dsh-openviking) | 9 | ⚪ unknown | 面向 DeepSeek Harness 的 OpenViking 检索、资源管理、自动召回与会话记忆插件 |
| [dsh-all-warmup](https://github.com/brunhildzhou/dsh-all-warmup) | 3 | ⚪ unknown | Global frictionless warm-up layer plugin for DeepSeek Harness | DeepSeek Harness 全局无感热身层插件：任何会话首轮自动热身，第二轮起恢复完整模式 |
| [dsh-session-link](https://github.com/PwnKY/dsh-session-link) | 5 | 🟢 ok | DeepSeek Harness 的 Codex 式会话深度链接插件：dsh:// 深链，跨对话读取上下文 |
| [dsh-agent-compact](https://github.com/MimicHunterZ/dsh-agent-compact) | 4 | ⚪ unknown | DSH plugin for agent-driven span compaction: compress chosen conversation spans into self-written checkpoints instead of the offi… |
| [dsh-apex-standard](https://github.com/rinDBeans/dsh-apex-standard) | 10 | ⚪ unknown | DeepSeek V4 Pro/Flash unified anchored agent preset for DeepSeek Harness (official API & opencode-go): two-stage RL-aligned boots… |
| [dsh-self-improved](https://github.com/madage/dsh-self-improved) | 7 | 🟢 ok | DeepSeek Harness long-term memory & self-evolving plugin: L0 capture -> L1 memory extraction -> L2 scene grouping -> L3 user pers… |
| [dsh-bottom-info-bar](https://github.com/songoao25/dsh-bottom-info-bar) | 14 | ⚪ unknown | Bottom Info Bar — an information bar plugin for DeepSeek Harness: provider/model, live balance, peak/off-peak pricing with countd… |
| [dsh-board](https://github.com/dfkai/dsh-board) | 7 | ⚪ unknown | DeepSeek Harness 侧栏用量与成本面板：官方峰谷计价 · 1M 上下文 · 词勋段位 · 成就与热力图 |
| [dsh-web-remote](https://github.com/godchen520/dsh-web-remote) | 7 | ⚪ unknown | DSH 手机/外网远程访问插件：Cloudflare Quick Tunnel 公网隧道 + token 鉴权 + gzip 压缩 + 局域网 HTTPS 直连 + 手机图标面板 + QQ 机器人取链接 |
| [dsh-agent-memory](https://github.com/Culeot/dsh-agent-memory) | 6 | 🟢 ok | Cross-session long-term memory plugin for DeepSeek Harness (DSH) |
| [deepseek-harness-control-center](https://github.com/feibi-mochi/deepseek-harness-control-center) | 65 | ⚪ unknown | DeepSeek Harness account monitoring, usage accounting, completion alerts, official recharge, flexible layout, and agent-assisted… |
| [dsh-engram-relay](https://github.com/yjh051108/dsh-engram-relay) | 5 | ⚪ unknown | dsh-engram-relay 公开镜像（上游：dsh-external/dsh-engram-relay）：跨会话分层记忆 + 哈希×语义×因果超稀疏唤醒，13 个 engram_* 工具，BSD-3-Clause |
| [deepddw](https://github.com/ccch713/deepddw) | 8 | ⚪ unknown | Memory & Knowledge Base for DeepSeek Harness — reachable from any device on your LAN |
| [dsh-session-context-menu](https://github.com/baihejiangnan/dsh-session-context-menu) | 19 | ⚪ unknown | 更好的右键：DeepSeek Harness 应用封装端的完整原生风格上下文菜单 |
| [dsh-client-ui-obsidian-memory](https://github.com/detongz/dsh-client-ui-obsidian-memory) | 13 | 🟢 ok | deepseek harness plugin obsidian memory |
| [dsh-change-review](https://github.com/cirelir/dsh-change-review) | 10 | ⚪ unknown | DeepSeek Harness 会话修改审查插件：追踪会话内 write/edit，diff 对比展示，会话隔离/子代理聚合/SSE 实时推送/颜色自定义 |
| [dsh-agent-team-room](https://github.com/ishuowang/dsh-agent-team-room) | 6 | ⚪ unknown | Native DSH rooms for connecting independent Sessions and provider-backed AI members—without bundled roles or scenarios. |
| [dsh-model-meta-autofill](https://github.com/QJAG1024/dsh-model-meta-autofill) | 4 | 🟢 ok | DSH plugin: auto-fill metadata (context window, output cap, display name, input modalities) for custom-provider models from the M… |
| [dsh-JujutsuKaisen-rainlove](https://github.com/haxi8/dsh-JujutsuKaisen-rainlove) | 4 | ⚪ unknown | 听雨的声音 一滴滴清晰， 你的呼吸像雨滴渗入我的爱里， 真希望 雨能下不停， 让想念继续 让爱变透明， 我爱上 给我 勇气的 Rainie Love， 窗外的雨滴 一滴滴 累积， 屋内的湿气 像储存爱你的记忆， 真希望 雨能下不停， 雨爱的秘密 能一直延续，… |
| [memtrace-public](https://github.com/syncable-dev/memtrace-public) | 462 | ⚪ unknown | Structural memory for AI coding agents. Bi-temporal graph, MCP-native, zero LLM calls. Cursor · Claude Code · Codex · DeepSeek Ha… |
| [dsh-session-pause](https://github.com/watericetangcw/dsh-session-pause) | 4 | ⚪ unknown | A Cordis plugin for DeepSeek Harness that suspends the entire conversation state and resumes it after restart. |
| [dsh-island](https://github.com/cdxiaodong/dsh-island) | 7 | ⚪ unknown | 把 DeepSeek Harness(DSH) agent 实时状态桥接到 CodeIsland 刘海面板 — sessions/tools/approvals on the Dynamic Island |
| [dsh-status-bar](https://github.com/Starlight-bananice/dsh-status-bar) | 6 | ⚪ unknown | Know what your agent is doing at a glance — 17-segment configurable status bar for DeepSeek Harness: status/model/context/tokens/… |
| [dsh-remote](https://github.com/xgone/dsh-remote) | 47 | 🟢 ok | Remote access for DeepSeek Harness: account/password auth + MFA (TOTP) login gate, signed session cookies, role-based access, in-… |
| [dsh-chinese-mode](https://github.com/dawnliming/dsh-chinese-mode) | 9 | ⚪ unknown | DSH global Chinese-mode toggle: a 中 switch in the input box; when on, a Simplified-Chinese requirement is injected into every ses… |
| [dsh-miraculous-standard](https://github.com/rinDBeans/dsh-miraculous-standard) | 10 | ⚪ unknown | DeepSeek V4 Pro/Flash unified anchored agent preset for DeepSeek Harness (official API & opencode-go): two-stage RL-aligned boots… |
| [dsh-acp](https://github.com/dushaobindoudou/dsh-acp) | 6 | ⚪ unknown | Agent Client Protocol (ACP) server plugin for the DeepSeek Harness (dsh) - drive dsh agents from Zed, any ACP v1 client, or the b… |
| [dsh-token-viewer](https://github.com/qwert702/dsh-token-viewer) | 6 | ⚪ unknown | Developer tool: live token usage & cost monitoring for DeepSeek Harness - consumed tokens for the current session and across all… |
| [tencentcloud-agentobs-sdk-dsh](https://github.com/TencentCloud/tencentcloud-agentobs-sdk-dsh) | 7 | ⚪ unknown | tencentcloud-agentobs-sdk-dsh 是一个 DeepSeek Harness (DSH) 可观测插件，直接将 GenAI trace 数据上报到腾讯云日志服务 (CLS)。 它观察 DSH 原生的 session、agent loop… |
| [dsh-quota-meter](https://github.com/ai-shushu/dsh-quota-meter) | 13 | ⚪ unknown | Per-session quota meter for DSH: real-token billing, live progress bar, budget blocking, configurable multi-model pricing. 会话额度监控… |
| [dsh-plugin-merge-tool-calls](https://github.com/HuanLinOTO/dsh-plugin-merge-tool-calls) | 7 | ⚪ unknown | 把 WebUI 会话流中连续相邻的同工具调用合并为「主卡片+紧凑子行」树状展示，默认覆盖所有内置通用行工具 | Merges consecutive same-tool calls in the WebUI chat flow into a main-car… |
| [MemOS](https://github.com/MemTensor/MemOS) | 10952 | ⚪ unknown | Self-evolving memory OS for LLM & AI Agents: ultra-persistent memory, hybrid-retrieval, and cross-task skill reuse, with 35.24% t… |
| [dsh-plugin-bridge](https://github.com/Totoro-qaq/dsh-plugin-bridge) | 125 | ⚪ unknown | Cross-preset session migration for DeepSeek Harness: fixed-schema handoff summaries instead of bypassing the preset lock. 26-run… |
| [dsh-eli-mode](https://github.com/CeilCelia/dsh-eli-mode) | 5 | 🟢 ok | Eli Mode is an agent preset for DeepSeek Harness built around wiki-driven long-term memory and skills, on an extremely minimal Ha… |
| [dsh-trace-compare](https://github.com/lamost423/dsh-trace-compare) | 44 | 🟢 ok | Trace Compare & Live Maze for DeepSeek Harness: visualize agent exploration (main path, detours, backtracks) from session logs or… |
| [dsh-sandbox-escalation-fix](https://github.com/JUSTMONIKA2022/dsh-sandbox-escalation-fix) | 22 | ⚪ unknown | Session-aware sandbox escalation compatibility plugin for DeepSeek Harness/DSH第三方模型会话沙箱升级兼容插件 |
| [dsh-nested-followups](https://github.com/sluminositys/dsh-nested-followups) | 15 | 🟢 ok | Ask a follow-up on any past answer in an isolated branch, keeping your main conversation clean. 针对任意历史回答发起追问，新问题在独立分支中展开，主对话保持干净。… |
| [dsh-turn-delete](https://github.com/hanshenmesen/dsh-turn-delete) | 80 | 🟢 ok | Delete one complete turn from a DeepSeek Harness session without deleting the session |
| [dsh-tavern](https://github.com/chen731215-dev/dsh-tavern) | 31 | ⚪ unknown | DSH 原生酒馆管理面板，入口：设置 → 通用设置 → 酒馆管理（原生）。多角色卡/多世界书/多预设，会话级预设隔离；世界书智能关键词注入省 60-70% 上下文；记忆总结 + 角色关系网；剧情选项一键发送；创作/扮演双模式；NSFW 成人模式。免费非商用（… |
| [dsh-qq-bridge](https://github.com/xiaomengxinbb/dsh-qq-bridge) | 7 | 🟢 ok | 将 QQ（私聊+群聊）接入 DeepSeek Harness 的双向桥插件：每个 QQ 对话一个隔离持久 Agent 会话，支持命令/审批/多媒体/出站文件 |
| [dsh-replay](https://github.com/MingoZhou/dsh-replay) | 9 | ⚪ unknown | Agent 会话的时光机。 一个 DeepSeek Harness 插件,把 append-only 会话日志变成可交互的回放:可播放的时间线 + 逐步 token 账单、安全审计视图、fork 血缘树、双会话对比 —— 全部内嵌在 Harness 的 We… |
| [dsh-plugin-uw](https://github.com/lcgash/dsh-plugin-uw) | 9 | ⚪ unknown | Merge multiple directories into one DSH session with configurable write scopes: primary only, all members via common ancestor, or… |
| [dsh-honcho-sync](https://github.com/nanpaidashi/dsh-honcho-sync) | 6 | ⚪ unknown | DSH plugin: auto-sync conversation turns to Honcho memory service |
| [dsh-input-traffic](https://github.com/drscrewdriver/dsh-input-traffic) | 3 | 🟢 ok | Busy-time input queue for the DSH Web GUI: three-tier (now/next/later) planning, drag-to-reorder, interject/interrupt, batch clea… |
| [dsh-task-memory](https://github.com/wangyihao0001-oss/dsh-task-memory) | 6 | ⚪ unknown | Task-isolated long-term memory for DeepSeek Harness — remember / recall / search stay inside one task boundary. |
| [dsh-recall-unread](https://github.com/hg1048596-pixel/dsh-recall-unread) | 46 | ⚪ unknown | DeepSeek Harness (DSH) 插件：在模型读取前撤回已发送的文字消息，支持单条与全部撤回。A DeepSeek Harness plugin that recalls sent-but-unread text messages before… |
| [dsh-config-manager](https://github.com/xiajiajun516/dsh-config-manager) | 20 | ⚪ unknown | Backup / export / import / migrate your DeepSeek Harness (DSH) configuration - dual-face Cordis plugin (host engine + Web UI). On… |
| [dsh-archive-manager](https://github.com/MichengAI/dsh-archive-manager) | 15 | 🟢 ok | DSH Archive Manager 基于 DeepSeek Harness 的归档会话管理插件 |
| [dsh-rewind](https://github.com/SiriLee/dsh-rewind) | 11 | 🟢 ok | DeepSeek Harness plugin: in-place conversation rewind in the same session window (Claude Code /rewind semantics) + optional file… |
| [dsh-Mmem](https://github.com/mianyoubiaoqing/dsh-Mmem) | 7 | ⚪ unknown | 这是一个支持同dsh进程多记忆空间的dsh记忆插件 |
| [dsh-strata](https://github.com/jsdvjx/dsh-strata) | 12 | ⚪ unknown | Session strata for the DeepSeek Harness Web GUI: the transcript's scrollbar becomes a to-scale, colour-coded map of the whole run… |
| [dsh-capability-menu](https://github.com/PKUfudawei/dsh-capability-menu) | 18 | ⚪ unknown | Unified capability menu for DeepSeek Harness: manage exposure level (context footprint) and execution mode of MCP tools & skills… |
| [dsh-talk-map](https://github.com/Tasihi89/dsh-talk-map) | 22 | ⚪ unknown | Visual conversation map for DeepSeek Harness — sessions as cards on a whiteboard: drag to arrange, double-click to chat, draw an… |
| [dsh-flowglass](https://github.com/Iwctwbh/dsh-flowglass) | 11 | ⚪ unknown | 流镜 Flowglass — DeepSeek Harness session flowgraph，实时可视化消息、工具组、子代理分支与步骤详情。 |
| [dsh-compaction-instant](https://github.com/TsFreddie/dsh-compaction-instant) | 9 | ⚪ unknown | LLM-free lossless* compaction engine for DeepSeek Harness |
| [dsh-multiple-chat-panels](https://github.com/WilliamShi666/dsh-multiple-chat-panels) | 9 | ⚪ unknown | DeepSeek Harness 多对话面板：并排查看并与多个 Agent 会话同时交互。 |
| [dsh-wallpaper_share](https://github.com/YRN-playmaker/dsh-wallpaper_share) | 9 | ⚪ unknown | 一键同步壁纸引擎各类动态场景壁纸的插件，设置应用启动项。A "wallpaper engine" synchronization plugin mounted on the deepseek harness can synchronize static wa… |
| [dsh-adult-tension](https://github.com/daha1216/dsh-adult-tension) | 9 | ⚪ unknown | DeepSeek Harness 成年人(18+/adult)互动叙事 Skill：NPC 活人感（有记忆/立场/底线）、自带破甲、数百项素材库、随机开局可预锁、时间推进、全维 YAML 存档。 |
| [dsh-novel-writer](https://github.com/siweina/dsh-novel-writer) | 7 | ⚪ unknown | DSH / DeepSeek Harness 小说写作助手插件：章节库管理、句式模式分析（九类句式/情感曲线/风格指纹）、风格自检、伏笔登记、批量导入、续写辅助。Novel writing assistant plugin for DeepSeek Harn… |
| [dsh-sessions-manager](https://github.com/TOBYCAI/dsh-sessions-manager) | 0 | ⚪ unknown | Session manager in DSH settings: archive/restore/hard-delete/move to other workspace, with workspace tags and session dates. |
| [dsh-session-search-toggle](https://github.com/drscrewdriver/dsh-session-search-toggle) | 1 | ⚪ unknown | DSH web sidebar session-search enhancement: one-click toggle between title search and content search; content results aggregated… |
| [dsh-what-changed](https://github.com/sjh9714/dsh-what-changed) | 2 | ⚪ unknown | Review every file the agent wrote this session in the top bar, with permission-denied writes counted separately and a workspace-v… |
| [dsh-ui-usage-billing](https://github.com/kenz1117/dsh-ui-usage-billing) | 12 | ⚪ unknown | Usage billing dashboard plugin for DeepSeek Harness: sidebar cost metrics, real usage aggregation from session logs, current mult… |
| [distill-kura](https://github.com/lna-lab/distill-kura) | 8 | ⚪ unknown | 蒸留蔵 — distilled long-term memory for agents: recall by meaning, writing gated by evidence, one kura per agent mode. Ships as a De… |

### 🧠 LLM

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 818 | 🟢 ok | Vision for text-only models: image QA, screenshot OCR, UI reconstruction |
| [Deepseek-omnimodal](https://github.com/good-boy4069/Deepseek-omnimodal) | 4 | ⚪ unknown | Open-source multimodal MCP for text-only agents |
| [dsh-computer-use](https://github.com/Anionex/dsh-computer-use) | 29 | 🟢 ok | Computer-use plugin (accessibility observation + scoped permission) |
| [dsh-vision](https://github.com/william-jin-cmu/dsh-vision) | 34 | 🟢 ok | view_image tool bridging any OpenAI-compatible VLM |
| [modlens](https://github.com/liustack/modlens) | 3602 | 🟢 ok | The first vision plugin for DeepSeek Harness — let text-only models see. |
| [agent-vision-toolkit](https://github.com/Anionex/agent-vision-toolkit) | 1098 | ⚪ unknown | Vision toolbox & skills for text-only models: multi-image QA, UI reconstruction, GUI automation. |
| [dsh-tool-turbo](https://github.com/Electricitysheep/dsh-tool-turbo) | 7 | ⚪ unknown | Per-round reasoning_effort optimizer. |
| [dsh-plugin-cost-tracker](https://github.com/YYTbit/dsh-plugin-cost-tracker) | 3 | ⚪ unknown | Token cost tracker for DeepSeek Harness. |
| [dsh-cost](https://github.com/GiantGKL/dsh-cost) | 3 | 🟢 ok | DSH token cost tracking plugin. |
| [dsh-vision-proxy](https://github.com/Flyvhidbwo/dsh-vision-proxy) | 14 | 🟢 ok | DeepSeek brain + auto image recognition via VLM. |
| [dsh-her-eyes](https://github.com/huashenglian/dsh-her-eyes) | 4 | ⚪ unknown | DSH plugin letting AI auto-invoke VLM for vision analysis. |
| [dsh-recommend](https://github.com/zp-home/dsh-recommend) | 19 | 🟢 ok | dsh-recommend — DSH plugin (llm) |
| [dsh-hdc-bridge](https://github.com/1na-ko/dsh-hdc-bridge) | 14 | 🟢 ok | dsh-hdc-bridge — DSH plugin (llm) |
| [dsh-plugin-deepeye](https://github.com/Favio8/dsh-plugin-deepeye) | 3 | 🟢 ok | DeepEye vision plugin for DeepSeek Harness (DSH): image description, OCR, VQA, UI layout, and clipboard analysis. |
| [dsh-tiered-approval](https://github.com/Elaina-real/dsh-tiered-approval) | 2 | 🟢 ok | Tiered auto-review for DeepSeek Harness: static-rule safety net + LLM reviewer + human fallback — auto-allow safe actions, deny i… |
| [dsh-mcp-manager](https://github.com/hyqhyq3/dsh-mcp-manager) | 11 | ⚪ unknown | MCP server manager plugin for DeepSeek Harness: Settings → MCP page, OAuth (PKCE + dynamic client registration) or static-token a… |
| [dsh-llm-codex-oauth](https://github.com/Player-MINEPIG/dsh-llm-codex-oauth) | 8 | 🟢 ok | dsh-llm-codex-oauth — DSH plugin (llm) |
| [dsh-payload-capture](https://github.com/Moeblack/dsh-payload-capture) | 1 | ⚪ unknown | dsh-payload-capture — DSH plugin (llm) |
| [doubao-vision-dsh](https://github.com/hawkongz/doubao-vision-dsh) | 1 | ⚪ unknown | doubao-vision-dsh — DSH plugin (llm) |
| [dsh-vision-LMstudio](https://github.com/TiankunDai/dsh-vision-LMstudio) | 1 | ⚪ unknown | dsh-vision-LMstudio — DSH plugin (llm) |
| [dsh-tool-vision](https://github.com/Scorp1o117/dsh-tool-vision) | 5 | ⚪ unknown | Vision model for DeepSeek Harness | DeepSeek Harness 外置视觉模型插件 |
| [dsh-effort-tweak](https://github.com/Toukaiteio/dsh-effort-tweak) | 3 | ⚪ unknown | A DeepSeek Harness plugin that allows you to change the reasoning effort of custom models in WebUI. |
| [dsh-toolbelt](https://github.com/cking000bigdemon/dsh-toolbelt) | 1 | ⚪ unknown | Eight DeepSeek Harness plugins: persona, language guard, per-request vision fallback, python/windows write guards, cross-agent me… |
| [multimodal-bridge](https://github.com/Spirit4471/multimodal-bridge) | 3 | ⚪ unknown | multimodal-bridge — DSH plugin (llm) |
| [dsh-live-stats](https://github.com/Proton1917/dsh-live-stats) | 1 | ⚪ unknown | Live token estimates and true streaming TPS for DeepSeek Harness Web |
| [dsh-ui-spec](https://github.com/yumimanji/dsh-ui-spec) | 3 | 🟢 ok | DeepSeek Harness plugin: turn UI screenshots into structured, implementation-grade web frontend specs. Deterministic geometry (sh… |
| [dsh-plugin-vision-toolkit](https://github.com/YYTbit/dsh-plugin-vision-toolkit) | 0 | 🟢 ok | Vision toolkit for DeepSeek Harness -- give text-only agents eyes |
| [dsh-usage-cost](https://github.com/Dino6021/dsh-usage-cost) | 1 | ⚪ unknown | DSH plugin: per-step timestamped DeepSeek API usage timeline + peak/off-peak cost readout. Official bundle; install via: dsh plug… |
| [dsh-mimo-vision-hint](https://github.com/Isekai-Mfu/dsh-mimo-vision-hint) | 1 | ⚪ unknown | DSH plugin: dispatch image-recognition tasks to an opencode-go mimo-v2.5 subagent via system-prompt injection |
| [dsh-multimodal](https://github.com/MC5lan/dsh-multimodal) | 4 | ⚪ unknown | dsh-multimodal — DSH plugin (llm) |
| [dsh-vision-helper](https://github.com/Yuuz12/dsh-vision-helper) | 1 | 🟢 ok | DeepSeek Harness Vision Helper/DeepSeek Harness 视觉辅助方案 |
| [dsh-model-modes](https://github.com/DTSFO/dsh-model-modes) | 3 | ⚪ unknown | Capability-aware reasoning controls and Fast model routing for DeepSeek Harness |
| [dsh-pet-corner](https://github.com/omdsh-dev/dsh-pet-corner) | 3 | ⚪ unknown | DSH Pet Corner: a floating pet, keyless pet-image proxy, favorites, and plugin-owned settings API |
| [dsh-eco-router](https://github.com/joyfoxai/dsh-eco-router) | 1 | ⚪ unknown | A token-efficient model-routing flywheel for the DeepSeek Harness. |
| [dsh-effort-config](https://github.com/benzhoupo/dsh-effort-config) | 1 | ⚪ unknown | dsh plugin: configure reasoning-effort levels (wire spellings), route default level and Anthropic token budgets for third-party m… |
| [dsh-image-to-path](https://github.com/cesaryike/dsh-image-to-path) | 2 | ⚪ unknown | dsh-image-to-path — DSH plugin (llm) |
| [dsh-vision](https://github.com/xiaoshihou514/dsh-vision) | 3 | 🟢 ok | DeepSeek Harness: vision |
| [dsh-usage-meter](https://github.com/cute-baobao/dsh-usage-meter) | 3 | ⚪ unknown | DeepSeek Harness plugin: per-model daily token usage recorder (input/output/cache hits) with a Web GUI dashboard. |
| [dsh-plugin-clawrouters](https://github.com/ropon/dsh-plugin-clawrouters) | 1 | ⚪ unknown | One-key ClawRouters plugin for DeepSeek Harness: chat, image, video, and web search |
| [dsh-mac-vision](https://github.com/Kevoyuan/dsh-mac-vision) | 1 | 🟢 ok | On-device macOS OCR and Apple Vision for DeepSeek Harness — one native plugin with a bundled Skill. |
| [dsh-plugin-llm-codex](https://github.com/jasper-zsh/dsh-plugin-llm-codex) | 0 | ⚪ unknown | 让 DeepSeek Harness（DSH） 通过 ChatGPT/Codex 订阅调用 openai-codex 模型，无需配置 OpenAI API Key。 |
| [dsh-think-flow-flow](https://github.com/lynkas/dsh-think-flow-flow) | 2 | ⚪ unknown | DeepSeek Harness client plugin: constant-rate typewriter reveal for assistant output and reasoning, with per-model gating. |
| [dsh-prompt-profile](https://github.com/BrambleXu/dsh-prompt-profile) | 1 | ⚪ unknown | Reusable Markdown prompt profiles for DeepSeek Harness with per-turn model selection, argument substitution, and state restoratio… |
| [dsh-polyglot](https://github.com/Jesse-njx/dsh-polyglot) | 4 | ⚪ unknown | dsh-polyglot — the model switch for DSH: generic OpenAI-compatible ctx.llm adapter, curated free/cheap DeepSeek presets, automati… |
| [dsh-token-stats](https://github.com/H1a3x/dsh-token-stats) | 7 | 🟢 ok | Floating draggable token usage statistics panel for DeepSeek Harness |
| [dsh-cost](https://github.com/dongsheng123132/dsh-cost) | 3 | 🟢 ok | Evidence-first token cost ledger and budget checks for DeepSeek Harness |
| [dsh-plugin-usage-report](https://github.com/csiroqa/dsh-plugin-usage-report) | 0 | ⚪ unknown | DSH usage report: daily/monthly token & cost aggregation, alerts. |
| [dsh-model-thinking](https://github.com/cyberlieflife/dsh-model-thinking) | 3 | ⚪ unknown | DSH (DeepSeek Harness) web plugin: thinking intensity / reasoning effort settings for custom OpenAI-compatible (pi-ai) models |
| [dsh-vision-sidecar](https://github.com/121103qwq/dsh-vision-sidecar) | 4 | ⚪ unknown | Hosted free vision sidecar for DeepSeek Harness with durable session evidence |
| [owlx-mcp](https://github.com/Chungor/owlx-mcp) | 0 | ⚪ unknown | OwlX MCP server - live crypto structure scores, MemeSniper, token financials and recorded signal hit-rate as MCP tools for Claude… |
| [dsh-qwen-mm](https://github.com/RRRosmontis/dsh-qwen-mm) | 2 | ⚪ unknown | Qwen-MM-Plugins integration bundle for DeepSeek Harness (dsh) — multimodal MCP tools (vision, OCR, ASR, search, video, Blender, F… |
| [noatmark-dsh-plugin](https://github.com/ylwl1997/noatmark-dsh-plugin) | 1 | ⚪ unknown | NoAtMark text hygiene as a DeepSeek Harness (dsh) plugin — sanitize untrusted text, scan invisible characters, clean LLM formatti… |
| [dsh-cost-display](https://github.com/misakimiku2/dsh-cost-display) | 1 | ⚪ unknown | dsh-cost-display — DSH plugin (llm) |
| [dsh-plugin-provider-quota](https://github.com/jasper-zsh/dsh-plugin-provider-quota) | 0 | ⚪ unknown | dsh-plugin-provider-quota — DSH plugin (llm) |
| [dsh-codebuddy](https://github.com/Lbryany/dsh-codebuddy) | 1 | ⚪ unknown | CodeBuddy OAuth, dynamic models, and reasoning controls for DeepSeek Harness |
| [DeepSeek-harness-qqbot](https://github.com/sliverp/DeepSeek-harness-qqbot) | 8 | ⚪ unknown | QQ Bot text and image channel plugin for DeepSeek Harness |
| [dsh-advisor](https://github.com/omdsh-dev/dsh-advisor) | 13 | 🟢 ok | Advisor - Pair a second model that passively reviews each turn and injects notes. 搭配一个会在每轮对话被动注入见解和审查的副模型。 |
| [DeepSeek-harness-wecom](https://github.com/sliverp/DeepSeek-harness-wecom) | 5 | ⚪ unknown | WeCom AI Bot text and image bridge for DeepSeek Harness |
| [dsh-codex-subscription](https://github.com/yequ172672/dsh-codex-subscription) | 17 | 🟢 ok | DSH 插件:直接复用 Codex CLI 本地登录订阅凭证,在 DeepSeek Harness 中使用 ChatGPT 订阅模型,无需 API Key | DSH plugin: reuse your Codex CLI local subscripti… |
| [dsh-vision](https://github.com/oil-oil/dsh-vision) | 86 | 🟢 ok | Near-native image understanding for DeepSeek Harness |
| [dsh-approval-ai](https://github.com/ang-XWBWZ/dsh-approval-ai) | 3 | ⚪ unknown | AI approval answerer for DeepSeek Harness (DSH) using the unified LLM route with fail-closed policy checks. |
| [dsh-plugin](https://github.com/PicGo/dsh-plugin) | 4 | 🟢 ok | Upload images and files to your image host from DeepSeek Harness, powered by PicGo |
| [dsh-ui-appearance](https://github.com/TQSY114514/dsh-ui-appearance) | 9 | 🟢 ok | Appearance customization plugin for DeepSeek Harness: theme color palette, background image, opacity/blur, glass effect |
| [dsh-vision-bridge](https://github.com/Xieweikang123/dsh-vision-bridge) | 1 | ⚪ unknown | Give a text-only dsh model eyes: pasted images recognized into text via an OpenAI-compatible vision endpoint. |
| [dsh-mimo-agent-tools](https://github.com/ch1bug/dsh-mimo-agent-tools) | 5 | ⚪ unknown | Xiaomi MiMo search + multimodal tools for DeepSeek Harness agents: mimo_search/vision/audio/video/asr/tts |
| [dsh-background](https://github.com/luoyu-xingu/dsh-background) | 3 | 🟢 ok | DeepSeek Harness Web 背景图片插件:本地图片路径替换网页背景,外观设置行 + 实时预览 |
| [dsh-llm-fallbacks](https://github.com/omdsh-dev/dsh-llm-fallbacks) | 16 | 🟢 ok | An dsh plugin for role-based LLM retry&fallback strategy. 基于角色的模型重试备用策略插件 |
| [dsh-qrcode](https://github.com/hellosky983/dsh-qrcode) | 3 | ⚪ unknown | 离线二维码生成器：DeepSeek Harness 插件，纯本地、零网络、零 shell，给模型一个 qrcode 工具 |
| [DeepSeek-harness-weixin](https://github.com/sliverp/DeepSeek-harness-weixin) | 2 | ⚪ unknown | Weixin ClawBot channel plugin for DeepSeek Harness with QR login and text/image messaging |
| [dsh-api-usage-bar](https://github.com/hurry060215-tech/dsh-api-usage-bar) | 0 | ⚪ unknown | Cache-aware API token usage bar for the DeepSeek Harness Web UI |
| [dsh-image-reader](https://github.com/zcXie777/dsh-image-reader) | 2 | ⚪ unknown | Give DeepSeek Harness agents native image reading: a read_image tool backed by any OpenAI-compatible vision endpoint. |
| [dsh-media-skills](https://github.com/akqwpeter-prog/dsh-media-skills) | 16 | ⚪ unknown | 给 DeepSeek Harness 装上「眼睛」和「画笔」——免费读图 + 免费生图 Skill。Eyes & brush for DeepSeek Harness: free image reading & generation. 👁️🎨 |
| [dsh-qwen-multimodal](https://github.com/wuwangmao/dsh-qwen-multimodal) | 0 | ⚪ unknown | DSH bundle: Qwen multimodal bridge — vision (qwen3-vl), speech-to-text (qwen3-asr), text-to-image (qwen-image), for DeepSeek Harn… |
| [vision_kit](https://github.com/Seom-ingit/vision_kit) | 0 | ⚪ unknown | Make your AI agent a math tutor. Structured extraction of vectors, matrices & geometry from math figures, with dimension-consiste… |
| [dsh-plugin-file-manager](https://github.com/jasper-zsh/dsh-plugin-file-manager) | 0 | ⚪ unknown | 面向 DeepSeek Harness（DSH） Web 界面的会话文件管理器插件。它在会话标题栏增加“文件”入口，打开后展示该会话工作区的文件树、Git 状态，并支持直接预览文本、图片和视频。 |
| [ds-vision-plugin](https://github.com/Sorwcyra/ds-vision-plugin) | 4 | ⚪ unknown | Paste images into DeepSeek Harness with a four-model vision race, OCR, and an automatic text bridge. |
| [dsh-minigames](https://github.com/omdsh-dev/dsh-minigames) | 7 | ⚪ unknown | DSH Web UI 右侧小游戏面板：18 款离线小游戏（恐龙跳一跳 / 俄罗斯方块 / 坦克大战 / 扫雷 / 2048 / 数独 / 吃豆人 / 跟枪练习等），可扩展游戏注册表，等待模型回复或修 bug 时的摸鱼神器 |
| [dsh-vision](https://github.com/237229953-create/dsh-vision) | 3 | 🟢 ok | DSH plugin: text-only models (e.g. DeepSeek-V4) automatically see images via a vision model. Official surface-replace, cache-frie… |
| [dsh-vision-provider](https://github.com/libinyam/dsh-vision-provider) | 3 | ⚪ unknown | Config-only DeepSeek Harness bundle for OpenAI-compatible vision models. |
| [dsh-ccswitch-import-lite](https://github.com/chenhaolove89/dsh-ccswitch-import-lite) | 2 | ⚪ unknown | DeepSeek Harness 插件（精简版）：从 CCSWITCH 批量导入模型供应商，不含视觉描述 |
| [dsh-llm-codebuddy](https://github.com/Axiaohungry/dsh-llm-codebuddy) | 20 | 🟢 ok | 在deepseek harness中使用workbuddy api，因为公司只提供workbuddy积分 |
| [dsh-container](https://github.com/NIyueeE/dsh-container) | 1 | ⚪ unknown | DeepSeek Harness (dsh) container image: universal dev-container base, dsh auto-update on boot, compose + Quadlet examples |
| [dsh-cost-tracker](https://github.com/yflmq001/dsh-cost-tracker) | 2 | ⚪ unknown | Token cost tracking for DeepSeek Harness |
| [dsh-vision-plugin](https://github.com/Xin-Zhang-IceMan/dsh-vision-plugin) | 1 | ⚪ unknown | DeepSeek Harness 视觉插件：让纯文本模型拥有视觉能力 / Vision plugin for DSH: vision_analyze tool + automatic image transcription for text-only mod… |
| [dsh-ccswitch-import](https://github.com/chenhaolove89/dsh-ccswitch-import) | 0 | ⚪ unknown | DeepSeek Harness 插件：从 CCSWITCH 批量导入模型供应商 + visual_describe 视觉描述工具 |
| [dsh-vision-tools](https://github.com/moon09300731/dsh-vision-tools) | 3 | 🟢 ok | DeepSeek Harness 视觉能力全家桶：vision_understand 工具 + 粘贴/拖拽/按钮三入口识图 |
| [dsh-vision-android](https://github.com/superclaude1/dsh-vision-android) | 2 | ⚪ unknown | DeepSeek Harness plugin: multimodal vision (OpenAI-compatible) + Android adb UI automation for real-tap mobile app testing |
| [dsh-dardar](https://github.com/benzhoupo/dsh-dardar) | 2 | ⚪ unknown | DSH 插件：在模型选择框左侧显示当前 DeepSeek V4 Pro / V4 Flash 的 codexradar IQ，每 5 分钟刷新（CC BY 4.0） |
| [dsh-computer-use](https://github.com/xiaoheizi1212/dsh-computer-use) | 1 | ⚪ unknown | Model-agnostic Computer Use for DeepSeek Harness: isolated browser, Windows native helper, third-party vision perception, and a C… |
| [deepseek-eyes](https://github.com/fryghost/deepseek-eyes) | 1 | ⚪ unknown | Community plugin for DeepSeek Harness: give text-only models eyes - paste images natively, described via an OpenAI-compatible vis… |
| [dsh-gui-customization](https://github.com/LAN-TINA-WS/dsh-gui-customization) | 15 | 🟢 ok | Nous Blue theme, ambient glow and background image customization for DeepSeek Harness Web UI. DSH 界面设定插件：Nous 蓝配色 / 氛围光 / 背景图（中英双… |
| [dsh-approval-llm](https://github.com/Letter2025/dsh-approval-llm) | 7 | 🟢 ok | Model-based permission approval (approve-for-me) for DeepSeek Harness: an approval/request answerer backed by a separate reviewer… |
| [dsh-task-models](https://github.com/TTTPOB/dsh-task-models) | 1 | ⚪ unknown | DeepSeek Harness plugin with per-task model and reasoning-effort selection |
| [dsh-opencode-go-usage](https://github.com/Xenia0922/dsh-opencode-go-usage) | 13 | 🟢 ok | DeepSeek Harness 插件:OpenCode Go 用量与花费悬浮仪表盘(配额、逐请求成本、模型/来源分布) |
| [dsh-calculator](https://github.com/bobcat848/dsh-calculator) | 5 | ⚪ unknown | Calculate the real-time cost of DeepSeek API calls made by DeepSeek Harness. |
| [dsh-green-meter](https://github.com/dclichang2022/dsh-green-meter) | 62 | 🔴 broken (failed once, retried — install failed (exit 1):     at runPlugin (file:///home/runner/.npm/_npx/1e7f6d9597241db0/node_modules/@deepseek-ai/dsh/lib/plugin-9h8shc) | Energy & carbon metering for DeepSeek Harness: per-turn/per-request energy, cache carbon savings, electricity cost. |
| [DeepSeek-harness-dingtalk](https://github.com/sliverp/DeepSeek-harness-dingtalk) | 3 | ⚪ unknown | DingTalk Stream text and image channel plugin for DeepSeek Harness |
| [dsh-plugin-describe-image](https://github.com/whitelonng/dsh-plugin-describe-image) | 5 | ⚪ unknown | DeepSeek Harness plugin: describe_image — give a text-only model vision through an OpenAI-compatible VLM endpoint |
| [dsh-see-image](https://github.com/tiefeiyu/dsh-see-image) | 1 | ⚪ unknown | A see_image vision tool plugin for DeepSeek Harness — describe images through any OpenAI-compatible vision model (GitHub Copilot,… |
| [dsh-plugin-tokenmeter](https://github.com/pythonshiyi/dsh-plugin-tokenmeter) | 1 | ⚪ unknown | 词元消耗显示插件（DeepSeek Harness 网页端）：每条回复的实时词元用量 | Per-message token usage chips for DeepSeek Harness web UI |
| [dsh-llm-kiro](https://github.com/caopu16/dsh-llm-kiro) | 1 | ⚪ unknown | deepseek-harness 的插件，可以使用kiro的模型（claude系列）和账号 |
| [dsh-image-theme](https://github.com/Carpon39038/dsh-image-theme) | 2 | ⚪ unknown | Warp-inspired image-to-theme plugin for DeepSeek Harness: upload a background, extract a palette, and apply a glass UI. |
| [deepseek-hsrness-devkit](https://github.com/2472786266-spec/deepseek-hsrness-devkit) | 2 | ⚪ unknown | DSH DevKit: multimodal gallery + multi-agent supervision console (DeepSeek Harness dynamic Cordis plugin) |
| [dsh-skin](https://github.com/Yugitan/dsh-skin) | 1 | ⚪ unknown | Customizable skinning plugin for DeepSeek Harness Web UI — gradient presets, image wallpapers, translucency, accent colors, persi… |
| [slcatwujian-dsh-vision-plugin](https://github.com/yan5236/slcatwujian-dsh-vision-plugin) | 1 | ⚪ unknown | 让不支持图片输入的主模型通过已配置的视觉模型理解图片的 DSH 插件：自动桥接、像素坐标描述、vision_ask 追问工具与设置页 |
| [ds-image-skin](https://github.com/ahren112/ds-image-skin) | 1 | ⚪ unknown | Image skin plugin for DeepSeek Harness web UI |
| [dsh-llm-fallback](https://github.com/Visol-456/dsh-llm-fallback) | 5 | ⚪ unknown | DeepSeek Harness 回退链插件：主模型失败自动切换备用 provider，带 Web UI 配置面板 | Provider fallback chains for DeepSeek Harness |
| [dsh-multimodal-skill](https://github.com/v587d/dsh-multimodal-skill) | 1 | ⚪ unknown | 给纯文本 LLM 一双慧眼。 一个 DeepSeek Harness（DSH）原生 skill + 零依赖 Python CLI， 为 DeepSeek 等纯文本模型补上图像理解与文档解析（OCR、表格、公式、PDF → Markdown）， 使用免费额度优… |
| [dsh-plugin-github-market](https://github.com/w1661884010-jpg/dsh-plugin-github-market) | 2 | ⚪ unknown | DSH web client plugin: browse GitHub dsh-plugin topic repositories (fuzzy search, sort, favorites, install-command copy, optional… |
| [dsh-xiapan-media](https://github.com/dongsheng123132/dsh-xiapan-media) | 3 | ⚪ unknown | Native vision, gpt-image-2 and Seedance plugins for DeepSeek Harness via Xiapan Cloud |
| [TokenLedger](https://github.com/zh667/TokenLedger) | 144 | ⚪ unknown | Token usage accounting for DeepSeek Harness, reconciled against New API and Sub2API relay-site billing |
| [dsh-conversation-cost](https://github.com/Ayaka157/dsh-conversation-cost) | 1 | ⚪ unknown | 在 DSH 对话底部统计行实时显示 DeepSeek 用量费用（人民币/美元双币，含缓存命中与峰谷定价） |
| [glm4v-vision-mcp](https://github.com/ethanweave/glm4v-vision-mcp) | 2 | ⚪ unknown | GLM-4.6V 图像理解 MCP：识图/OCR/图表解析，原生接入 DeepSeek Harness（dsh-mcp-client），也兼容 Codex/Cline 等 |
| [dsh-vision](https://github.com/linenxi-ctrl/dsh-vision) | 12 | 🟢 ok | 为 DeepSeek Harness 增加外挂识图模型：圆形鲸鱼按钮、发送图片识图自动回传、模型自主截图+识图工具、多协议自动适配、小白一键安装（未装 Node.js 自动下载） |
| [dsh-vqa-agent](https://github.com/jypjypjypjyp/dsh-vqa-agent) | 2 | ⚪ unknown | DSH 插件:vqa_ask 双模型视觉问答 —— 主模型提问 → 视觉模型看图回答,UI 实时展示 QA 过程,支持多模态视觉模型选择 |
| [dsh-commandcode-provider](https://github.com/Mars-Sea/dsh-commandcode-provider) | 95 | 🟢 ok | Unofficial DeepSeek Harness LLM provider plugin for Command Code: live model catalog, reasoning-effort support, Models-page card.… |
| [dsh-plugin-subscriptions](https://github.com/V1ki/dsh-plugin-subscriptions) | 264 | 🟢 ok | Use ChatGPT (Codex), Claude, and Grok (X Premium) subscriptions as DeepSeek Harness LLM providers — OAuth login in the web UI, no… |
| [dsh-gauge](https://github.com/noone89A/dsh-gauge) | 5 | 🟢 ok | 为 DeepSeek Harness Web UI 提供精确缓存命中率、token 用量与费用估算 |
| [dsh-vision](https://github.com/Terry12138qy/dsh-vision) | 3 | 🟢 ok | DeepSeek Harness 识图插件：为不具备原生识图能力的模型提供识图能力（阿里云百炼 qwen3.5-omni-plus，失败自动切换智谱 glm-4.6v-flash）。由 claude-vision-skill 移植适配。 | Vision t… |
| [dsh-usage-stats](https://github.com/Make0209/dsh-usage-stats) | 26 | 🟢 ok | DeepSeek Harness 插件：GitHub 风格用量热力图 + Token / 缓存命中 / 账户余额看板 + 工作区别名管理。 |
| [dsh-project-file-explorer](https://github.com/BillionSeniors/dsh-project-file-explorer) | 3 | ⚪ unknown | DeepSeek Harness 项目文件浏览器插件：右侧停靠文件树 + 一键预览（代码/文本/图片/音视频/PDF），新增工作区自动停靠，窄屏响应式抽屉 |
| [dsh-vision-bridge](https://github.com/ximengxiaolan/dsh-vision-bridge) | 2 | ⚪ unknown | Composer-attached images are auto-described by an OpenAI-compatible vision model and handed to text-only models (DeepSeek) as tex… |
| [dsh-vision-primitives](https://github.com/zouyuanqing/dsh-vision-primitives) | 2 | ⚪ unknown | Native interactive visual-reasoning plugin for DeepSeek Harness: precise pixel grounding (SOM grid / zoom / annotate / measure /… |
| [deepseek-protocol-doctor](https://github.com/Whning0513/deepseek-protocol-doctor) | 2 | ⚪ unknown | Checks DeepSeek tool loops, reasoning_content, strict schemas, and captured SSE. Also works as a DSH plugin. |
| [dsh-image-tools](https://github.com/xiaoxianyu-office/dsh-image-tools) | 3 | ⚪ unknown | DSH bundle plugin: chat-image bridge + read_image deny + conversational image_recognize for text-only main models | 纯文本主模型识图桥接与识图… |
| [dsh-token-usage](https://github.com/LeemanCheung/dsh-token-usage) | 11 | 🟢 ok | Persistent token usage records and dashboard for DeepSeek Harness |
| [dsh-token-usage-calendar](https://github.com/Fiennes4590/dsh-token-usage-calendar) | 1 | ⚪ unknown | DeepSeek Harness（DSH）动态 Cordis Token 用量日历插件：真实日志聚合、日/周/月视图与深色模式 |
| [dsh-conv-export](https://github.com/beijingwahw/dsh-conv-export) | 4 | ⚪ unknown | dsh-conv-export（对话导出）— export the current DeepSeek Harness conversation as Markdown, PDF, or a long PNG image |
| [dsh-deepseek-vision-router](https://github.com/mochgolf/dsh-deepseek-vision-router) | 1 | ⚪ unknown | Transparent image preprocessing route for DeepSeek Harness |
| [dsh-sight](https://github.com/Fu3rte/dsh-sight) | 3 | 🟢 ok | Plug-in vision for text-only DeepSeek Harness (dsh) models: built-in free/cheap VLM presets + multi-image batch analysis |
| [dsh-plugin-image-wallpaper](https://github.com/CaoNing3212/dsh-plugin-image-wallpaper) | 2 | ⚪ unknown | 自定义Deepseek Harness webUI主题 |
| [dsh-token-cost](https://github.com/le-soleil-se-couche/dsh-token-cost) | 7 | 🟢 ok | 在对话页面直接查看消耗费用（嵌入官方底部状态条，点击看明细）；在设置中查看 Harness 消耗的总费用、缓存命中和输入输出 |
| [dsh-image-bridge](https://github.com/kbpoyo/dsh-image-bridge) | 5 | ⚪ unknown | DSH 插件：让纯文本模型也能看图。Web 端直接粘贴图片即可发送，无需指定图片路径；模型自主调用视觉技能查看，多模态模型原生直通，零skill绑定。 |
| [dsh-math-team](https://github.com/OrinVoss/dsh-math-team) | 3 | ⚪ unknown | DSH Math Modeling Team Plugin Pack: 2 role agent presets (modeling-coding / paper) for DeepSeek Harness, multi-folder Git collabo… |
| [dsh-mineru-parse-plugin](https://github.com/83079Vermont/dsh-mineru-parse-plugin) | 2 | ⚪ unknown | A self-contained DeepSeek Harness (DSH) plugin that registers a global model tool parse_docs: parse local PDF / DOCX / PPTX / XLS… |
| [dsh-zotero-wiki](https://github.com/Wechsels/dsh-zotero-wiki) | 3 | ⚪ unknown | DeepSeekHarness × Zotero 插件：自动同步文献库，MinerU 解析 PDF，DeepSeek 全文阅读生成结构化笔记，编译成可检索的 Obsidian LLM Wiki。 |
| [dsh-opencode-go-quota](https://github.com/GLFzr/dsh-opencode-go-quota) | 6 | ⚪ unknown | DSH 插件：OpenCode Go 额度圆环 —— 输入框模型选择器左侧的进度圆环，点击切换 5小时/每周/每月用量（OpenCode Go quota ring for DeepSeek Harness Web） |
| [dsh-sfversion](https://github.com/sparkmio/dsh-sfversion) | 3 | ⚪ unknown | SF视觉桥——给纯文本模型的 DeepSeek Harness 装上眼睛。 |
| [deepseek-harness-zh-cn](https://github.com/imlishiyuan/deepseek-harness-zh-cn) | 11 | ⚪ unknown | A Chinese-first plugin that makes [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) reason (`reasoning`) and an… |
| [dsh-file-panel](https://github.com/yu2025-luo/dsh-file-panel) | 4 | ⚪ unknown | Right-side file panel for DeepSeek Harness — auto-popup when the agent creates or downloads files, with image/text preview, revea… |
| [thinking-level-override](https://github.com/my-dsh-plugin/thinking-level-override) | 2 | ⚪ unknown | 自主覆盖与调整第三方模型的思考等级，修复工具内置预设缺失或不匹配的问题。 |
| [dsh-deepseek-vision](https://github.com/Argonaut790/dsh-deepseek-vision) | 2 | 🟢 ok | Image understanding, OCR, and persistent visual evidence for text-only DeepSeek Harness models |
| [dsh-tool-ocr](https://github.com/ferstar/dsh-tool-ocr) | 4 | 🟢 ok | 本地 OCR 插件：让纯文本生成 LLM 也能读懂图片 | Local OCR plugin: give text-only generative LLMs the ability to read images |
| [deepseek-heartflow](https://github.com/yun520-1/deepseek-heartflow) | 5 | ⚪ unknown | HeartFlow (心虫) as a DSH plugin — AGI 第1层辨别门禁: heartflow_check tool + automatic output supervision |
| [dsh-webproxy-router-plugin](https://github.com/jinsiyu/dsh-webproxy-router-plugin) | 2 | 🟢 ok | 一个deepseek harness webfetch的代理插件，让llm也能科学上网 |
| [dsh-image-inline](https://github.com/condaThinker/dsh-image-inline) | 3 | ⚪ unknown | DSH plugin: show_image tool that renders an image inline into the web chat flow (QQ/WeChat style) — path text in the message, ima… |
| [dsh-motion](https://github.com/bilbillm/dsh-motion) | 3 | ⚪ unknown | Restrained, semantic interface motion for DeepSeek Harness |
| [DSH-update-check](https://github.com/knlght/DSH-update-check) | 2 | 🟢 ok | 让 DeepSeek Harness 拥有版本可见性：dsh_check_updates 模型工具 + Settings 更新检查页 + 周期复查，只报告不升级 |
| [dsh-token-activity](https://github.com/SnowNightt/dsh-token-activity) | 2 | ⚪ unknown | 用于展示最近365天的每日Token使用热力图，悬停任意日期查看当天使用过的全部模型及其Token用量。 |
| [dsh-vision-bridge](https://github.com/lium970320/dsh-vision-bridge) | 1 | ⚪ unknown | DSH 视觉桥接插件：让无视觉能力的主模型看图（会话收图 + 自动转文字 + view_image 工具） |
| [dsh-think-chinese](https://github.com/lingtima/dsh-think-chinese) | 1 | 🟢 ok | DSH 插件：让模型始终用中文进行内部推理与思考（think in Chinese）。 |
| [dsh-reasoning-effort](https://github.com/HanaAyane/dsh-reasoning-effort) | 108 | 🟢 ok | DSH适用的Codex风格的思考强度滑块，以及大肥鱼跑步滑块。Codex-style model and reasoning-effort slider for DeepSeek Harness |
| [dsh-vision-complete](https://github.com/Yts1919/dsh-vision-complete) | 42 | ⚪ unknown | 给 DeepSeek 补上「眼睛和耳朵」的多模态视觉插件：看图 / OCR / 物体检测 / 视频理解 / 语音转写 / 截图直读，一键安装（DSH 插件）。 |
| [dsh-wallpaper](https://github.com/chinaRXQ/dsh-wallpaper) | 3 | 🟢 ok | Wallpaper skin for the DeepSeek Harness (dsh) web UI: image background with opacity, mask and blur controls. |
| [dsh-auxiliary](https://github.com/dsh-plugins/dsh-auxiliary) | 5 | 🟢 ok | Auxiliary models for DeepSeek Harness: vision understanding and context compression through dedicated model routes. |
| [dsh-minimal-turbo](https://github.com/ChangedenCZD/dsh-minimal-turbo) | 43 | ⚪ unknown | Deepseek Harness 极简模式 Windows适配，享用满血Deepseek-V4系列模型 |
| [dsh-attachment-formats](https://github.com/linkingoscar/dsh-attachment-formats) | 3 | ⚪ unknown | Codex-style attachment formats for the DeepSeek Harness Web GUI: PDF text-layer extraction, Office text extraction, scanned-PDF O… |
| [dsh-AuthInOne](https://github.com/Stormycry-cryp/dsh-AuthInOne) | 64 | ⚪ unknown | DeepSeek Harness plugin for OpenAI Codex account login, API and custom OpenAI-compatible providers, model switching, token usage… |
| [dsh-vision](https://github.com/reimu-create/dsh-vision) | 3 | 🟢 ok | DSH plugin: text-only models (e.g. DeepSeek-V4) automatically see images via a vision model. Official surface-replace, cache-frie… |
| [DeepSeek-harness-lark](https://github.com/sliverp/DeepSeek-harness-lark) | 2 | ⚪ unknown | Feishu and Lark text and image channel plugin for DeepSeek Harness |
| [dsh-client-masquerade](https://github.com/ymh0000123/dsh-client-masquerade) | 6 | ⚪ unknown | DeepSeek Harness dynamic plugin: masquerade a custom llm-pi-ai provider as Claude Code / Codex clients (spoofed identity headers). |
| [dsh-reasoning-effort-hdbzq](https://github.com/flyemFSB/dsh-reasoning-effort-hdbzq) | 5 | ⚪ unknown | 滑动变祖器 |
| [dsh-imggenerate](https://github.com/Bald0Wang/dsh-imggenerate) | 4 | ⚪ unknown | DeepSeek Harness plugin: image_generate tool with qwen-image-3.0 (Aliyun MaaS) and doubao-seedream (Volcano Ark) providers |
| [dsh-llm-vision-bridge](https://github.com/Einskyle/dsh-llm-vision-bridge) | 3 | 🟢 ok | DeepSeek vision bridge for dsh: route image attachments to a vision model (Qwen3-VL via pi-ai/llama.cpp) and continue on a text-o… |
| [dsh-llm-newapi](https://github.com/wenzetan/dsh-llm-newapi) | 5 | 🟢 ok | NewAPI (OpenAI-compatible gateway) LLM provider plugin for DeepSeek Harness (dsh): chat-only model discovery + Web settings secti… |
| [deepseek-harness-studio](https://github.com/fufankeji/deepseek-harness-studio) | 504 | ⚪ unknown | DeepSeek Harness Studio：面向 DeepSeek Harness 的现代化桌面开发环境，内置插件中心、视觉增强与本地 Host。 |
| [dsh-plugin-writing-guard](https://github.com/xmutfyh/dsh-plugin-writing-guard) | 22 | 🟢 ok | DSH 论文写作守卫（去 AI 味 / AI 痕迹检测与修改残留检查）— DeepSeek Harness academic writing guard: detects AI-writing style, revision residue & defens… |
| [dsh-plugin-multimodal](https://github.com/shinjiyu/dsh-plugin-multimodal) | 3 | ⚪ unknown | Vision sidecar for DeepSeek Harness: accept pasted images on text-only models. |
| [dsh-mcp](https://github.com/ArvinQi/dsh-mcp) | 6 | ⚪ unknown | DeepSeek Harness 的 MCP 服务器管理插件：可视化界面管理 + 按需 tool search 热注入，省 token。 |
| [dsh-read-url](https://github.com/2672243194/dsh-read-url) | 14 | ⚪ unknown | DeepSeek Harness URL reader: fetch any page and return clean main-content text/Markdown. Auto charset (GBK/GB2312/UTF-8/Big5), to… |
| [dsh-codex-oauth](https://github.com/WNJXYK/dsh-codex-oauth) | 14 | 🟢 ok | Use your OpenAI subscription with DeepSeek Harness to access GPT models, image generation, and web search. |
| [dsh-client-ui-skins](https://github.com/caoyiwei850/dsh-client-ui-skins) | 7 | 🟢 ok | DSH Web skin plugin with built-in themes and custom image skins |
| [dsh-image-transcription-plugin](https://github.com/kutcr/dsh-image-transcription-plugin) | 3 | ⚪ unknown | DeepSeek Harness Cordis plugins for durable image transcription and on-demand historical image recall. |
| [DSH-AUX](https://github.com/DoloresCaritasAngelus/DSH-AUX) | 6 | ⚪ unknown | Auxiliary model system for DeepSeek Harness: unified aux-LLM routing (per-task model, timeout, concurrency, failure cooldown, mai… |
| [dsh-vision](https://github.com/54xkeee/dsh-vision) | 7 | 🟢 ok | Vision for DeepSeek Harness: Doubao Web by default (zero-cost, no API key), Antigravity IDE quota (flash/pro), any IDE CLI, Gemin… |
| [dsh-heatmap](https://github.com/283Gawin/dsh-heatmap) | 4 | ⚪ unknown | DSH Web GUI activity heatmap plugin: GitHub-style commit/token/spend heatmap in the sidebar with per-model cost estimation |
| [dsh-wechat](https://github.com/pan17/dsh-wechat) | 4 | ⚪ unknown | DSH插件，将微信私聊消息桥接到DSH，支持文本、图片、文件、音视频的双向传输。目标是在微信端还原DSH的原生体验 |
| [dsh-deepseek-vision](https://github.com/siegfly/dsh-deepseek-vision) | 7 | 🟢 ok | Vision-language gateway plugin for DeepSeek Harness - paste an image, DeepSeek sees text |
| [dsh-sticky-notes](https://github.com/charrywhite/dsh-sticky-notes) | 7 | ⚪ unknown | Sticky notes for DeepSeek Harness: draggable notes with text & image support, 9 skins, and AI-powered read/write. DeepSeek Harnes… |
| [dsh-vision-plugin](https://github.com/Agents365-ai/dsh-vision-plugin) | 3 | ⚪ unknown | Image understanding for text-only models via OpenRouter free vision models |
| [dsh-weneed](https://github.com/Nwflower/dsh-weneed) | 5 | ⚪ unknown | 让dsh稳定触发We Need思维链，提高模型能力。 |
| [dsh-crew](https://github.com/ZSeven-W/dsh-crew) | 110 | 🟢 ok | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker se… |
| [dsh-media-skills](https://github.com/MJorgin/dsh-media-skills) | 16 | ⚪ unknown | Free vision & image generation for DeepSeek Harness — paste an image into any chat, even text-only sessions. GLM-4V-Flash / Qwen3… |
| [picturereader](https://github.com/jing-hy/picturereader) | 35 | ⚪ unknown | DSH plugin: pixel-to-text image reading for text-only models. image_scan/image_ocr/image_sample tools + image-reading skill (34-i… |
| [dsh-imagegen](https://github.com/dickpy/dsh-imagegen) | 23 | ⚪ unknown | DSH (DeepSeek Harness) Web GUI AI image generation plugin: text-to-image & image-to-image via OpenAI-compatible endpoints (gpt-im… |
| [dsh-chat-imagine](https://github.com/corrinehu/dsh-chat-imagine) | 10 | ⚪ unknown | 在 DSH 聊天窗口自动调用生图工具（API 渠道，或本机 CLI：已支持mmx / codex / agy）并展示图片。 |
| [dsh-deepseek-usage](https://github.com/mmzm0808/dsh-deepseek-usage) | 10 | 🟢 ok | DeepSeek API 用量监测 DSH 插件：悬浮球 + 展开面板，展示开放平台真实余额、累计消费、今日消费、请求次数、Tokens 与分模型用量，支持手动登录获取 userToken。 |
| [dsh-directorx](https://github.com/LaplaceYoung/dsh-directorx) | 13 | ⚪ unknown | DirectorX as a DeepSeek Harness plugin: AI video/image/audio skills, knowledge corpus, and configurable vision/image/video/audio… |
| [dsh-studio](https://github.com/jiuge2467/dsh-studio) | 10 | ⚪ unknown | 现代化 DeepSeek Harness (DSH) 全栈增强工作台 · 多源 MCP 可视化调试中枢 · 视觉思考引擎 · 灵动极客伴侣 |
| [opencues](https://github.com/opencues/opencues) | 36 | ⚪ unknown | Turn any text field into a two-way LLM channel: it reads what you write and fills what you ask. Flags a slip as you type, answers… |
| [dsh-live2d-mygo](https://github.com/U1s1-king/dsh-live2d-mygo) | 6 | ⚪ unknown | MyGO!!!!! Live2D 桌宠插件 for DeepSeek Harness（本地模型同源加载，零外部依赖） |
| [dsh-image-gen](https://github.com/shanliuling/dsh-image-gen) | 177 | 🟢 ok | Installable multi-provider image generation bundle for DeepSeek Harness (Google Gemini, OpenAI, Volcengine Seedream) |
| [dsh-mmx-bridge](https://github.com/welsione/dsh-mmx-bridge) | 8 | ⚪ unknown | 一个工具 = MiniMax 全部多模态能力：DSH 纯文本模型看图/画图/生视频/说话/唱歌/翻唱/搜索/查额度 | One mmx_bridge tool = all MiniMax multimodal (VLM/image/video/speech/… |
| [dsh-computer-use](https://github.com/988hj7tczd-oss/dsh-computer-use) | 13 | ⚪ unknown | Computer Use 插件：虚拟鼠标真人操作 for DeepSeek Harness（screen_observe + computer_click 等 11 个模型友好工具，跨平台 cua-driver 引擎） |
| [comm-protocol-hub](https://github.com/Thanksgiver233/comm-protocol-hub) | 14 | ⚪ unknown | 将分散在 3GPP Release 15~18 的 70+ 条通信协议规范，按 TN/NTN/全息/近远场/混合/安全等 8 个维度结构化整理，为通信工程师和 AI 助手提供一键式协议查询能力。通过三个 DSH 工具（关键词搜索、分类浏览、单条详情），取代人… |
| [dsh-usage-plugin](https://github.com/Qiongkura/dsh-usage-plugin) | 4 | ⚪ unknown | DeepSeek Harness（DSH）的 Token 用量统计 附属插件 |
| [dsh-skin](https://github.com/wei-806206088/dsh-skin) | 7 | ⚪ unknown | 内置极简主题、主色、文字色、区域文字色、图片 / GIF / 视频换肤、每个背景独立不透明度、可保存的命名预设。所有设置自动持久化，重启后自加载 |
| [dsh-minimal-vision](https://github.com/Flora233333/dsh-minimal-vision) | 6 | ⚪ unknown | DSH 极简模式视觉辅助：保持灰测体验所需的首轮干净上下文，同时通过隐藏上下文和按需 Bash 工作流提供视觉分析 | Vision assistance for DSH minimal mode: preserve the clean first-turn… |
| [tongflow](https://github.com/tong-io/tongflow) | 924 | ⚪ unknown | TongFlow — multimodal AIGC workflow engine (canvas + Python plugin engine) and dsh-tongflow, the DeepSeek Harness studio plugin |
| [dsh-plugins](https://github.com/Horizon215/dsh-plugins) | 10 | ⚪ unknown | DeepSeek Harness (dsh) 社区插件：输入框提示词模板库 + 每轮 Token 用量统计，含设置页汇总仪表盘、使用趋势图（今天/近7天/近30天）和供应商价格预设 |
| [dsh-visual-aid](https://github.com/shenyan-008/dsh-visual-aid) | 6 | ⚪ unknown | dsh visual aid plugin: lets text-only main models handle images via a vision model |
| [dsh-modlens-installer](https://github.com/JR-JR07/dsh-modlens-installer) | 7 | ⚪ unknown | dsh + ModLens 视觉能力一键安装包：给 DeepSeek Harness 装上看图能力（Windows EXE 安装器 + 智谱 GLM-4V-Flash 免费视觉引擎） |
| [dsh-vision-bridge](https://github.com/sfyyy/dsh-vision-bridge) | 6 | ⚪ unknown | On-demand vision for text-only DeepSeek Harness (DSH) sessions: images become markers, and a vision_describe tool sends only imag… |
| [dsh-plugin-llm-verifier](https://github.com/uson1x/dsh-plugin-llm-verifier) | 9 | ⚪ unknown | LLM-as-a-Verifier for DeepSeek Harness: continuous reward signals via select / compare / track |
| [dsh-thinking-levels](https://github.com/drscrewdriver/dsh-thinking-levels) | 3 | 🟢 ok | Per-round thinking-level (reasoning_effort) control for DSH: Auto schedules low/high/max from tool-call history, or fix a manual… |
| [dsh-free-vision](https://github.com/FuzzySoul/dsh-free-vision) | 6 | ⚪ unknown | 为DSH（DeepSeek Harness）量身打造的视觉插件，现已支持agent调用图片显示/Vision plugin for DSH(DeepSeek Harness),support Proactive Image Display. |
| [dsh-opencode-zen](https://github.com/xiaozhe7772222/dsh-opencode-zen) | 11 | ⚪ unknown | 0 元接入 6 个免费大模型：OpenCode Zen 免费档模型零配置接入 DeepSeek Harness，免注册免充值，内置 6 个免费模型，多 Key 轮换与限流退避。 |
| [dsh-llm-verifier](https://github.com/Aa728848/dsh-llm-verifier) | 7 | 🟢 ok | Configurable DSH-native LLM verifier with a Web settings page |
| [dsh-with-chatgpt](https://github.com/BeforeWave/dsh-with-chatgpt) | 26 | ⚪ unknown | Bring ChatGPT’s reasoning to your local codebase. Work directly, or delegate larger tasks to DSH. |
| [dsh-tool-hongtou](https://github.com/ExElectron/dsh-tool-hongtou) | 12 | ⚪ unknown | DeepSeek Harness 红头公文插件：两阶段解耦流水线（LLM 结构化提纲 + 确定性 Word 2003 XML 版式渲染）生成标准红头公文 |
| [vision-exp-tile](https://github.com/Nicholas023/vision-exp-tile) | 12 | ⚪ unknown | DSH 插件：大图切 800×800 无损小块 + 坐标标注 + 分块聚合逻辑，直连 deepseek-v4-flash-vision-exp 识别；仅用纯官方 DSH 功能，零依赖第三方插件，不统计 token/费用。 |
| [dsh-channels](https://github.com/wsz987/dsh-channels) | 8 | ⚪ unknown | 把微信 / QQ / 钉钉 / 飞书 / Telegram 接入 DeepSeek Harness：统一配置、扫码授权，直接在各 IM 与 Agent 对话；支持图片与文件收发，Agent 可读取 PDF、DOCX、XLSX 和文本内容。 |
| [dsh-vision-router](https://github.com/ysr666/dsh-vision-router) | 962 | ⚪ unknown (watchlist 占位→plugins；dsh.client 声明完整) | Eyes for text-only DSH agents: built-in free vision chain (anonymous OVHcloud endpoint) plus 11 pixel-level vision tools, one com… |

### 🛡️ Sandbox

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-plugin-miliastra-toolbox](https://github.com/1475505/dsh-plugin-miliastra-toolbox) | 5 | ⚪ unknown | dsh-plugin-miliastra-toolbox — DSH plugin (sandbox) |
| [dsh-same-mode-sandbox-noop](https://github.com/zhangzujian/dsh-same-mode-sandbox-noop) | 4 | ⚪ unknown | DSH compatibility plugin for redundant same-mode sandbox escalation requests |
| [dsh-shell-termux](https://github.com/kelai141/dsh-shell-termux) | 1 | ⚪ unknown | dsh-shell-termux — DSH plugin (sandbox) |
| [dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) | 9 | ⚪ unknown | dsh-bash-win — DSH plugin (sandbox) |
| [dsh-tensorlake-sandbox](https://github.com/tensorlakeai/dsh-tensorlake-sandbox) | 7 | ⚪ unknown | A deepseek harness plugin for tensorlake sandbox |
| [dsh-auto-approve](https://github.com/Jiao-XXX/dsh-auto-approve) | 10 | 🟢 ok | Conservative auto-approval preset for DeepSeek Harness sandbox escalations |
| [dsh-self-checking-profile](https://github.com/SLAPaper/dsh-self-checking-profile) | 1 | ⚪ unknown | A drop-in dsh web profile that adds the **Self Checking** sandbox mode to DeepSeek Harness (dsh) |
| [dsh-yolo-mode](https://github.com/SeverusZh/dsh-yolo-mode) | 3 | 🟢 ok | dsh-yolo-mode - an LLM-powered auto-approval plugin for DeepSeek Harness sandbox escalations (built-in presets + custom permissio… |
| [dsh-approve-for-me](https://github.com/timeance/dsh-approve-for-me) | 12 | 🟢 ok | DeepSeek Harness plugin for rule-gated automatic sandbox approval with optional LLM review, one-time grants, fixed high-risk chec… |
| [mirage-dsh](https://github.com/strukto-ai/mirage) | 3563 | 🟢 ok | Swap DSH's fs/shell providers for a mirage virtual workspace: file tools and shell commands act on mounted resources (RAM, disk,… |
| [dsh-plugin-net-access](https://github.com/Gumiho12345/dsh-plugin-net-access) | 6 | ⚪ unknown | 为 DeepSeek Harness(dsh) 新增 Net Access 模式，用于解决 Windows 沙箱内 curl.exe 无法访问 HTTPS 的问题，文件写保护不变。 / Adds a Net Access mode to DeepSeek H… |

### 🎛️ Orchestration

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [openhanako](https://github.com/liliMozi/openhanako) | 6322 | ⚪ unknown | Personal AI agent with memory, personality and autonomy |
| [exo](https://github.com/exoharness/exo) | 862 | ⚪ unknown | Fully recursive agent+harness that self-edits at runtime |
| [synergy](https://github.com/SII-Holos/synergy) | 547 | ⚪ unknown | General-purpose agent for the Open Agentic Web |
| [ccteam](https://github.com/firstintent/ccteam) | 309 | ⚪ unknown | Orchestrates Claude Code/Codex/Grok/Kimi into one team |
| [MateBot](https://github.com/aresbit/MateBot) | 45 | ⚪ unknown | A claudeclaw clone |
| [mstar-harness](https://github.com/btspoony/mstar-harness) | 53 | ⚪ unknown | Skill-driven harness/loop engineering workflow plugin |
| [dsh_workflow](https://github.com/icetomoyo/dsh_workflow) | 98 | 🟢 ok | Bring Claude Code's UltraCode mode to DSH with governable multi-agent orchestration |
| [agents-go](https://github.com/zzir/agents-go) | 13 | ⚪ unknown | Multi-agent framework in Go |
| [distill](https://github.com/LoserFox/distill) | 22 | ⚪ unknown | Auto conversation distillation: background subagent reflection |
| [dsh-agent-teams](https://github.com/NanmiCoder/dsh-agent-teams) | 952 | 🟢 ok | AgentTeams plugin |
| [dsh-automation](https://github.com/titanwings/dsh-automation) | 78 | 🟢 ok | Run scheduled tasks in fresh sessions per plan |
| [dsh-loop](https://github.com/vlln/dsh-loop) | 5 | 🟢 ok | Scheduled loop (/loop command + tool) |
| [dsh-plannotator](https://github.com/titanwings/dsh-plannotator) | 9 | 🟢 ok | Plan annotator: annotate plan text line-by-line |
| [dsh-task-status](https://github.com/vlln/dsh-task-status) | 9 | ⚪ unknown | Background task status bar |
| [dsh-work](https://github.com/vibeinging/dsh-desktop) | 631 | ⚪ unknown | Local-first AI workbench for DSH plugins |
| [dsh-advisor](https://github.com/btspoony/dsh-advisor) | 13 | 🟢 ok | Second model passively reviews each turn and injects advice |
| [dsh-artifact](https://github.com/william-jin-cmu/dsh-artifact) | 1 | 🟢 ok | File delivery protocol: send_artifact tool |
| [dsh-deep-research](https://github.com/omdsh-dev/dsh-deep-research) | 18 | ⚪ unknown | Adaptive deep-research orchestrator plugin |
| [dsh-explain](https://github.com/yuezengwu/dsh-explain) | 12 | ⚪ unknown | Local-first learning mode: cross-session learning thread |
| [dsh-llm-fallbacks](https://github.com/btspoony/dsh-llm-fallbacks) | 16 | 🟢 ok | Role-based LLM retry & fallback strategy |
| [dsh-sentinel](https://github.com/fuhefei/dsh-sentinel) | 13 | ⚪ unknown | Condition-driven wakeup: durable file/command/http triggers |
| [dsh-track](https://github.com/fakechris/dsh-track) | 7 | ⚪ unknown | Embedded task management engine: decision-point protocol |
| [eragear-code-copilot](https://github.com/TongDucThanhNam/eragear-code-copilot) | 0 | ⚪ unknown | Empty shell repo (no description) |
| [dsh-plugin-product-subagents](https://github.com/shaokeyibb/dsh-plugin-product-subagents) | 18 | 🟢 ok | Role-based Codex/Claude Code/ACP subagent presets. |
| [dsh-milestone](https://github.com/SnowCrescenter-tech/dsh-milestone) | 20 | 🟢 ok | Git-style milestone timeline plugin. |
| [shopline-ai-toolkit-dsh](https://github.com/lunw/shopline-ai-toolkit-dsh) | 3 | ⚪ unknown | SHOPLINE AI Toolkit for DeepSeek Harness (dsh-plugin): official SHOPLINE Developer MCP bridge + SHOPLINE agent skills, mirroring… |
| [dsh-playwright-cli](https://github.com/mitao-su/dsh-playwright-cli) | 2 | ⚪ unknown | DeepSeek Harness (DSH) host plugin wrapping the Playwright CLI: install browsers, run tests, open the HTML report from the agent… |
| [dsh-review-loop](https://github.com/wuxiangru915/dsh-review-loop) | 2 | ⚪ unknown | Incremental diff reviewer for DeepSeek Harness — Web UI review panel + /review command. 增量代码审查插件：checkpoint 增量队列 + 审查意见注入 agent. |
| [securstack-dsh-plugin](https://github.com/securstack/securstack-dsh-plugin) | 3 | ⚪ unknown | SecurStack adapter for DeepSeek Harness: run repository security scans, policy gates, doctor diagnostics, and JSON CLI results fr… |
| [dsh-multi-cot](https://github.com/AprilWizard/dsh-multi-cot) | 2 | ⚪ unknown | Multi-CoT plugin for DeepSeek Harness: multi-sampled test-time compute, internal voting, and a plan/execute/review workflow |
| [dsh-git-plugin](https://github.com/MashedPotato817/dsh-git-plugin) | 2 | 🟢 ok | Git workflow plugin for DeepSeek Harness: slash commands and read-only git tools |
| [dsh-enhance](https://github.com/vcxmug/dsh-enhance) | 2 | ⚪ unknown | Native Firecrawl tools for DeepSeek Harness agents via MCP — one composition row, zero custom code |
| [deepseek-harness-plugin-mcp](https://github.com/bobleer/deepseek-harness-plugin-mcp) | 3 | ⚪ unknown | MCP server that lets any agent discover, install, and run DeepSeek Harness plugins (topic: dsh-plugin). |
| [dsh-sound-effects-plugin](https://github.com/JasonJin2006/dsh-sound-effects-plugin) | 2 | ⚪ unknown | Reasonix-style sound effects for DeepSeek Harness: generative pentatonic ambient music while the agent works, E6-G6-C7 success ch… |
| [deepseek-harness-fnos](https://github.com/techysy/deepseek-harness-fnos) | 22 | ⚪ unknown | deepseek-harness-fnos — DSH plugin (orchestration) |
| [dsh-agent-arcade](https://github.com/fff122/dsh-agent-arcade) | 1 | ⚪ unknown | Deterministic Agent-played Snake game for DeepSeek Harness. |
| [dsh-skillport](https://github.com/Jesse-njx/dsh-skillport) | 3 | ⚪ unknown | Every skill you already have — Claude Code, Codex, Cursor, Gemini CLI — works in DSH: Agent Skills SKILL.md discovery, Tier-2 con… |
| [dsh-book2skill](https://github.com/omdsh-dev/dsh-book2skill) | 4 | ⚪ unknown | DSH book-to-skill plugin: a 5-stage long task (fetch → parse → understand → generate → install) with 3 human gates, host tools fo… |
| [dsh-prime-agent](https://github.com/yoke233/dsh-prime-agent) | 4 | ⚪ unknown | Prime Agent-inspired persistent RLM control plane for DeepSeek Harness Code Mode |
| [dsh-fail-logger](https://github.com/Areium/dsh-fail-logger) | 9 | ⚪ unknown | dsh-fail-logger — DSH plugin (orchestration) |
| [dsh-routines](https://github.com/Jesse-njx/dsh-routines) | 1 | ⚪ unknown | dsh-routines — scheduled agents for DSH: run a prompt on a cron, get the digest where you already are (file digests, chatnode del… |
| [falsify-dsh](https://github.com/shi275773124/falsify-dsh) | 2 | ⚪ unknown | DeepSeek Harness adapter for the public Falsify CLI. Adjudicator receipt, not a second-opinion workflow. |
| [dsh-audio-dub](https://github.com/pinch-eng/dsh-audio-dub) | 2 | ⚪ unknown | Dub video and audio into 10 languages with voice cloning, from a DeepSeek Harness agent | DSH 视频/音频配音插件 |
| [dsh-governance](https://github.com/tappass/dsh-governance) | 1 | ⚪ unknown | The authority layer for agentic AI, as a DeepSeek Harness plugin. Governs every tool call against your business rules via TapPass… |
| [dsh-clawrouter](https://github.com/BlockRunAI/dsh-clawrouter) | 20 | 🟢 ok | A second brain for your DeepSeek Harness agent — strong-model review before risky tool calls, plus 70 models from one wallet. |
| [DSH-Chrome-devtools](https://github.com/yuzi-ska/DSH-Chrome-devtools) | 2 | ⚪ unknown | Real Chrome browser control for DeepSeek Harness agents, powered by Chrome DevTools MCP |
| [dsh-self-control-guard](https://github.com/pandashere/dsh-self-control-guard) | 5 | ⚪ unknown | Self-control guard plugin for DeepSeek Harness host exit and restart workflows. |
| [dsh-harness-mcp-server](https://github.com/chushixixin/dsh-harness-mcp-server) | 10 | ⚪ unknown | Expose DeepSeek Harness agent capabilities as an MCP server (brain=Hermes, arms=Harness) |
| [dsh-plugin-verify](https://github.com/qing3a/dsh-plugin-verify) | 1 | 🟢 ok | dsh-plugin-verify — DSH plugin (orchestration) |
| [dsh-schedule](https://github.com/csiroqa/dsh-schedule) | 3 | 🟢 ok | Scheduled tasks + status monitoring for DSH (cron-triggered agents). |
| [Pwiki](https://github.com/ang-XWBWZ/Pwiki) | 2 | ⚪ unknown | Local-first knowledge retrieval engine for AI agents — BM25, semantic search, reranking, MCP, Pi Agent and DeepSeek Harness integ… |
| [governed-workflow-for-dsh](https://github.com/zcx369658780/governed-workflow-for-dsh) | 3 | ⚪ unknown | Policy-enforced, evidence-first governed workflows for DeepSeek Harness agents. |
| [dsh-agent-eval](https://github.com/ShawnSiao/dsh-agent-eval) | 1 | 🟢 ok | Planned repeatable agent and plugin regression evaluation for DeepSeek Harness |
| [dsh-plugin-agent-dashboard](https://github.com/YYTbit/dsh-plugin-agent-dashboard) | 1 | ⚪ unknown | Multi-agent dashboard skill for DeepSeek Harness |
| [amber-protocol](https://github.com/Bandersnatch0x/amber-protocol) | 1 | ⚪ unknown | Amber Protocol: repository-local governance for coding agents, including a DeepSeek Harness (dsh) patch overlay. |
| [dsh-eval-harness](https://github.com/BiBoyang/dsh-eval-harness) | 12 | 🟢 ok | DSH 插件评测工具：YAML 用例驱动真实 agent 回归评测 + baseline 对比 PASS/WARN/FAIL 门禁｜Regression eval harness for DeepSeek Harness plugins |
| [sai](https://github.com/Very12345/sai) | 1 | ⚪ unknown | A local-first Android coding agent powered by the official DeepSeek Harness |
| [vpshub](https://github.com/Sdongmaker/vpshub) | 1 | ⚪ unknown | VPS Hub for DeepSeek Harness: SSH ledger plugin — agents discover, test, execute on, and transfer files to your cloud servers. Ke… |
| [deepseek-harness-flow](https://github.com/alison-xx/deepseek-harness-flow) | 1 | ⚪ unknown | Visual workflows and multi-model evaluation for DeepSeek Harness |
| [dsh-voice](https://github.com/Jesse-njx/dsh-voice) | 3 | 🟢 ok | Voice notes in, spoken answers out — dictate audio that becomes user messages (transcribe), have the agent read replies aloud (sp… |
| [dsh-product-delivery-workflow](https://github.com/wellorbetter/dsh-product-delivery-workflow) | 2 | ⚪ unknown | 100% AI-native product delivery workflow plugin for DeepSeek Harness: full product-to-release pipeline (research → PRD → OpenSpec… |
| [dsh-plugin-dev-skill](https://github.com/green-dalii/dsh-plugin-dev-skill) | 3 | ⚪ unknown | dsh-plugin-dev-skill — DSH plugin (orchestration) |
| [vscode-deepseek-harness](https://github.com/kalynnka/vscode-deepseek-harness) | 3 | ⚪ unknown | Unofficial: drive your own DeepSeek Harness (dsh) as a native VS Code chat agent, beside Claude Code and Codex. |
| [dsh-gitflow](https://github.com/lonelymoon87/dsh-gitflow) | 2 | 🟢 ok | Git status, diff, commit, pull request, and worktree workflows for DeepSeek Harness. |
| [dsh-plugin-verified-search](https://github.com/f0909172434/dsh-plugin-verified-search) | 1 | ⚪ unknown | Verified current-source search workflow for DeepSeek Harness |
| [dsh-landscape](https://github.com/cyanseek/dsh-landscape) | 7 | ⚪ unknown | Agent-first DeepSeek Harness plugin intelligence: verify existing plugins, identify missing capabilities, and generate build-read… |
| [dsh-wecom](https://github.com/TtTRz/dsh-wecom) | 3 | 🟢 ok | WeCom AI Bot channel for DeepSeek Harness — every chat runs a persistent, preset-backed agent with real tools. |
| [dsh-push](https://github.com/kiim-wong/dsh-push) | 0 | 🟢 ok | Push DeepSeek Harness agent lifecycle notifications to configurable channels |
| [sai-dsh-plugins](https://github.com/Very12345/sai-dsh-plugins) | 0 | ⚪ unknown | First-party DeepSeek Harness plugins for the sai Android coding agent |
| [dsh-shift-router](https://github.com/green-dalii/dsh-shift-router) | 1 | ⚪ unknown | Two-tier model router for DeepSeek Harness — LLM-Judge routing, multi-model fallback chains, exponential-backoff failover, and ta… |
| [dash](https://github.com/songqikong/dash) | 2 | ⚪ unknown | DASH — Deepseek Agentic Service Harness |
| [delivery-review-dsh-plugin](https://github.com/xiaoxiao-svg/delivery-review-dsh-plugin) | 0 | ⚪ unknown | delivery-review-dsh-plugin — DSH plugin (orchestration) |
| [dsh-gatedflow](https://github.com/TtTRz/dsh-gatedflow) | 2 | ⚪ unknown | Gated, durable human-in-the-loop workflow engine for DeepSeek Harness. |
| [dsh-browser-bridge](https://github.com/egnmosk/dsh-browser-bridge) | 2 | ⚪ unknown | DeepSeek Harness plugin + browser extension bridge: browser_* agent tools (navigate, click, type, screenshot, eval) over a localh… |
| [DeepJIT](https://github.com/fly3366/DeepJIT) | 2 | ⚪ unknown | JIT compiler plugin for deepseek-harness: compiles recurring agent workflows into hot skills and flow templates |
| [dsh-orchestrator](https://github.com/zibo2025/dsh-orchestrator) | 5 | 🟢 ok | 【编排模式】为 DeepSeek Harness 提供多智能体编排模式：主智能体分解分派、worker 全网格互通，支持逐 worker 指定模型与思考强度 |
| [deepseek-harness-skillx](https://github.com/drowned-fish1/deepseek-harness-skillx) | 2 | ⚪ unknown | DeepSeek Harness plugin for safely discovering, auditing, and adopting external Agent Skills — prompt-injection and AgentBaiting… |
| [dsh-a2a](https://github.com/dpskh/dsh-a2a) | 7 | 🟢 ok | Agent2Agent mesh for the Harness |
| [oh_my_deepseek_harness](https://github.com/bernardleex526/oh_my_deepseek_harness) | 3 | ⚪ unknown | DeepSeek Harness 多智能体编排模式 — 灵感来自 oh-my-opencode-slim |
| [dsh-tool-hackernews](https://github.com/tanf1ng/dsh-tool-hackernews) | 1 | ⚪ unknown | Hacker News tool suite (hn_top_stories, hn_search, hn_item) for DeepSeek Harness agents |
| [dsh-acp-plugin](https://github.com/agentic-control-plane/dsh-acp-plugin) | 6 | ⚪ unknown | Agentic Control Plane for DeepSeek Harness — policy-check every tool call before it runs |
| [dsh-subagent-tools](https://github.com/lynx-gt/dsh-subagent-tools) | 2 | ⚪ unknown | DeepSeek Harness subagent delegation enhancement |
| [dsh-delegate](https://github.com/FEOH333/dsh-delegate) | 2 | ⚪ unknown | dsh-delegate: model-aware subagent delegation for DeepSeek Harness — per-call models, depends_on dependency gating, per-child per… |
| [dsh-dashboard](https://github.com/Uddoo/dsh-dashboard) | 3 | 🟢 ok | Symphony-compatible Linear issue orchestrator and native operations dashboard for DeepSeek Harness. |
| [dsh-preset-minimal-windows](https://github.com/zeroa234/dsh-preset-minimal-windows) | 3 | ⚪ unknown | Minimal Windows agent preset + Git Bash tool for DeepSeek Harness: gitbash & pwsh & str_replace_editor, drop-in replacement for t… |
| [dsh-minecraft-dev](https://github.com/Leawind/dsh-minecraft-dev) | 3 | ⚪ unknown | 一个面向 Minecraft 模组开发的 DeepSeek Harness Agent 预设 |
| [deepagent](https://github.com/justinhuangai/deepagent) | 3 | ⚪ unknown | The agent that gets your work done. Built on DeepSeek Harness: Everything is a Plugin. |
| [dsh-subagent-cwd](https://github.com/lynx-gt/dsh-subagent-cwd) | 3 | ⚪ unknown | DeepSeek Harness subagent delegation enhancement |
| [dsh-self-evolution](https://github.com/Lhy723/dsh-self-evolution) | 2 | 🟢 ok | Benchmark-driven self-evolution for DeepSeek Harness · 冻结基准上的 Agent Profile 自我进化：评测 → 候选 → 严格接受/回滚 |
| [dsh-test-workbench](https://github.com/dmsobtl/dsh-test-workbench) | 2 | ⚪ unknown | 基于 DeepSeek Harness 的测试工作台 Profile —— 开箱即用的 QA Agent。 |
| [WorkbuddySkillGroups4DSH](https://github.com/darker2016/WorkbuddySkillGroups4DSH) | 1 | ⚪ unknown | WorkBuddy 专家团 Skill 开源包 → DeepSeek Harness (dsh) 插件式 skillgroups 包：44 个多角色专家团队 SKILL.md bundle，支持 ~/.dsh/skills 安装与 Cordis 插件注册。W… |
| [dsh-advisor](https://github.com/slhssb/dsh-advisor) | 0 | 🟢 ok | Independent-model advisory review for DeepSeek Harness: after each tool step, a reviewer model audits the agent's operations and… |
| [dsh-wsl-bridge](https://github.com/ch1bug/dsh-wsl-bridge) | 1 | ⚪ unknown | Windows access tools for WSL agents: win_ls/win_read/win_write/win_run/win_open/win_path/win_drives as a DeepSeek Harness bundle |
| [dsh-phone](https://github.com/railgun0325/dsh-phone) | 16 | ⚪ unknown | 让 DeepSeek Harness 的 agent 跑在手机里，通过 Magisk root 原生操作安卓系统（截图/点击/滑动/开应用）+ 移动端布局 + WebView APK |
| [dsh-godot-tool](https://github.com/Fromlan/dsh-godot-tool) | 2 | ⚪ unknown | Drive the Godot 4.x editor from an AI agent: Godot agent_rpc addon + DeepSeek Harness dsh-tool-godot plugin (loopback TCP JSON-li… |
| [dsh-plugin-dated-folders](https://github.com/Aeanfx/dsh-plugin-dated-folders) | 0 | 🟢 ok | 本插件由 DeepSeek Harness AI 完全制作，人工仅辅助操作（账号/上传/2FA 发布）。Tidy by date — every file your agent generates is archived into a YYYY-MM-DD_… |
| [dsh-kun-like-pet](https://github.com/liyupi/dsh-kun-like-pet) | 85 | 🟢 ok | Kun Like 桌宠 —— DeepSeek Harness 桌面宠物插件：右下角小坤宠随 Agent 工作状态切换 9 种动作，任务完成播放「你干嘛~哎哟」 |
| [dsh-file-review](https://github.com/left0ver/dsh-file-review) | 24 | 🟢 ok | a dsh plugin - review files that an agent just changed,you can see the diff |
| [embedded-workbench](https://github.com/AmethystLuna/embedded-workbench) | 1 | ⚪ unknown | Embedded C/C++ AI engineering plugin — firmware skills (FreeRTOS, Keil, HardFault, state machines) + 1% Rule / Plan Verification… |
| [dsh-workflow-worktree](https://github.com/lisycotana/dsh-workflow-worktree) | 0 | ⚪ unknown | Git worktree isolation backend for DeepSeek Harness workflows: implements the registerIsolationAdapter() seam so isolation: 'work… |
| [dsh-plugin-finder](https://github.com/meme-dog/dsh-plugin-finder) | 2 | ⚪ unknown | Find and audit DeepSeek Harness (DSH) plugins inside the agent — live `dsh-plugin` topic search + source audit with trial-to-prod… |
| [Code2Skill](https://github.com/leechen298/Code2Skill) | 8 | ⚪ unknown | Generate Function, MCP, Agent Skill, and offline test packages from existing code; installable as a DeepSeek Harness bundle. |
| [Vibe-Skills](https://github.com/foryourhealth111-pixel/Vibe-Skills) | 2981 | ⚪ unknown | VibeSkills is a general-purpose Skill that automatically routes local Skills and intelligently orchestrates harness workflows. |
| [kph](https://github.com/ylouis8/kph) | 2 | ⚪ unknown | 基于dsh的量化研究agent，驱动真实回测与交易。 |
| [dsh-skill-lord-serf](https://github.com/ttxl314/dsh-skill-lord-serf) | 1 | ⚪ unknown | DeepSeek Harness 插件：Lord/Serf 协议 0.5 技能，让 DSH 实现文件式多智能体编排（Lord 派活，Serf 干活）。 DeepSeek Harness plugin: Lord/Serf protocol 0.5 skill… |
| [plugin-team-board](https://github.com/whyihaveyou/dsh-suite) | 7 | 🟢 ok | Shared task board for multi-agent sessions: create/claim/update/list tasks across subagents, persisted via the append-only sessio… |
| [dsh-plugin-greet](https://github.com/0lidaxiang/dsh-plugin-greet) | 5 | 🟢 ok | DeepSeek Harness is a plugin-based system for building AI agents. Everything, from tools and models to the web UI, can be added o… |
| [dsh-plugin-pet](https://github.com/c-ling/dsh-plugin-pet) | 5 | ⚪ unknown | DeepSeek Harness 桌面电子宠物插件：跟随 agent 状态变换心情的内置/自定义/Codex 精灵图伙伴。 |
| [dsh-llm-proxy](https://github.com/Ye-Yu-Mo/dsh-llm-proxy) | 4 | ⚪ unknown | DeepSeek Harness (dsh) 全局 HTTP 代理插件：undici setGlobalDispatcher + EnvHttpProxyAgent，配置化、热切换、可观测 |
| [dsh-mobile-gui-agent](https://github.com/kunjinkao-os/dsh-mobile-gui-agent) | 9 | ⚪ unknown | Android Mobile GUI Agent plugin for DeepSeek Harness with ADB control, iterative verification, approvals, and a Web mobile view |
| [dsh-smarthome](https://github.com/YLifeOnlyOnce/dsh-smarthome) | 6 | 🟢 ok | Home Assistant control for DeepSeek Harness agents — approval-gated lights, switches, climate. 给 DeepSeek Harness agent 的 Home As… |
| [dsh-plugin-development](https://github.com/w2112515/dsh-plugin-development) | 14 | ⚪ unknown | Installable DeepSeek Harness bundle that teaches agents to develop and audit DSH plugins. |
| [dsh-codex-pet](https://github.com/skr311/dsh-codex-pet) | 6 | 🟢 ok | dsh-codex-pet · DSH 桌面宠物插件 — 导入精灵图序列帧宠物，悬浮浮层渲染 + Agent 状态联动 |
| [dsh-role-router](https://github.com/SnowAmberX/dsh-role-router) | 4 | ⚪ unknown | Role-based model routing plugin for DeepSeek Harness: planner/subagent roles plus a settings card and composer summary |
| [DeepSeekHarnessRemoteGateway](https://github.com/lbwnb666-ai/DeepSeekHarnessRemoteGateway) | 20 | ⚪ unknown | 一个轻量级 DeepSeek Harness 远程网关，让你通过 Web 或移动设备远程访问和控制本地 AI Agent |
| [dsh-story](https://github.com/Treasure-hub-agent/dsh-story) | 2 | ⚪ unknown | DSH 互动小说插件：全量 UI 叙事面板 + 悬浮窗信息层，把选项驱动的沉浸式剧情做成 DeepSeek Harness 原生体验 |
| [dsh-codex-agent-bridge](https://github.com/je00/dsh-codex-agent-bridge) | 2 | ⚪ unknown | Use the Codex models included with your ChatGPT subscription directly in DeepSeek Harness—no API key or separate API billing. |
| [dsh-dynamic-island](https://github.com/YLifeOnlyOnce/dsh-dynamic-island) | 4 | ⚪ unknown | A tiny glass companion for DeepSeek Harness — it breathes while the agent thinks, pulses while it works, and politely checks with… |
| [dsh-plugin-audiolib](https://github.com/yangyue1974/dsh-plugin-audiolib) | 3 | 🟢 ok | Ambient soundtrack for DeepSeek Harness, driven by agent state. Streams 100k+ cleared tracks from AudioLib.ai — a track always fi… |
| [dsh-file-explorer](https://github.com/Zalpha263/dsh-file-explorer) | 4 | ⚪ unknown | 可以像其他agent一样查看当前工作区的文件夹，并且可以预览文件 |
| [dsh-skill-panel](https://github.com/hexbee/dsh-skill-panel) | 2 | ⚪ unknown | DSH plugin: manage agent skills in settings | DSH 插件：设置页技能管理面板 |
| [dsh-agent-board](https://github.com/MiloMMIN/dsh-agent-board) | 2 | ⚪ unknown | 跨 Agent 工作台:dsh persistent plugin that watches Claude Code / Codex / Kimi Code / Pi / Hermes and continues their work with one cl… |
| [dsh-science-workbench](https://github.com/poplarity/dsh-science-workbench) | 7 | 🟢 ok | A reproducible science workbench plugin for the DeepSeek Harness: agent-driven cells, inline figures with feedback/rerun, manifes… |
| [dsh-vscode](https://github.com/MJ-Chang/dsh-vscode) | 5 | ⚪ unknown | DeepSeek Harness for VS Code: right-side chat agent that reads, edits, and runs your project — like Claude Code / Codex / Copilot. |
| [sandbase-skills](https://github.com/sandbaseai/sandbase-skills) | 51 | ⚪ unknown | Native DeepSeek Harness skills for research and growth workflows, with an npm CLI that installs complete bundles into .dsh/skills… |
| [dsh-plugin-acn](https://github.com/acnlabs/dsh-plugin-acn) | 2 | ⚪ unknown | DeepSeek Harness plugin: join ACN so this agent can discover, message, and collaborate with other agents. Defaults to the China r… |
| [dsh-fleet-audit](https://github.com/LeslieWylie/dsh-fleet-audit) | 1 | ⚪ unknown | DSH agent-fleet hygiene audit plugin: credential-file permissions, embedded git-remote credentials (masked), provider token liter… |
| [dsh-agent-hub](https://github.com/Luoye-1026/dsh-agent-hub) | 2 | ⚪ unknown | dsh-agent-hub是一个统一指挥本机 Agent的 DSH 插件，目前支持（Codex / Reasonix / Pi / DSH） |
| [dsh-plugin-call-me](https://github.com/radres/dsh-plugin-call-me) | 6 | ⚪ unknown | Your DeepSeek Harness agent rings your actual phone: it asks out loud, you answer out loud, and what you said steers the run. |
| [dsh-plugin-kit](https://github.com/OneZero-Y/dsh-plugin-kit) | 3 | ⚪ unknown | Agent skills and a working template for building standalone DeepSeek Harness (DSH) plugins |
| [git-worktree](https://github.com/KHG420/git-worktree) | 2 | ⚪ unknown | DeepSeek Harness plugin: bind every conversation to its own isolated git worktree + branch in one click, so parallel agents work… |
| [godot-bridge](https://github.com/Smalldy/godot-bridge) | 14 | ⚪ unknown | DSH (DeepSeek Harness) plugin that launches and drives a running Godot 4.x game through its in-game TCP interaction server — repl… |
| [dsh-billing](https://github.com/nianpangzhi233/dsh-billing) | 3 | 🟢 ok | DSH web GUI realtime billing monitor: token/cost metering, DeepSeek v4 peak pricing, balance anchoring, sidebar pill + settings p… |
| [dsh-task-dag](https://github.com/LeemanCheung/dsh-task-dag) | 7 | ⚪ unknown | Persistent live DAG visualization for DeepSeek Harness subagents and workflows |
| [preset-center (场景预设)](https://github.com/whyihaveyou/dsh-suite/tree/main/packages/preset-center) | 1 | 🟢 ok | Out-of-the-box Chinese agent presets: Xiaohongshu notes / copy polishing / daily-weekly reports — one-click apply to official Age… |
| [dsh-s1](https://github.com/superagents-lab/dsh-s1) | 3 | 🟢 ok | Native s1 tools for the DeepSeek Harness (DSH): s1_search, s1_news, s1_crawl, s1_sitemap, s1_trending + bundled s1 skill |
| [dsh-stall-guard](https://github.com/akira399/dsh-stall-guard) | 3 | ⚪ unknown | DeepSeek Harness watchdog plugin: detects truly stalled agent turns (never killing in-progress tasks — in-flight operations are e… |
| [hermes-dsh-collab](https://github.com/Cavan-Ou/hermes-dsh-collab) | 6 | ⚪ unknown | Battle-tested multi-agent collaboration playbook for DeepSeek Harness: model-tier routing, spec discipline, git single-writer rul… |
| [dsh-trajectory-governance](https://github.com/dfycaly98931680/dsh-trajectory-governance) | 4 | ⚪ unknown | Agent trajectory governance & anomaly diagnosis plugin for DeepSeek Harness (dsh): multi-branch trajectory trees, loop-deadlock /… |
| [ha-orchestrator](https://github.com/Saktawdi/ha-orchestrator) | 9 | ⚪ unknown | DeepSeek Harness（dsh）动态 Cordis 插件：模型高可用回退 + 子智能体编排（HA failover + orchestrate subagents） |
| [dsh-advisor](https://github.com/glangzh/dsh-advisor) | 1 | 🟢 ok | 给 DeepSeek Harness 的 Agent 增加一位"顾问"：日常任务使用较弱模型（默认模型），遇到真正困难的决策时，Agent 会自动向一个更强的模型咨询。 |
| [dsh-plugin-subagent-director](https://github.com/SeverusZh/dsh-plugin-subagent-director) | 10 | 🟢 ok | Subagent Director: per-subagent LLM provider/model selection with role templates for DeepSeek Harness (dsh plugin) |
| [pptfast](https://github.com/liustack/pptfast) | 7 | ⚪ unknown | Stable, editable PPTX generation for AI agents — semantic IR in, native DrawingML out. DSH plugin + Claude Code plugin + CLI. | 给… |
| [dsh-subagent-max](https://github.com/aaravarr/dsh-subagent-max) | 4 | ⚪ unknown | DeepSeek Harness (DSH) plugin — a subagent_with_model tool plus a live multi-panel subagent viewer. |
| [dsh-browser-companion](https://github.com/Tianyu209/dsh-browser-companion) | 4 | ⚪ unknown | A personal DSH browser plugin: persistent profile, visible window, human-in-the-loop login, and safe agent browser tools. |
| [dsh-gitbash-preset](https://github.com/liceses/dsh-gitbash-preset) | 136 | 🟢 ok | DeepSeek Harness 插件：一键安装「极简模式 (Git Bash)」agent preset —— 把 DSH 自带极简模式中的 bash 调用映射到 Git for Windows 的 bash（MSYS），让 Windows 上的极简模式真… |
| [oh-my-deepseek-harness](https://github.com/YYTbit/oh-my-deepseek-harness) | 3 | ⚪ unknown | Multi-agent orchestration for DeepSeek Harness |
| [dsh](https://github.com/Bin-hy/dsh) | 13 | ⚪ unknown | 源码级拆解 DeepSeek Harness · 面向 Agent 开发者的中文学习资料 |
| [dsh-opencode-usage](https://github.com/vinyumao/dsh-opencode-usage) | 3 | ⚪ unknown | DSH plugin: OpenCode Go 套餐用量显示（滚动/每周/每月用量百分比与重置倒计时 + Agent 工具 opencode_go_usage）。官方 bundle 插件，安装: dsh plugin --profile web add gi… |
| [dsh-finance](https://github.com/zhang787jun/dsh-finance) | 6 | ⚪ unknown | Finance and accounting workflows for DeepSeek Harness, adapted from Anthropic Finance |
| [dsh-grok-geo](https://github.com/xuboboo/dsh-grok-geo) | 3 | ⚪ unknown | DSH (DeepSeek Harness) plugin bundle: grok-geo GEO brand audit agent skill - AI-search visibility, recommendations, citations, co… |
| [dsh-cluster](https://github.com/Lanxi26/dsh-cluster) | 2 | ⚪ unknown | 画布式多智能体协作插件 | Canvas-based multi-agent cooperation plugin for DeepSeek Harness |
| [dsh-live2d-pets](https://github.com/cyanfish-x/dsh-live2d-pets) | 12 | 🟢 ok | Live2D 桌宠插件 for DeepSeek Harness：Agent 状态镜像 + 互动陪伴，内置宽松许可预设模型 / Live2D pet plugin: agent state mirror + interactive companion wit… |
| [dsh-awiki](https://github.com/AgentConnect/dsh-awiki) | 11 | 🟢 ok | AWiki identity and messaging plugin for DeepSeek Harness |
| [dsh-tool-writing](https://github.com/x2802490130-prog/dsh-tool-writing) | 7 | 🟢 ok | Writing engine for DeepSeek Harness: long-form web-novel orchestration with a separate DeepSeek key, lore management, semantic re… |
| [oh-my-dsh](https://github.com/agi-fans/oh-my-dsh) | 22 | 🟢 ok | omdsh is a plugin-first terminal coding agent built on DeepSeek Harness, with an interaction model inspired by oh-my-pi. |
| [oh-my-dsh](https://github.com/Jonah-Wu23/oh-my-dsh) | 3 | ⚪ unknown | Minimal-stable DeepSeek Harness preset with Linux-shaped persistent Bash, native Windows support, on-demand capability routing, a… |
| [clawock](https://github.com/KCNyu/clawock) | 12 | ⚪ unknown | AI argues. Code settles. The losses stay on the page. A portable investment decision-workflow plugin and verifiable harness, prov… |
| [mcp-sentinel](https://github.com/GCS-ZHN/mcp-sentinel) | 5 | ⚪ unknown | Harness agent plugin that acts as a sentinel between the AI agent and MCP servers — polling long-running tasks so token-costly st… |
| [ds-spec-loop](https://github.com/songyang0603/ds-spec-loop) | 36 | ⚪ unknown | Portable Agent Skill for repository-native Spec programming, informed by public DeepSeek Harness engineering patterns. |
| [dsh-agent-team-gui](https://github.com/toolclub/dsh-agent-team-gui) | 127 | 🔴 broken (failed once, retried — install blocked by pnpm build-script policy (allowBuilds) — plugin likely OK, CI policy blocks git prepare scripts) | Persistent multi-model agent squads for DeepSeek Harness — reusable teams, per-agent model/tool policies, and ordinary-chat colla… |
| [dsh-global-rules](https://github.com/badai147/dsh-global-rules) | 10 | ⚪ unknown | 在 DeepSeek Harness Web 设置面板中编辑 ~/.dsh/AGENTS.md 全局规则的插件 |
| [dsh-zotero](https://github.com/Vncntvx/dsh-zotero) | 9 | 🟢 ok | Let agents search, read, and cite your local Zotero library: find papers, browse notes and annotations, pull evidence by question… |
| [dsh-ankh-guard](https://github.com/Khorsheed/dsh-ankh-guard) | 6 | ⚪ unknown | 防止 Agent 自我修改把服务改崩的守护插件（dsh 插件）：绿色构建凭证绑定 git HEAD，改坏不许重启；watchdog 无感重启 + canary 自动回滚 |
| [caliper](https://github.com/edonadei/caliper) | 39 | ⚪ unknown | Know if your agent skill actually works. A lightweight evaluation harness that tracks a success rate across Claude Code, Codex, P… |
| [dsh_workflow](https://github.com/omdsh-dev/dsh_workflow) | 98 | 🔴 broken (dump-config exit=0 but plugin not found in composed tree) | 把Claude Code的UltraCode模式带给DSH，把 DSH 的一次性多 Agent 调度，升级为可生成、可保存、可治理、可观察、可恢复的 Workflow 层 |
| [dsh-expert-mode](https://github.com/Asher-2000/dsh-expert-mode) | 8 | ⚪ unknown | DSH (DeepSeek Harness) 专家模式 agent preset — 统筹团长 + 10 位领域专家子代理 Expert-mode preset for DeepSeek Harness |
| [dsh-router-flash](https://github.com/xiaoxianyu-office/dsh-router-flash) | 14 | ⚪ unknown | DSH bundle 插件：V4 Flash 神模式（opencode-go）agent preset 分发包，dsh plugin add 安装后自动同步 router-flash preset。DSH agent preset bundle for De… |
| [dsh-anchored-flash](https://github.com/ruler770525/dsh-anchored-flash) | 6 | ⚪ unknown | Anchored-standard agent preset for DeepSeek Harness: Minimal-aligned first request, low-injection post-promotion, indirect AGENTS… |
| [dsh-loop-dock](https://github.com/euuuuuuzer/dsh-loop-dock) | 6 | ⚪ unknown | A loop dock for DeepSeek Harness: one harness, multiple agent loops. |
| [dsh-chinese-traditional-wisdom-skill](https://github.com/dhicoc/dsh-chinese-traditional-wisdom-skill) | 23 | ⚪ unknown | 中华传统智慧（玄枢）AI Agent 技能包的 DeepSeek Harness（dsh）Cordis 插件：八字/紫微/六爻/梅花/奇门/风水/五运六气/体质全融合，本地确定性引擎 + 可视化 Dashboard，一行 dsh plugin add 安装。 |
| [dsh-deepread](https://github.com/xiehuan123/dsh-deepread) | 39 | 🟢 ok | Evidence-first deep reading for AI agents — trace claims, evidence, confidence and knowledge maps across articles, books and PDFs. |
| [kimi-tide](https://github.com/tafcear/kimi-tide) | 4 | ⚪ unknown | 月汐 — Kimi Code (Moonshot) 接入 DeepSeek Harness 的完整方案：标准 DSH 插件 + Kimi CLI 桥接维护 fork + Agent 协作闭环方法论 |
| [dsh-plugin-guard](https://github.com/lxzy-7/dsh-plugin-guard) | 31 | ⚪ unknown | Install safety net for DeepSeek Harness: pre-install snapshots, one-click/automatic rollback, guarded boot, and incident reports… |
| [dsh-file-upload](https://github.com/HongMing-Huang/dsh-file-upload) | 14 | 🟢 ok | DeepSeek Harness (dsh) file-message plugin: Claude-style drag-and-drop / paperclip upload, content sniffing, document-to-Markdown… |
| [dsh-browser4](https://github.com/platonai/dsh-browser4) | 6 | 🟢 ok | Browser4 — an AI-native browser engine for autonomous agents, intelligent extraction, and large-scale web automation. |
| [dsh-fate-spectrum](https://github.com/EchoUser005/dsh-fate-spectrum) | 9 | 🟢 ok | DeepSeek Harness plugin for Bazi & Zi Wei Dou Shu — deterministic, offline fate-chart calculation for AI agents. |
| [dsh-agent-skills](https://github.com/minivv/dsh-agent-skills) | 7 | 🟢 ok | Discover and manage Agent Skills inside DeepSeek Harness |
| [dsh-plugin-mcp-manager](https://github.com/HuanLinOTO/dsh-plugin-mcp-manager) | 4 | ⚪ unknown | MCP 服务器管理面板：GUI 增删改 MCP 服务器配置（写入 cordis.patch.yml + HMR 实时挂载）+ 工具浏览 + agent 面 mcp_* 管理工具 | MCP server management panel: GUI add/e… |
| [dsh-quant](https://github.com/pengpengyi92/dsh-quant) | 20 | 🟢 ok | dsh plugin: quantitative tools for agents — market data (Binance public API), technical indicators (SMA/EMA/RSI/MACD/Bollinger/AT… |
| [dsh-ha-orchestrator](https://github.com/Saktawdi/dsh-ha-orchestrator) | 9 | 🟢 ok | DeepSeek Harness（dsh）动态 Cordis 插件：模型高可用回退 + 子智能体编排（HA failover + orchestrate subagents） |
| [dsh-plugin-codegraph](https://github.com/CC19990113/dsh-plugin-codegraph) | 10 | ⚪ unknown | Structural code intelligence for DeepSeek Harness (dsh) — gives the agent codegraph and codegraph_index tools to find where a sym… |
| [toolshrink](https://github.com/unclecode/toolshrink) | 10 | ⚪ unknown | Cut large agent tool output by what it means, not by where it was cut. 9 content-aware reducers + DeepSeek Harness plugin. |
| [dsh-ffmpeg](https://github.com/STARDUSTLC666/dsh-ffmpeg) | 4 | 🟢 ok | DeepSeek Harness 视频处理插件：ffmpeg_probe/cut/concat/encode/subtitle/extract/gif 七工具，走官方 subprocess 服务、argv 数组无 shell 注入、零运行时依赖；纯 Node… |
| [Flowboard](https://github.com/juntaoding/Flowboard) | 12 | ⚪ unknown | 运行在 DeepSeek Harness 中的开源办公协作与团队管理插件，让目标、会议、Agent 执行、进度和资料在同一套办公逻辑中持续流动。 |
| [dsh-plugin-doctor](https://github.com/zoahdev/dsh-plugin-doctor) | 5 | ⚪ unknown | Health checks for DeepSeek Harness plugins: manifest, patch, entry, build, pack, fresh-profile install verification — CLI + agent… |
| [dsh-tavern](https://github.com/flizzywine/dsh-tavern) | 34 | ⚪ unknown | 基于 DeepSeek Harness（DSH）的 SillyTavern 类文字游戏 Agent，支持候选项生成、对话式人物卡编辑、剧本模式与素材抽取。 |
| [dshelm](https://github.com/Altairpaca/dshelm) | 5 | ⚪ unknown | DSHelm — The batteries-included agent layer for DeepSeek Harness. OmO-inspired. DSH-native. Ecosystem-composable. |
| [dsh-community-plugins](https://github.com/HubaKing/dsh-community-plugins) | 5 | ⚪ unknown | DeepSeek Harness (dsh) plugin: registers a global skill that teaches agents how to discover, evaluate and install community plugi… |
| [dsh-octo](https://github.com/tokentopo-ai/dsh-octo) | 8 | ⚪ unknown | an heterogeneous multi-agent collaboration skill designed for dsh |
| [dshw](https://github.com/kermanx/dshw) | 8 | ⚪ unknown | PR workflow plugin for DeepSeek Harness |
| [querit-plugins](https://github.com/querit-ai/querit-plugins) | 7 | ⚪ unknown | Official Querit search plugins for AI agent harnesses: pi-querit (Pi extension), dsh-querit (DeepSeek Harness web seam), opencode… |
| [dsh-Kingdom](https://github.com/lusblead/dsh-Kingdom) | 12 | ⚪ unknown | 在 DSH 中建立属于你的 Agent 王国——让 Agent 拥有角色、权限、领地与治理秩序，并通过事实验证机制与权威账本，让每一次执行、声明与裁决都可核验、可追溯。 |
| [dsh-evolve-modes](https://github.com/GraySilver/dsh-evolve-modes) | 94 | ⚪ unknown | 让 Agent 的工作方式可组合、可审查、可持续改进，最终实现 Agent Self Evoling。 DeepSeek Harness Web plugin with composable task controls and isolated, human… |
| [hard-flash](https://github.com/Soulize/hard-flash) | 10 | ⚪ unknown | A DeepSeek Harness (dsh) agent preset for making large engineering tasks deliberate, integrated, and verifiable from the first tu… |
| [dsh-virtual-product-team](https://github.com/songoao25/dsh-virtual-product-team) | 5 | ⚪ unknown | Product Team Mode - a DeepSeek Harness agent preset: user-led conversation with a virtual product team (PM to Engineer to QA to R… |
| [dsh-ego-browser](https://github.com/Fisfzy/dsh-ego-browser) | 40 | ⚪ unknown | DSH（DeepSeek Harness）插件：把 ego-lite 浏览器（给 AI Agent 用的 Chromium）接入 HARNESS——13 个结构化 ego_* 工具（文本语义快照、语义定位点击、表单填充、截图、CDP 控制、任务空间隔离），内… |
| [dsh-ux](https://github.com/ayuanwong/dsh-ux) | 14 | ⚪ unknown | 长任务，不刷屏：关键进度清晰可见，完成后自动折叠，详情随时展开。 Long agent tasks, without transcript clutter: focused progress, auto-folded history, details on… |
| [dsh-agency-agents](https://github.com/MichengAI/dsh-agency-agents) | 19 | ⚪ unknown | DSH agency agents 基于 DeepSeek Harness 的全行业智能体 |
| [dsh-skill-7d-code-reviewer](https://github.com/7dgroup-ai/dsh-skill-7d-code-reviewer) | 7 | ⚪ unknown | 这是一个专业级的 DSH（DeepSeek Harness）代码审查技能插件，由 7DGroup 团队开发，专为 AI 辅助代码审查场景设计。基于 TypeScript + Cordis 开发，以组合包（bundle）形式安装，通过 ctx.skills 注… |
| [deep-read-summarize](https://github.com/PensiveFei/deep-read-summarize) | 21 | ⚪ unknown | Deep reading & summarization workflow for books/papers/videos/web — plugin parsers, MapReduce deep-read, JSON Schema output, Obsi… |
| [holdem](https://github.com/shinjiyu/holdem) | 9 | ⚪ unknown | Embeddable NLHE engine for Cursor / DeepSeek Harness / Codex / CLI — portable ADL + multi-agent kernel |
| [hedgehog](https://github.com/skyf0xx/hedgehog) | 30 | ⚪ unknown | AI-driven development with power. Faster builds, fewer tokens, cleaner code. Hedgehog builds a task dependency graph from your sp… |
| [dsh-router-standard](https://github.com/yjh051108/dsh-router-standard) | 373 | ⚪ unknown | Task-aware reasoning-mode router for DeepSeek Harness: three measured behavior bands (spec/mixed/react) with phase-transition evi… |
| [dsh-thinking-effort](https://github.com/hytime/dsh-thinking-effort) | 10 | ⚪ unknown | Configurable reasoning levels for hand-declared DSH llm-pi-ai models, with bilingual settings and subagent defaults. |
| [dsh-file-review-tab](https://github.com/Lzh3070/dsh-file-review-tab) | 10 | ⚪ unknown | dsh-better-sidebar 侧边栏 Tab 版文件改动审查：行级红绿 diff + 撤销，chat 行深链（移植自 left0ver/dsh-file-review）/ Review agent file changes as a dsh-bett… |
| [pptwise](https://github.com/liustack/pptwise) | 7 | ⚪ unknown | A real PowerPoint file. Not a picture of one. Tell your AI what to cover and pptwise builds an editable deck on your own machine.… |
| [dsh-lark-bridge](https://github.com/moyu-good/dsh-lark-bridge) | 1 | ⚪ unknown | Feishu/Lark IM bot channel for DSH agents: native thinking, approval cards, goal/todo realtime cards, workflow unfold, session se… |
| [dsh-raw-html](https://github.com/plolpl789/dsh-raw-html) | 13 | ⚪ unknown | VCP visual-synesthesia protocol plugin for DeepSeek Harness: render agent HTML output as real UI (cards / KaTeX math / Mermaid di… |
| [dsh-model-switch](https://github.com/lincong1987/dsh-model-switch) | 7 | ⚪ unknown | dsh plugin: flexible model switch for sub‑agent & plan execution. 为子代理和计划执行选择更合适的模型。 |
| [oh-my-knowledge](https://github.com/lizhiyao/oh-my-knowledge) | 17 | ⚪ unknown | OMK — Evidence-backed evaluation and observability for prompts, RAG, skills, agents, and workflows. Native Codex, Claude Code, an… |
| [dsh-Mimir-Academic-research](https://github.com/1692775560/dsh-Mimir-Academic-research) | 55 | ⚪ unknown | Mimir — 一站式科研工作台插件：LaTeX 论文边写边编译、arXiv 文献管理、实验追踪、指标图表、GPU 服务器 SSH 任务编排，管理科研全周期。An open-source research workbench plugin for the w… |

### 🔌 ACP

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-agent-messaging](https://github.com/happyren/dsh-agent-messaging) | 5 | 🟢 ok | Cross-session agent-to-agent messaging. |
| [widget-dock](https://github.com/MorGogh/widget-dock) | 4 | ⚪ unknown | DSH plugin: draggable widget panel (balance, tokens, stats, commands, goal, cost) for DeepSeek Harness |
| [dsh-ark-quota](https://github.com/lordqyxz/dsh-ark-quota) | 3 | ⚪ unknown | dsh-ark-quota — DSH plugin (acp) |
| [dsh-codex-bridge](https://github.com/pandashere/dsh-codex-bridge) | 1 | 🟢 ok | Codex CLI bridge plugin for DeepSeek Harness with host tools and a Web conversation tab. |
| [dsh-reasoning-translator](https://github.com/pinkllo/dsh-reasoning-translator) | 3 | ⚪ unknown | DeepSeek Harness plugin: make the model write its chain-of-thought in your language |
| [dsh-credentials-keychain](https://github.com/ShawnSiao/dsh-credentials-keychain) | 1 | ⚪ unknown | Planned OS-backed credential provider for DeepSeek Harness |
| [dsh-deepseek-balance](https://github.com/lin-cheng-lab/dsh-deepseek-balance) | 0 | 🟢 ok | dsh-deepseek-balance — DSH plugin (acp) |
| [dsh-deepseek-usage](https://github.com/ben7am1n/dsh-deepseek-usage) | 0 | 🟢 ok | DeepSeek balance and token usage tools for DeepSeek Harness |
| [dsh-balance-display](https://github.com/Liu-ty/dsh-balance-display) | 0 | ⚪ unknown | DeepSeek API balance overlay for DeepSeek Harness |
| [ds-balance-card](https://github.com/jasonsun29/ds-balance-card) | 3 | ⚪ unknown | ds-balance-card — DSH plugin (acp) |
| [dsh-balance-monitor](https://github.com/jelly-000/dsh-balance-monitor) | 9 | 🟢 ok | DeepSeek 账户余额、剩余比例条与今日花费，显示在 dsh 侧边栏底部 · DeepSeek balance, remaining-ratio bar and today's spend in the dsh sidebar footer. |
| [dsh-kimi-bridge](https://github.com/pandashere/dsh-kimi-bridge) | 1 | ⚪ unknown | Kimi CLI bridge plugin for DeepSeek Harness with review-only mode and a Web conversation tab. |
| [deepseek-harness-lan](https://github.com/oitsukiii/deepseek-harness-lan) | 6 | ⚪ unknown | Run DeepSeek Harness Web UI on your home LAN — 4 minimal patches + one-click apply/revert scripts | 让 DeepSeek Harness 的 Web UI 在… |
| [jina-dsh-plugin](https://github.com/minatoAI/jina-dsh-plugin) | 1 | ⚪ unknown | Jina AI tools for DeepSeek Harness: 12 model tools (web / arXiv / SSRN search, read, screenshot, embeddings, rerank, classify, PD… |
| [dsh-lsp-actions](https://github.com/PerryLink/dsh-lsp-actions) | 9 | 🟢 ok | LSP action surface for DeepSeek Harness: lsp_diagnostics, lsp_format, and lsp_completion tools over language servers |
| [dsh-chrome](https://github.com/YJSoooooo/dsh-chrome) | 1 | ⚪ unknown | Chrome profile bridge for DeepSeek Harness: control an existing signed-in Chrome profile through chrome_repl. |
| [dsh-exa-mcp](https://github.com/MicroHEROX/dsh-exa-mcp) | 3 | ⚪ unknown | Exa Search MCP for DeepSeek Harness: mounts the remote Exa MCP endpoint (https://mcp.exa.ai/mcp) through the in-box @deepseek-ai/… |
| [dsh-switch](https://github.com/dongsheng123132/dsh-switch) | 3 | ⚪ unknown | Evidence-first model control plane for DeepSeek Harness |
| [dsh-deepseek-balance](https://github.com/wangxiang0605qvq/dsh-deepseek-balance) | 0 | 🟢 ok | DeepSeek 余额插件：模型工具 + 侧边栏余额胶囊 | DeepSeek balance plugin for DSH: model tool + sidebar balance pill |
| [dsh-usage-stats](https://github.com/Ychris12138/dsh-usage-stats) | 117 | 🟢 ok | Token usage heatmap, per-model breakdowns, and DeepSeek account balance for the DeepSeek Harness Web GUI (dsh web). |
| [deepseek-harness-acp](https://github.com/openma-ai/deepseek-harness-acp) | 16 | ⚪ unknown | ACP server implementation for DeepSeek harness |
| [dsh-quota-panel](https://github.com/brittanistrehlowll-oss/dsh-quota-panel) | 4 | 🟢 ok | Provider quota/balance corner panel for the dsh web surface (DeepSeek Harness plugin): server-side credential proxies plus a conf… |
| [pi2dsh](https://github.com/weijiafu14/pi2dsh) | 159 | 🟢 ok | Bridge the Pi and DeepSeek Harness ecosystems: one Pi Host ABI runs unmodified Pi extensions as native DSH plugins. 打通 Pi 与 DSH 生… |
| [dsh-plugin-deepseek-balance](https://github.com/hnmrxz/dsh-plugin-deepseek-balance) | 4 | ⚪ unknown | 在 DeepSeek Harness (dsh) 底部状态栏实时显示 DeepSeek 账户余额。 |
| [dsh-weather](https://github.com/sunshine-lang/dsh-weather) | 7 | ⚪ unknown | Weather tool for DeepSeek Harness: current conditions and multi-day forecasts via Open-Meteo (free, no API key) |
| [dsh-pdf](https://github.com/sunshine-lang/dsh-pdf) | 7 | ⚪ unknown | PDF toolbox for DeepSeek Harness: extract text, metadata, and page ranges via pdfjs-dist (local, no API key) |
| [dsh-plugin-template](https://github.com/sunshine-lang/dsh-plugin-template) | 6 | ⚪ unknown | Ready-to-publish DeepSeek Harness plugin skeleton: bundle format, tool DSL, config, tests, and a scaffold script |
| [dsh-plugins](https://github.com/sunshine-lang/dsh-plugins) | 5 | ⚪ unknown | Unified portal for DeepSeek Harness plugins by sunshine-lang: dsh-weather, dsh-pdf, dsh-plugin-template |
| [Dcode](https://github.com/Deklan-Deng/Dcode) | 1 | ⚪ unknown | Deepseek-harness 桌面端 |
| [deepseek-harness-codex-bridge](https://github.com/Aloneswork/deepseek-harness-codex-bridge) | 3 | ⚪ unknown | Bidirectional MCP bridge for DeepSeek Harness and Codex collaboration |
| [dsh-easyssh](https://github.com/chenw2759-wq/dsh-easyssh) | 24 | ⚪ unknown | 用于远程ssh快速相应，同时可以直接在前端操作/查看远程服务器上的信息与代码。 |
| [dsh-plugin-deepseek-balance](https://github.com/fishxcode/dsh-plugin-deepseek-balance) | 0 | ⚪ unknown | DeepSeek Harness Web client plugin that displays real-time DeepSeek API balance. |
| [dsh-remote](https://github.com/flymysql/dsh-remote) | 37 | 🟢 ok | Remote-access assistant for DeepSeek Harness: /remote command and settings page printing the exact SSH tunnel / reverse-tunnel /… |
| [dsh-web-billing](https://github.com/bpc-oss/dsh-web-billing) | 11 | ⚪ unknown | RMB/USD token-billing plugin for DeepSeek Harness (dsh web): official-policy auto pricing with peak/off-peak hours, per-message l… |
| [dsh-spend](https://github.com/nonewind/dsh-spend) | 9 | 🟢 ok | Token usage & cost monitor for DeepSeek Harness — floating widget with multi-dimensional stats, time-series charts, auto-detected… |
| [dsh-Kimi-WebBridge](https://github.com/MicroHEROX/dsh-Kimi-WebBridge) | 3 | 🟢 ok | Kimi WebBridge for DeepSeek Harness — a third-party dsh plugin bundle that turns the local Kimi WebBridge daemon into 15 native k… |
| [dsh-randomuuid-polyfill](https://github.com/Lehmaning/dsh-randomuuid-polyfill) | 1 | ⚪ unknown | dsh client plugin that installs crypto.randomUUID on insecure origins (plain HTTP over a LAN address) |
| [dsh-deepseek-quota](https://github.com/yingjunnan/dsh-deepseek-quota) | 3 | 🟢 ok | DeepSeek API quota (balance) widget for the DSH web GUI: a floating bottom-right card showing remaining DeepSeek API balance. |
| [dsh-deepseek-balance](https://github.com/dshiq04/dsh-deepseek-balance) | 0 | 🟢 ok | 面向deepseek harness的余额查看插件 |
| [api-cost-meter](https://github.com/kanallas/api-cost-meter) | 0 | ⚪ unknown | DeepSeek Harness API cost meter plugin: peak/off-peak spend badge, current unit prices, official account balance |
| [dsh-remote-acces](https://github.com/wuwuzhige-sudo/dsh-remote-acces) | 2 | ⚪ unknown | One-command setup for password-protected remote access to the DeepSeek Harness (dsh) web UI — dsh privileged-methods patch, Caddy… |
| [dsh-llm-oauth](https://github.com/ziyou979/dsh-llm-oauth) | 7 | ⚪ unknown | DeepSeek Harness plugin: OAuth / subscription-plan LLM providers (Grok, GitHub Copilot, OpenAI Codex, Anthropic, OpenRouter) |
| [dsh-lan-uuid-fix](https://github.com/Zenjibad/dsh-lan-uuid-fix) | 0 | ⚪ unknown | dsh bundle: polyfill crypto.randomUUID on insecure origins so the DeepSeek Harness Web UI works over plain-HTTP LAN |
| [dsh-plugin-finder](https://github.com/ihuajiu/dsh-plugin-finder) | 3 | ⚪ unknown | Natural-language plugin search for DeepSeek Harness — ask what you need, get matching dsh.so plugins with install commands. |
| [dsh-multi-user-gateway](https://github.com/AnkoCD/dsh-multi-user-gateway) | 15 | ⚪ unknown | 服务器端部署：DeepSeek Harness Web 多用户网关（登录门户 / 每用户实例隔离 / 交付文件抽屉）。部署于远程服务器，用户通过浏览器访问，非本机工具。 |
| [deepseek-harness-mobile](https://github.com/sorsama/deepseek-harness-mobile) | 41 | ⚪ unknown | Android companion for DeepSeek Harness | chat, goals, approvals & notifications from your phone, over your LAN. Kotlin + Jetpack… |
| [dsh-tailscale-console](https://github.com/evanfang0054/dsh-tailscale-console) | 1 | ⚪ unknown | 为 DeepSeek Harness 提供基于 Tailscale 的安全远程访问运营面板：一键健康检查、HTTPS 入口开关、macOS 代理绕过、中继服务器运维、ACL 生成。Tailscale remote-access control panel f… |
| [dsh-server-deployment](https://github.com/AnkoCD/dsh-server-deployment) | 15 | ⚪ unknown | 服务器端部署：DeepSeek Harness Web 多用户网关（登录门户 / 每用户实例隔离 / 交付文件抽屉）。部署于远程服务器，用户通过浏览器访问，非本机工具。 |
| [dsh-balance-eta](https://github.com/fzlong/dsh-balance-eta) | 2 | ⚪ unknown | DeepSeek Harness 极简余额插件：余额 + 今日消耗 + 可用时长预测 + 低余额告警（仅 CNY，价格无关免维护） |
| [dsh-think-any-lang](https://github.com/lco117/dsh-think-any-lang) | 3 | ⚪ unknown | DeepSeek Harness 插件：在「设置 → 通用」中选择模型推理思考（chain of thought）使用的语言。基于系统提示词实现，零额外调用、零延迟，支持 12 种语言。 |
| [dsh-balance](https://github.com/crazywoola/dsh-balance) | 23 | 🟢 ok | DeepSeek Harness balance plugin for the Settings page |
| [dsh-LAN](https://github.com/MrMu666/dsh-LAN) | 7 | ⚪ unknown | 为DeepSeek harness开启局域网访问及移动端页面的插件 |
| [dsh-provider-billing](https://github.com/ZeroingIn/dsh-provider-billing) | 1 | 🟢 ok | DeepSeek Harness plugin: provider account balance inside each Models settings row, queried through a loopback-pinned RPC channel… |
| [dsh-IDE](https://github.com/chenw2759-wq/dsh-IDE) | 24 | ⚪ unknown | 这是一个ssh前端程序，可以让UI体现类似lab的功能！用于远程ssh快速相应，同时可以直接在前端操作/查看远程服务器上的信息与代码。 |
| [dsh-usage-chart](https://github.com/Max-Samson/dsh-usage-chart) | 10 | 🟢 ok | A DeepSeek Harness Web plugin for real-time Token usage, cost estimates, per-round charts, and DeepSeek API balance. |
| [dsh-remote-ide](https://github.com/harryopo/dsh-remote-ide) | 3 | ⚪ unknown | SSH Remote IDE for DeepSeek Harness: connect via SSH and the IDE goes remote — explorer browses the server, editor reads/writes o… |
| [dsh-balance](https://github.com/linshule/dsh-balance) | 5 | 🟢 ok | DeepSeek API 账户余额实时显示插件（DSH Web GUI）：可拖拽左下角余额徽章 + 设置页 |
| [dsh-galgame](https://github.com/Lanxing6480/dsh-galgame) | 16 | ⚪ unknown | 我要成为Galgame高手！！将你的Vibe coding界面修改成为Galgame的样子，在不影响工作的情况下和赏心悦目的DeepSeek娘进行友好互动 |
| [dsh-plugin-deepseek-balance](https://github.com/CaoNing3212/dsh-plugin-deepseek-balance) | 2 | ⚪ unknown | Deepseek余额显示 |
| [dsh-lan-gate](https://github.com/hchao3335-maker/dsh-lan-gate) | 13 | 🟢 ok | 一个DSH内网访问插件 局域网设备安全访问本机 DSH 的即插即用网关：本机审批、设备令牌、限流、手机适配，单文件零依赖。 |
| [dsh-balance-float](https://github.com/x2802490130-prog/dsh-balance-float) | 5 | 🟢 ok | DSH 悬浮余额/一键退出插件 |
| [dsh-balance-monitor](https://github.com/Rainronin/dsh-balance-monitor) | 2 | 🟢 ok | 一个好看、简单、实用的余额监视器｜DeepSeek Harness 插件：官方余额快照 + ds_balance 工具 + Matrix 侧边栏徽章 |
| [dsh-api-balance](https://github.com/ArcanePivot/dsh-api-balance) | 5 | ⚪ unknown | DeepSeek Harness Web UI widget for viewing DeepSeek API balance from the host side. |
| [dsh-balance-plugin](https://github.com/Francis-Xavier-code/dsh-balance-plugin) | 55 | 🟢 ok | deepSeek 余额监控与用量统计（DSH 动态 Cordis 插件）：余额监控 · 官方充值入口 · 用量统计 · 三方插件管理 |
| [dsh-web-lan-access](https://github.com/AcidGr/dsh-web-lan-access) | 26 | ⚪ unknown | DeepSeek Harness (dsh) Web plugin |
| [hesi-dsh-plugins](https://github.com/qiuqiukof-oss/hesi-dsh-plugins) | 3 | ⚪ unknown | DeepSeek Harness (DSH) 插件 —— 圆桌讨论（Roundtable）与 一键执行流（Plan） Hesi 出品 · 同源实现 |
| [dsh-api-balance](https://github.com/9Epuuuu/dsh-api-balance) | 1 | 🟢 ok | DeepSeek account balance readout for DSH Web (dsh-plugin) |
| [dsh-prompt-polish](https://github.com/JoukoPuro/dsh-prompt-polish) | 4 | ⚪ unknown | 一个 DeepSeek Harness（DSH）插件： 在 Web 输入框的工具行中添加一个 ✨ 图标按钮。点击后选择打磨风格，已接入的大模型 会把你草稿中的提示词改写得更专业、更易被 AI 理解 。A DeepSeek Harness plugin: ic… |
| [DSH-Plan-Graph](https://github.com/HR2AY/DSH-Plan-Graph) | 13 | ⚪ unknown | another version of deepseek herness trajectory (DIY) |
| [dsh-writing-remote](https://github.com/x2802490130-prog/dsh-writing-remote) | 3 | 🟢 ok | Typert remote for dsh-tool-writing: exposes project, library and search data to the client writing panel. |
| [dsh-deepseek-quota](https://github.com/cn-scuo-oo/dsh-deepseek-quota) | 3 | 🟢 ok | DeepSeek Harness Web 侧边栏 DeepSeek API 额度卡片 + 充值面板插件 | Sidebar quota card & recharge panel for DeepSeek Harness: real-time officia… |
| [dsh-better-deepseek](https://github.com/EdgeTypE/dsh-better-deepseek) | 21 | 🟢 ok | DeepSeek Harness bridge plugin for Better DeepSeek Chrome extension. |
| [dsh-mobile-gate](https://github.com/Bernardxu123/dsh-mobile-gate) | 5 | ⚪ unknown | LAN mobile gateway for DeepSeek Harness (DSH): first-visit approval, per-device tokens, rate limiting, mobile layout injection. 局… |
| [dsh-pocket](https://github.com/shaobeichen/dsh-pocket) | 593 | 🟢 ok | 把 DeepSeek Harness 装进你的口袋：电脑上跑 dsh web，手机扫码即同步访问（局域网 + 公网，实时同屏） |
| [dsh-plugins-finder](https://github.com/ihuajiu/dsh-plugins-finder) | 3 | 🟢 ok | Natural-language plugin search for DeepSeek Harness — ask what you need, get matching dsh.so plugins with install commands. |
| [dsh-remote-tunnel](https://github.com/Linjiangxian0203/dsh-remote-tunnel) | 4 | 🟢 ok | Remote Host Tunnel Manager for dsh: remote port allocation + registry + resilient SSH tunnel |
| [model-usage-plugin](https://github.com/AKS1st/model-usage-plugin) | 7 | ⚪ unknown | 统计各模型 tokens 消耗并估算费用，显示账户余额 | Model token usage stats and cost estimation with account balance for DSH |
| [dsh-trajectory-governor](https://github.com/chunsi-w/dsh-trajectory-governor) | 9 | ⚪ unknown | 专为 pro 模型使用 Closed-loop trajectory policy plane for DeepSeek Harness |
| [dsh-usage](https://github.com/Aisland-SJL/dsh-usage) | 26 | 🟢 ok | Persistent dock & fully-customizable balance/usage panel for DeepSeek Harness — activity heatmap, dual-channel comparison, local-… |
| [dsh-qq-bridge](https://github.com/TomoyoNatsume/dsh-qq-bridge) | 11 | 🟢 ok | deepseek harness插件，连接QQ / DSH plugin for connecting QQ |
| [dsh-proxy](https://github.com/smanx/dsh-proxy) | 7 | ⚪ unknown | HTTP + WebSocket 反向代理：把局域网端口转发到本地 DSH 服务 |
| [dsh-damage-pulse](https://github.com/wssfk12138/dsh-damage-pulse) | 118 | ⚪ unknown | DeepSeek Harness token balance monitor with game-style damage pulse animations |
| [dsh-reminder](https://github.com/Aisland-SJL/dsh-reminder) | 13 | 🟢 ok | Cross-window completion & approval notifications for DeepSeek Harness — popup reminders that bring you back to DSH, Codex/WorkBud… |
| [dsh-mobile](https://github.com/saya-ch/dsh-mobile) | 138 | 🟢 ok | DeepSeek Harness 移动端适配与安全局域网访问插件，支持 Android App 和手机浏览器。 |
| [harness-ui-enhancer](https://github.com/Physicolor/harness-ui-enhancer) | 10 | 🟢 ok | Web UI polish layer for DeepSeek Harness: normalizes unfinished or self-contradictory official UI, reconciles style conflicts bet… |
| [dsh-liquid-glass-balance-card](https://github.com/SoDaZilla-zzz/dsh-liquid-glass-balance-card) | 5 | ⚪ unknown | Draggable liquid-glass DeepSeek API balance card plugin for DeepSeek Harness (DSH) web GUI / DSH ??????? DeepSeek ?????? |
| [dsh-api-balance](https://github.com/02Muller25/dsh-api-balance) | 5 | ⚪ unknown | 安装在deepseek的插件，能够实时显示当前api的余额，30秒自动刷新一次 |
| [dsh-speak](https://github.com/Alan2Z/dsh-speak) | 6 | ⚪ unknown | 一种能让你的harness开口说话的方案/Make your AI harness speak — a verified voice-announcement solution |
| [sprites-deepseek-plugin](https://github.com/superfly/sprites-deepseek-plugin) | 7 | ⚪ unknown | DeepSeek Harness plugin for persistent, isolated Sprites: remote builds, tests, previews, checkpoints, and long-running services. |
| [dsh-remote-web-gateway](https://github.com/summer1238/dsh-remote-web-gateway) | 138 | 🟢 ok | 手机远程 DeepSeek Harness：扫码即可继续使用电脑上的 DSH，无需远程桌面 / SSH / 公网 IP，支持一次性配对、独立设备授权与随时撤销。 |
| [dsh-web-startup-auth](https://github.com/GDWhisper/dsh-web-startup-auth) | 10 | 🟢 ok | DSH（DeepSeek Harness）远程 Web 启动 + 用户名/密码认证插件。 | DeepSeek Harness Remote‑Web‑Launch Plugin with Username/Password Auth |
| [dsh-zen-remote](https://github.com/KyoMio/dsh-zen-remote) | 7 | 🟢 ok | Turn DeepSeek Harness into a phone app you can securely reach from anywhere: minimal mobile UI rework + pairing-code gateway + PW… |
| [dsh-balance-plugin](https://github.com/yxxbc/dsh-balance-plugin) | 55 | ⚪ unknown | deepSeek 余额监控与用量统计（DSH 动态 Cordis 插件）：余额监控 · 官方充值入口 · 用量统计 · 三方插件管理 |
| [dsh-ui-harmonizer](https://github.com/Physicolor/dsh-ui-harmonizer) | 10 | ⚪ unknown | Web UI polish layer for DeepSeek Harness: normalizes unfinished or self-contradictory official UI, reconciles style conflicts bet… |

### 📦 Preset

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [dsh-companion](https://github.com/yyh-001/dsh-companion) | 3 | ⚪ unknown | DSH companion-mode plugin: persona, memory, conversation. |
| [all (全家桶)](https://github.com/whyihaveyou/dsh-suite) | 15 | 🟢 ok | All-in-one meta-package: one install brings the first-party suite — plugin-manager store, notify, session-export, team-board. |

### 🧷 Utility

| Plugin | ⭐ | Compat | Description |
|---|---|---|---|
| [EchoBird](https://github.com/edison7009/EchoBird) | 3121 | ⚪ unknown | One-click install + model switch across 20+ coding agents |
| [awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) | 1374 | ⚪ unknown | DSH plugin directory with daily compatibility tracking |
| [deepseek-harness-applicants](https://github.com/Octo-o-o-o/deepseek-harness-applicants) | 54 | ⚪ unknown | DSH internal-test applicants list |
| [awesome-deepseek-harness](https://github.com/0xsline/awesome-deepseek-harness) | 882 | ⚪ unknown | DSH ecosystem curation: plugins, tools, infra |
| [dsh-tianshu-tui](https://github.com/huiliyi37/dsh-tianshu-tui) | 233 | 🟢 ok | DeepSeek Harness terminal UI |
| [agent-skills](https://github.com/GitHubxsy/agent-skills) | 21 | ⚪ unknown | Reusable skills for AI coding agents |
| [dsh-at-file](https://github.com/omdsh-dev/dsh-at-file) | 467 | 🟢 ok | Codex-style @file mentions for DeepSeek Harness: search workspace files in the composer and attach their contents to prompts. |
| [dsh-open-in-vscode](https://github.com/omdsh-dev/dsh-open-in-vscode) | 54 | 🟢 ok | Open DeepSeek Harness workspace directories in VS Code directly from the web GUI. |
| [dsh-notification](https://github.com/omdsh-dev/dsh-notification) | 74 | 🟢 ok | Desktop notifications for DeepSeek Harness turn completions, with per-outcome controls and include/exclude keyword rules. |
| [dsh-ads](https://github.com/Nagi-ovo/dsh-ads) | 560 | ⚪ unknown | 2005-style sidebar ads plugin (parody) |
| [dsh-group-photo](https://github.com/SenmuuuuW/dsh-group-photo) | 17 | ⚪ unknown | DSH 内测收官合影墙：GitHub OAuth 零权限登录 + 冻结白名单校验的拍立得合影站（含 DSH Skill 包装） |
| [dsh-openpencil](https://github.com/ZSeven-W/dsh-openpencil) | 153 | 🟢 ok | OpenPencil design preview and editing plugin for DSH |
| [oh-dsh-desktop](https://github.com/hust-open-atom-club/oh-dsh-desktop) | 268 | 🔴 broken (dump-config exit=1 but plugin not found in composed tree) | Extensible macOS DSH workbench with native PTY |
| [dsh-visualize](https://github.com/Nagi-ovo/dsh-visualize) | 212 | 🟢 ok | In-chat generative UI: interactive HTML cards |
| [awesome-DSH-plugin](https://github.com/Alex-Yanggg/awesome-DSH-plugin) | 84 | ⚪ unknown | Curated list of DSH plugins, extensions and tools |
| [oh-my-dsh](https://github.com/LaplaceYoung/oh-my-dsh) | 53 | 🟢 ok | DSH plugin ecosystem (700+ plugins) |
| [dsh-gomoku](https://github.com/omdsh-dev/dsh-gomoku) | 15 | ⚪ unknown | Play Gomoku against AI in DSH |
| [dsh-web-review](https://github.com/CanglongCl/dsh-web-review) | 15 | ⚪ unknown | DeepSeek Harness Web GUI 的网页预览与元素批注插件，让 AI 根据可视化反馈直接修改前端源码。 |
| [dsh-emoji](https://github.com/hellodigua/dsh-emoji) | 39 | 🟢 ok | Auto-add emoji to AI replies |
| [dsh-grok-tui](https://github.com/chen-001/dsh-grok-tui) | 11 | 🟢 ok | Use dsh via grok-build's TUI |
| [dsh-stock-market](https://github.com/AnacondaKC/dsh-stock-market) | 17 | ⚪ unknown | Parody: lose money while coding |
| [Top](https://github.com/xiaohai-78/Top) | 4 | ⚪ unknown | Daily leaderboard for the dsh-external plugin ecosystem |
| [awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 272 | ⚪ unknown | Bilingual complete list of the DSH plugin ecosystem |
| [dsh-launcher](https://github.com/Ruler4396/dsh-launcher) | 177 | 🟢 ok | WebView2-based DSH launcher |
| [dsh-minigames](https://github.com/lhh010/dsh-minigames) | 27 | ⚪ unknown | Side game panel (18 offline mini-games) |
| [dsh-stickers](https://github.com/william-jin-cmu/dsh-stickers) | 23 | ⚪ unknown | Bidirectional sticker reactions |
| [oh-my-dsh](https://github.com/wangshunnn/oh-my-dsh) | 3 | 🟢 ok | DeepSeek harness plugins |
| [orbis](https://github.com/icodesign/orbis) | 10 | ⚪ unknown | Mobile client for DSH remote control |
| [plugin-registry](https://github.com/vlln/plugin-registry) | 57 | ⚪ unknown | DSH plugin registry infra: browser panel for official repository plugins |
| [create-dsh-plugin](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Scaffold a DeepSeek Harness (DSH) plugin in seconds — tool / events / webui templates, next-tag version pinning, and a built-in -… |
| [dsh-101](https://github.com/bill9109/dsh-101) | 6 | ⚪ unknown | DSH document reading mode |
| [dsh-desktop-electron](https://github.com/Void0312Aurora/dsh-desktop-electron) | 4 | ⚪ unknown | Cross-platform Electron desktop shell (tray-resident) |
| [dsh-douyin](https://github.com/AnacondaKC/dsh-douyin) | 6 | ⚪ unknown | Sidebar short-video plugin |
| [dsh-launcher](https://github.com/SnowCrescenter-tech/dsh-launcher) | 1 | 🟢 ok | One-click portable DSH launcher (Windows) |
| [dsh-notebooks](https://github.com/havingautism/dsh-notebooks) | 4 | ⚪ unknown | (no description) |
| [dsh-plugin-d399](https://github.com/HuanLinOTO/dsh-plugin-d399) | 9 | ⚪ unknown | Pop-up mini-game menu while model generates |
| [plugin-notify](https://github.com/whyihaveyou/dsh-suite) | 3 | 🟢 ok | Send IM webhook + local notifications on turn completion / error / approval (Feishu / WeCom / DingTalk / Slack / Discord / custom… |
| [dsh-lark-bot](https://github.com/PlutoKeating/dsh-lark-bot) | 32 | 🟢 ok | Bridge DeepSeek Harness into Feishu/Lark. |
| [dsh-win-notify](https://github.com/MuziIsabel/dsh-win-notify) | 4 | ⚪ unknown | Windows toast notification plugin with sound. |
| [dsh-wechat-notify](https://github.com/wssfk12138/dsh-wechat-notify) | 8 | ⚪ unknown | Plugin adding a wechat_notify tool for agents. |
| [dsh-lan](https://github.com/moxisuki/dsh-lan) | 6 | ⚪ unknown | One overlay to expose dsh web on the LAN. |
| [DSH-Telegram-Relay](https://github.com/congchuanling-dot/DSH-Telegram-Relay) | 5 | ⚪ unknown | Remote DSH control via Telegram. |
| [dsh-onlyne](https://github.com/dbydd/dsh-onlyne) | 2 | 🟢 ok | IM gateway for DeepSeek Harness agents — send and receive QQ, WeChat, Feishu and Telegram messages from dsh sessions. |
| [dsh-lark](https://github.com/Roy-oss1/dsh-lark) | 2 | ⚪ unknown | Lark/Feishu IM bot channel for DeepSeek Harness: chats drive agents, replies and approvals return as messages and cards | 飞书 Deep… |
| [dsh-chatnode-wechat](https://github.com/Jesse-njx/dsh-chatnode-wechat) | 7 | ⚪ unknown | Chat with, monitor, and approve your DSH agents from WeChat — an iLink gateway + conversation node bundle for DeepSeek Harness |
| [dsh-im-bridge](https://github.com/BiBoyang/dsh-im-bridge) | 8 | ⚪ unknown | dsh-im-bridge — DSH plugin (utility) |
| [dsh-lark-bridge](https://github.com/imetn/dsh-lark-bridge) | 6 | 🟢 ok | Bidirectional Lark/Feishu controller for DeepSeek Harness |
| [dsh-openclaw-acp](https://github.com/BeAChanger/dsh-openclaw-acp) | 1 | ⚪ unknown | DeepSeek Harness bundle for OpenClaw and WeChat over ACP |
| [dsh-tool-notify](https://github.com/rizkirmdhnnn/dsh-tool-notify) | 0 | ⚪ unknown | DSH plugin: model-facing notify tool for DeepSeek Harness — send notifications to ntfy or generic webhooks when an agent task fin… |
| [dsh2wechat](https://github.com/wuyuanjiang1/dsh2wechat) | 2 | ⚪ unknown | DeepSeek Harness 微信 ClawBot 消息桥插件 |
| [dsh-lark](https://github.com/omdsh-dev/dsh-lark) | 42 | ⚪ unknown | Lark/Feishu IM bot channel for DeepSeek Harness: chats drive agents, replies and approvals return as messages and cards | 飞书 Deep… |
| [dsh-plugins](https://github.com/kazecreator/dsh-plugins) | 1 | ⚪ unknown | Monorepo of DeepSeek Harness (dsh) plugins — including dsh-im (Telegram & WeChat IM bridge) |
| [dsh-notify](https://github.com/dshiq04/dsh-notify) | 0 | 🟢 ok | 面向deepseek harness的消息通知插件 |
| [dsh-messager](https://github.com/ly6170/dsh-messager) | 4 | 🟢 ok | 基于Deepseek Harness+DeepSeek开发的适用于Deepseek Harness的消息提醒信使，可使用第三方通道（暂时飞书webhook）进行推送 |
| [DSH-telegram](https://github.com/yuko0331/DSH-telegram) | 5 | 🟢 ok | 通过 Telegram 私聊远程使用和查看 DeepSeek Harness |
| [dsh-task-notify](https://github.com/ltao0829/dsh-task-notify) | 6 | ⚪ unknown | DeepSeek Harness task-completion reminder plugin |
| [dsh-notify](https://github.com/yangyongzhen/dsh-notify) | 2 | 🟢 ok | Task-completion notifications for DeepSeek Harness: ServerChan / DingTalk / Feishu / generic webhooks. dsh plugin. |
| [dsh-telegram-channel](https://github.com/hi-wenw/dsh-telegram-channel) | 10 | ⚪ unknown | DeepSeek Harness Telegram mobile remote: bind live Web sessions (Codex-style). Install: dsh plugin add github:hi-wenw/dsh-telegra… |
| [dsh-plugin-notify](https://github.com/c-ling/dsh-plugin-notify) | 5 | 🟢 ok | DeepSeek Harness 消息提醒插件：回合结束或等待确认时向浏览器、系统、飞书/钉钉/企业微信/通用 Webhook 发送通知 |
| [dsh-lark-link](https://github.com/amlyczz/dsh-lark-link) | 26 | 🟢 ok | High-reliability Feishu/Lark bridge for DeepSeek Harness — QR one-click auth, multi-mode agents, card-based commands, zero-loss o… |
| [dsh-notification-center](https://github.com/610la/dsh-notification-center) | 9 | ⚪ unknown | DSH 通知中心插件：对话/任务完成、报错、等待批准等事件触发浏览器通知 + 21 种匹配音效 |
| [dsh-feishu-bridge](https://github.com/wz-heng/dsh-feishu-bridge) | 4 | ⚪ unknown | Feishu (Lark) channel bridge for DeepSeek Harness (dsh) — message a Feishu bot, it runs a dsh agent turn, the reply comes back. C… |
| [dsh-llm-wechat](https://github.com/sulfide2085/dsh-llm-wechat) | 6 | ⚪ unknown | DeepSeek Harness 微信网关适配插件：复用 DeepSeekAdapter + 流式 think 标签转译 |
| [dsh-feishu](https://github.com/xmanrui/dsh-feishu) | 8 | ⚪ unknown | 通过扫码把飞书机器人接入DeepSeek Harness |
| [dsh-task-notify](https://github.com/kaotusi/dsh-task-notify) | 4 | ⚪ unknown | DeepSeek Harness (DSH) system-level task notifications: approval required / awaiting reply / task finished (background job, subag… |
| [dsh-feishu-bot](https://github.com/TingRuDeng/dsh-feishu-bot) | 1 | 🟢 ok | Feishu (Lark) private-chat frontend for DeepSeek Harness: drive, monitor, and approve local agents from Feishu, sharing sessions… |
| [dsh-plugin-notify](https://github.com/huguangyu666/dsh-plugin-notify) | 4 | 🟢 ok | DeepSeek Harness 插件：通知出口——agent 通过桌面通知 / 中文语音播报 / 提示音主动联系用户（长任务完成、出错、呼叫用户回来）。Windows 本机零依赖。 |
| [dsh-plugin-approval-alert](https://github.com/doncelee229-cmyk/dsh-plugin-approval-alert) | 1 | ⚪ unknown | DeepSeek Harness 审批/选择方案系统级通知提醒，显示工作区名、点击跳转、多语言。Approval & decision alerts with native notifications for DeepSeek Harness. |
| [dsh-notify-sound](https://github.com/xxxxxxxyu/dsh-notify-sound) | 4 | 🟢 ok | DSH (DeepSeek Harness) web plugin: plays a sound when the agent finishes replying (turn/end). Sound, volume and on/off configurab… |
| [dsh-WeCom-notify](https://github.com/GuZhengSVT/dsh-WeCom-notify) | 2 | ⚪ unknown | DeepSeek Harness (dsh) 插件：事件驱动的企业微信（WeCom）群机器人通知 — goal 完成/阻塞与每轮对话自动推送，另含 wechat_notify 工具；走官方 webhook，零封号风险。 |
| [dsh-wechat-maid](https://github.com/skylar-fei/dsh-wechat-maid) | 3 | ⚪ unknown | 一个适用于DSH的插件，提供微信远程控制、主动对话、未来任务、桌宠等功能，可通过桌宠面板实时检查未来任务的状态，并提供“自动编码”模式，使模型在对话完后发微信提醒你，以便你认真的刷手机。 |
| [dsh-schedule-tasks](https://github.com/uluckystar/dsh-schedule-tasks) | 2 | ⚪ unknown | DSH 定时任务插件:标准 cron 5 段式调度 + shell/通知触发动作 + Web 侧边栏管理面板。by MyDSH 社区 (mydsh.dev) |
| [dsh-feishu-gateway](https://github.com/kriskwok/dsh-feishu-gateway) | 1 | ⚪ unknown | DeepSeek Harness Feishu gateway plugin: chat with your DSH agent from Feishu (persistent sessions, /new, Markdown replies, proact… |
| [dsh-fschannel](https://github.com/cershuang/dsh-fschannel) | 2 | ⚪ unknown | DSH-Feishu channel plugin |
| [dsh-notifier](https://github.com/THEWOLFWALKER/dsh-notifier) | 63 | 🟢 ok | Unified notification push plugin for DeepSeek Harness (DSH): one minimal notify() API, 8 channel adapters (telegram/dingtalk/feis… |
| [dsh-lark](https://github.com/sugarforever/dsh-lark) | 24 | ⚪ unknown | DeepSeek Harness Plugin for Lark Integration |
| [ax-feishu-bridge](https://github.com/AX1202/ax-feishu-bridge) | 35 | 🟢 ok | 飞书/Lark 机器人桥接，同时支持 Pi 和 DeepSeek Harness（DSH）双平台，随时随地远程与你的编程助手对话 |
| [dsh-lark-bridge](https://github.com/JMOKSZ/dsh-lark-bridge) | 4 | 🟢 ok | Feishu (Lark) entry point for DeepSeek Harness: drive dsh agents from a Feishu bot with streaming cards, ask/approval buttons and… |
| [dsh-feishu](https://github.com/PGZXB/dsh-feishu) | 25 | ⚪ unknown | The Feishu UI for DeepSeek Harness — a panel-driven control console: every slash command a button on the ⚙️ control-panel card, i… |
| [dsh-minecraft](https://github.com/Ruqii/dsh-minecraft) | 1 | 🟢 ok | Play real Minecraft from DSH — the agent observes, walks, mines, crafts and fights through a live Mineflayer bot, watchable in th… |
| [dsh-lark-bridge](https://github.com/bihangchi9-creator/dsh-lark-bridge) | 35 | 🟢 ok | A native DeepSeek Harness (dsh) plugin bridging dsh coding agents to Feishu/Lark group chats — one group, one project directory. |
| [dsh-meow-smooth](https://github.com/Phant0Meow/dsh-meow-smooth) | 14 | ⚪ unknown | 手机电脑dsh通知功能！移动端可用的通知！手机端ui交互优化！让手机端dsh真正可用。 |

> Badges: 🟢 compatible · 🔴 broken · ⚪ unverified · ⚫ unmaintained.
> 1742 entries total, grouped by category, sorted by ⭐ within each. Schema dictionary: [docs/catalog-schema.md](docs/catalog-schema.md).
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

> Version badges pull `latest` from npm live (never stale); the catalog tables refresh hourly via bot.

| Plugin | Version | Description |
|---|---|---|
| `@dsh-suite/plugin-manager` | ![npm](https://img.shields.io/npm/v/@dsh-suite/plugin-manager) | In-app plugin store for DSH Web UI: catalog, search, badges, one-click install |
| `@dsh-suite/plugin-deus` | ![npm](https://img.shields.io/npm/v/@dsh-suite/plugin-deus) | Minimal-behavior trigger (experiment lab) |
| `@dsh-suite/themes` | ![npm](https://img.shields.io/npm/v/@dsh-suite/themes) | Skin Center: 151 day/night skins in one pack |
| `@dsh-suite/preset-center` | ![npm](https://img.shields.io/npm/v/@dsh-suite/preset-center) | Chinese out-of-the-box preset pack |
| `@dsh-suite/plugin-session-export` | ![npm](https://img.shields.io/npm/v/@dsh-suite/plugin-session-export) | Human-readable Markdown / HTML session export |
| `@dsh-suite/plugin-notify` | ![npm](https://img.shields.io/npm/v/@dsh-suite/plugin-notify) | IM webhook notifications + local toast |
| `@dsh-suite/plugin-team-board` | ![npm](https://img.shields.io/npm/v/@dsh-suite/plugin-team-board) | Shared multi-agent task board |

## 🛠 create-dsh-plugin ![npm](https://img.shields.io/npm/v/create-dsh-plugin)

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
- [Plugin Dev Guide](https://github.com/whyihaveyou/dsh-plugin-tutorial) — the bilingual book edition (mirrored at `docs/plugin-dev-guide.en.md` / `.zh-CN.md`)
