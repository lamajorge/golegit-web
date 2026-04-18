# GoLegit Web — Landing pública

Landing page, simuladores legales, blog y shortener de URLs para GoLegit.

**Operador:** Cubillos Lama SpA (RUT 78.393.969-K)

---

## Stack

| Capa | Tech |
|------|------|
| Framework | Next.js 15.1.11 App Router (React 19, TypeScript) |
| Estilos | Tailwind CSS 3.4 + PostCSS |
| Animaciones | Framer Motion 11 |
| CMS | Notion API (`@notionhq/client`) |
| DB | Supabase (solo lectura — shortener `url_cortas`) |
| SEO | next-sitemap + OpenGraph + hreflang |
| Deploy | Vercel |

---

## Variables de entorno

```
NOTION_TOKEN              ← integration secret (solo backend)
NOTION_DB_ID=b844dffae5ca4ee8983d5ee3d098a70b  ← hardcodeado, no cambiar
NEXT_PUBLIC_SUPABASE_URL · NEXT_PUBLIC_SUPABASE_ANON_KEY  ← solo lectura (url_cortas)
REVALIDATE_SECRET         ← para invalidar ISR manualmente
```

---

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing: Hero, Problem, Solution, Features, Pricing, FAQ |
| `/simulador/liquidacion` | Calculadora de liquidación (AFP, SIS, AFC, IMM) |
| `/simulador/jornada` | Calculadora de jornada y horas extras |
| `/novedades` + `/novedades/[slug]` | Blog con Notion CMS |
| `/recursos` + `/recursos/[slug]` | Knowledge base con Notion CMS |
| `/business` | Landing B2B — 3 pilares: Laboral, Corporativo, Contratos & Docs |
| `/verificar` | Verificador de documentos por código |
| `/[code]` | Shortener → redirige desde `url_cortas` |
| `api/revalidate` | ISR manual (requiere `REVALIDATE_SECRET`) |

---

## ISR y caché

- Blog y recursos usan ISR — el contenido de Notion no se actualiza en tiempo real
- Para forzar actualización: `POST /api/revalidate` con `{ secret: REVALIDATE_SECRET, path: '/novedades' }`
- Imágenes externas permitidas en `next.config`: Notion, AWS S3, Unsplash, Supabase Storage

---

## Simuladores — lógica legal

Los simuladores contienen cálculos legales vigentes. **Antes de modificar cualquier tasa o fórmula**, verificar en `golegit/qa/legal/codigo_trabajo_DT_2026.txt`.

Puntos críticos:
- **Ley 21.561** — jornada máxima: 44h hasta 26-abr-2026, luego 42h, luego 40h (2028)
- **IMM proporcional** para ≤30h: `ceil(IMM * horas / maxHorasSemanales)`
- No aplica semana corrida ni gratificación para TCP
- AFC: 2.2% cuenta individual + 0.8% fondo solidario (cargo empleador)

---

## Sin mutations a DB

Este repo **no escribe en la DB**. Solo lee `url_cortas` para el shortener. No crear API routes que muten datos.

---

## Ecosistema

| Repo | Rol |
|------|-----|
| `golegit` | Bot + Edge Functions + **todas las migraciones DB** |
| `golegit-panel` | Superadmin: parámetros, plantillas |
| `golegit-app` | Portal empleador/trabajadora |
| `web` ← **este** | Landing + simuladores + precios públicos |

**Coordinación:** si se cambia la estructura de planes o precios en `golegit`, actualizar `/` sección Pricing y posiblemente `/business`.

---

## Más contexto por área

- CMS Notion + ISR → `.claude/rules/cms.md`
- Simuladores legales → `.claude/rules/simuladores.md`
- GoLegit Business (copy, audiencia, estructura) → `.claude/rules/business.md`
