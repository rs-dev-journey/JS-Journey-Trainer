/* eslint-disable @typescript-eslint/no-magic-numbers */

import { describe, it, expect } from 'vitest';
import { sum } from './example';

describe('sum', () => {
  it('add two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('with negative numbers', () => {
    expect(sum(-2, 3)).toBe(1);
  });
});
