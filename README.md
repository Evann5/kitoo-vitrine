# Kitoo — Site vitrine

Site vitrine marketing (one-page) de l'application **Kitoo** (prévention en santé
mentale pour les 18–24 ans).

🌐 **Production : https://kitoo-vitrine.vercel.app**
🏷️ **État : V1 livrable** (`v1.0.0`) — landing complète, testée, accessible et
déployée en continu. **Lighthouse (desktop, prod) : Performance 100 ·
Accessibilité 100 · Best Practices 100 · SEO 100.**

Déployé sur Vercel avec **déploiement automatique** à chaque push sur `main`.
Détails et commandes CLI : [`DEPLOY.md`](DEPLOY.md). Historique :
[`CHANGELOG.md`](CHANGELOG.md).

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
  fichiers `*.test.ts(x)` vivent dans `tests/`.
  - **Couverture** : `pnpm test --coverage` (rapport texte + HTML dans
    `coverage/`). Seuils : lignes / fonctions / statements **≥ 80 %**,
    branches **≥ 75 %** (configurés dans `vitest.config.ts`).
- **End-to-end** — Playwright (`tests/e2e/*.spec.ts`) : parcours visiteur
  complet ([landing.spec.ts](tests/e2e/landing.spec.ts)) + audit **axe-core**
  ([a11y.spec.ts](tests/e2e/a11y.spec.ts)). La config démarre automatiquement
  `pnpm dev`. Au premier lancement : `pnpm exec playwright install chromium`.

Vérification globale :

```bash
pnpm lint && pnpm test --coverage && pnpm test:e2e && pnpm build
```

La **CI GitHub Actions** ([ci.yml](.github/workflows/ci.yml)) exécute
lint + tests (coverage) + build et un job e2e (Playwright + axe) à chaque push
et pull request sur `main`.

### Qualité

- **ESLint** : règles `eslint-config-next` (core-web-vitals + TypeScript).
- **Prettier** : `.prettierrc` avec `prettier-plugin-tailwindcss` (tri des
  classes). Aucune règle stylistique d'ESLint n'entre en conflit avec Prettier.
- **Audit transversal (R9)** — [`QUALITY.md`](QUALITY.md) : matrice responsive
  testée (320 → 1440px+ et mobile paysage, **0 débordement**), conformité **WCAG
  AA** (axe-core **0 violation** sur la page complète, `h1` unique, modes
  dyslexie/daltonisme, `prefers-reduced-motion`), optimisations perf (SVG/lazy,
  anti-CLS, animations GPU bornées au viewport, `lottie-react` retiré) et scores
  **Lighthouse ≥ 99** (a11y/BP/SEO 100, perf 99–100) maintenus après refonte.

## Variables d'environnement

Copier `.env.local.example` vers `.env.local` et renseigner les valeurs :

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_APP_URL` — URL de l'application Kitoo (laisser `"#"` tant qu'elle
  n'est pas connue). `.env.local` est ignoré par git.

### Remplacer `NEXT_PUBLIC_APP_URL` quand le lien de l'app arrive

- **En local** : éditer `.env.local` (`NEXT_PUBLIC_APP_URL="https://app.kitoo.fr"`).
- **En production (Vercel)** : mettre à jour la variable sur les 3 environnements
  puis redéployer — procédure détaillée dans [`DEPLOY.md`](DEPLOY.md). Tous les
  CTA (`Button` primaire, header, hero, CTA final) consomment cette valeur via
  `siteConfig.appUrl`, donc une seule mise à jour suffit.

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

## Sections de la landing

Les sections vivent dans [`src/components/sections/`](src/components/sections) et
s'empilent dans [`page.tsx`](src/app/page.tsx), dans l'ordre de la navigation :

1. **Hero** ([Hero.tsx](src/components/sections/Hero.tsx)) — ancre `#hero`,
   **refondu (R4)** : layout **plein écran** (`min-h-[100svh]`) deux colonnes
   (empilé mobile-first), **mascotte koala animée** (`Mascot pose="wave"`,
   `priority`, idle doux) sur **fond organique** (`Blob`, lavis pervenche).
   Hiérarchie d'action « à la Duolingo » : **un seul CTA dominant** « Accéder à
   l'app » (`Button` `primary lg`, `as="a"`) + lien secondaire discret
   « Découvrir » (→ `#fonctionnalites`). Entrée orchestrée en cascade
   (`Reveal`/`Stagger`), neutralisée en reduced-motion. `h1` unique, anti-CLS.
