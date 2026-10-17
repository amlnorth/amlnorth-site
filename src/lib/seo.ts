// Per-route search metadata. One table drives the prerendered <head> of each
// page (scripts/prerender.mjs), the sitemap, and the client-side updates on
// in-app navigation (useRouteMeta), so the three can't drift apart.

import { englishPath, frenchPath, LANG_TAG, TRANSLATED_PATHS, type Lang } from './i18n';

export const SITE_ORIGIN = 'https://amlnorth.ca';
export const SITE_NAME = 'AML North';

export interface PageMeta {
  path: string;
  lang: Lang;
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
    lang: 'en',
    title: 'AML North — Canadian AML Jobs, Tools & Certifications',
    description:
      'Open AML and financial-crime jobs at Canadian banks, Report Studio for preparing FINTRAC reports in your browser, and a guide to AML certifications.',
    lastmod: '2026-10-12',
  },
  {
    path: '/jobs',
    lang: 'en',
    title: 'AML Jobs at Canadian Banks — AML North',
    description:
      'Open anti-money laundering and financial-crime jobs at Canadian banks, updated twice daily from bank career sites, with honest first-seen dates.',
  },
  {
    path: '/studio',
    lang: 'en',
    title: 'Report Studio, by AML North — Prepare FINTRAC Reports',
    description:
      'Prepare FINTRAC LCTR, EFTR, STR, LVCTR and CDR reports in your browser, with live validation and PDF export. Nothing you enter leaves your device.',
    lastmod: '2026-07-26',
  },
  {
    path: '/certifications',
    lang: 'en',
    title: 'AML Certifications in Canada: CAMS, CFE, CPAML — AML North',
    description:
      "A practitioner's read on CAMS, CAMS-FCI, CFE and CPAML: which AML certifications Canadian banks actually value, and which ones to skip.",
    lastmod: '2026-07-22',
  },
  {
    path: '/legal',
    lang: 'en',
    title: 'Terms & Privacy — AML North',
    description:
      "AML North's terms and privacy: an informational site, job links to original postings, no ad-tech tracking, and Report Studio keeps data in your browser.",
    lastmod: '2026-10-12',
  },
  {
    path: '/fr',
    lang: 'fr',
    title: 'AML North — Emplois, outils et certifications LBA au Canada',
    description:
      "Postes en lutte contre le blanchiment d'argent dans les banques canadiennes, Report Studio pour vos déclarations à CANAFE et un guide des certifications.",
    lastmod: '2026-10-17',
  },
  {
    path: '/fr/studio',
    lang: 'fr',
    title: 'Report Studio, by AML North — Déclarations à CANAFE',
    description:
      'Préparez vos déclarations à CANAFE dans votre navigateur, avec validation en direct et export PDF. Rien ne quitte votre appareil. Outil en anglais.',
    lastmod: '2026-10-17',
  },
  {
    path: '/fr/certifications',
    lang: 'fr',
    title: 'Certifications LBA au Canada : CAMS, CFE, CPAML — AML North',
    description:
      "L'avis d'un praticien sur CAMS, CAMS-FCI, CFE et CPAML : les certifications LBA que les banques canadiennes valorisent vraiment, et celles à éviter.",
    lastmod: '2026-10-17',
  },
  {
    path: '/fr/legal',
    lang: 'fr',
    title: 'Conditions et confidentialité — AML North',
    description:
      "Conditions d'AML North : site informatif, liens vers les offres originales, aucun pistage publicitaire; Report Studio garde vos données dans le navigateur.",
    lastmod: '2026-10-17',
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

/**
 * The English and French paths of a translated page, or undefined for pages
 * that exist in one language only (/jobs, the 404).
 */
export function translationsOf(page: PageMeta): Record<Lang, string> | undefined {
  const en = page.lang === 'fr' ? englishPath(page.path) : page.path;
  if (!(TRANSLATED_PATHS as readonly string[]).includes(en)) return undefined;
  return { en, fr: frenchPath(en) };
}

/**
 * hreflang alternates for a translated page: both languages plus x-default
 * (English). Identical on the English and French page of a pair, as Google
 * requires; empty for single-language pages.
 */
export function alternateLinks(page: PageMeta): Array<{ hreflang: string; href: string }> {
  const translations = translationsOf(page);
  if (!translations) return [];
  return [
    { hreflang: LANG_TAG.en, href: canonicalUrl(translations.en) },
    { hreflang: LANG_TAG.fr, href: canonicalUrl(translations.fr) },
    { hreflang: 'x-default', href: canonicalUrl(translations.en) },
  ];
}
