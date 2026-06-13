#!/bin/bash
# pre-compact-snapshot.sh
#
# Hook que se dispara ANTES del compact del contexto Claude.
# Graba estado actual del repo + sesión a .claude/state/snapshots/ para
# que el Claude post-compact arranque con contexto.
#
# Setup: agregar en .claude/settings.json:
#   "hooks": {
#     "PreCompact": [
#       { "matcher": "*", "hooks": [
#         { "type": "command", "command": ".claude/hooks/pre-compact-snapshot.sh" }
#       ]}
#     ]
#   }

set -euo pipefail
cd "$(dirname "$0")/../.."  # ir a raíz del repo

STAMP=$(date +%Y-%m-%d-%H%M)
SNAPSHOT=".claude/state/snapshots/${STAMP}.md"

mkdir -p .claude/state/snapshots

{
  echo "---"
  echo "generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "trigger: PreCompact hook"
  echo "---"
  echo ""
  echo "# Snapshot pre-compact — ${STAMP}"
  echo ""
  echo "## Git state"
  echo ""
  echo "- Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
  echo "- Last commit: $(git log -1 --oneline 2>/dev/null || echo '?')"
  echo "- Status: \`$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ') uncommitted files\`"
  echo ""
  echo "### Últimos 10 commits"
  echo ""
  echo '```'
  git log --oneline -10 2>/dev/null || echo "no git log"
  echo '```'
  echo ""
  echo "### Archivos modificados (uncommitted)"
  echo ""
  echo '```'
  git status --short 2>/dev/null | head -30 || echo "clean"
  echo '```'
  echo ""
  echo "## Tickets abiertos"
  echo ""
  if ls .claude/state/tickets/T-*.json >/dev/null 2>&1; then
    for f in .claude/state/tickets/T-*.json; do
      id=$(python3 -c "import sys,json; d=json.load(open('$f')); print(f\"- {d['id']} [{d['status']}] {d['title']}\")" 2>/dev/null) || continue
      # Solo mostrar open / in_progress / blocked
      if echo "$id" | grep -qE "\[(open|in_progress|blocked)\]"; then
        echo "$id"
      fi
    done
  else
    echo "_(sin tickets en .claude/state/tickets/)_"
  fi
  echo ""
  echo "## Issues abiertos (no fixed/wontfix)"
  echo ""
  if ls .claude/state/issues/ISS-*.json >/dev/null 2>&1; then
    for f in .claude/state/issues/ISS-*.json; do
      line=$(python3 -c "import sys,json; d=json.load(open('$f')); print(f\"- {d['id']} [{d['severity']}|{d['status']}] {d['title']}\")" 2>/dev/null) || continue
      if echo "$line" | grep -qE "\|(open|confirmed)\]"; then
        echo "$line"
      fi
    done
  else
    echo "_(sin issues en .claude/state/issues/)_"
  fi
  echo ""
  echo "## Último handover"
  echo ""
  LATEST_HANDOVER=$(ls -t .claude/state/handovers/*.md 2>/dev/null | head -1)
  if [ -n "$LATEST_HANDOVER" ]; then
    echo "Archivo: \`${LATEST_HANDOVER}\`"
    echo ""
    head -20 "$LATEST_HANDOVER" | tail -15
  else
    echo "_(sin handovers en .claude/state/handovers/)_"
  fi
  echo ""
  echo "## Lessons recientes (top 5)"
  echo ""
  ls -t .claude/state/lessons/L-*.md 2>/dev/null | head -5 | while read -r f; do
    title=$(grep "^title:" "$f" | head -1 | sed 's/^title: //')
    id=$(basename "$f" .md)
    echo "- ${id}: ${title}"
  done
  echo ""
  echo "## Reminder para el siguiente Claude post-compact"
  echo ""
  echo "1. Leé este snapshot completo."
  echo "2. Leé el último handover: \`${LATEST_HANDOVER:-.claude/state/handovers/*}\`"
  echo "3. Revisá lessons categoría \`ops\` y \`code\` (\`.claude/state/lessons/\`)."
  echo "4. Antes de cambiar de dirección, confirmá con Jorge."
} > "$SNAPSHOT"

echo "✓ Snapshot grabado: $SNAPSHOT" >&2

# No bloquear el compact — exit 0 siempre
exit 0
