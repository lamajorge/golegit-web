import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de jornada laboral trabajadora de casa particular — GoLegit",
  description:
    "Verifica si la jornada de tu trabajadora de casa particular cumple la ley y genera la cláusula de jornada lista para el contrato. Actualizado con la reducción a 42 horas (Ley 21.561).",
  keywords: [
    "calculadora jornada trabajadora de casa particular",
    "jornada laboral asesora de hogar Chile",
    "puertas adentro puertas afuera jornada",
    "ley 21561 reducción jornada 42 horas",
    "cláusula jornada contrato TCP",
  ],
  alternates: { canonical: "https://golegit.cl/simulador/jornada" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
