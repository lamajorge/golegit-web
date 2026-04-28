import "server-only";
import { Client } from "@notionhq/client";

// DB Notion: "Leads — Early Access + Anexo gratuito + Business" (parent: Web golegit.cl)
const NOTION_LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID ?? "2395089ca0e242eb8f17ca49f4b6f383";
const NOTION_TOKEN = process.env.NOTION_TOKEN;

const notion = NOTION_TOKEN ? new Client({ auth: NOTION_TOKEN }) : null;

// Cada fuente debe existir como opción del select "Fuente" en la DB de Notion;
// si no existe, Notion devuelve 400 al crear la página.
export type LeadFuente = "early_access" | "anexo_42h" | "business";

export interface LeadInput {
  email: string;
  fuente: LeadFuente;
  consentimiento?: boolean;
  nombre?: string;
  rut_empleador?: string;
  notas?: string;
}

/**
 * Crea un lead en la DB de Notion. Si Notion no está configurado, hace no-op
 * y devuelve `false` (en dev local sin token, no rompe el flujo).
 */
export async function saveLead(input: LeadInput): Promise<boolean> {
  if (!notion) {
    console.warn("[leads] NOTION_TOKEN ausente — lead no guardado", { fuente: input.fuente });
    return false;
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return false;
  }
  try {
    await notion.pages.create({
      parent: { database_id: NOTION_LEADS_DB_ID },
      properties: {
        Email: { title: [{ text: { content: input.email } }] },
        Fuente: { select: { name: input.fuente } },
        Consentimiento: { checkbox: input.consentimiento ?? false },
        ...(input.nombre
          ? { Nombre: { rich_text: [{ text: { content: input.nombre } }] } }
          : {}),
        ...(input.rut_empleador
          ? { "RUT empleador": { rich_text: [{ text: { content: input.rut_empleador } }] } }
          : {}),
        ...(input.notas
          ? { Notas: { rich_text: [{ text: { content: input.notas } }] } }
          : {}),
      },
    });
    return true;
  } catch (e) {
    console.error("[leads] error creando lead Notion:", (e as Error).message);
    return false;
  }
}
