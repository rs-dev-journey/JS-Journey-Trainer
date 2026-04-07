import './dashboard.css';
import './user.css';
import { DataRepository } from '@/entities/stats/api/repository';
import { chartAdapters } from '../lib/adapters';
import { drawPieChart, resizeObserver } from '../lib/draw';
import type { DashboardCardConfig } from '../model/types';
import createElement from '@/shared/lib/dom/create-element';
import { createLoader } from '@/shared/ui/loader';
import { getCurrentUserName, getCurrentUserId } from '@/entities/user';
import { renderErrorState } from '@/shared/ui/error-state';

const MOCK_NETWORK_DELAY = 2000;

const chartConfigs: DashboardCardConfig[] = [
  { id: 'chart-1', title: 'Quizzes Skills', wide: true },
  { id: 'chart-2', title: 'Async Sorter' },
  { id: 'chart-3', title: 'True/False' },
];

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

  handleError(parent: HTMLElement): void {
    parent.innerHTML = '';
    parent.append(
      renderErrorState({
        title: 'Something went wrong.',
        message: 'Failed to process dashboard statistics.\n Try to refresh.',
        onRetry: () => {
          parent.innerHTML = '';
          this.init(parent);
        },
      }),
    );
  },

  async init(parent: HTMLElement): Promise<void> {
    const current_userId = getCurrentUserId();
    if (!parent || !current_userId) return;
    const content = createElement('div', { classList: ['dashboard-grid'] });
    parent.append(content);
    const authName = getCurrentUserName();
    const storedName = localStorage.getItem('current_username');
    const finalName = authName || storedName || 'Explorer';
    this.renderUserHeader(parent, finalName);

    chartConfigs.forEach((config) => {
      const chartDiv = createElement('div', {
        children: [createLoader()],
      });
      chartDiv.id = config.id;

      const card = createElement('div', {
        classList: ['chart-card', config.wide ? 'wide' : 'not-wide'],
        children: [createElement('h3', { textContent: config.title }), chartDiv],
      });

      content.append(card);

      const chartContainer = document.querySelector(config.id);
      if (chartContainer) {
        resizeObserver.observe(chartContainer);
      }
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, MOCK_NETWORK_DELAY));
      const [testStats, asyncSorter, trueFalse] = await Promise.all([
        DataRepository.getUserProgress(current_userId),
        DataRepository.getAsyncSorterStats(current_userId),
        DataRepository.getTrueFalseStats(),
      ]);
      drawPieChart('#chart-1', chartAdapters.forTestsProgress(testStats), []);
      drawPieChart('#chart-2', chartAdapters.forProgress(asyncSorter), [
        'var(--color-async)',
        'var(--color-empty)',
      ]);
      drawPieChart('#chart-3', chartAdapters.forProgress(trueFalse), [
        'var(--color-quiz)',
        'var(--color-empty)',
      ]);

      this.renderStreaks(content, [1, 1, 0, 1, 1, 0, 1]);
    } catch {
      this.handleError(parent);
    }
  },
};
