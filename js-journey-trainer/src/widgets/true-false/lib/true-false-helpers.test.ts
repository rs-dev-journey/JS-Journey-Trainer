/* eslint-disable @typescript-eslint/no-magic-numbers */
import { describe, expect, it } from 'vitest';
import { calculatePercentage } from './true-false-helpers';

describe('calculatePercentage', () => {
  it('calculates percentage correctly', () => {
    expect(calculatePercentage(8, 10)).toBe(80);
  });

  it('calculates percentage correctly', () => {
    expect(calculatePercentage(2, 3)).toBe(67);
  });
});
