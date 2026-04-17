'use strict';

/**
 * run_migration.js — StorageIQ migration runner
 *
 * Scans pipeline/migrations/*.sql in filename order, checks a
 * schema_migrations tracking table in Neon, skips already-applied
 * files, and runs pending ones inside individual transactions.
 *
 * On first run, backfills 001 into schema_migrations if the four
 * core tables already exist (handles the case where 001 was applied
 * before tracking was introduced).
 *
 * Usage:
 *   node run_migration.js
 *
 * Env: loaded from ~/parcyl/scoutgpt-api/.env
 * Connection: DATABASE_WRITE_URL (neondb_owner — write pool)
 */

const fs   = require('fs');
const path = require('path');
const { Pool } = require('/Users/birwin/parcyl/scoutgpt-api/node_modules/pg');

// ── Load env ──────────────────────────────────────────────────────────────────
const envPath = '/Users/birwin/parcyl/scoutgpt-api/.env';
if (!fs.existsSync(envPath)) {
  console.error(`ERROR: .env not found at ${envPath}`);
  process.exit(1);
}
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const t = line.trim();
  if (t && !t.startsWith('#') && t.includes('=')) {
    const [key, ...rest] = t.split('=');
    if (!process.env[key.trim()]) process.env[key.trim()] = rest.join('=').trim();
  }
});

const { DATABASE_WRITE_URL } = process.env;
if (!DATABASE_WRITE_URL) {
  console.error('ERROR: DATABASE_WRITE_URL not set in .env');
  process.exit(1);
}

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

// ── Helpers ───────────────────────────────────────────────────────────────────
function timestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 23);
}
function log(msg) {
  console.log(`[${timestamp()}] ${msg}`);
}
function ms(start) {
  return `${Date.now() - start}ms`;
}
function extractHost(url) {
  try { return new URL(url).hostname; } catch (_) { return '(unknown host)'; }
}

// ── Migration tracking ────────────────────────────────────────────────────────
async function ensureTrackingTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename   TEXT        PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

async function appliedMigrations(client) {
  const { rows } = await client.query(
    `SELECT filename FROM schema_migrations ORDER BY filename`
  );
  return new Set(rows.map(r => r.filename));
}

async function markApplied(client, filename) {
  await client.query(
    `INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING`,
    [filename]
  );
}

// Backfill 001 if the four core tables exist but 001 isn't tracked.
// Handles the case where 001 was applied before tracking was introduced.
async function backfill001IfNeeded(client, applied) {
  const name = '001_create_self_storage_tables.sql';
  if (applied.has(name)) return false;

  const { rows } = await client.query(`
    SELECT COUNT(*) AS cnt
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN (
        'self_storage_facilities',
        'facility_sales_history',
        'facility_foreclosures',
        'reit_owner_patterns'
      )
  `);
  if (parseInt(rows[0].cnt, 10) === 4) {
    await markApplied(client, name);
    log(`Backfilled schema_migrations: ${name} (tables already existed)`);
    applied.add(name);
    return true;
  }
  return false;
}

// ── Per-migration verification ────────────────────────────────────────────────
async function verify002(client) {
  const { rows } = await client.query(`
    SELECT c.conname
    FROM pg_constraint c
    JOIN pg_class t    ON c.conrelid = t.oid
    JOIN pg_namespace n ON t.relnamespace = n.oid
    WHERE c.contype = 'f'
      AND n.nspname  = 'public'
      AND t.relname IN ('facility_sales_history', 'facility_foreclosures')
      AND c.conname  IN ('fk_fsh_facility', 'fk_ff_facility')
  `);
  if (rows.length > 0) {
    const remaining = rows.map(r => r.conname).join(', ');
    throw new Error(`FK constraints still present after 002: ${remaining}`);
  }
  log('Verification passed: fk_fsh_facility and fk_ff_facility are gone');
}

// ── Run a single migration file ───────────────────────────────────────────────
async function runMigration(pool, filename, sqlPath) {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const start = Date.now();

  log(`Applying: ${filename}`);

  const client = await pool.connect();
  try {
    await client.query(sql);
    await markApplied(client, filename);
    log(`Applied ${filename} in ${ms(start)}`);

    // Per-migration post-run checks
    if (filename === '002_drop_history_foreign_keys.sql') {
      await verify002(client);
    }
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch (_) {}
    client.release();
    throw err;
  }
  client.release();
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const runStart = Date.now();

  log('Migration runner starting');
  log(`Migrations dir: ${MIGRATIONS_DIR}`);
  log(`Target: ${extractHost(DATABASE_WRITE_URL)} (neondb_owner)`);

  // Collect migration files sorted by filename (lexicographic = numeric order)
  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    log('No migration files found. Nothing to do.');
    process.exit(0);
  }
  log(`Found ${files.length} migration file(s): ${files.join(', ')}`);

  const pool = new Pool({ connectionString: DATABASE_WRITE_URL, max: 1 });
  const setupClient = await pool.connect();

  let applied;
  try {
    await ensureTrackingTable(setupClient);
    applied = await appliedMigrations(setupClient);
    await backfill001IfNeeded(setupClient, applied);
  } finally {
    setupClient.release();
  }

  log('');

  let ran = 0;
  let skipped = 0;

  for (const filename of files) {
    if (applied.has(filename)) {
      log(`Skipping ${filename} — already applied`);
      skipped++;
      continue;
    }

    const sqlPath = path.join(MIGRATIONS_DIR, filename);
    try {
      await runMigration(pool, filename, sqlPath);
      ran++;
    } catch (err) {
      log(`ERROR applying ${filename}: ${err.message}`);
      await pool.end();
      process.exit(1);
    }
  }

  await pool.end();

  log('');
  log(`Done in ${ms(runStart)} — ${ran} applied, ${skipped} skipped.`);

  if (ran === 0) {
    log('Schema is up to date. Nothing was changed.');
  }

  process.exit(0);
}

main().catch(err => {
  console.error('FATAL:', err.message || err);
  process.exit(1);
});
