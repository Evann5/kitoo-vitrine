import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  test("rend le variant primary par défaut (pervenche)", () => {
    render(<Button>Noter mon humeur</Button>);
    const btn = screen.getByRole("button", { name: "Noter mon humeur" });
    expect(btn).toHaveClass("bg-brand-500");
    expect(btn).toHaveAttribute("type", "button");
  });

  test("rend le variant ghost", () => {
    render(<Button variant="ghost">Voir mes ressources</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-brand-100");
  });

  test("rend le variant outline", () => {
    render(<Button variant="outline">Plus tard</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-ink-300");
  });

  test("déclenche onClick au clic", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("désactivé : ne déclenche pas onClick", () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Indisponible
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("cas limite : sans children ne casse pas", () => {
    expect(() => render(<Button />)).not.toThrow();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
