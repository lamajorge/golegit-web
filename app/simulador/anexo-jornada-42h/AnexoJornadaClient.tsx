"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Printer, RefreshCw, FileText, AlertCircle, Copy } from "lucide-react"

// ─────────────────────────────────────────────────────────────
// Tipos y constantes
// ─────────────────────────────────────────────────────────────

type DiaSchedule = {
  activo: boolean
  entrada: string
  salida: string
}

type FormData = {
  ciudad: string
  fecha_anexo: string
  empleador_nombre: string
  empleador_rut: string
  empleador_domicilio: string
  trabajador_nombre: string
  trabajador_rut: string
  fecha_contrato_original: string
  modalidad: "puertas_afuera" | "puertas_adentro"
  jornada_actual_horas: number
  vigencia_desde: string
  colacion: number
  dias: DiaSchedule[]
}

const HOY = new Date().toISOString().split("T")[0]

const DIAS_INFO = [
  { nombre: "Lunes", corto: "lunes" },
  { nombre: "Martes", corto: "martes" },
  { nombre: "Miércoles", corto: "miércoles" },
  { nombre: "Jueves", corto: "jueves" },
  { nombre: "Viernes", corto: "viernes" },
  { nombre: "Sábado", corto: "sábado" },
  { nombre: "Domingo", corto: "domingo" },
]

// Default: 42h exactas con 30 min de colación, 5 días Lun-Vie.
// 42h / 5 = 8.4h netas/día → 8h54m bruto → 09:00 a 17:54.
const DIAS_DEFAULT: DiaSchedule[] = [
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: false, entrada: "09:00", salida: "13:00" },
  { activo: false, entrada: "09:00", salida: "13:00" },
]

const INITIAL: FormData = {
  ciudad: "",
  fecha_anexo: HOY,
  empleador_nombre: "",
  empleador_rut: "",
  empleador_domicilio: "",
  trabajador_nombre: "",
  trabajador_rut: "",
  fecha_contrato_original: "",
  modalidad: "puertas_afuera",
  jornada_actual_horas: 44,
  vigencia_desde: "2026-04-26",
  colacion: 30,
  dias: DIAS_DEFAULT,
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function toMins(t: string): number {
  if (!t) return 0
  const [h, m] = t.split(":").map(Number)
  return h * 60 + (m || 0)
}

function calcHoras(entrada: string, salida: string, colacionMins: number): number {
  if (!entrada || !salida) return 0
  const diff = toMins(salida) - toMins(entrada) - colacionMins
  return Math.max(0, diff / 60)
}

function generarTextoJornada(dias: DiaSchedule[], colacion: number): string {
  const activos = dias
    .map((d, i) => ({ ...d, idx: i }))
    .filter((d) => d.activo && d.entrada && d.salida)
  if (activos.length === 0) return ""
  const grupos: (typeof activos)[] = []
  let grupo = [activos[0]]
  for (let i = 1; i < activos.length; i++) {
    const prev = activos[i - 1]
    const curr = activos[i]
    if (curr.idx === prev.idx + 1 && curr.entrada === prev.entrada && curr.salida === prev.salida) {
      grupo.push(curr)
    } else {
      grupos.push(grupo)
      grupo = [curr]
    }
  }
  grupos.push(grupo)
  const partes = grupos.map((g, gi) => {
    const first = g[0]
    const last = g[g.length - 1]
    const startName = gi === 0 ? DIAS_INFO[first.idx].nombre : DIAS_INFO[first.idx].corto
    const endName = DIAS_INFO[last.idx].corto
    const dayStr = g.length === 1 ? startName : `${startName} a ${endName}`
    return `${dayStr} de ${first.entrada} a ${last.salida} hrs.`
  })
  return partes.join(", ") + `, con ${colacion} minutos de descanso diario no imputables a la jornada.`
}

function validarRut(rut: string): boolean {
  const limpio = rut.replace(/[.\-\s]/g, "").toUpperCase()
  if (!/^[0-9]+[0-9K]$/.test(limpio)) return false
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  let suma = 0
  let mul = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * mul
    mul = mul === 7 ? 2 : mul + 1
  }
  const resto = 11 - (suma % 11)
  const dvCalc = resto === 11 ? "0" : resto === 10 ? "K" : String(resto)
  return dv === dvCalc
}

