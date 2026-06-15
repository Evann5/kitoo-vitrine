# Changelog

Toutes les évolutions notables du site vitrine Kitoo.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/),
versionnage [SemVer](https://semver.org/lang/fr/).

## [1.0.0] — 2026-06-15 — Site vitrine V1

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
