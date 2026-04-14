---
description: CMS con Notion API — blog, recursos, ISR y revalidación manual
globs:
  - "app/novedades/**"
  - "app/recursos/**"
  - "app/api/revalidate/**"
  - "lib/notion*"
---

# CMS Notion — Blog y Recursos

## Variables de entorno

```
NOTION_TOKEN    ← integration secret de Notion (solo backend, nunca NEXT_PUBLIC_)
NOTION_DB_ID    ← b844dffae5ca4ee8983d5ee3d098a70b (hardcodeado, no cambiar)
```

## Estructura del CMS

```
/novedades          ← lista de artículos del blog
/novedades/[slug]   ← artículo individual
/recursos           ← lista de documentos/guías
/recursos/[slug]    ← documento individual
```

Contenido gestionado 100% desde Notion. Para publicar nuevo contenido → editar en Notion → revalidar ISR.

## ISR — caché de páginas

Las páginas de blog y recursos usan ISR (Incremental Static Regeneration). El contenido de Notion **no se actualiza en tiempo real** — Next.js sirve la versión cacheada.

**Revalidación manual:**
```bash
curl -X POST https://golegit.cl/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "REVALIDATE_SECRET", "path": "/novedades"}'
```

Revalidar después de cada publicación importante en Notion.

## Imágenes de Notion — `remotePatterns` en next.config

Las imágenes de Notion vienen de S3 de AWS con URLs temporales. Ya están configuradas en `next.config`:

```javascript
images: {
  remotePatterns: [
    { hostname: '*.notion.so' },
    { hostname: 's3.us-west-2.amazonaws.com' },
    { hostname: 'unsplash.com' },
    { hostname: '*.supabase.co' },
  ]
}
```

Si se agrega un nuevo origen de imágenes → añadir al `remotePatterns`.

## Categorías del blog

Las novedades tienen categorías: `Laboral`, `Remuneraciones`, `Contratos`, `Previsión`. Las categorías existen como propiedad en Notion.

## Shortener `/[code]`

La ruta dinámica `/[code]` intercepta códigos cortos y redirige según `url_cortas` en Supabase:

```typescript
// app/[code]/page.tsx (o route.ts)
const { data } = await supabase.from('url_cortas').select('url_destino').eq('codigo', code).maybeSingle()
if (!data) notFound()
redirect(data.url_destino)
```

Esta es la **única** interacción de `web` con Supabase, y es de solo lectura.
