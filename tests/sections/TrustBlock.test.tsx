import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TrustBlock } from "@/components/sections/TrustBlock";

describe("TrustBlock", () => {
  test("contient le disclaimer médical obligatoire", () => {
    render(<TrustBlock />);
    expect(
      screen.getByText(/ne remplace pas un suivi médical professionnel/i),
    ).toBeInTheDocument();
  });

  test("mentionne la conformité RGPD (accès et effacement)", () => {
    render(<TrustBlock />);
    expect(screen.getByText(/Conforme au RGPD/i)).toBeInTheDocument();
    expect(screen.getByText(/droit à l'effacement/i)).toBeInTheDocument();
  });

  test("mentionne le chiffrement et l'authentification OAuth", () => {
    render(<TrustBlock />);
    expect(screen.getAllByText(/chiffré/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/OAuth 2\.0/i)).toBeInTheDocument();
  });

  test("les icônes sont décoratives (aria-hidden)", () => {
    const { container } = render(<TrustBlock />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(3);
    icons.forEach((icon) =>
      expect(icon).toHaveAttribute("aria-hidden", "true"),
    );
  });
});
