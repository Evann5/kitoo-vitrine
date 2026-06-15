# Contribuer à Kitoo (site vitrine)

Merci de garder le dépôt propre et lisible — la qualité du versioning fait partie
des critères d'évaluation.

## Stratégie de branches

- `main` : toujours **stable** (lint + tests + build au vert, déployé sur Vercel).
- Branches de travail, depuis `main` :
  - `feat/…` — nouvelle fonctionnalité / section (ex. `feat/temoignages`)
  - `fix/…` — correction de bug
  - `chore/…` — outillage, config, dépendances
  - `docs/…` — documentation
  - `test/…` — tests
- Ouvrir une **Pull Request** vers `main`. La CI (lint + tests + build + e2e)
  doit être verte avant le merge.

## Convention de commits

[Conventional Commits](https://www.conventionalcommits.org), en anglais, atomiques :

```
feat: add testimonials section
fix: correct mobile menu focus trap
chore: bump dependencies
docs: update deployment guide
test: cover the FAQ accordion
```

Préfixes : `feat`, `fix`, `chore`, `docs`, `test`, `ci`, `refactor`, `style`.

## Ajouter une section à la landing

1. Créer le composant dans `src/components/sections/MaSection.tsx`
   (Server Component si possible ; `"use client"` seulement si interactivité).
   - Réutiliser les primitives de `src/components/ui/` (`Section`, `Container`,
     `Card`, `Button`…) et les tokens Tailwind (couleurs `brand`/`ink`/`mood`,
     rayons `card`/`pill`, ombres douces).
   - Donner une ancre : `id="ma-section"` + `scroll-mt-24`.
   - Respecter la **voix de marque** : tutoiement, casse phrase, ton doux et
     rassurant (jamais de langage clinique ni de diagnostic).
   - Accessibilité : titres sémantiques (`h2`/`h3`), icônes décoratives en
     `aria-hidden`, contraste **WCAG AA** (texte sur pervenche → `brand-700`).
2. L'exporter dans `src/components/sections/index.ts` et la monter dans
   `src/app/page.tsx` au bon endroit.
3. Si elle doit figurer dans la navigation, ajouter l'ancre à `siteConfig.nav`
   (`src/lib/site-config.ts`).
4. Écrire un test colocalisé `tests/sections/MaSection.test.tsx`
   (rendu, contenu clé, accessibilité des icônes).

## Avant de pousser

```bash
pnpm lint
pnpm test --coverage   # seuils : lignes/fonctions/statements ≥ 80 %, branches ≥ 75 %
pnpm test:e2e
pnpm build
```

Tout doit passer au vert. Ne jamais committer de secret ni `.env.local`.
