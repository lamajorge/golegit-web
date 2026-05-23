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
    a: "Si activas Firma Electrónica + Portal en el contrato (gratis, opcional), el sistema le envía el PDF por email con enlace para revisar y firmar digitalmente. Si prefieres no activarlo, imprimes el documento y lo firman en papel.",
  },
  {
    q: "¿La firma electrónica tiene valor legal?",
    a: "Sí. GoLegit usa Firma Electrónica Simple bajo la Ley 19.799. Cada firma queda registrada con quién firmó, cuándo y desde dónde. Ese registro sirve como prueba ante la Inspección del Trabajo.",
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
    q: "¿Tiene algún costo? ¿Hay tarjeta de crédito?",
    a: "El software es gratis para siempre, sin tarjeta de crédito ni permanencia. Solo pagas si quieres que nosotros nos encarguemos del papeleo cada mes (plan Asistido, desde $14.990) o si necesitas hablar con un abogado para un caso específico.",
  },
  {
    q: "¿En qué consiste el plan Asistido?",
    a: "Asistido es para quienes prefieren que nosotros nos encarguemos del papeleo cada mes. Pagamos Previred por ti, subimos el Libro de Remuneraciones a la Dirección del Trabajo y mantenemos al día los contratos y anexos ante la DT. Tarifa plana mensual: $14.990 (1 trabajadora), $24.990 (entre 2 y 3) o $39.990 (4 o más).",
  },
  {
    q: "¿Puedo modificar el contrato después?",
    a: "Sí. Cualquier cambio se hace con un anexo — que es la forma legal correcta. El contrato original queda intacto y todos los cambios quedan registrados con fecha.",
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
      offers: [
        { "@type": "Offer", name: "GoLegit Home", price: "0", priceCurrency: "CLP", priceSpecification: { "@type": "UnitPriceSpecification", price: "0", priceCurrency: "CLP", unitText: "MONTH" }, description: "Software laboral gratis para siempre. Contratos, anexos, finiquitos, liquidaciones, firma electrónica y portal trabajadora opcionales." },
        { "@type": "Offer", name: "GoLegit Asistido — 1 trabajadora", price: "14990", priceCurrency: "CLP", priceSpecification: { "@type": "UnitPriceSpecification", price: "14990", priceCurrency: "CLP", unitText: "MONTH" }, description: "Tarifa plana mensual: pago de Previred gestionado, carga Libro de Remuneraciones y registro de contratos en Mi DT." },
        { "@type": "Offer", name: "GoLegit Asistido — 2 a 3 trabajadoras", price: "24990", priceCurrency: "CLP", priceSpecification: { "@type": "UnitPriceSpecification", price: "24990", priceCurrency: "CLP", unitText: "MONTH" } },
        { "@type": "Offer", name: "GoLegit Asistido — 4 o más trabajadoras", price: "39990", priceCurrency: "CLP", priceSpecification: { "@type": "UnitPriceSpecification", price: "39990", priceCurrency: "CLP", unitText: "MONTH" } },
      ],
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
