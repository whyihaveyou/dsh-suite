import { Service, type Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { SessionId, type Session } from '@deepseek-ai/dsh-session'
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

export default class TeamBoardService extends Service {
  static inject = ['tools', 'sessions']

  private board = new BoardStore()
  private journal?: Session

  constructor(ctx: Context) {
    super(ctx, 'teamBoard')
    this.restore()
    this.registerTools()
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

  // --- durable snapshot via the sessions seam ---
  private restore(): void {
    const existing = this.ctx.sessions.get(SessionId(BOARD_SESSION_ID))
    if (existing) {
      this.journal = existing
      for (let i = existing.events.length - 1; i >= 0; i--) {
        const event = existing.events[i]
        if (event.type === 'board/snapshot') {
          this.board = new BoardStore(event.data.tasks)
          break
        }
      }
    } else {
      this.journal = this.ctx.sessions.create(SessionId(BOARD_SESSION_ID))
    }
  }

  private persist(): void {
    this.journal?.append('board/snapshot', { tasks: this.board.snapshot() })
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
