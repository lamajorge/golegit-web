"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

// Modelo 23-may-2026 (ver .claude/strategy/modelo-negocio.md):
//   Home Free      — software completo gratis, toggles opcionales por contrato
//   Asistido       — tarifa plana mensual con ops gestionadas (3 bandas)
//   Servicios Jur. — abogado fundador a precio mercado

type Banda = "1" | "2_3" | "4_plus";

const ASISTIDO_BANDAS: Record<Banda, { precio: number; label: string; rango: string }> = {
  "1": { precio: 14990, label: "1 trabajadora", rango: "1" },
  "2_3": { precio: 24990, label: "2 a 3 trabajadoras", rango: "2-3" },
  "4_plus": { precio: 39990, label: "4 o más trabajadoras", rango: "4+" },
};

const HOME_FEATURES = [
  { text: "Contrato, anexos, finiquito, carta de aviso" },
  { text: "Liquidación de sueldo completa (AFP, Isapre, IATCE)" },
  { text: "Ausencias, licencias, vacaciones, amonestaciones" },
  { text: "Certificados y días especiales Art. 150" },
  { text: "Firma electrónica FES (Ley 19.799)", highlight: true },
  { text: "Portal y notificaciones a la trabajadora", highlight: true },
  { text: "Control de asistencia Res. 38 EXENTA DT", highlight: true },
  { text: "Multi-trabajadora ilimitado" },
];

const ASISTIDO_FEATURES = [
  { text: "Todo lo de Home Free" },
  { text: "Pago de Previred mensual gestionado", highlight: true },
  { text: "Carga Libro de Remuneraciones en Mi DT", highlight: true },
  { text: "Registro de contratos y anexos en Mi DT", highlight: true },
  { text: "Atención prioritaria operacional" },
];

const JURIDICOS = [
  { item: "Consulta asíncrona < 24 h", precio: 39990 },
  { item: "Sesión por video 30 min", precio: 69990 },
  { item: "Revisión de contrato atípico", precio: 69990 },
  { item: "Tramitación licencia Compin", precio: 29990 },
  { item: "Asesoría finiquito conflictivo", precio: 149990, prefijo: "desde " },
  { item: "Acompañamiento DT en fiscalización", precio: 199990, prefijo: "desde " },
];

