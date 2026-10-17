import type { HomeContent } from '../types';

export const home: HomeContent = {
  intro:
    "Un point d'ancrage canadien pour le travail en lutte contre le blanchiment d'argent et en criminalité financière. On y trouve un fil en direct des postes ouverts en lutte contre le blanchiment d'argent dans les banques canadiennes, Report Studio pour préparer vos déclarations à CANAFE dans le navigateur, et un guide des certifications qui comptent ici — le tout conçu et tenu à jour par un ingénieur qui travaille dans le domaine.",
  cards: [
    {
      title: 'Emplois',
      blurb:
        "Postes ouverts en lutte contre le blanchiment d'argent et en criminalité financière dans les banques canadiennes, actualisés deux fois par jour et datés honnêtement (« vu pour la première fois »).",
      to: '/jobs',
      cta: 'Parcourir le fil (en anglais)',
    },
    {
      title: 'Report Studio',
      blurb:
        "Préparez vos déclarations à CANAFE — opérations importantes en espèces, télévirements, opérations douteuses, monnaie virtuelle, déboursements de casino — entièrement dans votre navigateur. Rien de ce que vous saisissez n'est transmis.",
      to: '/fr/studio',
      cta: "Voir ce que fait l'outil",
    },
    {
      title: 'Certifications',
      blurb:
        "L'avis franc d'un praticien sur CAMS, CAMS-FCI, CFE et CPAML : quels titres les banques canadiennes valorisent vraiment, et lesquels laisser de côté.",
      to: '/fr/certifications',
      cta: 'Lire le guide',
    },
  ],
  whoHeading: 'Qui a bâti ce site',
  whoBody:
    "Conçu par Salman Zaman, ingénieur en technologie de lutte contre le blanchiment d'argent au Canada. Le site, l'agrégateur d'emplois et Report Studio sont tous développés en code ouvert.",
  emailLabel: 'Courriel',
};
