import { describe, it, expect } from 'vitest';
import { formatScoreLabel } from '../format-score-label';

const SCORE_50 = 50;
const SCORE_100 = 100;

describe('formatScoreLabel', () => {
  it('returns dash when score is null', () => {
    expect(formatScoreLabel(null)).toBe('–');
  });

  it('formats number as percent', () => {
    expect(formatScoreLabel(SCORE_50)).toBe('50%');
  });

  it('formats zero correctly', () => {
    expect(formatScoreLabel(0)).toBe('0%');
  });

  it('formats 100 correctly', () => {
    expect(formatScoreLabel(SCORE_100)).toBe('100%');
  });
});
