// Página pública: indicadores previsionales Previred vigentes
// Fuente: indicadores_previsionales (actualizada mensualmente desde el panel)
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const revalidate = 3600

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

const MESES: Record<string, string> = {
  '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
  '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
  '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre',
}

const clp = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')
const pct = (n: number) => (n * 100).toFixed(2).replace('.', ',') + '%'

async function fetchAll() {
  if (!SUPABASE_URL || !ANON_KEY) return { indicadores: [], afps: [] }
  const h = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` }
  const opts = { next: { revalidate: 3600 } }
  try {
    const [iRes, aRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/indicadores_previsionales?select=*&order=mes.desc&limit=6`, { headers: h, ...opts }),
      fetch(`${SUPABASE_URL}/rest/v1/afps_tasas?select=mes,nombre,tasa_cotizacion,comision_dependiente&order=mes.desc,nombre.asc&limit=50`, { headers: h, ...opts }),
    ])
    const [indicadores, afps] = await Promise.all([
      iRes.ok ? iRes.json() : [],
      aRes.ok ? aRes.json() : [],
    ])
    return { indicadores: Array.isArray(indicadores) ? indicadores : [], afps: Array.isArray(afps) ? afps : [] }
  } catch {
    return { indicadores: [], afps: [] }
  }
}

function mesLabel(mes: string) {
  return `${MESES[mes.slice(5, 7)] ?? ''} ${mes.slice(0, 4)}`
}

