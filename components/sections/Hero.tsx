"use client";

import CtaButton from "@/components/CtaButton";

function ChatMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{ height: "min(480px, calc(100dvh - 220px))", aspectRatio: "9/18" }}
    >
      {/* Glow — tasteful on dark bg */}
      <div className="absolute -inset-8 bg-brand-500/20 rounded-[3.5rem] blur-3xl -z-10" />

      {/* Phone frame — borde + rim de luz + sombra para separar del fondo evergreen */}
      <div
        className="relative bg-[#1c1c1e] rounded-[2.8rem] overflow-hidden border border-white/20 w-full h-full flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_-12px_rgba(0,0,0,0.6)]"
      >
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1c1c1e] rounded-full z-20" />

        {/* App header */}
        <div className="bg-brand-700 pt-12 pb-3 px-4 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
            <svg width="18" height="22" viewBox="0 0 28 35" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#16a34a"
                d="M4.5,4 H22.5 Q25,4 25,6.5 V22 Q25,25 22.5,25 H10.5 L6,33 V25 Q3,25 3,22 V6.5 Q3,4 4.5,4 Z"
              />
              <polyline
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="8,15 11.5,18.5 19.5,10"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold">GoLegit</p>
            <p className="text-brand-200 text-[10px]">en línea</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 min-h-0 px-3 py-3 flex flex-col gap-2.5 overflow-hidden bg-[#f0f2f5]">
          <div className="flex justify-center">
            <span className="text-[9px] bg-white/80 text-gray-500 px-2.5 py-0.5 rounded-full font-medium">
              Hoy
            </span>
          </div>

          <div className="self-start max-w-[82%]">
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-xs">
              <p className="text-[11px] text-gray-800 leading-snug">Hola, soy GoLegit.</p>
              <p className="text-[11px] text-gray-700 leading-snug mt-1">
                Vamos a crear el contrato de tu asesora del hogar.
              </p>
              <p className="text-[9px] text-gray-400 text-right mt-1.5">09:14</p>
            </div>
          </div>

          <div className="self-end max-w-[78%]">
            <div className="bg-[#25d366] rounded-2xl rounded-tr-sm px-3 py-2 shadow-xs">
              <p className="text-[11px] text-white leading-snug">
                Puertas adentro, $820.000 brutos.
              </p>
              <p className="text-[9px] text-white/70 text-right mt-1.5">09:15 ✓✓</p>
            </div>
          </div>

          <div className="self-start max-w-[88%]">
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-xs">
              <p className="text-[11px] text-gray-800 font-semibold">Contrato generado</p>
              <p className="text-[11px] text-gray-600 leading-snug mt-0.5">
                Te lo envié a ti y a Cecilia por email.
              </p>
              <div className="mt-2 bg-gray-50 border border-gray-100 rounded-xl p-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-700">Contrato_Cecilia.pdf</p>
                  <p className="text-[9px] text-gray-400">124 KB · PDF</p>
                </div>
              </div>
              <p className="text-[9px] text-gray-400 text-right mt-1.5">09:16</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const TRUST = [
  "Firma con validez legal",
  "Construido por abogados",
  "Gratis para siempre",
];

export default function Hero() {
  return (
    <section className="relative h-svh lg:h-dvh overflow-hidden bg-ink-deep">
      {/* Glow ambiente — verde (señal) + arena (calidez), registro Expressive */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(58% 52% at 16% 24%, oklch(0.627 0.170 149 / 0.30) 0%, transparent 62%), radial-gradient(46% 50% at 94% 86%, oklch(0.700 0.085 62 / 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Content layer — always starts below the navbar (pt-20 = 80px > h-16 = 64px) */}
      <div className="absolute inset-0 flex flex-col justify-center pt-32 pb-10">
      <div className="relative w-full max-w-6xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-8 xl:gap-16 lg:items-center">
        {/* Left: Copy */}
        <div>
          {/* Badge — just above the headline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur text-white/70 text-xs font-medium mb-5 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            Gratis para siempre · Sin tarjeta de crédito
          </div>

          {/* Headline — Fraunces (display), copy aprobada */}
          <h1 className="font-display text-display font-semibold text-white mb-5 animate-fade-up animate-delay-100">
            Tu hogar, <span className="italic text-brand-400">en regla</span>.
            <br />
            Sin complicaciones.
          </h1>

          {/* Subtitle — copy aprobada */}
          <p className="text-base lg:text-lg text-white/75 leading-relaxed max-w-xl mb-8 animate-fade-up animate-delay-200">
            Contrato, liquidaciones, firma con validez legal y control de
            asistencia. Todo desde WhatsApp, acompañado por abogados. Tú te
            dedicas a tu familia; nosotros, a que todo esté impecable.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up animate-delay-300">
            <CtaButton className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Empieza gratis por WhatsApp
            </CtaButton>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 text-white/75 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/35 transition-colors"
            >
              Ver cómo funciona
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Trust row — señales de confianza (reemplaza stats) */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/10 pt-6 animate-fade-up animate-delay-400">
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-sm text-white/75">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-brand-400">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Chat mockup — hidden on mobile */}
        <div className="hidden lg:flex justify-end animate-fade-up animate-delay-200">
          <ChatMockup />
        </div>
      </div>
      </div>
    </section>
  );
}
