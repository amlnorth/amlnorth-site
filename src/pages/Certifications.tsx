const certs = ['CAMS', 'CAMS-FCI', 'CFE', 'CPAML'];

export default function Certifications() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Certifications</h1>

      <div className="mt-6 rounded-lg border border-border bg-surface p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">Coming soon</p>
        <p className="mt-3 text-lg">
          An insider's guide to the certifications Canadian AML employers actually value — with
          real costs in CAD and a clear read on what banks here ask for versus what's just
          nice to have.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Certifications to be covered">
          {certs.map((cert) => (
            <li
              key={cert}
              className="rounded-sm border border-border px-2.5 py-1 text-sm text-muted"
            >
              {cert}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          This one is written by hand, not generated — it's being worked on now.
        </p>
      </div>
    </div>
  );
}
