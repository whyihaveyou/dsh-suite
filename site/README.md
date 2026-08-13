# dsh-suite 目录站（site/）

可搜索的中英双语 DeepSeek Harness（DSH）插件目录静态网站，部署到 GitHub Pages。

> 本目录是**纯静态产物**：`node site/build.mjs` 读 `data/plugins.json` → 生成 HTML/JSON/sitemap，
> 前端用零依赖原生 JS 做搜索/筛选/排序。不引入任何框架，无运行时依赖。

## 文件结构

```
site/
├── build.mjs           # ★ 静态生成器（Node 内置模块，零依赖）
├── index.html          # 英文版（生成物，服务端渲染全量卡片）
├── zh.html             # 中文版（生成物）
├── catalog.json        # 双语搜索索引（生成物，供 shields 端点/程序化消费）
├── sitemap.xml         # 生成物（中英双 URL + hreflang）
├── robots.txt          # 生成物
├── .nojekyll           # 禁用 Pages 的 Jekyll 处理
├── assets/
│   ├── app.js          # 前端：搜索(中英模糊)/筛选/排序/一键复制
│   ├── style.css       # 深色主题
│   └── og.png          # 社媒分享首图（1200×630，静态，见下）
└── preview/
    ├── og-card.html    # og.png 的源模板
    └── preview-{en,zh}.png  # 本地预览截图
```

## 构建

```bash
node site/build.mjs                          # 默认数据源，输出到 site/
node site/build.mjs --data <path.json>       # 指定数据源
node site/build.mjs --base-url <url>         # 覆盖 Pages 绝对基址（sitemap/og/canonical）
```

**数据源自动探测**（`--data` 可覆盖）：
1. `dsh-suite/data/plugins.json`（Core-Builder 规整版：164 精选 + 57 待审核）——首选
2. `research/plugins-catalog.json`（Eco-Scout 原始 222 条）——fallback

两种 schema 都在 `normalize*()` 里统一成同一 catalog 条目，切数据源无需改前端。
构建时会**排除框架本体**（`deepseek-ai/deepseek-harness`，`sourceNote=官方仓库`），
并对 id 做全局去重（冲突追加 `-2` 后缀）。

## 本地预览

```bash
cd site && python3 -m http.server 8723
# 打开 http://localhost:8723/        （英文，中文浏览器自动跳 zh.html）
#     http://localhost:8723/zh.html   （中文）
#     http://localhost:8723/index.html?lang=en  （强制英文，绕过自动跳转）
```

## 部署到 GitHub Pages（由 Lead 统一开启）

**推荐：GitHub Actions 部署（source = GitHub Actions，path = `site/`）**，因为 `site/`
不在 `/` 或 `/docs`，经典"分支目录"模式选不到它。在仓库加一个 workflow：

```yaml
# .github/workflows/pages.yml
name: Deploy site to Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - name: Build site
        run: node site/build.mjs          # 零依赖，构建时实时渲染目录计数
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: site }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

然后 `gh api` 把 Pages 源切到 "GitHub Actions"（或首次 deploy 会自动激活）。

**备选：gh-pages 分支**——把 `site/` 内容推到 `gh-pages` 分支根，Pages source 选该分支。
**不推荐 `/docs`**：需要把 `site/` 复制/重命名为 `docs/`，多一层同步。

> 注意：`og.png` 与 `preview/` 是静态图，目录计数变化后不会自动更新（hero 里的计数是
> 构建时动态渲染的，会随 `data/plugins.json` 自动变；只有 og.png 里的数字需手动重生成，
> 见 `preview/og-card.html`）。

## SEO 要点（已实现）

- 每页独立 `<title>`/`<meta description>`/`og:*`/`twitter:*`，中英各一套
- `<link rel="alternate" hreflang="en|zh-CN|x-default">` 互指
- `sitemap.xml` 双 URL + xhtml:link 交替标注；`robots.txt` 指向 sitemap
- **卡片全部服务端渲染**（爬虫不执行 JS 也能读到插件名+描述），JS 只在交互后接管
- 目标关键词：`DeepSeek Harness plugins` / `dsh 插件`（见各页 `<meta keywords>`）
