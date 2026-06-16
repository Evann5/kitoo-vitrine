/**
 * Section « Aperçu » (R6) : démo humeur interactive + gamification douce
 * (ancre `#apercu`).
 *
 * ⚠️ **Purement illustratif** : aucune donnée enregistrée ni envoyée, aucun lien
 * avec l'app, juste un état React local pour faire « ressentir » le Mood
 * Tracker. Ton bienveillant, jamais culpabilisant.
 *
 * Server Component : pré-rend une mascotte par humeur et les passe au sélecteur
 * client (`MoodSelector`), qui n'a donc pas à importer `Mascot` (server-only).
 */
import { Blob, Mascot } from "@/components/illustrations";
import { Container } from "@/components/ui";
import { type MoodLevel, moods } from "@/lib/moods";
import { siteConfig } from "@/lib/site-config";
import { Gamification } from "./Gamification";
import { MoodSelector } from "./MoodSelector";

function buildMascots(): Record<MoodLevel, React.ReactNode> {
  const entries = moods.map((m) => [
    m.level,
    <Mascot key={m.level} pose={m.pose} decorative className="w-full" />,
  ]);
  return Object.fromEntries(entries) as Record<MoodLevel, React.ReactNode>;
}

export function MoodDemo() {
  return (
    <section
      id="apercu"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
      aria-labelledby="apercu-title"
    >
      <Blob className="pointer-events-none absolute top-10 -right-40 -z-0 w-[420px] opacity-40" />
      <Container className="relative">
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
            Aperçu de l&apos;app
          </p>
          <h2
            id="apercu-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Ressens Kitoo en un clic.
          </h2>
        </div>

        <div className="mt-12">
          <MoodSelector mascots={buildMascots()} />
        </div>

        <Gamification />

        {/* CTA discret vers l'app (la vraie expérience s'y vit). */}
        <p className="text-body text-ink-600 mt-12 text-center md:text-left">
          La vraie expérience t&apos;attend dans l&apos;app :{" "}
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-control text-brand-700 hover:text-brand-800 font-bold underline-offset-4 hover:underline"
          >
            accéder à Kitoo
          </a>
          .
        </p>
      </Container>
    </section>
  );
}

export default MoodDemo;
