import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HowItWorks } from "@/components/sections/HowItWorks";

describe("HowItWorks (timeline)", () => {
  test("structure de liste ordonnée (<ol>) avec 3 étapes", () => {
    const { container } = render(<HowItWorks />);
    const ol = container.querySelector("ol");
    expect(ol).not.toBeNull();
    expect(ol!.querySelectorAll(":scope > li")).toHaveLength(3);
  });

  test("3 étapes numérotées dans le bon ordre", () => {
    render(<HowItWorks />);
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual([
      "Tu notes ton humeur du jour",
      "Tu reçois des ressources adaptées",
      "Tu échanges avec un pro si tu veux",
    ]);
    for (const n of ["1", "2", "3"]) {
      expect(screen.getByText(n)).toBeInTheDocument();
    }
  });

  test("le connecteur de timeline est décoratif (aria-hidden)", () => {
    const { container } = render(<HowItWorks />);
    // Connecteurs entre étapes : 2 (entre 1-2 et 2-3), aria-hidden.
    const decorative = container.querySelectorAll('li [aria-hidden="true"]');
    // badges (3) + connecteurs (2) sont tous décoratifs.
    expect(decorative.length).toBeGreaterThanOrEqual(5);
  });

  test("ton encourageant sans pression", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Pas de pression/i)).toBeInTheDocument();
  });

  test("la section porte l'ancre #comment-ca-marche", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector("#comment-ca-marche")).not.toBeNull();
  });

  test("sous reduced-motion, les étapes restent présentes", () => {
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
    render(<HowItWorks />);
    expect(
      screen.getByRole("heading", { name: "Tu notes ton humeur du jour" }),
    ).toBeInTheDocument();
  });
});
