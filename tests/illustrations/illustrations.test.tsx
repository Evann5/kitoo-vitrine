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
  test("contient toutes les clés attendues", () => {
    const expected: IllustrationKey[] = [
      "koala-wave",
      "koala-calm",
      "koala-thinking",
      "koala-celebrate",
      "koala-sleep",
      "koala-support",
      "blob-soft",
      "wave-divider",
    ];
    for (const key of expected) {
      expect(illustrationKeys).toContain(key);
    }
  });

  test("chaque entrée porte ses métadonnées (fichier, dims, kind)", () => {
    for (const key of illustrationKeys) {
      const m = illustrations[key];
      expect(m.file).toMatch(/\.(svg|png|webp)$/);
      expect(m.width).toBeGreaterThan(0);
      expect(m.height).toBeGreaterThan(0);
      expect(["mascot", "decor"]).toContain(m.kind);
    }
  });

  test("illustrationSrc construit le chemin public attendu", () => {
    expect(illustrationSrc("koala-wave")).toBe("/illustrations/koala-wave.svg");
  });
});

describe("Illustration (fallback placeholder)", () => {
  test("rend un placeholder SVG quand l'asset réel est absent", () => {
    const { container } = render(<Illustration name="koala-wave" />);
    // Aucun asset réel déposé → placeholder SVG (pas une balise <img>).
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });

  test("illustration porteuse de sens : rôle image + alt du registre", () => {
    render(<Illustration name="koala-wave" />);
    expect(
      screen.getByRole("img", { name: illustrations["koala-wave"].alt }),
    ).toBeInTheDocument();
  });

  test("décor : décoratif (aria-hidden), pas de rôle image", () => {
    render(<Illustration name="blob-soft" />);
    expect(screen.queryByRole("img")).toBeNull();
  });
});

describe("Mascot", () => {
  test("applique la pose (clé koala-<pose>) et expose un alt", () => {
    render(<Mascot pose="calm" />);
    expect(
      screen.getByRole("img", { name: illustrations["koala-calm"].alt }),
    ).toBeInTheDocument();
  });

  test("idle flottement gardé derrière motion-safe (neutralisé en reduced-motion)", () => {
    const { container } = render(<Mascot pose="wave" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("motion-safe:animate-float");
  });

  test("animate={false} retire l'animation idle", () => {
    const { container } = render(<Mascot pose="wave" animate={false} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).not.toContain("animate-float");
  });

  test("decorative : la mascotte devient aria-hidden", () => {
    render(<Mascot pose="wave" decorative />);
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
