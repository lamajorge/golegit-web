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
import Footer from "@/components/layout/Footer";

export default function Home() {
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
      <Footer />
    </main>
  );
}
