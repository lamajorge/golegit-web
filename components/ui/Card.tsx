import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

/** Card — superficie elevada del GDS. `interactive` agrega hover de resorte (#1). */
export function Card({
  interactive,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-xl border border-border bg-surface-card shadow-sm",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:shadow-md hover:border-green-200",
        className,
      )}
    />
  );
}
