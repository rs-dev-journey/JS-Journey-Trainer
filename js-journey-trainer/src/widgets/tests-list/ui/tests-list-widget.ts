import createElement from '@/shared/lib/dom/create-element';
import { loadTestsList } from '../model/load-tests-list';
import type { OnOpenTest } from '../model/types';
import { createTestsListContent } from './tests-list-content';
import { createLoader } from '@/shared/ui/loader';
import './tests-list-widget.css';
import { renderErrorState } from '@/shared/ui/error-state';

export function createTestsListWidget(userId: string, onOpen: OnOpenTest): HTMLElement {
  const section = createElement('section', {
    classList: ['tests-list', 'tests-list--loading'],
  });

  section.append(createLoader());

  loadTestsList(userId)
    .then((cards) => {
      const content = createTestsListContent(cards, onOpen);
      section.replaceChildren(content);
    })
    .catch((error) => {
      section.replaceChildren(renderErrorState(error));
    })
    .finally(() => {
      section.classList.remove('tests-list--loading');
    });

  return section;
}
