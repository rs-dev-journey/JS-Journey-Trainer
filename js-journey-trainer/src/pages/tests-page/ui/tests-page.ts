import createElement from '@/shared/lib/dom/create-element';
import { createTestsListWidget } from '@/widgets/tests-list';
import { handleOpenTest } from '../model/handle-open-test';
import './tests-page.css';
import { getCurrentUserId } from '@/entities/user';

export function createTestsPage(root: HTMLElement): void {
  const userId = getCurrentUserId();

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const testsPage = createElement('div', {
    classList: ['tests-page'],
  });

  const header = createElement('div', {
    classList: ['tests-page__header'],
  });

  const title = createElement('h1', {
    textContent: 'Tests',
    classList: ['tests-page__title'],
  });

  const testsListWidget = createTestsListWidget(userId, handleOpenTest);

  header.append(title);
  testsPage.append(header, testsListWidget);

  root.append(testsPage);
}
