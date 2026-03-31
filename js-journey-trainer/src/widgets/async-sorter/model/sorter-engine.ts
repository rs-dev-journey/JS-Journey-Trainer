import { playlist } from '@/entities/async-sorter/lib/static-data';
import type { SorterState } from '../../../entities/async-sorter/model/types';
import { refreshSorterUI } from '../ui/async-sorter';
import { RESULT_DELAY, HALF_DIVIDER, MS_PER_SEC } from '../lib/constants';
import { handleWin } from './sorter-init';
import { sounds } from '../lib/audio-service';

export const currentState: SorterState = {
  currentTask: playlist[0],
  userOrder: Array.from<string | null>({ length: playlist[0].expected.length }).fill(null),
  attempts: 0,
  startTime: Date.now(),
  isAnimating: false,
};

export const checkResult = async (isHintUsed: boolean): Promise<void> => {
  if (currentState.isAnimating) return;

  const consoleOut = document.querySelector('#visual-console');

  const isFull = currentState.userOrder.every((item) => item !== null);
  if (!isFull) return;

  currentState.attempts++;

  const isCorrect = currentState.userOrder.every(
    (value, index) => value === currentState.currentTask.expected[index],
  );

  if (isCorrect) {
    currentState.isAnimating = true;
    sounds.correct();

    const endTime = Date.now();
    const timeSpent = ((endTime - currentState.startTime) / MS_PER_SEC).toFixed(HALF_DIVIDER);
    sendToAdapter(!isHintUsed, timeSpent, isHintUsed ? 'hint_used' : 'SORT_COMPLETED');

    const hintButton = document.querySelector<HTMLButtonElement>('.hint-button');
    if (hintButton) hintButton.disabled = true;

    await handleWin();
  } else {
    sounds.wrong();
    if (consoleOut) consoleOut.textContent = '> ERROR: Incorrect order. Please try again.';
    currentState.userOrder = Array.from<string | null>({
      length: currentState.userOrder.length,
    }).fill(null);
  }
};

export const selectNumber = (value: string): void => {
  sounds.click();

  if (currentState.userOrder.includes(value)) return;

  const emptyIndex = currentState.userOrder.indexOf(null);
  if (emptyIndex !== -1) {
    currentState.userOrder[emptyIndex] = value;

    checkResult(false);
    refreshSorterUI();

    if (!currentState.userOrder.includes(null)) {
      setTimeout(checkResult, RESULT_DELAY);
    }
  }
};

export const undoStep = (index: number): void => {
  sounds.undo();
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
      checkResult(false);
    }
    refreshSorterUI();
  }
};

export const preventStandardDragOver = (event: DragEvent): void => {
  event.preventDefault();
};

export const showHint = (): void => {
  const { expected } = currentState.currentTask;
  const nextEmptyIndex = currentState.userOrder.indexOf(null);

  if (nextEmptyIndex === -1) return;

  currentState.userOrder[nextEmptyIndex] = expected[nextEmptyIndex];

  sounds.undo();
  refreshSorterUI();

  sendToAdapter(false, '0', `hint_step_${nextEmptyIndex + 1}`);

  if (!currentState.userOrder.includes(null)) {
    const hintButton = document.querySelector<HTMLButtonElement>('.hint-button');
    if (hintButton) hintButton.disabled = true;
    checkResult(true);
  }
};

export const sendToAdapter = (status: boolean, time: string, type: string): void => {
  console.log('ADAPTER_LOG:', {
    exerciseId: `visual-task-${currentState.currentTask.id}`,
    passed: status,
    time: time,
    type: type,
  });
};
