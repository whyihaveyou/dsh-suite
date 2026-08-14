// plugin-manager browser half — the "Store" tab in Settings > Plugins.
// Registered into the official `settings.plugins.tab` list slot (same seam the
// read-only inventory tab uses). Catalog is fetched browser-side from GitHub
// Pages (CORS *); install + installed-list go through the host half's
// /plugin-manager/* HTTP routes (a browser cannot spawn `dsh plugin add`).
//
// Design principles honoured: apply() is wrapped so a throw can never take
// down the web shell boot; registrations return disposers via slots.inject +
// slots.register; host side effects are reported, never silently swallowed.

window.__ModuleLoader__.load({
  id: 'plugin-manager',
  factory: (require) => {
    const React = require('react')

    const h = React.createElement
    const { useState, useEffect, useMemo } = React

    const NS = 'pluginManager'
    const CATALOG_URL = 'https://whyihaveyou.github.io/dsh-suite/catalog.json'

    const zh = {
      tab: '商店', search: '搜索插件…', category: '分类', sort: '排序',
      all: '全部', byStars: '星标 ↓', byVerified: '最近验证', byCompat: '兼容优先',
      install: '安装', installing: '安装中…', copy: '复制命令', copied: '已复制',
      installed: '已装', confirmTitle: '确认安装', confirm: '确认', cancel: '取消',
      needRestart: '安装成功，需重启 harness 生效', installFailed: '安装失败',
      timedOut: '安装超时，请到终端手动执行', retry: '重试',
      loading: '加载目录中…', empty: '没有匹配的插件', emptyCatalog: '目录为空',
      fetchError: '无法连接目录源', clear: '清除筛选',
      source: '数据源', plugins: '精选', installedCount: '已装',
      unknownLicense: '未知 license（请自行确认）', broken: '已知不兼容',
    }
    const en = {
      tab: 'Store', search: 'Search plugins…', category: 'Category', sort: 'Sort',
      all: 'All', byStars: 'Stars ↓', byVerified: 'Recently verified', byCompat: 'Compat first',
      install: 'Install', installing: 'Installing…', copy: 'Copy cmd', copied: 'Copied',
      installed: 'Installed', confirmTitle: 'Confirm install', confirm: 'Confirm', cancel: 'Cancel',
      needRestart: 'Installed — restart harness to take effect', installFailed: 'Install failed',
      timedOut: 'Install timed out — run manually', retry: 'Retry',
      loading: 'Loading catalog…', empty: 'No matching plugins', emptyCatalog: 'Catalog is empty',
      fetchError: 'Cannot reach catalog source', clear: 'Clear filters',
      source: 'Source', plugins: 'curated', installedCount: 'installed',
      unknownLicense: 'unknown license (verify yourself)', broken: 'known incompatible',
    }

    const BADGE = {
      ok: ['🟢 ok', '#3fb950'], broken: ['🔴 broken', '#f85149'],
      unknown: ['⚪ unknown', '#8b949e'], unmaintained: ['⚫ unmaintained', '#8b949e'],
    }

    const CATEGORIES = ['all', 'tools', 'ui', 'session', 'llm', 'orchestration', 'utility', 'workflow', 'integration', 'skill', 'dev-tool', 'other']

    // ---------- small UI helpers (dark theme, inline styles) ----------
    const C = {
      card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '150px' },
      name: { fontSize: '15px', fontWeight: '600', color: '#e6edf3', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
      desc: { fontSize: '12px', color: '#8b949e', lineHeight: '1.4' },
      descZh: { fontSize: '12px', color: '#6e7681', lineHeight: '1.4' },
      meta: { fontSize: '11px', color: '#8b949e', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
      btn: { background: '#238636', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' },
      btnGhost: { background: 'transparent', color: '#c9d1d9', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer' },
      btnDisabled: { background: '#21262d', color: '#6e7681', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'not-allowed' },
      badge: (color) => ({ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color, border: '1px solid ' + color, borderRadius: '10px', padding: '1px 8px' }),
      toolbar: { display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' },
      input: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', color: '#c9d1d9', padding: '7px 12px', fontSize: '13px', flex: '1', minWidth: '200px' },
      select: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', color: '#c9d1d9', padding: '7px 10px', fontSize: '13px' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' },
      status: { fontSize: '11px', color: '#6e7681', marginBottom: '12px' },
      modalBack: { position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 },
      modal: { background: '#161b22', border: '1px solid #30363d', borderRadius: '10px', padding: '20px', width: '420px', maxWidth: '90vw' },
      warn: { color: '#d29922', fontSize: '12px' },
    }

    async function fetchJson(url) {
      const r = await fetch(url)
      if (!r.ok) throw new Error(r.status + ' ' + r.statusText)
      return r.json()
    }

    function installedNames(list) {
      const s = new Set()
      for (const e of list || []) { s.add(e.name) }
      return s
    }

    function isInstalled(plugin, names) {
      if (names.has(plugin.name)) return true
      for (const n of names) {
        if (n && (n.includes(plugin.name) || plugin.name.includes(n))) return true
      }
      return false
    }

    function pkgSpec(installCmd) {
      return String(installCmd || '').replace(/^dsh\s+plugin\s+add\s+/, '').trim()
    }

    // ---------- Store tab component ----------
    function StoreTab(props) {
      const t = props.t
      const [catalog, setCatalog] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [search, setSearch] = useState('')
      const [category, setCategory] = useState('all')
      const [sort, setSort] = useState('stars')
      const [installed, setInstalled] = useState([])
      const [installing, setInstalling] = useState(null)
      const [results, setResults] = useState({})
      const [confirmPkg, setConfirmPkg] = useState(null)

      useEffect(() => {
        let alive = true
        ;(async () => {
          try {
            const [cat, list] = await Promise.all([
              fetchJson(CATALOG_URL).then((c) => c.plugins || []),
              fetchJson('/plugin-manager/list').then((r) => (r.ok ? r.value : [])).catch(() => []),
            ])
            if (alive) { setCatalog(cat); setInstalled(list); setLoading(false) }
          } catch (e) {
            if (alive) { setError(e.message); setLoading(false) }
          }
        })()
        return () => { alive = false }
      }, [])

      const names = useMemo(() => installedNames(installed), [installed])

      const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        let list = catalog.filter((p) => {
          if (category !== 'all' && p.category !== category) return false
          if (!q) return true
          const hay = [p.name, p.desc_en, p.desc_zh, p.author, p.repo, ...(p.tags || [])].join(' ').toLowerCase()
          return hay.includes(q)
        })
        if (sort === 'stars') list = list.slice().sort((a, b) => (b.stars || 0) - (a.stars || 0))
        else if (sort === 'verified') list = list.slice().sort((a, b) => String(b.compat?.lastVerified || b.lastVerified || '').localeCompare(String(a.compat?.lastVerified || a.lastVerified || '')))
        else if (sort === 'compat') { const rank = { ok: 0, unknown: 1, broken: 2, unmaintained: 3 }; list = list.slice().sort((a, b) => (rank[a.compatStatus] ?? 1) - (rank[b.compatStatus] ?? 1)) }
        return list
      }, [catalog, search, category, sort])

      async function doInstall(p) {
        const spec = pkgSpec(p.installCmd)
        if (!spec) return
        setInstalling(p.name)
        setResults((r) => ({ ...r, [p.name]: null }))
        try {
          const res = await fetch('/plugin-manager/install', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ pkg: spec }),
          })
          const data = await res.json()
          setResults((r) => ({ ...r, [p.name]: data }))
          if (data.ok) {
            const list = await fetchJson('/plugin-manager/list').then((r) => (r.ok ? r.value : [])).catch(() => [])
            setInstalled(list)
          }
        } catch (e) {
          setResults((r) => ({ ...r, [p.name]: { ok: false, log: String(e) } }))
        } finally {
          setInstalling(null)
        }
      }

      function copyCmd(cmd) {
        if (navigator.clipboard) navigator.clipboard.writeText(cmd).catch(() => {})
      }

      // ---- render ----
      const toolbar = h('div', { style: C.toolbar },
        h('input', { style: C.input, placeholder: t('search'), value: search, onChange: (e) => setSearch(e.target.value) }),
        h('select', { style: C.select, value: category, onChange: (e) => setCategory(e.target.value) },
          CATEGORIES.map((c) => h('option', { key: c, value: c }, c === 'all' ? t('category') + ': ' + t('all') : c))),
        h('select', { style: C.select, value: sort, onChange: (e) => setSort(e.target.value) },
          h('option', { value: 'stars' }, t('byStars')),
          h('option', { value: 'verified' }, t('byVerified')),
          h('option', { value: 'compat' }, t('byCompat'))),
      )

      const status = h('div', { style: C.status },
        t('source') + ': catalog.json · ' + catalog.length + ' ' + t('plugins') + ' · ' + t('installedCount') + ': ' + installed.length)

      if (loading) return h('div', null, toolbar, status, h('div', { style: C.desc }, t('loading')))
      if (error) return h('div', null, toolbar, status,
        h('div', { style: C.warn }, '⚠ ' + t('fetchError') + ' (' + error + ')'),
        h('button', { style: C.btn, onClick: () => { setError(null); setLoading(true); setTimeout(() => location.reload(), 10) } }, t('retry')))
      if (catalog.length === 0) return h('div', null, toolbar, status, h('div', { style: C.desc }, t('emptyCatalog')))

      const cards = filtered.map((p) => {
        const installedHere = isInstalled(p, names)
        const bad = BADGE[p.compatStatus] || BADGE.unknown
        const res = results[p.name]
        const busy = installing === p.name
        const isBroken = p.compatStatus === 'broken'
        const installBtn = installedHere
          ? h('button', { style: C.btnDisabled, key: 'i' }, '✅ ' + t('installed'))
          : busy
            ? h('button', { style: C.btnDisabled, key: 'i' }, t('installing'))
            : h('button', { key: 'i', style: isBroken ? { ...C.btn, background: '#9e6a03' } : C.btn, onClick: () => setConfirmPkg(p) }, t('install'))

        return h('div', { key: p.id || p.name, style: C.card },
          h('div', { style: C.name },
            h('span', null, p.name),
            h('span', { style: C.badge(bad[1]) }, bad[0]),
            installedHere ? h('span', { style: { fontSize: '11px', color: '#3fb950' } }, '✅') : null),
          p.desc_en ? h('div', { style: C.desc }, p.desc_en) : null,
          p.desc_zh ? h('div', { style: C.descZh }, p.desc_zh) : null,
          h('div', { style: C.meta },
            h('span', null, p.author || '?'),
            h('span', null, (p.stars || 0) + '★'),
            p.license ? h('span', null, p.license) : null),
          isBroken ? h('div', { style: C.warn }, '⚠ ' + t('broken')) : null,
          res && !res.ok ? h('div', { style: { color: '#f85149', fontSize: '11px', whiteSpace: 'pre-wrap', maxHeight: '80px', overflow: 'auto' } }, res.log) : null,
          res && res.ok ? h('div', { style: { color: '#3fb950', fontSize: '11px' } }, t('needRestart')) : null,
          h('div', { style: { display: 'flex', gap: '8px', marginTop: 'auto' } },
            installBtn,
            h('button', { style: C.btnGhost, onClick: () => copyCmd(p.installCmd) }, '📋')),
        )
      })

      const empty = filtered.length === 0
        ? h('div', { style: C.desc }, '🔍 ' + t('empty') + ' ' + (search ? '"' + search + '"' : '') + ' ',
            h('button', { style: C.btnGhost, onClick: () => { setSearch(''); setCategory('all') } }, t('clear')))
        : null

      // confirm dialog
      let modal = null
      if (confirmPkg) {
        const p = confirmPkg
        const spec = pkgSpec(p.installCmd)
        modal = h('div', { style: C.modalBack, onClick: () => setConfirmPkg(null) },
          h('div', { style: C.modal, onClick: (e) => e.stopPropagation() },
            h('div', { style: { fontSize: '15px', fontWeight: '600', color: '#e6edf3', marginBottom: '10px' } }, t('confirmTitle')),
            h('div', { style: C.desc, marginBottom: '6px' }, p.name),
            p.repo ? h('div', { style: C.meta, marginBottom: '6px' }, h('span', null, 'repo: ' + p.repo)) : null,
            h('div', { style: C.meta, marginBottom: '6px' },
              h('span', null, (p.stars || 0) + '★'),
              p.license ? h('span', null, p.license) : h('span', { style: C.warn }, t('unknownLicense'))),
            h('div', { style: { ...C.desc, marginBottom: '14px', wordBreak: 'break-all' } }, spec),
            h('div', { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' } },
              h('button', { style: C.btnGhost, onClick: () => setConfirmPkg(null) }, t('cancel')),
              h('button', { style: C.btn, onClick: () => { setConfirmPkg(null); doInstall(p) } }, t('confirm'))),
          ))
      }

      return h('div', null, toolbar, status, h('div', { style: C.grid }, cards), empty, modal)
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        try {
          ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'plugin-manager: dicts')
          const t = ctx.locale.bind(NS)
          ctx.slots.inject('settings.plugins.tab', () =>
            ctx.slots.register({
              name: 'settings.plugins.tab',
              id: 'store',
              order: 100,
              label: () => t('tab'),
              locale: NS,
            }, StoreTab),
          )
        } catch (e) {
          console.error('[plugin-manager] apply failed:', e)
        }
      },
    }
  },
})
