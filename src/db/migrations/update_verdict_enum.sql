-- Update the verdict enum values in PostgreSQL
ALTER TYPE verdict RENAME TO verdict_old;

CREATE TYPE verdict AS ENUM (
  'critical_contamination',
  'moderate_radiation',
  'containment_achieved',
  'low_radiation',
  'radiation_free'
);

ALTER TABLE roasts ALTER COLUMN verdict TYPE verdict USING verdict_old::text::verdict;
ALTER TABLE analysis_items ALTER COLUMN verdict TYPE verdict USING verdict_old::text::verdict;

DROP TYPE verdict_old;
