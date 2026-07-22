import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => localStorage.clear());
afterEach(() => {
  document.documentElement.style.colorScheme = '';
});

describe('ThemeToggle', () => {
  it('defaults to the system theme (light in jsdom) and toggles to dark', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'Switch to dark theme' });

    fireEvent.click(button);

    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(localStorage.getItem('amlnorth:theme')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
  });

  it('reads an explicit stored preference on mount', () => {
    localStorage.setItem('amlnorth:theme', 'dark');
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });
});
