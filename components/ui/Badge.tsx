import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Badge / StatusBadge — UN solo componente para todos los estados (dimensión UX #8).
 *  Reemplaza las "5 variantes distintas de badge" de la deuda actual. */
export type BadgeTone =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "sand"
  | "neutral";

const TONES: Record<BadgeTone, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  info: "bg-[oklch(0.96_0.025_230)] text-[oklch(0.45_0.13_230)] border-[oklch(0.90_0.05_230)]",
  warning: "bg-[oklch(0.97_0.04_80)] text-[oklch(0.48_0.12_70)] border-[oklch(0.90_0.07_80)]",
  danger: "bg-[oklch(0.96_0.03_25)] text-[oklch(0.50_0.18_25)] border-[oklch(0.90_0.06_25)]",
  sand: "bg-sand-soft text-sand-deep border-[oklch(0.86_0.05_78)]",
  neutral: "bg-surface-sunken text-ink-muted border-border",
};

export function Badge({
  tone = "neutral",
  dot = true,
  children,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-2xs font-semibold",
        TONES[tone],
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
