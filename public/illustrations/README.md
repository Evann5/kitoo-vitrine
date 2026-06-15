# Illustrations Kitoo — guide de dépôt

Dépose ici les **vraies** illustrations. Tant qu'un fichier est absent, un
placeholder doux s'affiche automatiquement à sa place. **Aucune modification de
code n'est nécessaire** : nomme simplement le fichier exactement comme indiqué
ci-dessous, puis redéploie (la résolution se fait au build).

> Le code ne référence jamais un chemin : il consomme une **clé** (registre
> [`src/lib/illustrations.ts`](../../src/lib/illustrations.ts)).

## Format & règles

- **Format** : SVG de préférence (net, léger), sinon **WebP** ou **PNG** (fond
  transparent). Garde le **même nom de fichier** que la colonne « Fichier ».
- **Dimensions** : respecte le ratio indiqué. Les `width`/`height` du registre
  servent à réserver l'espace (anti-CLS) ; l'image est ensuite mise à l'échelle.
- **Zone de sécurité** : garde ~10 % de marge autour du sujet (le koala ne doit
  pas toucher les bords) — les conteneurs peuvent être arrondis.
- **Mascotte** : reste fidèle au koala violet ; **ne recolore pas** l'identité.
- **Décors** : palette lavande/pervenche douce, sans contraste agressif.

## Mascotte (clés `koala-*`)

| Clé               | Fichier               | Ratio | Dim. réf. | Sens / `alt` attendu                          |
| ----------------- | --------------------- | ----- | --------- | --------------------------------------------- |
| `koala-wave`      | `koala-wave.svg`      | 1:1   | 400×400   | Le koala fait un signe (accueil, hero)        |
| `koala-calm`      | `koala-calm.svg`      | 1:1   | 400×400   | Koala paisible, détendu                       |
| `koala-thinking`  | `koala-thinking.svg`  | 1:1   | 400×400   | Koala pensif (FAQ, réflexion)                 |
| `koala-celebrate` | `koala-celebrate.svg` | 1:1   | 400×400   | Koala qui célèbre (réussite, badge)           |
| `koala-sleep`     | `koala-sleep.svg`     | 1:1   | 400×400   | Koala qui se repose (sommeil, calme)          |
| `koala-support`   | `koala-support.svg`   | 1:1   | 400×400   | Koala qui tend la main (soutien)              |

## Décors (fond)

| Clé            | Fichier             | Ratio | Dim. réf. | Usage                                  |
| -------------- | ------------------- | ----- | --------- | -------------------------------------- |
| `blob-soft`    | `blob-soft.svg`     | 1:1   | 600×600   | Forme organique de fond (décoratif)    |
| `wave-divider` | `wave-divider.svg`  | 12:1  | 1440×120  | Séparateur ondulé entre sections       |

## Ajouter une nouvelle illustration

1. Ajoute une entrée dans `src/lib/illustrations.ts` (clé → fichier, alt, dims,
   `kind`).
2. Dépose le fichier ici avec le nom exact.
3. Utilise `<Illustration name="ta-cle" />` (ou `<Mascot pose="…" />`).
