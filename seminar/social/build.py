from playwright.sync_api import sync_playwright
import pathlib
HERE = pathlib.Path(__file__).parent
JOBS = [("story.html","story-1080x1920.png",1080,1920),
        ("feed.html","feed-1080x1350.png",1080,1350)]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    for src,out,w,h in JOBS:
        pg = b.new_page(viewport={"width":w,"height":h})
        pg.goto("file://" + str(HERE/src)); pg.wait_for_timeout(600)
        over = pg.evaluate("""()=>{const c=document.querySelector('.in');
          return [c.scrollHeight, c.clientHeight];}""")
        pg.screenshot(path=str(HERE/out))
        print(out, "中身 %d / 枠 %d" % (over[0],over[1]),
              "→ OK" if over[0] <= over[1]+2 else "→ ★はみ出し %dpx" % (over[0]-over[1]))
        pg.close()
    b.close()
