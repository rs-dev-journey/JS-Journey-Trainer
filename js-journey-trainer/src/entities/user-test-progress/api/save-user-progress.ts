import type { SaveUserProgressInput, UserTestProgress } from '../model/types';
import { userProgressMock } from './mock-user-progress';

export function saveUserProgress(input: SaveUserProgressInput): UserTestProgress {
  const existing = userProgressMock.find(
    (item) => item.userId === input.userId && item.testId === input.testId,
  );

  if (existing) {
    existing.attemptsCount += 1;
    existing.lastScorePercent = input.scorePercent;
    existing.status = 'completed';

    return structuredClone(existing);
  }

  const newProgress: UserTestProgress = {
    userId: input.userId,
    testId: input.testId,
    status: 'completed',
    attemptsCount: 1,
    lastScorePercent: input.scorePercent,
  };

  userProgressMock.push(newProgress);

  return structuredClone(newProgress);
}
