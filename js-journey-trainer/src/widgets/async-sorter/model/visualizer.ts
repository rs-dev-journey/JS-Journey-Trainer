import createElement from '../../../shared/lib/dom/create-element';
import type { VisualStep } from '../../../entities/async-sorter/model/types';
import { ANIMATION_DELAY } from '../lib/constants';
import { sounds } from '../lib/audio-service';

const DESTINATIONS: Record<string, string> = {
  macro: 'webapi',
  micro: 'micro',
  sync: 'stack',
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const createVisualNode = (step: VisualStep): HTMLElement => {
  return createElement('div', {
    textContent: step.label,
    classList: ['visual-task', step.type],
    attributes: { id: `v-${step.id}` },
  });
};

async function clearQueue(fromId: string, stack: Element): Promise<void> {
  const queue = document.querySelector('#' + fromId);
  if (!queue) return;

  const tasks = [...queue.children].filter((child) => child.tagName !== 'H3');

  for (const task of tasks) {
    stack.append(task);
    sounds.fly();
    await delay(ANIMATION_DELAY.EXECUTE_DURATION);
    task.remove();
  }
}

export const runVisualLoop = async (steps: readonly VisualStep[]): Promise<void> => {
  const stack = document.querySelector('#stack');
  const webapi = document.querySelector('#webapi');
  const macroQueue = document.querySelector('#macro');
  const microQueue = document.querySelector('#micro');

  if (!stack || !webapi || !macroQueue || !microQueue) return;

  [stack, webapi, macroQueue, microQueue].forEach((container) => {
    const oldTasks = [...container.children].filter((child) => child.tagName !== 'H3');
    oldTasks.forEach((child) => child.remove());
  });

  await delay(ANIMATION_DELAY.START_PAUSE);

  for (const step of steps) {
    const element = createVisualNode(step);
    stack.append(element);
    sounds.fly();
    await delay(ANIMATION_DELAY.STACK_DURATION);

    const targetId = DESTINATIONS[step.type];
    const targetContainer = document.querySelector(`#${targetId}`);

    if (targetContainer && step.type !== 'sync') {
      targetContainer.append(element);
      sounds.fly();

      if (step.type === 'macro') {
        await delay(ANIMATION_DELAY.WEB_API_DURATION);
        macroQueue.append(element);
        sounds.fly();
      }
    } else if (step.type === 'sync') {
      element.remove();
    }

    await delay(ANIMATION_DELAY.STEP_GAP);
  }

  await clearQueue('micro', stack);
  await clearQueue('macro', stack);

  const consoleOut = document.querySelector('#visual-console');
  if (consoleOut) consoleOut.textContent = '> Visualization is completed.';
};
