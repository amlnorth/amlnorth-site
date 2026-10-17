import type { StudioContent } from '../types';

export const studio: StudioContent = {
  intro:
    "Report Studio prepares FINTRAC reports in your browser. Work through a guided wizard, get live validation against FINTRAC's rules as you go, and export a clean PDF — without your data ever leaving your machine.",
  reportsHeading: 'Report types',
  reports: [
    { code: 'LCTR', name: 'Large Cash Transaction Report' },
    { code: 'EFTR', name: 'Electronic Funds Transfer Report' },
    { code: 'STR', name: 'Suspicious Transaction Report' },
    { code: 'LVCTR', name: 'Large Virtual Currency Transaction Report' },
    { code: 'CDR', name: 'Casino Disbursement Report' },
  ],
  privacyHeading: 'Privacy',
  privacyBody:
    'Everything you enter stays in your browser; nothing is ever transmitted. There is no account, no server, and no analytics on your report data.',
  cta: 'Open Report Studio',
};
