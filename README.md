# AML North — amlnorth.ca

The umbrella site for **AML North**: a Canada-first AML / financial-crime
portfolio carrying three assets — a live **jobs feed** (the anchor),
**Report Studio** (a FINTRAC report preparer, at studio.amlnorth.ca), and a
**certifications guide**.

**Live:** https://amlnorth.ca *(launching; until DNS is cut over, the working
address is the project's `*.pages.dev` URL)*

It's a four-page static site with **no backend** — the jobs feed is a single
static JSON file, produced by a separate repo and fetched client-side. This
README explains that architecture, because the architecture is the point.

## Architecture: a static site fed by a cross-repo JSON contract

```
job-aggregator repo  ──(GitHub Actions, twice daily)──┐
  scrapes bank career sites, filters to AML relevance  │  pushes 2 files
                                                        ▼
                          amlnorth-site/public/jobs.json + jobs-meta.json
                                                        │
                          Cloudflare Pages build (Vite) ▼
                          amlnorth.ca — /jobs fetches the JSON at load
```

- **No server, ever.** Static hosting plus one static `fetch`. There is no API,
  no database, no auth.
- **`public/jobs.json`** — the feed: `schemaVersion` + the currently-open jobs.
  Written by the aggregator's publish step; committed only when the job list
  actually changes.
- **`public/jobs-meta.json`** — `generatedAt` + `jobCount`, committed every run
  so freshness stays honest while an unchanged feed skips the feed commit.
- The two repos share a **versioned contract** (`schemaVersion`), documented in
  [docs/requirements.md](docs/requirements.md) §3. The site tolerates unknown
  fields and shows a graceful "feed updating" state on a version it doesn't
  recognise, so the producer can move ahead without breaking the consumer.

Why this shape: a jobs feed that updates twice a day doesn't need a backend, and
not having one removes the entire operational surface (servers, secrets,
scaling, patching). The cost is pushed to build time and a static CDN.

## The freshness rule: never claim fresher than we can prove

Freshness is the feed's differentiator, so it's honest by construction. Sources
repost and refresh their dates — a job can claim it was "posted today" when we
first saw it three weeks ago. The badge logic
([src/lib/freshness.ts](src/lib/freshness.ts)) never shows a date newer than we
can defend:

- `postedAt` is the source's claim; `firstSeenAt` is our own observation and is
  always present.
- If `postedAt` is missing **or newer than** `firstSeenAt` (a repost), the badge
  shows `firstSeenAt` — "first seen 3 days ago".
- Otherwise it shows `postedAt` — "posted 2 days ago".

In every branch we show the older, provable timestamp. The rule is unit-tested,
including against a real reposted listing.

## Tech stack

React 18 · TypeScript (strict) · Vite · Tailwind CSS v4 · react-router ·
Vitest + Testing Library. No heavy dependencies — the whole site is a few pages
and a JSON fetch. Light/dark is driven entirely by design tokens
([src/styles/tokens.css](src/styles/tokens.css)) that resolve through CSS
`light-dark()`; a theme toggle flips `color-scheme` and the whole site follows.
The tokens are shared with Report Studio so the two read as one product line.

## Development

```sh
npm install
npm run dev      # local dev server
npm test         # Vitest, single run
npm run build    # type-check + production build → dist/
```

Node 22 (`.nvmrc`).

## Deployment — Cloudflare Pages

The repo is deploy-ready: `npm run build` emits `dist/`, and a strict,
self-only Content-Security-Policy plus caching/CORS for the feed live in
[public/_headers](public/_headers). Routing:

- `public/_redirects` rewrites the known client routes to the SPA shell (200).
- The build copies `index.html` → `404.html`, so any unknown path is served by
  Cloudflare with a real **404** (not a 200 with the app shell) while still
  booting into a styled "page not found".
- `public/robots.txt` and `public/sitemap.xml` are real static files.

### One-time dashboard setup (manual)

Do these in the Cloudflare dashboard — they cannot be done from the repo:

1. **Create the Pages project**: *Workers & Pages* → *Create* → *Pages* →
   *Connect to Git* → select **`amlnorth/amlnorth-site`**.
2. **Build settings**: production branch `main`, build command `npm run build`,
   output directory `dist`. Node comes from `.nvmrc`; if the image ignores it,
   set `NODE_VERSION` = `22`.
3. **Save and Deploy**, then note the assigned **`*.pages.dev`** URL — the
   working address until launch.

### At launch (gated by requirements §6)

4. Pages project → *Custom domains* → add `amlnorth.ca`.
5. In the **amlnorth.com** zone, add a 301 redirect to `https://amlnorth.ca/$1`.
6. Confirm HTTPS everywhere and that `studio.amlnorth.ca` resolves.

## Repos in the family

| Repo | Role |
|---|---|
| `amlnorth/amlnorth-site` | This site — amlnorth.ca |
| `amlnorth/job-aggregator` | Scrapes bank career sites twice daily; publishes `jobs.json` here via its Actions workflow |
| `amlnorth/report-studio` | Report Studio — studio.amlnorth.ca, its own repo and deploy |

Built by [Salman Zaman](https://www.linkedin.com/in/salmanzaman/).
