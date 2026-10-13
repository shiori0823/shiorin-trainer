const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_16x9";          // 10in × 5.625in
p.author = "佐藤 栞";
p.title  = "私ファーストプログラム 5DAYS KICKOFF";

const WINE="7A1524", INK="2B2224", MUTED="7A6E6B", LINE="E8DCDB",
      BG="FDF7F7", WHITE="FFFFFF", GOLD="B08D5B";
const MIN="Yu Mincho";
const GOT="Yu Gothic";

const T=(o)=>Object.assign({fontFace:GOT,color:INK,charSpacing:0.4},o);
const M=(o)=>Object.assign({fontFace:MIN,color:INK,charSpacing:0.6},o);

// ---- 共通パーツ -------------------------------------------------
function base(bg){
  const s=p.addSlide();
  s.background={color: bg||BG};
  return s;
}
function head(s, eyebrow, title, opt){
  opt=opt||{};
  s.addText(eyebrow, T({x:0.62,y:0.42,w:8.8,h:0.26,fontSize:10,bold:true,
    color:WINE,charSpacing:1.6}));
  s.addShape(p.ShapeType.rect,{x:0.62,y:0.73,w:0.5,h:0.035,fill:{color:WINE}});
  s.addText(title, M({x:0.62,y:0.90,w:opt.w||8.8,h:opt.h||0.95,
    fontSize:opt.fs||27,bold:true,lineSpacing:opt.ls||36}));
}
function foot(s,n){
  s.addText("私ファーストプログラム 5DAYS", T({x:0.62,y:5.12,w:4.5,h:0.26,
    fontSize:8.5,color:MUTED}));
  s.addText(String(n), T({x:8.9,y:5.12,w:0.5,h:0.26,fontSize:8.5,
    color:MUTED,align:"right"}));
}
// 箇条
function bullets(s, items, y, opt){
  opt=opt||{};
  const gap = opt.gap || 0.52;
  items.forEach((t,i)=>{
    s.addShape(p.ShapeType.ellipse,{x:0.70,y:y+gap*i+0.13,w:0.09,h:0.09,
      fill:{color:opt.dot||WINE}});
    s.addText(t, T({x:0.98,y:y+gap*i,w:opt.w||8.3,h:gap,fontSize:opt.fs||15,
      lineSpacing:opt.ls||24,valign:"middle"}));
  });
}
// カード
function card(s,x,y,w,h,title,body,accent){
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.06,
    fill:{color:WHITE},line:{color:accent?WINE:LINE,width:accent?1.4:0.8}});
  s.addText(title, T({x:x+0.26,y:y+0.22,w:w-0.52,h:0.34,fontSize:13.5,
    bold:true,color:WINE}));
  s.addText(body, T({x:x+0.26,y:y+0.62,w:w-0.52,h:h-0.84,fontSize:11.5,
    lineSpacing:17,color:INK,valign:"top"}));
}

// ================================================================
// 1  表紙
// ================================================================
{
  const s=base(WINE);
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:10,h:0.06,fill:{color:GOLD}});
  s.addText("KICK OFF", T({x:0.9,y:1.30,w:8.2,h:0.3,fontSize:11,bold:true,
    color:"E7C9A8",charSpacing:2.4,align:"center"}));
  s.addText("私ファーストプログラム", M({x:0.9,y:1.72,w:8.2,h:0.7,fontSize:33,
    bold:true,color:WHITE,align:"center"}));
  s.addText("5 DAYS", M({x:0.9,y:2.44,w:8.2,h:0.72,fontSize:40,bold:true,
    color:"F3D9C4",align:"center",charSpacing:4}));
  s.addShape(p.ShapeType.rect,{x:4.35,y:3.32,w:1.3,h:0.025,fill:{color:"E7C9A8"}});
  s.addText("2026年10月18日", T({x:0.9,y:3.58,w:8.2,h:0.3,fontSize:13,
    color:"F0DEDE",align:"center"}));
  s.addText("しおりん（佐藤 栞）　×　みゆき", T({x:0.9,y:3.94,w:8.2,h:0.32,
    fontSize:14,color:WHITE,align:"center"}));
  s.addText("明日から5日間、1日15分だけ「私」を最優先にする",
    T({x:0.9,y:4.46,w:8.2,h:0.3,fontSize:11.5,color:"E7C9A8",align:"center"}));
}

