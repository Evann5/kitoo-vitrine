/**
 * Page « Design System » (`/design-system`) · vitrine vivante de la charte Kitoo,
 * pensée pour la soutenance orale.
 *
 * **Source de vérité** : toutes les valeurs (couleurs, rayons, ombres, échelle
 * typo, espacement, mouvement) viennent de `src/lib/design-tokens.ts` · le même
 * module qui alimente `tailwind.config.ts`, et les composants montrés sont les
 * **vraies** primitives `src/components/ui/`. Les illustrations sont listées via
 * le registre `src/lib/illustrations.ts`. Rien n'est ré-inventé : ce qui est
 * documenté ici est exactement ce que produit le site.
 *
 * Server Component (les interactions · copier un hex, scroll-spy, toggles a11y,
 * démo mouvement · sont déléguées à de petits composants client).
 */
import type { Metadata } from "next";
import Image from "next/image";
import {
  Heart,
  Leaf,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import { CopyHex } from "@/components/design-system/CopyHex";
import { DsNav, type DsNavItem } from "@/components/design-system/DsNav";
import { MotionDemo } from "@/components/design-system/MotionDemo";
import { Swatch } from "@/components/design-system/Swatch";
import { Illustration } from "@/components/illustrations";
import {
  Badge,
  Button,
  Card,
  Container,
  IconButton,
  MoodFace,
  Pill,
  Tag,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  brandRoles,
  brandScale,
  fontFamilies,
  inkRoles,
  inkScale,
  moodColorsColorblind,
  moodColorsDefault,
  motionTokens,
  radii,
  semanticColors,
  shadows,
  spacingScale,
  typeScale,
} from "@/lib/design-tokens";
import { illustrations, type IllustrationKey } from "@/lib/illustrations";
import { moods } from "@/lib/moods";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "La charte Kitoo en direct : couleurs, typographie, composants, mascotte et accessibilité.",
  // Page interne (soutenance) : pas d'indexation moteur.
  robots: { index: false, follow: false },
};

const NAV: DsNavItem[] = [
  { id: "identite", label: "Identité" },
  { id: "couleurs", label: "Couleurs" },
  { id: "typographie", label: "Typographie" },
  { id: "espacement", label: "Espacement" },
  { id: "rayons", label: "Rayons" },
  { id: "ombres", label: "Ombres" },
  { id: "mouvement", label: "Mouvement" },
  { id: "composants", label: "Composants" },
  { id: "iconographie", label: "Iconographie" },
  { id: "illustrations", label: "Mascotte" },
  { id: "voix", label: "Voix & ton" },
  { id: "accessibilite", label: "Accessibilité" },
];

const roleOf = (
  roles: Record<string, string>,
  key: string,
): string | undefined => roles[key];

