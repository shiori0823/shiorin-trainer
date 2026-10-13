const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_16x9";              // 10in × 5.625in
p.author = "佐藤 栞";
p.title  = "私ファーストプログラム 5DAYS KICKOFF";

// ---- 5DAYSのトンマナ（バナーに合わせた） ------------------------
const ROSE="C9325C", ROSE_D="A42647", ROSE_S="E8A0B4",
      BRUSH="F7DCE3", BRUSH2="FCEEF2",
      GOLD="C4A06A", GOLD_L="E8D8BC",
      BG="FDF5F6", WHITE="FFFFFF",
      INK="3F2E33", MUTED="8C757C";
const MIN="Yu Mincho", GOT="Yu Gothic";

const T=(o)=>Object.assign({fontFace:GOT,color:INK,charSpacing:0.4},o);
const M=(o)=>Object.assign({fontFace:MIN,color:INK,charSpacing:0.8},o);

function base(){ const s=p.addSlide(); s.background={color:BG}; return s; }
function goldFrame(s,i){ i=i||0.20;
  s.addShape(p.ShapeType.roundRect,{x:i,y:i,w:10-i*2,h:5.625-i*2,rectRadius:0.04,
    fill:{color:BG},line:{color:GOLD_L,width:0.75}}); }
function goldRule(s,x,y,w){
  s.addShape(p.ShapeType.rect,{x,y,w,h:0.012,fill:{color:GOLD_L}}); }
function brush(s,x,y,w,h){                       // 筆のひと刷け風
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.5,
    fill:{color:BRUSH},line:{color:BRUSH,width:0}}); }
function circlePhoto(s,path,x,y,d){              // 金のふちつき丸写真
  s.addShape(p.ShapeType.ellipse,{x:x-0.045,y:y-0.045,w:d+0.09,h:d+0.09,
    fill:{color:GOLD_L}});
  s.addImage({path,x,y,w:d,h:d,rounding:true});
}
function head(s,eyebrow,title,o){
  o=o||{};
  s.addText(eyebrow, T({x:0.70,y:0.46,w:8.6,h:0.26,fontSize:9.5,bold:true,
    color:GOLD,charSpacing:2.0}));
  brush(s,0.70,0.90,o.bw||3.1,0.30);
  s.addText(title, M({x:0.70,y:0.74,w:o.w||8.6,h:o.h||1.00,
    fontSize:o.fs||26,bold:true,color:ROSE_D,lineSpacing:o.ls||36}));
}
function foot(s,n){
  goldRule(s,0.70,5.02,8.6);
  s.addText("私ファーストプログラム 5DAYS", T({x:0.70,y:5.12,w:5,h:0.26,
    fontSize:8.5,color:MUTED}));
  s.addText(String(n), T({x:8.8,y:5.12,w:0.5,h:0.26,fontSize:8.5,
    color:MUTED,align:"right"}));
}
function cardSoft(s,x,y,w,h,title,body,hot){
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.09,
    fill:{color:WHITE},line:{color:hot?ROSE_S:GOLD_L,width:hot?1.3:0.8}});
  brush(s,x+0.22,y+0.20,Math.min(w-0.44, title.length*0.19+0.42),0.30);
  s.addText(title, M({x:x+0.30,y:y+0.17,w:w-0.60,h:0.34,fontSize:13,
    bold:true,color:ROSE_D}));
  s.addText(body, T({x:x+0.30,y:y+0.62,w:w-0.60,h:h-0.80,fontSize:11.5,
    lineSpacing:17,color:INK,valign:"top"}));
}
function checks(s,items,y,o){
  o=o||{};
  const gap=o.gap||0.50;
  items.forEach((t,i)=>{
    s.addShape(p.ShapeType.ellipse,{x:0.78,y:y+gap*i+0.07,w:0.21,h:0.21,
      fill:{color:i%2?GOLD:ROSE}});
    s.addText("✓", T({x:0.78,y:y+gap*i+0.07,w:0.21,h:0.21,fontSize:9,
      color:WHITE,bold:true,align:"center",valign:"middle"}));
    s.addText(t, T({x:1.12,y:y+gap*i,w:o.w||8.1,h:gap,fontSize:o.fs||14.5,
      lineSpacing:o.ls||22,valign:"middle"}));
  });
}

