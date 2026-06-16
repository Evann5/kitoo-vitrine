/**
 * Section « Comment ça marche » (R11) — le parcours en **timeline verticale
 * numérotée** (ancre `#comment-ca-marche`).
 *
 * Différenciation voulue : contrairement à « Fonctionnalités » (grille bento,
 * lecture parallèle, fond clair), cette section se lit **séquentiellement** —
 * une liste ordonnée d'étapes reliées par un connecteur, sur un **panneau
 * lavande** (`brand-50`) qui la distingue de la section précédente. Révélation
 * en cascade (`Stagger`) ; le connecteur (décoratif, `aria-hidden`) apparaît
 * avec son étape. Tout statique sous `prefers-reduced-motion`.
 *
 * Ton encourageant, sans pression, sans langage de diagnostic. Server Component.
 */
import { Blob } from "@/components/illustrations";
import { Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

type Step = { number: number; title: string; body: string };

const steps: Step[] = [
  {
    number: 1,
    title: "Tu notes ton humeur du jour",
    body: "En quelques secondes, parmi 5 niveaux. Pas de pression : c'est quand tu veux, et rien n'est obligatoire.",
  },
  {
    number: 2,
    title: "Tu reçois des ressources adaptées",
    body: "Selon comment tu te sens, Kitoo te propose des exercices et des contenus bien-être qui te correspondent.",
  },
  {
    number: 3,
    title: "Tu échanges avec un pro si tu veux",
    body: "Si tu en ressens le besoin, tu peux parler à un psychologue partenaire en messagerie sécurisée. On est là.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      className="bg-brand-50 relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
      aria-labelledby="how-title"
    >
      <Blob className="pointer-events-none absolute -right-40 bottom-24 -z-0 w-[440px] opacity-40" />
      <Container className="relative">
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
            Comment ça marche
          </p>
          <h2
            id="how-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Tout simplement, à ton rythme.
          </h2>
        </div>

        {/* Timeline : liste ordonnée, badge numéroté + connecteur vertical. */}
        <Stagger as="ol" className="mt-12 max-w-2xl">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <StaggerItem as="li" key={step.number} className="flex gap-5">
                {/* Colonne badge + connecteur */}
                <div className="flex flex-col items-center">
                  <span
                    className="rounded-pill bg-brand-700 font-display text-body shadow-btn inline-flex h-12 w-12 shrink-0 items-center justify-center text-white"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="rounded-pill bg-brand-200 mt-2 w-1 flex-1"
                    />
                  )}
                </div>

                {/* Contenu de l'étape */}
                <div className={cn("pt-1.5", isLast ? "pb-0" : "pb-12")}>
                  <h3 className="font-display text-heading text-ink-900 sm:text-title">
                    {step.title}
                  </h3>
                  <p className="text-body text-ink-600 mt-2">{step.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

export default HowItWorks;
