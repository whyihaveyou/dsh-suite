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
   `Let me…` → 纯区版 · `The user…`（含去冠词变体 `User wants…`）→ 中版 · `we` 起手（或首句 ≥3 个 we）→ 神版 · 其余 → 未判定。
   **实测校准**（`research/deus-mode-matrix.md`，120 次 API 采样）：指纹主要出现在**推理流**（`reasoning-delta`，如 "The user is asking…" / "We need answer…"），可见正文多为中文直答；识别器因此**优先判定推理流、可见文本兜底**，并额外识别推理流里的中文 `我们需要/我们应该…` 起手（神版等价）。与 120 例人工标注的神版判定一致率 99.2%。
4. **实测日志 + 触发率统计** — 每次触发追加一条 JSONL（`~/.dsh/deus-mode/log.jsonl`，纯本地不上传）；
   面板给出每模式的 god/med/pure 比例 + **95% Wilson 置信区间**，可导出 CSV。

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
- 若实验证明无差异：本插件的身份即**通用极简提示词 A/B 测试台**，"神模"只是第一个被测假设。

## License

MIT
