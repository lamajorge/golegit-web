import { Geist } from "next/font/google";
import "@golegit-cl/tokens/tokens-business.css";

/**
 * Layout de GoLegit Business — activa la variante de marca "Confianza corporativa"
 * (índigo + frío + Geist) vía token-swap: <div data-brand="business"> re-tematiza
 * todo el subárbol. Mismo motor (tokens/primitivos), otra marca. Geist self-hosted.
 */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  fallback: ["Inter", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-brand="business" className={`${geist.variable} font-sans`}>
      {children}
    </div>
  );
}