// ================================================================
// 1  表紙
// ================================================================
{
  const s=base(); goldFrame(s);
  s.addText("5 DAYS　KICK OFF", T({x:0.7,y:0.52,w:8.6,h:0.26,fontSize:10,
    bold:true,color:GOLD,charSpacing:2.6,align:"center"}));
  s.addText("私ファーストプログラム", M({x:0.7,y:0.84,w:8.6,h:0.56,fontSize:27,
    bold:true,color:ROSE_D,align:"center"}));
  s.addText("5DAYS", M({x:0.7,y:1.40,w:8.6,h:0.72,fontSize:40,bold:true,
    color:ROSE_D,align:"center",charSpacing:2}));
  brush(s,2.78,2.22,4.44,0.34);
  s.addText("朝15分で、ごきげんな私をつくる5日間",
    T({x:0.7,y:2.22,w:8.6,h:0.34,fontSize:13.5,bold:true,color:ROSE_D,
      align:"center",valign:"middle"}));

  circlePhoto(s,"images/miyuki.jpg", 3.42,2.78,1.36);
  circlePhoto(s,"images/shiorin.jpg",5.22,2.78,1.36);

  brush(s,3.06,4.22,2.08,0.28);
  s.addText("マナー講師　三浦みゆき", T({x:3.06,y:4.22,w:2.08,h:0.28,
    fontSize:9,bold:true,color:ROSE_D,align:"center",valign:"middle"}));
  brush(s,5.26,4.22,1.68,0.28);
  s.addText("トレーナー　しおりん", T({x:5.26,y:4.22,w:1.68,h:0.28,
    fontSize:9,bold:true,color:ROSE_D,align:"center",valign:"middle"}));

  s.addText("2026年10月18日", M({x:0.7,y:4.66,w:8.6,h:0.32,fontSize:14,
    bold:true,color:ROSE,align:"center"}));
  s.addText("明日から5日間、1日15分だけ「私」を最優先に　♡",
    T({x:0.7,y:5.00,w:8.6,h:0.28,fontSize:10.5,color:MUTED,align:"center"}));
}

// ================================================================
// 2  しおりん
// ================================================================
{
  const s=base();
  head(s,"SPEAKER  01","私が、身体を整えることを\n伝える理由",{ls:38,h:1.05,bw:4.3});
  circlePhoto(s,"images/shiorin.jpg",7.55,1.90,1.70);
  s.addText("トレーナー／パワーリフター　しおりん（佐藤 栞）",
    T({x:0.70,y:2.10,w:6.5,h:0.30,fontSize:12.5,bold:true,color:ROSE_D}));
  s.addText("仕事　／　トレーニング　／　子育て",
    T({x:0.70,y:2.46,w:6.5,h:0.28,fontSize:11.5,color:MUTED}));
  goldRule(s,0.70,2.90,6.5);
  s.addText("身体を整えることで、\n外に向いた矢印を、自分に戻す。",
    M({x:0.70,y:3.10,w:6.6,h:0.84,fontSize:20,bold:true,lineSpacing:31,color:INK}));
  s.addText("正しく立つことは、私にとって、思考を切り替えるスイッチです。",
    T({x:0.70,y:4.06,w:6.6,h:0.32,fontSize:12,color:MUTED}));
  foot(s,2);
}

