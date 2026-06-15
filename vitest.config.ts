import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aligne l'alias TS `@/*` -> `src/*` pour les tests unitaires.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Les tests e2e Playwright vivent dans tests/e2e et ne doivent pas être
    // ramassés par Vitest.
    include: ["tests/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Couverture mesurée sur le code applicatif testable en unitaire
      // (composants UI, sections, layout, utilitaires). Les fichiers de
      // `src/app/` (layout, pages, routes) dépendent du pipeline Next et sont
      // couverts par les tests e2e.
      include: ["src/components/**/*.{ts,tsx}", "src/lib/**/*.{ts,tsx}"],
      exclude: ["src/**/index.ts"], // barrels (ré-exports purs)
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 75,
      },
    },
  },
});
