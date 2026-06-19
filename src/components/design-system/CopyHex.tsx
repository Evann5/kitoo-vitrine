"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Petit bouton « copier » d'un code couleur. Copie la valeur hex dans le
 * presse-papiers et annonce le succès (statut `aria-live`). Utilisé dans les
 * nuanciers de la page `/design-system`.
 */
export function CopyHex({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* presse-papiers indisponible : on ne casse rien */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copier ${label ? `${label} ` : ""}${value}`}
      className={cn(
        "rounded-control text-small text-ink-700 hover:bg-brand-100 hover:text-brand-700 group inline-flex items-center gap-1.5 px-1.5 py-1 font-bold transition-colors",
        className,
      )}
    >
      <span className="font-mono tabular-nums">{value}</span>
      {copied ? (
        <Check aria-hidden="true" className="text-success h-3.5 w-3.5" />
      ) : (
        <Copy
          aria-hidden="true"
          className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100"
        />
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copié" : ""}
      </span>
    </button>
  );
}

export default CopyHex;
