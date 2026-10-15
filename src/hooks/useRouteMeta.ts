import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalUrl, NOT_FOUND_META, pageFor } from '../lib/seo';

function setAttr(selector: string, attr: string, value: string): void {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/**
 * Keep <title> and the description/canonical/social tags in step with the
 * route on in-app navigation. A first load already has the right tags baked
 * into its prerendered HTML; this only matters once the visitor clicks around.
 */
export function useRouteMeta(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageFor(pathname);
    const { title, description } = page ?? NOT_FOUND_META;
    document.title = title;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', description);
    if (page) {
      setAttr('link[rel="canonical"]', 'href', canonicalUrl(page.path));
      setAttr('meta[property="og:url"]', 'content', canonicalUrl(page.path));
    }
  }, [pathname]);
}
