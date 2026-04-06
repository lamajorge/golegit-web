import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simuladores laborales para trabajadoras de casa particular — GoLegit",
  description:
    "Calculadoras gratuitas de liquidación de sueldo y jornada laboral para empleadores de trabajadoras de casa particular en Chile. Sin registrarse, resultados instantáneos.",
  keywords: [
    "simulador liquidación trabajadora de casa particular",
    "calculadora sueldo asesora de hogar Chile",
    "herramienta jornada laboral TCP",
    "calcular cotizaciones empleada doméstica",
  ],
  alternates: { canonical: "https://golegit.cl/simulador" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
