import { useEffect, useState } from 'react';
import { loadFeed, type FeedResult } from '../lib/feed';

export type FeedState = FeedResult | { status: 'loading' };

/** Fetch the jobs feed once on mount; aborts in flight on unmount. */
export function useJobsFeed(): FeedState {
  const [state, setState] = useState<FeedState>({ status: 'loading' });

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
