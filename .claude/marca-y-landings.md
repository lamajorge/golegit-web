# GoLegit — Arquitectura de marca, dominios y landings

**09-jun-2026.** Documento canónico del ecosistema de marca GoLegit (multi-producto). Define el
mapa de dominios, qué repo sirve qué, y los patrones compartidos de landing (navbar, footer,
tipografía, color). **Ninguna sesión futura debe contradecir esto sin decisión explícita de Jorge.**

## 1. Mapa de dominios (decisión Jorge, EJECUTADO)

| Dominio | Qué sirve | Repo / proyecto Vercel | Fondo del hero |
|---------|-----------|------------------------|----------------|
| **`golegit.cl`** (apex) | **Landing-PARAGUAS** de marca (corazón SEO). Habla de lo común + bifurca a los 2 productos. | `web` · `app/page.tsx` | oscuro (`bg-ink-deep`) |
| **`home.golegit.cl`** | Landing **Home/TCP** (trabajadoras de casa particular). | `web` · `app/home/page.tsx` (middleware reescribe el subdominio a `/home`) | oscuro (`bg-ink-deep`) |
| **`business.golegit.cl`** | Landing **+ portal Business** (PYME). | `golegit-business` (proyecto Vercel SEPARADO) · `app/page.tsx` | oscuro (`bg-zinc-950`) |
| `www.golegit.cl` | 308 → `golegit.cl` (apex es el canónico) | `web` | — |

- **Modelo:** dos productos hermanos bajo el paraguas GoLegit (Home=TCP, Business=PYME). No hay
  jerarquía; el apex es la marca madre.
- **SEO:** el apex conserva su autoridad (NO redirige a un subdominio). `golegit.cl/business` viejo
  → 301/308 a `business.golegit.cl` (`web/next.config.ts` redirects). Sitemap lista `/` y `/home`.
- **Vercel:** `golegit.cl` + `home.golegit.cl` + `www` → proyecto `web`. `business.golegit.cl` →
  proyecto `golegit-business`. El apex SIRVE (no redirige a www); www redirige al apex.
- **Routing del subdominio Home:** `web/middleware.ts` — `host === home.golegit.cl` → rewrite a
  `/home/*`. El usuario ve `home.golegit.cl/`, internamente es `/home`.

## 2. Navbar — patrón por tipo de página (web)

`web/components/layout/Navbar.tsx` es **compartido** por `/home` (hero oscuro) y las páginas de
contenido (`/simulador`, `/recursos`, `/novedades` — fondo claro `bg-paper`). El comportamiento
bifurca:

| Página | `position` | Fondo | Razón |
|--------|-----------|-------|-------|
| `/home` (hero oscuro) | **`absolute`** | transparente | Se queda anclado al hero y se va con el scroll — como la landing Business. NO sigue al usuario (evita el navbar transparente sobre secciones blancas = texto invisible). |
| `/simulador`, `/recursos`, `/novedades` (claro) | **`fixed`** | `bg-white/70 backdrop-blur-xl` + sombra | Siempre visible y legible. NO puede ser transparente (texto blanco invisible sobre claro). |

- Lógica: `heroPage = isHome || isBusiness` → `posClass = heroPage ? "absolute" : "fixed"`;
  `isDark = heroPage`. **No hay estado `scrolled`** (el comportamiento es por página, no por scroll).
- **`isHome = pathname === "/home"`** (NO `=== "/"` — la landing TCP se movió a `/home`; `/` es el
  paraguas, que tiene su propio header y no usa este Navbar). Un bug recurrente si se revierte.
- **Layout del navbar (moderno, estilo Business):** 3 zonas — logo+ProductSwitcher (izq) · nav links
  CENTRADOS (`absolute left-1/2 -translate-x-1/2`) · acciones (der). Los nav links **deben estar**
  (Jorge); Business los tendrá a futuro.
