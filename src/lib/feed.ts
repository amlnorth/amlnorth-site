import { JOBS_SCHEMA_VERSION, type JobsFeed, type JobsMeta } from './jobs';

// generatedAt older than this → a quiet "feed may be stale" note. The
// aggregator runs twice daily (~12h apart), so 36h covers a couple of
// missed runs before we flag it (requirements §4).
export const STALE_AFTER_MS = 36 * 60 * 60 * 1000;

const CACHE_KEY = 'amlnorth:jobs-feed:v1';

export function isStale(generatedAt: string, now: Date = new Date()): boolean {
  const generated = new Date(generatedAt).getTime();
  if (Number.isNaN(generated)) return false;
  return now.getTime() - generated > STALE_AFTER_MS;
}

export type FeedResult =
  | { status: 'ready'; feed: JobsFeed; meta: JobsMeta; fromCache: boolean }
  | { status: 'updating' } // schemaVersion ahead of us
  | { status: 'error' }; // couldn't load and no cached copy

interface CachedFeed {
  feed: JobsFeed;
  meta: JobsMeta;
}

function readCache(): CachedFeed | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedFeed;
    // Only trust a cache we still understand.
    if (parsed.feed?.schemaVersion !== JOBS_SCHEMA_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(cached: CachedFeed): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {
    // Private mode / quota / disabled storage — caching is best-effort.
  }
}

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${import.meta.env.BASE_URL}${path}`, { signal });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return (await response.json()) as T;
}

/**
 * Load the feed and its metadata. On any network/parse failure, fall back to
 * the last good copy in localStorage (flagged `fromCache`) so a dropped fetch
 * degrades to "last known" rather than a broken page. A schemaVersion we don't
 * recognise resolves to `updating`, never a mis-parsed render.
 */
export async function loadFeed(signal?: AbortSignal): Promise<FeedResult> {
  try {
    const [feed, meta] = await Promise.all([
      fetchJson<JobsFeed>('jobs.json', signal),
      fetchJson<JobsMeta>('jobs-meta.json', signal),
    ]);
    if (feed.schemaVersion !== JOBS_SCHEMA_VERSION) {
      return { status: 'updating' };
    }
    writeCache({ feed, meta });
    return { status: 'ready', feed, meta, fromCache: false };
  } catch (error) {
    if (signal?.aborted) throw error;
    const cached = readCache();
    if (cached) {
      return { status: 'ready', feed: cached.feed, meta: cached.meta, fromCache: true };
    }
    return { status: 'error' };
  }
}
