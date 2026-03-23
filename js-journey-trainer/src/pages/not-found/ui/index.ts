import createElement from '@/shared/lib/dom/create-element';
import { GameEngine, createScoreBoard } from '@/features/not-found-game';
import { GAME_CONFIG } from '@/features/not-found-game/config';
import './styles.css';

export function renderNotFoundPage(root: HTMLElement): void {
  const scoreBoard = createScoreBoard();

  const content = createElement('div', {
    classList: ['not-found-container'],
    children: [
      createElement('h1', {
        textContent: GAME_CONFIG.MESSAGES.TITLE,
        classList: ['fade-in'],
      }),
      createElement('p', {
        textContent: GAME_CONFIG.MESSAGES.INTERRUPTED,
        classList: ['fade-in', 'delay-interrupted'],
      }),
      createElement('p', {
        textContent: GAME_CONFIG.MESSAGES.SUBTITLE,
        classList: ['fade-in', 'delay-subtitle'],
      }),
    ],
  });

  root.append(scoreBoard, content);

  const game = new GameEngine(scoreBoard);

  const timer = setInterval(() => game.spawn(root), GAME_CONFIG.SPAWN_INTERVAL_MS);

  const observer = new MutationObserver(() => {
    if (!root.contains(scoreBoard)) {
      clearInterval(timer);
      observer.disconnect();
    }
  });

  observer.observe(root, { childList: true });
}
