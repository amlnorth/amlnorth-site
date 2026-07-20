import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

const routes: Array<[path: string, heading: string]> = [
  ['/', 'AML North'],
  ['/jobs', 'Jobs'],
  ['/studio', 'Report Studio, by AML North'],
  ['/certifications', 'Certifications'],
  ['/legal', 'Terms & Privacy'],
];

describe('routing shell', () => {
  it.each(routes)('renders %s', (path, heading) => {
    render(
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});
