// Two languages, no library. A page's language comes from its route (French
// pages live under /fr) and is provided once by App through LangContext, so
// page components just call useLang() and pick their copy.
import { createContext, useContext } from 'react';

export type Lang = 'en' | 'fr';

/** BCP 47 tags for <html lang> and hreflang. */
export const LANG_TAG: Record<Lang, string> = { en: 'en-CA', fr: 'fr-CA' };

/** Open Graph wants underscores. */
export const OG_LOCALE: Record<Lang, string> = { en: 'en_CA', fr: 'fr_CA' };

/**
 * English paths that have a French version. /jobs stays English-only — job
 * postings come from English career sites — so it has no counterpart.
 */
export const TRANSLATED_PATHS = ['/', '/studio', '/certifications', '/legal'] as const;

/** '/' → '/fr', '/studio' → '/fr/studio'. */
export function frenchPath(englishPath: string): string {
  return englishPath === '/' ? '/fr' : `/fr${englishPath}`;
}

/** '/fr' → '/', '/fr/studio' → '/studio'. */
export function englishPath(frPath: string): string {
  return frPath === '/fr' ? '/' : frPath.replace(/^\/fr(?=\/)/, '');
}

/** Pick the copy for the current language from a { en, fr } pair. */
export function pick<T>(content: Record<Lang, T>, lang: Lang): T {
  return content[lang];
}

export const LangContext = createContext<Lang>('en');

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useContent<T>(content: Record<Lang, T>): T {
  return pick(content, useLang());
}
