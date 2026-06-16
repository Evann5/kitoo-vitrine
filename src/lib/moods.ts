import type { MascotPose } from "@/lib/illustrations";

/** Niveaux de l'échelle d'humeur (fixe, design system Kitoo). */
export type MoodLevel =
  | "very-positive"
  | "positive"
  | "neutral"
  | "negative"
  | "very-negative";

export type Mood = {
  level: MoodLevel;
  /** Libellé textuel (jamais la couleur seule). */
  label: string;
  /** Couleur fixe du visage (échelle d'humeur du DS). */
  color: string;
  /** Teinte douce « compagne » (fond émotionnel). */
  soft: string;
  /** Pose de la mascotte associée à cette humeur (réaction douce). */
  pose: MascotPose;
};

/**
 * Échelle d'humeur du design system : **fixe, à ne pas re-thématiser**.
 * Ordonnée du plus positif au plus négatif. Les teintes `soft` servent de fond
 * émotionnel doux ; les `pose` font réagir la mascotte avec bienveillance
 * (l'humeur la plus basse appelle une pose de soutien, jamais alarmante).
 */
export const moods: Mood[] = [
  {
    level: "very-positive",
    label: "Très positif",
    color: "#FFD93D",
    soft: "#FFF7D6",
    pose: "sunglasses",
  },
  {
    level: "positive",
    label: "Positif",
    color: "#A8E6CF",
    soft: "#E6F7EF",
    pose: "soda",
  },
  {
    level: "neutral",
    label: "Neutre",
    color: "#E0E0E0",
    soft: "#F3F3F3",
    pose: "classic",
  },
  {
    // TODO: ajouter une vraie pose « légèrement triste » ; en attendant, on
    // reste sur la pose neutre (jamais alarmant pour un état seulement négatif).
    level: "negative",
    label: "Négatif",
    color: "#FF8C42",
    soft: "#FFEAD9",
    pose: "classic",
  },
  {
    // L'humeur la plus basse : la mascotte pleure *avec* toi (soutien, jamais
    // alarmant), cf. ménagement autour de `kitoo-crying`.
    level: "very-negative",
    label: "Très négatif",
    color: "#FF595E",
    soft: "#FFE2E3",
    pose: "crying",
  },
];

/** Recherche une humeur par niveau. */
export function getMood(level: MoodLevel): Mood {
  return moods.find((m) => m.level === level) ?? moods[1];
}
