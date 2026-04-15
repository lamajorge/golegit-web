"use client";

import { useState, FormEvent } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface VerificacionResult {
  encontrado: boolean;
  error?: string;
  tipo_documento?: string;
  nombre_documento?: string;
  estado?: string;
  estado_firma?: string;
  metodo_firma?: string;
  firmado_empleador_en?: string | null;
  firmado_trabajador_en?: string | null;
  creado_en?: string;
  nombre_empleador?: string;
  nombre_trabajador?: string;
}

interface Firmante {
  rol: "empleador" | "trabajador";
  nombre: string;
  firmado_en: string;
}

const TIPO_DOC_LABEL: Record<string, string> = {
  contrato: "Contrato de trabajo",
  anexo: "Anexo de modificaci\u00f3n",
  liquidacion: "Liquidaci\u00f3n de sueldo",
  finiquito: "Finiquito",
  carta_aviso: "Carta de aviso",
  amonestacion: "Amonestaci\u00f3n escrita",
  certificado_vacaciones: "Certificado de vacaciones",
  certificado_antiguedad: "Certificado de antig\u00fcedad",
  protocolo_karin: "Protocolo Ley Karin",
};

const ESTADO_FIRMA_LABEL: Record<string, { label: string; color: string }> = {
  sin_firma: { label: "Sin firma", color: "text-gray-500" },
  simple: { label: "Firmado por una parte", color: "text-amber-600" },
  completa: { label: "Firmado por ambas partes", color: "text-green-700" },
  ninguno: { label: "Sin firma requerida", color: "text-gray-400" },
};

function formatFecha(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Santiago",
    });
  } catch {
    return iso;
  }
}

export default function VerificarCliente() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificacionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setResult(null);
    setErrorMsg("");

    const raw = codigo.trim().toUpperCase();
    if (!/^GL-[0-9A-F]{8}$/.test(raw)) {
      setErrorMsg(
        'El c\u00f3digo debe tener el formato GL-XXXXXXXX (ejemplo: GL-1A2B3C4D).'
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verificar_documento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ p_codigo: raw }),
      });

      if (!res.ok) {
        setErrorMsg("Error al consultar. Intenta nuevamente.");
        return;
      }

      const data: VerificacionResult = await res.json();
      setResult(data);
    } catch {
      setErrorMsg("Error de conexi\u00f3n. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          placeholder="GL-1A2B3C4D"
          maxLength={11}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-ink font-mono text-lg tracking-wider focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl px-5 py-2.5 disabled:opacity-50 transition-colors"
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>
      </form>

      {errorMsg && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-xl p-4 text-sm">
          {errorMsg}
        </div>
      )}

      {result && !result.encontrado && !result.error && (
        <div className="border border-amber-200 bg-amber-50 text-amber-800 rounded-xl p-4 text-sm">
          No se encontr&oacute; ning&uacute;n documento con este c&oacute;digo
          de verificaci&oacute;n. Verifica que el c&oacute;digo sea correcto.
        </div>
      )}

      {result?.encontrado && (() => {
        // Construir lista de firmantes a partir de los datos del RPC
        const firmantes: Firmante[] = []
        if (result.firmado_empleador_en && result.nombre_empleador)
          firmantes.push({ rol: "empleador", nombre: result.nombre_empleador, firmado_en: result.firmado_empleador_en })
        if (result.firmado_trabajador_en && result.nombre_trabajador)
          firmantes.push({ rol: "trabajador", nombre: result.nombre_trabajador, firmado_en: result.firmado_trabajador_en })
        const n_firmas = firmantes.length

        return (
          <div className="border border-green-200 bg-green-50 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-700 font-semibold text-sm">
                Documento verificado
              </span>
            </div>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-ink-muted">Tipo</dt>
              <dd className="text-ink font-medium">
                {TIPO_DOC_LABEL[result.tipo_documento ?? ""] ??
                  result.tipo_documento}
              </dd>

              {result.nombre_documento && (
                <>
                  <dt className="text-ink-muted">Documento</dt>
                  <dd className="text-ink">{result.nombre_documento}</dd>
                </>
              )}

              {result.nombre_empleador && (
                <>
                  <dt className="text-ink-muted">Empleador</dt>
                  <dd className="text-ink">{result.nombre_empleador}</dd>
                </>
              )}

              {result.nombre_trabajador && (
                <>
                  <dt className="text-ink-muted">Trabajador/a</dt>
                  <dd className="text-ink">{result.nombre_trabajador}</dd>
                </>
              )}

              {result.creado_en && (
                <>
                  <dt className="text-ink-muted">Generado</dt>
                  <dd className="text-ink">{formatFecha(result.creado_en)}</dd>
                </>
              )}
            </dl>

            {/* ── Sección de firmas ── */}
            <div className="border-t border-green-200 pt-4 mt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-ink">
                  Firmas electr&oacute;nicas
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  n_firmas === 0 ? "bg-gray-100 text-gray-500" :
                  n_firmas === 1 ? "bg-amber-100 text-amber-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {n_firmas} de 2 firmante{n_firmas !== 1 ? "s" : ""}
                </span>
              </div>

              {n_firmas === 0 ? (
                <p className="text-sm text-ink-muted">
                  Sin firma electr&oacute;nica registrada.
                </p>
              ) : (
                <div className="space-y-2">
                  {firmantes.map((f) => (
                    <div
                      key={f.rol}
                      className="border border-green-300 bg-white rounded-lg px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-ink">{f.nombre}</p>
                          <p className="text-xs text-ink-muted capitalize">{f.rol === "empleador" ? "Empleador/a" : "Trabajador/a"}</p>
                        </div>
                        <span className="shrink-0 text-xs font-mono bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded">
                          ✓ FES
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-ink-muted">
                        {formatFecha(f.firmado_en)} &middot; Hora de Chile
                      </p>
                      <p className="text-xs text-ink-light mt-0.5">
                        PIN &middot; identidad biom&eacute;tricamente verificada &middot; Ley 19.799
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs text-ink-light border-t border-green-200 pt-3">
              Este documento fue generado por GoLegit y su autenticidad ha sido
              verificada. La firma electr&oacute;nica simple (FES) tiene validez
              legal conforme a la Ley 19.799.
            </p>
          </div>
        )
      })()}
    </div>
  );
}
