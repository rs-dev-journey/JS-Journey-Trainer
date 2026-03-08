import delay from '@/shared/lib/delay/delay';
import type { Test } from '../model/types';
import { tests } from './mock-tests';
import { mockConfig } from '@/shared/config/mock-config';

export async function getTests(): Promise<Test[]> {
  await delay(mockConfig.delayMs);
  if (mockConfig.shouldFail) throw new Error('Mock error');
  return structuredClone(tests);
}

export async function getTestById(id: string): Promise<Test | undefined> {
  await delay(mockConfig.delayMs);
  if (mockConfig.shouldFail) throw new Error('Mock error');

  const test = tests.find((test) => test.id === id);
  return test ? structuredClone(test) : undefined;
}
