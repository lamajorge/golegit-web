const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    title: "Contrato de trabajo",
    description: "Puertas adentro o puertas afuera, jornada completa o parcial. Cláusulas actualizadas según Ley 20.786 y Código del Trabajo.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Liquidación mensual",
    description: "AFP, Fonasa o Isapre, AFC, SIS, cotización adicional e indemnización a todo evento — calculados automáticamente según Previred.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: "Finiquito",
    description: "Seis causales de término (Arts. 159, 160 y 161 CT), cálculo automático de indemnizaciones y días pendientes. PDF listo para firmar.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: "Amonestaciones escritas",
    description: "Registro formal de incumplimientos con PDF notificado a la trabajadora. Evidencia necesaria antes de un término por Art. 160.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Ausencias, licencias y vacaciones",
    description: "Registro por causal con impacto automático en la liquidación. Saldo de vacaciones acumulado mes a mes según la ley.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: "Anexos de modificación",
    description: "Cambio de sueldo, jornada o condiciones. Cada modificación queda como documento independiente con fecha y versión.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    title: "Recordatorios automáticos",
    description: "Aviso mensual para pagar cotizaciones en Previred antes del plazo. Y alerta 7 y 3 días antes del vencimiento de contratos a plazo fijo.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: "Certificados laborales",
    description: "Certificado de vacaciones con saldo exacto y certificado de antigüedad laboral. La trabajadora los solicita desde su portal.",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mb-5">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Qué incluye</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight">
            Todo el ciclo laboral
            <br />
            <span className="text-ink-muted font-bold">de tu trabajadora. Automatizado.</span>
          </h2>
        </div>
        <p className="text-ink-muted leading-relaxed max-w-2xl mb-14">
          Desde el contrato inicial hasta el finiquito, GoLegit gestiona cada etapa de la relación laboral
          con tu trabajadora de casa particular. Cada acción queda registrada con fecha y hora —
          evidencia real ante la Inspección del Trabajo.
        </p>

        {/* Firma electrónica — card destacada */}
        <div className="relative rounded-3xl bg-zinc-950 p-8 lg:p-10 mb-4 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(ellipse 40% 80% at 0% 50%, rgba(34,197,94,0.10) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.232 5.232l3.536 3.536M9 11l4 4L20 8M5 19h4l10.5-10.5a2.121 2.121 0 00-3-3L6 16v3z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">Firma electrónica simple (FES)</h3>
                <span className="text-[10px] font-semibold text-brand-400 bg-brand-400/10 border border-brand-400/20 px-2 py-0.5 rounded-full">
                  Ley 19.799
                </span>
              </div>
              <p className="text-white/70 leading-relaxed max-w-2xl">
                Empleador y trabajadora firman con su PIN personal desde el portal web. El sistema registra
                quién firmó, desde qué IP y a qué hora. Con trazabilidad completa, ese historial vale
                como evidencia si alguna vez hay un desacuerdo.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                Firma dual: tú y tu trabajadora
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                Timestamp + IP registrados
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                Valor probatorio real
              </div>
            </div>
          </div>
        </div>

        {/* Verificación de identidad — card secundaria destacada */}
        <div className="relative rounded-2xl border border-brand-100 bg-brand-50 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"/>
              <circle cx="9" cy="10" r="2"/>
              <path d="M15 8h2M15 12h2M5 16s1-2 4-2 4 2 4 2"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-ink mb-1">Verificación de identidad</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              OCR de cédula chilena y comparación facial biométrica antes de activar la firma.
              Queda constancia de que la persona que firmó es quien dice ser.
            </p>
          </div>
          <span className="flex-shrink-0 text-[10px] font-semibold text-brand-700 bg-brand-100 border border-brand-200 px-2.5 py-1 rounded-full">
            Plan Pro · Plus
          </span>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-bold text-ink mb-2">{feature.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}

          {/* Próximamente — libro laboral */}
          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/60 opacity-70">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-ink-light bg-gray-100 px-2 py-0.5 rounded-full">
                Próximamente
              </span>
            </div>
            <h3 className="font-bold text-ink mb-2">Libro laboral electrónico</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Generación del archivo mensual para la Dirección del Trabajo. Cumplimiento de la obligación sin trámites manuales.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
