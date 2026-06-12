import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import JsonLd from "./JsonLd";

// UI — toda la interfaz. Self-hosted (next/font), métricas de fallback ajustadas.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

// Display — solo titulares (registro Expressive). Variable font (opsz). Self-hosted.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Iowan Old Style", "Palatino Linotype", "Palatino", "Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  // Sin bloque `icons` manual: Next.js sirve automáticamente app/icon.svg
  // (favicon-home CUADRADO desde @golegit-cl/tokens). Antes apuntaba a
  // /favicon.ico y /apple-touch-icon.png — ambos eliminados/inexistentes
  // (el .ico era rectangular viejo). El SVG cuadrado adaptativo los reemplaza.
  title: "GoLegit — Contratos y liquidaciones para trabajadores/as de casa particular",
  description:
    "GoLegit genera contratos legales, calcula liquidaciones y mantiene el historial laboral de tu trabajador/a de casa particular. Todo por WhatsApp. Gratis para siempre, sin tarjeta de crédito.",
  keywords: [
    "contrato nana",
    "contrato nana Chile",
    "contrato trabajadora de casa particular",
    "como hacer contrato a una nana",
    "liquidación nana",
    "calcular liquidación nana",
    "finiquito nana",
    "finiquito trabajadora casa particular",
    "cuánto pagarle a una nana",
    "sueldo nana puertas adentro",
    "sueldo nana puertas afuera",
    "previred nana",
    "cotizaciones nana",
    "AFP nana",
    "vacaciones nana",
    "contrato puertas adentro",
    "contrato puertas afuera",
    "ley 20786",
    "asesora del hogar contrato",
    "empleada doméstica Chile",
    "software gestión trabajadora casa particular",
    "DT registrar contrato trabajadora",
  ],
  openGraph: {
    title: "GoLegit — El contrato de quien trabaja en tu casa, por WhatsApp",
    description:
      "Contratos legales, liquidaciones y documentos laborales para trabajadores/as de casa particular. Todo desde WhatsApp. Gratis para siempre.",
    url: "https://golegit.cl",
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://golegit.cl/i/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "GoLegit — Contratos, liquidaciones y firma electrónica para trabajadoras de casa particular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoLegit — El contrato de quien trabaja en tu casa, por WhatsApp",
    description:
      "Contratos legales y liquidaciones para trabajadores/as de casa particular. Sin apps, sin formularios.",
    images: ["https://golegit.cl/i/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://golegit.cl",
    languages: { "es-CL": "https://golegit.cl" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
