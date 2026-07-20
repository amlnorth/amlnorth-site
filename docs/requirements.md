AML North — Website Requirements (v1)
Domain: amlnorth.ca (canonical) · amlnorth.com (301 redirect)
Author: Salman Zaman · Date: July 2026 · Status: Draft for build
---
1. What this is
The umbrella site for AML North: a Canada-first AML/financial-crime portfolio site
carrying three assets — a live jobs feed (the anchor), Report Studio (the
product, at studio.amlnorth.ca), and a certifications guide. Framing per prior
decisions: portfolio first, revenue optional, consulting anchor later. The site
must read as the work of a senior engineer who ships: fast, clean, honest, no filler.
Non-goals (v1)
❌ News feed (v1.1 — headline + source + outbound link only, when it comes)
❌ Accounts, saved searches, email alerts, job-detail pages
❌ Blog/CMS machinery (story-library articles come later as static pages)
❌ Any backend. Static hosting only; the jobs feed is a static JSON asset.
2. Architecture
Separate repos, same domain family (decided): `amlnorth-site` (this repo) at
amlnorth.ca; Report Studio stays in its own repo, deployed to studio.amlnorth.ca.
Site stack: React 18 + TypeScript + Vite + Tailwind, static deploy
(Cloudflare Pages or Azure Static Web Apps — pick in session 1 and configure both
domains + the .com redirect there). Borrow Report Studio's Tailwind theme tokens
so the family reads as one product line; do not import Studio code.
Jobs data flow: the existing aggregator repo's GitHub Actions run (already
twice daily) gains a publish step that writes `jobs.json` to a static, CORS-open
URL (its own gh-pages branch, or the site repo via automated commit, or an R2/
Pages asset — decide in session 1; prefer the option that keeps the aggregator
repo self-contained). The site fetches it client-side at load.
3. The jobs.json contract
The interface between two repos — version it from day one.
```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-07-18T11:00:00Z",
  "jobs": [
    {
      "id": "stable-hash-of-source+req-id",
      "title": "Senior Manager, AML Technology",
      "company": "BMO",
      "location": "Toronto, ON",
      "workModel": "hybrid | remote | onsite | null",
      "seniority": "analyst | senior | manager | director | null",
      "postedAt": "2026-07-17T14:00:00Z or null",
      "firstSeenAt": "2026-07-17T18:00:00Z",
      "url": "https://…direct outbound link…",
      "source": "workday-bmo | lever-wealthsimple | phenom-rbc | …"
    }
  ]
}
```
Contract rules:
`firstSeenAt` is the aggregator's own observation time and is ALWAYS present;
`postedAt` is the source's claim and may be null. The UI shows freshness from
`postedAt` when present, else `firstSeenAt` ("first seen 4 hours ago") —
freshness is the differentiator; make it prominent and honest.
`id` must be stable across runs (dedupe key). Jobs absent from a run are dropped
from the file (the feed is "currently open", not an archive).
Filter server-side (in the Action) to AML/compliance/financial-crime relevance —
the site renders what it's given, no client-side relevance logic.
Unknown fields tolerated (forward compatibility); `schemaVersion` bumps on
breaking change, and the site shows a graceful "feed updating" state on mismatch.
4. Pages (v1)
Home — hero: what AML North is (one paragraph, plain language), three cards
(Jobs / Report Studio / Certifications), a short "who built this" with LinkedIn +
GitHub links. No stock imagery, no testimonial theater.
Jobs (`/jobs`) — the anchor page. Fast list: title, company, location, work
model, freshness badge, outbound link (new tab, `rel="noopener"`). Client-side
filters: text search + company + region + seniority — filters over the loaded
JSON only, nothing fancier (scope guard from prior decision stands). Header line:
"Updated twice daily from bank career sites" + `generatedAt` rendered as "as of".
Empty/stale states designed (generatedAt > 36h old → show a "feed may be stale"
note; fetch failure → cached-if-available message, no broken page).
Report Studio (`/studio`) — one explainer page: what it does, the privacy
sentence ("everything stays in your browser"), screenshots, and the button to
studio.amlnorth.ca. Public product title everywhere: "Report Studio, by AML
North" (per trademark diligence).
Certifications (`/certifications`) — the authored insider page: CAMS /
CAMS-FCI / CFE / CPAML, costs in CAD, what Canadian banks actually ask for.
AUTHORSHIP task: Salman writes, Claude formats. Ships as "coming soon" card on
Home if unwritten at launch — do not let it block v1.
Terms & privacy (`/legal`) — short and honest: portfolio/informational site;
jobs link out to original postings, no affiliation with listed employers; no
analytics beyond privacy-respecting page counts (if any — Plausible/Cloudflare
Analytics class, never ad-tech); Report Studio's no-data-leaves-browser promise
restated with a link to its own page; not legal advice.
5. Design requirements
Same bar as the Studio's §5, one line: Linear/Stripe-grade restraint — strong type
hierarchy, generous whitespace, light+dark, the Studio's token family, WCAG 2.1 AA,
mobile-first for the jobs page specifically (job-checking is a phone habit —
the list must be excellent at 390px). Lighthouse ≥95 on the jobs page; the whole
site should weigh almost nothing (no heavy libraries — this is four pages and a
JSON fetch).
6. Launch gates (non-negotiable, before DNS points anywhere public)
BMO employment agreement read (IP assignment / moonlighting) — carried from
Phase A, twice deferred, now blocking. A public AML site under Salman's name is
the most visible artifact yet.
Studio deployed to studio.amlnorth.ca — the site's DoD includes "Studio
reachable," which pulls the Studio's deploy pipeline (GitHub Actions → static
host, its Phase-A leftover) into scope. The Studio's design-polish pass is NOT
a gate — ship it as it stands, polish later.
Domain wiring: amlnorth.ca canonical, amlnorth.com → 301, studio subdomain,
HTTPS everywhere.
7. Definition of done (v1)
Live at amlnorth.ca · hero + 3 cards · jobs feed auto-updating twice daily with
freshness visible · Report Studio reachable at studio.amlnorth.ca with the site
page linking it · legal page · mobile-responsive · repo public with a README that
explains the static-JSON architecture (the repo is part of the portfolio).
8. Session plan (Claude Code)
S1 — Skeleton + pipeline: site repo bootstrap (Vite/TS/Tailwind + Studio
tokens), routing, deploy to chosen host with both domains configured (behind a
holding page until gates clear), and the aggregator repo's publish step emitting
jobs.json per §3 contract with a schema test in the aggregator's CI.
S2 — Jobs page: the list, filters, freshness logic, empty/stale/error states,
mobile pass, Lighthouse check.
S3 — Home, Studio page, legal + Studio deploy: remaining pages; wire the
Studio repo's own Actions deploy to studio.amlnorth.ca; retitle the Studio's
public-facing strings to "Report Studio, by AML North" (title, home header, PDF
cover "Prepared with" line — content files only, no logic).
S4 — Polish + launch: dark mode, a11y pass, README-as-portfolio, 404, favicon/
OG tags, then gates check → DNS live.
Certifications content rides whenever written; news feed is v1.1; story-library
pages join as static content in a later phase per the standing plan.