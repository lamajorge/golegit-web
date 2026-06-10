import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// Landing-PARAGUAS de marca GoLegit (apex golegit.cl) — corazón SEO del ecosistema.
// Patrón extraído de las dos landings que funcionan (Home + Business): hero
// OSCURO impactante con el selector dentro, Fraunces SOLO en el h1, secciones que
// ALTERNAN dark/light con eyebrows de color, oversized type + jerarquía (tendencia
// 2026). Habla de lo común y entra en cada solución y cómo funciona.
export const metadata: Metadata = {
  title: "GoLegit — Software legal chileno: contratos, firma electrónica y cumplimiento",
  description:
    "GoLegit hace el papeleo por ti, con validez ante la ley chilena. Para tu hogar (trabajadoras de casa particular) y para tu empresa (SpA, Ltda, EIRL): contratos, liquidaciones, firma electrónica (Ley 19.799) y cumplimiento de la Ley de Datos 21.719.",
  keywords: [
    "software legal Chile", "contratos legales online Chile", "firma electrónica Chile",
    "firma electrónica simple ley 19.799", "cumplimiento legal empresas Chile",
    "ley 21.719 protección de datos", "contrato trabajadora de casa particular",
    "liquidación nana", "documentos legales empresa SpA", "gobierno societario pyme",
    "aliado legal pyme", "papeleo legal automatizado Chile",
  ],
  alternates: { canonical: "https://golegit.cl" },
  openGraph: {
    title: "GoLegit — El aliado legal que descomplica",
    description: "Para tu hogar y para tu empresa: todo en regla, sin complicaciones. Con validez ante la ley chilena.",
    url: "https://golegit.cl",
    siteName: "GoLegit",
  },
};

