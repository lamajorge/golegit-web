import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params
  return { title: `Términos y Condiciones v${version} — GoLegit`, robots: { index: false } }
}

export default async function TerminosVersionPage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params

  if (version === "1.0") {
    const TerminosPage = (await import("../page")).default
    return <TerminosPage />
  }

  notFound()
}
