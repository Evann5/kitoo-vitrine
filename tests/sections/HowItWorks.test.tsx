import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HowItWorks } from "@/components/sections/HowItWorks";

describe("HowItWorks", () => {
  test("rend les 3 étapes dans le bon ordre", () => {
    render(<HowItWorks />);
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual([
      "Tu notes ton humeur du jour",
      "Tu reçois des ressources adaptées",
      "Tu échanges avec un pro si tu veux",
    ]);
  });

  test("rend exactement 3 étapes dans une liste ordonnée", () => {
    const { container } = render(<HowItWorks />);
    const items = container.querySelectorAll("ol > li");
    expect(items).toHaveLength(3);
  });

  test("la section porte l'ancre #comment-ca-marche", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector("#comment-ca-marche")).not.toBeNull();
  });

  test("les icônes des étapes sont décoratives (aria-hidden)", () => {
    const { container } = render(<HowItWorks />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(3);
    icons.forEach((icon) =>
      expect(icon).toHaveAttribute("aria-hidden", "true"),
    );
  });
});
