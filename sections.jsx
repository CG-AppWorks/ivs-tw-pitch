// sections.jsx — Agenda, Album, About, Partners, Sponsors, IntroModal

function Agenda({ language }) {
  return (
    <section className="section bone" id="agenda">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>{tr(language, 'Agenda.', ZH.agenda.heading)}</h2>
          </div>
        </div>
        <div className={`agenda${window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false ? ' one-col' : ''}`}>
          {AGENDA.map((s, i) =>
          <div key={i} className="slot" style={s.wide ? { gridColumn: '1/-1' } : {}}>
              <div className="t">{s.t}</div>
              <div className="title">{tr(language, s.title, (ZH.agendaTitles || [])[i])}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.Agenda = Agenda;

function Album({ language }) {
  const ALBUM_URL = "https://live.accupai.com/live/54823180?utm_source=DD32TW&utm_medium=website&utm_campaign=demoday";
  return (
    <section className="section tight" id="album">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'POWERED BY ACCUPAI', ZH.album.eyebrow)}</div>
            <h2>{tr(language, 'Live photo album.', ZH.album.heading)}</h2>
            <p className="sub">{tr(language, 'Real-time event photos — view, download, and share on the spot.', ZH.album.sub)}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a className="btn primary" href={ALBUM_URL} target="_blank" rel="noopener">{tr(language, 'Open live album', 'ライブアルバムを開く')} <I.arrow /></a>
          </div>
        </div>
      </div>
    </section>);
}
window.Album = Album;

function About({ language }) {
  // Follow the nav language toggle. Non-bilingual editions (e.g. SG) stay English.
  const zh = (window.EVENT_CONFIG ? window.EVENT_CONFIG.bilingual !== false : true) && language === 'zh';
  const cards = [
  {
    title: "AppWorks",
    en: "Founded in 2009, AppWorks is an accelerator built by founders, for founders — which has since expanded into a broader startup community and venture capital platform. Just as the Mobile Internet reshaped entire industries, we believe AI and blockchain are driving the next major paradigm shift. Founders lead the work of building great companies; our role is to support them from the seed stage onward with long-term guidance, capital, and a strong regional network.",
    zh: "2009 年設立。創業者による、創業者のためのアクセラレーターであり、それを基盤に発展したスタートアップコミュニティとベンチャーキャピタルです。モバイルインターネットが産業を大きく変えたように、AI とブロックチェーンが次の重要なパラダイムシフトを推進すると私たちは信じています。主役は創業者、投資家は脇役。シードステージから長期的な伴走・資本・強固な地域ネットワークでチームを支えます。",
    link: "https://appworks.tw/",
    stats: [
    { v: "663", l: "Startups", num: true },
    { v: "2,189", l: "Founders", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>{zh ? "汎アジア" : "Pan-Asia"}</span>, l: "Region" }]

  },
  {
    title: "AppWorks Accelerator",
    en: "Founded in 2010, AppWorks Accelerator selects the most promising teams every six months, helping founders go from 0 to 1 to product–market fit and scale. The ecosystem now spans 663 active startups and 2,189 founders — including 135 AI startups and 144 Web3 startups. Collectively they have raised US$ 8.1B, reached US$ 42.1B in valuation, generate US$ 18.6B in annual revenue, and created 28,256 jobs across 9 markets.",
    zh: "2010 年設立。半年ごとに最も有望なチームを選抜し、創業者が 0→1、そして Product–Market Fit と拡大を実現できるよう支援します。エコシステムは現在 663 社の活発なスタートアップと 2,189 名の創業者を擁し、AI 135 社・Web3 144 社を含みます。累計調達額 81 億米ドル、評価額 421 億米ドル、年間売上高 186 億米ドル、9 つの市場で 28,256 の雇用を創出しています。",
    link: "https://appworks.tw/accelerator/",
    stats: [
    { v: "US$ 8.1B", l: "Total Raised", num: true },
    { v: "US$ 42.1B", l: "Total Valuation", num: true },
    { v: "28,256", l: "Jobs Created", num: true }]

  },
  {
    title: "AppWorks Funds",
    en: "AppWorks manages four venture capital funds totaling US$ 386M. We invest from Seed to Series C, funding 20–30 deals a year, now with 130+ portfolio names — Lalamove, Dapper Labs / Flow, Animoca Brands, 91APP, Figment, Carousell, ShopBack, 17LIVE, KKday — and have produced 6 IPOs, 9 IEOs, 1 hectocorn, 2 decacorns, and 8 unicorns.",
    zh: "総額 3.86 億米ドルの 4 つのベンチャーファンドを運用。シードからシリーズ C まで、年間 20〜30 件に投資し、現在 130 社以上をポートフォリオに擁します——Lalamove、Dapper Labs / Flow、Animoca Brands、91APP、Figment、Carousell、ShopBack、17LIVE、KKday など。これまでに 6 件の IPO、9 件の IEO、1 社のヘクトコーン、2 社のデカコーン、8 社のユニコーンを輩出しました。",
    link: "https://appworks.tw/investments/",
    stats: [
    { v: "US$ 386M", l: "AUM", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>6 / 8</span>, l: "IPOs · Unicorns" },
    { v: "130+", l: "Portfolio", num: true }]

  },
  {
    title: "Aiworks",
    en: "Aiworks supports enterprises in advancing AI and automation transformation through consulting and workforce training — from foundational literacy to practical implementation. It has helped Taiwan Mobile, SinoPac, Nanshan Life, Hotai Insurance, and Hanlin Publishing build AI capabilities. As an OpenAI Service Partner, Aiworks has empowered 200+ enterprises and 20,000+ professionals across telecom, finance, retail, publishing, and technology.",
    zh: "コンサルティングと人材育成を通じて、企業の AI・自動化への変革を支援します——基礎リテラシーから実装まで。台湾大哥大、SinoPac、南山人壽、和泰産險、翰林出版などの AI 能力構築を支援してきました。OpenAI のサービスパートナーとして、通信・金融・小売・出版・テクノロジーの各分野で 200 社以上の企業と 20,000 名以上の専門人材を支援しています。",
    link: "https://aiworks.tw/",
    stats: [
    { v: "200+", l: "Enterprises", num: true },
    { v: "20,000+", l: "Trained", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>OpenAI</span>, l: "Partner" }]

  }];


  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">SINCE 2009 </div>
            <h2>{zh ? 'AppWorks について。' : 'About AppWorks.'}</h2>
            <p className="sub">{zh ? 'アクセラレーター、コミュニティ、ベンチャーキャピタル——創業者による、創業者のために。' : 'An accelerator, a community, and venture capital — built by founders, for founders.'}</p>
          </div>
        </div>
        <div className="about-grid">
          {cards.map((c, i) =>
          <div key={i} className="about-card">
              <h3>{c.title}<span className="dot">.</span></h3>
              <p className={zh ? 'zh' : ''}>{zh ? c.zh : c.en}</p>
              <div className="stats-inline">
                {c.stats.map((s, j) =>
              <div key={j} className="stat">
                    <div className="v">{s.num ? <span className="num">{s.v}</span> : s.v}</div>
                    <div className="l">{s.l}</div>
                  </div>
              )}
              </div>
              <a className="btn outline sm arrow" href={c.link} target="_blank" rel="noopener">
                More information <I.arrow />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.About = About;

function OrganizingPartners({ language }) {
  const blocks = [
    {
      name: 'A2Growth',
      body: "A2Growth is the growth-stage accelerator for digital-native startups going global, backed by AVA — Taiwan's leading early-stage venture platform with two funds, 40+ active angel investors, and a cross-border portfolio across Asia and the US. Powered by AWS's global cloud and partner ecosystem, A2Growth delivers the capital, mentorship, and market access to accelerate the next wave of global founders.",
      link: 'https://www.a2growth.cloud/',
    },
    {
      name: 'Startup Island Taiwan',
      body: "Taiwan's national startup brand, co-created by the National Development Council (NDC) and Taiwan's startup community. Its mission: put Taiwan's most innovative startups on the global map. From Silicon Valley to Tokyo, Startup Island TAIWAN represents the best of Taiwan's entrepreneurial ecosystem on the world stage.",
      link: 'https://startupisland.tw',
    },
  ];
  return (
    <section className="section" id="organizing-partners">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'Organizing partners', '主催パートナー')}</div>
            <h2>{tr(language, 'In collaboration with.', '共同主催。')}</h2>
          </div>
        </div>
        <div className="org-grid">
          {blocks.map((b, i) =>
          <div key={i} className="about-card org-card">
            <h3>{b.name}<span className="dot">.</span></h3>
            <p>{b.body}</p>
            <a className="btn outline sm arrow" href={b.link} target="_blank" rel="noopener">
              {tr(language, 'Learn more', '詳細はこちら')} <I.arrow />
            </a>
          </div>
          )}
        </div>
      </div>
    </section>);
}
window.OrganizingPartners = OrganizingPartners;

function Partners({ favorites = [], onFav = () => {}, onIntro = () => {}, onOpenLive = () => {}, density = 'comfy', accentIntensity = 'balanced', language }) {
  const waTeams = (window.TEAMS || []).filter((t) => t.batch === 'WA#10');
  const zh = (window.EVENT_CONFIG ? window.EVENT_CONFIG.bilingual !== false : true) && language === 'zh';
  return (
    <section className="section bone" id="partners">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Wistron #10.</h2>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <h3>Wistron<span className="dot">.</span></h3>
            <p className={zh ? 'zh' : ''}>{tr(language,
              "Wistron is one of the world's leading manufacturers in the ICT industry. In recent years it has invested in R&D, technology innovation, and diversified product development, integrating hardware devices, software services, and cloud data systems into technical-service platforms and solutions — building new technology supply chains and innovation platforms, and expanding into new fields such as education, enterprise services, IoT, and healthcare. Building toward a sustainable, long-term business, Wistron pursues forward-looking strategic investments and technology partners, and in recent years has already invested over NT$14 billion across more than 60 companies.",
              "緯創（Wistron）は ICT 業界をリードする世界有数のメーカーです。近年は研究開発・技術革新・多角的な製品開発に投資し、ハードウェア機器・ソフトウェアサービス・クラウドデータシステムを統合して技術サービスプラットフォームとソリューションを構築。新たな技術サプライチェーンとイノベーション基盤を築き、教育・企業向けサービス・IoT・ヘルスケアなどの新領域へ展開しています。持続可能な長期事業に向け、先見性のある戦略投資と技術パートナーを追求し、近年すでに 60 社以上に 140 億台湾ドル超を投資してきました。")}</p>
            <div className="stats-inline">
              <div className="stat"><div className="v"><span className="num">NT$14B+</span></div><div className="l">{tr(language, 'Invested', '累計投資額')}</div></div>
              <div className="stat"><div className="v"><span className="num">60+</span></div><div className="l">{tr(language, 'Companies', '投資先')}</div></div>
              <div className="stat"><div className="v"><span style={{ color: '#ff6b0f' }}>ICT</span></div><div className="l">{tr(language, 'Global leader', '世界的リーダー')}</div></div>
            </div>
            <a className="btn outline sm arrow" href="https://www.wistron.com/" target="_blank" rel="noopener">{tr(language, 'More information', '詳細はこちら')} <I.arrow /></a>
          </div>
          <div className="about-card">
            <h3>Wistron Accelerator<span className="dot">.</span></h3>
            <p className={zh ? 'zh' : ''}>{tr(language,
              "To broaden and deepen its collaboration with startups, Wistron set up its corporate venture capital office (CVC) in 2021 and launched the Wistron Accelerator together with AppWorks — a leading launchpad for bold and ambitious entrepreneurs targeting Greater Southeast Asia (GSEA). Through strategic investment and partnership, it actively builds Wistron's growth engines for the future. The program is operated by AppWorks, runs twice a year, and recruits a limited cohort of 7 startups per batch.",
              "スタートアップとの協業を広げ深めるため、Wistron は 2021 年にコーポレートベンチャーキャピタル（CVC）を設立し、AppWorks とともに Wistron Accelerator を立ち上げました——Greater Southeast Asia（GSEA）を狙う野心的な起業家のための有力なローンチパッドです。戦略投資とパートナーシップを通じて、Wistron の未来の成長エンジンを積極的に構築します。本プログラムは AppWorks が運営し、年 2 回開催、各期 7 社限定で募集します。")}</p>
            <div className="stats-inline">
              <div className="stat"><div className="v"><span className="num">10</span></div><div className="l">{tr(language, 'Programs', ZH.partners.programs)}</div></div>
              <div className="stat"><div className="v"><span className="num">7</span></div><div className="l">{tr(language, 'Per batch', '各期の定員')}</div></div>
              <div className="stat"><div className="v"><span className="num">4</span></div><div className="l">{tr(language, 'Teams pitching today', ZH.partners.pitching)}</div></div>
            </div>
            <a className="btn outline sm arrow" href="https://appworks.tw/wistron/" target="_blank" rel="noopener">{tr(language, 'More information', '詳細はこちら')} <I.arrow /></a>
          </div>
        </div>
        {waTeams.length > 0 && window.TeamCard &&
        <div className={`teams ${density}`} style={{ marginTop: 24 }}>
          {waTeams.map((t) =>
          <window.TeamCard key={t.id} team={t}
          density={density}
          favorited={favorites.includes(t.id)}
          onFav={onFav} onIntro={onIntro} onOpenLive={onOpenLive}
          accentLive={accentIntensity !== 'restrained'}
          liveTeamId={null} language={language} />
          )}
        </div>
        }
      </div>
    </section>);
}
window.Partners = Partners;

function Sponsors({ language }) {
  // DD#32 sponsors + event partner — logo lockups, shown together.
  const sponsors = [
  { name: 'Google Cloud', src: 'assets/sponsor-google.svg', h: 30 },
  { name: 'AWS', src: 'assets/sponsor-aws.svg', h: 34 },
  { name: 'KKCOMPANY', src: 'assets/sponsor-kkcompany.svg', h: 40 }];

  return (
    <section className="section tight" id="sponsors">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'Thank you to our sponsors & partners', ZH.sponsors.eyebrow)}</div>
            <h2>{tr(language, 'Demo Day sponsors.', ZH.sponsors.heading)}</h2>
          </div>
        </div>
        <div className="sponsors three">
          {sponsors.map((s, i) =>
          <div key={i} className="sp">
              <img src={s.src} alt={s.name} style={{ height: s.h + 'px', width: 'auto' }} />
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.Sponsors = Sponsors;

/* ─── Event partners (attendee perks + promo codes, from the deck) ─── */
function EventPartners({ language }) {
  // Taipei-event perks only — not shown on the Singapore edition.
  if (!window.EVENT_CONFIG || window.EVENT_CONFIG.edition !== 'TW') return null;
  const partners = [
    { name: 'WeMo', logo: 'assets/logos/partner-wemo.png', note: 'AW#12', offers: [
      { perk: tr(language, 'WeMo PASS · 2-month free trial', 'WeMo PASS 2 個月 0 元體驗'), code: 'APPWORKS32', valid: tr(language, 'Redeem 2026/6/17–7/19', '兌換期限 2026/6/17–7/19') },
      { perk: tr(language, 'WeMo PASS · buy a season, get a season', 'WeMo PASS 買季送季'), code: 'APPWORKS32Q', valid: tr(language, 'Enter on 6/17 only', '限 6/17 當天輸入兌換') },
    ] },
    { name: 'USPACE', logo: 'assets/logos/partner-uspace.png', note: 'AW#18', width: 'wide', offers: [
      { perk: tr(language, 'Parking credit NT$150 (NT$15 ×10) + car rental NT$1,000 voucher (3+ days)', '停車金 $150（$15×10）＋ 租車 $1,000 折價券（租 3 日以上）'), code: 'AW32USPACE', valid: tr(language, 'Valid until 2026/12/31', '使用期限至 2026/12/31') },
      { perk: tr(language, 'USPACE Premium · 10% off first month', 'USPACE Premium 首月 9 折'), code: 'uspace.app.link/appworks2026', valid: tr(language, 'Valid until 2026/12/31', '使用期限至 2026/12/31') },
    ] },
    { name: 'LINE GO', logo: 'assets/logos/partner-linego.png', note: '', width: 'narrow', offers: [
      { perk: tr(language, 'Taxi ride voucher · NT$50', '計程車乘車券 50 元'), code: 'APPWORKS32', valid: tr(language, 'Collect & use on 6/17 only', '限 6/17 當天領取使用') },
    ] },
  ];
  return (
    <section className="section tight" id="event-partners">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'Perks for attendees', '與會者專屬優惠')}</div>
            <h2>{tr(language, 'Event partners.', '活動夥伴。')}</h2>
          </div>
        </div>
        <div className="ep-grid">
          {partners.map((p, i) =>
          <div key={i} className={`ep-card ${p.width || ''}`}>
            <div className="ep-name">{p.logo ? <img className="ep-logo" src={p.logo} alt={p.name}/> : <span>{p.name}</span>}{p.note && <span className="ep-batch">{p.note}</span>}</div>
            {p.offers.map((o, j) =>
            <div key={j} className="ep-offer">
              <div className="ep-perk">{o.perk}</div>
              <div className="ep-meta"><code className="ep-code">{o.code}</code><span className="ep-valid">{o.valid}</span></div>
            </div>
            )}
          </div>
          )}
        </div>
      </div>
    </section>);

}
window.EventPartners = EventPartners;

function BoothMap({ language }) {
  // Venue layout — shown on Taipei + Tokyo editions, not Singapore.
  if (!window.EVENT_CONFIG || (window.EVENT_CONFIG.edition !== 'TW' && window.EVENT_CONFIG.edition !== 'JP')) return null;
  const left   = [['GreenBidz','greenbidz'], ['Ruomei','ruomei'], ['Phasetrum','phasetrum'], ['CloudStation','cloudstation']];      // Wistron #10
  const right  = [['Arrivl','arrivl'], ['CLIKA','clika'], ['Notifly','notifly'], ['Krush','krush']];                              // AppWorks #32
  const bottom = [['SixSense','sixsense'], ['Shieldbase','shieldbase'], ['Rosary Labs','rosary'], ['Pathors','pathors'],
                  ['OmniEase AI','omniease'], ['Novo AI','novo'], ['NOTAG KOREA','notag'], ['LIPS','lips'],
                  ['Innowave Tech','innowave'], ['Hyarks','hyarks'], ['Decisions Lab','decisionslab']];
  // Tap a booth -> scroll to that team's card and flash it.
  const jump = (id) => {
    const card = document.getElementById('team-' + id);
    const target = card || document.getElementById('teams');
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (card) { card.classList.add('card-flash'); setTimeout(() => card.classList.remove('card-flash'), 1500); }
  };
  const booth = ([n, id], cls) => <button key={id} type="button" className={`bm-booth ${cls}`} onClick={() => jump(id)}>{n}</button>;
  return (
    <section className="section tight" id="booth-map">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'At the venue', '会場にて')}</div>
            <h2>{tr(language, 'Booth map.', '会場マップ。')}</h2>
            <p className="sub">{tr(language, 'Find each team during the open-floor networking.', 'ネットワーキングの時間に各チームを見つけられます。')}</p>
          </div>
        </div>
        <div className="bm-scroll">
          <div className="bm-venue">
            <div className="bm-stage">{tr(language, 'Stage', '舞台')}</div>
            <div className="bm-mid">
              <div className="bm-col">{left.map((n) => booth(n, 'wa'))}</div>
              <div className="bm-col">{right.map((n) => booth(n, 'aw'))}</div>
            </div>
            <div className="bm-bottom">{bottom.map((n) => booth(n, 'aw'))}</div>
          </div>
        </div>
        <div className="bm-legend">
          <span><i className="bm-dot aw" />{tr(language, 'AppWorks #32', 'AppWorks #32')}</span>
          <span><i className="bm-dot wa" />{tr(language, 'Wistron #10', 'Wistron #10')}</span>
        </div>
      </div>
    </section>);
}
window.BoothMap = BoothMap;

/* ─── Intro modal ─── */
function IntroModal({ team, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!team) return null;

  const subject = `[Taiwan Startup Pitch Session at IVS] Intro request — ${team.name}`;
  const body =
  `Hi ${team.name} team,

I'm connecting after attending Taiwan Startup Pitch Session at IVS 2026. Your pitch — "${team.pitch}" — resonated with us, and we'd love to explore working together.

A quick note about us:
• Name / Role:
• Organisation:
• Focus area / Why we're reaching out:

Could we set up a 30-minute chat in the next two weeks?

Best,
(via Taiwan Startup Pitch Session at IVS)`;

  const mailto = `mailto:${team.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const copy = () => {
    navigator.clipboard?.writeText(`To: ${team.email}\nSubject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="head">
          <h3>Connect with <span className="accent">{team.name}</span></h3>
          <button className="close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="body">
          <div>
            <label>To</label>
            <div className="field">{team.email}</div>
          </div>
          <div>
            <label>Subject</label>
            <div className="field">{subject}</div>
          </div>
          <div>
            <label>Message</label>
            <div className="field">{body}</div>
          </div>
        </div>
        <div className="foot">
          <span className="hint">Opens your default email client, pre-filled.</span>
          <button className="btn outline sm" onClick={copy}>{copied ? 'Copied ✓' : 'Copy to clipboard'}</button>
          <a className="btn primary sm" href={mailto}>Open email <I.send /></a>
        </div>
      </div>
    </div>);

}
window.IntroModal = IntroModal;