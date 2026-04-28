#!/usr/bin/env node
// Baja las 17 imágenes del bucket cms-images, las reduce a 1200x630
// quality 82, y las re-sube reemplazando. Mismo nombre, misma URL.
// Header Cache-Control agresivo (1 año) — los nombres son estables.

import sharp from "sharp";
import fs from "fs";

const SUPABASE_URL = "https://domdefqcsiqkdpuchjtu.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbWRlZnFjc2lxa2RwdWNoanR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjIzMDgsImV4cCI6MjA4ODI5ODMwOH0.hS7vLoamKNGtVYdd5Pg3u4t_ZjM8QcqbdWnatKVDA1o";
const BUCKET = "cms-images";

const FILES = [
  "checklist.jpg",
  "contrato.jpg",
  "examenes.jpg",
  "finiquito-notario.jpg",
  "finiquito.jpg",
  "firma-electronica.jpg",
  "ley-karin.jpg",
  "liquidacion.jpg",
  "novedad-cotizaciones.jpg",
  "novedad-entrega-liquidacion.jpg",
  "novedad-imm-2026.jpg",
  "novedad-imm-calendario.jpg",
  "novedad-imm-mayo.jpg",
  "novedad-jornada-42h.jpg",
  "novedad-registro-dt.jpg",
  "puertas.jpg",
  "vacaciones.jpg",
];

let okCount = 0;
let failCount = 0;
const sizes = { before: 0, after: 0 };

for (const filename of FILES) {
  process.stdout.write(`${filename.padEnd(40)} `);
  try {
    // 1. Bajar del bucket público
    const dlRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`
    );
    if (!dlRes.ok) throw new Error(`download ${dlRes.status}`);
    const original = Buffer.from(await dlRes.arrayBuffer());
    sizes.before += original.length;

    // 2. Procesar: 1200x630 (estándar OG), quality 82, mozjpeg
    const optimized = await sharp(original)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toBuffer();
    sizes.after += optimized.length;

    // 3. Subir reemplazando + Cache-Control 1 año
    const upRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filename}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "image/jpeg",
          "x-upsert": "true",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
        body: optimized,
      }
    );
    if (!upRes.ok) {
      const txt = await upRes.text();
      throw new Error(`upload ${upRes.status}: ${txt.slice(0, 100)}`);
    }

    const before = (original.length / 1024).toFixed(0);
    const after = (optimized.length / 1024).toFixed(0);
    const pct = ((1 - optimized.length / original.length) * 100).toFixed(0);
    console.log(`${before} KB → ${after} KB  (-${pct}%)`);
    okCount++;
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
    failCount++;
  }
}

console.log(
  `\nTotal: ${okCount}/${FILES.length} OK, ${failCount} fallidas. ` +
    `${(sizes.before / 1024 / 1024).toFixed(1)} MB → ${(sizes.after / 1024 / 1024).toFixed(1)} MB`
);
