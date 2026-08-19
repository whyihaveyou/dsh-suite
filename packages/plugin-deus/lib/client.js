// plugin-deus browser half — the 神模扳机 (Deus Trigger) panel + composer dock.
//
// Honest framing: the "3 modes" are a community observation (X @NFT_Chen), NOT
// confirmed by DeepSeek. This plugin only injects candidate minimal prompts and
// records/classifies the replies. The honesty declaration stays pinned at the
// top of the panel at all times; no "unlock"/"crack"/"hidden model" wording.
//
// Two injection tiers (design doc §2.2):
//   A (conservative): settings section + one-click copy — user pastes into the
//      composer; the host auto-pairs the reply by exact-matching the prompt.
//   B (enhanced): conversation.input.dock chip row — one click writes the prompt
//      into the composer draft via inputActions.setDraft (optional auto-send)
//      and marks the trigger on the host for pairing.
window.__ModuleLoader__.load({
  id: '@dsh-suite/plugin-deus',
  factory: (require) => {
    const React = require('react')
    const { useState, useEffect, useRef } = React
    const h = React.createElement

    const NS = 'deusMode'
    const zh = {
      nav: '神模扳机', sub: '极简提示词触发实验台 · 注入 → 判定 → 统计',
      honesty: '诚实声明：「神模 3 模式」来自社区观察（X @NFT_Chen），未获 DeepSeek 官方证实。本插件只做提示词注入与结果记录统计，不承诺解锁任何隐藏能力；触发率可能只是随机采样噪音。',
      version: '版本', dshVer: 'DSH 版本', pluginVer: '插件版本', logPath: '日志位置',
      presets: '触发预设库', presetsHint: '点击「复制」后粘贴到输入框发送（档 A）；或用对话页输入框上方的芯片行一键注入（档 B）。全部可编辑。',
      empty: '（空输入）', copy: '复制', copied: '已复制 ✓',
      edit: '编辑', save: '保存', cancel: '取消', del: '删除', add: '新增预设', resetPresets: '恢复内置',
      editPrompt: 'prompt 内容（留空 = 空输入模式）', editLabel: '名称', editId: 'id（唯一）',
      stats: '触发率统计', statsHint: '比例 + 95% Wilson 置信区间。只有实验组显著高于对照组（普通完整提示词）才算有差异——请自行保留对照采样。',
      measured: '本团队实测（2026-08-15，deepseek-v4-pro，N=440 次 API 采样）：神版需要 Minimal 系统提示 + 小工具目录——触发率随工具数单调衰减（2 工具 ~90%、~8 工具 ~65%、25 工具 0%）；剥离注入上下文把触发率从 20% 推到 90%；讲解/咨询类任务约 0%。锚定维持：工具目录补齐后神版维持率 0/6（一次锚定不能全程有效，故需逐轮监控 + 漂移重锚）；构成恒定时也有 44-89% 摆动。样本量小，请当作倾向信号。',
      colMode: '模式', colN: '采样', colGod: '神版率', colMed: '中版率', colPure: '纯区率',
      exportCsv: '导出 CSV', resetLog: '清空日志', resetLogConfirm: '确定清空全部实验日志？此操作不可撤销。',
      recent: '最近记录', recentHint: '识别器判定是启发式倾向信号，first_sentence 原文供人工复核。',
      noData: '暂无记录——先触发几次再来看看。',
      loadFail: '加载失败', saveFail: '保存失败',
      dockHint: '神模扳机（实验工具·社区观察未证实）', dockSend: '注入并发送', dockFill: '注入',
      autoSend: '注入后自动发送',
      detected_pure: '纯区版', detected_med: '中版', detected_god: '神版', detected_unknown: '未判定',
      anchor: '锚定维持', anchorHint: 'deus/minimal preset 会话的逐轮指纹监控。实测（§9）：工具目录补齐后神版维持率 0/6 全漂回中版，构成恒定时也有 44-89% 逐轮摆动——漂移时建议重锚。',
      anchorPresetInstalled: '已安装 agent presets（设置 > Agent presets 可选）', anchorNone: '暂无受监控会话——在会话里选「神模扳机」preset 或注入一次即纳入监控。',
      colSession: '会话', colPreset: 'preset', colTurns: '轮次', colGodRate: '神版率', colLastFp: '最新指纹', colAnchorState: '状态',
      anchoredOn: '锚定维持中', drifted: '漂移→非神版', reanchor: '⚓ 重锚', autoReanchor: '漂移自动重锚',
      reanchorSent: '已发送重锚提示', dockAnchored: '锚定维持中',
      unanchored: '◌ 非神版会话', unanchoredTitle: '当前会话不是锚定 preset——实测 25 工具会话注入触发率≈0%。点击查看怎么切换',
      guideText: '实测结论：standard（25 工具）会话里文本注入几乎无法触发神版（0%）。想用神版：新建会话时在 Agent preset 选择器选「神模扳机 · 窄锚 / 宽锚」（实测触发率 ~90% / ~65%）。',
      copyMd: '复制 Markdown 摘要', mdCopied: '已复制 ✓ 去发帖吧', trend: '近期神版率趋势',
      bench: '实验台',
      benchHint: '提示词 A/B 实验台：任意两个提示词变体各跑 N 次真实会话注入（每次自动开新会话隔离上下文），对比起手式指纹分布。Wilson 95% CI + 两比例 z 检验；小样本只作倾向信号。神模只是第一个被测假设。',
      benchA: '变体 A 提示词', benchB: '变体 B 提示词', benchTimes: '每变体次数 N',
      benchRun: '▶ 开始实验', benchAbort: '⏹ 中止', benchRunning: '实验进行中',
      benchProgress: '进度', benchWaiting: '等待回复…', benchDone: '实验完成',
      benchIsolationWarn: '⚠ 未找到「新建会话」按钮，本轮在同会话内连跑，上下文未隔离',
      benchTimeout: '等待回复超时（240s），实验中止',
      benchEmpty: '请先填写变体 A 与变体 B 的提示词',
      benchReportTitle: '指纹分布对比', benchRunId: '实验编号', benchStarted: '开始', benchFinished: '结束',
      colFp: '指纹', colDelta: 'Δ(A−B)', colZ: 'z', colP: 'p', colSig: '显著',
      benchNone: '还没有实验记录。在对话页输入框上方的 ⚗ 芯片行打开「实验台」跑一轮。',
      benchPickRun: '选择实验', benchRefresh: '刷新',
      benchDefA: '用三句话向聪明的初中生解释「熵」。',
      benchDefB: '你是一位世界顶尖科普作家，回答前先在脑内推演三遍。用三句话向聪明的初中生解释「熵」。',
    }
    const en = {
      nav: 'Deus Trigger', sub: 'Minimal-prompt trigger bench · inject → classify → stats',
      honesty: 'Honesty note: the "3 modes" come from a community observation (X @NFT_Chen), NOT confirmed by DeepSeek. This plugin only injects prompts and records statistics — it does not unlock any hidden capability; observed trigger rates may be sampling noise.',
      version: 'Version', dshVer: 'DSH version', pluginVer: 'Plugin version', logPath: 'Log path',
      presets: 'Trigger presets', presetsHint: 'Copy then paste into the composer (tier A), or use the chip row above the composer for one-click injection (tier B). Fully editable.',
      empty: '(empty input)', copy: 'Copy', copied: 'Copied ✓',
      edit: 'Edit', save: 'Save', cancel: 'Cancel', del: 'Delete', add: 'Add preset', resetPresets: 'Restore built-ins',
      editPrompt: 'prompt text (empty = empty-input mode)', editLabel: 'label', editId: 'id (unique)',
      stats: 'Trigger-rate stats', statsHint: 'Proportion + 95% Wilson CI. Only a significant lead over a control group (ordinary full prompts) counts — keep your own control samples.',
      measured: 'Measured by our team (2026-08-15, deepseek-v4-pro, N=440 API samples): god mode needs a minimal system prompt + a SMALL tool catalog — trigger rate decays with tool count (2 tools ~90%, ~8 tools ~65%, 25 tools 0%); stripping injected context lifts it 20% → 90%; explanatory tasks ~0%. Persistence: once the tool catalog expands, god-mode retention is 0/6 — one-shot anchoring does NOT hold all session, hence per-turn watch + re-anchor; even with constant composition, retention wobbles 44-89%. Small samples — tendency signal only.',
      colMode: 'Mode', colN: 'N', colGod: 'god rate', colMed: 'med rate', colPure: 'pure rate',
      exportCsv: 'Export CSV', resetLog: 'Clear log', resetLogConfirm: 'Clear ALL experiment log entries? This cannot be undone.',
      recent: 'Recent entries', recentHint: 'The detector is a heuristic tendency signal; first_sentence is kept for human review.',
      noData: 'No entries yet — trigger a few times first.',
      loadFail: 'Load failed', saveFail: 'Save failed',
      dockHint: 'Deus Trigger (experiment · community observation, unconfirmed)', dockSend: 'Inject & send', dockFill: 'Inject',
      autoSend: 'Auto-send after inject',
      detected_pure: 'pure', detected_med: 'med', detected_god: 'god', detected_unknown: 'unknown',
      anchor: 'Anchor persistence', anchorHint: 'Per-turn opener watch for deus/minimal-preset sessions. Measured (§9): after the tool catalog expands, god-mode retention is 0/6 — all drift back; even with a constant composition, retention wobbles 44-89% turn to turn. Re-anchor on drift.',
      anchorPresetInstalled: 'Installed agent presets (pick in Settings > Agent presets)', anchorNone: 'No watched sessions yet — pick a Deus Trigger preset in a session, or inject once.',
      colSession: 'Session', colPreset: 'preset', colTurns: 'turns', colGodRate: 'god rate', colLastFp: 'latest', colAnchorState: 'state',
      anchoredOn: 'anchored', drifted: 'drifted', reanchor: '⚓ Re-anchor', autoReanchor: 'Auto re-anchor on drift',
      reanchorSent: 'Re-anchor nudge sent', dockAnchored: 'anchored',
      unanchored: '◌ Not a deus session', unanchoredTitle: 'This session is not on an anchored preset — injection measured ≈0% effective on 25-tool sessions. Click for how to switch',
      guideText: 'Measured: text injection barely triggers god-mode in standard (25-tool) sessions (0%). To get it: start a new session and pick "Deus Trigger · narrow / wide anchor" in the Agent preset picker (~90% / ~65% measured trigger rate).',
      copyMd: 'Copy Markdown summary', mdCopied: 'Copied ✓ go post it', trend: 'Recent god-rate trend',
      bench: 'A/B Bench',
      benchHint: 'Prompt A/B bench: run any two prompt variants N times each via real session injection (a fresh session per trial isolates context), then compare opener-fingerprint distributions. Wilson 95% CI + two-proportion z-test; small samples are directional only. God-mode is just the first hypothesis under test.',
      benchA: 'Variant A prompt', benchB: 'Variant B prompt', benchTimes: 'Trials per variant N',
      benchRun: '▶ Run experiment', benchAbort: '⏹ Abort', benchRunning: 'Running',
      benchProgress: 'Progress', benchWaiting: 'waiting for reply…', benchDone: 'Experiment done',
      benchIsolationWarn: '⚠ "New session" button not found; trials ran in the same session without context isolation',
      benchTimeout: 'Timed out waiting for reply (240s); aborted',
      benchEmpty: 'Fill in both variant A and variant B prompts first',
      benchReportTitle: 'Fingerprint distribution comparison', benchRunId: 'Run', benchStarted: 'Started', benchFinished: 'Finished',
      colFp: 'fingerprint', colDelta: 'Δ(A−B)', colZ: 'z', colP: 'p', colSig: 'sig',
      benchNone: 'No experiments yet. Open the "A/B Bench" from the ⚗ chip row above the composer on a conversation page.',
      benchPickRun: 'Pick run', benchRefresh: 'Refresh',
      benchDefA: 'Explain "entropy" to a bright middle-schooler in three sentences.',
      benchDefB: 'You are a world-class science writer; rehearse the answer three times in your head before speaking. Explain "entropy" to a bright middle-schooler in three sentences.',
    }

    const S = {
      banner: { background: '#2d2406', border: '1px solid #9e6a03', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: '#e3b341', lineHeight: '1.6', marginBottom: '14px' },
      status: { fontSize: '11px', color: '#8b949e', marginBottom: '10px' },
      card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '14px', marginBottom: '12px' },
      row: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' },
      btn: { background: 'transparent', border: '1px solid #30363d', borderRadius: '6px', color: '#8b949e', padding: '6px 12px', fontSize: '13px', cursor: 'pointer' },
      btnActive: { background: '#21262d', border: '1px solid #8b949e', borderRadius: '6px', color: '#e6edf3', padding: '6px 12px', fontSize: '13px', cursor: 'pointer' },
      chip: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '20px', color: '#8b949e', padding: '2px 10px', fontSize: '11px' },
      name: { fontSize: '14px', fontWeight: '700', color: '#e6edf3' },
      desc: { fontSize: '12px', color: '#8b949e', marginTop: '4px', lineHeight: '1.5' },
      h2: { fontSize: '13px', fontWeight: '600', color: '#e6edf3', margin: '18px 0 8px' },
      table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: '#c9d1d9' },
      th: { textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #30363d', color: '#8b949e', fontWeight: '600' },
      td: { padding: '6px 8px', borderBottom: '1px solid #21262d' },
      input: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', color: '#e6edf3', padding: '6px 8px', fontSize: '12px', width: '100%', boxSizing: 'border-box' },
      mono: { fontFamily: 'monospace', fontSize: '12px', color: '#c9d1d9' },
      benchWrap: { width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: '10px', padding: '10px 12px', marginBottom: '6px' },
      benchTa: { width: '100%', minHeight: '52px', background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#c9d1d9', fontSize: '12px', padding: '6px 8px', boxSizing: 'border-box', resize: 'vertical' },
      benchLabel: { fontSize: '11px', color: '#8b949e', margin: '6px 0 3px' },
      benchTable: { width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginTop: '6px' },
      benchCell: { border: '1px solid #21262d', padding: '3px 6px', textAlign: 'right', whiteSpace: 'nowrap' },
      dock: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', padding: '4px 0' },
      dockChip: { background: '#161b22', border: '1px solid #30363d', borderRadius: '16px', color: '#8b949e', padding: '3px 12px', fontSize: '12px', cursor: 'pointer' },
    }

    const pct = (ci) => `${(ci.rate * 100).toFixed(0)}% [${(ci.low * 100).toFixed(0)}–${(ci.high * 100).toFixed(0)}]`

    // ── tier A: settings section panel ──────────────────────────────────────
    // ── v0.4 实验台：报告拉取与 A/B 对比表（Dock 控制台与设置面板共用）─────
    function fetchBenchReport(runId) {
      const url = runId ? '/deus/bench/report?runId=' + encodeURIComponent(runId) : '/deus/bench/report'
      return fetch(url).then((r) => r.json())
    }

    const BENCH_CLS_COLORS = { god: '#d2a8ff', med: '#3fb950', pure: '#79c0ff', unknown: '#8b949e' }

    function benchCellFmt(g, n) {
      if (!g || !n) return '—'
      return g.n + '/' + n + ' · ' + Math.round(100 * g.rate) + '% [' + Math.round(100 * g.low) + '–' + Math.round(100 * g.high) + ']'
    }

    function BenchTable(props) {
      const report = props.report
      const t = props.t
      if (!report) return null
      const A = report.order[0]
      const B = report.order[1] || 'B'
      const vA = report.variants[A]
      const vB = report.variants[B]
      const sig = (p) => (p == null ? '' : p < 0.01 ? '✱✱' : p < 0.05 ? '✱' : '')
      return h('div', { 'data-deus': 'bench-report', style: { marginTop: '8px' } },
        h('div', { style: S.status },
          t('benchRunId') + ': ' + report.runId + ' · n=' + report.n +
          ' · ' + t('benchStarted') + ' ' + String(report.startedAt).slice(11, 19) +
          ' · ' + t('benchFinished') + ' ' + String(report.finishedAt).slice(11, 19)),
        h('table', { style: S.benchTable },
          h('thead', null, h('tr', null,
            h('th', { style: { ...S.benchCell, textAlign: 'left' } }, t('colFp')),
            h('th', { style: S.benchCell }, 'A (n=' + (vA ? vA.n : 0) + ')'),
            h('th', { style: S.benchCell }, 'B (n=' + (vB ? vB.n : 0) + ')'),
            h('th', { style: S.benchCell }, t('colDelta')),
            h('th', { style: S.benchCell }, t('colZ')),
            h('th', { style: S.benchCell }, t('colP')),
            h('th', { style: S.benchCell }, t('colSig')))),
          h('tbody', null, (report.comparison || []).map((row) => h('tr', { key: row.cls },
            h('td', { style: { ...S.benchCell, textAlign: 'left', color: BENCH_CLS_COLORS[row.cls] || '#8b949e' } }, t('detected_' + row.cls)),
            h('td', { style: S.benchCell }, benchCellFmt(row.a, vA && vA.n)),
            h('td', { style: S.benchCell }, benchCellFmt(row.b, vB && vB.n)),
            h('td', { style: S.benchCell }, row.delta == null ? '—' : (row.delta >= 0 ? '+' : '') + Math.round(row.delta * 100) + 'pp'),
            h('td', { style: S.benchCell }, row.z == null ? '—' : Number(row.z).toFixed(2)),
            h('td', { style: S.benchCell }, row.p == null ? '—' : row.p < 0.001 ? '<0.001' : Number(row.p).toFixed(3)),
            h('td', { style: { ...S.benchCell, color: '#d29922' } }, sig(row.p)),
          )))),
        vA && vA.prompt ? h('div', { style: { ...S.status, marginTop: '6px' } }, 'A: ' + JSON.stringify(vA.prompt)) : null,
        vB && vB.prompt ? h('div', { style: S.status }, 'B: ' + JSON.stringify(vB.prompt)) : null,
      )
    }

    function Panel(props) {
      const t = props.t
      const [presets, setPresets] = useState([])
      const [stats, setStats] = useState(null)
      const [entries, setEntries] = useState([])
      const [ver, setVer] = useState(null)
      const [anchor, setAnchor] = useState(null)
      const [err, setErr] = useState('')
      const [copied, setCopied] = useState('')
      const [editing, setEditing] = useState(null) // {id, label_zh, prompt} draft
      const [benchData, setBenchData] = useState(null) // { ok, report, runs }
      const [benchRunId, setBenchRunId] = useState('')

      function refreshBench(runId) {
        fetchBenchReport(runId || undefined).then((d) => setBenchData(d)).catch(() => {})
      }

      function refresh() {
        fetch('/deus/presets').then((r) => r.json()).then((d) => setPresets(d.presets || [])).catch(() => setErr(t('loadFail')))
        fetch('/deus/stats').then((r) => r.json()).then(setStats).catch(() => {})
        fetch('/deus/log').then((r) => r.json()).then((d) => setEntries(d.entries || [])).catch(() => {})
        fetch('/deus/version').then((r) => r.json()).then(setVer).catch(() => {})
        fetch('/deus/anchor').then((r) => r.json()).then(setAnchor).catch(() => {})
        refreshBench(benchRunId)
      }
      useEffect(() => { refresh() }, [])

      async function copyPrompt(p) {
        try {
          await navigator.clipboard.writeText(p.prompt === null ? '' : p.prompt)
          setCopied(p.id)
          setTimeout(() => setCopied(''), 1500)
        } catch { setErr(t('loadFail')) }
      }

      async function saveAll(next) {
        setErr('')
        try {
          const r = await fetch('/deus/presets', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ presets: next }),
          }).then((x) => x.json())
          if (!r.ok) setErr(t('saveFail'))
          else setPresets(r.presets)
        } catch { setErr(t('saveFail')) }
      }

      async function resetPresets() {
        const r = await fetch('/deus/presets/reset', { method: 'POST' }).then((x) => x.json()).catch(() => null)
        if (r && r.ok) setPresets(r.presets)
      }

      async function resetLog() {
        if (!window.confirm(t('resetLogConfirm'))) return
        await fetch('/deus/log', { method: 'DELETE' }).catch(() => {})
        refresh()
      }

      function commitEdit() {
        if (!editing || editing.id.trim() === '') return
        const next = presets.filter((p) => p.id !== editing.id)
        next.push({ id: editing.id.trim(), label_zh: editing.label_zh.trim() || editing.id.trim(), label_en: editing.label_zh.trim() || editing.id.trim(), prompt: editing.prompt === '' ? null : editing.prompt, tags: [] })
        saveAll(next)
        setEditing(null)
      }

      return h('div', { style: { maxWidth: '860px' } },
        h('div', { style: { fontSize: '14px', fontWeight: '600', color: '#e6edf3', marginBottom: '4px' } }, '⚗ ' + t('nav')),
        h('div', { style: S.status }, t('sub')),
        h('div', { style: S.banner }, '⚠️ ' + t('honesty')),
        err ? h('div', { style: { color: '#f85149', fontSize: '12px', marginBottom: '10px' } }, err) : null,
        ver ? h('div', { style: { ...S.status, fontFamily: 'monospace' } },
          `${t('dshVer')}: ${ver.dsh} · ${t('pluginVer')}: ${ver.plugin} · ${t('logPath')}: ${ver.logPath}`) : null,

        h('div', { style: S.h2 }, t('presets')),
        h('div', { style: S.status }, t('presetsHint')),
        presets.map((p) => h('div', { key: p.id, style: S.card },
          h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' } },
            h('span', { style: S.name }, p.label_zh),
            h('span', { style: { fontSize: '11px', color: '#8b949e' } }, p.id),
            p.builtin ? h('span', { style: S.chip }, 'built-in') : null,
          ),
          h('div', { style: { ...S.mono, marginTop: '6px' } }, p.prompt === null ? t('empty') : JSON.stringify(p.prompt)),
          h('div', { style: S.row },
            h('button', { style: copied === p.id ? S.btnActive : S.btn, onClick: () => copyPrompt(p) },
              copied === p.id ? '📋 ' + t('copied') : '📋 ' + t('copy')),
            h('button', { style: S.btn, onClick: () => setEditing({ id: p.id, label_zh: p.label_zh, prompt: p.prompt === null ? '' : p.prompt }) }, '✏️ ' + t('edit')),
            h('button', { style: S.btn, onClick: () => saveAll(presets.filter((x) => x.id !== p.id)) }, '🗑 ' + t('del')),
          ),
        )),
        editing ? h('div', { style: S.card },
          h('div', { style: S.status }, t('editId')),
          h('input', { style: S.input, value: editing.id, onChange: (e) => setEditing({ ...editing, id: e.target.value }) }),
          h('div', { style: { ...S.status, marginTop: '8px' } }, t('editLabel')),
          h('input', { style: S.input, value: editing.label_zh, onChange: (e) => setEditing({ ...editing, label_zh: e.target.value }) }),
          h('div', { style: { ...S.status, marginTop: '8px' } }, t('editPrompt')),
          h('textarea', { style: { ...S.input, minHeight: '60px' }, value: editing.prompt, onChange: (e) => setEditing({ ...editing, prompt: e.target.value }) }),
          h('div', { style: S.row },
            h('button', { style: S.btnActive, onClick: commitEdit }, '💾 ' + t('save')),
            h('button', { style: S.btn, onClick: () => setEditing(null) }, t('cancel')),
          ),
        ) : h('div', { style: S.row },
          h('button', { style: S.btn, onClick: () => setEditing({ id: '', label_zh: '', prompt: '' }) }, '➕ ' + t('add')),
          h('button', { style: S.btn, onClick: resetPresets }, '↩ ' + t('resetPresets')),
        ),

        h('div', { style: S.h2 }, t('stats')),
        h('div', { style: S.status }, t('statsHint')),
        h('div', { style: { ...S.status, color: '#7d8590' } }, t('measured')),
        h(Sparkline, { entries }),
        entries.length >= 4 ? h('div', { style: { ...S.status, fontSize: '10px' } }, t('trend')) : null,
        stats && stats.modes.length > 0
          ? h('table', { style: S.table },
              h('thead', null, h('tr', null,
                h('th', { style: S.th }, t('colMode')), h('th', { style: S.th }, t('colN')),
                h('th', { style: S.th }, t('colGod')), h('th', { style: S.th }, t('colMed')), h('th', { style: S.th }, t('colPure')))),
              h('tbody', null, stats.modes.map((m) => h('tr', { key: m.mode },
                h('td', { style: S.td }, m.mode),
                h('td', { style: S.td }, m.n),
                h('td', { style: { ...S.td, color: '#d2a8ff' } }, pct(m.godCI)),
                h('td', { style: S.td }, pct(m.medCI)),
                h('td', { style: S.td }, pct(m.pureCI)),
              ))),
            )
          : h('div', { style: S.status }, t('noData')),
        h('div', { style: S.row },
          h('a', { href: '/deus/log.csv', download: 'deus-log.csv', style: { ...S.btn, textDecoration: 'none', display: 'inline-block' } }, '⬇ ' + t('exportCsv')),
          stats ? h('button', {
            style: copied === '__md' ? S.btnActive : S.btn,
            onClick: async () => {
              try {
                await navigator.clipboard.writeText(buildMarkdownSummary(stats))
                setCopied('__md'); setTimeout(() => setCopied(''), 2500)
              } catch {}
            },
          }, '📋 ' + (copied === '__md' ? t('mdCopied') : t('copyMd'))) : null,
          h('button', { style: { ...S.btn, color: '#f85149', borderColor: '#f85149' }, onClick: resetLog }, '🗑 ' + t('resetLog')),
        ),

        h('div', { style: S.h2 }, t('anchor')),
        h('div', { style: S.status }, t('anchorHint')),
        anchor && anchor.agentPresets && h('div', { style: S.card },
          h('div', { style: S.status }, t('anchorPresetInstalled')),
          anchor.agentPresets.map((p) => h('div', { key: p.id, style: { display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' } },
            h('span', { style: { ...S.chip, color: p.installed ? '#3fb950' : '#f85149', borderColor: p.installed ? '#3fb950' : '#f85149' } }, p.installed ? '✓' : '✗'),
            h('span', { style: S.name }, p.name || p.id),
            p.reason ? h('span', { style: S.status }, '(' + p.reason + ')') : null,
          )),
        ),
        anchor && anchor.sessions && anchor.sessions.length > 0
          ? h('table', { style: S.table },
              h('thead', null, h('tr', null,
                h('th', { style: S.th }, t('colSession')), h('th', { style: S.th }, t('colPreset')),
                h('th', { style: S.th }, t('colTurns')), h('th', { style: S.th }, t('colGodRate')),
                h('th', { style: S.th }, t('colLastFp')), h('th', { style: S.th }, t('colAnchorState')))),
              h('tbody', null, anchor.sessions.map((s) => h('tr', { key: s.sessionId },
                h('td', { style: { ...S.td, ...S.mono } }, s.sessionId.slice(0, 8)),
                h('td', { style: S.td }, s.preset),
                h('td', { style: S.td }, s.total),
                h('td', { style: { ...S.td, color: '#d2a8ff' } }, s.total ? Math.round(100 * s.god / s.total) + '%' : '—'),
                h('td', { style: S.td }, s.lastFp ? t('detected_' + s.lastFp) : '—'),
                h('td', { style: { ...S.td, color: s.drifted ? '#f85149' : '#3fb950' } }, s.drifted ? '⚠ ' + t('drifted') : '⚓ ' + t('anchoredOn')),
              ))),
            )
          : h('div', { style: S.status }, t('anchorNone')),

        h('div', { style: S.h2 }, '🧪 ' + t('bench')),
        h('div', { style: S.status }, t('benchHint')),
        h('div', { style: S.row },
          h('button', { style: S.btn, 'data-deus': 'bench-refresh', onClick: () => refreshBench(benchRunId) }, '🔄 ' + t('benchRefresh')),
          benchData && benchData.runs && benchData.runs.length > 0 ? h('select', {
            style: { ...S.input, width: 'auto' }, 'data-deus': 'bench-runs',
            value: benchRunId,
            onChange: (e) => { setBenchRunId(e.target.value); refreshBench(e.target.value) },
          },
            h('option', { value: '' }, t('benchPickRun')),
            benchData.runs.map((r) => h('option', { key: r.runId, value: r.runId }, r.runId + ' · n=' + r.n)),
          ) : null,
        ),
        benchData && benchData.report
          ? h(BenchTable, { report: benchData.report, t })
          : h('div', { style: S.status, 'data-deus': 'bench-empty' }, t('benchNone')),

        h('div', { style: S.h2 }, t('recent')),
        h('div', { style: S.status }, t('recentHint')),
        entries.length === 0 ? h('div', { style: S.status }, t('noData'))
          : entries.slice(0, 10).map((e, i) => h('div', { key: i, style: { ...S.card, padding: '10px 12px' } },
              h('div', { style: { display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' } },
                h('span', { style: S.chip }, e.prompt_mode),
                h('span', { style: { ...S.chip, color: e.detected === 'god' ? '#d2a8ff' : e.detected === 'pure' ? '#79c0ff' : e.detected === 'med' ? '#3fb950' : '#8b949e' } },
                  t('detected_' + (e.detected || 'unknown'))),
                h('span', { style: { fontSize: '11px', color: '#8b949e' } }, e.ts),
              ),
              h('div', { style: { ...S.mono, marginTop: '6px', whiteSpace: 'pre-wrap' } }, e.first_sentence),
            )),
      )
    }

    // ── tier B: composer dock chip row ──────────────────────────────────────
    // One click: mark the trigger on the host, then write the prompt into the
    // composer draft (inputActions.setDraft); optional auto-send (submit).
    function Dock(props) {
      const t = props.t
      const [presets, setPresets] = useState([])
      const [autoSend, setAutoSend] = useState(() => {
        try { return window.localStorage.getItem('deus.autoSend') === '1' } catch { return false }
      })
      useEffect(() => {
        fetch('/deus/presets').then((r) => r.json()).then((d) => setPresets(d.presets || [])).catch(() => {})
      }, [])

      const sessionId = props.sessionId || (props.session && props.session.sessionId)
      const actions = props.inputActions

      // v0.2 锚定维持：轮询宿主锚定状态，漂移时给重锚 chip / 自动重锚
      const [anchor, setAnchor] = useState(null)
      const [autoReanchor, setAutoReanchor] = useState(() => {
        try { return window.localStorage.getItem('deus.autoReanchor') === '1' } catch { return false }
      })
      const [reanchorMsg, setReanchorMsg] = useState('')
      // v0.3 未锚定引导：当前会话的 agent preset（宿主读会话日志头行）
      const [sessPreset, setSessPreset] = useState(null)
      const [showGuide, setShowGuide] = useState(false)
      const lastReanchorKey = useRef('')

      // ── v0.4 实验台（A/B bench）──────────────────────────────────────────
      const [benchOpen, setBenchOpen] = useState(false)
      const [benchA, setBenchA] = useState(() => {
        try { return window.localStorage.getItem('deus.benchA') || t('benchDefA') } catch { return t('benchDefA') }
      })
      const [benchB, setBenchB] = useState(() => {
        try { return window.localStorage.getItem('deus.benchB') || t('benchDefB') } catch { return t('benchDefB') }
      })
      const [benchN, setBenchN] = useState(3)
      const [benchRunning, setBenchRunning] = useState(false)
      const [benchProg, setBenchProg] = useState(null) // { a, b, n, label, waiting }
      const [benchReport, setBenchReport] = useState(null)
      const [benchNote, setBenchNote] = useState('')
      const benchAbort = useRef(false)
      const benchRunIdRef = useRef('')
      const sidRef = useRef(sessionId)
      const actionsRef = useRef(actions)
      useEffect(() => { sidRef.current = sessionId; actionsRef.current = actions })

      function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }

      // 每次试验开一个新会话以隔离上下文：点侧栏「新建会话」按钮，
      // 然后等 dock 的 sessionId prop 变化（运行时重渲染本会带回新 id）。
      async function benchNewSession(prevSid) {
        const sels = [
          'button[aria-label="新建会话"]', 'button[aria-label="New session"]',
          '[role="button"][aria-label="新建会话"]', '[role="button"][aria-label="New session"]',
        ]
        let btn = null
        for (const sel of sels) { btn = document.querySelector(sel); if (btn) break }
        if (!btn) {
          btn = Array.from(document.querySelectorAll('button, [role="button"]'))
            .find((b) => /新建会话|New session/i.test((b.getAttribute('aria-label') || '') + ' ' + (b.title || '')))
        }
        if (!btn) return false
        btn.click()
        const t0 = Date.now()
        while (Date.now() - t0 < 10000) {
          await sleep(300)
          if (String(sidRef.current || '') !== String(prevSid || '')) return true
        }
        return false
      }

      async function abortBench() {
        benchAbort.current = true
        try {
          await fetch('/deus/bench/clear', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ runId: benchRunIdRef.current }),
          })
        } catch { /* best-effort */ }
      }

      async function runBench() {
        const aText = benchA.trim()
        const bText = benchB.trim()
        if (!aText || !bText) { setBenchNote(t('benchEmpty')); return }
        setBenchRunning(true); setBenchNote(''); setBenchReport(null)
        benchAbort.current = false
        const runId = 'bench-' + Date.now().toString(36)
        benchRunIdRef.current = runId
        const n = Math.max(1, Math.min(20, Math.floor(Number(benchN) || 1)))
        const trials = []
        for (let i = 0; i < n; i++) { trials.push(['A', aText, i + 1]); trials.push(['B', bText, i + 1]) }
        let doneA = 0
        let doneB = 0
        const total = trials.length
        try { window.__deusBench = { running: true, runId, done: 0, total } } catch { /* ignore */ }
        try {
          for (const [variant, text, idx] of trials) {
            if (benchAbort.current) break
            setBenchProg({ a: doneA, b: doneB, n, label: variant + '#' + idx, waiting: false })
            // 1) 新会话隔离（失败则降级为同会话连跑并亮警告）
            const prevSid = sidRef.current
            const switched = await benchNewSession(prevSid)
            if (!switched) { setBenchNote(t('benchIsolationWarn')); await sleep(400) }
            if (benchAbort.current) break
            // 2) 等 composer actions 就绪
            const w0 = Date.now()
            while (!(actionsRef.current && typeof actionsRef.current.setDraft === 'function')) {
              if (Date.now() - w0 > 8000) break
              await sleep(250)
            }
            // 3) 宿主标记（文本队列配对）→ 注入并发送
            try {
              await fetch('/deus/bench/mark', {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ runId, variant, prompt: text }),
              })
            } catch { /* marking best-effort */ }
            const acts = actionsRef.current
            if (!acts || typeof acts.setDraft !== 'function' || typeof acts.submit !== 'function') {
              setBenchNote(t('benchTimeout')); break
            }
            acts.setDraft(text)
            await sleep(200)
            acts.submit()
            // 4) 轮询报告计数，等宿主把这轮的指纹判定写进日志
            setBenchProg({ a: doneA, b: doneB, n, label: variant + '#' + idx, waiting: true })
            const doneSoFar = doneA + doneB
            const t0 = Date.now()
            let arrived = false
            while (Date.now() - t0 < 240000) {
              if (benchAbort.current) break
              await sleep(2000)
              const rep = await fetchBenchReport(runId).catch(() => null)
              if (rep && rep.report && rep.report.n >= doneSoFar + 1) { arrived = true; break }
            }
            if (!arrived && !benchAbort.current) { setBenchNote(t('benchTimeout')); break }
            if (variant === 'A') doneA++; else doneB++
            try { window.__deusBench = { running: true, runId, done: doneA + doneB, total } } catch { /* ignore */ }
            await sleep(600)
          }
        } finally {
          setBenchRunning(false)
          setBenchProg(null)
          try { window.__deusBench = { running: false, runId, done: doneA + doneB, total } } catch { /* ignore */ }
        }
        const fin = await fetchBenchReport(runId).catch(() => null)
        if (fin && fin.report) setBenchReport(fin.report)
      }
      const REANCHOR = 'We need to continue working on this together. Let us pick up where we left off. 我们继续协作，接着上一步往下做。'

      useEffect(() => {
        let dead = false
        const poll = () => {
          fetch('/deus/anchor').then((r) => r.json()).then((d) => { if (!dead) setAnchor(d) }).catch(() => {})
          if (sessionId) {
            fetch('/deus/session-preset?sessionId=' + encodeURIComponent(sessionId))
              .then((r) => r.json()).then((d) => { if (!dead) setSessPreset(d.preset || null) }).catch(() => {})
          }
        }
        poll()
        const timer = setInterval(poll, 4000)
        return () => { dead = true; clearInterval(timer) }
      }, [sessionId])

      const st = anchor && Array.isArray(anchor.sessions)
        ? anchor.sessions.find((s) => String(s.sessionId) === String(sessionId))
        : null

      async function fireReanchor() {
        try {
          await fetch('/deus/trigger', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sessionId: String(sessionId || ''), mode: 'reanchor', prompt: REANCHOR }),
          })
        } catch { /* best-effort */ }
        if (actions && typeof actions.setDraft === 'function') {
          actions.setDraft(REANCHOR)
          if (typeof actions.submit === 'function') actions.submit()
          setReanchorMsg(t('reanchorSent'))
          setTimeout(() => setReanchorMsg(''), 3000)
        }
      }

      // 自动重锚：漂移且开启时自动发一次（按 sessionId+轮数去抖）
      useEffect(() => {
        if (!st || !st.drifted || !autoReanchor) return
        const key = String(sessionId) + ':' + st.total
        if (lastReanchorKey.current === key) return
        lastReanchorKey.current = key
        fireReanchor()
      }, [st && st.drifted, st && st.total, autoReanchor])

      function toggleAutoReanchor() {
        const next = !autoReanchor
        setAutoReanchor(next)
        try { window.localStorage.setItem('deus.autoReanchor', next ? '1' : '0') } catch { /* ignore */ }
      }

      async function fire(p) {
        try {
          await fetch('/deus/trigger', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sessionId: String(sessionId || ''), mode: p.id }),
          })
        } catch { /* marking is best-effort; injection still proceeds */ }
        if (!actions || typeof actions.setDraft !== 'function') {
          try { await navigator.clipboard.writeText(p.prompt === null ? '' : p.prompt) } catch { /* ignore */ }
          return
        }
        actions.setDraft(p.prompt === null ? '' : p.prompt)
        if (autoSend && typeof actions.submit === 'function') actions.submit()
      }

      function toggleAuto() {
        const next = !autoSend
        setAutoSend(next)
        try { window.localStorage.setItem('deus.autoSend', next ? '1' : '0') } catch { /* ignore */ }
      }

      if (presets.length === 0) return null // 所有 hooks 之上不可早退（React hooks 顺序）

      // v0.3 未锚定引导：非锚定会话 + preset 已知且非 deus/minimal 系 → 灰 chip
      const UNANCHORED_PRESET_RE = /^(deus-|minimal)/
      const unanchored = !st && sessPreset && !UNANCHORED_PRESET_RE.test(sessPreset)

      const benchPanel = benchOpen ? h('div', { style: S.benchWrap, 'data-deus': 'bench-panel' },
        h('div', { style: { fontSize: '12px', fontWeight: 600, color: '#e6edf3' } }, '🧪 ' + t('bench')),
        h('div', { style: S.status }, t('benchHint')),
        h('div', { style: S.benchLabel }, t('benchA')),
        h('textarea', {
          style: S.benchTa, 'data-deus': 'bench-a', value: benchA, disabled: benchRunning,
          onChange: (e) => { setBenchA(e.target.value); try { window.localStorage.setItem('deus.benchA', e.target.value) } catch { /* ignore */ } },
        }),
        h('div', { style: S.benchLabel }, t('benchB')),
        h('textarea', {
          style: S.benchTa, 'data-deus': 'bench-b', value: benchB, disabled: benchRunning,
          onChange: (e) => { setBenchB(e.target.value); try { window.localStorage.setItem('deus.benchB', e.target.value) } catch { /* ignore */ } },
        }),
        h('div', { style: { ...S.row, marginTop: '8px', alignItems: 'center' } },
          h('span', { style: { ...S.benchLabel, margin: 0 } }, t('benchTimes')),
          h('input', {
            type: 'number', min: 1, max: 20, 'data-deus': 'bench-n', value: benchN, disabled: benchRunning,
            style: { background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#c9d1d9', fontSize: '12px', padding: '4px 6px', width: '60px' },
            onChange: (e) => setBenchN(e.target.value),
          }),
          benchRunning
            ? h('button', { style: { ...S.btn, color: '#f85149', borderColor: '#f85149' }, 'data-deus': 'bench-abort', onClick: abortBench }, t('benchAbort'))
            : h('button', { style: S.btnActive, 'data-deus': 'bench-run', onClick: runBench }, t('benchRun')),
        ),
        benchProg ? h('div', { style: S.status, 'data-deus': 'bench-progress' },
          t('benchRunning') + ' · ' + t('benchProgress') + ': A ' + benchProg.a + '/' + benchProg.n + ' · B ' + benchProg.b + '/' + benchProg.n + ' · ' + benchProg.label + (benchProg.waiting ? ' ' + t('benchWaiting') : '')) : null,
        benchNote ? h('div', { style: { ...S.status, color: '#d29922' }, 'data-deus': 'bench-note' }, benchNote) : null,
        benchReport ? h(BenchTable, { report: benchReport, t }) : null,
      ) : null

      const dockRow = h('div', { style: S.dock, title: t('dockHint') },
        h('span', { style: { fontSize: '11px', color: '#8b949e' } }, '⚗'),
        presets.map((p) => h('button', {
          key: p.id, style: S.dockChip, title: t('dockHint'),
          onClick: () => fire(p),
        }, (autoSend ? '🚀 ' : '⚡ ') + p.label_zh)),
        st ? h('button', {
          style: { ...S.dockChip, color: st.drifted ? '#f85149' : '#3fb950', borderColor: st.drifted ? '#f85149' : '#3fb950' },
          title: st.drifted ? t('reanchor') : t('dockAnchored'),
          onClick: st.drifted ? fireReanchor : undefined,
        }, st.drifted ? '⚠ ' + t('reanchor') : `⚓ ${t('dockAnchored')} ${st.god}/${st.total}`) : null,
        unanchored ? h('button', {
          style: { ...S.dockChip, color: '#8b949e', borderColor: '#8b949e', borderStyle: 'dotted' },
          title: t('unanchoredTitle'),
          onClick: () => setShowGuide((v) => !v),
        }, t('unanchored')) : null,
        unanchored && showGuide ? h('div', {
          style: {
            fontSize: '11px', color: '#8b949e', lineHeight: 1.6, maxWidth: '520px',
            borderLeft: '2px solid #8b949e', paddingLeft: '8px', margin: '2px 0',
          },
        }, t('guideText')) : null,
        reanchorMsg ? h('span', { style: { fontSize: '11px', color: '#3fb950' } }, reanchorMsg) : null,
        h('button', { style: { ...S.dockChip, borderStyle: 'dashed' }, title: t('autoSend'), onClick: toggleAuto },
          (autoSend ? '☑ ' : '☐ ') + t('autoSend')),
        st ? h('button', { style: { ...S.dockChip, borderStyle: 'dashed' }, title: t('autoReanchor'), onClick: toggleAutoReanchor },
          (autoReanchor ? '☑ ' : '☐ ') + t('autoReanchor')) : null,
        h('button', {
          style: { ...S.dockChip, borderStyle: 'dashed', color: benchOpen ? '#d2a8ff' : '#8b949e', borderColor: benchOpen ? '#d2a8ff' : '#30363d' },
          title: t('bench'), 'data-deus': 'bench-chip',
          onClick: () => setBenchOpen((v) => !v),
        }, '🧪 ' + t('bench')),
      )
      return h('div', { style: { width: '100%' } }, benchPanel, dockRow)
    }

    // v0.3: 触发率迷你趋势（最近 40 条日志分 10 桶的 god 率折线）
    function Sparkline({ entries }) {
      const seq = entries.slice(0, 40).reverse() // /deus/log 最新在前 → 转时间序
      if (seq.length < 4) return null
      const B = 10
      const pts = []
      for (let i = 0; i < B; i++) {
        const chunk = seq.slice(Math.floor(i * seq.length / B), Math.floor((i + 1) * seq.length / B))
        if (chunk.length === 0) continue
        const god = chunk.filter((e) => e.detected === 'god').length / chunk.length
        pts.push([i, god])
      }
      if (pts.length < 2) return null
      const W = 260, H = 48, P = 5
      const xy = pts.map(([i, v]) => [P + (W - 2 * P) * i / (B - 1), H - P - (H - 2 * P) * v])
      const dAttr = xy.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')
      return h('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}`, style: { display: 'block', margin: '4px 0 2px' } },
        h('path', { d: `M${P},${H - P} L${W - P},${H - P}`, stroke: '#30363d', strokeWidth: 1, fill: 'none' }),
        h('path', { d: `M${P},${P} L${W - P},${P}`, stroke: '#30363d', strokeWidth: 1, strokeDasharray: '3 3', fill: 'none' }),
        h('path', { d: dAttr, stroke: '#d2a8ff', strokeWidth: 2, fill: 'none' }),
        xy.map((p, i) => h('circle', { key: i, cx: p[0], cy: p[1], r: 2.5, fill: '#d2a8ff' })),
      )
    }

    // v0.3: 一键复制 Markdown 摘要（传播物料：表格 + 诚实声明 + 包链接）
    function buildMarkdownSummary(stats) {
      const pct1 = (x) => (x * 100).toFixed(1) + '%'
      const lines = [
        '## 神版触发率实测摘要 / God-mode trigger summary', '',
        '| 模式 mode | 样本 n | 神版率 god | 95% CI | 中版 med | 纯区 pure |',
        '|---|---|---|---|---|---|',
      ]
      for (const m of stats.modes || []) {
        if (!m || !m.n) continue
        lines.push(`| ${m.mode} | ${m.n} | ${pct1(m.godCI.rate)} | ${pct1(m.godCI.low)}–${pct1(m.godCI.high)} | ${m.med} | ${m.pure} |`)
      }
      if (stats.total && stats.total.n) {
        lines.push(`| **ALL** | **${stats.total.n}** | **${pct1(stats.total.godCI.rate)}** | **${pct1(stats.total.godCI.low)}–${pct1(stats.total.godCI.high)}** | ${stats.total.med} | ${stats.total.pure} |`)
      }
      lines.push('',
        `> ${stats.total ? stats.total.n : 0} 条本地日志，由 @dsh-suite/plugin-deus 记录。「神版/中版/纯区」为社区观察（X @NFT_Chen），未经 DeepSeek 官方证实；判定 = 推理流起手句式启发式，存在误判率。`,
        '> https://www.npmjs.com/package/@dsh-suite/plugin-deus')
      return lines.join('\n')
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        try {
          try { window.__deusClient = '0.4.0' } catch { /* non-browser */ }
          ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'deus-mode: dicts')
          const t = ctx.locale.bind(NS)
          ctx.slots.inject('settings.section', () => ctx.slots.register({
            name: 'settings.section',
            id: 'deus-mode',
            order: 75,
            label: () => t('nav'),
            locale: NS,
          }, Panel))
          ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
            name: 'conversation.input.dock',
            id: 'deus-mode',
            order: 60,
            locale: NS,
          }, Dock))
        } catch (e) {
          console.error('[plugin-deus] apply failed:', e)
        }
      },
    }
  },
})
