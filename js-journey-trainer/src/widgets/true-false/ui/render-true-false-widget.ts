import { isAnswerCorrect } from '../lib/check-answer';
import createElement from '@/shared/lib/dom/create-element';
import type { TrueFalseQuestion, TrueFalseResult, TrueFalseWidgetState } from '../model/types';

function createButton(text: string, className: string, disabled = false): HTMLButtonElement {
  return createElement('button', {
    classList: [className],
    textContent: text,
    attributes: {
      type: 'button',
      disabled,
    },
  });
}

function createTextBlock(className: string, hidden = false): HTMLParagraphElement {
  return createElement('p', {
    classList: [className],
    attributes: {
      hidden,
    },
  });
}

function updateAnswerButtons(
  buttonTrue: HTMLButtonElement,
  buttonFalse: HTMLButtonElement,
  selectedAnswer: boolean | null,
): void {
  buttonTrue.classList.toggle('is-active', selectedAnswer === true);
  buttonFalse.classList.toggle('is-active', selectedAnswer === false);
}

function handleCheckAnswer(
  question: TrueFalseQuestion,
  state: TrueFalseWidgetState,
  infoText: HTMLParagraphElement,
  explanationText: HTMLParagraphElement,
  buttonTrue: HTMLButtonElement,
  buttonFalse: HTMLButtonElement,
  buttonCheck: HTMLButtonElement,
  onComplete?: (result: TrueFalseResult) => void,
): void {
  if (state.selectedAnswer === null) return;

  const isCorrect = isAnswerCorrect(question.correct, state.selectedAnswer);

  state.status = 'checked';

  infoText.textContent = isCorrect ? 'You did great!' : 'Incorrect';
  explanationText.textContent = question.explanation;
  explanationText.hidden = false;

  buttonTrue.disabled = true;
  buttonFalse.disabled = true;
  buttonCheck.disabled = true;

  onComplete?.({
    questionId: question.id,
    selectedAnswer: state.selectedAnswer,
    isCorrect,
  });
}

export function renderTrueFalseWidget(
  question: TrueFalseQuestion,
  onComplete?: (result: TrueFalseResult) => void,
): HTMLElement {
  const state: TrueFalseWidgetState = {
    status: 'idle',
    selectedAnswer: null,
  };

  const statement = createTextBlock('true-false-statement');
  statement.textContent = question.statement;

  const buttonTrue = createButton('TRUE', 'true-false-button');
  const buttonFalse = createButton('FALSE', 'true-false-button');
  const buttonCheck = createButton('CHECK', 'button-check', true);

  const infoText = createTextBlock('true-false-infotext');
  const explanationText = createTextBlock('true-false-explanation', true);

  const buttonsWrapper = createElement('div', {
    classList: ['true-false-wrapper_buttons'],
    children: [buttonTrue, buttonFalse],
  });

  const container = createElement('div', {
    classList: ['true-false-widget'],
    children: [statement, buttonsWrapper, buttonCheck, infoText, explanationText],
  });

  function selectAnswer(answer: boolean): void {
    if (state.status === 'checked') return;
    state.selectedAnswer = answer;
    state.status = 'answered';
    buttonCheck.disabled = false;

    updateAnswerButtons(buttonTrue, buttonFalse, state.selectedAnswer);
  }
  buttonTrue.addEventListener('click', () => selectAnswer(true));

  buttonFalse.addEventListener('click', () => selectAnswer(false));

  buttonCheck.addEventListener('click', () => {
    handleCheckAnswer(
      question,
      state,
      infoText,
      explanationText,
      buttonTrue,
      buttonFalse,
      buttonCheck,
      onComplete,
    );
  });
  return container;
}