export default async function IndicadoresPage() {
  const { indicadores, afps } = await fetchAll()
  const vigente = indicadores.find((i: any) => i.vigente) ?? indicadores[0]
  const mesActivo = vigente?.mes

  const afpsMes = afps.filter((a: any) => a.mes === mesActivo)

  const tdCls = 'px-4 py-2.5 text-sm text-ink-muted'
  const thCls = 'px-4 py-2.5 text-xs font-semibold text-ink-light uppercase tracking-wider text-left'

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      <div className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse 60% 60% at 90% 40%, rgba(187,247,208,0.20) 0%, transparent 60%)`,
        }} />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link href="/simulador" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors mb-8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver a simuladores
          </Link>
          <h1 className="text-3xl lg:text-4xl font-light text-ink leading-tight mb-3" style={{ fontFamily: 'var(--font-fraunces)' }}>
            Indicadores previsionales
          </h1>
          <p className="text-ink-muted leading-relaxed max-w-xl">
            Valores oficiales Previred utilizados en los simuladores y liquidaciones GoLegit.
            Se actualizan automáticamente cada mes.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-10">

        {!vigente && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
            No hay indicadores disponibles en este momento. Vuelve pronto.
          </div>
        )}

        {vigente && (
          <>
            {/* ── Indicadores del período vigente ── */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-ink">{mesLabel(vigente.mes)}</h2>
                <span className="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-full">
                  Vigente
                </span>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className={thCls}>Indicador</th>
                      <th className={thCls + ' text-right'}>Valor</th>
                      <th className={thCls}>Fuente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr><td className={tdCls + ' font-medium text-ink'}>UF</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.uf_valor ? clp(Number(vigente.uf_valor)) : '—'}</td><td className={tdCls}>Previred</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>Ingreso Mínimo Mensual (IMM)</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.imm ? clp(vigente.imm) : '—'}</td><td className={tdCls}>DT Chile</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>Tope imponible AFP (90 UF)</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.tope_imponible_afp ? clp(vigente.tope_imponible_afp) : '—'}</td><td className={tdCls}>Previred</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>Tope imponible salud (90 UF)</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.tope_imponible_salud ? clp(vigente.tope_imponible_salud) : '—'}</td><td className={tdCls}>Previred</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>SIS empleador</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.tasa_sis ? pct(Number(vigente.tasa_sis)) : '—'}</td><td className={tdCls}>Previred</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>AFC trabajador (indef.)</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.tasa_afc_trabajador ? pct(Number(vigente.tasa_afc_trabajador)) : '—'}</td><td className={tdCls}>Previred</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>AFC empleador (indef.)</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.tasa_afc_empleador ? pct(Number(vigente.tasa_afc_empleador)) : '—'}</td><td className={tdCls}>Previred</td></tr>
                    {vigente.asig_familiar_tramo_a && <>
                      <tr><td className={tdCls + ' font-medium text-ink'}>Asig. familiar Tramo A (≤ {vigente.asig_familiar_tope_a ? clp(vigente.asig_familiar_tope_a) : '?'})</td><td className={tdCls + ' text-right tabular-nums'}>{clp(vigente.asig_familiar_tramo_a)}/carga</td><td className={tdCls}>DFL 150/1981</td></tr>
                      <tr><td className={tdCls + ' font-medium text-ink'}>Asig. familiar Tramo B (≤ {vigente.asig_familiar_tope_b ? clp(vigente.asig_familiar_tope_b) : '?'})</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.asig_familiar_tramo_b ? clp(vigente.asig_familiar_tramo_b) : '—'}/carga</td><td className={tdCls}>DFL 150/1981</td></tr>
                      <tr><td className={tdCls + ' font-medium text-ink'}>Asig. familiar Tramo C (≤ {vigente.asig_familiar_tope_c ? clp(vigente.asig_familiar_tope_c) : '?'})</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.asig_familiar_tramo_c ? clp(vigente.asig_familiar_tramo_c) : '—'}/carga</td><td className={tdCls}>DFL 150/1981</td></tr>
                    </>}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── Tasas AFP del período vigente ── */}
            {afpsMes.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-ink mb-4">Tasas AFP — {mesLabel(vigente.mes)}</h2>
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className={thCls}>AFP</th>
                        <th className={thCls + ' text-right'}>Cotización total trabajador</th>
                        <th className={thCls + ' text-right'}>Comisión AFP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {afpsMes.map((a: any) => (
                        <tr key={a.nombre}>
                          <td className={tdCls + ' font-medium text-ink'}>{a.nombre}</td>
                          <td className={tdCls + ' text-right tabular-nums'}>{pct(Number(a.tasa_cotizacion))}</td>
                          <td className={tdCls + ' text-right tabular-nums'}>{pct(Number(a.comision_dependiente))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="px-4 py-3 text-xs text-ink-light border-t border-gray-50">
                    Cotización total = 10% cuenta individual + comisión AFP. Cargo del trabajador.
                  </p>
                </div>
              </section>
            )}

            {/* ── Tasas fijas por ley TCP ── */}
            <section>
              <h2 className="text-lg font-semibold text-ink mb-1">Aportes del empleador — TCP</h2>
              <p className="text-sm text-ink-muted mb-4">Tasas fijas para trabajadores de casa particular. No varían mensualmente.</p>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className={thCls}>Concepto</th>
                      <th className={thCls + ' text-right'}>Tasa</th>
                      <th className={thCls}>Base</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr><td className={tdCls + ' font-medium text-ink'}>SIS — Seg. invalidez y sobrevivencia</td><td className={tdCls + ' text-right tabular-nums'}>{vigente.tasa_sis ? pct(Number(vigente.tasa_sis)) : '—'}</td><td className={tdCls}>Imponible</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>AFC — Seg. cesantía TCP (2,2% + 0,8%)</td><td className={tdCls + ' text-right tabular-nums'}>3,00%</td><td className={tdCls}>Imponible</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>Mutual accidentes del trabajo</td><td className={tdCls + ' text-right tabular-nums'}>0,93%</td><td className={tdCls}>Imponible</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>Cotización adicional (0,9% + 0,1%)</td><td className={tdCls + ' text-right tabular-nums'}>1,00%</td><td className={tdCls}>Imponible</td></tr>
                    <tr><td className={tdCls + ' font-medium text-ink'}>Indemnización a todo evento TCP</td><td className={tdCls + ' text-right tabular-nums'}>1,11%</td><td className={tdCls}>Sueldo base</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ── Historial ── */}
        {indicadores.length > 1 && (
          <section>
            <h2 className="text-lg font-semibold text-ink mb-4">Historial</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className={thCls}>Período</th>
                    <th className={thCls + ' text-right'}>UF</th>
                    <th className={thCls + ' text-right'}>IMM</th>
                    <th className={thCls + ' text-right'}>Tope AFP</th>
                    <th className={thCls + ' text-right'}>SIS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {indicadores.map((i: any) => (
                    <tr key={i.mes} className={i.vigente ? 'bg-brand-50/30' : ''}>
                      <td className={tdCls + ' font-medium text-ink'}>
                        {mesLabel(i.mes)}
                        {i.vigente && <span className="ml-2 text-[10px] font-semibold text-brand-600 bg-brand-50 border border-brand-100 px-1.5 py-0.5 rounded-full">Vigente</span>}
                      </td>
                      <td className={tdCls + ' text-right tabular-nums'}>{i.uf_valor ? clp(Number(i.uf_valor)) : '—'}</td>
                      <td className={tdCls + ' text-right tabular-nums'}>{i.imm ? clp(i.imm) : '—'}</td>
                      <td className={tdCls + ' text-right tabular-nums'}>{i.tope_imponible_afp ? clp(i.tope_imponible_afp) : '—'}</td>
                      <td className={tdCls + ' text-right tabular-nums'}>{i.tasa_sis ? pct(Number(i.tasa_sis)) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <p className="text-xs text-ink-light">
          Fuente: <a href="https://www.previred.com/indicadores-previsionales/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink transition-colors">previred.com</a>.
          {' '}Actualización automática al inicio de cada mes.
        </p>

      </div>
      <Footer />
    </main>
  )
}