// ================================================================
// 3  みゆきさん
// ================================================================
{
  const s=base();
  head(s,"SPEAKER  02","私が、所作を\n伝える理由",{ls:38,h:1.05,bw:2.5});
  circlePhoto(s,"images/miyuki.jpg",7.55,1.90,1.70);
  s.addText("マナー講師　三浦みゆき",
    T({x:0.70,y:2.10,w:6.5,h:0.30,fontSize:12.5,bold:true,color:ROSE_D}));
  s.addText("家族や仕事を優先して、自分はいつも後回しだった",
    T({x:0.70,y:2.46,w:6.5,h:0.28,fontSize:11.5,color:MUTED}));
  goldRule(s,0.70,2.90,6.5);
  s.addText("所作を整えることは、\n自分を丁寧に扱うこと。",
    M({x:0.70,y:3.10,w:6.6,h:0.84,fontSize:20,bold:true,lineSpacing:31,color:INK}));
  s.addText("マナーは、正しく見せるためだけのものではありません。",
    T({x:0.70,y:4.06,w:6.6,h:0.32,fontSize:12,color:MUTED}));
  foot(s,3);
}

// ================================================================
// 4  参加者の自己紹介
// ================================================================
{
  const s=base();
  head(s,"HELLO","まず、少しだけ\nお互いを知りましょう　♡",{ls:38,h:1.05,bw:4.0});
  checks(s,[
    "お名前",
    "普段、どんなことをしていますか？",
    "この5DAYSで、ちょっと楽しみにしていること",
  ],2.30,{gap:0.56,fs:15.5});
  s.addShape(p.ShapeType.roundRect,{x:0.70,y:4.14,w:8.6,h:0.70,rectRadius:0.09,
    fill:{color:BRUSH2},line:{color:ROSE_S,width:0.8}});
  s.addText("30秒くらいで大丈夫です。　話したくないことは、話さなくて大丈夫です。",
    T({x:0.95,y:4.14,w:8.1,h:0.70,fontSize:12.5,color:ROSE_D,bold:true,valign:"middle"}));
  foot(s,4);
}

// ================================================================
// 5  なぜ参加しようと思いましたか
// ================================================================
{
  const s=base();
  head(s,"QUESTION  01","なぜ、この5DAYSに\n参加しようと思いましたか？",{ls:38,h:1.05,fs:25,bw:4.4});
  s.addText("うまく言葉にできなくても大丈夫です。",
    T({x:0.70,y:2.26,w:8.6,h:0.30,fontSize:13.5,color:MUTED}));
  goldRule(s,0.70,2.78,8.6);
  brush(s,0.70,3.02,5.6,0.44);
  s.addText("「なんとなく気になった」も、\nりっぱな理由です。",
    M({x:0.70,y:3.00,w:8.6,h:0.84,fontSize:21,bold:true,lineSpacing:33,color:ROSE_D}));
  foot(s,5);
}

// ================================================================
// 6  5日後、どんな自分になっていたい？
// ================================================================
{
  const s=base();
  head(s,"QUESTION  02","5日後、\nどんな自分になっていたい？",{ls:38,h:1.05,fs:25,bw:1.8});
  checks(s,[
    "朝、自分のための時間がとれている",
    "自分の疲れに、気づける",
    "食事を一度、丁寧に食べられる",
    "イライラしたときに、一度止まれる",
    "「今日の私、どうしたい？」が聞けている",
  ],2.24,{gap:0.47,fs:14});
  s.addText("近いものを1つ選んでみてください。ほかにあれば、それでも大丈夫です。",
    T({x:0.70,y:4.70,w:8.6,h:0.28,fontSize:11,color:MUTED}));
  foot(s,6);
}

