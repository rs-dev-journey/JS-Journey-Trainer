import type { UserTestProgress } from '../model/types';

export const userProgressMock: UserTestProgress[] = [
  {
    userId: 'user-1',
    testId: 'js-basics-types',
    status: 'completed',
    attemptsCount: 3,
    lastScorePercent: 80,
  },

  {
    userId: 'user-1',
    testId: 'js-scope-closures',
    status: 'completed',
    attemptsCount: 1,
    lastScorePercent: 50,
  },

  {
    userId: 'user-2',
    testId: 'js-objects-this-prototype',
    status: 'completed',
    attemptsCount: 2,
    lastScorePercent: 70,
  },
];
