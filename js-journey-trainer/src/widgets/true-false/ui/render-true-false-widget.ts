import type {
  TrueFalseQuestion,
  TrueFalseSessionResult,
  TrueFalseWidgetState,
} from '../model/types';
import { createButton, createTextBlock } from './create-true-false-element';
import {
  updateAnswerButtons,
  calculatePercentage,
  handleCheckAnswer,
} from '../lib/true-false-helpers';
import createElement from '@/shared/lib/dom/create-element';
import './true-false-widget.css';
import { playTrueAnswerAnimation } from '../lib/play-true-answer-animation';

type TrueFalseWidgetElements = {
  container: HTMLDivElement;
  progressText: HTMLParagraphElement;
  statement: HTMLParagraphElement;
  buttonTrue: HTMLButtonElement;
  buttonFalse: HTMLButtonElement;
  buttonCheck: HTMLButtonElement;
  buttonNext: HTMLButtonElement;
  infoText: HTMLParagraphElement;
  explanationText: HTMLParagraphElement;
};

function createWidgetElements(): TrueFalseWidgetElements {
  const progressText = createTextBlock('true-false-progress');
  const statement = createTextBlock('true-false-statement');

  const buttonTrue = createButton('TRUE', 'true-false-button');
  const buttonFalse = createButton('FALSE', 'true-false-button');
  const buttonCheck = createButton('CHECK', 'button-check', true);
  const buttonNext = createButton('NEXT', 'button-next', true);
  buttonNext.hidden = true;

  const infoText = createTextBlock('true-false-infotext');
  const explanationText = createTextBlock('true-false-explanation', true);

  const buttonsWrapper = createElement('div', {
    classList: ['true-false-wrapper_buttons'],
    children: [buttonTrue, buttonFalse],
  });

  const container = createElement('div', {
    classList: ['true-false-widget'],
    children: [
      progressText,
      statement,
      buttonsWrapper,
      buttonCheck,
      buttonNext,
      infoText,
      explanationText,
    ],
  });

  return {
    container,
    progressText,
    statement,
    buttonTrue,
    buttonFalse,
    buttonCheck,
    buttonNext,
    infoText,
    explanationText,
  };
}

export function renderTrueFalseWidget(
  userId: string,
  questions: TrueFalseQuestion[],
  onFinish?: (result: TrueFalseSessionResult) => void,
): HTMLElement {
  const state: TrueFalseWidgetState = {
    currentIndex: 0,
    score: 0,
    status: 'idle',
    selectedAnswer: null,
  };

  const elements = createWidgetElements();

  function getCurrentQuestion(): TrueFalseQuestion {
    return questions[state.currentIndex];
  }

  function selectAnswer(answer: boolean): void {
    if (state.status === 'checked') return;

    state.selectedAnswer = answer;
    state.status = 'answered';
    elements.buttonCheck.disabled = false;

    updateAnswerButtons(elements.buttonTrue, elements.buttonFalse, state.selectedAnswer);
  }

  elements.buttonTrue.addEventListener('click', () => selectAnswer(true));
  elements.buttonFalse.addEventListener('click', () => selectAnswer(false));

  elements.buttonCheck.addEventListener('click', () => {
    handleCheckButtonClick(state, elements, getCurrentQuestion);
  });

  elements.buttonNext.addEventListener('click', () => {
    const isLastQuestion = state.currentIndex === questions.length - 1;

    if (isLastQuestion) {
      showFinalResult(elements.container, userId, questions, state, onFinish);
      return;
    }
    state.currentIndex += 1;
    renderCurrentQuestionView(elements, state, getCurrentQuestion(), questions.length);
  });
  renderCurrentQuestionView(elements, state, getCurrentQuestion(), questions.length);
  return elements.container;
}

function handleCheckButtonClick(
  state: TrueFalseWidgetState,
  elements: TrueFalseWidgetElements,
  getCurrentQuestion: () => TrueFalseQuestion,
): void {
  const result = handleCheckAnswer(
    getCurrentQuestion(),
    state,
    elements.infoText,
    elements.explanationText,
    elements.buttonTrue,
    elements.buttonFalse,
    elements.buttonCheck,
    elements.buttonNext,
  );

  if (result === true) {
    playTrueAnswerAnimation(elements.container);
  }
}

function renderCurrentQuestionView(
  elements: TrueFalseWidgetElements,
  state: TrueFalseWidgetState,
  question: TrueFalseQuestion,
  totalQuestions: number,
): void {
  const {
    progressText,
    statement,
    buttonTrue,
    buttonFalse,
    buttonCheck,
    buttonNext,
    infoText,
    explanationText,
  } = elements;

  progressText.textContent = `Question ${state.currentIndex + 1} of ${totalQuestions}`;
  statement.textContent = question.statement;

  state.selectedAnswer = null;
  state.status = 'idle';

  infoText.textContent = '';
  infoText.classList.remove('is-correct', 'is-incorrect');

  explanationText.textContent = '';
  explanationText.hidden = true;

  buttonTrue.disabled = false;
  buttonFalse.disabled = false;
  buttonCheck.disabled = true;
  buttonNext.hidden = true;
  buttonNext.disabled = true;

  updateAnswerButtons(buttonTrue, buttonFalse, state.selectedAnswer);
}

function showFinalResult(
  container: HTMLDivElement,
  userId: string,
  questions: TrueFalseQuestion[],
  state: TrueFalseWidgetState,
  onFinish?: (result: TrueFalseSessionResult) => void,
): void {
  const totalQuestions = questions.length;
  const correctAnswers = state.score;
  const wrongAnswers = totalQuestions - correctAnswers;
  const percentage = calculatePercentage(correctAnswers, totalQuestions);

  state.status = 'finished';

  container.innerHTML = '';

  const resultTitle = createElement('h2', {
    classList: ['true-false-result-title'],
    textContent: 'Completed!',
  });

  const resultText = createElement('p', {
    classList: ['true-false-result-text'],
    textContent: `Correct answers: ${correctAnswers} / ${totalQuestions}`,
  });

  const resultPercentage = createElement('p', {
    classList: ['true-false-result-percentage'],
    textContent: `Score: ${percentage}%`,
  });

  container.append(resultTitle, resultText, resultPercentage);

  onFinish?.({ userId, totalQuestions, correctAnswers, wrongAnswers, percentage });
}
