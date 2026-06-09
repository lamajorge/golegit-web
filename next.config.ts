import type { NextConfig } from "next";

// Bucket público de Supabase Storage donde viven las imágenes de blog.
// El project id se mantiene del lado del servidor para no filtrarlo en
// las URLs públicas (Notion, og:image, links compartidos).
const CMS_IMAGES_ORIGIN =
  "https://domdefqcsiqkdpuchjtu.supabase.co/storage/v1/object/public/cms-images";

const nextConfig: NextConfig = {
  // @golegit-cl/tokens ships TSX/CSS fuente → Next debe transpilarlo.
  transpilePackages: ["@golegit-cl/tokens"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.notion.so" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.getpronto.io" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  async rewrites() {
    return [
      {
        // golegit.cl/i/<archivo> → proxy al bucket sin revelar el project
        // id de Supabase. Es rewrite (no redirect): el navegador y los
        // crawlers de Open Graph (WhatsApp, Twitter, LinkedIn) ven 200 OK
        // con el body de la imagen, no un 302.
        source: "/i/:path*",
        destination: `${CMS_IMAGES_ORIGIN}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        // /business (landing vieja, ahora vive en el proyecto separado
        // golegit-business). 301 permanente: transfiere autoridad SEO al
        // subdominio y arregla de una vez los links internos a /business
        // (Navbar, Footer) sin tocar cada componente.
        source: "/business",
        destination: "https://business.golegit.cl",
        permanent: true,
      },
      {
        source: "/business/:path*",
        destination: "https://business.golegit.cl/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
