export function formatScoreLabel(lastScorePercent: number | null) {
  return lastScorePercent === null ? '–' : `${lastScorePercent}%`;
}
