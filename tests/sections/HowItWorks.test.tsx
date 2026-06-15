import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HowItWorks } from "@/components/sections/HowItWorks";

describe("HowItWorks (scroll-story)", () => {
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

  test("exactement 3 étapes numérotées dans une liste ordonnée", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelectorAll("ol > li")).toHaveLength(3);
    for (const n of ["1", "2", "3"]) {
      expect(screen.getByText(n)).toBeInTheDocument();
    }
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
