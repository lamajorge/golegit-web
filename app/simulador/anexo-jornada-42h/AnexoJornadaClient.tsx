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

const DIAS_DEFAULT: DiaSchedule[] = [
  { activo: true, entrada: "09:00", salida: "17:30" },
  { activo: true, entrada: "09:00", salida: "17:30" },
  { activo: true, entrada: "09:00", salida: "17:30" },
  { activo: true, entrada: "09:00", salida: "17:30" },
  { activo: true, entrada: "09:00", salida: "17:30" },
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
  colacion: 60,
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
              <div key={i} className="flex items-center gap-2 md:gap-3">
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
                <span className="text-xs text-ink-muted w-12 text-right tabular-nums">
                  {dia.activo ? `${horasPorDia[i].toFixed(1)}h` : "—"}
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
        <div className={`rounded-xl p-3 mb-3 border flex items-center justify-between gap-3 ${
          excede42 ? "bg-red-50 border-red-200" :
          dentroDelLimite ? "bg-emerald-50 border-emerald-200" :
          "bg-gray-50 border-gray-200"
        }`}>
          <div>
            <p className={`text-xs font-medium ${
              excede42 ? "text-red-700" :
              dentroDelLimite ? "text-emerald-700" :
              "text-ink-muted"
            }`}>Total semanal</p>
            <p className={`text-xl font-bold tabular-nums ${
              excede42 ? "text-red-700" :
              dentroDelLimite ? "text-emerald-700" :
              "text-ink"
            }`}>
              {totalHoras.toFixed(1)}h <span className="text-sm font-normal text-ink-muted">/ 42h máx.</span>
            </p>
          </div>
          {excede42 && (
            <p className="text-xs text-red-700 text-right max-w-[60%]">
              Supera el máximo legal. Reduce {(totalHoras - 42).toFixed(1)}h para cumplir la Ley 21.561.
            </p>
          )}
          {dentroDelLimite && (
            <p className="text-xs text-emerald-700 text-right">✓ Dentro del límite legal</p>
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
      <Section title="Vigencia del cambio">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Vigencia desde"
            type="date"
            value={data.vigencia_desde}
            onChange={(v) => update("vigencia_desde", v)}
            help="La Ley 21.561 entra en vigor el 26 de abril de 2026."
          />
        </div>
      </Section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={excede42}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-base py-3.5 rounded-xl transition-colors"
        >
          {excede42 ? "Ajusta el horario para no superar 42h" : "Generar vista previa del anexo"}
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
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  type?: string
  help?: string
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
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none ${
          error ? "border-red-300 bg-red-50" : "border-gray-200"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {!error && help && <p className="text-xs text-ink-muted mt-1">{help}</p>}
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

      <h1 style={{ fontSize: "13pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3px", textAlign: "center", marginBottom: 4 }}>
        Anexo de Contrato de Trabajo
      </h1>
      <h2 style={{ fontSize: "10pt", textAlign: "center", color: "#6b7280", fontWeight: 400, marginBottom: 24 }}>
        Adecuación de jornada laboral a 42 horas semanales (Ley N° 21.561)
      </h2>

      <p style={{ fontSize: "11pt", textAlign: "justify", marginBottom: 16 }}>
        En <strong>{data.ciudad || "—"}</strong>, a {fechaLarga(data.fecha_anexo)}, comparecen{" "}
        <strong>{data.empleador_nombre || "—"}</strong>, cédula de identidad N° {data.empleador_rut || "—"},
        con domicilio en {data.empleador_domicilio || "—"}, en adelante <strong>"el/la Empleador/a"</strong>;
        y <strong>{data.trabajador_nombre || "—"}</strong>, cédula de identidad N° {data.trabajador_rut || "—"},
        en adelante <strong>"el/la Trabajador/a"</strong>, ambas partes del contrato de trabajo de{" "}
        trabajador/a de casa particular puertas afuera celebrado con fecha {fechaLarga(data.fecha_contrato_original)},
        acuerdan modificar dicho contrato conforme a las siguientes cláusulas.
      </p>

      <Clausula numero="PRIMERO" titulo="Marco legal">
        Por la presente las partes adecuan el contrato a la jornada ordinaria semanal de{" "}
        <strong>42 horas</strong>, conforme al inciso 1° del artículo 22 del Código del Trabajo,
        modificado por la Ley N° 21.561 (D.O. 26.04.2023). De acuerdo al artículo segundo
        transitorio de dicha ley, esta modificación se entiende incorporada al contrato por el
        solo ministerio de la ley desde el 26 de abril de 2026, escriturándose en este acto
        para efectos de prueba y certeza.
      </Clausula>

      <Clausula numero="SEGUNDO" titulo="Jornada anterior">
        Hasta antes de la fecha de vigencia de este anexo, la jornada pactada era de{" "}
        <strong>{data.jornada_actual_horas} horas semanales</strong>.
      </Clausula>

      <Clausula numero="TERCERO" titulo="Nueva jornada de 42 horas">
        A partir del <strong>{fechaLarga(data.vigencia_desde)}</strong>, la jornada ordinaria
        semanal queda en <strong>{totalHoras.toFixed(1)} horas semanales</strong>, distribuidas de la siguiente forma:
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
          <p style={{ fontSize: "9pt", color: "#6b7280", marginTop: 6, fontStyle: "italic" }}>
            Colación de {data.colacion} minutos diarios no imputables a la jornada (Art. 34 CT).
          </p>
        </div>
      )}

      <Clausula numero="CUARTO" titulo="Mantención de remuneraciones">
        Conforme al artículo primero transitorio de la Ley N° 21.561, esta reducción de la
        jornada <strong>no implica disminución alguna de las remuneraciones</strong> pactadas
        en el contrato original. Todas las remuneraciones, beneficios y demás condiciones
        económicas se mantienen íntegramente.
      </Clausula>

      <Clausula numero="QUINTO" titulo="Vigencia">
        El presente anexo rige desde el {fechaLarga(data.vigencia_desde)}. En todo lo no
        modificado por este instrumento, el contrato original continúa plenamente vigente.
      </Clausula>

      <p style={{ fontSize: "11pt", textAlign: "justify", marginTop: 28, marginBottom: 36 }}>
        En señal de conformidad, las partes firman el presente anexo en dos ejemplares,
        quedando uno en poder de cada una.
      </p>

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
