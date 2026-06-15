import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";

describe("AccessibilityToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-font");
    document.documentElement.removeAttribute("data-contrast");
  });
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-font");
    document.documentElement.removeAttribute("data-contrast");
  });

  test("le mode dyslexie applique data-font + Atkinson et persiste", () => {
    render(<AccessibilityToggle />);
    const btn = screen.getByRole("button", { name: /Mode dyslexie/i });
    expect(btn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.getAttribute("data-font")).toBe("dyslexia");
    expect(localStorage.getItem("kitoo-dyslexia")).toBe("true");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.hasAttribute("data-font")).toBe(false);
    expect(localStorage.getItem("kitoo-dyslexia")).toBe("false");
  });

  test("le mode daltonisme applique la palette alternative et persiste", () => {
    render(<AccessibilityToggle />);
    const btn = screen.getByRole("button", { name: /Mode daltonisme/i });

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.getAttribute("data-contrast")).toBe(
      "colorblind",
    );
    expect(localStorage.getItem("kitoo-contrast")).toBe("true");
  });

  test("relit l'état persisté/appliqué sur <html> à l'hydratation", () => {
    document.documentElement.setAttribute("data-font", "dyslexia");
    render(<AccessibilityToggle />);
    expect(
      screen.getByRole("button", { name: /Mode dyslexie/i }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
