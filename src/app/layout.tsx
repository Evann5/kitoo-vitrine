import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Nunito } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

/**
 * Goodly Medium — police display de marque (titres, wordmark, chiffres héros).
 * Chargée localement depuis le design system.
 * TODO: si `design-system/fonts/goodly-medium.otf` venait à manquer, basculer
 * sur un fallback Poppins (déjà présent dans la stack `font-display`).
 */
const goodly = localFont({
  src: "../../design-system/fonts/goodly-medium.otf",
  variable: "--font-display",
  weight: "500",
  display: "swap",
  fallback: ["Poppins", "system-ui", "sans-serif"],
});

/** Nunito — body / UI (corps, libellés, texte long). */
const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

/** Atkinson Hyperlegible — mode dyslexie requis par la spec. */
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-dyslexia",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s · ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.url,
    siteName: siteMetadata.name,
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
};

/**
 * Données structurées JSON-LD (Organization + WebSite) pour le SEO.
 * Contenu statique — aucune entrée utilisateur, injection sûre.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteMetadata.url}/#organization`,
      name: siteMetadata.name,
      url: siteMetadata.url,
      description: siteMetadata.description,
      logo: `${siteMetadata.url}/kitoo-logo.jpg`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteMetadata.url}/#website`,
      name: siteMetadata.name,
      url: siteMetadata.url,
      inLanguage: siteMetadata.lang,
      publisher: { "@id": `${siteMetadata.url}/#organization` },
    },
  ],
};

/**
 * Script anti-flash : applique les préférences d'accessibilité stockées dans
 * `localStorage` AVANT le premier rendu, en posant les attributs sur <html>.
 * Évite tout clignotement (FOUC) entre le rendu initial et l'hydratation.
 */
const noFlashScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem('kitoo-dyslexia')==='true')d.setAttribute('data-font','dyslexia');if(localStorage.getItem('kitoo-contrast')==='true')d.setAttribute('data-contrast','colorblind');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${goodly.variable} ${nunito.variable} ${atkinson.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
