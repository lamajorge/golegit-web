const pillars = [
  {
    title: "Firma electrónica simple",
    body: "Empleador y trabajadora firman por separado con su PIN personal desde el portal. Cada firma cumple con los requisitos del Art. 3 de la Ley 19.799.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.232 5.232l3.536 3.536M9 11l4 4L20 8M5 19h4l10.5-10.5a2.121 2.121 0 00-3-3L6 16v3z" />
      </svg>
    ),
  },
  {
    title: "Verificación de identidad",
    body: "Antes de activar la firma, OCR de cédula chilena + comparación biométrica facial. Queda constancia de que quien firmó es quien dice ser.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M15 8h2M15 12h2M5 16s1-2 4-2 4 2 4 2" />
      </svg>
    ),
  },
  {
    title: "Trazabilidad completa",
    body: "Cada firma registra IP, dispositivo, fecha y hora. Historial inmutable y descargable con valor probatorio ante la Dirección del Trabajo o el tribunal.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const compliance = [
  {
    label: "Ley 19.799",
    detail: "Firma electrónica",
  },
  {
    label: "Ley 21.719",
    detail: "Protección de datos personales",
  },
  {
    label: "Ley 20.786",
    detail: "Trabajadoras de casa particular",
  },
  {
    label: "Sello de tiempo",
    detail: "Cada firma con fecha y hora certificadas (RFC 3161)",
  },
];

export default function TechTrust() {
  return (
    <section className="py-28 bg-zinc-950 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest text-brand-400 uppercase mb-5">
            Tecnología y trazabilidad
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Firmas con valor legal.
            <br />
            <span className="text-white/60 font-bold">Sin pretextos técnicos.</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Detrás de cada contrato, liquidación y anexo hay una capa de
            firma electrónica, verificación biométrica y auditoría. Lo que
            firmas con GoLegit tiene valor probatorio real ante la
            Dirección del Trabajo y los tribunales chilenos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {pillars.map((p, i) => (
            <div key={i}>
              <div className="w-11 h-11 rounded-xl bg-brand-600/15 border border-brand-500/25 text-brand-400 flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/8">
          <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-5">
            Cumplimos con
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {compliance.map((c) => (
              <div key={c.label}>
                <p className="text-sm font-semibold text-white mb-0.5">{c.label}</p>
                <p className="text-xs text-white/50 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
