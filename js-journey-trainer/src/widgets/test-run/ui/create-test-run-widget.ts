import type { Test } from '@/entities/test';
import { getTestRunHeaderViewModel } from '../model/get-test-run-header-view-model';
import { createTestRunLayout } from './create-test-run-layout';
import { getCurrentQuestion } from '@/features/run-test';
import { createHandleSubmitAnswer } from '../controller/create-handle-submit-answer';

export function createTestRunWidget(test: Test): HTMLElement {
  const headerViewModel = getTestRunHeaderViewModel();
  const currentQuestion = getCurrentQuestion();

  if (!currentQuestion) {
    throw new Error('Question is not defined');
  }

  const layout = createTestRunLayout({
    title: test.title,
    headerViewModel,
    currentQuestion,
  });

  const handleSubmitAnswer = createHandleSubmitAnswer(layout.controls);

  layout.controls.questionForm.addEventListener('submit', handleSubmitAnswer);

  return layout.root;
}
