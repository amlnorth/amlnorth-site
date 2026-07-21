import { describe, expect, it } from 'vitest';
import { formatRelative, freshnessLabel, resolveFreshness } from './freshness';

const NOW = new Date('2026-07-20T12:00:00Z');

describe('resolveFreshness — the honesty rule', () => {
  it('shows firstSeen when postedAt is null', () => {
    const f = resolveFreshness({ postedAt: null, firstSeenAt: '2026-07-18T18:00:00Z' });
    expect(f.basis).toBe('firstSeen');
    expect(f.at.toISOString()).toBe('2026-07-18T18:00:00.000Z');
  });

  it('shows firstSeen when postedAt is newer than firstSeen (a repost)', () => {
    // The real BMO sample: claims posted Jul 10 but we first saw it Jun 23.
    const f = resolveFreshness({ postedAt: '2026-07-10T00:00:00Z', firstSeenAt: '2026-06-23T23:09:17Z' });
    expect(f.basis).toBe('firstSeen');
    expect(f.at.toISOString()).toBe('2026-06-23T23:09:17.000Z');
  });

  it('shows postedAt when it is older than firstSeen (provable origin)', () => {
    const f = resolveFreshness({ postedAt: '2026-07-01T00:00:00Z', firstSeenAt: '2026-07-05T09:00:00Z' });
    expect(f.basis).toBe('posted');
    expect(f.at.toISOString()).toBe('2026-07-01T00:00:00.000Z');
  });

  it('shows postedAt when it exactly equals firstSeen (boundary)', () => {
    const stamp = '2026-07-05T09:00:00Z';
    expect(resolveFreshness({ postedAt: stamp, firstSeenAt: stamp }).basis).toBe('posted');
  });
});

describe('freshnessLabel / formatRelative', () => {
  it('labels the basis and renders a relative time', () => {
    expect(
      freshnessLabel(resolveFreshness({ postedAt: null, firstSeenAt: '2026-07-17T12:00:00Z' }), NOW),
    ).toBe('first seen 3 days ago');
    expect(
      freshnessLabel(resolveFreshness({ postedAt: '2026-07-19T12:00:00Z', firstSeenAt: '2026-07-19T12:00:00Z' }), NOW),
    ).toBe('posted yesterday');
  });

  it('picks a sensible unit', () => {
    expect(formatRelative(new Date('2026-07-20T08:00:00Z'), NOW)).toBe('4 hours ago');
    expect(formatRelative(new Date('2026-05-20T12:00:00Z'), NOW)).toBe('2 months ago');
    expect(formatRelative(new Date('2026-07-20T11:59:40Z'), NOW)).toBe('just now');
  });
});
