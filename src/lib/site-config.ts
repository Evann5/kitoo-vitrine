/**
 * Configuration centrale du site vitrine Kitoo.
 *
 * Source unique de vérité pour les métadonnées de marque, l'URL de l'app et la
 * navigation. Toute valeur affichée ou liée dans plusieurs sections doit passer
 * par ici plutôt que d'être codée en dur dans les composants.
 *
 * Marque : Kitoo, application de prévention en santé mentale pour les jeunes
 * adultes (18–24 ans). Ton chaleureux, rassurant, tutoiement. Voir le design
 * system dans `design-system/`.
 */

/** Une entrée de navigation pointant vers une ancre de la page one-page. */
export type NavItem = {
  /** Libellé affiché (casse phrase, conforme à la voix de marque). */
  readonly label: string;
  /** Ancre cible, ex. `#fonctionnalites` (sans slash, navigation interne). */
  readonly href: string;
};

/** Forme typée de la configuration du site. */
export type SiteConfig = {
  /** Nom de la marque. */
  readonly name: string;
  /** Accroche courte décrivant le produit. */
  readonly baseline: string;
  /**
   * URL de l'application Kitoo (CTA « Ouvrir l'app »).
   * Vaut `"#"` tant que `NEXT_PUBLIC_APP_URL` n'est pas défini, afin de ne jamais
   * exposer un lien mort ni casser le build.
   */
  readonly appUrl: string;
  /** Ancres de navigation de la page one-page, dans l'ordre d'affichage. */
  readonly nav: readonly NavItem[];
};

/**
 * Sous-routes connues de l'application (jamais d'URL en dur dans les composants).
 * Composer avec `appLink` : `appLink(appRoutes.login)`.
 */
export const appRoutes = {
  home: "/",
  login: "/connexion",
  signup: "/inscription",
} as const;

/**
 * Compose un lien vers l'application à partir de l'URL de base (`appUrl`).
 * Source unique : l'URL provient de `NEXT_PUBLIC_APP_URL`, jamais codée en dur.
 *
 * - **Fallback propre** : si `appUrl` vaut `"#"` (URL pas encore configurée),
 *   renvoie `"#"` quel que soit le `path` — le lien reste cliquable, le build
 *   ne casse pas.
 * - Normalise les slashs (slash final de base ignoré, pas de `//` accidentel).
 *
 * @example
 * appLink()              // "#" si non configurée, sinon l'accueil de l'app
 * appLink("/connexion")  // "https://app.kitoo.fr/connexion"
 */
export function appLink(path: string = appRoutes.home): string {
  const base = siteConfig.appUrl;
  if (base === "#") return "#";
  const cleanBase = base.replace(/\/+$/, "");
  if (path === "" || path === "/") return cleanBase || "#";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export const siteConfig: SiteConfig = {
  name: "Kitoo",
  baseline:
    "L'application de prévention en santé mentale qui prend soin des jeunes adultes, un jour à la fois.",
  // Fallback "#" volontaire : aucune variable d'env requise pour faire tourner le site.
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "#",
  nav: [
    { label: "Accueil", href: "#hero" },
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Comment ça marche", href: "#comment-ca-marche" },
    { label: "Pour qui", href: "#pour-qui" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export default siteConfig;
