import './dashboard.css';
import { DataRepository } from '@/entities/stats/api/repository';
import { chartAdapters } from '../lib/adapters';
import { drawPieChart, resizeObserver } from '../lib/draw';
import type { DashboardCardConfig } from '../model/types';
import createElement from '@/shared/lib/dom/create-element';

const ASYNC_SORTER_ID = 1;
const TRUE_FALSE_ID = 2;
const MOCK_NETWORK_DELAY = 2000;

export const DashboardService = {
  createLoader(): HTMLElement {
    return createElement('div', {
      classList: ['loader-wrapper'],
      children: [
        createElement('div', { classList: ['camel'], textContent: '🐫' }),
        createElement('small', { textContent: 'Loading...' }),
      ],
    });
  },

  renderStreaks(parent: HTMLElement, days: number[]): void {
    const streakCard = createElement('div', {
      classList: ['chart-card', 'streak-card'],
      children: [
        createElement('h3', { textContent: 'Activity Streak (Last 7 Days)' }),
        createElement('div', {
          classList: ['streak-dots'],
          children: days.map((active) =>
            createElement('div', {
              classList: ['dot', active ? 'active' : null].filter(
                (className): className is string => !!className,
              ),
            }),
          ),
        }),
      ],
    });
    parent.append(streakCard);
  },

  async init(): Promise<void> {
    const parent = document.body;
    if (!parent) return;

    const content = createElement('div', { classList: ['dashboard-grid'] });
    parent.append(content);

    const chartConfigs: DashboardCardConfig[] = [
      { id: 'chart-1', title: 'Quizzes Skills', wide: true },
      { id: 'chart-2', title: 'Async Sorter' },
      { id: 'chart-3', title: 'True/False' },
    ];

    chartConfigs.forEach((config) => {
      const card = createElement('div', {
        classList: ['chart-card', config.wide ? 'wide' : 'not-wide'],
        children: [
          createElement('h3', { textContent: config.title }),
          createElement('div', {
            attributes: { id: config.id },
            children: [this.createLoader()],
          }),
        ],
      });

      content.append(card);

      const chartContainer = document.querySelector(config.id);
      if (chartContainer) {
        resizeObserver.observe(chartContainer);
      }
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, MOCK_NETWORK_DELAY));

      const [quiz, asyncSorter, trueFalse] = await Promise.all([
        DataRepository.getQuizzes(),
        DataRepository.getActivity(ASYNC_SORTER_ID),
        DataRepository.getActivity(TRUE_FALSE_ID),
      ]);

      drawPieChart('#chart-1', chartAdapters.forPie(quiz));
      drawPieChart('#chart-2', chartAdapters.forProgress(asyncSorter), ['#39d8d8', '#eee']);
      drawPieChart('#chart-3', chartAdapters.forProgress(trueFalse), ['#e9a9f1', '#eee']);

      this.renderStreaks(content, [1, 1, 0, 1, 1, 0, 1]);
    } catch (error) {
      console.error('Dashboard Initialization Error:', error);
    }
  },
};
