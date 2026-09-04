# create-dsh-plugin

[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=create-dsh-plugin)

> Scaffold a [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness) plugin in seconds.
> 一键脚手架生成 DeepSeek Harness 插件。

Zero dependencies, pure ESM, Node `^22.19 || >=24`. Dual mode: **non-interactive flags** or an **interactive wizard** (bilingual prompts).

---

## Usage / 用法

```sh
npm init dsh-plugin [project-dir] [options]      # npm init <x> → npx create-<x>
npx create-dsh-plugin [project-dir] [options]

# Non-interactive / 非交互
npx create-dsh-plugin my-plugin -t tool
npx create-dsh-plugin my-plugin -t tool --registry-owner your-github-owner
npx create-dsh-plugin my-events -t events --yes --verify
npx create-dsh-plugin my-webui -t webui -n my-webui --tool-name my_note --verify

# Interactive wizard / 交互向导
npx create-dsh-plugin
```

### Options / 选项

| Flag | Description |
|---|---|
| `-t, --template <tool\|events\|webui\|panel\|preset-pack>` | Template variant (default `tool`) |
| `-n, --name <pkg>` | npm package name (derived from dir by default) |
| `--plugin-id <id>` | cordis patch row id + plugin `name` export (derived from package name) |
| `--tool-name <name>` | Tool name for `tool`/`webui` (derived from package name) |
| `--registry-owner <github-owner>` | Generate an optional community `dsh-plugin.naming.json` declaration |
| `--registry-name <slug>` | Override the coordinate slug derived from the package name |
| `-y, --yes` | Skip prompts, use defaults |
| `--verify` | After generation, build + install into a temp profile + dump-config |
| `--skip-install` | Skip `pnpm install` inside the generated project |

---

## Templates / 模板

| Template | What it generates | Runtime deps |
|---|---|---|
| `tool` | a `defineTool()` tool plugin (parameter + output schema) | `@deepseek-ai/dsh-tools` |
| `events` | a lifecycle/event plugin (`ctx.on` + `ctx.effect`) | **none** |
| `webui` | a tool with a UI **diff card** (`presentCall`/`presentResult`) — experimental | `@deepseek-ai/dsh-tools` |
| `panel` | a **dual-half** plugin: host HTTP route (`ctx.webServer`) + `settings.section` panel in the Web UI — distilled from skin-center / preset-center | **none** (host) + client bundle |
| `preset-pack` | an **agent preset pack**: `presets/<id>/` (preset.yml + agent.cordis.yml) + a one-click list/apply panel; applied presets appear in Settings → Agent presets **live, no restart** | **none** (host) + client bundle |

Every generated project ships, out of the box:

- `package.json` with `@deepseek-ai/dsh-tools` **pinned to the `next`-tag version** (npm `latest` is a stale `0.0.1-rc.1` — this pinning is the scaffold's core value).
- `tsconfig.json` (pure ESM, `module: esnext` + `moduleResolution: bundler`).
- `dsh.bundle` manifest + `cordis.patch.yml` (bundle distribution).
- a `README.md` with the **10 pitfalls** (from a real, verified spike) + 防呆注释 in the code.

## Community naming declaration / 社区命名清单

Pass `--registry-owner <github-owner>` when the public repository owner is known. The scaffold then
generates `dsh-plugin.naming.json` with the plugin coordinate, package, Loader ID, tool names, consumed
event channels, and HTTP routes that are deterministically known from the selected template.
When the caller does not override `--plugin-id` or `--tool-name`, this opt-in mode also derives
collision-resistant defaults such as `owner-plugin` and `owner_plugin`.

公开仓库 owner 已确定时，可传入 `--registry-owner <github-owner>`。脚手架会生成
`dsh-plugin.naming.json`，记录能够从模板参数确定的插件 coordinate、package、Loader ID、
tool、消费的 event channel 和 HTTP route。
如果没有显式覆盖 `--plugin-id` 或 `--tool-name`，该模式还会生成 `owner-plugin` 和
`owner_plugin` 形式的低碰撞默认名。

This is an opt-in community coordination declaration, not an official Harness manifest and not an ID
reservation. Validate it locally with the
[`plugin-write` naming workflow](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill/tree/main/skills/plugin-write),
then optionally query reviewed registrations in
[`dsh-plugin-registry`](https://github.com/zp-home/dsh-plugin-registry). No registry write occurs during
scaffolding, and omitting the flag preserves the existing generated project exactly.

这是可选的社区协调声明，不是 Harness 官方 manifest，也不会预留 ID。先使用
[`plugin-write` 命名流程](https://github.com/oh-my-dsh/dsh-plugin-upgrade-skill/tree/main/skills/plugin-write)
做本地校验，再按需查询
[`dsh-plugin-registry`](https://github.com/zp-home/dsh-plugin-registry) 中经过审核的登记。
脚手架不会写入中央仓库；不传该参数时，生成结果与原行为一致。

## Why the version pinning matters / 为什么锁 next 版本

`@deepseek-ai/dsh-tools` publishes under two dist-tags: `latest` (stale `0.0.1-rc.1`) and `next`
(`0.1.0-rc.x`, the real line). A naive `npm i @deepseek-ai/dsh-tools` installs the **broken old line**.
`create-dsh-plugin` resolves the current `next` version at generation time and pins it **exactly**,
so generated projects never drift onto the stale line.

## --verify

`--verify` reuses the exact, spike-proven sequence:

```
pnpm install → pnpm run build (tsc) → dsh plugin add (temp profile) → dump-config grep
```

It needs `pnpm` on PATH (for `dsh plugin add`). Without a `DEEPSEEK_API_KEY` it proves
compile + load + config composition (not a live model call, which fails `MISSING_CREDENTIAL`).

## Development / 开发

```sh
cd packages/create-dsh-plugin
node src/cli.js --help          # no build step needed (zero-dep ESM)
node --test test/               # (tests live under test/)
```

## Theme & Skin Compatibility / 主题与皮肤兼容

Generated plugins follow the DSH Web styling contract by default: UI templates route all
colors through `--dsw-alias-*` tokens and emit `data-dsh-plugin` / `data-dsh-part` /
`data-dsh-surface` semantic attributes (L1 + L2 of the
[dsh-web skin-center contract](https://github.com/zhu1090093659/dsh-web/tree/main/packages/skins/skin-center/contracts));
every generated README carries the declaration section.

脚手架产出的插件默认符合 DSH Web 样式契约：UI 模板颜色一律走 `--dsw-alias-*` 令牌、
输出 `data-dsh-*` 语义属性（dsh-web 皮肤中心契约 L1 + L2），生成的 README 自带声明节。

## Related / 相关

- `docs/migration-guide.en.md` / `docs/migration-guide.zh-CN.md` — migrating Claude Code / OpenClaw plugins or scripts to DSH.
- The spike this was distilled from: `research/plugin-spike/` (verified load into a real DSH profile).
