import { STUDIO_URL } from '../lib/site';

const reportTypes: Array<{ code: string; name: string }> = [
  { code: 'LCTR', name: 'Large Cash Transaction Report' },
  { code: 'EFTR', name: 'Electronic Funds Transfer Report' },
  { code: 'STR', name: 'Suspicious Transaction Report' },
  { code: 'LVCTR', name: 'Large Virtual Currency Transaction Report' },
  { code: 'CDR', name: 'Casino Disbursement Report' },
];

export default function Studio() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Report Studio, by AML North</h1>

      <p className="mt-4 text-lg text-muted">
        Report Studio prepares FINTRAC reports in your browser. Work through a guided wizard, get
        live validation against FINTRAC's rules as you go, and export a clean PDF — without your
        data ever leaving your machine.
      </p>

      <section aria-labelledby="reports-heading" className="mt-8">
        <h2 id="reports-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">
          Report types
        </h2>
        <ul className="mt-3 grid gap-2">
          {reportTypes.map((report) => (
            <li key={report.code} className="flex gap-3 rounded-md border border-border bg-surface p-3 text-sm">
              <span className="w-16 shrink-0 font-medium">{report.code}</span>
              <span className="text-muted">{report.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="privacy-heading" className="mt-8">
        <h2 id="privacy-heading" className="text-sm font-semibold uppercase tracking-wide text-muted">
          Privacy
        </h2>
        <p className="mt-2 text-base">
          Everything you enter stays in your browser; nothing is ever transmitted. There is no
          account, no server, and no analytics on your report data.
        </p>
      </section>

      <div className="mt-10">
        <a
          href={STUDIO_URL}
          className="inline-block rounded-md bg-accent px-5 py-3 text-base font-medium text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Open Report Studio →
        </a>
      </div>
    </div>
  );
}
