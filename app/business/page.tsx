import type { Metadata } from "next";
import Link from "next/link";
import BusinessLanding from "./BusinessLanding";

export const metadata: Metadata = {
  title: "GoLegit Business — Gestión de RRHH para empresas",
  description:
    "Contratos, liquidaciones, turnos y firma digital para tu equipo. Diseñado para gastronomía y servicios. Producto en desarrollo.",
  openGraph: {
    title: "GoLegit Business — RRHH para empresas, sin complicaciones",
    description:
      "Gestión laboral completa para empresas formales: contratos, liquidaciones, turnos, firma digital. Primer vertical: gastronomía.",
    url: "https://golegit.cl/business",
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function BusinessPage() {
  return <BusinessLanding />;
}
