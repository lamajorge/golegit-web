"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";

function ProductSwitcher({ isDark }: { isDark: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide transition-colors ${
          isDark
            ? "text-brand-400 border-brand-400/30 bg-brand-400/10 hover:bg-brand-400/20"
            : "text-brand-700 border-brand-200 bg-brand-50 hover:bg-brand-100"
        }`}
      >
        Home
        <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* Home — activo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink">GoLegit Home</p>
              <p className="text-[10px] text-ink-light">Trabajadoras de casa particular</p>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
          </Link>

          <div className="h-px bg-gray-100 mx-4" />

          {/* Business — próximamente */}
          <div className="flex items-center gap-3 px-4 py-3.5 cursor-not-allowed">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink">GoLegit Business</p>
              <p className="text-[10px] text-ink-muted">Empleados de empresa · Pronto</p>
            </div>
            <span className="text-[9px] font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded-full flex-shrink-0">
              Pronto
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + product switcher */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center">
            <img
              src={isDark ? "/logo/golegit-logo-dark.svg" : "/logo/golegit-logo.svg"}
              alt="GoLegit — Contratos y liquidaciones para trabajadoras de casa particular"
              height={28}
              style={{ height: 28, width: "auto" }}
            />
          </Link>
          <ProductSwitcher isDark={isDark} />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/#como-funciona", label: "Cómo funciona" },
            { href: "/#precios", label: "Precios" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/simulador"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"
            }`}
          >
            Simuladores
          </Link>
          <Link
            href="/novedades"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"
            }`}
          >
            Novedades
          </Link>
          <CtaButton
            className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              isDark
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-ink text-white hover:bg-ink-soft"
            }`}
          >
            Empieza gratis
          </CtaButton>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 transition-colors ${isDark ? "text-white/60 hover:text-white" : "text-ink-muted hover:text-ink"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-5">
          <a href="/#como-funciona" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Cómo funciona
          </a>
          <a href="/#precios" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Precios
          </a>
          <a href="/#faq" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Preguntas frecuentes
          </a>
          <Link href="/simulador" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Simuladores
          </Link>
          <Link href="/novedades" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
            Novedades
          </Link>
          <CtaButton className="inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-semibold px-4 py-3 rounded-lg">
            Empieza gratis — 1 mes sin costo
          </CtaButton>
        </div>
      )}
    </header>
  );
}
