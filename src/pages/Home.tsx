import { Link } from 'react-router-dom';
import { GITHUB_URL, LINKEDIN_URL } from '../lib/site';

interface HomeCard {
  title: string;
  blurb: string;
  to?: string;
  cta?: string;
  comingSoon?: boolean;
}

const cards: HomeCard[] = [
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
      'A plain-language guide to CAMS, CAMS-FCI, CFE and CPAML — real costs in CAD and what Canadian banks actually ask for.',
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <section aria-labelledby="home-heading">
        <h1 id="home-heading" className="text-4xl font-semibold tracking-tight">
          AML North
        </h1>
        <p className="mt-4 text-lg text-muted">
          A Canada-first home for anti–money-laundering and financial-crime work. It brings
          together a live feed of open AML roles at Canadian banks, Report Studio for preparing
          FINTRAC reports in the browser, and a guide to the certifications that matter here —
          built and maintained by one engineer who works in the field.
        </p>
      </section>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.title}
            className="relative flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors focus-within:border-accent hover:border-accent"
          >
            <h2 className="text-lg font-medium">
              {card.to ? (
                <Link
                  to={card.to}
                  className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
                >
                  {card.title}
                </Link>
              ) : (
                card.title
              )}
            </h2>
            <p className="mt-2 grow text-sm text-muted">{card.blurb}</p>
            <p className="mt-4 text-sm font-medium text-accent">
              {card.comingSoon ? (
                <span className="text-muted">Coming soon</span>
              ) : (
                <span aria-hidden="true">{card.cta} →</span>
              )}
            </p>
          </li>
        ))}
      </ul>

      <section aria-labelledby="who-heading" className="mt-12 border-t border-border pt-6">
        <h2 id="who-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">
          Who built this
        </h2>
        <p className="mt-2 text-base">
          Built by Salman Zaman, an AML technology engineer in Canada. The site, the jobs
          aggregator, and Report Studio are all built in the open.
        </p>
        <p className="mt-3 flex gap-4 text-sm">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            GitHub
          </a>
        </p>
      </section>
    </div>
  );
}
