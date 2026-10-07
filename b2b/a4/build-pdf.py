"""企画書をA4・1枚のPDFに書き出し、はみ出しを検査する。"""
from playwright.sync_api import sync_playwright
import pathlib, sys
HERE = pathlib.Path(__file__).parent
K = 96 / 25.4
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_page()
    pg.goto("file://" + str(HERE / "sheet.html")); pg.wait_for_timeout(500)
    pg.pdf(path=str(HERE / "proposal-a4.pdf"), format="A4", print_background=True,
           margin={"top":"0","right":"0","bottom":"0","left":"0"})
    sh, ch = pg.evaluate("()=>[document.body.scrollHeight, document.body.clientHeight]")
    b.close()
over = (sh - ch) / K
if sh > ch + 1:
    print("★ %.1fmm はみ出しています" % over); sys.exit(1)
print("中身 %.1fmm / 枠 %.1fmm → OK" % (sh/K, ch/K))
