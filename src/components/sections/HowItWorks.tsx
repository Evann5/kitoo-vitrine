/**
 * Section « Comment ça marche » (R5) — le parcours en 3 étapes narratives, en
 * storytelling vertical alterné (ancre `#comment-ca-marche`).
 *
 * Ton encourageant et sans pression (« pas de pression, c'est quand tu veux »),
 * tutoiement, casse phrase. Aucun langage de diagnostic. Server Component.
 */
import { Blob, Mascot } from "@/components/illustrations";
import { Container } from "@/components/ui";
import type { MascotPose } from "@/lib/illustrations";
import { StoryBlock } from "./StoryBlock";

type Step = {
  number: number;
  title: string;
  pose: MascotPose;
  body: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Tu notes ton humeur du jour",
    pose: "wave",
    body: "En quelques secondes, parmi 5 niveaux. Pas de pression : c'est quand tu veux, et rien n'est obligatoire.",
  },
  {
    number: 2,
    title: "Tu reçois des ressources adaptées",
    pose: "thinking",
    body: "Selon comment tu te sens, Kitoo te propose des exercices et des contenus bien-être qui te correspondent.",
  },
  {
    number: 3,
    title: "Tu échanges avec un pro si tu veux",
    pose: "support",
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

        <ol className="mt-12 flex flex-col gap-16 sm:gap-24">
          {steps.map((step, i) => (
            <li key={step.number}>
              <StoryBlock
                title={step.title}
                step={step.number}
                reverse={i % 2 === 1}
                illustration={
                  <Mascot pose={step.pose} className="w-full max-w-[300px]" />
                }
              >
                <p>{step.body}</p>
              </StoryBlock>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default HowItWorks;
