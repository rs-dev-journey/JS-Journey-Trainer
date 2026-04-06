import type { UserTestProgressRow } from '../api/types';
import type { UserTestProgress } from '../model/types';

export function mapUserProgressRow(row: UserTestProgressRow): UserTestProgress {
  return {
    userId: row.user_id,
    testId: row.test_id,
    attemptsCount: row.attempts_count,
    lastScorePercent: row.last_score_percent,
    status: row.status,
  };
}
