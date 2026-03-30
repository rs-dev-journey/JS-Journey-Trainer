import { mockConfig } from '@/shared/config/mock-config';
import type { UserTestIncorrectAnswers } from '../model/types';
import { incorrectAttemptAnswersMock } from '../mock/mock-incorrect-attempt-answers';
import delay from '@/shared/lib/delay/delay';

export async function getIncorrectAttemptAnswers(
  userId: string,
  testId: string,
): Promise<UserTestIncorrectAnswers | undefined> {
  await delay(mockConfig.delayMs);
  if (mockConfig.shouldFail) throw new Error('Failed to load attempt answers');

  return structuredClone(
    incorrectAttemptAnswersMock.find(
      (attempt) => attempt.userId === userId && attempt.testId === testId,
    ),
  );
}
