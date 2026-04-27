"use client";

import { useState } from "react";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [consentimiento, setConsentimiento] = useState(true);
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEstado("error");
      setErrorMsg("Ingresa un email válido");
      return;
    }
    setEstado("enviando");
    setErrorMsg(null);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          fuente: "early_access",
          consentimiento,
        }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setEstado("error");
        setErrorMsg(data?.error ?? "Algo falló — intenta nuevamente");
        return;
      }
      setEstado("ok");
    } catch {
      setEstado("error");
      setErrorMsg("Error de conexión — intenta nuevamente");
    }
  }

  return (
    <section
      id="early-access"
      className="relative py-20 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(187,247,208,0.32) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
          Early access · gratis · sin compromiso
        </span>
        <h2
          className="text-3xl lg:text-4xl font-light text-ink leading-tight mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Sé de los primeros en usar GoLegit por WhatsApp
        </h2>
        <p className="text-base text-ink-muted leading-relaxed mb-8">
          Estamos terminando los últimos detalles antes del lanzamiento público. Déjanos tu
          email y te avisamos en cuanto esté disponible. Sin spam, sin promociones —
          solo el aviso del lanzamiento.
        </p>

        {estado === "ok" ? (
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 text-white mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-brand-800 mb-1">¡Listo!</p>
            <p className="text-sm text-ink-muted">
              Te avisaremos a <strong>{email}</strong> cuando GoLegit esté disponible.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 text-left"
          >
            <div>
              <label htmlFor="ea-email" className="block text-xs font-medium text-ink mb-1.5">
                Tu email
              </label>
              <input
                id="ea-email"
                type="email"
                required
                placeholder="tu@ejemplo.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-ink-muted leading-relaxed">
              <input
                type="checkbox"
                checked={consentimiento}
                onChange={(e) => setConsentimiento(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span>
                Acepto recibir un email cuando GoLegit esté disponible. Puedo
                cancelarlo en cualquier momento. (Ley 19.628 / 21.719)
              </span>
            </label>
            {errorMsg && (
              <p className="text-xs text-red-600">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={estado === "enviando"}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              {estado === "enviando" ? "Enviando..." : "Avísame cuando esté listo →"}
            </button>
            <p className="text-[11px] text-ink-light text-center">
              No compartimos tu email con nadie. Lo borramos si nos lo pides.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
