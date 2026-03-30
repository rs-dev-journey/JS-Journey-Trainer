import { getQuestionByIndex, getQuestionsCount, type Question } from '@/entities/test';
import { getRunState } from './store';

const MAX_PERCENT = 100;

export function getCurrentQuestionIndex(): number {
  return getRunState().currentQuestionIndex;
}

export function getCurrentQuestion(): Question | null {
  return getQuestionByIndex(getCurrentQuestionIndex());
}

export function isLastQuestion(): boolean {
  const totalQuestions = getQuestionsCount();
  const { currentQuestionIndex } = getRunState();

  return totalQuestions - 1 === currentQuestionIndex;
}

export function getCurrentQuestionNumber(): number {
  return getCurrentQuestionIndex() + 1;
}

export function getProgressPercent(): number {
  return (getCurrentQuestionNumber() / getQuestionsCount()) * MAX_PERCENT;
}
