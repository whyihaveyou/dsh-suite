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

    // ── Styling contract / 样式契约 ─────────────────────────────────────
    // All colors via --dsw-alias-* tokens (official DSH Web styling contract);
    // literals only as fallbacks. The apply CTA is a filled primary button →
    // use the contract's four-piece set verbatim (fill + label-primary-foreground;
    // hover/dimmed need real CSS :hover, see primary-action-tokens-v1).
    // 颜色一律走 --dsw-alias-* 令牌；填充主按钮必须用契约四件套，禁止自带 accent 色。
    const S = {
      box: { display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--dsw-alias-label-primary, #c9d1d9)' },
      card: { border: '1px solid var(--dsw-alias-border-l1, #30363d)', borderRadius: '8px', padding: '12px 14px', background: 'var(--dsw-alias-bg-layer-1, #0d1117)' },
      name: { fontSize: '14px', fontWeight: '700', color: 'var(--dsw-alias-label-primary, #e6edf3)' },
      desc: { fontSize: '12.5px', color: 'var(--dsw-alias-label-secondary, #8b949e)', margin: '4px 0 8px' },
      btn: { background: 'var(--dsw-alias-button-primary-fill, #1f6feb)', border: '1px solid var(--dsw-alias-button-primary-fill, #1f6feb)', borderRadius: '6px', color: 'var(--dsw-alias-label-primary-foreground, #ffffff)', padding: '5px 12px', fontSize: '12.5px', cursor: 'pointer' },
      hint: { fontSize: '12px', color: 'var(--dsw-alias-label-secondary, #8b949e)' },
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
      // L2 semantic attributes: root carries data-dsh-plugin (在 dsh-web 枚举注册你的
      // 插件 id —— https://github.com/zhu1090093659/dsh-web/issues —— 否则皮肤匹配不到)
      // + data-dsh-surface; parts mark skinnable nodes.
      return h('div', { style: S.box, 'data-dsh-plugin': '{{PLUGIN_ID}}', 'data-dsh-surface': 'settings-modal' },
        list.map((p) => h('div', { key: p.id, style: S.card, 'data-dsh-part': 'card' },
          h('div', { style: S.name }, p.name),
          h('div', { style: S.desc }, p.description || ''),
          h('button', {
            style: S.btn,
            'data-dsh-part': 'button-primary',
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
