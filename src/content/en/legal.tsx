import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../../lib/site';
import type { LegalContent } from '../types';

export const legal: LegalContent = {
  heading: 'Terms & Privacy',
  intro: 'Short and honest. Last updated October 2026.',
  sections: [
    {
      heading: 'What this site is',
      body: (
        <>
          AML North is a personal, informational portfolio site. It is not a recruiter, an
          employer, or a compliance service.
        </>
      ),
    },
    {
      heading: 'The jobs feed',
      body: (
        <>
          Job listings link out to the original postings on employers' own career sites. AML
          North has no affiliation with, and no endorsement from, any employer listed. Listings
          are gathered automatically and may be out of date — always confirm details on the
          original posting.
        </>
      ),
    },
    {
      heading: 'Report Studio',
      body: (
        <>
          Everything you enter into <Link to="/studio" className="text-accent">Report Studio</Link>{' '}
          stays in your browser; nothing is ever transmitted to AML North or anyone else.
        </>
      ),
    },
    {
      heading: 'Analytics',
      body: (
        <>
          If any usage measurement is used, it is limited to privacy-respecting, aggregate page
          counts. No ad-tech, no cross-site tracking, and nothing tied to you personally.
        </>
      ),
    },
    {
      heading: 'Not advice',
      body: (
        <>
          Nothing here is legal, compliance, or financial advice. Report Studio helps prepare
          reports; it does not submit them, and you remain responsible for their accuracy and
          filing.
        </>
      ),
    },
    {
      heading: 'Contact',
      body: (
        <>
          Questions about sponsorship or consulting, or feedback on the jobs feed or Report
          Studio, are welcome at{' '}
          <a href={CONTACT_MAILTO} className="text-accent">
            {CONTACT_EMAIL}
          </a>
          .
        </>
      ),
    },
  ],
};
