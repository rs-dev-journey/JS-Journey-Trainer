import { mockConfig } from '@/shared/config/mock-config';
import delay from '@/shared/lib/delay/delay';
import type { Attempt } from '../model/types';
import { attemptsMock } from '../mock/mock-attempts';

export async function getUserTestAttempts(userId: string, testId: string): Promise<Attempt[]> {
  await delay(mockConfig.delayMs);
  if (mockConfig.shouldFail) throw new Error('Failed to load attempts');

  return structuredClone(
    attemptsMock.filter((attempt) => attempt.userId === userId && attempt.testId === testId),
  );
}
