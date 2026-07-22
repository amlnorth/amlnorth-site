import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">
        That page doesn't exist. It may have moved, or the link may be wrong.
      </p>
      <p className="mt-6">
        <Link to="/" className="text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
