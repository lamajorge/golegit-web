---
description: Protocolo paso a paso para publicar una novedad o recurso en Notion CMS. Lee también novedades-style.md (estilo editorial) antes de redactar.
globs:
  - "app/novedades/**"
  - "app/recursos/**"
  - "scripts/generate-cms-images.mjs"
---

# Protocolo de publicación — Novedades y Recursos

Sigue este flujo **completo y en orden**. Saltar pasos genera bugs documentados (slug duplicado, contenido no revalidado, imagen sin generar).

## Antes de redactar

Lee `novedades-style.md` (estilo editorial). Resumen rápido:

- Apertura directa al lector con condicional ("Si tienes un contrato vigente..."), nunca narrativo ("El [fecha], la Corte de Apelaciones...").
- Headings funcionales (`##`), no anzuelos.
- Bold parco (solo cifras y conceptos críticos).
- Referencias legales exactas (`Art. 22 CT`, `Ley 21.561`, `Dictamen N°236/9 DT`).
- Footnote final en cursiva con fuente + breve mención de cómo GoLegit lo aplica. **Sin CTA comercial, sin pricing, sin "trial gratis 30 días".**
- Slug kebab-case corto y SEO-friendly.

## Paso 1 — Verificar que el slug NO esté duplicado (CRÍTICO)

Antes de crear, busca en la DB de Notion si ya existe otro post con el slug que vas a usar:

```
notion-search query="[título o tema]"
data_source_url="collection://dc3931e2-054c-4bde-8f5e-85990e4c022b"  # Novedades
# o
data_source_url="collection://<id-recursos>"  # Recursos: fb8a6638e12e4d6abc288856a0ea4640
```

**Si hay un post existente con el mismo slug**, cambiá el slug del nuevo a algo diferenciable (ej. añadiendo `-vigente-2026`, `-actualizacion-mayo`, etc.).

**Por qué importa**: la web sirve el primer post que encuentra con ese slug y los demás quedan inaccesibles. Genera confusión y pérdida de SEO.

**Anti-patrón documentado (26-abr-2026)**: dos posts coexistiendo con slug `jornada-42-horas-abril-2026` (uno anticipatorio del 5-abr, otro de la fecha de vigencia el 26-abr) provocaron que la web mostrara siempre el viejo. Solución correcta: el post nuevo cambia su slug a `jornada-42-horas-vigente-2026`. **Nunca despublicar el post viejo para liberar el slug** — eso pierde SEO/contenido.

## Paso 2 — Generar la imagen de portada

Las imágenes se generan con DALL-E 3 vía script. **No usar Unsplash** (estilo inconsistente).

```bash
# Agregar entrada al array IMAGES en scripts/generate-cms-images.mjs
# con filename y prompt (ver estilo en otras entradas)
node scripts/generate-cms-images.mjs novedad-tu-slug.jpg
```

Costo: ~$0.08 por imagen. Si la imagen ya existe en el bucket `cms-images`, reusa el archivo (no es necesario regenerar).

URL pública resultante:

```
https://domdefqcsiqkdpuchjtu.supabase.co/storage/v1/object/public/cms-images/novedad-tu-slug.jpg
```

Detalles completos: ver memoria `reference_cms_workflow.md` (sección "Generación con DALL-E 3").

## Paso 3 — Crear la page en Notion

Usar `notion-create-pages` con MCP de Notion:

```yaml
parent: { type: "data_source_id", data_source_id: "dc3931e2-054c-4bde-8f5e-85990e4c022b" }
cover: <URL pública del paso 2>
properties:
  Título: "Título del post"
  Slug: "slug-unico-y-corto"          # verificado en paso 1
  Categoría: "Laboral"                  # o Remuneraciones / Contratos / Previsión / General / Novedades
  Publicado: "__YES__"                  # string literal, NO booleano
  Resumen: "~200 caracteres del gancho..."   # NO olvidar — aparece en la tarjeta del listado
  date:Fecha:start: "2026-04-26"        # ISO date — usar la propiedad expandida (NO solo "Fecha")
content: <markdown del artículo>
```

**Notas críticas:**

