#!/usr/bin/env node
/**
 * Stop — Typecheck en batch de los .ts/.tsx editados en la respuesta.
 *
 * Lee el acumulador de post-edit-accumulator.js y despacha por path:
 *   - supabase/functions/**  → `deno check` (el bot es Deno; mecaniza el barrido
 *     deno_check que cazó 6 ReferenceError ocultos el 31-may-2026 — un
 *     `export {X} from` sin binding local rompió la cláusula SEXTO 3 días).
 *   - resto (golegit-app / golegit-panel / web / golegit-business) → agrupa por
 *     tsconfig.json más cercano y corre `tsc --noEmit -p` UNA vez por proyecto
 *     (regla feedback_typecheck_full: tsc completo antes de push a Next.js).
 *     Se excluyen del reporte los errores en supabase/functions/** de esos
 *     repos (son módulos Deno fuera del scope de tsc — ruido pre-existente).
 *
 * Si hay errores → exit 2: Claude NO puede cerrar la respuesta y recibe los
 * errores por stderr para corregirlos. Anti-loop: si stop_hook_active es true
 * (ya estamos en un ciclo de stop-hook), exit 0.
 *
 * Patrón tomado de ECC — Everything Claude Code (https://github.com/affaan-m/ECC,
 * MIT, Affaan Mustafa): accumulator + batch al Stop. Código propio.
 */

'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { accumulatorPath } = require('./post-edit-accumulator.js');

const MAX_STDIN = 1024 * 1024;
const MAX_STDERR = 4000;
const DENO_TIMEOUT_MS = 90_000;
const TSC_TIMEOUT_MS = 150_000;
let raw = '';

function findDenoBin() {
  const candidates = [
    path.join(os.homedir(), '.deno', 'bin', 'deno'),
    '/usr/local/bin/deno',
    '/opt/homebrew/bin/deno',
    'deno',
  ];
  for (const bin of candidates) {
    try {
      execFileSync(bin, ['--version'], { stdio: 'ignore', timeout: 10_000 });
      return bin;
    } catch { /* siguiente candidato */ }
  }
  return null;
}

function nearestTsconfigDir(filePath) {
  let dir = path.dirname(filePath);
  const root = path.parse(dir).root;
  for (let depth = 0; dir !== root && depth < 20; depth++) {
    if (fs.existsSync(path.join(dir, 'tsconfig.json'))) return dir;
    dir = path.dirname(dir);
  }
  return null;
}

/** Filtra bloques de error de tsc cuyos paths viven en supabase/functions/ (Deno). */
function filterTscOutput(output) {
  const lines = output.split('\n');
  const kept = [];
  let skipping = false;
  for (const line of lines) {
    const isBlockStart = /^\S.*\(\d+,\d+\): error TS/.test(line);
    if (isBlockStart) skipping = /^supabase[\\/]functions[\\/]/.test(line);
    if (!skipping && line.trim()) kept.push(line);
  }
  return kept.join('\n');
}

function checkDeno(files) {
  if (!files.length) return null;
  const deno = findDenoBin();
  if (!deno) return null; // sin deno disponible, no bloquear
  // cwd = raíz del repo que contiene supabase/ (resolución de imports relativos)
  const repoRoot = files[0].split(`${path.sep}supabase${path.sep}`)[0];
  try {
    execFileSync(deno, ['check', ...files], {
      cwd: repoRoot, stdio: ['ignore', 'pipe', 'pipe'], timeout: DENO_TIMEOUT_MS, encoding: 'utf8',
    });
    return null;
  } catch (err) {
    const out = `${err.stdout || ''}\n${err.stderr || ''}`.trim();
    return out ? `── deno check (${files.length} archivo/s) ──\n${out}` : null;
  }
}

function checkTsc(tsconfigDir) {
  try {
    execFileSync('npx', ['tsc', '--noEmit', '--pretty', 'false', '-p', '.'], {
      cwd: tsconfigDir, stdio: ['ignore', 'pipe', 'pipe'], timeout: TSC_TIMEOUT_MS, encoding: 'utf8',
    });
    return null;
  } catch (err) {
    if (err.code === 'ETIMEDOUT' || err.signal) return null; // timeout ≠ error de tipos
    const filtered = filterTscOutput(`${err.stdout || ''}\n${err.stderr || ''}`);
    return filtered ? `── tsc (${path.basename(tsconfigDir)}) ──\n${filtered}` : null;
  }
}

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  if (raw.length < MAX_STDIN) raw += chunk.substring(0, MAX_STDIN - raw.length);
});

process.stdin.on('end', () => {
  let input = {};
  try { input = JSON.parse(raw || '{}'); } catch { /* payload inválido → no-op */ }

  // Anti-loop: si ya estamos dentro de un ciclo de stop-hook, no volver a bloquear.
  if (input.stop_hook_active) process.exit(0);

  const accPath = accumulatorPath(input.session_id);
  let entries = [];
  try {
    entries = fs.readFileSync(accPath, 'utf8').split('\n').filter(Boolean);
    fs.unlinkSync(accPath); // limpiar al consumir — Stops repetidos no re-procesan
  } catch { process.exit(0); } // sin acumulador = no hubo edits .ts

  const files = [...new Set(entries)].filter((f) => fs.existsSync(f));
  if (!files.length) process.exit(0);

  const denoFiles = files.filter((f) => f.includes(`${path.sep}supabase${path.sep}functions${path.sep}`));
  const tscDirs = new Set();
  for (const f of files) {
    if (denoFiles.includes(f)) continue;
    const dir = nearestTsconfigDir(f);
    if (dir) tscDirs.add(dir); // sin tsconfig (ej. qa/ Deno) → lo cubre el gate de QA
  }

  const failures = [];
  const denoFail = checkDeno(denoFiles);
  if (denoFail) failures.push(denoFail);
  for (const dir of tscDirs) {
    const tscFail = checkTsc(dir);
    if (tscFail) failures.push(tscFail);
  }

  if (failures.length) {
    const body = failures.join('\n\n').slice(0, MAX_STDERR);
    process.stderr.write(
      `[stop-typecheck] Errores de tipos tras los edits de esta respuesta:\n\n${body}\n\n` +
      `Corrige los errores antes de cerrar. Si alguno es pre-existente (no introducido ` +
      `por este cambio), decláralo explícitamente al usuario en vez de arreglarlo en silencio.\n`,
    );
    process.exit(2);
  }
  process.exit(0);
});
