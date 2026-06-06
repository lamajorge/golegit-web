import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button — primitivo del GDS. Encarna las dimensiones UX:
 *  #4 feedback: estado `loading` (spinner + aria-busy + auto-disabled),
 *               `disabledReason` (disabled con razón visible vía title).
 *  #7 a11y: focus-visible ring siempre presente.
 *  #1 motion: hover de resorte + press. Respeta prefers-reduced-motion (globals).
 */
type Variant = "primary" | "secondary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg" | "icon";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-sm hover:bg-[var(--gl-primary-hover)] hover:shadow-md",
  secondary:
    "bg-surface-card text-ink border border-border shadow-xs hover:bg-surface-sunken hover:shadow-sm",
  ghost: "text-ink hover:bg-surface-sunken",
  danger: "bg-danger text-white shadow-sm hover:brightness-95 hover:shadow-md",
  subtle: "bg-surface-sunken text-ink hover:bg-border/60",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-lg",
  icon: "h-10 w-10 justify-center rounded-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  /** Si está presente → disabled + tooltip explicando por qué (dimensión UX #4). */
  disabledReason?: string;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabledReason,
  leftIcon,
  fullWidth,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading || !!disabledReason;
  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      title={disabledReason || rest.title}
      className={cn(
        "inline-flex items-center font-semibold select-none",
        "transition-[transform,background-color,box-shadow,filter] duration-200 ease-[cubic-bezier(.34,1.56,.64,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:opacity-50 disabled:pointer-events-none",
        "hover:-translate-y-0.5 active:translate-y-0",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full justify-center",
        className,
      )}
    >
      {loading ? <Spinner /> : leftIcon}
      {size !== "icon" && children}
    </button>
  );
}
