import type { StudioContent } from '../types';

// Report names are CANAFE's own (see docs/french-review.md). The codes stay
// in English because they are what the English-only app shows.
export const studio: StudioContent = {
  intro:
    "Report Studio prépare vos déclarations à CANAFE dans votre navigateur. Suivez un assistant guidé, obtenez une validation en direct selon les règles de CANAFE au fil de la saisie, puis exportez un PDF propre — sans que vos données quittent votre appareil.",
  availability:
    "Report Studio est offert en anglais seulement pour l'instant. Cette page le présente en français, mais l'outil lui-même — écrans, messages et PDF — est en anglais.",
  reportsHeading: 'Types de déclarations',
  reports: [
    { code: 'LCTR', name: "Déclaration d'opérations importantes en espèces" },
    { code: 'EFTR', name: 'Déclaration de télévirements' },
    { code: 'STR', name: "Déclaration d'opérations douteuses" },
    { code: 'LVCTR', name: "Déclaration d'opérations importantes en monnaie virtuelle" },
    { code: 'CDR', name: 'Déclaration de déboursement de casino' },
  ],
  privacyHeading: 'Confidentialité',
  privacyBody:
    "Tout ce que vous saisissez reste dans votre navigateur; rien n'est jamais transmis. Il n'y a ni compte, ni serveur, ni mesure d'audience sur les données de vos déclarations.",
  cta: 'Ouvrir Report Studio',
};
