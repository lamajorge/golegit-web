"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

// Modelo 23-may-2026 (ver .claude/strategy/modelo-negocio.md):
//   Home          — software completo gratis para siempre (oferta destacada)
//   Asistido      — tarifa plana mensual con ops gestionadas (3 bandas)
//   Servicios Jur — abogados especialistas a precio mercado (sección aparte)

type Banda = "1" | "2_3" | "4_plus";

const ASISTIDO_BANDAS: Record<Banda, { precio: number; label: string; rango: string }> = {
  "1": { precio: 14990, label: "1 trabajadora", rango: "1" },
  "2_3": { precio: 24990, label: "2 a 3 trabajadoras", rango: "2-3" },
  "4_plus": { precio: 39990, label: "4 o más trabajadoras", rango: "4+" },
};

const HOME_FEATURES = [
  "Contrato, anexos, finiquito, carta de aviso",
  "Liquidación de sueldo completa (AFP, Isapre, IATCE)",
  "Ausencias, licencias, vacaciones, amonestaciones",
  "Certificados y días especiales Art. 150",
  "Multi-trabajadora ilimitado",
];

const HOME_FEATURES_TOGGLE = [
  "Firma electrónica FES (Ley 19.799)",
  "Portal y notificaciones a la trabajadora",
  "Control de asistencia Res. 38 EXENTA DT",
  "Recordatorios proactivos del ciclo mensual",
];

const ASISTIDO_FEATURES = [
  "Pago de Previred mensual gestionado",
  "Carga Libro de Remuneraciones en Mi DT",
  "Registro de contratos y anexos en Mi DT",
  "Atención prioritaria operacional",
];

const JURIDICOS = [
  { item: "Consulta asíncrona < 24 h", precio: 39990 },
  { item: "Sesión por video 30 min", precio: 69990 },
  { item: "Revisión de contrato atípico", precio: 69990 },
  { item: "Tramitación licencia Compin", precio: 29990 },
  { item: "Asesoría finiquito conflictivo", precio: 149990, prefijo: "desde " },
  { item: "Acompañamiento DT en fiscalización", precio: 199990, prefijo: "desde " },
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
  const precioAsistido = ASISTIDO_BANDAS[banda].precio;

  return (
    <section id="precios" className="py-24 bg-[#fafaf8]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-4">Precios</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight mb-3">
            Software gratis. Asistencia opcional.
          </h2>
          <p className="text-sm text-ink-muted">
            Todo lo que necesitas para formalizar a tu trabajadora, sin costo.
            Suma asistencia operacional solo si prefieres delegar el papeleo.
          </p>
        </div>

        {/* ─── 2 cards: Home (destacado) + Asistido ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* HOME — Featured (fondo oscuro) */}
          <div className="relative rounded-2xl p-6 border bg-zinc-950 border-zinc-800 flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap uppercase tracking-wide">
              ★ Gratis · Todo incluido
            </span>

            <div className="mb-3 mt-1">
              <p className="text-lg font-extrabold text-white">Home</p>
              <p className="text-xs text-white/60">Software laboral completo, sin costo</p>
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

            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80 mb-2">Activables por contrato</p>
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
          <div className="relative rounded-2xl p-6 border bg-white border-gray-100 flex flex-col">
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

            <div className="flex items-end gap-1.5">
              <span className="text-4xl font-extrabold tracking-tight text-ink">
                {formatPrice(precioAsistido)}
              </span>
              <span className="text-xs pb-1.5 text-ink-light">/mes</span>
            </div>
            <p className="text-[10px] mb-4 text-ink-faint">
              IVA incluido · {ASISTIDO_BANDAS[banda].label} · Cancela cuando quieras
            </p>

            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-light mb-2">Todo lo de Home, además</p>
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
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
            {/* Lado izquierdo: pitch */}
            <div className="p-6 bg-gray-50/50 md:border-r border-gray-100 flex flex-col justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-ink-light uppercase mb-2">
                  Servicios jurídicos
                </p>
                <h3 className="text-lg font-extrabold text-ink leading-snug tracking-tight mb-2">
                  ¿Necesitas un abogado para algo específico?
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed mb-2">
                  Equipo legal especializado en derecho laboral chileno. Casos atípicos,
                  conflictos, fiscalizaciones y defensa en juicio.
                </p>
                <p className="text-[10px] text-ink-light">
                  Sin suscripción · Precios de mercado · Solo pagas si lo usas
                </p>
              </div>
              <CtaButton className="self-start inline-flex items-center justify-center gap-2 text-xs font-semibold py-2 px-4 rounded-lg bg-ink text-white hover:bg-zinc-800 transition-colors">
                Hablar con un abogado
              </CtaButton>
            </div>

            {/* Lado derecho: tabla servicios — más compacta */}
            <ul className="divide-y divide-gray-100">
              {JURIDICOS.map((s) => (
                <li
                  key={s.item}
                  className="flex items-center justify-between gap-4 px-5 md:px-6 py-2.5"
                >
                  <span className="text-xs text-ink-muted">{s.item}</span>
                  <span className="text-xs font-semibold text-ink shrink-0 font-mono">
                    {s.prefijo ?? ""}
                    {formatPrice(s.precio)}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-4 px-5 md:px-6 py-2.5">
                <span className="text-xs text-ink-muted">Defensa en juicio laboral</span>
                <span className="text-xs font-semibold text-ink shrink-0">20-30% cuota litis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Nota fina */}
        <p className="text-center text-[11px] text-ink-light mt-6 max-w-xl mx-auto leading-relaxed">
          Home incluye todo lo que necesitas para cumplir con la ley.
          Asistido es para quienes prefieren delegar la operación mensual.
        </p>
      </div>
    </section>
  );
}
