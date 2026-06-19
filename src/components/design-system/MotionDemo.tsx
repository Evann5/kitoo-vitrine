"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Démo de mouvement : un jeton qui flotte (idle `float`) et un aplat qui réagit
 * au survol. Lit `prefers-reduced-motion` pour **neutraliser** les animations et
 * l'annoncer explicitement (exigence d'accessibilité du DS).
 */
export function MotionDemo() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div
        data-animated={!reduced}
        className={cn(
          "bg-brand-500 shadow-brand rounded-card h-16 w-16",
          !reduced && "motion-safe:animate-float",
        )}
      />
      <button
        type="button"
        className={cn(
          "rounded-control bg-brand-700 shadow-btn duration-kitoo ease-kitoo px-5 py-2.5 font-bold text-white transition-transform",
          !reduced && "motion-safe:hover:-translate-y-0.5",
        )}
      >
        Survole-moi
      </button>
      <p className="text-small text-ink-600" aria-live="polite">
        {reduced ? (
          <>
            <b>Mouvement réduit</b> : animations neutralisées.
          </>
        ) : (
          <>
            <b>Easing</b> ease-out doux · <b>durée</b> 200 ms ·{" "}
            <b>motion-safe</b>.
          </>
        )}
      </p>
    </div>
  );
}

export default MotionDemo;
