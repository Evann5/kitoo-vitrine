import { expect, test } from "@playwright/test";

/**
 * Page /design-system : sections présentables et sous-navigation par ancres.
 */
test.describe("Design system", () => {
  test("rend ses sections et le sommaire navigue par ancres", async ({
    page,
  }) => {
    await page.goto("/design-system");

    // Titre de page + quelques sections clés.
    await expect(
      page.getByRole("heading", { level: 1, name: /La charte Kitoo/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Couleurs" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Composants" }),
    ).toBeVisible();

    // Sommaire : cliquer une ancre amène à la section.
    const nav = page.getByRole("navigation", {
      name: "Sommaire du design system",
    });
    await nav.getByRole("link", { name: "Composants" }).first().click();
    await expect(page).toHaveURL(/#composants$/);
    await expect(page.locator("#composants")).toBeInViewport();
  });

  test("copie d'un hex depuis un nuancier", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/design-system");
    await page
      .getByRole("button", { name: /Copier brand-500 #9B9DF0/i })
      .first()
      .click();
    // Le statut « Copié » est annoncé.
    await expect(page.getByText("Copié").first()).toBeAttached();
  });
});

test("lien discret « Design system » présent dans le footer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator("footer").getByRole("link", { name: "Design system" }),
  ).toHaveAttribute("href", "/design-system");
});
