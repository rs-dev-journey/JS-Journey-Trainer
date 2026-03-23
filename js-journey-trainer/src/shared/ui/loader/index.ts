import createElement from '@/shared/lib/dom/create-element';
import './styles.css';
export function createLoader(): HTMLElement {
  return createElement('div', {
    classList: ['loader-wrapper'],
    children: [
      createElement('div', { classList: ['camel'], textContent: '🐫' }),
      createElement('small', { textContent: 'Loading...' }),
    ],
  });
}
