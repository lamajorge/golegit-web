import { cn } from "@/lib/cn";

/** Skeleton — placeholder de carga (dimensión UX #2: nunca pantalla en blanco).
 *  Shimmer suave; respeta prefers-reduced-motion (globals → animación neutralizada). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-md bg-surface-sunken", className)}
    >
      <div
        className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"
        style={{ backgroundSize: "200% 100%" }}
      />
    </div>
  );
}

/** Ejemplo compuesto: fila de tabla / card en carga. */
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-surface-card p-5 shadow-sm">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-3 h-8 w-2/3" />
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
    </div>
  );
}
