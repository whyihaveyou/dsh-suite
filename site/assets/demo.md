# demo.gif — create-dsh-plugin hero demo（录制与复现说明）

本目录含 dsh-suite README hero 区演示素材：`demo.gif`（动画）+ `demo.cast`（asciicast v2 原始录制）。
This directory holds the hero demo for the dsh-suite README: `demo.gif` (animation) + `demo.cast` (raw asciicast v2 recording).

## 产物 / Artifacts

| 文件 / File | 说明 / What it is | 时长 / Duration | 大小 / Size |
|---|---|---|---|
| `demo.gif` | 970×516 动画，GitHub-dark 终端风格，循环播放 | ~6.5s | ~215 KB |
| `demo.cast` | asciicast v2 原始录制（真实输出 + 真实时序） | ~15s（真实） | ~2 KB |

`demo.gif` 内容：一条命令 `npx create-dsh-plugin demo-plugin -t tool --yes --verify` →
生成 tool 插件 → `--verify` 四步（install / build / dsh plugin add / dump-config）全绿 →
`✔ VERIFY PASSED`。这是 `create-dsh-plugin` 真实跑出的输出。

`demo.gif` shows one command scaffolding a tool plugin and the `--verify` four-step smoke
(install / build / `dsh plugin add` / `dump-config`) all green, ending in `✔ VERIFY PASSED`.

## 录制方法 / How it was recorded

本机无 `vhs` / `asciinema` / `agg` / `ffmpeg` / `brew`（macOS，arm64），所以不用任何第三方录屏工具：

1. **`.cast`**：Python `pty` 直接跑真实命令，捕获带时序的 `(delay, text)` 事件 → 存成 asciicast v2 JSON。
2. **`.gif`**：从**同一次捕获**解析出终端文本行，用 Pillow + 系统 Menlo 字体逐帧绘制（暗色终端、
   标题栏、交通灯、绿色 ✔ / 青色 ✦ / 灰色 `[n/4]`），再用 imageio 写出动画 GIF。

No `vhs` / `asciinema` / `agg` / `ffmpeg` / `brew` on this Mac (arm64), so no third-party recorder:

1. **`.cast`** — a Python `pty` runs the real command and captures timed `(delay, text)` events → asciicast v2 JSON.
2. **`.gif`** — the same capture is parsed into terminal lines, redrawn frame-by-frame with Pillow + the
   system Menlo font (dark terminal, title bar, traffic lights, green ✔ / cyan ✦ / grey `[n/4]`), then encoded
   to an animated GIF via imageio.

> 命令行的 `$ …` 提示行是为可读性前置的合成行；其下所有输出均为命令真实输出。GIF 把 ~15s 的真实运行
> 加速到 ~6.5s，并**删去输出里的 CJK 括号注记**（如 `(生成完成)` / `(验证通过)`）——因为 Menlo 是纯
> 拉丁字体、无 CJK 字形，渲染会变豆腐块。其余内容逐字一致。The `$ …` prompt line is prepended for
> readability; everything below is the command's real output. The GIF accelerates the ~15s real run to ~6.5s
> and **drops the CJK parentheticals** (e.g. `(生成完成)` / `(验证通过)`) because Menlo has no CJK glyphs
> (they would render as tofu boxes). Everything else is verbatim.

## 复现 / Reproduce

```sh
# 前置：本地 link 脚手架（未发布前）；从 dsh-suite 仓库根目录执行 / run from the repo root
cd packages/create-dsh-plugin && npm link

# 真实跑一遍（等价于发布后的 npm init dsh-plugin / npm create dsh-plugin / npx create-dsh-plugin）
cd /tmp/dsh-demo
npx --no-install create-dsh-plugin demo-plugin -t tool --yes --verify
```

重新生成素材 / regenerate the assets（本机脚本，Pillow + imageio，与本目录 `make_demo.py` 同源）：

```sh
cd site/assets && python3 make_demo.py     # 重新录制并渲染 demo.cast + demo.gif
```

或装好 `agg` 后从 `.cast` 一键转 GIF（无需重跑命令）:

```sh
agg demo.cast demo.gif        # asciinema 官方转换器，1:1 还原真实时序
```

## 浏览器播放 / Browser playback

`demo.gif` 是标准 GIF89a + NETSCAPE 循环扩展，任意浏览器 `<img src="demo.gif">` 可直接播放
（已用 Pillow 与 imageio 双向解码验证：61 帧、循环、6.5s）。

It is a standard GIF89a with the NETSCAPE loop extension; any browser plays it via a plain `<img>` tag
(verified by round-trip decode with both Pillow and imageio: 61 frames, looping, 6.5s).
