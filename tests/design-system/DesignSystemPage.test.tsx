import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import DesignSystemPage from "@/app/design-system/page";
import { CopyHex } from "@/components/design-system/CopyHex";
import { MotionDemo } from "@/components/design-system/MotionDemo";
import { moods } from "@/lib/moods";

function mockMatchMedia(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  mockMatchMedia(false);
});

describe("Page /design-system", () => {
  test("rend les sections clés et les ancres de la sous-navigation", () => {
    const { container } = render(<DesignSystemPage />);

    // Titres de section présents.
    for (const title of [
      "Couleurs",
      "Typographie",
      "Composants",
      "Mascotte & illustrations",
    ]) {
      expect(
        screen.getByRole("heading", { name: new RegExp(title, "i") }),
      ).toBeInTheDocument();
    }

    // Bloc dédié au logo & wordmark.
    expect(screen.getByText("Logo & wordmark")).toBeInTheDocument();

    // Sous-navigation : une ancre par section.
    for (const id of ["couleurs", "typographie", "composants", "illustrations"]) {
      expect(container.querySelector(`a[href="#${id}"]`)).not.toBeNull();
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  test("nuanciers : 10 teintes pervenche, 10 teintes encre", () => {
    render(<DesignSystemPage />);
    expect(screen.getAllByText(/^brand-\d+$/)).toHaveLength(10);
    expect(screen.getAllByText(/^ink-\d+$/)).toHaveLength(10);
  });

  test("échelle d'humeur : 5 niveaux avec leur hex par défaut", () => {
    render(<DesignSystemPage />);
    const defaults = ["#FFD93D", "#A8E6CF", "#E0E0E0", "#FF8C42", "#FF595E"];
    expect(moods).toHaveLength(5);
    for (const m of moods) {
      expect(screen.getAllByText(m.label).length).toBeGreaterThanOrEqual(1);
    }
    for (const hex of defaults) {
      expect(screen.getAllByText(hex).length).toBeGreaterThanOrEqual(1);
    }
  });

  test("les composants Button (variants) et Card sont rendus", () => {
    render(<DesignSystemPage />);
    expect(
      screen.getByRole("button", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ghost" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Outline" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Card soft")).toBeInTheDocument();
  });
});

describe("CopyHex", () => {
  test("copie la valeur hex dans le presse-papiers et annonce le succès", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyHex value="#9B9DF0" label="brand-500" />);
    const btn = screen.getByRole("button", { name: /Copier brand-500 #9B9DF0/i });
    fireEvent.click(btn);

    expect(writeText).toHaveBeenCalledWith("#9B9DF0");
    expect(await screen.findByText("Copié")).toBeInTheDocument();
  });
});

describe("MotionDemo", () => {
  test("neutralise les animations sous prefers-reduced-motion", () => {
    mockMatchMedia(true);
    const { container } = render(<MotionDemo />);
    const box = container.querySelector("[data-animated]") as HTMLElement;
    expect(box.getAttribute("data-animated")).toBe("false");
    expect(box.className).not.toMatch(/animate-float/);
    expect(
      within(container as HTMLElement).getByText(/animations neutralisées/i),
    ).toBeInTheDocument();
  });

  test("active les animations sans préférence de réduction", () => {
    mockMatchMedia(false);
    const { container } = render(<MotionDemo />);
    const box = container.querySelector("[data-animated]") as HTMLElement;
    expect(box.getAttribute("data-animated")).toBe("true");
    expect(box.className).toMatch(/animate-float/);
  });
});
