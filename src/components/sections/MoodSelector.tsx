"use client";

import { useRef, useState } from "react";
import { MoodFace } from "@/components/ui";
import { cn } from "@/lib/cn";
import { getMood, type MoodLevel, moods } from "@/lib/moods";

export type MoodSelectorProps = {
  /**
   * Mascottes pré-rendues côté serveur (une par humeur). Passées en props pour
   * que ce composant client n'ait pas à importer `Mascot` (server-only).
   */
  mascots: Record<MoodLevel, React.ReactNode>;
};

/**
 * Sélecteur d'humeur **illustratif** (aucune donnée enregistrée). Groupe de
 * radios accessible (roving tabindex + flèches), libellé + visage (jamais la
 * couleur seule). À la sélection, le fond prend la teinte douce compagne et la
 * mascotte change de pose, transition neutralisée sous `prefers-reduced-motion`
 * (l'interaction reste pleinement utilisable).
 */
export function MoodSelector({ mascots }: MoodSelectorProps) {
  const [selected, setSelected] = useState<MoodLevel>("positive");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const mood = getMood(selected);

  const move = (delta: number, index: number) => {
    const next = (index + delta + moods.length) % moods.length;
    setSelected(moods[next].level);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
      {/* Scène réactive : fond émotionnel + mascotte */}
      <div
        className="rounded-panel duration-kitoo ease-kitoo flex items-center justify-center p-6 transition-colors sm:p-10"
        style={{ backgroundColor: mood.soft }}
      >
        <div key={selected} className="animate-enter w-full max-w-[260px]">
          {mascots[selected]}
        </div>
      </div>

      {/* Sélecteur */}
      <div className="text-center md:text-left">
        <h3 className="font-display text-title text-ink-900">
          Comment tu te sens aujourd&apos;hui ?
        </h3>
        <p className="text-body text-ink-600 mx-auto mt-2 max-w-prose md:mx-0">
          Choisis une humeur pour voir Kitoo s&apos;adapter. C&apos;est un
          aperçu : la vraie expérience se vit dans l&apos;app.
        </p>

        <div
          role="radiogroup"
          aria-label="Comment tu te sens aujourd'hui ?"
          className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start"
        >
          {moods.map((m, i) => {
            const isSelected = selected === m.level;
            return (
              <button
                key={m.level}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(m.level)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    move(1, i);
                  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    move(-1, i);
                  }
                }}
                className={cn(
                  "rounded-card duration-kitoo ease-kitoo flex min-h-[44px] flex-col items-center gap-1.5 border-2 p-2 transition-colors",
                  "motion-safe:active:scale-[0.98]",
                  isSelected
                    ? "border-brand-500 bg-brand-50"
                    : "hover:bg-ink-100 border-transparent",
                )}
              >
                <MoodFace level={m.level} size={44} />
                <span
                  className={cn(
                    "text-small font-bold",
                    isSelected ? "text-brand-800" : "text-ink-600",
                  )}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MoodSelector;
