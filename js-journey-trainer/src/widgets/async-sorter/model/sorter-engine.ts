import { playlist } from '@/entities/async-sorter/lib/static-data';
import type { SorterState } from '../../../entities/async-sorter/model/types';
import { refreshSorterUI } from '../ui/async-sorter';

export const currentState: SorterState = {
  currentTask: playlist[0],
  userOrder: Array.from<string | null>({ length: playlist[0].expected.length }).fill(null),
};

export const checkResult = (): void => {
  const isFull = currentState.userOrder.every((item) => item !== null);
  if (!isFull) return;

  const isCorrect = currentState.userOrder.every(
    (value, index) => value === currentState.currentTask.expected[index],
  );

  if (isCorrect) {
    sendToAdapter(true, '0.00');
  } else {
    console.log('Order is incorrect, try again');
  }
};

export const selectNumber = (value: string): void => {
  if (currentState.userOrder.includes(value)) return;

  const emptyIndex = currentState.userOrder.indexOf(null);
  if (emptyIndex !== -1) {
    currentState.userOrder[emptyIndex] = value;
    checkResult();
    refreshSorterUI();
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
