import { describe, expect, test } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  test("concatène les classes vraies", () => {
    expect(cn("p-4", "bg-white")).toBe("p-4 bg-white");
  });

  test("ignore les valeurs falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  test("gère les conditions", () => {
    const active = true;
    const disabled = false;
    expect(cn("base", active && "on", disabled && "off")).toBe("base on");
  });

  test("chaîne vide si rien de vrai", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});
