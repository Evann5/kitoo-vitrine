import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Nunito } from "next/font/google";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site-config";
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
  title: `${siteConfig.name} — Prévention en santé mentale`,
  description: siteConfig.baseline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${goodly.variable} ${nunito.variable} ${atkinson.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
