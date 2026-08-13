#!/usr/bin/env python3
"""Record the create-dsh-plugin scaffold+verify demo and render a hero GIF.

No vhs / asciinema / agg / ffmpeg / brew on this Mac, so:
  - the .cast is captured directly via a PTY (asciicast v2, honest real output);
  - the .gif is rendered from the SAME captured output with Pillow + Menlo,
    accelerated (the real run takes ~15s; the GIF is ~6s, content identical).

The published command is `npm init dsh-plugin` / `npm create dsh-plugin` /
`npx create-dsh-plugin`. The demo runs the equivalent local `npx create-dsh-plugin`
(linked bin; `--no-install` is a recording-only guard so npx never touches the
registry) — output is byte-identical to the published form.
"""
import fcntl, json, os, pty, re, select, struct, subprocess, termios, time
from PIL import Image, ImageDraw, ImageFont
import imageio.v3 as iio
import numpy as np

OUT = os.path.dirname(os.path.abspath(__file__))  # the directory this script lives in (site/assets)
WORK = "/tmp/dsh-demo"

DISPLAY_CMD = "npx create-dsh-plugin demo-plugin -t tool --yes --verify"
RUN_CMD = ["npx", "--no-install", "create-dsh-plugin", "demo-plugin", "-t", "tool", "--yes", "--verify"]

# --------------------------------------------------------------------------
# 1) record -> asciicast v2
# --------------------------------------------------------------------------
def record(run_cmd, display_cmd, width=100, height=32):
    os.makedirs(WORK, exist_ok=True)
    master, slave = pty.openpty()
    fcntl.ioctl(slave, termios.TIOCSWINSZ, struct.pack("HHHH", height, width, 0, 0))
    env = {**os.environ, "TERM": "xterm-256color", "COLUMNS": str(width), "LINES": str(height)}
    proc = subprocess.Popen(run_cmd, stdin=slave, stdout=slave, stderr=slave, env=env, cwd=WORK)
    os.close(slave)
    events = [[0.0, "$ " + display_cmd + "\r\n"]]  # synthetic prompt line for the cast viewer
    last = time.time()
    while True:
        r, _, _ = select.select([master], [], [], 0.1)
        if r:
            try:
                chunk = os.read(master, 65536)
            except OSError:
                break
            if not chunk:
                break
            now = time.time()
            events.append([round(now - last, 4), chunk.decode("utf-8", "replace")])
            last = now
        elif proc.poll() is not None:
            break
    os.close(master)
    proc.wait()
    return {"version": 2, "width": width, "height": height, "stdout": events}

# --------------------------------------------------------------------------
# 2) parse capture -> ordered output lines (roles assigned by known palette)
# --------------------------------------------------------------------------
CSI = re.compile(r"\x1b\[[0-9;?]*[A-Za-z]")

def role_of(line: str) -> str:
    s = line.strip()
    if s.startswith("✔"): return "green"
    if s.startswith("✦"): return "cyan"
    if s.startswith("✘"): return "red"
    if s.startswith("⚠"): return "yellow"
    if s.startswith("["): return "dim"
    return "default"

# CJK / emoji ranges Menlo (a Latin-only font) cannot render -> tofu boxes.
# Drop them (and the now-empty parentheses they leave behind) before drawing.
CJK_EMOJI = re.compile(
    r"[\u2e80-\u2eff\u3000-\u303f\u3040-\u30ff\u31c0-\u31ef\u3200-\u32ff"
    r"\u3300-\u33ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\ufe30-\ufe4f"
    r"\uff00-\uffef\U0001f000-\U0001faff\U0001f300-\U0001f9ff]"
)

def sanitize(s: str) -> str:
    s = CJK_EMOJI.sub("", s)
    s = re.sub(r"\(\s*\)", "", s)   # empty parens left by CJK removal
    return re.sub(r"\s{2,}", " ", s).strip()

