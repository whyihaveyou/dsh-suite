# @dsh-suite/plugin-manager — DSH 插件应用商店 / Plugin Store for DSH Web UI

[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=plugin-manager)


> v0.8.1 — WKWebView/电子壳外链修复：window.open 返回值检测，壳内被吞时降级「复制链接 + toast」。

> v0.8.0 — Store v2 Batch 3（最近更新排序 / 安装流式日志 / 已装精确匹配）。

> v0.7.0 — Store v2 Batch 2（增量渲染哨兵 / Featured 策展区 / 场景组合一键装 / watchlist 与投稿入口）。

> v0.6.0 — Store v2 Batch 1（详情抽屉 / 分类归一+只看兼容 / 中文别名搜索 / 卡片单语化 / 安装后引导 / 反馈口子）。

> 嵌入 DSH Web UI 设置页的插件商店面板：目录浏览 / 搜索 / 一键安装 / 兼容徽章 / 已装列表。
> A plugin-store panel embedded in DSH Web UI: catalog browse / search / one-click install / compat badges / installed list.

旗舰功能（本团队）。官方只做了「设置页只读清单 + 命令行安装」，本插件补上「在 Web UI 里发现 + 搜索 + 一键安装」这半截断掉的链路。

## 架构 / Architecture（双半插件 dual-half）

```
plugin-manager/
├── lib/index.js   宿主半 / host half  — install 服务 + 已装清单，经 /plugin-manager/* HTTP 路由暴露
│                   (spawn 官方 `dsh plugin add`；inject webServer + loader)
└── lib/client.js  浏览器半 / browser half — 「Store」tab 注入官方 settings.plugins.tab slot
                   (fetch GitHub Pages catalog.json；卡片/搜索/排序/徽章/安装确认框)
```

- 浏览器不能跑 `dsh plugin add` → 安装必须走 host 侧服务（spawn 官方 CLI，复用安装机制）。
- 已装清单：host 读 `ctx.loader.entries()` 投影，经 `/plugin-manager/list` 返回。
- 目录：浏览器侧 fetch `catalog.json`（GH Pages，CORS `*`），不 host 代理。

## 功能 / Features（MVP = F1-F3 + F5 + F4 只读）

- **F1 目录**：`catalog.json` 的 `plugins` 数组渲染卡片（name / 双语描述 / author / stars / license）。
- **F2 搜索/分类/排序**：子串搜索（name/desc_zh/desc_en/author/repo/tags）；分类下拉；排序（星标↓ / 最近验证 / 兼容优先）。
- **F3 一键安装**：点 Install → 确认框（包名/repo/star/license，未知 license 标黄）→ host spawn `dsh plugin add` → 成功绿勾+「需重启生效」/ 失败红叉+日志 / 超时提示。每卡 [📋] 复制 installCmd。
- **F5 兼容徽章**：🟢 ok / 🔴 broken / ⚪ unknown / ⚫ unmaintained；broken 卡片置灰 + 安装按钮标黄「⚠ 已知不兼容」（仍可装，知情自担）。
- **F4 已装**：只读列表；商店卡片标 ✅ 已装，Install 变禁用。

## 三态 / Three states

加载（骨架/文字）· 空（搜索无结果 + 清除筛选 / 目录空 + 重试）· 错误（fetch 失败 + 重试）。全部双语（`ctx.locale.register(NS, {zh, en})`）。

## 安装运行 / Install & run

```sh
export DSH_HOME=/tmp/dsh-pm
npx -y @deepseek-ai/dsh plugin --profile web add @dsh-suite/plugin-manager
npx -y @deepseek-ai/dsh web     # http://127.0.0.1:3080
# 设置 Settings → Plugins → 「Store 商店」tab
```

## 配置 / Config（后续接 cordis schema；当前硬编码默认值）

| 项 | 默认 | 说明 |
|---|---|---|
| catalogUrl | `https://whyihaveyou.github.io/dsh-suite/catalog.json` | 目录源 |
| profile | `web` | 安装目标 profile |
| installTimeoutMs | 120000 | spawn 超时 |
| confirmBeforeInstall | true | 安装前二次确认 |
| allowInstall | true | 安装开关 |

## 变更 / Changelog

