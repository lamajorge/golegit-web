import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPosts, getCategories } from "@/lib/notion";
import NovedadesClient from "./NovedadesClient";

export const revalidate = 3600; // Revalida cada hora

export const metadata = {
  title: "Novedades — GoLegit",
  description:
    "Alertas laborales, novedades en remuneraciones y actualizaciones legales para empleadores de trabajadoras de casa particular.",
};

const CATEGORIA_COLORS: Record<string, string> = {
  Laboral:       "bg-blue-50  text-blue-700  border-blue-200",
  Remuneraciones:"bg-green-50 text-green-700 border-green-200",
  Contratos:     "bg-purple-50 text-purple-700 border-purple-200",
  Previsión:     "bg-amber-50 text-amber-700 border-amber-200",
  General:       "bg-gray-50  text-gray-600  border-gray-200",
  Novedades:     "bg-brand-50 text-brand-700 border-brand-200",
};

export function categoriaColor(cat: string) {
  return CATEGORIA_COLORS[cat] ?? "bg-gray-50 text-gray-600 border-gray-200";
}

function formatFecha(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}

// Placeholder SVG cuando no hay imagen
function CoverPlaceholder({ categoria }: { categoria: string }) {
  const colors: Record<string, string> = {
    Laboral: "#3b82f6", Remuneraciones: "#16a34a",
    Contratos: "#9333ea", Previsión: "#f59e0b",
    General: "#6b7280", Novedades: "#16a34a",
  };
  const color = colors[categoria] ?? "#16a34a";
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)` }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    </div>
  );
}

export { formatFecha, CoverPlaceholder };

export default async function NovedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const categoria = cat && cat !== "Todas" ? cat : undefined;

  // Si no hay env vars configuradas, mostrar aviso
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ID) {
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
          <h1 className="text-2xl font-light text-ink mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>
            CMS no configurado
          </h1>
          <p className="text-ink-muted mb-6 leading-relaxed max-w-md mx-auto">
            Agrega las variables de entorno <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">NOTION_TOKEN</code> y{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">NOTION_DB_ID</code> para conectar con Notion.
          </p>
          <Link href="/" className="text-sm text-brand-700 hover:text-brand-800 underline">
            ← Volver al inicio
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const [posts, categorias] = await Promise.all([
    getPosts(categoria),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 55% at 5% 50%, rgba(187,247,208,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 95% 20%, rgba(209,250,229,0.18) 0%, transparent 55%)
          `,
        }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            Actualizaciones legales para empleadores
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-ink leading-tight mb-4"
            style={{ fontFamily: "var(--font-fraunces)" }}>
            Novedades
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed max-w-xl">
            Alertas laborales, cambios en remuneraciones y actualizaciones legales
            que te afectan como empleador.
          </p>
        </div>
      </section>

      {/* Filtros + listado */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <NovedadesClient
          posts={posts}
          categorias={categorias}
          categoriaActiva={cat ?? "Todas"}
          categoriaColor={categoriaColor}
          formatFecha={formatFecha}
          CoverPlaceholder={CoverPlaceholder}
        />
      </section>

      <Footer />
    </main>
  );
}
