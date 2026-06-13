---
name: systematic-debugging
description: Use when investigating a bug, failing test, or unexpected behavior. Forces 4-phase root cause process instead of "guess and check". TRIGGER when about to apply a fix without having explicitly stated (a) reproduction steps, (b) where the bug isolates, (c) the root cause, (d) why the fix addresses the root cause. Adapted from obra/superpowers (MIT) systematic-debugging.
---

# Systematic Debugging — GoLegit

**Principio**: el primer fix que se le ocurre a un dev rara vez es root cause.
El ciclo "fix → ese otro bug aparece en otro lado" se cierra con investigación
explícita.

**Caso reciente**: 29-may, fail de NAV-01/NAV-03 en runner_navegacion. Mi primer
instinto fue "es regresión del refactor Fase 4". Tardé 2h en demostrar que era
fallo pre-existente (log del 19-may ya lo mostraba). Si hubiera arrancado con
fase 1 (reproduce + isolate), 5 min.

## Las 4 fases

### Fase 1 — REPRODUCE

Antes de cualquier hipótesis, demostrar que el bug se puede disparar de forma
**determinística**:

```
[ ] Comando exacto para reproducir
    ej: deno run --allow-all --env-file=qa/.env qa/http/runner_navegacion.ts
[ ] Output esperado (lo que el usuario quería)
[ ] Output actual (lo que sale)
[ ] Frecuencia: ¿siempre? ¿flaky? ¿solo en CI? ¿solo bajo carga?
[ ] Si el problema reportado dice "se cuelga", reproducir con ps + tail
```

Si NO se puede reproducir consistentemente → **NO aplicar fix**. Es flakiness
o falso positivo. Documentar como tal y mover a issue P2/P3.

### Fase 2 — ISOLATE

Reducir el blast radius. Demostrar qué NO causa el problema:

```
[ ] ¿Es del código actual o del entorno? Re-correr en otro entorno.
[ ] ¿Es nuevo o pre-existente? git log + bisect si necesario.
    Ej: ¿este test pasaba antes de mi cambio? Mirar logs viejos.
[ ] ¿Afecta a varios callers o solo a uno? Probar con otros inputs.
[ ] ¿Es DB, código, infra, network? Aislar cada capa.
```

**Output de Fase 2**: una afirmación tipo "el bug se dispara SOLO cuando
[condición específica]; NO se dispara cuando [variantes]".

### Fase 3 — ROOT CAUSE

NO el primer "porque", sino el porque del porque (5 whys):

```
[ ] ¿Por qué pasa X?
    Porque la variable Y es null cuando debería ser Z
[ ] ¿Por qué Y es null?
    Porque el caller no la pasa
[ ] ¿Por qué el caller no la pasa?
    Porque el helper se refactorizó pero su signature cambió
[ ] ¿Por qué el refactor no actualizó al caller?
    Porque no había test que verificara la integración
[ ] ¿Por qué no había test?
    Porque la convención TDD no era obligatoria

Root cause: falta de test de integración entre helper y caller
```

**Anti-pattern**: parar en el primer "porque" y aplicar fix superficial.

### Fase 4 — FIX + REGRESSION

```
[ ] Escribir test que reproduce el bug (RED)
[ ] Aplicar fix mínimo
[ ] Test pasa (GREEN)
[ ] Verificar que el test fallaría sin el fix (correr en commit anterior)
[ ] Si el bug fue P0/P1: agregar a regression suite (qa/regression/bugs/)
[ ] Commit con mensaje que cita root cause + lessons
```

## Decision tree rápido

```
Bug reportado
  │
  ├─ ¿Reproduzco de forma determinística? ──── NO ──→ Flaky / falso positivo.
  │                                                    Documentar issue P2/P3.
  │  SÍ
  ▼
  ├─ ¿Sé cuándo NO se dispara? ──── NO ──→ Aislar más antes de fixear.
  │  SÍ
  ▼
  ├─ ¿Tengo root cause (5 whys)? ──── NO ──→ Investigar más, no parchar.
  │  SÍ
  ▼
  ├─ ¿Hay test de regression? ──── NO ──→ Escribir test ANTES del fix.
  │  SÍ
  ▼
  └─ Aplicar fix mínimo. Verificar test pasa. Commit.
```

## Anti-patterns documentados

### "Mi fix mejoró las cosas pero no sé por qué"

❌ Aplicar fix → tests pasan → commit "fix bug X"
✅ Aplicar fix → tests pasan → **explicar cadena causal** en mensaje commit
   → si no podés explicarla, NO sabés si fixeaste el root cause

### "El bug es esporádico, probablemente flakiness"

A veces sí, a veces no. Aplicar Fase 1 estrictamente:
- 5 corridas seguidas: 5/5 falla = NO es flaky, es bug consistente
- 5 corridas: 1-2 fallan = flaky probable
- 5 corridas: 0 fallan = no se pudo reproducir, archivar

### "Lo voy a fixear primero y después agrego el test"

❌ Pattern observado en bugs históricos de GoLegit (BACKLOG § principio
operativo nuevo)
✅ Test primero (RED) → fix (GREEN). Sin excepciones para P0/P1.

### "El bug está en otro repo / otra capa, no es mío"

A veces sí. Pero antes de descartar, aplicar Fase 2 (isolate) para
demostrarlo. La carga de la prueba está en quien dice "no es mío".

Ej 29-may NAV-01/03: tenía que demostrar con log del 19-may que ya
estaba roto pre-refactor. Sin esa evidencia, "es del refactor" sería
hipótesis válida.

## Output esperado al cerrar debugging

Independiente de si se aplicó fix o se descartó:

```markdown
## Bug: <título>

**Reproducción**:
`<comando exacto>` → output: `<error literal>`

**Reproducible**: SÍ / SOLO BAJO X / NO (flaky)

**Aislamiento**:
- Se dispara cuando: <condiciones>
- NO se dispara cuando: <variantes>
- Capa afectada: <DB | código | infra | network>

**Root cause**:
<cadena causal explícita, ≥3 niveles de "porque">

**Fix**:
<descripción concreta + commit sha>
o
<descartado porque: <razón>>

**Test de regression**:
<test path o "agregado a qa/regression/bugs/X.json">
```

Este template es lo que va en el ticket / issue / lesson resultante.
