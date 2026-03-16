export function navigate(path: string) {
  history.pushState(null, '', path);
}