- `Resumen` debe completarse al crear; un post sin resumen aparece sin gancho en `/novedades`.
- Usar **`date:Fecha:start`**, no `Fecha` (la API requiere la propiedad expandida).
- Usar **`__YES__`** literal (string), no booleano `true`.
- Notion Markdown soporta links `[texto](url)`, tablas con `<table header-row="true">`, blockquotes, listas. Ver spec: `notion://docs/enhanced-markdown-spec`.

## Paso 4 — Revalidar ISR

Las páginas usan ISR con `revalidate = 3600` (1 hora). Para forzar update inmediato:

```
GET https://golegit.cl/api/revalidate?token=REVALIDATE_SECRET
```

`REVALIDATE_SECRET` está en Vercel → Settings → Environment Variables del proyecto `web`. Respuesta esperada: `{"revalidated":true,"now":...}`.

El endpoint invalida `/novedades`, `/novedades/[slug]`, `/recursos`, `/recursos/[slug]`.

## Paso 5 — Verificación

1. Hard refresh en `https://golegit.cl/novedades` — el nuevo post debe aparecer arriba (orden por fecha desc).
2. Visitar `https://golegit.cl/novedades/<tu-slug>` — wording correcto, cover visible, links funcionales.
3. Si sigue viejo, verificá:
   - **Slug duplicado** (paso 1).
   - Browser cache (probar en incognito).
   - El revalidate respondió `{"revalidated":true}` (revisar status del endpoint).

## Editar un post existente

Usar `notion-update-page` con:

- `command="update_properties"` para cambiar metadata (Título, Resumen, Categoría, Slug, Publicado, Fecha).
- `command="replace_content"` para reemplazar el cuerpo entero.

Después revalidar ISR (paso 4).

**Importante**: si cambiás propiedades como `Resumen` o `Slug`, asegurate de incluirlas explícitamente en `properties` — un `update_properties` parcial NO toca lo que no listás.

## IDs de DBs y datos clave

```
Notion DB Novedades:    b844dffae5ca4ee8983d5ee3d098a70b
Notion DS Novedades:    collection://dc3931e2-054c-4bde-8f5e-85990e4c022b
Notion DB Recursos:     fb8a6638e12e4d6abc288856a0ea4640
Supabase bucket:        cms-images (público)
URL imágenes:           https://domdefqcsiqkdpuchjtu.supabase.co/storage/v1/object/public/cms-images/<archivo>
Endpoint revalidate:    https://golegit.cl/api/revalidate?token=REVALIDATE_SECRET
Script imágenes:        web/scripts/generate-cms-images.mjs
OpenAI key local:       /tmp/oai_key.txt (o env OPENAI_API_KEY)
```

## Categorías disponibles

`Laboral`, `Remuneraciones`, `Contratos`, `Previsión`, `General`, `Novedades`.

## Anti-patrones (errores reales documentados)

- ❌ **Crear un post sin verificar que el slug sea único** → la web sirve el más antiguo, el nuevo queda inaccesible. *26-abr-2026*: pasó con `jornada-42-horas-abril-2026`.
- ❌ **Despublicar un post viejo para liberar slug** → pérdida de SEO/contenido valioso. Si dos posts deben coexistir con temas relacionados, cada uno tiene su propio slug único.
- ❌ **Olvidar `Resumen`** → tarjeta sin gancho en el listado, mala conversión.
- ❌ **Olvidar revalidar ISR después de editar** → contenido tarda hasta 1h en aparecer.
- ❌ **Usar `Fecha` en lugar de `date:Fecha:start`** → la propiedad no se setea, post sale sin fecha.
- ❌ **Usar Unsplash o imágenes stock** en vez de DALL-E — estilo visual inconsistente con el resto del sitio.
- ❌ **CTA comercial dentro del cuerpo** ("Trial gratis 30 días", botón al portal) — viola el estilo editorial. La footnote en cursiva con mención breve es la única referencia permitida a GoLegit.

## Referencias

- Estilo editorial: `novedades-style.md`
- Infraestructura CMS (envvars, ISR, imágenes): `cms.md`
- Workflow detallado de imágenes con DALL-E: `memory/reference_cms_workflow.md`
