import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SkipLink } from "@/components/layout/SkipLink";

describe("SkipLink", () => {
  test("présent et cible #content", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: "Aller au contenu" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#content");
  });
});
