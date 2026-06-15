import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  test("ton brand par défaut (rayon pill)", () => {
    render(<Badge>Nouveau</Badge>);
    const badge = screen.getByText("Nouveau");
    expect(badge).toHaveClass("rounded-pill");
    expect(badge).toHaveClass("bg-brand-100");
  });

  test("applique le ton sémantique demandé", () => {
    render(<Badge tone="success">Validé</Badge>);
    expect(screen.getByText("Validé")).toHaveClass("text-success");
  });

  test("transmet className et attributs", () => {
    render(
      <Badge tone="danger" className="extra" data-testid="b">
        Urgent
      </Badge>,
    );
    const badge = screen.getByTestId("b");
    expect(badge).toHaveClass("extra");
    expect(badge).toHaveClass("text-danger");
  });
});
