"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface VerificacionResult {
  encontrado: boolean;
  error?: string;
  tipo_documento?: string;
  estado?: string;
  estado_firma?: string;
  metodo_firma?: string;
  firmado_empleador_en?: string | null;
  firmado_trabajador_en?: string | null;
  creado_en?: string;
  // Material de verificación de integridad (ISS-002). NO se exponen nombres ni
  // url del PDF — el endpoint público solo confirma integridad/firma.
  hash_sha256?: string;
  codigo_verificacion?: string;
  tsa_token_disponible?: boolean;
}

interface Firmante {
  rol: "empleador" | "trabajador";
  firmado_en: string;
}

const TIPO_DOC_LABEL: Record<string, string> = {
  contrato: "Contrato de trabajo",
  anexo: "Anexo de modificación",
  liquidacion: "Liquidación de sueldo",
  finiquito: "Finiquito",
  carta_aviso: "Carta de aviso",
  amonestacion: "Amonestación escrita",
  certificado_vacaciones: "Certificado de vacaciones",
  certificado_antiguedad: "Certificado de antigüedad",
  protocolo_karin: "Protocolo Ley Karin",
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

// Calcula SHA-256 (hex) de un archivo, 100% en el navegador (Web Crypto).
// No sube el archivo a ningún servidor — la verificación es local.
async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function VerificarCliente() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificacionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  // Verificador por upload (compara hash de la copia del tenedor)
  const [comparando, setComparando] = useState(false);
  const [matchResult, setMatchResult] = useState<null | "match" | "mismatch">(null);
  const [archivoNombre, setArchivoNombre] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setResult(null);
    setErrorMsg("");
    setMatchResult(null);
    setArchivoNombre("");

    const raw = codigo.trim().toUpperCase();
    if (!/^GL-[0-9A-F]{8}$/.test(raw)) {
      setErrorMsg(
        'El código debe tener el formato GL-XXXXXXXX (ejemplo: GL-1A2B3C4D).'
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
      setErrorMsg("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleArchivo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !result?.hash_sha256) return;
    setArchivoNombre(file.name);
    setMatchResult(null);
    setComparando(true);
    try {
      const hex = await sha256Hex(file);
      setMatchResult(
        hex.toLowerCase() === result.hash_sha256.toLowerCase() ? "match" : "mismatch"
      );
    } catch {
      setMatchResult("mismatch");
    } finally {
      setComparando(false);
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
        // Firmantes por ROL (sin nombres — minimización de datos ISS-002).
        const firmantes: Firmante[] = []
        if (result.firmado_empleador_en)
          firmantes.push({ rol: "empleador", firmado_en: result.firmado_empleador_en })
        if (result.firmado_trabajador_en)
          firmantes.push({ rol: "trabajador", firmado_en: result.firmado_trabajador_en })
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

              {result.creado_en && (
                <>
                  <dt className="text-ink-muted">Generado</dt>
                  <dd className="text-ink">{formatFecha(result.creado_en)}</dd>
                </>
              )}

              {result.tsa_token_disponible && (
                <>
                  <dt className="text-ink-muted">Sello de tiempo</dt>
                  <dd className="text-ink">S&iacute; (TSA RFC 3161)</dd>
                </>
              )}
            </dl>

            {/* ── Sección de firmas (por rol, sin identidad) ── */}
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
                        <p className="text-sm font-medium text-ink capitalize">
                          {f.rol === "empleador" ? "Empleador/a" : "Trabajador/a"}
                        </p>
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

            {/* ── Huella SHA-256 + verificador por upload ── */}
            {result.hash_sha256 && (
              <div className="border-t border-green-200 pt-4 mt-2">
                <span className="text-sm font-semibold text-ink">
                  Huella digital del documento (SHA-256)
                </span>
                <p className="mt-1.5 font-mono text-[11px] leading-snug break-all bg-white border border-green-200 rounded-lg px-3 py-2 text-ink-muted">
                  {result.hash_sha256}
                </p>

                <div className="mt-3">
                  <p className="text-xs text-ink-muted mb-2">
                    &iquest;Tienes el PDF? S&uacute;belo para confirmar que es
                    exactamente este documento. La comparaci&oacute;n ocurre en
                    tu navegador &mdash; el archivo no se env&iacute;a a ning&uacute;n
                    servidor.
                  </p>
                  <label className="inline-flex items-center gap-2 cursor-pointer bg-white border border-green-300 hover:border-green-500 rounded-lg px-4 py-2 text-sm text-ink transition-colors">
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={handleArchivo}
                    />
                    {comparando ? "Comparando…" : "Subir mi copia del PDF"}
                  </label>
                  {archivoNombre && (
                    <span className="ml-2 text-xs text-ink-light">{archivoNombre}</span>
                  )}

                  {matchResult === "match" && (
                    <div className="mt-3 border border-green-300 bg-green-100 text-green-800 rounded-lg px-4 py-2.5 text-sm font-medium">
                      ✓ Coincide &mdash; tu copia es exactamente el documento registrado, sin alteraciones.
                    </div>
                  )}
                  {matchResult === "mismatch" && (
                    <div className="mt-3 border border-red-300 bg-red-50 text-red-700 rounded-lg px-4 py-2.5 text-sm font-medium">
                      ✗ No coincide &mdash; tu copia difiere del documento registrado. Puede ser una versi&oacute;n distinta (por ejemplo, firmada por una sola parte) o haber sido alterada.
                    </div>
                  )}
                </div>
              </div>
            )}

            <p className="text-xs text-ink-light border-t border-green-200 pt-3">
              Este documento fue generado por GoLegit y su autenticidad ha sido
              verificada. La firma electr&oacute;nica simple (FES) tiene validez
              legal conforme a la Ley 19.799. Por privacidad, no mostramos los
              datos de las partes ni el documento; obt&eacute;nlos desde tu portal.
            </p>
          </div>
        )
      })()}
    </div>
  );
}
