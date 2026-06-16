/**
 * Section « Pour qui » : public cible et partenaires (ancre `#pour-qui`).
 *
 * Registre : les jeunes adultes sont tutoyés et rassurés ; les psychologues
 * partenaires sont vouvoyés avec respect. Aucun langage de diagnostic : Kitoo
 * oriente et accompagne, il n'évalue pas. Source : brief / design system Kitoo.
 *
 * Server Component : icônes Lucide décoratives (`aria-hidden`), en outline.
 */
import { HeartHandshake, Users, type LucideIcon } from "lucide-react";
import { Card, Container } from "@/components/ui";

type Profile = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const profiles: Profile[] = [
  {
    icon: Users,
    title: "Tu as entre 18 et 24 ans",
    description:
      "Kitoo est pensé pour toi : un espace doux pour prendre soin de ta santé mentale au quotidien, sans jugement. Les outils t'orientent vers ce qui peut t'aider, ils ne te diagnostiquent jamais.",
  },
  {
    icon: HeartHandshake,
    title: "Vous êtes psychologue partenaire",
    description:
      "Vous accompagnez les jeunes adultes via une messagerie sécurisée, dans un cadre respectueux et bienveillant. Kitoo facilite le lien, vous gardez la main sur votre pratique.",
  },
];

export function Audience() {
  return (
    <section
      id="pour-qui"
      className="scroll-mt-24 py-16 sm:py-24"
      aria-labelledby="audience-title"
    >
      <Container>
        <div className="max-w-prose">
          <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
            Pour qui
          </p>
          <h2
            id="audience-title"
            className="font-display text-title text-ink-900 sm:text-display mt-4"
          >
            Kitoo, c&apos;est pour toi (et pour les pros).
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <Card key={profile.title} soft className="flex h-full flex-col">
                <span className="rounded-control text-brand-600 inline-flex h-12 w-12 items-center justify-center bg-white">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-6 w-6"
                  />
                </span>
                <h3 className="text-title font-display text-ink-900 mt-4">
                  {profile.title}
                </h3>
                <p className="text-body text-ink-700 mt-2">
                  {profile.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Audience;
