import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Alert — UN componente para los mensajes contextuales (dimensión UX #8 + #3 estados). */
type AlertVariant = "info" | "success" | "warning" | "danger";

const STYLES: Record<AlertVariant, { box: string; icon: string; path: ReactNode }> = {
  info: {
    box: "bg-[oklch(0.97_0.02_230)] border-[oklch(0.90_0.05_230)] text-[oklch(0.40_0.10_230)]",
    icon: "text-info",
    path: <path d="M12 16v-5M12 8h.01M12 22a10 10 0 100-20 10 10 0 000 20z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  success: {
    box: "bg-green-50 border-green-200 text-green-800",
    icon: "text-success",
    path: <path d="M20 7L10 17l-5-5M22 12a10 10 0 11-20 0 10 10 0 0120 0z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  warning: {
    box: "bg-[oklch(0.98_0.025_80)] border-[oklch(0.90_0.07_80)] text-[oklch(0.42_0.10_65)]",
    icon: "text-warning",
    path: <path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  danger: {
    box: "bg-[oklch(0.96_0.03_25)] border-[oklch(0.90_0.06_25)] text-[oklch(0.45_0.16_25)]",
    icon: "text-danger",
    path: <path d="M12 8v5M12 16h.01M12 22a10 10 0 100-20 10 10 0 000 20z" strokeLinecap="round" strokeLinejoin="round" />,
  },
};

export function Alert({
  variant = "info",
  title,
  children,
}: {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
}) {
  const s = STYLES[variant];
  return (
    <div role="status" className={cn("flex gap-3 rounded-lg border px-4 py-3 text-sm", s.box)}>
      <svg className={cn("mt-0.5 shrink-0", s.icon)} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {s.path}
      </svg>
      <div>
        {title && <strong className="font-bold">{title} </strong>}
        {children}
      </div>
    </div>
  );
}
