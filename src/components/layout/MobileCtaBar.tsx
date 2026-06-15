"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

/**
 * Barre CTA **collante en bas d'écran sur mobile uniquement** (`md:hidden`).
 * Apparaît une fois le hero dépassé et se masque quand le footer entre en vue
 * (pour ne pas le recouvrir). Une compensation `pb` est ajoutée au `<main>`
 * (layout) afin que le contenu ne soit jamais caché. Observers nettoyés au
 * démontage.
 */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(
        ([e]) => setPastHero(!e.isIntersecting),
        { threshold: 0 },
      );
      o.observe(hero);
      observers.push(o);
    }
    if (footer) {
      const o = new IntersectionObserver(
        ([e]) => setFooterVisible(e.isIntersecting),
        { threshold: 0 },
      );
      o.observe(footer);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !footerVisible;

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "border-ink-200 fixed inset-x-0 bottom-0 z-40 border-t bg-white/90 p-3 backdrop-blur-md md:hidden",
        "duration-kitoo ease-kitoo transition-[transform,opacity]",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <a
        href={siteConfig.appUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className={buttonVariants({ fullWidth: true })}
      >
        Accéder à l&apos;app
      </a>
    </div>
  );
}

export default MobileCtaBar;
