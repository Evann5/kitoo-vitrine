import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { BackToTop } from "@/components/layout/BackToTop";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { siteConfig } from "@/lib/site-config";

type IOEntry = {
  isIntersecting: boolean;
  target: Element;
  intersectionRatio: number;
};
type IOCallback = (entries: IOEntry[]) => void;
const observers: { cb: IOCallback }[] = [];

beforeEach(() => {
  observers.length = 0;
  class IO {
    cb: IOCallback;
    constructor(cb: IOCallback) {
      this.cb = cb;
      observers.push({ cb });
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  globalThis.IntersectionObserver =
    IO as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.querySelectorAll("section[id]").forEach((s) => s.remove());
});

describe("Header — section active", () => {
  test("met aria-current=true sur le lien de la section visible", () => {
    siteConfig.nav.forEach((n) => {
      const s = document.createElement("section");
      s.id = n.href.replace("#", "");
      document.body.appendChild(s);
    });
    render(<Header />);

    const faqSection = document.getElementById("faq")!;
    act(() => {
      observers.forEach((o) =>
        o.cb([
          { isIntersecting: true, target: faqSection, intersectionRatio: 1 },
        ]),
      );
    });

    const faqLinks = screen.getAllByRole("link", { name: "FAQ" });
    expect(
      faqLinks.some((l) => l.getAttribute("aria-current") === "true"),
    ).toBe(true);
  });
});

describe("MobileCtaBar", () => {
  test("CTA vers appUrl en _blank sécurisé", () => {
    render(<MobileCtaBar />);
    const cta = screen.getByRole("link", {
      name: /Accéder à l'app/i,
      hidden: true,
    });
    expect(cta).toHaveAttribute("href", siteConfig.appUrl);
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    expect(cta).toHaveAttribute("target", "_blank");
  });

  test("masquée tant que le hero est visible (aria-hidden au départ)", () => {
    const { container } = render(<MobileCtaBar />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar).toHaveAttribute("aria-hidden", "true");
  });
});

describe("BackToTop", () => {
  test("bouton libellé, masqué (aria-hidden) en haut de page", () => {
    const { container } = render(<BackToTop />);
    const btn = container.querySelector(
      'button[aria-label="Revenir en haut de la page"]',
    );
    expect(btn).not.toBeNull();
    // Masqué et hors tabulation tant qu'on est en haut.
    expect(btn).toHaveAttribute("aria-hidden", "true");
    expect(btn).toHaveAttribute("tabindex", "-1");
  });

  test("remonte en haut au clic", () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
    const { container } = render(<BackToTop />);
    const btn = container.querySelector(
      'button[aria-label="Revenir en haut de la page"]',
    ) as HTMLButtonElement;
    fireEvent.click(btn);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});
