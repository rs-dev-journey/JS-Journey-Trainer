import { vi, describe, it, expect, afterEach } from 'vitest';
import { DataRepository } from '../repository';
import * as SorterApi from '@/shared/api/async-sorter/sorter-api';
import { playlist } from '@/entities/async-sorter/lib/static-data';

vi.mock('@/shared/api/supabase/client', () => ({
  supabase: { from: vi.fn(), auth: vi.fn() },
}));

describe('DataRepository', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return mocked quiz data', async () => {
    const mockQuizzes = [{ name: 'Test', val: 10 }];
    vi.spyOn(DataRepository, 'getQuizzes').mockResolvedValue(mockQuizzes);

    const result = await DataRepository.getQuizzes();
    expect(result).toEqual(mockQuizzes);
  });

  it('should return actual session progress for Async Sorter', async () => {
    const fetchSpy = vi.spyOn(SorterApi, 'fetchSolvedCount').mockResolvedValue(3);
    const result = await DataRepository.getAsyncSorterStats('user-123');

    expect(fetchSpy).toHaveBeenCalledWith('user-123');
    expect(result).toEqual({
      done: 3,
      all: playlist.length,
    });
  });

  it('should return fallback data when API fails', async () => {
    vi.spyOn(SorterApi, 'fetchSolvedCount').mockRejectedValue(new Error('Server Down'));

    const result = await DataRepository.getAsyncSorterStats('user-123');

    expect(result.done).toBe(0);
    expect(result.all).toBe(playlist.length);
  });
});
