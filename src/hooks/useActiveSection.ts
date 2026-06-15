"use client";

import { useEffect, useState } from "react";

/**
 * Détecte la **section actuellement visible** parmi une liste d'ids d'ancres
 * (via `IntersectionObserver`), pour mettre en évidence le lien de navigation
 * correspondant (`aria-current`).
 *
 * Une bande horizontale au milieu du viewport (`rootMargin`) sert de « ligne de
 * lecture » : la section qui la croise est considérée active. L'observer est
 * **nettoyé au démontage**.
 *
 * @param ids Liste d'ids de sections (sans `#`), ex. `["hero", "faq"]`.
 * @returns L'id de la section active, ou `null`.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sectionIds = key.split("|").filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [key]);

  return active;
}

export default useActiveSection;
