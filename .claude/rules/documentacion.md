# Mantenimiento de la documentación al día — OBLIGATORIO

> Regla **universal** del dev system (`@golegit-cl/devkit`). La disciplina aplica a
> cualquier repo. Los nombres de archivos concretos, gates y anécdotas de un repo
> van en un `documentacion-<repo>.md` LOCAL (este archivo no los menciona).

> **La documentación es parte del entregable, no un extra.** Un cambio de schema,
> código, decisión o infra que **no** actualiza su documentación es **trabajo
> INCOMPLETO** — aunque el código funcione. El "cerebro" (`.claude/` + memoria)
> debe reflejar siempre la realidad.

La regla nació de un caso real: una corrección de diseño quedó en el schema y en la
memoria, pero **no** en el doc de diseño autoritativo; una auditoría lo detectó
semanas después. Eso no debe volver a pasar: la actualización va **en el mismo
turno** del cambio, no "después".

## 1. Qué mantener sincronizado (cambio ⟷ doc)

| Cuando cambia… | Actualizar en el MISMO commit/turno |
|----------------|-------------------------------------|
| **Schema / migración** | El doc de diseño que lo describe. Debe describir lo que la DB realmente tiene. |
| **Código / comportamiento** | La rule del área correspondiente y/o el doc de diseño. |
| **Decisión tomada** | Su doc de decisiones — con la **resolución**, no solo la opción. |
| **Patrón/gotcha nuevo o bug recurrente** | Una `rule` o `anti-patterns` (con ejemplo + regla + check). |
| **Hito / fin de bloque / sesión** | `handover` (en `state/handovers/`) + **memoria** (`project_*.md` + el puntero en `MEMORY.md`). |
| **Infra / credenciales / gotcha operacional** | El handover y/o las rules de deploy/entornos. |
| **Doc duplicado en >1 repo** | Mantener **0 drift** — el canónico es el repo del producto; el otro se sincroniza. |

## 2. Cuándo (no negociable)

- **En el mismo turno/commit del cambio.** Nunca "lo documento después" — ese después no llega.
- Si el cambio es grande, el commit incluye código **y** doc; si se separan, el de doc va inmediato.

## 3. Checklist antes de declarar "listo" / cerrar un bloque

Tie-in con el skill `verification-before-completion` (no narrar "actualizado" sin chequear):

```
[ ] El doc de diseño refleja el schema/código REAL (no la intención previa)
[ ] La/s decisión/es tomadas quedaron registradas en su doc (con la resolución)
[ ] Si surgió un patrón/gotcha/bug → quedó en una rule o anti-patterns
[ ] En hito/fin de sesión: handover escrito + memoria (project_*.md) al día
[ ] Sin drift entre copias duplicadas (diff/gate de los docs en los repos involucrados)
[ ] Verificado de verdad (corrí el chequeo / leí el archivo), no asumido
```

## 4. Auditoría periódica (en hitos)

En cada cierre de bloque grande, la pregunta de auditoría:
**"¿hay algo en el schema/código/decisiones de esta sesión que NO esté reflejado en
un doc?"** Si sí → es trabajo sin terminar.

> El chequeo manual con `diff` falla en la práctica (docs drifteados pasan semanas
> sin detectarse). Si el repo tiene un **gate automatizado de drift de docs**, usarlo;
> al duplicar un doc nuevo en otro repo, registrar el par en ese gate. (El comando
> exacto vive en el override local del repo.)

## 5. Higiene (no acumular ruido)

Mantener al día **no** es acumular: fusionar lo duplicado, archivar lo resuelto, una
idea = un lugar. Doc al día = doc **correcto y mínimo**, no doc inflado.

## 6. Por qué importa (cross-sesión)

El trabajo es cross-sesión: la próxima sesión (o la próxima persona) arranca de la
memoria + los docs, no de la cabeza de quien hizo el cambio. Si el cerebro miente o
está desfasado, se toman decisiones sobre una realidad falsa. Documentación al día =
continuidad sin pérdida.
