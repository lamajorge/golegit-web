# Plan — Landing-paraguas en golegit.cl (apex) + reorganización de marca

**09-jun-2026.** Plan PARA REVISAR CON JORGE antes de ejecutar. Toca el SEO del producto que
convierte (Home/TCP) → no se ejecuta autónomo. Decisiones de marca ya tomadas por Jorge:
- `golegit.cl` (apex) = **landing-paraguas** (marca GoLegit, bifurca a los 2 productos). Conserva
  autoridad SEO en el apex (NO redirect a un subdominio).
- `home.golegit.cl` = landing **TCP/Home** (el producto actual).
- `business.golegit.cl` = landing + portal **Business** → servido por el repo `golegit-business`
  (NO el `app/business` viejo de `web`).
- Relación: **dos productos bajo el paraguas GoLegit**.

## Estado ACTUAL (lo que hay hoy en `web`)
- `web/app/page.tsx` (apex `golegit.cl`) = **la landing completa de TCP/Home** (Hero, Problem,
  Solution, Pricing TCP, FAQ…). Es donde está la autoridad SEO.
- `web/middleware.ts`: `home.golegit.cl` → **alias de la raíz** (rewrite same path). Skeleton de
  `business.` comentado.
- `web/app/business/` = landing vieja de Business (skeleton marketing) → **a archivar** (Business
  real vive en repo `golegit-business`).
- SEO en `app/layout.tsx`: `metadataBase`/`canonical = https://golegit.cl`, OG url `golegit.cl`.
- `app/JsonLd.tsx`: Organization + SoftwareApplication con `url: golegit.cl`.
- Anclas internas en `components/layout/Navbar.tsx`: `/#como-funciona`, `/#precios`, `/#faq`,
  `/business`, `/business#waitlist`. Footer idem (revisar).
- `next-sitemap.config.js` genera sitemap desde las rutas.

## El movimiento (orden propuesto, reversible por pasos)

### Paso 1 — Mover la landing TCP de la raíz a `/home`
- Crear `web/app/home/page.tsx` = el contenido actual de `web/app/page.tsx` (la landing TCP).
  Mover también su `layout`/metadata específicos. Canonical de `/home` → `https://home.golegit.cl`.
- `web/middleware.ts`: `home.golegit.cl` deja de ser alias de `/` → **rewrite a `/home/*`**.
  Así `home.golegit.cl` sigue mostrando la landing TCP, pero ahora vive en `/home`.
- Las anclas `/#precios` etc. del Navbar pasan a `/home#precios` cuando el contexto es Home.

### Paso 2 — Construir la landing-paraguas en la raíz
- `web/app/page.tsx` nuevo = paraguas de marca GoLegit:
  - Hero de marca ("GoLegit — el aliado legal que descomplica").
  - Bifurcación con contexto: **"¿Empleas en tu casa?" → home.golegit.cl** ·
    **"¿Tienes una empresa?" → business.golegit.cl**.
  - Narrativa breve + footer. NO un selector frío de aeropuerto.
- `app/layout.tsx`: el `canonical`/OG del apex pasa a describir la MARCA (no TCP).
- `app/JsonLd.tsx`: Organization se queda en el apex (correcto); SoftwareApplication TCP debería
  apuntar a `home.golegit.cl` (o dividirse en dos SoftwareApplication).

### Paso 3 — Redirects 301 SEO (CRÍTICO — preservar autoridad)
La autoridad histórica del apex apunta a contenido TCP. Al moverlo:
- **NO** redirigir el apex completo (queremos contenido nuevo ahí).
- Sí 301 de rutas/anclas TCP que cambien de lugar, si las hubiera como path (las anclas `#` no son
  URLs separadas → no necesitan 301, pero los links internos sí deben actualizarse).
- `home.golegit.cl` ya servía el mismo contenido → la transición es suave (el contenido TCP "ya
  vivía" en ese subdominio como alias). Clave: **mantener `home.golegit.cl` sirviendo la landing
  TCP sin interrupción**.
- Actualizar `next-sitemap.config.js`: el apex lista la paraguas; agregar las URLs de `/home`.
  Considerar `alternates`/hreflang si aplica (no aplica, mismo idioma).

### Paso 4 — Archivar `app/business` viejo
- Una vez `business.golegit.cl` apunte al proyecto Vercel `golegit-business` (tarea DNS/Vercel de
  Jorge), `web/app/business/` queda muerto. Opciones: borrarlo, o 301 `/business` → `https://business.golegit.cl`.
- El skeleton comentado de `business.` en `web/middleware.ts` se elimina (ya no se sirve desde web).

## Tareas de INFRA (Jorge — no se hacen desde código)
1. **Vercel:** apuntar el dominio `business.golegit.cl` al proyecto `golegit-business` (hoy lo
   sirve, o lo serviría, el proyecto `web`). Quitar el dominio de `web` si estaba.
2. Confirmar que `home.golegit.cl` sigue asignado al proyecto `web`.
3. Verificar Search Console: registrar/verificar `home.golegit.cl` y `business.golegit.cl` como
   propiedades; enviar sus sitemaps; vigilar la transición de la home TCP a `/home`.

## Riesgos SEO a vigilar
- La home TCP es el mayor activo SEO. Moverla de `/` a `/home` (servido en `home.golegit.cl`) debe
  hacerse con canonical correcto desde el día 1 y monitoreo en Search Console 2-4 semanas.
- El apex con contenido nuevo (paraguas) re-acumula autoridad — al principio puede bajar de ranking
  para queries TCP que antes resolvía el apex; `home.golegit.cl` debe captar ese tráfico (por eso el
  canonical de la landing TCP apunta a `home.golegit.cl`).
- No dejar dos URLs sirviendo contenido TCP idéntico sin canonical (duplicate content): la landing
  TCP vive en `home.golegit.cl` (canónica), la raíz es paraguas (distinta).

## Orden de ejecución recomendado (cuando Jorge apruebe)
1. Infra: reapuntar `business.golegit.cl` a `golegit-business` (desbloquea archivar app/business).
2. Código `web`: Paso 1 (mover TCP→/home + middleware) → deploy → verificar home.golegit.cl OK.
3. Código `web`: Paso 2 (paraguas en raíz) → deploy → verificar.
4. Paso 3-4 (sitemap, canonical, archivar business, 301s).
5. Search Console: enviar sitemaps, vigilar 2-4 semanas.

> **Decisión pendiente fina:** el copy/diseño de la landing-paraguas (igual que el portal y la
> landing Business, es contenido de marca de Jorge). Este plan es el ANDAMIAJE; el copy se afina
> con Jorge.
