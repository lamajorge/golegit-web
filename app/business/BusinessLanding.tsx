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
      <p className={`text-sm font-medium ${dark ? "text-blue-400" : "text-blue-600"}`}>
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
          className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-hidden focus:ring-2 disabled:opacity-60 ${
            dark
              ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-blue-400"
              : "bg-white border-gray-200 text-ink placeholder-gray-400 focus:ring-blue-500"
          }`}
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
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
    <div className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group">
      {tag && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
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
      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
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
      <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
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
    <div className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 transition-all">
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
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

const IconSparkle = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

export default function BusinessLanding() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-svh flex items-center overflow-hidden bg-zinc-950">
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 25% 25%, rgba(37,99,235,0.16) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 75% 85%, rgba(37,99,235,0.08) 0%, transparent 55%)",
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/20 text-blue-300 text-xs font-medium mb-5 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Producto en desarrollo — Early access disponible
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-[1.08] tracking-tight mb-5 animate-fade-up animate-delay-100">
              Tu empresa, en regla.
              <br />
              <span className="text-blue-400">Sin complicaciones.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-8 animate-fade-up animate-delay-200">
              El aliado legal de tu pyme. Tu sociedad, tus datos, tus contratos
              y tu equipo en orden — te decimos qué te toca, lo dejamos listo y,
              si algo necesita notario, lo gestionamos por ti. No somos un
              fiscalizador más.
            </p>

            {/* CTA */}
            <div className="animate-fade-up animate-delay-300">
              <WaitlistForm dark />
              <p className="text-xs text-white/30 mt-3">
                Empieza gratis. Sin compromiso. Te avisamos cuando esté listo.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/8 pt-8 animate-fade-up animate-delay-400">
              {[
                { value: "Todo en un lugar", label: "sociedad · datos · contratos · equipo" },
                { value: "Firma FES", label: "validez legal · Ley 19.799" },
                { value: "Empieza gratis", label: "sin tarjeta, sin permanencia" },
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

      {/* ── Posicionamiento: aliado, no fiscalizador ───────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Nuestra forma de trabajar</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-gray-900 leading-tight mb-4">
              Un aliado que te descomplica. No un fiscalizador más.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Otros softwares te llenan de alertas rojas de todo lo que haces
              mal. Nosotros hacemos lo contrario: te decimos qué te toca, te lo
              dejamos listo, y lo difícil lo absorbemos por ti.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <PillarCard
              icon={IconSparkle}
              title="Lo hacemos por ti"
              description="No te entregamos una lista de pendientes — te entregamos el documento listo para firmar. El trabajo lo hacemos nosotros."
            />
            <PillarCard
              icon={IconBell}
              title="Te avisamos a tiempo, sin asustar"
              description="«Se acerca tu junta anual, te dejé el acta lista». Recordatorios amables, nunca amenazas de multa."
            />
            <PillarCard
              icon={IconGavel}
              title="Lo notarial también lo resolvemos"
              description="Cuando un trámite necesita notario o Conservador, preparamos todo y, si quieres, lo gestionamos por ti. No te dejamos solo."
            />
            <PillarCard
              icon={IconShield}
              title="Validez legal de verdad"
              description="Firma electrónica con valor legal (Ley 19.799) y respaldo de abogados. No son plantillas de internet sin valor."
            />
          </div>
        </div>
      </section>

      {/* ── Los módulos (por materia) ──────────────────────────── */}
      <section id="modulos" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Todo en un solo lugar</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-gray-900 leading-tight mb-4">
              Activa solo lo que tu empresa necesita.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              GoLegit Business es modular: empiezas con lo básico y sumas lo que
              haga falta cuando lo necesites. Sin pagar por lo que no usas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={IconGavel}
              tag="Sociedad"
              title="Tu SpA, documentada"
              description="Actas de junta y directorio, libro de accionistas digital, modificaciones de estatutos y aumentos de capital. Listo para el banco, la SII o tus socios."
            />
            <FeatureCard
              icon={IconLock}
              tag="Datos"
              title="Cumplimiento Ley 21.719"
              description="Política de privacidad, registro de datos, gestión de derechos y brechas. La nueva ley de datos, resuelta sin angustia."
            />
            <FeatureCard
              icon={IconHandshake}
              tag="Contratos"
              title="Contratos comerciales"
              description="Servicios, confidencialidad (NDA), arriendo, mandatos. Con las cláusulas correctas y firma electrónica para ambas partes."
            />
            <FeatureCard
              icon={IconUsers}
              tag="Laboral"
              title="Tu equipo en regla"
              description="Contratos de trabajo, liquidaciones con tasas correctas, finiquitos y reglamento interno. El Código del Trabajo, sin lagunas."
            />
            <FeatureCard
              icon={IconCalculator}
              tag="Impuestos"
              title="Calendario tributario"
              description="Te avisamos tus vencimientos del SII, beneficiarios finales y patente municipal. Sin reemplazar a tu contador — lo complementamos."
            />
            <FeatureCard
              icon={IconBuilding}
              tag="Formaliza"
              title="Constituir o formalizar"
              description="¿SpA, EIRL o sociedad limitada? Te ayudamos a decidir y a dejar todo en regla — incluido lo que el portal del Estado no te explica."
            />
          </div>
        </div>
      </section>

      {/* ── Copiloto spotlight ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                Tu copiloto de cumplimiento
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-gray-900 leading-tight mb-5">
                Tu empresa, siempre al día. Sin que tengas que acordarte.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Ser pyme en Chile significa mil plazos repartidos entre la SII,
                la municipalidad, el Conservador y la nueva agencia de datos.
                Nosotros llevamos la cuenta — y te avisamos con tiempo, con el
                documento ya preparado.
              </p>

              <div className="space-y-4">
                {[
                  "Junta anual, modificaciones, libro de accionistas al día",
                  "Vencimientos tributarios y beneficiarios finales (sin reemplazar al contador)",
                  "Plazos de la Ley 21.719 y renovación de patente municipal",
                  "Cada aviso llega con el documento listo para firmar",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — copiloto mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-zinc-950 px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-bold">Inversiones del Sur SpA</p>
                    <p className="text-white/40 text-xs">Resumen de cumplimiento</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Al día
                  </span>
                </div>

                <div className="p-4 space-y-2.5">
                  {[
                    { t: "Junta ordinaria anual", d: "En 3 semanas · acta lista para firmar", c: "blue", cta: "Revisar" },
                    { t: "Declaración beneficiarios finales", d: "Marzo · te recordaremos a tiempo", c: "gray", cta: null },
                    { t: "Política de datos (Ley 21.719)", d: "Generada y vigente", c: "emerald", cta: null },
                    { t: "Patente municipal", d: "Renovada hasta enero 2027", c: "emerald", cta: null },
                  ].map((row, i) => {
                    const dot: Record<string, string> = { blue: "bg-blue-500", emerald: "bg-emerald-500", gray: "bg-gray-300" };
                    return (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3.5 py-3 border border-gray-100">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${dot[row.c]}`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-semibold text-gray-800 truncate">{row.t}</p>
                          <p className="text-[10px] text-gray-400 truncate">{row.d}</p>
                        </div>
                        {row.cta && (
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-lg whitespace-nowrap">
                            {row.cta}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Empieza gratis ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Empieza gratis</p>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-gray-900 leading-tight mb-4">
                  Registra tu empresa y conoce tu situación, sin pagar nada.
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Solo pagas cuando generas y firmas documentos. Planes simples,
                  sin permanencia, pensados para el bolsillo de una pyme — y muy
                  por debajo de lo que cobra una notaría o un abogado por acto.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "La ficha completa de tu empresa, socios y directorio",
                  "Tu libro de accionistas digital, siempre al día",
                  "El copiloto que te avisa todos tus vencimientos",
                  "El diagnóstico de la Ley 21.719",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contadores y abogados ──────────────────────────────── */}
      <section id="contadores" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-zinc-950 p-8 sm:p-12 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
              style={{ background: "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.18) 0%, transparent 60%)" }}
            />
            <div className="relative max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Para contadores y abogados</p>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white leading-tight mb-4">
                ¿Llevas varias empresas? Gestiónalas todas desde un solo lugar.
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Si eres contador, abogado o tienes un estudio, lleva la carpeta
                legal y societaria de todos tus clientes con una sola
                herramienta — con precio por volumen y la cartera completa
                siempre al día. Tú gestionas; la firma la hace cada
                representante legal.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "Todas tus empresas en un panel",
                  "Precio mayorista por volumen",
                  "Cada cliente, siempre al día",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ──────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white leading-tight mb-4">
            Sé de los primeros en probarlo.
          </h2>
          <p className="text-white/50 leading-relaxed mb-8">
            Estamos construyendo GoLegit Business con las primeras pymes y
            estudios. Deja tu email y te avisamos cuando puedas entrar.
          </p>
          <div className="flex justify-center">
            <WaitlistForm dark />
          </div>
        </div>
      </section>
    </>
  );
}
