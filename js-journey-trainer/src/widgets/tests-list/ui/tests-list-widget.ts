import createElement from '@/shared/lib/dom/create-element';
import { loadTestsList } from '../model/load-tests-list';
import type { OnOpenTest } from '../model/types';
import { createTestsListContent } from './tests-list-content';
import './tests-list-widget.css';

export function createTestsListWidget(userId: string, onOpen: OnOpenTest): HTMLElement {
  const section = createElement('section', {
    classList: ['tests-list'],
  });

  section.textContent = 'Loading tests...';

  loadTestsList(userId)
    .then((cards) => {
      const content = createTestsListContent(cards, onOpen);
      section.replaceChildren(content);
    })
    .catch((error) => {
      section.textContent = `${error}`;
    });

  return section;
}
