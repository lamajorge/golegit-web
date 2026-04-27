"use client";

import { useState, useMemo, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────
const FECHA_42H = new Date("2026-04-26");
const JORNADA_MAX = () => (new Date() < FECHA_42H ? 44 : 42);
const COLACION_MIN = 30;
const COLACION_MAX = 120;
// Puertas adentro — Art. 146 CT
const LIMITE_DIARIO_ADENTRO = 12;   // horas máx por día
const LIMITE_SEMANAL_ADENTRO = 72;  // 6 días × 12 h máx
const DESCANSO_MIN_ADENTRO = 12;    // horas continuas entre jornadas

const DIAS = [
  { nombre: "Lunes", corto: "lunes" },
  { nombre: "Martes", corto: "martes" },
  { nombre: "Miércoles", corto: "miércoles" },
  { nombre: "Jueves", corto: "jueves" },
  { nombre: "Viernes", corto: "viernes" },
  { nombre: "Sábado", corto: "sábado" },
  { nombre: "Domingo", corto: "domingo" },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function toMins(t: string): number {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

function toHHMM(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function calcHoras(entrada: string, salida: string, colacion: number): number {
  if (!entrada || !salida) return 0;
  const diff = toMins(salida) - toMins(entrada) - colacion;
  return Math.max(0, diff / 60);
}

// ─────────────────────────────────────────────────────────────
// GENERADOR DE TEXTO DE JORNADA PARA CONTRATO
// Agrupa días consecutivos con mismo horario, capitaliza el primero.
// ─────────────────────────────────────────────────────────────
interface DiaSchedule {
  activo: boolean;
  entrada: string;
  salida: string;
}

function generarTextoJornada(
  dias: DiaSchedule[],
  colacion: number,
  modalidad: "afuera" | "adentro"
): string {
  const activos = dias
    .map((d, i) => ({ ...d, idx: i }))
    .filter((d) => d.activo && d.entrada && d.salida);

  if (activos.length === 0) return "";

  // Agrupar días consecutivos con mismo horario
  const grupos: (typeof activos)[] = [];
  let grupo = [activos[0]];
  for (let i = 1; i < activos.length; i++) {
    const prev = activos[i - 1];
    const curr = activos[i];
    if (curr.idx === prev.idx + 1 && curr.entrada === prev.entrada && curr.salida === prev.salida) {
      grupo.push(curr);
    } else {
      grupos.push(grupo);
      grupo = [curr];
    }
  }
  grupos.push(grupo);

  const partes = grupos.map((g, gi) => {
    const first = g[0];
    const last = g[g.length - 1];
    const startName = gi === 0 ? DIAS[first.idx].nombre : DIAS[first.idx].corto;
    const endName = DIAS[last.idx].corto;
    const dayStr = g.length === 1 ? startName : `${startName} a ${endName}`;
    return `${dayStr} de ${first.entrada} a ${last.salida} hrs.`;
  });

  if (modalidad === "adentro") {
    const colTexto = colacion > 0
      ? `, con ${colacion} minutos de colación dentro de la jornada`
      : "";
    return (
      partes.join(", ") +
      colTexto +
      ". La trabajadora gozará de un descanso continuo de 12 horas entre jornadas, del cual al menos 9 horas serán nocturnas e ininterrumpidas, en conformidad con el Art. 146 del Código del Trabajo."
    );
  }

  const colacionTexto = `con ${colacion} minutos de descanso diario no imputables a la jornada`;
  return partes.join(", ") + ", " + colacionTexto + ".";
}

// ─────────────────────────────────────────────────────────────
// VERIFICADOR DE DESCANSO ENTRE DÍAS (puertas adentro)
// Retorna los índices de días donde el descanso hacia el día
// siguiente es menor a 12 horas.
// ─────────────────────────────────────────────────────────────
function calcDescansosInsuficientes(dias: DiaSchedule[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < dias.length - 1; i++) {
    if (dias[i].activo && dias[i + 1].activo && dias[i].salida && dias[i + 1].entrada) {
      const salidaMins = toMins(dias[i].salida);
      const entradaMins = toMins(dias[i + 1].entrada);
      // Gap = tiempo desde salida del día i hasta entrada del día i+1 (siguiente día)
      const gapMins = (entradaMins - salidaMins + 24 * 60) % (24 * 60);
      if (gapMins > 0 && gapMins < DESCANSO_MIN_ADENTRO * 60) result.push(i);
    }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────
// PÁGINA
// ─────────────────────────────────────────────────────────────
// Default: 5 días Lun-Vie iguales 09:00-17:54, 30 min colación = 42h exactas (post Ley 21.561).
// Cada día: 8h54min bruto - 30min colación = 8h24min netas × 5 = 42h.
const DEFAULT_DIAS: DiaSchedule[] = [
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: true, entrada: "09:00", salida: "17:54" },
  { activo: false, entrada: "09:00", salida: "13:00" },
  { activo: false, entrada: "09:00", salida: "13:00" },
];

export default function JornadaPageWrapper() {
  return (
    <Suspense fallback={null}>
      <JornadaPage />
    </Suspense>
  );
}

function JornadaPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // Modalidad pre-seteada por el bot (`?m=adentro|afuera`). Si viene, el toggle queda bloqueado.
  const modParam = searchParams.get("m");
  const modalidadInicial: "afuera" | "adentro" = modParam === "adentro" ? "adentro" : "afuera";
  const modalidadBloqueada = !!token && (modParam === "adentro" || modParam === "afuera");

  const [modalidad, setModalidad] = useState<"afuera" | "adentro">(modalidadInicial);
  const [colacion, setColacion] = useState(30);
  const [dias, setDias] = useState<DiaSchedule[]>(DEFAULT_DIAS);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const jornadaMax = JORNADA_MAX();
  const diasParaCambio = Math.max(
    0,
    Math.ceil((FECHA_42H.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
  const antesDelCambio = new Date() < FECHA_42H;
  const esAdentro = modalidad === "adentro";

  function updateDia(i: number, field: keyof DiaSchedule, val: string | boolean) {
    setDias((prev) => prev.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)));
  }

  const horasPorDia = useMemo(
    () => dias.map((d) => (d.activo ? calcHoras(d.entrada, d.salida, esAdentro ? 0 : colacion) : 0)),
    [dias, colacion, esAdentro]
  );

  const totalHoras = horasPorDia.reduce((a, b) => a + b, 0);

  // Puertas afuera: límite semanal
  const horasExtra = Math.max(0, totalHoras - jornadaMax);
  const horasExtra42 = antesDelCambio ? Math.max(0, totalHoras - 42) : null;

  // Puertas adentro: límite diario de 12h (Art. 146 CT)
  const diasExceden12h = useMemo(
    () => dias.map((d, i) => d.activo && horasPorDia[i] > LIMITE_DIARIO_ADENTRO),
    [dias, horasPorDia]
  );
  const descansosInsuficientes = useMemo(
    () => (esAdentro ? calcDescansosInsuficientes(dias) : []),
    [esAdentro, dias]
  );

  // Puertas afuera: límite diario de 10h (Art. 28 inc. 2° CT, incluyendo extras)
  const diasExceden10hAfuera = useMemo(
    () => dias.map((d, i) => d.activo && horasPorDia[i] > 10),
    [dias, horasPorDia]
  );
  const algunDiaExcede10h = !esAdentro && diasExceden10hAfuera.some(Boolean);

  const horasExtraAdentro = Math.max(0, totalHoras - LIMITE_SEMANAL_ADENTRO);
  const dentroDelLimite = esAdentro
    ? !diasExceden12h.some(Boolean) && horasExtraAdentro === 0
    : horasExtra === 0 && !algunDiaExcede10h;

  const textoJornada = useMemo(
    () => generarTextoJornada(dias, colacion, modalidad),
    [dias, colacion, modalidad]
  );

  async function handleCopy() {
    if (!textoJornada) return;
    try {
      await navigator.clipboard.writeText(textoJornada);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (textRef.current) {
        textRef.current.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }

  const handleSaveToContract = useCallback(async () => {
    if (!token || saving || saved) return;
    setSaving(true);
    setSaveError(null);
    try {
      const jornada = {
        dias: dias.map((d) => ({ activo: d.activo, entrada: d.entrada, salida: d.salida })),
        colacion,
        modalidad,
        horas_semanales: totalHoras,
        texto_jornada: textoJornada,
      };
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/guardar_jornada_desde_simulador`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ p_token: token, p_jornada: jornada }),
      });
      const data = await res.json();
      if (data?.ok) {
        setSaved(true);
      } else {
        setSaveError(data?.error ?? "Error al guardar. Intenta de nuevo.");
      }
    } catch {
      setSaveError("Error de conexion. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }, [token, saving, saved, dias, colacion, modalidad, totalHoras, textoJornada]);

  const inputTimeCls =
    "bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all min-w-0 w-full";

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Token mode banner */}
      {token && !saved && (
        <div className="bg-brand-50 border-b border-brand-100">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <p className="text-sm text-brand-800">
              Define la jornada y presiona <strong>Guardar</strong>. Al terminar, vuelve a WhatsApp para continuar con tu contrato.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative pt-28 pb-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 60% at 10% 60%, rgba(187,247,208,0.28) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link
            href="/simulador"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver a simuladores
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-50 border border-brand-100 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                Semanal · Gratis
              </span>
              {antesDelCambio && (
                <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  Reducción a 42h el 26/4/2026
                </span>
              )}
            </div>
          </div>
          <h1
            className="text-3xl lg:text-4xl font-light text-ink leading-tight mb-3"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Jornada laboral
          </h1>
          <p className="text-ink-muted leading-relaxed max-w-xl">
            Define el horario semanal, establece la colación y obtén el texto de
            jornada listo para usar en el contrato de trabajo.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ── Inputs ── */}
          <div className="space-y-5">

            {/* Modalidad — bloqueada cuando viene del bot con &m=... */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-3">Modalidad</p>
              <div className={`flex gap-1 bg-gray-100 rounded-xl p-1 ${modalidadBloqueada ? "opacity-70 cursor-not-allowed" : ""}`}>
                {([
                  { key: "afuera", label: "Puertas afuera" },
                  { key: "adentro", label: "Puertas adentro" },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => { if (!modalidadBloqueada) setModalidad(key); }}
                    disabled={modalidadBloqueada}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      modalidad === key
                        ? "bg-white text-ink shadow-sm"
                        : "text-ink-muted hover:text-ink disabled:hover:text-ink-muted"
                    } ${modalidadBloqueada ? "cursor-not-allowed" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {modalidadBloqueada && (
                <p className="text-xs text-ink-light mt-2">
                  La modalidad está definida en tu contrato y no puede cambiarse desde aquí.
                </p>
              )}
              {esAdentro && (
                <p className="text-xs text-ink-muted mt-3 leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  Régimen especial Art. 149 inc. 2° CT — sin jornada semanal fija. 12 h de descanso continuo entre jornadas (mín. 9 h ininterrumpidas). El simulador es informativo: la jornada PA no se mide en horas semanales sino por descansos, días libres (Art. 150d) y compensaciones (Art. 150b/c). La reducción a 42 h de Ley 21.561 no aplica.
                </p>
              )}
            </div>

            {/* Colación */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {esAdentro ? "Colación (opcional)" : "Tiempo de colación"}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {esAdentro
                      ? "Sin mínimo legal fijo para puertas adentro"
                      : "No imputable a la jornada (Art. 34 CT)"}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={colacion}
                    onChange={(e) => {
                      const raw = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                      const min = esAdentro ? 0 : COLACION_MIN;
                      setColacion(Math.min(COLACION_MAX, Math.max(min, raw)));
                    }}
                    className="w-20 text-center bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
                  />
                  <span className="text-sm text-ink-muted">min</span>
                </div>
              </div>
              {!esAdentro && colacion < COLACION_MIN && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                  El mínimo legal para puertas afuera es 30 minutos (Art. 34 CT)
                </p>
              )}
              {colacion > COLACION_MAX && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                  El máximo habitual es 120 minutos (2 horas)
                </p>
              )}
              <p className="text-xs text-ink-light mt-3 leading-relaxed bg-gray-50 rounded-lg px-3 py-2">
                {esAdentro
                  ? "Para puertas adentro no hay mínimo legal de colación (Art. 34 CT no aplica). Lo que sí exige la ley son 12 horas de descanso continuo entre jornadas, incluyendo al menos 9 horas nocturnas ininterrumpidas."
                  : "Mín. legal: 30 min — Máx. habitual: 120 min (2 h). No se descuenta del cálculo de horas semanales."}
              </p>
            </div>

            {/* Horario semanal */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink mb-5">Horario semanal</p>

              <div className="space-y-2">
                {DIAS.map((dia, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border transition-colors ${
                      dias[i].activo ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 p-3 flex-wrap sm:flex-nowrap">
                      {/* Toggle */}
                      <button
                        role="switch"
                        aria-checked={dias[i].activo}
                        onClick={() => updateDia(i, "activo", !dias[i].activo)}
                        className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${
                          dias[i].activo ? "bg-brand-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            dias[i].activo ? "translate-x-4" : ""
                          }`}
                        />
                      </button>

                      {/* Día */}
                      <span
                        className={`text-sm font-medium flex-shrink-0 w-16 sm:w-20 ${
                          dias[i].activo ? "text-ink" : "text-ink-light"
                        }`}
                      >
                        {dia.nombre}
                      </span>

                      {dias[i].activo ? (
                        <>
                          {/* Horas (mobile: a la derecha del día, antes de los inputs) */}
                          <span className={`sm:hidden ml-auto text-sm font-medium tabular-nums ${
                            esAdentro
                              ? horasPorDia[i] > LIMITE_DIARIO_ADENTRO ? "text-red-600" : "text-brand-700"
                              : horasPorDia[i] > 10 ? "text-red-600" : "text-brand-700"
                          }`}>
                            {horasPorDia[i] > 0 ? horasPorDia[i].toFixed(1) + "h" : "—"}
                          </span>
                          {/* Inputs (mobile: row aparte ocupando ancho completo) */}
                          <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1 mt-2 sm:mt-0 basis-full sm:basis-auto">
                            <input
                              type="time"
                              value={dias[i].entrada}
                              onChange={(e) => updateDia(i, "entrada", e.target.value)}
                              className={`${inputTimeCls} flex-1 min-w-0`}
                            />
                            <span className="text-ink-light text-xs flex-shrink-0">→</span>
                            <input
                              type="time"
                              value={dias[i].salida}
                              onChange={(e) => updateDia(i, "salida", e.target.value)}
                              className={`${inputTimeCls} flex-1 min-w-0`}
                            />
                          </div>
                          {/* Horas desktop */}
                          <span className={`hidden sm:inline text-sm font-medium flex-shrink-0 w-12 text-right tabular-nums ${
                            esAdentro
                              ? horasPorDia[i] > LIMITE_DIARIO_ADENTRO ? "text-red-600" : "text-brand-700"
                              : horasPorDia[i] > 10 ? "text-red-600" : "text-brand-700"
                          }`}>
                            {horasPorDia[i] > 0 ? horasPorDia[i].toFixed(1) + "h" : "—"}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-ink-light">Día libre</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Atajos rápidos */}
              <div className="mt-4 flex flex-wrap gap-2">
                <p className="text-xs text-ink-light w-full mb-1">Presets:</p>
                {[
                  {
                    label: "Lun–Vie",
                    apply: () =>
                      setDias((prev) =>
                        prev.map((d, i) => ({
                          ...d,
                          activo: i < 5,
                          entrada: "09:00",
                          salida: "18:30",
                        }))
                      ),
                  },
                  {
                    label: "Lun–Sáb",
                    apply: () =>
                      setDias((prev) =>
                        prev.map((d, i) => ({
                          ...d,
                          activo: i < 6,
                          entrada: "08:00",
                          salida: "17:00",
                        }))
                      ),
                  },
                  {
                    label: "Limpiar",
                    apply: () =>
                      setDias((prev) =>
                        prev.map((d) => ({ ...d, activo: false }))
                      ),
                  },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={preset.apply}
                    className="text-xs text-ink-muted bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg px-2.5 py-1 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Resultados (sticky) ── */}
          <div className="lg:sticky lg:top-24 space-y-3">
            {/* Resumen horas */}
            <div
              className={`rounded-2xl p-6 text-white ${
                dentroDelLimite ? "bg-brand-600" : "bg-red-600"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 opacity-70">
                {esAdentro ? "Total semanal (referencial)" : "Total semanal"}
              </p>
              <div className="flex items-end gap-2 mb-3">
                <p
                  className="text-5xl font-light"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {totalHoras.toFixed(1)}
                </p>
                <p className="text-xl pb-1 opacity-70">horas</p>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                {dentroDelLimite ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    {esAdentro
                      ? `Dentro del límite (12 h/día · 72 h/sem)`
                      : `Dentro del límite legal (${jornadaMax} h/sem)`}
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>
                    {esAdentro
                      ? diasExceden12h.some(Boolean)
                        ? `${diasExceden12h.filter(Boolean).length} día(s) superan ${LIMITE_DIARIO_ADENTRO} h`
                        : `${horasExtraAdentro.toFixed(1)} h sobre límite semanal (${LIMITE_SEMANAL_ADENTRO} h)`
                      : `${horasExtra.toFixed(1)} h extra sobre el límite (${jornadaMax} h/sem)`}
                  </>
                )}
              </div>
            </div>

            {/* Detalle por día */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">
                Horas por día
              </p>
              <div className="space-y-2">
                {DIAS.map((dia, i) =>
                  dias[i].activo ? (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-ink-muted">{dia.nombre}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-ink-light tabular-nums">
                          {dias[i].entrada} → {dias[i].salida}
                        </span>
                        <span className={`text-sm font-medium tabular-nums w-10 text-right ${
                          esAdentro
                            ? diasExceden12h[i] ? "text-red-600" : "text-ink"
                            : horasPorDia[i] > 10 ? "text-red-600" : "text-ink"
                        }`}>
                          {horasPorDia[i].toFixed(1)}h
                        </span>
                      </div>
                    </div>
                  ) : null
                )}
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Total</span>
                  <span className="text-sm font-semibold text-ink tabular-nums">{totalHoras.toFixed(1)} h</span>
                </div>
              </div>
            </div>

            {/* Estado legal */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[11px] font-semibold text-ink-light uppercase tracking-widest mb-4">
                Estado legal
              </p>
              {esAdentro ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!diasExceden12h.some(Boolean) ? "bg-brand-500" : "bg-red-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Máx. {LIMITE_DIARIO_ADENTRO} h/día (Art. 146 CT)
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {!diasExceden12h.some(Boolean)
                          ? "Todos los días dentro del límite"
                          : `${diasExceden12h.filter(Boolean).length} día(s) superan ${LIMITE_DIARIO_ADENTRO} h`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${horasExtraAdentro === 0 ? "bg-brand-500" : "bg-amber-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Máx. {LIMITE_SEMANAL_ADENTRO} h/semana (Art. 146 CT)
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {horasExtraAdentro === 0
                          ? `Disponible: ${(LIMITE_SEMANAL_ADENTRO - totalHoras).toFixed(1)} h`
                          : `Exceso: ${horasExtraAdentro.toFixed(1)} h sobre el tope semanal`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${descansosInsuficientes.length === 0 ? "bg-brand-500" : "bg-red-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Descanso continuo: {DESCANSO_MIN_ADENTRO} h entre jornadas
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {descansosInsuficientes.length === 0
                          ? "Todos los descansos son suficientes"
                          : `${descansosInsuficientes.length} transición(es) con menos de 12 h`}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!algunDiaExcede10h ? "bg-brand-500" : "bg-red-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Máx. 10 h/día (Art. 28 inc. 2° CT)
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {!algunDiaExcede10h
                          ? "Todos los días dentro del límite"
                          : `${diasExceden10hAfuera.filter(Boolean).length} día(s) superan 10 h`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${horasExtra === 0 ? "bg-brand-500" : "bg-red-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Jornada máxima actual: {jornadaMax} h/semana
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {horasExtra === 0
                          ? `Disponible: ${(jornadaMax - totalHoras).toFixed(1)} h`
                          : `Exceso: ${horasExtra.toFixed(1)} h (recargo 50% por hora extra)`}
                      </p>
                    </div>
                  </div>
                  {antesDelCambio && (
                    <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${horasExtra42! > 0 ? "bg-amber-500" : "bg-gray-300"}`} />
                      <div>
                        <p className="text-sm font-medium text-ink">
                          Desde el 26 de abril de 2026: 42 h/semana
                        </p>
                        <p className="text-xs text-ink-muted mt-0.5">
                          {horasExtra42! > 0
                            ? `Con esta jornada habrá ${horasExtra42!.toFixed(1)} h extra`
                            : "Esta jornada cumplirá el nuevo límite"}
                          {" · "}Faltan {diasParaCambio} días
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!esAdentro && horasExtra > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-amber-800 mb-1">Horas extraordinarias</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Recargo mínimo del 50% sobre el valor hora ordinaria (Art. 32 CT).
                  Deben pactarse por escrito. Máximo 2 horas extra por día.
                </p>
              </div>
            )}

            {esAdentro && !dentroDelLimite && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-red-800 mb-1">Jornada diaria excesiva</p>
                <p className="text-xs text-red-700 leading-relaxed">
                  El Art. 146 CT limita la jornada de trabajadoras puertas adentro a 12 horas diarias.
                  Reduce el horario de los días marcados en rojo.
                </p>
              </div>
            )}

            {esAdentro && descansosInsuficientes.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-amber-800 mb-1">Descanso insuficiente entre jornadas</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  La ley exige 12 horas continuas de descanso entre jornadas, incluyendo al menos 9 horas nocturnas ininterrumpidas (Art. 146 CT).
                  Revisa los horarios de los días indicados.
                </p>
              </div>
            )}

            {/* CTA — Save to contract or generic WhatsApp CTA */}
            {token ? (
              saved ? (
                <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-brand-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    <p className="text-sm font-semibold">Jornada guardada en tu contrato</p>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Vuelve a WhatsApp y escribe cualquier mensaje para continuar con tu contrato.
                    La jornada que definiste ya esta registrada.
                  </p>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_META_PHONE_NUMBER ?? ''}`}
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium py-2.5 px-5 rounded-xl hover:bg-[#1da851] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Volver a WhatsApp
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleSaveToContract}
                    disabled={saving || !dentroDelLimite || !textoJornada}
                    className={`w-full flex items-center justify-center gap-2.5 text-sm font-medium py-3.5 px-6 rounded-2xl transition-colors ${
                      saving
                        ? "bg-gray-400 text-white cursor-wait"
                        : !dentroDelLimite || !textoJornada
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-brand-600 text-white hover:bg-brand-700"
                    }`}
                  >
                    {saving ? (
                      "Guardando..."
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        Guardar jornada en mi contrato
                      </>
                    )}
                  </button>
                  {saveError && (
                    <p className="text-xs text-red-600 text-center">{saveError}</p>
                  )}
                  <p className="text-xs text-ink-muted text-center leading-relaxed">
                    Al guardar, vuelve a WhatsApp y escribe cualquier mensaje para continuar.
                  </p>
                </div>
              )
            ) : (
              <CtaButton className="flex items-center justify-center gap-2.5 bg-ink text-white text-sm font-medium py-3.5 px-6 rounded-2xl hover:bg-ink-soft transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                GoLegit registra la jornada en el contrato
              </CtaButton>
            )}
          </div>
        </div>

        {/* ── Texto para el contrato — full width ── */}
        {textoJornada && (
          <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-ink">
                  Cláusula de jornada — lista para el contrato
                </p>
                <p className="text-xs text-ink-muted mt-1">
                  Copia y pega directamente en el campo "Jornada de Trabajo" del contrato.
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${
                  copied
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-ink-muted border-gray-200 hover:border-gray-300 hover:text-ink"
                }`}
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    Copiado
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copiar
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <div className="absolute top-3 left-4 text-[10px] font-semibold text-ink-light uppercase tracking-widest">
                Jornada laboral
              </div>
              <textarea
                ref={textRef}
                readOnly
                value={textoJornada}
                className="w-full bg-brand-50 border border-brand-100 rounded-xl pt-8 pb-4 px-4 text-sm text-ink leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand-300"
                rows={3}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
