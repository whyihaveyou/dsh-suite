// Smoke test for the board's core logic (BoardStore) — no DSH runtime, no API key.
// Exercises create / claim / update / list-filter / delete / snapshot round-trip.
import { BoardStore } from '../dist/board.js'

const checks = []
function assert(cond, name) {
  checks.push([name, cond])
}

const board = new BoardStore()

const a = board.create({ subject: '查 Kuramoto 临界指数', owner: 'agent-1' })
const b = board.create({ subject: '写综述 §2', deps: [a.id] })
const c = board.create({ subject: '跑数值拟合', deps: [a.id] })
assert(a.status === 'todo', 'create -> status todo')
assert(new Set([a.id, b.id, c.id]).size === 3, 'create -> ids unique')
assert(b.deps[0] === a.id, 'create -> deps recorded')

const claimed = board.claim(b.id, 'agent-2')
assert(claimed.status === 'doing' && claimed.owner === 'agent-2', 'claim -> doing + owner')

const done = board.update(c.id, { status: 'done' })
assert(done.status === 'done', 'update -> status done')

assert(board.list({ status: 'doing' }).length === 1, 'list filter status=doing')
assert(board.list({ owner: 'agent-2' })[0]?.id === b.id, 'list filter owner=agent-2')
assert(board.list().length === 3, 'list all -> 3')

assert(board.get(a.id)?.subject === '查 Kuramoto 临界指数', 'get by id')
assert(board.get('nope') === undefined, 'get missing -> undefined')

assert(board.remove(a.id) === true, 'delete existing -> true')
assert(board.remove(a.id) === false, 'delete again -> false')
assert(board.list().length === 2, 'after delete -> 2')

const restored = new BoardStore(board.snapshot())
assert(restored.list().length === 2, 'snapshot round-trip preserves count')
assert(restored.get(b.id)?.status === 'doing', 'snapshot round-trip preserves state')

// Regression (issue #11): partial updates must never leave undefined keys in the
// snapshot; a poisoned historical record must be sanitized on restore.
const partialBoard = new BoardStore()
const pt = partialBoard.create({ subject: '部分字段更新', owner: 'a-1' })
partialBoard.update(pt.id, { status: 'done' })
const allTasks = partialBoard.snapshot()
assert(JSON.parse(JSON.stringify(allTasks)).every((t) => typeof t.subject === 'string' && t.owner !== undefined), 'partial update -> snapshot JSON-serializable, no undefined')
assert(JSON.stringify(partialBoard.get(pt.id)).includes('defined') === false, 'no undefined literal in task JSON')
const withPoison = {
  ...pt,
  status: undefined,
  subject: undefined,
  owner: undefined,
}
const seeded = new BoardStore([withPoison])
const healed = seeded.snapshot().find((t) => t.id === pt.id)
const healedJson = JSON.stringify(seeded.snapshot())
assert(healedJson.indexOf('undefined') === -1, 'poisoned record sanitized on restore')
assert(healedJson.indexOf(JSON.stringify(withPoison.id)) !== -1, 'sanitized snapshot keeps id')
assert(!('status' in healed) || healed.status !== undefined, 'undefined status removed from snapshot')

let fail = 0
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
  if (!ok) fail += 1
}
console.log(`==== ${checks.length - fail}/${checks.length} passed ====`)
process.exit(fail === 0 ? 0 : 1)
