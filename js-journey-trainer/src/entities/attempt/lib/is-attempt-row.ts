import { getProperty } from '@/shared/lib/object/get-property';
import type { AttemptRow } from '../api/types';

export function isAttemptRow(value: unknown): value is AttemptRow {
  const id = getProperty(value, 'id');
  const userId = getProperty(value, 'user_id');
  const testId = getProperty(value, 'test_id');
  const finishedAt = getProperty(value, 'finished_at');
  const durationMs = getProperty(value, 'duration_ms');
  const scorePercent = getProperty(value, 'score_percent');
  const status = getProperty(value, 'status');

  return (
    typeof id === 'string' &&
    typeof userId === 'string' &&
    typeof testId === 'string' &&
    typeof finishedAt === 'number' &&
    typeof durationMs === 'number' &&
    typeof scorePercent === 'number' &&
    status === 'completed'
  );
}

export function isAttemptRowArray(value: unknown): value is AttemptRow[] {
  return Array.isArray(value) && value.every(isAttemptRow);
}
