import type { AttemptAnswer, SaveIncorrectAnswersInput } from '@/entities/attempt';
import type { TestResult } from '../model/types';
import { getCurrentTest, type Test } from '@/entities/test';

export function mapIncorrectAnswersToAttemptAnswers(
  test: Test,
  incorrectAnswers: TestResult['answers'],
): AttemptAnswer[] {
  return Object.entries(incorrectAnswers).map(([questionIndex, selectedAnswerIndex]) => {
    const question = test.questions[Number(questionIndex)];

    if (!question) {
      throw new Error(`Question with index ${questionIndex} not found`);
    }

    return {
      question: question.question,
      options: structuredClone(question.options),
      selectedAnswerIndex,
    };
  });
}

export function mapResultToIncorrectAnswers(
  result: TestResult,
  userId: string,
): SaveIncorrectAnswersInput {
  const test = getCurrentTest();

  if (!test) {
    throw new Error('Unable to calculate test result');
  }

  return {
    userId,
    testId: result.testId,
    attemptId: result.id,
    attemptAnswers: mapIncorrectAnswersToAttemptAnswers(test, result.answers),
    score: result.scorePercent,
  };
}
