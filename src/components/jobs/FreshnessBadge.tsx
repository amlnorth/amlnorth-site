import { useHydrated } from '../../hooks/useHydrated';
import { freshnessLabel, resolveFreshness } from '../../lib/freshness';
import type { Job } from '../../lib/jobs';

/**
 * Freshness is the feed's differentiator, so it is honest by construction:
 * the timestamp and label come from resolveFreshness (never a claim we can't
 * prove). Rendered as a <time> so it is machine-readable and screen-reader
 * friendly. The hover title is in the visitor's locale and timezone, so it is
 * added after hydration rather than baked into the prerendered HTML.
 */
export function FreshnessBadge({ job, now }: { job: Job; now: Date }) {
  const hydrated = useHydrated();
  const freshness = resolveFreshness(job);
  return (
    <time
      dateTime={freshness.at.toISOString()}
      title={hydrated ? freshness.at.toLocaleString() : undefined}
      className="text-xs text-muted"
    >
      {freshnessLabel(freshness, now)}
    </time>
  );
}
