const pptxgen = require("pptxgenjs");

// ---- LP・チラシ・個別相談スライドと同じ配色 ----
const C = { wine:"7A1524", deep:"540E19", bright:"A02236", ink:"141416", soft:"3B3634",
            muted:"6B6360", white:"FFFFFF", warm:"F5F1F0", rose:"FAF3F4", line:"E1D9D9",
            pink:"F0B9C3", pale:"F2E7E9", grey:"8C8380", greyBg:"EFEBEA" };
const F  = "Yu Gothic";   // 本文＝ゴシック体
const FS = "Yu Mincho";   // 見出し＝明朝体
const W = 10, H = 5.625;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "しおりん";
pres.title = "できたのかけらワークショップ｜90分セミナー";

let no = 0;
function slide(phase, { dark = false, bg, numLeft = false } = {}) {
  no++;
  const s = pres.addSlide();
  s.background = { color: bg || (dark ? C.deep : C.white) };
  if (phase) s.addText(phase, { isTextBox:true, x:0.5, y:0.26, w:7, h:0.3, margin:0,
    fontFace:F, fontSize:12, bold:true, charSpacing:2, color: dark ? C.pink : C.wine });
  s.addText(String(no), { isTextBox:true, x: numLeft ? 0.5 : W-1.1, y:H-0.34, w:0.6, h:0.28, margin:0,
    align: numLeft ? "left" : "right", fontFace:F, fontSize:11, color: dark ? "8A6870" : C.muted });
  return s;
}
const T = (o) => Object.assign({ isTextBox:true, fontFace:F, margin:0, color:C.ink }, o);

// 見出し（明朝）
function title(s, text, { y=0.85, w=9, size=32, color=C.ink, x=0.5, align="left", h=1.3 } = {}) {
  s.addText(text, T({ x, y, w, h, fontSize:size, bold:true, lineSpacing:size*1.45,
    color, align, valign:"top", fontFace:FS }));
}
// 本文
function body(s, text, { x=0.5, y=1.95, w=9, h=2.6, size=18, color=C.soft, ls=30, bold=false } = {}) {
  s.addText(text, T({ x, y, w, h, fontSize:size, color, lineSpacing:ls, bold }));
}
// 枠つきの行（カード）
function card(s, items, { x=0.5, y=2.2, w=9, size=18, gap=0.62, tint=C.rose, col=C.soft,
                          bold=false, pad=0.32 } = {}) {
  items.forEach((t, i) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: y + i*gap, w, h: gap-0.1,
      fill:{ color: tint }, line:{ color: tint }, rectRadius:0.06 });
    s.addText(t, T({ x: x+pad, y: y + i*gap, w: w-pad*2, h: gap-0.1, fontSize:size,
      color: col, valign:"middle", bold }));
  });
}
// ・つきの箇条書き
function bullets(s, items, { x=0.5, y=2.0, w=9, size=18, gap=0.5, color=C.soft } = {}) {
  items.forEach((t, i) => {
    s.addText("・", T({ x, y: y + i*gap, w:0.32, h:0.44, fontSize:size, color:C.wine, valign:"middle", bold:true }));
    s.addText(t, T({ x: x+0.3, y: y + i*gap, w: w-0.3, h:0.44, fontSize:size, color, valign:"middle" }));
  });
}
// 番号つきの行
function numbered(s, items, { x=0.5, y=2.1, w=8.2, size=18, gap=0.62, dark=false } = {}) {
  items.forEach((t, i) => {
    s.addShape(pres.ShapeType.ellipse, { x, y: y + i*gap + 0.07, w:0.38, h:0.38,
      fill:{ color: dark ? C.bright : C.wine }, line:{ color: dark ? C.bright : C.wine } });
    s.addText(String(i+1), T({ x, y: y + i*gap + 0.07, w:0.38, h:0.38, fontSize:14, bold:true,
      color:C.white, align:"center", valign:"middle" }));
    s.addText(t, T({ x: x+0.58, y: y + i*gap, w, h:0.52, fontSize:size,
      color: dark ? C.pale : C.soft, valign:"middle" }));
  });
}
// ワインレッドの帯（強調の一言）
function band(s, text, { x=0.5, y=4.3, w=9, h=0.95, size=20, mincho=true, fill=C.deep } = {}) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill:{ color:fill }, line:{ color:fill }, rectRadius:0.08 });
  s.addText(text, T({ x: x+0.4, y, w: w-0.8, h, fontSize:size, bold:true, color:C.white,
    valign:"middle", lineSpacing:size*1.4, fontFace: mincho ? FS : F }));
}
// ❌ / ✅ の対
function xo(s, wrong, right, { y=1.95, noteY=null, note=null } = {}) {
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:9, h:1.0,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
  s.addText("✕", T({ x:0.85, y, w:0.5, h:1.0, fontSize:22, bold:true, color:C.grey, valign:"middle" }));
  s.addText(wrong, T({ x:1.45, y, w:7.7, h:1.0, fontSize:19, color:C.grey, valign:"middle", lineSpacing:28 }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:y+1.2, w:9, h:1.35,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.07 });
  s.addText("◯", T({ x:0.85, y:y+1.2, w:0.5, h:1.35, fontSize:22, bold:true, color:C.pink, valign:"middle" }));
  s.addText(right, T({ x:1.45, y:y+1.2, w:7.7, h:1.35, fontSize:20, bold:true, color:C.white,
    valign:"middle", lineSpacing:30, fontFace:FS }));
  if (note) s.addText(note, T({ x:0.5, y: noteY || (y+2.75), w:9, h:0.9, fontSize:17,
    color:C.soft, lineSpacing:28 }));
}
// WORK スライド（濃いワインレッド）
function work(n, heading, lines, note) {
  const s = slide("WORK", { dark:true, numLeft:true });
  s.addText(`WORK ${n}`, T({ x:0.5, y:1.0, w:4, h:0.5, fontSize:22, bold:true,
    color:C.pink, charSpacing:3 }));
  title(s, heading, { y:1.7, w:9, size:34, color:C.white });
  if (lines) s.addText(lines, T({ x:0.5, y:3.35, w:9, h:1.2, fontSize:19, color:C.pale, lineSpacing:32 }));
  if (note) {
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y:4.5, w:9, h:0.75,
      fill:{ color:C.bright }, line:{ color:C.bright }, rectRadius:0.07 });
    s.addText(note, T({ x:0.9, y:4.5, w:8.2, h:0.75, fontSize:19, bold:true, color:C.white, valign:"middle" }));
  }
  return s;
}

