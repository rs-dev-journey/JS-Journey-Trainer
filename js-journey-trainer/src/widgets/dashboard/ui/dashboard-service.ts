import './dashboard.css';
import './user.css';
import { DataRepository } from '@/entities/stats/api/repository';
import { chartAdapters } from '../lib/adapters';
import { drawPieChart, resizeObserver } from '../lib/draw';
import type { DashboardCardConfig } from '../model/types';
import createElement from '@/shared/lib/dom/create-element';
import { createLoader } from '@/shared/ui/loader';
import { getCurrentUserName } from '@/entities/user';

const ASYNC_SORTER_ID = 1;
const TRUE_FALSE_ID = 2;
const MOCK_NETWORK_DELAY = 2000;

export const DashboardService = {
  renderUserHeader(parent: HTMLElement, name: string): void {
    const headerContainer = createElement('div', {
      classList: ['dashboard-user-header'],
      children: [
        createElement('h2', {
          textContent: `Your Learning Insights, ${name || 'Explorer'}`,
        }),
        createElement('div', { classList: ['header-accent-line'] }),
      ],
    });
    parent.prepend(headerContainer);
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

  async init(parent: HTMLElement): Promise<void> {
    if (!parent) return;
    const content = createElement('div', { classList: ['dashboard-grid'] });
    parent.append(content);
    const authName = getCurrentUserName();
    const storedName = localStorage.getItem('current_username');
    const finalName = authName || storedName || 'Explorer';
    this.renderUserHeader(parent, finalName);

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
            children: [createLoader()],
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
