/**
 * Section Hero refondue (R4) : première impression, ancre `#hero`.
 *
 * Hiérarchie d'action « à la Duolingo » : **un seul CTA dominant** (« Accéder à
 * l'app », pervenche, gros) + un lien secondaire discret (« Découvrir ») qui ne
 * concurrence pas le CTA. Voix de marque Kitoo : chaleureuse, rassurante,
 * tutoiement, casse phrase.
 *
 * Server Component : compose les wrappers d'animation client (`Reveal`,
 * `Stagger`) avec la mascotte/les décors server (`Mascot`, `Blob`) via
 * `children`. Entrée orchestrée en cascade, neutralisée sous
 * `prefers-reduced-motion`. Mascotte `priority` (pas de lazy sur le hero).
 */
import { ArrowDown } from "lucide-react";
import { Blob, Mascot } from "@/components/illustrations";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button, Container } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bg-brand-50 relative flex min-h-[100svh] scroll-mt-24 items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Décors organiques doux en arrière-plan (jamais de dégradé criard). */}
      <Blob
        animate
        className="pointer-events-none absolute -top-24 -left-40 -z-0 w-[520px] opacity-60"
      />
      <Blob className="pointer-events-none absolute right-[-10rem] -bottom-32 -z-0 w-[460px] opacity-50" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Texte + actions (cascade d'entrée) */}
          <Stagger className="text-center md:text-left">
            <StaggerItem>
              <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
                Prévention santé mentale · 18–24 ans
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1
                id="hero-title"
                className="font-display text-display text-ink-900 mt-4"
              >
                Prends soin de toi, un jour à la fois.
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-body text-ink-600 mx-auto mt-5 max-w-prose md:mx-0">
                Kitoo t&apos;aide à suivre ton humeur au quotidien, à piocher
                dans des ressources bien-être validées, et à échanger en
                confiance avec des pros.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
                {/* CTA dominant unique */}
                <Button
                  as="a"
                  variant="primary"
                  size="lg"
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accéder à l&apos;app
                </Button>
                {/* Lien secondaire discret (ne concurrence pas le CTA) */}
                <a
                  href="#fonctionnalites"
                  className="group rounded-control text-body text-brand-800 hover:text-brand-900 inline-flex items-center gap-1.5 px-1 py-1 font-bold"
                >
                  Découvrir
                  <ArrowDown
                    aria-hidden="true"
                    strokeWidth={2}
                    className="duration-kitoo ease-kitoo h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Mascotte (entrée douce + idle flottant) */}
          <Reveal
            variant="scaleIn"
            className="flex justify-center md:justify-end"
          >
            <div className="relative flex w-full max-w-[440px] items-center justify-center sm:max-w-[560px] lg:max-w-[640px]">
              <Blob className="pointer-events-none absolute inset-0 -z-0 scale-125 opacity-70" />
              <Mascot pose="classic" priority className="relative w-full" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
