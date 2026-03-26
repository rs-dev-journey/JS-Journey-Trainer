import createElement from '@/shared/lib/dom/create-element';
import { initTestRun } from '../model/init-test-run';
import { createTestRunWidget } from '@/widgets/test-run';

export function createTestRunPage() {
  // достать userId из сессии
  const userId = 'user-1';

  const root = createElement('main');
  // TODO: заменить на loader
  root.textContent = 'Loading...';

  initTestRun()
    .then((test) => {
      root.replaceChildren(createTestRunWidget(test, userId));
    })
    .catch((error) => {
      root.textContent = error.message;
    });

  return root;
}
