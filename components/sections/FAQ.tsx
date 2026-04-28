"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const faqs = [
  {
    q: "¿Necesito instalar alguna app?",
    a: "No. GoLegit opera completamente por WhatsApp. Si ya tienes WhatsApp instalado, ya tienes todo lo que necesitas para empezar.",
  },
  {
    q: "¿El contrato que genera GoLegit es legalmente válido?",
    a: "Sí. Las plantillas fueron diseñadas por un abogado y cumplen con la Ley 20.786 y el Código del Trabajo chileno. Incluyen las cláusulas obligatorias para trabajo de casa particular, con variantes específicas para puertas adentro y puertas afuera.",
  },
  {
    q: "¿Y si mi trabajadora ya tiene contrato de antes?",
    a: "GoLegit lo maneja. Puedes ingresar la relación laboral existente — incluyendo la fecha real de inicio — y el sistema genera un Anexo de Texto Refundido que actualiza y formaliza todo. La antigüedad para indemnizaciones se calcula desde la fecha de inicio real.",
  },
  {
    q: "¿Cómo le llega el contrato a mi trabajadora?",
    a: "En los planes Pro y Plus, el sistema le envía el PDF por email directamente a ella con un enlace para revisar y firmar digitalmente. En el plan Lite, tú imprimes el documento y lo firman en papel.",
  },
  {
    q: "¿La firma electrónica tiene valor legal?",
    a: "Sí. GoLegit usa Firma Electrónica Simple (FES) bajo la Ley 19.799. Cada firma queda registrada con la identidad del firmante, la fecha, la hora y la IP. Ese registro tiene valor probatorio ante la Inspección del Trabajo.",
  },
  {
    q: "¿Puedo calcular la liquidación aunque no sepa de cotizaciones?",
    a: "Sí. GoLegit aplica automáticamente las tasas vigentes de AFP, Isapre, AFC, cotización adicional y los aportes del empleador. Tú solo confirmas los días trabajados si hubo ausencias.",
  },
  {
    q: "¿GoLegit hace el finiquito también?",
    a: "Sí. Soporta 8 causales de término (Arts. 159, 160 y 161 del Código del Trabajo), calcula automáticamente las indemnizaciones que correspondan, las vacaciones pendientes y las proporcionales, y genera el PDF listo para ratificarse ante ministro de fe (notario, Inspección del Trabajo, oficial del Registro Civil o secretario municipal) o firmarse en línea por Mi DT (tramites.dt.gob.cl). Esa ratificación es obligatoria para que el finiquito tenga mérito ejecutivo (Art. 177 del Código del Trabajo).",
  },
  {
    q: "¿Qué pasa después del mes gratis?",
    a: "Eliges el plan que necesitas y pagas desde el portal web. Si decides no continuar, tu cuenta se suspende pero no pierdes tus documentos — se reactiva apenas regularizas.",
  },
  {
    q: "¿Cuál es la diferencia entre Lite y Pro?",
    a: "Ambos planes generan los mismos documentos. La diferencia es que Pro incluye firma digital (sin imprimir nada), portal web para tu trabajadora, verificación de identidad y recordatorios automáticos del ciclo mensual.",
  },
  {
    q: "¿Puedo modificar el contrato después?",
    a: "Sí. Cualquier modificación se hace a través de un Anexo de Modificación, que es el mecanismo legal correcto. El contrato original no se toca y el historial queda completo.",
  },
  {
    q: "¿Cómo se identifica mi trabajadora en el sistema?",
    a: "Mediante su RUT. Al registrarla, el sistema la vincula a tu contrato. En los planes Pro y Plus, ella también puede acceder a sus documentos desde su propio WhatsApp o desde el portal web.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-ink text-sm leading-snug">{q}</span>
        <div
          className={`w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform ${
            open ? "rotate-180 bg-ink border-ink" : ""
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={open ? "white" : "currentColor"} strokeWidth="1.5">
            <path d="M2 4l4 4 4-4" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-sm text-ink-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              ¿Tienes otra pregunta?{" "}
              <CtaButton className="text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-2">
                Escríbenos por WhatsApp
              </CtaButton>{" "}
              y te respondemos.
            </p>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 px-6">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
