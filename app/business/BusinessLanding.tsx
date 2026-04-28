"use client";

import { useState } from "react";

/* ── Waitlist form ─────────────────────────────────────────────── */

function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEstado("error");
      setErrorMsg("Ingresa un email válido");
      return;
    }
    setEstado("enviando");
    setErrorMsg(null);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          fuente: "business",
          consentimiento: true,
        }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setEstado("error");
        setErrorMsg(data?.error ?? "Algo falló — intenta nuevamente");
        return;
      }
      setEstado("ok");
    } catch {
      setEstado("error");
      setErrorMsg("Error de conexión — intenta nuevamente");
    }
  }

  if (estado === "ok") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
        Listo — te avisamos cuando lancemos GoLegit Business.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="tu@empresa.cl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={estado === "enviando"}
          className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 disabled:opacity-60 ${
            dark
              ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-indigo-400"
              : "bg-white border-gray-200 text-ink placeholder-gray-400 focus:ring-indigo-500"
          }`}
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
        >
          {estado === "enviando" ? "Enviando..." : "Quiero early access"}
        </button>
      </div>
      {errorMsg && (
        <p className={`text-xs ${dark ? "text-red-300" : "text-red-600"}`}>{errorMsg}</p>
      )}
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

/* ── Section feature row ────────────────────────────────────────── */

function PillarCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
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
    <div className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 transition-all">
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IconDoc = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconCalculator = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 6h8M8 10h8M8 14h2M8 18h2M14 14h2M14 18h2" />
  </svg>
);

const IconShield = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconUsers = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconBell = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const IconBuilding = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
  </svg>
);

const IconUtensils = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>
);

const IconGavel = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 13L3 22l-1-1 9-11" />
    <path d="M7.5 7.5l-1-1 5-5 6 6-5 5-1-1" />
    <path d="M13 11l4 4" />
    <path d="M17 7l3-3" />
  </svg>
);

const IconChart = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.21 15.89A10 10 0 118 2.83" />
    <path d="M22 12A10 10 0 0012 2v10z" />
  </svg>
);

const IconHandshake = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9l-5 5" />
    <path d="M2 12s2-4 6-4c2 0 3.5 1 5 1s3-1 5-1c4 0 6 4 6 4s-2 4-6 4c-2 0-3.5-1-5-1s-3 1-5 1c-4 0-6-4-6-4z" />
  </svg>
);

const IconHome = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconLock = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const IconScroll = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="12" y1="17" x2="8" y2="17" />
    <line x1="9" y1="9" x2="8" y2="9" />
  </svg>
);

const IconPower = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a8 8 0 018-8h3" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a8 8 0 01-8 8h-3" />
  </svg>
);

/* ── Main component ────────────────────────────────────────────── */

export default function BusinessLanding() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-zinc-950">
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
              Producto en desarrollo — Early access disponible
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5 animate-fade-up animate-delay-100">
              Tu empresa,
              <br />
              legalmente en orden.
              <br />
              <span className="text-indigo-400">Sin contratar un estudio.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-8 animate-fade-up animate-delay-200">
              Contratos de trabajo, rota de turnos, juntas de accionistas,
              modificaciones de tu SpA, arriendos y más — generados, firmados
              y archivados en un solo portal. Hecho para la pyme chilena.
            </p>

            {/* CTA */}
            <div className="animate-fade-up animate-delay-300">
              <WaitlistForm dark />
              <p className="text-xs text-white/30 mt-3">
                Sin compromiso. Te avisamos cuando esté listo.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/8 pt-8 animate-fade-up animate-delay-400">
              {[
                { value: "3 áreas", label: "Laboral · Corporativo · Contratos" },
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
              Gestionar una pyme en Chile es un laberinto legal.
            </h2>
            <p className="text-white/50 leading-relaxed">
              Contratos a mano, actas de directorio que nadie redacta, arriendos
              sin cláusulas clave. Cada error es una multa, una demanda
              o un socio que impugna un acuerdo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PainPoint text="Finiquito que no alcanza a salir en 10 días hábiles — y que la DT multa sin piedad." />
            <PainPoint text="Actas de directorio que nadie redacta a tiempo — y que el banco o la SII puede pedir en cualquier momento." />
            <PainPoint text="Lagunas previsionales que aparecen meses después y generan cobros retroactivos de Previred." />
            <PainPoint text="Junta de accionistas sin documentación válida que deja los acuerdos expuestos a impugnación." />
            <PainPoint text="Contrato de arriendo sin cláusulas esenciales que genera conflictos costosos años después." />
            <PainPoint text="Documentos sin firma electrónica que no tienen valor probatorio ante la DT o el tribunal." />
          </div>
        </div>
      </section>

      {/* ── Laboral ────────────────────────────────────────────── */}
      <section id="laboral" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Gestión laboral</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Tu equipo al día con el Código del Trabajo.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Desde el contrato de ingreso hasta el finiquito, pasando por
              liquidaciones, rota de turnos y firma digital. Todo lo que el
              área de RRHH necesita sin contratar un contador externo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={IconDoc}
              title="Contratos y documentos laborales"
              description="Genera contratos a plazo fijo, indefinido, por obra y cartas de aviso con un par de clics. Plantillas actualizadas a la ley vigente."
            />
            <FeatureCard
              icon={IconCalculator}
              title="Liquidaciones y Previred"
              description="Calcula liquidaciones con tasas previsionales correctas. Sin lagunas, sin cobros retroactivos. Exporta directo a Previred."
            />
            <FeatureCard
              icon={IconCalendar}
              title="Rota y gestión de turnos"
              description="Organiza turnos rotativos con cortes, valida automáticamente las horas máximas y comparte la rota con tu equipo."
            />
            <FeatureCard
              icon={IconShield}
              title="Firma electrónica simple (FES)"
              description="Firma electrónica con valor legal (Ley 19.799). Cada documento queda trazable con IP, fecha y verificación de identidad."
            />
            <FeatureCard
              icon={IconUsers}
              title="Portal del trabajador"
              description="Cada trabajador accede a sus contratos, liquidaciones y puede firmar documentos desde el celular, sin instalar nada."
            />
            <FeatureCard
              icon={IconBell}
              title="Alertas de plazos legales"
              description="Avisos de vencimiento de contrato, cotizaciones pendientes y finiquitos por vencer. Nunca más multas DT por olvido."
            />
          </div>
        </div>
      </section>

      {/* ── Herramientas operativas ────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Operación diaria</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Herramientas para gestionar el equipo día a día.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Más allá de los contratos y las liquidaciones, tu equipo necesita
              que alguien resuelva el día a día: quién trabaja cuándo, cuántas
              horas lleva, cuándo se acaba su contrato. GoLegit Business lo
              tiene resuelto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: IconCalendar,
                title: "Rota de turnos",
                desc: "Planificación visual con validación automática de horas máximas y descansos.",
              },
              {
                icon: IconDoc,
                title: "Control de jornada",
                desc: "Registro de asistencia digital obligatorio por Ley 21.561 (Ley 40 Horas).",
              },
              {
                icon: IconCalculator,
                title: "Horas extra",
                desc: "Cálculo automático de horas extra vinculado a la liquidación del mes.",
              },
              {
                icon: IconBell,
                title: "Alertas de vencimientos",
                desc: "Finiquitos, cotizaciones y contratos a punto de vencer — aviso anticipado.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rota spotlight ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
                Rota de turnos
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                Organiza los turnos sin planillas ni grupos de WhatsApp.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Planificación visual de turnos rotativos con validación legal
                automática. Sin planillas, sin errores, sin mensajes al grupo.
              </p>

              <div className="space-y-4">
                {[
                  "Turnos rotativos con cortes (mañana / noche / doble / franco)",
                  "Validación automática contra el contrato — horas máximas y descansos",
                  "Intercambio de turnos entre trabajadores con validación legal",
                  "Registro de horas extra vinculado directo a la liquidación",
                  "Comparte la rota por link — sin instalar nada",
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
                <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">Rota semanal</p>
                    <p className="text-white/40 text-xs">14 - 20 abril 2026</p>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 border border-indigo-400/25 px-2 py-0.5 rounded-full">
                    Vista previa
                  </span>
                </div>

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

      {/* ── Corporativo ────────────────────────────────────────── */}
      <section id="corporativo" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Gestión corporativa</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Tu SpA bien constituida y documentada.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Juntas de accionistas, actas de directorio, modificaciones de
              estatutos y operaciones con acciones. Los documentos que el banco,
              la SII o tus socios pueden pedir en cualquier momento — generados,
              firmados y listos para tramitar en Empresa en un Día o ante notaría.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={IconGavel}
              title="Juntas de accionistas"
              description="Actas de junta ordinaria y extraordinaria. Convocatorias, quórum, acuerdos y firmas — todo en un flujo guiado y con valor legal."
            />
            <FeatureCard
              icon={IconDoc}
              title="Actas de directorio"
              description="Genera y firma actas de sesión de directorio. Registro automático de asistencia, acuerdos y representantes."
            />
            <FeatureCard
              icon={IconScroll}
              title="Modificaciones de estatutos"
              description="Cambios de razón social, domicilio, objeto social o capital. Documentos listos para tramitar en Empresa en un Día o ante notaría, según el tipo de operación."
            />
            <FeatureCard
              icon={IconChart}
              title="Operaciones con acciones y cuotas"
              description="Cesión, venta y prenda de acciones o cuotas. Registro del libro de accionistas y actualización del capital."
            />
            <FeatureCard
              icon={IconPower}
              title="Aumentos de capital"
              description="Documentación completa para ampliar el capital social con nuevos aportes o capitalización de utilidades retenidas."
            />
            <FeatureCard
              icon={IconUsers}
              title="Poderes y representantes"
              description="Otorgamiento y revocación de poderes. Actualización de representantes legales ante bancos, SII y organismos públicos."
            />
          </div>
        </div>
      </section>

      {/* ── Contratos & documentos ─────────────────────────────── */}
      <section id="contratos" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Contratos & documentos</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Todos los papeles de tu operación, en regla.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Más allá del Código del Trabajo: los contratos y documentos del
              día a día de tu negocio, generados con cláusulas adecuadas y
              firmados digitalmente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={IconHome}
              title="Contratos de arriendo"
              description="Habitacional y comercial. Con cláusulas de reajuste UF, garantía, inventario y término anticipado. Firmados digitalmente por ambas partes."
            />
            <FeatureCard
              icon={IconHandshake}
              title="Contratos de servicios"
              description="Prestación de servicios, mandatos y acuerdos comerciales entre empresas. Claros en plazos, precios, propiedad y responsabilidad."
            />
            <FeatureCard
              icon={IconLock}
              title="NDA y confidencialidad"
              description="Acuerdos de confidencialidad para negociaciones, due diligence y relaciones con proveedores o socios estratégicos."
            />
            <FeatureCard
              icon={IconScroll}
              title="Declaraciones juradas"
              description="Declaraciones simples con valor legal: domicilio, ingresos, estado civil, inexistencia de deudas. Firmadas y trazables."
            />
            <FeatureCard
              icon={IconDoc}
              title="Promesas de compraventa"
              description="Promesas de compraventa de bienes, vehículos y activos. Con condiciones, plazos y garantías bien definidas."
            />
            <FeatureCard
              icon={IconShield}
              title="Firma electrónica para todo"
              description="Cualquier documento se puede firmar con FES (Ley 19.799). Valor probatorio completo, sin notaría para los actos que no la requieren."
            />
          </div>
        </div>
      </section>

      {/* ── Rubros ─────────────────────────────────────────────── */}
      <section id="rubros" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">
              Por rubro
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Hecho para las pymes chilenas que más lo necesitan.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Cada sector tiene sus propios dolores legales y operativos.
              GoLegit Business los resuelve de raíz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <VerticalCard
              icon={IconUtensils}
              title="Gastronomía y food service"
              description="Turnos rotativos con cortes, Art. 38 CT, feriados trabajados, alta rotación y propinas. Uno de los primeros rubros en lanzar."
              badge="Primer vertical"
            />
            <VerticalCard
              icon={IconBuilding}
              title="Servicios, retail y comercio"
              description="Contratos a plazo fijo frecuentes, jornadas variables, horas extra por temporada y equipos distribuidos en varias sucursales."
            />
            <VerticalCard
              icon={IconHandshake}
              title="Empresas con socios"
              description="Cualquier sociedad que necesite documentar juntas, modificar estatutos, ceder participaciones y mantener su carpeta societaria al día."
            />
          </div>
        </div>
      </section>

      {/* ── CTA final ──────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Sé de los primeros en probarlo.
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Estamos construyendo GoLegit Business con las primeras pymes.
            Deja tu email y te avisamos cuando puedas entrar.
          </p>
          <div className="flex justify-center">
            <WaitlistForm dark />
          </div>
        </div>
      </section>
    </>
  );
}
