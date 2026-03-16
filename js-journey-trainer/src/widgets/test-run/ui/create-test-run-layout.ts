import createElement from '@/shared/lib/dom/create-element';
import type { TestRunHeaderViewModel } from '../model/types';
import { createQuestionSection } from './create-question-section';
import type { TestRunHeaderView, TestRunLayoutProps, TestRunLayoutView } from './types';

export function createTestRunHeader(
  title: string,
  headerViewModel: TestRunHeaderViewModel,
): TestRunHeaderView {
  const header = createElement('header', { classList: ['test-run__header'] });

  const titleElement = createElement('h2', {
    textContent: title,
    classList: ['test-run__header-title'],
  });

  const progressContainer = createElement('div', { classList: ['test-run__progress'] });

  const progressLabel = createElement('span', {
    textContent: headerViewModel.progressLabel,
    classList: ['test-run__progress-label'],
  });

  const progressBar = createElement('div', {
    classList: ['progress'],
    attributes: {
      role: 'progressbar',
      ariaValueMin: '0',
      ariaValueMax: '100',
      ariaValueNow: String(headerViewModel.progressPercent),
    },
  });

  const progressFill = createElement('div', { classList: ['progress__fill'] });
  progressFill.style.width = `${headerViewModel.progressPercent}%`;

  progressBar.append(progressFill);
  progressContainer.append(progressLabel, progressBar);
  header.append(titleElement, progressContainer);

  return { root: header, controls: { progressLabel, progressBar, progressFill } };
}

export function createTestRunLayout({
  title,
  headerViewModel,
  currentQuestion,
}: TestRunLayoutProps): TestRunLayoutView {
  const root = createElement('main', {
    classList: ['test-run'],
  });

  const headerView = createTestRunHeader(title, headerViewModel);
  const { progressLabel, progressBar, progressFill } = headerView.controls;
  const questionSection = createQuestionSection(currentQuestion);

  root.append(headerView.root, questionSection.root);

  return {
    root,
    controls: {
      progressLabel,
      progressBar,
      progressFill,
      questionSection: questionSection.root,
      questionForm: questionSection.controls.questionForm,
    },
  };
}
