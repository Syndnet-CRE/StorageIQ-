# StorageIQ — Claude Context

Read this at the start of every session. It's the fast-path to understanding this project.

## What this is

StorageIQ is a personal self-storage acquisition tool. Single HTML file, no framework, no backend yet. It lives at `app/index.html`.

## Current state

Fully working prototype with:
- Self-storage underwriting model (built from a real Excel acquisition model)
- Leaflet map with address autocomplete + competing facility POI lookup
- Three-scenario offer engine (bank loan, seller financing, interest-only SF)
- Print-ready LOI generator
- Parcyl v2 dark/light theme

## Design system

Uses **Parcyl v2** tokens. The theme object lives in `app/index.html` as `darkTheme` and `lightTheme` — same structure as `src/theme.js` in the main Parcyl codebase. `applyTheme(t)` writes CSS custom properties. Never hardcode hex colors — always use token vars.

Key tokens:
- `--accent-primary` → Parcyl green (#3EAA42 dark / #2D8F32 light)
- `--bg-primary/secondary/tertiary` → backgrounds
- `--text-primary/secondary/tertiary/quaternary` → text hierarchy
- `--border-subtle/default/strong` → borders
- `--semantic-success/warning/error/info` → status colors
- `--font-display` → SF Pro Display system stack
- `--font-mono` → JetBrains Mono (numbers only)

## Code conventions

- `$(id)` helper reads `el.dataset.raw || el.value` — always use this for numeric inputs
- `safeNum(id)` strips formatting chars as extra safety
- Currency inputs: `data-type="currency"` + `onfocus=unformatField` + `onblur=formatField`
- Percent inputs: `data-type="percent"` same pattern
- All buttons with gradient backgrounds need `data-grad-btn` attribute
- `applyTheme()` handles gradients on `[data-grad-btn]` elements
- Map init always uses double `requestAnimationFrame` + `invalidateSize()` — don't change this

## File structure

```
app/index.html     ← the whole app
docs/              ← all documentation
netlify.toml       ← publish = "app", no build command
```

## What's next (rough priority)

1. Save/load deals to localStorage (quick win, no backend)
2. PDF export
3. Supabase for deal persistence + auth
4. Mobile layout pass
5. Rent comp scraping

## How to run

```bash
python3 -m http.server 8080 --directory app
# → http://localhost:8080
```

## Things NOT to do

- Don't add a build step unless there's a strong reason
- Don't add React/Vue — vanilla is intentional
- Don't use `body.light` class hacks for theming — use `applyTheme()`
- Don't break the `$(id)` helper — every calculation depends on it
- Don't use Google Fonts for display text — SF Pro system stack only
