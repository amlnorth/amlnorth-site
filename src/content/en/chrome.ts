import type { ChromeContent } from '../types';

export const chrome: ChromeContent = {
  navLabel: 'Main',
  nav: [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/studio', label: 'Report Studio' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/legal', label: 'Terms & Privacy' },
  ],
  switchTheme: { dark: 'Switch to dark theme', light: 'Switch to light theme' },
  switchThemePending: 'Switch theme',
  newTab: '(opens in a new tab)',
  otherLanguage: 'Lire cette page en français',
};
