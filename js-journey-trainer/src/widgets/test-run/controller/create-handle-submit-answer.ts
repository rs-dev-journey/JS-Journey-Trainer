import {
  calculateResult,
  isLastQuestion,
  mapResultToAttempt,
  mapResultToIncorrectAnswers,
  mapResultToUserProgress,
  resetRun,
  saveAnswer,
} from '@/features/run-test';
import type { TestRunLayoutControls } from '../ui/types';
import { getSelectedAnswerIndex } from '../lib/get-selected-answer-index';
import { moveToNextQuestion } from './move-to-next-question';
import { moveToResult } from './move-to-result';
import { saveIncorrectAttemptAnswers, saveUserTestAttempt } from '@/entities/attempt';
import { saveUserProgress } from '@/entities/user-test-progress';
import { attemptsMock } from '@/entities/attempt/mock/mock-attempts';
import { userProgressMock } from '@/entities/user-test-progress/api/mock-user-progress';
import { incorrectAttemptAnswersMock } from '@/entities/attempt/mock/mock-incorrect-attempt-answers';

export function createHandleSubmitAnswer(
  layoutControls: TestRunLayoutControls,
  userId: string,
  onTryAgain: () => void,
  onBackToTests: () => void,
  onViewAnswers: () => void,
): (event: SubmitEvent) => void {
  return function handleSubmitAnswer(event: SubmitEvent) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const selectedIndex = getSelectedAnswerIndex(form);

    if (selectedIndex === undefined) {
      return;
    }

    saveAnswer(selectedIndex);

    if (isLastQuestion()) {
      const result = calculateResult();
      moveToResult(layoutControls, result, onTryAgain, onBackToTests, onViewAnswers);

      saveUserTestAttempt(mapResultToAttempt(result, userId));
      saveUserProgress(mapResultToUserProgress(result, userId));
      saveIncorrectAttemptAnswers(mapResultToIncorrectAnswers(result, userId));

      resetRun();
    } else {
      moveToNextQuestion(layoutControls, handleSubmitAnswer);
    }
  };
}
