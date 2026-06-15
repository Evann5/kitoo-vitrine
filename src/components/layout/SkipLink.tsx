import { cn } from "@/lib/cn";

/**
 * Lien d'évitement « Aller au contenu ». Invisible jusqu'au focus clavier, il
 * apparaît alors en haut de page et cible `#content` (le `<main>`), permettant
 * de sauter la navigation. Première chose tabulable du document.
 */
export function SkipLink() {
  return (
    <a
      href="#content"
      className={cn(
        "rounded-control text-body text-brand-700 sr-only z-[100] bg-white px-4 py-2 font-bold shadow-md",
        // Devient visible et positionné lorsqu'il reçoit le focus.
        "focus:not-sr-only focus:fixed focus:top-4 focus:left-4",
      )}
    >
      Aller au contenu
    </a>
  );
}

export default SkipLink;
