import { getIncorrectAttemptAnswers, type UserTestIncorrectAnswers } from '@/entities/attempt';

export async function loadIncorrectAnswers(
  userId: string,
  testId: string,
): Promise<UserTestIncorrectAnswers | undefined> {
  const attemptAnswers = await getIncorrectAttemptAnswers(userId, testId);

  return attemptAnswers;
}
