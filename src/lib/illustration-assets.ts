import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Vérifie (au build / rendu serveur) si l'asset final d'une illustration a été
 * déposé dans `public/illustrations/`. Permet au composant `Illustration` de
 * basculer automatiquement sur le placeholder quand le fichier est absent :
 * sans toucher au code lors de l'ajout des vraies images.
 *
 * `server-only` : ce module ne doit jamais être importé côté client (fs).
 */
export function illustrationAssetExists(file: string): boolean {
  try {
    return existsSync(join(process.cwd(), "public", "illustrations", file));
  } catch {
    return false;
  }
}