// ================================================================
// 2  しおりん
// ================================================================
{
  const s=base();
  head(s,"SPEAKER 01","私が、身体を整えることを\n伝える理由",{ls:40,h:1.1});
  s.addText("トレーナー／パワーリフター　しおりん（佐藤 栞）",
    T({x:0.62,y:2.08,w:8.8,h:0.3,fontSize:13,bold:true,color:WINE}));
  s.addText("仕事　／　トレーニング　／　子育て",
    T({x:0.62,y:2.46,w:8.8,h:0.3,fontSize:12,color:MUTED}));
  s.addShape(p.ShapeType.rect,{x:0.62,y:2.92,w:8.76,h:0.012,fill:{color:LINE}});
  s.addText("身体を整えることで、\n外に向いた矢印を、自分に戻す。",
    M({x:0.62,y:3.12,w:8.8,h:0.76,fontSize:21,bold:true,lineSpacing:32}));
  s.addText("正しく立つことは、私にとって、思考を切り替えるスイッチです。",
    T({x:0.62,y:4.06,w:8.8,h:0.32,fontSize:13,color:MUTED}));
  foot(s,2);
}

// ================================================================
// 3  みゆきさん
// ================================================================
{
  const s=base();
  head(s,"SPEAKER 02","私が、所作を\n伝える理由",{ls:40,h:1.1});
  s.addText("マナー講師　みゆき",
    T({x:0.62,y:2.08,w:8.8,h:0.3,fontSize:13,bold:true,color:WINE}));
  s.addText("家族や仕事を優先して、自分はいつも後回しだった",
    T({x:0.62,y:2.46,w:8.8,h:0.3,fontSize:12,color:MUTED}));
  s.addShape(p.ShapeType.rect,{x:0.62,y:2.92,w:8.76,h:0.012,fill:{color:LINE}});
  s.addText("所作を整えることは、\n自分を丁寧に扱うこと。",
    M({x:0.62,y:3.12,w:8.8,h:0.76,fontSize:21,bold:true,lineSpacing:32}));
  s.addText("マナーは、正しく見せるためだけのものではありません。",
    T({x:0.62,y:4.06,w:8.8,h:0.32,fontSize:13,color:MUTED}));
  foot(s,3);
}

// ================================================================
// 4  参加者の自己紹介
// ================================================================
{
  const s=base();
  head(s,"HELLO","まず、少しだけ\nお互いを知りましょう",{ls:40,h:1.1});
  bullets(s,[
    "お名前",
    "普段、どんなことをしていますか？",
    "この5DAYSで、ちょっと楽しみにしていること",
  ],2.28,{gap:0.58,fs:16});
  s.addShape(p.ShapeType.roundRect,{x:0.62,y:4.14,w:8.76,h:0.74,rectRadius:0.06,
    fill:{color:"FBEFEF"},line:{color:"F0DCDC",width:0.8}});
  s.addText("30秒くらいで大丈夫です。　話したくないことは、話さなくて大丈夫です。",
    T({x:0.9,y:4.30,w:8.2,h:0.42,fontSize:13,color:WINE,bold:true,valign:"middle"}));
  foot(s,4);
}

// ================================================================
// 5  なぜ参加しようと思いましたか
// ================================================================
{
  const s=base();
  head(s,"QUESTION 01","なぜ、この5DAYSに\n参加しようと思いましたか？",{ls:40,h:1.1,fs:26});
  s.addText("うまく言葉にできなくても大丈夫です。",
    T({x:0.62,y:2.26,w:8.8,h:0.3,fontSize:14,color:MUTED}));
  s.addShape(p.ShapeType.rect,{x:0.62,y:2.80,w:8.76,h:0.012,fill:{color:LINE}});
  s.addText("「なんとなく気になった」も、\nちゃんとした理由です。",
    M({x:0.62,y:3.06,w:8.8,h:0.8,fontSize:22,bold:true,lineSpacing:34,color:WINE}));
  foot(s,5);
}

