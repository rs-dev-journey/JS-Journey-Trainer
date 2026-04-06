import createElement from '@/shared/lib/dom/create-element';
import './styles.css';

interface ErrorStateOptions {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function renderErrorState(options: ErrorStateOptions = {}): HTMLElement {
  const { title = 'Something went wrong', message = 'Failed to load data', onRetry } = options;

  const container = createElement('div', {
    classList: ['error-state-container'],
  });

  const children: HTMLElement[] = [
    createElement('div', { classList: ['error-state-icon'] }),
    createElement('h2', { classList: ['error-state-title'], textContent: title }),
    createElement('p', { classList: ['error-state-message'], textContent: message }),
  ];

  if (onRetry) {
    const retryButton = createElement('button', {
      classList: ['error-state-button'],
      textContent: 'Try again',
    });

    retryButton.addEventListener('click', onRetry);
    children.push(retryButton);
  }

  container.append(...children);
  return container;
}
