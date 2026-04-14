---
description: Simuladores legales interactivos — liquidación y jornada. Cálculos legales vigentes.
globs:
  - "app/simulador/**"
---

# Simuladores Legales

## ⚠️ Antes de modificar cualquier tasa o fórmula

Verificar en `golegit/qa/legal/codigo_trabajo_DT_2026.txt`. Los simuladores contienen lógica legal que debe estar alineada con la ley vigente. Jorge (abogado) define los cálculos; no modificar sin su aprobación.

## Simulador de Liquidación (`/simulador/liquidacion`)

Calcula el pago mensual de un TCP incluyendo descuentos de la trabajadora y aportes del empleador.

### Descuentos trabajadora

```
AFP: 10% + comisión AFP (variable por AFP)
Salud: 7% (Fonasa base; isapres tienen cotización adicional)
```

### Aportes empleador (cargo)

```
SIS:          1,54%
AFC:          3,0%  (2,2% cuenta individual + 0,8% fondo solidario)
Mutual:       0,93% (0,90% accidentes + 0,03% Ley SANNA)
Cotiz. adic.: 1,0%  (0,9% seguro social + 0,1% cuenta individual)
Indemnización TCP: 1,11% (en AFC Chile, especial para TCP)
```

### IMM proporcional (≤30h semanales)

```typescript
function getMaxHorasSemanales(fecha: Date): number {
  if (fecha >= new Date('2026-04-26')) return 42   // Ley 21.561
  if (fecha >= new Date('2028-01-01')) return 40   // aprox.
  return 44
}
// IMM proporcional = ceil(IMM * horas / getMaxHorasSemanales(fecha))
```

### Excepciones TCP

- **Sin gratificación** — no aplica para trabajadores de casa particular
- **Sin semana corrida** — no aplica para TCP
- AFP: tasa base 10% + comisión (varía entre 0,49% y 1,45% según AFP)

## Simulador de Jornada (`/simulador/jornada`)

Calcula distribución de horas, horas extras y su valor.

### Ley 21.561 — reducción progresiva de jornada

```
Hasta 25 abr 2026:  máximo 44h/semana
26 abr 2026:        máximo 42h/semana  ← en vigencia ahora
2028 (aprox.):      máximo 40h/semana
```

Las horas sobre el máximo legal son horas extras. El simulador debe usar la jornada máxima correcta según la fecha actual.

### Horas extras

```
Recargo mínimo: 50% sobre el valor hora ordinaria
Valor hora ordinaria = (sueldo_mensual / (semanas_en_mes × max_horas_semanales))
```

### Puertas adentro (Art. 149)

- Sin horario fijo
- Mínimo 12h de descanso diario
- 9h ininterrumpidas de descanso nocturno
- Los simuladores no calculan jornada PA (es indefinida por ley)

## Validación de tasas

Las tasas previsionales (SIS, AFC, mutual) las administra el **panel** en `indicadores_previsionales`. Si en producción las tasas cambian, el panel las actualiza y las Edge Functions de `golegit` las leen de DB. Los simuladores web tienen las tasas hardcodeadas como referencia estática — actualizar cuando cambien oficialmente.

Tasas vigentes a actualizar en `/simulador/liquidacion`:

```typescript
const TASAS_EMPLEADOR = {
  sis: 0.0154,
  afc_cuenta: 0.022,
  afc_fondo: 0.008,
  mutual: 0.0093,
  cotiz_adicional: 0.01,
  indemnizacion_tcp: 0.0111,
}
```
