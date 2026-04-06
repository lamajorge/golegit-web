import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de liquidación trabajadora de casa particular — GoLegit",
  description:
    "Calcula el sueldo líquido y el costo total para el empleador de tu trabajadora de casa particular. AFP, Fonasa, aportes patronales y proporcional de días. Gratis, sin registrarse.",
  keywords: [
    "calculadora liquidación trabajadora de casa particular",
    "simulador sueldo asesora de hogar",
    "calcular liquidación nana Chile",
    "liquidación TCP AFP Fonasa",
    "cuánto pagar asesora de hogar Chile",
  ],
  alternates: { canonical: "https://golegit.cl/simulador/liquidacion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
