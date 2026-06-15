/**
 * Concatène des classes conditionnelles en ignorant les valeurs falsy.
 * Utilitaire minimal sans dépendance (pas de clsx/tailwind-merge).
 *
 * @example cn("p-4", isActive && "bg-brand-500", undefined) // "p-4 bg-brand-500"
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export default cn;
