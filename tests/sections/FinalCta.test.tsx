import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/lib/site-config";

describe("FinalCta", () => {
  test("le CTA pointe vers siteConfig.appUrl en _blank sécurisé", () => {
    render(<FinalCta />);
    const cta = screen.getByRole("link", { name: /Accéder à l'app/i });
    expect(cta).toHaveAttribute("href", siteConfig.appUrl);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("présente un titre incitatif", () => {
    render(<FinalCta />);
    expect(
      screen.getByRole("heading", { name: /prendre soin de toi/i }),
    ).toBeInTheDocument();
  });
});
