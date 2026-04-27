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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo calcular y verificar la jornada laboral de una trabajadora de casa particular en Chile",
  description:
    "Herramienta gratuita para calcular las horas semanales, verificar el cumplimiento legal y generar la cláusula de jornada para el contrato de una trabajadora de casa particular (TCP). Actualizado con Ley 21.561 (reducción a 42 horas desde el 26 de abril de 2026).",
  tool: [
    { "@type": "HowToTool", name: "Calculadora de jornada GoLegit" },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Selecciona los días laborales",
      text: "Marca los días de la semana en que trabaja la trabajadora (lunes a sábado).",
    },
    {
      "@type": "HowToStep",
      name: "Ingresa el horario de cada día",
      text: "Para cada día seleccionado, indica la hora de entrada y de salida.",
    },
    {
      "@type": "HowToStep",
      name: "Indica el tiempo de colación",
      text: "Ingresa los minutos de colación diaria. La colación no es imputable a la jornada según el Art. 34 del Código del Trabajo.",
    },
    {
      "@type": "HowToStep",
      name: "Verifica el cumplimiento legal",
      text: "La calculadora suma las horas semanales y alerta si se supera el límite legal vigente (42 horas semanales para puertas afuera desde el 26 de abril de 2026, según Ley 21.561). En puertas adentro no aplica un máximo semanal: solo descansos diarios mínimos del Art. 149 inciso 2° CT.",
    },
    {
      "@type": "HowToStep",
      name: "Copia la cláusula de jornada",
      text: "Obtén el texto de la cláusula de jornada redactado en formato legal, listo para pegar en el contrato de trabajo.",
    },
  ],
  totalTime: "PT3M",
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
