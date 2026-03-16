import { calculateResult, getRunState, isLastQuestion, saveAnswer } from '@/features/run-test';
import type { TestRunLayoutControls } from '../ui/types';
import { getSelectedAnswerIndex } from '../lib/get-selected-answer-index';
import { moveToNextQuestion } from './move-to-next-question';

export function createHandleSubmitAnswer(layoutControls: TestRunLayoutControls) {
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

    console.log('state:', getRunState());

    saveAnswer(selectedIndex);

    if (isLastQuestion()) {
      console.log('Результат:', calculateResult());
      console.log('КОНЕЦ');

      return;
    } else {
      moveToNextQuestion(layoutControls, handleSubmitAnswer);
    }
  };
}
