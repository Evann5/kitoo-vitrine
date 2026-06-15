"use client";

/**
 * Banc d'essai des fondations d'animation (Reveal, Stagger, reduced-motion).
 *
 * ⚠️ Dev only — sera retiré en R10. Sert de vérification visuelle de R1 :
 * fais défiler pour voir les révélations douces, puis active « réduire les
 * animations » dans ton OS : tout doit apparaître immédiatement, sans mouvement.
 */
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Card, Container } from "@/components/ui";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Spacer() {
  return <div className="h-[60vh]" aria-hidden="true" />;
}

export default function MotionLabPage() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-ink-50 py-16">
      <Container width="prose">
        <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
          Motion lab · dev
        </p>
        <h1 className="font-display text-display text-ink-900 mt-4">
          Fondations d&apos;animation
        </h1>
        <p className="text-body text-ink-600 mt-4">
          État <code>prefers-reduced-motion</code> :{" "}
          <strong>{reduce ? "réduit (statique)" : "complet (animé)"}</strong>.
          Fais défiler pour voir les révélations.
        </p>

        <Spacer />

        <Reveal variant="fadeInUp">
          <Card>
            <h2 className="font-display text-title text-ink-900">
              Reveal — fadeInUp
            </h2>
            <p className="text-body text-ink-600 mt-2">
              Fondu + légère montée à l&apos;entrée dans le viewport.
            </p>
          </Card>
        </Reveal>

        <Spacer />

        <Reveal variant="fadeIn">
          <Card soft>
            <h2 className="font-display text-title text-ink-900">
              Reveal — fadeIn
            </h2>
            <p className="text-body text-ink-700 mt-2">Simple fondu.</p>
          </Card>
        </Reveal>

        <Spacer />

        <Reveal variant="scaleIn">
          <Card>
            <h2 className="font-display text-title text-ink-900">
              Reveal — scaleIn
            </h2>
            <p className="text-body text-ink-600 mt-2">
              Léger zoom doux, jamais agressif.
            </p>
          </Card>
        </Reveal>

        <Spacer />

        <h2 className="font-display text-title text-ink-900">
          Stagger — apparition décalée
        </h2>
        <Stagger as="ul" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {["Un", "Deux", "Trois", "Quatre", "Cinq", "Six"].map((label) => (
            <StaggerItem as="li" key={label}>
              <Card className="text-center">{label}</Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Spacer />
      </Container>
    </div>
  );
}
