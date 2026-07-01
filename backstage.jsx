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

// Backstage = password-gated control for the live-translation UI only.
// Password "ilovetaiwan" unlocks a single Shown/Hidden toggle that flips a
// server-side flag on the captions Worker, so it shows/hides the caption
// widget + launcher button for ALL guests.
function Backstage({ open, onClose }) {
  if (!open) return null;
  const worker = (window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker) || '';

  const [pass, setPass] = useBkState('');
  const [unlocked, setUnlocked] = useBkState(false);
  const [enabled, setEnabled] = useBkState(null); // null = loading
  const [busy, setBusy] = useBkState(false);
  const [err, setErr] = useBkState('');

  // Close on Escape.
  useBkEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Load current visibility once unlocked.
  useBkEffect(() => {
    if (!unlocked || !worker) return;
    let stop = false;
    fetch(worker + '/api/visibility', { cache: 'no-store' })
      .then((r) => r.json()).then((d) => { if (!stop) setEnabled(d.enabled !== false); })
      .catch(() => { if (!stop) setEnabled(true); });
    return () => { stop = true; };
  }, [unlocked, worker]);

  const unlock = () => {
    if (pass === 'ilovetaiwan') { setUnlocked(true); setErr(''); }
    else setErr('Wrong password.');
  };

  const setVisibility = (next) => {
    if (!worker) return;
    setBusy(true); setErr('');
    fetch(worker + '/api/visibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ilovetaiwan' },
      body: JSON.stringify({ enabled: next }),
    })
      .then((r) => r.json()).then((d) => { setEnabled(d.enabled !== false); setBusy(false); })
      .catch(() => { setErr('Update failed — check the connection.'); setBusy(false); });
  };

  return (
    <div className="bk-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Backstage">
      <div className="bk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="bk-head">
          <div className="bk-title">
            <span className="bk-dot" />
            Backstage
            <span className="bk-sub">live translation</span>
          </div>
          <button className="bk-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="bk-body">
          {!unlocked ?
            <div className="bk-section">
              <label className="bk-label">Password</label>
              <input className="bk-input mono" type="password" value={pass} placeholder="••••••••"
                autoFocus
                onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && unlock()} />
              {err && <div className="bk-hint"><span className="warn">{err}</span></div>}
              <div style={{ height: 10 }} />
              <button className="bk-btn primary" onClick={unlock}>Unlock</button>
            </div>
          :
            <div className="bk-section">
              <label className="bk-label">Live translation <span className="bk-muted">— show / hide on the site for all guests</span></label>
              <div className="bk-seg">
                <button className={enabled === true ? 'on' : ''} disabled={busy || enabled === null} onClick={() => setVisibility(true)}>Shown</button>
                <button className={enabled === false ? 'on' : ''} disabled={busy || enabled === null} onClick={() => setVisibility(false)}>Hidden</button>
              </div>
              <div className="bk-hint">
                {enabled === null ? 'Loading…'
                  : enabled ? 'The captions button + popup are visible to everyone.'
                  : 'The captions button + popup are hidden for everyone.'}
                {busy ? ' · saving…' : ''}
              </div>
              {err && <div className="bk-hint"><span className="warn">{err}</span></div>}
            </div>
          }
        </div>

        <div className="bk-foot">
          <button className="bk-btn primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
window.Backstage = Backstage;
