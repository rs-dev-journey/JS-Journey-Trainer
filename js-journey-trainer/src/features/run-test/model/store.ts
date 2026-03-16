import type { RunTestState } from './types';

const runTestState: RunTestState = {
  currentQuestionIndex: 0,
  answersByQuestionIndex: {},
  startedAt: null,
  isCompleted: false,
};

export function startRun(): void {
  runTestState.currentQuestionIndex = 0;
  runTestState.answersByQuestionIndex = {};
  runTestState.startedAt = Date.now();
  runTestState.isCompleted = false;
}

export function resetRun(): void {
  runTestState.currentQuestionIndex = 0;
  runTestState.answersByQuestionIndex = {};
  runTestState.startedAt = null;
  runTestState.isCompleted = false;
}

export function getRunState(): RunTestState {
  return runTestState;
}

export function goNextQuestion(): void {
  runTestState.currentQuestionIndex += 1;
}

export function saveAnswer(selectIndex: number): void {
  const { currentQuestionIndex } = runTestState;
  runTestState.answersByQuestionIndex[currentQuestionIndex] = selectIndex;
}

export function finishRun(): void {
  runTestState.isCompleted = true;
}
