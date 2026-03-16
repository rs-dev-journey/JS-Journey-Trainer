import { describe, expect, it, vi } from 'vitest';
import { initTestRun } from '../init-test-run';
import type { Test } from '@/entities/test';

const test = {
  id: 'js-basics-types',
  title: 'JS Basics',
  description: '',
  imageUrl: '',
  questionCount: 0,
  questions: [],
};

const getTestByIdMock = vi.fn();
const setCurrentTestMock = vi.fn();
const startRunMock = vi.fn();

vi.mock('@/entities/test', () => ({
  getTestById: () => getTestByIdMock(),
  setCurrentTest: (test: Test) => setCurrentTestMock(test),
}));

vi.mock('@/features/run-test', () => ({
  startRun: () => startRunMock(),
}));

describe('initTestRun', () => {
  it('initializes test run', async () => {
    getTestByIdMock.mockResolvedValue(test);

    const result = await initTestRun();

    expect(result).toBe(test);
    expect(setCurrentTestMock).toHaveBeenCalledWith(test);
    expect(startRunMock).toHaveBeenCalled();
  });

  it('throws if test is not found', async () => {
    getTestByIdMock.mockResolvedValue(null);

    await expect(initTestRun()).rejects.toThrow('Test is not defined');
  });
});
