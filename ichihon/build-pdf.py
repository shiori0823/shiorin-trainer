"""ここぞの一本 準備シートをPDFに書き出し、はみ出しを検査する。"""
from playwright.sync_api import sync_playwright
import pathlib, sys
HERE = pathlib.Path(__file__).parent
K = 96 / 25.4
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_page()
    pg.goto("file://" + str(HERE / "sheet.html")); pg.wait_for_timeout(500)
    pg.pdf(path=str(HERE / "ichihon-sheet.pdf"), format="A4", print_background=True,
           margin={"top":"0","right":"0","bottom":"0","left":"0"})
    m = pg.evaluate("()=>[...document.querySelectorAll('.sheet')].map(s=>[s.scrollHeight,s.clientHeight])")
    b.close()
ok = True
for i,(sh,ch) in enumerate(m,1):
    if sh > ch + 1:
        print("★ %d枚目 %.1fmm はみ出し" % (i,(sh-ch)/K)); ok = False
    else:
        print("%d枚目 %.1fmm / %.1fmm → OK" % (i, sh/K, ch/K))
sys.exit(0 if ok else 1)
