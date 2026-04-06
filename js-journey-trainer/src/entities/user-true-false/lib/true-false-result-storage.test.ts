import { beforeEach, describe, expect, it } from 'vitest';
import { getTrueFalseResult, saveTrueFalseResult } from './true-false-result-storage';

describe('true-false-result-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves result to localStorage', () => {
    saveTrueFalseResult({ done: 7, all: 10 });
    const raw = localStorage.getItem('true-false-result');
    expect(raw).toBe(JSON.stringify({ done: 7, all: 10 }));
  });

  it('return saved result from localSorage', () => {
    localStorage.setItem('true-false-result', JSON.stringify({ done: 7, all: 10 }));
    const result = getTrueFalseResult();
    expect(result).toEqual({ done: 7, all: 10 });
  });
});
