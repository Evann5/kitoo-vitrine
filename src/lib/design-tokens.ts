/**
 * Source de vérité des tokens du design system Kitoo.
 *
 * Ce module est importé **à la fois** par `tailwind.config.ts` (génération des
 * classes utilitaires) et par la page `/design-system` (affichage de la charte).
 * Une seule définition → aucune valeur ne peut diverger entre le code et la
 * documentation présentée à l'oral.
 *
 * Les couleurs d'humeur vivent en **variables CSS** (`src/app/globals.css`) pour
 * permettre la bascule daltonisme ; on documente ici leurs valeurs par défaut et
 * leur alternative (palette Okabe-Ito), uniquement pour l'affichage.
 */

/** Pervenche : couleur de marque (graine = 500). */
export const brandScale = {
  50: "#F3F3FE",
  100: "#E9EAFA",
  200: "#D7D8F6",
  300: "#BFC0F4",
  400: "#ABACF2",
  500: "#9B9DF0",
  600: "#7E80E6",
  700: "#6466CF",
  800: "#4F50A8",
  900: "#3B3C7D",
} as const;

/** Encre : neutres à cast froid/lavande (jamais de gris chaud). */
export const inkScale = {
  50: "#FAFAFD",
  100: "#F2F2F7",
  200: "#E6E6EE",
  300: "#D2D2DE",
  400: "#A6A7B8",
  500: "#7C7D90",
  600: "#5C5D70",
  700: "#44455A",
  800: "#2E2F45",
  900: "#16161D",
} as const;

/** Couleurs sémantiques (accordées au pervenche). */
export const semanticColors = {
  success: "#38B27E",
  warning: "#F2A33C",
  danger: "#E5575C",
} as const;

/** Rayons d'angle. */
export const radii = {
  control: "16px",
  card: "22px",
  panel: "30px",
  pill: "9999px",
} as const;

/** Ombres diffuses teintées lavande + boutons « 3D » + anneau de focus. */
export const shadows = {
  sm: "0 1px 2px rgba(42,43,87,0.06), 0 2px 6px rgba(42,43,87,0.06)",
  md: "0 6px 16px rgba(42,43,87,0.08), 0 12px 32px rgba(42,43,87,0.08)",
  brand: "0 8px 24px rgba(155,157,240,0.35)",
  focus: "0 0 0 4px rgba(155,157,240,0.40)",
  btn: "0 4px 0 0 #3B3C7D, 0 8px 18px rgba(42,43,87,0.18)",
  "btn-press": "0 1px 0 0 #3B3C7D, 0 3px 10px rgba(42,43,87,0.14)",
} as const;

/* ------------------------------------------------------------------ */
/* Données purement descriptives (affichées, non consommées par Tailwind) */
/* ------------------------------------------------------------------ */

/** Rôles annotés des teintes clés (pour la légende du nuancier). */
export const brandRoles: Record<string, string> = {
  100: "brume lavande",
  500: "graine de marque",
  600: "hover boutons",
  700: "fond boutons",
  800: "eyebrows",
  900: "épaisseur 3D",
};
export const inkRoles: Record<string, string> = {
  50: "canvas",
  200: "bordures",
  300: "contrôles",
  600: "icônes",
  900: "texte",
};

/** Échelle d'humeur : défaut + alternative daltonisme (Okabe-Ito). */
export const moodColorsDefault = {
  "very-positive": "#FFD93D",
  positive: "#A8E6CF",
  neutral: "#E0E0E0",
  negative: "#FF8C42",
  "very-negative": "#FF595E",
} as const;
export const moodColorsColorblind = {
  "very-positive": "#009E73",
  positive: "#56B4E9",
  neutral: "#999999",
  negative: "#E69F00",
  "very-negative": "#D55E00",
} as const;

/** Échelle d'espacement base 4px. */
export const spacingScale = [4, 8, 12, 16, 24, 32, 48] as const;

/** Échelle typographique (miroir de `fontSize` Tailwind). */
export const typeScale = [
  { token: "display", el: "h1", px: 46, line: 1.05, note: "-0.01em" },
  { token: "title", el: "h2", px: 24, line: 1.25, note: "700" },
  { token: "heading", el: "h3", px: 16, line: 1.4, note: "700" },
  { token: "body", el: "p", px: 16, line: 1.6, note: "corps ≥ 16px" },
  { token: "small", el: "p", px: 13, line: 1.5, note: "libellés" },
  { token: "eyebrow", el: "p", px: 10, line: 1.4, note: "MAJUSCULES · 0.04em" },
] as const;

/** Familles de polices. */
export const fontFamilies = [
  {
    name: "Goodly Medium",
    role: "display : titres, wordmark, chiffres",
    varName: "--font-display",
  },
  {
    name: "Nunito",
    role: "body / UI : corps, libellés, texte long",
    varName: "--font-body",
  },
  {
    name: "Atkinson Hyperlegible",
    role: "accessibilité : mode dyslexie",
    varName: "--font-dyslexia",
  },
] as const;

/** Tokens de mouvement. */
export const motionTokens = {
  ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  easeLabel: "ease-out doux, sans rebond",
  durationDefaultMs: 200,
  durationRange: "120–320 ms",
  idle: [
    { name: "float", value: "6s", role: "flottement de la mascotte" },
    { name: "breathe", value: "8s", role: "respiration des décors" },
  ],
} as const;
