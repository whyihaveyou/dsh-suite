// {{PKG_NAME}} — BROWSER half: a settings panel listing the shipped presets.
//
// Same module-loader shape as the panel template; the only difference is the
// data flow: this panel fetches /{{PLUGIN_ID}}/list (host reads presets/),
// renders one card per preset, and calls /{{PLUGIN_ID}}/apply on click.
//
window.__ModuleLoader__.load({
  id: '{{PKG_NAME}}',
  factory: (require) => {
    const React = require('react')
    const { useState, useEffect } = React
    const h = React.createElement

    const NS = '{{PLUGIN_ID}}'
    const zh = {
      nav: '{{PLUGIN_ID}} 预设',
      loading: '加载中…',
      error: '加载失败',
      apply: '一键应用',
      applied: '已应用',
      remove: '移除',
      hint: '应用后无需重启：打开 Settings → Agent presets 即可选用。',
    }
    const en = {
      nav: '{{PLUGIN_ID}} Presets',
      loading: 'Loading…',
      error: 'Failed to load',
      apply: 'Apply',
      applied: 'Applied',
      remove: 'Remove',
      hint: 'No restart needed: Settings → Agent presets right after applying.',
    }

    let t = (k) => k
    const setT = (fn) => { t = fn }

    const S = {
      box: { display: 'flex', flexDirection: 'column', gap: '10px', color: '#c9d1d9' },
      card: { border: '1px solid #30363d', borderRadius: '8px', padding: '12px 14px', background: '#0d1117' },
      name: { fontSize: '14px', fontWeight: '700', color: '#e6edf3' },
      desc: { fontSize: '12.5px', color: '#8b949e', margin: '4px 0 8px' },
      btn: { background: 'transparent', border: '1px solid #30363d', borderRadius: '6px', color: '#c9d1d9', padding: '5px 12px', fontSize: '12.5px', cursor: 'pointer' },
      hint: { fontSize: '12px', color: '#8b949e' },
    }

    function Panel() {
      const [list, setList] = useState(null)
      const [busy, setBusy] = useState('')
      const refresh = () => {
        fetch('/{{PLUGIN_ID}}/list').then((r) => r.json()).then(setList).catch(() => setList([]))
      }
      useEffect(refresh, [])
      const act = (id, action) => {
        setBusy(id)
        fetch('/{{PLUGIN_ID}}/' + action, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ id }),
        }).then(() => refresh()).finally(() => setBusy(''))
      }
      if (!list) return h('div', { style: S.box }, t('loading'))
      return h('div', { style: S.box },
        list.map((p) => h('div', { key: p.id, style: S.card },
          h('div', { style: S.name }, p.name),
          h('div', { style: S.desc }, p.description || ''),
          h('button', {
            style: S.btn,
            onClick: () => act(p.id, p.applied ? 'remove' : 'apply'),
            disabled: busy === p.id,
          }, p.applied ? t('applied') + ' · ' + t('remove') : t('apply')),
        )),
        h('p', { style: S.hint }, t('hint')),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        try {
          ctx.effect(() => ctx.locale.register(NS, { zh, en }), '{{PLUGIN_ID}}: dicts')
          const bound = ctx.locale.bind(NS)
          setT(bound)
          ctx.slots.inject('settings.section', () => ctx.slots.register({
            name: 'settings.section',
            id: '{{PLUGIN_ID}}',
            order: 70,
            label: () => bound('nav'),
            locale: NS,
          }, Panel))
        } catch (e) {
          console.error('[{{PLUGIN_ID}}] apply failed:', e)
        }
      },
    }
  },
})
