import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnexoJornadaClient from "./AnexoJornadaClient"

export const metadata = {
  title: "Generador gratuito de anexo Ley 21.561 (jornada 42h) — GoLegit",
  description:
    "Genera el anexo de adecuación de jornada laboral de tu trabajadora de casa particular a las 42 horas semanales (Ley 21.561). Gratis, descargable a PDF, listo para firmar.",
  keywords: [
    "anexo jornada 42 horas",
    "ley 21.561 trabajadora casa particular",
    "anexo contrato 42 horas",
    "reducción jornada laboral chile",
    "asesora del hogar 42 horas",
  ],
  alternates: { canonical: "https://golegit.cl/simulador/anexo-jornada-42h" },
}

export default function AnexoJornada42hPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* CSS @page para impresión limpia */}
      <style>{`
        @media print {
          @page { size: A4; margin: 18mm 18mm 18mm 18mm; }
          body { background: white; }
        }
      `}</style>
      <Navbar />

      <section className="relative pt-28 pb-10 overflow-hidden print:hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 60% at 10% 50%, rgba(187,247,208,0.32) 0%, transparent 60%),
              radial-gradient(ellipse 45% 45% at 90% 20%, rgba(209,250,229,0.22) 0%, transparent 55%)
            `,
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            Gratis · Sin registro · Descarga directa a PDF
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight mb-3">
            Anexo de adecuación de jornada a{" "}
            <span className="text-brand-600">42 horas semanales</span>
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed">
            Desde el <strong>26 de abril de 2026</strong> rige la jornada de
            42 horas semanales (Ley N° 21.561). Genera el anexo para tu
            trabajadora de casa particular puertas afuera y descárgalo en PDF.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        <AnexoJornadaClient />
      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  )
}
