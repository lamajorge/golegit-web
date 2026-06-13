---
name: verification-before-completion
description: Use BEFORE declaring "done" / "listo" / "completed" for any code change, refactor, or feature in GoLegit. Forces explicit verification protocol (boot, tests, CI, smoke) instead of self-reported "trust me it works". TRIGGER when about to write "✅ ready", "fase X cerrada", "listo para mergear", or similar completion claims. Adapted from obra/superpowers (MIT) verification-before-completion pattern.
---

# Verification Before Completion — Protocolo de GoLegit

**Lección base**: 29-may sesión, declaré "Fase 4 lista" después de boot test
sin correr QA E2E. El QA reveló problemas reales 6 horas después que pude
haber detectado en 5 min. Y el QA grande quedó colgado 7.5h sin verificar.

**Regla**: declarar "X listo" sin verificación formal es **prohibido**.

## Cuándo se aplica

Activar antes de afirmar cualquier variante de "listo":
- Refactor / split / extracción de archivos
- Feature nuevo (Edge Function, página, endpoint)
- Migración DB
- Fix de bug
- Cambio de configuración (env var, settings)
- Antes de commit + push

## Checklist obligatorio por tipo de cambio

### Cambio en `supabase/functions/whatsapp-receiver/**`

```
[ ] Boot test local pasó (AddrInUse = OK)
    rm -rf /tmp/boot-test && mkdir /tmp/boot-test
    cp -r supabase/functions/whatsapp-receiver /tmp/boot-test/
    cp -r supabase/functions/_shared /tmp/boot-test/
    cd /tmp/boot-test && perl -e 'alarm 8; exec @ARGV' \
      deno run --no-check --allow-all whatsapp-receiver/index.ts 2>&1 | head -5

[ ] Unit tests 104/104 verde
    deno test supabase/functions/_shared/helpers.test.ts --no-check --allow-all

[ ] Si toca lógica de un flow específico: runner_<flow>.ts verde
    Ej: cambio en jornada → runner_validaciones + runner_bifurcacion

[ ] Si toca multiple flows o switch → ./qa/run.sh explore-relacion (60min)
    (solo cuando el riesgo lo amerite — alto en refactor estructural)
```

### Cambio en `supabase/functions/<otra>/**`

```
[ ] Boot test de la función modificada
[ ] Si tiene test unitario propio: corrido verde
[ ] CI deploy verde (esperar notificación push)
[ ] Smoke prod (verificar /version respondiendo en producción tras deploy)
```

### Cambio en `supabase/migrations/**`

```
[ ] Migration aplicada vía MCP (apply_migration o execute_sql)
[ ] Verificación post-apply:
    SELECT EXISTS (SELECT FROM information_schema.tables WHERE ...);
    SELECT pg_get_constraintdef ... -- para CHECK constraints
[ ] Si toca tabla con FK → revisar eliminar_cuenta() + descartarBorrador()
[ ] Aplicada en prod + staging (auditar list_migrations)
```

### Cambio en `golegit-app/**` o `golegit-panel/**`

```
[ ] `npx tsc --noEmit` completo (no grep filtrado)
[ ] `npm run build` (atrapa errores que tsc no)
[ ] Si cambio UI: screenshot + flow manual local
[ ] Push → Vercel deploy verde (~30s)
[ ] Si toca golegit-app: mergear main → staging y pushear staging
    (ver feedback_deploy_branches.md)
```

### Cambio en `.claude/**` (skills, agentes, reglas)

```
[ ] Si es hook bash: probar manualmente
    .claude/hooks/X.sh
[ ] Si es agent.md o skill: leer el frontmatter (description, name)
    cumple convention
[ ] Si es regla nueva: agregar referencia en CLAUDE.md
```

### Cambio en `.github/workflows/**`

```
[ ] YAML válido: actionlint o github web validator
[ ] Disparado al menos 1 vez con workflow_dispatch
[ ] Resultado verde antes de declarar listo
```

## Protocolo cuando el comando "se cuelga"

Lesson L-001: NO asumir "sigue corriendo bien" cuando un background command
no genera output por >2× ETA.

```
1. Verificar PIDs vivos:
   ps -ef | grep <comando> | grep -v grep

2. Verificar log creciendo:
   wc -l /tmp/X.log; sleep 30; wc -l /tmp/X.log

3. Si PIDs vivos + log no crece → cuelgue:
   - Matar el proceso
   - Discriminar con runner aislado (qa.md § Protocolo validación post-QA fail)
   - NO declarar "listo" hasta que el aislado pase
```

## Anti-pattern: "self-reported success"

❌ "Hice los cambios, debería funcionar"
❌ "Los tests pasan localmente"  (¿cuáles? ¿todos?)
❌ "El refactor es solo mover código, no debería romper nada"
❌ "Boot OK = listo"  (boot solo cubre imports, no lógica)

✅ Lista completa del checklist tildada, con evidencia (output o logs)

## Ejemplo aplicado bien (esta sesión, Fase 4 sub-fases)

Cada commit de Fase 4.X tuvo:
- Boot test → output mostrado
- Unit tests 104/104 → output mostrado
- Imports unused limpiados
- Commit con mensaje detallado de qué se movió

Lo que faltó: QA E2E entre sub-fases. Por eso encontramos NAV-01/03
mucho después.

## Cuándo SE PUEDE saltar el checklist

Solo en estos casos:
- Cambio puramente cosmético en docs/comments (no afecta runtime)
- Reverting un commit que sabemos malo
- Fix de typo aislado en string que no es de interpolación
- Emergencia productiva (P0 incident en RUNBOOK § Triage)

En todos los casos: documentar el skip + razón en el commit message.
