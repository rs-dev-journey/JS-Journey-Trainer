import type { QuizItem, ActivityData, ChartData } from '@/entities/stats/model/types';

const NUMBER_OF_ALL_QUESTIONS = 10;

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
};
