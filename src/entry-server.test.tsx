import { readFileSync } from 'node:fs';
import { act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { newestFirstSeen, renderPage, renderSitemap } from './entry-server';
import type { JobsFeed, JobsMeta } from './lib/jobs';
import { PrerenderContext, readPrerenderData, type PrerenderData } from './lib/prerender';
import { canonicalUrl, PAGES, pageFor } from './lib/seo';

// The source index.html carries the same head markers and empty #root as the
// built dist/index.html, so rendering into it exercises exactly what
// scripts/prerender.mjs writes to each dist/*.html file.
const TEMPLATE = readFileSync('index.html', 'utf8');

const FEED: JobsFeed = {
  schemaVersion: 1,
  jobs: [
    {
      id: 'bmo1',
      title: 'Senior Investigator, AML  Financial Intelligence Unit',
      company: 'BMO',
      location: 'Toronto, ON',
      workModel: null,
      seniority: 'senior',
      postedAt: '2026-10-08T00:00:00Z',
      firstSeenAt: '2026-10-07T17:37:19Z',
      url: 'https://example.com/bmo1',
      source: 'workday-bmo',
    },
  ],
};
const META: JobsMeta = { schemaVersion: 1, generatedAt: '2026-10-12T01:03:15Z', jobCount: 1 };
const JOBS_DATA: PrerenderData = {
  jobs: { feed: FEED, meta: META, renderedAt: '2026-10-12T02:00:00Z' },
};

function attr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function dataFor(route: string): PrerenderData {
  return route === '/jobs' ? JOBS_DATA : {};
}

// Real page copy that only exists once the route's component has rendered.
const PAGE_TEXT: Record<string, string> = {
  '/': 'A Canada-first home for anti–money-laundering and financial-crime work',
  '/jobs': 'Senior Investigator, AML Financial Intelligence Unit',
  '/studio': 'Report Studio prepares FINTRAC reports in your browser',
  '/certifications': 'The one that matters most in Canada.',
  '/legal': 'hello@amlnorth.ca',
  '/fr': 'Postes ouverts en lutte contre le blanchiment',
  '/fr/studio': 'Report Studio est offert en anglais seulement pour',
  '/fr/certifications': 'Celle qui compte le plus au Canada.',
  '/fr/legal': 'Court et honnête. Dernière mise à jour',
};

// English copy that must not leak onto the matching French page.
const ENGLISH_TEXT: Record<string, string> = {
  '/fr': PAGE_TEXT['/'],
  '/fr/studio': PAGE_TEXT['/studio'],
  '/fr/certifications': PAGE_TEXT['/certifications'],
  '/fr/legal': 'Short and honest.',
};

const PAIRS = [
  ['/', '/fr'],
  ['/studio', '/fr/studio'],
  ['/certifications', '/fr/certifications'],
  ['/legal', '/fr/legal'],
] as const;

function hreflangs(html: string): string[] {
  return html.match(/<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g) ?? [];
}

describe('prerendered pages', () => {
  it('covers every route with search-length titles and descriptions', () => {
    expect(PAGES.map((page) => page.path)).toEqual(Object.keys(PAGE_TEXT));
    for (const page of PAGES) {
      expect(page.title.length, page.title).toBeLessThanOrEqual(60);
      expect(page.description.length, page.description).toBeLessThanOrEqual(155);
    }
    expect(new Set(PAGES.map((page) => page.title)).size).toBe(PAGES.length);
    expect(new Set(PAGES.map((page) => page.description)).size).toBe(PAGES.length);
  });

  it.each(PAGES.map((page) => [page.path, page] as const))(
    '%s has its own title, description, canonical, social tags and real content',
    (path, page) => {
      const html = renderPage(TEMPLATE, path, dataFor(path));
      const title = attr(page.title);
      const description = attr(page.description);

      expect(html).toContain(`<title>${title}</title>`);
      expect(html.match(/<title>/g)).toHaveLength(1);
      expect(html).toContain(`<meta name="description" content="${description}" />`);
      expect(html).toContain(`<link rel="canonical" href="${canonicalUrl(path)}" />`);
      expect(html).toContain(`<meta property="og:title" content="${title}" />`);
      expect(html).toContain(`<meta property="og:description" content="${description}" />`);
      expect(html).toContain(`<meta property="og:url" content="${canonicalUrl(path)}" />`);
      expect(html).toContain(`<meta name="twitter:title" content="${title}" />`);
      expect(html).toContain(`<meta name="twitter:description" content="${description}" />`);
      expect(html).not.toContain('noindex');

      // Real page text inside #root, not an empty shell.
      const root = html.slice(html.indexOf('<div id="root"'));
      expect(root).toContain(`data-route="${path}"`);
      expect(root).toContain('<h1');
      expect(root).toContain(PAGE_TEXT[path]);
    },
  );

  it.each(PAIRS)('%s and %s carry the right lang and identical hreflang alternates', (en, fr) => {
    const expected = [
      `<link rel="alternate" hreflang="en-CA" href="${canonicalUrl(en)}" />`,
      `<link rel="alternate" hreflang="fr-CA" href="${canonicalUrl(fr)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${canonicalUrl(en)}" />`,
    ];
    const enHtml = renderPage(TEMPLATE, en);
    const frHtml = renderPage(TEMPLATE, fr);

    expect(enHtml).toMatch(/^<!doctype html>\s*<html lang="en-CA">/);
    expect(frHtml).toMatch(/^<!doctype html>\s*<html lang="fr-CA">/);
    expect(hreflangs(enHtml)).toEqual(expected);
    expect(hreflangs(frHtml)).toEqual(expected);
    expect(enHtml).toContain('<meta property="og:locale" content="en_CA" />');
    expect(frHtml).toContain('<meta property="og:locale" content="fr_CA" />');
    // Each language is canonical to itself, not to the other.
    expect(frHtml).toContain(`<link rel="canonical" href="${canonicalUrl(fr)}" />`);
  });

  it.each(PAIRS)('%s ↔ %s: the EN / FR toggle links each page to its counterpart', (en, fr) => {
    const toggle = (html: string) => html.match(/<a[^>]*aria-label="(?:Lire|Read)[^"]*"[^>]*>/)?.[0];
    expect(toggle(renderPage(TEMPLATE, en))).toContain(`href="${fr}"`);
    expect(toggle(renderPage(TEMPLATE, en))).toContain('hrefLang="fr-CA"');
    expect(toggle(renderPage(TEMPLATE, fr))).toContain(`href="${en}"`);
    expect(toggle(renderPage(TEMPLATE, fr))).toContain('hrefLang="en-CA"');
  });

  it.each(PAIRS.map(([, fr]) => fr))('%s is in French, chrome included', (fr) => {
    const root = renderPage(TEMPLATE, fr).split('<div id="root"')[1];
    expect(root).toContain(PAGE_TEXT[fr]);
    expect(root).not.toContain(ENGLISH_TEXT[fr]);
    expect(root).toContain('aria-label="Navigation principale"');
    expect(root).toContain('href="/jobs">Emplois (en anglais)</a>');
    expect(root).toContain('aria-label="Changer de thème"');
    for (const label of ['>Home<', '>Jobs<', '>Terms &amp; Privacy<']) {
      expect(root).not.toContain(label);
    }
  });

  it('keeps /jobs and the 404 English-only: no toggle, no hreflang', () => {
    for (const route of ['/jobs', '404']) {
      const html = renderPage(TEMPLATE, route, dataFor(route));
      expect(html).toMatch(/<html lang="en-CA">/);
      expect(hreflangs(html)).toEqual([]);
      expect(html).not.toMatch(/aria-label="Lire cette page/);
    }
  });

  it('puts Organization JSON-LD on the home page only (both languages)', () => {
    const home = renderPage(TEMPLATE, '/');
    expect(renderPage(TEMPLATE, '/fr')).toContain(home.match(/<script type="application\/ld\+json">.*?<\/script>/)![0]);
    const match = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
    expect(JSON.parse(match![1])).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AML North',
      url: 'https://amlnorth.ca',
      email: 'hello@amlnorth.ca',
      sameAs: ['https://github.com/amlnorth'],
      founder: {
        '@type': 'Person',
        name: 'Salman Zaman',
        sameAs: ['https://www.linkedin.com/in/salmanzaman/'],
      },
    });
    for (const path of ['/jobs', '/studio', '/certifications', '/legal', '/fr/studio', '/fr/legal']) {
      expect(renderPage(TEMPLATE, path, dataFor(path))).not.toContain('application/ld+json');
    }
  });

  it('never adds inline executable script (CSP stays script-src self)', () => {
    for (const route of [...PAGES.map((page) => page.path), '404']) {
      const html = renderPage(TEMPLATE, route, dataFor(route));
      for (const tag of html.match(/<script\b[^>]*>/g) ?? []) {
        const isExternal = /\bsrc="\//.test(tag);
        const isDataBlock = /type="application\/(ld\+)?json"/.test(tag);
        expect(isExternal || isDataBlock, tag).toBe(true);
      }
      expect(html).not.toMatch(/\sstyle="/);
    }
  });

  it('embeds the jobs feed as an inert, breakout-safe data block', () => {
    const data: PrerenderData = {
      jobs: {
        ...JOBS_DATA.jobs!,
        feed: { ...FEED, jobs: [{ ...FEED.jobs[0], title: '</script><b>x</b>' }] },
      },
    };
    const html = renderPage(TEMPLATE, '/jobs', data);
    const block = html.match(/<script type="application\/json" id="prerender-data">(.*?)<\/script>/s);
    expect(block![1]).not.toContain('</script>');
    expect(JSON.parse(block![1])).toEqual(data);
  });

  it('renders a noindex 404 page without a canonical', () => {
    const html = renderPage(TEMPLATE, '404');
    expect(html).toContain('<title>Page not found — AML North</title>');
    expect(html).toContain('<meta name="robots" content="noindex" />');
    expect(html).not.toContain('rel="canonical"');
    expect(html).toContain('data-route="404"');
    expect(html).toContain('Page not found</h1>');
  });

  it('uses the newest firstSeenAt as /jobs lastmod, not generatedAt', () => {
    const feed: JobsFeed = {
      schemaVersion: 1,
      jobs: [
        { ...FEED.jobs[0], id: 'a', firstSeenAt: '2026-10-07T17:37:19Z' },
        { ...FEED.jobs[0], id: 'b', firstSeenAt: '2026-10-10T08:00:00Z' },
        { ...FEED.jobs[0], id: 'c', firstSeenAt: '2026-09-30T12:00:00Z' },
      ],
    };
    expect(newestFirstSeen(feed)).toBe('2026-10-10T08:00:00Z');
    expect(renderSitemap(feed)).toContain(
      '<loc>https://amlnorth.ca/jobs</loc><lastmod>2026-10-10T08:00:00Z</lastmod>',
    );
    // Empty feed: no defensible date, so no lastmod rather than a guess.
    expect(renderSitemap({ schemaVersion: 1, jobs: [] })).toContain(
      '<loc>https://amlnorth.ca/jobs</loc></url>',
    );
  });

  it('lists every route in the sitemap with a lastmod', () => {
    const xml = renderSitemap(FEED);
    for (const page of PAGES) {
      const lastmod = page.lastmod ?? FEED.jobs[0].firstSeenAt;
      expect(xml).toContain(`<loc>${canonicalUrl(page.path)}</loc><lastmod>${lastmod}</lastmod>`);
    }
  });
});

describe('hydration', () => {
  let errors: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errors = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Live fetch after hydration returns the same feed the page was built with.
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(String(url).endsWith('jobs-meta.json') ? META : FEED),
        } as Response),
      ),
    );
  });
  afterEach(() => {
    errors.mockRestore();
    vi.unstubAllGlobals();
    localStorage.clear();
    document.body.innerHTML = '';
    document.documentElement.style.colorScheme = '';
    window.history.pushState({}, '', '/');
  });

  // Load each prerendered page the way a browser would and hydrate it as
  // main.tsx does. React recovers from a server/client markup mismatch by
  // re-rendering on the client and reporting it via onRecoverableError (and
  // dev warnings via console.error) — a clean hydration reports neither.
  it.each([...PAGES.map((page) => page.path), '404'])(
    'hydrates %s without a mismatch',
    async (route) => {
      const url = route === '404' ? '/no-such-page' : route;
      const html = renderPage(TEMPLATE, route, dataFor(route));

      // Now act as the visitor's browser: a different URL, clock and theme
      // than the build. A saved dark choice must not break hydration.
      window.history.pushState({}, '', url);
      localStorage.setItem('amlnorth:theme', 'dark');
      vi.useFakeTimers({ now: new Date('2026-10-20T12:00:00Z'), toFake: ['Date'] });

      document.body.innerHTML = html.slice(html.indexOf('<body>') + 6, html.indexOf('</body>'));
      const container = document.getElementById('root')!;
      const prerendered = container.textContent;
      const data = readPrerenderData(document);

      const recoverable: unknown[] = [];
      await act(async () => {
        hydrateRoot(
          container,
          <PrerenderContext.Provider value={data}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <App />
            </BrowserRouter>
          </PrerenderContext.Provider>,
          { onRecoverableError: (error) => recoverable.push(error) },
        );
      });
      vi.useRealTimers();

      expect(recoverable).toEqual([]);
      expect(errors).not.toHaveBeenCalled();
      expect(container.querySelector('h1')).not.toBeNull();
      if (route !== '/jobs') expect(container.textContent).toBe(prerendered);
      // Post-hydration: the label reflects the stored theme in the page's
      // language, and the title and <html lang> the route.
      const french = pageFor(url)?.lang === 'fr';
      const label = french ? 'Passer au thème clair' : 'Switch to light theme';
      expect(container.querySelector(`button[aria-label="${label}"]`)).not.toBeNull();
      expect(document.title).toBe(pageFor(url)?.title ?? 'Page not found — AML North');
      expect(document.documentElement.lang).toBe(french ? 'fr-CA' : 'en-CA');
    },
  );
});
