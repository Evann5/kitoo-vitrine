"use client";

/**
 * Header global du site vitrine Kitoo.
 *
 * Choix d'architecture — **top-nav par ancres** plutôt que le rail gauche 248px
 * du design system : le rail concerne l'application (navigation entre sections
 * fonctionnelles connectées). Pour une vitrine one-page, une barre supérieure
 * d'ancres est le pattern marketing attendu, plus lisible sur mobile et plus
 * proche des repères des 18–24 ans. Choix documenté ici à dessein.
 *
 * - Sticky + effet givré (`backdrop-blur`) qui s'accentue au scroll.
 * - Navigation desktop horizontale ; menu mobile en burger accessible
 *   (`aria-expanded`/`aria-controls`, fermeture au lien, au clic extérieur, à Échap).
 * - CTA « Accéder à l'app » vers `siteConfig.appUrl`.
 */
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);

  // Ids des sections ciblées par la nav (pour la mise en évidence active).
  const sectionIds = useMemo(
    () => siteConfig.nav.map((item) => item.href.replace("#", "")),
    [],
  );
  const activeId = useActiveSection(sectionIds);

  // Effet givré : on s'accentue dès que la page défile.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture du menu mobile : touche Échap + clic en dehors du header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "duration-kitoo ease-kitoo sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color]",
        "border-b backdrop-blur-sm",
        scrolled
          ? "border-ink-200 bg-white/85 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white/60",
      )}
    >
      <nav
        aria-label="Navigation principale"
        className={cn(
          "max-w-content duration-kitoo ease-kitoo mx-auto flex w-full items-center justify-between gap-4 px-4 transition-[height] sm:px-6",
          scrolled ? "h-14" : "h-16",
        )}
      >
        {/* Logo + wordmark */}
        <a
          href="#hero"
          className="rounded-control font-display text-title text-ink-900 flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/kitoo-logo.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-control"
            priority
          />
          <span>Kitoo</span>
        </a>

        {/* Navigation desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-control text-body duration-kitoo ease-kitoo px-3 py-2 font-bold transition-colors",
                    isActive
                      ? "bg-brand-100 text-brand-800"
                      : "text-ink-700 hover:bg-brand-100 hover:text-brand-700",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA desktop (enveloppé : évite le conflit display `inline-flex`/`hidden`) */}
        <div className="hidden md:flex">
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm" })}
          >
            Accéder à l&apos;app
          </a>
        </div>

        {/* Bouton burger mobile */}
        <button
          type="button"
          className="rounded-control text-ink-900 duration-kitoo ease-kitoo hover:bg-brand-100 inline-flex h-11 w-11 items-center justify-center transition-colors md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id={menuId}
        hidden={!open}
        className="border-ink-200 border-t bg-white/95 backdrop-blur-md md:hidden"
      >
        <ul className="max-w-content mx-auto flex flex-col gap-1 px-4 py-4 sm:px-6">
          {siteConfig.nav.map((item) => {
            const isActive = activeId === item.href.replace("#", "");
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-control text-body duration-kitoo ease-kitoo block px-3 py-3 font-bold transition-colors",
                    isActive
                      ? "bg-brand-100 text-brand-800"
                      : "text-ink-700 hover:bg-brand-100 hover:text-brand-700",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li className="mt-2">
            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "w-full")}
              onClick={() => setOpen(false)}
            >
              Accéder à l&apos;app
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
