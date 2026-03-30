import { getTests } from '@/entities/test';
import { getUserProgress } from '@/entities/user-test-progress';
import { buildTestCards } from './build-test-cards';
import type { TestCardViewModel } from './types';

export async function loadTestsList(userId: string): Promise<TestCardViewModel[]> {
  const [tests, userProgress] = await Promise.all([getTests(), getUserProgress(userId)]);

  const cards = buildTestCards(tests, userProgress);

  return cards;
}
