import type { TestRunLayoutControls } from '../ui/types';
import { mapResultViewModel } from '../model/map-result-view-model';
import { createResultSection } from '../ui/create-result-section';
import type { TestResult } from '@/features/run-test';

export function moveToResult(
  layoutControls: TestRunLayoutControls,
  result: TestResult,
  onTryAgain: () => void,
  onBackToTests: () => void,
  onViewAnswers: () => void,
): void {
  const progressWrapper = layoutControls.progressLabel.parentElement;

  if (progressWrapper) {
    progressWrapper.remove();
  }

  const resultModel = mapResultViewModel(result);
  const resultSection = createResultSection(resultModel, onTryAgain, onBackToTests, onViewAnswers);

  layoutControls.questionSection.replaceWith(resultSection);
  layoutControls.questionSection = resultSection;
}
