import type { Attempt } from '@/entities/attempt';
import type { TestResult } from '../model/types';

export function mapResultToAttempt(result: TestResult, userId: string): Attempt {
  return {
    id: result.id,
    userId,
    testId: result.testId,
    finishedAt: result.finishedAt,
    durationMs: result.durationMs,
    scorePercent: result.scorePercent,
    status: 'completed',
  };
}
