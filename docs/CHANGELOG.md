# Changelog

## [0.3.0] — March 2026

### Added
- Address autocomplete with Nominatim suggestions dropdown (keyboard nav: ↑↓ Enter Esc)
- Leaflet map with CartoDB Dark Matter tiles (Mapbox-like dark aesthetic)
- Overpass API integration — queries competing self-storage facilities within 1–10 mile radius
- "Use as Comp" button on map popups — adds competitor as a row in unit mix
- Adjustable search radius slider on map toolbar
- Unit mix quick-add dropdown (30+ pre-built unit types: 5×5 through 20×30, specialty, legacy)
- Climate column in unit mix table (Non-CC / CC / Auto-Boat / Wine / Office)
- Remove row button on each unit mix row
- Property Details new dropdowns: Climate Control, Access Type, Zoning, Stories/Height
- Multi-select tag pickers: Security Features, Amenities
- Currency formatting on blur for all dollar inputs
- Percent formatting on blur for all percentage inputs
- `safeNum()` helper — strips formatting before parse in override inputs
- Override inputs (price/down/monthly pmt) properly wrapped with `data-type` + format handlers
- Section gap padding between Unit Mix and Income/Expenses panels

### Fixed
- `toggleAppTheme is not defined` — function was appended outside script block
- Leaflet map rendering into zero-height hidden container (double rAF + `invalidateSize()`)
- `onPriceOvChange` and `recalcOv` returning NaN on formatted inputs
- `loiExpenseRatio` missing `data-type` attribute

---

## [0.2.0] — March 2026

### Added
- Parcyl v2 theme system — `darkTheme`/`lightTheme` token objects, `applyTheme()`, `localStorage` persistence
- Dark/light toggle button in nav with Lucide sun/moon icons
- SF Pro Display system font stack (replaced Syne + Instrument Serif)
- All blue (#2563eb) replaced with Parcyl green (#3EAA42)
- CSS custom properties for every token — set by `applyTheme()` at runtime
- `data-grad-btn` attribute system for gradient buttons

### Fixed
- All hardcoded hex colors replaced with token vars
- Google Fonts removed (display font now system stack)
- Emoji removed, Lucide icons used throughout

---

## [0.1.0] — March 2026

### Added
- Initial StorageIQ underwriting model (ported from Excel acquisition model)
- Unit mix table with 12 default unit types
- Acquisition costs, debt terms, operating expenses inputs
- NOI, DSCR, CoC, IRR, EMx, yield-on-cost calculations
- Pro forma table (In-Place / Stabilized / Sale)
- Partnership returns + waterfall display
- Sources & uses summary
- RevLOI integration — three-scenario offer engine
- Seller payout cards
- Override panel with live recalculation
- LOI generator with print output
- Two-screen navigation (Underwrite → RevLOI)
- Dark theme base
