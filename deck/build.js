const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const I = require("./illus.js");
const fs = require("fs");

// ---- LPと同じ配色 ----
const C = { wine:"7A1524", deep:"540E19", bright:"A02236", ink:"141416", soft:"3B3634",
            muted:"6B6360", white:"FFFFFF", warm:"F5F1F0", rose:"FAF3F4", line:"E1D9D9", pink:"F0B9C3" };
const F = "Yu Gothic";                       // Windows / Mac 両方にある日本語フォント
const W = 10, H = 5.625;                     // 16:9

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "しおりん";
pres.title = "パワーリフターのための実践メンタルトレーニング｜無料個別相談";

// ---- 挿絵を PNG にして埋め込む ----
const cache = {};
async function art(name, col) {
  const key = name + col;
  if (!cache[key]) {
    const png = await sharp(Buffer.from(I[name]("#" + col))).resize(560, 560).png().toBuffer();
    cache[key] = "image/png;base64," + png.toString("base64");
  }
  return cache[key];
}

let no = 0;
function slide(phase, { dark = false, bg, numLeft = false } = {}) {
  no++;
  const s = pres.addSlide();
  s.background = { color: bg || (dark ? C.deep : C.white) };
  if (phase) s.addText(phase, { isTextBox:true, x:0.5, y:0.26, w:6, h:0.3, margin:0,
    fontFace:F, fontSize:12, bold:true, charSpacing:2, color: dark ? C.pink : C.wine });
  s.addText(String(no), { isTextBox:true, x: numLeft ? 0.5 : W-1.1, y:H-0.62, w:0.6, h:0.3, margin:0,
    align: numLeft ? "left" : "right", fontFace:F, fontSize:11, color: dark ? "8A6870" : C.muted });
  return s;
}
const T = (o) => Object.assign({ isTextBox:true, fontFace:F, margin:0, color:C.ink }, o);

// 見出し
function title(s, text, { y=0.85, w=8.9, size=34, color=C.ink, x=0.5, align="left", h=1.3 } = {}) {
  s.addText(text, T({ x, y, w, h, fontSize:size, bold:true, lineSpacing:size*1.45,
    color, align, valign:"top" }));
}
// 箇条書きカード（枠つき）
function card(s, items, { x=0.5, y=2.2, w=5.4, size=19, gap=0.62, tint=C.rose, col=C.soft } = {}) {
  items.forEach((t, i) => {
    s.addShape(pres.ShapeType.roundRect, { x, y: y + i*gap, w, h: gap-0.1,
      fill:{ color: tint }, line:{ color: tint }, rectRadius:0.06 });
    s.addText(t, T({ x: x+0.28, y: y + i*gap, w: w-0.5, h: gap-0.1, fontSize:size,
      color: col, valign:"middle", bold:false }));
  });
}
// 番号つきの行
function numbered(s, items, { x=0.5, y=2.1, w=4.3, size=17, gap=0.52, dark=false } = {}) {
  items.forEach((t, i) => {
    s.addShape(pres.ShapeType.ellipse, { x, y: y + i*gap + 0.06, w:0.34, h:0.34,
      fill:{ color: dark ? C.bright : C.wine }, line:{ color: dark ? C.bright : C.wine } });
    s.addText(String(i+1), T({ x, y: y + i*gap + 0.06, w:0.34, h:0.34, fontSize:13, bold:true,
      color:C.white, align:"center", valign:"middle" }));
    s.addText(t, T({ x: x+0.52, y: y + i*gap, w, h:0.46, fontSize:size,
      color: dark ? "F2E7E9" : C.soft, valign:"middle" }));
  });
}

