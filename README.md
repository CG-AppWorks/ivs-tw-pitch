# Demo Day Tokyo — AppWorks #32 + Wistron #10

Bilingual (English / 日本語) event landing site: team directory, agenda, About,
Wistron, booth map, live audience panel, and a **Gemini-powered live caption /
translation** widget. Built on the AppWorks design system.

## Run locally

No build step — it's a static site that loads React + Babel from CDN. Serve the
folder over HTTP (opening `index.html` via `file://` will be blocked by the
browser for the `.jsx` fetches):

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry point — loads tokens, styles, and all scripts. |
| `data.js` | Lineup, agenda, Japanese copy, and `EVENT_CONFIG` (edit to retarget). |
| `app.jsx` | Top-level app + Tweaks panel wiring. |
| `chrome.jsx` | Top nav, hero, footer, caption helpers. |
| `sections.jsx` | Agenda, Album, About, Wistron, Sponsors, booth map. |
| `teams.jsx` | Team directory (filters, cards). Logos/portraits fall back to placeholders — fill the `LOGOS` / `PORTRAITS` maps to use real art. |
| `live.jsx` | Live audience panel + **Gemini live-translation captions**. |
| `backstage.jsx` | Operator console (open via the footer 🔒 / `#backstage`). |
| `tweaks-panel.jsx` | Design-time tweak controls. |
| `styles.css` / `tokens.css` | Layout styles + AppWorks design tokens. |
| `assets/` | A-mark favicon + placeholder sponsor logos. |

## Live captions (Gemini)

The **ライブ字幕 / Captions** button opens a panel that transcribes the stage
mic via the browser Speech Recognition API and translates each phrase with the
Gemini API (`gemini-2.0-flash`).

- Requires a **Gemini API key** — entered in the panel and stored only in the
  browser's `localStorage` (never committed). Get one at
  https://aistudio.google.com/apikey
- Live capture needs a Chromium-based browser (Chrome/Edge) with mic access.
- With no key it shows a labelled demo transcript so the layout stays reviewable.

## Retargeting to another event

Most event-specific content lives in `data.js`: the `TEAMS` array, `AGENDA`,
the Japanese `ZH` copy block, and `EVENT_CONFIG` (city, venue, dates, feature
flags). Swap real images into `assets/` and reference them from the `LOGOS` /
`PORTRAITS` maps in `teams.jsx`.
