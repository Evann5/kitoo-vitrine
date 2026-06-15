import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";

/**
 * Page d'accueil (one-page). Les sections s'empilent ici dans l'ordre de la
 * navigation. Pour l'instant : Hero, Fonctionnalités. (Comment ça marche, Pour
 * qui, FAQ arrivent aux étapes suivantes.)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
