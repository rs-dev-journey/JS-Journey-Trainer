import { getQuestionsCount } from '@/entities/test';
import { getCurrentQuestionNumber, getProgressPercent } from '@/features/run-test';
import type { TestRunHeaderViewModel } from './types';

export function getTestRunHeaderViewModel(): TestRunHeaderViewModel {
  const questionNumber = getCurrentQuestionNumber();
  const totalQuestions = getQuestionsCount();
  const progressLabel = `Question ${questionNumber} of ${totalQuestions}`;

  const progressPercent = getProgressPercent();

  return { progressLabel, progressPercent };
}
