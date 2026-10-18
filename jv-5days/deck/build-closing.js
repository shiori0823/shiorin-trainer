const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_16x9";
p.author = "佐藤 栞";
p.title  = "今日の私、どうしたい？";

const ROSE="C9325C", ROSE_D="A42647", ROSE_S="E8A0B4",
      BRUSH="F7DCE3", BRUSH2="FCEEF2",
      GOLD="C4A06A", GOLD_L="E8D8BC",
      BG="FDF5F6", WHITE="FFFFFF",
      INK="3F2E33", MUTED="8C757C";
const MIN="Yu Mincho", GOT="Yu Gothic";

const T=(o)=>Object.assign({fontFace:GOT,color:INK,charSpacing:0.4},o);
const M=(o)=>Object.assign({fontFace:MIN,color:INK,charSpacing:0.8},o);

const s = p.addSlide();
s.background={color:BG};

// 金のふち
s.addShape(p.ShapeType.roundRect,{x:0.20,y:0.20,w:9.60,h:5.225,rectRadius:0.04,
  fill:{color:BG},line:{color:GOLD_L,width:0.75}});

// ---- ① 問い -----------------------------------------------------
s.addText("5DAYS　毎朝のしめ", T({x:0.70,y:0.50,w:8.6,h:0.26,fontSize:9.5,
  bold:true,color:GOLD,charSpacing:2.0,align:"center"}));

s.addShape(p.ShapeType.roundRect,{x:2.55,y:0.90,w:4.90,h:0.72,rectRadius:0.5,
  fill:{color:BRUSH},line:{color:BRUSH,width:0}});
s.addText("「今日の私、どうしたい？」", M({x:1.00,y:0.90,w:8.0,h:0.72,
  fontSize:30,bold:true,color:ROSE_D,align:"center",valign:"middle"}));

// ---- ② 選択肢 ---------------------------------------------------
s.addText("ことばにしにくい日は、この4つから", T({x:0.70,y:1.78,w:8.6,h:0.26,
  fontSize:11,color:MUTED,align:"center"}));

const opts=["頑張りたい","休みたい","楽しみたい","整えたい"];
const ow=1.92, og=0.22, otot=opts.length*ow+(opts.length-1)*og;
let ox=(10-otot)/2;
opts.forEach((t,i)=>{
  const fill = (i%2===0) ? ROSE : GOLD;
  s.addShape(p.ShapeType.roundRect,{x:ox,y:2.12,w:ow,h:0.60,rectRadius:0.5,
    fill:{color:fill},line:{color:fill,width:0}});
  s.addText(t, M({x:ox,y:2.12,w:ow,h:0.60,fontSize:17,bold:true,
    color:WHITE,align:"center",valign:"middle"}));
  ox+=ow+og;
});

// ---- ③ 決める ---------------------------------------------------
s.addShape(p.ShapeType.roundRect,{x:1.80,y:2.98,w:6.40,h:0.64,rectRadius:0.09,
  fill:{color:BRUSH2},line:{color:ROSE_S,width:1.0}});
s.addText("じゃあ今日、自分のために何を一つ選ぶ？", M({x:1.80,y:2.98,w:6.40,h:0.64,
  fontSize:19,bold:true,color:ROSE_D,align:"center",valign:"middle"}));

// ---- 例 ---------------------------------------------------------
s.addShape(p.ShapeType.rect,{x:0.95,y:3.92,w:8.10,h:0.012,fill:{color:GOLD_L}});
s.addText("たとえば", T({x:0.95,y:4.02,w:8.10,h:0.24,fontSize:10,
  bold:true,color:GOLD,charSpacing:1.4}));

const ex=[
  ["イライラせずに過ごしたい","焦らず、一つずつやりたい","家族に優しく接したい"],
  ["仕事に集中したい","自分のペースで過ごしたい","疲れたら休みたい"],
  ["ご飯をゆっくり食べたい","人と比べずに過ごしたい","早めに寝たい"],
];
const cw=2.70, cg=0.00;
ex.forEach((col,ci)=>{
  col.forEach((t,ri)=>{
    const x=0.95+ci*cw, y=4.30+ri*0.31;
    s.addShape(p.ShapeType.ellipse,{x:x,y:y+0.085,w:0.09,h:0.09,
      fill:{color: ri%2===0 ? ROSE_S : GOLD_L}});
    s.addText(t, T({x:x+0.20,y:y,w:cw-0.26,h:0.28,fontSize:10.5,
      color:INK,valign:"middle"}));
  });
});

p.writeFile({fileName:"5days-closing.pptx"}).then(()=>console.log("できました"));
