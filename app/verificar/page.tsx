import type { Metadata } from "next";
import Link from "next/link";
import VerificarCliente from "./VerificarCliente";

export const metadata: Metadata = {
  title: "Verificar documento — GoLegit",
  description:
    "Verifica la autenticidad de un documento generado por GoLegit ingresando el código de verificación.",
};

export default function VerificarPage() {
  return (
    <main className="min-h-screen bg-paper py-24 px-6">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="text-sm text-brand-600 hover:text-brand-700 mb-8 inline-block"
        >
          &larr; Volver al inicio
        </Link>
        <h1
          className="text-3xl font-light text-ink mb-2"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Verificar documento
        </h1>
        <p className="text-ink-muted text-sm mb-8">
          Ingresa el c&oacute;digo de verificaci&oacute;n que aparece en el pie
          del documento para comprobar su autenticidad.
        </p>
        <VerificarCliente />
      </div>
    </main>
  );
}
