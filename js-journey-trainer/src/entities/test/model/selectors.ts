import { getCurrentTest } from './store';
import type { Question } from './types';

export function getQuestionByIndex(index: number): Question | null {
  return getCurrentTest()?.questions[index] ?? null;
}

export function getQuestionsCount(): number {
  return getCurrentTest()?.questions.length ?? 0;
}
