/**
 * Section Fonctionnalités (R5) — les 3 piliers de Kitoo en storytelling vertical
 * alterné (ancre `#fonctionnalites`). Une idée par bloc (`StoryBlock`), illustration
 * et texte se révélant au scroll. Copy chaleureux tutoyé, fidèle au brief produit.
 *
 * Server Component : compose les blocs (Reveal/Stagger client) avec mascotte
 * server. Aucune logique applicative (la démo d'humeur arrive en R6).
 */
import { Leaf, MessageCircleHeart, Smile, type LucideIcon } from "lucide-react";
import { Blob, Mascot } from "@/components/illustrations";
import { Container } from "@/components/ui";
import type { MascotPose } from "@/lib/illustrations";
import { cn } from "@/lib/cn";
import { StoryBlock } from "./StoryBlock";

type Feature = {
  title: string;
  icon: LucideIcon;
  pose: MascotPose;
  body: React.ReactNode;
};

/** Échelle d'humeur (5 niveaux, couleurs fixes du DS) — décoratif. */
const moodScale = [
  { label: "Très positif", className: "bg-mood-very-positive" },
  { label: "Positif", className: "bg-mood-positive" },
  { label: "Neutre", className: "bg-mood-neutral" },
  { label: "Négatif", className: "bg-mood-negative" },
  { label: "Très négatif", className: "bg-mood-very-negative" },
] as const;

function MoodScale() {
  return (
    <div
      className="mt-5 flex items-center justify-center gap-2 md:justify-start"
      aria-hidden="true"
    >
      {moodScale.map((m) => (
        <span
          key={m.label}
          className={cn("rounded-pill h-7 w-7", m.className)}
        />
      ))}
    </div>
  );
}

const features: Feature[] = [
  {
    title: "Mood tracker",
    icon: Smile,
    pose: "calm",
    body: (
      <>
        <p>
          Note ton humeur chaque jour parmi 5 niveaux, visualise tes tendances
          au fil du temps et gagne des badges de régularité.
        </p>
        <MoodScale />
      </>
    ),
  },
  {
    title: "Chat avec un pro",
    icon: MessageCircleHeart,
    pose: "support",
    body: (
      <p>
        Échange en messagerie sécurisée avec un psychologue partenaire, quand tu
        en ressens le besoin. En confiance, à ton rythme.
      </p>
    ),
  },
  {
    title: "Espace bien-être",
    icon: Leaf,
    pose: "thinking",
    body: (
      <p>
        Des articles, des exercices et des conseils validés par des
        professionnels de santé pour prendre soin de toi au quotidien.
      </p>
    ),
  },
];

export function Features() {
  return (
    <section
      id="fonctionnalites"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
      aria-labelledby="features-title"
    >
      <Blob className="pointer-events-none absolute top-32 -left-40 -z-0 w-[420px] opacity-40" />
      <Container className="relative">
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
            Ce que Kitoo t&apos;apporte
          </p>
          <h2
            id="features-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Trois façons de prendre soin de toi.
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-16 sm:gap-24">
          {features.map((feature, i) => (
            <StoryBlock
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              reverse={i % 2 === 1}
              illustration={
                <Mascot pose={feature.pose} className="w-full max-w-[300px]" />
              }
            >
              {feature.body}
            </StoryBlock>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Features;
