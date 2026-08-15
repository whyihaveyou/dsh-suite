// preset-center browser half — the "场景包 / Preset Packs" settings section.
// Lists the three Chinese out-of-the-box agent presets, previews what each
// installs (persona + tool config), and applies/removes them into the official
// DSH user preset root via the host routes (/preset-center/*).
window.__ModuleLoader__.load({
  id: '@dsh-suite/preset-center',
  factory: (require) => {
    const React = require('react')
    const { useState, useEffect } = React
    const h = React.createElement

    const NS = 'presetCenter'
    const zh = {
      nav: '场景包', sub: '中文开箱即用预设 · 装一个，直接干活',
      loading: '加载中…', apply: '一键应用', applied: '已安装 ✓', remove: '移除',
      preview: '预览', previewHint: '应用前看看它会装什么',
      persona: '人设（系统提示词）', web: '联网搜索', webOn: '开启', webOff: '关闭',
      files: '将写入', next: '应用后：无需重启，打开 Settings → Agent presets，选择对应预设即可开始对话。',
      themes: '💡 可选搭配：装了 @dsh-suite/themes 可在「皮肤中心」把界面换成喜欢的皮肤（非必需）。',
      loadFail: '预设列表加载失败', applyFail: '应用失败',
    }
    const en = {
      nav: 'Preset Packs', sub: 'Chinese out-of-the-box presets — install one, start working',
      loading: 'Loading…', apply: 'Apply', applied: 'Installed ✓', remove: 'Remove',
      preview: 'Preview', previewHint: 'See what it installs before applying',
      persona: 'Persona (system prompt)', web: 'Web search', webOn: 'On', webOff: 'Off',
      files: 'Will write', next: 'After applying: no restart needed — open Settings → Agent presets and pick the preset to start chatting.',
      themes: '💡 Optional: with @dsh-suite/themes installed, pick a matching skin in the Skin Center (not required).',
      loadFail: 'Failed to load presets', applyFail: 'Apply failed',
    }

    const S = {
      bar: { display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' },
      status: { fontSize: '11px', color: '#8b949e', marginBottom: '10px' },
      card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '14px', marginBottom: '12px' },
      row: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' },
      btn: { background: 'transparent', border: '1px solid #30363d', borderRadius: '6px', color: '#8b949e', padding: '6px 12px', fontSize: '13px', cursor: 'pointer' },
      btnActive: { background: '#21262d', border: '1px solid #8b949e', borderRadius: '6px', color: '#e6edf3', padding: '6px 12px', fontSize: '13px', cursor: 'pointer' },
      chip: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '20px', color: '#8b949e', padding: '2px 10px', fontSize: '11px' },
      name: { fontSize: '15px', fontWeight: '700', color: '#e6edf3' },
      desc: { fontSize: '12px', color: '#8b949e', marginTop: '4px', lineHeight: '1.5' },
    }

    function Panel(props) {
      const t = props.t
      const [presets, setPresets] = useState([])
      const [loading, setLoading] = useState(true)
      const [open, setOpen] = useState({})   // id -> preview expanded
      const [busy, setBusy] = useState('')
      const [err, setErr] = useState('')

      function refresh() {
        fetch('/preset-center/list').then((r) => r.json()).then((list) => {
          setPresets(list || []); setLoading(false)
        }).catch(() => { setLoading(false); setErr(t('loadFail')) })
      }
      useEffect(() => { refresh() }, [])

      async function apply(id) {
        setBusy(id); setErr('')
        try {
          const r = await fetch('/preset-center/apply', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id }),
          }).then((x) => x.json())
          if (!r.ok) { setErr(t('applyFail') + ': ' + (r.error || id)) } else { refresh() }
        } catch { setErr(t('applyFail')) }
        setBusy('')
      }
      async function remove(id) {
        setBusy(id); setErr('')
        try {
          await fetch('/preset-center/remove', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id }),
          }).then((x) => x.json())
          refresh()
        } catch { setErr(t('applyFail')) }
        setBusy('')
      }

      return h('div', { style: { maxWidth: '860px' } },
        h('div', { style: { fontSize: '14px', fontWeight: '600', color: '#e6edf3', marginBottom: '4px' } }, t('nav')),
        h('div', { style: S.status }, t('sub')),
        loading ? h('div', { style: { color: '#8b949e', fontSize: '13px' } }, t('loading')) : null,
        err ? h('div', { style: { color: '#f85149', fontSize: '12px', marginBottom: '10px' } }, err) : null,
        presets.map((p) => {
          const expanded = !!open[p.id]
          const isApplied = !!p.applied
          return h('div', { key: p.id, style: S.card },
            h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' } },
              h('span', { style: S.name }, p.name),
              h('span', { style: { fontSize: '11px', color: '#8b949e' } }, p.id),
              isApplied ? h('span', { style: { ...S.chip, color: '#3fb950', borderColor: '#3fb950' } }, t('applied')) : null,
            ),
            h('div', { style: S.desc }, p.description),
            h('div', { style: S.row },
              h('span', { style: S.chip }, '🎭 ' + t('persona')),
              h('span', { style: S.chip }, '🧰 fs · skill · ask-user · todo'),
              h('span', { style: S.chip }, '🌐 ' + t('web') + ': ' + (p.fetchOn ? t('webOn') : t('webOff'))),
              h('span', { style: S.chip }, '🚫 shell'),
            ),
            expanded
              ? h('div', { style: { marginTop: '10px', background: '#0d1117', border: '1px solid #21262d', borderRadius: '6px', padding: '10px' } },
                  h('div', { style: { fontSize: '11px', color: '#8b949e', marginBottom: '6px' } }, t('persona') + '（' + t('previewHint') + '）'),
                  h('div', { style: { fontSize: '12px', color: '#c9d1d9', lineHeight: '1.6', whiteSpace: 'pre-wrap' } }, p.personaExcerpt + ' …'),
                  h('div', { style: { fontSize: '11px', color: '#8b949e', marginTop: '8px' } }, t('files') + ': ' + '~/.agent-presets/' + p.id + '/agent.cordis.yml + preset.yml'),
                )
              : null,
            h('div', { style: S.row },
              h('button', { style: expanded ? S.btnActive : S.btn, onClick: () => setOpen({ ...open, [p.id]: !expanded }) },
                '👁 ' + t('preview')),
              isApplied
                ? h('button', { style: S.btn, disabled: busy === p.id, onClick: () => remove(p.id) }, busy === p.id ? '…' : '🗑 ' + t('remove'))
                : h('button', { style: { ...S.btnActive, borderColor: '#3fb950', color: '#3fb950' }, disabled: busy === p.id, onClick: () => apply(p.id) },
                    busy === p.id ? '…' : '⚡ ' + t('apply')),
            ),
            isApplied ? h('div', { style: { fontSize: '11px', color: '#3fb950', marginTop: '8px' } }, '✅ ' + t('next')) : null,
          )
        }),
        h('div', { style: { fontSize: '12px', color: '#8b949e', marginTop: '14px', lineHeight: '1.6' } }, t('themes')),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        try {
          ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'preset-center: dicts')
          const t = ctx.locale.bind(NS)
          ctx.slots.inject('settings.section', () => ctx.slots.register({
            name: 'settings.section',
            id: 'preset-center',
            order: 70,
            label: () => t('nav'),
            locale: NS,
          }, Panel))
        } catch (e) {
          console.error('[preset-center] apply failed:', e)
        }
      },
    }
  },
})
