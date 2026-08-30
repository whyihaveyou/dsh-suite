import { Service, type Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { SessionId, type Session } from '@deepseek-ai/dsh-session'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { BoardStore, type Task, type TaskStatus } from './board.js'

// Service key: other plugins / tools reach the shared board as ctx.teamBoard.
declare module '@deepseek-ai/cordis' {
  interface Context {
    teamBoard: TeamBoardService
  }
}

// Durable snapshot event: the board persists as a log-only session event so the
// base bundle's session-persistence-jsonl backend stores it across reload.
declare module '@deepseek-ai/dsh-session/types' {
  interface SessionEventMap {
    'board/snapshot': { tasks: Task[] }
  }
}

const BOARD_SESSION_ID = 'team-board'
const STATUSES: readonly TaskStatus[] = ['todo', 'doing', 'done']

// File-backed durability: ctx.sessions is an in-memory store (persistence plugins
// only flush live sessions), so the journal session does NOT survive a process
// restart on its own. The snapshot file does. The board/snapshot journal stays as
// the in-band audit trail for live sessions.
function boardFile(): string {
  const home = process.env.DSH_HOME || join(homedir(), '.dsh')
  return join(home, 'team-board', 'board.json')
}

const taskOutputSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    subject: { type: 'string' },
    status: { type: 'string', enum: ['todo', 'doing', 'done'] },
    owner: { type: 'string' },
    deps: { type: 'array', items: { type: 'string' } },
    createdAt: { type: 'integer' },
    updatedAt: { type: 'integer' },
  },
  additionalProperties: false,
} as const

const taskListOutputSchema = {
  type: 'array',
  items: taskOutputSchema,
} as const

function renderTask(value: { id?: string; subject?: string; status?: string; owner?: string }) {
  return [{ type: 'text' as const, text: `任务 ${value.id} [${value.status}] ${value.owner ? `@${value.owner} ` : ''}${value.subject}` }]
}

// Local structural types for the webServer request/response (no heavy typing deps).
interface RequestLike {
  on(ev: 'data' | 'end', cb: (c?: Buffer) => void): void
}

interface ResponseLike {
  writeHead(status: number, headers?: Record<string, string>): void
  end(body?: string): void
}

// webServer is the web-shell HTTP server service (plugin-manager exposes its routes
// the same way); team-board's browser half reaches it for /team-board/* endpoints.
declare module '@deepseek-ai/cordis' {
  interface Context {
    webServer: {
      register(opts: { kind: 'exact'; path: string; handler: (req: unknown, res: ResponseLike) => void | Promise<void> }): () => void
    }
  }
}

export default class TeamBoardService extends Service {
  static inject = ['tools', 'sessions', 'webServer']

  private board = new BoardStore()
  private journal?: Session

  constructor(ctx: Context) {
    super(ctx, 'teamBoard')
    this.restore()
    this.registerTools()
    this.registerBoardRoutes()
    console.log(`[plugin-team-board] tools registered — task_create listed=${ctx.tools.get('task_create') !== undefined}`)
  }

  // Public board API for programmatic consumers (ctx.teamBoard.createTask(...)).
  createTask(subject: string, opts?: { owner?: string; deps?: string[] }): Task {
    const task = this.board.create({ subject, ...opts })
    this.persist()
    return task
  }

  claimTask(id: string, owner: string): Task {
    const task = this.board.claim(id, owner)
    this.persist()
    return task
  }

  updateTask(id: string, patch: { subject?: string; status?: TaskStatus; owner?: string; deps?: string[] }): Task {
    const task = this.board.update(id, patch)
    this.persist()
    return task
  }

  listTasks(filter?: { status?: TaskStatus; owner?: string }): Task[] {
    return this.board.list(filter)
  }

  // --- durable snapshot: file first (survives restart), journal as audit trail ---
  private restore(): void {
    const file = boardFile()
    if (existsSync(file)) {
      try {
        const tasks = JSON.parse(readFileSync(file, 'utf8'))
        if (Array.isArray(tasks)) this.board = new BoardStore(tasks)
      } catch { /* corrupt snapshot falls through to the journal path */ }
    }
    const existing = this.ctx.sessions.get(SessionId(BOARD_SESSION_ID))
    if (existing) {
      this.journal = existing
      if (this.board.list().length === 0) {
        for (let i = existing.events.length - 1; i >= 0; i--) {
          const event = existing.events[i]
          if (event.type === 'board/snapshot') {
            this.board = new BoardStore(event.data.tasks)
            break
          }
        }
      }
    } else {
      this.journal = this.ctx.sessions.create(SessionId(BOARD_SESSION_ID))
    }
  }

