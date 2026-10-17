import { SourceLink, Strong } from '../../components/prose';
import type { CertificationsContent } from '../types';

// Certification names stay in English (they are the bodies' own titles). The
// "Mon avis" sections keep the English page's bluntness on purpose.
export const certifications: CertificationsContent = {
  intro:
    "Le milieu de la lutte contre le blanchiment d'argent (LBA) regorge d'acronymes qu'on peut payer pour ajouter après son nom. Quelques-uns pèsent vraiment dans les décisions d'embauche des banques canadiennes; plusieurs ne sont que du remplissage de CV qui coûte cher et ne change rien. Cette page, c'est la version honnête de cette conversation : ce qu'est chaque titre, comment il est perçu par les employeurs d'ici, et lesquels je laisserais de côté. J'ai volontairement omis les frais : les prix changent, et chaque organisme affiche ses propres chiffres à jour et personnalisés mieux que je ne pourrais tenir un tableau exact. Ce que vous trouverez ici, c'est plutôt ce qu'on ne peut pas chercher : l'avis d'un praticien sur ce qui vaut vraiment votre temps et votre budget de perfectionnement professionnel.",
  disclaimer:
    "Ce sont mes propres observations, tirées de mon travail dans le domaine : pas des directives officielles d'un organisme de certification, ni des conseils de carrière ou financiers. Pour les frais, l'admissibilité et les exigences à jour, suivez les liens vers chaque organisme.",
  jumpLabel: 'Aller à une certification',
  sections: [
    {
      id: 'cams',
      title: 'CAMS — Certified Anti-Money Laundering Specialist',
      body: (
        <>
          <p>
            <Strong>Celle qui compte le plus au Canada.</Strong> Décernée par l'ACAMS, la CAMS est
            ce qui se rapproche le plus d'un titre standard en LBA. Quand une offre d'une banque
            canadienne indique «&nbsp;certification souhaitée&nbsp;» ou «&nbsp;CAMS, un
            atout&nbsp;», c'est presque toujours de celle-là qu'il s'agit. Si vous ne devez obtenir
            qu'une seule certification en LBA, prenez celle-ci.
          </p>
          <p>
            C'est un seul examen fondé sur des mises en situation, qui couvre les risques de
            blanchiment d'argent et de financement des activités terroristes, le cadre
            réglementaire international et le fonctionnement réel des programmes de conformité — le
            jugement plutôt que la mémorisation. Il faut être membre de l'ACAMS pour s'y présenter,
            atteindre un seuil d'admissibilité fondé sur des crédits (des études et de l'expérience
            en LBA suffisent pour la plupart des gens) et renouveler le titre selon un cycle de
            formation continue.
          </p>
          <p>
            <Strong>Mon avis&nbsp;:</Strong> ça vaut la peine si vous restez en LBA et que vous
            voulez le titre que les gestionnaires d'embauche reconnaissent au premier coup d'œil.
            Le renouvellement est un vrai tapis roulant, alors faites-la payer par votre employeur
            si vous le pouvez — la plupart des banques canadiennes ont un budget de
            perfectionnement qui couvre exactement ça. C'est celle qui ouvre des portes ici.
          </p>
          <p>
            <SourceLink href="https://www.acams.org">Exigences et frais à jour&nbsp;: ACAMS</SourceLink>
          </p>
        </>
      ),
    },
    {
      id: 'cams-fci',
      title: 'CAMS-FCI — CAMS Financial Crimes Investigations',
      body: (
        <>
          <p>
            <Strong>L'étape spécialisée, et seulement après la CAMS.</Strong> Aussi décernée par
            l'ACAMS, la CAMS-FCI est un titre avancé distinct, conçu précisément pour la conduite
            d'enquêtes en criminalité financière — monter un dossier, suivre l'argent, tout
            documenter. La CAMS d'abord; celle-ci s'appuie dessus.
          </p>
          <p>
            <Strong>Mon avis&nbsp;:</Strong> c'est une niche, et ça ne vaut la peine que si les
            enquêtes sont littéralement votre travail — analyste dans une unité du renseignement
            financier, enquêteur en criminalité financière, un poste en mesures accrues qui est en
            réalité du travail d'enquête. Si vous travaillez en déclarations, en validation de
            modèles ou sur un programme de conformité, elle ne changera rien à vos perspectives et
            l'argent sera mieux investi ailleurs. Ne la collectionnez pas juste pour l'avoir.
          </p>
          <p>
            <SourceLink href="https://www.acams.org">Détails&nbsp;: ACAMS</SourceLink>
          </p>
        </>
      ),
    },
    {
      id: 'cfe',
      title: 'CFE — Certified Fraud Examiner',
      body: (
        <>
          <p>
            <Strong>Plus large que la LBA, et respectée au-delà.</Strong> Décernée par l'ACFE, la
            CFE couvre la fraude en général — fraude dans les états financiers, corruption,
            techniques d'enquête, volet juridique. C'est justement parce qu'elle n'est pas propre
            à la LBA qu'elle voyage bien&nbsp;: la fraude, l'audit interne, la juricomptabilité et
            les forces de l'ordre la reconnaissent toutes. Elle exige l'adhésion à l'ACFE, un
            diplôme et une expérience pertinente, ainsi qu'une formation continue pour la
            conserver. (À noter&nbsp;: la structure de l'examen devait changer vers 2026 — vérifiez
            le format actuel avant d'acheter du matériel d'étude.)
          </p>
          <p>
            <Strong>Mon avis&nbsp;:</Strong> le titre le plus polyvalent de cette page. Si vous
            pourriez passer de la LBA à la fraude, puis à des postes plus larges en criminalité
            financière ou en audit — ou si vous voulez un titre qui n'est pas lié à un seul
            organisme de réglementation —, la CFE est un pari solide. Dans un parcours purement LBA
            dans une banque canadienne, la CAMS la devance encore pour la notoriété, mais la CFE
            est celle que j'y ajouterais si je bâtissais une carrière en criminalité financière
            plutôt qu'en conformité.
          </p>
          <p>
            <SourceLink href="https://www.acfe.com">Exigences et frais à jour&nbsp;: ACFE</SourceLink>
          </p>
        </>
      ),
    },
    {
      id: 'cpaml',
      title: 'CPAML et la catégorie « bien à avoir, rarement demandé »',
      body: (
        <>
          <p>
            Il existe une longue traîne de titres en LBA — dont la CPAML et divers certificats
            propres à un institut ou à un fournisseur. Certains sont réellement formateurs; rares
            sont ceux que les gestionnaires d'embauche des banques canadiennes recherchent.
          </p>
          <p>
            <Strong>Mon avis honnête&nbsp;:</Strong> je n'ai jamais vu une offre d'emploi
            canadienne en LBA en exiger un, et j'en ai rarement vu une le mentionner comme atout.
            Si votre employeur vous l'offre gratuitement, ou si c'est inclus dans une formation que
            vous suivez de toute façon, très bien — apprendre, c'est apprendre. Mais ne payez pas
            de votre poche un titre que personne ne demande, en vous disant que plus de lettres,
            ça aide. Une certification reconnue que vous utilisez vraiment vaut mieux que trois
            obscures sur un CV. Mettez plutôt cet argent sur la CAMS, ou sur la CFE si votre
            parcours est plus large.
          </p>
        </>
      ),
    },
  ],
  closing:
    "Vous débutez en LBA au Canada? Obtenez la CAMS quand vous ou votre employeur pourrez la financer, envisagez la CFE si vous voulez de la polyvalence, et ignorez le reste jusqu'à ce qu'un poste précis exige quelque chose de précis. Le titre compte moins que le travail — mais le bon, au bon moment, vous ouvre la porte.",
  lastReviewed: 'Dernière révision : juillet 2026',
};