- **v0.8.0**：商店 v2 Batch 3：
  - **①「最近更新」排序**：排序下拉新增 Recently updated/最近更新，按 catalog `lastPush`(YYYY-MM-DD) 降序，缺字段落尾；host `trimPlugin` 补直通 `lastPush`。
  - **② 安装流式日志**：新增 POST `/plugin-manager/install-stream`（原生 res 分块 NDJSON：`{t:start|log|done}`；`spawnCmd` 可选逐行回调，`runInstall` 透传）；`doInstall` 流式优先，读流异常静默回退 buffered `/install`（不硬造假进度）；右下角悬浮小终端实时滚动真实安装日志。buffered `/install` 接口保持不变。
  - **③ 已装精确对齐**：`isInstalled` 由近似子串互含改为 **trim 后全名精确相等**，修掉 152 对同名异包假阳性（如 `dsh-remote`↔`@linxin666/dsh-remote-web-ui` 被错标已装）——loader 名字即完整 npm 名，无需模糊匹配。
  - 维护：递增 NDJSON + UI 实时面板 + 真装 dsh-math-team 落盘三重证据链；识别并修复 pnpm add 对开发 symlink 的替换副作用。
- **v0.7.0**：商店 v2 Batch 2（UI 一致性与性能批）：
  - **F-G 增量渲染**：1270+ 卡首屏只渲 60，IntersectionObserver 哨兵触底递增 60/次；筛选/搜索/排序变化时重置窗口；底部实时计数「已显示 x / 共 n」。
  - **F-F featured 策展区**：catalog `featured=true` 条目按星标取 top6，商店顶部横排大卡（og 大图 + 一句话 + 安装按钮），仅默认浏览态显示（搜索/筛选时自动隐藏）；host `trimPlugin` 直通 `featured` 字段。
  - **F-H 场景组合一键装**：🧩 第三 tab，6 套组合（与 site/build.mjs SCENARIOS 同步）；一键全装 = 逐包串行 POST 既有 `/plugin-manager/install`，单包失败不中断，行内 ⏳/✔/❌ 逐包回报；装完自动刷新已装列表。引导型：含 preset-center 的组合提示去 设置 → Agent presets 应用预设——**不新造 preset 应用通道**（host apply-preset 另行评审）。
  - **F-I/M watchlist 与投稿**：状态栏 📮 投稿我的插件（issues 预填 + `plugin-submission` 标签）；商店底部 🔎 观测聚合条目（compat-unknown 计数 · risk 计数 → 每日兼容年报 stars.html / stars-zh.html；catalog 无官方 watchlist metadata，采用现状口径）。
  - 维护：🔔 套装真实安装回归（plugin-notify@0.1.0 落盘 package.json + node_modules 双确认）；测试环境用后逐项恢复（package.json / pnpm-lock.yaml / repo symlink 核验）。
- **v0.6.0**：商店 v2 Batch 1（研究 research/store-v2-plan.md，用户逐条一拍一批）：
  - **F-A 详情抽屉**：点任意卡片 → 右侧固定抽屉，og 大图 / 完整双语描述 / 👤作者 ★stars ⚖license 语言 分类 / 兼容徽章+lastVerified / 风险标注（⚠ 黄 chips / ✓ clean / 未扫描三态）；吸底条 [Install/Upgrade + 📋copy + GitHub↗ + 💬反馈 + Close]，遮罩点击/按钮可关。
  - **F-B 分类归一 + 只看兼容**：分类下拉从 catalog 实际数据归一生成（硬编码 12 类→其余塞 other 的问题消失），新增「只看 🟢 兼容」pill（实测 221/1309）。
  - **F-C 中文别名搜索**：33 条中文→英文别名映射（皮肤/主题/通知/看板/导出/翻译/润色/预设/日报…），中文查询先扩英文再全 token AND 匹配。
  - **F-D 卡片单语化**：desc 按 UI locale 单语渲染；「⚪ 未验证」徽章弱化为小灰点（不再占卡片右上显眼位）。
  - **F-I 安装后引导**：成功→「重启生效；场景/预设装好后去 Settings → Agent presets 应用」引导行；失败→手动复制命令按钮。
  - **F-J 反馈口子**：第一方反馈 → dsh-suite 集中收编（预填模板），第三方 → 作者仓库 issue；入口＝卡片 💬 ghost 钮 + 抽屉按钮 + 商店顶栏「商店问题反馈」链接。
  - 说明：F-E（lastPush 数据管线）数据域，按 lead 分工跳过由审稿者另派。
  - 服务端加固：/updates 的 hasUpdate 改为 semver 严格大于（dev/link 高版本不再误报「update → 旧版」）。
