import { playlist } from '../lib/static-data';
import { fetchSolvedCount } from '@/shared/api/async-sorter/sorter-api';
import type { ActivityData } from '@/entities/stats/model/types';

export const getAsyncSorterResult = async (userId: string): Promise<ActivityData> => {
  try {
    const solvedCount = await fetchSolvedCount(userId);
    return {
      done: solvedCount,
      all: playlist.length,
    };
  } catch {
    return { done: 0, all: playlist.length };
  }
};
