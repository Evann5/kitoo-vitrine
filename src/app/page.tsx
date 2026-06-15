import { Audience } from "@/components/sections/Audience";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MoodDemo } from "@/components/sections/MoodDemo";
import { Trust } from "@/components/sections/Trust";

/**
 * Page d'accueil (one-page). Les sections s'empilent ici : produit (hero,
 * fonctionnalités, parcours, aperçu), réassurance/preuve sociale, public, FAQ,
 * puis CTA final.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <MoodDemo />
      <Trust />
      <Audience />
      <Faq />
      <FinalCta />
    </>
  );
}
