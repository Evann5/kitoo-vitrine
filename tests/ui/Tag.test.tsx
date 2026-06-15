import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Tag } from "@/components/ui/Tag";

describe("Tag", () => {
  test("non sélectionné par défaut (aria-pressed=false, contour neutre)", () => {
    render(<Tag>respiration</Tag>);
    const tag = screen.getByRole("button", { name: "respiration" });
    expect(tag).toHaveAttribute("aria-pressed", "false");
    expect(tag).toHaveClass("border-ink-300");
  });

  test("sélectionné : aria-pressed=true et remplissage pervenche", () => {
    render(<Tag selected>respiration</Tag>);
    const tag = screen.getByRole("button");
    expect(tag).toHaveAttribute("aria-pressed", "true");
    expect(tag).toHaveClass("bg-brand-700");
  });

  test("déclenche onClick", () => {
    const onClick = vi.fn();
    render(<Tag onClick={onClick}>stress</Tag>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("type=button par défaut", () => {
    render(<Tag>x</Tag>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
