"use client";

import { useState } from "react";
import { Button } from "@golegit-cl/tokens/ui/Button";
import { Card } from "@golegit-cl/tokens/ui/Card";
import { Badge } from "@golegit-cl/tokens/ui/Badge";
import { Alert } from "@golegit-cl/tokens/ui/Alert";
import { Input } from "@golegit-cl/tokens/ui/Input";
import { Skeleton, SkeletonCard } from "@golegit-cl/tokens/ui/Skeleton";
import { EmptyState } from "@golegit-cl/tokens/ui/EmptyState";
import { Modal } from "@golegit-cl/tokens/ui/Modal";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">{label}</p>
      {children}
    </div>
  );
}

export function DsPrimitives() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [rut, setRut] = useState("");

  const rutError = rut.length > 0 && !/^\d{7,8}-[\dkK]$/.test(rut) ? "Formato inválido (ej: 12345678-9)" : undefined;

  return (
    <div className="grid gap-10">
      {/* BOTONES — estados vivos */}
      <Block label="Button · variantes, tamaños y estados (loading / disabled-con-razón / foco)">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Eliminar</Button>
          <Button variant="subtle">Subtle</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1800);
            }}
          >
            {loading ? "Generando…" : "Click → carga"}
          </Button>
          <Button disabledReason="Completa el RUT primero">Disabled (pasa el mouse)</Button>
        </div>
      </Block>

      {/* INPUT — con error en vivo */}
      <Block label="Input · label, foco, error en vivo, helper">
        <div className="grid max-w-md gap-4">
          <Input
            label="RUT del empleador/a"
            placeholder="12345678-9"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            error={rutError}
            helper={!rutError ? "Sin puntos, con guion" : undefined}
          />
          <Input label="Campo deshabilitado" placeholder="No editable" disabled />
        </div>
      </Block>

      {/* BADGES + ALERTS — consistencia (un solo componente) */}
      <div className="grid gap-8 md:grid-cols-2">
        <Block label="Badge · un componente, todos los estados">
          <div className="flex flex-wrap gap-2.5">
            <Badge tone="success">Firmado</Badge>
            <Badge tone="info">Vigente</Badge>
            <Badge tone="warning">Pendiente</Badge>
            <Badge tone="danger">Vencido</Badge>
            <Badge tone="sand">Asistido</Badge>
            <Badge tone="neutral">Borrador</Badge>
          </div>
        </Block>
        <Block label="Alert · contextual">
          <div className="grid gap-2.5">
            <Alert variant="success" title="Contrato firmado.">Ambas partes firmaron.</Alert>
            <Alert variant="warning" title="Por vencer.">El plazo fijo termina en 3 días.</Alert>
          </div>
        </Block>
      </div>

      {/* CARGA — skeleton vs contenido (perceived performance) */}
      <Block label="Skeleton · estado de carga (toca el botón para simular)">
        <div className="mb-3">
          <Button size="sm" variant="secondary" onClick={() => setShowSkeleton((s) => !s)}>
            {showSkeleton ? "Mostrar contenido" : "Simular carga"}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {showSkeleton ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <Card className="p-5">
                <p className="text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Líquido del mes</p>
                <p className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight">$685.065</p>
                <p className="mt-1 text-xs text-ink-muted">María Isabel · exacto</p>
              </Card>
              <Card className="p-5">
                <p className="text-2xs font-bold uppercase tracking-[0.1em] text-ink-faint">Costo empleador</p>
                <p className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight">$939.331</p>
                <p className="mt-1 text-xs text-ink-muted">incluye aportes Previred</p>
              </Card>
            </>
          )}
        </div>
      </Block>

      {/* VACÍO + MODAL */}
      <div className="grid gap-8 md:grid-cols-2">
        <Block label="EmptyState · estado vacío con salida">
          <EmptyState
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            }
            title="Aún no hay documentos"
            description="Cuando generes el primer contrato, aparecerá aquí."
            action={<Button size="sm">Generar contrato</Button>}
          />
        </Block>
        <Block label="Modal · focus-trap + Escape + restaura foco">
          <Card interactive className="flex flex-col items-start gap-3 p-6">
            <p className="text-sm text-ink-muted">
              Abre el modal y probá <strong className="text-ink">Tab</strong> (queda dentro) y{" "}
              <strong className="text-ink">Escape</strong> (cierra y devuelve el foco).
            </p>
            <Button onClick={() => setModal(true)}>Abrir modal</Button>
          </Card>
        </Block>
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="¿Generar el finiquito?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(false)}>Cancelar</Button>
            <Button onClick={() => setModal(false)}>Generar</Button>
          </>
        }
      >
        Se generará el finiquito de María Isabel con el cálculo de indemnizaciones y días
        pendientes. Podrás revisarlo antes de enviarlo a firma.
      </Modal>
    </div>
  );
}
