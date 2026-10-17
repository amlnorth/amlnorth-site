// Shapes of the per-page copy. Each page has one English and one French file
// under src/content/<lang>/ that satisfies the same type, so a missing or
// extra string is a type error rather than a blank on one language's page.
import type { ReactNode } from 'react';
import type { Theme } from '../lib/theme';

export interface ChromeContent {
  navLabel: string;
  nav: Array<{ to: string; label: string }>;
  /** The theme toggle's accessible name, by the theme it would switch to. */
  switchTheme: Record<Theme, string>;
  /** Accessible name before hydration, when the active theme isn't known yet. */
  switchThemePending: string;
  /** Screen-reader suffix on links that open in a new tab. */
  newTab: string;
  /** Accessible name of the EN / FR link to the other language. */
  otherLanguage: string;
}

export interface HomeContent {
  intro: string;
  cards: Array<{ title: string; blurb: string; to: string; cta: string }>;
  whoHeading: string;
  whoBody: string;
  emailLabel: string;
}

export interface StudioContent {
  intro: string;
  /** Shown only where the app's language differs from the page's. */
  availability?: string;
  reportsHeading: string;
  reports: Array<{ code: string; name: string }>;
  privacyHeading: string;
  privacyBody: string;
  cta: string;
}

export interface CertificationsContent {
  intro: string;
  disclaimer: string;
  jumpLabel: string;
  sections: Array<{ id: string; title: string; body: ReactNode }>;
  closing: string;
  lastReviewed: string;
}

export interface LegalContent {
  heading: string;
  intro: string;
  sections: Array<{ heading: string; body: ReactNode }>;
}
