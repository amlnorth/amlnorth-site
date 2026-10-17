import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { LangToggle } from './components/LangToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { chromeContent } from './content/chrome';
import { useRouteMeta } from './hooks/useRouteMeta';
import { LangContext } from './lib/i18n';
import { pageFor } from './lib/seo';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Studio from './pages/Studio';
import Certifications from './pages/Certifications';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  useRouteMeta();
  // French pages are the /fr routes in the SEO table; anything else —
  // including an unknown /fr/… path, which gets the English 404 — is English.
  const lang = pageFor(useLocation().pathname)?.lang ?? 'en';
  const chrome = chromeContent[lang];

  return (
    <LangContext.Provider value={lang}>
      <div className="min-h-screen bg-bg font-sans text-fg">
        <header className="border-b border-border">
          <div className="flex items-center justify-between gap-4 p-4">
            <nav aria-label={chrome.navLabel}>
              <ul className="flex flex-wrap gap-4">
                {chrome.nav.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} end={to === '/fr'} className="text-sm text-accent">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/fr" element={<Home />} />
            <Route path="/fr/studio" element={<Studio />} />
            <Route path="/fr/certifications" element={<Certifications />} />
            <Route path="/fr/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </LangContext.Provider>
  );
}
