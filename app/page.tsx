import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// Landing-PARAGUAS de marca GoLegit (apex golegit.cl) — CORAZÓN SEO del ecosistema.
// Habla de lo COMÚN entre los dos productos (software legal chileno, firma
// electrónica, "lo hacemos por ti") y entra en cada solución y cómo funciona.
// Captura términos amplios de marca legal que ningún producto específico rankea
// solo, y cruza a Home (TCP) y Business (PYME). Conserva la autoridad SEO en el apex.
export const metadata: Metadata = {
  title: "GoLegit — Software legal chileno: contratos, firma electrónica y cumplimiento",
  description:
    "GoLegit se encarga del papeleo legal por ti, con validez ante la ley chilena. Para tu hogar (trabajadoras de casa particular) y para tu empresa (PYME, SpA): contratos, liquidaciones, firma electrónica (Ley 19.799) y cumplimiento de la Ley de Datos 21.719. Sin enredos.",
  keywords: [
    "software legal Chile",
    "contratos legales online Chile",
    "firma electrónica Chile",
    "firma electrónica simple ley 19.799",
    "cumplimiento legal empresas Chile",
    "ley 21.719 protección de datos",
    "contrato trabajadora de casa particular",
    "liquidación nana",
    "documentos legales empresa SpA",
    "gobierno societario pyme",
    "aliado legal pyme",
    "papeleo legal automatizado Chile",
  ],
  alternates: { canonical: "https://golegit.cl" },
  openGraph: {
    title: "GoLegit — El aliado legal que descomplica",
    description: "Para tu hogar y para tu empresa: lo legal, resuelto. Con validez ante la ley chilena, sin enredos.",
    url: "https://golegit.cl",
    siteName: "GoLegit",
  },
};

