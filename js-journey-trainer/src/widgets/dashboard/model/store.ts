import type { ChartData } from './types';
import createElement from '@/shared/lib/dom/create-element';

export interface ChartState {
  data: ChartData[];
  colors: string[];
}

export const chartStore = new Map<string, ChartState>();

export const createTooltip = (): HTMLDivElement => {
  const existingTooltip = document.querySelector('.d3-tooltip');

  if (existingTooltip instanceof HTMLDivElement) {
    return existingTooltip;
  }

  const tooltip = createElement('div', {
    classList: ['d3-tooltip'],
  });

  document.body.append(tooltip);

  return tooltip;
};
