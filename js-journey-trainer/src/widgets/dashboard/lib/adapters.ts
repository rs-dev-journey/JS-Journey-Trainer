import type { QuizItem, ActivityData, ChartData } from '@/entities/stats/model/types';
import type { UserTestProgress } from '@/entities/user-test-progress';

const NUMBER_OF_ALL_QUESTIONS = 10;

type ProgressDataForChart = Pick<UserTestProgress, 'testId' | 'lastScorePercent'>;

export const chartAdapters = {
  forPie: (data: QuizItem[]): ChartData[] => data.map((d) => ({ label: d.name, value: d.val })),
  forProgress: (data: ActivityData): ChartData[] => {
    const done = data.done ?? 0;
    const all = data.all ?? NUMBER_OF_ALL_QUESTIONS;
    return [
      { label: 'Done', value: done },
      { label: 'Left', value: all - done },
    ];
  },

  forTestsProgress: (data: ProgressDataForChart[]): ChartData[] => {
    return data.map((item) => {
      const label = item.testId
        .replace('js-', '')
        .replaceAll('-', ' ')
        .replace(/^\w/, (c) => c.toUpperCase());

      return {
        label: label,
        value: item.lastScorePercent ?? 0,
      };
    });
  },
};
