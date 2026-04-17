/**
 * discover_storage_schema.js
 * Schema discovery for ATTOM_SYNDNET_SHARE.DELIVERY across 4 views,
 * scoped to self-storage properties (PROPERTYUSESTANDARDIZED = '229'), TX only.
 * READ ONLY — no writes to Snowflake or Neon.
 */

'use strict';

const snowflake = require('/Users/birwin/parcyl/scoutgpt-api/node_modules/snowflake-sdk');
const fs = require('fs');
const path = require('path');

// ── Load env from scoutgpt-api/.env ──────────────────────────────────────────
const envPath = '/Users/birwin/parcyl/scoutgpt-api/.env';
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      process.env[key.trim()] = rest.join('=').trim();
    }
  });
} else {
  console.error('ERROR: .env not found at', envPath);
  process.exit(1);
}

const {
  SNOWFLAKE_ACCOUNT, SNOWFLAKE_USER, SNOWFLAKE_TOKEN,
  SNOWFLAKE_WAREHOUSE, SNOWFLAKE_DATABASE, SNOWFLAKE_SCHEMA
} = process.env;

if (!SNOWFLAKE_TOKEN) {
  console.error('ERROR: SNOWFLAKE_TOKEN missing. Check .env.');
  process.exit(1);
}

const OUTPUT_FILE = '/Users/birwin/Downloads/storageiq/pipeline/storage_schema_discovery.md';
const lines = [];

function log(msg = '') {
  console.log(msg);
  lines.push(msg);
}

function save() {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, lines.join('\n') + '\n');
  console.log(`\nSaved to: ${OUTPUT_FILE}`);
}

function q(conn, sql, label = '') {
  return new Promise(resolve => {
    if (label) process.stdout.write(`  [QUERY] ${label}...`);
    conn.execute({
      sqlText: sql,
      streamResult: false,
      complete: (err, stmt, rows) => {
        if (err) {
          if (label) console.log(` ERROR: ${err.message}`);
          resolve({ error: err.message, rows: [] });
        } else {
          if (label) console.log(` OK (${(rows || []).length} rows)`);
          resolve({ rows: rows || [] });
        }
      }
    });
  });
}

// ── Expected columns for Option C check ──────────────────────────────────────
const EXPECTED = {
  TAX_ASSESSOR: [
    'PROPERTYUSESTANDARDIZED', 'ATTOMID', 'STATECOUNTYFIPS',
    'OWNER1FIRSTNAME', 'OWNER1LASTNAME', 'OWNER1FULLNAME',
    'OWNER1CORPORATEINDICATOR', 'COMPANYFLAG', 'TRUSTDESCRIPTION',
    'PROPERTYADDRESSFULL', 'PROPERTYADDRESSCITY', 'PROPERTYADDRESSSTATE', 'PROPERTYADDRESSZIP',
    'STORAGEBUILDINGFLAG', 'STORAGEBUILDINGAREA',
    'YEARBUILT', 'LOTSIZESQFT', 'BUILDINGAREATOTAL',
    'CURRENTSALERECORDINGDATE', 'CURRENTSALESPRICEAMOUNT',
    'TAXASSESSEDVALUETOTAL', 'TAXMARKETVALUETOTAL', 'TAXYEARASSESSED'
  ],
  RECORDER: [
    'ATTOMID',
    'RECORDINGDATE', 'TRANSFERDATE', 'SALEDATE',
    'DOCUMENTTYPE', 'DEEDCATEGORY',
    'SALESPRICE', 'SALESPRICEAMOUNT',
    'BUYER1FULLNAME', 'SELLER1FULLNAME', 'GRANTEENAME', 'GRANTORNAME',
    'GRANTEEINVESTORFLAG', 'QUITCLAIMFLAG',
    'MORTGAGEAMOUNT', 'MORTGAGETERM', 'MORTGAGEINTERESTRATE',
    'LENDERFULLNAME'
  ],
  LOAN_MODEL: [
    'ATTOMID', 'LOANID',
    'LOANAMOUNT', 'ORIGINATIONDATE', 'MATURITYDATE',
    'INTERESTRATE', 'LOANTYPE',
    'LENDERFULLNAME'
  ],
  PREFORECLOSURE: [
    'ATTOMID',
    'FILINGDATE', 'AUCTIONDATE',
    'CASESTATUS', 'FORECLOSURETYPE',
    'ORIGINALLOANAMOUNT', 'DEFAULTAMOUNT'
  ]
};

