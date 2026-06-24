// data.js — Demo Day team directory + supporting data
// JP + EN edition (Tokyo). Secondary language slot ("ZH" object / lang === 'zh')
// is populated with Japanese — the bilingual engine is unchanged so this stays
// a faithful baseline you can re-point at a different event.
const TEAMS = [
  { id:"gntc", linkedin:"https://www.linkedin.com/in/james-chou-1b6374b8", order:1, name:"GNTC", sub:"Enterprise AI agents for non-engineers", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Kytu Lin", title:"Founder & CEO", email:"kytu@dcard.cc", website:"https://gntc.com/", speakerOrder:1,
    pitch:"Enterprise AI agent platform helping non-engineers deploy and manage AI in the workplace." },
  { id:"raccoon", linkedin:"https://www.linkedin.com/in/kytu800", order:2, name:"Raccoon AI", sub:"Autonomous AI customer service", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"James Chou", title:"Co-Founder & CEO", email:"james@j-tcg.com", website:"https://www.raccoonai.co/", speakerOrder:2,
    pitch:"AI customer service agent that autonomously resolves 70%+ of e-commerce support tickets." },
  { id:"luggagent", linkedin:"https://www.linkedin.com/in/lance-lin-ba2010b0", order:3, name:"Luggagent", sub:"Luggage-free travel platform", tags:["AI","Mobility"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Lance Lin", title:"CEO & Founder", email:"lance@luggagent.com", website:"https://www.luggagent.com", speakerOrder:3,
    pitch:"LuggAgent helps travelers move without luggage and turns their free travel time into new revenue opportunities for airlines, hotels, and destinations." },
  { id:"returnhelper", linkedin:"https://www.linkedin.com/in/roy-wan-624a1357", order:4, name:"ReturnHelper", sub:"Returns optimization for ecommerce", tags:["AI","Mobility"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Roy Wan", title:"Founder & CEO", email:"roy@returnhelper.com", website:"https://www.returnhelper.com/", speakerOrder:4,
    pitch:"Optimising returns for global ecommerce merchants." },
  { id:"omnichat", linkedin:"https://www.linkedin.com/in/alan-ct-chan", order:5, name:"Omnichat", sub:"AI chat commerce platform", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Alan Chan", title:"Founder & CEO", email:"alan.chan@omnichat.ai", website:"https://www.omnichat.ai", speakerOrder:5,
    pitch:"Asia's only AI chat commerce platform certified by both Meta and LINE, turning every conversation into a transaction." },
  { id:"cake", linkedin:"https://www.linkedin.com/in/trantorliu", order:6, name:"Cake", sub:"AI copilot for careers & hiring", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Trantor Liu", title:"Founder & CEO", email:"trantor.liu@cakeresume.com", website:"https://www.cakeresume.com", speakerOrder:6,
    pitch:"AI Copilot for Careers and Hiring." },
  { id:"voiss", linkedin:"https://www.linkedin.com/in/voissfoundermax", order:7, name:"Voiss", sub:"AI voice platform for enterprises", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Max Tseng", title:"CEO & Founder", email:"max.tseng@voiss.cc", website:"https://voiss.cc", speakerOrder:7,
    pitch:"AI voice platform powering conversational brand characters and immersive simulations for enterprises." },
  { id:"barkingdog", linkedin:"https://barkingdog.ai", order:8, name:"BarkingDog", sub:"No-code AI agents & virtual humans", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Guan-Wen Hsu (許冠文)", title:"Founder & CEO", email:"alex@barkingdog.ai", website:"https://barkingdog.ai", speakerOrder:8,
    pitch:"No-code platform for building AI agents and virtual humans that automate enterprise customer service and training at scale." },
  { id:"kopherbit", linkedin:"https://kopherbit.com", order:9, name:"KopherBit", sub:"AI software for commercial EVs", tags:["AI","Mobility"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Yung Chen Wang", title:"Founder & CEO", email:"pc.lu@kopherbit.com", website:"https://kopherbit.com", speakerOrder:9,
    pitch:"A Taiwan-born automotive software innovator, enabling commercial EV makers with AI-powered development platforms, vehicle control systems, and SDV-ready technologies." },
];

const AGENDA = [
  { t:"17:00–17:10", title:"Opening",                             tag:"Stage UP2-5",  now:false },
  { t:"17:10–17:50", title:"Taiwan Startup Pitch Session | 9 Teams",              tag:"Pitches",     now:false },
  { t:"17:50–18:00", title:"Open Floor & Networking",    tag:"Networking",     now:false  },
];

const TABS = [
  { id:"teams",     label:"Teams" },
  { id:"agenda",    label:"Agenda" },
  { id:"about",     label:"About AppWorks" },
  { id:"organizing-partners", label:"Organizing Partners" },
];

Object.assign(window, { TEAMS, AGENDA, TABS });

// ─── Japanese (日本語) copy for the language toggle. ───
// Kept in English on purpose: Demo Day, AppWorks, Wistron, company + founder
// names, product names. Edit the wording here — it's the single source for 日本語.
const ZH = {
  tabs: { teams: 'チーム', agenda: 'アジェンダ', about: 'AppWorks について', partners: 'Wistron', 'booth-map': '会場マップ', 'organizing-partners': '主催パートナー' },
  teams: { heading: '登壇チーム。', sub: 'カードをタップして気になるチームを保存、または創業者との面談をリクエスト。' },
  agenda: { heading: 'アジェンダ。' },
  agendaTitles: ['受付', 'オープニング', 'AppWorks #32 デモ · 15 チーム', 'Wistron #10 デモ · 4 チーム', '交流会・カクテルネットワーキング'],
  album: { eyebrow: 'ACCUPAI 提供', heading: 'ライブフォトアルバム。', sub: 'Accupai が会場をリアルタイム撮影——その場で閲覧・ダウンロード・シェアできます。' },
  partners: {
    cardTitle: 'Wistron Accelerator',
    body: 'AI・ロボティクス・サステナビリティ・次世代コンピューティングに注力する事業会社主導のアクセラレーター。Wistron のグローバル製造ネットワークと法人顧客にスタートアップをつなぎます。第 10 期は商用 POC への道筋を持つ新たなチームをお届けします。',
    programs: '期', alumni: '卒業生', pitching: '本日の登壇チーム',
  },
  sponsors: { eyebrow: 'スポンサー・パートナーの皆さまに感謝します', heading: 'Demo Day スポンサー。' },
  footer: { ctaTitle: 'AW#33 は応募受付中！', ctaSub: 'ぜひご参加を——または起業家の友人をご紹介ください。' },
  teamSub: {
    notag: 'EC 輸出のための AI トレーディング', notifly: 'AI ネイティブのマーケティング自動化', krush: 'グローバルなアジアコミュニティ向けの出会い・SNS',
    clika: 'エッジ AI 向けモデル圧縮・コンパイル', innowave: '半導体製造のためのエージェント型 AI', lips: 'ロボティクスビジョンとエッジ AI',
    shieldbase: 'セキュアな企業向け AI OS', omniease: '貿易コンプライアンスと通関の自動化 AI', pathors: '電話対応のための音声 AI',
    rosary: 'AEC ワークフロー向け AI エージェント', novo: '保険の AI 請求処理', hyarks: '海洋産業向けロボティクス',
    arrivl: 'AI 可視性とエージェント主導の営業', decisionslab: 'B2B 営業のためのペルソナ・シミュレーション AI', sixsense: '製造業向け AI 品質管理',
    phasetrum: '衛星向けフェーズドアレイ RF チップ', ruomei: 'ナノ放熱マネジメント材料', greenbidz: '循環資産マーケットプレイス＆ESG',
    cloudstation: 'あらゆるクラウドへアプリと AI エージェントを展開',
  },
  teamPitch: {
    notag: '多国・多チャネル・多ブランドの EC 輸出物流と流通を自動化する AI トレーディング企業。',
    notifly: 'アジアのモバイルアプリ・コマース事業者向けに構築された AI ネイティブのマーケティング自動化。',
    krush: '文化マッチング、オフラインイベント、越境交流を通じて、世界中のアジアコミュニティをつなぐ出会い・SNS プラットフォーム。',
    clika: 'AI モデルを縮小し、エッジデバイス上で効率的に動作させるモデル圧縮・コンパイル技術。',
    innowave: '半導体・先端製造に向けたエージェント型 AI で、工場の自律化を推進。',
    lips: 'ロボティクスビジョンのプラットフォームとエッジ AI ソリューションのプロバイダー。',
    shieldbase: '知識とシステムを統合し、エージェントとワークフローを支えるセキュアな企業向け AI OS。',
    omniease: 'グローバルな貿易コンプライアンスと通関自動化のためのエージェント型 AI。',
    pathors: '複雑な電話対応を、ガイド付きで検証可能な音声 AI ワークフローへ変換。',
    rosary: '建築・エンジニアリング・建設（AEC）業界向けに、PDF・CAD・BIM のワークフローを自動化する AI エージェント。',
    novo: '保険会社向けの AI 請求処理の自動化と不正防止。',
    hyarks: '港湾・沿岸警備・石油ガス・海軍のために、海洋エコシステムを安全・持続可能・利用しやすくするマルチドメインのロボティクスソリューション。',
    arrivl: 'コンテンツを AI エージェントに見つけてもらいやすくし、エージェントの訪問を売上へ変換するツール。',
    decisionslab: 'B2B 営業チームが、アウトリーチを送る前に各見込み客の反応を予測できるペルソナ・シミュレーション AI。',
    sixsense: '欠陥検査と予測的品質管理を自動化し、半導体・先端製造ラインの歩留まりとサイクルタイムを高める AI 製造プラットフォーム。',
    phasetrum: 'AIP ＋特許取得済み Phase Tuner アーキテクチャでフェーズドアレイアンテナを実現——歩留まり 99%、消費電力 50% 削減、校正 10 倍高速。LEO 衛星・AESA レーダー・6G に対応。',
    ruomei: 'ナノスケールの放熱ソルダーマスク＋マイクロチャネル冷却。既存の SMT ラインにそのまま導入でき、プロセス変更ゼロで AI チップを冷却——「銅に代わるアルミ」の軽量化ソリューション。',
    greenbidz: '工場が余剰設備の価値を回収できる SaaS 型 B2B マーケットプレイス。企業の ESG 報告に必要な CO₂ とライフサイクルデータも自動で取得。',
    cloudstation: 'ノーコードのマルチクラウドプラットフォーム。技術者でない創業者でも、アプリ・データベース・自律型 AI エージェントを展開可能——「株式を渡さなくていい技術共同創業者」。',
  },
};
// Pick the right language; falls back to English if no zh string or not bilingual.
function tr(lang, en, zh) {
  return (window.EVENT_CONFIG && window.EVENT_CONFIG.bilingual !== false && lang === 'zh' && zh) ? zh : en;
}
Object.assign(window, { ZH, tr });

// Edition config — Tokyo (JP + EN).
window.EVENT_CONFIG = {
  edition: 'JP',
  city: 'Taiwan Startup Pitch Session | Kyoto',
  venue: 'Kyoto · IVS 2026',
  bilingual: true,    // EN + 日本語
  wordly: true,       // AI live interpretation
  album: false,        // live photo album — link only
  wistron: true,      // WA#10 cohort + partners section
  keyVisual: true,    // IVS 2026 key visual banner (assets/ivs-hero.jpg)
  nowOnStage: false,  // captions live in the floating widget, not an inline page strip
  heroDate: 'July 2nd',
  heroTime: 'Thu · 17:00–18:00',
  heroVenueShort: 'UP2-5',
  heroVenueSub: 'Miyako Messe',
  heroTeamsNote: '15 AppWorks · 4 Wistron',
  // Live caption engine — Gemini live translation (browser Speech Recognition
  // → Gemini API). Any truthy value enables the floating widget; the panel
  // gates on a Gemini API key entered + stored in the browser.
  captionsWorker: 'gemini',
};
