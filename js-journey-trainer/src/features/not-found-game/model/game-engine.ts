import { GAME_CONFIG } from '../config';
import { createFallingObject } from '../ui';

export class GameEngine {
  private score = 0;
  private readonly scoreElement: HTMLElement;

  constructor(scoreBoard: HTMLElement) {
    this.scoreElement = scoreBoard;
  }

  public spawn(container: HTMLElement): void {
    const gameObject = createFallingObject();
    const startX = Math.random() * (window.innerWidth - GAME_CONFIG.OBJECT_SIZE_PX);

    const rotationRange = GAME_CONFIG.ROTATION_MAX - GAME_CONFIG.ROTATION_MIN;
    const initialRotation = Math.random() * rotationRange + GAME_CONFIG.ROTATION_MIN;

    gameObject.style.left = `${startX}px`;
    gameObject.style.top = `${GAME_CONFIG.INITIAL_POS_Y}px`;
    gameObject.style.transform = `rotate(${initialRotation}deg)`;

    container.append(gameObject);
    this.startFallingAnimation(gameObject, initialRotation);
    this.bindEvents(gameObject);
  }

  private startFallingAnimation(item: HTMLImageElement, initialRotation: number): void {
    let currentPosY = GAME_CONFIG.INITIAL_POS_Y;
    const speed = GAME_CONFIG.FALL_SPEED_MIN + Math.random() * GAME_CONFIG.FALL_SPEED_MAX;

    const updatePosition = (): void => {
      currentPosY += speed;
      item.style.top = `${currentPosY}px`;

      item.style.transform = `translateY(0) rotate(${initialRotation}deg)`;

      const isOutOfBounds = currentPosY > window.innerHeight;

      if (!isOutOfBounds && item.isConnected) {
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
