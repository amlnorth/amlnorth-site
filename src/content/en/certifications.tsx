import { SourceLink, Strong } from '../../components/prose';
import type { CertificationsContent } from '../types';

export const certifications: CertificationsContent = {
  intro:
    "The AML field is full of acronyms you can pay to put after your name. A few genuinely move hiring decisions at Canadian banks; several are resume filler that cost real money and change nothing. This page is the honest version of that conversation — what each credential is, where it lands with employers here, and which ones I'd skip. I've left the fees off on purpose: pricing changes and each body lists its own current, personalized numbers better than I could keep a table accurate. What you'll find here instead is the part you can't look up — a practitioner's read on what's actually worth your time and professional-development budget.",
  disclaimer:
    'These are my own observations from working in the field, not official guidance from any certifying body, and not career or financial advice. For current fees, eligibility, and requirements, follow the links to each certifier.',
  jumpLabel: 'Jump to a credential',
  sections: [
    {
      id: 'cams',
      title: 'CAMS — Certified Anti-Money Laundering Specialist',
      body: (
        <>
          <p>
            <Strong>The one that matters most in Canada.</Strong> Issued
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
            <Strong>My take:</Strong> worth it if you're staying in AML
            and want the credential hiring managers recognize on sight. There's a real renewal
            treadmill, so get your employer to fund it if you can — most Canadian banks have a
            development budget that covers exactly this. It's the one that opens doors here.
          </p>
          <p>
            <SourceLink href="https://www.acams.org">Current requirements and fees: ACAMS</SourceLink>
          </p>
        </>
      ),
    },
    {
      id: 'cams-fci',
      title: 'CAMS-FCI — CAMS Financial Crimes Investigations',
      body: (
        <>
          <p>
            <Strong>The specialist step-up, and only after CAMS.</Strong>{' '}
            Also from ACAMS, CAMS-FCI is a separate, advanced credential built specifically around
            running financial-crime investigations — building a case, following the money,
            documenting it. CAMS first; this builds on it.
          </p>
          <p>
            <Strong>My take:</Strong> niche, and only worth it if
            investigations are literally your job — FIU analyst, financial-crime investigator, an
            EDD role that's really casework. If you're in reporting, model validation, or
            compliance-program work, it won't change your prospects and the money's better spent
            elsewhere. Don't collect it just to have it.
          </p>
          <p>
            <SourceLink href="https://www.acams.org">Details: ACAMS</SourceLink>
          </p>
        </>
      ),
    },
    {
      id: 'cfe',
      title: 'CFE — Certified Fraud Examiner',
      body: (
        <>
          <p>
            <Strong>Broader than AML, and respected outside it.</Strong>{' '}
            Issued by the ACFE, the CFE covers fraud generally — financial-statement fraud,
            corruption, investigation technique, the legal side. Not being AML-specific is exactly
            why it travels: fraud, internal audit, forensic accounting, and law enforcement all
            recognize it. It requires ACFE membership, a degree plus relevant experience, and
            ongoing continuing education to maintain. (Worth noting the exam structure was set to
            change around 2026 — check the current format before buying study materials.)
          </p>
          <p>
            <Strong>My take:</Strong> the most versatile credential here.
            If you might move between AML, fraud, and broader financial-crime or audit roles — or
            you want something not tied to a single regulator — the CFE is a strong bet. In a pure
            AML lane at a Canadian bank, CAMS still edges it for name recognition, but the CFE is
            the one I'd pair it with if I were building a financial-crime career rather than a
            compliance one.
          </p>
          <p>
            <SourceLink href="https://www.acfe.com">Current requirements and fees: ACFE</SourceLink>
          </p>
        </>
      ),
    },
    {
      id: 'cpaml',
      title: 'CPAML / the "nice to have, rarely asked for" tier',
      body: (
        <>
          <p>
            There's a long tail of AML credentials — CPAML and various institute- or
            vendor-specific certificates among them. Some are legitimately educational; few are
            things Canadian bank hiring managers screen for.
          </p>
          <p>
            <Strong>My honest take:</Strong> I've never seen a Canadian
            AML posting require one of these, and rarely seen one list it as an asset. If your
            employer offers it free, or it's bundled with training you're doing anyway, fine —
            learning is learning. But don't pay out of pocket for a credential nobody's asking for
            on the theory that more letters help. One recognized certification you actually use
            beats three obscure ones on a resume. Put the money toward CAMS, or the CFE if your path
            is broader.
          </p>
        </>
      ),
    },
  ],
  closing:
    'Early in an AML career in Canada? Get CAMS when you or your employer can fund it, consider the CFE if you want range, and ignore the rest until a specific job asks for something specific. The credential matters less than the work — but the right one, at the right time, gets you in the room.',
  lastReviewed: 'Last reviewed: July 2026',
};
