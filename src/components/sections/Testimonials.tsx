/**
 * Témoignages (R7) — **personas fictifs** (projet d'école). Ne reproduit aucune
 * citation de personne réelle ni logo d'organisation. Prénom + tranche d'âge,
 * voix de marque Kitoo (chaleureuse, tutoiement). Une mention « illustratifs »
 * l'indique discrètement, pour rester crédible sans tromper.
 *
 * Avatars en **initiales** (pas de fausse photo) — décoratifs (`aria-hidden`),
 * le nom porte le sens. Server Component (apparition via Reveal/Stagger client).
 */
import { Mascot } from "@/components/illustrations";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Card } from "@/components/ui";
import { cn } from "@/lib/cn";

type Testimonial = {
  name: string;
  age: number;
  quote: string;
  /** Teinte de l'avatar (variété douce, jamais porteuse de sens). */
  tint: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Léa",
    age: 21,
    quote:
      "Noter mon humeur le matin, c'est devenu mon petit rituel. Ça m'aide à y voir plus clair.",
    tint: "bg-brand-200 text-brand-800",
  },
  {
    name: "Yanis",
    age: 19,
    quote:
      "J'avais du mal à en parler. Pouvoir écrire à un pro quand je veux, ça change tout.",
    tint: "bg-mood-positive text-ink-900",
  },
  {
    name: "Camille",
    age: 23,
    quote:
      "Les ressources sont courtes et concrètes. 5 minutes et je me sens déjà plus posée.",
    tint: "bg-brand-100 text-brand-800",
  },
  {
    name: "Noé",
    age: 20,
    quote:
      "Pas de jugement, pas de pression. Juste un espace doux quand j'en ai besoin.",
    tint: "bg-mood-very-positive text-ink-900",
  },
];

export function Testimonials() {
  return (
    <div className="mt-16 sm:mt-24">
      <Reveal>
        <div className="flex items-center gap-4">
          <Mascot
            pose="bubble-tea"
            decorative
            className="hidden w-24 shrink-0 sm:block"
          />
          <div>
            <h3 className="font-display text-title text-ink-900">
              Ils prennent soin d&apos;eux avec Kitoo.
            </h3>
            <p className="text-small text-ink-600 mt-2">
              Témoignages illustratifs — personas fictifs (projet étudiant).
            </p>
          </div>
        </div>
      </Reveal>

      <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <Card className="flex h-full flex-col gap-4">
              <p className="text-body text-ink-700">« {t.quote} »</p>
              <div className="mt-auto flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "rounded-pill font-display text-body inline-flex h-11 w-11 items-center justify-center",
                    t.tint,
                  )}
                >
                  {t.name.charAt(0)}
                </span>
                <span className="text-small text-ink-900 font-bold">
                  {t.name}, {t.age} ans
                </span>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default Testimonials;
