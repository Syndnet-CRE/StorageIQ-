# StorageIQ

Self-storage acquisition underwriting platform + LOI generator. Personal prototype.

## What it does

- Full self-storage underwriting model (unit mix, NOI, debt service, returns, waterfall)
- Live map with competing facility lookup via OpenStreetMap
- Three-scenario offer engine (bank loan, seller financing, interest-only SF)
- Professional LOI generator with print output
- Parcyl v2 theme with dark/light toggle

## Running locally

No build step. Just open it:

```bash
open app/index.html
# or serve it
python3 -m http.server 8080 --directory app
```

Then go to `http://localhost:8080`

## Deploying

Pushes to `main` auto-deploy to Netlify via GitHub integration.

## Stack

- Vanilla HTML/CSS/JS — no framework, no bundler
- Leaflet.js + OpenStreetMap + Overpass API (map + POI)
- Nominatim (address geocoding)
- Lucide icons
- Parcyl v2 design tokens

## Docs

- [`docs/PRD.md`](docs/PRD.md) — what we're building and why
- [`docs/spec.md`](docs/spec.md) — technical spec
- [`docs/claude.md`](docs/claude.md) — context for AI sessions
- [`docs/decisions.md`](docs/decisions.md) — why we made key choices
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — version history
