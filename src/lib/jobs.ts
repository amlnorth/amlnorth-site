// The jobs.json contract shared with the aggregator repo (docs/requirements.md
// §3). schemaVersion is validated on load; a mismatch means the producer moved
// ahead of us and the UI shows a "feed updating" state rather than guessing.
export const JOBS_SCHEMA_VERSION = 1;

export type WorkModel = 'hybrid' | 'remote' | 'onsite' | null;
export type Seniority = 'analyst' | 'senior' | 'manager' | 'director' | null;

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workModel: WorkModel;
  seniority: Seniority;
  postedAt: string | null;
  firstSeenAt: string;
  url: string;
  source: string;
}

export interface JobsFeed {
  schemaVersion: number;
  jobs: Job[];
}

export interface JobsMeta {
  schemaVersion: number;
  generatedAt: string;
  jobCount: number;
}

// Seniority filter order, most to least senior. Used to order the filter's
// options; roles with a null seniority are grouped under "Unspecified".
export const SENIORITY_ORDER: ReadonlyArray<Exclude<Seniority, null>> = [
  'director',
  'manager',
  'senior',
  'analyst',
];

/**
 * Collapse runs of whitespace to single spaces and trim. Source titles carry
 * artefacts like "Anti Money Laundering  Customer Risk Scoring" (a double
 * space left by a stripped character); render and search over the clean form.
 */
export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}
