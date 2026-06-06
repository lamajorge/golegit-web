const steps = [
  {
    number: "01",
    title: "Te registras por WhatsApp",
    description:
      "Escríbenos por WhatsApp. Te pedimos tu nombre, RUT y los datos básicos de tu trabajador/a. En minutos tu perfil está listo.",
    detail: "Sin formularios. Sin crear contraseña. Tu número de WhatsApp es tu cuenta.",
  },
  {
    number: "02",
    title: "Generas el contrato",
    description:
      "GoLegit te hace las preguntas correctas: modalidad, sueldo, jornada, domicilio, AFP, Isapre. Tú respondes.",
    detail: "El contrato llega en PDF a tu correo y al de tu trabajador/a. Con cláusulas válidas según la Ley 20.786.",
  },
  {
    number: "03",
    title: "Cada mes, cierras la liquidación",
    description:
      "GoLegit calcula la liquidación exacta con todos los descuentos y aportes. La genera en PDF y la envía a ambas partes.",
    detail: "AFP, Isapre, AFC, cotización adicional y costos del empleador — todo según la ley vigente.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-28 bg-surface-sunken">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Cómo funciona</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-ink leading-[1.1] tracking-tight">
            Tres pasos para tener
            <br />
            <span className="text-ink-muted">todo en regla.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="group relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-[cubic-bezier(.34,1.56,.64,1)]">
              {/* Giant decorative number */}
              <span
                className="absolute -top-4 -right-2 text-[9rem] font-extrabold leading-none select-none pointer-events-none"
                style={{ color: "rgba(0,0,0,0.04)" }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Step badge */}
              <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center shrink-0 text-xs font-bold mb-7 relative z-10">
                {step.number}
              </div>

              <h3 className="text-lg font-bold text-ink mb-3 relative z-10">{step.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed mb-5 relative z-10">{step.description}</p>
              <p className="text-sm text-ink-light leading-relaxed border-l-2 border-gray-200 pl-3 relative z-10">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-ink-light">
            Así todos los meses.{" "}
            <span className="text-ink-muted font-semibold">Sin recordatorios manuales, sin errores de cálculo.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
