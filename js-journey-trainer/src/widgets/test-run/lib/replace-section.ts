import type { TestRunLayoutControls } from '../ui/types';

export function replaceSection(layoutControls: TestRunLayoutControls, next: HTMLElement) {
  layoutControls.questionSection.replaceWith(next);
  layoutControls.questionSection = next;
}
