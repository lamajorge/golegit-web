---
description: Estilo editorial para artículos de /novedades y /recursos en el CMS Notion
globs:
  - "app/novedades/**"
  - "app/recursos/**"
---

# Estilo editorial — Novedades y Recursos

Reglas de redacción para los artículos publicados en Notion (DB `b844dffae5ca4ee8983d5ee3d098a70b` para Novedades y `fb8a6638e12e4d6abc288856a0ea4640` para Recursos). Antes de redactar un artículo nuevo, revisar 2–3 publicados para confirmar el tono.

## Audiencia

Empleador TCP chileno: persona común que contrata a una trabajadora de casa particular. No es abogado ni especialista en RRHH. Le importa **qué hacer, cuándo, y qué pasa si no**. Le aburre la narración dramática y la retórica.

## Apertura — directa y útil, no narrativa

**Bien:**
- "Cuando firmas un contrato con tu trabajadora, hay un segundo paso que la mayoría de los empleadores no hace: registrarlo en la Dirección del Trabajo. El plazo son 15 días hábiles."
- "Desde el 1 de enero de 2026, el ingreso mínimo mensual en Chile es $539.000 brutos para jornada completa. Si el sueldo de tu trabajadora estaba al mínimo anterior y no lo actualizaste, hay una diferencia que resolver."

**Mal:**
- "El 24 de marzo de 2026, la Corte de Apelaciones de Santiago confirmó una sentencia que…" — entrada narrativa, se siente noticia y no guía.
- "¿La razón? Un solo incumplimiento — y ni siquiera el más obvio." — gancho clickbait.

Primer párrafo: **el hecho + por qué le importa al lector ahora**. Sin drama.

## Estructura

1. **Apertura** (1–3 oraciones) con el hecho + relevancia inmediata.
2. **Headings `##`** concisos y funcionales: "La obligación", "Qué pide el formulario", "Cuánto puede costar", "¿Aplica a trabajadoras puertas adentro?".
3. **Listas y tablas** para valores, pasos o comparativas. Preferir tablas Markdown de Notion (`<table header-row="true">`) para datos ordenados.
4. **Footnote final** con un divider `---` y un párrafo en cursiva (`*…*`) con la fuente y una mención breve a cómo GoLegit ayuda. **Sin CTA comercial ni pricing.**

## Tono y lenguaje

- Segunda persona directa: "tu trabajadora", "debes", "si tienes…", "qué hacer…".
- Vocabulario chileno pyme: `DT` (no "Inspección del Trabajo"), `Previred`, `finiquito`, `IMM`, `puertas afuera` / `puertas adentro`, `laguna previsional`.
- Montos en pesos chilenos con formato `$XXX.XXX` y, cuando corresponda, equivalencia en UTM/UF.
- Referencias legales exactas: `Art. 9 CT`, `Ley 20.786`, `Ord. N°236/9 DT`. Nunca "la ley dice…".
- Bold **parco**: solo cifras críticas, fechas límite, conceptos técnicos específicos. No cada tres palabras.
- Nada de emojis. Nada de signos de exclamación.

## Footnote final — formato estándar

```markdown
---

*Fuente: Ley 21.561 y Dictamen ORD. N°236/9 de la Dirección del Trabajo
(19 de abril de 2024). GoLegit ya incorpora el límite de 42 horas y los
2 días libres en los contratos que genera desde mayo 2024.*
```

Patrón: *Fuente + una oración de cómo GoLegit lo aplica, o qué automatiza, o qué te ahorra.* En cursiva, sin bullets, sin botón, sin precio.

## Qué NO hacer — errores recurrentes

- ❌ Sección tipo "Cómo te ayuda GoLegit" con bullets de features y botón de call-to-action.
- ❌ Mencionar precios ($6.990, $11.990, etc.) dentro del artículo.
- ❌ Blockquotes como gancho emocional. Blockquotes solo para **cláusulas tipo** o citas de la ley.
- ❌ "¿La razón?", "¡lo increíble es que…!", "pero hay más…". Nada de suspenso narrativo.
- ❌ Subtítulos como "La regla que sienta el fallo" cuando puede ser simplemente "Lo que establece el fallo".
- ❌ Declarar cumplimiento legal vago ("datos seguros", "infraestructura certificada") sin respaldo concreto.

## Ejemplo de apertura reescrita

**Antes (narrativo, clickbait):**
> El 24 de marzo de 2026, la Corte de Apelaciones de Santiago confirmó una sentencia que ordenó a la cadena Salcobrand pagar el finiquito completo a un trabajador con 10 años de antigüedad. ¿La razón? Un solo incumplimiento — y ni siquiera el más obvio.

**Después (directo, operacional):**
> En marzo de 2026, la Corte de Apelaciones de Santiago confirmó una condena contra Salcobrand: la cadena debe pagar el finiquito completo a un trabajador con 10 años de antigüedad que se autodespidió por un solo incumplimiento contractual. La empresa no entregaba con la liquidación mensual el anexo con el cálculo detallado de sus comisiones variables, como exige el Art. 54 bis del Código del Trabajo.

## Título y slug

- **Título**: patrón `[Concreto]: [descriptor práctico]`. Ejemplos:
  - `Jornada de 42 horas desde el 26 de abril: lo que cambia para tu trabajadora`
  - `Registrar el contrato en la DT: la obligación de los 15 días que muchos empleadores olvidan`
  - `Entregar la liquidación mensual: la obligación que la Corte acaba de reforzar`
- **Slug**: kebab-case corto, sin tildes, SEO-friendly. Ej: `jornada-42-horas-abril-2026`, `entregar-liquidacion-mensual-caso-salcobrand`.

## Resumen (propiedad en Notion)

~200 caracteres. Aparece como gancho en la tarjeta del listado. Debe resumir el hecho + el por qué importa, no mostrar curiosidad artificial.

**Bien:**
> "La Corte de Apelaciones de Santiago confirmó que no basta con que los documentos laborales estén 'disponibles' en un portal o sistema online. Lo que la ley obliga a entregar, se entrega."

**Mal:**
> "Una trabajadora con 10 años de antigüedad ganó un caso increíble. Te contamos cómo para que no te pase."

## Antes de publicar, checklist rápido

- [ ] Apertura directa, sin "el [fecha]…" narrativo.
- [ ] Headings simples y funcionales.
- [ ] Tablas para comparativas/valores.
- [ ] Referencias legales exactas (Art., Ley, Ord.).
- [ ] Bold solo en cifras/fechas/conceptos críticos.
- [ ] Footnote en cursiva con fuente + breve mención de GoLegit.
- [ ] Sin CTA comercial, sin pricing, sin bullets de features.
- [ ] Slug corto en kebab-case.
- [ ] Cover de Supabase apuntado (ver `memory/reference_cms_workflow.md`).
