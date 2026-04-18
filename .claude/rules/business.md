# GoLegit Business — Contexto y reglas de copy

## Qué es

Landing de early access para el producto B2B de GoLegit. **No está lanzado** — el CTA captura emails para la lista de espera. Ruta: `/business`.

## Audiencia objetivo — pyme chilena

- **Tamaño:** micro y pequeña empresa, 5–50 trabajadores
- **Estructura jurídica típica:** SpA (72%), SRL, EIRL — **no SA** (rarísima en pymes)
- **Sectores principales:** gastronomía, retail, servicios, comercio
- **Dolores reales:** multas DT, lagunas previsionales de Previred, finiquitos tardíos (10 días hábiles), actas que nadie redacta, contratos de arriendo sin cláusulas clave
- **Herramientas actuales:** Excel/Word, contador externo, grupos de WhatsApp para turnos

Hablarle como a la dueña de un restaurante o el administrador de una cadena de locales retail — no como a un gerente de RRHH corporativo.

## Tres pilares del producto

### 1. Laboral (`#laboral`)
Contratos de trabajo (plazo fijo, indefinido, por obra), finiquitos, liquidaciones + Previred, rota de turnos, control de jornada (Ley 21.561), portal del trabajador, firma FES, alertas de plazos DT.

### 2. Corporativo (`#corporativo`)
Juntas de accionistas (ordinaria y extraordinaria), actas de directorio, modificaciones de estatutos, cesión/venta de acciones y cuotas, aumentos de capital, poderes y representantes.

### 3. Contratos & Documentos (`#contratos`)
Arriendos (habitacional y comercial), contratos de prestación de servicios, NDA/confidencialidad, declaraciones juradas, promesas de compraventa, firma FES para cualquier documento.

## Componentes y estructura

- **Layout:** `Navbar` (compartido, isBusiness=true) + `FooterBusiness` (específico, con `golegit-business-logo-dark.svg`)
- **Nav links Business:** `#laboral`, `#corporativo`, `#contratos` + CTA "Early access" → `#waitlist`
- **Sección operación diaria:** entre Laboral y el spotlight de Rota — 4 mini-cards (rota, control jornada, horas extra, alertas)
- **Rota spotlight:** demo visual de la rota semanal, justo después de las mini-cards operativas
- **Waitlist:** captura email → mailto a hola@golegit.cl por ahora (sin API)

## Vocabulario correcto

| Usar | No usar |
|------|---------|
| Empresa en un Día | Conservador de Comercio (para modificaciones societarias — ya casi no se usa) |
| SpA, SRL, EIRL | SA (no es el target) |
| Dirección del Trabajo / DT | Inspección del Trabajo (se usa, pero DT es más común) |
| Previred | "cotizaciones online" |
| Junta de accionistas | Asamblea (término de SA, no pyme) |
| Finiquito en 10 días hábiles | Finiquito "a tiempo" |
| Laguna previsional | "falta de cotización" |

## Operaciones societarias — Empresa en un Día vs notaría

La plataforma oficial es **registrodeempresasysociedades.cl** (Ley 20.659):
- Constitución de SpA, SRL, EIRL: 100% online, gratis, sin notaría
- Muchas modificaciones de estatutos: también online
- Cesión de acciones/cuotas simples: online
- Operaciones complejas (bienes raíces, fusiones, acuerdos con autenticación): aún requieren notaría

Copy correcto: "Documentos listos para tramitar en Empresa en un Día o ante notaría, según el tipo de operación."

## Tone of voice

- Directo, sin anglicismos innecesarios
- Concreto: nombrar la multa, el plazo, el organismo (DT, SII, Previred)
- No corporativo: hablarle a quien resuelve los problemas solo, no a un equipo legal
- Referencia a la legislación chilena real (Código del Trabajo, Ley 21.561, Ley 19.799)
