import { useEffect, useState } from 'react';
import { applyTheme, effectiveTheme, setTheme, type Theme } from '../lib/theme';

const icons: Record<Theme, string> = {
  // Filled circle (sun) shown in dark mode → click to go light.
  dark: 'M12 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  // Crescent (moon) shown in light mode → click to go dark.
  light: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
};

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(() => effectiveTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        setThemeState(next);
      }}
      aria-label={`Switch to ${next} theme`}
      className="rounded-md border border-border p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={icons[theme]} />
      </svg>
    </button>
  );
}
