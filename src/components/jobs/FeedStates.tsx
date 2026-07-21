// Presentational states for the jobs page. Each is deliberately designed
// (requirements §4/§6: empty, stale, and error states are first-class, not
// defaulted) and none is a broken page.

const noteClass =
  'mt-3 rounded-md border px-3 py-2 text-sm';

export function StaleNote() {
  return (
    <p className={`${noteClass} border-warning/40 text-warning`} role="status">
      This feed may be stale — the latest update is more than 36 hours old.
    </p>
  );
}

export function CacheNote() {
  return (
    <p className={`${noteClass} border-border text-muted`} role="status">
      Couldn't reach the live feed — showing the last version loaded on this device.
    </p>
  );
}

function CenteredMessage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-12 text-center">
      <p className="text-lg font-medium">{title}</p>
      <p className="mx-auto mt-2 max-w-prose text-sm text-muted">{children}</p>
    </div>
  );
}

export function JobsLoading() {
  return (
    <p className="text-sm text-muted" role="status">
      Loading roles…
    </p>
  );
}

export function FeedError() {
  return (
    <CenteredMessage title="Couldn't load the jobs feed">
      Something went wrong fetching the latest roles and there's no saved copy on
      this device yet. Please refresh in a moment.
    </CenteredMessage>
  );
}

export function FeedUpdating() {
  return (
    <CenteredMessage title="The feed is updating">
      The jobs feed is being upgraded. This page will show roles again once it's
      back on a version we recognise — please check back shortly.
    </CenteredMessage>
  );
}

export function NoJobs() {
  return (
    <CenteredMessage title="No roles are open right now">
      This feed lists only positions that are currently open, so it's empty
      between postings. New AML and financial-crime roles appear here as banks
      publish them.
    </CenteredMessage>
  );
}

export function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <CenteredMessage title="No roles match your filters">
      Try a broader search or a different company or level.
      <br />
      <button
        type="button"
        onClick={onClear}
        className="mt-3 inline-block rounded-md border border-border px-3 py-1.5 text-sm text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Clear filters
      </button>
    </CenteredMessage>
  );
}
