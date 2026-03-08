import type { UserTestProgress } from '@/entities/user-test-progress';
import type { TestCardProgress, TestCardViewModel } from './types';
import buildProgressMap from './build-progress-map';
import type { Test } from '@/entities/test/model/types';

export function buildTestCards(tests: Test[], progress: UserTestProgress[]): TestCardViewModel[] {
  const progressMap = buildProgressMap(progress);

  console.log('tests:', tests);
  console.log('progress:', progress);

  const cards = tests.map((test) => {
    const progressItem = progressMap.get(test.id);

    const cardProgress: TestCardProgress = progressItem
      ? {
          status: progressItem.status,
          attemptsCount: progressItem.attemptsCount,
          lastScorePercent: progressItem.lastScorePercent,
        }
      : {
          status: 'notCompleted',
          attemptsCount: 0,
          lastScorePercent: null,
        };

    return {
      id: test.id,
      title: test.title,
      description: test.description,
      imageUrl: test.imageUrl,
      progress: cardProgress,
    };
  });

  console.log('cards:', cards);

  return cards;
}
