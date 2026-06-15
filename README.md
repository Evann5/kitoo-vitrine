# Kitoo — Site vitrine

Site vitrine marketing (one-page) de l'application **Kitoo**.

## Stack

- **Next.js** (App Router) — React 19
- **TypeScript** (mode strict)
- **Tailwind CSS** v4
- **ESLint**
- **pnpm** (via Corepack)

## Prérequis

- Node.js ≥ 20
- pnpm (activable avec `corepack enable pnpm`)

## Installation

```bash
pnpm install
```

## Commandes

| Commande        | Description                                               |
| --------------- | --------------------------------------------------------- |
| `pnpm dev`      | Lance le serveur de développement (http://localhost:3000) |
| `pnpm build`    | Build de production                                       |
| `pnpm start`    | Démarre le serveur de production (après `build`)          |
| `pnpm lint`     | Analyse ESLint                                            |
| `pnpm format`   | Formate le code avec Prettier (+ plugin Tailwind)         |
| `pnpm test`     | Tests unitaires (Vitest + Testing Library)                |
| `pnpm test:e2e` | Tests end-to-end (Playwright)                             |

### Tests

- **Unitaires** — Vitest (environnement jsdom) + `@testing-library/react`. Les
  fichiers `*.test.ts(x)` vivent dans `tests/` et `src/`.
- **End-to-end** — Playwright (`tests/e2e/*.spec.ts`). La config démarre
  automatiquement `pnpm dev` sur `http://localhost:3000`. Au premier lancement,
  installer le navigateur : `pnpm exec playwright install chromium`.

### Qualité

- **ESLint** : règles `eslint-config-next` (core-web-vitals + TypeScript).
- **Prettier** : `.prettierrc` avec `prettier-plugin-tailwindcss` (tri des
  classes). Aucune règle stylistique d'ESLint n'entre en conflit avec Prettier.

## Variables d'environnement

Copier `.env.local.example` vers `.env.local` et renseigner les valeurs :

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_APP_URL` — URL de l'application Kitoo (laisser `"#"` tant qu'elle
  n'est pas connue). `.env.local` est ignoré par git.

## Arborescence

```
src/
  app/                  # layout, page, styles globaux
  components/
    ui/                 # composants UI réutilisables
    sections/           # sections de la page
    layout/             # header, footer, etc.
  lib/                  # utilitaires
public/                 # assets statiques servis
tests/
  e2e/                  # tests end-to-end
design-system/          # design system Kitoo (déposé manuellement)
  tokens/
  fonts/
  assets/
  guidelines/
```

## Design tokens & composants

Les tokens Kitoo sont définis dans [`tailwind.config.ts`](tailwind.config.ts)
(chargé en Tailwind v4 via `@config` dans [`globals.css`](src/app/globals.css)).
Source de vérité : `design-system/guidelines/Kitoo_Design_System.pdf`.

### Couleurs

| Token                    | Rôle                          | Valeur clé            |
| ------------------------ | ----------------------------- | --------------------- |
| `brand-500`              | Pervenche — couleur de marque | `#9B9DF0`             |
| `brand-100`              | Brume lavande — surface douce | `#E9EAFA`             |
| `ink-900`                | Texte principal               | `#16161D`             |
| `ink-50`                 | Canvas de l'app (off-white)   | `#FAFAFD`             |
| `mood-*`                 | Échelle d'humeur (fixe)       | `#FFD93D` → `#FF595E` |
| `success/warning/danger` | Sémantique                    | `#38B27E` …           |

### Rayons & ombres

| Token                     | Usage                           | Valeur               |
| ------------------------- | ------------------------------- | -------------------- |
| `rounded-control`         | boutons, inputs                 | 16px                 |
| `rounded-card`            | cartes                          | 22px                 |
| `rounded-panel`           | panneaux                        | 30px                 |
| `rounded-pill`            | pills / tags                    | 999px                |
| `shadow-sm` / `shadow-md` | élévation douce teintée lavande | rgba(42,43,87,…)     |
| `shadow-brand`            | lueur pervenche                 | —                    |
| `shadow-focus`            | anneau de focus 4px             | rgba(155,157,240,.4) |

### Typographie

- **Goodly Medium** (`font-display`) — titres, wordmark (next/font/local).
- **Nunito** (`font-body`) — corps & UI, ≥ 16px (WCAG).
- **Atkinson Hyperlegible** (`font-dyslexia`) — mode dyslexie
  (`<html data-font="dyslexia">`).

### Primitives (`src/components/ui/`)

`Button` (primary / ghost / outline), `Card` (+ `soft`), `Badge`, `Pill`, `Tag`,
`Container` (content ~1180px / prose ~680px), `Section` (ancre `id`).

```tsx
import { Button, Card, Container, Section } from "@/components/ui";

<Section id="accueil">
  <Container>
    <Card soft>
      <Button variant="primary">Noter mon humeur</Button>
    </Card>
  </Container>
</Section>;
```

La page **`/styleguide`** (dev only, retirée plus tard) présente tous les
variants.

## Versioning & contribution

- **Branche principale** : `main` (toujours stable, build + tests au vert).
- **Branches de feature** : `feat/…` pour chaque nouvelle étape, puis Pull
  Request vers `main` (ex. `feat/sections`, `feat/seo`, `feat/e2e-tests`).
  Branches utilitaires : `chore/…`, `fix/…`, `docs/…`.
- **Convention de commits** : [Conventional Commits](https://www.conventionalcommits.org)
  en anglais — `feat:`, `fix:`, `chore:`, `test:`, `docs:`, `ci:`, `refactor:`.
  Commits atomiques et lisibles.
- **CI** : GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
  lance `lint + test + build` à chaque push et PR sur `main`.

> **Déploiement Vercel** : voir l'Étape 10 / `DEPLOY.md`. Le dépôt se connecte à
> Vercel (import du repo) pour un déploiement automatique à chaque push sur `main`.

## ⚠️ Avant l'étape suivante

Le **design system Kitoo doit être déposé dans `design-system/`** (tokens, polices,
logo, guidelines) **avant de coder les sections du site**. Voir
[`design-system/README.md`](design-system/README.md) pour le détail des fichiers
attendus.
