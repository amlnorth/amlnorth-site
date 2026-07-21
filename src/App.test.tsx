import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const routes: Array<[path: string, heading: string]> = [
  ['/', 'AML North'],
  ['/jobs', 'Jobs'],
  ['/studio', 'Report Studio, by AML North'],
  ['/certifications', 'Certifications'],
  ['/legal', 'Terms & Privacy'],
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
});
