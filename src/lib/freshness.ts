import type { Job } from './jobs';

// Which timestamp a job's freshness badge is allowed to show.
export type FreshnessBasis = 'posted' | 'firstSeen';

export interface Freshness {
  basis: FreshnessBasis;
  at: Date;
}

/**
 * The freshness honesty rule (requirements §4, as amended for S2).
 *
 * `firstSeenAt` is our own observation time and is always provable.
 * `postedAt` is the source's claim and sources repost / refresh their dates,
 * so a `postedAt` LATER than `firstSeenAt` would advertise a job as fresher
 * than we can prove. We never do that:
 *
 *   - postedAt is null            → show firstSeenAt ("first seen …")
 *   - postedAt is after firstSeen → show firstSeenAt ("first seen …")  [repost]
 *   - otherwise                   → show postedAt   ("posted …")
 *
 * In every case we show the older, defensible timestamp.
 */
export function resolveFreshness(job: Pick<Job, 'postedAt' | 'firstSeenAt'>): Freshness {
  const firstSeen = new Date(job.firstSeenAt);
  if (job.postedAt === null) {
    return { basis: 'firstSeen', at: firstSeen };
  }
  const posted = new Date(job.postedAt);
  if (posted.getTime() > firstSeen.getTime()) {
    return { basis: 'firstSeen', at: firstSeen };
  }
  return { basis: 'posted', at: posted };
}

const UNITS: ReadonlyArray<readonly [Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 1000 * 60 * 60 * 24 * 365],
  ['month', 1000 * 60 * 60 * 24 * 30],
  ['day', 1000 * 60 * 60 * 24],
  ['hour', 1000 * 60 * 60],
  ['minute', 1000 * 60],
];

const relativeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/** "4 hours ago", "yesterday", "3 days ago". Built-in Intl — no dependency. */
export function formatRelative(at: Date, now: Date = new Date()): string {
  const diffMs = at.getTime() - now.getTime();
  const abs = Math.abs(diffMs);
  for (const [unit, unitMs] of UNITS) {
    if (abs >= unitMs) {
      return relativeFormat.format(Math.round(diffMs / unitMs), unit);
    }
  }
  return 'just now';
}

/** Full badge text, e.g. "first seen 3 days ago" / "posted yesterday". */
export function freshnessLabel(freshness: Freshness, now?: Date): string {
  const relative = formatRelative(freshness.at, now);
  return freshness.basis === 'posted' ? `posted ${relative}` : `first seen ${relative}`;
}
