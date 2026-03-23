import { playlist } from '../../../entities/async-sorter/lib/static-data';
import { renderOptions, renderSlots } from '../ui/async-sorter';

export const initAsyncSorter = (): void => {
  const currentTask = playlist[0];

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
  console.log('Sorter Engine is initialized');
};
