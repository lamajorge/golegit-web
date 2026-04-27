"use client";

import { SITE_CONFIG } from "@/lib/config";

interface Props {
  className?: string;
  children: React.ReactNode;
  /** Texto que reemplaza al children cuando WhatsApp aún no está activo */
  disabledLabel?: string;
}

/**
 * Botón de CTA principal que apunta a WhatsApp.
 * Cuando SITE_CONFIG.whatsappEnabled === false el botón sigue siendo clicable
 * pero lleva a la sección #early-access del home (form de captura de email).
 * Para reactivar el flow real: cambiar whatsappEnabled a true en lib/config.ts.
 */
export default function CtaButton({
  className = "",
  children,
  disabledLabel = "Pide early access",
}: Props) {
  if (!SITE_CONFIG.whatsappEnabled) {
    return (
      <a
        href="/#early-access"
        className={className}
        onClick={(e) => {
          // Smooth scroll si ya estamos en la home
          if (typeof window !== "undefined" && window.location.pathname === "/") {
            const el = document.getElementById("early-access");
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              const input = el.querySelector<HTMLInputElement>('input[type="email"]');
              if (input) setTimeout(() => input.focus(), 600);
            }
          }
        }}
      >
        {/* Icono sobre/sobreentender (early access, no candado) */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1.5 -mt-0.5">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
        {disabledLabel}
      </a>
    );
  }

  return (
    <a
      href={SITE_CONFIG.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
