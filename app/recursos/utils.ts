// Utilidades compartidas entre Server y Client Components de recursos

const CATEGORIA_COLORS: Record<string, string> = {
  "Guías":           "bg-blue-50   text-blue-700   border-blue-200",
  "Plantillas":      "bg-purple-50 text-purple-700 border-purple-200",
  "Referencia Legal":"bg-orange-50 text-orange-700 border-orange-200",
  "Tutoriales":      "bg-brand-50  text-brand-700  border-brand-200",
  "Checklist":       "bg-amber-50  text-amber-700  border-amber-200",
};

const NIVEL_COLORS: Record<string, string> = {
  "Básico":      "bg-green-50  text-green-700  border-green-200",
  "Intermedio":  "bg-amber-50  text-amber-700  border-amber-200",
  "Avanzado":    "bg-red-50    text-red-700    border-red-200",
};

const TIPO_ICON: Record<string, string> = {
  "Guía paso a paso":      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  "Plantilla descargable": "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  "Referencia rápida":     "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "Tutorial":              "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "Checklist":             "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
};

export function categoriaColor(cat: string) {
  return CATEGORIA_COLORS[cat] ?? "bg-gray-50 text-gray-600 border-gray-200";
}

export function nivelColor(nivel: string) {
  return NIVEL_COLORS[nivel] ?? "bg-gray-50 text-gray-600 border-gray-200";
}

export function tipoIconPath(tipo: string): string {
  return TIPO_ICON[tipo] ?? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2";
}

export function formatFecha(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}
