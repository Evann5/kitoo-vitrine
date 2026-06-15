/**
 * Gamification **douce et bienveillante** — aperçu illustratif (non connecté).
 * Série de régularité + badges présentés sans pression ni langage de
 * performance : encourager, jamais culpabiliser. Server Component.
 */
import { CalendarHeart, Leaf, Sparkles, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/cn";

type Badge = { icon: LucideIcon; label: string; desc: string };

const badges: Badge[] = [
  {
    icon: CalendarHeart,
    label: "Première semaine",
    desc: "Tu as pris un moment pour toi, 7 jours de suite.",
  },
  {
    icon: Sparkles,
    label: "Petit rituel",
    desc: "Noter ton humeur devient une habitude douce.",
  },
  {
    icon: Leaf,
    label: "Pause bien-être",
    desc: "Tu as exploré une ressource pour souffler.",
  },
];

/** Représentation visuelle d'une série de 7 jours (illustratif). */
function Streak() {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 md:justify-start">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "rounded-pill font-display text-small inline-flex h-9 w-9 items-center justify-center",
              "bg-brand-700 text-white",
            )}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <p className="text-body text-ink-900 mt-4 font-bold">
        7 jours d&apos;affilée, continue comme ça ! 🌱
      </p>
      <p className="text-small text-ink-600 mt-1">
        Pas de pression : chaque petit pas compte, à ton rythme.
      </p>
    </div>
  );
}

export function Gamification() {
  return (
    <div className="mt-16 sm:mt-24">
      <h3 className="font-display text-title text-ink-900">
        Des petites victoires, en douceur.
      </h3>
      <p className="text-body text-ink-600 mt-2 max-w-prose">
        Kitoo célèbre ta régularité avec bienveillance — jamais comme une
        performance à tenir.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card soft className="flex flex-col justify-center">
          <Streak />
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card key={badge.label} className="text-center">
                <span className="rounded-pill bg-brand-100 text-brand-700 mx-auto inline-flex h-12 w-12 items-center justify-center">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-6 w-6"
                  />
                </span>
                <h4 className="text-heading font-display text-ink-900 mt-3">
                  {badge.label}
                </h4>
                <p className="text-small text-ink-600 mt-1">{badge.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Gamification;
