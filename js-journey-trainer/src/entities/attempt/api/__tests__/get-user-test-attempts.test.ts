import { describe, it, expect, beforeEach } from 'vitest';
// import { mockConfig } from '@/shared/config/mock-config';
import { getUserTestAttempts } from '../get-user-test-attempts';
import { mockConfig } from '@/shared/config/mock-config';

const USER_ID = 'user-1';
const TEST_ID = 'js-basics-types';
const EXPECTED_ATTEMPTS_COUNT = 3;

describe('getUserTestAttempts', () => {
  beforeEach(() => {
    mockConfig.shouldFail = false;
    mockConfig.delayMs = 0;
  });

  it('returns attempts filtered by user and test', async () => {
    const attempts = await getUserTestAttempts(USER_ID, TEST_ID);

    expect(attempts.length).toBe(EXPECTED_ATTEMPTS_COUNT);
    expect(attempts.every((a) => a.testId === TEST_ID)).toBe(true);
  });

  it('returns empty array if no attempts match', async () => {
    const attempts = await getUserTestAttempts(USER_ID, 'unknown-test');

    expect(attempts).toEqual([]);
  });

  it('throws error when mockConfig.shouldFail is true', async () => {
    mockConfig.shouldFail = true;

    await expect(getUserTestAttempts(USER_ID, TEST_ID)).rejects.toThrow('Failed to load attempts');
  });
});
