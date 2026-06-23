// tweaks-panel.jsx — design-time Tweaks panel (floating, localStorage-persisted)
// Reconstructed to match the API app.jsx expects:
//   const [tweaks, setTweak] = useTweaks(DEFAULTS)
//   <TweaksPanel title><TweakSection/><TweakRadio/><TweakToggle/></TweaksPanel>
const { useState: useTwState, useEffect: useTwEffect, createContext: createTwCtx, useContext: useTwCtx } = React;

const TWEAKS_LS_KEY = 'dd-tweaks-v2';

function useTweaks(defaults) {
  const [tweaks, setTweaks] = useTwState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TWEAKS_LS_KEY) || '{}');
      return { ...defaults, ...saved };
    } catch (e) { return { ...defaults }; }
  });
  const setTweak = (k, v) => {
    setTweaks((prev) => {
      const next = (k && typeof k === 'object') ? { ...prev, ...k } : { ...prev, [k]: v };
      try { localStorage.setItem(TWEAKS_LS_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };
  return [tweaks, setTweak];
}
window.useTweaks = useTweaks;

/* Inject the panel's own styling once (kept out of styles.css so the panel
   stays self-contained). */
(function injectTweakStyles() {
  if (document.getElementById('tw-panel-styles')) return;
  const css = `
  .tw-launch {
    position: fixed; left: 16px; bottom: 16px; z-index: 1100;
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--aw-slate); color: #fff; border: 1px solid var(--aw-slate);
    border-radius: var(--radius-pill); padding: 10px 15px;
    font-family: var(--font-sans); font-size: 13px; font-weight: 600;
    box-shadow: var(--shadow-md); cursor: pointer;
    transition: background var(--dur-fast) var(--ease);
  }
  .tw-launch:hover { background: #353F46; }
  .tw-launch .tw-gear { font-size: 14px; line-height: 1; }
  .tw-panel {
    position: fixed; left: 16px; bottom: 64px; z-index: 1101;
    width: 300px; max-height: calc(100vh - 96px); overflow-y: auto;
    background: #fff; border: 1px solid var(--border-strong);
    border-radius: var(--radius-md); box-shadow: var(--shadow-md);
    font-family: var(--font-sans);
    animation: tw-rise var(--dur) var(--ease);
  }
  @keyframes tw-rise { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .tw-panel-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-bottom: 1px solid var(--border);
  }
  .tw-panel-head .tw-h {
    font-family: var(--font-display); font-size: 15px; font-weight: 800;
    letter-spacing: -0.01em; color: var(--fg1);
  }
  .tw-panel-head .tw-x {
    width: 26px; height: 26px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: #fff; color: var(--fg2);
    font-size: 17px; line-height: 1; display: grid; place-items: center; cursor: pointer;
  }
  .tw-panel-head .tw-x:hover { border-color: var(--aw-slate); color: var(--fg1); }
  .tw-panel-body { padding: 6px 16px 16px; }
  .tw-sec {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--aw-grey); margin: 16px 0 8px;
  }
  .tw-field { margin-bottom: 12px; }
  .tw-field-label { font-size: 12.5px; font-weight: 600; color: var(--fg1); margin-bottom: 6px; }
  .tw-seg {
    display: flex; border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm); overflow: hidden;
  }
  .tw-seg button {
    flex: 1; border: 0; background: #fff; color: var(--fg2);
    padding: 8px 6px; font: inherit; font-size: 12px; font-weight: 600;
    border-right: 1px solid var(--border); cursor: pointer;
    transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
  }
  .tw-seg button:last-child { border-right: 0; }
  .tw-seg button:hover { background: var(--aw-mist); color: var(--fg1); }
  .tw-seg button.on { background: var(--aw-slate); color: #fff; }
  .tw-toggle {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .tw-switch {
    width: 40px; height: 24px; border-radius: var(--radius-pill);
    border: 0; background: var(--aw-grey-60); position: relative; cursor: pointer;
    transition: background var(--dur-fast) var(--ease); flex-shrink: 0;
  }
  .tw-switch.on { background: var(--accent); }
  .tw-switch::after {
    content: ""; position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%; background: #fff;
    transition: transform var(--dur-fast) var(--ease);
  }
  .tw-switch.on::after { transform: translateX(16px); }
  `;
  const el = document.createElement('style');
  el.id = 'tw-panel-styles';
  el.textContent = css;
  document.head.appendChild(el);
})();

const TweaksCtx = createTwCtx(null);

function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = useTwState(false);
  return (
    <TweaksCtx.Provider value={true}>
      {!open &&
        <button className="tw-launch" onClick={() => setOpen(true)} aria-label="Open tweaks">
          <span className="tw-gear">⚙</span> {title}
        </button>}
      {open &&
        <div className="tw-panel" role="dialog" aria-label={title}>
          <div className="tw-panel-head">
            <span className="tw-h">{title}</span>
            <button className="tw-x" onClick={() => setOpen(false)} aria-label="Close tweaks">×</button>
          </div>
          <div className="tw-panel-body">{children}</div>
        </div>}
    </TweaksCtx.Provider>
  );
}
window.TweaksPanel = TweaksPanel;

function TweakSection({ label }) {
  return <div className="tw-sec">{label}</div>;
}
window.TweakSection = TweakSection;

function TweakRadio({ label, value, options = [], onChange = () => {} }) {
  return (
    <div className="tw-field">
      {label && <div className="tw-field-label">{label}</div>}
      <div className="tw-seg" role="radiogroup" aria-label={label}>
        {options.map((o) =>
          <button key={o.value}
            className={o.value === value ? 'on' : ''}
            aria-checked={o.value === value}
            onClick={() => onChange(o.value)}>{o.label}</button>
        )}
      </div>
    </div>
  );
}
window.TweakRadio = TweakRadio;

function TweakToggle({ label, value, onChange = () => {} }) {
  return (
    <div className="tw-field tw-toggle">
      <div className="tw-field-label" style={{ marginBottom: 0 }}>{label}</div>
      <button className={`tw-switch ${value ? 'on' : ''}`} aria-pressed={!!value}
        onClick={() => onChange(!value)} aria-label={label} />
    </div>
  );
}
window.TweakToggle = TweakToggle;
