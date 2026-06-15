"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { neutralVariants, type RevealVariant, variants } from "@/lib/motion";

/**
 * Indique si l'utilisateur a demandé à réduire les animations
 * (`prefers-reduced-motion: reduce`). Ré-export du hook de Framer Motion pour
 * centraliser la source de vérité côté Kitoo.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

/**
 * Renvoie les variants d'entrée adaptés à la préférence de mouvement courante :
 * le preset demandé, ou des variants neutres (apparition immédiate) si
 * `prefers-reduced-motion: reduce` est actif.
 */
export function useRevealVariants(name: RevealVariant = "fadeInUp"): Variants {
  const reduce = useReducedMotion();
  return reduce ? neutralVariants : variants[name];
}

export default useReducedMotion;
