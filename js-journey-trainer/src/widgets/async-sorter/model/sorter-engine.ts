import { playlist } from '@/entities/async-sorter/lib/static-data';
import type { SorterState } from '../../../entities/async-sorter/model/types';
import { refreshSorterUI } from '../ui/async-sorter';
import { RESULT_DELAY, HALF_DIVIDER, MS_PER_SEC } from '../lib/constants';
import { runVisualLoop } from './visualizer';

export const currentState: SorterState = {
  currentTask: playlist[0],
  userOrder: Array.from<string | null>({ length: playlist[0].expected.length }).fill(null),
  attempts: 0,
  startTime: Date.now(),
};

let isAnimating = false;

export const checkResult = async (): Promise<void> => {
  if (isAnimating) return;
  const consoleOut = document.querySelector('##visual-console');

  const isFull = currentState.userOrder.every((item) => item !== null);
  if (!isFull) return;

  currentState.attempts++;
  console.log(`Attempt №${currentState.attempts}`);

  const isCorrect = currentState.userOrder.every(
    (value, index) => value === currentState.currentTask.expected[index],
  );

  if (isCorrect) {
    isAnimating = true;
    if (consoleOut) consoleOut.textContent = '> SUCCESS! Starting visualization...';

    const endTime = Date.now();
    const timeSpent = ((endTime - currentState.startTime) / MS_PER_SEC).toFixed(HALF_DIVIDER);
    sendToAdapter(true, timeSpent);

    await runVisualLoop(currentState.currentTask.visualSteps);
    isAnimating = false;
  } else {
    if (consoleOut) consoleOut.textContent = '> ERROR: Incorrect order. Please try again.';
    currentState.userOrder = Array.from<string | null>({
      length: currentState.userOrder.length,
    }).fill(null);
  }
};

export const selectNumber = (value: string): void => {
  if (currentState.userOrder.includes(value)) return;

  const emptyIndex = currentState.userOrder.indexOf(null);
  if (emptyIndex !== -1) {
    currentState.userOrder[emptyIndex] = value;

    checkResult();
    refreshSorterUI();

    if (!currentState.userOrder.includes(null)) {
      setTimeout(checkResult, RESULT_DELAY);
    }
  }
};

export const undoStep = (index: number): void => {
  if (currentState.userOrder[index] !== null) {
    currentState.userOrder[index] = null;
    refreshSorterUI();
  }
};

export const handleDrop = (value: string, index: number): void => {
  if (currentState.userOrder.includes(value)) return;

  if (currentState.userOrder[index] === null) {
    currentState.userOrder[index] = value;

    if (!currentState.userOrder.includes(null)) {
      checkResult();
    }
    refreshSorterUI();
  }
};

export const preventStandardDragOver = (event: DragEvent): void => {
  event.preventDefault();
};

export const sendToAdapter = (status: boolean, time: string): void => {
  console.log('ADAPTER_LOG:', {
    exerciseId: `visual-task-${currentState.currentTask.id}`,
    passed: status,
    time: time,
  });
};
