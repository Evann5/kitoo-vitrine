import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("siteConfig", () => {
  const previous = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_APP_URL;
    } else {
      process.env.NEXT_PUBLIC_APP_URL = previous;
    }
  });

  test('appUrl vaut "#" quand NEXT_PUBLIC_APP_URL est absent', async () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    const { siteConfig } = await import("@/lib/site-config");
    expect(siteConfig.appUrl).toBe("#");
  });

  test("appUrl reflète NEXT_PUBLIC_APP_URL quand il est défini", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.kitoo.test";
    const { siteConfig } = await import("@/lib/site-config");
    expect(siteConfig.appUrl).toBe("https://app.kitoo.test");
  });

  test("expose le nom de marque et les ancres de navigation", async () => {
    const { siteConfig } = await import("@/lib/site-config");
    expect(siteConfig.name).toBe("Kitoo");
    expect(siteConfig.nav.map((item) => item.label)).toEqual([
      "Accueil",
      "Fonctionnalités",
      "Comment ça marche",
      "Pour qui",
      "FAQ",
    ]);
  });
});
