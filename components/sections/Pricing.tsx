"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

// Modelo 23-may-2026 (ver .claude/strategy/modelo-negocio.md):
//   Home          — software completo gratis para siempre (oferta destacada)
//   Asistido      — tarifa plana mensual con ops gestionadas (3 bandas)
//   Servicios Jur — abogados especialistas a precio mercado (sección aparte)

type Banda = "1" | "2_3" | "4_plus";
type Ciclo = "mensual" | "anual";

// Precios canónicos modelo 23-may (decisión 25-may):
//   mensual = precio público.
//   anual = precio mensual equivalente al pagar plan anual (= totalAnual/12),
//   descuento ~20% sobre mensual.
const ASISTIDO_BANDAS: Record<Banda, { mensual: number; anual: number; totalAnual: number; label: string; rango: string }> = {
  "1": { mensual: 18990, anual: 14990, totalAnual: 179880, label: "1 trabajadora", rango: "1" },
  "2_3": { mensual: 31990, anual: 24990, totalAnual: 299880, label: "2 a 3 trabajadoras", rango: "2-3" },
  "4_plus": { mensual: 49990, anual: 39990, totalAnual: 479880, label: "4 o más trabajadoras", rango: "4+" },
};

const HOME_FEATURES = [
  "Contratos, anexos, finiquitos y cartas de aviso",
  "Liquidación de sueldo automática, con todas las cotizaciones",
  "Vacaciones, licencias, ausencias y amonestaciones",
  "Certificados laborales y días especiales (sábados, feriados)",
  "Sin límite de trabajadoras",
];

const HOME_FEATURES_TOGGLE = [
  "Firma electrónica con validez legal",
  "Portal y avisos por email para tu trabajador/a",
  "Control de asistencia digital",
  "Recordatorios automáticos cada mes",
];

const ASISTIDO_FEATURES = [
  "Dejamos lista la planilla Previred cada mes",
  "Subimos tu Libro de Remuneraciones a la Dirección del Trabajo",
  "Registramos contratos y anexos ante la DT",
  "Atención preferente cuando lo necesites",
];

