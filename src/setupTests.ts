import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// This config doesn't enable Vitest `globals`, so Testing Library's automatic
// per-test cleanup isn't registered — do it here, or renders stack in one DOM.
afterEach(() => cleanup());
