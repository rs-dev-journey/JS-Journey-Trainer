import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getUserTestAttempts } from '../get-user-test-attempts';

const USER_ID = 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c';
const TEST_ID = 'js-basics-types';
const UNKNOWN_TEST_ID = 'unknown-test';
const EXPECTED_ATTEMPTS_COUNT = 3;

const dateMs1 = 1770148440000;
const dateMs2 = 1770059400000;
const dateMs3 = 1769970000000;
const durationMs1 = 302000;
const durationMs2 = 350000;
const durationMs3 = 423000;
const score1 = 80;
const score2 = 60;
const score3 = 40;

const mocks = vi.hoisted(() => ({
  orderMock: vi.fn(),
  secondEqMock: vi.fn(),
  firstEqMock: vi.fn(),
  selectMock: vi.fn(),
  fromMock: vi.fn(),
}));

vi.mock('@/shared/api/supabase/client', () => ({
  supabase: {
    from: mocks.fromMock,
  },
}));

function createAttemptRow(
  id: string,
  finishedAt: number,
  durationMs: number,
  scorePercent: number,
) {
  return {
    id,
    user_id: USER_ID,
    test_id: TEST_ID,
    finished_at: finishedAt,
    duration_ms: durationMs,
    score_percent: scorePercent,
    status: 'completed',
  };
}

const ATTEMPT_ROWS = [
  createAttemptRow('attempt-3', dateMs1, durationMs1, score1),
  createAttemptRow('attempt-2', dateMs2, durationMs2, score2),
  createAttemptRow('attempt-1', dateMs3, durationMs3, score3),
];

function setupSupabaseChain() {
  mocks.fromMock.mockReturnValue({
    select: mocks.selectMock,
  });

  mocks.selectMock.mockReturnValue({
    eq: mocks.firstEqMock,
  });

  mocks.firstEqMock.mockReturnValue({
    eq: mocks.secondEqMock,
  });

  mocks.secondEqMock.mockReturnValue({
    order: mocks.orderMock,
  });
}

function mockSuccessfulAttemptsResponse(data: unknown[]) {
  mocks.orderMock.mockResolvedValue({
    data,
    error: null,
  });
}

function mockFailedAttemptsResponse(message: string) {
  mocks.orderMock.mockResolvedValue({
    data: null,
    error: {
      message,
    },
  });
}

describe('getUserTestAttempts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupSupabaseChain();
  });

  it('returns attempts filtered by user and test', async () => {
    mockSuccessfulAttemptsResponse(ATTEMPT_ROWS);

    const attempts = await getUserTestAttempts(USER_ID, TEST_ID);

    expect(attempts.length).toBe(EXPECTED_ATTEMPTS_COUNT);
    expect(attempts.every((attempt) => attempt.testId === TEST_ID)).toBe(true);
    expect(attempts[0]?.id).toBe('attempt-3');
  });

  it('returns empty array if no attempts match', async () => {
    mockSuccessfulAttemptsResponse([]);

    const attempts = await getUserTestAttempts(USER_ID, UNKNOWN_TEST_ID);

    expect(attempts).toEqual([]);
  });

  it('throws error when supabase returns error', async () => {
    mockFailedAttemptsResponse('Failed to load attempts');

    await expect(getUserTestAttempts(USER_ID, TEST_ID)).rejects.toThrow('Failed to load attempts');
  });
});
