import type { ChromeContent } from '../types';

export const chrome: ChromeContent = {
  navLabel: 'Navigation principale',
  nav: [
    { to: '/fr', label: 'Accueil' },
    // The jobs feed is English-only; say so before the click.
    { to: '/jobs', label: 'Emplois (en anglais)' },
    { to: '/fr/studio', label: 'Report Studio' },
    { to: '/fr/certifications', label: 'Certifications' },
    { to: '/fr/legal', label: 'Conditions et confidentialité' },
  ],
  switchTheme: { dark: 'Passer au thème sombre', light: 'Passer au thème clair' },
  switchThemePending: 'Changer de thème',
  newTab: "(s'ouvre dans un nouvel onglet)",
  otherLanguage: 'Read this page in English',
};
