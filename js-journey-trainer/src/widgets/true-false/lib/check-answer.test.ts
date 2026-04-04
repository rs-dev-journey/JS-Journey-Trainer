import { describe, expect, it } from 'vitest';
import { isAnswerCorrect } from './check-answer';

describe('isAnswerCorrect', () => {
  it('returns true when correct answer and selected answer are both true', () => {
    expect(isAnswerCorrect(true, true)).toBe(true);
  });

  it('returns true when correct answer and selected answer are both false', () => {
    expect(isAnswerCorrect(false, false)).toBe(true);
  });

  it('returns false when answers do not match', () => {
    expect(isAnswerCorrect(true, false)).toBe(false);
    expect(isAnswerCorrect(false, true)).toBe(false);
  });
});
