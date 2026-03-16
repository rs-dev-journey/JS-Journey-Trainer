import { getCurrentTest } from '@/entities/test';
import { getRunState } from './store';

export function calculateResult() {
  const MAX_PERCENTAGES = 100;
  const test = getCurrentTest();
  const runState = getRunState();

  if (!test || !runState.startedAt) {
    throw new Error('Unable to calculate test result');
  }

  const totalQuestions = test.questions.length;
  const incorrectAnswers: Record<number, number> = {};
  let correctCount = 0;

  for (let i = 0; i < test.questions.length; i++) {
    const selectedIndex = runState.answersByQuestionIndex[i];
    const correctIndex = test.questions[i].correctIndex;

    if (selectedIndex === correctIndex) {
      correctCount += 1;
    } else {
      incorrectAnswers[i] = selectedIndex;
    }
  }

  const scorePercent = Math.round((correctCount / totalQuestions) * MAX_PERCENTAGES);
  const finishedAt = Date.now();
  const durationMs = finishedAt - runState.startedAt;

  return {
    testId: test.id,
    totalQuestions,
    correctCount,
    scorePercent,
    finishedAt,
    durationMs,
    answers: incorrectAnswers,
  };
}
