'use client'
import { useState } from 'react'
import Link from 'next/link'

const clp = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')
const pct = (n: number) => (n * 100).toFixed(2).replace('.', ',') + '%'

const MESES: Record<string, string> = {
  '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
  '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
  '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre',
}
const mesLabel = (mes: string) =>
  `${MESES[mes.slice(5, 7)] ?? ''} ${mes.slice(0, 4)}`

export type Indicador = {
  mes: string
  uf_valor: number | null
  imm: number | null
  tope_imponible_afp: number | null
  tope_imponible_salud: number | null
  tasa_sis: number | null
  tasa_afc_trabajador: number | null
  tasa_afc_empleador: number | null
  asig_familiar_tramo_a: number | null
  asig_familiar_tope_a: number | null
  asig_familiar_tramo_b: number | null
  asig_familiar_tope_b: number | null
  asig_familiar_tramo_c: number | null
  asig_familiar_tope_c: number | null
  vigente: boolean
}

export type AfpTasa = {
  mes: string
  nombre: string
  tasa_cotizacion: number
  comision_dependiente: number
}

type Props = {
  indicadores: Indicador[]
  afpTasas: AfpTasa[]
}

const Row = ({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) => (
  <div className={`flex items-start justify-between gap-4 py-2.5 ${highlight ? 'border-l-2 border-brand-500 pl-3 -ml-3' : ''}`}>
    <div>
      <p className="text-sm text-ink-muted leading-snug">{label}</p>
      {sub && <p className="text-[11px] text-ink-light mt-0.5">{sub}</p>}
    </div>
    <span className="text-sm font-medium text-ink tabular-nums flex-shrink-0">{value}</span>
  </div>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
    <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-3">{title}</p>
    <div className="divide-y divide-gray-50">{children}</div>
  </div>
)

export default function IndicadoresClient({ indicadores, afpTasas }: Props) {
  const vigente = indicadores.find(i => i.vigente) ?? indicadores[0]
  const [mesSel, setMesSel] = useState(vigente?.mes ?? '')

  const ind = indicadores.find(i => i.mes === mesSel) ?? indicadores[0]
  const afps = afpTasas.filter(a => a.mes === mesSel)

  if (!ind) return (
    <p className="text-sm text-ink-muted py-12 text-center">No hay indicadores disponibles.</p>
  )

  const tramoD_desde = ind.asig_familiar_tope_c
    ? clp(ind.asig_familiar_tope_c + 1)
    : null

  return (
    <div className="space-y-6">

      {/* ── Selector de período ── */}
      <div className="flex items-center gap-3 flex-wrap">
        {indicadores.map(i => (
          <button
            key={i.mes}
            onClick={() => setMesSel(i.mes)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
              i.mes === mesSel
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-ink-muted border-gray-200 hover:border-gray-400 hover:text-ink'
            }`}
          >
            {mesLabel(i.mes)}
            {i.vigente && <span className="ml-1.5 text-[10px] opacity-70">●</span>}
          </button>
        ))}
      </div>

      {/* ── 1. Valores del período ── */}
      <Section title={`Valores del período — ${mesLabel(ind.mes)}`}>
        <Row label="UF" value={ind.uf_valor ? clp(Number(ind.uf_valor)) : '—'} />
        <Row label="Ingreso Mínimo Mensual (IMM)" value={ind.imm ? clp(ind.imm) : '—'} />
        <Row
          label="Tope imponible AFP y salud (90 UF)"
          value={ind.tope_imponible_afp ? clp(ind.tope_imponible_afp) : '—'}
          sub="Límite máximo sobre el que se calculan AFP, salud, SIS y AFC"
        />
      </Section>

      {/* ── 2. Trabajador de Casa Particular ── */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5">
        <p className="text-[11px] font-semibold text-brand-700 uppercase tracking-widest mb-0.5">
          Trabajador de Casa Particular (TCP)
        </p>
        <p className="text-xs text-brand-600 mb-4">
          Aportes del <strong>empleador</strong> a Previred — no se descuentan del sueldo del trabajador
        </p>
        <div className="divide-y divide-brand-100">
          <Row label="SIS — Seguro de Invalidez y Sobrevivencia" value={ind.tasa_sis ? pct(Number(ind.tasa_sis)) : '—'} />
          <Row
            label="AFC — Seguro de Cesantía TCP"
            value="3,00%"
            sub="2,20% cuenta individual + 0,80% fondo solidario · fijo por ley"
          />
          <Row label="Mutual — Accidentes del trabajo y enf. profesional" value="0,93%" sub="0,90% accidentes + 0,03% Ley SANNA" />
          <Row label="Cotización adicional" value="1,00%" sub="0,90% seguro social + 0,10% cuenta individual" />
          <Row
            label="Indemnización a todo evento"
            value="1,11%"
            sub="Base: remuneración mensual imponible · sin tope AFP · Art. 163 CT"
          />
        </div>
      </div>

      {/* ── 3. Cotizaciones del trabajador ── */}
      <Section title="Cotizaciones del trabajador">
        {afps.length > 0 ? afps.map(a => (
          <Row
            key={a.nombre}
            label={`AFP ${a.nombre}`}
            value={pct(Number(a.tasa_cotizacion))}
            sub={`10% obligatorio + ${pct(Number(a.comision_dependiente))} comisión`}
          />
        )) : (
          <Row label="AFP (referencial)" value="~11,27%–11,54%" sub="10% cuenta individual + comisión según AFP elegida" />
        )}
        <Row label="Salud — Fonasa" value="7,00%" sub="Descuento fijo sobre total imponible" />
        <Row label="Salud — Isapre" value="Según plan pactado" sub="Mínimo 7% · el exceso sobre el 7% puede ser cargo del empleador" />
      </Section>

      {/* ── 4. Asignación familiar ── */}
      {ind.asig_familiar_tramo_a && (
        <Section title="Asignación familiar — DFL 150/1981">
          <p className="text-xs text-ink-light pb-3">
            El empleador paga la asignación mensualmente si la trabajadora tiene cargas reconocidas por el IPS.
            Monto recuperado descontándolo de la transferencia a Previred.
            Tramo según renta imponible del trabajador.
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-ink-light uppercase tracking-wider pb-2">
            <span>Tramo</span><span className="text-right">Renta imponible</span><span className="text-right">Por carga</span>
          </div>
          {[
            { tramo: 'A', monto: ind.asig_familiar_tramo_a, desde: null, hasta: ind.asig_familiar_tope_a },
            { tramo: 'B', monto: ind.asig_familiar_tramo_b, desde: ind.asig_familiar_tope_a, hasta: ind.asig_familiar_tope_b },
            { tramo: 'C', monto: ind.asig_familiar_tramo_c, desde: ind.asig_familiar_tope_b, hasta: ind.asig_familiar_tope_c },
            { tramo: 'D', monto: 0, desde: ind.asig_familiar_tope_c, hasta: null },
          ].map(({ tramo, monto, desde, hasta }) => (
            <div key={tramo} className="grid grid-cols-3 gap-2 py-2 border-t border-gray-50 text-sm">
              <span className="font-medium text-ink">Tramo {tramo}</span>
              <span className="text-right tabular-nums text-ink-light text-xs leading-snug">
                {!desde && hasta ? `≤ ${clp(hasta)}` : ''}
                {desde && hasta ? `${clp(desde + 1)} – ${clp(hasta)}` : ''}
                {desde && !hasta ? `> ${clp(desde)}` : ''}
              </span>
              <span className="text-right tabular-nums text-ink-muted">
                {monto ? clp(monto) : '$0'}
              </span>
            </div>
          ))}
          <p className="text-[11px] text-ink-light pt-2">
            La trabajadora tramita sus cargas en el IPS. No aplica Caja de Compensación para TCP.
          </p>
        </Section>
      )}

      <p className="text-xs text-ink-light">
        Fuente: <a href="https://www.previred.com/indicadores-previsionales/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">previred.com</a>.
        {' '}Tasas fijas TCP por ley — no varían mensualmente.
        {' '}<Link href="/simulador/liquidacion" className="underline underline-offset-2 hover:text-ink">Ir al simulador →</Link>
      </p>
    </div>
  )
}
