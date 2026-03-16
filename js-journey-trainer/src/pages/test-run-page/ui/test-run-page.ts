import createElement from '@/shared/lib/dom/create-element';
import { initTestRun } from '../model/init-test-run';
import { createTestRunWidget } from '@/widgets/test-run';

export function createTestRunPage() {
  const root = createElement('main', { classList: ['test-run'] });
  // TODO: заменить на loader
  root.textContent = 'Loading test...';

  initTestRun()
    .then((test) => {
      root.replaceChildren(createTestRunWidget(test));
    })
    .catch((error) => {
      root.textContent = error.message;
    });

  return root;
}
