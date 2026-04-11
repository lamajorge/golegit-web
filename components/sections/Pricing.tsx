"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

// Feature matrix según definición 11 abril 2026
const features = [
  { label: "Contrato de trabajo", lite: true, pro: true, plus: true },
  { label: "Anexos de modificación", lite: true, pro: true, plus: true },
  { label: "Finiquito (7 causales)", lite: true, pro: true, plus: true },
  { label: "Carta de aviso", lite: true, pro: true, plus: true },
  { label: "Liquidación de sueldo (cálculo completo)", lite: true, pro: true, plus: true },
  { label: "Registro de ausencias y licencias", lite: true, pro: true, plus: true },
  { label: "Vacaciones y días libres acumulados", lite: true, pro: true, plus: true },
  { label: "Amonestaciones escritas", lite: true, pro: true, plus: true },
  { label: "Certificados laborales", lite: true, pro: true, plus: true },
  { label: "Días especiales Art. 150 CT (sábados y feriados)", lite: true, pro: true, plus: true },
  { label: "PDF descargable", lite: true, pro: true, plus: true },
  { label: "Recordatorios y gestión proactiva del ciclo mensual", lite: false, pro: true, plus: true },
  { label: "Firma electrónica (FES) — Ley 19.799", lite: false, pro: true, plus: true },
  { label: "Portal trabajadora + acceso a documentos", lite: false, pro: true, plus: true },
  { label: "Verificación de identidad (OCR + biometría)", lite: false, pro: true, plus: true },
  { label: "Notificaciones directas a la trabajadora", lite: false, pro: true, plus: true },
  { label: "2 o más trabajadoras", lite: false, pro: false, plus: true },
];

type KeyFeature = { text: string; highlight?: boolean }