async function build() {
  const A = (n, c) => art(n, c);

  /* ===================== Phase 1｜現在地を知る ===================== */
  let s = slide("PHASE 1　現在地を知る");
  title(s, "次の試合で、\n絶対に取りたい一本は\nありますか？", { size:36, w:5.6, y:1.15 });
  s.addText("今日はまず、あなたの次の試合について\n聞かせてください。", T({ x:0.5, y:3.9, w:5.4, h:1,
    fontSize:19, color:C.muted, lineSpacing:30 }));
  s.addImage({ data: await A("barbell", C.wine), x:6.4, y:1.5, w:3, h:3 });

  s = slide("PHASE 1　現在地を知る");
  title(s, "次の試合で目指していること", { size:32 });
  card(s, ["次の試合はいつ？", "絶対に取りたい記録は？", "標準突破？　PB？　順位？　優勝？"],
       { y:2.1, w:5.9, size:20, gap:0.72 });
  s.addText("まず「どこへ行きたいか」を一緒に明確にします。", T({ x:0.5, y:4.5, w:6, h:0.5,
    fontSize:18, bold:true, color:C.wine }));
  s.addImage({ data: await A("calendar", C.wine), x:6.9, y:1.9, w:2.6, h:2.6 });

  s = slide("PHASE 1　現在地を知る");
  title(s, "その目標を考えた時、\nどんな気持ちになりますか？", { size:32, w:5.8, y:1.0 });
  card(s, ["楽しみ", "「できるかな」という不安", "「失敗したらどうしよう」という不安"],
       { y:2.9, w:5.8, size:19, gap:0.62 });
  s.addImage({ data: await A("feeling", C.wine), x:6.8, y:1.8, w:2.7, h:2.7 });

  s = slide("PHASE 1　現在地を知る");
  title(s, "今、一番気になっていることは？", { size:32 });
  card(s, ["大事な重量になると怖い", "練習ではできるのに試合で出せない",
           "一本失敗すると、その後も影響する", "順位や相手が気になる", "自分を信じて試技に入りたい"],
       { y:1.95, w:6.2, size:18, gap:0.56 });
  s.addText("今日、一番整理したいことを教えてください。", T({ x:0.5, y:4.85, w:6.4, h:0.45,
    fontSize:17, bold:true, color:C.wine }));
  s.addImage({ data: await A("checklist", C.wine), x:7.1, y:2.1, w:2.4, h:2.4 });

  /* ===================== Phase 2｜しおりんのストーリー ===================== */
  s = slide("PHASE 2　しおりんのストーリー", { bg:C.warm });
  s.addImage({ data: await A("overthink", C.wine), x:0.7, y:1.5, w:2.9, h:2.9 });
  title(s, "私も昔は、\n「メンタルが強い人が勝つ」\nと思っていました", { size:29, x:4.1, w:5.4, y:1.0 });
  s.addText("試合1か月前から、頭の中は試合のことでいっぱい。\n" +
            "「失敗したらどうしよう」\n" +
            "そんな不安が出るたびに、「できる、できる」と\n必死に塗り替えていました。",
    T({ x:4.1, y:3.15, w:5.4, h:1.9, fontSize:16, color:C.soft, lineSpacing:26 }));

  s = slide("PHASE 2　しおりんのストーリー", { bg:C.warm });
  title(s, "でも、不安は消えなかった", { size:33 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.95, w:5.7, h:1.15,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("「こんなことを考えたら、\n本当に失敗するかも」", T({ x:0.8, y:1.95, w:5.2, h:1.15,
    fontSize:21, bold:true, color:C.white, valign:"middle", lineSpacing:32 }));
  s.addText("不安そのものだけでなく、不安になっている自分まで\n怖くなっていました。\n\n" +
            "そして実際に、想像していたような結果になったことも。",
    T({ x:0.5, y:3.3, w:5.9, h:1.8, fontSize:16, color:C.soft, lineSpacing:26 }));
  s.addImage({ data: await A("persist", C.wine), x:6.8, y:1.8, w:2.7, h:2.7 });

  // 写真スライド（右半分に写真）
  const photo = (s, file) => s.addImage({ path:file, x:5.5, y:0, w:4.5, h:H,
    sizing:{ type:"cover", w:4.5, h:H } });

  s = slide("PHASE 2　しおりんのストーリー", { numLeft:true });
  photo(s, "../note/images/01-squat.jpg");
  title(s, "2023年度\n日本グランプリ", { size:33, w:4.6, y:0.9 });
  s.addText("練習は、とても順調。\nところが試合直前に体調不良。\n\n" +
            "点滴を打ち、なんとか出場できたものの、\n予定していた重量から大幅に下げることに。",
    T({ x:0.5, y:2.45, w:4.7, h:2, fontSize:17, color:C.soft, lineSpacing:28 }));
  s.addText("「しょうがない。今じゃなかった。」", T({ x:0.5, y:4.5, w:4.7, h:0.5,
    fontSize:19, bold:true, color:C.wine }));

  s = slide("PHASE 2　しおりんのストーリー", { numLeft:true });
  photo(s, "../note/images/02-podium.jpg");
  title(s, "でも、その試合で\n全部が決まった\nわけではなかった", { size:29, w:4.7, y:0.85 });
  s.addText("その試合が終わっても、\n積み重ねてきたものはなくなりません。\n\n" +
            "また自分にできることを続ける。",
    T({ x:0.5, y:2.8, w:4.7, h:1.5, fontSize:17, color:C.soft, lineSpacing:28 }));
  s.addText("そして同じ2023年度、日本一に。", T({ x:0.5, y:4.4, w:4.7, h:0.5,
    fontSize:20, bold:true, color:C.wine }));

  s = slide("PHASE 2　しおりんのストーリー", { numLeft:true });
  photo(s, "../note/images/03-deadlift.jpg");
  title(s, "今は、世界大会さえ\n「楽しい」", { size:32, w:4.7, y:0.9 });
  s.addText("「私は今、この舞台に立っているんだ」\nと思うと、緊張以上にワクワクしていました。\n\n" +
            "不安がゼロになったからではありません。\nその時、自分に何ができるのかが\nわかるようになったからです。",
    T({ x:0.5, y:2.35, w:4.7, h:2.7, fontSize:16, color:C.soft, lineSpacing:26 }));

  /* ===================== Phase 3｜3つの思い込みを壊す ===================== */
  s = slide("PHASE 3　3つの思い込みを壊す");
  title(s, "メンタルについて、\nこんなふうに思っていませんか？", { size:30, w:9, y:0.85 });
  numbered(s, ["強い人が勝つ", "不安は消さなければいけない", "本番に弱いのは性格だから仕方ない"],
    { y:2.5, w:5.6, size:20, gap:0.72 });
  s.addText("実は私は、全部そう思っていました。", T({ x:0.5, y:4.75, w:6, h:0.45,
    fontSize:18, bold:true, color:C.wine }));
  s.addImage({ data: await A("myths", C.wine), x:7.0, y:2.3, w:2.5, h:2.5 });

  const myth = async (num, head, icon, wrong, right) => {
    const s = slide("PHASE 3　3つの思い込みを壊す");
    s.addText(`思い込み ${num}`, T({ x:0.5, y:0.85, w:4, h:0.4, fontSize:16, bold:true, color:C.bright }));
    title(s, head, { size:28, y:1.3, w:6.3 });
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y:2.75, w:5.6, h:0.75,
      fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.07 });
    s.addText(wrong, T({ x:0.85, y:2.75, w:5.2, h:0.75, fontSize:20, bold:true,
      color:C.wine, valign:"middle" }));
    s.addText(right, T({ x:0.5, y:3.75, w:5.7, h:1.5, fontSize:18, color:C.soft, lineSpacing:30 }));
    s.addImage({ data: await A(icon, C.wine), x:7.1, y:2.0, w:2.4, h:2.4 });
  };
  await myth("①", "「メンタルが強い人が勝つ」", "muscle", "違います。",
    "必要なのは「強い気持ち」より、\n大事な場面で\n「何をするかがわかること」。");
  await myth("②", "「不安は消さないといけない」", "repaint", "塗り替えなくていい。",
    "まず「私は今、不安なんだ」とわかる。\nそして「何が不安なの？」\nを整理する。");
  await myth("③", "「私は本番に弱い」", "label", "決めつけないで。",
    "「どんな場面で、どうなりやすい？」\nを知る。\n性格ではなく、パターンとして見る。");

  s = slide("PHASE 3　3つの思い込みを壊す", { dark:true });
  s.addText("私がたどり着いた答え", T({ x:0.5, y:0.92, w:6.3, h:0.42, fontSize:20, bold:true, color:C.pink }));
  s.addText("自分しか、\n自分のメンタルは変えられない。", T({ x:0.5, y:1.5, w:6.3, h:1.5,
    fontSize:27, bold:true, color:C.white, lineSpacing:42 }));
  s.addText("でも逆に言えば、自分で変えることができる。", T({ x:0.5, y:3.15, w:6.3, h:0.5,
    fontSize:18, color:"E8D3D7" }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:3.95, w:6.3, h:0.9,
    fill:{ color:C.bright }, line:{ color:C.bright }, rectRadius:0.08 });
  s.addText("メンタルは、トレーニングできるスキルです。", T({ x:0.85, y:3.95, w:5.7, h:0.9,
    fontSize:18, bold:true, color:C.white, valign:"middle" }));
  s.addImage({ data: await A("selfchange", "FFFFFF"), x:7.1, y:1.9, w:2.4, h:2.4 });

  /* ===================== Phase 4｜価値提供 ===================== */
  s = slide("PHASE 4　メンタルトレーニングとは");
  title(s, "メンタルトレーニングは\n「前向きになる練習」ではない", { size:29, w:9, y:0.85 });
  numbered(s, ["今の状態がわかる", "原因がわかる", "自分で変えられることがわかる",
               "次の行動を決める", "実際にやってみる"], { y:2.3, w:5.2, size:17, gap:0.52 });
  s.addText("この繰り返しです。", T({ x:0.5, y:4.95, w:5, h:0.42, fontSize:18, bold:true, color:C.wine }));
  s.addImage({ data: await A("cycle", C.wine), x:7.0, y:2.2, w:2.5, h:2.5 });

  s = slide("PHASE 4　メンタルトレーニングとは");
  title(s, "まず、不安を分解する", { size:33 });
  s.addText("「試合が不安」だけでは、何をしたらいいかわかりません。",
    T({ x:0.5, y:1.9, w:6.2, h:0.7, fontSize:17, color:C.soft, lineSpacing:26 }));
  card(s, ["たとえば「3本目を失敗するのが怖い」",
           "さらに「その失敗で、その後まで気持ちが崩れるのが怖い」"],
       { y:2.72, w:6.2, size:16, gap:0.85 });
  s.addText("ここまでわかると、対策できます。", T({ x:0.5, y:4.55, w:6.2, h:0.45,
    fontSize:19, bold:true, color:C.wine }));
  s.addImage({ data: await A("split", C.wine), x:7.1, y:2.3, w:2.4, h:2.4 });

  s = slide("PHASE 4　メンタルトレーニングとは");
  title(s, "次に、変えられることを分ける", { size:32 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.95, w:4.3, h:3.1,
    fill:{ color:C.warm }, line:{ color:C.line }, rectRadius:0.08 });
  s.addText("自分では変えられないこと", T({ x:0.8, y:2.15, w:3.8, h:0.4, fontSize:17, bold:true, color:C.muted }));
  s.addText(["相手の重量","審判","順位の動き","試合進行"].map((t,i,a)=>
    ({ text:t, options:{ bullet:true, breakLine:i<a.length-1 } })),
    T({ x:0.85, y:2.65, w:3.7, h:2.2, fontSize:17, color:C.soft, paraSpaceAfter:8 }));
  s.addShape(pres.ShapeType.roundRect, { x:5.2, y:1.95, w:4.3, h:3.1,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("自分で選べること", T({ x:5.5, y:2.15, w:3.8, h:0.4, fontSize:17, bold:true, color:C.pink }));
  s.addText(["呼吸","アップ","考えること","一本前の行動","失敗後の行動"].map((t,i,a)=>
    ({ text:t, options:{ bullet:true, breakLine:i<a.length-1 } })),
    T({ x:5.55, y:2.65, w:3.7, h:2.3, fontSize:17, color:C.white, paraSpaceAfter:6 }));

  s = slide("PHASE 4　メンタルトレーニングとは");
  title(s, "一本失敗したら、その試合は終わり？", { size:29, w:9 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.9, w:3.1, h:1.15,
    fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.07 });
  s.addText("「失敗した」\nこれは事実。", T({ x:0.8, y:1.9, w:2.7, h:1.15, fontSize:17,
    bold:true, color:C.wine, valign:"middle", lineSpacing:26 }));
  s.addShape(pres.ShapeType.roundRect, { x:3.85, y:1.9, w:3.1, h:1.15,
    fill:{ color:C.warm }, line:{ color:C.line }, rectRadius:0.07 });
  s.addText("「今日はもうダメだ」\nこれは評価。", T({ x:4.15, y:1.9, w:2.7, h:1.15, fontSize:17,
    bold:true, color:C.muted, valign:"middle", lineSpacing:26 }));
  s.addText("この2つを分けます。失敗した時ほど、次の3つを整理する。",
    T({ x:0.5, y:3.25, w:6.5, h:0.45, fontSize:17, color:C.soft }));
  numbered(s, ["何が起きた？", "何を変える？", "もう考えなくていいことは？"],
    { y:3.85, w:5.2, size:17, gap:0.5 });
  s.addImage({ data: await A("factjudge", C.wine), x:7.3, y:2.2, w:2.2, h:2.2 });

  s = slide("PHASE 4　メンタルトレーニングとは");
  title(s, "目標は3種類に分ける", { size:33 });
  const goals = [["結果目標","「優勝する」「標準を取る」"],["パフォーマンス目標","「○kgを成功させる」"],
                 ["行動目標","「そのために今日何をする？」"]];
  goals.forEach(([k,v],i)=>{
    const y = 1.95 + i*0.86;
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:6.2, h:0.74,
      fill:{ color: i===2 ? C.deep : C.rose }, line:{ color: i===2 ? C.deep : C.rose }, rectRadius:0.07 });
    s.addText(k, T({ x:0.8, y, w:2.4, h:0.74, fontSize:15, bold:true,
      color: i===2 ? C.pink : C.wine, valign:"middle" }));
    s.addText(v, T({ x:3.25, y, w:3.3, h:0.74, fontSize:15,
      color: i===2 ? C.white : C.soft, valign:"middle" }));
  });
  s.addText("結果だけでは、今日の行動は決まりません。", T({ x:0.5, y:4.6, w:6.4, h:0.45,
    fontSize:18, bold:true, color:C.wine }));
  s.addImage({ data: await A("targets", C.wine), x:7.2, y:2.2, w:2.3, h:2.3 });

  s = slide("PHASE 4　メンタルトレーニングとは");
  title(s, "目標を達成できる選手なら、\n今日どうする？", { size:31, w:6.2, y:0.85 });
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:2.5, w:3.0, h:0.62,
    fill:{ color:C.wine }, line:{ color:C.wine }, rectRadius:0.06 });
  s.addText("やること　1つ", T({ x:0.5, y:2.5, w:3.0, h:0.62, fontSize:17, bold:true,
    color:C.white, align:"center", valign:"middle" }));
  s.addShape(pres.ShapeType.roundRect, { x:3.7, y:2.5, w:3.0, h:0.62,
    fill:{ color:C.warm }, line:{ color:C.line }, rectRadius:0.06 });
  s.addText("やらないこと　1つ", T({ x:3.7, y:2.5, w:3.0, h:0.62, fontSize:17, bold:true,
    color:C.muted, align:"center", valign:"middle" }));
  s.addText("たとえば、今日はフォームを大事にする。\n今日は追加で重い重量を持たない。今日はしっかり寝る。",
    T({ x:0.5, y:3.35, w:6.3, h:1, fontSize:17, color:C.soft, lineSpacing:28 }));
  s.addText("目標は、毎日の選択からつくられます。", T({ x:0.5, y:4.55, w:6.3, h:0.45,
    fontSize:18, bold:true, color:C.wine }));
  s.addImage({ data: await A("choose", C.wine), x:7.2, y:2.3, w:2.3, h:2.3 });

  /* ===================== Phase 5｜お客様の変化 ===================== */
  const beforeAfter = async (label, before, after, quote) => {
    const s = slide("PHASE 5　受講された方の変化");
    title(s, label, { size:30, w:9 });
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y:1.85, w:4.3, h:2.35,
      fill:{ color:C.warm }, line:{ color:C.line }, rectRadius:0.08 });
    s.addText("BEFORE", T({ x:0.8, y:2.0, w:3.7, h:0.32, fontSize:12, bold:true,
      charSpacing:2, color:C.muted }));
    s.addText(before, T({ x:0.8, y:2.38, w:3.75, h:1.7, fontSize:15, color:C.soft, lineSpacing:24 }));
    s.addShape(pres.ShapeType.roundRect, { x:5.2, y:1.85, w:4.3, h:2.35,
      fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
    s.addText("AFTER", T({ x:5.5, y:2.0, w:3.7, h:0.32, fontSize:12, bold:true,
      charSpacing:2, color:C.pink }));
    s.addText(after, T({ x:5.5, y:2.38, w:3.75, h:1.7, fontSize:15, color:C.white, lineSpacing:24 }));
    s.addText(quote, T({ x:0.5, y:4.42, w:9, h:0.7, fontSize:17, bold:true,
      color:C.wine, lineSpacing:26 }));
  };
  await beforeAfter("「もっと頑張らないと」から変わった方",
    "「まだまだ」\n「苦労しないと手に入らない」\n「できてないからもっと頑張らないと」",
    "頑張ることも、休むことも、\n自分で納得して\n選べるように。",
    "「チャレンジすることが楽しく、失敗が怖くなくなった」");
  await beforeAfter("「140kg挙げたい」から変わった方",
    "「スクワット140kgを挙げたい」\nという結果を考えていた。",
    "「そのために、何をやるべきか？」\nを考えられるように。\n「正しく立つ」「自分のタイプの動き」",
    "学んだことを、行動に変えるようになりました。");

  s = slide("PHASE 5　受講された方の変化");
  title(s, "変えたいのは「気持ち」だけではない", { size:30, w:9 });
  ["考え方が変わる。","選ぶ行動が変わる。","積み重ねが変わる。","自分への信頼が育つ。"]
    .forEach((t,i)=>{
      const y = 1.95 + i*0.72;
      s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:5.6, h:0.6,
        fill:{ color: i===3 ? C.deep : C.rose }, line:{ color: i===3 ? C.deep : C.rose }, rectRadius:0.06 });
      s.addText(t, T({ x:0.85, y, w:5.2, h:0.6, fontSize:18, bold:true,
        color: i===3 ? C.white : C.wine, valign:"middle" }));
      if (i<3) s.addText("↓", T({ x:0.5, y:y+0.55, w:0.5, h:0.2, fontSize:12, color:C.muted, align:"center" }));
    });
  s.addText("メンタルトレーニングは、\nその積み重ねをつくるものです。", T({ x:6.5, y:2.6, w:3, h:1.2,
    fontSize:17, color:C.soft, lineSpacing:28 }));
  s.addImage({ data: await A("stairs", C.wine), x:7.0, y:1.2, w:1.6, h:1.6 });

  /* ===================== Phase 6｜あなたの整理 ===================== */
  s = slide("PHASE 6　あなたの場合を整理する");
  title(s, "あなたの場合は、何を身につけたい？", { size:30, w:9 });
  s.addText("次の試合までに「これができるようになりたい」と思ったものはありますか？",
    T({ x:0.5, y:1.9, w:9, h:0.45, fontSize:17, color:C.soft }));
  const wants = ["不安の整理","一本前のルーティン","失敗後の切り替え",
                 "比較への対処","休む／頑張るの判断","目標を行動に落とし込む"];
  wants.forEach((t,i)=>{
    const col = i % 2, row = Math.floor(i/2);
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + col*3.2, y:2.55 + row*0.78, w:3.0, h:0.66,
      fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.07 });
    s.addText(t, T({ x:0.7 + col*3.2, y:2.55 + row*0.78, w:2.75, h:0.66, fontSize:15,
      bold:true, color:C.wine, valign:"middle" }));
  });
  s.addImage({ data: await A("youask", C.wine), x:7.2, y:2.5, w:2.3, h:2.3 });

  /* ===================== Phase 7｜講座案内 ===================== */
  s = slide("PHASE 7　講座のご案内", { dark:true, numLeft:true });
  s.addImage({ path:"../lp/images/hero.jpg", x:5.0, y:0, w:5.0, h:H, sizing:{ type:"cover", w:5.0, h:H } });
  s.addShape(pres.ShapeType.rect, { x:0, y:0, w:6.2, h:H, fill:{ color:C.deep }, line:{ color:C.deep } });
  s.addText("25", T({ x:0.5, y:H-0.62, w:0.6, h:0.3, fontSize:11, color:"8A6870" }));
  s.addText("PHASE 7　講座のご案内", T({ x:0.5, y:0.26, w:6, h:0.3, fontSize:12, bold:true,
    charSpacing:2, color:C.pink }));
  s.addText("パワーリフターのための\n実践メンタルトレーニング", T({ x:0.5, y:1.15, w:5.3, h:1.7,
    fontSize:30, bold:true, color:C.white, lineSpacing:46 }));
  s.addText("絶対に取りたい記録、勝ちたい試合がある選手へ。", T({ x:0.5, y:3.05, w:5.3, h:0.45,
    fontSize:17, color:C.pink }));
  s.addText("プレッシャーがあっても、\n自分がやるべきことがわかり、実践できる選手になる。",
    T({ x:0.5, y:3.7, w:5.3, h:1.1, fontSize:18, color:"F2E7E9", lineSpacing:30 }));

  s = slide("PHASE 7　講座のご案内");
  title(s, "1対1で、自分の試合に落とし込む", { size:30, w:9 });
  const spec = [["形式","完全1対1／Zoom"],["回数","全10回（1回60分）"],["期間","最長3か月"],
                ["ペース","試合日程に合わせて調整"]];
  spec.forEach(([k,v],i)=>{
    const y = 1.95 + i*0.7;
    s.addShape(pres.ShapeType.roundRect, { x:0.5, y, w:6.0, h:0.6,
      fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.06 });
    s.addText(k, T({ x:0.8, y, w:1.5, h:0.6, fontSize:16, bold:true, color:C.wine, valign:"middle" }));
    s.addText(v, T({ x:2.3, y, w:4.0, h:0.6, fontSize:17, color:C.soft, valign:"middle" }));
  });
  s.addText("知識を聞くだけではなく、\n「あなたならどうする？」まで一緒につくります。",
    T({ x:0.5, y:4.7, w:6.4, h:0.7, fontSize:16, bold:true, color:C.wine, lineSpacing:24 }));
  s.addImage({ data: await A("online", C.wine), x:7.1, y:2.2, w:2.4, h:2.4 });

  s = slide("PHASE 7　講座のご案内");
  title(s, "10回で扱うこと", { size:33 });
  const ten = ["自分の崩れ方を知る","取りたい記録から逆算する","プレッシャーを理解する",
    "自分だけのルーティン","失敗しても崩れない","自分の試合に集中する","頑張る・休むを選ぶ",
    "自己信頼を育てる","プランBを持つ","自分だけの大会メンタルプラン"];
  ten.forEach((t,i)=>{
    const col = i < 5 ? 0 : 1, row = i % 5;
    const x = 0.5 + col*4.75, y = 1.95 + row*0.66;
    s.addShape(pres.ShapeType.ellipse, { x, y:y+0.07, w:0.36, h:0.36,
      fill:{ color:C.wine }, line:{ color:C.wine } });
    s.addText(String(i+1), T({ x, y:y+0.07, w:0.36, h:0.36, fontSize:13, bold:true,
      color:C.white, align:"center", valign:"middle" }));
    s.addText(t, T({ x:x+0.5, y, w:4.0, h:0.5, fontSize:17, color:C.soft, valign:"middle" }));
  });

  s = slide("PHASE 7　講座のご案内", { dark:true });
  title(s, "最終的に目指すのは", { size:24, color:C.pink, y:0.95 });
  s.addText("「緊張しない選手」ではありません。", T({ x:0.5, y:1.5, w:6.2, h:0.6,
    fontSize:22, color:"E8D3D7", isTextBox:true, fontFace:F, margin:0 }));
  s.addText("何が起きても、\n「自分が何をすればいいかわかる」", T({ x:0.5, y:2.25, w:6.2, h:1.3,
    fontSize:27, bold:true, color:C.white, lineSpacing:42, isTextBox:true, fontFace:F, margin:0 }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:3.9, w:6.2, h:0.95,
    fill:{ color:C.bright }, line:{ color:C.bright }, rectRadius:0.08 });
  s.addText("そして「試合が楽しみです」と言える選手へ。", T({ x:0.85, y:3.9, w:5.6, h:0.95,
    fontSize:19, bold:true, color:C.white, valign:"middle" }));
  s.addImage({ data: await A("speak", "FFFFFF"), x:7.1, y:1.8, w:2.5, h:2.5 });

  s = slide("PHASE 7　講座のご案内");
  title(s, "受講料", { size:26, color:C.muted, y:1.0 });
  s.addText("98,000", T({ x:0.5, y:1.5, w:5.2, h:1.5, fontSize:82, bold:true, color:C.wine }));
  s.addText("円（税込）", T({ x:5.05, y:2.35, w:2, h:0.6, fontSize:24, bold:true, color:C.wine }));
  ["全10回","1回60分","完全1対1","最長3か月"].forEach((t,i)=>{
    s.addShape(pres.ShapeType.roundRect, { x:0.5 + i*2.3, y:3.5, w:2.1, h:0.72,
      fill:{ color:C.rose }, line:{ color:C.rose }, rectRadius:0.36 });
    s.addText(t, T({ x:0.5 + i*2.3, y:3.5, w:2.1, h:0.72, fontSize:17, bold:true,
      color:C.wine, align:"center", valign:"middle" }));
  });

  s = slide("PHASE 7　講座のご案内");
  title(s, "今回は5名限定です", { size:33 });
  s.addText("たくさんの方へ一斉に教える講座ではありません。",
    T({ x:0.5, y:1.9, w:6.2, h:0.45, fontSize:17, color:C.soft }));
  s.addText(["次の大会","取りたい記録","過去の試合","考え方の特徴","その人に必要なメンタルスキル"]
    .map((t,i,a)=>({ text:t, options:{ bullet:true, breakLine:i<a.length-1 } })),
    T({ x:0.65, y:2.45, w:6.0, h:1.7, fontSize:17, color:C.soft, paraSpaceAfter:6 }));
  s.addShape(pres.ShapeType.roundRect, { x:0.5, y:4.35, w:6.2, h:0.8,
    fill:{ color:C.deep }, line:{ color:C.deep }, rectRadius:0.08 });
  s.addText("一人ひとりを把握し、じっくり関わりたいから。", T({ x:0.85, y:4.35, w:5.6, h:0.8,
    fontSize:17, bold:true, color:C.white, valign:"middle" }));
  s.addImage({ data: await A("five", C.wine), x:7.1, y:1.9, w:2.4, h:2.4 });
  s.addText("5名に達した時点で、今回の受付は終了します。", T({ x:6.9, y:4.45, w:2.7, h:0.6,
    fontSize:13, color:C.muted, lineSpacing:20 }));

  /* ===================== Phase 8｜クロージング ===================== */
  s = slide("PHASE 8　クロージング");
  title(s, "今日話してみて、\n何が一番印象に残りましたか？", { size:31, w:6.2, y:1.0 });
  card(s, ["今の自分に必要だと思ったこと", "次の試合までに変えたいこと", "聞いておきたいこと"],
       { y:2.8, w:6.2, size:18, gap:0.62 });
  s.addText("まず、あなたの感想を聞かせてください。", T({ x:0.5, y:4.8, w:6.2, h:0.45,
    fontSize:18, bold:true, color:C.wine }));
  s.addImage({ data: await A("voices", C.wine), x:7.1, y:2.2, w:2.4, h:2.4 });

  s = slide(null, { dark:true });
  s.addImage({ path:"images/closing-dark.jpg", x:0, y:0, w:W, h:H, sizing:{ type:"cover", w:W, h:H } });
  s.addText("次の試合で変えたいのは、\n重量だけでしょうか。", T({ x:0.7, y:1.05, w:8.6, h:1.5,
    fontSize:32, bold:true, color:C.white, lineSpacing:50, align:"center" }));
  s.addText("身体を準備する。技術を準備する。そして、メンタルも準備する。",
    T({ x:0.7, y:2.9, w:8.6, h:0.5, fontSize:19, color:"F2E7E9", align:"center" }));
  s.addShape(pres.ShapeType.roundRect, { x:2.0, y:3.75, w:6.0, h:1.0,
    fill:{ color:C.white }, line:{ color:C.white }, rectRadius:0.1 });
  s.addText("ここぞの一本で、積み重ねてきた力を\n発揮できる選手へ。", T({ x:2.0, y:3.75, w:6.0, h:1.0,
    fontSize:18, bold:true, color:C.deep, align:"center", valign:"middle", lineSpacing:28 }));

  await pres.writeFile({ fileName: "consultation-deck.pptx" });
  console.log("スライド枚数:", no);
}
build().catch(e => { console.error(e); process.exit(1); });
