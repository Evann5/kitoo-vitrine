// Étend les matchers de Vitest avec ceux de jest-dom (toBeInTheDocument, etc.).
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom n'implémente pas ces API utilisées par Framer Motion. On les stube pour
// que les composants animés (whileInView, useReducedMotion) rendent sans erreur.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

const g = globalThis as unknown as {
  IntersectionObserver?: typeof IntersectionObserver;
};
if (!g.IntersectionObserver) {
  class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    root = null;
    rootMargin = "";
    thresholds = [];
  }
  g.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