const plans: {
  name: string; monthlyPrice: number; featured: boolean
  description: string; sublabel: string; cta: string
  disabled: boolean; keyFeatures: KeyFeature[]
}[] = [
  {
    name: "Lite",
    monthlyPrice: 4990,
    featured: false,
    description: "Todo el control, firma en papel",
    sublabel: "1 trabajadora",
    cta: "Empezar gratis",
    disabled: false,
    keyFeatures: [
      { text: "Contrato, anexo, finiquito, carta de aviso" },
      { text: "Liquidación de sueldo completa" },
      { text: "Ausencias, licencias, vacaciones" },
      { text: "Certificados y días especiales Art. 150" },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 9990,
    featured: true,
    description: "Gestión proactiva con portal",
    sublabel: "1 trabajadora",
    cta: "Empezar gratis",
    disabled: false,
    keyFeatures: [
      { text: "Todo lo de Lite" },
      { text: "Recordatorios y ciclo mensual proactivo", highlight: true },
      { text: "Firma digital FES (Ley 19.799)", highlight: true },
      { text: "Portal trabajadora + verificación de identidad", highlight: true },
    ],
  },
  {
    name: "Plus",
    monthlyPrice: 17990,
    featured: false,
    description: "Para más de una trabajadora",
    sublabel: "2 o más trabajadoras",
    cta: "Empezar gratis",
    disabled: false,
    keyFeatures: [
      { text: "Trabajadoras ilimitadas" },
      { text: "Todo lo de Pro" },
    ],
  },
];

function CheckIcon({ on, dark }: { on: boolean; dark?: boolean }) {
  if (!on) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mx-auto opacity-25">
        <path d="M3 3l8 8M11 3l-8 8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mx-auto">
      <path d="M2 7l4 4 6-6" stroke={dark ? "#9ca3af" : "#16a34a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  const [annual, setAnnual] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <section id="precios" className="py-24 bg-[#fafaf8]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Precios</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight mb-4">
            Menos de lo que imaginas.
          </h2>
          <p className="text-ink-muted">
            La competencia cobra $24.000/mes. GoLegit cuesta menos y hace más.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 bg-white border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                !annual ? "bg-ink text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? "bg-ink text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              Anual
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${annual ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-700"}`}>
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {plans.map((plan) => {
            const displayMonthly = annual ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice;
            const annualTotal = Math.round(plan.monthlyPrice * 12 * 0.8);
            const savings = plan.monthlyPrice * 12 - annualTotal;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 border flex flex-col ${
                  plan.featured
                    ? "bg-zinc-950 border-zinc-800"
                    : plan.disabled
                    ? "bg-gray-50/50 border-gray-100 opacity-60"
                    : "bg-white border-gray-100"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Más popular
                  </span>
                )}

                <div className="mb-4">
                  <p className={`text-base font-extrabold mb-0.5 ${plan.featured ? "text-white" : "text-ink"}`}>
                    {plan.name}
                  </p>
                  <p className={`text-xs ${plan.featured ? "text-white/60" : "text-ink-light"}`}>
                    {plan.sublabel}
                  </p>
                </div>

                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.featured ? "text-white" : "text-ink"}`}>
                    {formatPrice(displayMonthly)}
                  </span>
                  <span className={`text-sm pb-1 ${plan.featured ? "text-white/60" : "text-ink-light"}`}>
                    /mes
                  </span>
                </div>

                {annual && (
                  <p className={`text-xs mb-2 ${plan.featured ? "text-brand-400" : "text-brand-600"}`}>
                    {formatPrice(annualTotal)} al año · ahorras {formatPrice(savings)}
                  </p>
                )}

                <p className={`text-sm mt-2 mb-4 ${plan.featured ? "text-white/70" : "text-ink-muted"}`}>
                  {plan.description}
                </p>

                {/* Key features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.keyFeatures.map((f) => (
                    <li
                      key={f.text}
                      className={`flex items-start gap-2 text-xs ${
                        f.highlight
                          ? plan.featured
                            ? "pl-2 border-l-2 border-brand-500 text-white font-semibold"
                            : "pl-2 border-l-2 border-brand-500 text-ink font-semibold"
                          : plan.featured
                          ? "text-white/60"
                          : "text-ink-muted"
                      }`}
                    >
                      <FeatureCheck className={f.highlight ? (plan.featured ? "text-brand-400" : "text-brand-600") : (plan.featured ? "text-white/40" : "text-brand-600")} />
                      {f.text}
                    </li>
                  ))}
                </ul>

                {plan.disabled ? (
                  <div className="text-center text-sm font-semibold py-2.5 px-4 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed">
                    Próximamente
                  </div>
                ) : (
                  <CtaButton
                    className={`block text-center text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors ${
                      plan.featured
                        ? "bg-brand-600 text-white hover:bg-brand-500"
                        : "bg-ink text-white hover:bg-zinc-800"
                    }`}
                  >
                    {plan.cta}
                  </CtaButton>
                )}
              </div>
            );
          })}
        </div>

        {/* Nota trial */}
        <p className="text-center text-xs text-ink-light mb-8">
          Primer mes gratis con las funciones de Pro · Sin tarjeta de crédito · Sin permanencia
        </p>

        {/* Feature matrix — siempre parcialmente visible, se expande con la flechita */}
        <div className="relative">
          <div
            className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
              showMatrix ? "" : "max-h-[220px]"
            }`}
          >
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-gray-100">
              <div className="p-4" />
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`p-4 text-center border-l border-gray-100 ${plan.featured ? "bg-zinc-950" : ""}`}
                >
                  <p className={`text-sm font-bold ${plan.featured ? "text-white" : "text-ink"}`}>
                    {plan.name}
                  </p>
                  <p className={`text-xs mt-0.5 ${plan.featured ? "text-white/60" : "text-ink-light"}`}>
                    {plan.disabled ? "Próximamente" : formatPrice(annual ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice) + "/mes"}
                  </p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {features.map((f, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
              >
                <div className="px-4 py-3 text-sm text-ink-muted">{f.label}</div>
                <div className="px-4 py-3 text-center border-l border-gray-100">
                  <CheckIcon on={f.lite} dark />
                </div>
                <div className="px-4 py-3 text-center border-l border-gray-100 bg-zinc-950/2">
                  <CheckIcon on={f.pro} />
                </div>
                <div className="px-4 py-3 text-center border-l border-gray-100">
                  <CheckIcon on={f.plus} />
                </div>
              </div>
            ))}
          </div>

          {/* Fade + botón cuando está colapsada */}
          {!showMatrix && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-3 pt-10 bg-gradient-to-t from-[#fafaf8] via-[#fafaf8]/80 to-transparent rounded-b-2xl">
              <button
                onClick={() => setShowMatrix(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                Ver comparativa completa
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Botón ocultar cuando está expandida */}
        {showMatrix && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowMatrix(false)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              Ocultar comparativa
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                <path d="M2 4l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
