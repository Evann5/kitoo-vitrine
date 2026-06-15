import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "@/app/page";

// La page d'accueil rend le Hero comme première section (titre de niveau 1).
test("la page d'accueil affiche l'accroche du Hero", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /Prends soin de toi/i,
  );
});
