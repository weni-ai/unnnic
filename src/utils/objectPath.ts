/**
 * Lodash.get replacement: reads a nested property by a dotted path
 * (e.g. "a.b.c"), returning `defaultValue` if any level is missing.
 */
export function get<T = unknown>(
  obj: unknown,
  path: string,
  defaultValue?: T,
): T {
  const value = path
    .split('.')
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === 'object'
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj,
    );
  return (value === undefined ? defaultValue : value) as T;
}

/**
 * Lodash.pick replacement: returns a new object with only the given
 * keys that exist on the original object.
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T | undefined,
  keys: K[],
): Partial<T> {
  if (!obj) return {};
  return keys.reduce<Partial<T>>((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}
