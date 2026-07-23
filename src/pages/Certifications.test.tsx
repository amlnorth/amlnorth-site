import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Certifications from './Certifications';

describe('Certifications page', () => {
  it('renders the four credential sections under a single h1', () => {
    render(<Certifications />);
    expect(screen.getByRole('heading', { level: 1, name: 'Certifications' })).toBeInTheDocument();
    for (const name of [/^CAMS —/, /^CAMS-FCI/, /^CFE/, /CPAML/]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });

  it('keeps the pills as in-page section anchors', () => {
    render(<Certifications />);
    for (const [label, id] of [
      ['CAMS', '#cams'],
      ['CAMS-FCI', '#cams-fci'],
      ['CFE', '#cfe'],
      ['CPAML', '#cpaml'],
    ] as const) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', id);
    }
  });

  it('links each credential to its official body in a new tab (jobs-page pattern)', () => {
    render(<Certifications />);
    const acams = screen.getAllByRole('link', { name: /ACAMS/ });
    expect(acams).toHaveLength(2); // CAMS + CAMS-FCI
    expect(screen.getByRole('link', { name: /ACFE/ })).toHaveAttribute('href', 'https://www.acfe.com');
    for (const link of [...acams, screen.getByRole('link', { name: /ACFE/ })]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
    expect(acams[0]).toHaveAttribute('href', 'https://www.acams.org');
  });

  it('gives CPAML no outbound link', () => {
    render(<Certifications />);
    const cpaml = screen.getByRole('region', { name: /CPAML/ });
    expect(within(cpaml).queryByRole('link')).toBeNull();
  });

  it('carries no cost figures anywhere', () => {
    render(<Certifications />);
    expect(document.body.textContent).not.toContain('$');
  });

  it('shows a last-reviewed line', () => {
    render(<Certifications />);
    expect(screen.getByText(/Last reviewed: July 2026/)).toBeInTheDocument();
  });
});
