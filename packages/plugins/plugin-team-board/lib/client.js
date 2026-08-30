// team-board browser half — kanban settings panel injected into settings.section.
// Dual-half pattern: host half (TeamBoardService) exposes /team-board/list|update|create;
// this half renders a 3-column kanban UI. Fully bilingual via ctx.locale.
window.__ModuleLoader__.load({
  id: '@dsh-suite/plugin-team-board',
  factory: (require) => {
    const React = require('react')
    const h = React.createElement
    const NS = 'teamBoard'

    const zh = {
      title: '团队看板', todo: '待办', doing: '进行中', done: '已完成',
      hint: '点击卡片循环状态（待办 → 进行中 → 已完成），立即持久化',
      empty: '（暂无任务，用 task_create 工具建任务后这里自动出现）',
      create: '＋ 创建任务', subjectPlaceholder: '任务主题…', cancel: '取消',
      actionDo: '进行中', actionDone: '已完成', actionBack: '退回待办',
    }
    const en = {
      title: 'Team Board', todo: 'To do', doing: 'In progress', done: 'Done',
      hint: 'Click a card to cycle status (todo → doing → done); changes persist immediately',
      empty: '(no tasks — create with task_create; the board appears here)',
      create: '+ Create', subjectPlaceholder: 'Task subject…', cancel: 'Cancel',
      actionDo: 'In progress', actionDone: 'Done', actionBack: 'Back to To do',
    }

    // Style contract: all colors via --dsw-alias-* tokens (fallback literal = dark default,
    // in case the host theme predates the alias table). No hardcoded accents, no per-theme
    // selectors — skins and the host light/dark theme restyle through the tokens.
    const C = {
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '12px' },
      col: { background: 'var(--dsw-alias-bg-layer-2, #161b22)', border: '1px solid var(--dsw-alias-border-l1, #30363d)', borderRadius: '8px', padding: '14px 12px', minHeight: '220px' },
      colHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontWeight: '600', fontSize: '13px', color: 'var(--dsw-alias-label-primary, #e6edf3)' },
      count: { background: 'var(--dsw-alias-bg-layer-1, #21262d)', color: 'var(--dsw-alias-label-secondary, #8b949e)', fontSize: '12px', padding: '1px 8px', borderRadius: '10px' },
      card: { background: 'var(--dsw-alias-bg-layer-1, #0d1117)', border: '1px solid var(--dsw-alias-border-l1, #30363d)', borderRadius: '8px', padding: '10px', marginBottom: '12px', cursor: 'pointer' },
      chip: { display: 'inline-block', padding: '1px 8px', borderRadius: '10px', fontSize: '11px', border: '1px solid var(--dsw-alias-state-success-primary, #3fb950)', color: 'var(--dsw-alias-state-success-primary, #3fb950)', background: 'transparent' },
      // Card action = the panel's primary action: the contract's four-piece set, verbatim.
      btn: { width: '100%', padding: '4px', background: 'var(--dsw-alias-button-primary-fill, rgba(59,130,246,0.15))', border: '1px solid var(--dsw-alias-button-primary-fill, #93b6f7)', color: 'var(--dsw-alias-label-primary-foreground, #93b6f7)', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' },
      btnGhost: { background: 'transparent', border: '1px solid var(--dsw-alias-border-l1, #30363d)', color: 'var(--dsw-alias-label-secondary, #8b949e)', borderRadius: '10px', padding: '1px 8px', fontSize: '11px', cursor: 'pointer', display: 'inline-block' },
      input: { width: '100%', boxSizing: 'border-box', background: 'var(--dsw-alias-bg-layer-1, #0d1117)', color: 'var(--dsw-alias-label-primary, #dbe2ea)', border: '1px solid var(--dsw-alias-border-l1, #30363d)', borderRadius: '8px', padding: '8px', fontSize: '13px', margin: '10px 0 16px' },
      title: { color: 'var(--dsw-alias-label-primary, #93b6f7)', marginTop: 0 },
      muted: { fontSize: '12px', color: 'var(--dsw-alias-label-secondary, #8b949e)' },
    }

    async function fetchJson(url, opts) {
      const r = await fetch(url, opts)
      if (!r.ok) throw new Error(r.status + ' ' + r.statusText)
      return r.json()
    }

    function Board(props) {
      const t = props.t
      const [tasks, setTasks] = React.useState(undefined)
      const [busy, setBusy] = React.useState(undefined)
      const [subject, setSubject] = React.useState('')
      const [creating, setCreating] = React.useState(false)

      React.useEffect(() => {
        fetchJson('/team-board/list')
          .then(r => r.ok ? setTasks(r.value || []) : setTasks([]))
          .catch(() => setTasks([]))
      }, [])

      const grouped = React.useMemo(() => {
        const g = { todo: [], doing: [], done: [] }
        for (const it of tasks || []) g[it.status || 'todo'].push(it)
        return g
      }, [tasks])

      async function refresh() {
        const r = await fetchJson('/team-board/list')
        setTasks(r.ok ? (r.value || []) : [])
      }

      async function move(it, status) {
        await fetchJson('/team-board/update', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: it.id, status }) })
        await refresh()
        setBusy(undefined)
      }

      function actionFor(it) {
        const status = it.status || 'todo'
        return status === 'todo' ? { label: t('actionDo'), to: 'doing' } : status === 'doing' ? { label: t('actionDone'), to: 'done' } : { label: t('actionBack'), to: 'todo' }
      }

      async function create() {
        const subj = subject.trim()
        if (!subj) return
        setBusy('creating')
        try {
          await fetchJson('/team-board/create', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ subject: subj }) })
          setSubject('')
          await new Promise(r => setTimeout(r, 160))
          await refresh()
          setCreating(false)
        } finally { setBusy(undefined) }
      }

      const colsList = ['todo', 'doing', 'done'].map(status => {
        const list = grouped[status]
        return h('div', { key: status, style: C.col, 'data-dsh-part': 'panel' },
          h('div', { style: C.colHead },
            h('div', null, t(status)),
            h('div', { style: C.count, 'data-dsh-part': 'badge' }, list.length)),
          list.map((it) => h('div', { key: it.id, style: C.card, 'data-dsh-part': 'card' },
            h('div', { style: { marginBottom: '10px' } }, h('span', { style: C.chip, 'data-dsh-part': 'chip' }, t(it.status || 'todo'))),
            h('div', { style: { ...C.muted, marginBottom: '8px', wordBreak: 'break-word' } }, it.subject),
            h('button', { style: { ...C.btn, opacity: busy === it.id ? 0.5 : 1 }, 'data-dsh-part': 'button-primary', disabled: busy === it.id, onClick: () => move(it, actionFor(it).to) }, actionFor(it).label),
          )),
        )
      })

      const empty = tasks && tasks.length === 0 ? h('div', { style: { ...C.card, ...C.muted, fontSize: '13px' }, 'data-dsh-part': 'empty-state' }, t('empty')) : null

      const creator = creating ? h('div', { style: { width: '280px' }, 'data-dsh-part': 'section' },
        h('div', { style: { fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--dsw-alias-label-primary, #e6edf3)' } }, t('create')),
        h('input', { style: C.input, 'data-dsh-part': 'input', placeholder: t('subjectPlaceholder'), value: subject, onChange: (e) => setSubject(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') create() } }),
        h('div', { style: { display: 'flex', gap: '8px' } },
          h('button', { style: C.btn, 'data-dsh-part': 'button-primary', onClick: create }, t('create')),
          h('button', { style: { ...C.muted, background: 'transparent', border: 'none', cursor: 'pointer' }, 'data-dsh-part': 'button-ghost', onClick: () => setCreating(false) }, t('cancel')),
        )) : h('button', { style: C.btnGhost, 'data-dsh-part': 'button-ghost', onClick: () => setCreating(true) }, t('create'))

      // L2 semantic attributes on the root: the panel lives in the Settings modal.
      return h('div', { 'data-dsh-plugin': 'plugin-team-board', 'data-dsh-surface': 'settings-modal' },
        h('div', { style: { marginBottom: '10px' } }, h('h3', { style: C.title }, t('title'))),
        creator,
        empty,
        h('div', { style: C.grid }, ...colsList),
      )
    }

    // Tab component: the shell binds `t` from the registration's `locale: NS`
    // (same contract as plugin-manager). Guard against a missing binding.
    function StoreBoard(props) {
      const t = typeof props.t === 'function' ? props.t : (k) => (zh[k] || k)
      return h(Board, { ...props, t })
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        try {
          ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'team-board: dicts')
          const t = ctx.locale.bind(NS)
          ctx.slots.inject('settings.plugins.tab', () =>
            ctx.slots.register({
              name: 'settings.plugins.tab',
              id: 'team-board',
              order: 100,
              label: () => t('title'),
              locale: NS,
            }, StoreBoard),
          )
        } catch (e) {
          console.warn('[plugin-team-board] apply failed:', e)
        }
      },
    }
  },
})
