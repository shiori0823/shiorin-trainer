# 正しく立つ — 助産院イベント配布プリント

A4 1枚の配布用プリントです。チラシ（`../flyer/`）と同じ配色・書体で作っています。

- `handout.html` … 原稿（HTML/CSS）。文言の修正はこちらを編集します。
- `handout.pdf` … 印刷・配布用のA4 1ページPDF。
- `images/qr-instagram.png` … Instagram（@nolimits.shiorin）のQRコード。
- `images/qr-line.png` … ノーリミッツ岡山 公式LINEのQRコード。
- `images/shiorin-portrait.jpg` … 講師の丸写真。

## QRコードについて

いただいた公式のQR画像（LINE／Instagramそれぞれの配布用画像）から、
コード部分だけを切り出して、規格どおりの余白（4モジュール分）を付け直したものです。
紙面では **28mm角** で配置しています。

差し替える場合は、同じファイル名で新しい画像を置いてPDFを作り直してください。
元画像に余白がほとんどない場合は、周囲に白い余白を足してから使うと読み取りが安定します。

## PDFの再生成

日本語フォント（Zen Maru Gothic / Klee One）をインストールしたうえで、
Chromium のヘッドレス印刷でHTMLからPDFを書き出します。

```sh
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=handout.pdf handout.html
```
