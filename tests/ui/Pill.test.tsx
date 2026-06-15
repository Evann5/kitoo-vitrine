import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Pill } from "@/components/ui/Pill";

describe("Pill", () => {
  test("rend une étiquette arrondie (rayon 999px)", () => {
    render(<Pill>Respiration</Pill>);
    const pill = screen.getByText("Respiration");
    expect(pill).toHaveClass("rounded-pill");
    expect(pill).toHaveClass("bg-brand-100");
  });

  test("transmet className", () => {
    render(
      <Pill className="extra" data-testid="p">
        Sommeil
      </Pill>,
    );
    expect(screen.getByTestId("p")).toHaveClass("extra");
  });
});