2. **Fonctionnalités** ([Features.tsx](src/components/sections/Features.tsx)) —
   ancre `#fonctionnalites`, **scroll-story (R5)** : 3 blocs `StoryBlock`
   alternés (texte ↔ mascotte), révélés au scroll — **Mood tracker** (+ échelle
   d'humeur), **Chat avec un pro**, **Espace bien-être**.
3. **Comment ça marche** ([HowItWorks.tsx](src/components/sections/HowItWorks.tsx))
   — ancre `#comment-ca-marche`, **scroll-story (R5)** : parcours en 3 étapes
   numérotées alternées (notes ton humeur → reçois des ressources → échanges
   avec un pro), ton encourageant et sans pression.

> Les deux sections s'appuient sur le composant générique
> [StoryBlock](src/components/sections/StoryBlock.tsx) (texte + illustration,
> alternance gauche/droite desktop → empilé mobile, révélation `Reveal`/`Stagger`
> neutralisée en reduced-motion).

4. **Aperçu / démo humeur & gamification** ([MoodDemo.tsx](src/components/sections/MoodDemo.tsx))
   — ancre `#apercu`, **R6** : démo **illustrative** (aucune donnée, aucun lien
   app). Sélecteur des **5 niveaux d'humeur** ([MoodFace](src/components/ui/MoodFace.tsx)
   sur-mesure + libellé, jamais la couleur seule) en **radiogroup accessible**
   (flèches clavier, focus pervenche, cibles ≥ 44px) qui fait réagir la
   **mascotte** (pose) et le **fond** (teinte douce compagne), transition
   neutralisée en reduced-motion. **Gamification douce** ([Gamification.tsx](src/components/sections/Gamification.tsx))
   : série + badges, ton bienveillant (« pas de pression »). CTA discret vers
   l'app. Échelle d'humeur **fixe** du DS (`src/lib/moods.ts`). 4. **Pour qui** ([Audience.tsx](src/components/sections/Audience.tsx)) — ancre

   > `#pour-qui` : 2 profils — jeunes adultes **18–24 ans** (tutoyés) et
   > **psychologues partenaires** (vouvoyés). Registre non diagnostique (« les
   > outils t'orientent »).

5. **FAQ** ([Faq.tsx](src/components/sections/Faq.tsx)) — ancre `#faq` :
   accordéon accessible (`aria-expanded`/`aria-controls`, clavier natif,
   **un seul panneau ouvert à la fois**), 5 questions douces (confidentialité,
   accès, suivi psy, échange avec un pro, sécurité).
6. **Confiance & preuve sociale** ([Trust.tsx](src/components/sections/Trust.tsx))
   — ancre `#confiance`, **R7** (refonte enrichie du bloc confiance) : 4 cards
   sécurité/RGPD (chiffrement HTTPS, OAuth 2.0, consentement/accès/effacement,
   **validé par des pros**) + **disclaimer médical** obligatoire, ton soutenant
   non clinique. **Stats** ([Stats.tsx](src/components/sections/Stats.tsx)) en
   cards avec **compteur animé accessible** (valeur finale toujours dans le DOM,
   `role="img"` + `aria-label`, neutralisé en reduced-motion). **Témoignages**
   ([Testimonials.tsx](src/components/sections/Testimonials.tsx)) — **personas
   fictifs** (mention « illustratifs », avatars en initiales, aucune vraie
   personne/logo).
7. **CTA final** ([FinalCta.tsx](src/components/sections/FinalCta.tsx)) —
   invitation chaleureuse → `siteConfig.appUrl` (`_blank` + `rel` sécurisé),
   sur `Card soft`.

Un **security-review** a été passé sur cette étape (liens externes sûrs, pas de
`dangerouslySetInnerHTML`, aucune entrée utilisateur, aucun secret) — sans alerte.

## Navigation & layout

Le layout global vit dans [`src/components/layout/`](src/components/layout) et est
monté dans [`layout.tsx`](src/app/layout.tsx) : `SkipLink` → `Header` →
`<main id="content">` → `Footer`.

- **Header** ([Header.tsx](src/components/layout/Header.tsx)) — sticky, effet
  givré (`backdrop-blur`) qui s'accentue au scroll. Navigation par **ancres**
  (top-nav, pas le rail 248px de l'app : choix vitrine documenté en JSDoc).
  Menu mobile burger accessible : `aria-expanded`/`aria-controls`, fermeture au
  clic sur un lien, au clic extérieur et à la touche **Échap**. CTA « Accéder à
  l'app » → `siteConfig.appUrl` (`target="_blank"` + `rel="noopener noreferrer"`).
- **Footer** ([Footer.tsx](src/components/layout/Footer.tsx)) — disclaimer médical
  obligatoire (doux), colonnes Navigation / Légal (RGPD, placeholders) / Réseaux,
  copyright à **année dynamique**, logo koala.
- **SkipLink** ([SkipLink.tsx](src/components/layout/SkipLink.tsx)) — « Aller au
  contenu » visible au focus, cible `#content`.

**Ancres** (depuis `siteConfig.nav`) : `#hero`, `#fonctionnalites`,
`#comment-ca-marche`, `#pour-qui`, `#faq`. Défilement doux via
`scroll-behavior: smooth` + `scroll-margin-top` (neutralisé si
`prefers-reduced-motion`).

**Accessibilité** : navigation au clavier, `aria-label` sur les nav, anneau de
focus pervenche visible, skip-link, cibles tactiles ≥ 44px.

### Navigation avancée (R8)

- **Header au scroll** : se **condense** (hauteur réduite) et accentue l'effet
  givré + ombre lavande au défilement (transition douce, atténuée en
  reduced-motion).
- **Section active** : [`useActiveSection`](src/hooks/useActiveSection.ts)
  (IntersectionObserver, cleanup au démontage) met en évidence le lien de la
  section visible avec **`aria-current="true"`**.
- **CTA mobile collant** : [`MobileCtaBar`](src/components/layout/MobileCtaBar.tsx)
  — barre fixe en bas **sur mobile uniquement**, apparaît après le hero, se masque
  quand le footer entre en vue (ne le recouvre pas), `pb` de compensation sur le
  `<main>`. Lien app `rel` sécurisé, hors tabulation quand masquée.
- **Retour en haut** : [`BackToTop`](src/components/layout/BackToTop.tsx) — bouton
  discret (au-dessus de la barre CTA sur mobile), écouteur scroll en `rAF`.
- Observers nettoyés, animations sur `transform`/`opacity`, contraste AA.

## Accessibilité & SEO

### SEO

- **Métadonnées** centralisées dans [`src/lib/metadata.ts`](src/lib/metadata.ts) et
  exposées via `metadata` de [`layout.tsx`](src/app/layout.tsx) : title/description,
  **Open Graph** + **Twitter card**, `metadataBase`, `lang="fr"`.
- **Image OG** générée (1200×630, brandée) :
  [`opengraph-image.tsx`](src/app/opengraph-image.tsx).
- **Favicon** dérivé du logo koala (`icon.png` / `apple-icon.png`).
- [`sitemap.ts`](src/app/sitemap.ts) + [`robots.ts`](src/app/robots.ts).
- **JSON-LD** `Organization` + `WebSite` injecté dans le layout.

### Accessibilité (WCAG AA visé)

- **0 violation** axe-core (critique/sérieuse) sur `/` — testé en e2e.
- Contraste **≥ 4.5:1** partout (surfaces pervenche à texte passées en `brand-700`,
  eyebrows en `brand-800`, labels en `ink-600`).
- Landmarks `header`/`main`/`footer`/`nav`, focus pervenche visible, ordre de
  tabulation logique, skip-link, `prefers-reduced-motion` respecté.
- **Mode dyslexie** : bascule la police body sur **Atkinson Hyperlegible**
  (`<html data-font="dyslexia">`).
- **Mode daltonisme** : palette d'humeur alternative **Okabe-Ito**
  (`<html data-contrast="colorblind">`), variables CSS surchargées.
- Préférences persistées en `localStorage` + **script anti-flash** (inline dans
  `layout.tsx`) qui applique le choix avant le premier rendu (pas de FOUC).
- Contrôles dans le footer : [`AccessibilityToggle.tsx`](src/components/AccessibilityToggle.tsx)
  (`aria-pressed`).

## Illustrations & mascotte

Système d'illustrations à **placeholders** (refonte R3), conçu pour un
remplacement **sans toucher au code**.

- **Registre central** ([src/lib/illustrations.ts](src/lib/illustrations.ts)) :
  le code consomme une **clé** (`koala-wave`, `koala-calm`, …, `blob-soft`,
  `wave-divider`), jamais un chemin. Chaque clé porte ses métadonnées (fichier,
  `alt`, dimensions, `kind`).
- **Résolution automatique** : [Illustration](src/components/illustrations/Illustration.tsx)
  affiche l'asset déposé dans `public/illustrations/` s'il existe (vérifié au
  build), sinon un **placeholder SVG** doux et cohérent avec le DS. Dimensions
  fixées (anti-CLS), `lazy` par défaut, `alt`/`aria-hidden` selon le sens.
- **Mascotte** : [Mascot](src/components/illustrations/Mascot.tsx) (`pose`) avec
  flottement idle doux (`motion-safe:animate-float`, neutralisé en
  `prefers-reduced-motion`). **Décors** : [Blob](src/components/illustrations/Blob.tsx).

### Remplacer un placeholder par la vraie illustration

1. Dépose le fichier dans `public/illustrations/` avec le **nom exact** indiqué
   dans [`public/illustrations/README.md`](public/illustrations/README.md)
   (table clé → fichier, format, dimensions, ratio, `alt`).
2. Redéploie : la résolution se fait au build, le placeholder est remplacé
   automatiquement. **Aucune modification de code.**

> Banc d'essai dev : `/illustration-lab` (temporaire, retiré en R10).

## Boutons & micro-interactions

Système de boutons « signature » (refonte R2) — [Button.tsx](src/components/ui/Button.tsx).

- **Effet 3D** : le `primary` a une **épaisseur basse** pervenche foncée
  (`shadow-btn`, bord bas brand-900) + halo lavande. Au press, le bouton
  **descend** (`translate-y`) et l'épaisseur se réduit (`shadow-btn-press`) —
  enfoncement doux, jamais de saut. L'`outline` a une épaisseur neutre ; le
  `ghost` un simple « squish ».
- **API** (compatible existant) : `variant` (`primary`/`ghost`/`outline`),
  `size` (`sm`/`md`/`lg`), `fullWidth`, `loading` (spinner + désactivation),
  `as="a"` (CTA-lien `<a>` sans imbriquer `<button>`). `buttonVariants()` reste
  disponible — les CTA existants (Hero, Header, FinalCta) en bénéficient
  automatiquement.
- **[IconButton](src/components/ui/IconButton.tsx)** — bouton icône rond,
  `aria-label` **requis** par le typage. **[Pressable](src/components/ui/Pressable.tsx)** /
  `pressClasses` — applique le « squish » à tout élément cliquable (cards…).
- **États** : `hover` (assombrit d'un cran), `active` (enfoncement),
  `focus-visible` (anneau pervenche 4px), `disabled`. Cibles tactiles ≥ 44px
  (`md`/`lg`), contraste **AA** (texte blanc sur brand-700).
- **Accessibilité du mouvement** : le déplacement au press est derrière
  `motion-safe:` → neutralisé sous `prefers-reduced-motion` (l'épaisseur statique
  reste, sans animation).

```tsx
<Button as="a" href={appUrl} target="_blank" rel="noopener noreferrer">
  Accéder à l'app
</Button>
<IconButton aria-label="Ouvrir le menu"><Menu aria-hidden /></IconButton>
```

## Animations & mouvement

Fondations de mouvement (refonte R1) basées sur **Framer Motion**, alignées sur
les tokens du DS (ease-out `cubic-bezier(0.22, 0.61, 0.36, 1)`, durées
120–320 ms, fondus + légères montées, aucun rebond).

- **Presets** ([src/lib/motion.ts](src/lib/motion.ts)) : `transitions` (`soft`
  ~240 ms, `quick` ~160 ms) et `variants` (`fadeInUp`, `fadeIn`, `scaleIn`,
  `staggerContainer`). `resolveVariants(name, reduce)` renvoie des variants
  neutres si le mouvement est réduit.
- **`Reveal`** ([src/components/motion/Reveal.tsx](src/components/motion/Reveal.tsx))
  — anime ses enfants à l'entrée dans le viewport (`whileInView`, une seule
  fois). **`Stagger` / `Stagger.Item`** — apparition décalée d'une liste.
- **Accessibilité** : tout le mouvement se neutralise sous
  `prefers-reduced-motion: reduce` (apparition immédiate, hook
  [useReducedMotion](src/hooks/useReducedMotion.ts)). `scroll-behavior: smooth`
  est lui aussi désactivé dans ce cas.
- **Perf** : animations sur `transform`/`opacity` uniquement (GPU), composants
  `"use client"` compatibles SSR.

Animer une nouvelle section :

```tsx
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

<Reveal>
  <h2>Ton humeur cette semaine</h2>
</Reveal>;

<Stagger as="ul" className="grid gap-6 sm:grid-cols-3">
  {items.map((it) => (
    <StaggerItem as="li" key={it.id}>
      {it.label}
    </StaggerItem>
  ))}
</Stagger>;
```

> Banc d'essai dev : `/motion-lab` (temporaire, retiré en R10).

## Versioning & contribution

- **Branche principale** : `main` (toujours stable, build + tests au vert).
- **Branches de feature** : `feat/…` pour chaque nouvelle étape, puis Pull
  Request vers `main` (ex. `feat/sections`, `feat/seo`, `feat/e2e-tests`).
  Branches utilitaires : `chore/…`, `fix/…`, `docs/…`.
- **Convention de commits** : [Conventional Commits](https://www.conventionalcommits.org)
  en anglais — `feat:`, `fix:`, `chore:`, `test:`, `docs:`, `ci:`, `refactor:`.
  Commits atomiques et lisibles.
- **CI** : GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
  lance `lint + test (coverage) + build` et un job e2e à chaque push et PR sur
  `main`.
- Guide complet du contributeur : [`CONTRIBUTING.md`](CONTRIBUTING.md).

> **Déploiement Vercel** : déploiement automatique à chaque push sur `main`.
> Commandes CLI, headers de sécurité et mise à jour de `NEXT_PUBLIC_APP_URL` :
> voir [`DEPLOY.md`](DEPLOY.md).

## Design system

La source de vérité visuelle vit dans
[`design-system/`](design-system/) : `guidelines/` (PDF du DS), `tokens/`,
`fonts/` (Goodly Medium), `assets/` (logo koala — **ne jamais recolorer**). Les
valeurs sont traduites dans [`tailwind.config.ts`](tailwind.config.ts). Voir
[`design-system/README.md`](design-system/README.md).
