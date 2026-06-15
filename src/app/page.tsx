import { Audience } from "@/components/sections/Audience";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";

/**
 * Page d'accueil (one-page). Les sections s'empilent ici dans l'ordre de la
 * navigation : Hero, Fonctionnalités, Comment ça marche, Pour qui. (FAQ arrive
 * à l'étape suivante.)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Audience />
    </>
  );
}
