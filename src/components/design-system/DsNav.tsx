"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type DsNavItem = { id: string; label: string };

/**
 * Sommaire navigable de la page `/design-system` : barre de chips collante en
 * haut sur mobile, colonne latérale collante sur desktop. La section visible est
 * mise en évidence (`aria-current`) via un `IntersectionObserver` · pratique
 * pour dérouler la soutenance.
 */
export function DsNav({ items }: { items: DsNavItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sommaire du design system"
      className={cn(
        "border-ink-200 bg-brand-50/85 sticky top-0 z-30 -mx-4 mb-8 border-b px-4 backdrop-blur-md sm:-mx-6 sm:px-6",
        "lg:top-28 lg:mx-0 lg:mb-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none",
      )}
    >
      <ul className="flex gap-1 overflow-x-auto py-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:py-0">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-pill text-small duration-kitoo ease-kitoo inline-block px-3 py-1.5 font-bold whitespace-nowrap transition-colors lg:w-full",
                  isActive
                    ? "bg-brand-700 text-white"
                    : "text-ink-700 hover:bg-brand-100 hover:text-brand-700",
                )}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default DsNav;
