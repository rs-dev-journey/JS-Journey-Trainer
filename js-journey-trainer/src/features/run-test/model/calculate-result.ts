import { getCurrentTest } from '@/entities/test';
import { getRunState } from './store';
import type { TestResult } from './types';

export function calculateResult(): TestResult {
  const MAX_PERCENTS = 100;
  const test = getCurrentTest();
  const runState = getRunState();

  if (!test || !runState.startedAt) {
    throw new Error('Unable to calculate test result');
  }

  const id = crypto.randomUUID();
  const totalQuestions = test.questions.length;
  const incorrectAnswers: Record<number, number> = {};
  let correctCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const selectedIndex = runState.answersByQuestionIndex[i];
    const correctIndex = test.questions[i].correctIndex;

    if (selectedIndex === correctIndex) {
      correctCount += 1;
    } else {
      incorrectAnswers[i] = selectedIndex;
    }
  }

  const scorePercent = Math.round((correctCount / totalQuestions) * MAX_PERCENTS);
  const finishedAt = Date.now();
  const durationMs = finishedAt - runState.startedAt;

  return {
    id,
    testId: test.id,
    totalQuestions,
    correctCount,
    scorePercent,
    finishedAt,
    durationMs,
    answers: incorrectAnswers,
  };
}
