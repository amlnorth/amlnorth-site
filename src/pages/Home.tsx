import { Link } from 'react-router-dom';
import { homeContent } from '../content/home';
import { useContent } from '../lib/i18n';
import { CONTACT_MAILTO, GITHUB_URL, LINKEDIN_URL } from '../lib/site';

export default function Home() {
  const t = useContent(homeContent);

  return (
    <div className="mx-auto max-w-3xl">
      <section aria-labelledby="home-heading">
        <h1 id="home-heading" className="text-4xl font-semibold tracking-tight">
          AML North
        </h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>
      </section>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {t.cards.map((card) => (
          <li
            key={card.title}
            className="relative flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors focus-within:border-accent hover:border-accent"
          >
            <h2 className="text-lg font-medium">
              <Link
                to={card.to}
                className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
              >
                {card.title}
              </Link>
            </h2>
            <p className="mt-2 grow text-sm text-muted">{card.blurb}</p>
            <p className="mt-4 text-sm font-medium text-accent">
              <span aria-hidden="true">{card.cta} →</span>
            </p>
          </li>
        ))}
      </ul>

      <section aria-labelledby="who-heading" className="mt-12 border-t border-border pt-6">
        <h2 id="who-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t.whoHeading}
        </h2>
        <p className="mt-2 text-base">{t.whoBody}</p>
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
          <a
            href={CONTACT_MAILTO}
            className="text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t.emailLabel}
          </a>
        </p>
      </section>
    </div>
  );
}
