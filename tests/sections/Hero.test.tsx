import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/lib/site-config";

describe("Hero", () => {
  test("rend le titre et les deux CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Prends soin de toi/i,
    );
    expect(
      screen.getByRole("link", { name: /Accéder à l'app/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Découvrir" })).toBeInTheDocument();
  });

  test("le CTA primaire pointe vers siteConfig.appUrl en _blank sécurisé", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /Accéder à l'app/i });
    expect(cta).toHaveAttribute("href", siteConfig.appUrl);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("le CTA secondaire cible l'ancre #fonctionnalites", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Découvrir" })).toHaveAttribute(
      "href",
      "#fonctionnalites",
    );
  });

  test("la mascotte a un alt descriptif non vide", () => {
    render(<Hero />);
    const img = screen.getByRole("img");
    expect(img).toHaveAccessibleName();
    expect(img.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
  });
});
