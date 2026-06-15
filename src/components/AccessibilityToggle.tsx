"use client";

/**
 * Contrôles d'accessibilité : mode dyslexie (police Atkinson Hyperlegible) et
 * mode daltonisme (palette d'humeur alternative Okabe-Ito).
 *
 * Persistance : chaque préférence est stockée dans `localStorage` et reflétée
 * par un attribut sur `<html>` (`data-font="dyslexia"`, `data-contrast="colorblind"`).
 * Un script anti-flash (dans `layout.tsx`) applique ces attributs AVANT le
 * premier rendu pour éviter tout clignotement ; ce composant se contente de lire
 * l'état courant à l'hydratation puis de le basculer.
 */
import { Eye, Type } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const STORAGE = {
  dyslexia: "kitoo-dyslexia",
  contrast: "kitoo-contrast",
} as const;

function ToggleButton({
  pressed,
  onToggle,
  icon: Icon,
  label,
}: {
  pressed: boolean;
  onToggle: () => void;
  icon: typeof Type;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      // L'état initial est lu côté client (cf. initialiseurs paresseux) : la
      // valeur peut différer du rendu serveur (false) sans casser l'hydratation.
      suppressHydrationWarning
      className={cn(
        "rounded-pill text-small duration-kitoo ease-kitoo inline-flex items-center gap-2 border px-3 py-2 font-bold transition-colors",
        pressed
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-ink-300 text-ink-700 hover:bg-brand-100 hover:text-brand-700",
      )}
    >
      <Icon aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
      {label}
    </button>
  );
}

/** Lit l'attribut posé par l'anti-flash sur <html> (SSR-safe). */
function readAttr(name: string, value: string): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute(name) === value;
}

export function AccessibilityToggle() {
  // Initialiseurs paresseux : côté client, on lit l'état déjà appliqué par
  // l'anti-flash (évite un effet de synchronisation et le clignotement).
  const [dyslexia, setDyslexia] = useState(() =>
    readAttr("data-font", "dyslexia"),
  );
  const [colorblind, setColorblind] = useState(() =>
    readAttr("data-contrast", "colorblind"),
  );

  const toggleDyslexia = () => {
    const next = !dyslexia;
    setDyslexia(next);
    if (next) document.documentElement.setAttribute("data-font", "dyslexia");
    else document.documentElement.removeAttribute("data-font");
    localStorage.setItem(STORAGE.dyslexia, String(next));
  };

  const toggleColorblind = () => {
    const next = !colorblind;
    setColorblind(next);
    if (next)
      document.documentElement.setAttribute("data-contrast", "colorblind");
    else document.documentElement.removeAttribute("data-contrast");
    localStorage.setItem(STORAGE.contrast, String(next));
  };

  return (
    <div>
      <h2 className="text-eyebrow text-ink-600 font-bold tracking-[0.04em] uppercase">
        Accessibilité
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <ToggleButton
          pressed={dyslexia}
          onToggle={toggleDyslexia}
          icon={Type}
          label="Mode dyslexie"
        />
        <ToggleButton
          pressed={colorblind}
          onToggle={toggleColorblind}
          icon={Eye}
          label="Mode daltonisme"
        />
      </div>
    </div>
  );
}

export default AccessibilityToggle;
