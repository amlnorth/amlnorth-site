import type { Seniority } from '../../lib/jobs';

export interface FilterValues {
  query: string;
  company: string;
  seniority: string;
}

export interface FilterOptions {
  companies: string[];
  seniorities: Array<Exclude<Seniority, null>>;
  hasUnspecifiedSeniority: boolean;
}

const selectClass =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

/**
 * Client-side filters over the loaded feed only (requirements §4): text search
 * + company + seniority. No work-model filter — workModel is null across every
 * current source. Location is covered by the text search rather than a
 * dedicated region filter (source location strings aren't clean enough to
 * group reliably — e.g. "Toronto, ON, CAN" vs "TORONTO, Ontario, Canada").
 */
export function JobFilters({
  values,
  options,
  onChange,
}: {
  values: FilterValues;
  options: FilterOptions;
  onChange: (next: FilterValues) => void;
}) {
  return (
    <form role="search" onSubmit={(event) => event.preventDefault()} className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <div>
        <label htmlFor="job-search" className="sr-only">
          Search roles by title, company, or location
        </label>
        <input
          id="job-search"
          type="search"
          value={values.query}
          onChange={(event) => onChange({ ...values, query: event.target.value })}
          placeholder="Search title, company, location"
          className={selectClass}
        />
      </div>

      <div>
        <label htmlFor="filter-company" className="sr-only">
          Filter by company
        </label>
        <select
          id="filter-company"
          value={values.company}
          onChange={(event) => onChange({ ...values, company: event.target.value })}
          className={selectClass}
        >
          <option value="">All companies</option>
          {options.companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-seniority" className="sr-only">
          Filter by seniority
        </label>
        <select
          id="filter-seniority"
          value={values.seniority}
          onChange={(event) => onChange({ ...values, seniority: event.target.value })}
          className={selectClass}
        >
          <option value="">All levels</option>
          {options.seniorities.map((seniority) => (
            <option key={seniority} value={seniority} className="capitalize">
              {seniority[0].toUpperCase() + seniority.slice(1)}
            </option>
          ))}
          {options.hasUnspecifiedSeniority && <option value="unspecified">Unspecified</option>}
        </select>
      </div>
    </form>
  );
}