/** En-tête de section standardisé (numéro + titre + intro). */
function Sec({
  id,
  n,
  title,
  intro,
  children,
}: {
  id: string;
  n: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-ink-200 scroll-mt-28 border-t py-12 first:border-0 first:pt-0"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-7">
        <p className="text-eyebrow text-brand-800 font-bold tracking-[0.12em] uppercase">
          {n}
        </p>
        <h2
          id={`${id}-title`}
          className="font-display text-title text-ink-900 sm:text-display mt-1.5"
        >
          {title}
        </h2>
        {intro ? (
          <p className="text-body text-ink-600 mt-2 max-w-prose">{intro}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/** Sous-titre interne aux sections. */
function Lbl({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-heading text-brand-800 mt-8 mb-3 first:mt-0">
      {children}
    </h3>
  );
}

const mascotKeys = (Object.keys(illustrations) as IllustrationKey[]).filter(
  (k) => illustrations[k].kind === "mascot",
);

const voix = [
  { ctx: "Accueil", ex: "Coucou, content de te revoir. On y va à ton rythme ?" },
  { ctx: "Jour vide", ex: "Rien noté aujourd'hui, et c'est parfaitement ok." },
  { ctx: "Badge de série", ex: "3 jours d'affilée. Tout en douceur, bravo." },
  {
    ctx: "Escalade douce",
    ex: "Ça a l'air difficile en ce moment. Tu veux qu'on regarde des ressources ensemble ?",
  },
  {
    ctx: "Ressource",
    ex: "Un petit exercice de respiration, quand tu te sens prêt·e.",
  },
];

export default function DesignSystemPage() {
  return (
    <Container className="pt-28 pb-14 sm:pt-32 sm:pb-20">
      {/* En-tête de page */}
      <header className="max-w-prose">
        <p className="text-eyebrow text-brand-800 font-bold tracking-[0.12em] uppercase">
          Design system · v2.0.0
        </p>
        <h1 className="font-display text-display text-ink-900 mt-2">
          La charte Kitoo, en vrai.
        </h1>
        <p className="text-body text-ink-600 mt-3">
          Couleurs, typographie, formes, mouvement, composants et mascotte,
          montrés en direct et reliés aux vrais tokens du projet. Doux, arrondi,
          rassurant, accessible.
        </p>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[210px_1fr] lg:gap-12">
        <DsNav items={NAV} />

        <div>
          {/* 1 · Identité */}
          <Sec
            id="identite"
            n="01"
            title="Identité & principe directeur"
            intro="Kitoo prend soin des 18–24 ans, un jour à la fois. Tout est doux, arrondi et rassurant : on accompagne, on ne diagnostique jamais."
          >
            <Lbl>Les 3 graines de marque</Lbl>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Swatch name="Pervenche · brand-500" hex={brandScale[500]} dark />
              <Swatch name="Brume lavande · brand-100" hex={brandScale[100]} />
              <Swatch name="Encre · ink-900" hex={inkScale[900]} dark />
            </div>
            <Card soft className="mt-5 flex items-center gap-5">
              <div className="w-20 shrink-0 sm:w-24">
                <Illustration name="kitoo-classic" decorative />
              </div>
              <p className="text-body text-ink-700">
                La <b>mascotte koala</b> incarne la voix de marque : présente,
                bienveillante, jamais culpabilisante. Pervenche fidèle :{" "}
                <b>ne jamais la recolorer</b>.
              </p>
            </Card>

            <Lbl>Logo & wordmark</Lbl>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="text-center">
                <Card className="flex h-28 items-center justify-center">
                  <Image
                    src="/kitoo-logo.png"
                    alt="Logo Kitoo"
                    width={72}
                    height={72}
                    className="rounded-control"
                  />
                </Card>
                <p className="text-small text-ink-600 mt-2">Marque (koala)</p>
              </div>
              <div className="text-center">
                <Card className="flex h-28 items-center justify-center">
                  <span className="font-display text-display text-ink-900">
                    Kitoo
                  </span>
                </Card>
                <p className="text-small text-ink-600 mt-2">Wordmark (Goodly)</p>
              </div>
              <div className="text-center">
                <Card className="flex h-28 items-center justify-center gap-2">
                  <Image
                    src="/kitoo-logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-control"
                  />
                  <span className="font-display text-title text-ink-900">
                    Kitoo
                  </span>
                </Card>
                <p className="text-small text-ink-600 mt-2">
                  Lockup (header / footer)
                </p>
              </div>
            </div>
            <p className="text-small text-ink-600 mt-3">
              Le koala <b>est</b> la marque : ne jamais le recolorer ni le
              déformer, garder un espace de respiration autour, et le poser sur
              un fond clair.
            </p>
          </Sec>

          {/* 2 · Couleurs */}
          <Sec
            id="couleurs"
            n="02"
            title="Couleurs"
            intro="Pervenche en couleur de marque, neutres « encre » à cast froid/lavande, échelle d'humeur fixe et couleurs sémantiques. Clique un hex pour le copier."
          >
            <Lbl>Pervenche (brand 50 → 900)</Lbl>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {Object.entries(brandScale).map(([k, hex]) => (
                <Swatch
                  key={k}
                  name={`brand-${k}`}
                  hex={hex}
                  role={roleOf(brandRoles, k)}
                  dark={Number(k) >= 600}
                />
              ))}
            </div>

            <Lbl>Encre (ink 50 → 900)</Lbl>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {Object.entries(inkScale).map(([k, hex]) => (
                <Swatch
                  key={k}
                  name={`ink-${k}`}
                  hex={hex}
                  role={roleOf(inkRoles, k)}
                  dark={Number(k) >= 500}
                />
              ))}
            </div>

            <Lbl>Échelle d&apos;humeur (défaut · daltonisme)</Lbl>
            <Card padded={false} className="divide-ink-100 divide-y">
              {moods.map((m) => (
                <div
                  key={m.level}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 p-3"
                >
                  <MoodFace level={m.level} size={36} />
                  <span className="text-body text-ink-900 w-28 font-bold">
                    {m.label}
                  </span>
                  <span className="text-small text-ink-500">défaut</span>
                  <CopyHex value={moodColorsDefault[m.level]} label={m.label} />
                  <span className="text-small text-ink-500">daltonisme</span>
                  <CopyHex
                    value={moodColorsColorblind[m.level]}
                    label={`${m.label} daltonisme`}
                  />
                </div>
              ))}
            </Card>

            <Lbl>Sémantique</Lbl>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Swatch name="brand" hex={brandScale[500]} dark />
              <Swatch name="success" hex={semanticColors.success} dark />
              <Swatch name="warning" hex={semanticColors.warning} dark />
              <Swatch name="danger" hex={semanticColors.danger} dark />
            </div>
          </Sec>

          {/* 3 · Typographie */}
          <Sec
            id="typographie"
            n="03"
            title="Typographie"
            intro="Trois familles, une échelle nette. Corps ≥ 16px (WCAG), titres en casse phrase, eyebrows en MAJUSCULES."
          >
            <Lbl>Familles</Lbl>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {fontFamilies.map((f) => (
                <Card key={f.name}>
                  <p className="text-small text-brand-800 font-bold">{f.name}</p>
                  <p className="text-small text-ink-600">{f.role}</p>
                  <p
                    className="text-title text-ink-900 mt-3"
                    style={{ fontFamily: `var(${f.varName})` }}
                  >
                    Prends soin de toi.
                  </p>
                </Card>
              ))}
            </div>

            <Lbl>Échelle typographique</Lbl>
            <div className="rounded-card border-ink-200 border px-5">
              {typeScale.map((t) => {
                const isEyebrow = t.token === "eyebrow";
                const isDisplay = t.token === "display" || t.token === "title";
                return (
                  <div
                    key={t.token}
                    className="border-ink-100 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b py-3 last:border-0"
                  >
                    <span
                      className={cn(
                        "text-ink-900",
                        isDisplay && "font-display",
                        isEyebrow &&
                          "text-brand-800 font-bold tracking-[0.12em] uppercase",
                      )}
                      style={{ fontSize: `${t.px}px`, lineHeight: t.line }}
                    >
                      Prends soin de toi
                    </span>
                    <span className="text-small text-ink-500 shrink-0 font-mono">
                      {t.token} · {t.px}px · {t.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </Sec>

          {/* 4 · Espacement */}
          <Sec
            id="espacement"
            n="04"
            title="Espacement"
            intro="Échelle base 4px : un rythme régulier qui fait respirer les interfaces."
          >
            <div className="space-y-2.5">
              {spacingScale.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className="bg-brand-500 rounded-control h-4"
                    style={{ width: `${s}px` }}
                  />
                  <span className="text-small text-ink-600 font-mono">
                    {s}px
                  </span>
                </div>
              ))}
            </div>
          </Sec>

          {/* 5 · Rayons */}
          <Sec
            id="rayons"
            n="05"
            title="Rayons d'angle"
            intro="Tout est arrondi. Du contrôle à la pastille, quatre rayons couvrent toute l'UI."
          >
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {Object.entries(radii).map(([k, v]) => (
                <div key={k} className="text-center">
                  <div
                    className="border-ink-200 shadow-sm mx-auto h-20 w-20 border bg-white"
                    style={{ borderRadius: v }}
                  />
                  <p className="text-small text-ink-700 mt-2 font-bold">
                    {k}
                    <span className="text-ink-500 block font-mono font-normal">
                      {v === "9999px" ? "999px" : v}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </Sec>

          {/* 6 · Ombres */}
          <Sec
            id="ombres"
            n="06"
            title="Ombres"
            intro="Diffuses et teintées lavande, jamais de gris dur. Plus l'anneau de focus pervenche (4px)."
          >
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {(
                [
                  ["shadow-sm", shadows.sm],
                  ["shadow-md", shadows.md],
                  ["shadow-brand", shadows.brand],
                  ["focus 4px", shadows.focus],
                ] as const
              ).map(([name, sh]) => (
                <div key={name} className="text-center">
                  <div
                    className="rounded-card mx-auto h-20 w-full bg-white"
                    style={{ boxShadow: sh }}
                  />
                  <p className="text-small text-ink-700 mt-3 font-bold">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </Sec>

          {/* 7 · Mouvement */}
          <Sec
            id="mouvement"
            n="07"
            title="Mouvement"
            intro={`Entrées douces (${motionTokens.easeLabel}), durées ${motionTokens.durationRange}. Toujours derrière motion-safe → neutralisé sous prefers-reduced-motion.`}
          >
            <Card>
              <MotionDemo />
            </Card>
            <p className="text-small text-ink-600 mt-3">
              Idle de la mascotte :{" "}
              {motionTokens.idle
                .map((i) => `${i.name} (${i.value})`)
                .join(" · ")}{" "}
              · easing <code className="font-mono">{motionTokens.ease}</code>.
            </p>
          </Sec>

          {/* 8 · Composants */}
          <Sec
            id="composants"
            n="08"
            title="Composants"
            intro="Les vraies primitives de src/components/ui/, rendues en direct et étiquetées."
          >
            <Lbl>Button · variants</Lbl>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>

            <Lbl>Button · tailles & états</Lbl>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">sm</Button>
              <Button size="md">md</Button>
              <Button size="lg">lg</Button>
              <Button loading>Chargement</Button>
              <Button disabled>Désactivé</Button>
            </div>
            <p className="text-small text-ink-500 mt-2">
              États gérés : hover, active (enfoncement 3D), focus-visible (anneau
              pervenche), disabled, loading.
            </p>

            <Lbl>IconButton</Lbl>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton aria-label="Favori, solide" variant="solid">
                <Heart aria-hidden="true" className="h-5 w-5" />
              </IconButton>
              <IconButton aria-label="Favori, fantôme" variant="ghost">
                <Heart aria-hidden="true" className="h-5 w-5" />
              </IconButton>
              <IconButton aria-label="Favori, contour" variant="outline">
                <Heart aria-hidden="true" className="h-5 w-5" />
              </IconButton>
            </div>

            <Lbl>Card, Badge, Pill & Tag</Lbl>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <p className="font-bold">Card</p>
                <p className="text-small text-ink-600 mt-1">
                  Surface blanche, rayon card, ombre douce.
                </p>
              </Card>
              <Card soft>
                <p className="font-bold">Card soft</p>
                <p className="text-small text-ink-700 mt-1">
                  Surface brume lavande pour le contenu apaisant.
                </p>
              </Card>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge tone="brand">brand</Badge>
              <Badge tone="neutral">neutral</Badge>
              <Badge tone="success">success</Badge>
              <Badge tone="warning">warning</Badge>
              <Badge tone="danger">danger</Badge>
              <Pill>Pill</Pill>
              <Tag>Tag</Tag>
              <Tag selected>Tag sélectionné</Tag>
            </div>
            <p className="text-small text-ink-500 mt-3">
              Mise en page : <code className="font-mono">Container</code> (1180 /
              680px) et <code className="font-mono">Section</code> (rythme
              vertical) structurent chaque page.
            </p>
          </Sec>

          {/* 9 · Iconographie */}
          <Sec
            id="iconographie"
            n="09"
            title="Iconographie"
            intro="Icônes Lucide à traits ronds (strokeWidth 1.75). Ne jamais mélanger filled & outline. Les humeurs ont un set de visages sur-mesure."
          >
            <Lbl>Lucide (outline)</Lbl>
            <div className="text-brand-700 flex flex-wrap items-center gap-5">
              {[Heart, MessageCircleHeart, Leaf, ShieldCheck, Sparkles].map(
                (Icon, i) => (
                  <Icon
                    key={i}
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-7 w-7"
                  />
                ),
              )}
            </div>

            <Lbl>Mood faces (sur-mesure)</Lbl>
            <div className="flex flex-wrap items-end gap-5">
              {moods.map((m) => (
                <div key={m.level} className="text-center">
                  <MoodFace level={m.level} size={48} />
                  <p className="text-small text-ink-600 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </Sec>

          {/* 10 · Mascotte & illustrations */}
          <Sec
            id="illustrations"
            n="10"
            title="Mascotte & illustrations"
            intro="Toutes les poses du koala Kitoo, listées via le registre d'illustrations. kitoo-crying est réservé aux contextes de soutien."
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {mascotKeys.map((key) => (
                <figure
                  key={key}
                  className="rounded-card border-ink-200 border bg-white p-3 text-center"
                >
                  <div className="mx-auto w-20">
                    <Illustration name={key} decorative />
                  </div>
                  <figcaption className="text-small text-ink-600 mt-2 font-mono">
                    {key}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Sec>

          {/* 11 · Voix & ton */}
          <Sec
            id="voix"
            n="11"
            title="Voix & ton"
            intro="Chaleureux, tutoiement, casse phrase, jamais de langage de diagnostic. On encourage en douceur."
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {voix.map((v) => (
                <Card key={v.ctx} soft>
                  <p className="text-eyebrow text-brand-800 font-bold tracking-[0.1em] uppercase">
                    {v.ctx}
                  </p>
                  <p className="text-body text-ink-800 mt-1">« {v.ex} »</p>
                </Card>
              ))}
            </div>
            <Card className="mt-4 flex items-start gap-3">
              <ShieldCheck
                aria-hidden="true"
                strokeWidth={1.75}
                className="text-brand-700 mt-0.5 h-5 w-5 shrink-0"
              />
              <p className="text-small text-ink-700">
                <b>Disclaimer médical obligatoire :</b> Kitoo ne remplace pas un
                suivi professionnel. Toujours présent, doux, non alarmant.
              </p>
            </Card>
          </Sec>

          {/* 12 · Accessibilité */}
          <Sec
            id="accessibilite"
            n="12"
            title="Accessibilité"
            intro="WCAG AA visé. Modes dyslexie (Atkinson) et daltonisme démontrables ci-dessous : ils s'appliquent à tout le site."
          >
            <Card className="flex flex-wrap items-center gap-4">
              <AccessibilityToggle />
              <p className="text-small text-ink-600">
                Bascule la police dyslexie et la palette d&apos;humeur
                daltonisme.
              </p>
            </Card>

            <Lbl>Focus visible</Lbl>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Tabule jusqu&apos;ici</Button>
              <a
                href="#identite"
                className="rounded-control text-body text-brand-800 hover:text-brand-900 font-bold underline-offset-4 hover:underline"
              >
                …puis ici
              </a>
            </div>
            <ul className="text-small text-ink-700 mt-5 list-disc space-y-1.5 pl-5">
              <li>Contrastes AA ; texte sur pervenche en brand-700/800.</li>
              <li>Anneau de focus pervenche 4px sur tout élément interactif.</li>
              <li>
                Hiérarchie de titres stricte (un seul h1), corps ≥ 16px.
              </li>
              <li>
                <code className="font-mono">prefers-reduced-motion</code>{" "}
                respecté (cf. section Mouvement).
              </li>
            </ul>
          </Sec>
        </div>
      </div>
    </Container>
  );
}
