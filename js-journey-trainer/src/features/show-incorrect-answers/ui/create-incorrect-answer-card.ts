import type { AttemptAnswer } from '@/entities/attempt';
import createElement from '@/shared/lib/dom/create-element';

function createAnswerOption(optionText: string, optionIndex: number) {
  const optionLabel = createElement('label', { classList: ['question-card__option'] });

  const optionInput = createElement('input', {
    classList: ['question-card__radio'],
    attributes: { type: 'radio', value: String(optionIndex), disabled: true },
  });

  const optionTextElement = createElement('span', {
    textContent: optionText,
    classList: ['question-card__option-text'],
  });

  optionLabel.append(optionInput, optionTextElement);

  return { root: optionLabel, controls: { optionInput } };
}

export function createIncorrectAnswerCard(attempt: AttemptAnswer): HTMLElement {
  const sectionCard = createElement('section', { classList: ['question-card'] });

  const titleCard = createElement('h3', {
    textContent: attempt.question,
    classList: ['question-card__title'],
  });

  const blockCard = createElement('div', { classList: ['question-card__block'] });

  attempt.options.forEach((optionText, optionIndex) => {
    const answerOption = createAnswerOption(optionText, optionIndex);

    if (optionIndex === attempt.selectedAnswerIndex) {
      answerOption.controls.optionInput.checked = true;
    }

    blockCard.append(answerOption.root);
  });

  sectionCard.append(titleCard, blockCard);

  return sectionCard;
}
