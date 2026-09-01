# 私の身体、おつかれさま。— チラシ

A4 1枚のワークショップ告知チラシです。

- `flyer/flyer.html` … 原稿（HTML/CSS）。文言・日時の修正はこちらを編集します。
- `flyer/images/shiori.jpg` … 講師紹介の写真。**現在は仮画像（グレーのプレースホルダ）が入っています。**
- `flyer/flyer.pdf` … 印刷・配布用のA4 1ページPDF。

## 写真の差し替え

講師欄の写真は `flyer/images/shiori.jpg` を読み込んでいます。
同じファイル名で本番の写真を上書きし、PDFを再生成すれば差し替わります。

縦位置が思ったところで切れていない場合は、`flyer.html` の
`.photo img { object-position: 50% 62%; }` の数値（2つめ）を調整します。
値を小さくすると上寄り、大きくすると下寄りのトリミングになります。

## PDFの再生成

日本語フォント（Noto Sans JP / Zen Old Mincho）をインストールしたうえで、
Chromium のヘッドレス印刷でHTMLからPDFを書き出します。

```sh
cd flyer
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=flyer.pdf flyer.html
```
