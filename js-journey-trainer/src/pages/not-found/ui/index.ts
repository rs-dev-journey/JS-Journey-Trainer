import createElement from '@/shared/lib/dom/create-element';
import { GameEngine, createScoreBoard } from '@/features/not-found-game';
import { GAME_CONFIG } from '@/features/not-found-game/config';
import './styles.css';
// TODO: Import navigate once routing is implemented
// import { navigate } from '@/shared/lib/router/navigate';

function createPageLayout() {
  const scoreBoard = createScoreBoard();

  const backButton = createElement('button', {
    textContent: 'Go Back',
    classList: ['btn-back', 'fade-in', 'delay-back-btn'],
  });

  // TODO: Implement navigation logic once the router and navigate() function are ready
  /* backBtn?.addEventListener('click', () => {
    if (globalThis.history.length > 1) {
      globalThis.history.back();
      return;
    }
    navigate('/login');
  }); */

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

  return { backBtn: backButton, content, scoreBoard };
}

export function renderNotFoundPage(root: HTMLElement): void {
  const { backBtn, scoreBoard, content } = createPageLayout();

  root.append(backBtn, content, scoreBoard);

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
