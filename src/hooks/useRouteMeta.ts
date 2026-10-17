import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LANG_TAG, OG_LOCALE } from '../lib/i18n';
import { alternateLinks, canonicalUrl, NOT_FOUND_META, pageFor } from '../lib/seo';

function setAttr(selector: string, attr: string, value: string): void {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/**
 * Keep <html lang>, <title>, and the description/canonical/hreflang/social
 * tags in step with the route on in-app navigation. A first load already has
 * the right tags baked into its prerendered HTML; this only matters once the
 * visitor clicks around (including across the EN / FR toggle).
 */
export function useRouteMeta(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageFor(pathname);
    const lang = page?.lang ?? 'en';
    const { title, description } = page ?? NOT_FOUND_META;
    document.documentElement.lang = LANG_TAG[lang];
    document.title = title;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[property="og:locale"]', 'content', OG_LOCALE[lang]);
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', description);
    if (page) {
      setAttr('link[rel="canonical"]', 'href', canonicalUrl(page.path));
      setAttr('meta[property="og:url"]', 'content', canonicalUrl(page.path));
    }

    for (const link of document.head.querySelectorAll('link[rel="alternate"][hreflang]')) {
      link.remove();
    }
    for (const { hreflang, href } of page ? alternateLinks(page) : []) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.append(link);
    }
  }, [pathname]);
}
