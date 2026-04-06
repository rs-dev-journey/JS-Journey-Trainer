import createElement from '@/shared/lib/dom/create-element';
import { loadTestOverview } from '../model/load-test-overview';
import { createLoader } from '@/shared/ui/loader';
import { createHandleViewAnswers } from '../controller/create-handle-view-answers';
import { createHandleStartTest } from '../model/create-handle-start-test';
import { goTestsPage } from '../model/go-tests-page';
import './test-overview-widget.css';
import { createTestOverviewBody, createTestOverviewHeader } from './test-overview-content';
import type { Attempt } from '@/entities/attempt';
import { renderErrorState } from '@/shared/ui/error-state';

function createOverviewBodySection(
  userId: string,
  testId: string,
  attempts: Attempt[],
  contentRoot: HTMLElement,
): HTMLElement {
  let overviewBody: HTMLElement;

  const handleViewAnswers = createHandleViewAnswers({
    userId,
    testId,
    contentRoot,
    getOverviewBody: () => overviewBody,
  });

  overviewBody = createTestOverviewBody(attempts, createHandleStartTest(testId), handleViewAnswers);

  return overviewBody;
}

function renderOverviewLayout(root: HTMLElement, header: HTMLElement, content: HTMLElement): void {
  root.classList.remove('test-overview--loading');
  root.replaceChildren(header, content);
}

export function createTestOverviewWidget(userId: string, testId: string): HTMLElement {
  const testOverviewWidget = createElement('div', {
    classList: ['test-overview', 'test-overview--loading'],
  });

  testOverviewWidget.append(createLoader());

  loadTestOverview(userId, testId)
    .then(({ test, attempts }) => {
      const content = createElement('div', {
        classList: ['test-overview__content'],
      });

      const overviewBody = createOverviewBodySection(userId, testId, attempts, content);

      const header = createTestOverviewHeader(test, goTestsPage);

      content.append(overviewBody);
      renderOverviewLayout(testOverviewWidget, header, content);
    })
    .catch((error) => {
      testOverviewWidget.classList.remove('test-overview--loading');
      testOverviewWidget.replaceChildren(renderErrorState(error));
    });

  return testOverviewWidget;
}
