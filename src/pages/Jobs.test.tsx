import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Jobs from './Jobs';
import type { Job, JobsFeed, JobsMeta } from '../lib/jobs';

function job(overrides: Partial<Job>): Job {
  return {
    id: Math.random().toString(36).slice(2),
    title: 'AML Analyst',
    company: 'BMO',
    location: 'Toronto, ON',
    workModel: null,
    seniority: 'analyst',
    postedAt: null,
    firstSeenAt: '2026-07-18T18:00:00Z',
    url: 'https://example.com/job',
    source: 'workday-bmo',
    ...overrides,
  };
}

const JOBS: Job[] = [
  job({
    id: 'bmo1',
    // Double space is intentional — must render collapsed.
    title: 'Manager, Anti Money Laundering  Customer Risk Scoring',
    company: 'BMO',
    seniority: 'manager',
    postedAt: '2026-07-10T00:00:00Z', // newer than firstSeen → repost → "first seen"
    firstSeenAt: '2026-06-23T23:09:17Z',
  }),
  job({
    id: 'cibc1',
    title: 'Senior Consultant, AML Advisory',
    company: 'CIBC',
    seniority: 'senior',
    firstSeenAt: '2026-07-16T22:57:01Z',
  }),
  job({
    id: 'rbc1',
    title: 'Data Scientist, Global AML Transaction Monitoring',
    company: 'RBC',
    seniority: null,
    firstSeenAt: '2026-07-17T12:03:37Z',
  }),
];

const FEED: JobsFeed = { schemaVersion: 1, jobs: JOBS };

function meta(generatedAt: string): JobsMeta {
  return { schemaVersion: 1, generatedAt, jobCount: JOBS.length };
}

function stubFeed(feed: unknown, metaBody: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(String(url).endsWith('jobs-meta.json') ? metaBody : feed),
      } as Response),
    ),
  );
}

beforeEach(() => localStorage.clear());
afterEach(() => vi.unstubAllGlobals());

describe('Jobs page', () => {
  it('renders the header and the list, collapsing whitespace in titles', async () => {
    stubFeed(FEED, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);

    expect(
      await screen.findByText(/Updated twice daily from bank career sites/),
    ).toBeInTheDocument();

    const list = await screen.findByRole('list', { name: 'Open roles' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(3);

    // Collapsed to a single space, and the outbound link opens in a new tab.
    const link = screen.getByRole('link', {
      name: /Manager, Anti Money Laundering Customer Risk Scoring/,
    });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('applies the freshness honesty rule to a reposted job', async () => {
    stubFeed(FEED, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);
    // BMO claims posted Jul 10 but was first seen Jun 23 → must say "first seen".
    const badges = await screen.findAllByText(/^first seen/);
    expect(badges.length).toBeGreaterThan(0);
    expect(screen.queryByText(/posted .*(2026|ago)/)).not.toBeInTheDocument();
  });

  it('filters by search text', async () => {
    stubFeed(FEED, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);
    await screen.findByRole('list', { name: 'Open roles' });

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'advisory' } });
    expect(screen.getByText('1 role')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Senior Consultant, AML Advisory/ })).toBeInTheDocument();
  });

  it('filters by company and by seniority', async () => {
    stubFeed(FEED, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);
    await screen.findByRole('list', { name: 'Open roles' });

    fireEvent.change(screen.getByLabelText(/Filter by company/), { target: { value: 'CIBC' } });
    expect(screen.getByText('1 role')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Filter by company/), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Filter by seniority/), { target: { value: 'unspecified' } });
    expect(screen.getByText('1 role')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Data Scientist/ })).toBeInTheDocument();
  });

  it('shows a designed empty state and can clear filters', async () => {
    stubFeed(FEED, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);
    await screen.findByRole('list', { name: 'Open roles' });

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzzzz-no-match' } });
    expect(screen.getByText(/No roles match your filters/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Clear filters/ }));
    expect(await screen.findByRole('list', { name: 'Open roles' })).toBeInTheDocument();
  });

  it('shows a stale note when generatedAt is over 36h old', async () => {
    stubFeed(FEED, meta('2026-01-01T00:00:00Z'));
    render(<Jobs />);
    expect(await screen.findByText(/This feed may be stale/)).toBeInTheDocument();
  });

  it('shows the "feed updating" state on a schemaVersion mismatch', async () => {
    stubFeed({ schemaVersion: 2, jobs: [] }, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);
    expect(await screen.findByText(/The feed is updating/)).toBeInTheDocument();
  });

  it('shows a friendly error when the feed cannot be loaded and there is no cache', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    render(<Jobs />);
    expect(await screen.findByText(/Couldn't load the jobs feed/)).toBeInTheDocument();
  });

  it('shows the zero-jobs state when the feed is empty', async () => {
    stubFeed({ schemaVersion: 1, jobs: [] }, meta('2026-07-20T11:00:00Z'));
    render(<Jobs />);
    expect(await screen.findByText(/No roles are open right now/)).toBeInTheDocument();
  });
});
