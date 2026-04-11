"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { Recurso } from "@/lib/notion";
import { categoriaColor, nivelColor, tipoIconPath } from "./utils";

interface Props {
  recursos: Recurso[];
  categorias: string[];
  categoriaActiva: string;
}

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const iconPath = tipoIconPath(recurso.tipo);

  return (
    <Link
      href={`/recursos/${recurso.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-300 hover:shadow-lg hover:shadow-brand-600/6 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Imagen o placeholder */}
      <div className="h-40 overflow-hidden bg-gray-50 flex-shrink-0">
        {recurso.portada ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recurso.portada}
            alt={recurso.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-50 to-blue-50">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.4" opacity="0.5">
              <path d={iconPath} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoriaColor(recurso.categoria)}`}>
            {recurso.categoria}
          </span>
          {recurso.nivel && (
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${nivelColor(recurso.nivel)}`}>
              {recurso.nivel}
            </span>
          )}
        </div>

        <h2 className="text-sm font-semibold text-ink leading-snug mb-2 line-clamp-2 group-hover:text-brand-700 transition-colors">
          {recurso.titulo}
        </h2>

        {recurso.resumen && (
          <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 flex-1">
            {recurso.resumen}
          </p>
        )}

        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-700 group-hover:gap-2 transition-all">
          {recurso.tipo || "Ver recurso"}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function RecursosClient({ recursos, categorias, categoriaActiva }: Props) {
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
              categoriaActiva === cat
                ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                : "bg-white text-ink-muted border-gray-200 hover:border-gray-300 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {recursos.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-ink-muted">No hay recursos en esta categoría todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursos.map((recurso) => (
            <RecursoCard key={recurso.id} recurso={recurso} />
          ))}
        </div>
      )}
    </>
  );
}