function formatRut(rut: string): string {
  const limpio = rut.replace(/[.\-\s]/g, "").toUpperCase()
  if (limpio.length < 2) return rut
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  return `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`
}

function fechaLarga(iso: string): string {
  if (!iso) return ""
  const [y, m, d] = iso.split("-")
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
  return `${parseInt(d)} de ${meses[parseInt(m)-1]} de ${y}`
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────

export default function AnexoJornadaClient() {
  const [data, setData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})
  const [showPreview, setShowPreview] = useState(false)

  const update = (k: keyof FormData, v: unknown) => {
    setData((d) => ({ ...d, [k]: v as never }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const horasPorDia = useMemo(
    () => data.dias.map((d) => (d.activo ? calcHoras(d.entrada, d.salida, data.colacion) : 0)),
    [data.dias, data.colacion]
  )
  const totalHoras = horasPorDia.reduce((a, b) => a + b, 0)
  const dentroDelLimite = totalHoras > 0 && totalHoras <= 42
  const excede42 = totalHoras > 42
  const horasExtra = Math.max(0, totalHoras - 42)
  // Art. 28 CT inciso 2°: jornada diaria máxima = 10 horas (incluyendo extras).
  const diasExceden10h = horasPorDia.map((h) => h > 10)
  const algunDiaExcede = diasExceden10h.some(Boolean)
  const distribucionTexto = useMemo(
    () => generarTextoJornada(data.dias, data.colacion),
    [data.dias, data.colacion]
  )

  function updateDia(i: number, field: keyof DiaSchedule, val: string | boolean) {
    setData((prev) => ({
      ...prev,
      dias: prev.dias.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)),
    }))
  }

  function aplicarATodos() {
    const primero = data.dias.find((d) => d.activo)
    if (!primero) return
    setData((prev) => ({
      ...prev,
      dias: prev.dias.map((d) => (d.activo ? { ...d, entrada: primero.entrada, salida: primero.salida } : d)),
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<Record<string, string>> = {}
    if (!data.ciudad.trim()) errs.ciudad = "Indica la ciudad"
    if (!data.empleador_nombre.trim()) errs.empleador_nombre = "Nombre obligatorio"
    if (!validarRut(data.empleador_rut)) errs.empleador_rut = "RUT inválido"
    if (!data.empleador_domicilio.trim()) errs.empleador_domicilio = "Domicilio obligatorio"
    if (!data.trabajador_nombre.trim()) errs.trabajador_nombre = "Nombre obligatorio"
    if (!validarRut(data.trabajador_rut)) errs.trabajador_rut = "RUT inválido"
    if (!data.fecha_contrato_original) errs.fecha_contrato_original = "Fecha obligatoria"
    if (totalHoras === 0) errs.dias = "Configura al menos un día con horario"
    if (excede42) errs.dias = "El total semanal supera las 42 horas"
    if (data.vigencia_desde < "2026-04-26") {
      errs.vigencia_desde = "La nueva jornada de 42 hrs rige desde el 26 de abril de 2026 — no puede aplicarse antes."
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setShowPreview(true)
    setTimeout(() => {
      const el = document.getElementById("anexo-preview")
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  // PA-adentro NO aplica
  if (data.modalidad === "puertas_adentro") {
    return (
      <div className="bg-white border border-amber-200 rounded-2xl p-8 shadow-sm print:hidden">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-ink mb-2">Trabajadoras puertas adentro: no aplica el cambio</h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Las trabajadoras de casa particular <strong>puertas adentro</strong> NO se rigen por la jornada
              ordinaria del Art. 22 del Código del Trabajo, sino por el régimen especial del{" "}
              <strong>Art. 149 inciso 2°</strong>: descansos mínimos (12 horas diarias absolutas, 9 horas ininterrumpidas
              entre jornadas) sin horario fijo. La reducción de la Ley 21.561 no las afecta.
            </p>
            <p className="text-sm text-ink-muted leading-relaxed mt-3">
              A cambio, ya tienen el beneficio del Art. 150 letra d): <strong>2 días de libre disposición remunerados al mes</strong>.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => update("modalidad", "puertas_afuera")}
          className="text-sm font-medium text-brand-700 hover:text-brand-800 underline"
        >
          Volver al formulario
        </button>
      </div>
    )
  }

  if (showPreview) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4" />
            Descargar PDF / Imprimir
          </button>
          <button
            onClick={() => setShowPreview(false)}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-ink font-medium text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Editar datos
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-900 print:hidden">
          <p className="font-semibold mb-1">Cómo descargar el PDF</p>
          <p>Al imprimir, elige <strong>"Guardar como PDF"</strong> como destino en el diálogo de impresión.</p>
        </div>

        <PreviewAnexo data={data} distribucionTexto={distribucionTexto} totalHoras={totalHoras} />

        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 mt-8 print:hidden">
          <h3 className="text-base font-semibold text-ink mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            ¿Querés firmar electrónicamente y mantener todo registrado?
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">
            En GoLegit puedes generar contratos, anexos, liquidaciones y finiquitos con firma electrónica avanzada
            (FES). Tu trabajadora firma desde su celular, todo queda con valor probatorio y respaldado en la nube.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            Conoce GoLegit gratis 30 días →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Modalidad */}
      <Section title="Modalidad de trabajo">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => update("modalidad", "puertas_afuera")}
            className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-colors ${
              data.modalidad === "puertas_afuera"
                ? "bg-brand-50 border-brand-300 text-brand-800"
                : "bg-white border-gray-200 hover:border-gray-300 text-ink"
            }`}
          >
            <div className="font-semibold">Puertas afuera</div>
            <div className="text-xs text-ink-muted mt-0.5">No vive en la casa del empleador</div>
          </button>
          <button
            type="button"
            onClick={() => update("modalidad", "puertas_adentro")}
            className="px-4 py-3 rounded-xl border bg-white border-gray-200 hover:border-gray-300 text-ink text-sm font-medium text-left transition-colors"
          >
            <div className="font-semibold">Puertas adentro</div>
            <div className="text-xs text-ink-muted mt-0.5">Vive en la casa del empleador</div>
          </button>
        </div>
      </Section>

      {/* Lugar y fecha */}
      <Section title="Lugar y fecha del anexo">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Ciudad" placeholder="Santiago" value={data.ciudad} onChange={(v) => update("ciudad", v)} error={errors.ciudad} />
          <Input label="Fecha del anexo" type="date" value={data.fecha_anexo} onChange={(v) => update("fecha_anexo", v)} />
        </div>
      </Section>

      {/* Empleador */}
      <Section title="Empleador/a">
        <div className="space-y-4">
          <Input label="Nombre completo" placeholder="Juan Pérez González" value={data.empleador_nombre} onChange={(v) => update("empleador_nombre", v)} error={errors.empleador_nombre} />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="RUT"
              placeholder="12.345.678-9"
              value={data.empleador_rut}
              onChange={(v) => update("empleador_rut", v)}
              onBlur={() => data.empleador_rut && update("empleador_rut", formatRut(data.empleador_rut))}
              error={errors.empleador_rut}
            />
            <Input label="Domicilio" placeholder="Av. Apoquindo 1234, Las Condes" value={data.empleador_domicilio} onChange={(v) => update("empleador_domicilio", v)} error={errors.empleador_domicilio} />
          </div>
        </div>
      </Section>

      {/* Trabajador/a */}
      <Section title="Trabajador/a">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Nombre completo" placeholder="María González Soto" value={data.trabajador_nombre} onChange={(v) => update("trabajador_nombre", v)} error={errors.trabajador_nombre} />
          <Input
            label="RUT"
            placeholder="11.222.333-4"
            value={data.trabajador_rut}
            onChange={(v) => update("trabajador_rut", v)}
            onBlur={() => data.trabajador_rut && update("trabajador_rut", formatRut(data.trabajador_rut))}
            error={errors.trabajador_rut}
          />
        </div>
      </Section>

      {/* Contrato */}
      <Section title="Datos del contrato">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Fecha del contrato original" type="date" value={data.fecha_contrato_original} onChange={(v) => update("fecha_contrato_original", v)} error={errors.fecha_contrato_original} />
          <div>
            <label className="block text-xs font-medium text-ink mb-1.5">Jornada actual</label>
            <select
              value={data.jornada_actual_horas}
              onChange={(e) => update("jornada_actual_horas", Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            >
              <option value={45}>45 horas semanales (anterior a Ley 21.561)</option>
              <option value={44}>44 horas semanales (vigente hasta 25-abr-2026)</option>
              <option value={42}>42 horas semanales (ya está adecuado)</option>
              <option value={40}>40 horas semanales (anticipado)</option>
            </select>
          </div>
        </div>
      </Section>

      {/* Nueva distribución horaria — simulador embebido */}
      <Section title="Nueva distribución de la jornada (42 horas)">
        <p className="text-xs text-ink-muted mb-3">
          Define el horario día a día. La colación no se cuenta en la jornada (Art. 34 CT).
        </p>

        {/* Grilla de días */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-4 mb-3">
          <div className="space-y-2">
            {data.dias.map((dia, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 flex-wrap md:flex-nowrap">
                <label className="flex items-center gap-2 w-24 md:w-28 shrink-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dia.activo}
                    onChange={(e) => updateDia(i, "activo", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className={`text-xs md:text-sm font-medium ${dia.activo ? "text-ink" : "text-ink-muted"}`}>
                    {DIAS_INFO[i].nombre}
                  </span>
                </label>
                {/* Horas (mobile: ml-auto para empujar al borde derecho) */}
                <span
                  className={`md:hidden ml-auto text-xs tabular-nums font-medium ${
                    !dia.activo ? "text-ink-muted" :
                    diasExceden10h[i] ? "text-red-700" :
                    "text-ink-muted"
                  }`}
                  title={diasExceden10h[i] ? "Excede el máximo legal diario de 10 horas (Art. 28 CT)" : undefined}
                >
                  {dia.activo ? `${horasPorDia[i].toFixed(1)}h${diasExceden10h[i] ? " ⚠" : ""}` : "—"}
                </span>
                {/* Inputs (mobile: row aparte ocupando todo el ancho) */}
                <div className="flex items-center gap-2 w-full md:w-auto md:flex-1 basis-full md:basis-auto mt-1 md:mt-0">
                  <input
                    type="time"
                    value={dia.entrada}
                    onChange={(e) => updateDia(i, "entrada", e.target.value)}
                    disabled={!dia.activo}
                    className="flex-1 min-w-0 px-2 py-1.5 text-xs md:text-sm border border-gray-200 rounded-md disabled:bg-gray-100 disabled:text-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                  <span className="text-xs text-ink-muted">a</span>
                  <input
                    type="time"
                    value={dia.salida}
                    onChange={(e) => updateDia(i, "salida", e.target.value)}
                    disabled={!dia.activo}
                    className="flex-1 min-w-0 px-2 py-1.5 text-xs md:text-sm border border-gray-200 rounded-md disabled:bg-gray-100 disabled:text-gray-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                {/* Horas desktop */}
                <span
                  className={`hidden md:inline text-xs w-12 text-right tabular-nums font-medium ${
                    !dia.activo ? "text-ink-muted" :
                    diasExceden10h[i] ? "text-red-700" :
                    "text-ink-muted"
                  }`}
                  title={diasExceden10h[i] ? "Excede el máximo legal diario de 10 horas (Art. 28 CT)" : undefined}
                >
                  {dia.activo ? `${horasPorDia[i].toFixed(1)}h${diasExceden10h[i] ? " ⚠" : ""}` : "—"}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-ink-muted">Colación</label>
              <select
                value={data.colacion}
                onChange={(e) => update("colacion", Number(e.target.value))}
                className="px-2 py-1 text-xs border border-gray-200 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              >
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
                <option value={120}>120 min</option>
              </select>
            </div>
            <button
              type="button"
              onClick={aplicarATodos}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-800"
            >
              <Copy className="w-3 h-3" />
              Aplicar el primer horario a todos los días activos
            </button>
          </div>
        </div>

        {/* Total horas + estado */}
        <div className={`rounded-xl p-3 mb-3 border ${
          algunDiaExcede ? "bg-red-50 border-red-300" :
          excede42 ? "bg-amber-50 border-amber-300" :
          dentroDelLimite ? "bg-emerald-50 border-emerald-200" :
          "bg-gray-50 border-gray-200"
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-xs font-medium ${
                algunDiaExcede ? "text-red-700" :
                excede42 ? "text-amber-700" :
                dentroDelLimite ? "text-emerald-700" :
                "text-ink-muted"
              }`}>Total semanal</p>
              <p className={`text-xl font-bold tabular-nums ${
                algunDiaExcede ? "text-red-700" :
                excede42 ? "text-amber-700" :
                dentroDelLimite ? "text-emerald-700" :
                "text-ink"
              }`}>
                {totalHoras.toFixed(1)}h <span className="text-sm font-normal text-ink-muted">/ 42h ordinaria</span>
              </p>
            </div>
            {dentroDelLimite && !algunDiaExcede && (
              <p className="text-xs text-emerald-700 text-right">✓ Dentro del límite legal</p>
            )}
          </div>

          {/* Alerta máximo diario (10h Art. 28 CT) */}
          {algunDiaExcede && (
            <p className="text-xs text-red-700 mt-2 leading-relaxed">
              <strong>⚠ Excede el máximo legal diario.</strong> Algún día supera las 10 horas, que es el tope absoluto
              incluyendo horas extras (Art. 28 inciso 2° del Código del Trabajo). Ajusta el horario antes de continuar.
            </p>
          )}

          {/* Alerta horas extras (cuando excede 42h pero no 10h por día) */}
          {!algunDiaExcede && excede42 && (
            <p className="text-xs text-amber-800 mt-2 leading-relaxed">
              <strong>{horasExtra.toFixed(1)} horas serían extraordinarias.</strong> Las horas que superan la
              jornada ordinaria de 42 horas semanales son extras y deben pagarse con un recargo mínimo del{" "}
              <strong>50%</strong> sobre el sueldo (Art. 32 CT). El máximo legal es 2 horas extras por día.
            </p>
          )}
        </div>

        {/* Texto generado */}
        {distribucionTexto && (
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
              Cláusula que aparecerá en el anexo
            </p>
            <p className="text-sm text-ink leading-relaxed italic">{distribucionTexto}</p>
          </div>
        )}

        {errors.dias && <p className="text-xs text-red-600 mt-2">{errors.dias}</p>}
      </Section>

      {/* Vigencia */}
      <Section title="Vigencia de la nueva jornada">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Vigencia desde"
            type="date"
            value={data.vigencia_desde}
            onChange={(v) => update("vigencia_desde", v)}
            min="2026-04-26"
            error={errors.vigencia_desde}
            help="La nueva jornada de 42 horas rige por ley desde el 26 de abril de 2026. Si firmas el anexo después, la vigencia debe seguir siendo el 26-abr-2026 (no la fecha de firma)."
          />
        </div>
      </Section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={algunDiaExcede || excede42 || totalHoras === 0}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-base py-3.5 rounded-xl transition-colors"
        >
          {algunDiaExcede ? "Ajusta los días que superan 10h" :
           excede42 ? "Reduce horas para no superar 42h semanales" :
           totalHoras === 0 ? "Configura al menos un día" :
           "Generar vista previa del anexo"}
        </button>
      </div>
    </form>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">{title}</h2>
      {children}
    </div>
  )
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  help,
  min,
  max,
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  type?: string
  help?: string
  min?: string
  max?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        min={min}
        max={max}
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none ${
          error ? "border-red-300 bg-red-50" : "border-gray-200"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {!error && help && <p className="text-xs text-ink-muted mt-1 leading-relaxed">{help}</p>}
    </div>
  )
}

function PreviewAnexo({ data, distribucionTexto, totalHoras }: { data: FormData; distribucionTexto: string; totalHoras: number }) {
  const diasActivos = data.dias
    .map((d, i) => ({ ...d, idx: i }))
    .filter((d) => d.activo && d.entrada && d.salida)
  return (
    <div
      id="anexo-preview"
      className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm print:shadow-none print:border-0 print:p-0 print:rounded-none"
      style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: "#0d1117", lineHeight: 1.6 }}
    >
      <div className="hidden print:block mb-8 pb-3 border-b-2 border-brand-600">
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "11pt", fontWeight: 700, color: "#16a34a" }}>GoLegit</span>
          <span style={{ fontSize: "8pt", color: "#6b7280" }}>golegit.cl</span>
        </div>
      </div>

      <h1 style={{ fontSize: "13pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3px", textAlign: "center", marginBottom: 24 }}>
        Anexo de Contrato de Trabajo
      </h1>

      <p style={{ fontSize: "11pt", textAlign: "justify", marginBottom: 16 }}>
        En <strong>{data.ciudad || "—"}</strong>, a {fechaLarga(data.fecha_anexo)}, entre{" "}
        <strong>{data.empleador_nombre || "—"}</strong>, cédula nacional de identidad N° {data.empleador_rut || "—"},
        con domicilio en {data.empleador_domicilio || "—"}, en adelante el <strong>"EMPLEADOR/A"</strong>;
        y <strong>{data.trabajador_nombre || "—"}</strong>, cédula nacional de identidad N° {data.trabajador_rut || "—"},
        en adelante el <strong>"TRABAJADOR/A"</strong>, se ha convenido el siguiente anexo de contrato de trabajo:
      </p>

      <Clausula numero="PRIMERO" titulo="">
        Las partes declaran que con fecha <strong>{fechaLarga(data.fecha_contrato_original)}</strong> han suscrito un
        contrato de trabajo de trabajador/a de casa particular puertas afuera, que se encuentra plenamente vigente.
      </Clausula>

      <Clausula numero="SEGUNDO" titulo="">
        La jornada de trabajo tendrá una duración de <strong>{totalHoras.toFixed(1)} horas semanales</strong>,
        distribuidas de la siguiente forma:
        <span style={{ display: "block", marginTop: 6, paddingLeft: 14, fontStyle: "italic" }}>
          {distribucionTexto || "—"}
        </span>
      </Clausula>

      {/* Tabla detalle */}
      {diasActivos.length > 0 && (
        <div style={{ marginBottom: 16, marginLeft: 14 }}>
          <table style={{ borderCollapse: "collapse", fontSize: "10pt", width: "100%", maxWidth: 480 }}>
            <thead>
              <tr style={{ borderBottom: "1.5px solid #0d1117", textAlign: "left" }}>
                <th style={{ padding: "6px 10px", fontWeight: 700 }}>Día</th>
                <th style={{ padding: "6px 10px", fontWeight: 700 }}>Entrada</th>
                <th style={{ padding: "6px 10px", fontWeight: 700 }}>Salida</th>
                <th style={{ padding: "6px 10px", fontWeight: 700, textAlign: "right" }}>Horas</th>
              </tr>
            </thead>
            <tbody>
              {diasActivos.map((d) => {
                const horas = calcHoras(d.entrada, d.salida, data.colacion)
                return (
                  <tr key={d.idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "6px 10px" }}>{DIAS_INFO[d.idx].nombre}</td>
                    <td style={{ padding: "6px 10px" }}>{d.entrada}</td>
                    <td style={{ padding: "6px 10px" }}>{d.salida}</td>
                    <td style={{ padding: "6px 10px", textAlign: "right" }}>{horas.toFixed(1)}h</td>
                  </tr>
                )
              })}
              <tr style={{ borderTop: "1.5px solid #0d1117", fontWeight: 700 }}>
                <td style={{ padding: "6px 10px" }} colSpan={3}>Total semanal</td>
                <td style={{ padding: "6px 10px", textAlign: "right" }}>{totalHoras.toFixed(1)}h</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <p style={{ fontSize: "11pt", textAlign: "justify", marginBottom: 16 }}>
        La jornada diaria será interrumpida por un descanso de <strong>{data.colacion} minutos</strong> destinados
        a colación, tiempo que no forma parte de la jornada laboral conforme al artículo 34 del Código del Trabajo.
      </p>

      <p style={{ fontSize: "11pt", textAlign: "justify", marginBottom: 16 }}>
        Cuando las necesidades del servicio requieran la prestación de servicios en horario fuera de la jornada
        ordinaria semanal, las horas trabajadas serán pactadas y pagadas como extraordinarias conforme a lo
        establecido en el artículo 32 del Código del Trabajo.
      </p>

      <Clausula numero="TERCERO" titulo="">
        Para todos los efectos legales, este anexo se entiende incorporado al contrato de trabajo individualizado
        en la cláusula primera, pasando a formar parte integrante de aquél. En todo lo no modificado por este
        instrumento, dicho contrato continúa plenamente vigente.
      </Clausula>

      <Clausula numero="CUARTO" titulo="">
        Las partes dejan constancia que la nueva distribución de jornada acordada en este anexo
        rige a partir del <strong>{fechaLarga(data.vigencia_desde)}</strong>, fecha en que entró
        en vigor la jornada ordinaria de 42 horas semanales por imperio del Art. 22 del Código del
        Trabajo, modificado por la Ley N° 21.561.
      </Clausula>

      <Clausula numero="QUINTO" titulo="">
        El presente anexo se firma en dos ejemplares del mismo tenor y fecha, quedando uno en poder del
        Empleador/a y el otro en poder del Trabajador/a, quien declara haberlo recibido en este acto a su entera
        satisfacción y que es fiel reflejo de la relación laboral que une a las partes.
      </Clausula>

      <div className="firmas-bloque" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 50 }}>
        <FirmaBloque rol="Empleador/a" nombre={data.empleador_nombre} rut={data.empleador_rut} />
        <FirmaBloque rol="Trabajador/a" nombre={data.trabajador_nombre} rut={data.trabajador_rut} />
      </div>

      <div style={{ marginTop: 40, paddingTop: 12, borderTop: "1px solid #e5e7eb", textAlign: "center", fontSize: "8pt", color: "#9ca3af" }}>
        Documento generado en golegit.cl — Plataforma legal para empleadores de trabajadoras de casa particular
      </div>
    </div>
  )
}

function Clausula({ numero, titulo, children }: { numero: string; titulo: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: "11pt", textAlign: "justify" }}>
        <span style={{ fontWeight: 700, color: "#0d1117" }}>{numero}.- {titulo}.</span>{" "}
        {children}
      </p>
    </div>
  )
}

function FirmaBloque({ rol, nombre, rut }: { rol: string; nombre: string; rut: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ borderTop: "1px solid #374151", paddingTop: 8, marginTop: 50 }} />
      <p style={{ fontSize: "9pt", fontWeight: 600 }}>{nombre || "—"}</p>
      <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: 2 }}>RUT: {rut || "—"}</p>
      <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: 1 }}>{rol}</p>
    </div>
  )
}
