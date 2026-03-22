import { GAME_CONFIG } from '../config';
import { createFallingObject } from '../ui';

export class GameEngine {
  private score = 0;
  private readonly scoreElement: HTMLElement;

  constructor(scoreBoard: HTMLElement) {
    this.scoreElement = scoreBoard;
  }

  public spawn(container: HTMLElement): void {
    const item = createFallingObject();
    const startX = Math.random() * (window.innerWidth - GAME_CONFIG.OBJECT_SIZE_PX);

    item.style.left = `${startX}px`;
    item.style.top = `${GAME_CONFIG.INITIAL_POS_Y}px`;

    container.append(item);
    this.startFallingAnimation(item);
    this.bindEvents(item);
  }

  private startFallingAnimation(item: HTMLImageElement): void {
    let posY = GAME_CONFIG.INITIAL_POS_Y;
    const speed = GAME_CONFIG.FALL_SPEED_MIN + Math.random() * GAME_CONFIG.FALL_SPEED_MAX;

    const updatePosition = (): void => {
      posY += speed;
      item.style.top = `${posY}px`;

      if (posY < window.innerHeight && item.isConnected) {
        requestAnimationFrame(updatePosition);
      } else {
        item.remove();
      }
    };

    requestAnimationFrame(updatePosition);
  }

  private bindEvents(item: HTMLImageElement): void {
    item.addEventListener(
      'mousedown',
      () => {
        this.score += 1;
        this.scoreElement.textContent = `Score: ${this.score}`;

        item.classList.add('is-clicked');
        setTimeout(() => item.remove(), GAME_CONFIG.REMOVE_DELAY_MS);
      },
      { once: true },
    );
  }
}
