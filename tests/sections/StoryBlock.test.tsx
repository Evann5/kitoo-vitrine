import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { StoryBlock } from "@/components/sections/StoryBlock";

const illus = <span>ILLUSTRATION</span>;

describe("StoryBlock", () => {
  test("rend le titre (h3), le texte et l'illustration", () => {
    render(
      <StoryBlock title="Mood tracker" illustration={illus}>
        <p>Note ton humeur chaque jour.</p>
      </StoryBlock>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Mood tracker" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Note ton humeur chaque jour."),
    ).toBeInTheDocument();
    expect(screen.getByText("ILLUSTRATION")).toBeInTheDocument();
  });

  test("alternance par défaut : illustration à droite (md:order-2)", () => {
    render(
      <StoryBlock title="T" illustration={illus}>
        <p>x</p>
      </StoryBlock>,
    );
    const wrapper = screen
      .getByText("ILLUSTRATION")
      .closest('[class*="order"]');
    expect(wrapper?.className).toContain("md:order-2");
  });

  test("reverse : illustration à gauche (md:order-1)", () => {
    render(
      <StoryBlock title="T" illustration={illus} reverse>
        <p>x</p>
      </StoryBlock>,
    );
    const wrapper = screen
      .getByText("ILLUSTRATION")
      .closest('[class*="order"]');
    expect(wrapper?.className).toContain("md:order-1");
  });

  test("affiche le numéro d'étape quand fourni", () => {
    render(
      <StoryBlock title="Étape" illustration={illus} step={2}>
        <p>x</p>
      </StoryBlock>,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("sous reduced-motion, le contenu reste présent", () => {
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
    render(
      <StoryBlock title="Titre" illustration={illus}>
        <p>Texte visible</p>
      </StoryBlock>,
    );
    expect(screen.getByText("Texte visible")).toBeInTheDocument();
    expect(screen.getByText("ILLUSTRATION")).toBeInTheDocument();
  });
});
