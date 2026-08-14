#!/usr/bin/env python3
"""Render one 1200x400 'dsh-suite Featured Pick' banner PNG (template, not hand-made).
Usage: render-banner.py <plugin-name> <output.png> <mascot-path> [repo]"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

F = "/System/Library/Fonts"
FS = "/System/Library/Fonts/Supplemental"

def _font(cands, size):
    for p in cands:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

def black(size): return _font([f"{FS}/Arial Black.ttf", f"{FS}/Arial Bold.ttf", f"{F}/Helvetica.ttc"], size)
def bold(size):  return _font([f"{FS}/Arial Bold.ttf", f"{F}/Helvetica.ttc"], size)
def mono(size):  return _font([f"{F}/Menlo.ttc", f"{F}/Monaco.ttf"], size)

def vgrad(w, h, top, bottom):
    img = Image.new("RGB", (w, h), top)
    px = img.load()
    for y in range(h):
        t = y / max(1, h - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = c
    return img

def main():
    name = sys.argv[1]
    out = sys.argv[2]
    mascot_path = sys.argv[3]
    repo = sys.argv[4] if len(sys.argv) > 4 else ""

    W, H = 1200, 400
    BG_TOP = (16, 22, 40)
    BG = (11, 15, 26)
    BRAND = (77, 107, 254)
    BRAND_BRIGHT = (123, 150, 255)
    TEXT = (230, 234, 242)
    MUTED = (148, 163, 184)

    img = vgrad(W, H, BG_TOP, BG).convert("RGBA")

    # brand-blue glow (right side)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W * 0.62, -H * 0.6, W * 1.2, H * 1.1], fill=(77, 107, 254, 30))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    img = Image.alpha_composite(img, glow)

    d = ImageDraw.Draw(img, "RGBA")

    # left accent bar
    d.rectangle([0, 0, 8, H], fill=BRAND)

    # top label
    d.text((56, 46), "dsh-suite Featured Pick · 2026-08", font=mono(26), fill=BRAND_BRIGHT)

    # plugin name (large, auto-shrink to fit)
    f_name = black(64)
    bbox = d.textbbox((0, 0), name, font=f_name)
    name_w = bbox[2] - bbox[0]
    max_w = 800
    if name_w > max_w:
        f_name = black(max(32, int(64 * max_w / name_w)))
    d.text((56, 132), name, font=f_name, fill=TEXT)

    # repo (muted)
    if repo:
        d.text((56, 258), "github.com/" + repo, font=mono(24), fill=MUTED)

    # Suitie mascot (circular face crop, right side)
    try:
        mascot = Image.open(mascot_path).convert("RGBA")
        m = 208
        src = min(mascot.size)
        left = (mascot.width - src) // 2
        top = int(src * 0.08)
        face = mascot.crop((left, top, left + src, top + src)).resize((m, m), Image.LANCZOS)
        mask = Image.new("L", (m, m), 0)
        ImageDraw.Draw(mask).ellipse((0, 0, m, m), fill=255)
        ring = Image.new("RGBA", (m, m), (0, 0, 0, 0))
        ImageDraw.Draw(ring).ellipse((3, 3, m - 3, m - 3), outline=(77, 107, 254, 255), width=3)
        mx = W - m - 44
        my = (H - m) // 2
        img.paste(face, (mx, my), mask)
        img.paste(ring, (mx, my), ring)
    except Exception as e:
        print("  (mascot skipped:", e, ")", file=sys.stderr)

    img.convert("RGB").save(out, "PNG", optimize=True)
    print("  banner ->", out)

if __name__ == "__main__":
    main()
