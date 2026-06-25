/** Tiny classname joiner — drops falsy values. No runtime dependency. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
