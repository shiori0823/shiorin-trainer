// スライドの挿絵。すべて線画。col で線の色を変えられる（白地=ワイン／濃地=白）。
const S = (inner, col, w=6) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"
    stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

const bar = (y=100) => `<line x1="26" y1="${y}" x2="174" y2="${y}"/>
  <rect x="40" y="${y-22}" width="16" height="44" rx="4"/><rect x="58" y="${y-15}" width="11" height="30" rx="3"/>
  <rect x="144" y="${y-22}" width="16" height="44" rx="4"/><rect x="131" y="${y-15}" width="11" height="30" rx="3"/>`;

const head = (cx,cy,r=15) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
const body = (cx,cy) => `<path d="M${cx-24} ${cy+52} v-16 a24 24 0 0 1 48 0 v16"/>`;
const person = (cx,cy) => head(cx,cy)+body(cx,cy);

const I = {
  // 1 バーベル＝取りたい一本
  barbell: c => S(bar(100) + `<path d="M100 44 v18 M84 56 l16 -14 16 14"/>`, c),

  // 2 カレンダー＋的
  calendar: c => S(`<rect x="22" y="40" width="104" height="106" rx="9"/>
    <line x1="22" y1="70" x2="126" y2="70"/><line x1="50" y1="26" x2="50" y2="52"/><line x1="98" y1="26" x2="98" y2="52"/>
    <circle cx="150" cy="122" r="34"/><circle cx="150" cy="122" r="17"/><circle cx="150" cy="122" r="3.5" stroke-width="9"/>`, c),

  // 3 気持ち（心＋ゆらぎ）
  feeling: c => S(`<path d="M100 156 C56 124 34 102 34 76 A30 30 0 0 1 100 60 A30 30 0 0 1 166 76 C166 102 144 124 100 156Z"/>
    <path d="M62 96 q13 -14 26 0 t26 0 t26 0" stroke-width="5"/>`, c),

  // 4 チェックリスト
  checklist: c => S(`<rect x="34" y="26" width="132" height="148" rx="10"/>
    <path d="M56 62 l9 9 15 -18" stroke-width="7"/><line x1="96" y1="64" x2="146" y2="64"/>
    <path d="M56 104 l9 9 15 -18" stroke-width="7"/><line x1="96" y1="106" x2="146" y2="106"/>
    <path d="M56 146 l9 9 15 -18" stroke-width="7"/><line x1="96" y1="148" x2="146" y2="148"/>`, c),

  // 5 頭の中がいっぱい
  overthink: c => S(`<rect x="34" y="24" width="132" height="62" rx="16"/><path d="M70 86 v18 l20 -18"/>
    <circle cx="78" cy="55" r="6" stroke-width="9"/><circle cx="100" cy="55" r="6" stroke-width="9"/><circle cx="122" cy="55" r="6" stroke-width="9"/>
    <circle cx="100" cy="134" r="20"/><path d="M62 190 v-12 a38 38 0 0 1 76 0 v12"/>`, c),

  // 6 消えない不安（何度も戻ってくる）
  persist: c => S(`<rect x="34" y="76" width="132" height="64" rx="16"/><path d="M70 140 v18 l20 -18"/>
    <path d="M100 94 v22" stroke-width="11"/><circle cx="100" cy="126" r="3" stroke-width="11"/>
    <path d="M40 62 a58 58 0 0 1 110 -8" stroke-width="5"/><path d="M136 44 l16 10 -8 16" stroke-width="5"/>`, c),

  // 10 3つの思い込み
  myths: c => S(`<rect x="18" y="30" width="94" height="46" rx="12"/><path d="M42 76 v14 l16 -14"/>
    <rect x="54" y="104" width="94" height="46" rx="12"/><path d="M78 150 v14 l16 -14"/>
    <path d="M56 46 a10 10 0 1 1 12 12 v6" stroke-width="6"/><circle cx="68" cy="66" r="3" stroke-width="7"/>
    <path d="M92 120 a10 10 0 1 1 12 12 v6" stroke-width="6"/><circle cx="104" cy="140" r="3" stroke-width="7"/>`, c),

  // 11 トロフィー（「強い人が勝つ」）
  muscle: c => S(`<path d="M66 34 h68 v34 a34 34 0 0 1 -68 0Z"/>
    <path d="M66 44 h-18 a20 20 0 0 0 20 26"/><path d="M134 44 h18 a20 20 0 0 1 -20 26"/>
    <line x1="100" y1="102" x2="100" y2="132"/><path d="M72 166 h56 a8 8 0 0 0 -8 -14 h-40 a8 8 0 0 0 -8 14Z"/>`, c),

  // 12 塗り替えようとする（ローラーと不安）
  repaint: c => S(`<path d="M40 92 a24 24 0 0 1 36 -21 a24 24 0 0 1 40 21 a19 19 0 0 1 -6 37 H46 a19 19 0 0 1 -6 -37Z"/>
    <rect x="112" y="40" width="58" height="26" rx="6"/><path d="M141 66 v22 h-14 v18"/>
    <rect x="116" y="106" width="22" height="46" rx="6"/>`, c),

  // 13 ラベルを貼る
  label: c => S(`<path d="M104 30 h58 a12 12 0 0 1 12 12 v58 L96 178 L26 108Z"/>
    <circle cx="146" cy="58" r="9"/>`, c),

  // 14 自分で変える（循環）
  selfchange: c => S(person(100,96) + `<path d="M40 100 a60 60 0 0 1 106 -38" stroke-width="5"/>
    <path d="M128 58 l20 4 -6 20" stroke-width="5"/>
    <path d="M160 100 a60 60 0 0 1 -106 38" stroke-width="5"/>
    <path d="M72 138 l-20 -4 6 -20" stroke-width="5"/>`, c),

  // 15 5ステップの循環
  cycle: c => S(`<circle cx="100" cy="100" r="62" stroke-dasharray="20 14"/>
    <circle cx="100" cy="38" r="11"/><circle cx="159" cy="81" r="11"/><circle cx="136" cy="151" r="11"/>
    <circle cx="64" cy="151" r="11"/><circle cx="41" cy="81" r="11"/>`, c),

  // 16 分解
  split: c => S(`<rect x="24" y="76" width="52" height="48" rx="8"/>
    <path d="M84 100 h26" /><path d="M100 88 l14 12 -14 12" stroke-width="5"/>
    <rect x="124" y="42" width="52" height="34" rx="7"/><rect x="124" y="86" width="52" height="34" rx="7"/>
    <rect x="124" y="130" width="52" height="34" rx="7"/>`, c),

  // 17 分ける（左右）
  divide: c => S(`<rect x="20" y="42" width="70" height="116" rx="9"/>
    <rect x="110" y="42" width="70" height="116" rx="9"/>
    <path d="M40 88 l30 30 M70 88 l-30 30" stroke-width="7"/>
    <path d="M126 104 l12 12 22 -28" stroke-width="7"/>`, c),

  // 18 事実と評価
  factjudge: c => S(`<rect x="24" y="58" width="66" height="84" rx="9"/><rect x="110" y="58" width="66" height="84" rx="9"/>
    <path d="M42 100 l11 11 20 -24" stroke-width="7"/>
    <path d="M128 84 q15 20 30 0" stroke-width="6"/><circle cx="143" cy="120" r="4" stroke-width="8"/>`, c),

  // 19 3種類の目標
  targets: c => S(`<circle cx="100" cy="100" r="66"/><circle cx="100" cy="100" r="42"/><circle cx="100" cy="100" r="18"/>
    <circle cx="100" cy="100" r="3" stroke-width="10"/>`, c),

  // 20 今日の選択
  choose: c => S(`<rect x="26" y="42" width="148" height="120" rx="10"/><line x1="26" y1="74" x2="174" y2="74"/>
    <path d="M52 108 l11 11 22 -26" stroke-width="7"/>
    <path d="M118 100 l28 28 M146 100 l-28 28" stroke-width="7"/>`, c),

  // 21 変化
  transform: c => S(`<circle cx="52" cy="100" r="30"/>
    <path d="M96 100 h44" /><path d="M126 86 l16 14 -16 14" stroke-width="5"/>
    <path d="M162 100 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0" stroke-dasharray="0"/>
    <path d="M148 100 l10 10 18 -22" stroke-width="6"/>`, c),

  // 23 積み重ね
  stairs: c => S(`<path d="M22 168 h40 v-36 h40 v-36 h40 v-36 h36"/>
    <path d="M164 26 v34 M148 42 l16 -16 16 16"/>`, c),

  // 26 1対1オンライン
  online: c => S(`<rect x="20" y="46" width="160" height="100" rx="10"/><line x1="76" y1="166" x2="124" y2="166"/>
    <line x1="100" y1="146" x2="100" y2="166"/>
    <circle cx="68" cy="88" r="13"/><path d="M50 122 v-8 a18 18 0 0 1 36 0 v8"/>
    <circle cx="132" cy="88" r="13"/><path d="M114 122 v-8 a18 18 0 0 1 36 0 v8"/>`, c),

  // 28 試合が楽しみです
  speak: c => S(`<path d="M28 40 h144 a12 12 0 0 1 12 12 v72 a12 12 0 0 1 -12 12 H92 l-34 30 v-30 H28 a12 12 0 0 1 -12 -12 V52 a12 12 0 0 1 12 -12Z"/>
    <path d="M64 88 q18 -16 36 0 t36 0" stroke-width="6"/>`, c),

  // 30 5名限定
  five: c => S(`<circle cx="40" cy="70" r="14"/><path d="M22 106 v-8 a18 18 0 0 1 36 0 v8"/>
    <circle cx="100" cy="70" r="14"/><path d="M82 106 v-8 a18 18 0 0 1 36 0 v8"/>
    <circle cx="160" cy="70" r="14"/><path d="M142 106 v-8 a18 18 0 0 1 36 0 v8"/>
    <circle cx="70" cy="140" r="14"/><path d="M52 176 v-8 a18 18 0 0 1 36 0 v8"/>
    <circle cx="130" cy="140" r="14"/><path d="M112 176 v-8 a18 18 0 0 1 36 0 v8"/>`, c),

  // 31 感想
  voices: c => S(`<path d="M22 42 h108 a10 10 0 0 1 10 10 v54 a10 10 0 0 1 -10 10 H62 l-26 24 v-24 H22 a10 10 0 0 1 -10 -10 V52 a10 10 0 0 1 10 -10Z"/>
    <path d="M164 96 h14 a10 10 0 0 1 10 10 v42 a10 10 0 0 1 -10 10 h-8 v20 l-22 -20 h-38 a10 10 0 0 1 -10 -10 v-42 a10 10 0 0 1 10 -10h40" stroke-dasharray="0"/>`, c),

  // 24 あなたの場合
  youask: c => S(person(76,96) + `<path d="M136 52 a20 20 0 1 1 20 20 v10" stroke-width="7"/>
    <circle cx="156" cy="100" r="4" stroke-width="9"/>`, c),
};
module.exports = I;
