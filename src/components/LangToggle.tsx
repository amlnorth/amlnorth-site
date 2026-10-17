import { Link, useLocation } from 'react-router-dom';
import { chromeContent } from '../content/chrome';
import { LANG_TAG, useContent, useLang, type Lang } from '../lib/i18n';
import { pageFor, translationsOf } from '../lib/seo';

/**
 * "EN / FR": a plain link to this page in the other language, so it works
 * before JS loads (and is a client-side navigation after). Rendered only on
 * pages that have a translation — not on /jobs or the 404.
 */
export function LangToggle() {
  const { pathname } = useLocation();
  const lang = useLang();
  const { otherLanguage } = useContent(chromeContent);
  const page = pageFor(pathname);
  const translations = page && translationsOf(page);
  if (!translations) return null;

  const other: Lang = lang === 'en' ? 'fr' : 'en';
  const mark = (code: Lang) =>
    code === lang ? (
      <span className="font-medium text-fg">{code.toUpperCase()}</span>
    ) : (
      <span className="text-accent">{code.toUpperCase()}</span>
    );

  return (
    <Link
      to={translations[other]}
      hrefLang={LANG_TAG[other]}
      lang={LANG_TAG[other]}
      aria-label={otherLanguage}
      className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-md border border-border px-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span aria-hidden="true">
        {mark('en')}
        <span className="text-muted"> / </span>
        {mark('fr')}
      </span>
    </Link>
  );
}
