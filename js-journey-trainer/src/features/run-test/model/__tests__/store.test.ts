import { beforeEach, describe, expect, it, vi } from 'vitest';
import { finishRun, getRunState, goNextQuestion, resetRun, saveAnswer, startRun } from '../store';

const START_TIME = 1_700_000_000_000;
const ANSWER_INDEX = 2;
const NEXT_QUESTION_INDEX = 1;

describe('run test store', () => {
  beforeEach(() => {
    resetRun();
    vi.restoreAllMocks();
  });

  it('startRun sets initial state', () => {
    vi.spyOn(Date, 'now').mockReturnValue(START_TIME);

    startRun();

    const state = getRunState();

    expect(state.currentQuestionIndex).toBe(0);
    expect(state.answersByQuestionIndex).toEqual({});
    expect(state.startedAt).toBe(START_TIME);
    expect(state.isCompleted).toBe(false);
  });

  it('goNextQuestion increases question index', () => {
    goNextQuestion();

    const state = getRunState();

    expect(state.currentQuestionIndex).toBe(NEXT_QUESTION_INDEX);
  });

  it('saveAnswer saves answer for current question', () => {
    saveAnswer(ANSWER_INDEX);

    const state = getRunState();

    expect(state.answersByQuestionIndex[0]).toBe(ANSWER_INDEX);
  });

  it('finishRun sets completed flag', () => {
    finishRun();

    const state = getRunState();

    expect(state.isCompleted).toBe(true);
  });

  it('resetRun resets state', () => {
    startRun();
    saveAnswer(ANSWER_INDEX);
    goNextQuestion();
    finishRun();

    resetRun();

    const state = getRunState();

    expect(state.currentQuestionIndex).toBe(0);
    expect(state.answersByQuestionIndex).toEqual({});
    expect(state.startedAt).toBe(null);
    expect(state.isCompleted).toBe(false);
  });
});
