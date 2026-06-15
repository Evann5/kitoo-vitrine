import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Audience } from "@/components/sections/Audience";

describe("Audience", () => {
  test("mentionne la cible 18–24 ans", () => {
    render(<Audience />);
    expect(screen.getByText(/18 et 24 ans/i)).toBeInTheDocument();
  });

  test("mentionne les psychologues partenaires (vouvoyés)", () => {
    render(<Audience />);
    expect(screen.getByText(/psychologue partenaire/i)).toBeInTheDocument();
    expect(screen.getByText(/Vous accompagnez/i)).toBeInTheDocument();
  });

  test("reste sur un registre non diagnostique", () => {
    render(<Audience />);
    expect(
      screen.getByText(/ils ne te diagnostiquent jamais/i),
    ).toBeInTheDocument();
  });

  test("la section porte l'ancre #pour-qui", () => {
    const { container } = render(<Audience />);
    expect(container.querySelector("#pour-qui")).not.toBeNull();
  });

  test("les icônes sont décoratives (aria-hidden)", () => {
    const { container } = render(<Audience />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(2);
    icons.forEach((icon) =>
      expect(icon).toHaveAttribute("aria-hidden", "true"),
    );
  });
});
