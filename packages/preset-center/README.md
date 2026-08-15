# @dsh-suite/preset-center — 中文开箱即用预设全家桶 / Chinese out-of-the-box preset pack

> DSH 的「应用模板」：装一个包，获得三套可直接对话干活的中文 agent 预设，零配置上手。

## 安装 / Install

```sh
dsh plugin --profile web add @dsh-suite/preset-center
```

重启 `dsh web` 后，Settings → **场景包 / Preset Packs** 即可一键应用。

## 预设 / Presets

| 预设 | 人设 | 工具 |
|---|---|---|
| 小红书笔记助手 `xiaohongshu-notes` | 爆款笔记策划与写作（选题/标题/正文/标签/封面） | 联网调研 + fs + skill + ask-user + todo（无 shell） |
| 中文文案润色 `copy-polish` | 多风格润色：去 AI 味、保原意、附修改说明 | fs + skill + ask-user + todo（无 shell） |
| 日报周报生成器 `daily-report` | 零散事项 → 结构化日报/周报（进展/问题/计划） | fs + skill + ask-user + todo（无 shell） |

## 工作原理 / How it works

- 预设 = 官方 standard 组合的定制版：换人设（系统提示词）、关 shell、按场景开/关联网搜索。
- 「一键应用」把预设写入官方 user preset root：`<dshHome>/.agent-presets/<id>/`。
- 官方 agent-presets 插件每次调用都会重新扫描该目录 —— **应用后无需重启**，直接去
  **Settings → Agent presets** 选择对应预设即可开始对话。
- 「应用前预览」显示将写入的文件 + 人设摘要 + 工具配置；可随时移除（删除 user root 下对应目录）。

## 协同 / Synergy

装了 [@dsh-suite/themes](https://www.npmjs.com/package/@dsh-suite/themes) 可在「皮肤中心」把界面换成喜欢的皮肤 —— 预设负责「能干活」，皮肤负责「好看」，开箱即用一步到位（非硬依赖）。
