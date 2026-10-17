import { chromeContent } from '../content/chrome';
import { studioContent } from '../content/studio';
import { useContent } from '../lib/i18n';
import { STUDIO_URL } from '../lib/site';

export default function Studio() {
  const t = useContent(studioContent);
  const { newTab } = useContent(chromeContent);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Report Studio, by AML North</h1>

      <p className="mt-4 text-lg text-muted">{t.intro}</p>
      {t.availability && <p className="mt-4 text-base">{t.availability}</p>}

      <section aria-labelledby="reports-heading" className="mt-8">
        <h2 id="reports-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t.reportsHeading}
        </h2>
        <ul className="mt-3 grid gap-2">
          {t.reports.map((report) => (
            <li key={report.code} className="flex gap-3 rounded-md border border-border bg-surface p-3 text-sm">
              <span className="w-16 shrink-0 font-medium">{report.code}</span>
              <span className="text-muted">{report.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="privacy-heading" className="mt-8">
        <h2 id="privacy-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t.privacyHeading}
        </h2>
        <p className="mt-2 text-base">{t.privacyBody}</p>
      </section>

      <div className="mt-10">
        <a
          href={STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-accent px-5 py-3 text-base font-medium text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {t.cta}
          <span aria-hidden="true"> →</span>
          <span className="sr-only">{` ${newTab}`}</span>
        </a>
      </div>
    </div>
  );
}
