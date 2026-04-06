import type { QuizItem, ActivityData } from '../model/types';
import type { UserTestProgress } from '@/entities/user-test-progress';
import { getUserProgress } from '@/entities/user-test-progress';

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
  async getUserProgress(userId: string): Promise<UserTestProgress[]> {
    if (!userId) return [];

    try {
      const data = await getUserProgress(userId);
      if (!data) throw new Error('No data received');
      return data || [];
    } catch (error) {
      console.error('Fail to load data for:', userId, error);
      return [];
    }
  },
};
