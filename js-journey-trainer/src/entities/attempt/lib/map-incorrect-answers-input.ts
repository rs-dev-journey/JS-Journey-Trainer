import type { SaveIncorrectAnswersInput } from '../model/types';

export function mapIncorrectAnswersInputToRow(input: SaveIncorrectAnswersInput) {
  return {
    user_id: input.userId,
    test_id: input.testId,
    attempt_id: input.attemptId,
    attempt_answers: input.attemptAnswers.map((answer) => ({
      question: answer.question,
      options: answer.options,
      selected_answer_index: answer.selectedAnswerIndex,
    })),
    score: input.score,
  };
}
