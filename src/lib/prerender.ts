import { createContext, useContext } from 'react';
import type { JobsFeed, JobsMeta } from './jobs';

/**
 * The jobs feed as it was at build time, embedded in the prerendered /jobs
 * page. The client hydrates from it — so the first render matches the static
 * HTML exactly — then fetches the live feed as before.
 */
export interface JobsSnapshot {
  feed: JobsFeed;
  meta: JobsMeta;
  /** ISO time the page was rendered; the "now" for relative dates until hydration. */
  renderedAt: string;
}

export interface PrerenderData {
  jobs?: JobsSnapshot;
}

/** id of the <script type="application/json"> data block carrying PrerenderData. */
export const PRERENDER_DATA_ID = 'prerender-data';

export const PrerenderContext = createContext<PrerenderData>({});

export function usePrerenderData(): PrerenderData {
  return useContext(PrerenderContext);
}

/** Read the embedded data block, if this page has one. */
export function readPrerenderData(doc: Document): PrerenderData {
  const raw = doc.getElementById(PRERENDER_DATA_ID)?.textContent;
  if (!raw) return {};
  try {
    return JSON.parse(raw) as PrerenderData;
  } catch {
    return {};
  }
}
