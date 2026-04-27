import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlockRenderer from "@/components/notion/BlockRenderer";
import { getRecurso, getBlocks } from "@/lib/notion";
import { categoriaColor, nivelColor, tipoIconPath, formatFecha } from "../utils";
import CtaButton from "@/components/CtaButton";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recurso = await getRecurso(slug);
  if (!recurso) return {};
  const url = `https://golegit.cl/recursos/${recurso.slug}`;
  const images = recurso.portada
    ? [{ url: recurso.portada, width: 1200, height: 630, alt: recurso.titulo }]
    : undefined;
  return {
    title: `${recurso.titulo} — GoLegit`,
    description: recurso.resumen,
    alternates: { canonical: url },
    openGraph: {
      title: recurso.titulo,
      description: recurso.resumen,
      url,
      siteName: "GoLegit",
      locale: "es_CL",
      type: "article",
      authors: ["GoLegit"],
      tags: [recurso.categoria, recurso.tipo, recurso.nivel].filter(Boolean) as string[],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: recurso.titulo,
      description: recurso.resumen,
      images: recurso.portada ? [recurso.portada] : undefined,
    },
  };
}

export default async function RecursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recurso = await getRecurso(slug);
  if (!recurso) notFound();

  const blocks = await getBlocks(recurso.id);
  const iconPath = tipoIconPath(recurso.tipo);

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Header */}
      <div className="relative pt-28 pb-0 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse 55% 60% at 5% 50%, rgba(74,222,128,0.07) 0%, transparent 60%)`,
        }} />
        <div className="relative max-w-3xl mx-auto px-6 pb-12">
          <Link href="/recursos"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Centro de Conocimiento
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${categoriaColor(recurso.categoria)}`}>
              {recurso.categoria}
            </span>
            {recurso.nivel && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${nivelColor(recurso.nivel)}`}>
                {recurso.nivel}
              </span>
            )}
            {recurso.tipo && (
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={iconPath} />
                </svg>
                {recurso.tipo}
              </span>
            )}
            {recurso.fecha && (
              <span className="text-xs text-white/30">Actualizado {formatFecha(recurso.fecha)}</span>
            )}
          </div>

          {/* Título */}
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {recurso.titulo}
          </h1>

          {/* Resumen */}
          {recurso.resumen && (
            <p className="text-lg text-white/60 leading-relaxed border-l-2 border-brand-400/50 pl-4">
              {recurso.resumen}
            </p>
          )}
        </div>
      </div>

      {/* Imagen de portada */}
      {recurso.portada ? (
        <div className="max-w-3xl mx-auto px-6 mb-12 -mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recurso.portada}
            alt={recurso.titulo}
            className="w-full h-72 object-cover rounded-2xl shadow-xl"
          />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-6 mb-12 -mt-2">
          <div className="w-full h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
              <path d={iconPath} />
            </svg>
          </div>
        </div>
      )}

      {/* Cuerpo */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        <BlockRenderer blocks={blocks} />
      </article>

      {/* CTAs finales */}
      <div className="max-w-3xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CtaButton className="flex flex-col gap-3 bg-ink text-white rounded-2xl p-6 hover:bg-ink-soft transition-colors group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.7">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p className="font-semibold text-sm mb-1">¿Necesitas ayuda con esto?</p>
              <p className="text-xs text-white/70 leading-relaxed">
                GoLegit lo gestiona por ti, desde WhatsApp.
              </p>
            </div>
            <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
              Comenzar ahora →
            </span>
          </CtaButton>

          <div className="flex flex-col gap-3 bg-brand-50 border border-brand-100 rounded-2xl p-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p className="font-semibold text-sm text-ink mb-1">Más recursos</p>
              <p className="text-xs text-ink-muted leading-relaxed">
                Guías, plantillas y referencias legales para empleadores.
              </p>
            </div>
            <Link href="/recursos" className="text-xs font-medium text-brand-700 hover:text-brand-800 transition-colors">
              Ver Centro de Conocimiento →
            </Link>
          </div>
        </div>

        <Link href="/recursos"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mt-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Ver todos los recursos
        </Link>
      </div>

      <Footer />
    </main>
  );
}
