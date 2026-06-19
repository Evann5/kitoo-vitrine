import type { Config } from "tailwindcss";
import {
  brandScale,
  inkScale,
  radii,
  semanticColors,
  shadows,
} from "./src/lib/design-tokens";

/**
 * Configuration Tailwind : tokens du design system Kitoo.
 *
 * Valeurs (couleurs / rayons / ombres) importées depuis la **source de vérité**
 * `src/lib/design-tokens.ts`, partagée avec la page `/design-system` pour qu'aucune
 * valeur ne diverge. Source d'origine : `design-system/guidelines/Kitoo_Design_System.pdf`.
 * Chargée par Tailwind v4 via la directive `@config` dans `src/app/globals.css`.
 *
 * Principes : tout est arrondi et doux, ombres diffuses teintées lavande
 * (jamais de gris-neutre dur), pervenche comme couleur de marque, encre à cast
 * froid/lavande pour les neutres.
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pervenche / encre / sémantique : importés de `design-tokens.ts`.
        brand: { ...brandScale, DEFAULT: brandScale[500] },
        ink: { ...inkScale, DEFAULT: inkScale[900] },
        // Échelle d'humeur : couleurs fixes du DS, exposées en variables CSS
        // pour permettre la bascule daltonisme (override dans globals.css).
        mood: {
          "very-positive": "var(--mood-very-positive)",
          positive: "var(--mood-positive)",
          neutral: "var(--mood-neutral)",
          negative: "var(--mood-negative)",
          "very-negative": "var(--mood-very-negative)",
        },
        ...semanticColors,
      },
      borderRadius: { ...radii },
      boxShadow: { ...shadows },
      fontFamily: {
        // Variables exposées par next/font dans layout.tsx.
        display: ["var(--font-display)", "Poppins", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        dyslexia: ["var(--font-dyslexia)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Échelle typographique du DS. Le corps ne descend jamais < 16px (WCAG) ;
        // `small`/`eyebrow` sont réservés aux libellés, pas au texte long.
        eyebrow: ["10px", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        small: ["13px", { lineHeight: "1.5" }],
        body: ["16px", { lineHeight: "1.6" }],
        heading: ["16px", { lineHeight: "1.4", fontWeight: "700" }],
        title: ["24px", { lineHeight: "1.25", fontWeight: "700" }],
        display: ["46px", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1180px", // largeur max du contenu applicatif
        prose: "680px", // largeur max du texte long
      },
      transitionTimingFunction: {
        // Entrées douces et rassurantes, aucun rebond ni overshoot.
        kitoo: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        kitoo: "200ms",
      },
      keyframes: {
        // Flottement doux (idle de la mascotte) : montée/descente subtile.
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        // Respiration très légère (décors organiques).
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
      animation: {
        // Gardés derrière `motion-safe:` à l'usage → neutralisés en reduced-motion.
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
