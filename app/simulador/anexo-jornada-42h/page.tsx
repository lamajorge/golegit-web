import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnexoJornadaClient from "./AnexoJornadaClient"

const OG_TITLE = "Anexo gratis de jornada 42h (Ley 21.561) — GoLegit"
const OG_DESC = "Genera el anexo de adecuación de jornada laboral de tu trabajadora de casa particular a las 42 horas semanales (Ley 21.561). Gratis, sin registro, descarga directa a PDF."
const OG_IMG = "https://golegit.cl/i/novedad-jornada-42h.jpg"
const OG_URL = "https://golegit.cl/simulador/anexo-jornada-42h"

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
  alternates: { canonical: OG_URL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: OG_URL,
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: [OG_IMG],
  },
}

export default function AnexoJornada42hPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* CSS print — solo el preview se imprime, todo lo demás oculto.
          Visibility:hidden + revertir en #anexo-preview es más robusto
          que toggle de display en cada elemento. */}
      <style>{`
        @media print {
          @page { size: A4; margin: 18mm 18mm 18mm 18mm; }
          html, body { background: white !important; }
          body * { visibility: hidden !important; }
          #anexo-preview, #anexo-preview * { visibility: visible !important; }
          #anexo-preview {
            position: absolute !important;
            left: 0; top: 0; right: 0;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: 0 !important;
            border-radius: 0 !important;
          }
          /* Evitar que el bloque de firmas se corte entre páginas */
          #anexo-preview .firmas-bloque {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          /* Bloque atómico: cláusula QUINTO + firmas. Si no entra en la
             página actual, salta entero a la siguiente. Evita firmas huérfanas
             en página aparte y cortes a media firma. */
          #anexo-preview .bloque-cierre-firmas {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
      <div className="print:hidden">
        <Navbar />
      </div>

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
