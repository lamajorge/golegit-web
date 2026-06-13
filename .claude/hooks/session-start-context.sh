#!/bin/bash
# session-start-context.sh
#
# Hook que se dispara al INICIO de cada sesión Claude.
# Inyecta contexto del estado actual del proyecto: tickets abiertos,
# último handover, lessons recientes. Output va al system message del
# primer turno del Claude.
#
# Setup: agregar en .claude/settings.json:
#   "hooks": {
#     "SessionStart": [
#       { "matcher": "*", "hooks": [
#         { "type": "command", "command": ".claude/hooks/session-start-context.sh" }
#       ]}
#     ]
#   }

set -euo pipefail
cd "$(dirname "$0")/../.."

# Skip si no existe state aún (proyecto nuevo)
if [ ! -d ".claude/state" ]; then
  exit 0
fi

echo "## 🗂  Estado actual del proyecto (auto-inyectado al inicio de sesión)"
echo ""

# Último handover
LATEST_HANDOVER=$(ls -t .claude/state/handovers/*.md 2>/dev/null | head -1)
if [ -n "$LATEST_HANDOVER" ]; then
  echo "### Último handover: \`$(basename "$LATEST_HANDOVER")\`"
  echo ""
  # Extraer 2 secciones clave del handover: "Lo que quedó pendiente" + "Para próxima sesión"
  python3 <<PYEOF
import re
content = open("$LATEST_HANDOVER").read()
secciones_clave = ['Lo que quedó pendiente', 'Para próxima sesión']
# Dividir por encabezados H2
partes = re.split(r'^## ', content, flags=re.M)
for parte in partes[1:]:
    titulo = parte.split('\n', 1)[0].strip()
    for sk in secciones_clave:
        if sk in titulo:
            print(f"#### {titulo}")
            cuerpo = parte.split('\n', 1)[1] if '\n' in parte else ''
            print(cuerpo.rstrip())
            print()
            break
PYEOF
  echo ""
fi

# Tickets in_progress (lo que YA está empezado)
echo "### Tickets in_progress"
echo ""
FOUND=0
if ls .claude/state/tickets/T-*.json >/dev/null 2>&1; then
  for f in .claude/state/tickets/T-*.json; do
    line=$(python3 -c "
import sys, json
d = json.load(open('$f'))
if d['status'] == 'in_progress':
    print(f\"- **{d['id']}**: {d['title']}\")
    if d.get('notes'):
        print(f\"  _{d['notes'][:150]}{'…' if len(d['notes'])>150 else ''}_\")
" 2>/dev/null) || continue
    if [ -n "$line" ]; then
      echo "$line"
      FOUND=1
    fi
  done
fi
[ "$FOUND" = "0" ] && echo "_(ninguno)_"
echo ""

# Issues P0/P1 abiertos
echo "### Issues abiertos P0/P1 (críticos sin fixear)"
echo ""
FOUND=0
if ls .claude/state/issues/ISS-*.json >/dev/null 2>&1; then
  for f in .claude/state/issues/ISS-*.json; do
    line=$(python3 -c "
import sys, json
d = json.load(open('$f'))
if d['status'] in ('open', 'confirmed') and d['severity'] in ('P0', 'P1'):
    print(f\"- **{d['id']}** [{d['severity']}]: {d['title']}\")
" 2>/dev/null) || continue
    if [ -n "$line" ]; then
      echo "$line"
      FOUND=1
    fi
  done
fi
[ "$FOUND" = "0" ] && echo "_(ninguno)_"
echo ""

# Lessons severity alta — siempre inyectar
echo "### Lessons severidad alta (vinculantes)"
echo ""
FOUND=0
for f in .claude/state/lessons/L-*.md; do
  [ -f "$f" ] || continue
  sev=$(grep "^severity:" "$f" | head -1 | sed 's/^severity: //')
  if [ "$sev" = "alta" ]; then
    id=$(grep "^id:" "$f" | head -1 | sed 's/^id: //')
    title=$(grep "^title:" "$f" | head -1 | sed 's/^title: //')
    echo "- **${id}**: ${title}"
    FOUND=1
  fi
done
[ "$FOUND" = "0" ] && echo "_(ninguna)_"
echo ""

echo "📁 Más detalle: \`.claude/state/README.md\` · tickets \`tickets/\` · lessons \`lessons/\` · handovers \`handovers/\`"

exit 0
