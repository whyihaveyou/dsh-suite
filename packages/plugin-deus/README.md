# @dsh-suite/plugin-deus · 神模扳机（Deus Trigger）

> ⚠️ **诚实声明 / Honesty note**
> 「神模 3 模式」（纯区版 / 中版 / 神版）来自**社区观察**（X @NFT_Chen 推文，72 赞），**未获 DeepSeek 官方证实**。
> 本插件只做**提示词注入 + 回复起手判定 + 本地日志统计**，把"口耳相传的极简触发词"变成可重复、可量化的实验。
> 它**不承诺、也不声称**触发任何隐藏能力；观测到的触发率**可能只是随机采样噪音**。
>
> The "3 modes" are a **community observation**, NOT confirmed by DeepSeek. This plugin injects candidate
> minimal prompts, heuristically classifies reply openers, and keeps a local experiment log.
> It does not promise or claim any hidden capability; observed trigger rates may be sampling noise.

## 它做什么 / What it does

把"触发神模"从玄学变成可重复实验：

1. **触发预设库** — 5 个内置极简提示词模式（空输入 / 单字符 / we-引导 / Let-me 起手 / 纯斜杠），全部可编辑、增删。
2. **一键注入** — 两档：
   - **档 A（保守）**：Settings 面板一键复制 → 粘贴进输入框发送；宿主按 prompt 精确匹配自动配对判定。
   - **档 B（增强）**：对话输入框上方的芯片行，点击即写入草稿（可选自动发送），并向宿主打点配对。
3. **起手识别器** — host 半侧监听 `session/event`，对首条回复做启发式判定：
   `Let me…` → 纯区版 · `The user…`（含去冠词变体 `User wants/asks/says/is continuing…`）→ 中版 · `we` 起手（或首句 ≥3 个 we）→ 神版 · 其余 → 未判定。
   **实测校准**（`research/deus-mode-matrix.md`，120 次 API 采样）：指纹主要出现在**推理流**（`reasoning-delta`，如 "The user is asking…" / "We need answer…"），可见正文多为中文直答；识别器因此**优先判定推理流、可见文本兜底**，并额外识别推理流里的中文 `我们需要/我们应该…` 起手（神版等价）。与 120 例人工标注的神版判定一致率 99.2%。
4. **实测日志 + 触发率统计** — 每次触发追加一条 JSONL（`~/.dsh/deus-mode/log.jsonl`，纯本地不上传）；
   面板给出每模式的 god/med/pure 比例 + **95% Wilson 置信区间**，可导出 CSV。
5. **锚定维持（v0.2）** — 本团队漂移实测发现：一次锚定**不能**全程有效（工具目录补齐后神版维持率 0/6，构成恒定时也有 44-89% 逐轮摆动）。插件因此：
   - 安装两个锚定 agent presets 到 `~/.dsh/.agent-presets/`（**窄锚** 2 工具 ~90% 触发 / **宽锚** ~8 工具 ~65% 换可用性），设置 > Agent presets 或会话 preset 选择器里直接选用，构成全程恒定；
   - 对 deus/minimal preset 会话**逐轮判定指纹**，面板「锚定维持」区实时显示每轮指纹与漂移状态；
   - 对话页 dock 出现 `⚓ 锚定维持中` 状态 chip；**漂移时变红**，点击发送重锚提示词（可开「漂移自动重锚」）；重锚轮日志以 `reanchor` 模式独立记录，便于对比重锚前后维持率。
6. **未锚定引导（v0.3）** — 当前会话不在 deus/minimal 系 preset 时，dock 显示灰态 `◌ 非神版会话` chip，点击展开切换指引（把「25 工具会话注入≈0%」的实测结论落地为产品引导）。
7. **统计导出与分享（v0.3）** — 面板一键导出 CSV、**复制 Markdown 摘要**（Wilson CI 表格 + 诚实声明 + 包链接，可直接发帖），并内嵌近期神版率迷你趋势图（最近 40 条日志分桶折线）。
8. **提示词 A/B 实验台（v0.4）** — 设计文档的「纯噪音退路」转正：对话页 dock 的 🧪 **实验台**里输入**任意**提示词变体 A/B，各跑 N 次**真实会话注入**（每次试验自动点「新建会话」隔离上下文），宿主按提示词文本队列配对判定，产出**指纹分布对比表**——每类的 Wilson 95% CI、Δ(A−B)、两比例 z 检验与显著性标记。Settings 面板可回看/切换历史实验。deus 由此从「神模工具」升级为「提示词实验台」，神模只是第一个被测假设。

## 安装 / Install

```bash
# npm（竞品方案需要手动拷目录，本插件一条命令）
npx @deepseek-ai/dsh plugin --profile web add @dsh-suite/plugin-deus

# 本地目录开发
npx @deepseek-ai/dsh plugin --profile web add ./plugin-deus   # 在其父目录执行
```

打开 Web UI → Settings → **神模扳机**；对话页输入框上方会出现芯片行（档 B）。

## 怎么读统计 / Reading the stats

- 报**比例 + Wilson 95% CI**，不是点估计；样本少时区间很宽，别过度解读。
- **对照组才是关键**：用普通完整提示词采样同量对照——实验组 god 率显著高于对照组才算"有差异"，否则就是基线噪音。
- 识别器是**启发式倾向信号**（把正常 "we" 起手的回答误判为神版是可能的）；日志保留 `first_sentence` 原文供人工复核。
- 同参数**隔天重跑一轮**看稳定性：第一轮高、重跑回落 → 疑似时段/方差影响。

## 隐私与边界 / Privacy & boundaries

- 日志只写本地 `$DSH_HOME/deus-mode/log.jsonl`，不上传、可一键清空、可导出 CSV。
- 全部是用户正常交互（prompt 注入 + 回复观测），无越权、无绕过。
- 若实验证明无差异：本插件的身份即**通用极简提示词 A/B 测试台**，"神模"只是第一个被测假设。（v0.4 起实验台已内建：🧪 dock 芯片直接开跑。）

## 实测依据 / Measured basis

本团队 2026-08-15 实测（deepseek-v4-pro，N=440 次 API 采样，`research/deus-mode-matrix.md`）：
神版触发率随工具数单调衰减（2 工具 ~90% → ~8 工具 ~65% → 25 工具 0%）；剥离注入上下文 20%→90%；
讲解/咨询类任务 ~0%；锚定维持见上。全部为倾向信号，非官方证实。

## License

MIT
