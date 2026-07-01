// app.jsx — top-level app + Tweaks
const { useState: useStateApp, useEffect: useEffectApp, useMemo } = React;

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroVariant": "slate",
    "cardDensity": "comfy",
    "language": "zh",
    "accentIntensity": "balanced",
    "showNowOnStage": true,
    "wordlySessionId": "DXRS-1194",
    "eventPhase": "live",
    "liveTeamId": "notag"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const CFG = window.EVENT_CONFIG || {};
  // English-only editions (e.g. Singapore) ignore the language toggle.
  const lang = CFG.bilingual === false ? 'en' : tweaks.language;
  // Live-translation UI is shown/hidden site-wide via the Backstage toggle.
  const captionsEnabled = useCaptionsEnabled(CFG.captionsWorker);

  // Operator-controlled live state (Backstage console). Persists to
  // localStorage; independent of the design-time Tweaks panel.
  const [stage, setStage, resetStage] = useBackstage({
    sessionId: TWEAK_DEFAULTS.wordlySessionId,
    phase: TWEAK_DEFAULTS.eventPhase,
    liveTeamId: TWEAK_DEFAULTS.liveTeamId,
  });
  const [bkOpen, setBkOpen] = useBackstageToggle();

  const [activeTab, setActiveTab] = useStateApp('teams');
  const [favorites, setFavorites] = useStateApp([]);
  const [introTeam, setIntroTeam] = useStateApp(null);
  const [, setOpenedTeam] = useStateApp(null);
  const [captionLanguage, setCaptionLanguage] = useStateApp('ja-JP');
  const sessionId = stage.sessionId || 'DXRS-1194';

  const nav = (id) => {
    setActiveTab(id);
    if (id === 'top') { window.scrollTo({top:0, behavior:'smooth'}); return; }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior:'smooth' });
    }
  };

  // section observer for active tab
  useEffectApp(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      const ids = TABS.map(x => x.id);
      let current = 'teams';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onFav = (id) => {
    setFavorites(f => f.includes(id) ? f.filter(x=>x!==id) : [...f, id]);
  };

  const liveTeam = useMemo(() => {
    if (stage.phase !== 'live' || stage.liveTeamId === 'OFF_AIR') return null;
    return TEAMS.find(x => x.id === stage.liveTeamId) || null;
  }, [stage.phase, stage.liveTeamId]);
  const liveTeamId = liveTeam ? liveTeam.id : null;
  const kpis = { teams: TEAMS.length, attendees: '600+' };

  return (
    <div className={`accent-${tweaks.accentIntensity}${CFG.nowOnStage === false ? ' edition-nostage' : ''}`}>
      <TopNav
        activeTab={activeTab}
        onNav={nav}
        language={lang}
        onLanguageChange={(v) => setTweak('language', v)}
        sessionId={sessionId}/>

      <Hero variant={tweaks.heroVariant} language={lang} kpis={kpis}/>

      {tweaks.showNowOnStage && CFG.nowOnStage !== false && <NowOnStage team={liveTeam} phase={stage.phase} captionLanguage={captionLanguage} onCaptionLanguageChange={setCaptionLanguage} sessionId={sessionId}/>}

      <TeamsSection
        favorites={favorites}
        onFav={onFav}
        onIntro={(team) => setIntroTeam(team)}
        onOpenLive={(team) => setOpenedTeam(team)}
        density={tweaks.cardDensity}
        accentIntensity={tweaks.accentIntensity}
        captionLanguage={captionLanguage}
        onCaptionLanguageChange={setCaptionLanguage}
        sessionId={sessionId}
        liveTeamId={liveTeamId}
        language={lang}/>

      <Agenda language={lang}/>
      <About language={lang}/>
      <OrganizingPartners language={lang}/>
      {captionsEnabled && <CaptionsLauncher language={lang}/>}
      <EventPartners language={lang}/>
      <Footer language={lang}/>

      <IntroModal team={introTeam} onClose={() => setIntroTeam(null)}/>

      {captionsEnabled && <LiveCaptionsWidget sessionId={sessionId} captionLanguage={captionLanguage}/>}

      <Backstage
        open={bkOpen}
        onClose={() => setBkOpen(false)}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
