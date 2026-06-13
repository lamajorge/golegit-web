#!/usr/bin/env node
/**
 * PostToolUse (Edit|Write|MultiEdit) — Acumulador de archivos .ts/.tsx editados.
 *
 * Anota cada path editado en un archivo temporal por sesión. El hook Stop
 * (stop-typecheck-batch.js) lo consume y corre deno check / tsc UNA vez en
 * batch al final de la respuesta — sin latencia por-edit.
 *
 * Patrón tomado de ECC — Everything Claude Code (https://github.com/affaan-m/ECC,
 * MIT, Affaan Mustafa): post-edit-accumulator + stop batch. Código propio.
 *
 * Siempre exit 0 — este hook nunca bloquea ni rompe el flujo.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const MAX_STDIN = 1024 * 1024;
let raw = '';

function sanitizeSessionId(id) {
  return String(id || 'nosession').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64) || 'nosession';
}

function accumulatorPath(sessionId) {
  return path.join(os.tmpdir(), `golegit-ts-edits-${sanitizeSessionId(sessionId)}.txt`);
}

// Guard require.main: stop-typecheck-batch.js importa accumulatorPath() de este
// módulo — sin el guard, el require registraría estos listeners y el exit(0)
// de este handler mataría al hook Stop antes de procesar (bug cazado en smoke T12).
if (require.main === module) {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    if (raw.length < MAX_STDIN) raw += chunk.substring(0, MAX_STDIN - raw.length);
  });

  process.stdin.on('end', () => {
    try {
      const input = JSON.parse(raw || '{}');
      const filePath = input.tool_input && input.tool_input.file_path;
      if (filePath && /\.(ts|tsx)$/.test(filePath) && !/\.d\.ts$/.test(filePath)) {
        const resolved = path.resolve(filePath);
        if (fs.existsSync(resolved)) {
          // appendFileSync es atómico para líneas cortas — escrituras concurrentes
          // de hooks paralelos no se pisan. La dedup la hace el hook Stop.
          fs.appendFileSync(accumulatorPath(input.session_id), resolved + '\n', 'utf8');
        }
      }
    } catch {
      // nunca romper el flujo por un error del acumulador
    }
    process.exit(0);
  });
}

module.exports = { accumulatorPath, sanitizeSessionId };
