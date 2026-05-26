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
    a: "También funciona. Ingresas la relación laboral que ya tienen — incluyendo la fecha real en que ella empezó a trabajar contigo — y GoLegit arma un anexo que actualiza y formaliza todo. La antigüedad para sus vacaciones e indemnizaciones se cuenta desde el día real en que empezó, no desde que entras a GoLegit.",
  },
  {
    q: "¿Cómo le llega el contrato a mi trabajadora?",
    a: "Si activas Firma Electrónica + Portal en el contrato (gratis, opcional), el sistema le envía el PDF por email directamente con un enlace para revisar y firmar digitalmente. Si prefieres no activarlo, tú imprimes el documento y lo firman en papel. La elección es por contrato.",
  },
  {
    q: "¿La firma electrónica tiene valor legal?",
    a: "Sí. GoLegit usa Firma Electrónica Simple bajo la Ley 19.799. Cada firma queda registrada con quién firmó, cuándo y desde dónde. Ese registro sirve como prueba ante la Inspección del Trabajo.",
  },
  {
    q: "¿Puedo calcular la liquidación aunque no sepa de cotizaciones?",
    a: "Sí. GoLegit aplica automáticamente las tasas vigentes de AFP, Isapre, AFC, cotización adicional y los aportes del empleador. Tú solo confirmas los días trabajados si hubo ausencias.",
  },
  {
    q: "¿GoLegit hace el finiquito también?",
    a: "Sí. Cubre las 8 causales de término que contempla la ley (Arts. 159, 160 y 161 del Código del Trabajo), calcula automáticamente las indemnizaciones que correspondan, las vacaciones que aún tiene pendientes y los días proporcionales del último mes. El PDF queda listo para que lo ratifiquen ante un notario, la Inspección del Trabajo o el oficial del Registro Civil, o para firmarlo en línea por Mi DT (tramites.dt.gob.cl). Esa ratificación es obligatoria para que el finiquito sea exigible legalmente (Art. 177 del Código del Trabajo).",
  },
  {
    q: "¿Tiene algún costo? ¿Hay tarjeta de crédito?",
    a: "El software es gratis para siempre, sin tarjeta de crédito ni permanencia. Solo pagas si quieres que nosotros nos encarguemos del papeleo cada mes (plan Asistido, desde $14.990/mes con plan anual o $18.990/mes con plan mensual) o si necesitas hablar con un abogado para un caso específico.",
  },
  {
    q: "¿En qué consiste el plan Asistido?",
    a: "Asistido es para quienes prefieren que nosotros nos encarguemos del papeleo cada mes. Preparamos la planilla Previred mensual y te avisamos para que solo confirmes el pago, subimos el Libro de Remuneraciones a la Dirección del Trabajo y mantenemos al día los contratos y anexos ante la DT. Tarifa según cuántas trabajadoras tengas — pagando anual: $14.990/mes (1), $24.990/mes (2-3) o $39.990/mes (4 o más). Mensual: $18.990, $31.990 o $49.990 respectivamente (~20% más).",
  },
  {
    q: "¿Y los servicios jurídicos?",
    a: "Cuando hay un caso difícil o necesitas opinión profesional, tienes abogados especialistas en trabajadoras de casa particular a un mensaje de distancia. Cobramos por servicio, sin suscripción: una consulta por escrito en menos de 24 horas ($49.990), una videollamada de 30 minutos ($89.990), revisar un contrato especial, tramitar tu licencia médica, o acompañarte en una fiscalización. Para una demanda laboral, cotizamos según la complejidad del caso. Clientes con plan Asistido anual reciben 20% de descuento.",
  },
  {
    q: "¿Puedo modificar el contrato después?",
    a: "Sí. Cualquier cambio se hace con un anexo — que es la forma legal correcta. El contrato original queda intacto y todos los cambios quedan registrados con fecha.",
  },
  {
    q: "¿Cómo se identifica mi trabajadora en el sistema?",
    a: "Mediante su RUT. Al registrarla, el sistema la vincula a tu contrato. Si activas el Portal Trabajadora en el contrato (gratis, opcional), ella también puede acceder a sus documentos desde su propio WhatsApp o desde el portal web.",
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
