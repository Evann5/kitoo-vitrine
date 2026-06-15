import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Features } from "@/components/sections/Features";

describe("Features (scroll-story)", () => {
  test("rend les 3 blocs avec titre et description", () => {
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
    expect(
      screen.getByText(/validés par des professionnels de santé/i),
    ).toBeInTheDocument();
  });

  test("chaque bloc a une illustration (mascotte placeholder)", () => {
    render(<Features />);
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(3);
  });

  test("les icônes d'accent sont décoratives (aria-hidden)", () => {
    const { container } = render(<Features />);
    const decorativeIcons = container.querySelectorAll(
      'svg[aria-hidden="true"]',
    );
    expect(decorativeIcons.length).toBeGreaterThanOrEqual(3);
  });

  test("la section porte l'ancre #fonctionnalites", () => {
    const { container } = render(<Features />);
    expect(container.querySelector("#fonctionnalites")).not.toBeNull();
  });
});
