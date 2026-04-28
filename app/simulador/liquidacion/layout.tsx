import type { Metadata } from "next";

const OG_URL = "https://golegit.cl/simulador/liquidacion";
const OG_TITLE = "Calculadora de liquidación TCP — GoLegit";
const OG_DESC =
  "Calcula el sueldo líquido y el costo total para el empleador de tu trabajadora de casa particular. AFP, Fonasa, aportes patronales. Gratis, sin registrarse.";
const OG_IMG = "https://golegit.cl/i/liquidacion.jpg";

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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo calcular la liquidación de sueldo de una trabajadora de casa particular en Chile",
  description:
    "Calculadora gratuita para determinar el sueldo líquido y el costo total del empleador de una trabajadora de casa particular (TCP) en Chile, incluyendo AFP, Fonasa y aportes patronales.",
  tool: [
    { "@type": "HowToTool", name: "Calculadora de liquidación GoLegit" },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Ingresa el sueldo base",
      text: "Escribe el sueldo base bruto mensual pactado en el contrato, en pesos chilenos.",
    },
    {
      "@type": "HowToStep",
      name: "Selecciona la AFP",
      text: "Elige la AFP de la trabajadora. Cada AFP tiene una tasa de comisión distinta que afecta el descuento.",
    },
    {
      "@type": "HowToStep",
      name: "Indica los días trabajados",
      text: "Si la trabajadora no trabajó el mes completo, ingresa los días efectivamente trabajados para calcular el proporcional.",
    },
    {
      "@type": "HowToStep",
      name: "Obtén el resultado",
      text: "La calculadora muestra el sueldo líquido (lo que recibe la trabajadora), los descuentos legales (AFP + Fonasa) y el costo total para el empleador incluyendo aportes patronales (SIS, AFC TCP, Mutual).",
    },
  ],
  totalTime: "PT2M",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {children}
    </>
  );
}
