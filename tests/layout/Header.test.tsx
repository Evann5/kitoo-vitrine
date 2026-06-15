import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site-config";

describe("Header", () => {
  test("affiche tous les liens de navigation de siteConfig.nav", () => {
    render(<Header />);
    for (const item of siteConfig.nav) {
      // Présent en desktop ET dans le menu mobile (les deux sont dans le DOM).
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links[0]).toHaveAttribute("href", item.href);
    }
  });

  test("le CTA « Accéder à l'app » pointe vers siteConfig.appUrl en _blank", () => {
    render(<Header />);
    const ctas = screen.getAllByRole("link", { name: /Accéder à l'app/i });
    expect(ctas.length).toBeGreaterThanOrEqual(1);
    expect(ctas[0]).toHaveAttribute("href", siteConfig.appUrl);
    expect(ctas[0]).toHaveAttribute("target", "_blank");
    expect(ctas[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("cas limite : appUrl = '#' reste un lien cliquable sans erreur", () => {
    render(<Header />);
    const cta = screen.getAllByRole("link", { name: /Accéder à l'app/i })[0];
    expect(cta).toHaveAttribute("href", "#");
    expect(() => fireEvent.click(cta)).not.toThrow();
  });

  test("menu mobile : ouverture/fermeture via le burger, aria-expanded cohérent", () => {
    render(<Header />);
    const burger = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(burger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(burger);
    const opened = screen.getByRole("button", { name: "Fermer le menu" });
    expect(opened).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(opened);
    expect(
      screen.getByRole("button", { name: "Ouvrir le menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("menu mobile : fermeture via la touche Échap", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(
      screen.getByRole("button", { name: "Fermer le menu" }),
    ).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.getByRole("button", { name: "Ouvrir le menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("le bouton burger contrôle bien la région via aria-controls", () => {
    render(<Header />);
    const burger = screen.getByRole("button", { name: "Ouvrir le menu" });
    const controlsId = burger.getAttribute("aria-controls");
    expect(controlsId).toBeTruthy();
    const region = document.getElementById(controlsId as string);
    expect(region).not.toBeNull();
    // Une fois ouvert, le menu contient les liens de navigation.
    fireEvent.click(burger);
    expect(
      within(region as HTMLElement).getAllByRole("link").length,
    ).toBeGreaterThan(0);
  });
});