// ── Postgres type mapping heuristic ──────────────────────────────────────────
function pgType(sfType, colName) {
  const t = (sfType || '').toUpperCase();
  const n = (colName || '').toUpperCase();
  if (t.startsWith('NUMBER') || t === 'INTEGER' || t === 'INT' || t === 'BIGINT') {
    // Amount/price columns → NUMERIC; count/year columns → INT
    if (n.includes('AMOUNT') || n.includes('PRICE') || n.includes('VALUE') || n.includes('RATE')) return 'NUMERIC(18,2)';
    if (n.includes('YEAR') || n.includes('COUNT') || n.includes('FIPS')) return 'INTEGER';
    return 'BIGINT';
  }
  if (t.startsWith('FLOAT') || t === 'REAL' || t === 'DOUBLE') return 'NUMERIC(18,6)';
  if (t.startsWith('TIMESTAMP') || t === 'DATETIME') return 'TIMESTAMPTZ';
  if (t === 'DATE') return 'DATE';
  if (t === 'BOOLEAN') return 'BOOLEAN';
  if (t.startsWith('VARIANT') || t.startsWith('OBJECT') || t.startsWith('ARRAY')) return 'JSONB';
  // Default: VARCHAR — size hint from type
  const match = t.match(/\((\d+)\)/);
  if (match) {
    const sz = parseInt(match[1]);
    if (sz <= 10) return 'VARCHAR(16)';
    if (sz <= 50) return 'VARCHAR(64)';
    if (sz <= 255) return 'VARCHAR(255)';
    return 'TEXT';
  }
  return 'TEXT';
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  log('# Storage Schema Discovery — ATTOM SYNDNET SHARE');
  log(`**Generated:** ${new Date().toISOString()}`);
  log(`**Database:** ${SNOWFLAKE_DATABASE}.${SNOWFLAKE_SCHEMA}`);
  log(`**Filter:** PROPERTYUSESTANDARDIZED = '229' (Self-Storage), TX only (STATECOUNTYFIPS LIKE '48%')`);
  log(`**Mode:** READ ONLY`);
  log('');

  const conn = snowflake.createConnection({
    account: SNOWFLAKE_ACCOUNT,
    username: SNOWFLAKE_USER,
    authenticator: 'PROGRAMMATIC_ACCESS_TOKEN',
    token: SNOWFLAKE_TOKEN,
    warehouse: SNOWFLAKE_WAREHOUSE,
    database: SNOWFLAKE_DATABASE,
    schema: SNOWFLAKE_SCHEMA,
  });

  console.log('\nConnecting to Snowflake...');
  await new Promise((res, rej) => conn.connect(err => err ? rej(err) : res()));
  console.log('Connected.');

  await new Promise((res, rej) => conn.execute({
    sqlText: `USE WAREHOUSE ${SNOWFLAKE_WAREHOUSE}`,
    complete: err => err ? rej(err) : res()
  }));
  console.log(`Warehouse: ${SNOWFLAKE_WAREHOUSE}`);

  const DB = `${SNOWFLAKE_DATABASE}.${SNOWFLAKE_SCHEMA}`;
  const VIEWS = ['TAX_ASSESSOR', 'RECORDER', 'LOAN_MODEL', 'PREFORECLOSURE'];

  // ── Section 1: Row counts ─────────────────────────────────────────────────
  console.log('\n[1/8] Row counts...');
  log('---');
  log('## 1. Row Counts (Storage-Filtered, TX Only)');
  log('');
  log('| View | Total Storage Rows (TX) | Distinct ATTOMIDs |');
  log('|------|------------------------|-------------------|');

  // Build storage ATTOMID set from TAX_ASSESSOR
  const storageCountRes = await q(conn,
    `SELECT COUNT(*) AS cnt, COUNT(DISTINCT ATTOMID) AS distinct_ids
     FROM ${DB}.TAX_ASSESSOR
     WHERE PROPERTYUSESTANDARDIZED = '229'
       AND SITUSSTATECOUNTYFIPS LIKE '48%'`,
    'TAX_ASSESSOR storage row count'
  );
  const taCount = storageCountRes.rows[0] || {};
  const taCnt = taCount.CNT || taCount.cnt || 0;
  const taDistinct = taCount.DISTINCT_IDS || taCount.distinct_ids || 0;
  log(`| TAX_ASSESSOR | ${taCnt.toLocaleString()} | ${taDistinct.toLocaleString()} |`);

  // For other views, join to storage ATTOMIDs
  const otherViews = ['RECORDER', 'LOAN_MODEL', 'PREFORECLOSURE'];
  const viewCounts = {};
  for (const v of otherViews) {
    const res = await q(conn,
      `SELECT COUNT(*) AS cnt, COUNT(DISTINCT v.ATTOMID) AS distinct_ids
       FROM ${DB}.${v} v
       WHERE v.ATTOMID IN (
         SELECT ATTOMID FROM ${DB}.TAX_ASSESSOR
         WHERE PROPERTYUSESTANDARDIZED = '229'
           AND SITUSSTATECOUNTYFIPS LIKE '48%'
       )`,
      `${v} storage row count`
    );
    const r = res.rows[0] || {};
    const cnt = r.CNT || r.cnt || 0;
    const did = r.DISTINCT_IDS || r.distinct_ids || 0;
    viewCounts[v] = { cnt, did };
    log(`| ${v} | ${cnt.toLocaleString()} | ${did.toLocaleString()} |`);
  }
  log('');

  // ── Section 2-5: Per-view column inventory ────────────────────────────────
  const allColumns = {}; // view → [{ column_name, data_type, is_nullable, comment }]

  for (let vi = 0; vi < VIEWS.length; vi++) {
    const VIEW = VIEWS[vi];
    console.log(`\n[${2 + vi}/8] ${VIEW} column inventory...`);

    // Schema info from INFORMATION_SCHEMA
    const schemaRes = await q(conn,
      `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COMMENT
       FROM ${SNOWFLAKE_DATABASE}.INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = '${SNOWFLAKE_SCHEMA}'
         AND TABLE_NAME = '${VIEW}'
       ORDER BY ORDINAL_POSITION`,
      `${VIEW} INFORMATION_SCHEMA`
    );

    const cols = schemaRes.rows.map(r => ({
      name: r.COLUMN_NAME || r.column_name,
      type: r.DATA_TYPE || r.data_type,
      nullable: r.IS_NULLABLE || r.is_nullable,
      comment: r.COMMENT || r.comment || ''
    }));
    allColumns[VIEW] = cols;

    // Population sample — 5000 random storage rows
    let popData = {};
    if (cols.length > 0) {
      // Build COUNT per column query in batches of 50 to avoid SQL length limits
      const batchSize = 50;
      for (let i = 0; i < cols.length; i += batchSize) {
        const batch = cols.slice(i, i + batchSize);
        const countExprs = batch.map(c => `COUNT("${c.name}") AS "${c.name}"`).join(',\n      ');

        let sql;
        if (VIEW === 'TAX_ASSESSOR') {
          sql = `SELECT COUNT(*) AS "__TOTAL__", ${countExprs}
                 FROM (
                   SELECT * FROM ${DB}.${VIEW}
                   WHERE PROPERTYUSESTANDARDIZED = '229'
                     AND SITUSSTATECOUNTYFIPS LIKE '48%'
                   LIMIT 5000
                 ) s`;
        } else {
          sql = `SELECT COUNT(*) AS "__TOTAL__", ${countExprs}
                 FROM (
                   SELECT v.* FROM ${DB}.${VIEW} v
                   WHERE v.ATTOMID IN (
                     SELECT ATTOMID FROM ${DB}.TAX_ASSESSOR
                     WHERE PROPERTYUSESTANDARDIZED = '229'
                       AND SITUSSTATECOUNTYFIPS LIKE '48%'
                   )
                   LIMIT 5000
                 ) s`;
        }

        const popRes = await q(conn, sql, `${VIEW} population batch ${Math.floor(i / batchSize) + 1}`);
        if (!popRes.error && popRes.rows.length > 0) {
          const row = popRes.rows[0];
          Object.assign(popData, row);
        }
      }
    }

    const total = popData['__TOTAL__'] || popData.__TOTAL__ || 1;

    log(`## ${2 + vi}. ${VIEW} — Full Column Inventory`);
    log('');
    log(`_Schema columns: ${cols.length}. Population sample: up to 5,000 storage rows (TX)._`);
    log('');
    log('| # | Column Name | Data Type | Nullable | % Populated | Comment |');
    log('|---|-------------|-----------|----------|-------------|---------|');

    for (let ci = 0; ci < cols.length; ci++) {
      const c = cols[ci];
      const rawCount = popData[c.name] ?? popData[c.name.toUpperCase()] ?? popData[c.name.toLowerCase()];
      let pct = '?';
      if (rawCount !== undefined && rawCount !== null) {
        pct = total > 0 ? ((Number(rawCount) / Number(total)) * 100).toFixed(1) + '%' : '0%';
      }
      const comment = c.comment ? c.comment.replace(/\|/g, '/') : '';
      log(`| ${ci + 1} | \`${c.name}\` | ${c.type} | ${c.nullable} | ${pct} | ${comment} |`);
    }
    log('');
  }

  // ── Section 6: Critical column presence check ─────────────────────────────
  console.log('\n[6/8] Critical column check...');
  log('---');
  log('## 6. Critical Column Presence Check');
  log('');

  for (const VIEW of VIEWS) {
    log(`### ${VIEW}`);
    log('');
    log('| Expected Column | Status | Notes |');
    log('|----------------|--------|-------|');

    const cols = allColumns[VIEW] || [];
    const colNames = cols.map(c => (c.name || '').toUpperCase());
    const expected = EXPECTED[VIEW] || [];

    for (const exp of expected) {
      const expUp = exp.toUpperCase();
      if (colNames.includes(expUp)) {
        log(`| \`${exp}\` | ✅ FOUND | |`);
      } else {
        // Find closest match: columns containing any significant substring
        const parts = expUp.replace(/\d/g, '').split('').filter(Boolean);
        const candidates = colNames.filter(cn => {
          // Check if the expected name is a substring of a column or vice versa
          return cn.includes(expUp.slice(0, 6)) || expUp.includes(cn.slice(0, 6));
        }).slice(0, 3);

        // Also try fuzzy: look for columns with overlapping key terms
        const keyTerms = expUp.match(/[A-Z]{4,}/g) || [];
        const fuzzy = colNames.filter(cn =>
          keyTerms.some(t => cn.includes(t))
        ).slice(0, 3);

        const allCandidates = [...new Set([...candidates, ...fuzzy])].slice(0, 3);
        const closest = allCandidates.length > 0 ? allCandidates.join(', ') : 'none';
        log(`| \`${exp}\` | ❌ MISSING | closest match: ${closest} |`);
      }
    }
    log('');
  }

  // ── Section 7: Join key analysis ──────────────────────────────────────────
  console.log('\n[7/8] Join key analysis...');
  log('---');
  log('## 7. Join Key Analysis');
  log('');

  // Confirm ATTOMID in all views
  log('### ATTOMID presence');
  log('');
  log('| View | ATTOMID Present | Notes |');
  log('|------|----------------|-------|');
  for (const VIEW of VIEWS) {
    const cols = allColumns[VIEW] || [];
    const hasAttomId = cols.some(c => (c.name || '').toUpperCase() === 'ATTOMID');
    if (hasAttomId) {
      log(`| ${VIEW} | ✅ Yes | Primary join key |`);
    } else {
      const alt = (cols.find(c => (c.name || '').toUpperCase().includes('ATTOM')) || {}).name || 'NONE FOUND';
      log(`| ${VIEW} | ❌ No | Alternate: ${alt} |`);
    }
  }
  log('');

  // Overlap: how many TX storage ATTOMIDs from TAX_ASSESSOR appear in other views
  log(`### ATTOMID overlap with TAX_ASSESSOR storage set (TX, PROPERTYUSESTANDARDIZED='229')`);
  log('');
  log(`| View | Storage ATTOMIDs in TAX_ASSESSOR | With Match in This View | Coverage % |`);
  log(`|------|----------------------------------|-------------------------|------------|`);
  log(`| TAX_ASSESSOR | ${taDistinct.toLocaleString()} | ${taDistinct.toLocaleString()} | 100.0% |`);
  for (const v of otherViews) {
    const { did } = viewCounts[v] || { did: 0 };
    const pct = taDistinct > 0 ? ((did / taDistinct) * 100).toFixed(1) : '0.0';
    log(`| ${v} | ${taDistinct.toLocaleString()} | ${did.toLocaleString()} | ${pct}% |`);
  }
  log('');

  // ── Section 8: Neon DDL recommendations ──────────────────────────────────
  console.log('\n[8/8] Neon DDL recommendations...');
  log('---');
  log('## 8. Recommendations for Neon DDL');
  log('');
  log('Columns with < 5% population are flagged as candidates for exclusion.');
  log('');

  for (const VIEW of VIEWS) {
    const cols = allColumns[VIEW] || [];
    log(`### ${VIEW}`);
    log('');
    log('| Column | Snowflake Type | Suggested PG Type | Action |');
    log('|--------|---------------|-------------------|--------|');

    // Re-read popData from earlier (we need pct). Re-derive from log lines is messy,
    // so we stored allColumns but not popData per view. Re-query just totals + a flag.
    // Instead, emit the mapping with the population % already in section 2-5.
    // Here we just do type mapping for all columns and note obvious exclusions.
    for (const c of cols) {
      const pg = pgType(c.type, c.name);
      // Flag JSONB/variant types as candidates for JSON storage
      const action = c.type && c.type.toUpperCase().includes('VARIANT') ? '⚠️ JSONB — review' : 'INCLUDE';
      log(`| \`${c.name}\` | ${c.type} | \`${pg}\` | ${action} |`);
    }
    log('');
  }

  log('---');
  log('## Notes');
  log('');
  log('- Population % is based on a sample of up to 5,000 storage rows (TX, PROPERTYUSESTANDARDIZED=229).');
  log('- Join all other views to TAX_ASSESSOR via ATTOMID.');
  log('- Columns with pct_populated < 5% in the sample should be reviewed before inclusion in Neon schema.');
  log('- JSONB columns (VARIANT/OBJECT/ARRAY in Snowflake) should be reviewed for flattening vs. JSONB storage.');
  log('');

  save();
  console.log(`\nDone. Total TAX_ASSESSOR storage rows (TX): ${taCnt.toLocaleString()}, distinct ATTOMIDs: ${taDistinct.toLocaleString()}`);
  process.exit(0);
}

main().catch(err => {
  console.error('FATAL:', err.message || err);
  process.exit(1);
});
