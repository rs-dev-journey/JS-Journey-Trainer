import createElement from '@/shared/lib/dom/create-element';
import { loadTestOverview } from '../model/load-test-overview';
import { createTestOverviewContent } from './test-overview-content';
import './test-overview-widget.css';

export function createTestOverviewWidget(
  userId: string,
  testId: string,
  startTest: () => void,
  showAnswers: () => void,
): HTMLElement {
  const main = createElement('main', {
    textContent: 'Loading test overview...',
    classList: ['test-overview'],
  });

  loadTestOverview(userId, testId)
    .then(({ test, attempts }) => {
      const content = createTestOverviewContent(test, attempts, startTest, showAnswers);
      main.replaceChildren(content);
    })
    .catch((error) => {
      main.textContent = String(error);
    });

  return main;
}
