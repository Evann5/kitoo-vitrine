import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("aucune violation a11y critique/sérieuse sur /", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  if (blocking.length) {
    console.log(
      "Violations:",
      JSON.stringify(
        blocking.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.length,
        })),
        null,
        2,
      ),
    );
  }
  expect(blocking).toEqual([]);
});

test("métadonnées SEO présentes (title, description, OG)", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Kitoo/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /santé mentale/i,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Kitoo/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("JSON-LD Organization + WebSite injecté", async ({ page }) => {
  await page.goto("/");
  const ld = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(ld).toBeTruthy();
  const data = JSON.parse(ld as string);
  const types = (data["@graph"] ?? []).map(
    (n: { "@type": string }) => n["@type"],
  );
  expect(types).toContain("Organization");
  expect(types).toContain("WebSite");
});

test("la préférence dyslexie persiste après rechargement", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Mode dyslexie/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-font", "dyslexia");

  await page.reload();
  // L'anti-flash réapplique l'attribut avant le rendu.
  await expect(page.locator("html")).toHaveAttribute("data-font", "dyslexia");
});

test("hiérarchie de titres : un seul h1 sur la landing refondue", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText(/Prends soin de toi/i);
});

test("mode daltonisme : la palette d'humeur bascule et persiste", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Mode daltonisme/i }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-contrast",
    "colorblind",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-contrast",
    "colorblind",
  );
});

test("reduced-motion : les sections révélées sont visibles immédiatement", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/#confiance");
  // Le titre de la section (animé via Reveal) est pleinement opaque, sans scroll.
  const heading = page.getByRole("heading", {
    name: /Sérieux, sécurisé/i,
  });
  await expect(heading).toBeVisible();
  await context.close();
});
