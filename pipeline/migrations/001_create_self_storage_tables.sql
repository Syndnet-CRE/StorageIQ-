-- ============================================================
-- 001_create_self_storage_tables.sql
-- StorageIQ — Neon DDL migration
-- Hybrid relational model: 3 core tables + 1 REIT reference table
--
-- Source views (ATTOM_SYNDNET_SHARE.DELIVERY):
--   TAX_ASSESSOR    → self_storage_facilities (one row per property)
--   RECORDER        → facility_sales_history  (many rows per property)
--   PREFORECLOSURE  → facility_foreclosures   (many rows per property)
--   LOAN_MODEL      — excluded (3.2% coverage, redundant with RECORDER MORTGAGE1*)
--
-- All column names trace to storage_schema_discovery.md.
-- ATTOM source column names are noted in comments where non-obvious.
-- Derived columns (not from Snowflake) are marked -- [DERIVED].
-- Ingestion metadata columns: ingested_at, source_run_id.
-- Migration is idempotent (IF NOT EXISTS throughout).
-- ============================================================

BEGIN;

-- ============================================================
-- TABLE 1: self_storage_facilities
-- One row per facility. Keyed on attomid (ATTOM's unique parcel ID).
-- All TAX_ASSESSOR columns relevant to storage investment analysis,
-- plus derived summary columns computed from history tables at ingest.
-- ============================================================

CREATE TABLE IF NOT EXISTS self_storage_facilities (

  -- ── Primary key ─────────────────────────────────────────────
  attomid                           BIGINT        PRIMARY KEY,  -- ATTOMID (NUMBER)

  -- ── Geography / jurisdiction ─────────────────────────────────
  situs_state_code                  TEXT,                       -- SITUSSTATECODE
  situs_county                      TEXT,                       -- SITUSCOUNTY
  property_jurisdiction_name        TEXT,                       -- PROPERTYJURISDICTIONNAME
  situs_state_county_fips           TEXT,                       -- SITUSSTATECOUNTYFIPS (5-digit FIPS)
  combined_statistical_area         TEXT,                       -- COMBINEDSTATISTICALAREA
  cbsa_name                         TEXT,                       -- CBSANAME
  cbsa_code                         TEXT,                       -- CBSACODE
  msa_name                          TEXT,                       -- MSANAME
  msa_code                          TEXT,                       -- MSACODE
  metropolitan_division             TEXT,                       -- METROPOLITANDIVISION
  census_tract                      BIGINT,                     -- CENSUSTRACT (NUMBER)
  census_block_group                INTEGER,                    -- CENSUSBLOCKGROUP (NUMBER)

  -- ── Parcel identifiers ───────────────────────────────────────
  parcel_number_raw                 TEXT,                       -- PARCELNUMBERRAW
  parcel_number_alternate           TEXT,                       -- PARCELNUMBERALTERNATE
  parcel_account_number             TEXT,                       -- PARCELACCOUNTNUMBER

  -- ── Site address ─────────────────────────────────────────────
  property_address_full             TEXT,                       -- PROPERTYADDRESSFULL
  property_address_house_number     TEXT,                       -- PROPERTYADDRESSHOUSENUMBER
  property_address_street_direction TEXT,                       -- PROPERTYADDRESSSTREETDIRECTION
  property_address_street_name      TEXT,                       -- PROPERTYADDRESSSTREETNAME
  property_address_street_suffix    TEXT,                       -- PROPERTYADDRESSSTREETSUFFIX
  property_address_city             TEXT,                       -- PROPERTYADDRESSCITY
  property_address_state            TEXT,                       -- PROPERTYADDRESSSTATE
  property_address_zip              TEXT,                       -- PROPERTYADDRESSZIP
  property_address_zip4             TEXT,                       -- PROPERTYADDRESSZIP4

  -- ── Geocodes ─────────────────────────────────────────────────
  latitude                          NUMERIC(10,7),              -- LATITUDE (FLOAT)
  longitude                         NUMERIC(11,7),              -- LONGITUDE (FLOAT)
  geo_quality_code                  TEXT,                       -- GEOQUALITYCODE

  -- ── Legal description ────────────────────────────────────────
  legal_description                 TEXT,                       -- LEGALDESCRIPTION
  legal_subdivision                 TEXT,                       -- LEGALSUBDIVISION
  zoned_code_local                  TEXT,                       -- ZONEDCODELOCAL

  -- ── Property classification ───────────────────────────────────
  property_use_standardized         TEXT,                       -- PROPERTYUSESTANDARDIZED (always '229' for storage)
  property_use_muni                 TEXT,                       -- PROPERTYUSEMUNI (county-specific code)
  property_use_group                TEXT,                       -- PROPERTYUSEGROUP

  -- ── Owner — primary (ATTOM PARTYOWNER1*) ─────────────────────
  party_owner1_name_full            TEXT,                       -- PARTYOWNER1NAMEFULL (100% populated)
  party_owner1_name_first           TEXT,                       -- PARTYOWNER1NAMEFIRST (56.5%)
  party_owner1_name_middle          TEXT,                       -- PARTYOWNER1NAMEMIDDLE
  party_owner1_name_last            TEXT,                       -- PARTYOWNER1NAMELAST (99.9%)
  party_owner1_name_suffix          TEXT,                       -- PARTYOWNER1NAMESUFFIX
  party_owner2_name_full            TEXT,                       -- PARTYOWNER2NAMEFULL
  owner_type_description1           TEXT,                       -- OWNERTYPEDESCRIPTION1 (individual/company/unknown)
  ownership_vesting_relation_code   TEXT,                       -- OWNERSHIPVESTINGRELATIONCODE
  company_flag                      TEXT,                       -- COMPANYFLAG (Y/N — coerce to BOOLEAN at query layer)
  trust_description                 TEXT,                       -- TRUSTDESCRIPTION (42.6%)
  status_owner_occupied_flag        TEXT,                       -- STATUSOWNEROCCUPIEDFLAG (Absentee/Occupied)

  -- ── Deed owner (may differ from tax roll owner) ───────────────
  deed_owner1_name_full             TEXT,                       -- DEEDOWNER1NAMEFULL
  deed_owner1_name_first            TEXT,                       -- DEEDOWNER1NAMEFIRST
  deed_owner1_name_last             TEXT,                       -- DEEDOWNER1NAMELAST

  -- ── Mailing address ──────────────────────────────────────────
  contact_owner_mail_address_full   TEXT,                       -- CONTACTOWNERMAILADDRESSFULL
  contact_owner_mail_address_city   TEXT,                       -- CONTACTOWNERMAILADDRESSCITY
  contact_owner_mail_address_state  TEXT,                       -- CONTACTOWNERMAILADDRESSSTATE
  contact_owner_mail_address_zip    TEXT,                       -- CONTACTOWNERMAILADDRESSZIP
  contact_owner_mailing_county      TEXT,                       -- CONTACTOWNERMAILINGCOUNTY
  contact_owner_mailing_fips        TEXT,                       -- CONTACTOWNERMAILINGFIPS

  -- ── Tax assessment ────────────────────────────────────────────
  tax_year_assessed                 INTEGER,                    -- TAXYEARASSESSED (NUMBER → year)
  tax_assessed_value_total          NUMERIC(14,2),              -- TAXASSESSEDVALUETOTAL
  tax_assessed_value_improvements   NUMERIC(14,2),              -- TAXASSESSEDVALUEIMPROVEMENTS
  tax_assessed_value_land           NUMERIC(14,2),              -- TAXASSESSEDVALUELAND
  tax_assessed_improvements_perc    NUMERIC(6,3),               -- TAXASSESSEDIMPROVEMENTSPERC
  previous_assessed_value           NUMERIC(14,2),              -- PREVIOUSASSESSEDVALUE
  tax_market_value_total            NUMERIC(14,2),              -- TAXMARKETVALUETOTAL
  tax_market_value_improvements     NUMERIC(14,2),              -- TAXMARKETVALUEIMPROVEMENTS
  tax_market_value_land             NUMERIC(14,2),              -- TAXMARKETVALUELAND
  tax_market_value_year             INTEGER,                    -- TAXMARKETVALUEYEAR
  tax_fiscal_year                   INTEGER,                    -- TAXFISCALYEAR
  tax_rate_area                     TEXT,                       -- TAXRATEAREA
  tax_billed_amount                 NUMERIC(14,2),              -- TAXBILLEDAMOUNT (87% populated)
  tax_delinquent_year               INTEGER,                    -- TAXDELINQUENTYEAR (2.9% — keep, rare signal)
  last_assessor_tax_roll_update     DATE,                       -- LASTASSESSORTAXROLLUPDATE
  assr_last_updated                 DATE,                       -- ASSRLASTUPDATED

  -- ── Assessor sale history (on the tax roll) ───────────────────
  assessor_last_sale_date           DATE,                       -- ASSESSORLASTSALEDATE (80.6%)
  assessor_last_sale_amount         NUMERIC(14,2),              -- ASSESSORLASTSALEAMOUNT (91.4%)
  assessor_prior_sale_date          DATE,                       -- ASSESSORPRIORSALEDATE
  assessor_prior_sale_amount        NUMERIC(14,2),              -- ASSESSORPRIORSALEAMOUNT
  last_ownership_transfer_date      DATE,                       -- LASTOWNERSHIPTRANSFERDATE (60.9%)
  last_ownership_transfer_doc_num   TEXT,                       -- LASTOWNERSHIPTRANSFERDOCUMENTNUMBER
  deed_last_sale_date               DATE,                       -- DEEDLASTSALEDATE (80.5%)
  deed_last_sale_price              NUMERIC(14,2),              -- DEEDLASTSALEPRICE (91.4%)
  deed_last_document_number         TEXT,                       -- DEEDLASTDOCUMENTNUMBER

  -- ── Physical characteristics ──────────────────────────────────
  year_built                        INTEGER,                    -- YEARBUILT (97.2%)
  year_built_effective              INTEGER,                    -- YEARBUILTEFFECTIVE (17.0%)
  area_building                     INTEGER,                    -- AREABUILDING (100%) — sq ft, all structures
  area_building_definition_code     TEXT,                       -- AREABUILDINGDEFINITIONCODE
  area_gross                        INTEGER,                    -- AREAGROSS (52.9%)
  area_lot_sf                       INTEGER,                    -- AREALOTSF (100%)
  area_lot_acres                    NUMERIC(10,4),              -- AREALOTACRES (100%)
  area_lot_depth                    NUMERIC(10,2),              -- AREALOTDEPTH
  area_lot_width                    NUMERIC(10,2),              -- AREALOTWIDTH
  buildings_count                   INTEGER,                    -- BUILDINGSCOUNT (39.7%)
  stories_count                     NUMERIC(4,1),               -- STORIESCOUNT (93.2%)
  units_count                       INTEGER,                    -- UNITSCOUNT
  parking_space_count               INTEGER,                    -- PARKINGSPACECOUNT

  -- ── Storage-specific physical ─────────────────────────────────
  storage_building_flag             BOOLEAN,                    -- STORAGEBUILDINGFLAG (coerced from ATTOM NUMBER 0/1)
  storage_building_area             INTEGER,                    -- STORAGEBUILDINGAREA (NUMBER, 2.9% populated)
  content_overhead_door_flag        BOOLEAN,                    -- CONTENTOVERHEADDOORFLAG (relevant for self-storage)
  loading_platform_flag             BOOLEAN,                    -- LOADINGPLATFORMFLAG
  loading_platform_area             INTEGER,                    -- LOADINGPLATFORMAREA

  -- ── Construction ─────────────────────────────────────────────
  construction                      TEXT,                       -- CONSTRUCTION
  exterior1_code                    TEXT,                       -- EXTERIOR1CODE (93.3%)
  roof_material                     TEXT,                       -- ROOFMATERIAL
  foundation                        TEXT,                       -- FOUNDATION
  safety_fire_sprinklers_flag       BOOLEAN,                    -- SAFETYFIRESPRINKLERSFLAG
  accessibility_elevator_flag       BOOLEAN,                    -- ACCESSIBILITYELEVATORFLAG
  construction_fire_resistance_class TEXT,                      -- CONSTRUCTIONFIRERESISTANCECLASS

  -- ── ATTOM data freshness ──────────────────────────────────────
  publication_date                  DATE,                       -- PUBLICATIONDATE
  attom_db_create_date              TIMESTAMPTZ,                -- DBCREATEDATE
  attom_db_update_date              TIMESTAMPTZ,                -- DBUPDATEDATE

  -- ── Derived summary columns [DERIVED] ─────────────────────────
  -- Computed from facility_sales_history at ingest time.
  most_recent_sale_date             DATE,                       -- [DERIVED] MAX(recording_date) from sales_history
  most_recent_sale_price            NUMERIC(14,2),              -- [DERIVED] transfer_amount on most recent sale
  sale_count_total                  INTEGER           DEFAULT 0, -- [DERIVED] COUNT rows in sales_history
  sale_count_5yr                    INTEGER           DEFAULT 0, -- [DERIVED] sales in last 5 years
  years_owned                       NUMERIC(5,2),               -- [DERIVED] CURRENT_DATE - most_recent_sale_date in years

  -- Derived from most recent RECORDER mortgage row
  current_mortgage_amount           NUMERIC(14,2),              -- [DERIVED] MORTGAGE1AMOUNT from most recent recorder row
  current_mortgage_maturity_date    DATE,                       -- [DERIVED] recording_date + term months
  current_lender_name               TEXT,                       -- [DERIVED] MORTGAGE1LENDERNAMEFULLSTANDARDIZED

  -- Derived from facility_foreclosures
  has_foreclosure_history           BOOLEAN           DEFAULT FALSE, -- [DERIVED] TRUE if any row in foreclosures
  foreclosure_event_count           INTEGER           DEFAULT 0,     -- [DERIVED] COUNT rows in foreclosures
  last_foreclosure_date             DATE,                            -- [DERIVED] MAX(foreclosure_instrument_date)

  -- Derived owner classification
  owner_entity_type                 TEXT,               -- [DERIVED] 'individual'|'llc'|'trust'|'corporation'|'reit'|'unknown'
  is_reit_owned                     BOOLEAN DEFAULT FALSE, -- [DERIVED] TRUE if matches reit_owner_patterns

  -- ── Ingestion metadata ────────────────────────────────────────
  ingested_at                       TIMESTAMPTZ       NOT NULL DEFAULT now(),
  source_run_id                     TEXT

);

COMMENT ON TABLE self_storage_facilities IS
  'One row per self-storage facility (PROPERTYUSESTANDARDIZED=229). '
  'Source: ATTOM TAX_ASSESSOR view. Derived summary columns computed '
  'from facility_sales_history and facility_foreclosures at ingest time. '
  'Primary key is ATTOM attomid (their unique parcel identifier).';

-- ── Indexes: self_storage_facilities ─────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_ssf_fips
  ON self_storage_facilities (situs_state_county_fips);

CREATE INDEX IF NOT EXISTS idx_ssf_state
  ON self_storage_facilities (property_address_state);

CREATE INDEX IF NOT EXISTS idx_ssf_zip
  ON self_storage_facilities (property_address_zip);

CREATE INDEX IF NOT EXISTS idx_ssf_owner_name
  ON self_storage_facilities (party_owner1_name_full);

CREATE INDEX IF NOT EXISTS idx_ssf_company_flag
  ON self_storage_facilities (company_flag);

CREATE INDEX IF NOT EXISTS idx_ssf_owner_type
  ON self_storage_facilities (owner_type_description1);

CREATE INDEX IF NOT EXISTS idx_ssf_years_owned
  ON self_storage_facilities (years_owned);

CREATE INDEX IF NOT EXISTS idx_ssf_mortgage_maturity
  ON self_storage_facilities (current_mortgage_maturity_date);

CREATE INDEX IF NOT EXISTS idx_ssf_has_foreclosure
  ON self_storage_facilities (has_foreclosure_history);

CREATE INDEX IF NOT EXISTS idx_ssf_most_recent_sale_date
  ON self_storage_facilities (most_recent_sale_date);

CREATE INDEX IF NOT EXISTS idx_ssf_owner_entity_type
  ON self_storage_facilities (owner_entity_type);

CREATE INDEX IF NOT EXISTS idx_ssf_is_reit
  ON self_storage_facilities (is_reit_owned);

CREATE INDEX IF NOT EXISTS idx_ssf_cbsa
  ON self_storage_facilities (cbsa_code);

CREATE INDEX IF NOT EXISTS idx_ssf_tax_assessed_value
  ON self_storage_facilities (tax_assessed_value_total);

CREATE INDEX IF NOT EXISTS idx_ssf_year_built
  ON self_storage_facilities (year_built);


-- ============================================================
-- TABLE 2: facility_sales_history
-- Many rows per facility. One row per RECORDER transaction
-- matching a storage attomid. Preserves full deed and mortgage
-- transaction history including arms-length transfers, distress
-- flags, and first/second lien mortgage terms.
-- ============================================================

CREATE TABLE IF NOT EXISTS facility_sales_history (

  -- ── Primary key (compound) ───────────────────────────────────
  transaction_id                        BIGINT        NOT NULL,   -- TRANSACTIONID (RECORDER unique TX id)
  attomid                               BIGINT        NOT NULL,   -- ATTOMID (join to self_storage_facilities)
  recording_date                        DATE,                     -- RECORDINGDATE (60.4%)

  PRIMARY KEY (transaction_id, attomid),

  -- ── Document / filing ─────────────────────────────────────────
  document_recording_county_fips        TEXT,                     -- DOCUMENTRECORDINGCOUNTYFIPS
  document_recording_state_code         TEXT,                     -- DOCUMENTRECORDINGSTATECODE
  document_type_code                    TEXT,                     -- DOCUMENTTYPECODE (100%) — grant deed, quit claim, etc.
  document_number_formatted             TEXT,                     -- DOCUMENTNUMBERFORMATTED
  instrument_number                     TEXT,                     -- INSTRUMENTNUMBER
  instrument_date                       DATE,                     -- INSTRUMENTDATE (81.8%) — execution date
  book                                  TEXT,                     -- BOOK
  page                                  TEXT,                     -- PAGE

  -- ── Transfer flags ────────────────────────────────────────────
  quit_claim_flag                       BOOLEAN,                  -- QUITCLAIMFLAG (coerced from NUMBER 0/1)
  arms_length_flag                      BOOLEAN,                  -- ARMSLENGTHFLAG
  foreclosure_auction_sale              BOOLEAN,                  -- FORECLOSUREAUCTIONSALE
  grantee_investor_flag                 BOOLEAN,                  -- GRANTEEINVESTORFLAG (investor w/ >10 purchases/yr)
  transfer_info_purchase_type_code      INTEGER,                  -- TRANSFERINFOPURCHASETYPECODE (resale/new/subdivision)
  transfer_info_distress_circumstance   INTEGER,                  -- TRANSFERINFODISTRESSCIRCUMSTANCECODE
  transfer_info_multi_parcel_flag       BOOLEAN,                  -- TRANSFERINFOMULTIPARCELFLAG
  partial_interest                      TEXT,                     -- PARTIALINTEREST (% ownership transferred)

  -- ── Sale price ────────────────────────────────────────────────
  transfer_amount                       NUMERIC(14,2),            -- TRANSFERAMOUNT (= sale price, 60.4%)
  transfer_tax_total                    NUMERIC(14,2),            -- TRANSFERTAXTOTAL
  transfer_info_purchase_down_payment   NUMERIC(14,2),            -- TRANSFERINFOPURCHASEDOWNPAYMENT
  transfer_info_purchase_ltv            NUMERIC(6,3),             -- TRANSFERINFOPURCHASELOANTOVALUE

  -- ── Grantor (seller) ─────────────────────────────────────────
  grantor1_name_full                    TEXT,                     -- GRANTOR1NAMEFULL (100%)
  grantor1_name_first                   TEXT,                     -- GRANTOR1NAMEFIRST
  grantor1_name_last                    TEXT,                     -- GRANTOR1NAMELAST
  grantor1_info_entity_classification   TEXT,                     -- GRANTOR1INFOENTITYCLASSIFICATION (individual/trust/company)
  grantor_address_full                  TEXT,                     -- GRANTORADDRESSFULL
  grantor_address_city                  TEXT,                     -- GRANTORADDRESSCITY
  grantor_address_state                 TEXT,                     -- GRANTORADDRESSSTATE
  grantor_address_zip                   TEXT,                     -- GRANTORADDRESSZIP

  -- ── Grantee (buyer) ──────────────────────────────────────────
  grantee1_name_full                    TEXT,                     -- GRANTEE1NAMEFULL (100%)
  grantee1_name_first                   TEXT,                     -- GRANTEE1NAMEFIRST
  grantee1_name_last                    TEXT,                     -- GRANTEE1NAMELAST
  grantee1_info_entity_classification   TEXT,                     -- GRANTEE1INFOENTITYCLASSIFICATION (95.5%)
  grantee2_name_full                    TEXT,                     -- GRANTEE2NAMEFULL
  grantee_info_vesting1                 TEXT,                     -- GRANTEEINFOVESTING1 (co-ownership method)
  grantee_mail_address_full             TEXT,                     -- GRANTEEMAILADDRESSFULL
  grantee_mail_address_city             TEXT,                     -- GRANTEEMAILADDRESSCITY
  grantee_mail_address_state            TEXT,                     -- GRANTEEMAILADDRESSSTATE
  grantee_mail_address_zip              TEXT,                     -- GRANTEEMAILADDRESSZIP

  -- ── Title company ─────────────────────────────────────────────
  title_company_standardized_name       TEXT,                     -- TITLECOMPANYSTANDARDIZEDNAME

  -- ── Property use at time of recording ────────────────────────
  property_use_standardized             TEXT,                     -- PROPERTYUSESTANDARDIZED
  property_address_full                 TEXT,                     -- PROPERTYADDRESSFULL

  -- ── Mortgage 1 (first lien) ───────────────────────────────────
  mortgage1_amount                      NUMERIC(14,2),            -- MORTGAGE1AMOUNT
  mortgage1_type                        TEXT,                     -- MORTGAGE1TYPE
  mortgage1_recording_date              DATE,                     -- MORTGAGE1RECORDINGDATE
  mortgage1_term                        INTEGER,                  -- MORTGAGE1TERM (months)
  mortgage1_term_type                   TEXT,                     -- MORTGAGE1TERMTYPE
  mortgage1_term_date                   DATE,                     -- MORTGAGE1TERMDATE
  mortgage1_interest_rate               NUMERIC(8,4),             -- MORTGAGE1INTERESTRATE
  mortgage1_interest_rate_type          TEXT,                     -- MORTGAGE1INTERESTRATETYPE (fixed/arm)
  mortgage1_lender_name_standardized    TEXT,                     -- MORTGAGE1LENDERNAMEFULLSTANDARDIZED
  mortgage1_lender_name_first           TEXT,                     -- MORTGAGE1LENDERNAMEFIRST
  mortgage1_lender_name_last            TEXT,                     -- MORTGAGE1LENDERNAMELAST
  mortgage1_lender_entity_class         TEXT,                     -- MORTGAGE1LENDERINFOENTITYCLASSIFICATION
  mortgage1_document_number             TEXT,                     -- MORTGAGE1DOCUMENTNUMBERFORMATTED
  mortgage1_interest_only_flag          BOOLEAN,                  -- MORTGAGE1INTERESTONLYFLAG
  mortgage1_prepayment_penalty_flag     TEXT,                     -- MORTGAGE1INFOPREPAYMENTPENALTYFLAG

  -- ── Mortgage 2 (second lien) ──────────────────────────────────
  mortgage2_amount                      NUMERIC(14,2),            -- MORTGAGE2AMOUNT
  mortgage2_type                        TEXT,                     -- MORTGAGE2TYPE
  mortgage2_recording_date              DATE,                     -- MORTGAGE2RECORDINGDATE
  mortgage2_interest_rate               NUMERIC(8,4),             -- MORTGAGE2INTERESTRATE
  mortgage2_lender_name_standardized    TEXT,                     -- MORTGAGE2LENDERNAMEFULLSTANDARDIZED

  -- ── Source timestamps ─────────────────────────────────────────
  last_updated                          DATE,                     -- LASTUPDATED
  publication_date                      DATE,                     -- PUBLICATIONDATE
  attom_db_create_date                  TIMESTAMPTZ,              -- DBCREATEDATE
  attom_db_update_date                  TIMESTAMPTZ,              -- DBUPDATEDATE

  -- ── Ingestion metadata ────────────────────────────────────────
  ingested_at                           TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_run_id                         TEXT,

  -- ── Foreign key ───────────────────────────────────────────────
  CONSTRAINT fk_fsh_facility
    FOREIGN KEY (attomid) REFERENCES self_storage_facilities (attomid)
    ON DELETE CASCADE

);

COMMENT ON TABLE facility_sales_history IS
  'One row per RECORDER transaction for self-storage facilities. '
  'Preserves complete deed and mortgage transaction history. '
  'Join to self_storage_facilities via attomid. '
  'Source: ATTOM RECORDER view (12,030 TX rows for 3,499 of 4,719 storage facilities).';

-- ── Indexes: facility_sales_history ──────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_fsh_attomid
  ON facility_sales_history (attomid);

CREATE INDEX IF NOT EXISTS idx_fsh_recording_date
  ON facility_sales_history (recording_date);

CREATE INDEX IF NOT EXISTS idx_fsh_instrument_date
  ON facility_sales_history (instrument_date);

CREATE INDEX IF NOT EXISTS idx_fsh_grantee1_name
  ON facility_sales_history (grantee1_name_full);

CREATE INDEX IF NOT EXISTS idx_fsh_grantor1_name
  ON facility_sales_history (grantor1_name_full);

CREATE INDEX IF NOT EXISTS idx_fsh_transfer_amount
  ON facility_sales_history (transfer_amount);

CREATE INDEX IF NOT EXISTS idx_fsh_document_type
  ON facility_sales_history (document_type_code);

CREATE INDEX IF NOT EXISTS idx_fsh_arms_length
  ON facility_sales_history (arms_length_flag);

CREATE INDEX IF NOT EXISTS idx_fsh_foreclosure_sale
  ON facility_sales_history (foreclosure_auction_sale);

CREATE INDEX IF NOT EXISTS idx_fsh_attomid_date
  ON facility_sales_history (attomid, recording_date DESC);


-- ============================================================
-- TABLE 3: facility_foreclosures
-- Many rows per facility. One row per PREFORECLOSURE record
-- matching a storage attomid. Rare but critical signal —
-- only 26 of 4,719 TX storage facilities had PREFORECLOSURE rows.
-- ============================================================

CREATE TABLE IF NOT EXISTS facility_foreclosures (

  -- ── Primary key (compound) ───────────────────────────────────
  transaction_id                        BIGINT        NOT NULL,   -- TRANSACTIONID
  attomid                               BIGINT        NOT NULL,   -- ATTOMID
  foreclosure_instrument_date           DATE,                     -- FORECLOSUREINSTRUMENTDATE (filing date)

  PRIMARY KEY (transaction_id, attomid),

  -- ── Record classification ─────────────────────────────────────
  record_type                           TEXT,                     -- RECORDTYPE (NOD/NTS/LIS/REO — encodes status + type)
  foreclosure_recording_date            DATE,                     -- FORECLOSURERECORDINGDATE
  foreclosure_instrument_number         TEXT,                     -- FORECLOSUREINSTRUMENTNUMBER
  foreclosure_book_page                 TEXT,                     -- FORECLOSUREBOOKPAGE
  case_number                           TEXT,                     -- CASENUMBER
  trustee_reference_number              TEXT,                     -- TRUSTEEREFERENCENUMBER

  -- ── Property address at filing ───────────────────────────────
  situs_state_county_fips               TEXT,                     -- SITUSSTATECOUNTYFIPS
  property_address_full                 TEXT,                     -- PROPERTYADDRESSFULL
  property_address_city                 TEXT,                     -- PROPERTYADDRESSCITY
  property_address_state                TEXT,                     -- PROPERTYADDRESSSTATE
  property_address_zip                  TEXT,                     -- PROPERTYADDRESSZIP

  -- ── Property characteristics at filing ───────────────────────
  property_use_standardized             TEXT,                     -- PROPERTYUSESTANDARDIZED
  area_building                         INTEGER,                  -- AREABUILDING
  area_lot_sf                           INTEGER,                  -- AREALOTSF
  year_built                            INTEGER,                  -- YEARBUILT

  -- ── Borrower / original loan ─────────────────────────────────
  borrower_name_owner                   TEXT,                     -- BORROWERNAMEOWNER
  original_loan_amount                  NUMERIC(14,2),            -- ORIGINALLOANAMOUNT
  original_loan_interest_rate           NUMERIC(8,4),             -- ORIGINALLOANINTERESTRATE
  original_loan_recording_date          DATE,                     -- ORIGINALLOANRECORDINGDATE
  original_loan_instrument_number       TEXT,                     -- ORIGINALLOANINSTRUMENTNUMBER
  original_loan_loan_number             TEXT,                     -- ORIGINALLOANLOANNUMBER
  loan_maturity_date                    DATE,                     -- LOANMATURITYDATE

  -- ── Distress financials ───────────────────────────────────────
  default_amount                        NUMERIC(14,2),            -- DEFAULTAMOUNT
  loan_balance                          NUMERIC(14,2),            -- LOANBALANCE
  judgment_date                         DATE,                     -- JUDGMENTDATE
  judgment_amount                       NUMERIC(14,2),            -- JUDGMENTAMOUNT
  estimated_value                       NUMERIC(14,2),            -- ESTIMATEDVALUE

  -- ── Auction ───────────────────────────────────────────────────
  auction_date                          DATE,                     -- AUCTIONDATE
  auction_time                          TEXT,                     -- AUCTIONTIME
  auction_address                       TEXT,                     -- AUCTIONADDRESS
  auction_city                          TEXT,                     -- AUCTIONCITY
  recorded_auction_opening_bid          NUMERIC(14,2),            -- RECORDEDAUCTIONOPENINGBID

  -- ── Lender ────────────────────────────────────────────────────
  lender_name_full_standardized         TEXT,                     -- LENDERNAMEFULLSTANDARDIZED
  lender_address                        TEXT,                     -- LENDERADDRESS
  lender_address_city                   TEXT,                     -- LENDERADDRESSCITY
  lender_address_state                  TEXT,                     -- LENDERADDRESSSTATE
  lender_address_zip                    TEXT,                     -- LENDERADDRESSZIP

  -- ── Servicer ──────────────────────────────────────────────────
  servicer_name                         TEXT,                     -- SERVICERNAME
  servicer_address                      TEXT,                     -- SERVICERADDRESS
  servicer_city                         TEXT,                     -- SERVICERCITY
  servicer_state                        TEXT,                     -- SERVICERSTATE

  -- ── Trustee ───────────────────────────────────────────────────
  trustee_name                          TEXT,                     -- TRUSTEENAME
  trustee_address_city                  TEXT,                     -- TRUSTEEADDRESSCITY
  trustee_address_state                 TEXT,                     -- TRUSTEEADDRESSSTATE

  -- ── Source timestamps ─────────────────────────────────────────
  create_date                           DATE,                     -- CREATEDATE
  record_last_updated                   TIMESTAMPTZ,              -- RECORDLASTUPDATED
  publication_date                      DATE,                     -- PUBLICATIONDATE
  attom_db_create_date                  TIMESTAMPTZ,              -- DBCREATEDATE
  attom_db_update_date                  TIMESTAMPTZ,              -- DBUPDATEDATE

  -- ── Ingestion metadata ────────────────────────────────────────
  ingested_at                           TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_run_id                         TEXT,

  -- ── Foreign key ───────────────────────────────────────────────
  CONSTRAINT fk_ff_facility
    FOREIGN KEY (attomid) REFERENCES self_storage_facilities (attomid)
    ON DELETE CASCADE

);

COMMENT ON TABLE facility_foreclosures IS
  'One row per PREFORECLOSURE record for self-storage facilities. '
  'RECORD_TYPE encodes both status (NOD/NTS/LIS/REO) and foreclosure type. '
  'Source: ATTOM PREFORECLOSURE view (36 rows for 26 of 4,719 TX storage facilities — '
  'rare but critical acquisition signal). '
  'Join to self_storage_facilities via attomid.';

-- ── Indexes: facility_foreclosures ───────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_ff_attomid
  ON facility_foreclosures (attomid);

CREATE INDEX IF NOT EXISTS idx_ff_instrument_date
  ON facility_foreclosures (foreclosure_instrument_date);

CREATE INDEX IF NOT EXISTS idx_ff_record_type
  ON facility_foreclosures (record_type);

CREATE INDEX IF NOT EXISTS idx_ff_auction_date
  ON facility_foreclosures (auction_date);

CREATE INDEX IF NOT EXISTS idx_ff_fips
  ON facility_foreclosures (situs_state_county_fips);

CREATE INDEX IF NOT EXISTS idx_ff_attomid_date
  ON facility_foreclosures (attomid, foreclosure_instrument_date DESC);


-- ============================================================
-- TABLE 4: reit_owner_patterns
-- Reference table for REIT exclusion matching.
-- Patterns are matched case-insensitively against
-- self_storage_facilities.party_owner1_name_full at ingest.
-- ============================================================

CREATE TABLE IF NOT EXISTS reit_owner_patterns (
  pattern_id    SERIAL          PRIMARY KEY,
  pattern       TEXT            NOT NULL,
  reit_name     TEXT            NOT NULL,
  notes         TEXT,
  active        BOOLEAN         NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT now(),
  UNIQUE (pattern)
);

COMMENT ON TABLE reit_owner_patterns IS
  'Substring patterns for identifying REIT-owned self-storage facilities. '
  'Matched case-insensitively against party_owner1_name_full during ingest '
  'to set is_reit_owned=TRUE on self_storage_facilities. '
  'Err toward inclusion — false positives are acceptable, false negatives are not.';

CREATE INDEX IF NOT EXISTS idx_rop_reit_name
  ON reit_owner_patterns (reit_name);

CREATE INDEX IF NOT EXISTS idx_rop_pattern
  ON reit_owner_patterns (pattern);

-- ── Seed REIT patterns ────────────────────────────────────────────────────────

INSERT INTO reit_owner_patterns (pattern, reit_name, notes) VALUES

  -- Public Storage (NYSE: PSA) — largest US self-storage REIT
  ('PUBLIC STORAGE',        'Public Storage', 'Primary entity name'),
  ('PUBLIC STG',            'Public Storage', 'Common abbreviation on deeds'),
  ('PS PARTNERS',           'Public Storage', 'Operating partnership subsidiary'),
  ('PS TEXAS',              'Public Storage', 'State-specific subsidiary'),
  ('PS ORANGE',             'Public Storage', 'County-specific subsidiary'),
  ('PSA LLC',               'Public Storage', 'LLC subsidiary pattern'),
  ('SHURGARD',              'Public Storage', 'Acquired by Public Storage — European brand, also US'),
  ('STOR-ALL',              'Public Storage', 'Legacy brand acquired by PS'),

  -- Extra Space Storage (NYSE: EXR) — absorbed Life Storage 2023
  ('EXTRA SPACE',           'Extra Space Storage', 'Primary entity name'),
  ('EXTRA SPACE PROPERTIES','Extra Space Storage', 'Property-holding entity'),
  ('EXTRA SPACE STOR',      'Extra Space Storage', 'Abbreviated form on deeds'),
  ('EXR ',                  'Extra Space Storage', 'Ticker abbreviation in entity names'),
  ('EXR LLC',               'Extra Space Storage', 'LLC form'),
  ('SMARTSTOP ASSET MGMT',  'Extra Space Storage', 'SmartStop managed by EXR affiliate — see also below'),

  -- Life Storage (now merged into Extra Space Storage, post-2023)
  ('LIFE STORAGE',          'Life Storage (EXR)', 'Merged into Extra Space 2023 — legacy deeds still show this'),
  ('LIFE STG',              'Life Storage (EXR)', 'Abbreviated deed form'),
  ('SOVRAN',                'Life Storage (EXR)', 'Legacy brand (Uncle Bob''s Self Storage parent)'),
  ('UNCLE BOB',             'Life Storage (EXR)', 'Consumer brand acquired by Sovran/Life Storage'),
  ('STORAGE DELUXE',        'Life Storage (EXR)', 'Brand acquired by Life Storage'),

  -- CubeSmart (NYSE: CUBE)
  ('CUBESMART',             'CubeSmart', 'Primary entity name'),
  ('CUBE SMART',            'CubeSmart', 'Space variant on deeds'),
  ('CUBESMART ASSET',       'CubeSmart', 'Asset-holding subsidiary pattern'),
  ('CUBESMART LP',          'CubeSmart', 'Operating partnership form'),
  ('STORAGE EXPERTS',       'CubeSmart', 'Legacy brand acquired by CubeSmart'),
  -- Note: STORAGE DELUXE deduped — mapped to Life Storage (EXR) above (most recent acquirer).
  ('STORAGE USA',           'CubeSmart', 'Legacy brand — GE Capital sold to CubeSmart predecessor'),

  -- National Storage Affiliates (NYSE: NSA)
  ('NATIONAL STORAGE AFFILIATES', 'NSA', 'Full entity name'),
  ('NSA LLC',               'NSA', 'LLC subsidiary'),
  ('NSA PROPERTIES',        'NSA', 'Property-holding entity'),
  ('NSA REAL ESTATE',       'NSA', 'Entity variant'),
  ('OPTIVEST',              'NSA', 'PRO (Participating Regional Operator) brand'),
  ('STORAGE EXPRESS',       'NSA', 'NSA PRO brand — regional'),
  ('HIDE AWAY',             'NSA', 'NSA PRO brand'),
  ('A-AMERICAN SELF STORAGE','NSA','NSA PRO brand — Pacific Northwest'),
  ('NORTHWEST SELF STORAGE','NSA', 'NSA PRO brand'),
  ('ISTORAGE',              'NSA', 'NSA PRO brand — large eastern US chain'),
  ('ISTG',                  'NSA', 'iStorage abbreviated deed form'),

  -- Simply Self Storage (private equity — Brookfield, formerly Blackstone)
  ('SIMPLY SELF STORAGE',   'Simply Self Storage', 'Primary entity name'),
  ('SIMPLY SELF STG',       'Simply Self Storage', 'Abbreviated form'),
  ('SIMPLY STORAGE',        'Simply Self Storage', 'Variant on deeds'),

  -- StorageMart (private — Cott family)
  ('STORAGEMART',           'StorageMart', 'Primary entity name'),
  ('STORAGE MART',          'StorageMart', 'Space variant'),
  ('STOR MART',             'StorageMart', 'Abbreviated form on deeds'),

  -- Metro Self Storage (private)
  ('METRO SELF STORAGE',    'Metro Self Storage', 'Primary entity name'),
  ('METRO STORAGE',         'Metro Self Storage', 'Short form on deeds'),
  ('METRO STG',             'Metro Self Storage', 'Abbreviated form'),

  -- Prime Storage (private equity — Warburg Pincus)
  ('PRIME STORAGE',         'Prime Storage', 'Primary entity name'),
  ('PRIME STG',             'Prime Storage', 'Abbreviated form'),
  ('PRIME SELF STORAGE',    'Prime Storage', 'Long form variant'),

  -- Storage King USA (private)
  ('STORAGE KING USA',      'Storage King USA', 'Primary entity name'),
  ('STORAGE KING',          'Storage King USA', 'Short form — also Australian chain, less relevant in TX'),
  ('STGE KING',             'Storage King USA', 'Abbreviated deed form'),

  -- SmartStop Self Storage (private — SmartStop Asset Management)
  ('SMARTSTOP SELF STORAGE','SmartStop', 'Primary entity name'),
  ('SMARTSTOP',             'SmartStop', 'Short form'),
  ('SMART STOP',            'SmartStop', 'Space variant on deeds'),
  ('SAM PROPERTY',          'SmartStop', 'SmartStop Asset Management property entity'),

  -- Guardian Storage (private — Pittsburgh-based)
  ('GUARDIAN STORAGE',      'Guardian Storage', 'Primary entity name'),
  ('GUARDIAN SELF STORAGE', 'Guardian Storage', 'Long form variant'),
  ('GUARDIAN STG',          'Guardian Storage', 'Abbreviated form'),

  -- US Storage Centers (private — GreenOak / private equity)
  ('US STORAGE CENTERS',    'US Storage Centers', 'Primary entity name'),
  ('US STORAGE',            'US Storage Centers', 'Short form (broad — monitor for false positives)'),
  ('USSC LLC',              'US Storage Centers', 'LLC entity abbreviation'),

  -- Additional large operators worth catching
  ('AAAA MINI STORAGE',     'Other Institutional', 'Regional chain acquired by various REITs'),
  ('STORAGE POST',          'Other Institutional', 'Large northeast chain — institutional owned'),
  ('SAFEKEEPING',           'Other Institutional', 'Texas-based chain — institutional'),
  ('ADVANTAGE SELF STORAGE','Other Institutional', 'Acquired by NSA PRO operators'),
  ('MORNINGSTAR STORAGE',   'Other Institutional', 'Texas/southeast operator — institutional'),
  ('COMPASS SELF STORAGE',  'Other Institutional', 'Southeast chain — Amsdell family/institutional'),
  ('COMPASS STORAGE',       'Other Institutional', 'Short form'),
  ('10 FEDERAL STORAGE',    'Other Institutional', 'Institutional REIT-backed operator'),
  ('TEN FEDERAL',           'Other Institutional', 'Long form variant')

ON CONFLICT (pattern) DO NOTHING;


COMMIT;
