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
  id: '@dsh-suite/plugin-manager',
  factory: (require) => {
    const React = require('react')

    const h = React.createElement
    const { useState, useEffect, useMemo, useRef } = React

    const NS = 'pluginManager'
    const CATALOG_URL = 'https://whyihaveyou.github.io/dsh-suite/catalog.json'

    const zh = {
      tab: '商店', search: '搜索插件…', category: '分类', sort: '排序',
      all: '全部', byStars: '星标 ↓', byVerified: '最近验证', byCompat: '兼容优先',
      install: '安装', installing: '安装中…', copy: '复制命令', copied: '已复制',
      installed: '已装', confirmTitle: '确认安装', confirm: '确认', cancel: '取消',
      needRestart: '安装成功，请立即重启 DSH（重新运行 dsh web）使其生效', installFailed: '安装失败',
      timedOut: '安装超时，请到终端手动执行', retry: '重试',
      loading: '加载目录中…', empty: '没有匹配的插件', emptyCatalog: '目录为空',
      fetchError: '无法连接目录源', clear: '清除筛选',
      source: '数据源', plugins: '精选', installedCount: '已装',
      unknownLicense: '未知 license（请自行确认）', broken: '已知不兼容',
      manualCopyTitle: '复制命令', manualCopyHint: '请手动复制以下命令：', update: '有更新', installedNotMounted: '已安装为依赖但未挂载到 bundle（可能缺 dsh.bundle 或为 monorepo 根包），请检查包结构',
      upgrade: '升级', updating: '升级中…', updateDone: '已更新到新版本，请重启 DSH 生效', updateFailed: '更新失败', updateHint: '已装旧版，确认后将覆盖升级', confirmUpdate: '确认升级',
      restartHint: '升级完成后需重启 DSH 才会加载新版本',
      lang: 'zh',
      unknownBadgeTitle: '未做兼容验证 — 点开详情查看',
      onlyOk: '只看 🟢 兼容',
      dtMeta: '基本信息', dtDesc: '描述', dtCompat: '兼容性', dtRisk: '风险标注（证据而非背书）',
      riskNone: '✓ 静态扫描未发现风险（安装脚本 / 网络外发 / shell / 许可证）',
      riskNoScan: '尚未静态扫描',
      riskInstallScript: '安装脚本', riskNetworkEgress: '网络外发', riskShellAccess: 'shell 调用', riskNoLicense: '无 LICENSE',
      ghLink: 'GitHub ↗', dtClose: '关闭', dtOpen: '点开看详情',
      guideAfterInstall: '→ 重启 DSH 生效；装的是场景/预设？重启后去 Settings → Agent presets 应用即可',
      failGuide: '可手动处理：复制命令到终端运行',
      feedback: '反馈', feedbackStore: '商店问题反馈', feedbackTitle: '对该插件提意见（打开 GitHub issue）',
      shownXofN: '已显示 {x} / 共 {n} 条 · 下拉继续加载', totalN: '共 {n} 条（已显示全部）',
      featTitle: '⭐ 精选推荐', featSub: '策展人挑选 · 按星标排序',
      viewStore: '商店', viewInstalled: '已装管理',
      srcOfficial: '官方内建', srcNpm: '第三方 npm', srcGit: 'git 源', srcSelf: '自研', srcOther: '其他',
      remove: '移除', uninstallTitle: '确认卸载', uninstallHint: '需重启后完全卸载', uninstalling: '卸载中…', uninstallDone: '已卸载，请重启生效', uninstallFailed: '卸载失败',
      searchInstalled: '搜索已装插件…', enabled: '已启用', disabled: '已禁用',
    }
    const en = {
      tab: 'Store', search: 'Search plugins…', category: 'Category', sort: 'Sort',
      all: 'All', byStars: 'Stars ↓', byVerified: 'Recently verified', byCompat: 'Compat first',
      install: 'Install', installing: 'Installing…', copy: 'Copy cmd', copied: 'Copied',
      installed: 'Installed', confirmTitle: 'Confirm install', confirm: 'Confirm', cancel: 'Cancel',
      needRestart: 'Installed — restart DSH now (re-run dsh web) to take effect', installFailed: 'Install failed',
      timedOut: 'Install timed out — run manually', retry: 'Retry',
      loading: 'Loading catalog…', empty: 'No matching plugins', emptyCatalog: 'Catalog is empty',
      fetchError: 'Cannot reach catalog source', clear: 'Clear filters',
      source: 'Source', plugins: 'curated', installedCount: 'installed',
      unknownLicense: 'unknown license (verify yourself)', broken: 'known incompatible',
      manualCopyTitle: 'Copy command', manualCopyHint: 'Copy the command below manually:', update: 'update', installedNotMounted: 'Installed as a dependency but NOT mounted (may lack dsh.bundle or be a monorepo root) — check the package',
      upgrade: 'Upgrade', updating: 'Updating…', updateDone: 'Updated to the new version — restart DSH', updateFailed: 'Update failed', updateHint: 'older version installed; confirming will overwrite-upgrade', confirmUpdate: 'Confirm upgrade',
      restartHint: 'Restart DSH after the upgrade to load the new version',
      lang: 'en',
      unknownBadgeTitle: 'Not compat-verified — open details',
      onlyOk: '🟢 ok only',
      dtMeta: 'Info', dtDesc: 'Description', dtCompat: 'Compatibility', dtRisk: 'Risk flags (evidence, not endorsement)',
      riskNone: '✓ static scan clean (install script / network egress / shell / license)',
      riskNoScan: 'not scanned yet',
      riskInstallScript: 'install script', riskNetworkEgress: 'network egress', riskShellAccess: 'shell access', riskNoLicense: 'no LICENSE',
      ghLink: 'GitHub ↗', dtClose: 'Close', dtOpen: 'open for details',
      guideAfterInstall: '→ restart DSH to activate; installing a preset/scenario pack? Apply it under Settings → Agent presets after restart.',
      failGuide: 'manual fallback: copy the command and run it in your terminal',
      feedback: 'Feedback', feedbackStore: 'Store feedback', feedbackTitle: 'Give feedback on this plugin (opens GitHub issue)',
      shownXofN: 'Showing {x} / {n} — scroll for more', totalN: '{n} total (all shown)',
      featTitle: '⭐ Featured', featSub: 'curator picks · sorted by stars',
      viewStore: 'Store', viewInstalled: 'Installed',
      srcOfficial: 'official', srcNpm: '3rd-party npm', srcGit: 'git source', srcSelf: 'self', srcOther: 'other',
      remove: 'Remove', uninstallTitle: 'Confirm uninstall', uninstallHint: 'A restart is needed for full uninstall', uninstalling: 'Removing…', uninstallDone: 'Uninstalled — restart to take effect', uninstallFailed: 'Uninstall failed',
      searchInstalled: 'Search installed plugins…', enabled: 'enabled', disabled: 'disabled',
    }

    const BADGE = {
      ok: ['🟢 ok', '#3fb950'], broken: ['🔴 broken', '#f85149'],
      unknown: ['⚪ unknown', '#8b949e'], unmaintained: ['⚫ unmaintained', '#8b949e'],
    }

    // v0.6 F-C: 中文别名搜索 —— 中文查询词映射英文关键词，与英文字段一起 AND 匹配
  const ZH_ALIAS = {
    皮肤: 'theme skin', 主题: 'theme', 换肤: 'theme skin', 美观: 'beautiful theme ui',
    视觉: 'vision image ui', 看图: 'image vision picture', 图片: 'image picture',
    通知: 'notify notification', 提醒: 'notify reminder',
    任务板: 'board kanban task', 看板: 'board kanban',
    导出: 'export', 导入: 'import', 备份: 'backup export',
    搜索: 'search', 搜索增强: 'search', 翻译: 'translate', 写作: 'writing write',
    润色: 'polish writing', 预设: 'preset', 场景: 'preset scenario',
    游戏: 'game', 调试: 'debug', 测试: 'test', 文档: 'doc documentation',
    图表: 'chart graph', 日报: 'daily report', 周报: 'weekly report', 日志: 'log',
    工作流: 'workflow', 实验: 'lab experiment', 安全: 'security',
    皮肤中心: 'theme', 商店: 'store manager', 更新: 'update upgrade',
    插件: 'plugin', 小红书: 'xiaohongshu', 日历: 'calendar', 护眼: 'dark theme',
  }
  // v0.6 F-J: 反馈入口 —— 第一方 → dsh-suite 集中收编；第三方 → 插件作者仓库
  const FEEDBACK_CENTER = 'https://github.com/whyihaveyou/dsh-suite/issues/new'
  function feedbackUrl(p) {
    const own = (p && p.repo) || ''
    const firstParty = own.startsWith('whyihaveyou/') || (own.includes('dsh-suite') && !own.includes('/plugins/'))
    if (firstParty) {
      const nm = (p && (p.name || '')) || ''
      return FEEDBACK_CENTER + '?title=' + encodeURIComponent('用户反馈：' + nm)
        + '&body=' + encodeURIComponent('请描述你遇到的问题或建议：\n- 插件/组件：' + nm + '\n- 环境（DSH 版本 / OS）：\n- 现象：\n- 期望：\n- 日志或截图（如果有）：\n')
    }
    if (own) return 'https://github.com/' + own + '/issues/new'
    return FEEDBACK_CENTER + '?title=' + encodeURIComponent('用户反馈：' + ((p && p.name) || '（未署名插件）'))
  }
  function searchAliases(qRaw) {
    const extras = []
    for (const k of Object.keys(ZH_ALIAS)) if (qRaw.includes(k)) extras.push(ZH_ALIAS[k])
    return extras.join(' ')
  }
  const CATEGORIES = ['all', 'tools', 'ui', 'session', 'llm', 'orchestration', 'utility', 'workflow', 'integration', 'skill', 'dev-tool', 'other']

    // ---------- small UI helpers (dark theme, inline styles) ----------
    const C = {
      card: { background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '150px' },
      featWrap: { display: 'flex', gap: '12px', overflowX: 'auto', padding: '2px 2px 8px', marginBottom: '4px' },
      featCard: { flex: '0 0 264px', background: '#161b22', border: '1px solid #1f6feb', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' },
      featImgBox: { width: '100%', height: '118px', background: '#0d1117' },
      featBody: { padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' },
      featDesc: { fontSize: '12px', color: '#8b949e', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' },
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
      drawerOverlay: { position: 'fixed', inset: '0', background: 'rgba(1,4,9,0.55)', zIndex: 99998, display: 'flex', justifyContent: 'flex-end' },
      drawer: { width: '440px', maxWidth: '92vw', height: '100%', overflowY: 'auto', background: '#0d1117', borderLeft: '1px solid #30363d', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#e6edf3' },
      drawerTitle: { fontWeight: '700', fontSize: '16px', wordBreak: 'break-all', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
      drawerMeta: { display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#8b949e' },
      drawerDesc: { fontSize: '13px', color: '#c9d1d9', lineHeight: '1.6', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' },
      drawerSec: { fontSize: '11px', fontWeight: '700', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '.4px', marginTop: '4px' },
      riskChip: { display: 'inline-block', fontSize: '11.5px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(210,153,34,0.15)', color: '#d29922', border: '1px solid rgba(210,153,34,0.4)', marginRight: '6px', marginBottom: '4px' },
      cleanChip: { fontSize: '12px', color: '#3fb950' },
      drawerFoot: { position: 'sticky', bottom: '-18px', background: '#0d1117', paddingTop: '10px', paddingBottom: '12px', borderTop: '1px solid #21262d', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginTop: 'auto' },
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

    // Lazy GitHub opengraph thumbnail: IntersectionObserver gates the load so
    // 780+ cards never fetch images off-screen; onerror hides the img; click
    // toggles collapsed 68px <-> expanded 220px.
    function LazyImage(props) {
      const ref = useRef(null)
      const [show, setShow] = useState(false)
      const [expanded, setExpanded] = useState(false)
      const [failed, setFailed] = useState(false)
      useEffect(() => {
        const el = ref.current
        if (!el) return
        if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { setShow(true); io.disconnect() }
          }, { rootMargin: '240px' })
          io.observe(el)
          return () => io.disconnect()
        }
        setShow(true)
      }, [])
      if (failed) return null
      return h('div', {
        ref,
        onClick: () => setExpanded((e) => !e),
        title: expanded ? 'collapse' : 'expand',
        style: { width: '100%', height: expanded ? 220 : 68, overflow: 'hidden', borderRadius: '6px', background: '#0d1117', cursor: 'zoom-in', border: '1px solid #21262d' },
      },
        show
          ? h('img', {
              src: props.src, alt: props.alt || '',
              loading: 'lazy',
              onError: () => setFailed(true),
              style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
            })
          : h('div', { style: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#30363d', fontSize: '11px' } }, '…'),
      )
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
      const [onlyOk, setOnlyOk] = useState(false) // v0.6 F-B
      const [detail, setDetail] = useState(null) // v0.6 F-A: 详情抽屉
      const [installed, setInstalled] = useState([])
      const [installing, setInstalling] = useState(null)
      const [results, setResults] = useState({})
      const [confirmPkg, setConfirmPkg] = useState(null)
      const [copied, setCopied] = useState(null)
      const [manualCopy, setManualCopy] = useState(null)
      const [updates, setUpdates] = useState([])
      const [view, setView] = useState('store')
      const [installedList, setInstalledList] = useState([])
      const [instLoading, setInstLoading] = useState(false)
      const [instSearch, setInstSearch] = useState('')
      const [uninstalling, setUninstalling] = useState(null)
      const [uninstallConfirm, setUninstallConfirm] = useState(null)
      const [uninstallResult, setUninstallResult] = useState(null)
      const [updating, setUpdating] = useState(null)
      const [updateConfirm, setUpdateConfirm] = useState(null)
      const [updateResult, setUpdateResult] = useState(null)

      useEffect(() => {
        let alive = true
        ;(async () => {
          try {
            const [cat, list] = await Promise.all([
              fetchCatalogPlugins(),
              fetchJson('/plugin-manager/list').then((r) => (r.ok ? r.value : [])).catch(() => []),
            ])
            if (alive) { setCatalog(cat); setInstalled(list); setLoading(false) }
          } catch (e) {
            if (alive) { setError(e.message); setLoading(false) }
          }
        })()
        return () => { alive = false }
      }, [])
      // v0.5: 更新检查不阻塞首屏 —— npm registry 单次请求 7-9s，Store/Installed
      // 列表先渲染，/plugin-manager/updates 独立异步回填「有更新」角标与升级按钮。
      useEffect(() => { loadUpdates() }, [])

      function loadUpdates() {
        fetchJson('/plugin-manager/updates')
          .then((r) => (r.ok ? r.value : []))
          .then((v) => setUpdates(v))
          .catch(() => {})
      }

      const names = useMemo(() => installedNames(installed), [installed])
      // v0.6 F-B: 分类从目录实际数据归一生成（硬编码 12 类会把大量条目归进 other）
      const cats = useMemo(() => ['all'].concat(Array.from(new Set(catalog.map((pl) => pl.category).filter(Boolean))).sort()), [catalog])

      const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        let list = catalog.filter((p) => {
          if (category !== 'all' && p.category !== category) return false
          if (onlyOk && p.compatStatus !== 'ok') return false
          if (!q) return true
          const hay = [p.name, p.desc_en, p.desc_zh, p.author, p.repo, ...(p.tags || [])].join(' ').toLowerCase()
          const alias = searchAliases(q)
          const tokens = alias ? q.split(/\s+/).concat(alias.toLowerCase().split(/\s+/)) : [q]
          return tokens.every((w) => w && hay.includes(w))
        })
        if (sort === 'stars') list = list.slice().sort((a, b) => (b.stars || 0) - (a.stars || 0))
        else if (sort === 'verified') list = list.slice().sort((a, b) => String(b.compat?.lastVerified || b.lastVerified || '').localeCompare(String(a.compat?.lastVerified || a.lastVerified || '')))
        else if (sort === 'compat') { const rank = { ok: 0, unknown: 1, broken: 2, unmaintained: 3 }; list = list.slice().sort((a, b) => (rank[a.compatStatus] ?? 1) - (rank[b.compatStatus] ?? 1)) }
        return list
      }, [catalog, search, category, sort, onlyOk])
      // v0.7 F-F: featured 策展区 —— catalog featured 条目按星标取 top6，商店顶部横排大卡
      const featuredList = useMemo(() => catalog
        .filter((p) => p.featured)
        .slice()
        .sort((a, b) => (b.stars || 0) - (a.stars || 0))
        .slice(0, 6), [catalog])
      const showFeatured = featuredList.length > 0 && !search.trim() && category === 'all' && !onlyOk
      // v0.7 F-G: 增量渲染 —— 首屏 60 条，哨兵进视口再追加，过滤变化时重置
      const [visible, setVisible] = useState(60)
      useEffect(() => { setVisible(60) }, [search, category, sort, onlyOk])
      const sentinelRef = useRef(null)
      useEffect(() => {
        const el = sentinelRef.current
        if (!el) return undefined
        const io = new IntersectionObserver((es) => { if (es[0] && es[0].isIntersecting) setVisible((v) => v + 60) })
        io.observe(el)
        return () => io.disconnect()
      }, [visible, filtered.length])

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

      function copyCmd(p) {
        const cmd = p.installCmd
        const done = () => {
          setCopied(p.name)
          setTimeout(() => setCopied((c) => (c === p.name ? null : c)), 1500)
        }
        // 1. modern Clipboard API (secure context + permission)
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(cmd).then(done).catch(() => legacyCopy(cmd, done))
          return
        }
        legacyCopy(cmd, done)
      }
      function legacyCopy(cmd, done) {
        // 2. legacy execCommand('copy') fallback (works on insecure http origins)
        try {
          const ta = document.createElement('textarea')
          ta.value = cmd
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          ta.style.left = '-9999px'
          document.body.appendChild(ta)
          ta.focus()
          ta.select()
          const ok = document.execCommand('copy')
          document.body.removeChild(ta)
          if (ok) { done(); return }
        } catch { /* fall through */ }
        // 3. last resort: show the command in a popup for manual copy
        setManualCopy(cmd)
      }
      async function fetchCatalogPlugins() {
        // host trimmed route first (fast, gzip); fall back to the full GH Pages copy
        try {
          const r = await fetch('/plugin-manager/catalog')
          if (r.ok) {
            const c = await r.json()
            if (c && Array.isArray(c.plugins) && c.plugins.length) return c.plugins
          }
        } catch { /* fall through */ }
        const c = await fetch(CATALOG_URL).then((r) => r.json())
        return c.plugins || []
      }
      function loadInstalled() {
        setInstLoading(true)
        fetchJson('/plugin-manager/installed')
          .then((r) => (r.ok ? r.value : []))
          .then((v) => { setInstalledList(v); setInstLoading(false) })
          .catch(() => setInstLoading(false))
      }
      // v0.5: 更新检测索引 —— npm 源已装包 → { installed, latest, hasUpdate }
      const updatesByName = useMemo(() => {
        const m = {}
        for (const u of updates) m[u.name] = u
        return m
      }, [updates])
      const updN = (name) => updatesByName[name] || null
      async function doUpdate(name) {
        if (!name) return
        setUpdating(name)
        setUpdateResult(null)
        try {
          const r = await fetch('/plugin-manager/update', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name }) })
          const data = await r.json()
          setUpdateResult({ name, ...data })
          loadUpdates()
          loadInstalled()
        } catch (e) {
          setUpdateResult({ name, ok: false, log: String(e) })
        } finally {
          setUpdating(null)
        }
      }
      async function doUninstall(p) {
        setUninstalling(p.name)
        setUninstallResult(null)
        try {
          const r = await fetch('/plugin-manager/uninstall', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pkg: p.name }) })
          const data = await r.json()
          setUninstallResult({ name: p.name, ...data })
          loadInstalled()
        } catch (e) {
          setUninstallResult({ name: p.name, ok: false, log: String(e) })
        } finally {
          setUninstalling(null)
        }
      }
      function srcLabel(src) {
        return ({ official: t('srcOfficial'), npm: t('srcNpm'), git: t('srcGit'), self: t('srcSelf'), other: t('srcOther') })[src] || src
      }

      // ---- render ----
      const toolbar = h('div', { style: C.toolbar },
        h('input', { style: C.input, placeholder: t('search'), value: search, onChange: (e) => setSearch(e.target.value) }),
        h('select', { style: C.select, value: category, onChange: (e) => setCategory(e.target.value) },
          cats.map((c) => h('option', { key: c, value: c }, c === 'all' ? t('category') + ': ' + t('all') : c))),
        h('button', {
          style: onlyOk ? { ...C.btnGhost, color: '#3fb950', borderColor: '#238636' } : C.btnGhost,
          onClick: () => setOnlyOk(!onlyOk),
        }, t('onlyOk')),
        h('select', { style: C.select, value: sort, onChange: (e) => setSort(e.target.value) },
          h('option', { value: 'stars' }, t('byStars')),
          h('option', { value: 'verified' }, t('byVerified')),
          h('option', { value: 'compat' }, t('byCompat'))),
      )

      const status = h('div', { style: C.status },
        t('source') + ': catalog.json · ' + catalog.length + ' ' + t('plugins') + ' · ' + t('installedCount') + ': ' + installed.length, ' · ',
        h('a', { href: feedbackUrl({ repo: 'whyihaveyou/dsh-suite', name: 'plugin-manager / 商店' }), target: '_blank', rel: 'noreferrer', style: { color: '#8b949e' } }, '💬 ' + t('feedbackStore')))

      const viewBtn = (active) => ({ background: active ? '#30363d' : 'transparent', color: active ? '#e6edf3' : '#8b949e', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', cursor: 'pointer' })
      const viewToggle = h('div', { style: { display: 'flex', gap: '8px', marginBottom: '12px' } },
        h('button', { style: viewBtn(view === 'store'), onClick: () => setView('store') }, '🛍 ' + t('viewStore')),
        h('button', { style: viewBtn(view === 'installed'), onClick: () => { setView('installed'); loadInstalled(); loadUpdates() } }, '📦 ' + t('viewInstalled')))

      // ---- installed management view ----
      const instFiltered = installedList.filter((e) => !instSearch || (e.name || '').toLowerCase().includes(instSearch.toLowerCase()))
      const GROUPS = ['official', 'npm', 'git', 'self', 'other']
      const installedView = h('div', null,
        h('input', { style: { ...C.input, marginBottom: '12px', width: '100%' }, placeholder: t('searchInstalled'), value: instSearch, onChange: (e) => setInstSearch(e.target.value) }),
        uninstallResult ? h('div', { style: uninstallResult.ok ? { color: '#3fb950', fontSize: '12px', fontWeight: '600', marginBottom: '10px' } : { color: '#f85149', fontSize: '11px', marginBottom: '10px', whiteSpace: 'pre-wrap' } }, uninstallResult.ok ? '✅ ' + t('uninstallDone') : '❌ ' + t('uninstallFailed') + ': ' + (uninstallResult.log || '')) : null,
        updateResult ? h('div', { style: updateResult.ok ? { color: '#3fb950', fontSize: '12px', fontWeight: '600', marginBottom: '10px' } : { color: '#f85149', fontSize: '11px', marginBottom: '10px', whiteSpace: 'pre-wrap' } }, updateResult.ok ? '✅ ' + t('updateDone') : '❌ ' + t('updateFailed') + ': ' + (updateResult.log || updateResult.error || '')) : null,
        instLoading && installedList.length === 0 ? h('div', { style: C.desc }, t('loading')) : null,
        GROUPS.map((g) => {
          const items = instFiltered.filter((e) => e.source === g)
          if (items.length === 0) return null
          return h('div', { key: g, style: { marginBottom: '16px' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' } },
              h('span', { style: { fontSize: '13px', fontWeight: '600', color: '#e6edf3' } }, srcLabel(g)),
              h('span', { style: { fontSize: '11px', color: '#8b949e', background: '#21262d', padding: '1px 8px', borderRadius: '10px' } }, items.length)),
            items.map((e) => h('div', { key: e.id || e.name, style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', marginBottom: '6px' } },
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { style: { fontSize: '13px', color: '#e6edf3', wordBreak: 'break-all' } }, e.name),
                h('div', { style: { ...C.meta, gap: '10px' } },
                  e.version ? h('span', null, 'v' + e.version) : null,
                  h('span', null, srcLabel(e.source)),
                  (updN(e.name) && updN(e.name).hasUpdate) ? h('span', { style: { color: '#d29922', fontWeight: '600' } }, '⬆ ' + t('update') + ' → v' + updN(e.name).latest) : null,
                  h('span', { style: { color: e.enabled ? '#3fb950' : '#8b949e' } }, e.enabled ? t('enabled') : t('disabled')))),
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 } },
                updating === e.name
                  ? h('span', { style: { fontSize: '11px', color: '#8b949e' } }, t('updating'))
                  : (updN(e.name) && updN(e.name).hasUpdate)
                    ? h('button', { style: { color: '#d29922', border: '1px solid #d29922', borderRadius: '6px', background: 'transparent', padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }, onClick: () => setUpdateConfirm(e) }, '⬆ ' + t('upgrade'))
                    : null,
                uninstalling === e.name
                  ? h('span', { style: { fontSize: '11px', color: '#8b949e' } }, t('uninstalling'))
                  : h('button', { style: { color: '#f85149', border: '1px solid #f85149', borderRadius: '6px', background: 'transparent', padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }, onClick: () => setUninstallConfirm(e) }, t('remove')))),
            ))
        }),
        installedList.length > 0 && instFiltered.length === 0 ? h('div', { style: C.desc }, '🔍 ' + t('empty') + ' "' + instSearch + '"') : null,
      )

      let uninstallModal = null
      if (uninstallConfirm) {
        const e = uninstallConfirm
        uninstallModal = h('div', { style: C.modalBack, onClick: () => setUninstallConfirm(null) },
          h('div', { style: C.modal, onClick: (ev) => ev.stopPropagation() },
            h('div', { style: { fontSize: '15px', fontWeight: '600', color: '#e6edf3', marginBottom: '10px' } }, t('uninstallTitle')),
            h('div', { style: { fontSize: '13px', color: '#e6edf3', wordBreak: 'break-all', marginBottom: '6px' } }, e.name),
            h('div', { style: C.meta, marginBottom: '6px' },
              h('span', null, srcLabel(e.source)),
              e.version ? h('span', null, 'v' + e.version) : null),
            h('div', { style: { ...C.warn, marginBottom: '14px' } }, '⚠ ' + t('uninstallHint')),
            h('div', { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' } },
              h('button', { style: C.btnGhost, onClick: () => setUninstallConfirm(null) }, t('cancel')),
              h('button', { style: { ...C.btn, background: '#da3633' }, onClick: () => { setUninstallConfirm(null); doUninstall(e) } }, t('confirm')))),
        )
      }

      let updateModal = null
      if (updateConfirm) {
        const e = updateConfirm
        const upR = updN(e.name)
        updateModal = h('div', { style: C.modalBack, onClick: () => setUpdateConfirm(null) },
          h('div', { style: C.modal, onClick: (ev) => ev.stopPropagation() },
            h('div', { style: { fontSize: '15px', fontWeight: '600', color: '#e6edf3', marginBottom: '10px' } }, t('confirmUpdate')),
            h('div', { style: { fontSize: '13px', color: '#e6edf3', wordBreak: 'break-all', marginBottom: '6px' } }, e.name),
            h('div', { style: C.meta, marginBottom: '6px' },
              h('span', null, srcLabel(e.source)),
              e.version ? h('span', null, 'v' + e.version) : null),
            upR ? h('div', { style: { color: '#3fb950', fontSize: '12px', marginBottom: '6px' } }, t('updateHint') + ' (v' + (upR.installed || e.version || '?') + ' → v' + upR.latest + ')') : null,
            h('div', { style: { ...C.desc, fontSize: '12px', marginBottom: '14px' } }, t('restartHint')),
            h('div', { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' } },
              h('button', { style: C.btnGhost, onClick: () => setUpdateConfirm(null) }, t('cancel')),
              h('button', { style: C.btn, onClick: () => { setUpdateConfirm(null); doUpdate(e.name) } }, t('confirm')))),
        )
      }

      if (view === 'installed') return h('div', null, viewToggle, installedView, uninstallModal, updateModal)

      if (loading) return h('div', null, toolbar, status, h('div', { style: C.desc }, t('loading')))
      if (error) return h('div', null, toolbar, status,
        h('div', { style: C.warn }, '⚠ ' + t('fetchError') + ' (' + error + ')'),
        h('button', { style: C.btn, onClick: () => { setError(null); setLoading(true); setTimeout(() => location.reload(), 10) } }, t('retry')))
      if (catalog.length === 0) return h('div', null, toolbar, status, h('div', { style: C.desc }, t('emptyCatalog')))

      const cards = filtered.slice(0, visible).map((p) => { // v0.7 F-G: 只渲染前 visible 条
        const installedHere = isInstalled(p, names)
        const spec = pkgSpec(p.installCmd)
        const upM = spec ? updN(spec) : null
        const hasUpdate = !!upM
        const bad = BADGE[p.compatStatus] || BADGE.unknown
        const res = results[p.name]
        const busy = installing === p.name
        const isBroken = p.compatStatus === 'broken'
        const installBtn = installedHere
          ? (hasUpdate
              ? h('button', { key: 'i', style: { ...C.btnGhost, color: '#d29922', borderColor: '#d29922' }, onClick: (e) => { e.stopPropagation(); setConfirmPkg(p) } }, '⬆ ' + t('upgrade'))
              : h('button', { key: 'i', style: C.btnDisabled }, '✅ ' + t('installed')))
          : busy
            ? h('button', { style: C.btnDisabled, key: 'i' }, t('installing'))
            : h('button', { key: 'i', style: isBroken ? { ...C.btn, background: '#9e6a03' } : C.btn, onClick: (e) => { e.stopPropagation(); setConfirmPkg(p) } }, t('install'))

        return h('div', { key: p.id || p.name, style: C.card, onClick: () => setDetail(p), title: t('dtOpen') },
          p.repo ? h(LazyImage, { src: 'https://opengraph.githubassets.com/1/' + p.repo, alt: p.repo }) : null,
          h('div', { style: C.name },
            h('span', null, p.name),
            p.compatStatus === 'unknown'
              ? h('span', { title: t('unknownBadgeTitle'), style: { width: '7px', height: '7px', borderRadius: '50%', background: '#484f58', display: 'inline-block', marginLeft: '2px', flexShrink: '0' } })
              : h('span', { style: C.badge(bad[1]) }, bad[0]),
            installedHere ? h('span', { style: { fontSize: '11px', color: '#3fb950' } }, '✅') : null,
            hasUpdate ? h('span', { style: { fontSize: '11px', color: '#d29922', background: 'rgba(210,153,34,0.15)', padding: '1px 6px', borderRadius: '4px' } }, '⬆ ' + t('update') + (upM && upM.latest ? ' → v' + upM.latest : '')) : null),
          // v0.6 F-D: desc 单语化 —— UI locale 取主语言、回退另一语言，卡片不再双行堆叠
          h('div', { style: C.desc }, (t('lang') === 'zh' ? (p.desc_zh || p.desc_en) : (p.desc_en || p.desc_zh)) || ''),
          h('div', { style: C.meta },
            h('span', null, p.author || '?'),
            h('span', null, (p.stars || 0) + '★'),
            p.license ? h('span', null, p.license) : null),
          isBroken ? h('div', { style: C.warn }, '⚠ ' + t('broken')) : null,
          res && res.ok === false ? h('div', { style: { color: '#f85149', fontSize: '11px', whiteSpace: 'pre-wrap', maxHeight: '90px', overflow: 'auto' } }, '❌ ' + t('installFailed') + ':' + '\n' + (res.log || '')) : null,
          res && res.ok === false ? h('div', { style: { color: '#8b949e', fontSize: '11px', marginTop: '4px', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, t('failGuide'), h('button', { style: C.btnGhost, onClick: (e) => { e.stopPropagation(); copyText(pkgSpec(p.installCmd), () => {}) } }, '📋 ' + t('copy'))) : null,
          res && res.ok === true && res.mounted === false ? h('div', { style: { color: '#d29922', fontSize: '11px', padding: '6px', border: '1px solid #9e6a03', borderRadius: '6px' } }, '⚠ ' + t('installedNotMounted') + ': ' + (res.installed || []).join(', ')) : null,
          res && res.ok === true && res.mounted === true ? h('div', { style: { color: '#3fb950', fontSize: '12px', fontWeight: '700', padding: '8px', background: 'rgba(63,185,80,0.12)', border: '1px solid #238636', borderRadius: '6px' } }, '✅ ' + t('needRestart')) : null,
          res && res.ok === true && res.mounted === true ? h('div', { style: { color: '#8b949e', fontSize: '11px', marginTop: '4px', lineHeight: '1.5' } }, t('guideAfterInstall')) : null,
          h('div', { style: { display: 'flex', gap: '8px', marginTop: 'auto' } },
            installBtn,
            h('button', { style: copied === p.name ? { ...C.btnGhost, color: '#3fb950', borderColor: '#238636' } : C.btnGhost, onClick: (e) => { e.stopPropagation(); copyCmd(p) } }, copied === p.name ? '✓ ' + t('copied') : '📋')),
          h('a', { href: feedbackUrl(p), target: '_blank', rel: 'noreferrer', title: t('feedbackTitle'), onClick: (e) => e.stopPropagation(), style: { ...C.btnGhost, padding: '1px 6px', fontSize: '11px', textDecoration: 'none' } }, '💬'),
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
            (spec && updN(spec)) ? h('div', { style: { color: '#3fb950', fontSize: '12px', marginBottom: '6px' } }, t('updateHint') + ' (v' + ((updN(spec).installed) || '?') + ' → v' + updN(spec).latest + ')') : null,
            h('div', { style: { ...C.desc, marginBottom: '14px', wordBreak: 'break-all' } }, spec),
            h('div', { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' } },
              h('button', { style: C.btnGhost, onClick: () => setConfirmPkg(null) }, t('cancel')),
              h('button', { style: C.btn, onClick: () => { setConfirmPkg(null); doInstall(p) } }, t('confirm'))),
          ))
      }

      let manualModal = null
      if (manualCopy) {
        manualModal = h('div', { style: C.modalBack, onClick: () => setManualCopy(null) },
          h('div', { style: C.modal, onClick: (e) => e.stopPropagation() },
            h('div', { style: { fontSize: '15px', fontWeight: '600', color: '#e6edf3', marginBottom: '10px' } }, t('manualCopyTitle')),
            h('div', { style: C.desc, marginBottom: '8px' }, t('manualCopyHint')),
            h('div', { style: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', padding: '10px', fontSize: '12px', color: '#c9d1d9', wordBreak: 'break-all', marginBottom: '14px' } }, manualCopy),
            h('div', { style: { display: 'flex', justifyContent: 'flex-end' } },
              h('button', { style: C.btnGhost, onClick: () => setManualCopy(null) }, t('cancel'))),
          ))
      }

      // v0.6 F-A: 详情抽屉 —— og 大图 / 完整描述 / 兼容+evidence / 风险标注 / 吸底操作条
      let drawerEl = null
      if (detail) {
        const d = detail
        const dSpec = pkgSpec(d.installCmd)
        const dUpM = dSpec ? updN(dSpec) : null
        const dInstalled = isInstalled(d, names)
        const dBad = BADGE[d.compatStatus] || BADGE.unknown
        const dHits = d.risk && typeof d.risk === 'object'
          ? [['installScript', t('riskInstallScript')], ['networkEgress', t('riskNetworkEgress')], ['shellAccess', t('riskShellAccess')], ['noLicense', t('riskNoLicense')]].filter(([k]) => d.risk[k] === true)
          : []
        drawerEl = h('div', { style: C.drawerOverlay, onClick: () => setDetail(null) },
          h('div', { style: C.drawer, onClick: (e) => e.stopPropagation() },
            d.repo ? h(LazyImage, { src: 'https://opengraph.githubassets.com/1/' + d.repo, alt: d.repo }) : null,
            h('div', { style: C.drawerTitle },
              h('span', null, d.name),
              d.compatStatus === 'unknown'
                ? h('span', { title: t('unknownBadgeTitle'), style: { width: '9px', height: '9px', borderRadius: '50%', background: '#484f58', display: 'inline-block' } })
                : h('span', { style: C.badge(dBad[1]) }, dBad[0]),
              dInstalled ? h('span', { style: { fontSize: '11px', color: '#3fb950' } }, '✅ ' + t('installed')) : null,
              dUpM ? h('span', { style: { fontSize: '11px', color: '#d29922', background: 'rgba(210,153,34,0.15)', padding: '1px 6px', borderRadius: '4px' } }, '⬆ ' + t('update') + ' → v' + dUpM.latest) : null),
            h('div', null,
              h('div', { style: C.drawerSec }, t('dtMeta')),
              h('div', { style: C.drawerMeta },
                h('span', null, '👤 ' + (d.author || '?')),
                h('span', null, '★ ' + (d.stars || 0)),
                d.license ? h('span', null, '⚖ ' + d.license) : h('span', { style: C.warn }, t('unknownLicense')),
                d.language ? h('span', null, d.language) : null,
                d.category ? h('span', null, '🏷 ' + d.category) : null)),
            h('div', null,
              h('div', { style: C.drawerSec }, t('dtDesc')),
              d.desc_zh ? h('div', { style: C.drawerDesc }, d.desc_zh) : null,
              d.desc_en ? h('div', { style: { ...C.drawerDesc, marginTop: d.desc_zh ? '6px' : '0' } }, d.desc_en) : null,
              d.detail ? h('div', { style: { ...C.drawerDesc, marginTop: '6px' } }, d.detail) : null,
              (!d.desc_zh && !d.desc_en && !d.detail) ? h('div', { style: C.drawerDesc }, '—') : null),
            h('div', null,
              h('div', { style: C.drawerSec }, t('dtCompat')),
              h('div', { style: C.drawerMeta },
                d.compatStatus === 'unknown'
                  ? h('span', { style: { color: '#8b949e' } }, t('unknownBadgeTitle'))
                  : h('span', { style: C.badge(dBad[1]) }, dBad[0]),
                d.compat && d.compat.lastVerified ? h('span', null, '🕒 ' + d.compat.lastVerified) : null)),
            h('div', null,
              h('div', { style: C.drawerSec }, t('dtRisk')),
              !d.risk
                ? h('div', { style: C.cleanChip }, t('riskNoScan'))
                : dHits.length === 0
                  ? h('div', { style: C.cleanChip }, t('riskNone'))
                  : h('div', null, dHits.map(([k, label]) => h('span', { key: k, style: C.riskChip }, '⚠ ' + label)))),
            h('div', { style: C.drawerFoot },
              dInstalled && !dUpM
                ? h('button', { style: C.btnDisabled }, '✅ ' + t('installed'))
                : h('button', { style: C.btn, onClick: () => setConfirmPkg(d) }, dUpM ? '⬆ ' + t('upgrade') : t('install')),
              h('button', { style: C.btnGhost, onClick: () => copyText('dsh plugin add ' + dSpec, () => {}) }, '📋 ' + t('copy')),
              d.repo ? h('a', { href: 'https://github.com/' + d.repo, target: '_blank', rel: 'noreferrer', style: { ...C.btnGhost, textDecoration: 'none', display: 'inline-block' } }, t('ghLink')) : null,
              h('a', { href: feedbackUrl(d), target: '_blank', rel: 'noreferrer', style: { ...C.btnGhost, textDecoration: 'none', display: 'inline-block' } }, '💬 ' + t('feedback')),
              h('button', { style: { ...C.btnGhost, marginLeft: 'auto' }, onClick: () => setDetail(null) }, t('dtClose')))))
      }

      // v0.7 F-F: featured 横排大卡 —— og 图 + 一句话 + 安装按钮，点卡开详情抽屉
      let featuredEl = null
      if (showFeatured) {
        featuredEl = h('div', { style: { marginBottom: '14px' } },
          h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '10px', margin: '2px 0 8px' } },
            h('span', { style: { fontSize: '14px', fontWeight: '700', color: '#e6edf3' } }, t('featTitle')),
            h('span', { style: { fontSize: '11px', color: '#6e7681' } }, t('featSub'))),
          h('div', { style: C.featWrap }, featuredList.map((p) => {
            const fInstalled = isInstalled(p, names)
            const fBusy = installing === p.name
            const fDesc = (t('lang') === 'zh' ? (p.desc_zh || p.desc_en) : (p.desc_en || p.desc_zh)) || ''
            return h('div', { key: 'feat-' + (p.id || p.name), style: C.featCard, onClick: () => setDetail(p), title: t('dtOpen') },
              p.repo ? h('div', { style: C.featImgBox }, h('img', { src: 'https://opengraph.githubassets.com/1/' + p.repo, alt: p.repo, loading: 'lazy', style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } })) : null,
              h('div', { style: C.featBody },
                h('div', { style: { fontSize: '13px', fontWeight: '600', color: '#e6edf3', wordBreak: 'break-all' } }, p.name),
                h('div', { style: C.featDesc }, fDesc),
                h('div', { style: { fontSize: '11px', color: '#8b949e', display: 'flex', gap: '8px' } },
                  h('span', null, (p.stars || 0) + '★'),
                  h('span', null, p.author || '?')),
                h('div', { style: { display: 'flex', gap: '8px', marginTop: 'auto' } },
                  fInstalled
                    ? h('button', { style: C.btnDisabled }, '✅ ' + t('installed'))
                    : fBusy
                      ? h('button', { style: C.btnDisabled }, t('installing'))
                      : h('button', { style: C.btn, onClick: (e) => { e.stopPropagation(); setConfirmPkg(p) } }, t('install')))))
          })))
      }

      return h('div', null, viewToggle, toolbar, status, featuredEl, h('div', { style: C.grid }, cards),
      // v0.7 F-G: 增量渲染哨兵 + 结果计数
      filtered.length > 0
        ? h('div', {
            style: { textAlign: 'center', padding: '12px', color: '#8b949e', fontSize: '12px' },
            ref: (el) => { sentinelRef.current = el },
          }, filtered.length > visible
              ? t('shownXofN').replace('{x}', Math.min(visible, filtered.length)).replace('{n}', filtered.length)
              : t('totalN').replace('{n}', filtered.length))
        : null,
      empty, modal, manualModal, drawerEl)
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
