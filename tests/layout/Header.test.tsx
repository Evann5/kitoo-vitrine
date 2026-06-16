import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site-config";

describe("Header", () => {
  test("le CTA « Accéder à l'app » pointe vers siteConfig.appUrl en _blank", () => {
    render(<Header />);
    const cta = screen.getByRole("link", { name: /Accéder à l'app/i });
    expect(cta).toHaveAttribute("href", siteConfig.appUrl);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("cas limite : appUrl = '#' reste un lien cliquable sans erreur", () => {
    render(<Header />);
    const cta = screen.getByRole("link", { name: /Accéder à l'app/i });
    expect(cta).toHaveAttribute("href", "#");
    expect(() => fireEvent.click(cta)).not.toThrow();
  });

  test("navbar minimaliste : logo + CTA uniquement (pas de liens de section)", () => {
    render(<Header />);
    // Seuls deux liens : le logo (vers #hero) et le CTA.
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(screen.queryByRole("button")).toBeNull();
  });

  test("affiche le nouveau logo Kitoo (.png)", () => {
    const { container } = render(<Header />);
    const logo = container.querySelector('img[src*="kitoo-logo"]');
    expect(logo).not.toBeNull();
  });
});
