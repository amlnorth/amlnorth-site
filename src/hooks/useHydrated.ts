import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * false while rendering on the server and during hydration; true afterwards
 * (and immediately on any client-only mount). Anything that depends on the
 * visitor's browser — their clock, locale, timezone, stored theme — must wait
 * for true, or the hydrated markup wouldn't match the prerendered HTML.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