def build_tape(cast):
    raw = "".join(text for _, text in cast["stdout"])
    raw = CSI.sub("", raw)
    raw = raw.replace("\r\n", "\n")
    # lone \r = spinner overwrite; keep only the final pass. strip spinner glyphs.
    spinner = re.compile(r"[\u2800-\u28ff\u2588\u258c\u2590\u2591-\u2593\u25a0]")
    rows = []
    for seg in raw.split("\n"):
        seg = seg.split("\r")[-1]
        line = spinner.sub("", seg).rstrip()
        s = line.strip()
        if not s:
            rows.append(("blank", ""))
            continue
        if s.startswith("下一步") or s.startswith("Next steps"):
            break
        if s.startswith("template:") or s.startswith("files:"):
            continue
        if s.startswith("@deepseek-ai/"):
            continue
        if s.startswith("$ "):  # synthetic prompt line, already shown as typed command
            continue
        line = sanitize(line)
        if not line.strip():
            continue
        rows.append((role_of(line), line))

    # keep a single spacer only after the "Generated" and "--verify" headers;
    # drop all other blanks for a tight hero cascade
    out = []
    for r, t in rows:
        if r == "blank":
            if out and out[-1][0] != "blank":
                prev_text = out[-1][1].strip()
                keep = (out[-1][0] == "cyan") or (out[-1][0] == "green" and prev_text.startswith("✔ Generated"))
                if keep:
                    out.append((r, t))
        else:
            out.append((r, t))
    return out

# --------------------------------------------------------------------------
# 3) render GIF with Pillow
# --------------------------------------------------------------------------
BG       = (13, 17, 23)
TITLE_BG = (22, 27, 34)
BORDER   = (48, 54, 61)
COLORS = {
    "default": (201, 209, 217),
    "green":   (63, 185, 80),
    "cyan":    (86, 212, 221),
    "dim":     (139, 148, 158),
    "red":     (248, 81, 73),
    "yellow":  (210, 153, 34),
}
PROMPT = (63, 185, 80)
CMD_COLOR = (230, 237, 243)

FONT_PATH = "/System/Library/Fonts/Menlo.ttc"
FONT_SIZE = 19
PAD = 26
TITLE_H = 44
LINE_H = 30

def render(typed_cmd, revealed, W, H, font):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, TITLE_H], fill=TITLE_BG)
    for i, col in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        d.ellipse([20 + i * 24, 16, 32 + i * 24, 28], fill=col)
    title = "create-dsh-plugin — scaffold + verify"
    tw = d.textlength(title, font=font)
    d.text(((W - tw) / 2, 11), title, font=font, fill=(139, 148, 158))
    d.line([0, TITLE_H, W, TITLE_H], fill=BORDER)
    y = TITLE_H + PAD
    d.text((PAD, y), "$ ", font=font, fill=PROMPT)
    cx = PAD + d.textlength("$ ", font=font)
    d.text((cx, y), typed_cmd, font=font, fill=CMD_COLOR)
    y += LINE_H
    for role, text in revealed:
        if role != "blank":
            d.text((PAD, y), text, font=font, fill=COLORS.get(role, COLORS["default"]))
        y += LINE_H
    return img

def make_gif(tape, cmd, out_path):
    font = ImageFont.truetype(FONT_PATH, FONT_SIZE, index=0)
    probe = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    maxw = max([probe.textlength(cmd, font=font)] + [probe.textlength(t, font=font) for _, t in tape])
    W = max(720, int(maxw) + 2 * PAD + 60)
    H = TITLE_H + PAD + (1 + len(tape)) * LINE_H + PAD
    frames, durations = [], []
    for i in range(1, len(cmd) + 1):
        frames.append(render(cmd[:i], [], W, H, font)); durations.append(30)
    frames.append(render(cmd, [], W, H, font)); durations.append(240)
    for i in range(1, len(tape) + 1):
        frames.append(render(cmd, tape[:i], W, H, font)); durations.append(210)
    frames.append(render(cmd, tape, W, H, font)); durations.append(1800)
    arrs = [np.asarray(im) for im in frames]
    iio.imwrite(out_path, arrs, duration=durations, loop=0)
    return W, H, len(frames), sum(durations)

def main():
    cast = record(RUN_CMD, DISPLAY_CMD)
    tape = build_tape(cast)

    cast_path = os.path.join(OUT, "demo.cast")
    with open(cast_path, "w", encoding="utf-8") as fh:
        json.dump(cast, fh, ensure_ascii=False)

    gif_path = os.path.join(OUT, "demo.gif")
    W, H, n, total = make_gif(tape, DISPLAY_CMD, gif_path)

    print(f"cast -> {cast_path}  ({len(cast['stdout'])} events)")
    print(f"gif  -> {gif_path}  {W}x{H}  {n} frames  {total/1000:.1f}s")
    print("\n--- tape ---")
    print("$", DISPLAY_CMD)
    for role, text in tape:
        print(f"  [{role:7}] {text}")

if __name__ == "__main__":
    main()
