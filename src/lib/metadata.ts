/**
 * Métadonnées centralisées du site vitrine Kitoo.
 * Source unique pour le SEO (title/description/OG), le sitemap, robots et le
 * JSON-LD. L'URL de prod sert de `metadataBase` (résolution des URLs absolues).
 */
export const siteMetadata = {
  name: "Kitoo",
  title: "Kitoo : Prévention en santé mentale pour les 18–24 ans",
  description:
    "Kitoo t'aide à prendre soin de ta santé mentale au quotidien : suivi d'humeur, ressources bien-être validées et échange sécurisé avec des psychologues partenaires.",
  /** URL de production (déploiement Vercel). */
  url: "https://kitoo-vitrine.vercel.app",
  locale: "fr_FR",
  lang: "fr",
} as const;

export default siteMetadata;
