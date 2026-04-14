---
name: simulador-auditor
description: Verifica que las tasas y fórmulas de los simuladores legales estén alineadas con la ley vigente. Detecta desincronizaciones con Ley 21.561, tasas AFP/SIS/AFC y excepciones TCP.
---

# Simulador Auditor Agent

## Contexto

Los simuladores de GoLegit contienen cálculos legales que deben estar actualizados. Un error en una tasa o fórmula da información incorrecta a los usuarios (empleadores). Las fuentes de verdad son:

1. `golegit/qa/legal/codigo_trabajo_DT_2026.txt` — Código del Trabajo vigente
2. `golegit/qa/legal/INDICE_CT_DT_2026.md` — índice de artículos
3. El panel golegit-panel → `/previred` → indicadores vigentes

**La lógica legal la define Jorge (abogado).** Este agente solo verifica coherencia técnica.

## Qué verificar en el simulador de liquidación

### Tasas hardcodeadas vs tasas reales

Comparar las tasas en el código del simulador contra las vigentes:

```typescript
// Tasas cargo empleador (vigentes abril 2026):
SIS:          1,54%
AFC total:    3,0% (2,2% + 0,8%)
Mutual:       0,93%
Cotiz. adic.: 1,0%
Indemnización TCP: 1,11%

// Tasas cargo trabajadora:
AFP:    10% + comisión (varía por AFP)
Salud:  7% base
```

### Excepciones TCP — verificar que NO se calculan

```bash
grep -rn "gratificacion\|semana_corrida\|semana corrida" app/simulador/
# No deben existir — no aplican para TCP
```

### IMM proporcional

```typescript
// Verificar que usa getMaxHorasSemanales() dinámico, no 44 hardcodeado
grep -rn "44\|horas.*semana\|maxHoras" app/simulador/liquidacion/
```

### Ley 21.561 — jornada máxima

```typescript
// Verificar que el simulador de jornada actualiza el umbral en abril 2026
grep -rn "2026-04-26\|42.*hora\|44.*hora" app/simulador/jornada/
```

## Qué verificar en el simulador de jornada

- Horas extras: recargo mínimo 50% (no 25%)
- Puertas adentro: el simulador no debe calcular jornada para PA (es indefinida)
- Distribución días: Art. 28 — mín 5 días, máx 6 días; máx 10h/día

## Puntos de desincronización frecuentes

| Escenario | Dónde buscar |
|-----------|-------------|
| Tasa SIS cambió | Buscar `0.0154` o `1.54` en `/simulador/liquidacion/` |
| Jornada máxima sigue en 44h | Buscar `44` hardcodeado en `/simulador/jornada/` |
| Comisión AFP incorrecta | Las comisiones varían — verificar contra tabla `afps` en el panel |

## Cómo reportar un desajuste

1. Identificar el valor incorrecto en el código
2. Citar el artículo o norma que define el valor correcto
3. Indicar el archivo y línea exactos
4. NO modificar sin confirmación de Jorge (la lógica legal la define él)
