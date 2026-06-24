// live.jsx — Live audience panel (chat / Q&A / polls / people)

// Which caption source guests currently see, per the server switch. Polls the
// captions Worker every 3s. Returns 'openai' | 'gemini' | 'wordly' | null.
const CAPTION_SOURCE_LABEL = { openai: 'OpenAI', gemini: 'Gemini', wordly: 'Wordly' };
function useActiveCaptionSource(worker) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!worker || !/^https?:/.test(worker)) return; // 'mock' / blank → static demo, no fetch
    let stop = false;
    const poll = () => fetch(worker + '/api/latest?channel=active', { cache: 'no-store' })
      .then((r) => r.json()).then((d) => { if (!stop) setActive(d.active); }).catch(() => {});
    poll();
    const id = setInterval(poll, 3000);
    return () => { stop = true; clearInterval(id); };
  }, [worker]);
  return active;
}

function LivePanel({ captionLanguage = 'en', onCaptionLanguageChange = () => {}, sessionId = 'DXRS-1194' }) {
  const [pane, setPane] = useState('chat');
  const [reactions, setReactions] = useState({ clap: 128, fire: 71, rocket: 54, idea: 42, heart: 33 });
  const [messages, setMessages] = useState([
  { who: 'Sarah H.', role: 'Investor · Sequoia SEA', kind: 'inv', text: "Love the unit economics on slide 4. What's CAC payback looking like?" },
  { who: 'Jamie Chen', role: 'Founder · Formul.ai', kind: 'fnd', text: "Thanks Sarah — 4.8 months blended, 3.1 months on the enterprise cohort. Happy to walk through it after." },
  { who: 'Ray N.', role: 'Media · TechCrunch', kind: 'med', text: "Who's open to on-record interviews in the cocktail hour?" },
  { who: 'Karen Y.', role: 'Corporate · Taiwan Mobile', kind: '', text: "+1 for Formul.ai — would like to explore POC on our helpdesk stack." },
  { who: 'Dilip M.', role: 'Investor · Antler', kind: 'inv', text: "Requesting intro to @KaiLuxe 🙌" }]
  );
  const [draft, setDraft] = useState('');

  const send = (e) => {
    e?.preventDefault?.();
    if (!draft.trim()) return;
    setMessages((m) => [...m, { who: 'You', role: 'Guest', kind: 'you', text: draft.trim() }]);
    setDraft('');
  };

  const bump = (k) => setReactions((r) => ({ ...r, [k]: r[k] + 1 }));

  return (
    <aside className="live-panel" aria-label="Live audience panel">
      <div className="live-head">
        <h3><span className="dot" /> Live room</h3>
        <div className="meta">Now: <b>Formul.ai</b> · <b>184</b> in room</div>
      </div>
      <div className="live-tabs">
        {[
        ['chat', 'Chat'],
        ['qa', 'Q&A'],
        ['polls', 'Polls'],
        ['people', 'People']].
        map(([id, label]) =>
        <button key={id} className={pane === id ? 'on' : ''} onClick={() => setPane(id)}>{label}</button>
        )}
      </div>

      {pane === 'chat' &&
      <div className="live-body fade-in">
          {messages.map((m, i) =>
        <div key={i} className="msg">
              <div className={`avatar ${m.kind}`}>{m.who.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
              <div className="content">
                <div className="who"><b>{m.who}</b>
                  <span className={`role-pill ${m.kind}`}>{m.role}</span>
                </div>
                <div className="bubble">{m.text}</div>
              </div>
            </div>
        )}
        </div>
      }

      {pane === 'qa' &&
      <div className="live-body fade-in">
          {[
        { v: 32, q: "What share of ARR comes from the top 3 customers, and how concentrated is revenue today?", meta: "Investor · 2 min ago · answered soon" },
        { v: 21, q: "Is the moat the proprietary eval pipeline, or the customer-data feedback loop?", meta: "Corporate · 4 min ago" },
        { v: 14, q: "Regional expansion — which GSEA market is next after Taiwan?", meta: "Founder · 6 min ago" },
        { v: 9, q: "How does the agent handle hand-off when escalation is required?", meta: "Investor · 8 min ago" }].
        map((x, i) =>
        <div key={i} className="qa-item">
              <div className="up">
                <button><I.up /></button>
                <span className="n">{x.v}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p>{x.q}</p>
                <div className="meta">{x.meta}</div>
              </div>
            </div>
        )}
        </div>
      }

      {pane === 'polls' &&
      <div className="live-body fade-in">
          <div className="poll">
            <p className="q">Which vertical excites you most this batch?</p>
            {[
          { id: 'a', label: 'Agentic AI', pct: 52 },
          { id: 'b', label: 'Onchain infra', pct: 23 },
          { id: 'c', label: 'GSEA commerce', pct: 17 },
          { id: 'd', label: 'Dev tools', pct: 8 }].
          map((o) =>
          <div key={o.id} className={`opt ${o.id}`}>
                <span className="fill" style={{ width: `${o.pct}%` }} />
                <span className="label">{o.label}</span>
                <span className="pct">{o.pct}%</span>
              </div>
          )}
            <div className="foot">318 votes · closes 14:30</div>
          </div>
          <div className="poll">
            <p className="q">Will you take an intro from any team today?</p>
            {[
          { id: 'a', label: 'Yes — already shortlisted', pct: 68 },
          { id: 'b', label: 'Maybe, exploring', pct: 24 },
          { id: 'c', label: 'Just observing', pct: 8 }].
          map((o) =>
          <div key={o.id} className={`opt ${o.id}`}>
                <span className="fill" style={{ width: `${o.pct}%` }} />
                <span className="label">{o.label}</span>
                <span className="pct">{o.pct}%</span>
              </div>
          )}
            <div className="foot">211 votes · live</div>
          </div>
        </div>
      }

      {pane === 'people' &&
      <div className="live-body fade-in">
          {[
        { who: 'Sarah H.', role: 'Investor', desc: 'Sequoia SEA · Jakarta', kind: 'inv' },
        { who: 'Karen Y.', role: 'Corporate', desc: 'Taiwan Mobile · BD', kind: '' },
        { who: 'Ray N.', role: 'Media', desc: 'TechCrunch · SEA', kind: 'med' },
        { who: 'Dilip M.', role: 'Investor', desc: 'Antler · Singapore', kind: 'inv' },
        { who: 'Mei L.', role: 'Founder', desc: 'KaiLuxe · Hong Kong', kind: 'fnd' }].
        map((p, i) =>
        <div key={i} className="msg">
              <div className={`avatar ${p.kind}`}>{p.who.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
              <div className="content">
                <div className="who"><b>{p.who}</b><span className={`role-pill ${p.kind}`}>{p.role}</span></div>
                <div className="bubble" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <span>{p.desc}</span>
                  <button className="btn outline sm">Say hi</button>
                </div>
              </div>
            </div>
        )}
        </div>
      }

      <div className="reactions">
        <button onClick={() => bump('clap')}>👏 <span className="count">{reactions.clap}</span></button>
        <button onClick={() => bump('fire')}>🔥 <span className="count">{reactions.fire}</span></button>
        <button onClick={() => bump('rocket')}>🚀 <span className="count">{reactions.rocket}</span></button>
        <button onClick={() => bump('idea')}>💡 <span className="count">{reactions.idea}</span></button>
        <button onClick={() => bump('heart')}>❤️ <span className="count">{reactions.heart}</span></button>
      </div>

      <form className="composer" onSubmit={send}>
        <input
          placeholder="Message the room, ask a question, or @tag a team…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </aside>);

}
window.LivePanel = LivePanel;

/* ─── Captions live feed (used inside the live panel) ───
   Embeds the Wordly attendee iframe for the current session, with a QR
   code + session ID card pinned below for audience members who want to
   open captions on their own phone. */
/* ─── Gemini live translation engine ───
   Captions are produced on-device: the browser's Speech Recognition API
   transcribes the stage audio, and each finalized phrase is sent to Google's
   Gemini API (gemini-2.0-flash) for translation into the guest's language.
   The API key is stored only in this browser (localStorage). When no key is
   set — or the browser lacks Speech Recognition — the panel shows a labelled
   demo transcript so the layout is still reviewable. */

const GEMINI_KEY_LS = 'dd-gemini-key';
const GEMINI_MODEL = 'gemini-3.5-flash';

// Speech-recognition + Gemini target metadata, keyed by the simple lang code.
const CAP_LANGS = {
  en: { label: 'English',  native: 'English', srLang: 'en-US' },
  ja: { label: 'Japanese', native: '日本語',   srLang: 'ja-JP' },
  zh: { label: 'Mandarin Chinese', native: '中文', srLang: 'zh-TW' },
};
// The widget's `language` prop uses the secondary-language slot, which in this
// edition is Japanese (carried as 'zh'/'zh-TW' by the shared toggle).
function targetLangCode(language) {
  const lc = (language || '').toLowerCase();
  if (lc.startsWith('ja') || lc.startsWith('zh')) return 'ja';
  return 'en';
}

async function geminiTranslate(key, text, targetLabel) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`;
  const prompt =
    `You are a live conference interpreter. Translate the speaker's words into ${targetLabel}. ` +
    `Reply with ONLY the translation — no quotes, no notes, no romanization.\n\nSpeaker: ${text}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 256, thinkingConfig: { thinkingBudget: 0 } },
    }),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json())?.error?.message || ''; } catch (e) {}
    throw new Error(detail || `Gemini API error ${res.status}`);
  }
  const data = await res.json();
  const out = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  return out.trim();
}

const DEMO_LINES = [
  { src: "Thanks everyone — we're Innowave Tech, building agentic AI for semiconductor manufacturing.", ja: 'ありがとうございます——私たちは Innowave Tech、半導体製造向けのエージェント型 AI を開発しています。' },
  { src: "Our platform drives factory autonomy: it reads the line, decides, and acts in real time.", ja: '私たちのプラットフォームは工場の自律化を推進します。ラインを読み取り、判断し、リアルタイムで実行します。' },
  { src: "Today we already run across three production fabs in Asia.", ja: '現在、アジアの 3 つの量産ファブで稼働しています。' },
];

function CaptionsLive({ language, sessionId }) {
  const target = targetLangCode(language);
  const targetMeta = CAP_LANGS[target] || CAP_LANGS.en;

  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem(GEMINI_KEY_LS) || ''; } catch (e) { return ''; }
  });
  const [keyDraft, setKeyDraft] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [srcLang, setSrcLang] = useState('en'); // language spoken on stage
  const [listening, setListening] = useState(false);
  const [lines, setLines] = useState([]);       // [{id, src, dst, status}]
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');

  const recRef = React.useRef(null);
  const wantOnRef = React.useRef(false);  // should recognition auto-restart?
  const seqRef = React.useRef(0);
  const bodyRef = React.useRef(null);

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechSupported = !!SR;
  const ready = !!apiKey;

  // Autoscroll to newest line.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, interim]);

  const saveKey = () => {
    const k = keyDraft.trim();
    if (!k) return;
    try { localStorage.setItem(GEMINI_KEY_LS, k); } catch (e) {}
    setApiKey(k); setKeyDraft(''); setShowSettings(false); setError('');
  };
  const clearKey = () => {
    try { localStorage.removeItem(GEMINI_KEY_LS); } catch (e) {}
    setApiKey(''); stop();
  };

  const pushAndTranslate = (text) => {
    const phrase = text.trim();
    if (!phrase) return;
    const id = ++seqRef.current;
    setLines((ls) => [...ls, { id, src: phrase, dst: '', status: 'translating' }]);
    geminiTranslate(apiKey, phrase, targetMeta.label)
      .then((dst) => setLines((ls) => ls.map((l) => l.id === id ? { ...l, dst, status: 'done' } : l)))
      .catch((err) => {
        setError(err.message || 'Translation failed');
        setLines((ls) => ls.map((l) => l.id === id ? { ...l, status: 'error' } : l));
      });
  };

  const start = () => {
    if (!SR || !ready) return;
    setError('');
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = (CAP_LANGS[srcLang] || CAP_LANGS.en).srLang;
    rec.onresult = (e) => {
      let live = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) pushAndTranslate(r[0].transcript);
        else live += r[0].transcript;
      }
      setInterim(live);
    };
    rec.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed')
        setError('Microphone permission denied. Allow mic access to caption the stage.');
      else if (e.error !== 'no-speech' && e.error !== 'aborted')
        setError('Speech recognition error: ' + e.error);
    };
    rec.onend = () => {
      // Recognition stops itself periodically; restart while still wanted.
      if (wantOnRef.current) { try { rec.start(); } catch (e) {} }
      else { setListening(false); setInterim(''); }
    };
    recRef.current = rec;
    wantOnRef.current = true;
    try { rec.start(); setListening(true); } catch (e) { setError('Could not start microphone.'); }
  };

  const stop = () => {
    wantOnRef.current = false;
    if (recRef.current) { try { recRef.current.stop(); } catch (e) {} }
    setListening(false); setInterim('');
  };

  useEffect(() => () => { wantOnRef.current = false; if (recRef.current) { try { recRef.current.stop(); } catch (e) {} } }, []);

  // If the stage language changes mid-session, restart recognition with it.
  useEffect(() => {
    if (listening) { stop(); const t = setTimeout(start, 150); return () => clearTimeout(t); }
  }, [srcLang]); // eslint-disable-line

  const fld = { background: '#11151a', color: '#f4f7fa', border: '1px solid #2b333c', borderRadius: 8, padding: '9px 11px', fontSize: 13, width: '100%', fontFamily: 'inherit' };
  const segBtn = (on) => ({ flex: 1, padding: '7px 4px', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 0, background: on ? '#37d39b' : 'transparent', color: on ? '#06231a' : '#a7b2bd', transition: 'background .15s, color .15s' });

  return (
    <div className="caption-live-stack">
      <div className="caption-live-frame" ref={bodyRef}
        style={{ display: 'block', background: '#0b0d10', color: '#f4f7fa', padding: '16px 16px 12px', overflowY: 'auto' }}>

        {/* ── No API key: setup gate (with demo preview) ── */}
        {!ready &&
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Gemini live translation</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#aeb8c2' }}>
              Paste a Google <b>Gemini API key</b> to caption the stage in real time. The key is stored only in this browser.
            </div>
            <input style={fld} type="password" placeholder="AIza…" value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveKey()} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn primary sm" style={{ flex: 1 }} onClick={saveKey} disabled={!keyDraft.trim()}>Save key & enable</button>
              <a className="btn outline sm" href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Get a key ↗</a>
            </div>
            <div style={{ borderTop: '1px solid #1c232b', margin: '4px 0 2px' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5d6772' }}>Demo preview · {targetMeta.native}</div>
            {DEMO_LINES.map((c, i) =>
              <div key={i} style={{ opacity: 0.55 }}>
                <div style={{ fontSize: 12, color: '#7b8893', marginBottom: 2 }}>{c.src}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{c.ja}</div>
              </div>
            )}
          </div>
        }

        {/* ── Key present: live controls + transcript ── */}
        {ready &&
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5d6772', flex: 1 }}>
                Stage <b style={{ color: '#aeb8c2' }}>{(CAP_LANGS[srcLang] || {}).native}</b> → {targetMeta.native}
              </div>
              <button onClick={() => setShowSettings((s) => !s)} title="Translation settings"
                style={{ background: 'transparent', border: 0, color: '#5d6772', cursor: 'pointer', fontSize: 15, lineHeight: 1 }}>⚙</button>
            </div>

            {showSettings &&
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, background: '#11151a', borderRadius: 10 }}>
                <div style={{ fontSize: 11.5, color: '#8c98a4' }}>Spoken on stage</div>
                <div style={{ display: 'flex', border: '1px solid #2b333c', borderRadius: 8, overflow: 'hidden' }}>
                  {['en', 'ja', 'zh'].map((c) =>
                    <button key={c} style={segBtn(srcLang === c)} onClick={() => setSrcLang(c)}>{CAP_LANGS[c].native}</button>
                  )}
                </div>
                <button className="btn outline sm" onClick={clearKey} style={{ marginTop: 2 }}>Remove API key</button>
              </div>
            }

            <button className={`btn ${listening ? 'outline' : 'primary'} sm`} onClick={listening ? stop : start}
              disabled={!speechSupported}
              style={{ justifyContent: 'center' }}>
              {listening
                ? <><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5b5b', display: 'inline-block', animation: 'ddcapPulse 1s infinite' }} /> Stop captioning</>
                : <>● Start captioning the stage</>}
            </button>

            {!speechSupported &&
              <div style={{ fontSize: 12, color: '#e0a23a', lineHeight: 1.5 }}>
                This browser has no Speech Recognition API — use Chrome/Edge to caption live. (Translation still works once captured.)
              </div>}

            {error &&
              <div style={{ fontSize: 12, color: '#ff8a8a', lineHeight: 1.5 }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {lines.length === 0 && !interim &&
                <div style={{ fontSize: 13, color: '#5d6772', fontStyle: 'italic' }}>
                  {listening ? 'Listening… speak near the mic.' : 'Press start, then the stage audio will appear here translated.'}
                </div>}
              {lines.map((l, i) =>
                <div key={l.id} style={{ opacity: i === lines.length - 1 ? 1 : 0.5 }}>
                  <div style={{ fontSize: 12, color: '#7b8893', marginBottom: 3 }}>{l.src}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.5, color: l.status === 'error' ? '#ff8a8a' : '#f4f7fa' }}>
                    {l.dst || (l.status === 'translating' ? '…' : l.status === 'error' ? '(translation failed)' : '')}
                  </div>
                </div>
              )}
              {interim &&
                <div style={{ fontSize: 13, color: '#5d6772', fontStyle: 'italic' }}>{interim}</div>}
              {listening &&
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: '#37d39b', fontSize: 12.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#37d39b', display: 'inline-block' }} />
                  <span style={{ fontStyle: 'italic' }}>{targetMeta.native} · live</span>
                </div>}
            </div>
          </div>
        }
      </div>

      <div className="caption-live-footer">
        <div className="qr-text">
          <div className="k">Powered by Gemini · {GEMINI_MODEL}</div>
          <div className="v">On-device speech → AI translation</div>
        </div>
        <button className="btn outline sm" onClick={() => setShowSettings((s) => !s)} disabled={!ready}>
          Settings
        </button>
      </div>
    </div>);

}
window.CaptionsLive = CaptionsLive;

/* ─── Floating live-captions widget ───
   A bottom-corner launcher that opens a slide-up caption panel on demand, so
   guests who don't need captions are unaffected. Follows the server switch:
   OpenAI/Gemini stream via the embedded viewer; Wordly via the existing embed.
   Renders nothing unless EVENT_CONFIG.captionsWorker is set. */
function LiveCaptionsWidget({ sessionId = 'DXRS-1194', captionLanguage = 'zh-TW' }) {
  const worker = (window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker) || '';
  const [open, setOpen] = useState(false);
  // Compact ("docked") mode: a slim bottom bar showing the latest line, so the
  // page stays browsable behind it. Tap ▴ to expand back to the full panel.
  const [compact, setCompact] = useState(false);
  // Let the nav caption buttons open this widget.
  useEffect(() => {
    window.ddOpenCaptions = () => setOpen(true);
    return () => { try { delete window.ddOpenCaptions; } catch (e) {} };
  }, []);
  if (!worker) return null;
  return (
    <div className={`ddcap ${compact ? 'compact' : ''}`}>
      {open &&
      <div className={`ddcap-panel ${compact ? 'compact' : ''}`} role="dialog" aria-label="Live captions">
        <div className="ddcap-head">
          <span className="ddcap-badge"><span className="ddcap-dot" />Gemini</span>
          <span className="ddcap-title">ライブ字幕 · Live captions</span>
          <button className="ddcap-min" onClick={() => setCompact((c) => !c)}
            aria-label={compact ? 'Expand captions' : 'Shrink to a bar'}
            title={compact ? '放大 Expand' : '縮小成字幕條 Dock'}>{compact ? '▴' : '▾'}</button>
          <button className="ddcap-x" onClick={() => setOpen(false)} aria-label="Close captions">×</button>
        </div>
        <div className="ddcap-body">
          {/^https?:/.test(worker)
            ? <iframe className="ddcap-frame" style={{ width: '100%', height: '100%', border: 0, background: '#0b0d10' }}
                src={worker + '/viewer?base=' + encodeURIComponent(worker) + '&sec=' + encodeURIComponent((window.EVENT_CONFIG && window.EVENT_CONFIG.captionsLang === 'ja') ? '日本語' : '中')}
                title="Live captions" allow="autoplay" loading="lazy" />
            : <CaptionsLive language={captionLanguage} sessionId={sessionId} />}
        </div>
      </div>}
      <button className={`ddcap-fab ${open ? 'on' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="ddcap-dot" />{open ? '閉じる Hide' : 'ライブ字幕 Captions'}
      </button>
    </div>);

}
window.LiveCaptionsWidget = LiveCaptionsWidget;

/* In-page caption launcher (placed just above Sponsors). Opens the same
   slide-up panel as the floating button. Renders only when configured. */
function CaptionsLauncher({ language = 'en' }) {
  const worker = (window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker) || '';
  if (!worker) return null;
  return (
    <div className="container ddcap-launch">
      <button className="ddcap-launch-btn" onClick={() => window.ddOpenCaptions && window.ddOpenCaptions()}>
        <span className="ddcap-dot" />
        {language === 'zh' ? 'ライブ字幕を開く (EN + 日本語)' : 'Open live captions (EN + 日本語)'}
      </button>
    </div>);

}
window.CaptionsLauncher = CaptionsLauncher;