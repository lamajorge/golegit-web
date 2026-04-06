import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "./JsonLd";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  title: "GoLegit — Contratos y liquidaciones para trabajadoras de casa particular",
  description:
    "GoLegit genera contratos legales, calcula liquidaciones y mantiene el historial laboral de tu trabajadora de casa particular. Todo por WhatsApp. Primer mes gratis, sin contrato.",
  keywords: [
    "contrato trabajadora de casa particular Chile",
    "liquidación trabajadora de casa particular",
    "contrato puertas adentro puertas afuera",
    "ley 20786 trabajadora casa particular",
    "calcular liquidación nana Chile",
    "software gestión trabajadora de casa particular",
    "cotizaciones empleada doméstica Chile",
    "contrato asesora de hogar WhatsApp",
  ],
  openGraph: {
    title: "GoLegit — El contrato de tu trabajadora de casa particular, por WhatsApp",
    description:
      "Contratos legales, liquidaciones y documentos laborales para trabajadoras de casa particular. Todo desde WhatsApp. Primer mes gratis.",
    url: "https://golegit.cl",
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoLegit — El contrato de tu trabajadora, por WhatsApp",
    description:
      "Contratos legales y liquidaciones para trabajadoras de casa particular. Sin apps, sin formularios.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://golegit.cl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <body className="antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
