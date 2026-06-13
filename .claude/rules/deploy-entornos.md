# Deploy y entornos — núcleo universal

> Regla **universal** del dev system (`@golegit-cl/devkit`). Solo los principios que
> aplican a CUALQUIER repo del ecosistema (Node/Deno + Vercel + Supabase). Todo lo
> específico de un repo — CI propio, proyectos Supabase concretos, secretos, OTP,
> webhooks, runners de QA — vive en `deploy-<repo>.md` / `entornos-<repo>.md` LOCAL.

## 1. Migrations: a mano, NUNCA por CI

> ⚠️ El CI/CD deploya **código** (Edge Functions / build de Vercel), **nunca aplica
> migraciones de DB**. Toda migration nueva se aplica manualmente **ANTES** del push
> del código que depende del schema:
>
> 1. Escribir el `.sql`. 2. Aplicar (MCP / SQL Editor / `supabase db push`).
> 3. Verificar que el objeto existe. 4. Recién entonces pushear el código.
>
> Si hay >1 entorno (prod + staging), aplicar la migration a **cada** proyecto Supabase
> — el deploy de código NO sincroniza el schema.

## 2. commit sin push = producción SIN cambios

Terminar siempre con `git push`. Incluir **todos** los archivos del cambio en el mismo
commit (un import a un archivo no pusheado rompe el bundle en runtime).

## 3. push a main = PRODUCCIÓN. Staging se sincroniza aparte (anti-pattern #46)

En repos con rama `staging` separada (los front Vercel): después de cada push a `main`,
**mergear `main → staging` y pushear esa rama también**, o staging queda mostrando
código viejo.

```bash
git push                  # main → producción
git checkout staging && git merge main --no-edit && git push
git checkout main
```
> Excepción: repos cuyo CI deploya `main` a todos los entornos en el mismo job (ej. un
> CI matrix dual) NO necesitan este paso — lo hace el pipeline. Verificar por repo.

## 4. Boot/build test antes de push — única defensa contra imports rotos

Un `import { X }` a un símbolo inexistente puede NO fallar en compile-time y romper en
**runtime al cargar el módulo** (503 silencioso, build roto en prod). Antes de pushear
algo que toque un módulo crítico, correr el boot/build test del repo y ver que no
imprime `Error`/`SyntaxError`/`does not provide an export`. (El comando exacto —
`deno run`, `tsc`, `next build` — vive en el override local del repo.)

## 5. Servicios externos: no consumir cuota en staging (anti-pattern consolidado)

Todo servicio externo con cuota/costo (email, pagos, OCR, PDF, etc.) debe, en staging:
- **(A)** key distinta por entorno (prod = real, staging = sandbox), o
- **(B)** key ausente + guard en código (`if (!key) return ok`) que loguea sin enviar.

El wording de "no pudimos enviar X" en staging suele ser esperado (opción B), no un bug.

## 6. Flujo de ramas recomendado

```
feature/*  →  staging  →  main
   │            │           │
 Preview     URL fija    producción
```
Trabajar en `feature/*` (Preview Vercel → staging), promover a `staging` para QA
sostenido, y a `main` solo lo probado. Hotfix directo a `main` con cuidado.
