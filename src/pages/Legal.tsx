import { legalContent } from '../content/legal';
import { useContent } from '../lib/i18n';

export default function Legal() {
  const t = useContent(legalContent);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">{t.heading}</h1>
      <p className="mt-4 text-muted">{t.intro}</p>

      <div className="mt-8 grid gap-6 text-base">
        {t.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-medium">{section.heading}</h2>
            <p className="mt-2 text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
