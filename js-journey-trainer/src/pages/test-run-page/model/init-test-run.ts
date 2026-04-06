import { getTestById, setCurrentTest, type Test } from '@/entities/test';
import { startRun } from '@/features/run-test';

export async function initTestRun(testId: string): Promise<Test> {
  const test = await getTestById(testId);

  if (!test) {
    throw new Error('Test is not defined');
  }

  setCurrentTest(test);

  startRun();

  return test;
}
