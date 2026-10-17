import type { HomeContent } from '../types';

export const home: HomeContent = {
  intro:
    'A Canada-first home for anti–money-laundering and financial-crime work. It brings together a live feed of open AML roles at Canadian banks, Report Studio for preparing FINTRAC reports in the browser, and a guide to the certifications that matter here — built and maintained by one engineer who works in the field.',
  cards: [
    {
      title: 'Jobs',
      blurb:
        'Open AML and financial-crime roles at Canadian banks, refreshed twice daily with honest "first seen" freshness dates.',
      to: '/jobs',
      cta: 'Browse the feed',
    },
    {
      title: 'Report Studio',
      blurb:
        'Prepare FINTRAC reports — LCTR, EFTR, STR, LVCTR and CDR — entirely in your browser. Nothing you enter is ever transmitted.',
      to: '/studio',
      cta: 'See what it does',
    },
    {
      title: 'Certifications',
      blurb:
        "A practitioner's plain-language read on CAMS, CAMS-FCI, CFE and CPAML — which credentials Canadian banks actually value, and which to skip.",
      to: '/certifications',
      cta: 'Read the guide',
    },
  ],
  whoHeading: 'Who built this',
  whoBody:
    'Built by Salman Zaman, an AML technology engineer in Canada. The site, the jobs aggregator, and Report Studio are all built in the open.',
  emailLabel: 'Email',
};
