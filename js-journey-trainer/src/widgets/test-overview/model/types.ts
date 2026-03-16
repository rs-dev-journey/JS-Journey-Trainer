import type { Attempt } from '@/entities/attempt';
import type { Test } from '@/entities/test';

export interface TestOverviewData {
  test: Test;
  attempts: Attempt[];
}
