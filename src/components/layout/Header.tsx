"use client";

/**
 * Header global du site vitrine Kitoo.
 *
 * Parti pris « à la Duolingo » : barre **ultra-minimaliste**, logo à gauche +
 * un unique CTA à droite. Pas de liens de section ni de menu burger : la lecture
 * one-page se fait au scroll, l'action est concentrée sur « Accéder à l'app ».
 *
 * - `fixed` + fond transparent : la barre **survole** le hero (qui remonte
 *   jusqu'en haut de page), si bien que les décors du hero passent derrière
 *   sans couture ni bandeau blanc. La barre prend donc la teinte du hero.
 * - La barre se condense légèrement au scroll ; même rendu mobile/desktop.
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Effet givré : on s'accentue dès que la page défile.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        aria-label="Navigation principale"
        className={cn(
          "max-w-content duration-kitoo ease-kitoo mx-auto flex w-full items-center justify-between gap-4 px-4 transition-[height] sm:px-6",
          scrolled ? "h-20" : "h-24",
        )}
      >
        {/* Logo + wordmark */}
        <a
          href="#hero"
          className="rounded-control font-display text-ink-900 flex items-center gap-3 text-[2rem] leading-none"
        >
          <Image
            src="/kitoo-logo.png"
            alt=""
            width={48}
            height={48}
            className="rounded-control h-12 w-12"
            priority
          />
          <span>Kitoo</span>
        </a>

        {/* CTA unique */}
        <a
          href={siteConfig.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Accéder à l&apos;app
        </a>
      </nav>
    </header>
  );
}

export default Header;
