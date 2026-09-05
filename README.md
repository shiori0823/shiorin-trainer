# 私の身体、おつかれさま。— チラシ

> このリポジトリには制作物が2つあります。
> - `flyer/` … 「私の身体、おつかれさま。」ワークショップのA4チラシ（以下の内容）
> - `lp/` … パワーリフターのための実践メンタルトレーニング LP（`lp/README.md`）

A4 1枚のワークショップ告知チラシです。

- `flyer/flyer.html` … 原稿（HTML/CSS）。文言・日時の修正はこちらを編集します。
- `flyer/flyer.pdf` … 印刷・配布用のA4 1ページPDF。
- `flyer/images/佐藤 栞-3 2.JPEG` … 講師写真の元データ（4000×5000）。
- `flyer/images/shiori-crop.jpg` … チラシに使っているトリミング済みの写真。

## デザインの方針

妊娠中・産後の方が見て安心できるよう、丸ゴシック（Zen Maru Gothic）と
手書き風（Klee One）、生成り・やさしいピンク・セージグリーンの配色で
角の丸い柔らかいレイアウトにしています。

## 写真の差し替え・トリミングの調整

チラシは `flyer/images/shiori-crop.jpg`（縦横比 0.92）を読み込んでいます。
別の写真に変える場合は、元データを `flyer/images/` に置いて、
下のスクリプトの切り取り範囲を調整して作り直します。

```python
from PIL import Image
im = Image.open('元の写真.JPEG'); W, H = im.size
# 左, 上, 右, 下 を全体に対する割合で指定（縦横比 0.92 になるように）
c = im.crop((int(.195*W), int(.335*H), int(.770*W), int(.835*H)))
c.resize((1380, int(1380*c.size[1]/c.size[0])), Image.LANCZOS) \
 .save('shiori-crop.jpg', quality=88, optimize=True)
```

## PDFの再生成

日本語フォント（Zen Maru Gothic / Klee One）をインストールしたうえで、
Chromium のヘッドレス印刷でHTMLからPDFを書き出します。

```sh
cd flyer
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=flyer.pdf flyer.html
```

## 公開（GitHub Pages）

`lp/` を GitHub Pages で公開しています。

- 公開URL: https://shiori0823.github.io/shiorin-trainer/
- 公開元ブランチ: `claude/powerlifter-mental-training-lp-1o591b` / フォルダ: `/ (root)`

リポジトリ直下の `index.html` は `lp/` へ転送するだけのページです。
短いURLで案内できるように置いています。`.nojekyll` は GitHub Pages の
自動変換を止めるための空ファイルです。

LPを更新したいときは `lp/` の中を編集してこのブランチに push すれば、
1〜2分で公開ページにも反映されます。
