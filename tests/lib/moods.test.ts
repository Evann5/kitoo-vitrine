import { describe, expect, test } from "vitest";
import { getMood, moods } from "@/lib/moods";

describe("moods → poses de la mascotte (R12)", () => {
  test("les 5 niveaux exposent libellé, couleur fixe et pose", () => {
    expect(moods).toHaveLength(5);
    for (const m of moods) {
      expect(m.label.length).toBeGreaterThan(0);
      expect(m.color).toMatch(/^#[0-9A-F]{6}$/i);
      expect(m.pose.length).toBeGreaterThan(0);
    }
  });

  test("répartition contextuelle des émotions", () => {
    expect(getMood("very-positive").pose).toBe("sunglasses");
    expect(getMood("positive").pose).toBe("soda");
    expect(getMood("neutral").pose).toBe("classic");
    // L'humeur la plus basse → kitoo-crying (soutien, jamais alarmant).
    expect(getMood("very-negative").pose).toBe("crying");
  });
});
