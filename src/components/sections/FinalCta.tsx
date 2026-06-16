/**
 * CTA final : invitation chaleureuse à accéder à l'app.
 *
 * Ton : doux, encourageant, tutoiement. Sur une surface lavande douce
 * (`Card soft`). Le lien externe vers l'app s'ouvre dans un nouvel onglet avec
 * `rel="noopener noreferrer"` (sécurité). Source : brief Kitoo.
 *
 * Server Component.
 */
import { Card, Container } from "@/components/ui";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="final-cta-title">
      <Container>
        <Card
          soft
          className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12"
        >
          <div className="max-w-prose">
            <h2
              id="final-cta-title"
              className="font-display text-title text-ink-900 sm:text-display"
            >
              Prêt·e à prendre soin de toi ?
            </h2>
            <p className="text-body text-ink-700 mt-4">
              Rejoins Kitoo et avance à ton rythme, un jour à la fois. On est
              là, à chaque étape.
            </p>
          </div>

          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Accéder à l&apos;app
          </a>
        </Card>
      </Container>
    </section>
  );
}

export default FinalCta;
