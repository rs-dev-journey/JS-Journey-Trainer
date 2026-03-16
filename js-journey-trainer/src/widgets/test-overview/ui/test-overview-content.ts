import createElement from '@/shared/lib/dom/create-element';
import type { Attempt } from '@/entities/attempt';
import type { Test } from '@/entities/test';
import './test-overview-content.css';
import { createAttemptsTable } from './attempts-table';

function createBackIcon() {
  const svgNamespace = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(svgNamespace, 'svg');
  svg.setAttribute('viewBox', '64 64 896 896');
  svg.setAttribute('focusable', 'false');
  svg.dataset.icon = 'arrow-left';
  svg.setAttribute('width', '1em');
  svg.setAttribute('height', '1em');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS(svgNamespace, 'path');
  path.setAttribute(
    'd',
    'M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z',
  );

  svg.append(path);

  return svg;
}

function createTestOverviewHeader(test: Test): HTMLElement {
  const header = createElement('header', {
    classList: ['test-overview__header'],
  });

  const heading = createElement('div', { classList: ['test-overview__heading'] });

  // TODO: ВСТАВИТЬ ССЫЛКУ НА СТРАНИЦУ С ТЕСТАМИ
  const backToTests = createElement('a', {
    classList: ['test-overview__back'],
    attributes: { href: './' },
    children: [createBackIcon()],
  });

  const title = createElement('h2', {
    textContent: test.title,
    classList: ['test-overview__title'],
  });

  heading.append(backToTests, title);

  const description = createElement('p', {
    textContent: test.description,
    classList: ['test-overview__description'],
  });

  header.append(heading, description);

  return header;
}

function createEmptyAttemptsState(): HTMLParagraphElement {
  return createElement('p', {
    textContent: 'No attempts yet',
    classList: ['test-overview__empty-attempts'],
  });
}

function createTestOverviewActions(startTest: () => void, showAnswers: () => void): HTMLDivElement {
  const actions = createElement('div', { classList: ['test-overview__actions'] });

  const startTestButton = createElement('button', {
    textContent: 'Start Test',
    classList: ['test-overview__start-button'],
    attributes: { type: 'button' },
  });

  const showAnswersButton = createElement('button', {
    textContent: 'Show Answers',
    classList: ['test-overview__answers-button'],
    attributes: { type: 'button' },
  });

  startTestButton.addEventListener('click', startTest);
  showAnswersButton.addEventListener('click', showAnswers);

  actions.append(startTestButton, showAnswersButton);

  return actions;
}

function createTestOverviewAttempts(
  attempts: Attempt[],
  startTest: () => void,
  showAnswers: () => void,
): HTMLElement {
  const attemptsSection = createElement('section', { classList: ['test-overview__attempts'] });

  const attemptsHeader = createElement('header', { classList: ['test-overview__attempts-header'] });

  const attemptsTitle = createElement('h3', {
    textContent: 'History of attempts:',
    classList: ['test-overview__attempts-title'],
  });

  const actions = createTestOverviewActions(startTest, showAnswers);

  attemptsHeader.append(attemptsTitle, actions);

  attemptsSection.append(attemptsHeader);

  if (attempts.length === 0) {
    const emptyState = createEmptyAttemptsState();
    attemptsSection.append(emptyState);

    return attemptsSection;
  }

  const attemptsTable = createAttemptsTable(attempts);
  attemptsSection.append(attemptsTable);

  return attemptsSection;
}

export function createTestOverviewContent(
  test: Test,
  attempts: Attempt[],
  startTest: () => void,
  showAnswers: () => void,
): DocumentFragment {
  const content = document.createDocumentFragment();

  const header = createTestOverviewHeader(test);
  const attemptsSection = createTestOverviewAttempts(attempts, startTest, showAnswers);
  content.append(header, attemptsSection);

  return content;
}
