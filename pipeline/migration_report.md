# Migration Report — 001_create_self_storage_tables.sql
**Date:** 2026-04-17  
**Target:** Neon (scoutgpt-api) — neondb_owner via DATABASE_WRITE_URL  
**Status:** COMPLETE — all tables empty and ready for ingest

---

## 1. Tables Created

| Table | Columns | Primary Key | Source View |
|-------|---------|-------------|-------------|
| `self_storage_facilities` | 122 | `attomid` | TAX_ASSESSOR |
| `facility_sales_history` | 70 | `(transaction_id, attomid)` | RECORDER |
| `facility_foreclosures` | 54 | `(transaction_id, attomid)` | PREFORECLOSURE |
| `reit_owner_patterns` | 5 | `pattern_id` (SERIAL) | Reference / seed data |

**LOAN_MODEL excluded by design** — 3.2% ATTOMID coverage makes it redundant with RECORDER's `MORTGAGE1*` fields, which carry the same loan data at transaction grain with better coverage (74.1% of storage ATTOMIDs have at least one RECORDER row).

---

## 2. Row Counts (post-migration, pre-ingest)

| Table | Rows |
|-------|------|
| `self_storage_facilities` | 0 — ready for ingest |
| `facility_sales_history` | 0 — ready for ingest |
| `facility_foreclosures` | 0 — ready for ingest |
| `reit_owner_patterns` | **71** — seeded |

---

## 3. Indexes Created (36 total)

### self_storage_facilities (16 indexes including PK)
| Index | Column(s) | Purpose |
|-------|-----------|---------|
| `self_storage_facilities_pkey` | `attomid` | Primary key |
| `idx_ssf_fips` | `situs_state_county_fips` | County-level filtering |
| `idx_ssf_state` | `property_address_state` | State-level filtering |
| `idx_ssf_zip` | `property_address_zip` | ZIP-level filtering |
| `idx_ssf_owner_name` | `party_owner1_name_full` | REIT/entity pattern lookups |
| `idx_ssf_company_flag` | `company_flag` | Non-individual owner filter |
| `idx_ssf_owner_type` | `owner_type_description1` | Owner classification filter |
| `idx_ssf_years_owned` | `years_owned` | Long-hold / motivated seller filter |
| `idx_ssf_mortgage_maturity` | `current_mortgage_maturity_date` | Maturity wall screening |
| `idx_ssf_has_foreclosure` | `has_foreclosure_history` | Distress signal filter |
| `idx_ssf_most_recent_sale_date` | `most_recent_sale_date` | Sale recency filter |
| `idx_ssf_owner_entity_type` | `owner_entity_type` | Classified entity type filter |
| `idx_ssf_is_reit` | `is_reit_owned` | REIT exclusion filter |
| `idx_ssf_cbsa` | `cbsa_code` | Market-level grouping |
| `idx_ssf_tax_assessed_value` | `tax_assessed_value_total` | Size/value screening |
| `idx_ssf_year_built` | `year_built` | Age screening |

### facility_sales_history (10 indexes including PK)
| Index | Column(s) | Purpose |
|-------|-----------|---------|
| `facility_sales_history_pkey` | `(transaction_id, attomid)` | Primary key |
| `idx_fsh_attomid` | `attomid` | Join to facilities |
| `idx_fsh_recording_date` | `recording_date` | Date range queries |
| `idx_fsh_instrument_date` | `instrument_date` | Execution date queries |
| `idx_fsh_grantee1_name` | `grantee1_name_full` | Buyer name lookups |
| `idx_fsh_grantor1_name` | `grantor1_name_full` | Seller name lookups |
| `idx_fsh_transfer_amount` | `transfer_amount` | Price range queries |
| `idx_fsh_document_type` | `document_type_code` | Deed type filtering |
| `idx_fsh_arms_length` | `arms_length_flag` | Arms-length filter |
| `idx_fsh_foreclosure_sale` | `foreclosure_auction_sale` | Distress sale filter |
| `idx_fsh_attomid_date` | `(attomid, recording_date DESC)` | Most-recent-sale lookup |

### facility_foreclosures (7 indexes including PK)
| Index | Column(s) | Purpose |
|-------|-----------|---------|
| `facility_foreclosures_pkey` | `(transaction_id, attomid)` | Primary key |
| `idx_ff_attomid` | `attomid` | Join to facilities |
| `idx_ff_instrument_date` | `foreclosure_instrument_date` | Filing date queries |
| `idx_ff_record_type` | `record_type` | NOD/NTS/LIS/REO filter |
| `idx_ff_auction_date` | `auction_date` | Upcoming auction screening |
| `idx_ff_fips` | `situs_state_county_fips` | County-level distress view |
| `idx_ff_attomid_date` | `(attomid, foreclosure_instrument_date DESC)` | Latest event per facility |

