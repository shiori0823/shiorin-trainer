from playwright.sync_api import sync_playwright
import pathlib, os
HERE = pathlib.Path(__file__).parent
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    for src, out in [("sheet-01.html","worksheet-01-dekita.pdf"),
                     ("sheet-02.html","worksheet-02-tsunageru.pdf")]:
        pg = b.new_page()
        pg.goto("file://" + str(HERE / src))
        pg.wait_for_timeout(500)
        pg.pdf(path=str(HERE / out), format="A4", print_background=True,
               margin={"top":"0","right":"0","bottom":"0","left":"0"})
        # はみ出し確認
        print(out, "content height(mm):",
              round(pg.evaluate("()=>document.body.scrollHeight")/ (96/25.4), 1))
        pg.close()
    b.close()
