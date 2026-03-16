import { getUserTestAttempts } from '@/entities/attempt';
import { getTestById } from '@/entities/test';
import type { TestOverviewData } from './types';

export async function loadTestOverview(userId: string, testId: string): Promise<TestOverviewData> {
  const [test, attempts] = await Promise.all([
    getTestById(testId),
    getUserTestAttempts(userId, testId),
  ]);

  if (!test) {
    throw new Error('Test not found');
  }

  return { test, attempts };
}
