"use client";

/**
 * Stats de réassurance (R7) — chiffres illustratifs présentés en cards avec
 * **compteur animé doux**. Projet d'école : valeurs illustratives (claims
 * produit), aucune donnée analytique réelle.
 *
 * Accessibilité : la **valeur finale est toujours présente dans le DOM** (rendu
 * serveur + état initial), l'animation ne fait que recompter à l'entrée dans le
 * viewport. Sous `prefers-reduced-motion`, aucune animation — la valeur reste
 * affichée. Le nombre qui s'anime est `aria-hidden` ; un `aria-label` porte la
 * valeur finale pour les lecteurs d'écran.
 */
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion";
import { Card } from "@/components/ui";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Stat = {
  /** Valeur affichée (statique). Si `count` est fourni, elle est animée. */
  value: string;
  /** Cible numérique à animer (compteur). */
  count?: number;
  /** Suffixe après le nombre animé (ex. " %", " min"). */
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  {
    value: "100 %",
    count: 100,
    suffix: " %",
    label: "des contenus validés par des professionnels de santé",
  },
  {
    value: "5 min",
    count: 5,
    suffix: " min",
    label: "pour souffler avec un exercice de respiration",
  },
  {
    value: "RGPD",
    label: "consentement, droit d'accès et droit à l'effacement",
  },
];

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({ count, suffix }: { count: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  // Valeur finale par défaut (SSR / no-JS / reduced-motion).
  const [display, setDisplay] = useState(count);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    const duration = 1000;
    let startTime: number | null = null;
    // Le premier frame (p≈0) initialise l'affichage à 0 puis compte jusqu'à
    // `count` — pas de setState synchrone dans le corps de l'effet.
    const tick = (t: number) => {
      startTime ??= t;
      const p = Math.min(1, (t - startTime) / duration);
      setDisplay(Math.round(count * easeOut(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, count]);

  return (
    <span ref={ref} role="img" aria-label={`${count}${suffix ?? ""}`}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

export function Stats() {
  return (
    <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <StaggerItem key={stat.label}>
          <Card className="h-full text-center">
            <p className="font-display text-display text-brand-700">
              {stat.count !== undefined ? (
                <Counter count={stat.count} suffix={stat.suffix} />
              ) : (
                stat.value
              )}
            </p>
            <p className="text-body text-ink-600 mt-2">{stat.label}</p>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default Stats;
