export const ROUTE_CHANGE_EVENT = 'app-route-change';
export function navigate(path: string) {
  history.pushState(null, '', path);
  globalThis.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
}
