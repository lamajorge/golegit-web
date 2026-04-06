import Link from "next/link";

export default function ProductSuite() {
  return (
    <section className="bg-zinc-950 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-white/8 pt-12">
          <p className="text-xs font-semibold tracking-widest text-white/20 uppercase mb-8 text-center">
            El ecosistema GoLegit
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Home — activo */}
            <div className="relative rounded-2xl border border-white/10 bg-white/4 p-7 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-none">GoLegit Home</p>
                    <p className="text-white/30 text-xs mt-1">home.golegit.cl</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-brand-400 bg-brand-400/10 border border-brand-400/20 px-2.5 py-1 rounded-full">
                  Disponible
                </span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Gestión legal completa para trabajadoras de casa particular.
                Contratos, liquidaciones, finiquitos e historial — todo por WhatsApp.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
              >
                Ver producto
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Business — próximamente */}
            <div className="relative rounded-2xl border border-white/6 bg-white/2 p-7 opacity-60">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-base leading-none">GoLegit Business</p>
                    <p className="text-white/30 text-xs mt-1">business.golegit.cl</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-white/30 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  Próximamente
                </span>
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Gestión laboral para PYMEs y empleadores con equipos de trabajo.
                Contratos, liquidaciones y cumplimiento legal para todo tu equipo.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/20 cursor-not-allowed">
                En desarrollo
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
