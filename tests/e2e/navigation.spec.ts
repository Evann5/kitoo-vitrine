import { expect, test } from "@playwright/test";

test("header sticky : liens de nav, CTA et skip-link présents (desktop)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  // Le header expose la navigation principale et ses ancres.
  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(
    nav.getByRole("link", { name: "Fonctionnalités" }),
  ).toBeVisible();

  // CTA vers l'app, en _blank.
  const cta = nav.getByRole("link", { name: /Accéder à l'app/i }).first();
  await expect(cta).toHaveAttribute("target", "_blank");

  // Disclaimer médical présent dans le footer (le contenu en compte plusieurs).
  await expect(
    page
      .locator("footer")
      .getByText(/ne remplace pas un suivi médical professionnel/i),
  ).toBeVisible();
});

test("menu mobile : ouverture via burger puis fermeture via Échap", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const burger = page.getByRole("button", { name: "Ouvrir le menu" });
  await expect(burger).toBeVisible();
  await burger.click();

  const close = page.getByRole("button", { name: "Fermer le menu" });
  await expect(close).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ouvrir le menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});
