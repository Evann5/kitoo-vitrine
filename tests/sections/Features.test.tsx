import { render, screen } from "@testing-library/react";
import { Leaf } from "lucide-react";
import { describe, expect, test } from "vitest";
import { FeatureCard, Features } from "@/components/sections/Features";

describe("Features", () => {
  test("rend les 3 cards avec titre et description", () => {
    render(<Features />);
    for (const title of [
      "Mood tracker",
      "Chat avec un pro",
      "Espace bien-être",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
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

  test("la section porte l'ancre #fonctionnalites", () => {
    const { container } = render(<Features />);
    expect(container.querySelector("#fonctionnalites")).not.toBeNull();
  });

  test("chaque icône de feature est décorative (aria-hidden)", () => {
    const { container } = render(
      <FeatureCard icon={Leaf} title="Test" description="Desc" />,
    );
    const icon = container.querySelector("svg");
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  test("cas limite : feature sans icône ne fait pas planter le rendu", () => {
    expect(() =>
      render(<FeatureCard title="Sans icône" description="OK quand même" />),
    ).not.toThrow();
    expect(
      screen.getByRole("heading", { name: "Sans icône" }),
    ).toBeInTheDocument();
  });
});
