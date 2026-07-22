import { NavLink, Route, Routes } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Studio from './pages/Studio';
import Certifications from './pages/Certifications';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/studio', label: 'Report Studio' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/legal', label: 'Terms & Privacy' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-bg font-sans text-fg">
      <header className="border-b border-border">
        <div className="flex items-center justify-between gap-4 p-4">
          <nav aria-label="Main">
            <ul className="flex flex-wrap gap-4">
              {nav.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className="text-sm text-accent">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