async function build() {
  let s;

  /* ============ はじめに（1–5） ============ */
  s = slide(null, { bg:C.warm });
  s.addText("「私、ちゃんと進んでた」に気づく90分", T({ x:0.7, y:0.85, w:8.6, h:0.45,
    fontSize:18, bold:true, color:C.wine, charSpacing:1 }));
  title(s, "できたのかけら\nワークショップ", { x:0.7, y:1.45, w:8.6, size:46 });
  s.addShape(pres.ShapeType.rect, { x:0.7, y:3.55, w:1.3, h:0.04,
    fill:{ color:C.wine }, line:{ color:C.wine } });
  s.addText("絶対に取りたい記録、勝ちたい試合があるパワーリフターへ。",
    T({ x:0.7, y:3.85, w:8.6, h:0.45, fontSize:18, bold:true, color:C.soft }));
  s.addText("今日は、「メンタルを強くする方法」ではなく、\n" +
            "「自分のメンタルをどう扱うか」を一緒に考えていきます。",
    T({ x:0.7, y:4.4, w:8.6, h:0.9, fontSize:17, color:C.muted, lineSpacing:28 }));

  s = slide("はじめに");
  title(s, "こんな経験、ありませんか？", { size:32 });
  bullets(s, ["練習では挙がったのに、試合では取れない",
              "大事な一本ほど「失敗したらどうしよう」と思う",
              "一本落とすと、その後まで引きずる",
              "ライバルや順位を見ると焦る",
              "試合前になると「もっとやらなきゃ」と不安になる",
              "結果が出ないと、自分まで否定したくなる"],
    { y:1.82, size:17.5, gap:0.47 });
  band(s, "1つでもあったら、今日の90分はあなたのための時間です。",
    { y:4.68, h:0.57, size:18 });

  s = slide("はじめに");
  title(s, "今日のゴール", { size:32 });
  s.addText("90分後、", T({ x:0.5, y:1.9, w:9, h:0.4, fontSize:18, color:C.soft }));
  card(s, ["「もっとメンタルを強くしなきゃ」　ではなく"],
    { y:2.4, w:9, size:18, gap:0.72, tint:C.greyBg, col:C.grey });
  card(s, ["「今の自分には、すでにこんな力がある」",
           "「次の試合に向けて、私はこれをやればいい」"],
    { y:3.25, w:9, size:19, gap:0.8, tint:C.deep, col:C.white, bold:true });
  s.addText("がわかる状態を目指します。", T({ x:0.5, y:4.88, w:8.2, h:0.4,
    fontSize:18, bold:true, color:C.wine }));

  s = slide("はじめに");
  title(s, "今日、目指さないこと", { size:32 });
  card(s, ["緊張しない。", "不安にならない。", "失敗を怖がらない。", "いつもポジティブ。"],
    { y:1.95, w:9, size:20, gap:0.72, tint:C.greyBg, col:C.grey });
  s.addText("これを目指すわけではありません。", T({ x:0.5, y:4.93, w:8.2, h:0.4,
    fontSize:18, bold:true, color:C.wine }));

  s = slide("はじめに", { dark:true });
  title(s, "目指すのは、こちら", { size:30, color:C.pink, y:0.9 });
  s.addText("緊張してもいい。\n不安になってもいい。\n怖くてもいい。",
    T({ x:0.5, y:1.6, w:9, h:1.5, fontSize:26, bold:true, color:C.white,
      lineSpacing:42, fontFace:FS }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:3.45, w:9, h:1.65,
    fill:{ color:C.bright }, line:{ color:C.bright }, rectRadius:0.08 });
  s.addText("その中で、「今、自分は何をすればいい？」がわかって、\n実際に行動できる選手になる。",
    T({ x:0.9, y:3.45, w:8.2, h:1.65, fontSize:20, bold:true, color:C.white,
      valign:"middle", lineSpacing:34, fontFace:FS }));

  /* ============ しおりんのこと（6–13） ============ */
  s = slide("しおりんのこと", { bg:C.warm });
  title(s, "私もずっと「まだまだ」でした", { size:32 });
  ["競技歴11年以上","日本一","日本記録","世界大会"].forEach((t,i)=>{
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + i*2.3, y:1.95, w:2.1, h:0.72,
      fill:{ color:C.wine }, line:{ color:C.wine }, rectRadius:0.36 });
    s.addText(t, T({ x:0.5 + i*2.3, y:1.95, w:2.1, h:0.72, fontSize:15, bold:true,
      color:C.white, align:"center", valign:"middle" }));
  });
  body(s, "結果だけ見ると、「自信がある人」に見えるかもしれません。\n\n" +
          "でも、私の中にはずっと「もっと強くならなきゃ」がありました。",
    { y:3.1, h:1.8, size:19, ls:32 });

  s = slide("しおりんのこと");
  title(s, "「1位じゃなきゃ意味がない」", { size:34 });
  body(s, "1位になりたい。\nというより、「2位ではダメ」「結果を出せない私はダメ」に近かった。",
    { y:1.95, h:1.2, size:19, ls:32 });
  band(s, "競技の結果と、自分自身の価値を、\n私はかなり一緒にしていました。",
    { y:3.5, h:1.4, size:21 });

  s = slide("しおりんのこと");
  title(s, "結果が出ても「まだまだ」", { size:34 });
  body(s, "記録が出る。嬉しい。\nでも、すぐに始まる。", { y:1.9, h:0.9, size:19, ls:30 });
  card(s, ["「次はもっと」", "「まだ足りない」", "「こんなんじゃダメ」"],
    { y:2.95, w:9, size:19, gap:0.62, tint:C.rose, col:C.wine, bold:true });
  s.addText("もっと強くなりたいはずなのに、そのために自分を否定していました。",
    T({ x:0.5, y:4.85, w:8.2, h:0.45, fontSize:18, bold:true, color:C.wine }));

  s = slide("しおりんのこと");
  title(s, "2024年度のある試合", { size:34 });
  body(s, "試合前から、「2位になる気がする」という感覚がありました。\n\nだから私は、",
    { y:1.9, h:1.3, size:19, ls:32 });
  card(s, ["「私は1位になる」", "「大丈夫」", "「できる、できる、できる」"],
    { y:3.2, w:9, size:19, gap:0.6, tint:C.rose, col:C.wine, bold:true });
  s.addText("と、必死に上書きしました。", T({ x:0.5, y:4.95, w:8.2, h:0.4,
    fontSize:18, bold:true, color:C.wine }));

  s = slide("しおりんのこと");
  title(s, "でも、不安は消えなかった", { size:34 });
  body(s, "ポジティブな言葉を入れても、\n心の中にある「2位になるかもしれない」は残ったまま。\n\n" +
          "そして結果は、2位でした。",
    { y:1.9, h:2.0, size:19, ls:32 });
  band(s, "「思い込むだけで、本当にメンタルは変わるの？」",
    { y:4.15, h:0.95, size:21 });

  s = slide("しおりんのこと");
  title(s, "大事なのは「消す」ことじゃなかった", { size:30 });
  s.addText("「そんなこと考えちゃダメ」ではなく、", T({ x:0.5, y:1.85, w:9, h:0.4,
    fontSize:17, color:C.muted }));
  numbered(s, ["私は今、何を不安に思っている？",
               "なぜ、そう思う？",
               "その中で、自分に変えられることは？",
               "じゃあ私は、何をする？"],
    { y:2.4, size:19, gap:0.68 });
  s.addText("ここから、考え方が変わりました。", T({ x:0.5, y:4.95, w:8.2, h:0.4,
    fontSize:18, bold:true, color:C.wine }));

  s = slide("しおりんのこと");
  title(s, "変わったのは、試合だけじゃない", { size:32 });
  card(s, ["記録を狙う日。", "MAX重量に挑戦する日。", "何でもない普通の練習の日。"],
    { y:1.9, w:9, size:19, gap:0.6, tint:C.rose, col:C.soft });
  band(s, "全部が、楽しくなりました。", { y:3.72, h:0.76, size:22 });
  s.addText("「結果が出る日」だけではなく、\n今日積み重ねたものを見られるようになったからです。",
    T({ x:0.5, y:4.6, w:8.2, h:0.7, fontSize:16, color:C.soft, lineSpacing:26 }));

  s = slide("しおりんのこと");
  title(s, "同じ「もっと強くなりたい」でも違う", { size:30 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.85, w:4.3, h:2.35,
    fill:{ color:C.warm }, line:{ color:C.line }, rectRadius:0.08 });
  s.addText("以前", T({ x:0.8, y:2.0, w:3.7, h:0.34, fontSize:13, bold:true, charSpacing:2, color:C.muted }));
  s.addText("「今の自分じゃダメだから、\nもっと強くならなきゃ」",
    T({ x:0.8, y:2.45, w:3.75, h:1.5, fontSize:17, color:C.soft, lineSpacing:28 }));
  s.addShape(pres.ShapeType.roundRect, { x:5.2, y:1.85, w:4.3, h:2.35,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("今", T({ x:5.5, y:2.0, w:3.7, h:0.34, fontSize:13, bold:true, charSpacing:2, color:C.pink }));
  s.addText("「私はここまでやった。\nここまでできた。\nでも、まだ強くなりたい」",
    T({ x:5.5, y:2.45, w:3.75, h:1.6, fontSize:17, color:C.white, lineSpacing:28 }));
  s.addText("以前は、自己否定からの「もっと」。　　今は、向上心からの「もっと」。",
    T({ x:0.5, y:4.5, w:9, h:0.5, fontSize:19, bold:true, color:C.wine }));

  /* ============ 3つの思い込み（14–17） ============ */
  s = slide("3つの思い込み");
  s.addText("思い込み ①", T({ x:0.5, y:0.85, w:4, h:0.4, fontSize:16, bold:true, color:C.bright }));
  xo(s, "メンタルは「強い・弱い」で決まる",
       "メンタルは「どう扱うか」を練習できる",
     { y:1.55, note:"生まれつきの性格だけで決まるものではありません。", noteY:4.35 });

  s = slide("3つの思い込み");
  s.addText("思い込み ②", T({ x:0.5, y:0.85, w:4, h:0.4, fontSize:16, bold:true, color:C.bright }));
  xo(s, "不安はなくした方がいい",
       "不安は「今、何が気になっているか」を教えてくれる",
     { y:1.55, note:"なくす前に、中身を見る。そこから、できることを考える。", noteY:4.35 });

  s = slide("3つの思い込み");
  s.addText("思い込み ③", T({ x:0.5, y:0.85, w:4, h:0.4, fontSize:16, bold:true, color:C.bright }));
  xo(s, "ポジティブに考えればうまくいく",
       "自分の本音を無視したポジティブ思考は、準備にはならない",
     { y:1.55, note:"「できる」と言う前に、「私は今、何を感じている？」を知る。", noteY:4.35 });

  s = slide("3つの思い込み");
  s.addText("そして、もう1つ", T({ x:0.5, y:0.85, w:4, h:0.4, fontSize:16, bold:true, color:C.bright }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.5, w:9, h:0.72,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
  s.addText("✕", T({ x:0.85, y:1.5, w:0.5, h:0.72, fontSize:20, bold:true, color:C.grey, valign:"middle" }));
  s.addText("試合は何が起こるかわからないから、メンタルは当日勝負",
    T({ x:1.45, y:1.5, w:7.7, h:0.72, fontSize:18, color:C.grey, valign:"middle" }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:2.4, w:9, h:0.8,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.07 });
  s.addText("◯", T({ x:0.85, y:2.4, w:0.5, h:0.8, fontSize:20, bold:true, color:C.pink, valign:"middle" }));
  s.addText("試合前から、準備できることはたくさんある",
    T({ x:1.45, y:2.4, w:7.7, h:0.8, fontSize:20, bold:true, color:C.white,
      valign:"middle", fontFace:FS }));
  ["考え方","ルーティン","失敗後の行動","見るもの","やること","やらないこと"].forEach((t,i)=>{
    const col = i % 3, row = Math.floor(i/3);
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + col*3.05, y:3.45 + row*0.78, w:2.85, h:0.66,
      fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.07 });
    s.addText(t, T({ x:0.5 + col*3.05, y:3.45 + row*0.78, w:2.85, h:0.66, fontSize:17,
      bold:true, color:C.wine, align:"center", valign:"middle" }));
  });

  /* ============ できたのかけら（18–25） ============ */
  s = slide("できたのかけら");
  title(s, "ここから、体験します", { size:34 });
  s.addText("今日使うのが「できたのかけら」です。", T({ x:0.5, y:1.95, w:9, h:0.45,
    fontSize:19, color:C.soft }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:2.7, w:9, h:1.85,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("できたのかけら", T({ x:0.9, y:2.95, w:8.2, h:0.42, fontSize:14, bold:true,
    charSpacing:2, color:C.pink }));
  s.addText("結果ではなく、\n自分が積み重ねてきた小さな事実。",
    T({ x:0.9, y:3.4, w:8.2, h:1.0, fontSize:24, bold:true, color:C.white,
      lineSpacing:38, fontFace:FS }));

  s = slide("できたのかけら");
  title(s, "「できた」は、成功だけじゃない", { size:32 });
  s.addText("自己ベストを出した。だけではありません。", T({ x:0.5, y:1.85, w:9, h:0.4,
    fontSize:17, color:C.muted }));
  bullets(s, ["練習に行った", "途中で重量を下げた", "休むと決めた",
              "失敗後、次の一本に集中した", "人に相談した", "怖かったけど挑戦した"],
    { y:2.2, size:18, gap:0.45 });
  s.addText("これも全部「できた」です。", T({ x:0.5, y:4.9, w:8.2, h:0.4,
    fontSize:19, bold:true, color:C.wine }));

  work(1, "最近1か月の「できたのかけら」を\n10個書いてください。", null,
       "ルールは1つ。「こんなの当たり前」は禁止です。");

  s = slide("できたのかけら");
  title(s, "見つからなかったら", { size:32 });
  s.addText("この質問を使ってください。", T({ x:0.5, y:1.8, w:9, h:0.4,
    fontSize:17, color:C.muted }));
  bullets(s, ["続けたことは？", "やめたことは？", "挑戦したことは？", "休むと決めたことは？",
              "誰かに頼れたことは？", "失敗したあとにやったことは？",
              "以前より少しできるようになったことは？"],
    { y:2.15, size:17, gap:0.42 });

  s = slide("できたのかけら");
  title(s, "10個の中から1つ選ぶ", { size:34 });
  band(s, "「これ、私よくやったな」と思うものを1つ。",
    { y:1.95, h:1.0, size:22 });
  s.addText("そして次に、こう考えます。", T({ x:0.5, y:3.25, w:9, h:0.4,
    fontSize:18, color:C.soft }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:3.8, w:9, h:1.1,
    fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.08 });
  s.addText("なぜ、それができた？", T({ x:0.9, y:3.8, w:8.2, h:1.1, fontSize:26, bold:true,
    color:C.wine, valign:"middle", fontFace:FS }));

  s = slide("できたのかけら");
  title(s, "「できた」の中に答えがある", { size:32 });
  s.addText("例えば「練習を継続できた」。　なぜ？", T({ x:0.5, y:1.85, w:9, h:0.4,
    fontSize:18, bold:true, color:C.wine }));
  bullets(s, ["目標が明確だった", "仲間がいた", "予定に入れていた",
              "100点を求めなかった", "今日は行くだけでOKにした"],
    { y:2.35, size:18, gap:0.46 });
  band(s, "できた理由には、次にも使えるヒントがあります。",
    { y:4.72, h:0.53, size:17, mincho:false });

  s = slide("できたのかけら");
  title(s, "自己信頼は「できる！」と思うことではない", { size:29 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.9, w:9, h:0.8,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
  s.addText("「私は絶対できる」と言い聞かせることではありません。",
    T({ x:0.9, y:1.9, w:8.2, h:0.8, fontSize:18, color:C.grey, valign:"middle" }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:3.0, w:9, h:1.85,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("自分の過去を振り返った時に、\n「私はこれまで、こうやって進んできた」\nという証拠を持っていること。",
    T({ x:0.9, y:3.0, w:8.2, h:1.85, fontSize:21, bold:true, color:C.white,
      valign:"middle", lineSpacing:36, fontFace:FS }));

  s = slide("できたのかけら");
  title(s, "「できた」は自分への証拠になる", { size:32 });
  [["怖かったけど挑戦できた","私は、怖くても動ける。"],
   ["失敗したけど切り替えられた","私は、失敗しても次を選べる。"],
   ["休めた","私は、必要な時に止まる判断ができる。"]].forEach(([a,b],i)=>{
    const y = 1.95 + i*1.05;
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:4.1, h:0.72,
      fill:{ color:C.warm }, line:{ color:C.line }, rectRadius:0.07 });
    s.addText(a, T({ x:0.7, y, w:3.7, h:0.72, fontSize:15, color:C.soft, valign:"middle" }));
    s.addText("→", T({ x:4.7, y, w:0.6, h:0.72, fontSize:18, bold:true, color:C.wine,
      align:"center", valign:"middle" }));
    s.addShape(pres.ShapeType.roundRect, { x:5.4, y, w:4.1, h:0.72,
      fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.07 });
    s.addText(b, T({ x:5.6, y, w:3.75, h:0.72, fontSize:14, bold:true, color:C.white,
      valign:"middle", lineSpacing:20 }));
  });

  /* ============ 目標を3つに分ける（26–31） ============ */
  s = slide("目標を3つに分ける");
  title(s, "でも「できた」を見つけて終わりではない", { size:29 });
  body(s, "過去の「できた」を使って、次の目標へ進みます。", { y:2.1, h:0.6, size:20 });
  band(s, "ここから、「できた」を「叶える」に変えていきます。",
    { y:3.3, h:1.2, size:24 });

  s = slide("目標を3つに分ける");
  title(s, "高い目標が、自信を奪うこともある", { size:32 });
  body(s, "目標を高く持つことは、悪くありません。\n\n" +
          "でも、一番高い数字だけを「100点」にしていると、\n" +
          "届かなかった試合が全部「失敗」になってしまいます。",
    { y:1.95, h:2.2, size:19, ls:32 });
  band(s, "体は強くなっているのに、自信だけが減っていく。",
    { y:4.3, h:0.85, size:20 });

  s = slide("目標を3つに分ける");
  title(s, "目標を3つに分ける", { size:34 });
  [["120点","夢","すべてが噛み合ったら届きたい理想。", C.pink, C.rose, C.wine],
   ["100点","狙う","今の自分が本気で狙う数字。", C.white, C.wine, C.white],
   ["80点","評価する","今の実力から考えて取りたい合格ライン。", C.white, C.deep, C.white]]
   .forEach(([pt,role,desc,ptCol,bg,txt],i)=>{
    const y = 1.95 + i*1.05;
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:9, h:0.9,
      fill:{ color:bg }, line:{ color:bg }, rectRadius:0.07 });
    s.addText(pt, T({ x:0.85, y, w:1.5, h:0.9, fontSize:28, bold:true, color: i===0 ? C.wine : C.white,
      valign:"middle", fontFace:FS }));
    s.addText(role, T({ x:2.4, y, w:1.5, h:0.9, fontSize:19, bold:true,
      color: i===0 ? C.wine : ptCol, valign:"middle" }));
    s.addText(desc, T({ x:4.0, y, w:5.2, h:0.9, fontSize:16,
      color: i===0 ? C.soft : txt, valign:"middle" }));
  });
  s.addText("120点は「夢」。100点は「狙う」。80点は「評価する」。",
    T({ x:0.5, y:5.0, w:8.2, h:0.4, fontSize:17, bold:true, color:C.wine }));

  s = slide("目標を3つに分ける");
  title(s, "例えば、トータル700kgが目標なら", { size:30 });
  [["120点","710〜720kg", C.rose, C.wine],
   ["100点","700kg", C.wine, C.white],
   ["80点","687.5kg", C.deep, C.white]].forEach(([pt,kg,bg,col],i)=>{
    const y = 1.9 + i*0.92;
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:9, h:0.8,
      fill:{ color:bg }, line:{ color:bg }, rectRadius:0.07 });
    s.addText(pt, T({ x:0.9, y, w:1.6, h:0.8, fontSize:22, bold:true, color:col,
      valign:"middle", fontFace:FS }));
    s.addText(kg, T({ x:2.6, y, w:6.2, h:0.8, fontSize:26, bold:true, color:col,
      valign:"middle", fontFace:FS }));
  });
  band(s, "狙うのは100点。でも届かなかった日も「全部ダメだった」にはしない。",
    { y:4.72, h:0.53, size:16, mincho:false, fill:C.bright });

  s = slide("目標を3つに分ける");
  title(s, "80点は、妥協ではない", { size:34 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.95, w:9, h:0.8,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
  s.addText("「このくらいでいいや」ではありません。",
    T({ x:0.9, y:1.95, w:8.2, h:0.8, fontSize:18, color:C.grey, valign:"middle" }));
  band(s, "自分の成長を見失わないためのラインです。",
    { y:3.05, h:1.0, size:23 });
  s.addText("100点を狙いながら、できたことも正しく評価する。",
    T({ x:0.5, y:4.4, w:9, h:0.5, fontSize:19, bold:true, color:C.wine }));

  work(2, "次の試合で狙いたい数字を\n書いてください。",
       "その数字は、120点？　100点？　80点？",
       "そのうえで、3つの数字を置いてみてください。");

  /* ============ 自分で選べること（32–37） ============ */
  s = slide("自分で選べること");
  title(s, "結果は、直接コントロールできない", { size:32 });
  ["順位","ライバルの記録","判定","会場","試合進行","自分以外の選手"].forEach((t,i)=>{
    const col = i % 3, row = Math.floor(i/3);
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + col*3.05, y:2.0 + row*0.85, w:2.85, h:0.72,
      fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
    s.addText(t, T({ x:0.5 + col*3.05, y:2.0 + row*0.85, w:2.85, h:0.72, fontSize:17,
      color:C.grey, align:"center", valign:"middle" }));
  });
  band(s, "ここを動かそうとすると、不安が大きくなります。",
    { y:4.25, h:0.85, size:20 });

  s = slide("自分で選べること");
  title(s, "コントロールできるのは「自分の行動」", { size:29 });
  ["今日の練習","睡眠","休養","試技前のルーティン",
   "自分にかける言葉","失敗した後の行動","何を見るか","何を見ないか"].forEach((t,i)=>{
    const col = i % 2, row = Math.floor(i/2);
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + col*4.6, y:1.95 + row*0.82, w:4.4, h:0.7,
      fill:{ color:C.wine }, line:{ color:C.wine }, rectRadius:0.07 });
    s.addText(t, T({ x:0.5 + col*4.6, y:1.95 + row*0.82, w:4.4, h:0.7, fontSize:18,
      bold:true, color:C.white, align:"center", valign:"middle" }));
  });

  s = slide("自分で選べること");
  title(s, "「この目標を達成する選手なら？」", { size:31 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:2.3, w:4.3, h:1.5,
    fill:{ color:C.wine }, line:{ color:C.wine }, rectRadius:0.08 });
  s.addText("何をする？", T({ x:0.5, y:2.3, w:4.3, h:1.5, fontSize:28, bold:true,
    color:C.white, align:"center", valign:"middle", fontFace:FS }));
  s.addShape(pres.ShapeType.roundRect, { x:5.2, y:2.3, w:4.3, h:1.5,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("何をしない？", T({ x:5.2, y:2.3, w:4.3, h:1.5, fontSize:28, bold:true,
    color:C.white, align:"center", valign:"middle", fontFace:FS }));
  s.addText("「何をする？」だけではなく、「何をしない？」まで考えます。",
    T({ x:0.5, y:4.2, w:9, h:0.5, fontSize:19, bold:true, color:C.wine }));

  s = slide("自分で選べること");
  title(s, "DOを決める", { size:34 });
  s.addText("次の試合に向けて、自分がやることを3つ決める。",
    T({ x:0.5, y:1.95, w:9, h:0.45, fontSize:19, color:C.soft }));
  s.addText("例", T({ x:0.5, y:2.6, w:1, h:0.35, fontSize:13, bold:true, charSpacing:2, color:C.muted }));
  numbered(s, ["予定通りのトレーニングをする",
               "試技前に決めたルーティンを行う",
               "毎回「できた」を1つ記録する"],
    { y:3.05, size:19, gap:0.7 });

  s = slide("自分で選べること");
  title(s, "DON'Tも決める", { size:34 });
  s.addText("不安になると、人は行動を増やしたくなります。だから先に、「やらないこと」も決める。",
    T({ x:0.5, y:1.9, w:9, h:0.75, fontSize:18, color:C.soft, lineSpacing:28 }));
  s.addText("例", T({ x:0.5, y:2.75, w:1, h:0.35, fontSize:13, bold:true, charSpacing:2, color:C.muted }));
  card(s, ["不安だから予定外の高重量を触らない",
           "ライバルの数字を何度も見ない",
           "失敗した一本を何度も頭の中で再生しない"],
    { y:3.2, w:9, size:18, gap:0.68, tint:C.greyBg, col:C.soft });

  work(3, "次の試合までの\nMY DO と MY DON'T を書いてください。",
       "MY DO　やること 3つ\nMY DON'T　やらないこと 3つ", null);

  /* ============ 失敗したあとの準備（38–40） ============ */
  s = slide("失敗したあとの準備");
  title(s, "強い選手＝失敗しない選手？", { size:32 });
  s.addText("違います。", T({ x:0.5, y:1.9, w:9, h:0.45, fontSize:22, bold:true,
    color:C.wine, fontFace:FS }));
  body(s, "パワーリフティングは SQ・BP・DL 各3本。\n" +
          "9回すべてが思い通りになるとは限りません。",
    { y:2.5, h:1.1, size:19, ls:32 });
  band(s, "大事なのは、失敗をゼロにすることではなく、\n失敗した後を準備しておくこと。",
    { y:3.85, h:1.3, size:21 });

  s = slide("失敗したあとの準備");
  title(s, "一本失敗したら", { size:34 });
  s.addText("考えるのは3つだけ。", T({ x:0.5, y:1.9, w:9, h:0.4, fontSize:19, color:C.soft }));
  numbered(s, ["何が起きた？", "次に変えることは？", "変えないことは？"],
    { y:2.5, size:21, gap:0.78 });
  s.addText("そして、次の一本へ。", T({ x:0.5, y:4.85, w:8.2, h:0.45,
    fontSize:20, bold:true, color:C.wine, fontFace:FS }));

  s = slide("失敗したあとの準備");
  title(s, "「今日ダメかも」は事実ではない", { size:32 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.9, w:4.3, h:1.9,
    fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.08 });
  s.addText("これは事実", T({ x:0.8, y:2.05, w:3.7, h:0.34, fontSize:13, bold:true,
    charSpacing:2, color:C.muted }));
  s.addText("「失敗した」", T({ x:0.8, y:2.55, w:3.75, h:1.0, fontSize:22, bold:true,
    color:C.wine, fontFace:FS }));
  s.addShape(pres.ShapeType.roundRect, { x:5.2, y:1.9, w:4.3, h:1.9,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.08 });
  s.addText("これは解釈", T({ x:5.5, y:2.05, w:3.7, h:0.34, fontSize:13, bold:true,
    charSpacing:2, color:C.muted }));
  s.addText("「今日はダメだ」\n「私は弱い」\n「また失敗する」",
    T({ x:5.5, y:2.5, w:3.75, h:1.2, fontSize:17, color:C.grey, lineSpacing:26 }));
  band(s, "事実と解釈を分けるだけでも、次の行動は変わります。",
    { y:4.2, h:0.85, size:20 });

  /* ============ 受講された方の変化（41–43） ============ */
  s = slide("受講された方の変化");
  title(s, "「もっと頑張らなきゃ」から変わった選手", { size:29 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.9, w:9, h:0.9,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
  s.addText("以前は「できていないから、もっと頑張らないと」と考えていました。",
    T({ x:0.9, y:1.9, w:8.2, h:0.9, fontSize:18, color:C.grey, valign:"middle" }));
  body(s, "でも、自分の「できた」を意識して積み重ねるようになり、\nこう話してくれました。",
    { y:3.05, h:0.9, size:18, ls:28 });
  band(s, "「チャレンジすることが楽しく、失敗が怖くなくなった」",
    { y:4.15, h:0.95, size:21 });

  s = slide("受講された方の変化");
  title(s, "目標が「願い」から「行動」に変わった選手", { size:28 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.85, w:9, h:0.85,
    fill:{ color:C.greyBg }, line:{ color:C.greyBg }, rectRadius:0.07 });
  s.addText("以前は「スクワット140kgを挙げたい！」という目標でした。",
    T({ x:0.9, y:1.85, w:8.2, h:0.85, fontSize:18, color:C.grey, valign:"middle" }));
  body(s, "そこから「そのために何をやる？」まで考えることで、\n" +
          "技術や日々の行動を具体的に見直せるようになりました。",
    { y:2.95, h:1.1, size:18, ls:30 });
  band(s, "「何をすればいいかが明確になる」という変化が生まれています。",
    { y:4.2, h:0.85, size:19, mincho:false });

  s = slide("受講された方の変化");
  title(s, "700kgを狙う選手も同じ", { size:33 });
  body(s, "目標は高くていい。\n" +
          "でも、700kgだけが成功で、699kg以下は全部失敗、ではありません。\n\n" +
          "120・100・80を持つことで、高い目標を狙いながら、今の成長も見失わない。",
    { y:1.9, h:2.2, size:18, ls:30 });
  band(s, "高い目標と自己信頼は、両立できます。", { y:4.2, h:0.85, size:22 });
  s.addText("受講された方の体験であり、同じ結果を保証するものではありません。",
    T({ x:0.5, y:5.15, w:8.2, h:0.3, fontSize:11, color:C.muted }));

  /* ============ メンタルトレーニングとは（44–47） ============ */
  s = slide("メンタルトレーニングとは");
  title(s, "今日やったことが、メンタルトレーニングです", { size:28 });
  s.addText("気合いを入れることではありません。", T({ x:0.5, y:1.75, w:9, h:0.4,
    fontSize:17, color:C.muted }));
  ["自分の状態を知る。","できていることを知る。","目標を整理する。",
   "自分にできることを選ぶ。","行動する。"].forEach((t,i)=>{
    const y = 2.25 + i*0.6;
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:9, h:0.5,
      fill:{ color: i===4 ? C.deep : C.rose }, line:{ color: i===4 ? C.deep : C.rose }, rectRadius:0.06 });
    s.addText(t, T({ x:0.9, y, w:8.1, h:0.5, fontSize:18, bold:true,
      color: i===4 ? C.white : C.wine, valign:"middle" }));
    if (i<4) s.addText("↓", T({ x:0.5, y:y+0.46, w:0.5, h:0.16, fontSize:11,
      color:C.muted, align:"center" }));
  });

  s = slide("メンタルトレーニングとは");
  title(s, "メンタルは「当日」だけのものではない", { size:29 });
  ["目標を決める時","普段の練習","休むか迷う時","停滞した時",
   "試合前","試技前","失敗した直後","試合後"].forEach((t,i)=>{
    const col = i % 4, row = Math.floor(i/4);
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + col*2.3, y:2.1 + row*0.9, w:2.1, h:0.76,
      fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.07 });
    s.addText(t, T({ x:0.5 + col*2.3, y:2.1 + row*0.9, w:2.1, h:0.76, fontSize:15,
      bold:true, color:C.wine, align:"center", valign:"middle" }));
  });
  band(s, "すべてが、メンタルトレーニングです。", { y:4.2, h:0.9, size:22 });

  s = slide("メンタルトレーニングとは", { dark:true });
  title(s, "私が目指しているのは", { size:26, color:C.pink, y:1.0 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.7, w:9, h:0.85,
    fill:{ color:"3A0B12" }, line:{ color:"3A0B12" }, rectRadius:0.07 });
  s.addText("「自信満々な選手」ではありません。",
    T({ x:0.9, y:1.7, w:8.2, h:0.85, fontSize:19, color:"C79AA3", valign:"middle" }));
  s.addText("プレッシャーがあっても、\n自分がやるべきことを理解し、実践できる選手。",
    T({ x:0.5, y:3.0, w:9, h:1.6, fontSize:26, bold:true, color:C.white,
      lineSpacing:42, fontFace:FS }));

  s = slide("メンタルトレーニングとは", { dark:true });
  title(s, "最終的には", { size:26, color:C.pink, y:1.0 });
  s.addText("何が起きても、", T({ x:0.5, y:1.6, w:9, h:0.5, fontSize:21, color:C.pale }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:2.2, w:9, h:1.15,
    fill:{ color:C.bright }, line:{ color:C.bright }, rectRadius:0.08 });
  s.addText("「私は次に何をすればいいかわかる」", T({ x:0.9, y:2.2, w:8.2, h:1.15,
    fontSize:25, bold:true, color:C.white, valign:"middle", fontFace:FS }));
  s.addText("と言える状態へ。", T({ x:0.5, y:3.5, w:9, h:0.45, fontSize:21, color:C.pale }));
  s.addText("成功しても。失敗しても。\n自分への信頼を失わず、次の行動を選べる。",
    T({ x:0.5, y:4.15, w:9, h:1.0, fontSize:19, color:"F2E7E9", lineSpacing:30 }));

  /* ============ おわりに（48–49） ============ */
  s = slide("おわりに");
  title(s, "今日、最初の自分と比べてどうですか？", { size:29 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.9, w:9, h:1.5,
    fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.08 });
  s.addText("「できていない」だけではなく、\n「これもできていた」が見つかりましたか？",
    T({ x:0.9, y:1.9, w:8.2, h:1.5, fontSize:21, bold:true, color:C.wine,
      valign:"middle", lineSpacing:34, fontFace:FS }));
  body(s, "今日書いたものは、ただの振り返りではありません。", { y:3.75, h:0.5, size:19 });
  band(s, "あなたが次に進むための、証拠です。", { y:4.35, h:0.85, size:22 });

  s = slide("おわりに", { dark:true });
  title(s, "今日の「できたのかけら」", { size:30, color:C.pink, y:0.95 });
  s.addText("最後に1つ書いてください。", T({ x:0.5, y:1.6, w:9, h:0.45,
    fontSize:19, color:C.pale }));
  ["今日90分参加した。","自分のことを考えた。","目標を書いた。","やることを決めた。"]
    .forEach((t,i)=>{
      const col = i % 2, row = Math.floor(i/2);
      s.addShape(pres.ShapeType.roundRect, { x:0.5 + col*4.6, y:2.25 + row*0.85, w:4.4, h:0.72,
        fill:{ color:"3A0B12" }, line:{ color:"3A0B12" }, rectRadius:0.07 });
      s.addText(t, T({ x:0.5 + col*4.6, y:2.25 + row*0.85, w:4.4, h:0.72, fontSize:17,
        color:C.white, align:"center", valign:"middle" }));
    });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:4.2, w:9, h:0.95,
    fill:{ color:C.bright }, line:{ color:C.bright }, rectRadius:0.08 });
  s.addText("それも全部、今日のあなたの「できた」です。",
    T({ x:0.9, y:4.2, w:8.2, h:0.95, fontSize:22, bold:true, color:C.white,
      valign:"middle", fontFace:FS }));

  await pres.writeFile({ fileName: "seminar-dekita.pptx" });
  console.log("スライド枚数:", no);
}
build().catch(e => { console.error(e); process.exit(1); });