- **ProductSwitcher** (selector Home↔Business): mismo tamaño/estilo en ambos productos — `text-sm`,
  `px-2.5 py-1.5`, `rounded-lg`, glassmorphism (`ring` + `backdrop-blur`). Links absolutos a los
  subdominios (`https://home.golegit.cl` / `https://business.golegit.cl`).

## 3. Footer — patrón compartido (oscuro + glow)

Ambos productos tienen footer **oscuro con glow de marca** (no bloque plano):
- **Home** (`web/components/layout/Footer.tsx`): `bg-ink-deep` (grafito — el token diseñado para
  footers; NO `bg-ink` que es verde-medio y da contraste flojo 3.95) + `text-ink-light` (6.64 AA) +
  glow verde sutil.
- **Business** (`golegit-business/app/page.tsx`): `bg-zinc-950` + glow indigo, y desde 11-jun-2026
  replica la ESTRUCTURA del de Home (referencia de diseño — pedido Jorge): 4 columnas
  (Brand / Producto / GoLegit / Contacto con hola@ y soporte@) + barra legal
  (© año · servicio de Cubillos Lama SpA · links Privacidad/Términos → golegit.cl).

**Sin "early access" en Business (11-jun-2026):** el producto está vivo → la landing de
business.golegit.cl no menciona early access ni waitlist (WaitlistForm eliminado; leads se
capturan en el gate del diagnóstico público). El badge del hero dice "Diagnóstico legal gratis —
disponible ahora" y el CTA final es diagnóstico + crear cuenta (`#empieza`, ya no `#waitlist`).
El footer de Home tampoco le pone badge "Early access" al link de Business. (El early access de
HOME —Navbar/CtaButton/EarlyAccess section de web— es otro producto y sigue su propio estado.)

## 4. Tipografía (paquete `@golegit-cl/tokens`)

| Producto | UI (`--font-sans`) | Titulares (`--font-display`) |
|----------|--------------------|------------------------------|
| **Home** (consumer) | Plus Jakarta Sans | **Fraunces** (la "rúbrica" — solo Home) |
| **Business** | Plus Jakarta Sans | **Jakarta** (sobrio, SIN Fraunces — decisión Jorge) |
| **Paraguas** | Jakarta | Fraunces (es `web`, hereda el tema Home) |

- **Fraunces se usa MEDIDO**: solo en el `<h1>` (oversized) + los `<h2>` de sección principal. NO
  en cada título/card (eso es "abuso", feedback Jorge). ~5 usos por landing, no 10+.
- Business NO usa Fraunces. Tampoco Geist (revertido). Solo Jakarta.

## 5. Color de marca

| Producto | Primary | Token |
|----------|---------|-------|
| Home | verde (`brand-*` = green) | `--gl-primary` verde (tema base) |
| **Business** | **indigo `#4f46e5`** (= el logo SVG) | `--gl-primary: oklch(0.511 0.233 277)` en `tokens-business.css` |

- **Business es INDIGO, no azul.** El azul genérico (hue 256) se revirtió: >70% de SaaS usan azul
  ("se mezcla con el fondo"); el indigo "Cyber-Regal" diferencia + premium para legal-B2B + coincide
  con el logo. Las clases `blue-*` de la landing → `indigo-*`.
- Apex (paraguas): usa verde (Home) izq + indigo (Business) der en los glows y tarjetas-selector,
  representando ambas marcas.

## 5.1 Isotipos y logos — FUENTE ÚNICA `@golegit-cl/tokens/brand` (11-jun-2026)

⚠️ **Ningún logo/favicon se edita a mano en los repos.** Todos derivan de
`golegit-tokens/src/brand/geometry.js`. Cambio de marca (promo/festividad) = editar
ahí → `npm run build:svg` → bump+publish → `sync-brand` + bump de dep en consumidores.

**Anatomía** (ver README de `golegit-tokens` para el detalle):
- **Home** = burbuja de chat, crece hacia abajo (cola/canal WhatsApp).
- **Business** = la misma caja de la burbuja SIN cola, borde sup-derecho interrumpido,
  tick saliendo por la apertura con la punta sobre la línea del borde derecho. Crece
  hacia arriba (cumplimiento). Aprobado por Jorge, iteración v10.
