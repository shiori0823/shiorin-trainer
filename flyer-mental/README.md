# パワーリフターのための実践メンタルトレーニング — A4チラシ

LPと同じ内容を、A4 1枚（210×297mm）にまとめた配布用チラシです。

- `flyer.html` … 原稿。文言の修正はこのファイルを編集します
- `flyer.pdf` … 印刷・配布用のA4 1ページPDF
- `build-pdf.py` … `flyer.html` から `flyer.pdf` を書き出すスクリプト
- `images/` … 掲載写真とQRコード

## 中身

ファーストビュー（見出し＋写真）→ 悩みのチェックリスト → 目指す3つの変化 →
講座概要＋扱うこと5項目 → 講師プロフィール → 申込みQRコード

## 申込みQRコード

`images/qr.svg` は下記URLのQRコードです。

```
https://mosh.jp/services/a83404f4de13474387bddb855afa44d5?openExternalBrowser=1
```

URLを変える場合は、QRコードも作り直してください。

```sh
pip install segno
python3 -c "import segno; segno.make('新しいURL', error='m').save('images/qr.svg', scale=1, border=0, dark='#540E19', light=None)"
```

## PDFの作り直し

文言や写真を変えたら、下のコマンドでPDFを書き出し直します。

```sh
cd flyer-mental
python3 build-pdf.py
```

このスクリプトは、チラシで使う文字だけに絞ったフォントを Google Fonts から
取得してHTMLに埋め込んでから、Chromium で印刷します。日本語フォントが
入っていない環境でも、同じ仕上がりのPDFになります。

## レイアウトについて

A4 1ページちょうど（297mm）に収まるよう、各セクションの高さを積み上げて
調整しています。**文言を増やすと1ページに収まらなくなる**ので、
文字を足したときは必ずPDFを作り直して、1ページのままか確認してください。

各セクションの高さの目安：

| セクション | 高さ |
|---|---|
| ファーストビュー | 68mm |
| 悩み | 約52mm |
| 3つの変化 | 約45mm |
| 講座概要＋扱うこと | 約59mm（余白を吸収する可変部分） |
| 講師 | 約32mm |
| 申込み | 約41mm |

## デザイン

LPと同じ配色です。白を基調に、ワインレッド `#7A1524`（濃 `#540E19`）が主役、
黒 `#141416` は本文とごく一部の差し色のみ。書体も LP と揃えて
Noto Sans JP / Zen Old Mincho / Oswald を使っています。
