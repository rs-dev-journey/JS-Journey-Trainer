export function getTestIdFromUrl() {
  return globalThis.location.pathname.split('/').pop();
}
