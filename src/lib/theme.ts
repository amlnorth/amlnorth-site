// Theme is driven entirely by the `color-scheme` property: the token family
// (src/styles/tokens.css) resolves every color through light-dark(), so
// flipping color-scheme on <html> flips the whole site. No `dark:` variants,
// no inline <style>/<script> — which keeps the strict self-only CSP intact.

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'amlnorth:theme';

export function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** The theme actually in effect: an explicit choice, else the OS preference. */
export function effectiveTheme(): Theme {
  return storedTheme() ?? systemTheme();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage disabled — the choice just won't persist across reloads.
  }
  applyTheme(theme);
}

/**
 * Apply a stored preference before first paint (called from main.tsx). With no
 * stored preference, color-scheme is left at its default (`light dark`), so
 * prefers-color-scheme governs and there is no flash.
 */
export function initTheme(): void {
  const theme = storedTheme();
  if (theme) applyTheme(theme);
}
