import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Eliminación de datos — GoLegit",
  robots: { index: false },
}

export default function EliminacionPage() {
  return (
    <main className="min-h-screen bg-paper py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-brand-600 hover:text-brand-700 mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6">
          Eliminación de datos personales
        </h1>

        <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
          <p>
            Conforme a la Ley N° 21.719 y nuestra{" "}
            <Link href="/privacidad" className="text-brand-600 underline">
              Política de Privacidad
            </Link>
            , puedes solicitar la eliminación de tus datos personales en cualquier momento.
          </p>

          <h2 className="text-lg font-bold text-ink pt-4">Cómo solicitar la eliminación</h2>

          <p>
            Envía un correo electrónico a{" "}
            <strong className="text-ink-soft">dpo@golegit.cl</strong> con el asunto{" "}
            <em>&quot;Solicitud de eliminación de datos&quot;</em>, indicando:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre completo y RUT del titular.</li>
            <li>Correo electrónico registrado en GoLegit.</li>
            <li>Número de teléfono asociado a la cuenta.</li>
          </ul>

          <h2 className="text-lg font-bold text-ink pt-4">Qué ocurre al eliminar tu cuenta</h2>

          <ul className="list-disc pl-5 space-y-1">
            <li>Se eliminan tus datos de identificación, contacto y suscripción dentro de los 30 días siguientes.</li>
            <li>Los documentos laborales con valor probatorio (contratos, finiquitos, liquidaciones firmadas) se conservan por el plazo legal de 5 a 10 años conforme a los artículos 31 y 510 del Código del Trabajo, tras lo cual son eliminados.</li>
            <li>La evidencia biométrica (cédula y selfie) se elimina junto con la cuenta.</li>
            <li>Los registros en el log de auditoría se mantienen anonimizados por el plazo legal.</li>
          </ul>

          <h2 className="text-lg font-bold text-ink pt-4">Plazo de respuesta</h2>

          <p>
            GoLegit responderá tu solicitud en un plazo máximo de 15 días hábiles, conforme al artículo 16 ter de la Ley N° 21.719.
          </p>

          <h2 className="text-lg font-bold text-ink pt-4">Contacto</h2>

          <ul className="space-y-1">
            <li><strong className="text-ink-soft">Delegado de Protección de Datos:</strong> dpo@golegit.cl</li>
            <li><strong className="text-ink-soft">Responsable:</strong> Cubillos Lama SpA · RUT 78.393.969-K</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
