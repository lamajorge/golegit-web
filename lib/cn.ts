/** Une clases truthy. Minimal (sin deps) — own-the-code del GDS. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
