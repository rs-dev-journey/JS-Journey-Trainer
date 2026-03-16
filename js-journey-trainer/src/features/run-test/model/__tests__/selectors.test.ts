import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCurrentQuestion,
  getCurrentQuestionNumber,
  getProgressPercent,
  isLastQuestion,
} from '../selectors';
import { goNextQuestion, resetRun } from '../store';

const MAX_PERCENT = 100;
const QUESTIONS_COUNT = 3;
const FIRST_QUESTION_NUMBER = 1;
const SECOND_QUESTION_NUMBER = 2;
const FIRST_PROGRESS_PERCENT = MAX_PERCENT / QUESTIONS_COUNT;
const SECOND_PROGRESS_PERCENT = (SECOND_QUESTION_NUMBER / QUESTIONS_COUNT) * MAX_PERCENT;

const questions = [
  { id: 1, order: 1, type: 'quiz', question: 'Q1', options: ['A', 'B'], correctIndex: 0 },
  { id: 2, order: 2, type: 'quiz', question: 'Q2', options: ['A', 'B'], correctIndex: 1 },
  { id: 3, order: 3, type: 'quiz', question: 'Q3', options: ['A', 'B'], correctIndex: 0 },
];

vi.mock('@/entities/test', () => ({
  getQuestionByIndex: (index: number) => questions[index] ?? null,
  getQuestionsCount: () => questions.length,
}));

describe('selectors', () => {
  beforeEach(() => {
    resetRun();
  });

  it('returns first question', () => {
    const question = getCurrentQuestion();
    expect(question).toEqual(questions[0]);
  });

  it('returns false when question is not last', () => {
    const result = isLastQuestion();
    expect(result).toBe(false);
  });

  it('returns true on last question', () => {
    goNextQuestion();
    goNextQuestion();

    const result = isLastQuestion();
    expect(result).toBe(true);
  });

  it('returns correct question number', () => {
    expect(getCurrentQuestionNumber()).toBe(FIRST_QUESTION_NUMBER);

    goNextQuestion();

    expect(getCurrentQuestionNumber()).toBe(SECOND_QUESTION_NUMBER);
  });

  it('calculates progress percent', () => {
    const progress1 = getProgressPercent();
    expect(progress1).toBeCloseTo(FIRST_PROGRESS_PERCENT);

    goNextQuestion();

    const progress2 = getProgressPercent();
    expect(progress2).toBeCloseTo(SECOND_PROGRESS_PERCENT);
  });
});
