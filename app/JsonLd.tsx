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
    a: "En los planes Pro y Plus, el sistema le envía el PDF por email directamente a ella con un enlace para revisar y firmar digitalmente. En el plan Lite, tú imprimes el documento y lo firman en papel.",
  },
  {
    q: "¿La firma electrónica tiene valor legal?",
    a: "Sí. GoLegit usa Firma Electrónica Simple (FES) bajo la Ley 19.799. Cada firma queda registrada con la identidad del firmante, la fecha, la hora y la IP. Ese registro tiene valor probatorio ante la Inspección del Trabajo.",
  },
  {
    q: "¿Puedo calcular la liquidación aunque no sepa de cotizaciones?",
    a: "Sí. GoLegit aplica automáticamente las tasas vigentes de AFP, Isapre, AFC, cotización adicional y los aportes del empleador. Tú solo confirmas los días trabajados si hubo ausencias.",
  },
  {
    q: "¿GoLegit hace el finiquito también?",
    a: "Sí. Soporta 8 causales de término (Arts. 159, 160 y 161 del Código del Trabajo), calcula automáticamente las indemnizaciones, vacaciones pendientes y proporcionales, y genera el PDF listo para firmar.",
  },
  {
    q: "¿Qué pasa después del mes gratis?",
    a: "Eliges el plan que necesitas y pagas desde el portal web. Si decides no continuar, tu cuenta se suspende pero no pierdes tus documentos — se reactiva apenas regularizas.",
  },
  {
    q: "¿Cuál es la diferencia entre Lite y Pro?",
    a: "Ambos planes generan los mismos documentos. La diferencia es que Pro incluye firma digital (sin imprimir nada), portal web para tu trabajadora, verificación de identidad y recordatorios automáticos del ciclo mensual.",
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
      legalName: "Cubillos Lama SpA",
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
