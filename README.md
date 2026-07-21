# AML North — amlnorth.ca

The umbrella site for **AML North**: a Canada-first AML / financial-crime
portfolio carrying three assets — a live **jobs feed** (the anchor),
**Report Studio** (the product, at studio.amlnorth.ca), and a
**certifications guide**.

## Architecture

No backend. Static hosting plus one static JSON fetch:

```
job-aggregator repo (GitHub Actions, twice daily)
        │  scrapes bank career sites, filters to AML relevance
        ▼
public/jobs.json + public/jobs-meta.json   (committed into this repo)
        │
        ▼
Cloudflare Pages build (Vite) ──► amlnorth.ca, /jobs fetches the JSON client-side
```

- **`public/jobs.json`** — the feed: `schemaVersion` + currently-open jobs.
  Written by the aggregator's publish step; only committed when the job list
  actually changes.
- **`public/jobs-meta.json`** — `generatedAt` (and job count) from the latest
  aggregator run, committed every run so freshness stays honest. Keeping it
  out of `jobs.json` is what lets unchanged feeds skip a commit.
- The full contract lives in [docs/requirements.md](docs/requirements.md) §3.
  It is versioned (`schemaVersion`) and shared with the
  [job-aggregator](https://github.com/amlnorth/job-aggregator) repo — changes
  are spec-first.

Stack: React 18 · TypeScript (strict) · Vite · Tailwind CSS v4 ·
react-router · Vitest. Theme tokens live in
[src/styles/tokens.css](src/styles/tokens.css) and are the shared token
family for the amlnorth.ca / Report Studio product line.

## Development

```sh
npm install
npm run dev       # local dev server
npm test          # Vitest, single run
npm run build     # type-check + production build → dist/
```

Node 22 (`.nvmrc`).

## Deployment — Cloudflare Pages

The repo side is ready: build is plain Vite (`npm run build` → `dist/`),
`public/_redirects` provides the SPA fallback (serve `index.html` for
client-side routes like `/jobs` so a deep link or refresh resolves instead
of 404ing), and `public/_headers` sets caching and CORS for the feed.

### One-time dashboard setup (manual)

Do these in the Cloudflare dashboard — they cannot be done from the repo:

1. **Create the Pages project**: Cloudflare dashboard → *Workers & Pages* →
   *Create* → *Pages* → *Connect to Git* → authorize GitHub if prompted →
   select **`amlnorth/amlnorth-site`**.
2. **Build settings** on the setup screen:
   - Production branch: `main`
   - Framework preset: `Vite` (or None — the values below are what matter)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: none required. Node version is picked up from
     `.nvmrc`; if the build image ignores it, set `NODE_VERSION` = `22`.
3. **Save and Deploy**, then note the assigned **`*.pages.dev`** URL
   (e.g. `amlnorth-site.pages.dev`). **That URL is the working address until
   launch** — the amlnorth.ca / amlnorth.com zones stay empty by design until
   the launch gates in docs/requirements.md §6 clear.

### At launch (not now — gated by requirements §6)

4. Pages project → *Custom domains* → add `amlnorth.ca` (and `www` if
   wanted); Cloudflare creates the DNS records in the zone.
5. In the **amlnorth.com** zone, add a Redirect Rule (or Bulk Redirect):
   `amlnorth.com/*` → `https://amlnorth.ca/$1`, 301, preserve path.
6. Confirm HTTPS everywhere and that `studio.amlnorth.ca` (deployed from the
   Report Studio repo) resolves.

## Repos in the family

| Repo | Role |
|---|---|
| `amlnorth/amlnorth-site` | This site — amlnorth.ca |
| `amlnorth/job-aggregator` | Scrapes bank career sites twice daily, publishes `jobs.json` here via its Actions workflow (uses a fine-grained PAT scoped to this repo) |
| Report Studio | The product — studio.amlnorth.ca, its own repo and deploy |
