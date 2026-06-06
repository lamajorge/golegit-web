import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoLegit Design System",
  robots: { index: false, follow: false },
};

/* ============================================================================
   /design-system — Showcase vivo del GoLegit Design System (GDS).
   Personalidad "Confianza cálida". Referencia navegable de tokens + patrones.
   Esta página SÍ usa utilidades de token directo (es el showcase). En el resto
   de la app rige la regla de oro: nada de color crudo en features.
   ============================================================================ */

function Swatch({ cls, name, note }: { cls: string; name: string; note?: string }) {
  return (
    <div className="w-[92px]">
      <div className={`h-14 rounded-[10px] border border-black/5 shadow-xs ${cls}`} />
      <div className="mt-1.5 text-2xs font-semibold text-ink">{name}</div>
      {note && <div className="text-2xs text-ink-faint">{note}</div>}
    </div>
  );
}

function Badge({ tone, children }: { tone: string; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    success: "bg-green-50 text-green-700 border-green-200",
    info: "bg-[oklch(0.96_0.025_230)] text-[oklch(0.48_0.12_230)] border-[oklch(0.90_0.05_230)]",
    warn: "bg-[oklch(0.97_0.04_80)] text-[oklch(0.50_0.12_70)] border-[oklch(0.90_0.07_80)]",
    danger: "bg-[oklch(0.96_0.03_25)] text-[oklch(0.50_0.18_25)] border-[oklch(0.90_0.06_25)]",
    sand: "bg-sand-soft text-sand-deep border-[oklch(0.86_0.05_78)]",
    neutral: "bg-surface-sunken text-ink-muted border-border",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-2xs font-semibold ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="bg-surface text-ink font-sans">
      {/* ── HERO (Expressive) ── */}
      <section className="relative overflow-hidden bg-ink-deep px-6 py-28 text-[oklch(0.97_0.01_120)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 18% 22%, oklch(0.627 0.170 149 / .28) 0%, transparent 62%), radial-gradient(45% 50% at 92% 88%, oklch(0.700 0.085 62 / .14) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-[oklch(0.92_0.02_120)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            GoLegit Design System · &quot;Confianza cálida&quot;
          </span>
          <h1 className="mt-5 font-display text-display font-semibold tracking-tight">
            Tu hogar, <span className="italic text-green-400">en regla</span>.<br />
            Sin complicaciones.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[oklch(0.88_0.015_120)]">
            Un sistema, dos registros. Esta página es la referencia viva de tokens y
            patrones — Fraunces para titulares, Plus Jakarta Sans para la interfaz, paleta
            OKLCH y motion con física.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <a className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 hover:bg-[var(--gl-primary-hover)]">
              Botón primario
            </a>
            <a className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]">
              Botón ghost
            </a>
          </div>
        </div>
      </section>

      {/* ── TOKENS ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <span className="text-2xs font-bold uppercase tracking-[0.14em] text-green-600">Design tokens · OKLCH</span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">La paleta &quot;Confianza cálida&quot;</h2>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Verde de marca anclado en evergreen profundo, superficies cálidas en 3 niveles y una
          segunda voz arena. Todo en OKLCH, con token-swap listo para GoLegit Business.
        </p>

        <h3 className="mt-9 mb-2 text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Verde · señal de marca</h3>
        <div className="flex flex-wrap gap-3">
          <Swatch cls="bg-green-100" name="green-100" />
          <Swatch cls="bg-green-300" name="green-300" />
          <Swatch cls="bg-green-500" name="green-500" note="señal" />
          <Swatch cls="bg-green-600" name="green-600" note="acción" />
          <Swatch cls="bg-green-700" name="green-700" />
          <Swatch cls="bg-green-900" name="green-900" />
        </div>

        <h3 className="mt-8 mb-2 text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Ancla · evergreen + arena</h3>
        <div className="flex flex-wrap gap-3">
          <Swatch cls="bg-ink-deep" name="ink-deep" note="hero/footer" />
          <Swatch cls="bg-ink" name="ink" note="texto" />
          <Swatch cls="bg-ink-muted" name="ink-muted" />
          <Swatch cls="bg-sand" name="sand" />
          <Swatch cls="bg-sand-deep" name="sand-deep" note="acento" />
        </div>

        <h3 className="mt-8 mb-2 text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Superficie · 3 niveles</h3>
        <div className="flex overflow-hidden rounded-[14px] border border-border shadow-sm">
          <div className="flex-1 bg-surface p-7 text-xs font-semibold text-ink-muted">surface<br /><span className="font-normal">fondo de página</span></div>
          <div className="flex-1 bg-surface-card p-7 text-xs font-semibold text-ink-muted">surface-card<br /><span className="font-normal">tarjeta</span></div>
          <div className="flex-1 bg-surface-sunken p-7 text-xs font-semibold text-ink-muted">surface-sunken<br /><span className="font-normal">hundido</span></div>
        </div>
      </section>

      {/* ── TIPOGRAFÍA ── */}
      <section className="border-t border-border bg-surface-sunken/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <span className="text-2xs font-bold uppercase tracking-[0.14em] text-green-600">Tipografía</span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">Fraunces (display) + Plus Jakarta Sans (UI)</h2>
          <div className="mt-8 space-y-3">
            <p className="font-display text-display font-semibold leading-none">text-display · Fraunces</p>
            <p className="text-3xl font-extrabold tracking-tight">text-3xl · cifra / sección</p>
            <p className="text-2xl font-extrabold tracking-tight">text-2xl · H1 de producto</p>
            <p className="text-lg">text-lg · subtítulo</p>
            <p className="text-sm">text-sm · cuerpo por defecto en producto</p>
            <p className="text-2xs font-semibold uppercase tracking-wide text-ink-muted">text-2xs · label / eyebrow</p>
            <p className="font-mono text-sm tabular-nums">font-mono · $685.065 · 12.345.678-9</p>
          </div>
        </div>
      </section>

      {/* ── PRIMITIVOS (muestra) ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <span className="text-2xs font-bold uppercase tracking-[0.14em] text-green-600">Primitivos</span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">Botones, badges, KPI y alertas</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[14px] border border-border bg-surface-card p-6 shadow-sm">
            <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-2xs font-bold uppercase tracking-wide text-green-700">Button + Badge</span>
            <div className="my-5 flex flex-wrap gap-3">
              <button className="rounded-[10px] bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-transform hover:-translate-y-0.5">Primario</button>
              <button className="rounded-[10px] border border-border bg-surface-card px-4 py-2 text-sm font-semibold text-ink shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-surface-sunken">Secundario</button>
              <button className="rounded-[10px] bg-sand-deep px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Acento</button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Badge tone="success">Firmado</Badge>
              <Badge tone="info">Vigente</Badge>
              <Badge tone="warn">Pendiente firma</Badge>
              <Badge tone="danger">Vencido</Badge>
              <Badge tone="sand">Asistido</Badge>
              <Badge tone="neutral">Borrador</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[14px] border border-border bg-surface-card p-5 shadow-xs">
                <div className="text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Líquido del mes</div>
                <div className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight">$685.065</div>
                <div className="mt-1 text-xs text-ink-muted"><span className="font-semibold text-success">▲ exacto</span> · María Isabel</div>
              </div>
              <div className="rounded-[14px] border border-border bg-surface-card p-5 shadow-xs">
                <div className="text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Costo empleador</div>
                <div className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight">$939.331</div>
                <div className="mt-1 text-xs text-ink-muted">incluye aportes Previred</div>
              </div>
            </div>
            <div className="flex gap-3 rounded-[10px] border border-[oklch(0.90_0.07_80)] bg-[oklch(0.98_0.025_80)] px-4 py-3.5 text-sm text-[oklch(0.42_0.10_65)]">
              <span className="text-base">⚠️</span>
              <div><strong className="font-bold">Contrato por vencer.</strong> El plazo fijo de Rosa termina en 3 días. Genera la renovación o el finiquito antes del vencimiento.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-14 text-center text-xs text-ink-faint">
        GoLegit Design System · personalidad &quot;Confianza cálida&quot; · Fraunces + Plus Jakarta Sans · tokens OKLCH<br />
        Fuente de verdad: <code className="font-mono">@golegit/tokens</code> · spec en <code className="font-mono">golegit/.claude/strategy/design-system.md</code>
      </footer>
    </main>
  );
}
