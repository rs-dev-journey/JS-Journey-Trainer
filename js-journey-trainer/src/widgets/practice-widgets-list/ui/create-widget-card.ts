import createElement from '@/shared/lib/dom/create-element';
import type { WidgetConfig } from '../model/types';
import { navigate } from '@/shared/lib/router/navigate';

export function createWidgetCard(widgetConfig: WidgetConfig): HTMLElement {
  const card = createElement('article', { classList: ['practice-card'] });

  const cardTitle = createElement('h2', {
    textContent: widgetConfig.title,
    classList: ['practice-card__title'],
  });

  const cardDescription = createElement('p', {
    textContent: widgetConfig.description,
    classList: ['practice-card__description'],
  });

  const cardStartButtonWrapper = createElement('div', {
    classList: ['practice-card__wrapper-button'],
  });

  const cardStartButton = createElement('button', {
    textContent: 'Start',
    classList: ['practice-card__button'],
  });

  cardStartButton.addEventListener('click', () => navigate(widgetConfig.route));

  cardStartButtonWrapper.append(cardStartButton);

  card.append(cardTitle, cardDescription, cardStartButtonWrapper);

  return card;
}
