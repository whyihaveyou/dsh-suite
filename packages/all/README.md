# @dsh-suite/all — DSH All-in-One 全家桶

[💬 问题反馈](https://github.com/whyihaveyou/dsh-suite/issues/new?template=plugin-feedback.yml&labels=feedback&plugin=all)

一键安装 DeepSeek Harness 第一方最佳插件全家桶。

## 安装

```sh
dsh plugin --profile <name> add @dsh-suite/all
```

一次装齐：

| 插件 | 包 | 作用 |
|---|---|---|
| 插件商店 | `@dsh-suite/plugin-manager` | DSH Web UI 里的插件应用商店（Store tab） |
| 任务通知 | `@dsh-suite/plugin-notify` | 完成任务/出错/待审批时推送（IM webhook + 本机） |
| 会话导出 | `@dsh-suite/plugin-session-export` | 会话导出为人类可读 Markdown/HTML |
| 轻量任务板 | `@dsh-suite/plugin-team-board` | 会话级任务看板 |
| 神模扳机 | `@dsh-suite/plugin-deus` | 极简提示词 A/B 实验台：一键注入 + 起手指纹判定 + Wilson CI 触发率统计（社区观察，未获官方证实） |
| 中文预设 | `@dsh-suite/preset-center` | 中文开箱即用场景预设，一键应用 |
| 皮肤中心 | `@dsh-suite/themes` | 151 款皮肤 + 试穿面板（收藏/最近/随机） |

## 版本节奏

任何子插件发新版 → 重新运行 `node scripts/aggregate.mjs`（重生成
`cordis.patch.yml` + 校验 dependencies range），并按需 bump 本包版本。

> 依赖 `@dsh-suite` scope（需先注册 npm org）、Node >= 22。


---

## Theme & Skin Compatibility / 主题与皮肤兼容

This plugin renders no own host UI (its surface is host-provided / tool / event only), so it is
naturally theme-compatible. If a Web UI panel is added later, it must follow the DSH Web styling
contract — colors via `--dsw-alias-*` tokens, no hardcoded literals — and emit
`data-dsh-plugin` / `data-dsh-part` / `data-dsh-surface` (L1 + L2 of the
[dsh-web skin-center contract](https://github.com/zhu1090093659/dsh-web/tree/main/packages/skins/skin-center/contracts)).

本插件不渲染自有宿主 UI（仅经宿主提供的表面 / 工具 / 事件暴露），天然与主题兼容。日后若加 Web UI 面板，
须遵循 DSH Web 样式契约（颜色走 `--dsw-alias-*` 令牌、不写硬编码色值），并输出
`data-dsh-plugin` / `data-dsh-part` / `data-dsh-surface` 语义属性（dsh-web 皮肤中心契约 L1 + L2）。