function FeatureCheck({ className }: { className?: string }) {
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
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Precios</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight mb-4">
            Software gratis. Servicio cuando lo necesites.
          </h2>
          <p className="text-ink-muted">
            Formaliza a tu trabajadora sin costo. Suma asistencia operacional o abogado fundador
            solo si lo necesitas.
          </p>
        </div>

        {/* 3 cards: Home / Asistido / Jurídicos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* ─── HOME FREE ───────────────────────────────────────── */}
          <div className="relative rounded-2xl p-6 border bg-white border-gray-100 flex flex-col">
            <div className="mb-4">
              <p className="text-base font-extrabold mb-0.5 text-ink">Home</p>
              <p className="text-xs text-ink-light">Software laboral completo</p>
            </div>

            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-extrabold tracking-tight text-ink">Gratis</span>
            </div>
            <p className="text-[10px] mb-1 text-ink-faint">Para siempre · Sin tarjeta · Sin permanencia</p>

            <p className="text-sm mt-3 mb-4 text-ink-muted">
              Todo lo que necesitas para gestionar el trabajo doméstico, por WhatsApp y sin costo.
            </p>

            <ul className="space-y-2 mb-6 flex-1">
              {HOME_FEATURES.map((f) => (
                <li
                  key={f.text}
                  className={`flex items-start gap-2 text-xs ${
                    f.highlight ? "pl-2 border-l-2 border-brand-500 text-ink font-semibold" : "text-ink-muted"
                  }`}
                >
                  <FeatureCheck className="text-brand-600" />
                  {f.text}
                </li>
              ))}
            </ul>

            <CtaButton className="block text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-ink text-white hover:bg-zinc-800 transition-colors">
              Empezar gratis
            </CtaButton>
          </div>

          {/* ─── ASISTIDO ─────────────────────────────────────────── */}
          <div className="relative rounded-2xl p-6 border bg-zinc-950 border-zinc-800 flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              Más popular
            </span>

            <div className="mb-4">
              <p className="text-base font-extrabold mb-0.5 text-white">Asistido</p>
              <p className="text-xs text-white/60">Que GoLegit haga el papeleo cada mes</p>
            </div>

            {/* Selector de banda */}
            <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 mb-3 self-start">
              {(Object.keys(ASISTIDO_BANDAS) as Banda[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setBanda(k)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                    banda === k ? "bg-brand-600 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {ASISTIDO_BANDAS[k].rango}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-1 mb-0.5">
              <span className="text-4xl font-extrabold tracking-tight text-white">
                {formatPrice(precioAsistido)}
              </span>
              <span className="text-sm pb-1 text-white/60">/mes</span>
            </div>
            <p className="text-[10px] mb-1 text-white/40">
              IVA incluido · {ASISTIDO_BANDAS[banda].label}
            </p>

            <p className="text-sm mt-3 mb-4 text-white/70">
              Pagamos Previred y registramos en Mi DT cada mes. Tú nos pasas la información, nosotros
              hacemos el trabajo.
            </p>

            <ul className="space-y-2 mb-6 flex-1">
              {ASISTIDO_FEATURES.map((f) => (
                <li
                  key={f.text}
                  className={`flex items-start gap-2 text-xs ${
                    f.highlight ? "pl-2 border-l-2 border-brand-500 text-white font-semibold" : "text-white/60"
                  }`}
                >
                  <FeatureCheck className="text-brand-400" />
                  {f.text}
                </li>
              ))}
            </ul>

            <CtaButton className="block text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-brand-600 text-white hover:bg-brand-500 transition-colors">
              Activar Asistido
            </CtaButton>
          </div>

          {/* ─── SERVICIOS JURÍDICOS ──────────────────────────────── */}
          <div className="relative rounded-2xl p-6 border bg-white border-gray-100 flex flex-col">
            <div className="mb-4">
              <p className="text-base font-extrabold mb-0.5 text-ink">Servicios jurídicos</p>
              <p className="text-xs text-ink-light">Abogado fundador, cuando lo necesites</p>
            </div>

            <div className="flex items-end gap-1 mb-1">
              <span className="text-xl font-extrabold tracking-tight text-ink">Pago por servicio</span>
            </div>
            <p className="text-[10px] mb-1 text-ink-faint">Sin suscripción · Solo pagas si lo usas</p>

            <p className="text-sm mt-3 mb-4 text-ink-muted">
              Jorge Lama, abogado fundador, a un mensaje de distancia. Casos atípicos, conflictos y
              defensa en juicio laboral.
            </p>

            <ul className="space-y-2 mb-6 flex-1">
              {JURIDICOS.map((s) => (
                <li key={s.item} className="flex items-start justify-between gap-2 text-xs text-ink-muted">
                  <span className="flex items-start gap-2">
                    <FeatureCheck className="text-brand-600" />
                    {s.item}
                  </span>
                  <span className="font-semibold text-ink shrink-0 ml-2">
                    {s.prefijo ?? ""}
                    {formatPrice(s.precio)}
                  </span>
                </li>
              ))}
              <li className="flex items-start justify-between gap-2 text-xs text-ink-muted">
                <span className="flex items-start gap-2">
                  <FeatureCheck className="text-brand-600" />
                  Defensa en juicio laboral
                </span>
                <span className="font-semibold text-ink shrink-0 ml-2">20-30% cuota litis</span>
              </li>
            </ul>

            <a
              href="https://wa.me/56934357024?text=Hola%20Jorge%2C%20necesito%20asesor%C3%ADa%20legal"
              target="_blank"
              rel="noopener"
              className="block text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-ink text-white hover:bg-zinc-800 transition-colors"
            >
              Hablar con un abogado
            </a>
          </div>
        </div>

        {/* Nota fina */}
        <p className="text-center text-xs text-ink-light mt-8 max-w-2xl mx-auto">
          Home Free incluye todo lo que necesitas para cumplir con la ley.
          Asistido es para quienes prefieren delegar la operación mensual.
          Los servicios jurídicos se cobran por servicio, sin suscripción.
        </p>
      </div>
    </section>
  );
}
