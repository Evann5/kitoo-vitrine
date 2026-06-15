import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  test("surface blanche par défaut, rayon card", () => {
    render(<Card>Contenu</Card>);
    const card = screen.getByText("Contenu");
    expect(card).toHaveClass("bg-white");
    expect(card).toHaveClass("rounded-card");
  });

  test("variant soft : fond brume lavande (brand-100)", () => {
    render(<Card soft>Doux</Card>);
    const card = screen.getByText("Doux");
    expect(card).toHaveClass("bg-brand-100");
    expect(card).not.toHaveClass("bg-white");
  });
});
