import type { SaveUserProgressInput } from '@/entities/user-test-progress';
import type { TestResult } from '../model/types';

export function mapResultToUserProgress(result: TestResult, userId: string): SaveUserProgressInput {
  return {
    userId,
    testId: result.testId,
    scorePercent: result.scorePercent,
  };
}
