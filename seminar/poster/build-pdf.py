from playwright.sync_api import sync_playwright
import pathlib
HERE = pathlib.Path(__file__).parent
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_page()
    pg.goto("file://" + str(HERE / "poster.html")); pg.wait_for_timeout(600)
    pg.pdf(path=str(HERE/"seminar-poster.pdf"), format="A4", print_background=True,
           margin={"top":"0","right":"0","bottom":"0","left":"0"})
    m = pg.evaluate("""()=>{const s=document.querySelector('.sheet');
      return [s.scrollHeight, s.clientHeight];}""")
    k = 96/25.4
    print("中身の高さ %.1fmm / 枠の高さ %.1fmm" % (m[0]/k, m[1]/k),
          "→ OK" if m[0] <= m[1] + 1 else "→ ★はみ出しています（%.1fmm 超過）" % ((m[0]-m[1])/k))
    b.close()
