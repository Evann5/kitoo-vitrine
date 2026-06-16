# Illustrations Kitoo — guide de dépôt

Les illustrations **réelles** de la mascotte Kitoo (émotions) sont déposées ici.
Le code ne référence jamais un chemin : il consomme une **clé** (registre
[`src/lib/illustrations.ts`](../../src/lib/illustrations.ts)). Si un fichier
manque, un placeholder doux s'affiche automatiquement à sa place (résolution au
build, aucune modification de code nécessaire).

## Format & règles

- **Format** : PNG (transparent) déposé tel quel ; servi optimisé (WebP/AVIF) par
  `next/image`. SVG/WebP acceptés aussi (garder le même nom de fichier).
- **Dimensions** : le registre fixe les `width`/`height` **réels** de chaque
  asset (anti-CLS) ; l'image est ensuite mise à l'échelle par les sections.
- **Mascotte** : reste fidèle au koala violet ; **ne pas recolorer**.
- `kitoo-crying` est **réservé aux contextes de soutien** (humeur la plus basse,
  écoute) — jamais en décoration gratuite, jamais alarmant.

## Émotions de la mascotte (clés `kitoo-*`)

| Clé                 | Fichier                 | Dim. réelles | Sens / usage principal                          |
| ------------------- | ----------------------- | ------------ | ----------------------------------------------- |
| `kitoo-classic`     | `kitoo-classic.png`     | 718×431      | Accueil / neutre (Hero, Mood tracker, étape 1)  |
| `kitoo-heart`       | `kitoo-heart.png`       | 579×612      | Écoute / soutien (Chat, bloc confiance)         |
| `kitoo-sleeping`    | `kitoo-sleeping.png`    | 585×369      | Repos / bien-être (Espace bien-être)            |
| `kitoo-soda`        | `kitoo-soda.png`        | 839×794      | Légèreté / détente (humeur positive, étape 2)   |
| `kitoo-bubble-tea`  | `kitoo-bubble-tea.png`  | 440×426      | Convivialité (témoignages)                      |
| `kitoo-sunglasses`  | `kitoo-sunglasses.png`  | 616×526      | Fierté / bonne humeur (très positif, badges)    |
| `kitoo-skating`     | `kitoo-skating.png`     | 649×687      | Énergie / avancée (étape 3 du parcours)         |
| `kitoo-crying`      | `kitoo-crying.png`      | 1333×800     | Émotion / soutien (très négatif) — **ménagé**   |

## Décors (formes SVG générées, pas d'asset requis)

| Clé            | Usage                                  |
| -------------- | -------------------------------------- |
| `blob-soft`    | Forme organique de fond (décoratif)    |
| `wave-divider` | Séparateur ondulé entre sections       |

## Ajouter / remplacer une illustration

1. Dépose le fichier ici avec le **nom exact** (colonne « Fichier »).
2. Si le ratio diffère, ajuste `width`/`height` dans `src/lib/illustrations.ts`.
3. Utilise `<Mascot pose="…" />` ou `<Illustration name="kitoo-…" />`.
