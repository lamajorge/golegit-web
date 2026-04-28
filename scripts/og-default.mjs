import sharp from "sharp";
import fs from "fs";

const SUPABASE_URL = "https://domdefqcsiqkdpuchjtu.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbWRlZnFjc2lxa2RwdWNoanR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjIzMDgsImV4cCI6MjA4ODI5ODMwOH0.hS7vLoamKNGtVYdd5Pg3u4t_ZjM8QcqbdWnatKVDA1o";

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="15%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#16a34a" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="#16a34a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="90%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#16a34a" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#16a34a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Logo -->
  <g transform="translate(110, 175) scale(8)">
    <rect x="0" y="0" width="28" height="35" rx="5" fill="#16a34a"/>
    <path fill="white" d="M4.5,4 H22.5 Q25,4 25,6.5 V22 Q25,25 22.5,25 H10.5 L6,33 V25 Q3,25 3,22 V6.5 Q3,4 4.5,4 Z"/>
    <polyline fill="none" stroke="#16a34a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" points="8,15 11.5,18.5 19.5,10"/>
  </g>

  <!-- Wordmark -->
  <text x="395" y="285" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="110" font-weight="800" fill="white" letter-spacing="-3">GoLegit</text>

  <!-- Tagline -->
  <text x="398" y="370" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="36" font-weight="500" fill="#a7f3d0">Contratos, liquidaciones y firma electrónica</text>
  <text x="398" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="36" font-weight="500" fill="#a7f3d0">para trabajadoras de casa particular.</text>

  <!-- Pill -->
  <rect x="396" y="468" width="380" height="46" rx="23" fill="rgba(22,163,74,0.18)" stroke="rgba(22,163,74,0.35)" stroke-width="1"/>
  <circle cx="418" cy="491" r="5" fill="#4ade80"/>
  <text x="436" y="498" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="#86efac">Todo desde WhatsApp · golegit.cl</text>
</svg>`;

const buffer = await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, mozjpeg: true, progressive: true })
  .toBuffer();

fs.writeFileSync("/tmp/og-default.jpg", buffer);
console.log(`Generada: /tmp/og-default.jpg (${(buffer.length / 1024).toFixed(0)} KB)`);

// Subir
const res = await fetch(`${SUPABASE_URL}/storage/v1/object/cms-images/og-default.jpg`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "image/jpeg",
    "x-upsert": "true",
    "Cache-Control": "public, max-age=31536000, immutable",
  },
  body: buffer,
});
console.log(res.ok ? "Subida OK → https://golegit.cl/i/og-default.jpg" : `FAIL ${res.status}`);
