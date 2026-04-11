import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getRecursos, getRecursoCategorias } from "@/lib/notion";
import RecursosClient from "./RecursosClient";

export const revalidate = 3600;

export const metadata = {
  title: "Centro de Conocimiento — Guías y recursos laborales para empleadores — GoLegit",
  description:
    "Guías prácticas, plantillas y referencias legales para empleadores de trabajadoras de casa particular en Chile. Contrato, liquidación, finiquito y más.",
  keywords: [
    "guía contrato trabajadora de casa particular Chile",
    "plantilla liquidación TCP",
    "referencia legal empleada doméstica Chile",
    "cómo hacer contrato asesora de hogar",
    "finiquito trabajadora de casa particular paso a paso",
  ],
  alternates: { canonical: "https://golegit.cl/recursos" },
};

export default async function RecursosPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const categoria = cat && cat !== "Todas" ? cat : undefined;

  if (!process.env.NOTION_TOKEN || !process.env.NOTION_RECURSOS_DB_ID) {
    return (
      <main className="min-h-screen bg-paper">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 pt-36 pb-24 text-center">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-ink mb-3">CMS no configurado</h1>
          <p className="text-ink-muted mb-2 leading-relaxed max-w-md mx-auto">
            Agrega las variables de entorno en Vercel:
          </p>
          <code className="block bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-left max-w-sm mx-auto mb-6">
            NOTION_TOKEN=secret_...<br/>
            NOTION_RECURSOS_DB_ID=fb8a6638e12e4d6abc288856a0ea4640
          </code>
          <Link href="/" className="text-sm text-brand-700 hover:text-brand-800 underline">
            ← Volver al inicio
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const [recursos, categorias] = await Promise.all([
    getRecursos(categoria),
    getRecursoCategorias(),
  ]);

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 pb-14 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 70% at 0% 50%, rgba(74,222,128,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 100% 20%, rgba(74,222,128,0.05) 0%, transparent 55%)
          `,
        }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-brand-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Recursos para empleadores
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Centro de Conocimiento
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-xl">
            Guías prácticas, plantillas y referencias legales para gestionar
            correctamente a tu trabajadora de casa particular.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pt-12 pb-28">
        <RecursosClient
          recursos={recursos}
          categorias={categorias}
          categoriaActiva={cat ?? "Todas"}
        />
      </section>

      <Footer />
    </main>
  );
}
