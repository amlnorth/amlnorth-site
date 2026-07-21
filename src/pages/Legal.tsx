import { Link } from 'react-router-dom';

export default function Legal() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Terms &amp; Privacy</h1>
      <p className="mt-4 text-muted">Short and honest. Last updated July 2026.</p>

      <div className="mt-8 grid gap-6 text-base">
        <section>
          <h2 className="text-lg font-medium">What this site is</h2>
          <p className="mt-2 text-muted">
            AML North is a personal, informational portfolio site. It is not a recruiter, an
            employer, or a compliance service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium">The jobs feed</h2>
          <p className="mt-2 text-muted">
            Job listings link out to the original postings on employers' own career sites. AML
            North has no affiliation with, and no endorsement from, any employer listed. Listings
            are gathered automatically and may be out of date — always confirm details on the
            original posting.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium">Report Studio</h2>
          <p className="mt-2 text-muted">
            Everything you enter into <Link to="/studio" className="text-accent">Report Studio</Link>{' '}
            stays in your browser; nothing is ever transmitted to AML North or anyone else.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium">Analytics</h2>
          <p className="mt-2 text-muted">
            If any usage measurement is used, it is limited to privacy-respecting, aggregate page
            counts. No ad-tech, no cross-site tracking, and nothing tied to you personally.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium">Not advice</h2>
          <p className="mt-2 text-muted">
            Nothing here is legal, compliance, or financial advice. Report Studio helps prepare
            reports; it does not submit them, and you remain responsible for their accuracy and
            filing.
          </p>
        </section>
      </div>
    </div>
  );
}