export default function ParaguasLanding() {
  return (
    <main className="bg-paper">
      {/* ════════ HERO — oscuro, oversized, selector dentro ════════ */}
      {/* Patrón Home: bloqueado a UNA pantalla (h-svh/dvh) — contenido centrado vertical. */}
      <section className="relative flex h-svh lg:h-dvh min-h-[640px] flex-col overflow-hidden bg-ink-deep">
        {/* Glows: verde (Home) abajo-izq + indigo (Business) arriba-der → las dos marcas */}
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[700px] w-[700px]" style={{ background: "radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-20 h-[600px] w-[600px]" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 60%)" }} />

        {/* Topbar — los dos productos balanceando los glows: Home (verde) izq · Business (indigo) der */}
        <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
          <Image src="/logo/golegit-logo-dark.svg" alt="GoLegit Home" width={120} height={30} priority className="opacity-90" />
          <Image src="/logo/golegit-business-logo-dark.svg" alt="GoLegit Business" width={120} height={30} priority className="opacity-90" />
        </header>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Tu hogar y tu empresa, sin complicaciones
          </span>

          <h1 className="animate-fade-up animate-delay-100 mt-7 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-7xl">
            Tenerlo todo<br /><span className="italic text-brand-400">en regla</span>, fácil.
          </h1>

          <p className="animate-fade-up animate-delay-200 mx-auto mt-7 max-w-lg text-lg leading-relaxed text-white/75">
            GoLegit hace el papeleo por ti — contratos, firma electrónica y cumplimiento.
            Elige por dónde empezar:
          </p>

          {/* SELECTOR dentro del hero — protagonista visual: dos puertas grandes */}
          <div className="animate-fade-up animate-delay-300 mt-10 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
            <a href="https://home.golegit.cl" className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-brand-500/10">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/20 blur-2xl transition-opacity group-hover:opacity-80" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </span>
              <p className="relative mt-5 text-lg font-bold text-white">Para tu hogar</p>
              <p className="relative mt-1 flex-1 text-sm leading-relaxed text-white/70">¿Tienes a alguien trabajando en tu casa? Su contrato y todo lo del mes, en regla.</p>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-400 transition-all group-hover:gap-2.5">GoLegit Home <Arrow /></span>
            </a>

            <a href="https://business.golegit.cl" className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-2xl" style={{ borderColor: undefined }}>
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-opacity group-hover:opacity-80" style={{ background: "oklch(0.55 0.23 277 / 0.25)" }} />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: "oklch(0.55 0.23 277)", boxShadow: "0 10px 25px -5px oklch(0.55 0.23 277 / 0.4)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
              </span>
              <p className="relative mt-5 text-lg font-bold text-white">Para tu empresa</p>
              <p className="relative mt-1 flex-1 text-sm leading-relaxed text-white/70">¿Tienes una empresa? Cumplimiento de datos, sociedad y contratos — al día, sin enredos.</p>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5" style={{ color: "oklch(0.72 0.18 277)" }}>GoLegit Business <Arrow /></span>
            </a>
          </div>
        </div>

        {/* Hint scroll */}
        <div className="relative z-10 pb-8 text-center">
          <a href="#comun" className="text-xs font-medium text-white/50 transition-colors hover:text-white/75">Conoce más ↓</a>
        </div>
      </section>

      {/* ════════ LO COMÚN — fondo claro, eyebrow ════════ */}
      <section id="comun" className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Un mismo aliado</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">Lo que hacemos por ti es lo mismo</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-light">
              Da igual si tienes a alguien trabajando en tu casa o si llevas una empresa: GoLegit
              hace el trabajo, no te lo audita. Y siempre con el mismo respaldo legal.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMUNES.map((c) => (
              <div key={c.t} className="rounded-2xl border border-gray-100 p-6 transition-shadow hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">{c.icon}</span>
                <h3 className="mt-4 text-base font-bold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ HOME en detalle — fondo claro tintado verde ════════ */}
      <section className="bg-brand-50 px-6 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-700">GoLegit Home · para el hogar</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">El trabajo de casa particular, en regla</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-light">
              Si tienes una trabajadora de casa particular, asesora del hogar o cuidador/a: contrato, liquidaciones mensuales
              con todas las cotizaciones (AFP, salud, Previred), asistencia y finiquito — todo por
              WhatsApp, cumpliendo la Ley 20.786.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {["Contrato puertas adentro o afuera", "Liquidación mensual automática", "Finiquito con indemnizaciones", "Registro ante la DT"].map((x) => (
                <li key={x} className="flex items-center gap-2 text-sm text-ink"><Dot /> {x}</li>
              ))}
            </ul>
            <a href="https://home.golegit.cl" className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:gap-2.5">Ir a GoLegit Home <Arrow /></a>
          </div>
          <ComoFunciona color="brand" pasos={["Escribes al WhatsApp de GoLegit", "Respondes preguntas simples sobre el trabajo", "Recibes el contrato listo para firmar"]} />
        </div>
      </section>

      {/* ════════ BUSINESS en detalle — fondo OSCURO (alterna ritmo) ════════ */}
      <section className="bg-ink-deep px-6 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ComoFunciona color="indigo" dark pasos={["Cargas tu empresa con el RUT", "Haces el diagnóstico de datos en 5 min", "Recibes tus documentos listos"]} />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.72 0.18 277)" }}>GoLegit Business · para la empresa</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">Tu empresa en regla, sin complicaciones</h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Sea una SpA, Ltda o EIRL: cumplimiento de la nueva Ley de Datos 21.719 (vigente desde
              diciembre 2026), gobierno societario — juntas, directorio, libro de accionistas — y
              contratos con firma electrónica.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {["Cumplimiento Ley 21.719", "Actas de juntas y directorio", "Libro de accionistas al día", "Contratos + firma FES"].map((x) => (
                <li key={x} className="flex items-center gap-2 text-sm text-white/80"><Dot indigo /> {x}</li>
              ))}
            </ul>
            <a href="https://business.golegit.cl" className="mt-7 inline-flex items-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:gap-2.5" style={{ background: "oklch(0.55 0.23 277)" }}>Ir a GoLegit Business <Arrow /></a>
          </div>
        </div>
      </section>

      {/* ════════ VALIDEZ LEGAL + FAQ — fondo claro ════════ */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-700">Por qué confiar</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">Documentos con validez legal real</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-light">
            Todo lo que GoLegit genera usa firma electrónica simple (Ley 19.799): cada firma queda
            registrada con quién firmó, cuándo y desde dónde, con respaldo probatorio ante la
            autoridad. No son plantillas sin valor — son documentos que sostienen.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-gray-100 p-6">
              <p className="text-sm font-bold text-ink">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink-deep px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-xs text-white/55 sm:flex-row sm:text-left">
          <p>GoLegit · Cubillos Lama SpA · RUT 78.393.969-K</p>
          <div className="flex items-center gap-5">
            <a href="https://home.golegit.cl" className="hover:text-white">Home</a>
            <a href="https://business.golegit.cl" className="hover:text-white">Business</a>
            <Link href="/privacidad" className="hover:text-white">Privacidad</Link>
            <Link href="/terminos" className="hover:text-white">Términos</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── "Cómo funciona" card ── */
function ComoFunciona({ pasos, color, dark }: { pasos: string[]; color: "brand" | "indigo"; dark?: boolean }) {
  const bg = dark ? "bg-white/[0.04] border border-white/10" : "bg-white border border-gray-100 shadow-sm";
  const txt = dark ? "text-white" : "text-ink";
  const eyebrow = color === "brand" ? "text-brand-700" : "";
  return (
    <div className={`rounded-3xl p-8 ${bg}`}>
      <p className="text-xs font-bold uppercase tracking-widest" style={color === "indigo" ? { color: "oklch(0.72 0.18 277)" } : undefined}>
        <span className={eyebrow}>Cómo funciona</span>
      </p>
      <ol className="mt-5 space-y-5">
        {pasos.map((p, i) => (
          <li key={i} className={`flex items-start gap-4 ${txt}`}>
            <Step n={i + 1} indigo={color === "indigo"} />
            <span className="pt-0.5 text-sm leading-relaxed">{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Datos ── */
const COMUNES = [
  { t: "Lo hacemos por ti", d: "Documentos listos, no listas de pendientes que te estresan.", icon: <IconCheck /> },
  { t: "Validez legal real", d: "Firma electrónica Ley 19.799, con respaldo probatorio.", icon: <IconShield /> },
  { t: "Sin susto", d: "Recordatorios amables a tiempo, nunca amenazas de multa.", icon: <IconBell /> },
  { t: "Hecho en Chile", d: "Diseñado por abogados, según la ley chilena vigente.", icon: <IconFlag /> },
];
const FAQ = [
  { q: "¿Los documentos tienen valor legal?", a: "Sí. Usan firma electrónica simple (Ley 19.799) y plantillas hechas por abogados según la ley chilena." },
  { q: "¿Necesito instalar algo?", a: "No. Home funciona por WhatsApp; Business desde el navegador. Sin apps ni instalaciones." },
  { q: "¿Cuánto cuesta?", a: "Ambos tienen una versión gratuita. Solo pagas si quieres que gestionemos el papeleo por ti." },
];

/* ── Átomos ── */
function Dot({ indigo }: { indigo?: boolean }) {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: indigo ? "oklch(0.65 0.20 277)" : "var(--gl-green-500, #22c55e)" }} />;
}
function Arrow() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
function Step({ n, indigo }: { n: number; indigo?: boolean }) {
  return <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: indigo ? "oklch(0.55 0.23 277)" : "var(--gl-green-600, #16a34a)" }}>{n}</span>;
}
function IconCheck() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>; }
function IconShield() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>; }
function IconBell() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg>; }
function IconFlag() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" /></svg>; }
