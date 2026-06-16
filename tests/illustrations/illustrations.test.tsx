import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Blob } from "@/components/illustrations/Blob";
import { Illustration } from "@/components/illustrations/Illustration";
import { Mascot } from "@/components/illustrations/Mascot";
import {
  illustrationKeys,
  illustrations,
  illustrationSrc,
  type IllustrationKey,
} from "@/lib/illustrations";

describe("registre illustrations.ts", () => {
  test("contient les 8 clés réelles de la mascotte", () => {
    const expected: IllustrationKey[] = [
      "kitoo-classic",
      "kitoo-crying",
      "kitoo-sleeping",
      "kitoo-soda",
      "kitoo-bubble-tea",
      "kitoo-sunglasses",
      "kitoo-skating",
      "kitoo-heart",
    ];
    for (const key of expected) {
      expect(illustrationKeys).toContain(key);
      expect(illustrations[key].file).toMatch(/\.(svg|png|webp)$/);
      expect(illustrations[key].kind).toBe("mascot");
    }
  });

  test("chaque entrée porte ses métadonnées (dimensions réelles)", () => {
    for (const key of illustrationKeys) {
      const m = illustrations[key];
      expect(m.width).toBeGreaterThan(0);
      expect(m.height).toBeGreaterThan(0);
      expect(typeof m.alt).toBe("string");
    }
  });

  test("illustrationSrc pointe vers le fichier réel", () => {
    expect(illustrationSrc("kitoo-classic")).toBe(
      "/illustrations/kitoo-classic.png",
    );
  });
});

describe("Illustration — résolution réelle vs fallback", () => {
  test("rend l'asset RÉEL (next/image) quand le fichier existe", () => {
    const { container } = render(<Illustration name="kitoo-classic" />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toContain("kitoo-classic");
  });

  test("FALLBACK placeholder SVG quand l'asset est absent (décor sans fichier)", () => {
    const { container } = render(<Illustration name="blob-soft" />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });

  test("porteuse de sens : alt du registre (rôle image)", () => {
    render(<Illustration name="kitoo-heart" />);
    expect(
      screen.getByRole("img", { name: illustrations["kitoo-heart"].alt }),
    ).toBeInTheDocument();
  });
});

describe("Mascot", () => {
  test("résout la clé kitoo-<pose> et expose un alt", () => {
    render(<Mascot pose="classic" />);
    expect(
      screen.getByRole("img", { name: illustrations["kitoo-classic"].alt }),
    ).toBeInTheDocument();
  });

  test("idle flottement gardé derrière motion-safe", () => {
    const { container } = render(<Mascot pose="classic" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("motion-safe:animate-float");
  });

  test("animate={false} retire l'animation idle", () => {
    const { container } = render(<Mascot pose="classic" animate={false} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).not.toContain("animate-float");
  });

  test("decorative : la mascotte devient aria-hidden (pas de rôle image)", () => {
    render(<Mascot pose="heart" decorative />);
    expect(screen.queryByRole("img")).toBeNull();
  });
});

describe("Blob", () => {
  test("décoratif (aria-hidden), pas dans l'arbre accessible", () => {
    const { container } = render(<Blob />);
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