// ================================================================
// 7  私ファースト＝「自分だけ優先」ではない
// ================================================================
{
  const s=base();
  head(s,"CONCEPT","私ファーストは、\n「自分だけ優先」ではありません",{ls:38,h:1.05,fs:24,bw:4.6});
  cardSoft(s,0.70,2.26,4.16,1.26,"ちがうもの","自分のことだけを優先する\n誰かを後回しにする");
  cardSoft(s,5.14,2.26,4.16,1.26,"こちらです","自分を、置いていかない",true);
  goldRule(s,0.70,3.78,8.6);
  s.addText("誰かのために動くことは、変えなくていい。\nその順番の中に、自分を入れるだけです。",
    M({x:0.70,y:3.96,w:8.6,h:0.84,fontSize:18.5,bold:true,lineSpacing:30}));
  foot(s,7);
}

// ================================================================
// 8  3つの思い込みを外す
// ================================================================
{
  const s=base();
  head(s,"MINDSET","3つの思い込みを、外します",{h:0.62,fs:25,bw:4.5});
  const rows=[
    ["「時間がないから無理」",
     "朝15分だけでも、一度自分に意識を戻す体験はできます"],
    ["「自己流でやってきたから、今さら聞けない」",
     "身体も所作も、一度プロから習うと新しい気づきが生まれます"],
    ["「5日間やっても、変われないかも」",
     "5日で人生を変えるのではなく、\n　　　「自分に戻る方法」をひとつ持ち帰ります"],
  ];
  let y=1.72;
  rows.forEach((r,i)=>{
    const h = i===2 ? 1.18 : 0.90;
    s.addShape(p.ShapeType.roundRect,{x:0.70,y,w:8.6,h,rectRadius:0.09,
      fill:{color:WHITE},line:{color:GOLD_L,width:0.8}});
    s.addText(r[0], T({x:1.00,y:y+0.15,w:7.9,h:0.30,fontSize:13.5,bold:true,color:MUTED}));
    s.addText("→　"+r[1], T({x:1.00,y:y+0.48,w:7.9,h:h-0.58,fontSize:13,
      color:ROSE_D,bold:true,lineSpacing:19,valign:"top"}));
    y += h + 0.12;
  });
  foot(s,8);
}

// ================================================================
// 9  今日の私、どうしたい？
// ================================================================
{
  const s=base(); goldFrame(s);
  s.addText("THE  QUESTION", T({x:0.7,y:1.30,w:8.6,h:0.28,fontSize:10,bold:true,
    color:GOLD,charSpacing:2.4,align:"center"}));
  brush(s,1.92,1.84,6.16,0.92);
  s.addText("「今日の私、どうしたい？」", M({x:0.7,y:1.82,w:8.6,h:0.96,fontSize:34,
    bold:true,color:ROSE_D,align:"center",valign:"middle"}));
  goldRule(s,4.35,3.06,1.3);
  s.addText("この5日間の、共通の問いです。", T({x:0.7,y:3.30,w:8.6,h:0.32,
    fontSize:14.5,color:MUTED,align:"center"}));
  s.addText("正解を出すためではなく、自分の声を聞くために。",
    M({x:0.7,y:3.74,w:8.6,h:0.36,fontSize:17,color:ROSE_D,align:"center",bold:true}));
  s.addText("身体を整えたあとも、所作を整えたあとも、最後にここへ戻ります。",
    T({x:0.7,y:4.34,w:8.6,h:0.28,fontSize:11,color:MUTED,align:"center"}));
}

