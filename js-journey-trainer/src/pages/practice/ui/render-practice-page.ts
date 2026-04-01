import createElement from '@/shared/lib/dom/create-element';
import { createWidgetsList } from '@/widgets/practice-widgets-list';
import './practice-page.css';

export function renderPracticePage(root: HTMLElement): void {
  const practicePage = createElement('div', { classList: ['practice'] });

  const practiceHeader = createElement('section', { classList: ['practice__header'] });

  const practiceTitle = createElement('h1', {
    textContent: 'Practice',
    classList: ['practice__title'],
  });
  const practiceSubtitle = createElement('p', {
    textContent: 'Select a widget to test your skills',
    classList: ['practice__subtitle'],
  });

  practiceHeader.append(practiceTitle, practiceSubtitle);

  const practiceWidgetsList = createWidgetsList();

  practicePage.append(practiceHeader, practiceWidgetsList);
  root.append(practicePage);
}
