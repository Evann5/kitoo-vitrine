import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Faq } from "@/components/sections/Faq";

describe("Faq", () => {
  test("la section porte l'ancre #faq", () => {
    const { container } = render(<Faq />);
    expect(container.querySelector("#faq")).not.toBeNull();
  });

  test("un seul panneau ouvert au départ (le premier)", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button");
    const expanded = buttons.filter(
      (b) => b.getAttribute("aria-expanded") === "true",
    );
    expect(expanded).toHaveLength(1);
  });

  test("clic ferme le panneau ouvert (aria-expanded cohérent)", () => {
    render(<Faq />);
    const first = screen.getByRole("button", {
      name: /Mes données sont-elles confidentielles/i,
    });
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  test("ouvrir un item referme l'autre (un seul ouvert à la fois)", () => {
    render(<Faq />);
    const first = screen.getByRole("button", {
      name: /Mes données sont-elles confidentielles/i,
    });
    const second = screen.getByRole("button", {
      name: /Comment accéder à Kitoo/i,
    });
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  test("le bouton contrôle un panneau via aria-controls", () => {
    render(<Faq />);
    const btn = screen.getByRole("button", {
      name: /Mes données sont-elles confidentielles/i,
    });
    const panelId = btn.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId as string)).not.toBeNull();
  });
});
