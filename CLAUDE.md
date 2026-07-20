# CLAUDE.md — AML North site

Static portfolio site for amlnorth.ca. Read docs/requirements.md before
any feature work — it defines scope, the jobs.json contract, and launch gates.

## Principles
1. No backend, ever. Static hosting + one static JSON fetch. If a feature
   seems to need a server, it's out of scope — stop and say so.
2. The jobs.json contract (requirements §3) is versioned and shared with a
   separate repo. Never change it casually; contract changes are decisions
   for Salman, spec-first.
3. Scope guards are decisions, not suggestions: no accounts, no alerts, no
   news feed, no job-detail pages, no CMS. Don't build parked items even
   if adjacent work makes them tempting.
4. Lightweight is a feature: no heavy dependencies for a four-page site.
   Justify anything beyond React/Tailwind basics.
5. Design bar: Linear/Stripe restraint, Studio's token family, WCAG 2.1 AA,
   mobile-first on /jobs. Lighthouse ≥95 there.
6. Public repo = part of the portfolio. Commit messages, README, and code
   quality are audience-facing.