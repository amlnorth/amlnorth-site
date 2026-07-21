import { freshnessLabel, resolveFreshness } from '../../lib/freshness';
import type { Job } from '../../lib/jobs';

/**
 * Freshness is the feed's differentiator, so it is honest by construction:
 * the timestamp and label come from resolveFreshness (never a claim we can't
 * prove). Rendered as a <time> so it is machine-readable and screen-reader
 * friendly.
 */
export function FreshnessBadge({ job, now }: { job: Job; now: Date }) {
  const freshness = resolveFreshness(job);
  return (
    <time
      dateTime={freshness.at.toISOString()}
      title={freshness.at.toLocaleString()}
      className="text-xs text-muted"
    >
      {freshnessLabel(freshness, now)}
    </time>
  );
}
