import type { Metadata } from "next";
import AlertBanner from "@/components/AlertBanner";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import AttendanceSpotlight from "@/components/sections/AttendanceSpotlight";
import TechTrust from "@/components/sections/TechTrust";
import Pricing from "@/components/sections/Pricing";
import Trust from "@/components/sections/Trust";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import EarlyAccess from "@/components/sections/EarlyAccess";
import Footer from "@/components/layout/Footer";

// Landing del producto Home/TCP (trabajadoras de casa particular). Servida en
// home.golegit.cl (el middleware reescribe ese subdominio a /home/*). El apex
// golegit.cl pasó a ser la landing-paraguas de marca. Canonical → home.golegit.cl
// para que el SEO de TCP se consolide en su subdominio (no duplicate con el apex).
export const metadata: Metadata = {
  title: "GoLegit — Gestiona el trabajo de casa particular sin complicaciones",
  description:
    "Contratos, liquidaciones, asistencia y finiquitos para trabajadoras de casa particular. Cumple la ley sin enredos, desde WhatsApp.",
  alternates: { canonical: "https://home.golegit.cl" },
  openGraph: {
    title: "GoLegit — El trabajo de casa particular, en regla y sin complicaciones",
    description:
      "Contratos, liquidaciones, asistencia y finiquitos para trabajadoras de casa particular, desde WhatsApp.",
    url: "https://home.golegit.cl",
    siteName: "GoLegit",
  },
};

export default function HomeTcpLanding() {
  return (
    <main className="min-h-screen bg-paper overflow-x-hidden">
      <AlertBanner />
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <AttendanceSpotlight />
      <TechTrust />
      <Pricing />
      <Trust />
      <FAQ />
      <FinalCTA />
      <EarlyAccess />
      <Footer />
    </main>
  );
}
