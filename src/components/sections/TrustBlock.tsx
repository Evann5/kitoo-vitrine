/**
 * Bloc Confiance — sécurité, RGPD et disclaimer médical.
 *
 * Ton : rassurant et soutenant, jamais alarmant ni clinique. Le disclaimer
 * « Kitoo ne remplace pas un suivi médical professionnel. » est obligatoire et
 * mis en valeur doucement. Source : brief / design system Kitoo.
 *
 * Server Component : icônes Lucide décoratives (`aria-hidden`), en outline.
 */
import { Lock, ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";

type TrustItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

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
      "Tu te connectes avec ton compte Google ou Apple (OAuth 2.0). Pas de mot de passe à retenir, pas de données en clair.",
  },
  {
    icon: ShieldCheck,
    title: "Conforme au RGPD",
    description:
      "Consentement explicite, droit d'accès à tes données et droit à l'effacement. Tu gardes le contrôle, à tout moment.",
  },
];

export function TrustBlock() {
  return (
    <section
      className="bg-brand-50 scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="trust-title"
    >
      <Container>
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
            En confiance
          </p>
          <h2
            id="trust-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Tes données, ta tranquillité.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-card flex h-full flex-col bg-white p-6 shadow-sm"
              >
                <span className="rounded-control bg-brand-100 text-brand-600 inline-flex h-12 w-12 items-center justify-center">
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
            );
          })}
        </div>

        {/* Disclaimer médical obligatoire — doux, soutenant, jamais alarmant. */}
        <p className="rounded-card text-body text-ink-700 mt-8 bg-white px-5 py-4 shadow-sm">
          Kitoo ne remplace pas un suivi médical professionnel. Si un moment est
          difficile, tu n&apos;es pas seul·e — on t&apos;aide à aller vers les
          bonnes personnes, en douceur.
        </p>
      </Container>
    </section>
  );
}

export default TrustBlock;
