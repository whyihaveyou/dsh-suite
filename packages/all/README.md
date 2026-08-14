# @dsh-suite/all — DSH All-in-One 全家桶

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

## 版本节奏

任何子插件发新版 → 重新运行 `node scripts/aggregate.mjs`（重生成
`cordis.patch.yml` + 校验 dependencies range），并按需 bump 本包版本。

> 依赖 `@dsh-suite` scope（需先注册 npm org）、Node >= 22。