  private persist(): void {
    this.journal?.append('board/snapshot', { tasks: this.board.snapshot() })
    try {
      const file = boardFile()
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, JSON.stringify(this.board.snapshot(), null, 2))
    } catch { /* file durability is best-effort; the journal still covers live sessions */ }
  }

  // --- board HTTP routes for the browser half ---
  private registerBoardRoutes(): void {
    this.ctx.webServer.register({
      kind: 'exact',
      path: '/team-board/list',
      handler: (_req: unknown, res: ResponseLike) => {
        this.json(res, { ok: true, value: this.board.list() })
      },
    })
    this.ctx.webServer.register({
      kind: 'exact',
      path: '/team-board/update',
      handler: async (req: unknown, res: ResponseLike) => {
        const body = await this.readJsonBody(req as RequestLike)
        if (!body || typeof body.id !== 'string') {
          this.json(res, { ok: false, error: 'missing id' }, 400)
          return
        }
        const patch: Record<string, unknown> = {}
        const fields = ['subject', 'status', 'owner', 'deps'] as const
        for (const k of fields) {
          const v = (body as Record<string, unknown>)[k]
          if (v !== undefined) patch[k] = v
        }
        const task = this.board.update(body.id, patch)
        this.persist()
        this.json(res, { ok: true, value: task })
      },
    })
    this.ctx.webServer.register({
      kind: 'exact',
      path: '/team-board/create',
      handler: async (req: unknown, res: ResponseLike) => {
        const body = await this.readJsonBody(req as RequestLike)
        if (!body || typeof body.subject !== 'string') {
          this.json(res, { ok: false, error: 'missing subject' }, 400)
          return
        }
        const task = this.board.create({ subject: body.subject, owner: body.owner as string | undefined, deps: body.deps as string[] | undefined })
        this.persist()
        this.json(res, { ok: true, value: task })
      },
    })
  }

  private json(res: ResponseLike, value: unknown, status = 200): void {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(value))
  }

  private readJsonBody(req: RequestLike): Promise<Record<string, unknown> | null> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = []
      let total = 0
      ;(req as unknown as NodeJS.ReadableStream).on('data', (c: Buffer) => {
        chunks.push(c)
        total += c.length
        if (total > 1 << 16) resolve(null)
      })
      ;(req as unknown as NodeJS.ReadableStream).on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8')
        try { resolve(JSON.parse(text) as Record<string, unknown>) } catch { resolve(null) }
      })
    })
  }

  private registerTools(): void {
    const board = this.board
    const persist = () => this.persist()

    this.ctx.tools.register(defineTool({
      name: 'task_create',
      description: 'Create a task on the shared team board (visible to every agent in this process). Returns the created task with a generated id and status "todo".',
      parameters: {
        subject: { type: 'string', required: true, description: 'Short imperative task description.' },
        owner: { type: 'string', description: 'Optional owner (agent/session id).' },
        deps: { type: 'array', items: { type: 'string' }, description: 'Optional task ids this task depends on.' },
      },
      output: { schema: taskOutputSchema, render: (_args, value) => renderTask(value) },
      async execute(args) {
        const task = board.create({ subject: args.subject, owner: args.owner, deps: args.deps })
        persist()
        return task
      },
    }))

    this.ctx.tools.register(defineTool({
      name: 'task_claim',
      description: 'Claim a task: mark it "doing" and assign an owner (defaults to the calling agent). Use before starting work on it.',
      parameters: {
        id: { type: 'string', required: true, description: 'Task id to claim.' },
        owner: { type: 'string', description: 'Who claims it; defaults to the calling agent id.' },
      },
      output: { schema: taskOutputSchema, render: (_args, value) => renderTask(value) },
      async execute(args, exec) {
        const owner = args.owner ?? String(exec.agent?.id ?? 'unknown')
        const task = board.claim(args.id, owner)
        persist()
        return task
      },
    }))

    this.ctx.tools.register(defineTool({
      name: 'task_update',
      description: 'Update a task on the board: change subject, status (todo/doing/done), owner, or deps. Only provided fields change.',
      parameters: {
        id: { type: 'string', required: true, description: 'Task id to update.' },
        subject: { type: 'string', description: 'New subject.' },
        status: { type: 'string', enum: ['todo', 'doing', 'done'], description: 'New status.' },
        owner: { type: 'string', description: 'New owner.' },
        deps: { type: 'array', items: { type: 'string' }, description: 'New dependency task ids.' },
      },
      output: { schema: taskOutputSchema, render: (_args, value) => renderTask(value) },
      async execute(args) {
        const task = board.update(args.id, {
          subject: args.subject,
          status: args.status as TaskStatus | undefined,
          owner: args.owner,
          deps: args.deps,
        })
        persist()
        return task
      },
    }))

    this.ctx.tools.register(defineTool({
      name: 'task_list',
      description: 'List tasks on the shared team board, optionally filtered by status and/or owner. Ordered by creation time.',
      parameters: {
        status: { type: 'string', enum: ['todo', 'doing', 'done'], description: 'Only tasks in this status.' },
        owner: { type: 'string', description: 'Only tasks owned by this agent/session id.' },
      },
      output: {
        schema: taskListOutputSchema,
        render: (_args, value) => [{
          type: 'text' as const,
          text: value.length === 0 ? '（看板为空）' : value.map((t: { id?: string; subject?: string; status?: string; owner?: string }) => `- [${t.status}] ${t.id} ${t.owner ? `@${t.owner} ` : ''}${t.subject}`).join('\n'),
        }],
      },
      async execute(args) {
        return board.list({ status: args.status as TaskStatus | undefined, owner: args.owner })
      },
    }))

    this.ctx.tools.register(defineTool({
      name: 'task_delete',
      description: 'Delete a task from the board (e.g. after it is done and archived).',
      parameters: {
        id: { type: 'string', required: true, description: 'Task id to delete.' },
      },
      output: {
        schema: {
          type: 'object',
          properties: { id: { type: 'string' }, removed: { type: 'boolean' } },
          additionalProperties: false,
        },
        render: (_args, value) => [{ type: 'text' as const, text: value.removed ? `已删除任务 ${value.id}` : `未找到任务 ${value.id}` }],
      },
      async execute(args) {
        const removed = board.remove(args.id)
        if (removed) persist()
        return { id: args.id, removed }
      },
    }))
  }
}