// Precios públicos (home_free + Asistido mensual) y precio Asistido anual.
// Descuento escalonado: ~20% servicios chicos, ~12% servicios caros (no encarecer
// los caros para no perder clientes externos por precio).
// SINCRONIZADO con golegit-app/lib/servicios-juridicos.ts § SERVICIOS.
const JURIDICOS = [
  { item: "Consulta por escrito en menos de 24 h", precio: 49990, precioAsistido: 39990 },
  { item: "Videollamada de 30 min", precio: 84990, precioAsistido: 69990 },
  { item: "Revisión de contrato especial", precio: 84990, precioAsistido: 69990 },
  { item: "Tramitamos tu licencia médica", precio: 37990, precioAsistido: 29990 },
  { item: "Te ayudamos con un finiquito complicado", precio: 169990, precioAsistido: 149990, prefijo: "desde " },
  { item: "Te acompañamos en una fiscalización", precio: 229990, precioAsistido: 199990, prefijo: "desde " },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 mt-0.5 ${className}`}>
      <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function Pricing() {
  const [banda, setBanda] = useState<Banda>("1");
  const [ciclo, setCiclo] = useState<Ciclo>("anual");
  const precioAsistido = ASISTIDO_BANDAS[banda][ciclo];
  const totalAnual = ASISTIDO_BANDAS[banda].totalAnual;

  return (
    <section id="precios" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-4">Precios</p>
          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-ink leading-tight tracking-tight mb-3">
            Gratis siempre. Y si quieres, el papeleo lo hacemos nosotros.
          </h2>
          <p className="text-sm text-ink-muted">
            Todo el software para gestionar a quien trabaja en tu casa, sin costo.
            Si prefieres que nos encarguemos del papeleo cada mes,
            existe el plan Asistido.
          </p>
        </div>

        {/* ─── 2 cards: Home (destacado) + Asistido ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* HOME — Featured (fondo evergreen, glow verde) */}
          <div className="group relative isolate rounded-[18px] p-6 border bg-ink-deep border-white/10 shadow-lg flex flex-col transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1">
            {/* glow verde superior (sin overflow-hidden: el badge sobresale) */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[18px] pointer-events-none"
              style={{ background: "radial-gradient(75% 45% at 50% 0%, oklch(0.627 0.170 149 / 0.20) 0%, transparent 70%)" }}
            />
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap uppercase tracking-wide shadow-md">
              ★ Gratis · Todo incluido
            </span>

            <div className="mb-3 mt-1">
              <p className="text-lg font-extrabold text-white">Home</p>
              <p className="text-xs text-white/60">Todo el software, sin costo</p>
            </div>

            <div className="flex items-end gap-1.5">
              <span className="text-4xl font-extrabold tracking-tight text-white">$0</span>
              <span className="text-xs pb-1.5 text-white/60">para siempre</span>
            </div>
            <p className="text-[10px] mb-4 text-white/40">Sin tarjeta · Sin permanencia · Sin trial</p>

            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80 mb-2">Incluye</p>
            <ul className="space-y-1.5 mb-4">
              {HOME_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-white/75">
                  <CheckIcon className="text-brand-400" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80 mb-2">Lo activas cuando quieras</p>
            <ul className="space-y-1.5 mb-5 flex-1">
              {HOME_FEATURES_TOGGLE.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs pl-2 border-l-2 border-brand-500 text-white">
                  <CheckIcon className="text-brand-400" />
                  {f}
                </li>
              ))}
            </ul>

            <CtaButton className="block text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-brand-600 text-white hover:bg-brand-500 transition-colors">
              Empezar gratis
            </CtaButton>
          </div>

          {/* ASISTIDO — secundario (fondo claro) */}
          <div className="relative rounded-[18px] p-6 border bg-surface-card border-border shadow-sm flex flex-col transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1">
            <div className="mb-3 mt-1">
              <p className="text-lg font-extrabold text-ink">Asistido</p>
              <p className="text-xs text-ink-light">Que GoLegit haga el papeleo cada mes</p>
            </div>

            {/* Selector de banda */}
            <div className="mb-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-light mb-1">
                ¿Cuántas trabajadoras?
              </p>
              <div className="inline-flex items-center bg-gray-100 border border-gray-200 rounded-lg p-0.5">
                {(Object.keys(ASISTIDO_BANDAS) as Banda[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setBanda(k)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                      banda === k ? "bg-ink text-white" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {ASISTIDO_BANDAS[k].rango}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle ciclo */}
            <div className="mb-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-light mb-1">
                Frecuencia de pago
              </p>
              <div className="inline-flex items-center bg-gray-100 border border-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => setCiclo("anual")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    ciclo === "anual" ? "bg-ink text-white" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  Anual <span className="text-brand-400">−20%</span>
                </button>
                <button
                  onClick={() => setCiclo("mensual")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    ciclo === "mensual" ? "bg-ink text-white" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  Mensual
                </button>
              </div>
            </div>

            <div className="flex items-end gap-1.5">
              <span className="text-4xl font-extrabold tracking-tight text-ink">
                {formatPrice(precioAsistido)}
              </span>
              <span className="text-xs pb-1.5 text-ink-light">/mes</span>
            </div>
            <p className="text-[10px] mb-1 text-ink-faint">
              IVA incluido · {ASISTIDO_BANDAS[banda].label} · Cancela cuando quieras
            </p>
            <p className="text-[10px] mb-4 text-ink-faint">
              {ciclo === "anual"
                ? `Pago anual: ${formatPrice(totalAnual)}`
                : `Cambia a Anual y ahorra ~20% (${formatPrice(ASISTIDO_BANDAS[banda].anual)}/mes equivalente)`}
            </p>

            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-light mb-2">Incluye todo Home, y además</p>
            <ul className="space-y-1.5 mb-5 flex-1">
              {ASISTIDO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs pl-2 border-l-2 border-brand-500 text-ink font-medium">
                  <CheckIcon className="text-brand-600" />
                  {f}
                </li>
              ))}
            </ul>

            <CtaButton className="block text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-ink text-white hover:bg-zinc-800 transition-colors">
              Activar Asistido
            </CtaButton>
          </div>
        </div>

        {/* ─── Servicios Jurídicos — sección aparte, compacta ───────────────────── */}
        <div className="mt-10 bg-surface-card rounded-[18px] border border-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
            {/* Lado izquierdo: pitch */}
            <div className="p-6 bg-gray-50/50 md:border-r border-gray-100 flex flex-col justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-ink-light uppercase mb-2">
                  Servicios jurídicos
                </p>
                <h3 className="text-lg font-extrabold text-ink leading-snug tracking-tight mb-2">
                  ¿Necesitas un abogado?
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed mb-2">
                  Abogados especialistas en trabajadoras de casa particular,
                  cuando hay un caso difícil o necesitas opinión profesional.
                </p>
                <p className="text-[10px] text-ink-light mb-3">
                  Sin suscripción · Solo pagas si lo usas
                </p>
                <div className="bg-brand-50 border border-brand-200 rounded-lg p-2.5 mb-3">
                  <p className="text-[10px] text-brand-800 leading-relaxed">
                    <strong>Con plan Asistido anual:</strong> hasta <strong>20% descuento</strong> en
                    cada servicio.
                  </p>
                </div>
              </div>
              <CtaButton className="self-start inline-flex items-center justify-center gap-2 text-xs font-semibold py-2 px-4 rounded-lg bg-ink text-white hover:bg-zinc-800 transition-colors">
                Hablar con un abogado
              </CtaButton>
            </div>

            {/* Lado derecho: tabla servicios con precio público + Asistido */}
            <ul className="divide-y divide-gray-100">
              <li className="flex items-center justify-between gap-4 px-5 md:px-6 py-2 bg-gray-50/50">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-light">Servicio</span>
                <div className="flex items-center gap-3 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-ink-light">
                  <span className="w-20 text-right">Público</span>
                  <span className="w-20 text-right text-brand-700">Asistido anual</span>
                </div>
              </li>
              {JURIDICOS.map((s) => (
                <li
                  key={s.item}
                  className="flex items-center justify-between gap-4 px-5 md:px-6 py-2.5"
                >
                  <span className="text-xs text-ink-muted">{s.item}</span>
                  <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                    <span className="text-ink w-20 text-right">
                      {s.prefijo ?? ""}{formatPrice(s.precio)}
                    </span>
                    <span className="text-brand-700 font-semibold w-20 text-right">
                      {s.prefijo ?? ""}{formatPrice(s.precioAsistido)}
                    </span>
                  </div>
                </li>
              ))}
              <li className="flex items-center justify-between gap-4 px-5 md:px-6 py-2.5">
                <span className="text-xs text-ink-muted">Te defendemos en una demanda laboral</span>
                <span className="text-xs font-semibold text-ink shrink-0">Cotizamos según el caso</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Nota fina */}
        <p className="text-center text-[11px] text-ink-light mt-6 max-w-xl mx-auto leading-relaxed">
          Home tiene todo lo que necesitas para cumplir con la ley.
          Asistido es para quienes prefieren que nosotros nos encarguemos cada mes.
        </p>
      </div>
    </section>
  );
}
