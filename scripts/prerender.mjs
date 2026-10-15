// Prerender every route into static HTML after `vite build`. Uses the SSR
// bundle of src/entry-server.tsx (built to dist-server/) and the client's
// built dist/index.html as the template, so asset hashes are already correct.
//
// Output, matching Cloudflare Pages' routing (/jobs.html is served at /jobs):
//   dist/index.html, jobs.html, studio.html, certifications.html, legal.html
//   dist/404.html   — served with a real 404 status for unknown paths
//   dist/sitemap.xml
// /jobs embeds public/jobs.json as of this build; every feed push triggers a
// Pages rebuild, so the static list tracks the feed.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { PAGES, renderPage, renderSitemap } = await import(
  pathToFileURL('dist-server/entry-server.js').href
);

const template = readFileSync('dist/index.html', 'utf8');
const feed = JSON.parse(readFileSync('dist/jobs.json', 'utf8'));
const meta = JSON.parse(readFileSync('dist/jobs-meta.json', 'utf8'));
const renderedAt = new Date().toISOString();

for (const page of PAGES) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  const data = page.path === '/jobs' ? { jobs: { feed, meta, renderedAt } } : {};
  writeFileSync(`dist/${file}`, renderPage(template, page.path, data));
  console.log(`prerendered ${page.path} -> dist/${file}`);
}

writeFileSync('dist/404.html', renderPage(template, '404'));
console.log('prerendered 404 -> dist/404.html');

writeFileSync('dist/sitemap.xml', renderSitemap(feed));
console.log('wrote dist/sitemap.xml');

rmSync('dist-server', { recursive: true, force: true });
