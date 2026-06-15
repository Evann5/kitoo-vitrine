import { forwardRef } from "react";
import { cn } from "@/lib/cn";

/** Variantes visuelles du bouton (cf. design system Kitoo). */
export type ButtonVariant = "primary" | "ghost" | "outline";

/** Tailles disponibles. */
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Style du bouton :
   * - `primary` : pervenche pleine + légère lueur (action principale).
   * - `ghost` : transparent, remplissage lavande au survol (action secondaire).
   * - `outline` : contour neutre (action tertiaire / « Plus tard »).
   * @default "primary"
   */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
};

const base = cn(
  "inline-flex items-center justify-center gap-2 rounded-control font-body font-bold",
  "select-none whitespace-nowrap",
  // Mouvement doux, jamais de rebond ; « squish » ~0.98 au press.
  "transition-[transform,background-color,box-shadow,border-color] duration-kitoo ease-kitoo",
  "active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-50",
);

const variants: Record<ButtonVariant, string> = {
  // Pervenche pleine avec lueur ; s'assombrit d'un cran au survol.
  primary: cn("bg-brand-500 text-white shadow-brand", "hover:bg-brand-600"),
  // Remplissage teinte lavande au survol.
  ghost: cn("bg-transparent text-brand-700", "hover:bg-brand-100"),
  // Contour neutre.
  outline: cn(
    "border border-ink-300 bg-transparent text-ink-900",
    "hover:bg-ink-100",
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-6 text-body",
};

/**
 * Bouton primitif Kitoo. Casse phrase pour le libellé, rayon 16px.
 * Transmet `ref` et tous les attributs natifs `<button>`.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
