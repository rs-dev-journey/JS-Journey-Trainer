import { playlist } from '../../../entities/async-sorter/lib/static-data';
import { renderOptions, renderSlots } from '../ui/async-sorter';
import { currentState, showHint } from './sorter-engine';
import { runVisualLoop } from './visualizer';
import { sounds } from '../lib/audio-service';

let currentTaskIndex = 0;

export const loadTask = (index: number): void => {
  const currentTask = playlist[index];
  if (!currentTask) return;

  currentTaskIndex = index;

  currentState.currentTask = currentTask;
  currentState.userOrder = Array.from<string | null>({ length: currentTask.expected.length }).fill(
    null,
  );
  currentState.startTime = Date.now();
  currentState.attempts = 0;

  const codeDisplay = document.querySelector('.code-display');
  if (codeDisplay) {
    codeDisplay.textContent = currentTask.code;
  }

  const slotsContainer = document.querySelector('.slots-row');
  if (slotsContainer) {
    slotsContainer.innerHTML = '';
    const slots = renderSlots(currentTask.expected.length);
    slotsContainer.append(...slots);
  }

  const optionsContainer = document.querySelector('.options');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    const options = renderOptions(currentTask);
    optionsContainer.append(...options);
  }
};

export const loadNewTask = (): void => {
  const nextButton = document.querySelector<HTMLButtonElement>('.next-button');
  if (nextButton) nextButton.disabled = true;
  const hintButton = document.querySelector<HTMLButtonElement>('.hint-button');
  if (hintButton) hintButton.disabled = false;
  const consoleOut = document.querySelector('#visual-console');

  if (currentTaskIndex < playlist.length - 1) {
    loadTask(currentTaskIndex + 1);
    if (consoleOut)
      consoleOut.textContent = `> Task № ${currentTaskIndex + 1} of  ${playlist.length}`;
  } else {
    if (consoleOut) consoleOut.textContent = '> All tasks are finished! ';
  }
};

export const handleWin = async (): Promise<void> => {
  currentState.isAnimating = true;

  document.querySelectorAll('.slot').forEach((slotItem) => slotItem.classList.add('correct'));

  const consoleOut = document.querySelector('#visual-console');
  if (consoleOut) consoleOut.textContent = '> SUCCESS! Starting visualization...';

  await runVisualLoop(currentState.currentTask.visualSteps);

  const nextButton = document.querySelector<HTMLButtonElement>('.next-button');
  if (nextButton) nextButton.disabled = false;

  currentState.isAnimating = false;
};

export const initAsyncSorter = (): void => {
  loadTask(0);
  const nextButton = document.querySelector<HTMLButtonElement>('.next-button');
  const hintButton = document.querySelector<HTMLButtonElement>('.hint-button');

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      sounds.click();
      loadNewTask();
    });
  }

  if (hintButton) {
    hintButton.addEventListener('click', () => {
      sounds.click();
      showHint();
    });
  }
};
