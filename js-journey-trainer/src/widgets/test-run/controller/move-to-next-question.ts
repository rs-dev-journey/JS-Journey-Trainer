import { getCurrentQuestion, goNextQuestion } from '@/features/run-test';
import type { TestRunLayoutControls } from '../ui/types';
import { getTestRunHeaderViewModel } from '../model/get-test-run-header-view-model';
import { updateHeaderProgress } from '../ui/update-header-progress';
import { replaceQuestionSection } from '../ui/replace-question-section';

export function moveToNextQuestion(
  layoutControls: TestRunLayoutControls,
  handleSubmitAnswer: (event: SubmitEvent) => void,
): void {
  goNextQuestion();

  const currentQuestion = getCurrentQuestion();

  if (!currentQuestion) {
    throw new Error('Question is not defined');
  }

  const headerViewModel = getTestRunHeaderViewModel();

  updateHeaderProgress(
    {
      progressLabel: layoutControls.progressLabel,
      progressBar: layoutControls.progressBar,
      progressFill: layoutControls.progressFill,
    },
    headerViewModel,
  );

  replaceQuestionSection(layoutControls, currentQuestion, handleSubmitAnswer);
}
