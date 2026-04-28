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

## Paso 2 — Definir la imagen de portada

**Regla #1: REUTILIZA antes de generar.** El bucket `cms-images` ya tiene 17
imágenes editorial-style hechas con DALL-E 3 (se ven todas en
`scripts/generate-cms-images.mjs`, array `IMAGES`). Si tu nuevo post comparte
temática con uno existente, **reutiliza la misma URL** — no gastes API ni
generes inconsistencia visual.

Mapeo actual de imágenes disponibles (filename → temática):

```
contrato.jpg                       Contratos en general
liquidacion.jpg                    Liquidación / cálculo mensual
finiquito.jpg                      Finiquito / término
finiquito-notario.jpg              Ratificación finiquito ante ministro de fe
checklist.jpg                      Checklists / cumplimiento mensual
vacaciones.jpg                     Vacaciones / feriado
puertas.jpg                        Puertas adentro vs afuera
ley-karin.jpg                      Ley Karin / acoso / clima laboral
examenes.jpg                       Permisos médicos / Art. 66 bis
firma-electronica.jpg              FES / firma digital
novedad-jornada-42h.jpg            Cualquier post sobre Ley 21.561 / jornada
novedad-imm-2026.jpg               IMM 2026 ($539.000)
novedad-imm-mayo.jpg               Aumento IMM mayo 2025 ($529.000)
novedad-imm-calendario.jpg         Ley 21.751 / calendario reajustes
novedad-cotizaciones.jpg           Pago Previred / cotizaciones
novedad-registro-dt.jpg            Registro de contrato en DT
novedad-entrega-liquidacion.jpg    Caso Salcobrand / Art. 54 bis / entrega
```

URL pública (estable, no expira) **siempre vía el dominio propio**:

```
https://golegit.cl/i/<filename>
```

El proxy `/i/*` está configurado en `next.config.ts` (rewrite a Vercel) y
sirve la imagen desde el bucket sin revelar el project id de Supabase ni
la ruta interna `/storage/v1/object/public/...`. Es un **rewrite** (no
redirect), o sea: navegadores y crawlers de Open Graph (WhatsApp, Twitter,
LinkedIn) ven 200 OK directo, no un 302.

**Nunca usar la URL larga `domdefqcsiqkdpuchjtu.supabase.co/...` en
contenido público** (Notion, og:image, links compartidos): filtra
infraestructura. Solo `https://golegit.cl/i/<filename>`.

**Solo si NO hay imagen reusable**, generar una nueva con el script:

```bash
# Agregar entrada al array IMAGES en scripts/generate-cms-images.mjs
# con filename y prompt (ver estilo en otras entradas).
# El SUFFIX común garantiza estilo editorial consistente.
node scripts/generate-cms-images.mjs novedad-tu-slug.jpg
```

Costo: ~$0.08 por imagen. Si el archivo ya existe en el bucket, hace upsert.

**Nunca subir una imagen como archivo directo en Notion** (campo Imagen tipo
"file" o cover por upload). Notion las hostea en URLs S3 firmadas que
**expiran cada 1 hora** — preview de WhatsApp, Twitter y Open Graph se
rompen apenas pase ese plazo. Siempre Supabase Storage + URL pública en
`cover` de la página.

Detalles completos: ver memoria `reference_cms_workflow.md` (sección "Generación con DALL-E 3").

## Paso 3 — Crear la page en Notion

Usar `notion-create-pages` con MCP de Notion:

```yaml
parent: { type: "data_source_id", data_source_id: "dc3931e2-054c-4bde-8f5e-85990e4c022b" }
cover: https://golegit.cl/i/<archivo>.jpg     # OBLIGATORIO: URL del proxy /i/, NO la del bucket
properties:
  Título: "Título del post"
  Slug: "slug-unico-y-corto"            # verificado en paso 1
  Categoría: "Laboral"                  # o Remuneraciones / Contratos / Previsión / General / Novedades
  Publicado: "__YES__"                  # string literal, NO booleano
  Resumen: "~200 caracteres del gancho..."   # NO olvidar — aparece en la tarjeta del listado
  Imagen: "https://golegit.cl/i/<archivo>.jpg"  # misma URL que cover (mostrada en vista tabla Notion)
  date:Fecha:start: "2026-04-26"        # ISO date — usar la propiedad expandida (NO solo "Fecha")
content: <markdown del artículo>
```

**Notas críticas:**

- `cover` y la columna `Imagen` deben quedar pobladas con la URL del
  proxy `https://golegit.cl/i/<archivo>` (NO la URL larga del bucket).
  Si dejás cover vacío, el preview de WhatsApp/Twitter sale con el OG
  genérico del root layout (incidente 27-abr-2026).
- `Resumen` debe completarse al crear; un post sin resumen aparece sin
  gancho en `/novedades`.
- Usar **`date:Fecha:start`**, no `Fecha` (la API requiere la propiedad
  expandida).
- Usar **`__YES__`** literal (string), no booleano `true`.
- Notion Markdown soporta links `[texto](url)`, tablas con
  `<table header-row="true">`, blockquotes, listas. Ver spec:
  `notion://docs/enhanced-markdown-spec`.

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
Supabase bucket:        cms-images (público, en proyecto domdefqcsiqkdpuchjtu)
Origin del bucket:      https://domdefqcsiqkdpuchjtu.supabase.co/storage/v1/object/public/cms-images/<archivo>
URL pública canónica:   https://golegit.cl/i/<archivo>   ← USAR ESTA SIEMPRE
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
- ❌ **Crear una nota sin `cover`** → preview en WhatsApp/Twitter sale sin imagen, queda con el placeholder genérico del root layout. *27-abr-2026*: pasó con `jornada-42-horas-vigente-2026`. La nota se publicó sin cover; al compartirla por WhatsApp el preview salía con el OG genérico del sitio. Fix: setear `cover` con la URL pública del bucket `cms-images` ANTES de publicar.
- ❌ **Subir imagen como archivo a Notion** (cover por upload o columna `Imagen` tipo file) → Notion devuelve URL S3 firmada que expira cada 1 hora; al refetchear el cache de Open Graph la imagen falla. Siempre `cover` con URL pública del proxy.
- ❌ **Pegar la URL larga del bucket** (`domdefqcsiqkdpuchjtu.supabase.co/storage/v1/object/public/cms-images/...`) en cualquier contenido público (Notion, og:image, anuncios, capturas). Filtra el project id de Supabase y la ruta interna. Siempre `https://golegit.cl/i/<filename>` — el rewrite en `next.config.ts` proxea sin filtrar nada.

## Referencias

- Estilo editorial: `novedades-style.md`
- Infraestructura CMS (envvars, ISR, imágenes): `cms.md`
- Workflow detallado de imágenes con DALL-E: `memory/reference_cms_workflow.md`
