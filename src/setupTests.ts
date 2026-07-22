import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// This config doesn't enable Vitest `globals`, so Testing Library's automatic
// per-test cleanup isn't registered — do it here, or renders stack in one DOM.
afterEach(() => cleanup());

// jsdom has no matchMedia; the theme toggle reads it. Default to light.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  })) as unknown as typeof window.matchMedia;
}
