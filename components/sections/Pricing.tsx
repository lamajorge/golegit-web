"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

// Feature matrix según definición 6 abril 2026
const features = [
  { label: "Contrato de trabajo", lite: true, pro: true, plus: true },
  { label: "Anexos de modificación", lite: true, pro: true, plus: true },
  { label: "Finiquito (6 causales)", lite: true, pro: true, plus: true },
  { label: "Carta de aviso", lite: true, pro: true, plus: true },
  { label: "PDF descargable", lite: true, pro: true, plus: true },
  { label: "Liquidación manual", lite: true, pro: false, plus: false },
  { label: "Liquidación automatizada", lite: false, pro: true, plus: true },
  { label: "Registro ausencias y licencias", lite: false, pro: true, plus: true },
  { label: "Vacaciones acumuladas", lite: false, pro: true, plus: true },
  { label: "Amonestaciones", lite: false, pro: true, plus: true },
  { label: "Portal trabajadora + firma digital", lite: false, pro: true, plus: true },
  { label: "Certificados laborales", lite: false, pro: true, plus: true },
  { label: "Historial con registro probatorio", lite: false, pro: true, plus: true },
  { label: "Entrega por WhatsApp y email", lite: false, pro: true, plus: true },
  { label: "Notificaciones a la trabajadora", lite: false, pro: true, plus: true },
  { label: "Soporte por WhatsApp", lite: false, pro: true, plus: true },
  { label: "2 o más trabajadoras", lite: false, pro: false, plus: true },
];

const plans = [
  {
    name: "Lite",
    monthlyPrice: 4990,
    featured: false,
    description: "Solo documentos legales",
    sublabel: "1 trabajadora",
    cta: "Próximamente",
    disabled: true,
  },
  {
    name: "Pro",
    monthlyPrice: 9990,
    featured: true,
    description: "Gestión laboral completa",
    sublabel: "1 trabajadora",
    cta: "Empezar gratis",
    disabled: false,
  },
  {
    name: "Plus",
    monthlyPrice: 17990,
    featured: false,
    description: "Para más de una trabajadora",
    sublabel: "2 o más trabajadoras",
    cta: "Empezar gratis",
    disabled: false,
  },
];

function Check({ on, lite }: { on: boolean; lite?: boolean }) {
  if (!on) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mx-auto opacity-25">
        <path d="M3 3l8 8M11 3l-8 8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mx-auto">
      <path d="M2 7l4 4 6-6" stroke={lite ? "#9ca3af" : "#16a34a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

                <div className="mb-5">
                  <p className={`text-base font-extrabold mb-0.5 ${plan.featured ? "text-white" : "text-ink"}`}>
                    {plan.name}
                  </p>
                  <p className={`text-xs ${plan.featured ? "text-white/40" : "text-ink-light"}`}>
                    {plan.sublabel}
                  </p>
                </div>

                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.featured ? "text-white" : "text-ink"}`}>
                    {formatPrice(displayMonthly)}
                  </span>
                  <span className={`text-sm pb-1 ${plan.featured ? "text-white/40" : "text-ink-light"}`}>
                    /mes
                  </span>
                </div>

                {annual && (
                  <p className={`text-xs mb-2 ${plan.featured ? "text-brand-400" : "text-brand-600"}`}>
                    {formatPrice(annualTotal)} al año · ahorras {formatPrice(savings)}
                  </p>
                )}

                <p className={`text-sm mb-6 mt-2 flex-1 ${plan.featured ? "text-white/50" : "text-ink-muted"}`}>
                  {plan.description}
                </p>

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

        {/* Feature matrix toggle */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
          >
            {showMatrix ? "Ocultar" : "Ver"} comparativa completa
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className={`transition-transform ${showMatrix ? "rotate-180" : ""}`}
            >
              <path d="M2 4l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Feature matrix */}
        {showMatrix && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
                  <p className={`text-xs mt-0.5 ${plan.featured ? "text-white/40" : "text-ink-light"}`}>
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
                  <Check on={f.lite} lite />
                </div>
                <div className="px-4 py-3 text-center border-l border-gray-100 bg-zinc-950/2">
                  <Check on={f.pro} />
                </div>
                <div className="px-4 py-3 text-center border-l border-gray-100">
                  <Check on={f.plus} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
