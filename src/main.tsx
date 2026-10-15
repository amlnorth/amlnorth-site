import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PrerenderContext, readPrerenderData } from './lib/prerender';
import { routeKey } from './lib/seo';
import { initTheme } from './lib/theme';
import './styles/index.css';

initTheme();

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <PrerenderContext.Provider value={readPrerenderData(document)}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </PrerenderContext.Provider>
  </StrictMode>
);

// Hydrate only markup that was prerendered for this URL (data-route is set at
// build time). Anything else — the dev server's empty shell, or a host that
// served a different page's HTML — gets a fresh client render instead.
if (container.dataset.route === routeKey(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
