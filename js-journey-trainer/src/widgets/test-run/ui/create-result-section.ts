import createElement from '@/shared/lib/dom/create-element';
import type { ResultViewModel } from '../model/types';
import { getDurationLabel } from '../model/get-duration-label';
import './result-section.css';

function createResultCard(resultModel: ResultViewModel) {
  const resultCard = createElement('div', { classList: ['test-run-result__card'] });

  const score = createElement('h2', {
    textContent: `Result: ${resultModel.score}`,
    classList: ['test-run-result__score'],
  });

  const stats = createElement('div', { classList: ['test-run-result__stats'] });

  const correctString = `Correct answers: ${resultModel.correctCount} of ${resultModel.totalQuestions}`;
  const timeString = getDurationLabel(resultModel.duration);

  const correctStat = createElement('div', {
    textContent: correctString,
    classList: ['test-run-result__stat', 'test-run-result__stat--correct'],
  });

  const timeStat = createElement('div', {
    textContent: timeString,
    classList: ['test-run-result__stat', 'test-run-result__stat--time'],
  });

  stats.append(correctStat, timeStat);

  const reviewButton = createElement('button', {
    textContent: 'View answers',
    classList: ['test-run-result__review-button'],
  });

  resultCard.append(score, stats, reviewButton);

  return { root: resultCard, controls: { reviewButton } };
}

function createResultActions() {
  const resultActions = createElement('div', { classList: ['test-run-result__actions'] });

  const againButton = createElement('button', {
    textContent: 'Try Again',
    classList: ['test-run-result__action-button'],
  });

  const testsListButton = createElement('button', {
    textContent: 'Back to tests',
    classList: ['test-run-result__action-button'],
  });

  resultActions.append(againButton, testsListButton);

  return { root: resultActions, controls: { againButton, testsListButton } };
}

export function createResultSection(
  resultModel: ResultViewModel,
  onTryAgain: () => void,
  onBackToTests: () => void,
  onViewAnswers: () => void,
): HTMLElement {
  const resultSection = createElement('section', { classList: ['test-run-result'] });

  const resultCard = createResultCard(resultModel);
  const resultActions = createResultActions();

  resultSection.append(resultCard.root, resultActions.root);

  resultActions.controls.againButton.addEventListener('click', onTryAgain);
  resultActions.controls.testsListButton.addEventListener('click', onBackToTests);
  resultCard.controls.reviewButton.addEventListener('click', onViewAnswers);

  return resultSection;
}
