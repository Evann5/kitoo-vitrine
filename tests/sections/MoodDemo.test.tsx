import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Gamification } from "@/components/sections/Gamification";
import { MoodSelector } from "@/components/sections/MoodSelector";
import { type MoodLevel, moods } from "@/lib/moods";

/** Mascottes factices (le vrai `Mascot` est server-only). */
const mascots = Object.fromEntries(
  moods.map((m) => [m.level, <span key={m.level}>mascotte-{m.level}</span>]),
) as Record<MoodLevel, React.ReactNode>;

describe("MoodSelector (démo humeur)", () => {
  test("rend les 5 humeurs avec leur libellé (pas la couleur seule)", () => {
    render(<MoodSelector mascots={mascots} />);
    const group = screen.getByRole("radiogroup");
    for (const m of moods) {
      expect(
        within(group).getByRole("radio", { name: m.label }),
      ).toBeInTheDocument();
    }
  });

  test("une seule humeur cochée au départ (radiogroup)", () => {
    render(<MoodSelector mascots={mascots} />);
    const checked = screen
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    expect(checked).toHaveLength(1);
  });

  test("sélectionner une humeur met à jour aria-checked et la mascotte", () => {
    render(<MoodSelector mascots={mascots} />);
    const tresPositif = screen.getByRole("radio", { name: "Très positif" });
    fireEvent.click(tresPositif);
    expect(tresPositif).toHaveAttribute("aria-checked", "true");
    // La scène affiche la mascotte correspondante (pose celebrate).
    expect(screen.getByText("mascotte-very-positive")).toBeInTheDocument();
  });

  test("opérable au clavier : flèche change la sélection (roving tabindex)", () => {
    render(<MoodSelector mascots={mascots} />);
    const radios = screen.getAllByRole("radio");
    const checkedIndex = radios.findIndex(
      (r) => r.getAttribute("aria-checked") === "true",
    );
    fireEvent.keyDown(radios[checkedIndex], { key: "ArrowRight" });
    const newChecked = screen
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    expect(newChecked).toHaveLength(1);
    expect(newChecked[0]).not.toBe(radios[checkedIndex]);
    // tabindex roving : le radio coché est focusable (0), les autres -1.
    expect(newChecked[0]).toHaveAttribute("tabindex", "0");
  });

  test("le visage d'humeur est décoratif (le libellé porte le sens)", () => {
    const { container } = render(<MoodSelector mascots={mascots} />);
    const faces = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(faces.length).toBeGreaterThanOrEqual(5);
  });
});

describe("Gamification (douce)", () => {
  test("affiche une série avec un libellé bienveillant", () => {
    render(<Gamification />);
    expect(
      screen.getByText(/7 jours d'affilée, continue comme ça/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Pas de pression/i)).toBeInTheDocument();
  });

  test("présente des badges de régularité", () => {
    render(<Gamification />);
    expect(screen.getByText("Première semaine")).toBeInTheDocument();
    expect(screen.getByText("Pause bien-être")).toBeInTheDocument();
  });
});

describe("MoodSelector sous reduced-motion", () => {
  test("l'interaction reste utilisable (sélection effective)", () => {
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
    render(<MoodSelector mascots={mascots} />);
    const neutre = screen.getByRole("radio", { name: "Neutre" });
    fireEvent.click(neutre);
    expect(neutre).toHaveAttribute("aria-checked", "true");
  });
});
