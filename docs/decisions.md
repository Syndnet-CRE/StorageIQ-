# StorageIQ — Decision Log

Key choices and why we made them. Good to have when you're staring at code months later wondering "why did I do it this way."

---

## No framework (vanilla HTML/JS)

**Decision:** Single HTML file, no React, no build step.  
**Why:** This is a prototype. Zero config, zero dependencies, instant deploy. If it ever becomes a real product with a team, migrate then.

---

## Leaflet + OpenStreetMap over Mapbox

**Decision:** Leaflet.js with CartoDB Dark Matter tiles.  
**Why:** Mapbox requires an API key and costs money after 50k loads/month. Leaflet + OSM is completely free, no key, no account. CartoDB Dark Matter tiles look nearly identical to Mapbox Dark. Overpass API gives us live POI data for free.

---

## Parcyl v2 theme system

**Decision:** Import the Parcyl token structure (`darkTheme`/`lightTheme` objects + `applyTheme()`) directly into the app.  
**Why:** Consistency with other Parcyl projects. The token system is already thought through. No point inventing a new one.

---

## Nominatim for geocoding

**Decision:** Nominatim (OSM's free geocoder) for address → lat/lng.  
**Why:** Free, no API key, decent accuracy for US addresses. Limitation: rate-limited to 1 req/sec, which is fine for a single-user prototype. If this becomes multi-user, swap to Mapbox Geocoding or Google Places API.

---

## Currency formatting on blur (not live)

**Decision:** Format inputs on blur, strip on focus.  
**Why:** Live formatting while typing is annoying and error-prone (cursor jumps, partial values break). Format-on-blur is clean — type the number, click away, it formats. All calculation helpers (`$()`, `safeNum()`) read `data-raw` so formatted display values never break math.

---

## No localStorage deal persistence (yet)

**Decision:** State lives only in the current session.  
**Why:** It's a prototype. Adding persistence properly means thinking about deal structure, versioning, conflict resolution. Worth doing once — with Supabase — rather than hacking it into localStorage and then ripping it out.

---

## Supabase when we add a backend

**Decision:** Supabase (not Firebase, not PlanetScale, not custom API).  
**Why:** Postgres (real SQL), built-in auth, generous free tier, works perfectly with Netlify. The JS client is straightforward. No vendor lock-in on the data layer.

---

## Netlify for hosting

**Decision:** Netlify with GitHub auto-deploy.  
**Why:** Free tier is plenty for a prototype. Zero config for a static site — just point it at the `app/` folder. Easy to add Netlify Functions later if we need serverless endpoints.
