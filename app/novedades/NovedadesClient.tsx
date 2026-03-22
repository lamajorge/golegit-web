"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Post } from "@/lib/notion";

interface Props {
  posts: Post[];
  categorias: string[];
  categoriaActiva: string;
  categoriaColor: (cat: string) => string;
  formatFecha: (iso: string) => string;
  CoverPlaceholder: React.ComponentType<{ categoria: string }>;
}

export default function NovedadesClient({
  posts,
  categorias,
  categoriaActiva,
  categoriaColor,
  formatFecha,
  CoverPlaceholder,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function setCategoria(cat: string) {
    const url = cat === "Todas" ? pathname : `${pathname}?cat=${encodeURIComponent(cat)}`;
    router.push(url);
  }

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              categoriaActiva === cat || (cat === "Todas" && !categorias.includes(categoriaActiva) && categoriaActiva === "Todas")
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-white text-ink-muted border-gray-200 hover:border-gray-300 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-muted">No hay publicaciones en esta categoría todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/novedades/${post.slug}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-300 hover:shadow-lg hover:shadow-brand-600/6 transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Imagen */}
              <div className="h-44 overflow-hidden bg-gray-50 flex-shrink-0">
                {post.portada ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.portada}
                    alt={post.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <CoverPlaceholder categoria={post.categoria} />
                )}
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-5">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${categoriaColor(post.categoria)}`}>
                    {post.categoria}
                  </span>
                  {post.fecha && (
                    <span className="text-[11px] text-ink-light">{formatFecha(post.fecha)}</span>
                  )}
                </div>

                {/* Título */}
                <h2 className="text-sm font-semibold text-ink leading-snug mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
                  {post.titulo}
                </h2>

                {/* Resumen */}
                {post.resumen && (
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 flex-1">
                    {post.resumen}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-700 group-hover:gap-2 transition-all">
                  Leer más
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