export default function ParaguasLanding() {
  return (
    <main className="bg-paper">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 text-center md:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% -5%, var(--gl-green-200, #bbf7d0) 0%, transparent 55%)", opacity: 0.5 }} />
        <Image src="/logo/golegit-logo.svg" alt="GoLegit" width={128} height={32} priority className="relative mx-auto mb-10 animate-fade-up" />
        <div className="relative mx-auto max-w-3xl">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            El aliado legal que descomplica
          </span>
          <h1 className="animate-fade-up animate-delay-100 mt-6 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Lo legal, resuelto.<br /><span className="text-brand-600">Del lado tuyo.</span>
          </h1>
          <p className="animate-fade-up animate-delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-light">
            GoLegit es el software legal chileno que se encarga del papeleo por ti —
            con validez ante la ley, sin enredos. Genera tus documentos, los firma
            electrónicamente y te mantiene en regla, sea en tu hogar o en tu empresa.
          </p>
          <div className="animate-fade-up animate-delay-300 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#productos" className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft">
              Ver las soluciones
            </a>
            <a href="#como-funciona" className="text-sm font-semibold text-ink-muted hover:text-ink">Cómo funciona →</a>
          </div>
        </div>
      </section>

      {/* ── LO COMÚN (el corazón SEO de marca) ── */}
      <section className="border-t border-brand-100 bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink">Un mismo aliado, para todo lo legal</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-light">
              Da igual si tienes a alguien trabajando en tu casa o si llevas una empresa:
              lo que GoLegit hace por ti es lo mismo — y con el mismo respaldo legal.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMUNES.map((c) => (
              <div key={c.t} className="rounded-2xl border border-brand-100 bg-paper/40 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">{c.icon}</span>
                <h3 className="mt-4 text-base font-bold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAS DOS SOLUCIONES (en detalle, con CTA a cada subdominio) ── */}
      <section id="productos" className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold text-ink">Dos soluciones, según lo que necesites</h2>

          {/* Home */}
          <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-3xl border border-brand-200/70 bg-white p-8 md:grid-cols-5 md:p-10">
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">GoLegit Home · para el hogar</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink">El trabajo de casa particular, en regla</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-light">
                Si tienes una nana, asesora del hogar o cuidador/a, GoLegit genera el contrato,
                calcula las liquidaciones mensuales con todas las cotizaciones (AFP, salud, Previred),
                lleva la asistencia y hace el finiquito — todo por WhatsApp, cumpliendo la Ley 20.786.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {["Contrato puertas adentro o afuera", "Liquidación mensual automática", "Finiquito con indemnizaciones", "Registro ante la Dirección del Trabajo"].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm text-ink"><Dot /> {x}</li>
                ))}
              </ul>
              <a href="https://home.golegit.cl" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:gap-2.5 transition-all">
                Ir a GoLegit Home <Arrow />
              </a>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-brand-600/5 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Cómo funciona</p>
                <ol className="mt-3 space-y-3 text-sm text-ink">
                  <li className="flex gap-3"><Step n={1} /> Escribes al WhatsApp de GoLegit</li>
                  <li className="flex gap-3"><Step n={2} /> Respondes preguntas simples sobre el trabajo</li>
                  <li className="flex gap-3"><Step n={3} /> Recibes el contrato listo para firmar</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Business */}
          <div className="mt-6 grid grid-cols-1 items-center gap-8 rounded-3xl border bg-white p-8 md:grid-cols-5 md:p-10" style={{ borderColor: "oklch(0.90 0.06 277 / 0.7)" }}>
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ background: "oklch(0.966 0.022 277)", color: "oklch(0.45 0.20 277)" }}>GoLegit Business · para la empresa</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink">Tu empresa en regla, sin complicaciones</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-light">
                Si tienes una PYME o SpA, GoLegit te pone al día con la nueva Ley de Datos 21.719
                (vigente desde diciembre 2026), lleva tu gobierno societario — juntas, directorio,
                libro de accionistas — y genera tus contratos y documentos con firma electrónica.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {["Cumplimiento Ley 21.719 (datos)", "Actas de juntas y directorio", "Libro de accionistas al día", "Contratos comerciales + firma FES"].map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm text-ink"><Dot indigo /> {x}</li>
                ))}
              </ul>
              <a href="https://business.golegit.cl" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all" style={{ color: "oklch(0.511 0.233 277)" }}>
                Ir a GoLegit Business <Arrow />
              </a>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl p-6" style={{ background: "oklch(0.966 0.022 277 / 0.5)" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.45 0.20 277)" }}>Cómo funciona</p>
                <ol className="mt-3 space-y-3 text-sm text-ink">
                  <li className="flex gap-3"><Step n={1} indigo /> Cargas tu empresa con el RUT</li>
                  <li className="flex gap-3"><Step n={2} indigo /> Haces el diagnóstico de datos en 5 min</li>
                  <li className="flex gap-3"><Step n={3} indigo /> Recibes tus documentos listos</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA / por qué confiar (común) ── */}
      <section id="como-funciona" className="border-t border-brand-100 bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Documentos con validez legal real</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-light">
            Todo lo que GoLegit genera usa firma electrónica simple bajo la Ley 19.799: cada firma
            queda registrada con quién firmó, cuándo y desde dónde, con respaldo probatorio ante la
            Inspección del Trabajo o un tribunal. No son plantillas sin valor — son documentos que
            sostienen frente a la autoridad.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-brand-100 p-6">
              <p className="text-sm font-bold text-ink">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-ink p-10 text-center md:p-14">
          <h2 className="font-display text-3xl font-bold text-white">Empieza por donde lo necesites</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Elige tu solución. En ambas, GoLegit hace el trabajo por ti.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://home.golegit.cl" className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-400 sm:w-auto">
              Para mi hogar (Home)
            </a>
            <a href="https://business.golegit.cl" className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-6 py-3 text-sm font-bold text-white transition-colors sm:w-auto" style={{ background: "oklch(0.511 0.233 277)" }}>
              Para mi empresa (Business)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-100 px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-xs text-ink-light sm:flex-row sm:text-left">
          <p>GoLegit · Cubillos Lama SpA · RUT 78.393.969-K</p>
          <div className="flex items-center gap-5">
            <a href="https://home.golegit.cl" className="hover:text-ink">Home</a>
            <a href="https://business.golegit.cl" className="hover:text-ink">Business</a>
            <Link href="/privacidad" className="hover:text-ink">Privacidad</Link>
            <Link href="/terminos" className="hover:text-ink">Términos</Link>
          </div>
        </div>
      </footer>
    </main>
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

/* ── Átomos visuales ── */
function Dot({ indigo }: { indigo?: boolean }) {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: indigo ? "oklch(0.511 0.233 277)" : "var(--gl-green-500, #22c55e)" }} />;
}
function Arrow() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
function Step({ n, indigo }: { n: number; indigo?: boolean }) {
  return <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: indigo ? "oklch(0.511 0.233 277)" : "var(--gl-green-600, #16a34a)" }}>{n}</span>;
}
function IconCheck() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>; }
function IconShield() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>; }
function IconBell() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg>; }
function IconFlag() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" /></svg>; }
