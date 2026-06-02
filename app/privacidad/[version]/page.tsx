import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params
  return { title: `Política de Privacidad v${version} — GoLegit`, robots: { index: false } }
}

export default async function PrivacidadVersionPage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params

  // La versión vigente se sirve como permalink estable. Las versiones anteriores
  // se solicitan al DPO (numeral 15 de la Política).
  if (version === "1.1") {
    const PrivacidadPage = (await import("../page")).default
    return <PrivacidadPage />
  }

  notFound()
}
