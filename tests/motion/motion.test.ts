import { describe, expect, test } from "vitest";
import {
  ease,
  neutralVariants,
  resolveVariants,
  transitions,
  variants,
} from "@/lib/motion";

describe("motion presets", () => {
  test("expose les variants attendus", () => {
    for (const key of [
      "fadeInUp",
      "fadeIn",
      "scaleIn",
      "staggerContainer",
    ] as const) {
      expect(variants[key]).toBeDefined();
    }
  });

  test("transitions douces alignées sur les tokens (ease-out, 120–320 ms)", () => {
    expect(ease).toEqual([0.22, 0.61, 0.36, 1]);
    expect(transitions.soft.duration).toBeGreaterThanOrEqual(0.12);
    expect(transitions.soft.duration).toBeLessThanOrEqual(0.32);
    expect(transitions.quick.duration).toBeLessThan(transitions.soft.duration);
  });

  test("fadeInUp anime opacité + translation verticale (transform, pas layout)", () => {
    const hidden = variants.fadeInUp.hidden as { opacity: number; y: number };
    expect(hidden.opacity).toBe(0);
    expect(hidden.y).toBeGreaterThan(0);
  });

  test("staggerContainer décale ses enfants", () => {
    const show = variants.staggerContainer.show as {
      transition: { staggerChildren: number };
    };
    expect(show.transition.staggerChildren).toBeGreaterThan(0);
  });
});

describe("resolveVariants (reduced-motion)", () => {
  test("reduce=false renvoie le preset demandé", () => {
    expect(resolveVariants("fadeInUp", false)).toBe(variants.fadeInUp);
  });

  test("reduce=true renvoie des variants neutres (aucun déplacement)", () => {
    const v = resolveVariants("fadeInUp", true);
    expect(v).toBe(neutralVariants);
    const hidden = v.hidden as { opacity: number; y: number; scale: number };
    expect(hidden.opacity).toBe(1);
    expect(hidden.y).toBe(0);
    expect(hidden.scale).toBe(1);
  });
});
