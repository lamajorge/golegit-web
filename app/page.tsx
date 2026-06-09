import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// Landing-PARAGUAS de marca GoLegit (apex golegit.cl). Presenta la marca madre y
// bifurca a los dos productos: Home (TCP) y Business (PYME). Conserva la autoridad
// SEO en el apex (no redirige a un subdominio). Metadata propia de marca —
// sobreescribe la del layout (que sigue siendo TCP por compat con /simulador, etc.).
export const metadata: Metadata = {
  title: "GoLegit — El aliado legal que descomplica",
  description:
    "Software legal chileno que se encarga del papeleo por ti. Para tu hogar (trabajadoras de casa particular) y para tu empresa (PYME): contratos, cumplimiento y firma electrónica, sin complicaciones.",
  alternates: { canonical: "https://golegit.cl" },
  openGraph: {
    title: "GoLegit — El aliado legal que descomplica",
    description: "Para tu hogar y para tu empresa: lo legal, resuelto. Sin enredos, del lado tuyo.",
    url: "https://golegit.cl",
    siteName: "GoLegit",
  },
};

export default function ParaguasLanding() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="flex h-16 items-center px-6 md:px-10">
        <Image src="/logo/golegit-logo.svg" alt="GoLegit" width={108} height={28} priority />
      </header>

      {/* Hero de marca */}
      <section className="relative overflow-hidden px-6 py-20 text-center md:px-10 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(55% 45% at 50% 0%, var(--gl-green-200, #bbf7d0) 0%, transparent 60%)", opacity: 0.5 }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            Lo legal, resuelto.<br /><span className="text-brand-600">Del lado tuyo.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-light">
            GoLegit se encarga del papeleo legal por ti — sin enredos, sin susto. Elige por dónde empezar:
          </p>
        </div>
      </section>

      {/* Bifurcación a los dos productos */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          <a
            href="https://home.golegit.cl"
            className="group flex flex-col rounded-3xl border border-brand-200 bg-white p-8 transition-shadow hover:shadow-lg"
          >
            <Image src="/logo/golegit-logo.svg" alt="GoLegit Home" width={120} height={30} />
            <h2 className="mt-6 font-display text-2xl font-bold text-ink">Para tu hogar</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-light">
              ¿Tienes a alguien trabajando en tu casa? Contrato, liquidaciones, asistencia y
              finiquito de tu trabajador/a de casa particular — todo por WhatsApp, cumpliendo la ley.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all group-hover:gap-2.5">
              Ir a GoLegit Home →
            </span>
          </a>

          <a
            href="https://business.golegit.cl"
            className="group flex flex-col rounded-3xl border p-8 transition-shadow hover:shadow-lg"
            style={{ borderColor: "oklch(0.90 0.05 256)", background: "#fff" }}
          >
            <Image src="/logo/golegit-business-logo.svg" alt="GoLegit Business" width={140} height={35} />
            <h2 className="mt-6 font-display text-2xl font-bold text-ink">Para tu empresa</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-light">
              ¿Tienes una PYME o SpA? Cumplimiento de la Ley de Datos 21.719, gobierno societario,
              contratos y firma electrónica. Te decimos qué te toca y lo dejamos listo.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5" style={{ color: "oklch(0.50 0.20 256)" }}>
              Ir a GoLegit Business →
            </span>
          </a>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-ink-light">
          Un mismo aliado, dos productos. GoLegit existe para simplificarte lo legal — no para
          sumarte una complicación.
        </p>
      </section>

      <footer className="border-t border-brand-100 px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 text-center text-xs text-ink-light sm:flex-row sm:text-left">
          <p>GoLegit · Cubillos Lama SpA · RUT 78.393.969-K</p>
          <div className="flex items-center gap-5">
            <Link href="/privacidad" className="hover:text-ink">Privacidad</Link>
            <Link href="/terminos" className="hover:text-ink">Términos</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
