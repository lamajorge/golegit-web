import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import FooterBusiness from "@/components/layout/FooterBusiness";
import BusinessLanding from "./BusinessLanding";

export const metadata: Metadata = {
  title: "GoLegit Business — El aliado legal de tu pyme",
  description:
    "Tu sociedad, tus datos, tus contratos y tu equipo en regla, sin complicaciones. Actas y juntas de tu SpA, cumplimiento de datos (Ley 21.719), contratos y firma electrónica. Empieza gratis. Producto en desarrollo.",
  openGraph: {
    title: "GoLegit Business — Tu empresa en regla, sin complicaciones",
    description:
      "El aliado legal de la pyme chilena: gobierno societario, cumplimiento, contratos y equipo. Te decimos qué te toca, lo dejamos listo y lo notarial lo gestionamos por ti.",
    url: "https://golegit.cl/business",
    siteName: "GoLegit",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://golegit.cl/i/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "GoLegit Business — El aliado legal de tu pyme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoLegit Business — El aliado legal de tu pyme",
    description:
      "Tu empresa en regla, sin complicaciones: sociedad, datos, contratos y equipo. Empieza gratis.",
    images: ["https://golegit.cl/i/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <BusinessLanding />
      <FooterBusiness />
    </main>
  );
}
