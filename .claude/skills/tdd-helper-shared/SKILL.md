---
name: tdd-helper-shared
description: Use BEFORE writing any new helper / function in supabase/functions/_shared/ or whatsapp-receiver/lib/helpers/. Forces RED-GREEN-REFACTOR cycle. Specifically for legal-calculation helpers (vacaciones, IATCE, AFP, isapre, jornada legal) where bugs have legal consequences. TRIGGER when about to create a new `*.ts` file in `_shared/` or extend an existing helper with new business logic. Adapted from obra/superpowers (MIT) test-driven-development skill.
---

# TDD para helpers de cálculo legal — GoLegit

**Principio**: en helpers de cálculo legal (sueldo, IATCE, vacaciones, etc.)
un bug NO es "feature missing" — es contrato firmado con valor incorrecto +
liquidación con descuentos erróneos + valor probatorio comprometido (Ley
19.799). Los tests no son opcionales.

**Caso reciente**: 28-may noche, `calcularDesdeLiquido` se escribió con 7
tests primero. Detectó 2 problemas conceptuales antes de aplicar a 9
contratos staging. Si lo hubiera escrito "después", esos 9 quedaban mal.

## Cuándo aplicar

**Obligatorio** para:
- Nuevos archivos en `supabase/functions/_shared/`
- Nuevos exports en `whatsapp-receiver/lib/helpers/legal.ts`
- Nuevos exports en `whatsapp-receiver/lib/helpers/dates.ts`
- Helpers que calcules un valor monetario o de tiempo legal
- Helpers que apliquen un artículo del CT, una ley, o un dictamen DT

**Recomendado para**:
- Refactor de helper existente (ahora hay tests, validar invariantes)
- Migrar lógica del bot a helper compartido

**NO necesario**:
- Helpers de UI/wording (pero validar con runner_validaciones)
- Helpers de formato (formatearMonto, formatearFecha)

## El ciclo

### RED — escribir test primero

```typescript
// _shared/helpers.test.ts
Deno.test('calcularNuevoHelper — caso canónico', () => {
  const result = calcularNuevoHelper({ ... })
  assertEquals(result.X, valorEsperado)
})
```

Correr el test:
```bash
deno test supabase/functions/_shared/helpers.test.ts --no-check --allow-all
```

**Debe fallar** (helper no existe o no retorna lo esperado). Si pasa
en RED, el test está mal: probablemente assertea contra `undefined` o
similar.

### GREEN — código mínimo que pasa

```typescript
// _shared/calculo_X.ts
export function calcularNuevoHelper(input) {
  return { X: hardcoded para pasar el test }
}
```

Correr test → pasa.

### REFACTOR — generalizar manteniendo verde

Implementación real. Tests siguen verdes.

## Tests obligatorios por categoría

### Helper de cálculo monetario

```
[ ] Caso canónico (input típico)
[ ] Tope 90 UF aplicado donde corresponde (DL 3500)
[ ] Sin tope donde no corresponde (IATCE Art. 163)
[ ] Math.round explícito (no Math.ceil / Math.floor por accidente)
[ ] Input sueldo 0 retorna 0 (defensive)
[ ] Input negativo / NaN se sanea
```

### Helper de fechas

```
[ ] Zona horaria Chile (UTC-3 / UTC-4 según DST)
[ ] Cap inferior `fecha_inicio_efectiva` (cortafuegos cláusula SEXTO)
[ ] Cap superior `ayer` (no futuro)
[ ] Feriados de tabla `feriados` respetados
[ ] Sábado/domingo según Art. 35 CT
```

### Helper de jornada (Ley 21.561)

```
[ ] Pivotes 44h (hasta 25-abr-2026)
[ ] 42h (desde 26-abr-2026)
[ ] 40h (desde 26-abr-2028)
[ ] Pacto Art. 149d ≤30h
[ ] PA-adentro vs PA-afuera (modalidad)
```

### Invariantes legales transversales

```
[ ] Líquido = haberes - descuentos (matemático)
[ ] AFC TCP trabajador = 0% (Ley 21.269)
[ ] AFC TCP empleador = 3% (Ley 21.269)
[ ] IATCE = 1.11% sin tope
[ ] PA-adentro NO tiene horas extra (Art. 149 inc. 2°)
```

## Anti-patterns observados

### A1 — "Test después del fix" (test-after)

```typescript
// ❌ pattern observado en bugs históricos
1. Bug reportado
2. Fix aplicado
3. (sin test) — el siguiente bug del mismo helper no se previene
```

**Regla**: cada P0/P1 fixeado trae 1 test que lo previene para siempre.
Ver `.claude/BACKLOG.md` § "Principio operativo nuevo".

### A2 — "Test asume el helper como oracle"

```typescript
// ❌ test que solo verifica que el código actual sigue haciendo lo mismo
Deno.test('foo', () => {
  assertEquals(calcular(X), calcular(X))  // trivially true
})
```

**Regla**: test debe assertar contra `valorEsperado` calculado **por la
norma legal o cálculo manual**, no contra el output del propio helper.

### A3 — Tests sin invariantes legales

```typescript
// ❌ solo casos puntuales, no propiedades
Deno.test('foo $1M Modelo', ...)
Deno.test('foo $500k Habitat', ...)
```

**Regla**: agregar **al menos 1 property test** que genere N escenarios
random y verifique invariantes (`qa/property/invariantes.ts`).

### A4 — Round-trip ausente

Cuando hay 2 helpers inversos (`calcularDesdeBase` ↔ `calcularDesdeLiquido`),
**falta el test round-trip**:

```typescript
Deno.test('round-trip', () => {
  const liq = calcularDesdeBase(base)
  const baseRecuperado = calcularDesdeLiquido(liq)
  assert(Math.abs(baseRecuperado - base) <= 1)  // tolerancia ±$1 discretización
})
```

## Output esperado al cerrar TDD

Cada helper nuevo viene con:
1. Función implementada en `_shared/X.ts`
2. ≥5 tests en `_shared/helpers.test.ts` (canónico + edge cases + property + round-trip)
3. Documentación en `.claude/rules/calculo-liquidacion.md` (si es legal)
4. Conexión desde código que lo necesite (importable, no muerto)
5. Si reemplaza fallback hardcoded: limpiarlo
