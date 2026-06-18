import { expect, test } from "@playwright/test";

/**
 * Header minimaliste (logo + CTA) et accès directs à l'app depuis le hero.
 * Le header ne porte plus de liens de section ni de menu burger (refonte
 * « à la Duolingo ») : la navigation par ancres vit dans le footer / le hero.
 */

test("header : logo + CTA vers l'app (nouvel onglet sécurisé)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Navigation principale" });

  // Logo (lien vers le haut de page).
  await expect(nav.getByRole("link", { name: /Kitoo/i }).first()).toBeVisible();

  // CTA dominant vers l'app, en _blank sécurisé.
  const cta = nav.getByRole("link", { name: /Accéder à l'app/i });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("target", "_blank");
  await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  await expect(cta).toHaveAttribute("href", /.+/);
});

test("hero : accès directs « Créer un compte » et « Se connecter » (sécurisés)", async ({
  page,
}) => {
  await page.goto("/");

  for (const name of ["Créer un compte", "Se connecter"]) {
    const link = page.locator("#hero").getByRole("link", { name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("href", /.+/);
  }
});

test("mobile : le header garde logo + CTA accessibles", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(
    nav.getByRole("link", { name: /Accéder à l'app/i }),
  ).toBeVisible();
});
