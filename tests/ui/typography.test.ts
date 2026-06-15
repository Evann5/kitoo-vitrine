import { describe, expect, test } from "vitest";
import config from "../../tailwind.config.ts";

/**
 * Garantit le seuil d'accessibilité WCAG : le corps de texte ne descend jamais
 * sous 16px. On vérifie la valeur du token `body` dans la config Tailwind.
 */
describe("typographie — taille du corps", () => {
  test("le token fontSize `body` vaut au moins 16px", () => {
    const fontSize = config.theme?.extend?.fontSize as
      | Record<string, [string, ...unknown[]]>
      | undefined;
    const body = fontSize?.body?.[0];
    expect(body).toBe("16px");
    expect(parseInt(body ?? "0", 10)).toBeGreaterThanOrEqual(16);
  });

  test("le token `heading` ne descend pas sous 16px non plus", () => {
    const fontSize = config.theme?.extend?.fontSize as
      | Record<string, [string, ...unknown[]]>
      | undefined;
    const heading = fontSize?.heading?.[0];
    expect(parseInt(heading ?? "0", 10)).toBeGreaterThanOrEqual(16);
  });
});