// ================================================================
// 6  5日後、どんな自分になっていたい？
// ================================================================
{
  const s=base();
  head(s,"QUESTION 02","5日後、\nどんな自分になっていたい？",{ls:40,h:1.1,fs:26});
  const items=[
    "朝、自分のための時間がとれている",
    "自分の疲れに、気づける",
    "食事を一度、丁寧に食べられる",
    "イライラしたときに、一度止まれる",
    "「今日の私、どうしたい？」が聞けている",
  ];
  bullets(s,items,2.22,{gap:0.46,fs:14.5});
  s.addText("近いものを、1つ選んでみてください。ほかにあれば、それでも大丈夫です。",
    T({x:0.62,y:4.72,w:8.8,h:0.3,fontSize:11.5,color:MUTED}));
  foot(s,6);
}

// ================================================================
// 7  私ファースト＝「自分だけ優先」ではない
// ================================================================
{
  const s=base();
  head(s,"CONCEPT","私ファーストは、\n「自分だけ優先」ではありません",{ls:40,h:1.1,fs:25});
  card(s,0.62,2.22,4.26,1.26,"✗　ちがうもの","自分のことだけを優先する\n誰かを後回しにする");
  card(s,5.12,2.22,4.26,1.26,"◯　こちらです","自分を、置いていかない",true);
  s.addShape(p.ShapeType.rect,{x:0.62,y:3.78,w:8.76,h:0.012,fill:{color:LINE}});
  s.addText("誰かのために動くことは、変えなくていい。\nその順番の中に、自分を入れるだけです。",
    M({x:0.62,y:3.98,w:8.8,h:0.8,fontSize:19,bold:true,lineSpacing:30}));
  foot(s,7);
}

// ================================================================
// 8  3つの思い込みを外す
// ================================================================
{
  const s=base();
  head(s,"MINDSET","3つの思い込みを、外します",{h:0.7,fs:26});
  const rows=[
    ["「時間がないから無理」",
     "朝15分だけでも、一度自分に意識を戻す体験はできます"],
    ["「自己流でやってきたから、今さら聞けない」",
     "身体も所作も、一度プロから習うと新しい気づきが生まれます"],
    ["「5日間やっても、変われないかも」",
     "5日で人生を変えるのではなく、"+"\n"+"「自分に戻る方法」をひとつ持ち帰ります"],
  ];
  let y=1.74;
  rows.forEach((r,i)=>{
    const h = i===2 ? 1.18 : 0.90;
    s.addShape(p.ShapeType.roundRect,{x:0.62,y,w:8.76,h,rectRadius:0.06,
      fill:{color:WHITE},line:{color:LINE,width:0.8}});
    s.addText(r[0], T({x:0.92,y:y+0.15,w:8.2,h:0.30,fontSize:14,bold:true,color:MUTED}));
    s.addText("→　"+r[1], T({x:0.92,y:y+0.48,w:8.2,h:h-0.58,fontSize:13.5,
      color:WINE,bold:true,lineSpacing:19,valign:"top"}));
    y += h + 0.12;
  });
  foot(s,8);
}

// ================================================================
// 9  今日の私、どうしたい？
// ================================================================
{
  const s=base(WINE);
  s.addText("THE QUESTION", T({x:0.9,y:1.32,w:8.2,h:0.28,fontSize:10,bold:true,
    color:"E7C9A8",charSpacing:2.2,align:"center"}));
  s.addText("「今日の私、どうしたい？」", M({x:0.7,y:1.86,w:8.6,h:0.9,fontSize:36,
    bold:true,color:WHITE,align:"center"}));
  s.addShape(p.ShapeType.rect,{x:4.35,y:3.00,w:1.3,h:0.025,fill:{color:"E7C9A8"}});
  s.addText("この5日間の、共通の問いです。", T({x:0.9,y:3.26,w:8.2,h:0.32,
    fontSize:15,color:"F0DEDE",align:"center"}));
  s.addText("正解を出すためではなく、自分の声を聞くために。",
    T({x:0.9,y:3.72,w:8.2,h:0.32,fontSize:15,color:WHITE,align:"center",bold:true}));
  s.addText("身体を整えたあとも、所作を整えたあとも、最後にここへ戻ります。",
    T({x:0.9,y:4.30,w:8.2,h:0.3,fontSize:11.5,color:"E7C9A8",align:"center"}));
}

