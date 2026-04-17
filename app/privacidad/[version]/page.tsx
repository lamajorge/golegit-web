import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params
  return { title: `Política de Privacidad v${version} — GoLegit`, robots: { index: false } }
}

export default async function PrivacidadVersionPage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params

  if (version === "1.0") {
    const PrivacidadPage = (await import("../page")).default
    return <PrivacidadPage />
  }

  notFound()
}
