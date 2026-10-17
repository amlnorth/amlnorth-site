import type { ReactNode } from 'react';
import { certificationsContent } from '../content/certifications';
import { useContent } from '../lib/i18n';

const pills = [
  { id: 'cams', label: 'CAMS' },
  { id: 'cams-fci', label: 'CAMS-FCI' },
  { id: 'cfe', label: 'CFE' },
  { id: 'cpaml', label: 'CPAML' },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2 id={id} className="scroll-mt-6 text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

export default function Certifications() {
  const t = useContent(certificationsContent);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Certifications</h1>

      <p className="mt-4 text-muted">{t.intro}</p>

      <blockquote className="mt-4 border-l-2 border-border pl-4 text-sm text-muted">
        {t.disclaimer}
      </blockquote>

      <nav aria-label={t.jumpLabel} className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <li key={pill.id}>
              <a
                href={`#${pill.id}`}
                className="inline-block rounded-sm border border-border px-2.5 py-1 text-sm text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {pill.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {t.sections.map((section) => (
        <Section key={section.id} id={section.id} title={section.title}>
          {section.body}
        </Section>
      ))}

      <p className="mt-10 border-t border-border pt-6">{t.closing}</p>

      <p className="mt-6 text-sm text-muted">{t.lastReviewed}</p>
    </div>
  );
}
