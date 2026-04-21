#!/usr/bin/env node
/**
 * Genera imágenes con DALL-E 3 y las sube a Supabase Storage (bucket: cms-images).
 * Los covers de Notion ya apuntan a esas URLs — no hay que tocar Notion.
 *
 * Requisitos:
 *   - /tmp/oai_key.txt    → OpenAI API key (sk-...)
 *
 * Uso:
 *   node scripts/generate-cms-images.mjs
 *   node scripts/generate-cms-images.mjs contrato.jpg   ← solo ese archivo
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const OAI_KEY = (() => {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();
  if (fs.existsSync("/tmp/oai_key.txt")) {
    return fs.readFileSync("/tmp/oai_key.txt", "utf-8").trim();
  }
  throw new Error(
    "No OpenAI key found. Set OPENAI_API_KEY env var, or put the key at /tmp/oai_key.txt.\n" +
    "Tip: `vercel env pull .env.local && export $(grep OPENAI_API_KEY .env.local)`",
  );
})();
const SUPABASE_URL = "https://domdefqcsiqkdpuchjtu.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbWRlZnFjc2lxa2RwdWNoanR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjIzMDgsImV4cCI6MjA4ODI5ODMwOH0.hS7vLoamKNGtVYdd5Pg3u4t_ZjM8QcqbdWnatKVDA1o";
const OUT_DIR = "/tmp/cms-images-ai";
const BUCKET = "cms-images";

// ─────────────────────────────────────────────────────────────
// IMÁGENES — prompt específico para cada recurso/novedad
// Estilo consistente: fotografía editorial, luz natural cálida,
// composición limpia, sin texto visible.
// ─────────────────────────────────────────────────────────────
const SUFFIX =
  "Editorial photography style, warm natural light, clean minimal composition, shallow depth of field, no text no watermarks no labels, photorealistic, high quality.";

const IMAGES = [
  // ── Recursos ──────────────────────────────────────────────
  {
    filename: "contrato.jpg",
    prompt: `A person carefully reading and signing a formal employment contract document on a clean wooden desk, pen in hand, soft natural window light, warm tones, Chilean home setting. ${SUFFIX}`,
  },
  {
    filename: "liquidacion.jpg",
    prompt: `Close-up of a monthly payroll worksheet with a calculator and pen on a tidy organized desk, numbers and columns visible but unreadable, professional home setting, morning light. ${SUFFIX}`,
  },
  {
    filename: "finiquito.jpg",
    prompt: `Two people sitting across a table reviewing and calmly discussing official termination documents, respectful professional tone, warm office or home setting, documents visible but text unreadable. ${SUFFIX}`,
  },
  {
    filename: "checklist.jpg",
    prompt: `Open monthly planner notebook with checkboxes and a pen next to a cup of coffee on a tidy desk, organized morning routine, natural window light. ${SUFFIX}`,
  },
  {
    filename: "vacaciones.jpg",
    prompt: `A calendar with vacation days highlighted, a small succulent plant nearby, bright cheerful desk in a Chilean home, vacation planning concept. ${SUFFIX}`,
  },
  {
    filename: "puertas.jpg",
    prompt: `Bright modern Chilean home interior, clean white kitchen with natural light streaming through windows, welcoming domestic atmosphere, tidy countertops, warm tones. ${SUFFIX}`,
  },
  {
    filename: "ley-karin.jpg",
    prompt: `Two adults having a respectful, calm professional conversation at a small table, one listening attentively, open and safe workplace atmosphere, warm Chilean home or small office. ${SUFFIX}`,
  },
  {
    filename: "examenes.jpg",
    prompt: `Person at a modern medical clinic for a routine preventive check-up, doctor taking notes, friendly healthcare interaction, clean bright waiting room or examination room. ${SUFFIX}`,
  },
  {
    filename: "finiquito-notario.jpg",
    prompt: `Person signing an official legal document at a formal desk, notary or witness present, official stamp or seal visible, professional government or notary office setting, formal but approachable. ${SUFFIX}`,
  },
  {
    filename: "firma-electronica.jpg",
    prompt: `Person using a modern laptop to digitally sign an important document, secure green lock icon on screen suggestion, clean home office or café, tech-savvy but warm atmosphere. ${SUFFIX}`,
  },

  // ── Novedades ─────────────────────────────────────────────
  {
    filename: "novedad-registro-dt.jpg",
    prompt: `Person at a laptop filling an official government online registration form, focused expression, organized home office desk, browser with official Chilean government website. ${SUFFIX}`,
  },
  {
    filename: "novedad-cotizaciones.jpg",
    prompt: `Close-up of monthly pension and social security contribution documents on a desk with a calendar showing payment deadline circled, organized financial paperwork. ${SUFFIX}`,
  },
  {
    filename: "novedad-imm-2026.jpg",
    prompt: `Official wage update announcement concept — a clean document showing salary figures on a tidy desk with a calendar showing year 2026, professional financial setting. ${SUFFIX}`,
  },
  {
    filename: "novedad-jornada-42h.jpg",
    prompt: `Work-life balance concept — a clean weekly planner showing a 42-hour organized work schedule, clock nearby, tidy desk with natural light, calm productive atmosphere. ${SUFFIX}`,
  },
  {
    filename: "novedad-imm-mayo.jpg",
    prompt: `May calendar open on a desk with a salary document nearby, spring morning light, announcement of a wage increase, clean organized desk setting. ${SUFFIX}`,
  },
  {
    filename: "novedad-imm-calendario.jpg",
    prompt: `Annual planning calendar spread open on a desk with financial wage figures, organized year view, highlighted important dates, professional planning concept. ${SUFFIX}`,
  },
  {
    filename: "novedad-entrega-liquidacion.jpg",
    prompt: `A monthly payroll document being physically handed from one person to another across a wooden desk, focus on the act of delivery, warm natural window light, a pen and a calendar in the background, Chilean home or small office setting, sense of formal transaction and mutual acknowledgement. ${SUFFIX}`,
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateImage(prompt) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.data[0].url;
}

async function downloadToBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToSupabase(buffer, filename) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filename}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "image/jpeg",
        "x-upsert": "true",
      },
      body: buffer,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase ${res.status}: ${err}`);
  }
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const filter = process.argv[2]; // opcional: solo generar un archivo
const queue = filter
  ? IMAGES.filter((img) => img.filename === filter)
  : IMAGES;

if (queue.length === 0) {
  console.error(`No se encontró imagen: ${filter}`);
  process.exit(1);
}

console.log(
  `\nGenerando ${queue.length} imagen(es) con DALL-E 3 (1792×1024, $0.08/imagen)`
);
console.log(`Costo estimado: ~$${(queue.length * 0.08).toFixed(2)} USD\n`);

let ok = 0;
let fail = 0;

for (let i = 0; i < queue.length; i++) {
  const img = queue[i];
  const label = `[${i + 1}/${queue.length}] ${img.filename}`;
  process.stdout.write(`${label} ... `);

  try {
    // 1. Generar con DALL-E 3
    const imageUrl = await generateImage(img.prompt);
    process.stdout.write("generada ... ");

    // 2. Descargar buffer
    const buffer = await downloadToBuffer(imageUrl);

    // 3. Guardar copia local (por si algo falla en la subida)
    const localPath = path.join(OUT_DIR, img.filename);
    fs.writeFileSync(localPath, buffer);

    // 4. Subir a Supabase Storage
    await uploadToSupabase(buffer, img.filename);

    const kb = (buffer.length / 1024) | 0;
    console.log(`subida (${kb} KB)`);
    ok++;

    // Pausa entre llamadas para no saturar rate limits
    if (i < queue.length - 1) await sleep(3000);
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    fail++;
  }
}

console.log(`\n✓ ${ok} generadas y subidas`);
if (fail > 0) console.log(`✗ ${fail} fallidas`);
console.log(
  `\nImágenes guardadas localmente en ${OUT_DIR} (respaldo por si hay que resubir)`
);
console.log(
  `Las covers de Notion ya apuntan a esas URLs — los cambios se verán al siguiente revalidate (1h).\n`
);
