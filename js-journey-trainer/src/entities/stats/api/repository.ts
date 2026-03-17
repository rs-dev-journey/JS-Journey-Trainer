import type { QuizItem, ActivityData } from '../model/types';
export const DataRepository = {
  async getQuizzes(): Promise<QuizItem[]> {
    return [
      { name: 'JS', val: 80 },
      { name: 'D3', val: 90 },
      { name: 'CSS', val: 60 },
      { name: 'HTML', val: 70 },
      { name: 'Node', val: 50 },
    ];
  },
  async getActivity(id: number): Promise<ActivityData> {
    return id === 1 ? { done: 7, all: 10 } : { done: 3, all: 10 };
  },
};
