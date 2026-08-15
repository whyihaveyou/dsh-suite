# @dsh-suite/plugin-manager — DSH 插件应用商店 / Plugin Store for DSH Web UI

[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=plugin-manager)


> v0.4.0 — 复制按钮反馈修复 + GitHub opengraph 卡片预览缩略图（lazy）。

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

- **v0.4.0**：新增「已装管理」视图（与 Store 顶部切换）——按来源分组（官方内建 @deepseek-ai/* / 第三方 npm / git 源 / 自研 @dsh-suite/* / 其他）+ 搜索过滤 + 各组计数徽标 + 版本/来源/状态；每项 Remove 按钮 + 确认框（显示名称/来源/「需重启完全卸载」提示），执行 `dsh plugin remove`（pnpm remove + bundle 协调）。

## 变更 / Changelog

- **v0.3.0**：首屏提速（宿主侧 `/plugin-manager/catalog` 裁剪目录路由，只含面板必需字段 + gzip/deflate，缓存 1h，浏览器优先走宿主路由、失败回退 Pages 完整版）；已装 npm 源插件更新检查（`npm view` 批量查询，并发 ≤4、缓存 1h，卡片加「⬆ 有更新」角标，git/link 源跳过）。

## 变更 / Changelog

- **v0.4.0**：新增「已装管理」视图（与 Store 顶部切换）——按来源分组（官方内建 @deepseek-ai/* / 第三方 npm / git 源 / 自研 @dsh-suite/* / 其他）+ 搜索过滤 + 各组计数徽标 + 版本/来源/状态；每项 Remove 按钮 + 确认框（显示名称/来源/「需重启完全卸载」提示），执行 `dsh plugin remove`（pnpm remove + bundle 协调）。

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
5. 卸载/更新检查/启停未做（设计规格明确推到后续迭代）。
