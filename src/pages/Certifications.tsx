import type { ReactNode } from 'react';

const pills = [
  { id: 'cams', label: 'CAMS' },
  { id: 'cams-fci', label: 'CAMS-FCI' },
  { id: 'cfe', label: 'CFE' },
  { id: 'cpaml', label: 'CPAML' },
];

// Outbound source link, matching the jobs page's pattern (new tab, noopener).
function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2 id={id} className="scroll-mt-6 text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

export default function Certifications() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Certifications</h1>

      <p className="mt-4 text-muted">
        The AML field is full of acronyms you can pay to put after your name. A few genuinely
        move hiring decisions at Canadian banks; several are resume filler that cost real money
        and change nothing. This page is the honest version of that conversation — what each
        credential is, where it lands with employers here, and which ones I'd skip. I've left the
        fees off on purpose: pricing changes and each body lists its own current, personalized
        numbers better than I could keep a table accurate. What you'll find here instead is the
        part you can't look up — a practitioner's read on what's actually worth your time and
        professional-development budget.
      </p>

      <blockquote className="mt-4 border-l-2 border-border pl-4 text-sm text-muted">
        These are my own observations from working in the field, not official guidance from any
        certifying body, and not career or financial advice. For current fees, eligibility, and
        requirements, follow the links to each certifier.
      </blockquote>

      <nav aria-label="Jump to a credential" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <li key={pill.id}>
              <a
                href={`#${pill.id}`}
                className="inline-block rounded-sm border border-border px-2.5 py-1 text-sm text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {pill.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="cams" title="CAMS — Certified Anti-Money Laundering Specialist">
        <p>
          <strong className="font-semibold">The one that matters most in Canada.</strong> Issued
          by ACAMS, CAMS is the closest thing AML has to a standard credential. When a Canadian
          bank posting says "certification preferred" or "CAMS an asset," this is almost always
          the one they mean. If you're going to get exactly one AML certification, get this.
        </p>
        <p>
          It's a single scenario-based exam covering AML/CFT risk, the global regulatory
          framework, and how compliance programs actually run — judgment over memorization.
          You'll need to be an ACAMS member to sit it, meet a credit-based eligibility threshold
          (education plus AML experience gets most people there), and renew on a cycle with
          continuing education.
        </p>
        <p>
          <strong className="font-semibold">My take:</strong> worth it if you're staying in AML
          and want the credential hiring managers recognize on sight. There's a real renewal
          treadmill, so get your employer to fund it if you can — most Canadian banks have a
          development budget that covers exactly this. It's the one that opens doors here.
        </p>
        <p>
          <SourceLink href="https://www.acams.org">Current requirements and fees: ACAMS</SourceLink>
        </p>
      </Section>

      <Section id="cams-fci" title="CAMS-FCI — CAMS Financial Crimes Investigations">
        <p>
          <strong className="font-semibold">The specialist step-up, and only after CAMS.</strong>{' '}
          Also from ACAMS, CAMS-FCI is a separate, advanced credential built specifically around
          running financial-crime investigations — building a case, following the money,
          documenting it. CAMS first; this builds on it.
        </p>
        <p>
          <strong className="font-semibold">My take:</strong> niche, and only worth it if
          investigations are literally your job — FIU analyst, financial-crime investigator, an
          EDD role that's really casework. If you're in reporting, model validation, or
          compliance-program work, it won't change your prospects and the money's better spent
          elsewhere. Don't collect it just to have it.
        </p>
        <p>
          <SourceLink href="https://www.acams.org">Details: ACAMS</SourceLink>
        </p>
      </Section>

      <Section id="cfe" title="CFE — Certified Fraud Examiner">
        <p>
          <strong className="font-semibold">Broader than AML, and respected outside it.</strong>{' '}
          Issued by the ACFE, the CFE covers fraud generally — financial-statement fraud,
          corruption, investigation technique, the legal side. Not being AML-specific is exactly
          why it travels: fraud, internal audit, forensic accounting, and law enforcement all
          recognize it. It requires ACFE membership, a degree plus relevant experience, and
          ongoing continuing education to maintain. (Worth noting the exam structure was set to
          change around 2026 — check the current format before buying study materials.)
        </p>
        <p>
          <strong className="font-semibold">My take:</strong> the most versatile credential here.
          If you might move between AML, fraud, and broader financial-crime or audit roles — or
          you want something not tied to a single regulator — the CFE is a strong bet. In a pure
          AML lane at a Canadian bank, CAMS still edges it for name recognition, but the CFE is
          the one I'd pair it with if I were building a financial-crime career rather than a
          compliance one.
        </p>
        <p>
          <SourceLink href="https://www.acfe.com">Current requirements and fees: ACFE</SourceLink>
        </p>
      </Section>

      <Section id="cpaml" title={'CPAML / the "nice to have, rarely asked for" tier'}>
        <p>
          There's a long tail of AML credentials — CPAML and various institute- or
          vendor-specific certificates among them. Some are legitimately educational; few are
          things Canadian bank hiring managers screen for.
        </p>
        <p>
          <strong className="font-semibold">My honest take:</strong> I've never seen a Canadian
          AML posting require one of these, and rarely seen one list it as an asset. If your
          employer offers it free, or it's bundled with training you're doing anyway, fine —
          learning is learning. But don't pay out of pocket for a credential nobody's asking for
          on the theory that more letters help. One recognized certification you actually use
          beats three obscure ones on a resume. Put the money toward CAMS, or the CFE if your path
          is broader.
        </p>
      </Section>

      <p className="mt-10 border-t border-border pt-6">
        Early in an AML career in Canada? Get CAMS when you or your employer can fund it, consider
        the CFE if you want range, and ignore the rest until a specific job asks for something
        specific. The credential matters less than the work — but the right one, at the right
        time, gets you in the room.
      </p>

      <p className="mt-6 text-sm text-muted">Last reviewed: July 2026</p>
    </div>
  );
}
