import { useEffect, useState } from 'react';
import { loadFeed, type FeedResult } from '../lib/feed';

export type FeedState = FeedResult | { status: 'loading' };

/**
 * Fetch the jobs feed once on mount; aborts in flight on unmount. With an
 * `initial` result (the prerendered page's build-time feed) it starts there
 * instead of "loading", then replaces it with the live fetch as usual.
 */
export function useJobsFeed(initial?: FeedResult): FeedState {
  const [state, setState] = useState<FeedState>(initial ?? { status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    loadFeed(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setState(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' });
      });
    return () => controller.abort();
  }, []);

  return state;
}
