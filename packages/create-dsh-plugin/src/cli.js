#!/usr/bin/env node
// create-dsh-plugin — scaffold a DeepSeek Harness plugin. Zero dependencies.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { c, paint, ok, err, info } from './util.js'
import { parseArgs, HELP } from './args.js'
import { TEMPLATES, TEMPLATE_META } from './templates.js'
import { runWizard, pkgNameFromDir, pluginIdFromPkg, toolNameFromPkg } from './prompt.js'
import { generate } from './generate.js'
import { verify } from './verify.js'
import { registryIdentityFromPackage } from './naming.js'

function version() {
  try {
    const p = join(dirname(fileURLToPath(import.meta.url)), '../package.json')
    return JSON.parse(readFileSync(p, 'utf8')).version || '0.0.0'
  } catch { return '0.0.0' }
}

async function main() {
  const { targetDir, flags } = parseArgs(process.argv.slice(2))

  if (flags.help) { console.log(HELP); return }
  if (flags.version) { console.log(version()); return }

  let cfg = {
    targetDir,
    name: flags.name,
    template: flags.template,
    pluginId: flags['plugin-id'],
    toolName: flags['tool-name'],
    registryOwner: flags['registry-owner'],
    registryName: flags['registry-name'],
    verify: flags.verify === true ? true : undefined,
    skipInstall: flags['skip-install'] === true,
  }

  // Non-interactive: enough info OR --yes. Otherwise run the bilingual wizard.
  const needWizard = !cfg.targetDir || !cfg.template
  if (needWizard && !flags.yes) {
    cfg = await runWizard(cfg)
  }

  if (!cfg.targetDir) {
    console.error(err('✘ 需要项目目录 / a project directory is required (or use the wizard)'))
    process.exit(1)
  }
  cfg.template = cfg.template && TEMPLATES.includes(cfg.template) ? cfg.template : 'tool'
  if (!TEMPLATES.includes(cfg.template)) {
    console.error(err(`✘ 未知模板 / unknown template: ${cfg.template} (choose ${TEMPLATES.join('|')})`))
    process.exit(1)
  }

  try {
    // Fill remaining fields with safe defaults (bilingual note).
    cfg.name = cfg.name || pkgNameFromDir(cfg.targetDir)
    if (cfg.registryName && !cfg.registryOwner) {
      throw new Error('--registry-name requires --registry-owner')
    }
    const meta = TEMPLATE_META[cfg.template]
    const registryIdentity = cfg.registryOwner
      ? registryIdentityFromPackage(cfg.name, cfg.registryOwner, cfg.registryName)
      : null
    if (registryIdentity) {
      cfg.registryOwner = registryIdentity.namespace
      cfg.registryName = registryIdentity.name
    }
    cfg.pluginId = cfg.pluginId || registryIdentity?.loaderId || pluginIdFromPkg(cfg.name)
    if (meta.asksToolName) cfg.toolName = cfg.toolName || registryIdentity?.toolName || toolNameFromPkg(cfg.name)
    cfg.verify = cfg.verify === true

    const result = await generate(cfg)

    if (cfg.verify) {
      const pass = await verify(result)
      if (!pass) process.exit(1)
    }

    console.log(`\n${info('下一步 / Next steps:')}`)
    const addSpec = /^([/]|[A-Za-z]:[\\/])/.test(cfg.targetDir) ? cfg.targetDir : `./${cfg.targetDir}`
    console.log(paint(c.dim, `  cd ${cfg.targetDir}`))
    if (!cfg.skipInstall) console.log(paint(c.dim, '  pnpm install && pnpm run build'))
    console.log(paint(c.dim, '  # from the PARENT directory, install into a profile:'))
    console.log(paint(c.dim, `  dsh plugin --profile my-profile add ${addSpec}`))
    console.log(paint(c.dim, '  dsh --profile my-profile            # boot and watch the plugin load'))
    if (cfg.registryOwner) {
      console.log(paint(c.dim, '  # dsh-plugin.naming.json is a community declaration, not an ID reservation'))
    }
    console.log('')
  } catch (e) {
    console.error(err(`✘ ${e?.message || String(e)}`))
    process.exit(1)
  }
}

main()
