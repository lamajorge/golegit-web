"use client";

import { useState } from "react";

/* ── Waitlist form ─────────────────────────────────────────────── */

function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // For now: mailto fallback. Replace with API endpoint when ready.
    window.location.href = `mailto:hola@golegit.cl?subject=Waitlist%20Business&body=Quiero%20ser%20parte%20del%20early%20access.%20Mi%20email%3A%20${encodeURIComponent(email)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className={`text-sm font-medium ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
        Listo — te avisaremos cuando lancemos.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="tu@empresa.cl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
          dark
            ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-indigo-400"
            : "bg-white border-gray-200 text-ink placeholder-gray-400 focus:ring-indigo-500"
        }`}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
      >
        Quiero early access
      </button>
    </form>
  );
}

/* ── Feature card ──────────────────────────────────────────────── */

function FeatureCard({
  icon,
  title,
  description,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
}) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group">
      {tag && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

/* ── Pain point ────────────────────────────────────────────────── */

function PainPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

/* ── Vertical card ─────────────────────────────────────────────── */

function VerticalCard({
  icon,
  title,
  description,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 transition-all">
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────── */

const IconCalendar = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IconDoc = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconCalculator = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 6h8M8 10h8M8 14h2M8 18h2M14 14h2M14 18h2" />
  </svg>
);

const IconShield = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconUsers = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconBell = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const IconBuilding = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
  </svg>
);

const IconUtensils = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>
);

/* ── Main component ────────────────────────────────────────────── */

export default function BusinessLanding() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-zinc-950">
        {/* Ambient glow — indigo */}
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 25% 25%, rgba(99,102,241,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 75% 85%, rgba(99,102,241,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-400/20 text-indigo-300 text-xs font-medium mb-5 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Producto en desarrollo
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5 animate-fade-up animate-delay-100">
              Gestión de RRHH
              <br />
              para tu empresa.
              <br />
              <span className="text-indigo-400">Simple y legal.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-8 animate-fade-up animate-delay-200">
              Contratos, liquidaciones, turnos y firma digital desde un solo portal.
              Diseñado para resolver los dolores reales de cada rubro.
            </p>

            {/* CTA */}
            <div className="animate-fade-up animate-delay-300" id="waitlist">
              <WaitlistForm dark />
              <p className="text-xs text-white/30 mt-3">
                Sin compromiso. Te avisamos cuando esté listo.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/8 pt-8 animate-fade-up animate-delay-400">
              {[
                { value: "100%", label: "online" },
                { value: "Firma FES", label: "Ley 19.799" },
                { value: "Chile", label: "legislación local" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain points ────────────────────────────────────────── */}
      <section className="bg-zinc-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">El problema</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Gestionar personas en Chile es un laberinto legal.
            </h2>
            <p className="text-white/50 leading-relaxed">
              Contratos a mano, liquidaciones en Excel, turnos en un grupo de WhatsApp.
              Cada error es una multa potencial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PainPoint text="Contratos y finiquitos constantes por alta rotación de personal." />
            <PainPoint text="Horas extra no registradas que terminan en demandas laborales." />
            <PainPoint text="Liquidaciones manuales con errores en tasas previsionales." />
            <PainPoint text="Cotizaciones Previred que siempre se pagan con retraso." />
            <PainPoint text="Feriados trabajados sin compensación correcta dentro de los 90 días." />
            <PainPoint text="Documentos sin firma que no tienen valor probatorio ante la Inspección del Trabajo." />
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────── */}
      <section id="funcionalidades" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Funcionalidades</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Todo lo que necesitas para gestionar tu equipo.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Un portal web completo con los módulos que importan.
              WhatsApp solo para notificaciones puntuales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={IconDoc}
              title="Contratos y documentos"
              description="Genera contratos, anexos, finiquitos y cartas de aviso con un par de clics. Plantillas actualizadas a la ley vigente."
            />
            <FeatureCard
              icon={IconCalculator}
              title="Liquidaciones y Previred"
              description="Calcula liquidaciones con todas las tasas previsionales correctas. Exporta planillas para Previred."
            />
            <FeatureCard
              icon={IconCalendar}
              title="Turnos y rota"
              description="Organiza turnos rotativos con cortes, visualiza la semana completa y comparte horarios por WhatsApp o link."
            />
            <FeatureCard
              icon={IconShield}
              title="Firma digital FES"
              description="Firma electrónica simple (Ley 19.799) con verificación de identidad. Cada documento queda trazable."
            />
            <FeatureCard
              icon={IconUsers}
              title="Portal del trabajador"
              description="Cada trabajador accede a sus documentos, solicita permisos y firma contratos desde su celular."
            />
            <FeatureCard
              icon={IconBell}
              title="Recordatorios automáticos"
              description="Avisos de vencimiento de contrato, cotizaciones pendientes y plazos legales. Nunca más multas por olvido."
            />
          </div>
        </div>
      </section>

      {/* ── Rubros ─────────────────────────────────────────────── */}
      <section id="rubros" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
              Por rubro
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Adaptado a los dolores de cada sector.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Cada rubro tiene particularidades legales y operativas.
              GoLegit Business las resuelve de raíz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <VerticalCard
              icon={IconUtensils}
              title="Gastronomía"
              description="Turnos rotativos con cortes, propinas, Art. 38 CT, feriados trabajados y alta rotación. Uno de los primeros rubros en lanzar."
              badge="Primer vertical"
            />
            <VerticalCard
              icon={IconBuilding}
              title="Servicios y retail"
              description="Jornadas variables, contratos a plazo fijo frecuentes, horas extra por temporada alta y equipos distribuidos."
            />
            <VerticalCard
              icon={IconUsers}
              title="Otros rubros"
              description="Cualquier empresa con equipos que necesite contratos, liquidaciones, firma y gestión de documentos laborales al día."
            />
          </div>
        </div>
      </section>

      {/* ── Rota preview (feature destacado) ───────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
                Turnos y rota
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                Organiza los turnos de tu equipo.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Planificación visual de turnos rotativos con validación legal automática.
                Sin planillas, sin errores, sin mensajes al grupo de WhatsApp.
              </p>

              <div className="space-y-4">
                {[
                  "Turnos rotativos con cortes (mañana / noche / doble / franco)",
                  "Validación automática contra el contrato (horas máx, descansos)",
                  "Intercambio de turnos entre trabajadores con validación legal",
                  "Registro de horas extra vinculado a la liquidación",
                  "Comparte la rota por WhatsApp o link — sin instalar nada",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — rota mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">Rota semanal</p>
                    <p className="text-white/40 text-xs">14 - 20 abril 2026</p>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 border border-indigo-400/25 px-2 py-0.5 rounded-full">
                    Vista previa
                  </span>
                </div>

                {/* Schedule grid */}
                <div className="p-4">
                  <div className="grid grid-cols-8 gap-px text-[10px] font-medium text-gray-400 mb-2">
                    <div className="px-1"></div>
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                      <div key={d} className="text-center">{d}</div>
                    ))}
                  </div>
                  {[
                    { name: "Carolina M.", shifts: ["M", "M", "M", "—", "—", "N", "N"] },
                    { name: "Diego R.", shifts: ["N", "N", "—", "—", "M", "M", "D"] },
                    { name: "Valentina S.", shifts: ["—", "D", "D", "N", "N", "—", "M"] },
                    { name: "Tomás L.", shifts: ["D", "—", "N", "M", "D", "D", "—"] },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-8 gap-px items-center mb-1.5">
                      <div className="text-[10px] font-medium text-gray-700 truncate pr-1">{row.name}</div>
                      {row.shifts.map((s, j) => {
                        const colors: Record<string, string> = {
                          M: "bg-blue-100 text-blue-700",
                          N: "bg-purple-100 text-purple-700",
                          D: "bg-amber-100 text-amber-700",
                          "—": "bg-gray-50 text-gray-300",
                        };
                        return (
                          <div
                            key={j}
                            className={`text-center py-1.5 rounded-lg text-[10px] font-bold ${colors[s] || colors["—"]}`}
                          >
                            {s}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                    {[
                      { label: "Mañana", color: "bg-blue-400" },
                      { label: "Noche", color: "bg-purple-400" },
                      { label: "Doble", color: "bg-amber-400" },
                      { label: "Franco", color: "bg-gray-200" },
                    ].map((l) => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${l.color}`} />
                        <span className="text-[10px] text-gray-400">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ──────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Suscribete al early access.
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Estamos construyendo GoLegit Business con los primeros clientes.
            Deja tu email y sé de los primeros en probarlo.
          </p>
          <div className="flex justify-center">
            <WaitlistForm dark />
          </div>
        </div>
      </section>
    </>
  );
}
