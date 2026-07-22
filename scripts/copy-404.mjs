// Cloudflare Pages serves /404.html (with a 404 status) for any path that
// matches no static asset and no _redirects rule. Copying the built index.html
// gives that fallback the correct hashed asset references, so unknown URLs boot
// the SPA — which renders the NotFound route — under a real 404. Keeping it a
// copy of index.html means it needs no inline styles, so the strict CSP holds.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('copied dist/index.html -> dist/404.html');
