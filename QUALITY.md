# Qualité — Kitoo (audit R9)

Passe transversale de qualité sur la landing refondue (R4–R8) : responsive,
accessibilité et performance.

## Lighthouse

Audit `lighthouse@12 --preset=desktop` sur le build de production.

| Catégorie      | Avant refonte (V1, étape 8) | Après refonte (R9)        |
| -------------- | --------------------------- | ------------------------- |
| Performance    | 100                         | **99–100** (variance run) |
| Accessibilité  | 100                         | **100**                   |
| Best Practices | 100                         | **100**                   |
| SEO            | 100                         | **100**                   |

> Mesuré sur le build de prod (local **100/100/100/100** ; prod déployée **99**
> en perf selon la variance réseau/CDN). Tous les scores restent **≥ 95** : la
> refonte (Hero plein écran, scroll-story, démo interactive, animations,
> mascotte) **n'a pas dégradé la qualité**.

## Responsive — matrice testée

Aucun **débordement horizontal** et lisibilité maintenue à tous les breakpoints
(vérifié automatiquement en parcourant toute la page) :

| Largeur | Contexte           | Débordement |
| ------- | ------------------ | ----------- |
| 320px   | petit mobile       | 0 ✅        |
| 375px   | mobile             | 0 ✅        |
| 768px   | tablette           | 0 ✅        |
| 1024px  | petit desktop      | 0 ✅        |
| 1280px  | desktop            | 0 ✅        |
| 1440px+ | grand écran        | 0 ✅        |
| 740×360 | **mobile paysage** | 0 ✅        |

- Échelle d'espacement base 4px du DS, texte ≥ 16px (WCAG), cibles tactiles
  ≥ 44px (boutons `md`/`lg`, IconButton `md`, mood selector).
- Layouts alternés (StoryBlock) → colonne unique sur mobile ; Hero `min-h-[100svh]`
  centré (pas de débordement vertical en paysage).

## Accessibilité (WCAG AA)

- **axe-core : 0 violation** critique/sérieuse sur la page complète stabilisée
  (toutes sections révélées) — vérifié en e2e ([a11y.spec.ts](tests/e2e/a11y.spec.ts)).
- **Un seul `h1`** (Hero), hiérarchie `h2`/`h3`/`h4` cohérente.
- Contraste : surfaces pervenche à texte en `brand-700`, eyebrows/links en
  `brand-800`, labels en `ink-600` (tous ≥ 4.5:1).
- Focus pervenche visible partout, ordre de tabulation logique (header, CTA
  mobile collant exclu du tab quand masqué, accordéon FAQ, sélecteur d'humeur).
- Landmarks `header`/`main`/`footer`/`nav`, `aria-current` sur la section active.
- **Pas d'info portée par la couleur seule** (humeurs : visage + libellé).
- **Modes dyslexie & daltonisme** toujours fonctionnels et persistés.
- `prefers-reduced-motion` respecté partout (Reveal/Stagger neutralisés,
  compteurs instantanés, idle `motion-safe:`, press `motion-safe:`).

## Performance

- **Illustrations** : placeholders **SVG** (légers), dimensions fixées
  (anti-CLS), `lazy` hors hero (`priority` sur le hero uniquement).
- **Animations** : Framer Motion `whileInView`/`useInView` → déclenchées et
  bornées au viewport ; idle/press en **CSS `motion-safe:`** (pas de JS continu) ;
  compteurs en `requestAnimationFrame` nettoyés. Animations exclusivement sur
  `transform`/`opacity` (accélération GPU, aucune propriété de layout).
- **Bundle** : `lottie-react` (installé en R1, jamais utilisé) **retiré**.
  Composants interactifs (`"use client"`) automatiquement code-splittés par Next.
- **Observers** (header scroll, section active, CTA bar, back-to-top) nettoyés au
  démontage.

## Pages de démo dev

Les bancs d'essai `/motion-lab` et `/illustration-lab` ont été **supprimés** en
R10 (ils n'existent plus dans le code ni en production).
