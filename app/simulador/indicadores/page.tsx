import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import IndicadoresClient, { type Indicador, type AfpTasa } from './IndicadoresClient'

export const revalidate = 3600

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

async function fetchData(): Promise<{ indicadores: Indicador[]; afpTasas: AfpTasa[] }> {
  if (!SUPABASE_URL || !ANON_KEY) return { indicadores: [], afpTasas: [] }
  const h = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` }
  const opts = { next: { revalidate: 3600 } }
  try {
    const [iRes, aRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/indicadores_previsionales?select=*&order=mes.desc&limit=12`, { headers: h, ...opts }),
      fetch(`${SUPABASE_URL}/rest/v1/afps_tasas?select=mes,nombre,tasa_cotizacion,comision_dependiente&order=mes.desc,nombre.asc&limit=100`, { headers: h, ...opts }),
    ])
    const [indicadores, afpTasas] = await Promise.all([
      iRes.ok ? iRes.json() : [],
      aRes.ok ? aRes.json() : [],
    ])
    return {
      indicadores: Array.isArray(indicadores) ? indicadores : [],
      afpTasas: Array.isArray(afpTasas) ? afpTasas : [],
    }
  } catch {
    return { indicadores: [], afpTasas: [] }
  }
}

export default async function IndicadoresPage() {
  const { indicadores, afpTasas } = await fetchData()

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      <div className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse 60% 60% at 90% 40%, rgba(187,247,208,0.20) 0%, transparent 60%)`,
        }} />
        <div className="relative max-w-3xl mx-auto px-6">
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
            Valores oficiales Previred para trabajadores de casa particular.
            Se actualizan automáticamente cada mes.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <IndicadoresClient indicadores={indicadores} afpTasas={afpTasas} />
      </div>

      <Footer />
    </main>
  )
}
