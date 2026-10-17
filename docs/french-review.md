# French (fr-CA) review sheet

This sheet is for a native Canadian-French speaker reviewing the French pages
in one pass: `/fr`, `/fr/studio`, `/fr/certifications` and `/fr/legal`.
`/jobs` and the Report Studio app stay English-only by design.

**Where the French lives:** all French copy is in `src/content/fr/`, with one
file per page (`home.ts`, `studio.ts`, `certifications.tsx`, `legal.tsx`) plus
`chrome.ts` for the nav, theme toggle and language toggle. The French titles
and meta descriptions are in `src/lib/seo.ts`. Each French file sits next to
its English counterpart in `src/content/en/`, so you can compare them side by
side.

**Conventions used (correct me if you prefer otherwise):**
- Non-breaking space (` ` in strings, `&nbsp;` in JSX) before `:` and
  inside « ». There is no space before `?`, `;` or `!`, following OQLF
  practice in Québec.
- Straight apostrophes (`'`), to match the English site. Switch to `’` if you
  prefer.

## 1. Regulatory terms, sourced from CANAFE

Each term below was confirmed on CANAFE's French site on 2026-10-17. The
fetching tool summarized each page rather than returning raw text, so please
spot-check the wording against the linked page.

| French term used | English equivalent | Where it's used | CANAFE source |
|---|---|---|---|
| CANAFE (Centre d'analyse des opérations et déclarations financières du Canada) | FINTRAC | home, studio, SEO | [intro-fra](https://fintrac-canafe.canada.ca/intro-fra) |
| déclarations à CANAFE | FINTRAC reports | home, studio, SEO | Page titles of the form « Déclaration … à CANAFE », e.g. [str-dod-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/str-dod/str-dod-fra) |
| Déclaration d'opérations importantes en espèces | Large Cash Transaction Report (LCTR) | studio list; home card (« opérations importantes en espèces ») | [lctr-doie-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/lctr-doie/lctr-doie-fra) |
| Déclaration de télévirements | Electronic Funds Transfer Report (EFTR) | studio list; home card (« télévirements ») | [eft-dt-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/eft-dt/eft-dt-fra). CANAFE uses the plural *télévirements*. |
| Déclaration d'opérations douteuses | Suspicious Transaction Report (STR) | studio list; home card | [str-dod-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/str-dod/str-dod-fra) |
| Déclaration d'opérations importantes en monnaie virtuelle | Large Virtual Currency Transaction Report (LVCTR) | studio list; home card (« monnaie virtuelle ») | [lvctr-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/lvctr/lvctr-fra) |
| Déclaration de déboursement de casino | Casino Disbursement Report (CDR) | studio list; home card (plural « déboursements de casino ») | [casino-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/cdr/casino-fra). Singular *déboursement* in the report name. |
| blanchiment d'argent | money laundering | throughout | [intro-fra](https://fintrac-canafe.canada.ca/intro-fra), [Mandat](https://fintrac-canafe.canada.ca/fintrac-canafe/1-fra) |
| financement des activités terroristes | terrorist financing | certifications (CAMS) | [Mandat](https://fintrac-canafe.canada.ca/fintrac-canafe/1-fra) |
| lutte contre le blanchiment d'argent | anti-money laundering (AML) | throughout | [Mandat](https://fintrac-canafe.canada.ca/fintrac-canafe/1-fra): « lutte contre le blanchiment d'argent et le financement des activités terroristes » |
| unité du renseignement financier | financial intelligence unit (FIU) | certifications (CAMS-FCI) | [Mandat](https://fintrac-canafe.canada.ca/fintrac-canafe/1-fra) |
| programme de conformité | compliance program | certifications (CAMS, CAMS-FCI) | [Guide4/4-fra](https://fintrac-canafe.canada.ca/guidance-directives/compliance-conformite/Guide4/4-fra) |
| mesures accrues | enhanced measures (used for "EDD") | certifications (CAMS-FCI) | [Guide4/4-fra](https://fintrac-canafe.canada.ca/guidance-directives/compliance-conformite/Guide4/4-fra) |
| soumettre (une déclaration) | to submit / file (a report) | legal (« il ne les soumet pas ») | [str-dod-fra](https://fintrac-canafe.canada.ca/guidance-directives/transaction-operation/str-dod/str-dod-fra) |

**Report codes stay in English** (LCTR, EFTR, STR, LVCTR, CDR) on `/fr/studio`.
That's deliberate: they are the labels the English-only app shows. CANAFE's
French URLs suggest French abbreviations (DOIE, DT, DOD), but the guidance
pages I checked never pair the names with an abbreviation, and LVCTR and CDR
have none at all. Decided (Salman, 2026-10-17): keep the English codes.

## 2. Terms not from CANAFE: please confirm

| French used | English | Note |
|---|---|---|
| LBA (lutte contre le blanchiment d'argent) | AML | Industry shorthand. CANAFE doesn't use it on the pages checked. It is defined once at first use on `/fr/certifications`, and also appears in the `/fr` and `/fr/certifications` titles. |
| criminalité financière | financial crime | Not on CANAFE's Mandat page; common usage. |
| audit interne | internal audit | Or *vérification interne*? |
| juricomptabilité | forensic accounting | Canadian term. |
| organisme de réglementation | regulator | |
| cadre réglementaire international | global regulatory framework | |
| titre | credential | Used throughout the certifications page alongside *certification*. Is *titre* natural here? |
| commandite | sponsorship | Canadian usage, chosen over *parrainage*. |
| services-conseils | consulting | |
| courriel | email | |
| mesure d'audience | analytics | Legal-page heading; also used on studio. |
| technologie publicitaire | ad-tech | |
| pistage intersite | cross-site tracking | |
| fil (d'emplois) | (jobs) feed | |
| export PDF | PDF export | In the `/fr/studio` meta description, to fit 155 characters. Is *exportation* better? |

## 3. Phrases I'm unsure about

- **Home intro:** « Un point d'ancrage canadien pour le travail en lutte contre
  le blanchiment d'argent… », for "A Canada-first home for…". Natural, or
  stiff?
- **Home, jobs card:** « datés honnêtement («&nbsp;vu pour la première
  fois&nbsp;») », for honest "first seen" dates.
- **Home, who built this:** heading « Qui a bâti ce site »; « développés en
  code ouvert » for "built in the open".
- **Certifications, CAMS:** « Le renouvellement est un vrai tapis roulant »
  for "a real renewal treadmill". This is the blunt register I'm aiming for;
  is the idiom natural?
- **Certifications, CAMS-FCI:** « un poste en mesures accrues qui est en
  réalité du travail d'enquête » for "an EDD role that's really casework".
- **Certifications, CFE:** « c'est justement parce qu'elle n'est pas propre à
  la LBA qu'elle voyage bien », for "travels". Anglicism? Maybe *se transpose
  bien*.
- **Certifications, CPAML:** heading « la catégorie «&nbsp;bien à avoir,
  rarement demandé&nbsp;» » for "nice to have, rarely asked for"; « longue
  traîne » for "long tail"; « remplissage de CV » for "resume filler".
- **Certifications, closing:** « le bon, au bon moment, vous ouvre la porte »
  for "gets you in the room".
- **Legal:** the heading « Ceci n'est pas un avis » for "Not advice".
- **Tone check:** the « Mon avis » sections are meant to read as bluntly as
  the English. Flag anything that came out softer or more formal.

## 4. Deliberately left in English

- **Product title:** « Report Studio, by AML North », including *by*. The
  requirements fix this as the public product title for trademark reasons.
  Decided (Salman, 2026-10-17): it stays in English on the French pages.
- **Certification names:** CAMS, CAMS-FCI, CFE, CPAML, and their expansions
  (e.g. "Certified Fraud Examiner").
- **Body names:** ACAMS, ACFE.

## 5. Chrome strings

- **Nav:** Accueil · Emplois (en anglais) · Report Studio · Certifications ·
  Conditions et confidentialité. The nav's accessible name is « Navigation
  principale ».
- **Theme toggle:** « Passer au thème sombre » / « Passer au thème clair »,
  and « Changer de thème » before the page finishes loading.
- **Language toggle:** visible text « EN / FR ». Its accessible name is
  « Lire cette page en français » on English pages and "Read this page in
  English" on French pages.
- **New-tab note for screen readers:** « (s'ouvre dans un nouvel onglet) ».