- **Pill descriptor** HOME/BUSINESS debajo del wordmark; paraguas `golegit.cl` sin pill.

**Consumo:** componente `<Logo product mode height pill colors />` (React) o SVG estático
(`public/logo/`, favicons, OG). `mode`: light=fondo claro · dark=fondo oscuro.

**Favicon por frente** (los 4 proyectos Vercel, vinculados a la fuente única):
| Frente Vercel | Favicon | Notas |
|---|---|---|
| `web` (golegit.cl paraguas + home.golegit.cl) | `app/icon.svg` = favicon-home | burbuja verde adaptiva; ambos son territorio Home |
| `golegit-app` (app.golegit.cl) | `app/icon.svg` = favicon-home | |
| `golegit-panel` (panel.golegit.cl) | `app/icon.svg` = favicon-home | antes solo tenía .ico default |
| `golegit-business` (business.golegit.cl) | `metadata.icons` → favicon-business | caja índigo adaptiva |

> El navbar de `web` aplica el pill por producto: Business→BUSINESS · home.golegit.cl
> (`/home`)→HOME · páginas de contenido del paraguas (`/simulador` etc.)→sin pill.

## 6. Patrones de landing (extraídos de Home + Business, tendencias 2026)

- **Hero = UNA pantalla exacta** (patrón Home, canónico en los 3 sitios). El hero se bloquea
  a la altura del viewport con `h-svh lg:h-dvh` + un `min-h-[NNNpx]` de piso (≈640-680px según el
  contenido) y centra el contenido vertical (`justify-center` en columna, o `items-center`). NO usar
  `min-h-svh` con `pt-32` top-aligned: en pantallas altas deja un hueco arriba ("se ve mal"). Aplica a
  `web/components/sections/Hero.tsx` (Home), `web/app/page.tsx` (paraguas) y
  `golegit-business/.../BusinessLanding.tsx` (Business).
- **Secciones de contenido = padding vertical `py-24`** (NO se fuerzan a una pantalla — crecen con su
  contenido). Solo el hero se bloquea a 1 pantalla.
- **Hero OSCURO impactante** + glow + tipografía oversized (`text-7xl` h1). Mostrar valor antes del scroll.
- **Secciones ALTERNAN** fondo (claro → tintado → oscuro → claro) = ritmo, no color plano.
- **Eyebrows** de color (`text-xs uppercase tracking-widest`) sobre los `<h2>`.
- **Contraste**: cuidado con fondos translúcidos (`bg-X/40`) sobre un `<main>` oscuro → el oscuro
  atraviesa y el texto se vuelve invisible. Usar fondos SÓLIDOS por sección. Verificar AA real
  (no asumir): el cálculo debe usar el fondo REAL, no el supuesto.

## 7. Gotchas operacionales

- **Sync macOS** duplica paquetes en `node_modules` como `* 2` → rompe `tsc`/build con errores de
  tipos imposibles. Fix: `find node_modules -maxdepth 2 -name "* 2" -exec rm -rf {} +` o `npm ci`.
- **`@golegit-cl/tokens`**: cambios de color/fuente requieren `npm version patch` + `npm publish`
  (GitHub Packages, necesita `GH_PACKAGES_TOKEN`) + actualizar la dependencia en cada repo. Versión
  actual: `0.1.6` (indigo Business + Jakarta-only).
- **WhatsApp Home**: `web/lib/config.ts` `whatsappEnabled: true` (activado 09-jun) — los CtaButton
  ("Registrarme"/"Empieza gratis") van a `wa.me/56928132444` (bot de registro).
- **"nana"** en texto visible = NO (coloquial). Usar "trabajadora de casa particular" / "alguien
  trabajando en tu casa". Sí permitido en `keywords` SEO (término de búsqueda real).
