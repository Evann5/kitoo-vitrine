import { describe, expect, test } from "vitest";
import { siteMetadata } from "@/lib/metadata";

// Note : l'objet `metadata` de layout.tsx ne peut pas être importé en unitaire
// (next/font + globals.css hors pipeline Next). Les balises réellement rendues
// (title, og:*, description, JSON-LD) sont vérifiées dans tests/e2e/a11y.spec.ts.
describe("siteMetadata", () => {
  test("title et description sont renseignés", () => {
    expect(siteMetadata.title).toMatch(/Kitoo/);
    expect(siteMetadata.description.length).toBeGreaterThan(40);
  });

  test("URL de prod, locale fr et langue cohérentes", () => {
    expect(siteMetadata.url).toBe("https://kitoo-vitrine.vercel.app");
    expect(siteMetadata.locale).toBe("fr_FR");
    expect(siteMetadata.lang).toBe("fr");
  });
});
