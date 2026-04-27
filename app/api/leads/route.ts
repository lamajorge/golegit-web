import { NextResponse } from "next/server";
import { saveLead, type LeadFuente } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const fuente = String(body.fuente ?? "") as LeadFuente;
  const consentimiento = body.consentimiento === true;
  const nombre = body.nombre ? String(body.nombre).trim().slice(0, 200) : undefined;
  const rut_empleador = body.rut_empleador ? String(body.rut_empleador).trim().slice(0, 30) : undefined;
  const notas = body.notas ? String(body.notas).slice(0, 500) : undefined;

  // Validaciones mínimas
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
  }
  if (fuente !== "early_access" && fuente !== "anexo_42h") {
    return NextResponse.json({ ok: false, error: "fuente debe ser early_access o anexo_42h" }, { status: 400 });
  }

  const ok = await saveLead({ email, fuente, consentimiento, nombre, rut_empleador, notas });
  // Devolvemos 200 incluso si Notion falló (no queremos romper la UX al usuario);
  // el error queda en logs server-side.
  return NextResponse.json({ ok });
}
