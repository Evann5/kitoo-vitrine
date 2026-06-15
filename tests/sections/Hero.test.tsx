import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/lib/site-config";

describe("Hero", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("un seul <h1> (l'accroche), + sous-titre", () => {
    render(<Hero />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(/Prends soin de toi/i);
    expect(
      screen.getByText(/suivre ton humeur au quotidien/i),
    ).toBeInTheDocument();
  });

  test("CTA dominant unique vers siteConfig.appUrl (_blank sécurisé)", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /Accéder à l'app/i });
    expect(cta).toHaveAttribute("href", siteConfig.appUrl);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("lien secondaire « Découvrir » → #fonctionnalites", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Découvrir" })).toHaveAttribute(
      "href",
      "#fonctionnalites",
    );
  });

  test("la mascotte est rendue avec un nom accessible (pose wave)", () => {
    render(<Hero />);
    const mascot = screen.getByRole("img");
    expect(mascot).toHaveAccessibleName(/koala/i);
  });

  test("sous reduced-motion, le contenu reste présent (apparition immédiate)", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Accéder à l'app/i }),
    ).toBeInTheDocument();
  });
});