---

## 4. REIT Patterns Seeded

**71 patterns** across 14 REIT/institutional operators.

| REIT / Operator | Pattern Count |
|----------------|--------------|
| CubeSmart | 7 |
| Extra Space Storage | 5 |
| Guardian Storage | 3 |
| Life Storage (EXR) | 5 |
| Metro Self Storage | 3 |
| NSA | 9 |
| Other Institutional | 10 |
| Prime Storage | 3 |
| Public Storage | 8 |
| Simply Self Storage | 3 |
| SmartStop | 4 |
| Storage King USA | 3 |
| StorageMart | 3 |
| US Storage Centers | 3 |

Sample patterns:
```
CubeSmart              "CUBE SMART"
CubeSmart              "CUBESMART"
CubeSmart              "CUBESMART ASSET"
Extra Space Storage    "EXR "
Extra Space Storage    "EXTRA SPACE"
Life Storage (EXR)     "LIFE STORAGE"
NSA                    "ISTORAGE"
NSA                    "NATIONAL STORAGE AFFILIATES"
Public Storage         "PUBLIC STORAGE"
Public Storage         "SHURGARD"
```

Patterns are matched case-insensitively at ingest to set `is_reit_owned = TRUE` on `self_storage_facilities`. Intentionally broad — false positives are acceptable, false negatives are not.

---

## 5. Type Coercion Decisions

| Column | ATTOM Type | Postgres Type | Decision |
|--------|-----------|---------------|----------|
| `storage_building_flag`, `content_overhead_door_flag`, `loading_platform_flag`, `safety_fire_sprinklers_flag`, `accessibility_elevator_flag` | NUMBER (0/1) | BOOLEAN | Coerced at ingest from 0→false, 1→true, null→null |
| `quit_claim_flag`, `arms_length_flag`, `foreclosure_auction_sale`, `grantee_investor_flag`, `transfer_info_multi_parcel_flag`, `mortgage1_interest_only_flag` | NUMBER (0/1) | BOOLEAN | Same coercion at ingest |
| `company_flag` | TEXT ('Y'/'N') | TEXT | **Kept as TEXT** — ATTOM delivers 'Y'/'N' not 0/1. Query layer handles `= 'Y'`. Could coerce to BOOLEAN but left as TEXT to match ATTOM source exactly and avoid silent ingest errors. |
| `latitude`, `longitude` | FLOAT | NUMERIC(10,7) / NUMERIC(11,7) | 7 decimal places gives ~1cm precision, sufficient for parcel-level geocoding |
| `stories_count` | NUMBER | NUMERIC(4,1) | Allows half-story values (e.g. 1.5) |
| `area_lot_acres` | NUMBER | NUMERIC(10,4) | 4 decimal places = ~0.4 sq ft precision |
| `tax_assessed_improvements_perc`, `tax_market_improvements_perc` | NUMBER (percentage) | NUMERIC(6,3) | Stored as raw percentage (e.g. 72.500), not decimal (0.725) |
| `mortgage1_interest_rate`, `mortgage2_interest_rate`, `original_loan_interest_rate` | NUMBER | NUMERIC(8,4) | 4 decimal places covers ARM rate precision |
| `transfer_info_purchase_ltv` | NUMBER | NUMERIC(6,3) | LTV expressed as ratio or percentage — kept NUMERIC, ingest normalizes |
| All money columns (`*_amount`, `*_price`, `*_value`) | NUMBER | NUMERIC(14,2) | 14 digits sufficient for real estate values up to $999 billion |
| `census_tract` | NUMBER | BIGINT | Can be large numeric code |
| ATTOM `DBCREATEDATE`/`DBUPDATEDATE` | TIMESTAMP_NTZ | TIMESTAMPTZ | UTC assumed for Snowflake NTZ columns from ATTOM |

---

## 6. Columns Excluded by Design

The following TAX_ASSESSOR columns were excluded to keep the facilities table focused on investment-analysis signals. They can be added in a future migration if needed.

**Excluded (< 2% populated, no signal value for storage):**
- `PARCELNUMBERFORMATTED` (0% — deprecated by ATTOM)
- `PARCELMAPBOOK`, `PARCELMAPPAGE` (0.2%)
- `PROPERTYADDRESSINFOPRIVACY` (0% — deprecated)
- `ROOMSBASEMENTAREAFINISHED`, `ROOMSBASEMENTAREAUNFINISHED` (0%)
- `BALCONYAREA`, `FEATUREBALCONYFLAG` (0%)
- `DRIVEWAYMATERIAL` (0%)
- `UTILITIESSEWAGEUSAGE`, `UTILITIESWATERSOURCE` (0%)
- `COMMUNITYRECROOMFLAG` (0%)
- `TAXEXEMPTIONWIDOWFLAG`, `TAXEXEMPTIONVETERANFLAG`, `TAXEXEMPTIONSENIORFLAG`, `TAXEXEMPTIONDISABLEDFLAG` (< 0.3%)

