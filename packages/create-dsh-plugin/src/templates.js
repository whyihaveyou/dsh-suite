// Template registry + shared metadata for create-dsh-plugin.

export const TEMPLATES = ['tool', 'events', 'webui', 'panel', 'preset-pack']

export const TEMPLATE_META = {
  tool: {
    id: 'tool',
    label: 'tool',
    // Bilingual one-line description for the wizard and --help.
    description: 'defineTool tool plugin (parameter + output schema) / 工具插件（defineTool + 参数/output schema）',
    defaultPluginId: 'my-tool',
    defaultToolName: 'my_tool',
    asksToolName: true,
  },
  events: {
    id: 'events',
    label: 'events',
    description: 'lifecycle/event plugin (ctx.on + ctx.effect) / 事件/生命周期插件（ctx.on + ctx.effect）',
    defaultPluginId: 'my-events',
    defaultToolName: null,
    asksToolName: false,
  },
  webui: {
    id: 'webui',
    label: 'webui',
    description: 'tool with a UI card (presentCall/presentResult) — experimental / 带 UI 卡片的工具（presentCall/presentResult）— experimental',
    defaultPluginId: 'my-webui',
    defaultToolName: 'my_webui',
    asksToolName: true,
  },
  panel: {
    id: 'panel',
    label: 'panel',
    description: 'dual-half plugin: host route + settings.section panel (distilled from skin-center/preset-center) / 双半插件：宿主路由 + 设置面板（源自皮肤中心/预设中心骨架）',
    defaultPluginId: 'my-panel',
    defaultToolName: null,
    asksToolName: false,
  },
  'preset-pack': {
    id: 'preset-pack',
    label: 'preset-pack',
    description: 'agent preset pack: presets/<id>/ structure + list/apply panel (distilled from preset-center) / 预设包：presets/<id>/ 结构 + 一键应用面板（源自预设中心骨架）',
    defaultPluginId: 'my-presets',
    defaultToolName: null,
    asksToolName: false,
  },
}

// The 10 pitfalls distilled from the verified spike, surfaced verbatim in every
// generated project so nobody re-discovers them. Kept in English (code) with
// a Chinese line in the generated README.
export const PITFALLS = [
  {
    en: 'Node version: DSH requires Node ^22.19.0 || >=24.0.0. Older Node (e.g. v22.17) only warns EBADENGINE but may hit runtime issues — upgrade if you can.',
    zh: 'Node 版本：DSH 要求 ^22.19.0 || >=24.0.0。旧版本（如 v22.17）只告警 EBADENGINE，不阻断，但建议升级。',
  },
  {
    en: 'npm dist-tag trap (the big one): `@deepseek-ai/dsh-tools` `latest` is a STALE 0.0.1-rc.1; the real line is under the `next` tag (0.1.0-rc.x). This scaffold pins the next-tag version for you — never `npm i @deepseek-ai/dsh-tools` over it.',
    zh: 'npm dist-tag 坑（最大）：`@deepseek-ai/dsh-tools` 的 latest 是过期的 0.0.1-rc.1，正确版本在 next tag。本脚手架已锁 next 版本，勿再手动 npm i 覆盖。',
  },
  {
    en: 'Version-line alignment: keep every `@deepseek-ai/dsh-*` package on the same `0.1.0-rc.x` line so pnpm does not install two module copies.',
    zh: '版本线对齐：所有 @deepseek-ai/dsh-* 包统一用同一 0.1.0-rc.x 线，避免 pnpm 装两份模块。',
  },
  {
    en: '`@deepseek-ai/cordis` is a peerDependency: import only `type { Context }` (erased at compile). At runtime the host hands you `ctx` — never import cordis values at runtime.',
    zh: '@deepseek-ai/cordis 是 peerDep：只 import type（编译期擦除），运行时 ctx 由宿主传入。',
  },
  {
    en: 'Pure ESM: package.json must set `"type": "module"`; build with `module: esnext` + `moduleResolution: bundler` to keep bare specifiers.',
    zh: '纯 ESM：package.json 必须 "type": "module"；tsc 用 module:esnext + moduleResolution:bundler 保留 bare specifier。',
  },
  {
    en: '`dsh plugin add <dir>` anchors relative paths to the INVOKING directory — run it from the parent directory, not from inside the plugin.',
    zh: 'dsh plugin add <dir> 的相对路径锚定调用目录——要在插件的父目录执行。',
  },
  {
    en: 'In the bundle `cordis.patch.yml`, `name` is a package name (resolved via node_modules / `$DSH_HOME/profiles/node_modules`), not a relative path.',
    zh: 'bundle 的 cordis.patch.yml 里 name 用包名（走 node_modules 解析），不要用相对路径。',
  },
  {
    en: 'Registrations are effects: `ctx.tools.register()` / `ctx.on()` auto-dispose on unload. Wrap your OWN resources (timers/connections) in `ctx.effect(() => { acquire; return cleanup })`.',
    zh: '注册是 effect：ctx.tools.register()/ctx.on() 卸载自动清理；自己的资源（timer/连接）要包 ctx.effect(() => {…; return cleanup})。',
  },
  {
    en: 'Load order = service dependencies, never file order: `export const inject = [\'tools\']` makes the plugin wait until `ctx.tools` is ready.',
    zh: '加载顺序靠服务依赖（inject），不靠文件顺序。',
  },
  {
    en: 'Full end-to-end (model actually calls your tool) needs `DEEPSEEK_API_KEY`; without it `--verify` proves load/list/event, and the model call fails with MISSING_CREDENTIAL.',
    zh: '端到端（模型真正调工具）需 DEEPSEEK_API_KEY；无 key 时 --verify 只能证明加载/列出/事件，模型调用会 MISSING_CREDENTIAL。',
  },
]
