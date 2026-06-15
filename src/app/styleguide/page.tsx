"use client";

/**
 * Page de démonstration des primitives & tokens Kitoo.
 *
 * ⚠️ Dev only — sera retirée avant la mise en production. Sert de vérification
 * visuelle de l'Étape 2 (design tokens & composants UI).
 */
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Pill,
  Section,
  Tag,
} from "@/components/ui";

// Classes littérales : Tailwind n'extrait pas les noms construits dynamiquement.
const brandSwatches = [
  { label: "brand-50", className: "bg-brand-50" },
  { label: "brand-100", className: "bg-brand-100" },
  { label: "brand-200", className: "bg-brand-200" },
  { label: "brand-300", className: "bg-brand-300" },
  { label: "brand-400", className: "bg-brand-400" },
  { label: "brand-500", className: "bg-brand-500" },
  { label: "brand-600", className: "bg-brand-600" },
  { label: "brand-700", className: "bg-brand-700" },
  { label: "brand-800", className: "bg-brand-800" },
  { label: "brand-900", className: "bg-brand-900" },
] as const;

const inkSwatches = [
  { label: "ink-50", className: "bg-ink-50" },
  { label: "ink-100", className: "bg-ink-100" },
  { label: "ink-200", className: "bg-ink-200" },
  { label: "ink-300", className: "bg-ink-300" },
  { label: "ink-400", className: "bg-ink-400" },
  { label: "ink-500", className: "bg-ink-500" },
  { label: "ink-600", className: "bg-ink-600" },
  { label: "ink-700", className: "bg-ink-700" },
  { label: "ink-800", className: "bg-ink-800" },
  { label: "ink-900", className: "bg-ink-900" },
] as const;

const moods = [
  {
    key: "very-positive",
    label: "Très positif",
    className: "bg-mood-very-positive",
  },
  { key: "positive", label: "Positif", className: "bg-mood-positive" },
  { key: "neutral", label: "Neutre", className: "bg-mood-neutral" },
  { key: "negative", label: "Négatif", className: "bg-mood-negative" },
  {
    key: "very-negative",
    label: "Très négatif",
    className: "bg-mood-very-negative",
  },
] as const;

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`rounded-control h-14 shadow-sm ${className}`} />
      <span className="text-small text-ink-600">{label}</span>
    </div>
  );
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-title text-ink-900">{children}</h2>;
}

export default function StyleguidePage() {
  const [selected, setSelected] = useState<string | null>("respiration");

  return (
    <div className="bg-ink-50">
      <Container>
        <Section id="intro">
          <p className="text-eyebrow text-brand-800 tracking-[0.04em] uppercase">
            Design system · MVP
          </p>
          <h1 className="font-display text-display text-ink-900 mt-2">
            Styleguide Kitoo
          </h1>
          <p className="text-body text-ink-600 mt-3 max-w-prose">
            Prends soin de toi. Aperçu des tokens et des primitives UI — doux,
            aéré, apaisant.
          </p>
        </Section>

        {/* Couleurs */}
        <Section id="couleurs" className="border-ink-200 border-t">
          <Subtitle>Couleurs</Subtitle>
          <h3 className="text-heading text-ink-900 mt-6">Pervenche</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
            {brandSwatches.map((s) => (
              <Swatch key={s.label} className={s.className} label={s.label} />
            ))}
          </div>

          <h3 className="text-heading text-ink-900 mt-8">Encre</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
            {inkSwatches.map((s) => (
              <Swatch key={s.label} className={s.className} label={s.label} />
            ))}
          </div>

          <h3 className="text-heading text-ink-900 mt-8">Humeur (fixe)</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {moods.map((m) => (
              <Swatch key={m.key} className={m.className} label={m.label} />
            ))}
          </div>

          <h3 className="text-heading text-ink-900 mt-8">Sémantique</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Swatch className="bg-success" label="success" />
            <Swatch className="bg-warning" label="warning" />
            <Swatch className="bg-danger" label="danger" />
            <Swatch className="bg-brand-500" label="brand" />
          </div>
        </Section>

        {/* Typographie */}
        <Section id="typo" className="border-ink-200 border-t">
          <Subtitle>Typographie</Subtitle>
          <div className="mt-6 flex flex-col gap-4">
            <p className="font-display text-display text-ink-900">
              Prends soin de toi
            </p>
            <p className="font-display text-title text-ink-900">
              Ton humeur cette semaine
            </p>
            <p className="text-heading text-ink-900">Espace bien-être</p>
            <p className="text-body text-ink-700">
              Tu peux noter ton humeur quand tu veux. (body · 16px min)
            </p>
            <p className="text-small text-ink-600">
              5 min pour souffler — respiration 4-7-8. (small · 13px)
            </p>
            <p className="text-eyebrow text-brand-800 tracking-[0.04em] uppercase">
              Ressource validée
            </p>
          </div>
        </Section>

        {/* Boutons */}
        <Section id="boutons" className="border-ink-200 border-t">
          <Subtitle>Boutons</Subtitle>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="primary">Noter mon humeur</Button>
            <Button variant="ghost">Voir mes ressources</Button>
            <Button variant="outline">Plus tard</Button>
            <Button variant="primary" disabled>
              Indisponible
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Petit</Button>
            <Button size="md">Moyen</Button>
            <Button size="lg">Grand</Button>
          </div>
        </Section>

        {/* Cartes */}
        <Section id="cartes" className="border-ink-200 border-t">
          <Subtitle>Cartes</Subtitle>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-heading text-ink-900">Carte blanche</h3>
              <p className="text-body text-ink-600 mt-2">
                Surface blanche, rayon 22px, ombre douce teintée lavande.
              </p>
            </Card>
            <Card soft>
              <h3 className="text-heading text-ink-900">Carte douce</h3>
              <p className="text-body text-ink-700 mt-2">
                Variante <code>soft</code> — fond brume lavande pour le contenu
                apaisant.
              </p>
            </Card>
          </div>
        </Section>

        {/* Badges, pills & tags */}
        <Section id="pills" className="border-ink-200 border-t">
          <Subtitle>Badges, pills &amp; tags</Subtitle>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="brand">Nouveau</Badge>
            <Badge tone="neutral">Brouillon</Badge>
            <Badge tone="success">Validé</Badge>
            <Badge tone="warning">En attente</Badge>
            <Badge tone="danger">Urgent</Badge>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Pill>Respiration</Pill>
            <Pill>Sommeil</Pill>
            <Pill>Stress</Pill>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {["respiration", "sommeil", "stress"].map((t) => (
              <Tag
                key={t}
                selected={selected === t}
                onClick={() => setSelected(selected === t ? null : t)}
              >
                {t}
              </Tag>
            ))}
          </div>
        </Section>

        {/* Rayons & ombres */}
        <Section id="rayons" className="border-ink-200 border-t">
          <Subtitle>Rayons &amp; ombres</Subtitle>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-control text-small bg-white p-6 text-center shadow-sm">
              control · 16
            </div>
            <div className="rounded-card text-small bg-white p-6 text-center shadow-sm">
              card · 22
            </div>
            <div className="rounded-panel text-small bg-white p-6 text-center shadow-md">
              panel · 30
            </div>
            <div className="rounded-pill text-small shadow-brand bg-white p-6 text-center">
              pill · 999
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