**Excluded (residential amenity flags — irrelevant for storage):**
- All `ROOMS*FLAG` columns (bonus room, breakfast nook, cellar, wine cellar, exercise, family, game, great, hobby, laundry, media, mud, office, safe room, sitting, storm shelter, study, sunroom, utility)
- Pool, sauna, wet bar, tennis court, sports court, golf course, boat lift, boat house, pond, boat access, cabin, greenhouse, kennel, stable, poultry house, milk house, gazebo, silo, granary, quonset

**Excluded (ATTOM internal):**
- `DBDELETEDATE` (0% — soft-delete field, irrelevant for active data)
- `PARCELSHELLRECORD` (shell record indicator — filter at query time in Snowflake, not needed in Neon)

---

## 7. Derived Column Contract

These columns on `self_storage_facilities` start as NULL/0 and are populated by the ingest pipeline from the history tables:

| Column | Source | Computation |
|--------|--------|-------------|
| `most_recent_sale_date` | `facility_sales_history` | `MAX(recording_date)` WHERE arms_length_flag |
| `most_recent_sale_price` | `facility_sales_history` | `transfer_amount` on the most-recent-sale row |
| `sale_count_total` | `facility_sales_history` | `COUNT(*)` for attomid |
| `sale_count_5yr` | `facility_sales_history` | COUNT WHERE recording_date >= NOW()-5yr |
| `years_owned` | derived | `(CURRENT_DATE - most_recent_sale_date) / 365.25` |
| `current_mortgage_amount` | `facility_sales_history` | `mortgage1_amount` on most recent recorder row |
| `current_mortgage_maturity_date` | `facility_sales_history` | `mortgage1_term_date` or `mortgage1_recording_date + INTERVAL '1 month' * mortgage1_term` |
| `current_lender_name` | `facility_sales_history` | `mortgage1_lender_name_standardized` on most recent row |
| `has_foreclosure_history` | `facility_foreclosures` | `EXISTS (SELECT 1 FROM facility_foreclosures WHERE attomid = ...)` |
| `foreclosure_event_count` | `facility_foreclosures` | `COUNT(*)` for attomid |
| `last_foreclosure_date` | `facility_foreclosures` | `MAX(foreclosure_instrument_date)` |
| `owner_entity_type` | `self_storage_facilities` | Pattern match on `party_owner1_name_full` + `company_flag` + `owner_type_description1` |
| `is_reit_owned` | `reit_owner_patterns` | Case-insensitive substring match against `reit_owner_patterns.pattern` |

---

## 8. Foreign Key Constraints

- `facility_sales_history.attomid` → `self_storage_facilities.attomid` ON DELETE CASCADE  
- `facility_foreclosures.attomid` → `self_storage_facilities.attomid` ON DELETE CASCADE  

**Ingest order required:** `self_storage_facilities` must be populated before `facility_sales_history` and `facility_foreclosures`, or FK constraints must be deferred during bulk load.

---

## 9. Idempotency Confirmation

Migration uses `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS` throughout.  
`INSERT INTO reit_owner_patterns` uses `ON CONFLICT DO NOTHING`.  
Running the migration a second time will produce no errors and no duplicate rows.

---

## 10. Next Session

**Ingest pipeline** — build the Snowflake → Neon ETL scripts:
1. `ingest_facilities.js` — stream TAX_ASSESSOR (PROPERTYUSESTANDARDIZED='229') → `self_storage_facilities`
2. `ingest_sales_history.js` — stream RECORDER joined to storage ATTOMIDs → `facility_sales_history`
3. `ingest_foreclosures.js` — stream PREFORECLOSURE joined to storage ATTOMIDs → `facility_foreclosures`
4. `compute_derived.js` — UPDATE `self_storage_facilities` derived columns from the history tables

Run in order: facilities → history → foreclosures → derived columns.

---

## Migration 002 — Drop History FKs

**File:** `002_drop_history_foreign_keys.sql`
**Applied:** 2026-04-16

Migration 001 added `ON DELETE CASCADE` foreign keys from `facility_sales_history.attomid` and `facility_foreclosures.attomid` back to `self_storage_facilities.attomid`. This was wrong for the ingest order: the pipeline lands history rows before the facilities row exists (because the facilities table's derived columns — `most_recent_sale_date`, `sale_count_total`, `has_foreclosure_history`, etc. — are computed from the history tables at insert time). Every history row would have failed with a FK violation. Both constraints (`fk_fsh_facility`, `fk_ff_facility`) are dropped here. Referential integrity is a pipeline responsibility: the ingest scripts run an orphan-check query at the end of each state batch and surface any history rows without a matching facilities row.
