// backstage.jsx — operator console (live event state, localStorage-persisted)
// Reconstructed to match the API app.jsx expects:
//   const [stage, setStage, resetStage] = useBackstage(DEFAULTS)
//   const [bkOpen, setBkOpen] = useBackstageToggle()
//   <Backstage open onClose stage setStage reset/>
// stage = { sessionId, phase, liveTeamId }
//   phase     : 'before' | 'live' | 'break' | 'cocktail'
//   liveTeamId: 'OFF_AIR' | <team id>   (only meaningful while phase === 'live')
const { useState: useBkState, useEffect: useBkEffect } = React;

const BACKSTAGE_LS_KEY = 'dd-backstage-v1';

function useBackstage(defaults) {
  const [stage, setStageRaw] = useBkState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(BACKSTAGE_LS_KEY) || '{}');
      return { ...defaults, ...saved };
    } catch (e) { return { ...defaults }; }
  });
  const persist = (next) => { try { localStorage.setItem(BACKSTAGE_LS_KEY, JSON.stringify(next)); } catch (e) {} };
  const setStage = (k, v) => {
    setStageRaw((prev) => {
      const next = (k && typeof k === 'object') ? { ...prev, ...k } : { ...prev, [k]: v };
      persist(next);
      return next;
    });
  };
  const resetStage = () => { setStageRaw({ ...defaults }); persist({ ...defaults }); };
  return [stage, setStage, resetStage];
}
window.useBackstage = useBackstage;

// Opens when the URL hash is #backstage (the footer 🔒 link). Clears the hash
// on open so the panel can be re-opened and closed cleanly.
function useBackstageToggle() {
  const [open, setOpen] = useBkState(false);
  useBkEffect(() => {
    const check = () => {
      if (window.location.hash === '#backstage') {
        setOpen(true);
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);
  return [open, setOpen];
}
window.useBackstageToggle = useBackstageToggle;

const BK_PHASES = [
  { value: 'before',   label: 'Before' },
  { value: 'live',     label: 'Live' },
  { value: 'break',    label: 'Break' },
  { value: 'cocktail', label: 'Cocktail' },
];

function Backstage({ open, onClose, stage, setStage, reset }) {
  if (!open) return null;
  const teams = window.TEAMS || [];
  const sessionValid = /^[A-Za-z]{4}-?\d{4}$/.test((stage.sessionId || '').trim());

  // Close on Escape.
  useBkEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const joinUrl = `https://attend.wordly.ai/join/${(stage.sessionId || '').trim() || 'XXXX-0000'}`;

  return (
    <div className="bk-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Backstage operator console">
      <div className="bk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="bk-head">
          <div className="bk-title">
            <span className="bk-dot" />
            Backstage
            <span className="bk-sub">operator console</span>
          </div>
          <button className="bk-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="bk-body">
          {/* ─ Event phase ─ */}
          <div className="bk-section">
            <label className="bk-label">Event phase <span className="bk-muted">— what the room is doing now</span></label>
            <div className="bk-seg">
              {BK_PHASES.map((p) =>
                <button key={p.value}
                  className={stage.phase === p.value ? 'on' : ''}
                  onClick={() => setStage('phase', p.value)}>{p.label}</button>
              )}
            </div>
          </div>

          {/* ─ Now on stage ─ */}
          <div className="bk-section">
            <label className="bk-label">Now on stage <span className="bk-muted">— highlights the live team's card</span></label>
            <select
              className="bk-input"
              value={stage.liveTeamId || 'OFF_AIR'}
              disabled={stage.phase !== 'live'}
              onChange={(e) => setStage('liveTeamId', e.target.value)}>
              <option value="OFF_AIR">— Off air —</option>
              {teams.map((t) =>
                <option key={t.id} value={t.id}>
                  {String(t.speakerOrder).padStart(2, '0')} · {t.name} ({t.batch})
                </option>
              )}
            </select>
            <div className="bk-hint">
              {stage.phase === 'live'
                ? <>Pick the team currently pitching, or <b>Off air</b> between pitches.</>
                : <span className="warn">Set phase to <b>Live</b> to spotlight a team.</span>}
            </div>
          </div>

          {/* ─ Captions session ─ */}
          <div className="bk-section">
            <label className="bk-label">Captions session ID <span className="bk-muted">— Wordly LLLL-NNNN</span></label>
            <div className="bk-id-row">
              <input
                className={`bk-input mono ${stage.sessionId && !sessionValid ? 'warn' : ''}`}
                value={stage.sessionId || ''}
                placeholder="DXRS-1194"
                onChange={(e) => setStage('sessionId', e.target.value.toUpperCase())} />
            </div>
            <div className="bk-live">
              <span className="k">Live:</span>
              <code>{(stage.sessionId || '').trim() || '— none —'}</code>
              <a className="bk-open" href={joinUrl} target="_blank" rel="noopener">Open join page ↗</a>
            </div>
            {stage.sessionId && !sessionValid &&
              <div className="bk-hint"><span className="warn">Format looks off — expected 4 letters + 4 digits.</span></div>}
          </div>
        </div>

        <div className="bk-foot">
          <button className="bk-btn ghost" onClick={reset}>Reset to defaults</button>
          <button className="bk-btn primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
window.Backstage = Backstage;
