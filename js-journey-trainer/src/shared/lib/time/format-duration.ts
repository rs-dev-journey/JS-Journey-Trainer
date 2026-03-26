export function formatDuration(durationMs: number): string {
  const millisecondDivider = 1000;
  const secondDivider = 60;
  const minuteDivider = 60;
  const padLength = 2;

  const totalSeconds = Math.floor(durationMs / millisecondDivider);

  const minutes = Math.floor(totalSeconds / minuteDivider);
  const seconds = totalSeconds % secondDivider;

  const mm = String(minutes).padStart(padLength, '0');
  const ss = String(seconds).padStart(padLength, '0');

  return `${mm}:${ss}`;
}
