import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isStale, loadFeed } from './feed';
import type { JobsFeed, JobsMeta } from './jobs';

const NOW = new Date('2026-07-20T12:00:00Z');

const FEED: JobsFeed = {
  schemaVersion: 1,
  jobs: [
    {
      id: 'abc123',
      title: 'AML Analyst',
      company: 'BMO',
      location: 'Toronto, ON',
      workModel: null,
      seniority: 'analyst',
      postedAt: null,
      firstSeenAt: '2026-07-18T18:00:00Z',
      url: 'https://example.com/job',
      source: 'workday-bmo',
    },
  ],
};

const META: JobsMeta = { schemaVersion: 1, generatedAt: '2026-07-20T11:00:00Z', jobCount: 1 };

function stubFetch(handler: (path: string) => Promise<Response>) {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => handler(String(url))),
  );
}

function jsonResponse(body: unknown) {
  return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) } as Response);
}

describe('isStale', () => {
  it('is false within 36h and true past it', () => {
    expect(isStale('2026-07-19T00:00:00Z', NOW)).toBe(false); // 36h exactly
    expect(isStale('2026-07-18T23:59:00Z', NOW)).toBe(true); // just over 36h
    expect(isStale('2026-07-20T10:00:00Z', NOW)).toBe(false);
  });

  it('is false for an unparseable timestamp rather than throwing', () => {
    expect(isStale('not-a-date', NOW)).toBe(false);
  });
});

describe('loadFeed', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('returns ready from the network and caches for later', async () => {
    stubFetch((path) => jsonResponse(path.endsWith('jobs-meta.json') ? META : FEED));
    const result = await loadFeed();
    expect(result).toMatchObject({ status: 'ready', fromCache: false });
    expect(localStorage.getItem('amlnorth:jobs-feed:v1')).toContain('AML Analyst');
  });

  it('returns updating on a schemaVersion mismatch', async () => {
    stubFetch((path) =>
      jsonResponse(path.endsWith('jobs-meta.json') ? META : { ...FEED, schemaVersion: 2 }),
    );
    expect(await loadFeed()).toEqual({ status: 'updating' });
  });

  it('falls back to cache when the network fails', async () => {
    stubFetch((path) => jsonResponse(path.endsWith('jobs-meta.json') ? META : FEED));
    await loadFeed(); // seed the cache

    stubFetch(() => Promise.reject(new Error('offline')));
    const result = await loadFeed();
    expect(result).toMatchObject({ status: 'ready', fromCache: true });
  });

  it('returns error when the network fails and there is no cache', async () => {
    stubFetch(() => Promise.reject(new Error('offline')));
    expect(await loadFeed()).toEqual({ status: 'error' });
  });
});
