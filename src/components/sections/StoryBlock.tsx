import type { LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/cn";

export type StoryBlockProps = {
  /** Titre du bloc (rendu en `<h3>`). */
  title: string;
  /** Corps du bloc (paragraphe + extras éventuels, ex. échelle d'humeur). */
  children: React.ReactNode;
  /** Illustration du bloc (`<Mascot/>`, `<Illustration/>`…), révélée au scroll. */
  illustration: React.ReactNode;
  /**
   * Inverse l'ordre des colonnes sur desktop (alternance gauche/droite).
   * Sur mobile, le texte reste toujours au-dessus (lisibilité). @default false
   */
  reverse?: boolean;
  /** Numéro d'étape (badge pervenche) : pour les parcours narratifs. */
  step?: number;
  /** Petite icône d'accent (Lucide), affichée dans une pastille lavande. */
  icon?: LucideIcon;
  /** Eyebrow optionnel (libellé court en majuscules). */
  eyebrow?: string;
};

/**
 * Bloc de storytelling vertical : **texte d'un côté, illustration de l'autre**,
 * en colonnes alternées sur desktop (`reverse`) et empilées sur mobile (texte
 * puis illustration). Le texte apparaît en cascade (`Stagger`) et l'illustration
 * en fondu/zoom doux (`Reveal`) à l'entrée dans le viewport : tout statique sous
 * `prefers-reduced-motion`.
 *
 * @example
 * <StoryBlock
 *   title="Mood tracker"
 *   illustration={<Mascot pose="calm" className="w-full max-w-[320px]" />}
 *   icon={Smile}
 * >
 *   <p>Note ton humeur chaque jour…</p>
 * </StoryBlock>
 */
export function StoryBlock({
  title,
  children,
  illustration,
  reverse = false,
  step,
  icon: Icon,
  eyebrow,
}: StoryBlockProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
      {/* Colonne texte (cascade) */}
      <Stagger
        className={cn(
          "text-center md:text-left",
          reverse ? "md:order-2" : "md:order-1",
        )}
      >
        {(step !== undefined || Icon || eyebrow) && (
          <StaggerItem>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              {step !== undefined && (
                <span
                  className="rounded-pill bg-brand-700 font-display text-body inline-flex h-10 w-10 shrink-0 items-center justify-center text-white"
                  aria-hidden="true"
                >
                  {step}
                </span>
              )}
              {Icon && (
                <span className="rounded-control bg-brand-100 text-brand-700 inline-flex h-10 w-10 items-center justify-center">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-5 w-5"
                  />
                </span>
              )}
              {eyebrow && (
                <span className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
                  {eyebrow}
                </span>
              )}
            </div>
          </StaggerItem>
        )}

        <StaggerItem>
          <h3 className="font-display text-title text-ink-900 mt-4 sm:text-[34px]">
            {title}
          </h3>
        </StaggerItem>

        <StaggerItem>
          <div className="text-body text-ink-600 mx-auto mt-3 max-w-prose md:mx-0">
            {children}
          </div>
        </StaggerItem>
      </Stagger>

      {/* Colonne illustration (révélée) */}
      <Reveal
        variant="scaleIn"
        className={cn(
          "flex justify-center",
          reverse ? "md:order-1" : "md:order-2",
        )}
      >
        {illustration}
      </Reveal>
    </div>
  );
}

export default StoryBlock;
