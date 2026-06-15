import { Audience } from "@/components/sections/Audience";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MoodDemo } from "@/components/sections/MoodDemo";
import { TrustBlock } from "@/components/sections/TrustBlock";

/**
 * Page d'accueil (one-page). Les sections s'empilent ici dans l'ordre de la
 * navigation, suivies de l'aperçu interactif, des blocs de réassurance et du
 * CTA final.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <MoodDemo />
      <Audience />
      <Faq />
      <TrustBlock />
      <FinalCta />
    </>
  );
}