// ================================================================
// 10  明日からの5DAYS
// ================================================================
{
  const s=base();
  head(s,"5  DAYS","明日からの朝15分で、やること",{h:0.62,fs:25,bw:5.2});
  const c=[
    ["01","からだの5分","しおりん","身体を本来の位置に整えて、\n気持ちも思考もすっきり"],
    ["02","所作の5分","みゆき","和食のマナーで、\nいつもの食事を\n私のための時間に"],
    ["03","今日の私の5分","おふたりで","「今日の私、\nどうしたい？」と\n自分の心に耳を傾ける"],
  ];
  c.forEach((v,i)=>{
    const x = 0.70 + i*2.94;
    s.addShape(p.ShapeType.roundRect,{x,y:1.96,w:2.72,h:2.30,rectRadius:0.09,
      fill:{color:WHITE},line:{color:i===2?ROSE_S:GOLD_L,width:i===2?1.3:0.8}});
    s.addText(v[0], M({x:x+0.24,y:2.10,w:0.6,h:0.42,fontSize:20,bold:true,color:BRUSH}));
    brush(s,x+0.80,2.18,1.72,0.30);
    s.addText(v[1], M({x:x+0.80,y:2.16,w:1.72,h:0.32,fontSize:13.5,bold:true,
      color:ROSE_D,align:"center",valign:"middle"}));
    s.addText(v[2], T({x:x+0.24,y:2.62,w:2.24,h:0.26,fontSize:10,color:GOLD}));
    s.addText(v[3], T({x:x+0.24,y:2.94,w:2.24,h:1.10,fontSize:11.5,lineSpacing:17}));
  });
  s.addText("今日は方法までは教えません。明日から、実際に体験します。",
    T({x:0.70,y:4.46,w:8.6,h:0.30,fontSize:12.5,color:MUTED}));
  foot(s,10);
}

// ================================================================
// 11  あなたの5日後を、1つ決めよう
// ================================================================
{
  const s=base();
  head(s,"YOUR  GOAL","あなたの5日後を、1つ決めましょう",{h:0.62,fs:25,bw:5.4});
  brush(s,0.70,1.74,6.5,0.44);
  s.addText("5日後に、どんな小さな変化があったら\n「ちょっと変わった」と思えそうですか？",
    M({x:0.70,y:1.72,w:8.6,h:0.84,fontSize:18.5,bold:true,lineSpacing:30,color:ROSE_D}));
  cardSoft(s,0.70,2.78,4.16,1.44,"大きすぎるもの","毎朝、完璧に起きられた\n5日で体が変わった");
  cardSoft(s,5.14,2.78,4.16,1.44,"これくらいで十分です",
       "自分の疲れに気づけた\n食事を一度、丁寧に食べられた\nイライラしたときに深呼吸できた",true);
  foot(s,11);
}

// ================================================================
// 12  明日から ＋ Q&A
// ================================================================
{
  const s=base();
  head(s,"START","明日から、まず15分だけ「私」を入れる",{h:0.62,fs:24,bw:5.8});
  s.addShape(p.ShapeType.roundRect,{x:0.70,y:1.76,w:8.6,h:1.14,rectRadius:0.09,
    fill:{color:BRUSH2},line:{color:ROSE_S,width:1.0}});
  s.addText("10月19日（月）〜 23日（金）", M({x:1.00,y:1.94,w:5.2,h:0.40,
    fontSize:18,bold:true,color:ROSE_D}));
  s.addText("毎朝 6:30 – 6:45", M({x:6.20,y:1.94,w:2.9,h:0.40,
    fontSize:18,bold:true,color:ROSE}));
  s.addText("Zoomのリンクは、前日の夜までにお送りします。",
    T({x:1.00,y:2.44,w:8.0,h:0.28,fontSize:11.5,color:MUTED}));
  brush(s,0.70,3.16,6.9,0.46);
  s.addText("寝坊した日があっても、次の朝また来れば大丈夫です。",
    M({x:0.70,y:3.14,w:8.6,h:0.48,fontSize:19,bold:true,color:INK,valign:"middle"}));
  goldRule(s,0.70,3.92,8.6);
  s.addText("Q & A", T({x:0.70,y:4.10,w:8.6,h:0.28,fontSize:10.5,bold:true,
    color:GOLD,charSpacing:2.2}));
  s.addText("聞きたいことがあれば、なんでもどうぞ　♡",
    T({x:0.70,y:4.40,w:8.6,h:0.30,fontSize:13,color:MUTED}));
  foot(s,12);
}

p.writeFile({fileName:"5days-kickoff.pptx"}).then(()=>console.log("スライド枚数: 12"));
