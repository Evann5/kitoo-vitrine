import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  test("rend le variant primary par défaut (pervenche)", () => {
    render(<Button>Noter mon humeur</Button>);
    const btn = screen.getByRole("button", { name: "Noter mon humeur" });
    // brand-700 (et non 500) pour garantir un contraste WCAG AA avec le texte blanc.
    expect(btn).toHaveClass("bg-brand-700");
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

  test("toutes les tailles rendent un bouton", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const { unmount } = render(<Button size={size}>x</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    }
  });

  test("fullWidth applique w-full", () => {
    render(<Button fullWidth>Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  test("effet 3D : le primary porte l'épaisseur (shadow-btn)", () => {
    render(<Button>3D</Button>);
    expect(screen.getByRole("button")).toHaveClass("shadow-btn");
  });

  test('as="a" rend un lien avec href/rel (CTA-lien)', () => {
    render(
      <Button
        as="a"
        href="https://app.kitoo.test"
        target="_blank"
        rel="noopener noreferrer"
      >
        Accéder à l&apos;app
      </Button>,
    );
    const link = screen.getByRole("link", { name: /Accéder à l'app/i });
    expect(link).toHaveAttribute("href", "https://app.kitoo.test");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("bg-brand-700");
  });

  test("loading : désactive l'interaction (disabled + aria-busy)", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Envoi
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("cas limite : sans children ne casse pas", () => {
    expect(() => render(<Button />)).not.toThrow();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
