import type { TestResult } from '@/features/run-test';
import { formatDuration } from '@/shared/lib/time/format-duration';
import type { ResultViewModel } from './types';

export function mapResultViewModel(result: TestResult): ResultViewModel {
  return {
    score: `${result.scorePercent}%`,
    correctCount: result.correctCount,
    totalQuestions: result.totalQuestions,
    duration: formatDuration(result.durationMs),
  };
}
