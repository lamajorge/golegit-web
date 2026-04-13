import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  },
  robots: { index: true, follow: true },
};

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <BusinessLanding />
      <Footer />
    </main>
  );
}
