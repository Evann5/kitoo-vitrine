import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Trust } from "@/components/sections/Trust";

describe("Trust (sécurité / RGPD)", () => {
  test("contient le disclaimer médical obligatoire", () => {
    render(<Trust />);
    expect(
      screen.getByText(/ne remplace pas un suivi médical professionnel/i),
    ).toBeInTheDocument();
  });

  test("mentions sécurité & RGPD (chiffrement, OAuth, accès/effacement)", () => {
    render(<Trust />);
    expect(screen.getByText(/Tes échanges sont chiffrés/i)).toBeInTheDocument();
    expect(screen.getByText(/OAuth 2\.0/i)).toBeInTheDocument();
    expect(screen.getByText(/Conforme au RGPD/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/droit à l'effacement/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  test("caution professionnelle présente", () => {
    render(<Trust />);
    expect(screen.getByText(/Validé par des pros/i)).toBeInTheDocument();
  });

  test("la section porte l'ancre #confiance", () => {
    const { container } = render(<Trust />);
    expect(container.querySelector("#confiance")).not.toBeNull();
  });
});

describe("Stats (compteurs accessibles)", () => {
  test("la valeur finale de chaque stat est dans le DOM (lisible sans animation)", () => {
    render(<Stats />);
    // compteurs : la valeur finale est l'état initial (SSR / reduced / no-JS)
    expect(screen.getByText(/100\s*%/)).toBeInTheDocument();
    expect(screen.getByText(/^5\s*min/)).toBeInTheDocument();
    expect(screen.getByText("RGPD")).toBeInTheDocument();
  });

  test("les libellés des stats sont présents", () => {
    render(<Stats />);
    expect(
      screen.getByText(/validés par des professionnels de santé/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/exercice de respiration/i)).toBeInTheDocument();
  });

  test("compteur : valeur finale exposée via aria-label", () => {
    render(<Stats />);
    expect(screen.getByLabelText("100 %")).toBeInTheDocument();
  });
});

describe("Testimonials (personas fictifs)", () => {
  test("rend plusieurs cartes avec nom (persona) et citation", () => {
    render(<Testimonials />);
    for (const name of ["Léa, 21 ans", "Yanis, 19 ans", "Camille, 23 ans"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getByText(/devenu mon petit rituel/i)).toBeInTheDocument();
  });

  test("mention illustrative présente (honnêteté)", () => {
    render(<Testimonials />);
    expect(screen.getByText(/illustratifs/i)).toBeInTheDocument();
  });

  test("avatars en initiales décoratifs (aria-hidden)", () => {
    const { container } = render(<Testimonials />);
    const avatars = container.querySelectorAll('[aria-hidden="true"]');
    expect(avatars.length).toBeGreaterThanOrEqual(4);
  });
});

describe("Stats sous reduced-motion", () => {
  test("la valeur finale reste affichée (pas d'animation requise)", () => {
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q.includes("reduce"),
      media: q,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    render(<Stats />);
    expect(screen.getByText(/100\s*%/)).toBeInTheDocument();
    expect(screen.getByText(/^5\s*min/)).toBeInTheDocument();
  });
});
