const trustItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    title: "Valor probatorio real",
    body: "Cada documento queda almacenado con registro de fecha, hora y quién lo inició. Ese historial tiene valor ante la Inspección del Trabajo. Si hay un desacuerdo, tienes evidencia.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22,2 15,22 11,13 2,9"/>
      </svg>
    ),
    title: "La trabajadora también recibe los documentos",
    body: "GoLegit le envía los contratos y liquidaciones directamente a la trabajadora por WhatsApp y email. Transparencia que protege a ambas partes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "Datos seguros",
    body: "Los datos se almacenan en infraestructura certificada. Los documentos PDF tienen enlaces con tiempo limitado. Sin terceros con acceso a tu información.",
  },
];

export default function Trust() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-ink-light uppercase mb-5">Por qué confiar</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight">
            Legal desde el diseño,
            <br />
            <span className="text-ink-muted font-bold">no desde el marketing.</span>
          </h2>
        </div>

        {/* Featured card — full width */}
        <div className="relative rounded-3xl bg-zinc-950 p-8 lg:p-10 mb-4 overflow-hidden">
          {/* Decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(ellipse 50% 80% at 5% 50%, rgba(34,197,94,0.12) 0%, transparent 60%)",
            }}
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Construido por un abogado</h3>
              <p className="text-white/70 leading-relaxed">
                GoLegit fue diseñado por un abogado especializado en derecho laboral chileno. Las plantillas cumplen
                con el Art. 10 del Código del Trabajo y la Ley 20.786. No son formularios genéricos de internet.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ley 20.786 · Código del Trabajo
              </span>
            </div>
          </div>
        </div>

        {/* Other cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {trustItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-ink/5 text-ink-muted flex items-center justify-center flex-shrink-0 group-hover:bg-ink/8 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl bg-amber-50 border border-amber-100">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-amber-900 mb-1">Alerta automática: registro en la Inspección del Trabajo</p>
            <p className="text-sm text-amber-800/70 leading-relaxed">
              El contrato debe registrarse en la Dirección del Trabajo dentro de los 15 días siguientes a su firma
              (Art. 146 ter Ley 20.786). GoLegit te lo recuerda automáticamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
