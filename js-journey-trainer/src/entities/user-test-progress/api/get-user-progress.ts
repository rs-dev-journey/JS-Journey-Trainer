import delay from '@/shared/lib/delay/delay';
import { mockConfig } from '@/shared/config/mock-config';
import { userProgressMock } from './mock-user-progress';
import type { UserTestProgress } from '../model/types';

export async function getUserProgress(userId: string): Promise<UserTestProgress[]> {
  await delay(mockConfig.delayMs);
  if (mockConfig.shouldFail) throw new Error('Mock error');

  const userProgress = structuredClone(
    userProgressMock.filter((progress) => progress.userId === userId),
  );

  return userProgress;
}
