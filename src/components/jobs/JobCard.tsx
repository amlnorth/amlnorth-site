import { collapseWhitespace, type Job } from '../../lib/jobs';
import { FreshnessBadge } from './FreshnessBadge';

/**
 * One role. The whole card is the tap target on mobile: the title link is
 * stretched over the card via `after:absolute after:inset-0`, so anywhere on
 * the card opens the posting in a new tab. There are no other interactive
 * elements inside, so the stretched link stays accessible.
 */
export function JobCard({ job, now }: { job: Job; now: Date }) {
  const title = collapseWhitespace(job.title);
  const company = collapseWhitespace(job.company);
  const location = collapseWhitespace(job.location);

  return (
    <li className="relative rounded-lg border border-border bg-surface p-4 transition-colors focus-within:border-accent hover:border-accent">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium leading-snug">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {title}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        {job.seniority && (
          <span className="shrink-0 rounded-sm border border-border px-1.5 py-0.5 text-xs capitalize text-muted">
            {job.seniority}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">
        {company} · {location}
      </p>
      <div className="mt-2">
        <FreshnessBadge job={job} now={now} />
      </div>
    </li>
  );
}
