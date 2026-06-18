# Changelog

Toutes les évolutions notables du site vitrine Kitoo.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/),
versionnage [SemVer](https://semver.org/lang/fr/).

## [2.0.0] - 2026-06-15 - Refonte UI/UX V2

Refonte visuelle et d'interaction complète (R1–R10), inspirée des grandes
landing pages tout en gardant l'identité douce et apaisante de Kitoo.

### Ajouté

- **Fondations d'animation** (R1) : Framer Motion, `Reveal`/`Stagger`, presets
  doux, gestion stricte de `prefers-reduced-motion`.
- **Boutons signature** (R2) : effet 3D épais qui s'enfonce au press, `IconButton`,
  `Pressable`, API `as`/`fullWidth`/`loading`.
- **Système d'illustrations & mascotte** (R3) : registre typé clé→asset,
  placeholders SVG, `Illustration`/`Mascot`/`Blob`, remplacement **sans code**.
- **Hero refondu** (R4) : plein écran, mascotte animée, fond organique, CTA
  dominant unique.
- **Sections scroll-story** (R5) : `StoryBlock` alterné, révélations au scroll.
- **Démo humeur interactive & gamification douce** (R6) : sélecteur d'humeur
  accessible (`MoodFace`), réaction mascotte/ambiance, série + badges bienveillants.
- **Confiance & preuve sociale** (R7) : sécurité/RGPD, stats à compteur animé,
  témoignages (personas fictifs).
- **Navigation polie** (R8) : header condensé au scroll, section active
  (`aria-current`), CTA mobile collant, retour en haut.

### Qualité (R9–R10)

- Responsive vérifié 320→1440px+ (0 débordement), **axe-core 0 violation**,
  `h1` unique, modes dyslexie/daltonisme conservés, `prefers-reduced-motion`
  partout. Lighthouse **a11y/BP/SEO 100, perf 99–100**.
- `lottie-react` retiré (inutilisé) ; pages de démo dev supprimées.
- 132 tests unitaires + 21 e2e (parcours refondu + axe). `pnpm audit` : 0 vuln.

## [1.0.0] - 2026-06-15 - Site vitrine V1

Première version livrable de la landing one-page Kitoo.

### Ajouté

- **Landing complète** (one-page) : Hero, Fonctionnalités, Comment ça marche,
  Pour qui, FAQ (accordéon accessible), bloc Confiance/RGPD, CTA final.
- **Layout global** : header sticky givré avec navigation par ancres + menu
  mobile accessible, footer avec disclaimer médical et mentions RGPD, skip-link.
- **Design system Kitoo** traduit en tokens Tailwind (pervenche, encre, échelle
  d'humeur, rayons, ombres lavande) + primitives UI (`Button`, `Card`, `Badge`,
  `Pill`, `Tag`, `Container`, `Section`). Polices Goodly / Nunito / Atkinson.
- **Accessibilité** (WCAG AA, 0 violation axe) : modes dyslexie et daltonisme
  persistés (`localStorage` + anti-flash), focus visible, landmarks,
  `prefers-reduced-motion`.
- **SEO** : métadonnées Open Graph / Twitter, image OG générée, favicon,
  `sitemap`, `robots`, JSON-LD `Organization` + `WebSite`.
- **Qualité** : 75 tests unitaires (Vitest + RTL, couverture 94 %), 13 scénarios
  e2e (Playwright + axe), CI GitHub Actions (lint + tests + build + e2e).
- **Déploiement** : Vercel avec déploiement continu, en-têtes de sécurité,
  `NEXT_PUBLIC_APP_URL` configurable sans toucher au code.

### Sécurité

- En-têtes durcis (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Strict-Transport-Security`, `Permissions-Policy`).
- `pnpm audit` : 0 vulnérabilité (override `postcss ≥ 8.5.10`).

### À venir

- Remplacement de `NEXT_PUBLIC_APP_URL` par le lien réel de l'application.
- Pages légales réelles (Confidentialité, Mentions légales, CGU).
