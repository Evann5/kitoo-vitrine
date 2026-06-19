import { cn } from "@/lib/cn";
import { CopyHex } from "./CopyHex";

/**
 * Échantillon de couleur : aplat + nom de token + hex copiable. Le texte du
 * nom passe en blanc sur les teintes foncées (`dark`) pour rester lisible (AA).
 */
export function Swatch({
  name,
  hex,
  role,
  dark = false,
}: {
  name: string;
  hex: string;
  role?: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div
        className="rounded-card shadow-sm flex h-16 items-end p-2"
        style={{ backgroundColor: hex }}
      >
        <span
          className={cn(
            "text-small font-bold",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {name}
        </span>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-1">
        <CopyHex value={hex} label={name} />
        {role ? (
          <span className="text-ink-500 text-[11px] leading-tight">{role}</span>
        ) : null}
      </div>
    </div>
  );
}

export default Swatch;
