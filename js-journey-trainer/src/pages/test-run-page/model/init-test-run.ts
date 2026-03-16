import { getTestById, setCurrentTest, type Test } from '@/entities/test';
import { startRun } from '@/features/run-test';
// import { getTestIdFromPathname } from '../lib/get-test-id';

export async function initTestRun(): Promise<Test> {
  // const testId = getTestIdFromPathname();
  const testId = 'js-basics-types';
  const test = await getTestById(testId);

  if (!test) {
    throw new Error('Test is not defined');
  }

  setCurrentTest(test);

  startRun();

  return test;
}
