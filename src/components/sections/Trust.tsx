/**
 * Section « Confiance & preuve sociale » (R7, ancre `#confiance`) : refonte
 * enrichie du bloc confiance (étape 7).
 *
 * Registre **soutenant, jamais clinique ni alarmant**, aucun langage de
 * diagnostic. Réassurance sécurité/RGPD + caution professionnelle + disclaimer
 * médical obligatoire, puis stats illustratives et témoignages (personas
 * fictifs). Server Component composant `Stats` (client) et `Testimonials`.
 */
import {
  BadgeCheck,
  Lock,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Blob, Mascot } from "@/components/illustrations";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Container } from "@/components/ui";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";

type TrustItem = { icon: LucideIcon; title: string; description: string };

const items: TrustItem[] = [
  {
    icon: Lock,
    title: "Tes échanges sont chiffrés",
    description:
      "Connexions en HTTPS et messages chiffrés : seuls toi et ton interlocuteur avez accès à vos conversations.",
  },
  {
    icon: UserCheck,
    title: "Connexion simple et sûre",
    description:
      "Tu te connectes avec ton compte Google ou Apple (OAuth 2.0). Pas de mot de passe à retenir.",
  },
  {
    icon: ShieldCheck,
    title: "Conforme au RGPD",
    description:
      "Consentement explicite, droit d'accès à tes données et droit à l'effacement. Tu gardes le contrôle.",
  },
  {
    icon: BadgeCheck,
    title: "Validé par des pros",
    description:
      "Les ressources et exercices sont conçus et relus par des professionnels de santé.",
  },
];

export function Trust() {
  return (
    <section
      id="confiance"
      className="bg-brand-50 relative scroll-mt-24 overflow-hidden py-16 sm:py-24"
      aria-labelledby="trust-title"
    >
      <Blob className="pointer-events-none absolute top-24 -left-40 -z-0 w-[460px] opacity-40" />
      <Container className="relative">
        <Reveal>
          <div className="max-w-prose">
            <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
              En confiance
            </p>
            <h2
              id="trust-title"
              className="font-display text-title text-ink-900 sm:text-display mt-4"
            >
              Sérieux, sécurisé, et toujours doux.
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="rounded-card flex h-full flex-col bg-white p-6 shadow-sm">
                  <span className="rounded-control bg-brand-100 text-brand-700 inline-flex h-12 w-12 items-center justify-center">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-6 w-6"
                    />
                  </span>
                  <h3 className="text-heading font-display text-ink-900 mt-4">
                    {item.title}
                  </h3>
                  <p className="text-body text-ink-600 mt-2">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Disclaimer médical obligatoire : doux, soutenant, jamais alarmant.
            kitoo-heart : posture d'écoute bienveillante (contexte de soutien). */}
        <Reveal>
          <div className="rounded-card mt-8 flex flex-col items-center gap-4 bg-white px-5 py-4 shadow-sm sm:flex-row">
            <Mascot pose="heart" decorative className="w-24 shrink-0 sm:w-28" />
            <p className="text-body text-ink-700">
              Kitoo ne remplace pas un suivi médical professionnel. Si un moment
              est difficile, tu n&apos;es pas seul·e, on t&apos;aide à aller
              vers les bonnes personnes, en douceur.
            </p>
          </div>
        </Reveal>

        {/* Stats illustratives (compteur doux) */}
        <Stats />

        {/* Preuve sociale : personas fictifs */}
        <Testimonials />
      </Container>
    </section>
  );
}

export default Trust;
