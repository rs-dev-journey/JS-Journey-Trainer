import type { UserTestIncorrectAnswers } from '@/entities/attempt';
import createElement from '@/shared/lib/dom/create-element';
import { createIncorrectAnswerCard } from './create-incorrect-answer-card';
import './incorrect-answers-section.css';

export function createIncorrectAnswersSection(
  data: UserTestIncorrectAnswers,
  onBack: () => void,
): HTMLElement {
  const section = createElement('section', { classList: ['incorrect-answers-section'] });

  const header = createElement('div', { classList: ['incorrect-answers-section__header'] });

  const title = createElement('h2', {
    textContent: `Score: ${data.score}%`,
    classList: ['incorrect-answers-section__score'],
  });

  const backButton = createElement('button', {
    textContent: 'Back',
    classList: ['incorrect-answers-section__back'],
  });

  backButton.addEventListener('click', onBack);

  header.append(title, backButton);
  section.append(header);

  data.attemptAnswers.forEach((item) => section.append(createIncorrectAnswerCard(item)));

  return section;
}
