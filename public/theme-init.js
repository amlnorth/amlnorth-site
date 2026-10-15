// Apply a stored light/dark choice before first paint. Prerendered pages paint
// before the app bundle (a deferred module) runs, so without this a visitor
// whose saved choice differs from their OS theme would see a flash. It's an
// external same-origin file, not inline, so the strict CSP holds. Mirrors
// storedTheme()/applyTheme() in src/lib/theme.ts — keep the key in sync.
try {
  var theme = localStorage.getItem('amlnorth:theme');
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.style.colorScheme = theme;
  }
} catch (e) {
  // Storage unavailable: the OS preference governs, as in theme.ts.
}