- **v0.5.0**：已装插件更新检测升级 + 一键更新。检测不再阻塞首屏（Store/Installed 列表先渲染，`/plugin-manager/updates` 独立异步回填角标）；宿主缓存 TTL 1h → **6h**（`PM_UPDATES=off` 仍可关）。Installed 视图每项「⬆ 有更新 → vX.Y.Z」角标 + 「⬆ 升级」按钮，确认框提示「已装旧版，确认后将覆盖升级 (old → new)」，执行 `/plugin-manager/update`（复用 `dsh plugin add` 安装路径重装最新版；无 pending 更新服务端返回 409 防误刷）→ ✔ 更新成功横幅。Store 视图已装旧版卡露出同款升级按钮 + 确认框提示。git/link/workspace 源包不适用（持续增长仓库，AI 自行 git pull）。

- **v0.4.0**：新增「已装管理」视图（与 Store 顶部切换）——按来源分组（官方内建 @deepseek-ai/* / 第三方 npm / git 源 / 自研 @dsh-suite/* / 其他）+ 搜索过滤 + 各组计数徽标 + 版本/来源/状态；每项 Remove 按钮 + 确认框（显示名称/来源/「需重启完全卸载」提示），执行 `dsh plugin remove`（pnpm remove + bundle 协调）。

## 变更 / Changelog

- **v0.3.0**：首屏提速（宿主侧 `/plugin-manager/catalog` 裁剪目录路由，只含面板必需字段 + gzip/deflate，缓存 1h，浏览器优先走宿主路由、失败回退 Pages 完整版）；已装 npm 源插件更新检查（`npm view` 批量查询，并发 ≤4、缓存 1h，卡片加「⬆ 有更新」角标，git/link 源跳过 —— 注：0.5.0 起改为异步回填不阻塞首屏、缓存 6h、加入一键升级流）。

## 变更 / Changelog

- **v0.2.0**：复制按钮修复（剪贴板降级链 navigator.clipboard → execCommand('copy') → 命令文本弹层）+ 复制成功 ✓ 反馈；卡片顶部 GitHub opengraph 预览缩略图（IntersectionObserver 按需加载、onerror 隐藏、点击展开）；装完提示加「立即重启」指引。
- **v0.2.0 (P1 修复)**：安装成功判定不再只看 exit 0——改成「exit 0 + 解析 pnpm `+ <name>` 确认依赖真加了 + `--dump-config` 确认包进了 bundle 栈」才翻绿；未挂载（monorepo 根包/缺 dsh.bundle）显示黄色警告，失败显示 stderr 摘要；目标 profile 从硬编码 `web` 改为从启动 argv 探测当前 profile。
- **v0.1.1**：复制按钮无反馈 bug 修复（同 0.2 降级链）。

## 与官方「Plugin list」的差异 / vs the official Plugin list

官方「Plugin list」是**清单**（只读平铺，160+ 个名字难找）；本插件的「已装管理」是**管理**——分组、搜索、显示版本/来源/状态，并可移除。两者共存于 Settings → Plugins 的 tab 栏。

## 已知限制 / Known limitations

1. install 通过 HTTP 路由（非 typert Remote）：因 typert 代码生成需 monorepo 构建链，第三方双半插件用 webServer 路由是已验证的等价路径（同 aionui-panel）。
2. 安装非流式：spawn 完成后一次性回传完整日志（进度用「安装中…」spinner 表示）。
3. 已装匹配是近似子串（catalog.name ↔ 已装包名），非精确 npm 包名对齐。
4. 卡片描述同时展示 en+zh（未按 UI locale 切换单语）。
5. 启停 toggle 未做（设计规格明确推到后续迭代；卸载 v0.4 / 更新检测+一键升级 v0.5 已交付）。
