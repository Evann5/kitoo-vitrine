"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Bouton discret de **retour en haut**, apparaissant après avoir défilé. Remonte
 * en douceur (respecte `prefers-reduced-motion` via `scroll-behavior` global).
 * Sur mobile, positionné au-dessus de la barre CTA collante. Écouteur de scroll
 * en `requestAnimationFrame`, nettoyé au démontage.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShow(window.scrollY > 800));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <IconButton
      aria-label="Revenir en haut de la page"
      variant="solid"
      onClick={() => window.scrollTo({ top: 0 })}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cn(
        "duration-kitoo ease-kitoo fixed right-4 bottom-24 z-40 shadow-md transition-[transform,opacity] sm:right-6 md:bottom-6",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" strokeWidth={2} className="h-5 w-5" />
    </IconButton>
  );
}

export default BackToTop;
