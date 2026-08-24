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

## Related / 相关

- `docs/migration-guide.en.md` / `docs/migration-guide.zh-CN.md` — migrating Claude Code / OpenClaw plugins or scripts to DSH.
- The spike this was distilled from: `research/plugin-spike/` (verified load into a real DSH profile).
