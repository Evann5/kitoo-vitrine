import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

/**
 * Garde-fou : aucune URL d'application **en dur** dans les composants. Tous les
 * liens vers l'app doivent passer par `siteConfig.appUrl` / `appLink()` (source
 * unique `NEXT_PUBLIC_APP_URL`). On tolère uniquement les namespaces SVG
 * (`www.w3.org`), qui ne sont pas des liens applicatifs.
 */
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory()
      ? walk(full)
      : /\.(tsx?|jsx?)$/.test(full)
        ? [full]
        : [];
  });
}

const ALLOWED = /https?:\/\/www\.w3\.org/g;
const HTTP_URL = /https?:\/\/[^\s"'`)]+/g;

describe("aucune URL d'app en dur dans les composants", () => {
  const files = walk(join(process.cwd(), "src", "components"));

  test("src/components ne contient pas d'URL http(s) applicative", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, "utf8").replace(ALLOWED, "");
      const matches = src.match(HTTP_URL);
      if (matches) offenders.push(`${file}: ${matches.join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });
});
