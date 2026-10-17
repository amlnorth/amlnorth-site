import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const routes: Array<[path: string, heading: string]> = [
  ['/', 'AML North'],
  ['/jobs', 'Jobs'],
  ['/studio', 'Report Studio, by AML North'],
  ['/certifications', 'Certifications'],
  ['/legal', 'Terms & Privacy'],
  ['/fr', 'AML North'],
  ['/fr/studio', 'Report Studio, by AML North'],
  ['/fr/certifications', 'Certifications'],
  ['/fr/legal', 'Conditions et confidentialité'],
];

// The jobs page fetches on mount; keep the shell test offline so it exercises
// only routing. findByRole below flushes the resulting state update.
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline in test'))));
});
afterEach(() => vi.unstubAllGlobals());

describe('routing shell', () => {
  it.each(routes)('renders %s', async (path, heading) => {
    render(
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it.each([
    ['/', 'Email'],
    ['/legal', 'hello@amlnorth.ca'],
    ['/fr', 'Courriel'],
    ['/fr/legal', 'hello@amlnorth.ca'],
  ])('links the contact address from %s', async (path, name) => {
    render(
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('link', { name })).toHaveAttribute(
      'href',
      'mailto:hello@amlnorth.ca',
    );
  });

  it('switches language in-app via the EN / FR toggle, updating lang and hreflang', async () => {
    render(
      <MemoryRouter
        initialEntries={['/studio']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('link', { name: 'Lire cette page en français' }));

    expect(await screen.findByText(/offert en anglais seulement/)).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('fr-CA');
    const alternates = [...document.head.querySelectorAll('link[rel="alternate"][hreflang]')].map(
      (link) => `${link.getAttribute('hreflang')} ${link.getAttribute('href')}`,
    );
    expect(alternates).toEqual([
      'en-CA https://amlnorth.ca/studio',
      'fr-CA https://amlnorth.ca/fr/studio',
      'x-default https://amlnorth.ca/studio',
    ]);

    fireEvent.click(screen.getByRole('link', { name: 'Read this page in English' }));
    expect(await screen.findByText(/prepares FINTRAC reports/)).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en-CA');
  });

  it('hides the language toggle on /jobs', async () => {
    render(
      <MemoryRouter
        initialEntries={['/jobs']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>,
    );
    await screen.findByRole('heading', { level: 1, name: 'Jobs' });
    expect(screen.queryByRole('link', { name: /en français|in English/ })).toBeNull();
    expect(document.head.querySelector('link[rel="alternate"][hreflang]')).toBeNull();
  });

  it('renders the NotFound page for an unknown route', async () => {
    render(
      <MemoryRouter
        initialEntries={['/no-such-page']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument();
  });
});
