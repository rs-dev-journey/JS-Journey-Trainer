import type { UserTestIncorrectAnswersRow } from '../api/types';
import type { UserTestIncorrectAnswers } from '../model/types';

function mapAttemptAnswerRow(answer: UserTestIncorrectAnswersRow['attempt_answers'][number]) {
  return {
    question: answer.question,
    options: answer.options,
    selectedAnswerIndex: answer.selected_answer_index,
  };
}

export function mapUserTestIncorrectAnswersRow(
  row: UserTestIncorrectAnswersRow,
): UserTestIncorrectAnswers {
  return {
    userId: row.user_id,
    testId: row.test_id,
    attemptId: row.attempt_id,
    attemptAnswers: row.attempt_answers.map(mapAttemptAnswerRow),
    score: row.score,
  };
}
