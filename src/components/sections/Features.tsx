/**
 * Section Fonctionnalités : les 3 piliers de Kitoo en **grille de cards de
 * taille égale** (ancre `#fonctionnalites`).
 *
 * Différenciation voulue : contrairement à « Comment ça marche » (timeline
 * séquentielle), cette section se lit **en parallèle, en un coup d'œil**, des
 * cards sur fond clair. Apparition en cascade (`Stagger`), micro-interaction de
 * survol (légère élévation). Casse la monotonie juste après le Hero.
 *
 * Server Component : compose la grille (Stagger client) avec mascottes server.
 */
import { Leaf, MessageCircleHeart, Smile, type LucideIcon } from "lucide-react";
import { Blob, Mascot } from "@/components/illustrations";
import { Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui";
import type { MascotPose } from "@/lib/illustrations";
import { cn } from "@/lib/cn";

/** Échelle d'humeur (5 niveaux, couleurs fixes du DS) : décoratif. */
const moodScale = [
  "bg-mood-very-positive",
  "bg-mood-positive",
  "bg-mood-neutral",
  "bg-mood-negative",
  "bg-mood-very-negative",
] as const;

function MoodScale() {
  return (
    <div className="mt-5 flex items-center gap-2" aria-hidden="true">
      {moodScale.map((c) => (
        <span key={c} className={cn("rounded-pill h-7 w-7", c)} />
      ))}
    </div>
  );
}

type Feature = {
  title: string;
  icon: LucideIcon;
  pose: MascotPose;
  description: string;
  extra?: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Mood tracker",
    icon: Smile,
    pose: "classic",
    description:
      "Note ton humeur chaque jour parmi 5 niveaux, visualise tes tendances au fil du temps et gagne des badges de régularité.",
    extra: <MoodScale />,
  },
  {
    title: "Chat avec un pro",
    icon: MessageCircleHeart,
    pose: "heart",
    description:
      "Échange en messagerie sécurisée avec un psychologue partenaire, quand tu en ressens le besoin.",
  },
  {
    title: "Espace bien-être",
    icon: Leaf,
    pose: "sleeping",
    description:
      "Des articles et exercices validés par des professionnels de santé pour prendre soin de toi.",
  },
];

function FeatureCard({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) {
  const { icon: Icon, title, description, pose, extra } = feature;
  return (
    <div
      className={cn(
        "rounded-card flex h-full flex-col bg-white p-6 shadow-sm sm:p-8",
        "duration-kitoo ease-kitoo transition-[transform,box-shadow] hover:shadow-md motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      <span className="rounded-control bg-brand-100 text-brand-700 inline-flex h-12 w-12 items-center justify-center">
        <Icon aria-hidden="true" strokeWidth={1.75} className="h-6 w-6" />
      </span>
      <h3 className="font-display text-title text-ink-900 mt-4">{title}</h3>
      <p className="text-body text-ink-600 mt-2">{description}</p>
      {extra}
      <div className="mt-auto flex justify-center pt-6">
        <Mascot pose={pose} decorative className="w-full max-w-[180px]" />
      </div>
    </div>
  );
}

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

        {/* Grille de 3 cards de taille égale (lecture parallèle). */}
        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <FeatureCard feature={feature} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export default Features;
