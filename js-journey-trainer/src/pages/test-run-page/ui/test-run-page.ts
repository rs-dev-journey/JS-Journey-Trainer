import createElement from '@/shared/lib/dom/create-element';
import { initTestRun } from '../model/init-test-run';
import { createTestRunWidget } from '@/widgets/test-run';
import { getAuthState } from '@/entities/user';
import { getTestIdFromPathname } from '../lib/get-test-id';
import { createLoader } from '@/shared/ui/loader';
import './test-run-page.css';

export function createTestRunPage(root: HTMLElement): void {
  const userId = getAuthState().user?.id;
  const testId = getTestIdFromPathname();

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const testRunPage = createElement('div', { classList: ['test-run-page'] });
  testRunPage.append(createLoader());

  initTestRun(testId)
    .then((test) => {
      testRunPage.classList.remove('test-run-page');
      testRunPage.replaceChildren(createTestRunWidget(test, userId));
    })
    .catch((error) => {
      testRunPage.textContent = error.message;
    });

  root.append(testRunPage);
}
