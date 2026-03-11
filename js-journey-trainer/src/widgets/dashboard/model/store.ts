import type { ChartData } from './types';

export interface ChartState {
    data: ChartData[];
    colors: string[];
}

export const chartStore = new Map<string, ChartState>();

export const createTooltip = (): HTMLDivElement => {
    let tooltip = document.querySelector('.d3-tooltip') as HTMLDivElement;

    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.classList.add('d3-tooltip');
        document.body.append(tooltip);
    }

    return tooltip;
};