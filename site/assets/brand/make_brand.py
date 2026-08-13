#!/usr/bin/env python3
"""Generate dsh-suite X(Twitter) brand assets: avatar.png + banner.png."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

OUT = os.path.dirname(os.path.abspath(__file__))

BG       = (11, 15, 26)
BG_SOFT  = (15, 21, 38)
GREEN    = (52, 211, 153)
GREEN_DK = (5, 46, 34)
TEXT     = (230, 234, 242)
MUTED    = (148, 163, 184)

def _font(candidates, size):
    for p in candidates:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

F = "/System/Library/Fonts"
FS = "/System/Library/Fonts/Supplemental"
def rounded(size):  return _font([f"{FS}/Arial Rounded Bold.ttf", f"{FS}/Arial Bold.ttf"], size)
def bold(size):     return _font([f"{FS}/Arial Bold.ttf", f"{F}/Helvetica.ttc"], size)
def black(size):    return _font([f"{FS}/Arial Black.ttf", f"{FS}/Arial Bold.ttf"], size)
def mono(size):     return _font([f"{F}/Menlo.ttc", f"{F}/Monaco.ttf"], size)

def vgrad(w, h, top, bottom):
    img = Image.new("RGB", (w, h), top)
    px = img.load()
    for y in range(h):
        t = y / max(1, h - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = c
    return img

def draw_centered(d, cx, cy, text, font, fill):
    bbox = d.textbbox((0, 0), text, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - w / 2 - bbox[0], cy - h / 2 - bbox[1]), text, font=font, fill=fill)
    return w, h

def rounded_rect(d, box, radius, fill):
    d.rounded_rectangle(box, radius=radius, fill=fill)

def make_avatar():
    S = 2
    W = H = 400 * S
    img = vgrad(W, H, BG, (16, 22, 38))
    d = ImageDraw.Draw(img, "RGBA")

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W*0.5 - 210*S, H*0.44 - 210*S, W*0.5 + 210*S, H*0.44 + 210*S],
               fill=(52, 211, 153, 26))
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    d = ImageDraw.Draw(img, "RGBA")

    tile = 200 * S
    cx = W // 2
    tile_top = int(H * 0.30)
    rounded_rect(d, [cx - tile//2, tile_top, cx + tile//2, tile_top + tile], 44*S, GREEN)

    dsh_font = black(96 * S)
    dsh_bbox = d.textbbox((0, 0), "dsh", font=dsh_font)
    dsw = dsh_bbox[2] - dsh_bbox[0]; dshh = dsh_bbox[3] - dsh_bbox[1]
    d.text((cx - dsw/2 - dsh_bbox[0], tile_top + tile/2 - dshh/2 - dsh_bbox[1]),
           "dsh", font=dsh_font, fill=GREEN_DK)

    suite_font = bold(58 * S)
    suite_y = tile_top + tile + 34 * S
    draw_centered(d, cx, suite_y + 20*S, "s u i t e", suite_font, TEXT)

    img = img.convert("RGB").resize((400, 400), Image.LANCZOS)
    img.save(f"{OUT}/avatar.png", optimize=True)
    print("avatar.png 400x400 saved")

def make_banner():
    S = 2
    W, H = 1500 * S, 500 * S
    img = vgrad(W, H, BG, (17, 23, 40))
    d = ImageDraw.Draw(img, "RGBA")

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W*0.62, -H*0.4, W*1.1, H*1.0], fill=(52, 211, 153, 22))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    d = ImageDraw.Draw(img, "RGBA")

    mx = 100 * S

    btile = 66 * S
    rounded_rect(d, [mx, 48*S, mx + btile, 48*S + btile], 14*S, GREEN)
    bdsh = black(38 * S)
    bb = d.textbbox((0, 0), "dsh", font=bdsh)
    bw, bh = bb[2]-bb[0], bb[3]-bb[1]
    d.text((mx + btile/2 - bw/2 - bb[0], 48*S + btile/2 - bh/2 - bb[1]), "dsh", font=bdsh, fill=GREEN_DK)
    suite_font = bold(46 * S)
    d.text((mx + btile + 22*S, 48*S + 6*S), "suite", font=suite_font, fill=TEXT)

    line1 = "Stop scrolling the dsh-plugin topic."
    line2a = "Find plugins that "
    line2b = "still work."
    f_slogan = bold(54 * S)
    y1 = 190 * S
    d.text((mx, y1), line1, font=f_slogan, fill=TEXT)
    y2 = y1 + 66 * S
    d.text((mx, y2), line2a, font=f_slogan, fill=TEXT)
    l2a_w = d.textlength(line2a, font=f_slogan)
    d.text((mx + l2a_w, y2), line2b, font=f_slogan, fill=GREEN)

    url = "whyihaveyou.github.io/dsh-suite"
    f_url = mono(30 * S)
    d.text((mx, 366 * S), url, font=f_url, fill=GREEN)

    d.line([mx, 132*S, mx + 280*S, 132*S], fill=(52, 211, 153, 120), width=3*S)

    img = img.convert("RGB").resize((1500, 500), Image.LANCZOS)
    img.save(f"{OUT}/banner.png", optimize=True)
    print("banner.png 1500x500 saved")

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    make_avatar()
    make_banner()
