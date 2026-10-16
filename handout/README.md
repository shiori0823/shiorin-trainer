# 正しく立つ — 助産院イベント配布プリント

A4 1枚の配布用プリントです。チラシ（`../flyer/`）と同じ配色・書体で作っています。

- `handout.html` … 原稿（HTML/CSS）。文言の修正はこちらを編集します。
- `handout.pdf` … 印刷・配布用のA4 1ページPDF。
- `make_qr.py` … QRコードを作るスクリプト。
- `images/` … 使用している画像とQRコード。

## QRコードの入れ方（※現在は仮の枠です）

1. `make_qr.py` を開き、`URLS` の2か所にURLを入れる

   ```python
   URLS = {
       "qr-instagram": "https://www.instagram.com/xxxxxxxx/",
       "qr-line":      "https://lin.ee/xxxxxxx",
   }
   ```

2. QRコードを作り直す

   ```sh
   pip install segno
   python3 make_qr.py
   ```

3. PDFを作り直す（下記）

URLが空のままだと「QRコード／URLをお待ちしています」という仮の枠が出力されます。

## PDFの再生成

日本語フォント（Zen Maru Gothic / Klee One）をインストールしたうえで、
Chromium のヘッドレス印刷でHTMLからPDFを書き出します。

```sh
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=handout.pdf handout.html
```
