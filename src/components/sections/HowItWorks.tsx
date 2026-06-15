/**
 * Section « Comment ça marche » — le parcours d'usage en 3 étapes simples
 * (ancre `#comment-ca-marche`).
 *
 * Ton : encourageant, sans pression (« pas de pression, c'est quand tu veux »),
 * tutoiement, casse phrase. Aucun langage de diagnostic — les outils orientent,
 * ils n'évaluent pas. Source : brief / design system Kitoo.
 *
 * Server Component : icônes Lucide décoratives (`aria-hidden`), cohérentes avec
 * la section Fonctionnalités (toutes en outline).
 */
import {
  MessageCircleHeart,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui";

type Step = {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: 1,
    icon: PenLine,
    title: "Tu notes ton humeur du jour",
    description:
      "En quelques secondes, parmi 5 niveaux. Pas de pression : c'est quand tu veux, et rien n'est obligatoire.",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "Tu reçois des ressources adaptées",
    description:
      "Selon comment tu te sens, Kitoo te propose des exercices et des contenus bien-être qui te correspondent.",
  },
  {
    number: 3,
    icon: MessageCircleHeart,
    title: "Tu échanges avec un pro si tu veux",
    description:
      "Si tu en ressens le besoin, tu peux parler à un psychologue partenaire en messagerie sécurisée. On est là.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      className="bg-brand-50 scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="how-title"
    >
      <Container>
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-600 font-bold tracking-[0.04em] uppercase">
            Comment ça marche
          </p>
          <h2
            id="how-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Tout simplement, à ton rythme.
          </h2>
        </div>

        {/* Timeline : colonne sur mobile, 3 colonnes sur desktop. */}
        <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="rounded-card flex h-full flex-col bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-pill bg-brand-500 font-display text-body inline-flex h-10 w-10 shrink-0 items-center justify-center text-white"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <span className="rounded-control bg-brand-100 text-brand-600 inline-flex h-10 w-10 items-center justify-center">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-5 w-5"
                    />
                  </span>
                </div>
                <h3 className="text-heading font-display text-ink-900 mt-4">
                  {step.title}
                </h3>
                <p className="text-body text-ink-600 mt-2">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

export default HowItWorks;
