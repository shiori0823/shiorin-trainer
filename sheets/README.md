# ワークシートの配布ページ

```
https://shiori0823.github.io/shiorin-trainer/sheets/
```

QRコード：`sheets/qr.png`（35モジュール・ECC M。600dpiで読み取り確認済み）

---

## なぜ1枚のページにしたか

PDFのURLを直接配ると、こうなる。

```
.../seminar/worksheets/worksheet-01-kokusupo.pdf
.../seminar/worksheets/worksheet-02-kokusupo.pdf
```

**口頭では伝えられないし、2本になる。**
`/sheets/` なら1本で済んで、QRも1つでいい。

## 載せているもの

| | |
|---|---|
| 国スポ振り返り編 | 01・02（試合の振り返り用） |
| できたのかけら編 | 01・02（試合がない時期用） |

**4枚とも載せてある。** 月によって使う版が変わってもページを直さなくていい。
再参加の方が、前の回のシートも取れる。

## 配り方

```
当日　→　プレゼントとして紙で渡す
最後　→　「次の試合でも使えます」とURL（またはQR）を出す
あとで→　フォローのメッセージにURLを入れる
```

**紙で渡したうえで、URLも出す。** 無くしても取り直せるし、
次の試合のときに自分で印刷して使える。

## 直すとき

PDFを差し替えるときは `seminar/worksheets/` 側を作り直す。
このページはリンクを張っているだけなので、**ファイル名が同じなら直さなくていい。**

```
cd seminar/worksheets && python3 build-pdf.py
```
