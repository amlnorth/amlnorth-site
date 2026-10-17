// Build-time renderer. `vite build --ssr` bundles this for Node, and
// scripts/prerender.mjs calls it to write a finished HTML file per route, so
// crawlers and link previews get real content and per-route meta without
// running JS. The client then hydrates the same markup (see main.tsx).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import type { JobsFeed } from './lib/jobs';
import { PRERENDER_DATA_ID, PrerenderContext, type PrerenderData } from './lib/prerender';
import { LANG_TAG, OG_LOCALE } from './lib/i18n';
import {
  alternateLinks,
  canonicalUrl,
  NOT_FOUND_META,
  PAGES,
  pageFor,
  SITE_NAME,
  SITE_ORIGIN,
} from './lib/seo';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from './lib/site';

export { PAGES };

const HEAD_START = '<!--prerender:head-->';
const HEAD_END = '<!--/prerender:head-->';
const ROOT = '<div id="root"></div>';
const HTML_OPEN = /<html lang="[^"]*">/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** JSON safe to place inside a <script> data block (no "</script>" breakout). */
function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

// Data blocks (non-JavaScript `type`) are never executed, so script-src in
// the CSP doesn't apply to them — the policy stays 'self'-only.
function dataBlock(type: string, json: unknown, id?: string): string {
  const idAttr = id ? ` id="${id}"` : '';
  return `<script type="${type}"${idAttr}>${scriptJson(json)}</script>`;
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_ORIGIN,
  email: CONTACT_EMAIL,
  sameAs: [GITHUB_URL],
  founder: {
    '@type': 'Person',
    name: 'Salman Zaman',
    sameAs: [LINKEDIN_URL],
  },
};

function headTags(route: string): string {
  const page = pageFor(route);
  const { title, description } = page ?? NOT_FOUND_META;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
  ];
  if (page) {
    tags.push(`<link rel="canonical" href="${canonicalUrl(page.path)}" />`);
    for (const { hreflang, href } of alternateLinks(page)) {
      tags.push(`<link rel="alternate" hreflang="${hreflang}" href="${href}" />`);
    }
  } else {
    // The 404 page is served for every unknown URL; keep it out of the index.
    tags.push('<meta name="robots" content="noindex" />');
  }
  tags.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[page?.lang ?? 'en']}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
  );
  if (page) tags.push(`<meta property="og:url" content="${canonicalUrl(page.path)}" />`);
  tags.push(
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
  );
  // Organization data on the home page, in both languages.
  if (page?.path === '/' || page?.path === '/fr') {
    tags.push(dataBlock('application/ld+json', organization));
  }
  return tags.join('\n    ');
}

/**
 * Render one route into the built index.html template. `route` is a path from
 * PAGES, or "404" for the not-found page.
 */
export function renderPage(template: string, route: string, data: PrerenderData = {}): string {
  const headStart = template.indexOf(HEAD_START);
  const headEnd = template.indexOf(HEAD_END);
  if (headStart === -1 || headEnd === -1 || !template.includes(ROOT) || !HTML_OPEN.test(template)) {
    throw new Error('index.html is missing <html lang>, the prerender head markers or the empty #root');
  }
  const lang = LANG_TAG[pageFor(route)?.lang ?? 'en'];

  const location = route === '404' ? '/404' : route;
  const app = renderToString(
    <PrerenderContext.Provider value={data}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </PrerenderContext.Provider>,
  );

  const hasData = Object.keys(data).length > 0;
  const body =
    `<div id="root" data-route="${escapeHtml(route)}">${app}</div>` +
    (hasData ? `\n    ${dataBlock('application/json', data, PRERENDER_DATA_ID)}` : '');

  return (
    template.slice(0, headStart) +
    headTags(route) +
    template.slice(headEnd + HEAD_END.length)
  )
    .replace(HTML_OPEN, `<html lang="${lang}">`)
    .replace(ROOT, () => body);
}

/**
 * The newest firstSeenAt in the feed: /jobs's lastmod moves only when a new
 * role appears, not on every aggregator run. Undefined for an empty feed.
 */
export function newestFirstSeen(feed: JobsFeed): string | undefined {
  let newest: string | undefined;
  let newestMs = -Infinity;
  for (const job of feed.jobs) {
    const ms = Date.parse(job.firstSeenAt);
    if (ms > newestMs) {
      newestMs = ms;
      newest = job.firstSeenAt;
    }
  }
  return newest;
}

/** sitemap.xml with a <lastmod> per route; /jobs's comes from the feed. */
export function renderSitemap(feed: JobsFeed): string {
  const jobsLastmod = newestFirstSeen(feed);
  const urls = PAGES.map((page) => {
    const lastmod = page.lastmod ?? jobsLastmod;
    const lastmodTag = lastmod ? `<lastmod>${escapeHtml(lastmod)}</lastmod>` : '';
    return `  <url><loc>${canonicalUrl(page.path)}</loc>${lastmodTag}</url>`;
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}
