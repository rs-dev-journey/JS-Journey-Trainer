import { incorrectAttemptAnswersMock } from '../mock/mock-incorrect-attempt-answers';
import type { SaveIncorrectAnswersInput, UserTestIncorrectAnswers } from '../model/types';

export function saveIncorrectAttemptAnswers(
  input: SaveIncorrectAnswersInput,
): UserTestIncorrectAnswers {
  const index = incorrectAttemptAnswersMock.findIndex(
    (item) => item.userId === input.userId && item.testId === input.testId,
  );

  const newData: UserTestIncorrectAnswers = {
    userId: input.userId,
    testId: input.testId,
    attemptId: input.attemptId,
    attemptAnswers: structuredClone(input.attemptAnswers),
    score: input.score,
  };

  if (index === -1) {
    incorrectAttemptAnswersMock.push(newData);
  } else {
    incorrectAttemptAnswersMock[index] = newData;
  }

  return structuredClone(newData);
}
