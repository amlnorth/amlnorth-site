import { useEffect, useMemo, useState } from 'react';
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
import { useJobsFeed } from '../hooks/useJobsFeed';
import { isStale } from '../lib/feed';
import { formatRelative, resolveFreshness } from '../lib/freshness';
import { collapseWhitespace, SENIORITY_ORDER, type Job } from '../lib/jobs';

const EMPTY_FILTERS: FilterValues = { query: '', company: '', seniority: '' };

export default function Jobs() {
  const [now] = useState(() => new Date());
  const state = useJobsFeed();

  useEffect(() => {
    document.title = 'Jobs · AML North';
  }, []);

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
            <time dateTime={new Date(generatedAt).toISOString()} title={new Date(generatedAt).toLocaleString()}>
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
        <ul aria-label="Open roles" className="mt-4 grid gap-3">
          {visible.map((job) => (
            <JobCard key={job.id} job={job} now={now} />
          ))}
        </ul>
      )}
    </div>
  );
}
