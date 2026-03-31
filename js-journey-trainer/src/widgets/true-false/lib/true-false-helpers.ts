import { isAnswerCorrect } from '../lib/check-answer';
import type { TrueFalseQuestion, TrueFalseWidgetState } from '../model/types';

export function updateAnswerButtons(
  buttonTrue: HTMLButtonElement,
  buttonFalse: HTMLButtonElement,
  selectedAnswer: boolean | null,
): void {
  buttonTrue.classList.toggle('is-active', selectedAnswer === true);
  buttonFalse.classList.toggle('is-active', selectedAnswer === false);
}

const hundred = 100;
export function calculatePercentage(score: number, total: number): number {
  return Math.round((score / total) * hundred);
}

export function handleCheckAnswer(
  question: TrueFalseQuestion,
  state: TrueFalseWidgetState,
  infoText: HTMLParagraphElement,
  explanationText: HTMLParagraphElement,
  buttonTrue: HTMLButtonElement,
  buttonFalse: HTMLButtonElement,
  buttonCheck: HTMLButtonElement,
  buttonNext: HTMLButtonElement,
): void {
  if (state.selectedAnswer === null) return;

  const isCorrect = isAnswerCorrect(question.correct, state.selectedAnswer);

  if (isCorrect) {
    state.score += 1;
  }

  state.status = 'checked';

  infoText.textContent = isCorrect ? 'You did great!' : 'Incorrect';
  infoText.classList.toggle('is-correct', isCorrect);
  infoText.classList.toggle('is-incorrect', !isCorrect);

  explanationText.textContent = question.explanation;
  explanationText.hidden = false;

  buttonTrue.disabled = true;
  buttonFalse.disabled = true;
  buttonCheck.disabled = true;
  buttonNext.disabled = false;
  buttonNext.hidden = false;
}
