# 目录条目字段词典 / Catalog entry schema

`data/plugins.json` 是目录的**单一真相源**（JSON，非 YAML——jq / CI 原生可消费，数据已就绪）。README 的目录表格与兼容徽章全部由 `scripts/gen-readme.mjs` 从这里静态生成，**绝不手改表格**。

顶层结构：

```jsonc
{
  "_meta": { /* 生成元数据 + 分类映射 + 统计 */ },
  "plugins": [ /* 164 条主目录条目 */ ],
  "watchlist": [ /* 57 条「未收录/观察」区条目 */ ]
}
```

> **收录口径（重要）**：Eco-Scout 的源目录 `research/plugins-catalog.json` 共 222 条，其中**官方框架本体 `deepseek-ai/deepseek-harness`（sourceNote=`官方仓库`，13578★）不计入插件目录**——插件目录不收录框架自己。因此本文件实际为 **164 条 `plugins` + 57 条 `watchlist` = 221 条**。源数据的 222 条如需对账，请用「222 − 1（官方框架）= 221」换算。

## 条目字段 / Entry fields（`plugins` 与 `watchlist` 同构）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | string | ★ | 唯一 slug：`/^[a-z0-9]+(-[a-z0-9]+)*$/`，作 README 锚点。同名仓库冲突时追加 `-<owner>` 消歧。 |
| `name` | string | ★ | 仓库短名（也是 npm 包名的第一猜测；真实 npm 名未知时以 `repo` 为准）。 |
| `npm` | string\|null | | 已核实的 npm 包名。当前全为 `null`——目录数据来自 GitHub topic 抓取，npm 名待后续任务补。 |
| `repo` | string | | `owner/name`，供 star 抓取与链接。 |
| `url` | string | | GitHub 仓库完整 URL。 |
| `category` | enum | ★ | 11 类之一（见 [docs/categories.md](categories.md)）。 |
| `description` | object | ★ | `{ "en": "...", "zh": "..." }`，双语各 ≤140 字符，缺一报错。 |
| `author` | string | | GitHub owner（从 `repo` 拆出）。 |
| `stars` | number | ★ | 收录时实测 star 数。 |
| `license` | string | | 缺省 `unknown`。 |
| `tags` | string[] | | 补充标签，自由文本。 |
| `dsh` | object | ★ | `{ minVersion, peerCordis, node }` 兼容性声明（多数为空，待实测补）。 |
| `compat` | object | ★ | `{ status, dshVersion, lastVerified, note }`，CI 日检读写。 |
| `install` | string | | 自定义安装命令；空则由 `name` 生成默认 `dsh plugin --profile demo add <name>`。 |
| `featured` | boolean | | 精选标记。首版由「非官方/非内测第三方插件里 star 前 12」启发式生成，可手改。 |
| `isOfficialBeta` | boolean | | 是否 DSH 官方内测 17 家之一。 |
| `language` | string | | 仓库主语言。 |
| `sourceNote` | string | | Eco-Scout 原始质量信号（`官方仓库`/`内测伙伴`/`领跑者`/`低星长尾` 等），保留透明度。 |
| `watchReason` | string | | 仅 `watchlist` 条目有：`蹭tag` / `工具链` / `占位`。 |

## `compat` 枚举 / compat enums

- `status`: `unknown` | `ok` | `broken` | `unmaintained`
- `dshVersion`: 验证时的 DSH 版本（semver）
- `lastVerified`: ISO 8601 日期
- `note`: `broken` 时的一句原因

## 兼容性日检 / Compatibility check

`scripts/compat-check.mjs` 三层无 key 验证（读 `plugins` + `watchlist` 全部 221 条）：

1. **静态 peer 比对**（已实现）：`npm view <name> peerDependencies engines --json`，比 `@deepseek-ai/cordis` / `@deepseek-ai/dsh` peer 范围与 node engines。
   - 判定：peer 不满足 → `broken`；有 cordis/dsh peer 且满足 → `ok`；无 npm 包 → `unavailable`；无 peer 依赖 → `unknown`。
2. **安装检查**（TODO）：`dsh plugin --profile __compat__ add <name>`。
3. **组装检查**（TODO）：`dsh --profile __compat__ --dump-config`。

结果写 `data/compat-report.json`；`--write` 会把 `ok`/`broken` 写回 `data/plugins.json` 的 `compat` 字段。CI 每日 cron + 手动触发（`.github/workflows/compat.yml`）。

## 给后续任务的接口 / Interfaces for downstream tasks

- **脚手架任务（create-dsh-plugin）**：模板生成的插件 `package.json` 应声明 `peerDependencies: { "@deepseek-ai/cordis": "^4.0.1" }` 或 `@deepseek-ai/dsh`，这样日检第一层能给出确定 `ok` 而非 `unknown`。字段词典见本文。
- **自研插件任务（plugin-notify / plugin-session-export）**：完成后把包名填进对应条目的 `npm` 字段（或新增条目），README 表格会自动带上兼容徽章。
- **star 自动刷新（fetch-stars.mjs，未来）**：写回 `data/plugins.json` 的 `stars` 字段即可，`gen-readme` 会重新排序表格。
