// import { getTestIdFromUrl } from '@/shared/lib/router/get-test-id-from-url';
import { createTestOverviewWidget } from '@/widgets/test-overview';
import { createHandleStartTest } from '../model/handle-start-test';
import { createHandleShowAnswers } from '../model/handle-show-answers';

export function createTestOverviewPage() {
  // Достать userId из User entites
  const userId = 'user-1';
  const testId = 'js-basics-types';
  // const testId = getTestIdFromUrl();

  if (testId === undefined) throw new Error('testId not fined');

  const page = createTestOverviewWidget(
    userId,
    testId,
    createHandleStartTest(testId),
    createHandleShowAnswers(userId, testId),
  );

  return page;
}
