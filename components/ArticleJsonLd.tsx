// JSON-LD Article schema para posts (/novedades/[slug] y /recursos/[slug]).
// Habilita rich snippets en Google: fecha + thumbnail en SERP.

type ArticleJsonLdProps = {
  url: string;
  headline: string;
  description: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  section?: string;
  authorName?: string;
};

export default function ArticleJsonLd({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  section,
  authorName = "GoLegit",
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished: datePublished ?? undefined,
    dateModified: dateModified ?? datePublished ?? undefined,
    articleSection: section ?? undefined,
    inLanguage: "es-CL",
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://golegit.cl",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://golegit.cl/#organization",
      name: "GoLegit",
      logo: {
        "@type": "ImageObject",
        url: "https://golegit.cl/logo/golegit-icon-512.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
