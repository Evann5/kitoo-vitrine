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
  },
});
