import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import JsonLd from "./JsonLd";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  title: "GoLegit — Contratos y liquidaciones para trabajadoras de casa particular",
  description:
    "GoLegit genera contratos legales, calcula liquidaciones y mantiene el historial laboral de tu trabajadora de casa particular. Todo por WhatsApp. Primer mes gratis, sin contrato.",
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
  verification: {
    // Reemplazar por el token real de Google Search Console
    // (Search Console → Property → Settings → Ownership verification → HTML tag)
    google: "REPLACE_WITH_GSC_TOKEN",
  },
  openGraph: {
    title: "GoLegit — El contrato de tu trabajadora de casa particular, por WhatsApp",
    description:
      "Contratos legales, liquidaciones y documentos laborales para trabajadoras de casa particular. Todo desde WhatsApp. Primer mes gratis.",
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
    title: "GoLegit — El contrato de tu trabajadora, por WhatsApp",
    description:
      "Contratos legales y liquidaciones para trabajadoras de casa particular. Sin apps, sin formularios.",
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
    <html lang="es-CL" className={plusJakartaSans.variable}>
      <body className="antialiased">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
