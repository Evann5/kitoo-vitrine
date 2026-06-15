import { expect, test } from "@playwright/test";

/**
 * Parcours visiteur complet de la landing Kitoo : chargement, navigation par
 * ancres, menu mobile, accordéon FAQ, CTA vers l'app et toggles d'accessibilité.
 */

test.describe("Parcours visiteur (desktop)", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("la page charge avec ses sections clés", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Prends soin de toi/i,
    );
    for (const id of [
      "#hero",
      "#fonctionnalites",
      "#comment-ca-marche",
      "#pour-qui",
      "#faq",
    ]) {
      await expect(page.locator(id)).toHaveCount(1);
    }
  });

  test("navigation par ancre depuis le header", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await nav.getByRole("link", { name: "FAQ" }).click();
    await expect(page).toHaveURL(/#faq$/);
    await expect(page.locator("#faq")).toBeInViewport();
  });

  test("accordéon FAQ : ouverture / fermeture", async ({ page }) => {
    await page.goto("/#faq");
    const q = page.getByRole("button", {
      name: /Comment accéder à Kitoo/i,
    });
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/connexion Google ou Apple/i)).toBeVisible();
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "false");
  });

  test("le CTA header pointe vers l'app (nouvel onglet sécurisé)", async ({
    page,
  }) => {
    await page.goto("/");
    const cta = page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("link", { name: /Accéder à l'app/i });
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    await expect(cta).toHaveAttribute("href", /.+/);
  });

  test("toggles d'accessibilité : dyslexie et daltonisme", async ({ page }) => {
    await page.goto("/");
    const dys = page.getByRole("button", { name: /Mode dyslexie/i });
    const cb = page.getByRole("button", { name: /Mode daltonisme/i });

    await dys.click();
    await expect(page.locator("html")).toHaveAttribute("data-font", "dyslexia");
    await expect(dys).toHaveAttribute("aria-pressed", "true");

    await cb.click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-contrast",
      "colorblind",
    );

    // Persistance après rechargement (anti-flash).
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-font", "dyslexia");
    await expect(page.locator("html")).toHaveAttribute(
      "data-contrast",
      "colorblind",
    );
  });
});

test.describe("Parcours visiteur (mobile)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu burger : ouverture, navigation, fermeture", async ({ page }) => {
    await page.goto("/");
    const burger = page.getByRole("button", { name: "Ouvrir le menu" });
    const menuId = await burger.getAttribute("aria-controls");
    await burger.click();
    await expect(
      page.getByRole("button", { name: "Fermer le menu" }),
    ).toHaveAttribute("aria-expanded", "true");

    // Cliquer un lien ferme le menu.
    await page
      .locator(`#${menuId}`)
      .getByRole("link", { name: "Pour qui" })
      .click();
    await expect(
      page.getByRole("button", { name: "Ouvrir le menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
