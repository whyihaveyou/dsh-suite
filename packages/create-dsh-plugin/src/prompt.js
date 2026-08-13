// Interactive wizard (bilingual prompts) for create-dsh-plugin. Zero deps.
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { c, paint } from './util.js'
import { TEMPLATES, TEMPLATE_META } from './templates.js'

// Derive a valid npm package name from a directory name.
export function pkgNameFromDir(dir) {
  const base = String(dir).replace(/^\.\/+/, '').replace(/[\\/]+$/, '').split(/[\\/]/).pop() || 'my-plugin'
  return base
    .trim()
    .toLowerCase()
    .replace(/^[^a-z0-9]+|[^a-z0-9-_.]+/g, '')
    .replace(/_/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '') || 'my-plugin'
}

// Derive a cordis-safe plugin id (row id + `name` export): [a-z0-9][a-z0-9-]*.
export function pluginIdFromPkg(pkg) {
  const id = String(pkg).toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9-]/g, '-')
  return id.replace(/^[-]+|[-]+$/g, '').replace(/-{2,}/g, '-') || 'my-plugin'
}

// Derive a snake_case tool name from a package name.
export function toolNameFromPkg(pkg) {
  const id = pluginIdFromPkg(pkg)
  const snaked = id.replace(/-/g, '_')
  return /^[a-z]/.test(snaked) ? snaked : `tool_${snaked}`
}

export async function runWizard(initial) {
  const rl = createInterface({ input, output })
  let eof = false
  const ask = async (q) => {
    try {
      const a = await rl.question(q)
      return a.trim()
    } catch {
      // EOF (e.g. piped stdin closed) — treat as "use default".
      eof = true
      return ''
    }
  }

  const result = { ...initial }
  try {
    console.log(paint(c.cyan, '\n✦ DeepSeek Harness 插件脚手架 / plugin scaffold\n'))

    if (!result.targetDir) {
      result.targetDir = await ask(`${paint(c.bold, '项目目录 Project directory')} (my-plugin): `)
      if (!result.targetDir) result.targetDir = 'my-plugin'
    }

    const autoPkg = pkgNameFromDir(result.targetDir)
    if (!result.name) {
      const n = await ask(`${paint(c.bold, 'npm 包名 package name')} (${autoPkg}): `)
      result.name = n || autoPkg
    }

    if (!result.template) {
      const t = await ask(`${paint(c.bold, '模板 template')} [${TEMPLATES.join('/')}] (tool): `)
      result.template = TEMPLATES.includes(t) ? t : 'tool'
    }
    if (result.template && !TEMPLATES.includes(result.template)) result.template = 'tool'

    const meta = TEMPLATE_META[result.template]
    if (!result.pluginId) {
      const autoId = pluginIdFromPkg(result.name)
      const id = await ask(`${paint(c.bold, '插件 id plugin id')} (${autoId}): `)
      result.pluginId = id || autoId
    }
    if (meta.asksToolName && !result.toolName) {
      const autoTool = toolNameFromPkg(result.name)
      const tn = await ask(`${paint(c.bold, '工具名 tool name')} (${autoTool}): `)
      result.toolName = tn || autoTool
    }

    if (result.verify === undefined) {
      const v = await ask(`${paint(c.bold, '生成后自动验证装载 verify after generate?')} [y/N]: `)
      result.verify = /^y(es)?$/i.test(v)
    }
  } finally {
    rl.close()
  }
  return result
}