// ================================================================
// 10  明日からの5DAYS
// ================================================================
{
  const s=base();
  head(s,"5 DAYS","明日からの朝15分で、\nやること",{ls:38,h:1.0,fs:25});
  const c=[
    ["からだの5分","しおりん","身体を本来の位置に整えて、\n気持ちも思考もすっきり"],
    ["所作の5分","みゆき","和食のマナーで、\nいつもの食事を私のための時間に"],
    ["今日の私の5分","おふたりで","「今日の私、\nどうしたい？」と\n自分の心に耳を傾ける"],
  ];
  c.forEach((v,i)=>{
    const x = 0.62 + i*3.00;
    s.addShape(p.ShapeType.roundRect,{x,y:2.26,w:2.76,h:2.02,rectRadius:0.06,
      fill:{color:WHITE},line:{color:i===2?WINE:LINE,width:i===2?1.4:0.8}});
    s.addShape(p.ShapeType.rect,{x:x+0.26,y:2.50,w:0.34,h:0.03,fill:{color:GOLD}});
    s.addText(v[0], M({x:x+0.26,y:2.64,w:2.24,h:0.36,fontSize:16,bold:true,color:WINE}));
    s.addText(v[1], T({x:x+0.26,y:3.02,w:2.24,h:0.26,fontSize:10.5,color:MUTED}));
    s.addText(v[2], T({x:x+0.26,y:3.30,w:2.24,h:0.86,fontSize:11.5,lineSpacing:17}));
  });
  s.addText("今日は方法までは教えません。明日から、実際に体験します。",
    T({x:0.62,y:4.56,w:8.8,h:0.3,fontSize:12.5,color:MUTED}));
  foot(s,10);
}

// ================================================================
// 11  あなたの5日後を、1つ決めよう
// ================================================================
{
  const s=base();
  head(s,"YOUR GOAL","あなたの5日後を、\n1つ決めましょう",{ls:38,h:1.0,fs:26});
  s.addText("5日後に、どんな小さな変化があったら\n「ちょっと変わった」と思えそうですか？",
    M({x:0.62,y:2.20,w:8.8,h:0.78,fontSize:19,bold:true,lineSpacing:30,color:WINE}));
  s.addShape(p.ShapeType.rect,{x:0.62,y:3.10,w:8.76,h:0.012,fill:{color:LINE}});
  card(s,0.62,3.18,4.26,1.64,"✗　大きすぎるもの","毎朝、完璧に起きられた\n5日で体が変わった");
  card(s,5.12,3.18,4.26,1.64,"◯　これくらいで十分です",
       "自分の疲れに気づけた\n食事を一度、丁寧に食べられた\nイライラしたときに深呼吸できた",true);
  foot(s,11);
}

// ================================================================
// 12  明日から ＋ Q&A
// ================================================================
{
  const s=base();
  head(s,"START","明日から、まず15分だけ\n「私」を入れる",{ls:38,h:1.0,fs:26});
  s.addShape(p.ShapeType.roundRect,{x:0.62,y:2.20,w:8.76,h:1.08,rectRadius:0.06,
    fill:{color:"FBEFEF"},line:{color:"F0DCDC",width:0.8}});
  s.addText("10月19日（月）〜 23日（金）　　毎朝 6:30 – 6:45",
    M({x:0.92,y:2.42,w:8.2,h:0.44,fontSize:21,bold:true,color:WINE}));
  s.addText("Zoomのリンクは、前日の夜までにお送りします。",
    T({x:0.92,y:2.88,w:8.2,h:0.28,fontSize:12,color:MUTED}));
  s.addText("寝坊した日があっても、次の朝また来れば大丈夫です。",
    M({x:0.62,y:3.52,w:8.8,h:0.42,fontSize:19,bold:true}));
  s.addText("Q & A", T({x:0.62,y:4.18,w:8.8,h:0.3,fontSize:11,bold:true,
    color:WINE,charSpacing:2}));
  s.addText("聞きたいことがあれば、なんでもどうぞ。",
    T({x:0.62,y:4.48,w:8.8,h:0.3,fontSize:13,color:MUTED}));
  foot(s,12);
}

p.writeFile({fileName:"5days-kickoff.pptx"}).then(()=>{
  console.log("スライド枚数: 12");
});
