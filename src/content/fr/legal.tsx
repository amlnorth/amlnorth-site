import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../../lib/site';
import type { LegalContent } from '../types';

export const legal: LegalContent = {
  heading: 'Conditions et confidentialité',
  intro: 'Court et honnête. Dernière mise à jour : octobre 2026.',
  sections: [
    {
      heading: "Ce qu'est ce site",
      body: (
        <>
          AML North est un site personnel de portfolio, à vocation informative. Ce n'est ni un
          recruteur, ni un employeur, ni un service de conformité.
        </>
      ),
    },
    {
      heading: "Le fil d'emplois",
      body: (
        <>
          Les offres d'emploi renvoient aux affichages originaux, sur les sites carrières des
          employeurs eux-mêmes. AML North n'a aucun lien avec les employeurs affichés et n'a
          l'appui d'aucun d'entre eux. Les offres sont recueillies automatiquement et peuvent être
          périmées — vérifiez toujours les détails dans l'affichage original.
        </>
      ),
    },
    {
      heading: 'Report Studio',
      body: (
        <>
          Tout ce que vous saisissez dans{' '}
          <Link to="/fr/studio" className="text-accent">
            Report Studio
          </Link>{' '}
          reste dans votre navigateur; rien n'est jamais transmis à AML North ni à qui que ce soit.
        </>
      ),
    },
    {
      heading: "Mesure d'audience",
      body: (
        <>
          Si une mesure d'audience est utilisée, elle se limite à des décomptes de pages agrégés et
          respectueux de la vie privée. Aucune technologie publicitaire, aucun pistage intersite,
          et rien qui soit lié à vous personnellement.
        </>
      ),
    },
    {
      heading: "Ceci n'est pas un avis",
      body: (
        <>
          Rien ici ne constitue un avis juridique, financier ou en matière de conformité. Report
          Studio aide à préparer des déclarations; il ne les soumet pas, et vous demeurez
          responsable de leur exactitude et de leur transmission.
        </>
      ),
    },
    {
      heading: 'Contact',
      body: (
        <>
          Les questions sur la commandite ou les services-conseils, tout comme vos commentaires sur
          le fil d'emplois ou sur Report Studio, sont les bienvenues à{' '}
          <a href={CONTACT_MAILTO} className="text-accent">
            {CONTACT_EMAIL}
          </a>
          .
        </>
      ),
    },
  ],
};
