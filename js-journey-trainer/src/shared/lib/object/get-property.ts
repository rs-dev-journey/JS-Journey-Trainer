export function getProperty(value: unknown, key: string): unknown {
  if (typeof value !== 'object' || value === null) {
    return undefined;
  }

  if (!Object.hasOwn(value, key)) {
    return undefined;
  }

  return Reflect.get(value, key);
}
