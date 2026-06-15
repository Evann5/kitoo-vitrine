/**
 * Section Fonctionnalités — les 3 piliers de Kitoo (ancre `#fonctionnalites`).
 *
 * Copy vulgarisé et chaleureux (tutoiement, casse phrase), fidèle au brief
 * produit Kitoo (cf. design system : Mood Tracker, Chat professionnel, Espace
 * bien-être). Purement illustratif — aucune logique applicative ni donnée réelle.
 *
 * Server Component : icônes Lucide décoratives (`aria-hidden`), animation
 * d'entrée CSS neutralisée sous `prefers-reduced-motion`.
 */
import { Leaf, MessageCircleHeart, Smile, type LucideIcon } from "lucide-react";
import { Card, Container } from "@/components/ui";
import { cn } from "@/lib/cn";

type Feature = {
  icon?: LucideIcon;
  title: string;
  description: string;
  /** Contenu illustratif optionnel (ex. échelle d'humeur). */
  illustration?: React.ReactNode;
};

/** Échelle d'humeur (5 niveaux, couleurs fixes du DS) — purement décorative. */
const moodScale = [
  { label: "Très positif", className: "bg-mood-very-positive" },
  { label: "Positif", className: "bg-mood-positive" },
  { label: "Neutre", className: "bg-mood-neutral" },
  { label: "Négatif", className: "bg-mood-negative" },
  { label: "Très négatif", className: "bg-mood-very-negative" },
] as const;

function MoodScale() {
  return (
    <div className="mt-5 flex items-center gap-2" aria-hidden="true">
      {moodScale.map((m) => (
        <span
          key={m.label}
          className={cn("rounded-pill h-6 w-6", m.className)}
        />
      ))}
    </div>
  );
}

const features: Feature[] = [
  {
    icon: Smile,
    title: "Mood tracker",
    description:
      "Note ton humeur chaque jour parmi 5 niveaux, visualise tes tendances au fil du temps et gagne des badges de régularité.",
    illustration: <MoodScale />,
  },
  {
    icon: MessageCircleHeart,
    title: "Chat avec un pro",
    description:
      "Échange en messagerie sécurisée avec un psychologue partenaire, quand tu en ressens le besoin. En confiance, à ton rythme.",
  },
  {
    icon: Leaf,
    title: "Espace bien-être",
    description:
      "Des articles, des exercices et des conseils validés par des professionnels de santé pour prendre soin de toi au quotidien.",
  },
];

/**
 * Carte d'une fonctionnalité. Robuste aux données partielles : l'icône est
 * optionnelle et le rendu ne casse pas si un champ manque.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  illustration,
}: Feature) {
  return (
    <Card className="flex h-full flex-col">
      {Icon ? (
        <span className="rounded-control bg-brand-100 text-brand-600 inline-flex h-12 w-12 items-center justify-center">
          <Icon aria-hidden="true" strokeWidth={1.75} className="h-6 w-6" />
        </span>
      ) : null}
      <h3 className="text-title font-display text-ink-900 mt-4">{title}</h3>
      <p className="text-body text-ink-600 mt-2">{description}</p>
      {illustration}
    </Card>
  );
}

export function Features() {
  return (
    <section
      id="fonctionnalites"
      className="scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="features-title"
    >
      <Container>
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-600 font-bold tracking-[0.04em] uppercase">
            Ce que Kitoo t&apos;apporte
          </p>
          <h2
            id="features-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Trois façons de prendre soin de toi.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Features;
