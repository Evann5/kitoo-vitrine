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

  test("appLink compose les sous-routes à partir de la base", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.kitoo.test";
    const { appLink, appRoutes } = await import("@/lib/site-config");
    expect(appLink(appRoutes.login)).toBe("https://app.kitoo.test/connexion");
    expect(appLink(appRoutes.signup)).toBe(
      "https://app.kitoo.test/inscription",
    );
    // Accueil = base, sans slash final superflu.
    expect(appLink()).toBe("https://app.kitoo.test");
    expect(appLink("/")).toBe("https://app.kitoo.test");
  });

  test("appLink normalise les slashs (base avec slash final, path sans slash)", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.kitoo.test/";
    const { appLink } = await import("@/lib/site-config");
    expect(appLink("/connexion")).toBe("https://app.kitoo.test/connexion");
    expect(appLink("connexion")).toBe("https://app.kitoo.test/connexion");
  });

  test('appLink : fallback propre "#" quand NEXT_PUBLIC_APP_URL est absent', async () => {
    delete process.env.NEXT_PUBLIC_APP_URL;
    const { appLink, appRoutes } = await import("@/lib/site-config");
    expect(appLink()).toBe("#");
    expect(appLink(appRoutes.login)).toBe("#");
    expect(appLink(appRoutes.signup)).toBe("#");
  });

  test("appRoutes expose les sous-routes attendues", async () => {
    const { appRoutes } = await import("@/lib/site-config");
    expect(appRoutes).toEqual({
      home: "/",
      login: "/connexion",
      signup: "/inscription",
    });
  });
});
