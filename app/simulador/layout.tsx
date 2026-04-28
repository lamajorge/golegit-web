import type { Metadata } from "next";

const OG_URL = "https://golegit.cl/simulador";
const OG_TITLE = "Simuladores laborales TCP — GoLegit";
const OG_DESC =
  "Calculadoras gratuitas de liquidación de sueldo y jornada laboral para empleadores de trabajadoras de casa particular en Chile. Sin registrarse, resultados instantáneos.";
const OG_IMG = "https://golegit.cl/i/og-default.jpg";

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
  alternates: { canonical: OG_URL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: OG_URL,
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: [OG_IMG],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
