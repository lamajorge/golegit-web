"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";
import CtaButton from "@/components/CtaButton";
import { Logo } from "@golegit-cl/tokens/brand/Logo";

function ProductSwitcher({ isDark, isBusiness }: { isDark: boolean; isBusiness: boolean }) {
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
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
          isDark
            ? "text-white/80 ring-1 ring-white/15 backdrop-blur hover:bg-white/10 hover:text-white"
            : "text-ink-muted ring-1 ring-gray-200 bg-white/60 backdrop-blur hover:bg-gray-50 hover:text-ink"
        }`}
      >
        {isBusiness ? "Business" : "Home"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* Home — subdominio propio (no "/", que es el paraguas) */}
          <a
            href="https://home.golegit.cl"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink">GoLegit Home</p>
              <p className="text-[10px] text-ink-light">Trabajadoras de casa particular</p>
            </div>
            {!isBusiness && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />}
          </a>

          <div className="h-px bg-gray-100 mx-4" />

          {/* Business — subdominio propio */}
          <a
            href="https://business.golegit.cl"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink">GoLegit Business</p>
              <p className="text-[10px] text-ink-muted">El aliado legal de tu pyme</p>
            </div>
            {isBusiness ? (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
            ) : (
              <span className="text-[9px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-full shrink-0">
                Early access
              </span>
            )}
          </a>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // La landing TCP vive en /home (servida en home.golegit.cl). El hero ahí es
  // oscuro → el navbar es transparente. (El apex "/" es el paraguas, que tiene su
  // propio header y no usa este Navbar.)
  const isHome = pathname === "/home" || pathname?.startsWith("/home/");
  const isBusiness = pathname?.startsWith("/business");

  // En /home (hero oscuro) el navbar es absolute + transparente → se queda en el
  // hero y se va con el scroll (como Business). En las demás páginas (fondo claro)
  // es fixed + fondo claro al scrollear → siempre visible y legible.
  const heroPage = isHome || isBusiness;          // página con hero oscuro
  const isDark = heroPage;                          // transparente sobre el hero
  const posClass = heroPage ? "absolute" : "fixed"; // anclado al hero vs sigue al usuario

  // Business page: logo links to /business, uses blue logo
  const logoHref = isBusiness ? "/business" : "/";
  const logoAlt = isBusiness
    ? "GoLegit Business — El aliado legal de tu pyme"
    : "GoLegit — Contratos y liquidaciones para trabajadoras de casa particular";

  // Nav links differ by product
  const homeNavLinks = [
    { href: "/#como-funciona", label: "Cómo funciona" },
    { href: "/#precios", label: "Precios" },
  ];
  const homeExtraLinks = [
    { href: "/simulador", label: "Simuladores" },
    { href: "/novedades", label: "Novedades" },
    { href: "/recursos", label: "Recursos" },
  ];
  const businessNavLinks = [
    { href: "/business#modulos", label: "Qué incluye" },
    { href: "/business#contadores", label: "Para contadores" },
  ];

  const navLinks = isBusiness ? businessNavLinks : homeNavLinks;

  return (
    <header
      className={`${posClass} top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        heroPage
          ? "bg-transparent"
          : "bg-white/70 backdrop-blur-xl border-b border-gray-100/60 shadow-[0_1px_20px_-8px_rgba(0,0,0,0.15)]"
      }`}
    >
      <div className="relative px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Izq — Logo + product switcher */}
        <div className="flex items-center gap-2.5">
          <Link href={logoHref} className="flex items-center">
            {/* Pill (sistema de familia): BUSINESS en páginas Business, HOME en el
                producto Home (/home ↔ home.golegit.cl vía middleware). Las páginas
                de contenido del paraguas golegit.cl (/simulador, /recursos,
                /novedades) van sin pill — lockup paraguas. */}
            <Logo
              product={isBusiness ? "business" : "home"}
              mode={isDark ? "dark" : "light"}
              height={28}
              pill={!!isBusiness || isHome}
              title={logoAlt}
            />
          </Link>
          <ProductSwitcher isDark={isDark} isBusiness={!!isBusiness} />
        </div>

        {/* Centro (absoluto) — nav links centrados */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-white/70 hover:text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          {!isBusiness && homeExtraLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-white/70 hover:text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Der — acciones */}
        <div className="hidden items-center gap-3 md:flex">
          {isBusiness && (
            <a
              href="/business#waitlist"
              className={`inline-flex items-center text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? "bg-indigo-500 text-white hover:bg-indigo-400"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Early access
            </a>
          )}
          {!isBusiness && (
            <>
              <a
                href="https://app.golegit.cl/login"
                className={`inline-flex items-center text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/40"
                    : "border-gray-200 text-ink-muted hover:bg-gray-50 hover:text-ink hover:border-gray-300"
                }`}
              >
                Ir a mi panel
              </a>
              <CtaButton
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-white text-ink hover:bg-white/90"
                    : "bg-ink text-white hover:bg-ink-soft"
                }`}
              >
                Registrarme
              </CtaButton>
            </>
          )}
        </div>

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
          {isBusiness ? (
            <>
              {businessNavLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a
                href="/business#waitlist"
                className="inline-flex items-center justify-center text-sm font-semibold px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Early access
              </a>
            </>
          ) : (
            <>
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
              <Link href="/recursos" className="text-sm font-medium text-ink-muted" onClick={() => setMenuOpen(false)}>
                Recursos
              </Link>
              <a href="https://app.golegit.cl/login" className="text-sm font-medium text-ink-muted text-center">
                Ingresar a mi portal
              </a>
              <CtaButton className="inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-semibold px-4 py-3 rounded-lg">
                Empieza gratis — 1 mes sin costo
              </CtaButton>
            </>
          )}
        </div>
      )}
    </header>
  );
}
