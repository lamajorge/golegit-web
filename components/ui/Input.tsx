"use client";

import { cn } from "@/lib/cn";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

/** Input — con label, foco visible, estado de error y helper (dimensiones UX #3, #4, #7). */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function Input({ label, error, helper, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const describedBy = error ? `${inputId}-err` : helper ? `${inputId}-help` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        {...rest}
        id={inputId}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-10 rounded-lg border bg-surface-card px-3.5 text-sm text-ink shadow-xs",
          "transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint",
          "focus:outline-none focus:ring-[3px] focus:ring-offset-0",
          error
            ? "border-danger focus:border-danger focus:ring-[oklch(0.58_0.20_25/0.18)]"
            : "border-border focus:border-green-500 focus:ring-[oklch(0.726_0.184_150/0.18)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
      />
      {error ? (
        <p id={`${inputId}-err`} className="text-xs text-danger">{error}</p>
      ) : helper ? (
        <p id={`${inputId}-help`} className="text-xs text-ink-muted">{helper}</p>
      ) : null}
    </div>
  );
}
