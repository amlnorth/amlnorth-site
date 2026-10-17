import type { ReactNode } from 'react';
import { chromeContent } from '../content/chrome';
import { useContent } from '../lib/i18n';

// Small inline building blocks for page copy kept in src/content/, so the
// content files can carry emphasis and links without repeating classes.

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold">{children}</strong>;
}

/** Outbound source link, matching the jobs page's pattern (new tab, noopener). */
export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  const { newTab } = useContent(chromeContent);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only">{` ${newTab}`}</span>
    </a>
  );
}
