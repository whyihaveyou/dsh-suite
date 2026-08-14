// Pure board domain — no Cordis/Context dependency, so the smoke test can
// exercise the CRUD + status-flow logic directly without a running harness.
// The plugin wraps this in a Cordis Service (service key), so the shared state
// is materialized as a coefficient (ctx.teamBoard), never a module-level global.

export type TaskStatus = 'todo' | 'doing' | 'done'

export interface Task {
  id: string
  subject: string
  status: TaskStatus
  owner?: string
  deps: string[]
  createdAt: number
  updatedAt: number
}

export interface CreateInput {
  subject: string
  owner?: string
  deps?: string[]
}

export interface UpdatePatch {
  subject?: string
  status?: TaskStatus
  owner?: string
  deps?: string[]
}

export interface ListFilter {
  status?: TaskStatus
  owner?: string
}

/** In-memory task board: create / claim / transition / query / delete. */
export class BoardStore {
  private tasks = new Map<string, Task>()
  private counter = 0

  constructor(seed?: readonly Task[]) {
    for (const task of seed ?? []) this.tasks.set(task.id, task)
  }

  create(input: CreateInput): Task {
    const now = Date.now()
    const task: Task = {
      id: this.mintId(),
      subject: input.subject,
      status: 'todo',
      ...(input.owner === undefined ? {} : { owner: input.owner }),
      deps: input.deps ?? [],
      createdAt: now,
      updatedAt: now,
    }
    this.tasks.set(task.id, task)
    return task
  }

  /** Claim a task: mark it `doing` and assign the owner. */
  claim(id: string, owner: string): Task {
    const task = this.require(id)
    return this.put({ ...task, status: 'doing', owner })
  }

  update(id: string, patch: UpdatePatch): Task {
    const task = this.require(id)
    return this.put({ ...task, ...patch })
  }

  list(filter?: ListFilter): Task[] {
    let out = [...this.tasks.values()]
    if (filter?.status) out = out.filter(t => t.status === filter.status)
    if (filter?.owner) out = out.filter(t => t.owner === filter.owner)
    return out.sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id))
  }

  get(id: string): Task | undefined {
    return this.tasks.get(id)
  }

  remove(id: string): boolean {
    return this.tasks.delete(id)
  }

  snapshot(): Task[] {
    return this.list()
  }

  private put(task: Task): Task {
    const next: Task = { ...task, updatedAt: Date.now() }
    this.tasks.set(next.id, next)
    return next
  }

  private require(id: string): Task {
    const task = this.tasks.get(id)
    if (!task) throw new Error(`task "${id}" not found`)
    return task
  }

  private mintId(): string {
    let id: string
    do {
      this.counter += 1
      id = `task-${Date.now().toString(36)}-${this.counter.toString(36)}`
    } while (this.tasks.has(id))
    return id
  }
}
