import { expect, test } from "@playwright/test";

test("la page d'accueil charge et contient « Kitoo »", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toContainText("Kitoo");
});
