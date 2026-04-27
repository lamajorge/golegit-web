---
name: content-manager
description: Gestiona el contenido del sitio web — publicación de posts en Notion, ISR, simuladores, SEO y coordinación con el ecosistema GoLegit.
---

# Content Manager Agent

## Contexto

`web` es la landing pública de GoLegit. El contenido se gestiona principalmente vía Notion (blog y recursos). Los simuladores y la landing tienen contenido hardcodeado en código.

## Publicar un artículo en el blog

Protocolo paso a paso completo en `rules/novedades-publicar.md` (siempre cargado en contexto al trabajar en `app/novedades/**`). Estilo editorial en `rules/novedades-style.md`.

Resumen del flujo:
1. Verificar slug único (búsqueda Notion).
2. Generar imagen DALL-E (`scripts/generate-cms-images.mjs`).
3. Crear page Notion vía MCP (`notion-create-pages`) con `Resumen` y `date:Fecha:start`.
4. Revalidar ISR (`/api/revalidate?token=...`).
5. Verificar en producción.

Categorías disponibles: `Laboral`, `Remuneraciones`, `Contratos`, `Previsión`, `General`, `Novedades`.

## Actualizar precios en la landing

Los precios están hardcodeados en `/app/page.tsx` (sección Pricing) y posiblemente en `/app/business/page.tsx`.

Si cambian los planes en `golegit`:
1. Actualizar los precios en `/app/page.tsx` sección Pricing
2. Actualizar en `/app/business/page.tsx` si aplica
3. Verificar que el texto de features por plan sigue siendo correcto

Planes actuales (mensual / anual): Lite $6.990 / $5.990, Pro $11.990 / $9.990, Plus $21.990 / $17.990. Anual ahorra hasta 18%.

## Actualizar tasas en los simuladores

Las tasas están hardcodeadas en `app/simulador/`. Si cambian oficialmente:
1. Actualizar las constantes en el simulador
2. Verificar contra el panel (`golegit-panel` → `/previred`) para confirmar el valor vigente
3. Coordinar con Jorge para confirmar que el cambio legal es definitivo

## SEO — metadatos

Cada ruta tiene sus propios metadatos Open Graph. Para nuevas páginas:
```typescript
export const metadata: Metadata = {
  title: 'Título página | GoLegit',
  description: 'Descripción 150-160 caracteres',
  openGraph: { ... },
  twitter: { card: 'summary_large_image', ... },
}
```

`next-sitemap` genera el sitemap automáticamente en el build. Las nuevas rutas se incluyen solas.

## URL shortener

El bot de GoLegit genera URLs `go.golegit.cl/XXXXX` → estas redirigen a PDFs en Supabase Storage. La tabla `url_cortas` en Supabase es la fuente de verdad. Para crear una URL corta manualmente (raro):

```sql
INSERT INTO url_cortas (codigo, url_destino)
VALUES ('XXXXX', 'https://storage.supabase.co/...');
```

## Verificador de documentos `/verificar`

Permite verificar la autenticidad de un documento GoLegit por código. El código está en el PDF generado. El endpoint verifica contra `archivos` en Supabase.

## Headers de seguridad

Configurados en `vercel.json`:
- `X-Frame-Options: DENY` — previene clickjacking
- `Permissions-Policy` — desactiva cámara/mic en landing (los simuladores no los usan)

Si se agrega una funcionalidad que usa cámara (poco probable en `web`), ajustar `Permissions-Policy`.
