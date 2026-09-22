"""名刺を印刷用PDFに書き出し、はみ出しとQRの読み取りを検査する。"""
from playwright.sync_api import sync_playwright
import pathlib, subprocess, sys
HERE = pathlib.Path(__file__).parent
K = 96 / 25.4  # px per mm

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_page(viewport={"width": int(97*K), "height": int(61*K)})
    pg.goto("file://" + str(HERE / "card.html")); pg.wait_for_timeout(500)

    # メールアドレスは mail.txt から差し込む（このリポジトリは公開なので入れない）
    mf = HERE / "mail.txt"
    addr = mf.read_text().strip() if mf.exists() else ""
    if addr:
        pg.evaluate("a=>{document.getElementById('mail').textContent=a}", addr)
    else:
        print("※ mail.txt がないので、メール欄は空のまま書き出します")

    pg.pdf(path=str(HERE / "meishi.pdf"), width="97mm", height="61mm",
           print_background=True,
           margin={"top":"0","right":"0","bottom":"0","left":"0"})

    # 安全領域からのはみ出し検査
    over = pg.evaluate("""()=>{const out=[];
      document.querySelectorAll('.card').forEach((c,i)=>{
        const box=c.querySelector('.in').getBoundingClientRect();
        c.querySelectorAll('.in *').forEach(el=>{
          const r=el.getBoundingClientRect();
          if(!r.width&&!r.height) return;
          if(r.bottom>box.bottom+1||r.right>box.right+1||r.left<box.left-1)
            out.push([i+1, el.className||el.tagName,
                      +(r.bottom-box.bottom).toFixed(1), +(r.right-box.right).toFixed(1)]);
        });});
      return out;}""")
    b.close()

for pg_no, cls, db, dr in over:
    print("★ %d面 %-8s 下に%.1fmm / 右に%.1fmm はみ出し" % (pg_no, cls, db/K, dr/K))
if not over:
    print("安全領域  → OK（表・裏とも収まっています）")

# QRが印刷解像度で読めるか
subprocess.run(["pdftoppm", "-r", "600", "-png", "-f", "2", "-l", "2",
                str(HERE/"meishi.pdf"), str(HERE/"_chk")], check=True)
shot = sorted(HERE.glob("_chk*.png"))[0]
import cv2
img = cv2.imread(str(shot))
data, pts, _ = cv2.QRCodeDetector().detectAndDecode(img)
print("QR 600dpi →", data if data else "★読み取れません")
for f in HERE.glob("_chk*.png"): f.unlink()
sys.exit(0 if data and not over else 1)
