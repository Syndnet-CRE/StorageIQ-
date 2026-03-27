# StorageIQ — Technical Spec

## Architecture

Single-file vanilla web app. No framework, no bundler, no backend.

```
storageiq/
├── app/
│   └── index.html      ← entire app lives here
├── docs/
│   ├── PRD.md
│   ├── spec.md
│   ├── claude.md
│   ├── decisions.md
│   └── CHANGELOG.md
├── .gitignore
├── netlify.toml
└── README.md
```

## External dependencies (CDN)

| Library | Version | Purpose |
|---------|---------|---------|
| Leaflet.js | 1.9.4 | Map rendering |
| Lucide | latest | Icons |
| JetBrains Mono | — | Monospace font for numbers |
| CartoDB Dark Matter tiles | — | Map tile style |

## External APIs (no keys required)

| API | Usage |
|-----|-------|
| Nominatim (OSM) | Address geocoding → lat/lng |
| Overpass API | Query nearby self-storage POIs |

## Theme system

Parcyl v2 design tokens. Two objects — `darkTheme` and `lightTheme` — matching the `useTheme()` hook from `src/theme.js`. `applyTheme(t)` writes every token as a CSS custom property on `document.documentElement`. Persists to `localStorage` under key `parcyl-theme`.

## Key modules inside index.html

### Underwriting engine (`runUnderwriting`)
- Reads all inputs via `$(id)` helper (strips formatting before parse)
- Calculates NOI, debt service, DSCR, CoC, IRR (Newton's method), EMx, yield-on-cost
- Renders pro forma table + returns cards

### LOI offer engine (`calculateOffers`)
- Three solvers: bank (DSCR-constrained), SF (CoC-targeted), IO SF (CoC-targeted)
- Market cap rate cap on Option 1
- Override panel recalculates live

### Map engine
- `onAddressInput` → 400ms debounce → `fetchSuggestions` (Nominatim, limit 6)
- Dropdown autocomplete with keyboard nav (↑↓ Enter Esc)
- `selectSuggestion` → `initMap(lat, lng)`
- `initMap` uses `requestAnimationFrame` double-wrap + `invalidateSize()` to fix Leaflet rendering into previously-hidden container
- `queryNearbyStorage` → Overpass API → pin markers → popups with "Use as Comp" button

### Currency/percent formatting
- All money inputs: `data-type="currency"`, `onfocus=unformatField`, `onblur=formatField`
- All percent inputs: `data-type="percent"`, same pattern
- `$(id)` helper reads `el.dataset.raw` before `el.value` to avoid parsing formatted strings
- `safeNum(id)` strips non-numeric chars as fallback
- Override inputs injected via `innerHTML` also carry `data-type` + `data-raw`

## When we add a database

Supabase is the plan:
- Postgres for deal storage
- Supabase Auth for login
- Each deal = one row, JSON blob for all inputs/outputs
- Netlify Functions for any server-side work

No changes to the frontend architecture needed — just add a save/load layer on top.
