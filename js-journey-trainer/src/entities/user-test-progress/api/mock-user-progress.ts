import type { UserTestProgress } from '../model/types';

export const userProgressMock: UserTestProgress[] = [
  {
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-basics-types',
    status: 'completed',
    attemptsCount: 3,
    lastScorePercent: 90,
  },

  {
    userId: 'b6adc2cb-8c65-4ace-bb8c-64e096b0018c',
    testId: 'js-scope-closures',
    status: 'completed',
    attemptsCount: 2,
    lastScorePercent: 80,
  },

  {
    userId: 'user-2',
    testId: 'js-objects-this-prototype',
    status: 'completed',
    attemptsCount: 2,
    lastScorePercent: 70,
  },
];
