import createElement from '@/shared/lib/dom/create-element';
import { GAME_ASSETS } from '../config';

export function createScoreBoard(): HTMLElement {
  return createElement('div', {
    attributes: { id: 'score-board' },
    textContent: 'Score: 0',
  });
}

export function createFallingObject(): HTMLImageElement {
  const currentTheme = document.documentElement.dataset.theme || 'light';
  const isDark = currentTheme === 'dark';

  return createElement('img', {
    classList: ['game-object'],
    attributes: {
      src: isDark ? GAME_ASSETS.JELLY : GAME_ASSETS.CAMEL,
      alt: 'Game Target',
    },
  });
}
