#!/usr/bin/env python3
"""flyer.html から印刷用の flyer.pdf を書き出す。

Google Fonts を「このチラシで使う文字だけ」に絞って取得し、HTMLに埋め込んでから
Chromium で印刷する。日本語フォントが入っていない環境でも同じ仕上がりになる。

    python3 build-pdf.py
"""
import base64, os, re, subprocess, sys, tempfile, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "flyer.html")
PDF = os.path.join(HERE, "flyer.pdf")
CHROME = next((p for p in [
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome",
] if os.path.exists(p)), None)
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"

# 取得するフォント（Oswald は英数字のみ）
FAMILIES = [("Noto Sans JP", "500;700;900", None),
            ("Zen Old Mincho", "700", None),
            ("Oswald", "600", "0123456789")]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def page_text(html):
    """タグを除いた本文の文字を集める。"""
    body = html.split("<body>", 1)[1].rsplit("</body>", 1)[0]
    body = re.sub(r"<[^>]+>", "", body)
    return "".join(sorted(set(body) - set("\n\r\t")))


def font_css(html):
    chars = page_text(html)
    out = []
    for family, weights, override in FAMILIES:
        text = override if override else chars
        url = ("https://fonts.googleapis.com/css2?family="
               + family.replace(" ", "+") + ":wght@" + weights
               + "&text=" + urllib.parse.quote(text) + "&display=block")
        css = fetch(url).decode()
        for m in set(re.findall(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", css)):
            data = base64.b64encode(fetch(m)).decode()
            css = css.replace(m, "data:font/woff2;base64," + data)
        out.append(css)
    return "\n".join(out)


def main():
    if CHROME is None:
        sys.exit("Chromium が見つかりません。パスを CHROME に追加してください。")
    html = open(SRC, encoding="utf-8").read()
    # ネットワーク越しのフォント読み込みを、埋め込みに置き換える
    html = re.sub(r'<link rel="preconnect"[^>]*>\s*|<link href="https://fonts\.googleapis[^>]*>\s*', "", html)
    html = html.replace("<style>", "<style>\n" + font_css(html), 1)

    with tempfile.TemporaryDirectory() as tmp:
        build = os.path.join(HERE, ".build.html")   # 画像の相対パスを保つため同じ階層に置く
        open(build, "w", encoding="utf-8").write(html)
        try:
            subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-sandbox",
                            "--no-pdf-header-footer", f"--user-data-dir={tmp}",
                            "--virtual-time-budget=20000",
                            f"--print-to-pdf={PDF}", build], check=True,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        finally:
            os.path.exists(build) and os.remove(build)
    print(f"{PDF}  {os.path.getsize(PDF)/1024:.0f}KB")


if __name__ == "__main__":
    import urllib.parse
    main()
