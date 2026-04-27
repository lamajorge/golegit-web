"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const STORAGE_KEY = "alert-banner-jornada42-dismissed"
// Si dismiss-fecha > esto, ignorar (volver a mostrar). Útil si renovamos el banner.
const VALID_UNTIL = "2026-05-31"

export default function AlertBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      const hoy = new Date().toISOString().slice(0, 10)
      if (hoy > VALID_UNTIL) {
        setVisible(false)
        return
      }
      if (!dismissed) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  // Toggle clase en <body> para que CSS desplace navbar y main hacia abajo
  // mientras el banner está visible (evita solapamiento con el navbar fixed).
  useEffect(() => {
    if (typeof document === "undefined") return
    if (visible) document.body.classList.add("alert-banner-visible")
    else document.body.classList.remove("alert-banner-visible")
    return () => document.body.classList.remove("alert-banner-visible")
  }, [visible])

  function dismiss() {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      // ignore
    }
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-amber-950 print:hidden">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm flex-1">
          <span className="font-bold">Hoy 26-abr</span> entró en vigor la jornada de{" "}
          <span className="font-bold">42 horas semanales</span> (Ley 21.561).{" "}
          <Link
            href="/simulador/anexo-jornada-42h"
            className="underline font-semibold hover:text-amber-900 whitespace-nowrap"
          >
            Genera el anexo gratis →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar aviso"
          className="shrink-0 p-1 rounded hover:bg-amber-600/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
