import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

describe("Reveal", () => {
  test("rend ses enfants dans le DOM (même sans intersection)", () => {
    render(
      <Reveal>
        <p>Contenu révélé</p>
      </Reveal>,
    );
    expect(screen.getByText("Contenu révélé")).toBeInTheDocument();
  });

  test("supporte l'élément `as` (section)", () => {
    const { container } = render(
      <Reveal as="section">
        <span>x</span>
      </Reveal>,
    );
    expect(container.querySelector("section")).not.toBeNull();
  });
});

describe("Stagger", () => {
  test("rend le conteneur et ses items", () => {
    render(
      <Stagger as="ul">
        <StaggerItem as="li">Un</StaggerItem>
        <StaggerItem as="li">Deux</StaggerItem>
      </Stagger>,
    );
    expect(screen.getByText("Un")).toBeInTheDocument();
    expect(screen.getByText("Deux")).toBeInTheDocument();
  });
});

describe("Reveal sous prefers-reduced-motion", () => {
  test("rend les enfants statiquement (pas de variant d'entrée masquant)", () => {
    // Simule reduced-motion via matchMedia.
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
    render(
      <Reveal>
        <p>Toujours visible</p>
      </Reveal>,
    );
    expect(screen.getByText("Toujours visible")).toBeInTheDocument();
  });
});
