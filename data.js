// data.js — Demo Day team directory + supporting data
// JP + EN edition (Tokyo). Secondary language slot ("ZH" object / lang === 'zh')
// is populated with Japanese — the bilingual engine is unchanged so this stays
// a faithful baseline you can re-point at a different event.
const TEAMS = [
  { id:"gntc", linkedin:"https://www.linkedin.com/in/kytu800", order:1, name:"GNTC", sub:"Enterprise AI agents for non-engineers", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Kytu Lin", title:"Founder & CEO", email:"kytu@dcard.cc", website:"https://gntc.com/", speakerOrder:1,
    pitch:"Enterprise AI agent platform helping non-engineers deploy and manage AI in the workplace." },
  { id:"voiss", linkedin:"https://www.linkedin.com/in/voissfoundermax", order:2, name:"Voiss", sub:"AI voice platform for enterprises", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Max Tseng", title:"CEO & Founder", email:"max.tseng@voiss.cc", cc:"info@voiss.cc", website:"https://voiss.cc", speakerOrder:2,
    pitch:"AI voice platform powering conversational brand characters and immersive simulations for enterprises." },
  { id:"barkingdog", linkedin:"https://barkingdog.ai", order:3, name:"BarkingDog", sub:"No-code AI agents & virtual humans", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Guan-Wen Hsu (許冠文)", title:"Founder & CEO", email:"alex@barkingdog.ai", website:"https://barkingdog.ai", speakerOrder:3,
    pitch:"No-code platform for building AI agents and virtual humans that automate enterprise customer service and training at scale." },
  { id:"raccoon", linkedin:"https://www.linkedin.com/in/james-chou-1b6374b8", order:4, name:"Raccoon AI", sub:"Autonomous AI customer service", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"James Chou", title:"Co-Founder & CEO", email:"james@j-tcg.com", website:"https://www.raccoonai.co/", speakerOrder:4,
    pitch:"AI customer service agent that autonomously resolves 70%+ of e-commerce support tickets." },
  { id:"omnichat", linkedin:"https://www.linkedin.com/in/alan-ct-chan", order:5, name:"Omnichat", sub:"AI chat commerce platform", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Alan Chan", title:"Founder & CEO", email:"alan.chan@omnichat.ai", website:"https://www.omnichat.ai", speakerOrder:5,
    pitch:"Asia's only AI chat commerce platform certified by both Meta and LINE, turning every conversation into a transaction." },
  { id:"cake", linkedin:"https://www.linkedin.com/in/trantorliu", order:6, name:"Cake", sub:"AI copilot for careers & hiring", tags:["AI","Enterprise"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Trantor Liu", title:"Founder & CEO", email:"trantor.liu@cakeresume.com", website:"https://www.cakeresume.com", speakerOrder:6,
    pitch:"AI Copilot for Careers and Hiring." },
  { id:"returnhelper", linkedin:"https://www.linkedin.com/in/shumpei-shibata-0a06a32b/", order:7, name:"ReturnHelper", sub:"Returns optimization for ecommerce", tags:["AI","Mobility"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Shumpei Shibata", title:"GM of JP/KR", email:"shumpei.shibata@returnhelper.com", website:"https://www.returnhelper.com/", speakerOrder:7,
    pitch:"Optimising returns for global ecommerce merchants." },
  { id:"kopherbit", linkedin:"https://kopherbit.com", order:8, name:"KopherBit", sub:"AI software for commercial EVs", tags:["AI","Mobility"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Yung Chen Wang", title:"Founder & CEO", email:"pc.lu@kopherbit.com", website:"https://kopherbit.com", speakerOrder:8,
    pitch:"A Taiwan-born automotive software innovator, enabling commercial EV makers with AI-powered development platforms, vehicle control systems, and SDV-ready technologies." },
  { id:"luggagent", linkedin:"https://www.linkedin.com/in/lance-lin-ba2010b0", order:9, name:"Luggagent", sub:"Luggage-free travel platform", tags:["AI","Mobility"], batch:"IVS", stage:"Pitching", market:"Taiwan", hq:"TW", language:"English", presenter:"Lance Lin", title:"CEO & Founder", email:"lance@luggagent.com", website:"https://www.luggagent.com", speakerOrder:9,
    pitch:"LuggAgent helps travelers move without luggage and turns their free travel time into new revenue opportunities for airlines, hotels, and destinations." },

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
  agendaTitles: ['オープニング', '台湾スタートアップ・ピッチセッション｜9 チーム', 'オープンフロア・ネットワーキング'],
  album: { eyebrow: 'ACCUPAI 提供', heading: 'ライブフォトアルバム。', sub: 'Accupai が会場をリアルタイム撮影——その場で閲覧・ダウンロード・シェアできます。' },
  partners: {
    cardTitle: 'Wistron Accelerator',
    body: 'AI・ロボティクス・サステナビリティ・次世代コンピューティングに注力する事業会社主導のアクセラレーター。Wistron のグローバル製造ネットワークと法人顧客にスタートアップをつなぎます。第 10 期は商用 POC への道筋を持つ新たなチームをお届けします。',
    programs: '期', alumni: '卒業生', pitching: '本日の登壇チーム',
  },
  sponsors: { eyebrow: 'スポンサー・パートナーの皆さまに感謝します', heading: 'Demo Day スポンサー。' },
  footer: { ctaTitle: 'AW#33 は応募受付中！', ctaSub: 'ぜひご参加を——または起業家の友人をご紹介ください。' },
  teamSub: {
    gntc: '非エンジニア向けのエンタープライズ AI エージェント',
    voiss: '企業向け AI 音声プラットフォーム',
    barkingdog: 'ノーコードの AI エージェント＆バーチャルヒューマン',
    raccoon: '自律型 AI カスタマーサービス',
    omnichat: 'AI チャットコマース・プラットフォーム',
    cake: 'キャリアと採用のための AI コパイロット',
    returnhelper: 'EC 向け返品最適化',
    kopherbit: '商用 EV 向け AI ソフトウェア',
    luggagent: '手ぶら旅行プラットフォーム',
  },
  teamPitch: {
    gntc: '非エンジニアでも職場で AI を導入・運用できる、エンタープライズ AI エージェント・プラットフォーム。',
    voiss: '対話型ブランドキャラクターや没入型シミュレーションを実現する、企業向けの AI 音声プラットフォーム。',
    barkingdog: '企業のカスタマーサービスや研修を大規模に自動化する AI エージェント・バーチャルヒューマンを、ノーコードで構築できるプラットフォーム。',
    raccoon: 'EC のサポート問い合わせの 70% 以上を自律的に解決する AI カスタマーサービス・エージェント。',
    omnichat: 'Meta と LINE の両方に認定された、アジア唯一の AI チャットコマース・プラットフォーム。あらゆる会話を取引へと変えます。',
    cake: 'キャリアと採用のための AI コパイロット。',
    returnhelper: '世界の EC 事業者向けに、返品プロセスを最適化。',
    kopherbit: '台湾発の自動車ソフトウェア企業。AI を活用した開発プラットフォーム、車両制御システム、SDV 対応技術で商用 EV メーカーを支援。',
    luggagent: 'LuggAgent は旅行者が手ぶらで移動できるようにし、その自由な時間を航空会社・ホテル・観光地の新たな収益機会へと変えます。',
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
  keyVisual: true,    // IVS 2026 key visual banner
  nowOnStage: false,  // captions live in the floating widget, not an inline page strip
  heroDate: 'July 2nd',
  heroTime: 'Thu · 17:00–18:00',
  heroVenueShort: 'UP2-5',
  heroVenueSub: 'Miyako Messe',
  heroTeamsNote: '15 AppWorks · 4 Wistron',
  // Live caption engine — server-side via the shared Cloudflare Worker (same
  // API/keys as the AppWorks Demo Day edition). One operator triggers
  // translation from the broadcaster page (/broadcast?lang=ja); guests watch.
  // The worker outputs EN + Japanese for this edition.
  captionsWorker: 'https://ddtw-captions.hsichun.workers.dev',
  captionsLang: 'ja',
};
