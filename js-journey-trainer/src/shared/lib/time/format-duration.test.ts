import { describe, it, expect } from 'vitest';
import { formatDuration } from './format-duration';

const ONE_MINUTE = 60_000;
const THIRTY_SECONDS = 30_000;
const DURATION = ONE_MINUTE + THIRTY_SECONDS;

const EXPECTED_RESULT = '01:30';

describe('formatDuration', () => {
  it('formats duration correctly', () => {
    const result = formatDuration(DURATION);

    expect(result).toBe(EXPECTED_RESULT);
  });
});
