-- ============================================================
-- 002_drop_history_foreign_keys.sql
-- StorageIQ — drop FK constraints from history tables
--
-- Problem: fk_fsh_facility and fk_ff_facility require
-- self_storage_facilities to be populated before any history
-- rows can be inserted. The documented ingest order is
-- history-first (so derived columns can be computed at insert
-- time on the facilities row). The FKs block that pattern.
--
-- Fix: drop both constraints. Referential integrity is enforced
-- by the pipeline (orphan-check query at end of each ingest run),
-- not by the DB. This is a data warehouse target, not an OLTP DB.
--
-- Idempotent: DROP CONSTRAINT IF EXISTS — safe to re-run.
-- ============================================================

BEGIN;

ALTER TABLE facility_sales_history
  DROP CONSTRAINT IF EXISTS fk_fsh_facility;

ALTER TABLE facility_foreclosures
  DROP CONSTRAINT IF EXISTS fk_ff_facility;

COMMIT;
