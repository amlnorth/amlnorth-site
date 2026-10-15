import { useMemo, useState } from 'react';
import { JobCard } from '../components/jobs/JobCard';
import {
  JobFilters,
  type FilterOptions,
  type FilterValues,
} from '../components/jobs/JobFilters';
import {
  CacheNote,
  FeedError,
  FeedUpdating,
  JobsLoading,
  NoJobs,
  NoResults,
  StaleNote,
} from '../components/jobs/FeedStates';
import { useHydrated } from '../hooks/useHydrated';
import { useJobsFeed } from '../hooks/useJobsFeed';
import { isStale, type FeedResult } from '../lib/feed';
import { formatRelative, resolveFreshness } from '../lib/freshness';
import { collapseWhitespace, JOBS_SCHEMA_VERSION, SENIORITY_ORDER, type Job } from '../lib/jobs';
import { usePrerenderData, type JobsSnapshot } from '../lib/prerender';

const EMPTY_FILTERS: FilterValues = { query: '', company: '', seniority: '' };

/** The same states loadFeed() yields, applied to the build-time feed. */
function snapshotResult({ feed, meta }: JobsSnapshot): FeedResult {
  if (feed.schemaVersion !== JOBS_SCHEMA_VERSION) return { status: 'updating' };
  return { status: 'ready', feed, meta, fromCache: false };
}

export default function Jobs() {
  // Prerendered /jobs carries the build-time feed. Until hydration finishes,
  // render it against the build's clock so the markup matches the static
  // HTML; then switch to the visitor's clock and the live feed.
  const { jobs: snapshot } = usePrerenderData();
  const hydrated = useHydrated();
  const [clientNow] = useState(() => new Date());
  const now = hydrated || !snapshot ? clientNow : new Date(snapshot.renderedAt);
  const state = useJobsFeed(snapshot && snapshotResult(snapshot));

  const generatedAt = state.status === 'ready' ? state.meta.generatedAt : null;

  return (
    <section aria-labelledby="jobs-heading" className="mx-auto max-w-3xl">
      <h1 id="jobs-heading" className="text-3xl font-semibold tracking-tight">
        Jobs
      </h1>
      <p className="mt-1 text-sm text-muted">
        Updated twice daily from bank career sites
        {generatedAt && (
          <>
            {' · as of '}
            <time
              dateTime={new Date(generatedAt).toISOString()}
              title={hydrated ? new Date(generatedAt).toLocaleString() : undefined}
            >
              {formatRelative(new Date(generatedAt), now)}
            </time>
          </>
        )}
      </p>

      {generatedAt && isStale(generatedAt, now) && <StaleNote />}
      {state.status === 'ready' && state.fromCache && <CacheNote />}

      <div className="mt-6">
        {state.status === 'loading' && <JobsLoading />}
        {state.status === 'error' && <FeedError />}
        {state.status === 'updating' && <FeedUpdating />}
        {state.status === 'ready' && <JobsReady jobs={state.feed.jobs} now={now} />}
      </div>
    </section>
  );
}

function JobsReady({ jobs, now }: { jobs: Job[]; now: Date }) {
  const [filters, setFilters] = useState<FilterValues>(EMPTY_FILTERS);

  const options = useMemo<FilterOptions>(() => {
    const present = new Set(jobs.map((job) => job.seniority));
    return {
      companies: [...new Set(jobs.map((job) => job.company))].sort((a, b) => a.localeCompare(b)),
      seniorities: SENIORITY_ORDER.filter((seniority) => present.has(seniority)),
      hasUnspecifiedSeniority: present.has(null),
    };
  }, [jobs]);

  const visible = useMemo(() => {
    const query = collapseWhitespace(filters.query).toLowerCase();
    return jobs
      .filter((job) => {
        if (filters.company && job.company !== filters.company) return false;
        if (filters.seniority === 'unspecified' && job.seniority !== null) return false;
        if (filters.seniority && filters.seniority !== 'unspecified' && job.seniority !== filters.seniority) {
          return false;
        }
        if (query) {
          const haystack = collapseWhitespace(`${job.title} ${job.company} ${job.location}`).toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
      .sort((a, b) => resolveFreshness(b).at.getTime() - resolveFreshness(a).at.getTime());
  }, [jobs, filters]);

  if (jobs.length === 0) return <NoJobs />;

  return (
    <div>
      <JobFilters values={filters} options={options} onChange={setFilters} />

      <p className="mt-4 text-sm text-muted" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'role' : 'roles'}
      </p>

      {visible.length === 0 ? (
        <div className="mt-4">
          <NoResults onClear={() => setFilters(EMPTY_FILTERS)} />
        </div>
      ) : (
        <>
          <h2 id="open-roles-heading" className="sr-only">
            Open roles
          </h2>
          <ul aria-labelledby="open-roles-heading" className="mt-4 grid gap-3">
            {visible.map((job) => (
              <JobCard key={job.id} job={job} now={now} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
