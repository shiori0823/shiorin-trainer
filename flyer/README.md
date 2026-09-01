# 私の身体、おつかれさま。— チラシ

A4 1枚のワークショップ告知チラシです。

- `flyer.html` … 原稿（HTML/CSS）。文言や日時の修正はこちらを編集します。
- `flyer.pdf` … 印刷・配布用のA4 1ページPDF。

## PDFの再生成

日本語フォント（Noto Sans JP / Zen Old Mincho）をインストールしたうえで、
Chromium のヘッドレス印刷でHTMLからPDFを書き出します。

```sh
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=flyer.pdf flyer.html
```
