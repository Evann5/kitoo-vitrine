import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Features } from "@/components/sections/Features";

describe("Features (grille bento)", () => {
  test("rend les 3 piliers en cards (titres h3) avec description", () => {
    render(<Features />);
    for (const title of [
      "Mood tracker",
      "Chat avec un pro",
      "Espace bien-être",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByText(/Note ton humeur chaque jour/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/messagerie sécurisée avec un psychologue/i),
    ).toBeInTheDocument();
  });

  test("icône d'accent (svg) + illustration mascotte (img) par card", () => {
    const { container } = render(<Features />);
    // 3 icônes Lucide décoratives (svg aria-hidden).
    expect(
      container.querySelectorAll('svg[aria-hidden="true"]').length,
    ).toBeGreaterThanOrEqual(3);
    // 3 mascottes réelles (next/image → <img>), décoratives.
    expect(container.querySelectorAll("img").length).toBeGreaterThanOrEqual(3);
  });

  test("disposition en GRILLE, pas une liste ordonnée (différenciation)", () => {
    const { container } = render(<Features />);
    expect(container.querySelector("ol")).toBeNull();
    expect(container.querySelector('[class*="grid"]')).not.toBeNull();
  });

  test("la section porte l'ancre #fonctionnalites", () => {
    const { container } = render(<Features />);
    expect(container.querySelector("#fonctionnalites")).not.toBeNull();
  });
});
