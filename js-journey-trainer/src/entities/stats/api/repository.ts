import type { QuizItem, ActivityData } from '../model/types';
import type { UserTestProgress } from '@/entities/user-test-progress';
import { getUserProgress } from '@/entities/user-test-progress';
import { getTrueFalseResult } from '@/entities/user-true-false';
import { getAsyncSorterResult } from '@/entities/async-sorter/model/stats';

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
  async getAsyncSorterStats(userId: string): Promise<ActivityData> {
    const data = await getAsyncSorterResult(userId);
    return data;
  },
  async getTrueFalseStats(): Promise<ActivityData> {
    const result = getTrueFalseResult();
    return result || { done: 0, all: 10 };
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
