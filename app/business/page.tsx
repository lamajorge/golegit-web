import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import FooterBusiness from "@/components/layout/FooterBusiness";
import BusinessLanding from "./BusinessLanding";

export const metadata: Metadata = {
  title: "GoLegit Business — Gestión de RRHH para empresas",
  description:
    "Contratos, liquidaciones, turnos y firma digital para tu equipo. Gestión laboral completa adaptada a cada rubro. Producto en desarrollo.",
  openGraph: {
    title: "GoLegit Business — RRHH para empresas, sin complicaciones",
    description:
      "Gestión laboral completa para empresas formales: contratos, liquidaciones, turnos, firma digital. Adaptado a los dolores de cada rubro.",
    url: "https://golegit.cl/business",
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://golegit.cl/i/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "GoLegit Business — Gestión de RRHH para empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoLegit Business — RRHH para empresas",
    description:
      "Contratos, liquidaciones, turnos y firma digital para tu equipo. Gestión laboral completa adaptada a cada rubro.",
    images: ["https://golegit.cl/i/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <BusinessLanding />
      <FooterBusiness />
    </main>
  );
}
