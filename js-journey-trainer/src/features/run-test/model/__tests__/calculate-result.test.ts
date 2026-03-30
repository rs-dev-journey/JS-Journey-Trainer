import { beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateResult } from '../calculate-result';
import { goNextQuestion, resetRun, saveAnswer, startRun } from '../store';

const START_TIME = 1_700_000_000_000;
const FINISH_TIME = 1_700_000_010_000;
const DURATION_MS = FINISH_TIME - START_TIME;
const TOTAL_QUESTIONS = 3;
const CORRECT_COUNT = 2;
const SCORE_PERCENT = 67;
const FIRST_ANSWER = 0;
const SECOND_ANSWER = 1;
const THIRD_ANSWER = 1;

const test = {
  id: 'js-basics-types',
  title: 'JS Basics',
  description: 'desc',
  imageUrl: '',
  questionCount: TOTAL_QUESTIONS,
  questions: [
    { id: 1, order: 1, type: 'quiz', question: 'Q1', options: ['A', 'B'], correctIndex: 0 },
    { id: 2, order: 2, type: 'quiz', question: 'Q2', options: ['A', 'B'], correctIndex: 1 },
    { id: 3, order: 3, type: 'quiz', question: 'Q3', options: ['A', 'B'], correctIndex: 0 },
  ],
};

const getCurrentTestMock = vi.fn();

vi.mock('@/entities/test', () => ({
  getCurrentTest: () => getCurrentTestMock(),
}));

describe('calculateResult', () => {
  beforeEach(() => {
    resetRun();
    vi.restoreAllMocks();
    getCurrentTestMock.mockReset();
  });

  it('throws error when current test is missing', () => {
    getCurrentTestMock.mockReturnValue(null);

    expect(() => calculateResult()).toThrow('Unable to calculate test result');
  });

  it('throws error when startedAt is missing', () => {
    getCurrentTestMock.mockReturnValue(test);

    expect(() => calculateResult()).toThrow('Unable to calculate test result');
  });

  it('returns correct result', () => {
    vi.spyOn(Date, 'now').mockReturnValue(START_TIME);
    getCurrentTestMock.mockReturnValue(test);

    startRun();

    saveAnswer(FIRST_ANSWER);
    goNextQuestion();

    saveAnswer(SECOND_ANSWER);
    goNextQuestion();

    saveAnswer(THIRD_ANSWER);

    vi.spyOn(Date, 'now').mockReturnValue(FINISH_TIME);

    const result = calculateResult();

    expect(result.testId).toBe(test.id);
    expect(result.totalQuestions).toBe(TOTAL_QUESTIONS);
    expect(result.correctCount).toBe(CORRECT_COUNT);
    expect(result.scorePercent).toBe(SCORE_PERCENT);
    expect(result.finishedAt).toBe(FINISH_TIME);
    expect(result.durationMs).toBe(DURATION_MS);
    expect(result.answers).toEqual({
      2: THIRD_ANSWER,
    });
  });
});
