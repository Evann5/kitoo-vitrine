import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  test("rend le disclaimer médical obligatoire", () => {
    render(<Footer />);
    expect(
      screen.getByText(/ne remplace pas un suivi médical professionnel/i),
    ).toBeInTheDocument();
  });

  test("le copyright affiche l'année courante (dynamique)", () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(`© ${year} Kitoo`))).toBeInTheDocument();
  });

  test("expose les colonnes légales et réseaux", () => {
    render(<Footer />);
    expect(screen.getByText("Confidentialité")).toBeInTheDocument();
    expect(screen.getByText("Mentions légales")).toBeInTheDocument();
    expect(screen.getByText("CGU")).toBeInTheDocument();
  });
});
