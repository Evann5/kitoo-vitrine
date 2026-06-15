import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Container } from "@/components/ui/Container";

describe("Container", () => {
  test("largeur contenu par défaut (~1180px)", () => {
    render(<Container data-testid="c">x</Container>);
    expect(screen.getByTestId("c")).toHaveClass("max-w-content");
  });

  test("variante prose (~680px)", () => {
    render(
      <Container width="prose" data-testid="c">
        x
      </Container>,
    );
    const c = screen.getByTestId("c");
    expect(c).toHaveClass("max-w-prose");
    expect(c).not.toHaveClass("max-w-content");
  });
});
