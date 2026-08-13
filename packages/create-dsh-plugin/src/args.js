// Command-line parsing for create-dsh-plugin (zero deps, uses node:util).
import { parseArgs as parse } from 'node:util'
import { c, paint } from './util.js'
import { TEMPLATES } from './templates.js'

export function parseArgs(argv) {
  const options = {
    template: { type: 'string', short: 't' },
    name: { type: 'string', short: 'n' },
    'plugin-id': { type: 'string' },
    'tool-name': { type: 'string' },
    yes: { type: 'boolean', short: 'y' },
    verify: { type: 'boolean' },
    'skip-install': { type: 'boolean' },
    help: { type: 'boolean', short: 'h' },
    version: { type: 'boolean', short: 'v' },
  }
  const { values, positionals } = parse({ args: argv, options, allowPositionals: true, strict: false })
  return { targetDir: positionals[0] ?? null, flags: values }
}

export const HELP = `
${paint(c.bold, 'create-dsh-plugin')} — scaffold a DeepSeek Harness plugin
${paint(c.bold, 'create-dsh-plugin')} — 脚手架生成 DeepSeek Harness 插件

${paint(c.cyan, 'Usage / 用法')}
  npm init dsh-plugin [project-dir] [options]
  npx create-dsh-plugin [project-dir] [options]

${paint(c.cyan, 'Arguments / 参数')}
  [project-dir]              Target directory (项目目录). Omit to enter the interactive wizard.

${paint(c.cyan, 'Options / 选项')}
  -t, --template <name>      Template: ${TEMPLATES.join(' | ')}  (default: tool)
  -n, --name <pkg>           npm package name (默认由目录名推导)
      --plugin-id <id>       cordis patch row id + plugin name export (默认由包名推导)
      --tool-name <name>     Tool name for tool/webui templates (默认由包名推导)
  -y, --yes                  Skip prompts, use defaults (跳过向导用默认值)
      --verify               After generation: build + install into a temp profile + dump-config (生成后自动验证装载)
      --skip-install         Do not run package install inside the generated project
  -h, --help                 Show this help
  -v, --version              Print version

${paint(c.cyan, 'Examples / 示例')}
  npx create-dsh-plugin my-plugin -t tool
  npx create-dsh-plugin my-events -t events --yes --verify
  npx create-dsh-plugin                            # interactive wizard / 交互向导
`
