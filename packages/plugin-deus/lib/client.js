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
    const { useState, useEffect } = React
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
      measured: '本团队实测（2026-08-15，deepseek-v4-pro，N=200 次 API 采样）：极简首请求构成（Minimal 系统提示 ∧ ≤2 工具 ∧ 剥离注入上下文，三者缺一不可）下，动手类任务神版（we 起手）约 90%；讲解/咨询类任务约 0%；完整 persona + 25 工具对照组 0/20。指纹主要在推理流（reasoning），可见正文多为中文直答。样本量小，请当作倾向信号。',
      colMode: '模式', colN: '采样', colGod: '神版率', colMed: '中版率', colPure: '纯区率',
      exportCsv: '导出 CSV', resetLog: '清空日志', resetLogConfirm: '确定清空全部实验日志？此操作不可撤销。',
      recent: '最近记录', recentHint: '识别器判定是启发式倾向信号，first_sentence 原文供人工复核。',
      noData: '暂无记录——先触发几次再来看看。',
      loadFail: '加载失败', saveFail: '保存失败',
      dockHint: '神模扳机（实验工具·社区观察未证实）', dockSend: '注入并发送', dockFill: '注入',
      autoSend: '注入后自动发送',
      detected_pure: '纯区版', detected_med: '中版', detected_god: '神版', detected_unknown: '未判定',
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
      measured: 'Measured by our team (2026-08-15, deepseek-v4-pro, N=200 API samples): under a minimal first request (minimal system prompt AND ≤2 tools AND stripped context injection — all three required), hands-on tasks hit the god opener ("we…") ~90% of the time; explanatory/Q&A tasks ~0%; the full persona + 25-tool control hit 0/20. The fingerprint lives mostly in the reasoning stream. Small samples — treat as a tendency signal.',
      colMode: 'Mode', colN: 'N', colGod: 'god rate', colMed: 'med rate', colPure: 'pure rate',
      exportCsv: 'Export CSV', resetLog: 'Clear log', resetLogConfirm: 'Clear ALL experiment log entries? This cannot be undone.',
      recent: 'Recent entries', recentHint: 'The detector is a heuristic tendency signal; first_sentence is kept for human review.',
      noData: 'No entries yet — trigger a few times first.',
      loadFail: 'Load failed', saveFail: 'Save failed',
      dockHint: 'Deus Trigger (experiment · community observation, unconfirmed)', dockSend: 'Inject & send', dockFill: 'Inject',
      autoSend: 'Auto-send after inject',
      detected_pure: 'pure', detected_med: 'med', detected_god: 'god', detected_unknown: 'unknown',
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
      dock: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', padding: '4px 0' },
      dockChip: { background: '#161b22', border: '1px solid #30363d', borderRadius: '16px', color: '#8b949e', padding: '3px 12px', fontSize: '12px', cursor: 'pointer' },
    }

    const pct = (ci) => `${(ci.rate * 100).toFixed(0)}% [${(ci.low * 100).toFixed(0)}–${(ci.high * 100).toFixed(0)}]`

    // ── tier A: settings section panel ──────────────────────────────────────
    function Panel(props) {
      const t = props.t
      const [presets, setPresets] = useState([])
      const [stats, setStats] = useState(null)
      const [entries, setEntries] = useState([])
      const [ver, setVer] = useState(null)
      const [err, setErr] = useState('')
      const [copied, setCopied] = useState('')
      const [editing, setEditing] = useState(null) // {id, label_zh, prompt} draft

      function refresh() {
        fetch('/deus/presets').then((r) => r.json()).then((d) => setPresets(d.presets || [])).catch(() => setErr(t('loadFail')))
        fetch('/deus/stats').then((r) => r.json()).then(setStats).catch(() => {})
        fetch('/deus/log').then((r) => r.json()).then((d) => setEntries(d.entries || [])).catch(() => {})
        fetch('/deus/version').then((r) => r.json()).then(setVer).catch(() => {})
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
          h('button', { style: { ...S.btn, color: '#f85149', borderColor: '#f85149' }, onClick: resetLog }, '🗑 ' + t('resetLog')),
        ),

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
      if (presets.length === 0) return null

      const sessionId = props.session && props.session.sessionId
      const actions = props.inputActions

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

      return h('div', { style: S.dock, title: t('dockHint') },
        h('span', { style: { fontSize: '11px', color: '#8b949e' } }, '⚗'),
        presets.map((p) => h('button', {
          key: p.id, style: S.dockChip, title: t('dockHint'),
          onClick: () => fire(p),
        }, (autoSend ? '🚀 ' : '⚡ ') + p.label_zh)),
        h('button', { style: { ...S.dockChip, borderStyle: 'dashed' }, title: t('autoSend'), onClick: toggleAuto },
          (autoSend ? '☑ ' : '☐ ') + t('autoSend')),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        try {
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
