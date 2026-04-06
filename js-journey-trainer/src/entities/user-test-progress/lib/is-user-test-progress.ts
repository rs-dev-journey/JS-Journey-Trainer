import { getProperty } from '@/shared/lib/object/get-property';
import type { UserTestProgressRow } from '../api/types';

export function isUserTestProgressRow(value: unknown): value is UserTestProgressRow {
  const id = getProperty(value, 'id');
  const userId = getProperty(value, 'user_id');
  const testId = getProperty(value, 'test_id');
  const attemptsCount = getProperty(value, 'attempts_count');
  const lastScorePercent = getProperty(value, 'last_score_percent');
  const status = getProperty(value, 'status');

  return (
    typeof id === 'string' &&
    typeof userId === 'string' &&
    typeof testId === 'string' &&
    typeof attemptsCount === 'number' &&
    (typeof lastScorePercent === 'number' || lastScorePercent === null) &&
    (status === 'completed' || status === 'notCompleted')
  );
}

export function isUserTestProgressRowArray(value: unknown): value is UserTestProgressRow[] {
  return Array.isArray(value) && value.every(isUserTestProgressRow);
}
