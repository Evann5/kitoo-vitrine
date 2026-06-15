import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "@/app/page";

// Valide la chaîne jsdom + Testing Library en rendant le placeholder actuel.
test("la page d'accueil affiche le nom de marque", () => {
  render(<Home />);
  expect(screen.getByRole("heading")).toHaveTextContent("Kitoo");
});
