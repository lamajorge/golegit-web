// Server Component — fetches current indicadores from Supabase and passes to client
import LiquidacionClient from './LiquidacionClient'

export const revalidate = 3600 // revalidar cada hora

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

const MESES: Record<string, string> = {
  '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
  '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
  '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre',
}

type Indicador = {
  mes: string
  uf_valor: number | null
  imm: number | null
  tope_imponible_afp: number | null
  tasa_sis: number | null
  asig_familiar_tramo_a: number | null
  asig_familiar_tope_a: number | null
  asig_familiar_tramo_b: number | null
  asig_familiar_tope_b: number | null
  asig_familiar_tramo_c: number | null
  asig_familiar_tope_c: number | null
}

type AfpTasa = {
  nombre: string
  tasa_cotizacion: number
  comision_dependiente: number
}

async function fetchIndicadores(): Promise<{ ind: Indicador | null; afps: AfpTasa[] }> {
  if (!SUPABASE_URL || !ANON_KEY) return { ind: null, afps: [] }
  try {
    const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` }
    const sel = 'mes,uf_valor,imm,tope_imponible_afp,tasa_sis,asig_familiar_tramo_a,asig_familiar_tope_a,asig_familiar_tramo_b,asig_familiar_tope_b,asig_familiar_tramo_c,asig_familiar_tope_c'

    const indRes = await fetch(
      `${SUPABASE_URL}/rest/v1/indicadores_previsionales?vigente=eq.true&select=${sel}&limit=1`,
      { headers, next: { revalidate: 3600 } }
    )
    const indData = indRes.ok ? await indRes.json() : []
    const ind: Indicador | null = Array.isArray(indData) && indData.length > 0 ? indData[0] : null

    // Filtrar afps_tasas por el mes del indicador vigente directamente en la query
    const mesActivo = ind?.mes
    let afpsFiltered: AfpTasa[] = []
    if (mesActivo) {
      const afpRes = await fetch(
        `${SUPABASE_URL}/rest/v1/afps_tasas?mes=eq.${mesActivo}&select=nombre,tasa_cotizacion,comision_dependiente&order=nombre`,
        { headers, next: { revalidate: 3600 } }
      )
      const afpData = afpRes.ok ? await afpRes.json() : []
      afpsFiltered = Array.isArray(afpData)
        ? afpData.map((r: any) => ({
            nombre: r.nombre,
            tasa_cotizacion: Number(r.tasa_cotizacion),
            comision_dependiente: Number(r.comision_dependiente),
          }))
        : []
    }

    return { ind, afps: afpsFiltered }
  } catch {
    return { ind: null, afps: [] }
  }
}

export default async function LiquidacionPage() {
  const { ind, afps } = await fetchIndicadores()

  const mesLabel = ind?.mes
    ? `${MESES[ind.mes.slice(5, 7)] ?? ''} ${ind.mes.slice(0, 4)}`
    : undefined

  // AFP con comisión como % (comision_dependiente ya viene como decimal)
  const afpsProps = afps.length > 0
    ? afps.map(a => ({ nombre: `AFP ${a.nombre}`, comision: Math.round(a.comision_dependiente * 10000) / 100 }))
    : undefined

  return (
    <LiquidacionClient
      imm={ind?.imm ?? undefined}
      topeImponible={ind?.tope_imponible_afp ?? undefined}
      tasaSis={ind?.tasa_sis ?? undefined}
      mesLabel={mesLabel}
      afps={afpsProps}
    />
  )
}
