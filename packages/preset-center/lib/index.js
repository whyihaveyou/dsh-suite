// preset-center host half — serves the preset pack catalog and applies/removes
// presets into the DSH user preset root (<dshHome>/.agent-presets/<id>/).
// The official agent-presets plugin discovers that root live (re-reads on every
// call), so an applied preset shows up in Settings > Agent presets immediately.
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { homedir } from 'node:os'
import { gzipSync } from 'node:zlib'

export const name = 'preset-center'
export const inject = ['webServer']

const HERE = dirname(fileURLToPath(import.meta.url))
const PRESETS_DIR = join(HERE, '..', 'presets')

function dshHome() {
  return process.env.DSH_HOME || join(homedir(), '.dsh')
}
function userRoot() {
  return join(dshHome(), '.agent-presets')
}

/** Read one preset's display metadata + a persona excerpt from its composition. */
function readPreset(id) {
  const dir = join(PRESETS_DIR, id)
  const meta = readFileSync(join(dir, 'preset.yml'), 'utf8')
  const name = /^name:\s*(.+)$/m.exec(meta)?.[1]?.trim() || id
  const description = /^description:\s*(.+)$/m.exec(meta)?.[1]?.trim() || ''
  const order = Number(/^order:\s*(\d+)$/m.exec(meta)?.[1] ?? 0)
  const comp = readFileSync(join(dir, 'agent.cordis.yml'), 'utf8')
  const persona = /config:\n(\s+)text: >-\n([\s\S]*?)(?=\n\s*- id:)/.exec(comp)
  const personaExcerpt = persona ? persona[2].trim().split('\n').slice(0, 6).join(' ').slice(0, 300) : ''
  const fetchOn = /tool-web[\s\S]*?fetch: true/.test(comp)
  return { id, name, description, order, personaExcerpt, fetchOn }
}

function listPresets() {
  return readdirSync(PRESETS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map(readPreset)
    .map((p) => ({ ...p, applied: existsSync(join(userRoot(), p.id, 'agent.cordis.yml')) }))
}

function applyPreset(id) {
  const src = join(PRESETS_DIR, id)
  if (!existsSync(join(src, 'agent.cordis.yml'))) return { ok: false, error: 'unknown preset: ' + id }
  const dst = join(userRoot(), id)
  mkdirSync(dst, { recursive: true })
  for (const f of ['agent.cordis.yml', 'preset.yml']) {
    writeFileSync(join(dst, f), readFileSync(join(src, f)))
  }
  return { ok: true, id, files: [join(dst, 'agent.cordis.yml'), join(dst, 'preset.yml')] }
}

function removePreset(id) {
  const dst = join(userRoot(), id)
  if (existsSync(dst)) rmSync(dst, { recursive: true, force: true })
  return { ok: true, id }
}

export function apply(ctx) {
  ctx.effect(() => {
    const text = (code, body, gz, mime) => (req, res) => {
      const ae = String(req.headers['accept-encoding'] || '')
      const useGz = gz && /\bgzip\b/.test(ae)
      res.writeHead(code, { 'content-type': mime, ...(useGz ? { 'content-encoding': 'gzip' } : {}), 'content-length': useGz ? gz.length : body.length })
      res.end(useGz ? gz : body)
    }
    const json = (body) => {
      const buf = Buffer.from(JSON.stringify(body), 'utf8')
      return text(200, buf, gzipSync(buf), 'application/json; charset=utf-8')
    }

    const d1 = ctx.webServer.register({ kind: 'exact', path: '/preset-center/list', handler: (req, res) => json(listPresets())(req, res) })
    const d2 = ctx.webServer.register({ kind: 'exact', path: '/preset-center/apply', handler: (req, res) => {
      let raw = ''
      req.on('data', (c) => { raw += c })
      req.on('end', () => {
        let id = ''
        try { id = String(JSON.parse(raw || '{}').id || '') } catch { /* ignore */ }
        const r = id ? applyPreset(id) : { ok: false, error: 'missing id' }
        json(r)(req, res)
      })
    } })
    const d3 = ctx.webServer.register({ kind: 'exact', path: '/preset-center/remove', handler: (req, res) => {
      let raw = ''
      req.on('data', (c) => { raw += c })
      req.on('end', () => {
        let id = ''
        try { id = String(JSON.parse(raw || '{}').id || '') } catch { /* ignore */ }
        json(id ? removePreset(id) : { ok: false, error: 'missing id' })(req, res)
      })
    } })
    return () => { d1(); d2(); d3() }
  }, 'preset-center: routes')
}
