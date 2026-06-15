/**
 * Section Hero — première section visible de la landing (ancre `#hero`).
 *
 * Voix de marque Kitoo : chaleureuse, rassurante, dédramatisée, tutoiement,
 * casse phrase. L'accroche « Prends soin de toi, un jour à la fois. » reprend
 * le ton « ami bienveillant » du design system ; le sous-titre explique le
 * produit en une phrase compréhensible par un·e jeune de 18–24 ans.
 *
 * Server Component : l'animation d'entrée est 100 % CSS (`.animate-enter`),
 * neutralisée sous `prefers-reduced-motion`.
 */
import Image from "next/image";
import { Container } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="hero"
      className="bg-brand-50 scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Texte */}
          <div className="animate-enter text-center md:text-left">
            <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
              Prévention santé mentale · 18–24 ans
            </p>

            <h1
              id="hero-title"
              className="font-display text-display text-ink-900 mt-4"
            >
              Prends soin de toi, un jour à la fois.
            </h1>

            <p className="text-body text-ink-600 mx-auto mt-5 max-w-prose md:mx-0">
              Kitoo t&apos;aide à suivre ton humeur au quotidien, à piocher dans
              des ressources bien-être validées, et à échanger en confiance avec
              des pros. Doucement, à ton rythme.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
              <a
                href={siteConfig.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Accéder à l&apos;app
              </a>
              <a
                href="#fonctionnalites"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Découvrir
              </a>
            </div>
          </div>

          {/* Mascotte koala — non recolorée. Halo lavande pour la présence
              (l'image fait 195px, on ne l'agrandit pas au-delà). */}
          <div className="animate-enter flex justify-center md:justify-end">
            <div className="rounded-panel bg-brand-100 flex aspect-square w-64 items-center justify-center shadow-md sm:w-72">
              <Image
                src="/kitoo-logo.jpg"
                alt="Koala violet, la mascotte bienveillante de Kitoo"
                width={190}
                height={190}
                className="rounded-card"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
