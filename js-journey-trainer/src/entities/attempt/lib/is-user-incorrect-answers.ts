import { getProperty } from '@/shared/lib/object/get-property';
import type { AttemptAnswerRow, UserTestIncorrectAnswersRow } from '../api/types';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isAttemptAnswerRow(value: unknown): value is AttemptAnswerRow {
  const question = getProperty(value, 'question');
  const options = getProperty(value, 'options');
  const selectedAnswerIndex = getProperty(value, 'selected_answer_index');

  return (
    typeof question === 'string' &&
    isStringArray(options) &&
    typeof selectedAnswerIndex === 'number'
  );
}

function isAttemptAnswerRowArray(value: unknown): value is AttemptAnswerRow[] {
  return Array.isArray(value) && value.every(isAttemptAnswerRow);
}

export function isUserTestIncorrectAnswersRow(
  value: unknown,
): value is UserTestIncorrectAnswersRow {
  const id = getProperty(value, 'id');
  const userId = getProperty(value, 'user_id');
  const testId = getProperty(value, 'test_id');
  const attemptId = getProperty(value, 'attempt_id');
  const attemptAnswers = getProperty(value, 'attempt_answers');
  const score = getProperty(value, 'score');

  return (
    typeof id === 'string' &&
    typeof userId === 'string' &&
    typeof testId === 'string' &&
    typeof attemptId === 'string' &&
    isAttemptAnswerRowArray(attemptAnswers) &&
    typeof score === 'number'
  );
}
