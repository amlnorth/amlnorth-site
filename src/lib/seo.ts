// Per-route search metadata. One table drives the prerendered <head> of each
// page (scripts/prerender.mjs), the sitemap, and the client-side updates on
// in-app navigation (useRouteMeta), so the three can't drift apart.

export const SITE_ORIGIN = 'https://amlnorth.ca';
export const SITE_NAME = 'AML North';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /**
   * Sitemap <lastmod> (YYYY-MM-DD) for pages whose content is authored. Bump
   * it when a page's copy materially changes. /jobs leaves it unset — its
   * lastmod is the newest job's firstSeenAt at build time.
   */
  lastmod?: string;
}

export const PAGES: readonly PageMeta[] = [
  {
    path: '/',
    title: 'AML North — Canadian AML Jobs, Tools & Certifications',
    description:
      'Open AML and financial-crime jobs at Canadian banks, Report Studio for preparing FINTRAC reports in your browser, and a guide to AML certifications.',
    lastmod: '2026-10-12',
  },
  {
    path: '/jobs',
    title: 'AML Jobs at Canadian Banks — AML North',
    description:
      'Open anti-money laundering and financial-crime jobs at Canadian banks, updated twice daily from bank career sites, with honest first-seen dates.',
  },
  {
    path: '/studio',
    title: 'Report Studio, by AML North — Prepare FINTRAC Reports',
    description:
      'Prepare FINTRAC LCTR, EFTR, STR, LVCTR and CDR reports in your browser, with live validation and PDF export. Nothing you enter leaves your device.',
    lastmod: '2026-07-26',
  },
  {
    path: '/certifications',
    title: 'AML Certifications in Canada: CAMS, CFE, CPAML — AML North',
    description:
      "A practitioner's read on CAMS, CAMS-FCI, CFE and CPAML: which AML certifications Canadian banks actually value, and which ones to skip.",
    lastmod: '2026-07-22',
  },
  {
    path: '/legal',
    title: 'Terms & Privacy — AML North',
    description:
      "AML North's terms and privacy: an informational site, job links to original postings, no ad-tech tracking, and Report Studio keeps data in your browser.",
    lastmod: '2026-10-12',
  },
];

export const NOT_FOUND_META = {
  title: 'Page not found — AML North',
  description: "That page doesn't exist on AML North. It may have moved, or the link may be wrong.",
} as const;

/** Treat "/jobs/" as "/jobs"; the root stays "/". */
export function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname;
}

export function pageFor(pathname: string): PageMeta | undefined {
  const path = normalizePath(pathname);
  return PAGES.find((page) => page.path === path);
}

/**
 * Identifies which prerendered page a URL corresponds to: the route's path,
 * or "404" for anything unknown. Written onto #root at build time and compared
 * on boot, so the client only hydrates markup that was rendered for its URL.
 */
export function routeKey(pathname: string): string {
  return pageFor(pathname)?.path ?? '404';
}

export function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}
