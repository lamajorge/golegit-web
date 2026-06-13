# Git Worktrees — paralelización de refactors

> Regla **universal** del dev system (`@golegit-cl/devkit`). La mecánica de
> worktrees aplica igual a cualquier repo. Ejemplos específicos de un repo
> (nombres de branch, paths absolutos de esa máquina, runtime particular) van en
> un archivo `git-worktrees-<repo>.md` LOCAL del repo, no acá.

**Cuándo aplica:**
- Refactor multi-fase donde cada sub-fase es independiente (no tocan el mismo archivo).
- Investigaciones paralelas que requieren modificar el código (probar 2 approaches a la vez).
- Audits que aplican fixes (cada fix en su worktree, mergear los que pasan).

**Cuándo NO aplica:**
- Cambio único o lineal (commits secuenciales son más simples).
- Sub-fases que dependen unas de otras (cada paso debe validarse antes del siguiente).
- Cambio que toca shared state (DB schema, config global).

## Convención

Worktrees viven en `../<repo>-worktrees/<branch-name>/` — **fuera** del working
tree principal. NO dentro del repo mismo (rompe IDE indexing y caches si quedan anidados).

```
<monorepo-root>/
├── <repo>/                       # working tree principal (main)
├── <otro-repo>/                  # sibling repo
└── <repo>-worktrees/             # CARPETA para worktrees
    ├── refactor-fase-1/
    └── audit-fix-001/
```

## Comandos canónicos

### Crear worktree desde main

```bash
cd <ruta-al-repo>
git worktree add ../<repo>-worktrees/<branch> -b <branch>
cd ../<repo>-worktrees/<branch>
```

### Listar worktrees activos

```bash
git worktree list
```

### Mergear worktree de vuelta a main

```bash
cd <ruta-al-repo>
git checkout main
git merge <branch> --no-ff   # --squash si querés colapsar los commits del worktree
git push
```

### Limpiar worktree post-merge

```bash
git worktree remove ../<repo>-worktrees/<branch>
git branch -d <branch>
```

## Casos de uso

### Caso 1 — Refactor con sub-fases independientes

Un worktree por sub-fase, en paralelo; mergear de a uno a main validando entre cada uno.

> **Aprendizaje**: validar la INDEPENDENCIA real ANTES de abrir worktrees. Si las
> sub-fases tocan el mismo archivo (dispatch table, imports compartidos), los
> conflicts de merge se vuelven caóticos y el paralelismo NO sirve — secuencial es mejor.

### Caso 2 — Audit con fixes

Cuando un audit encuentra N issues accionables, cada fix va en su worktree
(`fix-<id>`); se mergean a main solo los que pasan QA.

### Caso 3 — Probar 2 approaches en paralelo

Un worktree por approach (`approach-a`, `approach-b`); implementar ambos, comparar
(performance / LOC / claridad), mergear el ganador y descartar el otro
(`git worktree remove` + `git branch -D`).

## Anti-patterns

### A1 — Worktrees anidados dentro del proyecto

```bash
# ❌ rompe IDE indexing y caches del runtime
git worktree add ./worktrees/branch -b branch
# ✅ siempre fuera del proyecto principal
git worktree add ../<repo>-worktrees/branch -b branch
```

### A2 — Worktrees abandonados

```bash
git worktree list  # corre periódicamente; limpiar los >2 semanas sin actividad
```

### A3 — Compartir el mismo build/boot cache entre worktrees

Si el repo corre boot/build tests con un dir temporal fijo, cada worktree necesita
el suyo (ej. `TMPDIR=/tmp/boot-<branch>`), si no los procesos pisan puertos/archivos
mutuamente. (El comando exacto depende del runtime del repo → ver su override local.)

## Coordinación con CI

CI/deploy se dispara por push a `main`. Las branches de worktree NO se deployan
automáticamente — esto es **intencional**:

1. Trabajar en worktree → 2. Push a branch (CI no dispara) → 3. Validar local →
4. Merge a main → 5. Push main (CI deploya).

Si se necesita CI para una branch específica (raro), agregar el glob al workflow
(`branches: [main, 'experimental/**']`).

## Cuándo medir si valió la pena

Tras cerrar el trabajo paralelo: tiempo elapsed vs estimado lineal · conflicts de
merge atendidos · bugs por desincronización entre worktrees. **Si los conflicts
superan ~30% del tiempo ahorrado → no valió; próximo ciclo, secuencial.**
