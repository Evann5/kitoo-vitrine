import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { IconButton } from "@/components/ui/IconButton";

describe("IconButton", () => {
  test("expose son aria-label (nom accessible requis)", () => {
    render(
      <IconButton aria-label="Ouvrir le menu">
        <svg aria-hidden />
      </IconButton>,
    );
    expect(
      screen.getByRole("button", { name: "Ouvrir le menu" }),
    ).toBeInTheDocument();
  });

  test("rond par défaut (rounded-pill), type=button", () => {
    render(
      <IconButton aria-label="Action">
        <svg aria-hidden />
      </IconButton>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("rounded-pill");
    expect(btn).toHaveAttribute("type", "button");
  });

  test("déclenche onClick", () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Fermer" onClick={onClick}>
        <svg aria-hidden />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("variante solid (pervenche + épaisseur)", () => {
    render(
      <IconButton aria-label="Ajouter" variant="solid">
        <svg aria-hidden />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-brand-700");
  });
});
