export function formatDate(timestamp: number): string {
  const countNumbers = 2;
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(countNumbers, '0');
  const day = String(date.getDate()).padStart(countNumbers, '0');

  const hours = String(date.getHours()).padStart(countNumbers, '0');
  const minutes = String(date.getMinutes()).padStart(countNumbers, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
