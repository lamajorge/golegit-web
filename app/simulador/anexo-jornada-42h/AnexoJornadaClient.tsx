"use client"

import { useState } from "react"
import Link from "next/link"
import { Printer, RefreshCw, FileText, AlertCircle } from "lucide-react"

type FormData = {
  ciudad: string
  fecha_anexo: string  // YYYY-MM-DD
  empleador_nombre: string
  empleador_rut: string
  empleador_domicilio: string
  trabajador_nombre: string
  trabajador_rut: string
  fecha_contrato_original: string  // YYYY-MM-DD
  modalidad: "puertas_afuera" | "puertas_adentro"
  jornada_actual_horas: number  // 44, 45, etc.
  distribucion_actual: string  // texto libre
  distribucion_nueva: string  // texto libre, opcional
  vigencia_desde: string  // YYYY-MM-DD
}

const HOY = new Date().toISOString().split("T")[0]

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
  distribucion_actual: "",
  distribucion_nueva: "",
  vigencia_desde: "2026-04-26",
}

// Validador de RUT chileno con dígito verificador (módulo 11)
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

export default function AnexoJornadaClient() {
  const [data, setData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [showPreview, setShowPreview] = useState(false)

  const update = (k: keyof FormData, v: string | number) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!data.ciudad.trim()) errs.ciudad = "Indica la ciudad"
    if (!data.empleador_nombre.trim()) errs.empleador_nombre = "Nombre obligatorio"
    if (!validarRut(data.empleador_rut)) errs.empleador_rut = "RUT inválido"
    if (!data.empleador_domicilio.trim()) errs.empleador_domicilio = "Domicilio obligatorio"
    if (!data.trabajador_nombre.trim()) errs.trabajador_nombre = "Nombre obligatorio"
    if (!validarRut(data.trabajador_rut)) errs.trabajador_rut = "RUT inválido"
    if (!data.fecha_contrato_original) errs.fecha_contrato_original = "Fecha obligatoria"
    if (!data.distribucion_actual.trim()) errs.distribucion_actual = "Indica el horario actual del contrato"
    if (data.jornada_actual_horas < 1 || data.jornada_actual_horas > 72) errs.jornada_actual_horas = "Entre 1 y 72"

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
        {/* Botones (no se imprimen) */}
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

        {/* Aviso pre-PDF (no se imprime) */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-900 print:hidden">
          <p className="font-semibold mb-1">Cómo descargar el PDF</p>
          <p>Al imprimir, elige <strong>"Guardar como PDF"</strong> como destino en el diálogo de impresión.</p>
        </div>

        <PreviewAnexo data={data} />

        {/* CTA al portal (no se imprime) */}
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

      {/* Contrato y jornada */}
      <Section title="Datos del contrato">
        <div className="space-y-4">
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
          <Textarea
            label="Distribución horaria actual del contrato"
            placeholder="Ej: Lunes a viernes de 09:00 a 18:00 (con 1 hora de colación)"
            value={data.distribucion_actual}
            onChange={(v) => update("distribucion_actual", v)}
            error={errors.distribucion_actual}
            help="Tal como está escrito en el contrato firmado."
          />
          <Textarea
            label="Nueva distribución horaria (con 42 horas)"
            placeholder="Ej: Lunes a viernes de 09:00 a 17:30 (con 1 hora de colación)"
            value={data.distribucion_nueva}
            onChange={(v) => update("distribucion_nueva", v)}
            help="Cómo se redistribuirán las 42 horas. Opcional — si lo dejas vacío, el anexo dirá que se acordará por escrito."
          />
        </div>
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
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base py-3.5 rounded-xl transition-colors"
        >
          Generar vista previa del anexo
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

function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  help,
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  help?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink mb-1.5">{label}</label>
      <textarea
        rows={2}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-y ${
          error ? "border-red-300 bg-red-50" : "border-gray-200"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {!error && help && <p className="text-xs text-ink-muted mt-1">{help}</p>}
    </div>
  )
}

function PreviewAnexo({ data }: { data: FormData }) {
  const distribucionNueva = data.distribucion_nueva.trim() ||
    "Las partes acordarán por escrito la nueva distribución de la jornada de 42 horas semanales antes de la fecha de vigencia."

  return (
    <div
      id="anexo-preview"
      className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm print:shadow-none print:border-0 print:p-0 print:rounded-none"
      style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: "#0d1117", lineHeight: 1.6 }}
    >
      {/* Header solo visible al imprimir */}
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
        <strong>{data.jornada_actual_horas} horas semanales</strong>, distribuidas de la siguiente forma:
        <span style={{ display: "block", marginTop: 6, paddingLeft: 14, fontStyle: "italic" }}>
          {data.distribucion_actual || "—"}
        </span>
      </Clausula>

      <Clausula numero="TERCERO" titulo="Nueva jornada de 42 horas">
        A partir del <strong>{fechaLarga(data.vigencia_desde)}</strong>, la jornada ordinaria
        semanal queda reducida a <strong>42 horas</strong>, distribuidas de la siguiente forma:
        <span style={{ display: "block", marginTop: 6, paddingLeft: 14, fontStyle: "italic" }}>
          {distribucionNueva}
        </span>
      </Clausula>

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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 50 }}>
        <FirmaBloque rol="Empleador/a" nombre={data.empleador_nombre} rut={data.empleador_rut} />
        <FirmaBloque rol="Trabajador/a" nombre={data.trabajador_nombre} rut={data.trabajador_rut} />
      </div>

      {/* Footer del PDF */}
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
