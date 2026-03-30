import type { Test } from '@/entities/test';
import type { TestRunLayoutView } from '../ui/types';
import { startRun } from '@/features/run-test';

export function createHandleRestartTestRun(
  layout: TestRunLayoutView,
  test: Test,
  userId: string,
  createWidget: (test: Test, userId: string) => HTMLElement,
): () => void {
  return function () {
    startRun();

    const newWidgetRoot = createWidget(test, userId);
    layout.root.replaceWith(newWidgetRoot);
  };
}
