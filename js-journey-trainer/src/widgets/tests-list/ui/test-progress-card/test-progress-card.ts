import createElement from '@/shared/lib/dom/create-element';
import type { OnOpenTest, TestCardProgress, TestCardViewModel } from '../../model/types';
import { formatScoreLabel, formatStatusLabel } from '@/entities/user-test-progress';
import './test-progress-card.css';

function createMetaItem(labelText: string, valueText: string, valueClass?: string): HTMLElement {
  const metaItem = createElement('div', {
    classList: ['test-card__meta-item'],
  });

  const metaLabel = createElement('span', {
    textContent: labelText,
    classList: ['test-card__meta-label'],
  });

  const metaValue = createElement('span', {
    textContent: valueText,
    classList: ['test-card__meta-value', ...(valueClass ? [valueClass] : [])],
  });

  metaItem.append(metaLabel, metaValue);

  return metaItem;
}

function createCardMedia({ imageUrl, title, description }: TestCardViewModel): HTMLDivElement {
  const cardMedia = createElement('div', { classList: ['test-card__media'] });

  const cardImg = createElement('img', {
    classList: ['test-card__image'],
    attributes: { src: imageUrl, alt: title },
  });

  const cardDescription = createElement('p', {
    textContent: description,
    classList: ['test-card__description'],
  });

  cardMedia.append(cardImg, cardDescription);

  return cardMedia;
}

function createCardMeta({
  status,
  attemptsCount,
  lastScorePercent,
}: TestCardProgress): HTMLDivElement {
  const cardMeta = createElement('div', { classList: ['test-card__meta'] });

  const statusItem = createMetaItem('Status', formatStatusLabel(status), `status-${status}`);
  const attemptsItem = createMetaItem('Attempts', String(attemptsCount));
  const scoreItem = createMetaItem('Score', formatScoreLabel(lastScorePercent));

  cardMeta.append(statusItem, attemptsItem, scoreItem);

  return cardMeta;
}

export function createTestProgressCard(
  cardModel: TestCardViewModel,
  onOpen: OnOpenTest,
): HTMLElement {
  const cardElement = createElement('article', { classList: ['test-card'] });

  const cardTitle = createElement('h3', {
    textContent: cardModel.title,
    classList: ['test-card__title'],
  });

  const cardBody = createElement('div', { classList: ['test-card__body'] });

  const cardMedia = createCardMedia(cardModel);

  const openTestButton = createElement('button', {
    textContent: 'Open Test',
    classList: ['test-card__open-button'],
    attributes: {
      type: 'button',
    },
  });

  openTestButton.addEventListener('click', () => onOpen(cardModel.id));

  const cardMeta = createCardMeta(cardModel.progress);

  cardBody.append(cardMedia, openTestButton, cardMeta);
  cardElement.append(cardTitle, cardBody);

  return cardElement;
}
