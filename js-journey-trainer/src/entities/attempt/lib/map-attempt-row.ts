import type { AttemptRow } from '../api/types';
import type { Attempt } from '../model/types';

export function mapAttemptRow(row: AttemptRow): Attempt {
  return {
    id: row.id,
    userId: row.user_id,
    testId: row.test_id,
    finishedAt: row.finished_at,
    durationMs: row.duration_ms,
    scorePercent: row.score_percent,
    status: row.status,
  };
}
