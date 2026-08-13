// Template rendering + file writing for create-dsh-plugin.
import { readdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, resolve } from 'node:path'
import { c, paint, ok, exists, writeFileDeep, readText, resolveDshVersions } from './util.js'
import { TEMPLATE_META, PITFALLS } from './templates.js'

const here = dirname(fileURLToPath(import.meta.url))
const TEMPLATES_ROOT = resolve(here, '../templates')

// Recursively list files under a directory (relative paths).
async function listFiles(dir, base = dir) {
  const out = []
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry)
    const st = await stat(full)
    if (st.isDirectory()) out.push(...await listFiles(full, base))
    else out.push(relative(base, full))
  }
  return out
}

function renderPitfalls(lang = 'both') {
  const lines = ['## Pitfalls / 坑（从真实 spike 提炼，防呆）', '']
  for (let i = 0; i < PITFALLS.length; i++) {
    const p = PITFALLS[i]
    lines.push(`${i + 1}. ${p.en}`)
    lines.push(`   - ${p.zh}`)
    lines.push('')
  }
  return lines.join('\n')
}

/**
 * Generate one plugin project from a template.
 * @param cfg { targetDir, name, pluginId, toolName, template, skipInstall }
 * @returns { cfg, versions, files } for the caller (and --verify).
 */
export async function generate(cfg) {
  const meta = TEMPLATE_META[cfg.template]
  const versions = await resolveDshVersions()

  const targetAbs = resolve(cfg.targetDir)
  if (await exists(targetAbs) && await readdir(targetAbs).then((l) => l.length > 0)) {
    throw new Error(
      `target directory ${JSON.stringify(cfg.targetDir)} is not empty — refusing to overwrite (目录非空，拒绝覆盖). Choose a new directory or empty it first.`,
    )
  }

  const tokens = {
    PKG_NAME: cfg.name,
    PKG_DESCRIPTION: `${cfg.name} — a DeepSeek Harness plugin (${cfg.template} template).`,
    PLUGIN_ID: cfg.pluginId,
    TOOL_NAME: cfg.toolName || 'my_tool',
    DSH_TOOLS_VERSION: versions.dshTools,
    DSH_SESSION_VERSION: versions.dshSession,
    CORDIS_VERSION: versions.cordis,
    SCHEMASTERY_VERSION: versions.schemastery,
    DSH_VERSION: versions.dsh,
    YEAR: String(new Date().getFullYear()),
    PITFALLS: renderPitfalls(),
  }

  const replace = (content) =>
    content.replace(/\{\{(\w+)\}\}/g, (m, key) => (key in tokens ? tokens[key] : m))

  const srcRoot = join(TEMPLATES_ROOT, cfg.template)
  const files = await listFiles(srcRoot)
  const written = []
  for (const rel of files) {
    const content = replace(await readText(join(srcRoot, rel)))
    await writeFileDeep(join(targetAbs, rel), content)
    written.push(rel)
  }

  console.log('')
  console.log(ok(`✔ Generated ${cfg.template} plugin in ${targetAbs} (生成完成)`))
  console.log(paint(c.dim, `  template: ${cfg.template}  package: ${cfg.name}  plugin-id: ${cfg.pluginId}`))
  console.log(paint(c.dim, `  @deepseek-ai/dsh-tools pinned to ${versions.dshTools} (next tag; latest is stale 0.0.1-rc.1)`))
  console.log(paint(c.dim, `  files: ${written.join(', ')}`))

  return { cfg, versions, files: written, targetAbs }
}
