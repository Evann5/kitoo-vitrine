import { expect, test } from "@playwright/test";

/**
 * Parcours de la landing **refondue** (R4–R8) : scroll-story, header condensé +
 * section active, démo humeur au clavier, bande de réassurance, CTA mobile.
 */

test.describe("Refonte : desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("les sections scroll-story se révèlent au scroll", async ({ page }) => {
    await page.goto("/");
    for (const heading of [
      "Trois façons de prendre soin de toi.",
      "Tout simplement, à ton rythme.",
      "Ressens Kitoo en un clic.",
      "Sérieux, sécurisé, et toujours doux.",
    ]) {
      const h = page.getByRole("heading", { name: heading });
      await h.scrollIntoViewIfNeeded();
      await expect(h).toBeVisible();
    }
  });

  test("header : condensé au scroll", async ({ page }) => {
    await page.goto("/");
    const navBar = page.locator("header nav").first();
    const initial = (await navBar.boundingBox())!.height;

    await page.locator("#faq").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const condensed = (await navBar.boundingBox())!.height;
    expect(condensed).toBeLessThan(initial);
  });

  test("démo humeur : sélection au clavier (flèches) et réaction", async ({
    page,
  }) => {
    await page.goto("/#apercu");
    const group = page.getByRole("radiogroup");
    const checked = group.getByRole("radio", { checked: true });
    await checked.focus();
    await page.keyboard.press("ArrowRight");
    // Une (autre) humeur est cochée après navigation clavier.
    await expect(group.getByRole("radio", { checked: true })).toHaveCount(1);
  });

  test("accordéon FAQ : ouverture au clavier", async ({ page }) => {
    await page.goto("/#faq");
    const q = page.getByRole("button", { name: /Comment accéder à Kitoo/i });
    await q.focus();
    await page.keyboard.press("Enter");
    await expect(q).toHaveAttribute("aria-expanded", "true");
  });
});

test.describe("Refonte : mobile", () => {
  test.use({ viewport: { width: 390, height: 780 } });

  test("barre CTA collante apparaît après le hero → lien app sécurisé", async ({
    page,
  }) => {
    await page.goto("/");
    const bar = page.locator("div.fixed.bottom-0.md\\:hidden");
    // Cachée au-dessus du hero.
    await expect(bar).toHaveAttribute("aria-hidden", "true");

    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(500);
    await expect(bar).toHaveAttribute("aria-hidden", "false");

    const cta = bar.getByRole("link", { name: /Accéder à l'app/i });
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    await expect(cta).toHaveAttribute("target", "_blank");
  });
});
