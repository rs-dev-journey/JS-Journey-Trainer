import type { Attempt } from '../model/types';

export const attemptsMock: Attempt[] = [
  {
    id: 'attempt-1',
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-basics-types',
    finishedAt: 1769970000000,
    durationMs: 423000,
    scorePercent: 70,
    status: 'completed',
  },

  {
    id: 'attempt-2',
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-basics-types',
    finishedAt: 1770059400000,
    durationMs: 350000,
    scorePercent: 80,
    status: 'completed',
  },

  {
    id: 'attempt-3',
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-basics-types',
    finishedAt: 1770148440000,
    durationMs: 302000,
    scorePercent: 90,
    status: 'completed',
  },

  {
    id: 'attempt-4',
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-scope-closures',
    finishedAt: 1770326400000,
    durationMs: 410000,
    scorePercent: 30,
    status: 'completed',
  },

  {
    id: 'attempt-5',
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-scope-closures',
    finishedAt: 1770417900000,
    durationMs: 320000,
    scorePercent: 80,
    status: 'completed',
  },
];
