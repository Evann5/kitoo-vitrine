/**
 * Banc d'essai du système d'illustrations (placeholders, poses, décors).
 *
 * ⚠️ Dev only — sera retiré en R10. Server Component (la résolution
 * réel/placeholder lit le système de fichiers au build).
 */
import { notFound } from "next/navigation";
import { Blob, Illustration, Mascot } from "@/components/illustrations";
import { Card, Container } from "@/components/ui";
import { illustrationKeys, type MascotPose } from "@/lib/illustrations";

const poses: MascotPose[] = [
  "wave",
  "calm",
  "thinking",
  "celebrate",
  "sleep",
  "support",
];

export default function IllustrationLabPage() {
  // Banc d'essai dev uniquement — inaccessible en production (retiré en R10).
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="bg-ink-50 relative overflow-hidden py-16">
      <Blob className="pointer-events-none absolute top-10 -right-32 -z-0 w-[420px] opacity-60" />
      <Container>
        <p className="text-eyebrow text-brand-800 font-bold tracking-[0.04em] uppercase">
          Illustration lab · dev
        </p>
        <h1 className="font-display text-display text-ink-900 mt-4">
          Mascotte &amp; illustrations
        </h1>
        <p className="text-body text-ink-600 mt-4 max-w-prose">
          Placeholders affichés tant que les vrais assets ne sont pas déposés
          dans <code>public/illustrations/</code>. Chaque clé montre son nom en
          dev.
        </p>

        <h2 className="font-display text-title text-ink-900 mt-12">
          Poses de la mascotte
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {poses.map((pose) => (
            <div key={pose} className="flex flex-col items-center gap-2">
              <Mascot pose={pose} className="w-full max-w-[160px]" />
              <code className="text-small text-ink-600">koala-{pose}</code>
            </div>
          ))}
        </div>

        <h2 className="font-display text-title text-ink-900 mt-14">
          Toutes les clés du registre
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {illustrationKeys.map((key) => (
            <Card key={key} className="flex flex-col items-center gap-3">
              <Illustration name={key} className="max-w-[220px]" />
              <code className="text-small text-ink-600">{key}</code>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
