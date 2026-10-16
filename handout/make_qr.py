"""QRコードを作り直すスクリプト。
下の URLS を書き換えて `python3 make_qr.py` を実行すると
images/qr-instagram.svg と images/qr-line.svg が作られます。
"""
import pathlib
import segno

URLS = {
    # ↓↓↓ ここに本番のURLを入れてください ↓↓↓
    "qr-instagram": "",   # 例: https://www.instagram.com/xxxxxxxx/
    "qr-line":      "",   # 例: https://lin.ee/xxxxxxx
}

INK = "#504740"
OUT = pathlib.Path(__file__).parent / "images"
OUT.mkdir(exist_ok=True)

PLACEHOLDER = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="2" y="2" width="96" height="96" rx="8" fill="#fff"
        stroke="#f8ddd5" stroke-width="2.5" stroke-dasharray="6 4"/>
  <text x="50" y="47" text-anchor="middle" font-family="sans-serif"
        font-size="11" fill="#c9705f">QRコード</text>
  <text x="50" y="62" text-anchor="middle" font-family="sans-serif"
        font-size="8" fill="#b9b0a4">URL をお待ちしています</text>
</svg>
"""

for name, url in URLS.items():
    path = OUT / f"{name}.svg"
    if url.strip():
        segno.make(url.strip(), error="m").save(
            str(path), kind="svg", scale=10, border=2, dark=INK, light="#ffffff"
        )
        print(f"{path.name}: {url}")
    else:
        path.write_text(PLACEHOLDER, encoding="utf-8")
        print(f"{path.name}: （URL未設定のため仮の枠を出力）")
