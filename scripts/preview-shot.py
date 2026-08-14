#!/usr/bin/env python3
"""拍摄 4 张站点预览图（首页中英 + Star 榜中英）via Playwright（chromium）。"""
import sys, os
from playwright.sync_api import sync_playwright

base = sys.argv[1]      # http://127.0.0.1:PORT
outdir = sys.argv[2]

os.makedirs(outdir, exist_ok=True)

SHOTS = [
    ("home-en",   f"{base}/?lang=en",            "en-US", 1280, 2400),
    ("home-zh",   f"{base}/zh.html",             "zh-CN", 1280, 2400),
    ("stars-en",  f"{base}/stars.html?lang=en",  "en-US", 1280, 3400),
    ("stars-zh",  f"{base}/stars-zh.html",       "zh-CN", 1280, 3400),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, url, locale, w, h in SHOTS:
        page = browser.new_page(viewport={"width": w, "height": h}, locale=locale)
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.screenshot(path=os.path.join(outdir, f"{name}.png"))
        page.close()
    browser.close()

print(f"preview-shot: {len(SHOTS)} screenshots -> {outdir}")
