import type { Test, TestState } from './types';

const testState: TestState = {
  currentTest: null,
};

export function getCurrentTest(): Test | null {
  return testState.currentTest;
}

export function setCurrentTest(test: Test): void {
  testState.currentTest = test;
}
