"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const STORAGE_KEY = "alert-banner-jornada42-dismissed"
// Si dismiss-fecha > esto, ignorar (volver a mostrar). Útil si renovamos el banner.
const VALID_UNTIL = "2026-05-31"

// useLayoutEffect en SSR genera warning — usar useEffect en server
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function AlertBanner() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

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

  // Mide la altura real del banner y la expone como CSS var en <body>.
  // El CSS desplaza el navbar fixed y el main según var(--alert-banner-height).
  // Se re-mide en resize porque el texto se wrapea distinto según viewport.
  useIsoLayoutEffect(() => {
    if (typeof document === "undefined") return
    const body = document.body
    if (!visible) {
      body.classList.remove("alert-banner-visible")
      body.style.removeProperty("--alert-banner-height")
      return
    }
    body.classList.add("alert-banner-visible")
    const measure = () => {
      const h = ref.current?.offsetHeight ?? 0
      if (h > 0) body.style.setProperty("--alert-banner-height", `${h}px`)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      body.classList.remove("alert-banner-visible")
      body.style.removeProperty("--alert-banner-height")
    }
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
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-amber-950 print:hidden"
    >
      <div className="relative py-2 pl-4 pr-10 sm:pl-6 sm:pr-12">
        <p className="text-xs sm:text-sm leading-snug max-w-6xl mx-auto">
          <span className="font-bold">Hoy 26-abr</span> rige la jornada de{" "}
          <span className="font-bold">42 hrs/sem</span> (Ley 21.561).{" "}
          <Link
            href="/simulador/anexo-jornada-42h"
            className="underline font-semibold hover:text-amber-900 whitespace-nowrap"
          >
            Anexo gratis →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar aviso"
          className="absolute top-1/2 right-1.5 sm:right-2 -translate-y-1/2 p-1.5 rounded hover:bg-amber-600/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
