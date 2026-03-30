export function getTestIdFromPathname(): string {
  const segments = globalThis.location.pathname.split('/').filter(Boolean);

  return segments[1];
}
