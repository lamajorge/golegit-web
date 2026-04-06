// JSON-LD structured data para SEO
// FAQPage + SoftwareApplication + Organization
// Auditoria SEO Abril 2026 — Prioridad Alta

const faqData = [
  {
    q: "¿Necesito instalar alguna app?",
    a: "No. GoLegit opera completamente por WhatsApp. Si ya tienes WhatsApp instalado, ya tienes todo lo que necesitas para empezar.",
  },
  {
    q: "¿El contrato que genera GoLegit es legalmente válido?",
    a: "Sí. Las plantillas fueron diseñadas por un abogado y cumplen con la Ley 20.786 y el Código del Trabajo chileno. Incluyen las cláusulas obligatorias para trabajo de casa particular, con variantes específicas para puertas adentro y puertas afuera.",
  },
  {
    q: "¿Cómo le llega el contrato a mi trabajadora?",
    a: "El sistema le envía el PDF por WhatsApp y por email directamente a ella. No pasa por ti — queda registro de que lo recibió.",
  },
  {
    q: "¿Puedo calcular la liquidación aunque no sepa de cotizaciones?",
    a: "Sí. GoLegit aplica automáticamente las tasas vigentes de AFP, Fonasa, AFC y los aportes del empleador. Tú solo confirmas los días trabajados si hubo ausencias.",
  },
  {
    q: "¿Qué pasa si un mes no pago?",
    a: "Tu cuenta queda en modo lectura — puedes consultar documentos anteriores, pero no generar nuevos. Se reactiva apenas regularizas el pago.",
  },
  {
    q: "¿Puedo modificar el contrato después?",
    a: "Sí. Cualquier modificación se hace a través de un Anexo de Modificación, que es el mecanismo legal correcto. El contrato original no se toca y el historial queda completo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://golegit.cl/#organization",
      name: "GoLegit",
      url: "https://golegit.cl",
      logo: "https://golegit.cl/logo/golegit-icon-512.png",
      legalName: "Cubillos y Compañía Limitada",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: "Spanish",
      },
      areaServed: "CL",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://golegit.cl/#app",
      name: "GoLegit",
      applicationCategory: "BusinessApplication",
      operatingSystem: "WhatsApp",
      url: "https://golegit.cl",
      description:
        "GoLegit genera contratos legales, calcula liquidaciones y mantiene el historial laboral de trabajadoras de casa particular. Todo por WhatsApp, sin apps ni formularios.",
      offers: {
        "@type": "Offer",
        price: "9990",
        priceCurrency: "CLP",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "9990",
          priceCurrency: "CLP",
          unitText: "MONTH",
        },
      },
      publisher: { "@id": "https://golegit.cl/#organization" },
      inLanguage: "es-CL",
      availableOnDevice: "WhatsApp",
      featureList: [
        "Contrato de trabajo para trabajadora de casa particular",
        "Liquidación mensual automática",
        "Finiquito con cálculo de indemnizaciones",
        "Registro de ausencias y licencias médicas",
        "Vacaciones acumuladas",
        "Historial laboral con registro probatorio",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://golegit.cl/#faq",
      mainEntity: faqData.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://golegit.cl/#website",
      url: "https://golegit.cl",
      name: "GoLegit",
      publisher: { "@id": "https://golegit.cl/#organization" },
      inLanguage: "es-CL",
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
