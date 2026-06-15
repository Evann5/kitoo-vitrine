/**
 * Registre central des illustrations Kitoo.
 *
 * Le code consomme une **clé** (jamais un chemin en dur). Pour fournir la vraie
 * illustration, dépose un fichier dans `public/illustrations/` avec le nom
 * indiqué ci-dessous : le composant `Illustration` l'utilisera automatiquement
 * (sinon il affiche un placeholder doux). Voir `public/illustrations/README.md`.
 */

/** Nature de l'illustration → détermine le placeholder de repli. */
export type IllustrationKind = "mascot" | "decor";

export type IllustrationMeta = {
  /** Nom de fichier attendu dans `public/illustrations/`. */
  file: string;
  /** Texte alternatif par défaut (sens de l'image). Vide = décoratif. */
  alt: string;
  /** Dimensions intrinsèques (anti-CLS). */
  width: number;
  height: number;
  /** Type de repli si l'asset final est absent. */
  kind: IllustrationKind;
};

/** Clés de la mascotte koala. */
export type MascotPose =
  | "wave"
  | "calm"
  | "thinking"
  | "celebrate"
  | "sleep"
  | "support";

/** Toutes les clés du registre. */
export type IllustrationKey =
  | `koala-${MascotPose}`
  | "blob-soft"
  | "wave-divider";

export const illustrations: Record<IllustrationKey, IllustrationMeta> = {
  "koala-wave": {
    file: "koala-wave.svg",
    alt: "Le koala Kitoo fait un signe de la main pour t'accueillir",
    width: 400,
    height: 400,
    kind: "mascot",
  },
  "koala-calm": {
    file: "koala-calm.svg",
    alt: "Le koala Kitoo, paisible et détendu",
    width: 400,
    height: 400,
    kind: "mascot",
  },
  "koala-thinking": {
    file: "koala-thinking.svg",
    alt: "Le koala Kitoo, pensif",
    width: 400,
    height: 400,
    kind: "mascot",
  },
  "koala-celebrate": {
    file: "koala-celebrate.svg",
    alt: "Le koala Kitoo célèbre une bonne nouvelle",
    width: 400,
    height: 400,
    kind: "mascot",
  },
  "koala-sleep": {
    file: "koala-sleep.svg",
    alt: "Le koala Kitoo se repose paisiblement",
    width: 400,
    height: 400,
    kind: "mascot",
  },
  "koala-support": {
    file: "koala-support.svg",
    alt: "Le koala Kitoo tend la main pour te soutenir",
    width: 400,
    height: 400,
    kind: "mascot",
  },
  "blob-soft": {
    file: "blob-soft.svg",
    alt: "",
    width: 600,
    height: 600,
    kind: "decor",
  },
  "wave-divider": {
    file: "wave-divider.svg",
    alt: "",
    width: 1440,
    height: 120,
    kind: "decor",
  },
};

/** Ratio largeur/hauteur d'une clé (utile pour réserver l'espace). */
export function illustrationRatio(key: IllustrationKey): number {
  const m = illustrations[key];
  return m.width / m.height;
}

/** Chemin public attendu de l'asset final d'une clé. */
export function illustrationSrc(key: IllustrationKey): string {
  return `/illustrations/${illustrations[key].file}`;
}

/** Liste ordonnée de toutes les clés (démo, itérations). */
export const illustrationKeys = Object.keys(illustrations) as IllustrationKey[];
