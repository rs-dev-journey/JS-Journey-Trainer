import createElement from '../../../shared/lib/dom/create-element';
import {
  selectNumber,
  undoStep,
  preventStandardDragOver,
  handleDrop,
  currentState,
} from '../model/sorter-engine';
import type { AsyncSorterTask } from '../../../entities/async-sorter/model/types';

import './styles.css';

export const refreshSorterUI = (): void => {
  const slots = document.querySelectorAll('.slot');

  slots.forEach((slot, index) => {
    const value = currentState.userOrder[index];

    slot.textContent = value ?? '?';

    slot.classList.toggle('occupied', value);
  });
};

export const renderOptions = (task: AsyncSorterTask): HTMLElement[] => {
  const uniqueNumbers = [...new Set(task.expected)].toSorted();

  return uniqueNumbers.map((value) => {
    const card = createElement('div', {
      textContent: value,
      classList: ['num-card'],
    });

    card.draggable = true;
    card.addEventListener('click', () => selectNumber(value));

    card.addEventListener('dragstart', (event: DragEvent) => {
      event.dataTransfer?.setData('text', value);
    });

    return card;
  });
};

export const renderSlots = (count: number): HTMLElement[] => {
  const slots: HTMLElement[] = [];

  for (let index = 0; index < count; index++) {
    const slot = createElement('div', {
      textContent: '?',
      classList: ['slot'],
    });

    slot.addEventListener('dragover', (event: DragEvent) => preventStandardDragOver(event));

    slot.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      const value = event.dataTransfer?.getData('text');
      if (value) handleDrop(value, index);
    });

    slot.addEventListener('click', () => undoStep(index));
    slots.push(slot);
  }

  return slots;
};
