export function getDurationLabel(duration: string): string {
  const [minutes, seconds] = duration.split(':');

  return `Duration: ${minutes} minutes ${seconds} seconds`;
}
